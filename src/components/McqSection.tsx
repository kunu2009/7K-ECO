
"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal, CheckCircle, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

type MCQ = {
  question: string;
  options: string[];
  answer: string;
};

export default function McqSection({ mcqs }: { mcqs: MCQ[] }) {
    const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
    const [submitted, setSubmitted] = useState(false);

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
    };
    
    const getOptionClass = (mcqIndex: number, option: string) => {
        if (!submitted) return "";
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
        return null;
    }

    return (
        <div className="space-y-6">
            {mcqs.map((mcq, index) => (
                <Card key={index} className="bg-card">
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
            {!submitted && mcqs.length > 0 && (
                <div className="flex justify-end">
                    <Button onClick={handleSubmit} className="bg-primary hover:bg-primary/90 text-primary-foreground">Check Answers</Button>
                </div>
            )}
        </div>
    );
}
