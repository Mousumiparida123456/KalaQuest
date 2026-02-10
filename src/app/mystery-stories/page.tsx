
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { states, type StateInfo, type Monument } from '@/lib/data';
import { Map, Landmark, ArrowLeft } from 'lucide-react';

export default function MysteryStoriesPage() {
  const [selectedState, setSelectedState] = useState<StateInfo | null>(null);
  const [selectedMonument, setSelectedMonument] = useState<Monument | null>(null);

  // Show detailed facts for a selected monument
  if (selectedMonument) {
    return (
      <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
        <Button
          variant="outline"
          onClick={() => setSelectedMonument(null)} // Go back to monument list
          className="mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Monuments
        </Button>
        <Card className="w-full parchment">
          <CardHeader className="text-center">
            <CardTitle className="font-headline text-3xl md:text-4xl">{selectedMonument.name}</CardTitle>
            <CardDescription className="text-lg">{selectedState?.name}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 justify-center">
                 <Landmark className="h-8 w-8 text-accent" />
                 <h3 className="font-headline text-2xl md:text-3xl">Did You Know?</h3>
              </div>
              <ul className="space-y-3 text-base md:text-lg font-body text-foreground/90 list-disc pl-5 max-w-3xl mx-auto">
                {selectedMonument.facts.map((fact, index) => (
                  <li key={index}>{fact}</li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show list of monuments for a selected state
  if (selectedState) {
    return (
      <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
        <Button
          variant="outline"
          onClick={() => setSelectedState(null)} // Go back to state list
          className="mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to States
        </Button>
        <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-headline tracking-wide">Monuments of {selectedState.name}</h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80">
                Select a monument to uncover its fascinating tales.
            </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {selectedState.monuments.map((monument) => (
                <button
                    key={monument.id}
                    onClick={() => setSelectedMonument(monument)}
                    className="text-left h-full"
                >
                    <Card className="parchment text-center flex flex-col items-center justify-center p-6 h-full transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl focus:ring-2 focus:ring-primary">
                        <Landmark className="h-10 w-10 text-primary mb-3" />
                        <CardTitle className="font-headline text-xl flex-grow">{monument.name}</CardTitle>
                    </Card>
                </button>
            ))}
        </div>
      </div>
    );
  }

  // Show list of states (initial view)
  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline tracking-wide">Stories Across India</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80">
          Select a state to uncover fascinating tales and hidden truths behind its greatest landmarks.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
        {states.map((item) => (
          <button
            key={item.id}
            onClick={() => setSelectedState(item)}
            className="text-left h-full"
          >
            <Card className="parchment text-center flex flex-col items-center justify-center p-4 h-full transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl focus:ring-2 focus:ring-primary">
              <Map className="h-10 w-10 text-primary mb-3" />
              <CardTitle className="font-headline text-xl">{item.name}</CardTitle>
            </Card>
          </button>
        ))}
      </div>
    </div>
  );
}
