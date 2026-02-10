'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Puzzle } from 'lucide-react';
import Image from 'next/image';
import { placeholderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const GRID_SIZE = 4; // 4x4 grid
const TOTAL_PIECES = GRID_SIZE * GRID_SIZE;

// Function to shuffle an array
const shuffleArray = (array: number[]) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  // Ensure the shuffled array isn't already the solution
  if (shuffled.every((val, index) => val === index)) {
    return shuffleArray(shuffled);
  }
  return shuffled;
};

export default function PuzzlePage() {
  const puzzleImage = placeholderImages.find(p => p.id === 'product-7');
  
  const [pieces, setPieces] = useState<number[]>([]);
  const [gameState, setGameState] = useState<'not-started' | 'in-progress' | 'solved'>('not-started');
  const [selectedPieceIndex, setSelectedPieceIndex] = useState<number | null>(null);

  useEffect(() => {
    // Initialize pieces in order when not started
    if (gameState === 'not-started') {
      setPieces(Array.from({ length: TOTAL_PIECES }, (_, i) => i));
    }
  }, [gameState]);

  const handleStartGame = () => {
    setPieces(shuffleArray(Array.from({ length: TOTAL_PIECES }, (_, i) => i)));
    setGameState('in-progress');
    setSelectedPieceIndex(null);
  };

  const handleResetGame = () => {
    setGameState('not-started');
    setSelectedPieceIndex(null);
  };

  const handlePieceClick = (clickedIndex: number) => {
    if (gameState !== 'in-progress') return;

    if (selectedPieceIndex === null) {
      // First piece selected
      setSelectedPieceIndex(clickedIndex);
    } else if (selectedPieceIndex === clickedIndex) {
        // Deselect if same piece is clicked again
        setSelectedPieceIndex(null);
    } else {
      // Second piece selected, perform swap
      const newPieces = [...pieces];
      [newPieces[selectedPieceIndex], newPieces[clickedIndex]] = [newPieces[clickedIndex], newPieces[selectedPieceIndex]];
      setPieces(newPieces);

      // Check for win
      const isSolved = newPieces.every((originalIndex, currentIndex) => originalIndex === currentIndex);
      if (isSolved) {
        setGameState('solved');
      }

      setSelectedPieceIndex(null); // Reset selection
    }
  };

  const renderPuzzleArea = () => {
    if (!puzzleImage) return <p>Image not found.</p>;

    switch(gameState) {
      case 'solved':
        return (
          <div className="text-center">
            <div className="relative aspect-video rounded-md overflow-hidden border-4 border-primary shadow-lg mb-8">
              <Image
                src={puzzleImage.imageUrl}
                alt={puzzleImage.description}
                fill
                className="object-cover"
              />
            </div>
            <h2 className="text-2xl font-headline text-primary mb-4">Congratulations!</h2>
            <p className="text-lg text-foreground/90 mb-6">You solved the Peacock's Dance puzzle!</p>
            <Button onClick={handleResetGame}>Play Again</Button>
          </div>
        );
      case 'not-started':
        return (
          <>
            <div className="relative aspect-video rounded-md overflow-hidden border-4 border-border shadow-lg mb-8">
              <Image
                src={puzzleImage.imageUrl}
                alt={puzzleImage.description}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/20 grid grid-cols-4 grid-rows-4">
                {Array.from({ length: TOTAL_PIECES }).map((_, i) => (
                  <div key={i} className="border border-white/40"></div>
                ))}
              </div>
            </div>
            <p className="text-lg text-foreground/90 mb-6">
              The puzzle is waiting! Click the button below to start assembling the pieces.
            </p>
            <Button onClick={handleStartGame}>Start Puzzle</Button>
          </>
        );
      case 'in-progress':
        return (
          <>
            <div 
              className="grid grid-cols-4 gap-1 rounded-md overflow-hidden border-4 border-border shadow-lg mb-8"
            >
              {pieces.map((originalIndex, currentIndex) => (
                <div
                  key={currentIndex}
                  onClick={() => handlePieceClick(currentIndex)}
                  className={cn(
                    "aspect-square bg-cover bg-no-repeat cursor-pointer transition-all duration-200 ease-in-out",
                    selectedPieceIndex === currentIndex ? 'border-4 border-primary scale-95 ring-2 ring-primary' : 'border-2 border-transparent'
                  )}
                  style={{ 
                    backgroundImage: `url(${puzzleImage.imageUrl})`,
                    backgroundSize: `${GRID_SIZE * 100}% ${GRID_SIZE * 100}%`,
                    backgroundPosition: `${(originalIndex % GRID_SIZE) * (100 / (GRID_SIZE - 1))}% ${Math.floor(originalIndex / GRID_SIZE) * (100 / (GRID_SIZE - 1))}%`
                  }}
                >
                </div>
              ))}
            </div>
            <p className="text-lg text-foreground/90 mb-6">
              Click two pieces to swap them and solve the puzzle.
            </p>
            <Button onClick={handleResetGame} variant="outline">Reset Puzzle</Button>
          </>
        );
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline tracking-wide">Jigsaw Puzzle</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80">
          Piece together the beauty of Indian crafts.
        </p>
      </div>
      <Card className="w-full max-w-4xl mx-auto parchment">
        <CardHeader>
          <CardTitle className="flex items-center justify-center gap-4 font-headline text-3xl">
            <Puzzle className="h-8 w-8 text-primary" />
            <span>Peacock's Dance</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          {renderPuzzleArea()}
        </CardContent>
      </Card>
    </div>
  );
}
