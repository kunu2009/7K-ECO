"use client";

import { useState, useEffect } from 'react';
import { generateMcqsAction } from '@/app/actions';
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal, CheckCircle, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';


type MCQ = {
  question: string;
  options: string[];
  answer: string;
};

const McqSkeleton = () => (
    <div className="space-y-6">
        {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i}>
                <CardHeader>
                    <Skeleton className="h-6 w-3/4" />
                </CardHeader>
                <CardContent className="space-y-4">
                    <Skeleton className="h-5 w-1/2" />
                    <Skeleton className="h-5 w-1/2" />
                    <Skeleton className="h-5 w-1/2" />
                    <Skeleton className="h-5 w-1/2" />
                </CardContent>
            </Card>
        ))}
    </div>
);


export default function McqSection({ chapterContent }: { chapterContent: string }) {
    const [mcqs, setMcqs] = useState<MCQ[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
    const [submitted, setSubmitted] = useState(false);
    const { toast } = useToast();

    useEffect(() => {
        const fetchMcqs = async () => {
            setLoading(true);
            setError(null);
            const result = await generateMcqsAction(chapterContent);

            if (result.success && result.data) {
                setMcqs(result.data);
            } else {
                setError(result.error || 'An unknown error occurred.');
                toast({
                    variant: "destructive",
                    title: "Error generating MCQs",
                    description: result.error || "Please try again later.",
                });
            }
            setLoading(false);
        };
        fetchMcqs();
    }, [chapterContent, toast]);

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


    if (loading) return <McqSkeleton />;
    
    if (error) {
        return (
            <Alert variant="destructive">
                <Terminal className="h-4 w-4" />
                <AlertTitle>Generation Failed</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        );
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
