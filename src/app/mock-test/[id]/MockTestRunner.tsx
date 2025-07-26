
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Timer, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { analyzeMockTest } from '@/ai/flows/analyze-mock-test';
import type { AnalyzeTestOutput } from '@/ai/flows/analyze-mock-test';
import MockTestResults from '@/components/MockTestResults';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { MockPaper, Question } from '@/data/mock-paper';

type UserAnswers = Record<string, string>; // Key: "sectionIndex-questionIndex", Value: answer

type MockTestClientProps = {
    paper: MockPaper;
};

export default function MockTestClient({ paper }: MockTestClientProps) {
    const [timeLeft, setTimeLeft] = useState(180 * 60); // 180 minutes for 80 marks
    const [isTestRunning, setIsTestRunning] = useState(false);
    const [showAnswers, setShowAnswers] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    const [userAnswers, setUserAnswers] = useState<UserAnswers>({});
    const [score, setScore] = useState(0);
    const [aiFeedback, setAiFeedback] = useState<AnalyzeTestOutput | null>(null);
    const [isGeneratingFeedback, setIsGeneratingFeedback] = useState(false);
    const { toast } = useToast();

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isTestRunning && timeLeft > 0) {
            timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
        } else if (isTestRunning && timeLeft === 0) {
            finishTest();
        }
        return () => clearTimeout(timer);
    }, [isTestRunning, timeLeft]);

    const formatTime = (seconds: number) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const startTest = () => {
        setIsTestRunning(true);
        setIsFinished(false);
        setTimeLeft(180 * 60);
        setUserAnswers({});
        setScore(0);
        setAiFeedback(null);
    };
    
    const handleAnswerChange = (sectionIndex: number, questionIndex: number, answer: string) => {
        setUserAnswers(prev => ({
            ...prev,
            [`${sectionIndex}-${questionIndex}`]: answer
        }));
    };

    const finishTest = async () => {
        setIsTestRunning(false);
        setIsFinished(true);
        setShowAnswers(true);

        let correctCount = 0;
        const incorrectForAI: { question: string, correctAnswer: string }[] = [];

        paper.sections.forEach((section, sectionIndex) => {
            section.questions.forEach((question, questionIndex) => {
                const answerKey = `${sectionIndex}-${questionIndex}`;
                const userAnswer = userAnswers[answerKey]?.trim().toLowerCase();
                const correctAnswer = question.answer.trim().toLowerCase().replace(/<\/?b>/g, '').replace(/<br\/>/g, ' ');

                // Simple scoring: check if the user's answer is a substring of the model answer for flexibility
                if (userAnswer && correctAnswer.includes(userAnswer)) {
                    correctCount += question.marks;
                } else if (userAnswer) { // only count as incorrect if an answer was given
                     incorrectForAI.push({ question: question.text, correctAnswer: question.answer });
                }
            });
        });

        setScore(correctCount);

        toast({
            title: "Test Finished!",
            description: `You scored ${correctCount} out of 80. Generating feedback...`,
        });

        try {
            setIsGeneratingFeedback(true);
            const feedback = await analyzeMockTest({ incorrectQuestions: incorrectForAI });
            setAiFeedback(feedback);
        } catch (e) {
            console.error(e);
            toast({
                title: "Error",
                description: "Could not generate AI feedback.",
                variant: "destructive"
            });
        } finally {
            setIsGeneratingFeedback(false);
        }
    }


    if (!isTestRunning && !isFinished) {
        return (
            <Card className="max-w-4xl mx-auto">
                <CardHeader>
                    <CardTitle>{paper.title}</CardTitle>
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
                    <Button onClick={startTest} className="w-full" size="lg">Start Test</Button>
                </CardFooter>
            </Card>
        );
    }
    
    if (isFinished) {
        return <MockTestResults
            score={score}
            totalMarks={80}
            aiFeedback={aiFeedback}
            isGeneratingFeedback={isGeneratingFeedback}
            onReset={startTest}
        />
    }
    
    const renderQuestionInput = (question: Question, sectionIndex: number, qIndex: number) => {
        const answerKey = `${sectionIndex}-${qIndex}`;
        if (question.options) {
             return (
                <RadioGroup value={userAnswers[answerKey] || ''} onValueChange={(value) => handleAnswerChange(sectionIndex, qIndex, value)}>
                    {question.options.map((option, optIndex) => (
                        <div key={optIndex} className="flex items-center space-x-2">
                             <RadioGroupItem value={option} id={`${answerKey}-${optIndex}`} />
                             <Label htmlFor={`${answerKey}-${optIndex}`}>{option}</Label>
                        </div>
                    ))}
                </RadioGroup>
            )
        }
        
        // For free-text questions
        if (question.marks >= 4) { // Assume longer answers for higher marks
             return <Textarea placeholder="Type your answer here..." value={userAnswers[answerKey] || ''} onChange={(e) => handleAnswerChange(sectionIndex, qIndex, e.target.value)} rows={5} />
        }
        
        return <Input placeholder="Type your answer here..." value={userAnswers[answerKey] || ''} onChange={(e) => handleAnswerChange(sectionIndex, qIndex, e.target.value)} />
    }

    return (
        <div className="max-w-5xl mx-auto">
            <div className="bg-card p-4 rounded-lg shadow-md sticky top-4 z-20 flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
                <h2 className="text-xl font-bold text-primary">{paper.title}</h2>
                <div className="flex flex-col sm:flex-row items-center gap-4">
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
                {paper.sections.map((section, sectionIndex) => (
                    <Card key={sectionIndex}>
                        <CardHeader>
                            <CardTitle>{section.title} (Marks: {section.totalMarks})</CardTitle>
                            {section.instructions && <CardDescription>{section.instructions}</CardDescription>}
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {section.questions.map((question, qIndex) => (
                                <div key={qIndex} className="p-4 border rounded-md space-y-4">
                                    <p className="font-semibold" dangerouslySetInnerHTML={{ __html: question.text }}></p>
                                    
                                    {renderQuestionInput(question, sectionIndex, qIndex)}
                                    
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
                <Button onClick={finishTest} size="lg">Finish Test</Button>
            </div>
        </div>
    );
}
