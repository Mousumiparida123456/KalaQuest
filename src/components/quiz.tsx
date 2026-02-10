'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { mysteryQuizzes } from '@/lib/data';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CheckCircle2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export function Quiz() {
  const { toast } = useToast();
  const [quizState, setQuizState] = useState<"not-started" | "story" | "in-progress" | "completed">("not-started");
  const [storyIndex, setStoryIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);

  const currentMystery = mysteryQuizzes[0];

  const handleStartQuiz = () => {
    setQuizState("story");
  };

  const handleNextStory = () => {
    if (storyIndex < currentMystery.story.length - 1) {
      setStoryIndex(storyIndex + 1);
    } else {
      setQuizState("in-progress");
    }
  };

  const handleSubmitAnswer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAnswer) {
      toast({
        variant: "destructive",
        title: "Please select an answer.",
      });
      return;
    }

    const currentQuestion = currentMystery.questions[currentQuestionIndex];
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore(score + 1);
      toast({
        title: "Correct!",
        description: "You're one step closer to solving the mystery.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Not quite...",
        description: "That's not the right answer. Keep trying!",
      });
    }

    setSelectedAnswer(null);
    if (currentQuestionIndex < currentMystery.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizState("completed");
    }
  };

  const handleRestartQuiz = () => {
    setQuizState("not-started");
    setStoryIndex(0);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
  };

  const renderQuizContent = () => {
    switch (quizState) {
      case "story":
        return (
          <div className="text-center">
            <h3 className="font-headline text-2xl mb-4">The Story</h3>
            <p className="font-body text-lg text-foreground/90 space-y-6 max-w-3xl mx-auto mb-6">
              {currentMystery.story[storyIndex]}
            </p>
            <Button onClick={handleNextStory}>
              {storyIndex < currentMystery.story.length - 1 ? "Next" : "Start Quiz"}
            </Button>
          </div>
        );
      case "in-progress":
        const question = currentMystery.questions[currentQuestionIndex];
        return (
          <form onSubmit={handleSubmitAnswer} className="max-w-2xl mx-auto">
            <h3 className="text-lg font-headline mb-2 text-center">
              Question {currentQuestionIndex + 1} / {currentMystery.questions.length}
            </h3>
            <p className="text-xl font-body mb-6 text-center">{question.question}</p>
            <RadioGroup onValueChange={setSelectedAnswer} value={selectedAnswer || ""} className="space-y-4 mb-8">
              {question.options.map((option) => (
                <div key={option} className="flex items-center space-x-2 parchment p-4 rounded-md border">
                  <RadioGroupItem value={option} id={option} />
                  <Label htmlFor={option} className="text-lg cursor-pointer flex-1">{option}</Label>
                </div>
              ))}
            </RadioGroup>
            <div className="flex justify-center">
                <Button type="submit" disabled={!selectedAnswer}>
                Submit Answer
                </Button>
            </div>
          </form>
        );
      case "completed":
        return (
          <Alert className="bg-primary/10 border-primary/20 text-center">
            <CheckCircle2 className="h-5 w-5 text-primary mx-auto mb-2" />
            <AlertTitle className="font-headline text-xl text-primary">
              Congratulations!
            </AlertTitle>
            <AlertDescription className="text-foreground/90 mb-4">
              You have solved the mystery of the Persian Glaze! You answered {score} out of {currentMystery.questions.length} questions correctly.
            </AlertDescription>
            <Button onClick={handleRestartQuiz}>Play Again</Button>
          </Alert>
        );
      case "not-started":
      default:
        return (
          <div className="text-center">
             <p className="font-headline text-muted-foreground text-sm">
              Current Mystery
            </p>
            <CardTitle className="font-headline text-3xl md:text-4xl">
              {currentMystery.title}
            </CardTitle>
            <CardDescription className="max-w-3xl mx-auto pt-2 text-base mb-6">
              {currentMystery.description}
            </CardDescription>
            <Button onClick={handleStartQuiz}>Begin The Quest</Button>
          </div>
        );
    }
  };

  return (
    <Card className="w-full parchment">
        <CardHeader>
        </CardHeader>
        <CardContent>
            {renderQuizContent()}
        </CardContent>
    </Card>
  );
}
