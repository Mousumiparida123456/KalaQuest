'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PenSquare } from 'lucide-react';
import { useState, useRef, ChangeEvent, KeyboardEvent } from 'react';

export default function CrosswordPage() {
  const [grid, setGrid] = useState<string[]>(Array(49).fill(''));
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    // Only allow single letters
    if (value.length > 1) {
      value = value.slice(-1);
    }
    const newGrid = [...grid];
    newGrid[index] = value.toUpperCase();
    setGrid(newGrid);

    // Move to next input if a letter was entered
    if (value && index < 48) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    // Move to previous input on backspace if current is empty
    if (e.key === 'Backspace' && grid[index] === '' && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline tracking-wide">Heritage Crossword</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80">
          Test your knowledge with these fun puzzles!
        </p>
      </div>
      <Card className="w-full max-w-4xl mx-auto parchment">
        <CardHeader>
          <CardTitle className="flex items-center justify-center gap-4 font-headline text-3xl">
            <PenSquare className="h-8 w-8 text-primary" />
            <span>Fun Facts Puzzle</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <div className="grid grid-cols-7 gap-1 bg-muted/50 p-2 rounded-md aspect-square">
                {grid.map((cell, i) => (
                  <input
                    key={i}
                    ref={(el) => (inputsRef.current[i] = el)}
                    type="text"
                    maxLength={1}
                    value={cell}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(i, e.target.value)}
                    onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => handleKeyDown(e, i)}
                    className="w-full aspect-square bg-background border border-border text-center text-xl font-bold uppercase caret-primary"
                  />
                ))}
              </div>
            </div>
            <div className="w-full md:w-1/3">
              <h3 className="font-headline text-xl mb-4">Clues</h3>
              <div className="space-y-4 text-sm">
                <div>
                  <h4 className="font-semibold">Across</h4>
                  <ul className="list-disc list-inside space-y-1 mt-1">
                    <li>1. A big orange cat with black stripes. (5)</li>
                    <li>4. A sweet, yellow summer fruit. (5)</li>
                    <li>6. The sound a cow makes. (3)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold">Down</h4>
                  <ul className="list-disc list-inside space-y-1 mt-1">
                    <li>2. India's national flower that grows in water. (5)</li>
                    <li>3. The opposite of 'day'. (5)</li>
                    <li>5. A baby cat. (6)</li>
                  </ul>
                </div>
                 <p className="text-muted-foreground mt-8 text-sm">You can now type in the grid! Answer checking coming soon.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
