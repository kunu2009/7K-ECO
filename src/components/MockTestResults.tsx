
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Award, Lightbulb, Repeat, Loader2 } from 'lucide-react';
import type { AnalyzeTestOutput } from '@/ai/flows/analyze-mock-test';

type MockTestResultsProps = {
    score: number;
    totalMarks: number;
    aiFeedback: AnalyzeTestOutput | null;
    isGeneratingFeedback: boolean;
    onReset: () => void;
};

export default function MockTestResults({ score, totalMarks, aiFeedback, isGeneratingFeedback, onReset }: MockTestResultsProps) {
    const percentage = Math.round((score / totalMarks) * 100);

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <Card className="text-center">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold">Test Complete!</CardTitle>
                    <CardDescription>Here's how you did.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-center gap-4 text-6xl font-bold text-primary">
                        <Award className="w-16 h-16"/>
                        <span>{score}</span>
                        <span className="text-4xl text-muted-foreground">/ {totalMarks}</span>
                    </div>
                     <p className="text-2xl mt-2 font-semibold">{percentage}%</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Lightbulb className="text-primary"/>
                        AI-Powered Feedback
                    </CardTitle>
                    <CardDescription>Here's a personalized study plan based on your results.</CardDescription>
                </CardHeader>
                <CardContent>
                    {isGeneratingFeedback && (
                        <div className="flex items-center justify-center gap-2 text-muted-foreground h-24">
                            <Loader2 className="w-6 h-6 animate-spin" />
                            <span>Analyzing your results...</span>
                        </div>
                    )}
                    {aiFeedback && (
                         <div className="space-y-4">
                            <p className="italic text-foreground">{aiFeedback.analysis}</p>
                            <ul className="space-y-3">
                                {aiFeedback.recommendations.map((rec, index) => (
                                    <li key={index} className="p-3 bg-muted/50 rounded-md">
                                        <p className="font-bold text-primary">{rec.concept}</p>
                                        <p className="text-muted-foreground">{rec.suggestion}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </CardContent>
            </Card>

             <div className="text-center">
                <Button onClick={onReset} size="lg">
                    <Repeat className="mr-2"/>
                    Take Again
                </Button>
            </div>
        </div>
    );
}
