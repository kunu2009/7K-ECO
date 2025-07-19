
"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal, CheckCircle, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from './ui/input';
import { useToast } from '@/hooks/use-toast';

type MCQ = {
  question: string;
  options: string[];
  answer: string;
};

export default function McqSection({ mcqs }: { mcqs: MCQ[] }) {
    const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
    const [submitted, setSubmitted] = useState(false);
    const [jumpTo, setJumpTo] = useState("");
    const { toast } = useToast();

    if (!mcqs || mcqs.length === 0) {
        return (
            <Alert variant="destructive">
                <Terminal className="h-4 w-4" />
                <AlertTitle>Content Not Found</AlertTitle>
                <AlertDescription>No MCQs available for this chapter.</AlertDescription>
            </Alert>
        );
    }

    const handleAnswerChange = (mcqIndex: number, value: string) => {
        setUserAnswers(prev => ({ ...prev, [mcqIndex]: value }));
    };

    const handleSubmit = () => {
        setSubmitted(true);
        // scroll to top to show results summary
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleReset = () => {
        setUserAnswers({});
        setSubmitted(false);
    }
    
    const getOptionClass = (mcqIndex: number, option: string) => {
        if (!submitted) return "cursor-pointer";
        const correctAnswer = mcqs[mcqIndex].answer;
        const userAnswer = userAnswers[mcqIndex];

        if (option === correctAnswer) return "text-green-600 dark:text-green-400";
        if (option === userAnswer && option !== correctAnswer) return "text-red-600 dark:text-red-400";
        return "";
    };
    
    const getIcon = (mcqIndex: number, option: string) => {
        if (!submitted) return null;
        const correctAnswer = mcqs[mcqIndex].answer;
        const userAnswer = userAnswers[mcqIndex];

        if (option === correctAnswer) return <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />;
        if (option === userAnswer && option !== correctAnswer) return <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />;
        return <div className="h-5 w-5" />; // placeholder for alignment
    }

    const calculateScore = () => {
        return Object.entries(userAnswers).reduce((score, [index, answer]) => {
            if (mcqs[parseInt(index)].answer === answer) {
                return score + 1;
            }
            return score;
        }, 0);
    }

    const handleJump = (e: React.FormEvent) => {
        e.preventDefault();
        const qNum = parseInt(jumpTo, 10);
        if (!isNaN(qNum) && qNum > 0 && qNum <= mcqs.length) {
            const element = document.getElementById(`mcq-${qNum - 1}`);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        } else {
             toast({
                title: "Invalid number",
                description: `Please enter a number between 1 and ${mcqs.length}.`,
                variant: "destructive",
            })
        }
        setJumpTo("");
    }


    return (
        <div className="space-y-6">
            {submitted && (
                <Card className="bg-card sticky top-4 z-10 shadow-lg">
                    <CardHeader>
                        <CardTitle>Results</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">You scored {calculateScore()} out of {mcqs.length}</p>
                        <p className="text-muted-foreground">Correct answers are marked in green, incorrect selections in red.</p>
                         <form onSubmit={handleJump} className="mt-4 flex gap-2 items-center">
                            <Input
                                type="number"
                                min="1"
                                max={mcqs.length}
                                value={jumpTo}
                                onChange={e => setJumpTo(e.target.value)}
                                placeholder={`Jump to question (1-${mcqs.length})`}
                                className="w-48"
                            />
                            <Button type="submit">Jump</Button>
                        </form>
                        <Button onClick={handleReset} variant="outline" className="mt-4">
                            Try Again
                        </Button>
                    </CardContent>
                </Card>
            )}

            {mcqs.map((mcq, index) => (
                <Card key={index} id={`mcq-${index}`} className="bg-card">
                    <CardHeader>
                        <CardTitle className="font-headline text-lg">{index + 1}. {mcq.question}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <RadioGroup
                            onValueChange={(value) => handleAnswerChange(index, value)}
                            disabled={submitted}
                            value={userAnswers[index]}
                        >
                            {mcq.options.map((option, optionIndex) => (
                                <div key={optionIndex} className="flex items-center space-x-3 mb-2">
                                    <RadioGroupItem value={option} id={`q${index}-o${optionIndex}`} />
                                    <Label htmlFor={`q${index}-o${optionIndex}`} className={cn("flex-grow", getOptionClass(index, option))}>
                                        {option}
                                    </Label>
                                    {getIcon(index, option)}
                                </div>
                            ))}
                        </RadioGroup>
                    </CardContent>
                </Card>
            ))}
            
            <div className="flex justify-end sticky bottom-4">
                {!submitted ? (
                    <Button onClick={handleSubmit} size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg">Check Answers</Button>
                ) : (
                    <Button onClick={handleReset} size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground shadow-lg">Try Again</Button>
                )}
            </div>
        </div>
    );
}
