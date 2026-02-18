import { addDoc, collection, doc, getDocs, limit, orderBy, query, serverTimestamp, setDoc } from 'firebase/firestore';
import { ai } from '@/ai/genkit';
import { getServerFirestore } from '@/ai/server-firestore';
import { rememberText, searchMemory } from '@/ai/vector-memory';

export interface ChatbotInput {
  userId: string;
  message: string;
  conversationId?: string;
  topK?: number;
  maxScan?: number;
  remember?: string[];
  historyLimit?: number;
}

interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string;
  createdAtMillis: number | null;
}

function extractInlineMemory(message: string) {
  const normalized = message.trim();
  const match = normalized.match(/^remember(?:\s+that)?\s*[:,-]?\s*(.+)$/i);
  return match?.[1]?.trim() || null;
}

function formatHistory(history: ConversationMessage[]) {
  if (!history.length) {
    return 'No prior conversation history.';
  }

  return history.map((entry) => `${entry.role === 'user' ? 'User' : 'Assistant'}: ${entry.content}`).join('\n');
}

async function getConversationHistory(params: {
  userId: string;
  conversationId: string;
  historyLimit: number;
}) {
  const firestore = getServerFirestore();
  const snapshots = await getDocs(
    query(
      collection(firestore, 'chatbot_conversations', params.userId, 'threads', params.conversationId, 'messages'),
      orderBy('createdAt', 'desc'),
      limit(params.historyLimit),
    ),
  );

  const rows = snapshots.docs
    .map((snapshot) => {
      const data = snapshot.data() as {
        role?: unknown;
        content?: unknown;
        createdAt?: { toMillis?: () => number };
      };

      const role = data.role === 'assistant' ? 'assistant' : data.role === 'user' ? 'user' : null;
      const content = typeof data.content === 'string' ? data.content : null;
      if (!role || !content) {
        return null;
      }

      return {
        role,
        content,
        createdAtMillis: data.createdAt?.toMillis?.() ?? null,
      } as ConversationMessage;
    })
    .filter((value): value is ConversationMessage => value !== null)
    .reverse();

  return rows;
}

async function ensureConversation(userId: string, conversationId: string) {
  const firestore = getServerFirestore();
  const conversationRef = doc(firestore, 'chatbot_conversations', userId, 'threads', conversationId);

  await setDoc(
    conversationRef,
    {
      userId,
      conversationId,
      updatedAt: serverTimestamp(),
      createdAt: serverTimestamp(),
    },
    { merge: true },
  );
}

async function appendConversationMessage(params: {
  userId: string;
  conversationId: string;
  role: 'user' | 'assistant';
  content: string;
}) {
  const firestore = getServerFirestore();

  await addDoc(collection(firestore, 'chatbot_conversations', params.userId, 'threads', params.conversationId, 'messages'), {
    role: params.role,
    content: params.content,
    createdAt: serverTimestamp(),
  });
}

function resolveConversationId(inputId?: string) {
  if (inputId && inputId.trim()) {
    return inputId.trim();
  }

  return crypto.randomUUID();
}

export async function chatWithMemory(input: ChatbotInput) {
  const conversationId = resolveConversationId(input.conversationId);
  const historyLimit = input.historyLimit ?? 12;

  await ensureConversation(input.userId, conversationId);

  const [relatedMemories, history] = await Promise.all([
    searchMemory({
      userId: input.userId,
      queryText: input.message,
      topK: input.topK ?? 5,
      maxScan: input.maxScan ?? 200,
    }),
    getConversationHistory({
      userId: input.userId,
      conversationId,
      historyLimit,
    }),
  ]);

  const memoryContext = relatedMemories.length
    ? relatedMemories.map((m, i) => `${i + 1}. ${m.text} (relevance: ${m.score})`).join('\n')
    : 'No saved memories found for this user.';

  const response = await ai.generate({
    prompt: [
      'You are a helpful chatbot assistant.',
      'Use memory context only when relevant to the user question.',
      'Use prior conversation history to stay consistent.',
      'If memory is missing, still answer with best effort.',
      'If you are unsure, ask a follow-up question.',
      '',
      `Memory context:\n${memoryContext}`,
      '',
      `Conversation history:\n${formatHistory(history)}`,
      '',
      `User message: ${input.message}`,
    ].join('\n'),
  });

  await appendConversationMessage({
    userId: input.userId,
    conversationId,
    role: 'user',
    content: input.message,
  });

  await appendConversationMessage({
    userId: input.userId,
    conversationId,
    role: 'assistant',
    content: response.text,
  });

  const itemsToRemember = [...(input.remember ?? [])];
  const inlineMemory = extractInlineMemory(input.message);
  if (inlineMemory) {
    itemsToRemember.push(inlineMemory);
  }

  const deduped = Array.from(new Set(itemsToRemember.map((item) => item.trim()).filter(Boolean)));

  const storedMemories = [] as { id: string; text: string; source: string }[];
  for (const text of deduped) {
    const saved = await rememberText({
      userId: input.userId,
      text,
      source: 'chat',
    });
    storedMemories.push(saved);
  }

  return {
    conversationId,
    answer: response.text,
    relatedMemories,
    storedMemories,
  };
}

export async function rememberMany(userId: string, items: string[]) {
  const output: { id: string; text: string; source: string }[] = [];

  for (const text of items.map((item) => item.trim()).filter(Boolean)) {
    const saved = await rememberText({ userId, text, source: 'manual' });
    output.push(saved);
  }

  return output;
}
