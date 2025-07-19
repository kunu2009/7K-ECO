"use client";

import { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { studyMaterials } from '@/data/study-materials';
import { chapters } from '@/data/chapters';
import { cn } from '@/lib/utils';
import { CheckCircle, Timer, XCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

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
    return array.map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
};

export default function MockTestClient() {
    const [testState, setTestState] = useState<'settings' | 'running' | 'finished'>('settings');
    const [numQuestions, setNumQuestions] = useState(10);
    const [testDuration, setTestDuration] = useState(15); // in minutes
    const [timeLeft, setTimeLeft] = useState(0);
    
    const [questions, setQuestions] = useState<MCQ[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
    
    const score = useMemo(() => {
        return questions.reduce((acc, question, index) => {
            if (userAnswers[index] === question.answer) {
                return acc + 1;
            }
            return acc;
        }, 0);
    }, [questions, userAnswers]);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (testState === 'running' && timeLeft > 0) {
            timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
        } else if (testState === 'running' && timeLeft === 0) {
            setTestState('finished');
        }
        return () => clearTimeout(timer);
    }, [testState, timeLeft]);

    const startTest = () => {
        const shuffled = shuffleArray(allMcqs);
        setQuestions(shuffled.slice(0, numQuestions));
        setUserAnswers({});
        setCurrentQuestionIndex(0);
        setTimeLeft(testDuration * 60);
        setTestState('running');
    };

    const handleAnswerChange = (answer: string) => {
        setUserAnswers(prev => ({ ...prev, [currentQuestionIndex]: answer }));
    };

    const goToNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        } else {
            setTestState('finished');
        }
    };

    const resetTest = () => {
        setTestState('settings');
    }

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    if (testState === 'settings') {
        return (
            <Card className="max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle>Configure Your Mock Test</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex flex-col sm:flex-row items-center justify-between">
                        <Label htmlFor="num-questions" className="mb-2 sm:mb-0">Number of Questions</Label>
                        <Select value={String(numQuestions)} onValueChange={(val) => setNumQuestions(Number(val))}>
                            <SelectTrigger id="num-questions" className="w-full sm:w-[180px]">
                                <SelectValue placeholder="Select number of questions" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="10">10</SelectItem>
                                <SelectItem value="20">20</SelectItem>
                                <SelectItem value="30">30</SelectItem>
                                <SelectItem value="50">50</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center justify-between">
                        <Label htmlFor="duration" className="mb-2 sm:mb-0">Test Duration (minutes)</Label>
                         <Select value={String(testDuration)} onValueChange={(val) => setTestDuration(Number(val))}>
                            <SelectTrigger id="duration" className="w-full sm:w-[180px]">
                                <SelectValue placeholder="Select duration" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="15">15</SelectItem>
                                <SelectItem value="30">30</SelectItem>
                                <SelectItem value="45">45</SelectItem>
                                <SelectItem value="60">60</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button onClick={startTest} className="w-full">Start Test</Button>
                </CardFooter>
            </Card>
        );
    }

    if (testState === 'finished') {
        return (
            <Card className="max-w-2xl mx-auto">
                <CardHeader className="text-center">
                    <CardTitle>Test Over!</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                    <p className="text-4xl font-bold">Your Score: {score} / {questions.length}</p>
                    <p className="text-muted-foreground">You answered {score} out of {questions.length} questions correctly.</p>
                </CardContent>
                 <CardFooter className="flex-col gap-4">
                    <Button onClick={resetTest} className="w-full">Take Another Test</Button>
                    <div className="w-full max-h-80 overflow-y-auto space-y-4 p-4 border rounded-md">
                        <h3 className="font-bold text-lg">Review Your Answers</h3>
                        {questions.map((q, index) => (
                           <div key={index} className="p-2 border-b">
                                <p className="font-semibold">{index + 1}. {q.question}</p>
                                <p className={cn("text-sm", userAnswers[index] === q.answer ? "text-green-600" : "text-red-600")}>
                                    Your answer: {userAnswers[index] || "Not answered"}
                                </p>
                                <p className="text-sm text-green-700">Correct answer: {q.answer}</p>
                           </div>
                        ))}
                    </div>
                 </CardFooter>
            </Card>
        );
    }

    const currentQuestion = questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

    return (
        <Card className="max-w-4xl mx-auto">
            <CardHeader>
                <div className="flex justify-between items-center">
                    <CardTitle>Question {currentQuestionIndex + 1} of {questions.length}</CardTitle>
                    <div className="flex items-center gap-2 font-mono text-lg font-bold bg-destructive text-destructive-foreground px-3 py-1 rounded-md">
                        <Timer className="w-5 h-5"/>
                        {formatTime(timeLeft)}
                    </div>
                </div>
                <Progress value={progress} className="w-full mt-4" />
            </CardHeader>
            <CardContent>
                <p className="text-lg font-semibold mb-4">{currentQuestion.question}</p>
                 <RadioGroup
                    onValueChange={handleAnswerChange}
                    value={userAnswers[currentQuestionIndex]}
                >
                    {currentQuestion.options.map((option, optionIndex) => (
                        <div key={optionIndex} className="flex items-center space-x-3 mb-2 p-3 border rounded-md hover:bg-muted/50">
                            <RadioGroupItem value={option} id={`q${currentQuestionIndex}-o${optionIndex}`} />
                            <Label htmlFor={`q${currentQuestionIndex}-o${optionIndex}`} className="flex-grow cursor-pointer text-base">
                                {option}
                            </Label>
                        </div>
                    ))}
                </RadioGroup>
            </CardContent>
            <CardFooter className="justify-end">
                <Button onClick={goToNext}>
                    {currentQuestionIndex < questions.length - 1 ? "Next Question" : "Finish Test"}
                </Button>
            </CardFooter>
        </Card>
    );
}
