
"use client";

import { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CheckCircle, XCircle, ArrowRight, Repeat, Award } from 'lucide-react';
import { cn } from '@/lib/utils';
import { studyMaterials } from '@/data/study-materials';
import { chapters } from '@/data/chapters';
import Link from 'next/link';

type MCQ = {
  question: string;
  options: string[];
  answer: string;
  chapterId: number;
};

const allMcqs: MCQ[] = chapters.flatMap(chapter =>
    studyMaterials[chapter.id]?.mcqs.map(mcq => ({ ...mcq, chapterId: chapter.id })) || []
);

const shuffleArray = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const TRIVIA_ROUND_LENGTH = 10;

export default function TriviaClient() {
    const [gameState, setGameState] = useState<'start' | 'playing' | 'end'>('start');
    const [questions, setQuestions] = useState<MCQ[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [score, setScore] = useState(0);

    const startNewGame = () => {
        const shuffledQuestions = shuffleArray([...allMcqs]).slice(0, TRIVIA_ROUND_LENGTH);
        setQuestions(shuffledQuestions);
        setCurrentIndex(0);
        setScore(0);
        setSelectedAnswer(null);
        setIsSubmitted(false);
        setGameState('playing');
    };

    const currentQuestion = useMemo(() => questions[currentIndex], [questions, currentIndex]);

    const handleAnswerSubmit = () => {
        if (!selectedAnswer) return;

        setIsSubmitted(true);
        if (selectedAnswer === currentQuestion.answer) {
            setScore(prev => prev + 1);
        }
    };

    const handleNextQuestion = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(prev => prev + 1);
            setSelectedAnswer(null);
            setIsSubmitted(false);
        } else {
            setGameState('end');
        }
    };

    const getOptionClass = (option: string) => {
        if (!isSubmitted) return "cursor-pointer";
        const isCorrect = option === currentQuestion.answer;
        const isSelected = option === selectedAnswer;

        if (isCorrect) return "text-green-600 dark:text-green-400 font-bold";
        if (isSelected && !isCorrect) return "text-red-600 dark:text-red-400 line-through";
        return "text-muted-foreground";
    };

    const getIcon = (option: string) => {
        if (!isSubmitted) return null;
        if (option === currentQuestion.answer) return <CheckCircle className="h-5 w-5 text-green-600" />;
        if (option === selectedAnswer) return <XCircle className="h-5 w-5 text-red-600" />;
        return <div className="h-5 w-5" />;
    };

    if (gameState === 'start') {
        return (
            <Card className="max-w-2xl mx-auto text-center">
                <CardHeader>
                    <CardTitle>Ready for a Challenge?</CardTitle>
                    <CardDescription>
                        Test your knowledge with a quick round of 10 random questions from all chapters.
                    </CardDescription>
                </CardHeader>
                <CardFooter>
                    <Button onClick={startNewGame} className="w-full" size="lg">Start Trivia</Button>
                </CardFooter>
            </Card>
        );
    }

    if (gameState === 'end') {
        return (
             <Card className="max-w-2xl mx-auto text-center">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold">Round Complete!</CardTitle>
                    <CardDescription>Here&apos;s how you did.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-center gap-4 text-6xl font-bold text-primary">
                        <Award className="w-16 h-16"/>
                        <span>{score}</span>
                        <span className="text-4xl text-muted-foreground">/ {questions.length}</span>
                    </div>
                </CardContent>
                <CardFooter className="flex-col sm:flex-row gap-4">
                    <Button onClick={startNewGame} className="w-full">
                        <Repeat className="mr-2" /> Play Again
                    </Button>
                     <Button asChild variant="outline" className="w-full">
                        <Link href="/">Back to Dashboard</Link>
                    </Button>
                </CardFooter>
            </Card>
        );
    }
    
    if (!currentQuestion) {
        return <p>Loading questions...</p>;
    }

    return (
        <Card className="max-w-3xl mx-auto">
            <CardHeader>
                <CardDescription>Question {currentIndex + 1} of {questions.length} | From Chapter {currentQuestion.chapterId}</CardDescription>
                <CardTitle>{currentQuestion.question}</CardTitle>
            </CardHeader>
            <CardContent>
                <RadioGroup onValueChange={setSelectedAnswer} value={selectedAnswer || ""} disabled={isSubmitted}>
                    {currentQuestion.options.map((option, index) => (
                        <div key={index} className="flex items-center space-x-3 mb-2 p-3 rounded-lg border has-[:checked]:bg-primary/10 has-[:checked]:border-primary">
                             <RadioGroupItem value={option} id={`q-o${index}`} />
                             <Label htmlFor={`q-o${index}`} className={cn("flex-grow text-base", getOptionClass(option))}>
                                {option}
                            </Label>
                            {getIcon(option)}
                        </div>
                    ))}
                </RadioGroup>
            </CardContent>
            <CardFooter className="justify-end">
                {isSubmitted ? (
                     <Button onClick={handleNextQuestion} size="lg">
                        {currentIndex === questions.length - 1 ? "Finish" : "Next Question"} <ArrowRight className="ml-2"/>
                    </Button>
                ) : (
                    <Button onClick={handleAnswerSubmit} disabled={!selectedAnswer} size="lg">
                        Check Answer
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
}

