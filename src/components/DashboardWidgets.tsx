
"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { studyMaterials } from '@/data/study-materials';
import { chapters } from '@/data/chapters';
import { Layers, ListChecks, CheckCircle, XCircle, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Input } from './ui/input';

type Flashcard = {
  term: string;
  definition: string;
};

type MCQ = {
  question: string;
  options: string[];
  answer: string;
};

const FlashcardWidget = ({ card, chapterId }: { card: Flashcard; chapterId: number }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    setIsFlipped(false);
  }, [card]);

  return (
    <div className="perspective" onClick={() => setIsFlipped(!isFlipped)}>
      <motion.div
        className="relative h-64 w-full cursor-pointer preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="absolute w-full h-full backface-hidden">
          <Card className="h-full bg-accent/20 border-accent">
            <CardContent className="flex flex-col items-center justify-center p-6 h-full text-center">
              <p className="text-muted-foreground text-sm mb-2">Term from <Link href={`/chapter/${chapterId}`} className="font-bold underline">Chapter {chapterId}</Link></p>
              <h3 className="text-xl font-bold font-headline text-accent-foreground">{card.term}</h3>
            </CardContent>
          </Card>
        </div>
        <div className="absolute w-full h-full backface-hidden rotate-y-180">
          <Card className="h-full bg-card border-border">
             <CardContent className="flex flex-col items-center justify-center p-6 h-full text-center">
              <p className="text-muted-foreground text-sm mb-2">Definition</p>
              <p className="text-md font-code text-foreground">{card.definition}</p>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
};

const McqWidget = ({ mcq, chapterId, onNext }: { mcq: MCQ, chapterId: number, onNext: () => void }) => {
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [submitted, setSubmitted] = useState(false);
    
    useEffect(() => {
        setSelectedAnswer(null);
        setSubmitted(false);
    }, [mcq]);

    const getOptionClass = (option: string) => {
        if (!submitted) return "";
        const correctAnswer = mcq.answer;
        if (option === correctAnswer) return "text-green-600 dark:text-green-400";
        if (option === selectedAnswer && option !== correctAnswer) return "text-red-600 dark:text-red-400";
        return "";
    };
    
    const getIcon = (option: string) => {
        if (!submitted) return null;
        const correctAnswer = mcq.answer;
        if (option === correctAnswer) return <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />;
        if (option === selectedAnswer && option !== correctAnswer) return <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />;
        return null;
    }

    return (
        <Card className="bg-card h-full flex flex-col">
            <CardHeader>
                <CardTitle className="font-headline text-md">
                    From <Link href={`/chapter/${chapterId}`} className="font-bold underline">Chapter {chapterId}</Link>: {mcq.question}
                </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
                <RadioGroup
                    onValueChange={(value) => setSelectedAnswer(value)}
                    disabled={submitted}
                    value={selectedAnswer || ''}
                >
                    {mcq.options.map((option, optionIndex) => (
                        <div key={optionIndex} className="flex items-center space-x-3 mb-2">
                            <RadioGroupItem value={option} id={`widget-q-o${optionIndex}`} />
                            <Label htmlFor={`widget-q-o${optionIndex}`} className={cn("flex-grow cursor-pointer", getOptionClass(option))}>
                                {option}
                            </Label>
                            {getIcon(option)}
                        </div>
                    ))}
                </RadioGroup>
            </CardContent>
            <div className="p-6 pt-0">
                {!submitted ? (
                    <Button onClick={() => setSubmitted(true)} disabled={!selectedAnswer} className="w-full">Check Answer</Button>
                ) : (
                    <Button onClick={onNext} className="w-full">Next Question <RefreshCw className="ml-2 w-4 h-4"/> </Button>
                )}
            </div>
        </Card>
    );
};

const getRandomItem = <T,>(items: T[]): T | undefined => {
    if (!items || items.length === 0) return undefined;
    return items[Math.floor(Math.random() * items.length)];
};

const getRandomItemFromAllChapters = <T,>(itemSelector: (material: typeof studyMaterials[number]) => T[]) => {
    const chapterIds = Object.keys(studyMaterials).map(Number);
    const randomChapterId = getRandomItem(chapterIds);

    if (!randomChapterId) return { item: undefined, chapterId: undefined };

    const items = itemSelector(studyMaterials[randomChapterId]);
    const randomItem = getRandomItem(items);

    return { item: randomItem, chapterId: randomChapterId };
}


export default function DashboardWidgets() {
    const [randomFlashcard, setRandomFlashcard] = useState<{card: Flashcard, chapterId: number} | null>(null);
    const [randomMcq, setRandomMcq] = useState<{mcq: MCQ, chapterId: number} | null>(null);

    const selectNewFlashcard = () => {
        const { item, chapterId } = getRandomItemFromAllChapters(m => m.flashcards);
        if (item && chapterId) {
            setRandomFlashcard({ card: item, chapterId });
        }
    };
    
    const selectNewMcq = () => {
        const { item, chapterId } = getRandomItemFromAllChapters(m => m.mcqs);
        if (item && chapterId) {
            setRandomMcq({ mcq: item, chapterId });
        }
    };

    useEffect(() => {
        selectNewFlashcard();
        selectNewMcq();
    }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div>
        <h3 className="flex items-center text-2xl font-bold font-headline mb-4"><Layers className="mr-3 text-primary"/> Flashcard of the Day</h3>
         {randomFlashcard ? (
            <FlashcardWidget card={randomFlashcard.card} chapterId={randomFlashcard.chapterId} />
         ) : <p>Loading...</p>}
         <Button variant="outline" size="sm" onClick={selectNewFlashcard} className="mt-4 w-full">
            <RefreshCw className="mr-2 h-4 w-4"/> New Card
         </Button>
      </div>
      <div>
        <h3 className="flex items-center text-2xl font-bold font-headline mb-4"><ListChecks className="mr-3 text-primary"/> MCQ Challenge</h3>
        {randomMcq ? (
            <McqWidget mcq={randomMcq.mcq} chapterId={randomMcq.chapterId} onNext={selectNewMcq}/>
        ) : <p>Loading...</p>}
      </div>
    </div>
  );
}
