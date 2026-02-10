
'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Undo2, Award } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

// --- Pot SVG Components ---

const PotteryWheelBase = () => (
    <g>
        <path d="M 50,380 H 350" stroke="#6D4C41" strokeWidth="4" />
        <ellipse cx="200" cy="380" rx="150" ry="15" fill="#A1887F" />
        <rect x="150" y="380" width="100" height="20" fill="#795548" />
    </g>
);

const ClayLump = () => (
    <svg viewBox="0 0 400 400" className="w-full h-auto drop-shadow-lg">
        <PotteryWheelBase />
        <defs>
            <radialGradient id="clayGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="0%" style={{stopColor: '#D2B48C', stopOpacity: 1}} />
                <stop offset="100%" style={{stopColor: '#A0522D', stopOpacity: 1}} />
            </radialGradient>
        </defs>
        <ellipse cx="200" cy="300" rx="100" ry="70" fill="url(#clayGradient)" />
        <path d="M 120,300 C 150,260 250,260 280,300" fill="#B9916F" opacity="0.5"/>
    </svg>
);

const CenteredClay = () => (
    <svg viewBox="0 0 400 400" className="w-full h-auto drop-shadow-lg">
        <PotteryWheelBase />
        <path d="M 150,370 C 150,300 200,200 200,200 C 200,200 250,300 250,370 Z" fill="#CD853F" />
        <path d="M 160,370 C 160,320 200,230 200,230 C 200,230 240,320 240,370 Z" fill="#D2B48C" />
    </svg>
);


const ClayWithHole = () => (
    <svg viewBox="0 0 400 400" className="w-full h-auto drop-shadow-lg">
        <PotteryWheelBase />
        <path d="M 140,370 C 140,300 150,240 200,240 C 250,240 260,300 260,370 Z" fill="#B98C64" />
        <ellipse cx="200" cy="250" rx="40" ry="15" fill="#8C6442"/>
    </svg>
);

const PulledPot = () => (
    <svg viewBox="0 0 400 400" className="w-full h-auto drop-shadow-lg">
        <PotteryWheelBase />
        <path d="M 150,370 C 150,200 250,200 250,370 Z" fill="#CD853F" />
        <path d="M 160,370 C 160,210 240,210 240,370 Z" fill="#D2B48C" />
        <ellipse cx="200" cy="205" rx="50" ry="10" fill="#A0522D" />
    </svg>
);


const ShapedPot = () => (
    <svg viewBox="0 0 400 400" className="w-full h-auto drop-shadow-lg">
        <PotteryWheelBase />
        <path d="M 120,370 C 100,270 100,220 150,170 C 170,150 230,150 250,170 C 300,220 300,270 280,370 Z" fill="#CD853F" />
        <path d="M 150,170 C 140,160 260,160 250,170 C 240,180 160,180 150,170 Z" fill="#8B4513" />
        <ellipse cx="200" cy="170" rx="50" ry="10" fill="#A0522D" />
    </svg>
);


const PotWithHandles = () => (
    <svg viewBox="0 0 400 400" className="w-full h-auto drop-shadow-lg">
        <PotteryWheelBase />
        <path d="M 120,370 C 100,270 100,220 150,170 C 170,150 230,150 250,170 C 300,220 300,270 280,370 Z" fill="#CD853F" />
        <path d="M 150,170 C 140,160 260,160 250,170 C 240,180 160,180 150,170 Z" fill="#8B4513" />
        <ellipse cx="200" cy="170" rx="50" ry="10" fill="#A0522D" />
        <path d="M 250,170 C 280,170 290,240 270,240" stroke="#8B4513" strokeWidth="15" fill="none" strokeLinecap="round" />
        <path d="M 150,170 C 120,170 110,240 130,240" stroke="#8B4513" strokeWidth="15" fill="none" strokeLinecap="round" />
    </svg>
);

const PaintedPot = () => (
    <svg viewBox="0 0 400 400" className="w-full h-auto drop-shadow-lg">
        {/* Pot body */}
        <path d="M 120,350 C 100,250 100,200 150,150 C 170,130 230,130 250,150 C 300,200 300,250 280,350 Z" fill="#CD853F" />
        {/* Patterns */}
        <path d="M 130,240 L 150,260 L 170,240 L 190,260 L 210,240 L 230,260 L 250,240 L 270,260" stroke="#1C1C1C" strokeWidth="8" fill="none" />
        <path d="M 140,290 C 160,280 180,280 200,290 C 220,300 240,300 260,290" stroke="#1C1C1C" strokeWidth="6" fill="none" strokeLinecap="round" />
        {/* Pot mouth */}
        <path d="M 150,150 C 140,140 260,140 250,150 C 240,160 160,160 150,150 Z" fill="#1C1C1C" stroke="#1C1C1C" strokeWidth="4" />
        <ellipse cx="200" cy="150" rx="50" ry="10" fill="#3A2D1C" />
        {/* Handles */}
        <path d="M 250,150 C 280,150 290,220 270,220" stroke="#1C1C1C" strokeWidth="15" fill="none" strokeLinecap="round" />
        <path d="M 150,150 C 120,150 110,220 130,220" stroke="#1C1C1C" strokeWidth="15" fill="none" strokeLinecap="round" />
    </svg>
);

const FiredPot = () => (
    <svg viewBox="0 0 400 400" className="w-full h-auto drop-shadow-lg">
        <defs>
            <filter id="glossy" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur" />
                <feOffset in="blur" dx="2" dy="2" result="offsetBlur" />
                <feSpecularLighting in="blur" surfaceScale="5" specularConstant=".75" specularExponent="20" lightingColor="#FFF" result="specOut">
                    <fePointLight x="-5000" y="-10000" z="20000" />
                </feSpecularLighting>
                <feComposite in="specOut" in2="SourceAlpha" operator="in" result="specOut" />
                <feComposite in="SourceGraphic" in2="specOut" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" result="litPaint" />
                <feMerge>
                    <feMergeNode in="offsetBlur" />
                    <feMergeNode in="litPaint" />
                </feMerge>
            </filter>
        </defs>
        <g filter="url(#glossy)">
            {/* Pot body */}
            <path d="M 120,350 C 100,250 100,200 150,150 C 170,130 230,130 250,150 C 300,200 300,250 280,350 Z" fill="#CD853F" />
            {/* Patterns */}
            <path d="M 130,240 L 150,260 L 170,240 L 190,260 L 210,240 L 230,260 L 250,240 L 270,260" stroke="#1C1C1C" strokeWidth="8" fill="none" />
            <path d="M 140,290 C 160,280 180,280 200,290 C 220,300 240,300 260,290" stroke="#1C1C1C" strokeWidth="6" fill="none" strokeLinecap="round" />
            {/* Pot mouth */}
            <path d="M 150,150 C 140,140 260,140 250,150 C 240,160 160,160 150,150 Z" fill="#1C1C1C" stroke="#1C1C1C" strokeWidth="4" />
            <ellipse cx="200" cy="150" rx="50" ry="10" fill="#3A2D1C" />
            {/* Handles */}
            <path d="M 250,150 C 280,150 290,220 270,220" stroke="#1C1C1C" strokeWidth="15" fill="none" strokeLinecap="round" />
            <path d="M 150,150 C 120,150 110,220 130,220" stroke="#1C1C1C" strokeWidth="15" fill="none" strokeLinecap="round" />
        </g>
    </svg>
);


// --- Stepper Component ---
const Stepper = ({ steps, currentStep }: { steps: string[], currentStep: number }) => {
    return (
        <div className="flex items-center w-full">
            {steps.map((step, index) => (
                <div key={step} className="flex items-center w-full">
                    <div className="flex flex-col items-center">
                        <div
                            className={cn(
                                "w-8 h-8 rounded-full flex items-center justify-center font-bold text-lg transition-colors duration-300",
                                index < currentStep ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                            )}
                        >
                            {index + 1}
                        </div>
                        <p className={cn(
                            "text-sm mt-2 text-center",
                            index < currentStep ? 'font-semibold text-primary' : 'text-muted-foreground'
                        )}>
                            {step}
                        </p>
                    </div>
                    {index < steps.length - 1 && (
                        <div className={cn(
                            "flex-1 h-1 transition-colors duration-300",
                            index < currentStep -1 ? 'bg-primary' : 'bg-muted'
                        )}></div>
                    )}
                </div>
            ))}
        </div>
    );
};


const potterySteps = ['Center', 'Open', 'Pull', 'Shape', 'Handles', 'Paint', 'Fire', 'Complete'];
const potteryActions = ['Center Clay', 'Open Center', 'Pull Walls', 'Shape Body', 'Add Handles', 'Paint Design', 'Fire in Kiln'];

export default function PotteryAdventurePage() {
    const [currentStep, setCurrentStep] = useState(0);

    const handleNextStep = () => {
        if (currentStep < potterySteps.length) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handleReset = () => {
        setCurrentStep(0);
    };

    const renderPotStage = () => {
        switch (currentStep) {
            case 0: return <ClayLump />;
            case 1: return <CenteredClay />;
            case 2: return <ClayWithHole />;
            case 3: return <PulledPot />;
            case 4: return <ShapedPot />;
            case 5: return <PotWithHandles />;
            case 6: return <PaintedPot />;
            case 7: return <FiredPot />;
            case 8: return <FiredPot />;
            default: return <ClayLump />;
        }
    };
    
    const getButtonText = () => {
        if (currentStep === 0) return 'Start Crafting';
        if (currentStep >= potterySteps.length) return 'Create Another';
        return potteryActions[currentStep-1];
    }
    
    const handleButtonClick = () => {
        if (currentStep >= potterySteps.length) {
            handleReset();
        } else {
            handleNextStep();
        }
    }

    const renderInstructions = () => {
        const instructions = [
            "Start with a fresh lump of clay. Click 'Start Crafting' to place it on the wheel.",
            "The first and most important step. Click 'Center Clay' to get it perfectly balanced on the wheel.",
            "Gently press your thumb into the center of the spinning clay. Click 'Open Center' to create the initial opening.",
            "Use your hands to slowly pull the walls of the pot upwards. Click 'Pull Walls' to give your pot some height.",
            "Carefully apply pressure to shape the body of the pot. Click 'Shape Body' to create a beautiful curve.",
            "Roll out two pieces of clay and attach them to the sides. Click 'Add Handles' to complete the form.",
            "Now for the creative part! Add your designs. Click 'Paint Design' to decorate your pot.",
            "The pot is ready for the kiln. Click 'Fire in Kiln' to harden it and reveal its glossy finish.",
            "Your masterpiece is complete! You can admire your work or create another.",
        ];
        return instructions[currentStep] || instructions[0];
    };

    return (
        <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-headline tracking-wide">Pottery Studio</h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80">
                    Create your own artifact, one step at a time.
                </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-2">
                    <Card className="w-full parchment min-h-[500px] flex flex-col justify-between p-6">
                        <div className="flex-grow flex items-center justify-center">
                             <div key={currentStep} className="w-full max-w-sm animate-fade-in">
                               {currentStep >= potterySteps.length ? (
                                 <div className='flex flex-col items-center gap-4'>
                                    <Alert className="bg-primary/10 border-primary/20 text-center">
                                        <Award className="h-5 w-5 text-primary mx-auto mb-2" />
                                        <AlertTitle className="font-headline text-xl text-primary">
                                            Masterpiece Complete!
                                        </AlertTitle>
                                        <AlertDescription className="text-foreground/90 mb-4">
                                            You've successfully crafted your artifact.
                                        </AlertDescription>
                                    </Alert>
                                    <div className="mt-4">
                                        <FiredPot />
                                    </div>
                                 </div>
                               ) : renderPotStage()}
                             </div>
                        </div>
                        <div className="w-full max-w-3xl mx-auto pt-8">
                           <Stepper steps={potterySteps} currentStep={currentStep} />
                        </div>
                    </Card>
                </div>

                <div className="flex flex-col gap-6 sticky top-24">
                     <Card className="parchment">
                        <CardHeader>
                            <CardTitle className="font-headline text-xl">
                                {currentStep === 0 && 'Your Workstation'}
                                {currentStep > 0 && currentStep < 8 && `Step ${currentStep}: ${potterySteps[currentStep - 1]}`}
                                {currentStep >= 8 && 'Complete!'}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-foreground/80">{renderInstructions()}</p>
                        </CardContent>
                    </Card>
                     <div className="flex flex-col gap-2">
                        <Button onClick={handleButtonClick} size="lg">
                            {getButtonText()}
                        </Button>
                        <Button onClick={handleReset} variant="outline" className="w-full">
                           <Undo2 className="mr-2 h-4 w-4" />
                           Reset
                        </Button>
                        <Button variant="link" asChild>
                            <Link href="/">Back to menu</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
