import { addDoc, collection, getDocs, limit, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { googleAI } from '@genkit-ai/google-genai';
import { ai } from '@/ai/genkit';
import { getServerFirestore } from '@/ai/server-firestore';

export interface MemoryRecord {
  id: string;
  text: string;
  source: string;
  createdAtMillis: number | null;
}

interface MemoryRecordWithScore extends MemoryRecord {
  score: number;
}

function cosineSimilarity(a: number[], b: number[]) {
  const length = Math.min(a.length, b.length);
  if (length === 0) {
    return 0;
  }

  let dot = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < length; i += 1) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }

  if (normA === 0 || normB === 0) {
    return 0;
  }

  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

async function embedText(text: string) {
  const result = await ai.embed({
    embedder: googleAI.embedder('text-embedding-004'),
    content: text,
  });

  return result[0]?.embedding ?? [];
}

export async function rememberText(params: {
  userId: string;
  text: string;
  source?: string;
}) {
  const firestore = getServerFirestore();
  const embedding = await embedText(params.text);

  const docRef = await addDoc(collection(firestore, 'chatbot_memories', params.userId, 'items'), {
    text: params.text,
    source: params.source ?? 'manual',
    embedding,
    createdAt: serverTimestamp(),
  });

  return {
    id: docRef.id,
    text: params.text,
    source: params.source ?? 'manual',
  };
}

export async function searchMemory(params: {
  userId: string;
  queryText: string;
  topK?: number;
  maxScan?: number;
  minScore?: number;
}) {
  const topK = params.topK ?? 5;
  const maxScan = params.maxScan ?? 200;
  const minScore = params.minScore ?? 0.2;

  const firestore = getServerFirestore();
  const queryEmbedding = await embedText(params.queryText);

  const snapshots = await getDocs(
    query(
      collection(firestore, 'chatbot_memories', params.userId, 'items'),
      orderBy('createdAt', 'desc'),
      limit(maxScan),
    ),
  );

  const ranked: MemoryRecordWithScore[] = [];

  for (const doc of snapshots.docs) {
    const data = doc.data() as {
      text?: unknown;
      embedding?: unknown;
      source?: unknown;
      createdAt?: { toMillis?: () => number };
    };

    const text = typeof data.text === 'string' ? data.text : '';
    const embedding = Array.isArray(data.embedding) ? (data.embedding.filter((x) => typeof x === 'number') as number[]) : [];

    if (!text || embedding.length === 0) {
      continue;
    }

    const score = cosineSimilarity(queryEmbedding, embedding);
    if (score < minScore) {
      continue;
    }

    ranked.push({
      id: doc.id,
      text,
      source: typeof data.source === 'string' ? data.source : 'manual',
      createdAtMillis: data.createdAt?.toMillis?.() ?? null,
      score,
    });
  }

  ranked.sort((a, b) => b.score - a.score);

  return ranked.slice(0, topK).map((item) => ({
    id: item.id,
    text: item.text,
    source: item.source,
    score: Number(item.score.toFixed(4)),
    createdAtMillis: item.createdAtMillis,
  }));
}
