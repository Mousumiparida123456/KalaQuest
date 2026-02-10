
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Brush, Undo2 } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';


// --- SVG Art Components ---

const GeometricPlateArt = ({ fills, onFill }: { fills: Record<string, string>, onFill: (part: string) => void }) => (
    <svg viewBox="0 0 400 400" className="w-full h-auto cursor-pointer" aria-label="A geometric plate pattern coloring page">
        <rect width="100%" height="100%" fill={fills.background || 'white'} onClick={(e) => { e.stopPropagation(); onFill('background'); }} />
        <g transform="translate(200, 200)" stroke="#43362B" strokeWidth="1.5" fill="none" onClick={(e) => e.stopPropagation()}>
            {/* Outer border rings */}
            <circle cx="0" cy="0" r="195" strokeWidth="2" fill="none" />
            <circle
                cx="0" cy="0" r="188"
                fill={fills.outerBorder || 'white'}
                onClick={() => onFill('outerBorder')}
                strokeWidth="1"
            />
            <circle cx="0" cy="0" r="180" strokeWidth="2" fill="none" />
            <circle
                cx="0" cy="0" r="178"
                fill={fills.outerRing || 'white'}
                onClick={() => onFill('outerRing')}
                strokeWidth="0.5"
            />
             <circle cx="0" cy="0" r="165" strokeWidth="1.5" fill="none" />
             <circle
                cx="0" cy="0" r="163"
                fill={fills.middleRing || 'white'}
                onClick={() => onFill('middleRing')}
                strokeWidth="0.5"
            />
            <circle cx="0" cy="0" r="150" strokeWidth="1.5" fill="none" />


            {/* Main structure: 8-fold symmetry */}
            {[...Array(8)].map((_, i) => (
                <g key={i} transform={`rotate(${i * 45})`}>
                    {/* Main petal shape */}
                    <path
                        d="M 0,-180 C 50,-140 50,-110 0,-85 C -50,-110 -50,-140 0,-180 Z"
                        fill={fills[`petal${i}`] || 'white'}
                        onClick={() => onFill(`petal${i}`)}
                    />
                    {/* Fill pattern inside main petal */}
                    <path
                        d="M 0,-172 C 40,-142 40,-115 0,-95 C -40,-115 -40,-142 0,-172 Z"
                        fill={fills[`petalFill${i}`] || 'white'}
                        onClick={() => onFill(`petalFill${i}`)}
                        strokeWidth="1"
                    />
                    <path
                        d="M 0,-160 C 20,-140 20,-125 0,-110 C -20,-125 -20,-140 0,-160 Z"
                        fill={fills[`petalInner${i}`] || 'white'}
                        onClick={() => onFill(`petalInner${i}`)}
                        strokeWidth="1"
                    />


                    {/* Star point connecting to petal */}
                    <path
                        d="M 0,-85 L 40,-40 L 0,-10 L -40,-40 Z"
                        fill={fills[`starPoint${i}`] || 'white'}
                        onClick={() => onFill(`starPoint${i}`)}
                    />
                    {/* Fill for star point */}
                    <path
                        d="M 0,-75 L 30,-40 L 0,-20 L -30,-40 Z"
                        fill={fills[`starPointFill${i}`] || 'white'}
                        onClick={() => onFill(`starPointFill${i}`)}
                        strokeWidth="1"
                    />
                    <circle cx="0" cy="-55" r="8" fill={fills[`starPointCircle${i}`] || 'white'} onClick={() => onFill(`starPointCircle${i}`)} strokeWidth="1"/>


                    {/* Interstitial diamond shape */}
                     <path
                        d="M 58, -58 L 85, 0 L 58, 58 L 0, 85 L-58, 58 L-85, 0 L-58, -58 L 0, -85 Z"
                        transform={`rotate(22.5)`}
                        fill={fills[`diamond${i}`] || 'white'}
                        onClick={() => onFill(`diamond${i}`)}
                    />
                    <path
                        d="M 50, -50 L 70, 0 L 50, 50 L 0, 70 L-50, 50 L-70, 0 L-50, -50 L 0, -70 Z"
                        transform={`rotate(22.5)`}
                        fill={fills[`diamondFill${i}`] || 'white'}
                        onClick={() => onFill(`diamondFill${i}`)}
                        strokeWidth="1"
                    />
                </g>
            ))}

            {/* Central 8-pointed star */}
            <path
                d="M 0,-60 L 23,-23 L 60,0 L 23,23 L 0,60 L -23,23 L -60,0 L -23,-23 Z"
                fill={fills.centerStar || 'white'}
                onClick={() => onFill('centerStar')}
            />
            {/* Inner fill for central star */}
             <path
                d="M 0,-45 L 17,-17 L 45,0 L 17,17 L 0,45 L -17,17 L -45,0 L -17,-17 Z"
                fill={fills.centerStarFill || 'white'}
                onClick={() => onFill('centerStarFill')}
                strokeWidth="1"
            />
             <path
                d="M 0,-30 L 11,-11 L 30,0 L 11,11 L 0,30 L -11,11 L -30,0 L -11,-11 Z"
                fill={fills.centerStarInner || 'white'}
                onClick={() => onFill('centerStarInner')}
                strokeWidth="1"
            />

            {/* Central rosette */}
            <g>
             {[...Array(8)].map((_, i) => (
                <path key={i}
                    transform={`rotate(${i * 45})`}
                    d="M 0,-18 C 5, -10 5, 0 0,0 C-5,0 -5,-10 0,-18Z"
                    fill={fills[`rosettePetal${i}`] || 'white'}
                    onClick={() => onFill(`rosettePetal${i}`)}
                />
            ))}
            </g>
            <circle cx="0" cy="0" r="5" fill={fills.centerCircle || 'white'} onClick={() => onFill('centerCircle')} />
        </g>
    </svg>
);

const MandalaArt = ({ fills, onFill }: { fills: Record<string, string>, onFill: (part: string) => void }) => (
    <svg viewBox="0 0 400 400" className="w-full h-auto cursor-pointer" aria-label="A mandala coloring page">
         <rect width="100%" height="100%" fill={fills.background || 'white'} onClick={(e) => { e.stopPropagation(); onFill('background'); }} />
        <g transform="translate(200, 200)" stroke="#43362B" strokeWidth="1.5" fill="none" onClick={(e) => e.stopPropagation()}>
            {/* Outer rings */}
            <circle cx="0" cy="0" r="195" fill={fills.outerRing1 || 'white'} onClick={() => onFill('outerRing1')} strokeWidth="1" />
            <circle cx="0" cy="0" r="185" fill={fills.outerRing2 || 'white'} onClick={() => onFill('outerRing2')} strokeWidth="1" />

            {/* Scalloped border */}
            {[...Array(24)].map((_, i) => (
                <path
                    key={i}
                    transform={`rotate(${i * 15})`}
                    d="M 0,-190 C 20,-185 20,-175 0,-170 C -20,-175 -20,-185 0,-190 Z"
                    fill={fills[`scallop${i}`] || 'white'}
                    onClick={() => onFill(`scallop${i}`)}
                />
            ))}

            {/* Large petals layer */}
            {[...Array(12)].map((_, i) => (
                <g key={i} transform={`rotate(${i * 30})`}>
                    <path
                        d="M 0,-180 C 40,-120 40,-60 0,-40 C -40,-60 -40,-120 0,-180 Z"
                        fill={fills[`largePetal${i}`] || 'white'}
                        onClick={() => onFill(`largePetal${i}`)}
                    />
                    <path
                        d="M 0,-170 C 30,-120 30,-70 0,-50 C -30,-70 -30,-120 0,-170 Z"
                        fill={fills[`largePetalInner${i}`] || 'white'}
                        onClick={() => onFill(`largePetalInner${i}`)}
                    />
                    <path
                        d="M 0, -110 a 10 10 0 0 1 0 20 a 10 10 0 0 1 0 -20"
                        fill={fills[`largePetalCircle${i}`] || 'white'}
                        onClick={() => onFill(`largePetalCircle${i}`)}
                        strokeWidth="1"
                    />
                </g>
            ))}

            {/* Middle decorative ring */}
            <circle cx="0" cy="0" r="85" fill={fills.middleRing1 || 'white'} onClick={() => onFill('middleRing1')} strokeWidth="1" />
            {[...Array(12)].map((_, i) => (
                <circle key={i} cx="0" cy="-75" r="8" transform={`rotate(${i * 30})`} fill={fills[`middleRingDot${i}`] || 'white'} onClick={() => onFill(`middleRingDot${i}`)} strokeWidth="1" />
            ))}

            {/* Small inner petals */}
            {[...Array(12)].map((_, i) => (
                 <path key={i}
                    transform={`rotate(${i * 30})`}
                    d="M 0,-60 C 15,-40 15, -20 0,-10 C -15,-20 -15,-40 0,-60Z"
                    fill={fills[`smallPetal${i}`] || 'white'}
                    onClick={() => onFill(`smallPetal${i}`)}
                />
            ))}

            {/* Center */}
            <circle cx="0" cy="0" r="30" fill={fills.centerCircle1 || 'white'} onClick={() => onFill('centerCircle1')} />
            <circle cx="0" cy="0" r="15" fill={fills.centerCircle2 || 'white'} onClick={() => onFill('centerCircle2')} />
            <circle cx="0" cy="0" r="5" fill={fills.centerCircle3 || 'white'} onClick={() => onFill('centerCircle3')} />
        </g>
    </svg>
);

const FloralPatternArt = ({ fills, onFill }: { fills: Record<string, string>, onFill: (part: string) => void }) => (
    <svg viewBox="0 0 400 400" className="w-full h-auto cursor-pointer" aria-label="A floral pattern coloring page">
        <rect width="100%" height="100%" fill={fills.background || 'white'} onClick={(e) => { e.stopPropagation(); onFill('background'); }} />
        <g stroke="#43362B" strokeWidth="1.5" fill="none" onClick={(e) => e.stopPropagation()}>
            {/* Define a reusable leaf */}
            <defs>
                <g id="leaf">
                    <path d="M 0,0 C 10,10 10,20 0,30 C -10,20 -10,10 0,0 Z" />
                    <path d="M 0,0 L 0,30" strokeWidth="0.5" />
                </g>
            </defs>

            {/* Large central flower */}
            <g transform="translate(200, 200)">
                 {[...Array(6)].map((_, i) => (
                     <path key={i} transform={`rotate(${i * 60})`} d="M 0,-100 C 40,-80 40,-40 0,-20 C -40,-40 -40,-80 0,-100 Z" fill={fills[`centerFlowerPetal${i}`] || 'white'} onClick={() => onFill(`centerFlowerPetal${i}`)} />
                ))}
                <circle cx="0" cy="0" r="25" fill={fills.centerFlowerMiddle || 'white'} onClick={() => onFill('centerFlowerMiddle')} />
                <circle cx="0" cy="0" r="10" fill={fills.centerFlowerCore || 'white'} onClick={() => onFill('centerFlowerCore')} />
            </g>

             {/* Corner flowers */}
            <g transform="translate(80, 80) scale(0.6)">
                 {[...Array(5)].map((_, i) => (
                     <path key={i} transform={`rotate(${i * 72})`} d="M 0,-90 C 30,-70 30,-30 0,-10 C -30,-30 -30,-70 0,-90 Z" fill={fills[`cornerFlower1Petal${i}`] || 'white'} onClick={() => onFill(`cornerFlower1Petal${i}`)} />
                ))}
                <circle cx="0" cy="0" r="15" fill={fills.cornerFlower1Middle || 'white'} onClick={() => onFill('cornerFlower1Middle')} />
            </g>
            <g transform="translate(320, 80) scale(0.6)">
                 {[...Array(5)].map((_, i) => (
                     <path key={i} transform={`rotate(${i * 72})`} d="M 0,-90 C 30,-70 30,-30 0,-10 C -30,-30 -30,-70 0,-90 Z" fill={fills[`cornerFlower2Petal${i}`] || 'white'} onClick={() => onFill(`cornerFlower2Petal${i}`)} />
                ))}
                <circle cx="0" cy="0" r="15" fill={fills.cornerFlower2Middle || 'white'} onClick={() => onFill('cornerFlower2Middle')} />
            </g>
            <g transform="translate(80, 320) scale(0.6)">
                 {[...Array(5)].map((_, i) => (
                     <path key={i} transform={`rotate(${i * 72})`} d="M 0,-90 C 30,-70 30,-30 0,-10 C -30,-30 -30,-70 0,-90 Z" fill={fills[`cornerFlower3Petal${i}`] || 'white'} onClick={() => onFill(`cornerFlower3Petal${i}`)} />
                ))}
                <circle cx="0" cy="0" r="15" fill={fills.cornerFlower3Middle || 'white'} onClick={() => onFill('cornerFlower3Middle')} />
            </g>
             <g transform="translate(320, 320) scale(0.6)">
                 {[...Array(5)].map((_, i) => (
                     <path key={i} transform={`rotate(${i * 72})`} d="M 0,-90 C 30,-70 30,-30 0,-10 C -30,-30 -30,-70 0,-90 Z" fill={fills[`cornerFlower4Petal${i}`] || 'white'} onClick={() => onFill(`cornerFlower4Petal${i}`)} />
                ))}
                <circle cx="0" cy="0" r="15" fill={fills.cornerFlower4Middle || 'white'} onClick={() => onFill('cornerFlower4Middle')} />
            </g>

            {/* Leaves */}
            <use href="#leaf" x="140" y="150" transform="rotate(30, 140, 150)" fill={fills.leaf1 || 'white'} onClick={() => onFill('leaf1')} />
            <use href="#leaf" x="260" y="150" transform="rotate(-30, 260, 150)" fill={fills.leaf2 || 'white'} onClick={() => onFill('leaf2')} />
            <use href="#leaf" x="140" y="250" transform="rotate(-30, 140, 250)" fill={fills.leaf3 || 'white'} onClick={() => onFill('leaf3')} />
            <use href="#leaf" x="260" y="250" transform="rotate(30, 260, 250)" fill={fills.leaf4 || 'white'} onClick={() => onFill('leaf4')} />
            <use href="#leaf" x="200" y="50" transform="rotate(0, 200, 50) scale(1.2)" fill={fills.leaf5 || 'white'} onClick={() => onFill('leaf5')} />
            <use href="#leaf" x="200" y="350" transform="rotate(180, 200, 350) scale(1.2)" fill={fills.leaf6 || 'white'} onClick={() => onFill('leaf6')} />
            <use href="#leaf" x="50" y="200" transform="rotate(-90, 50, 200) scale(1.2)" fill={fills.leaf7 || 'white'} onClick={() => onFill('leaf7')} />
            <use href="#leaf" x="350" y="200" transform="rotate(90, 350, 200) scale(1.2)" fill={fills.leaf8 || 'white'} onClick={() => onFill('leaf8')} />
        </g>
    </svg>
);


// --- Page Data & Config ---

const colors = [
    { value: '#FFFFFF', name: 'White' },
    { value: '#003F88', name: 'Classic Blue' },
    { value: '#FDB813', name: 'Marigold Yellow' },
    { value: '#2E8B57', name: 'Sea Green' },
    { value: '#C04000', name: 'Terracotta' },
    { value: '#FF6347', name: 'Tomato Red' },
    { value: '#4682B4', name: 'Steel Blue' },
    { value: '#32CD32', name: 'Lime Green' },
    { value: '#FFD700', name: 'Gold' },
    { value: '#6A5ACD', name: 'Slate Blue' },
    { value: '#FFA500', name: 'Orange' },
    { value: '#8B4513', name: 'Saddle Brown' },
    { value: '#FF4500', name: 'Orange Red' },
];

const initialPlateFills = {
    background: 'white', outerBorder: 'white', outerRing: 'white', middleRing: 'white', centerStar: 'white',
    centerStarFill: 'white', centerStarInner: 'white', centerCircle: 'white',
    ...Object.fromEntries([...Array(8).keys()].flatMap(i => [
        [`petal${i}`, 'white'], [`petalFill${i}`, 'white'], [`petalInner${i}`, 'white'],
        [`starPoint${i}`, 'white'], [`starPointFill${i}`, 'white'], [`starPointCircle${i}`, 'white'],
        [`diamond${i}`, 'white'], [`diamondFill${i}`, 'white'], [`rosettePetal${i}`, 'white'],
    ])),
};

const initialMandalaFills = {
    background: 'white', outerRing1: 'white', outerRing2: 'white', middleRing1: 'white',
    centerCircle1: 'white', centerCircle2: 'white', centerCircle3: 'white',
    ...Object.fromEntries([...Array(24).keys()].map(i => [`scallop${i}`, 'white'])),
    ...Object.fromEntries([...Array(12).keys()].flatMap(i => [
        [`largePetal${i}`, 'white'], [`largePetalInner${i}`, 'white'], [`largePetalCircle${i}`, 'white'],
        [`middleRingDot${i}`, 'white'], [`smallPetal${i}`, 'white'],
    ])),
};

const initialFloralFills = {
    background: 'white', centerFlowerMiddle: 'white', centerFlowerCore: 'white',
    ...Object.fromEntries([...Array(8).keys()].map(i => [`leaf${i+1}`, 'white'])),
    ...Object.fromEntries([...Array(6).keys()].map(i => [`centerFlowerPetal${i}`, 'white'])),
    ...Object.fromEntries([...Array(5).keys()].flatMap(i => [
        [`cornerFlower1Petal${i}`, 'white'], [`cornerFlower2Petal${i}`, 'white'],
        [`cornerFlower3Petal${i}`, 'white'], [`cornerFlower4Petal${i}`, 'white'],
    ])),
    ...Object.fromEntries([...Array(4).keys()].map(i => [`cornerFlower${i+1}Middle`, 'white'])),
};


const artworks = [
    { id: 'plate', name: 'Geometric Plate', component: GeometricPlateArt, initialFills: initialPlateFills },
    { id: 'mandala', name: 'Lotus Mandala', component: MandalaArt, initialFills: initialMandalaFills },
    { id: 'floral', name: 'Floral Pattern', component: FloralPatternArt, initialFills: initialFloralFills },
];


export default function ColoringPage() {
    const [selectedArtId, setSelectedArtId] = useState(artworks[0].id);
    const [selectedColor, setSelectedColor] = useState(colors[0].value);
    const [fills, setFills] = useState(artworks[0].initialFills);

    const handleArtSelection = (artId: string) => {
        const newArt = artworks.find(art => art.id === artId);
        if (newArt) {
            setSelectedArtId(artId);
            setFills(newArt.initialFills);
        }
    };

    const handleFill = (part: string) => {
        setFills(prevFills => ({
            ...prevFills,
            [part]: selectedColor,
        }));
    };

    const resetColors = () => {
        const currentArt = artworks.find(art => art.id === selectedArtId);
        if (currentArt) {
            setFills(currentArt.initialFills);
        }
    };

    const CurrentArt = artworks.find(art => art.id === selectedArtId);

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-headline tracking-wide">Interactive Coloring Book</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80">
          Unwind and get creative. Select a pattern to begin.
        </p>
      </div>
      
      <div className="flex justify-center gap-4 mb-8">
        {artworks.map(art => (
            <Button
                key={art.id}
                variant={selectedArtId === art.id ? 'default' : 'outline'}
                onClick={() => handleArtSelection(art.id)}
            >
                {art.name}
            </Button>
        ))}
      </div>

      <Card className="w-full max-w-5xl mx-auto parchment">
        <CardHeader>
          <div className="flex items-center justify-center gap-4">
            <Brush className="h-8 w-8 text-primary" />
            <CardTitle className="font-headline text-3xl">{CurrentArt?.name}</CardTitle>
          </div>
          <CardDescription className="text-center">Click on a color, then click on a part of the drawing to fill it.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="w-full lg:w-3/4">
                <div className="relative bg-white rounded-md overflow-hidden border-2 border-border shadow-lg p-4">
                   {CurrentArt && <CurrentArt.component fills={fills} onFill={handleFill} />}
                </div>
            </div>
            <div className="w-full lg:w-1/4">
                 <h3 className="font-headline text-xl mb-4">Color Palette</h3>
                 <div className="grid grid-cols-4 gap-2 mb-6">
                    {colors.map(color => (
                         <button
                            key={color.value}
                            title={color.name}
                            onClick={() => setSelectedColor(color.value)}
                            className={cn(
                                "w-full aspect-square rounded-full transition-all duration-150 ease-in-out border-2",
                                selectedColor === color.value ? 'ring-2 ring-offset-2 ring-primary border-white' : 'border-transparent'
                            )}
                            style={{ backgroundColor: color.value }}
                         />
                    ))}
                 </div>
                 <Button onClick={resetColors} variant="outline" className="w-full">
                    <Undo2 className="mr-2 h-4 w-4" />
                    Reset Colors
                 </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

