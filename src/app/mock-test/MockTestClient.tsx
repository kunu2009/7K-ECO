
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Timer, Eye, EyeOff } from 'lucide-react';
import { mockPaper } from '@/data/mock-paper';

export default function MockTestClient() {
    const [timeLeft, setTimeLeft] = useState(180 * 60); // 180 minutes for 80 marks
    const [isTestRunning, setIsTestRunning] = useState(false);
    const [showAnswers, setShowAnswers] = useState(false);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isTestRunning && timeLeft > 0) {
            timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
        } else if (isTestRunning && timeLeft === 0) {
            setIsTestRunning(false);
            alert("Time's up!");
        }
        return () => clearTimeout(timer);
    }, [isTestRunning, timeLeft]);

    const formatTime = (seconds: number) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    if (!isTestRunning) {
        return (
            <Card className="max-w-4xl mx-auto">
                <CardHeader>
                    <CardTitle>80-Mark Mock Examination</CardTitle>
                    <CardDescription>
                        This is a full-length mock paper designed to simulate exam conditions.
                        You will have 3 hours to complete the paper. Click "Start Test" when you are ready.
                    </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                    <div className="text-2xl font-bold flex items-center justify-center gap-4">
                        <Timer className="w-8 h-8"/>
                        <span>Duration: 3 Hours</span>
                    </div>
                    <p className="text-muted-foreground mt-2">Total Marks: 80</p>
                </CardContent>
                <CardFooter>
                    <Button onClick={() => setIsTestRunning(true)} className="w-full" size="lg">Start Test</Button>
                </CardFooter>
            </Card>
        );
    }
    
    return (
        <div className="max-w-5xl mx-auto">
            <div className="bg-card p-4 rounded-lg shadow-md sticky top-4 z-20 flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
                <h2 className="text-xl font-bold text-primary">Mock Paper</h2>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 font-mono text-lg font-bold bg-destructive text-destructive-foreground px-3 py-1 rounded-md">
                        <Timer className="w-5 h-5"/>
                        {formatTime(timeLeft)}
                    </div>
                    <Button variant="outline" size="sm" onClick={() => setShowAnswers(!showAnswers)}>
                        {showAnswers ? <EyeOff className="mr-2"/> : <Eye className="mr-2"/>}
                        {showAnswers ? 'Hide Answers' : 'Show Answers'}
                    </Button>
                </div>
            </div>

            <div className="space-y-6">
                {mockPaper.sections.map((section, sectionIndex) => (
                    <Card key={sectionIndex}>
                        <CardHeader>
                            <CardTitle>{section.title} (Marks: {section.totalMarks})</CardTitle>
                            {section.instructions && <CardDescription>{section.instructions}</CardDescription>}
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {section.questions.map((question, qIndex) => (
                                <div key={qIndex} className="p-4 border rounded-md">
                                    <p className="font-semibold" dangerouslySetInnerHTML={{ __html: question.text }}></p>
                                    {question.options && (
                                        <ul className="list-disc pl-5 mt-2 space-y-1">
                                            {question.options.map((opt, optIndex) => <li key={optIndex}>{opt}</li>)}
                                        </ul>
                                    )}
                                     <Accordion type="single" collapsible className="w-full mt-2">
                                        <AccordionItem value="item-1">
                                            <AccordionTrigger className={showAnswers ? "text-primary" : "text-muted-foreground"}>
                                                {showAnswers ? 'Hide Answer' : 'Show Answer'}
                                            </AccordionTrigger>
                                            <AccordionContent>
                                                <p className="text-green-700 dark:text-green-400 font-semibold" dangerouslySetInnerHTML={{ __html: question.answer }}></p>
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                ))}
            </div>
             <div className="mt-8 text-center">
                <Button onClick={() => { setIsTestRunning(false); setTimeLeft(180 * 60); setShowAnswers(false); }} size="lg">Finish and Reset Test</Button>
            </div>
        </div>
    );
}
