
"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { studyMaterials } from '@/data/study-materials';
import { chapters } from '@/data/chapters';
import { Layers, ListChecks, CheckCircle, XCircle, ArrowLeft, ArrowRight, Bookmark } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import MnemonicGenerator from './MnemonicGenerator';

type ContentType = 'flashcard' | 'mcq';

export type BookmarkedItem = {
    type: ContentType;
    chapterId: number;
    item: Flashcard | MCQ;
    timestamp: number;
}

type Flashcard = {
  term: string;
  definition: string;
};

type MCQ = {
  question: string;
  options: string[];
  answer: string;
};

type AllContent<T> = {
    item: T;
    chapterId: number;
}

const allFlashcards: AllContent<Flashcard>[] = chapters.flatMap(chapter =>
    studyMaterials[chapter.id]?.flashcards.map(card => ({ item: card, chapterId: chapter.id })) || []
);

const allMcqs: AllContent<MCQ>[] = chapters.flatMap(chapter =>
    studyMaterials[chapter.id]?.mcqs.map(mcq => ({ item: mcq, chapterId: chapter.id })) || []
);

const useBookmarks = () => {
    const [bookmarks, setBookmarks] = useState<BookmarkedItem[]>([]);
    const { toast } = useToast();

    useEffect(() => {
        try {
            const savedBookmarks = localStorage.getItem('bookmarks');
            if (savedBookmarks) {
                setBookmarks(JSON.parse(savedBookmarks));
            }
        } catch (error) {
            console.error("Could not load bookmarks", error);
        }
    }, []);

    const saveBookmarks = (newBookmarks: BookmarkedItem[]) => {
        setBookmarks(newBookmarks);
        localStorage.setItem('bookmarks', JSON.stringify(newBookmarks));
    };

    const isBookmarked = (type: ContentType, chapterId: number, item: Flashcard | MCQ) => {
        return bookmarks.some(b => b.type === type && b.chapterId === chapterId && JSON.stringify(b.item) === JSON.stringify(item));
    };

    const toggleBookmark = (type: ContentType, chapterId: number, item: Flashcard | MCQ) => {
        let updatedBookmarks;
        if (isBookmarked(type, chapterId, item)) {
            updatedBookmarks = bookmarks.filter(b => !(b.type === type && b.chapterId === chapterId && JSON.stringify(b.item) === JSON.stringify(item)));
            toast({ title: "Bookmark removed!" });
        } else {
            const newBookmark: BookmarkedItem = { type, chapterId, item, timestamp: Date.now() };
            updatedBookmarks = [...bookmarks, newBookmark];
            toast({ title: "Bookmark added!" });
        }
        saveBookmarks(updatedBookmarks);
    };

    return { bookmarks, isBookmarked, toggleBookmark };
}


const FlashcardWidget = ({ card, chapterId, onNext, onPrev, currentIndex, totalCount }: { card: Flashcard; chapterId: number; onNext: () => void; onPrev: () => void; currentIndex: number; totalCount: number; }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const { isBookmarked, toggleBookmark } = useBookmarks();

  useEffect(() => {
    setIsFlipped(false);
  }, [card]);

  return (
    <div className="h-full flex flex-col">
       <div className="flex justify-between items-center mb-2 relative">
         <p className="text-muted-foreground text-sm">From <Link href={`/chapter/${chapterId}`} className="font-bold underline">Chapter {chapterId}</Link></p>
         <div>
            <MnemonicGenerator term={card.term} definition={card.definition} />
             <Button variant="ghost" size="icon" onClick={() => toggleBookmark('flashcard', chapterId, card)} title="Bookmark card">
                 <Bookmark className={cn("w-5 h-5", isBookmarked('flashcard', chapterId, card) ? 'text-yellow-500 fill-yellow-400' : 'text-muted-foreground')} />
             </Button>
         </div>
       </div>
      <div className="perspective flex-grow" onClick={() => setIsFlipped(!isFlipped)}>
        <motion.div
          className="relative h-64 w-full cursor-pointer preserve-3d"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute w-full h-full backface-hidden">
            <Card className="h-full bg-accent/20 border-accent">
              <CardContent className="flex flex-col items-center justify-center p-6 h-full text-center">
                <h3 className="text-xl font-bold font-headline text-accent-foreground">{card.term}</h3>
              </CardContent>
            </Card>
          </div>
          <div className="absolute w-full h-full backface-hidden rotate-y-180">
            <Card className="h-full bg-card border-border">
              <CardContent className="flex flex-col items-center justify-center p-6 h-full text-center">
                <p className="text-md font-code text-foreground">{card.definition}</p>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
      <div className="flex items-center justify-between mt-4">
        <Button variant="outline" size="sm" onClick={onPrev} disabled={currentIndex === 0}>
            <ArrowLeft className="mr-2 h-4 w-4"/> Prev
        </Button>
        <p className="text-sm text-muted-foreground">{currentIndex + 1} / {totalCount}</p>
        <Button variant="outline" size="sm" onClick={onNext} disabled={currentIndex === totalCount - 1}>
            Next <ArrowRight className="ml-2 h-4 w-4"/>
        </Button>
      </div>
    </div>
  );
};

const McqWidget = ({ mcq, chapterId, onNext, onPrev, currentIndex, totalCount }: { mcq: MCQ, chapterId: number, onNext: () => void, onPrev: () => void; currentIndex: number; totalCount: number; }) => {
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [submitted, setSubmitted] = useState(false);
    const { isBookmarked, toggleBookmark } = useBookmarks();


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

    const handleNext = () => {
        if (submitted) {
            onNext();
        } else {
            setSubmitted(true);
        }
    }

    return (
        <Card className="bg-card h-full flex flex-col">
            <CardHeader>
                <div className="flex justify-between items-start gap-4">
                  <CardTitle className="font-headline text-md">
                      From <Link href={`/chapter/${chapterId}`} className="font-bold underline">Chapter {chapterId}</Link>: {mcq.question}
                  </CardTitle>
                   <Button variant="ghost" size="icon" onClick={() => toggleBookmark('mcq', chapterId, mcq)} title="Bookmark question" className="flex-shrink-0">
                      <Bookmark className={cn("w-5 h-5", isBookmarked('mcq', chapterId, mcq) ? 'text-yellow-500 fill-yellow-400' : 'text-muted-foreground')} />
                   </Button>
                </div>
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
            <div className="p-6 pt-0 flex items-center justify-between">
                 <Button variant="outline" size="sm" onClick={onPrev} disabled={currentIndex === 0}>
                    <ArrowLeft className="mr-2 h-4 w-4"/> Prev
                </Button>
                <p className="text-sm text-muted-foreground">{currentIndex + 1} / {totalCount}</p>
                 <Button onClick={handleNext} disabled={!selectedAnswer && !submitted}>
                    {submitted ? "Next" : "Check"} <ArrowRight className="ml-2 w-4 h-4"/>
                </Button>
            </div>
        </Card>
    );
};


export default function DashboardWidgets() {
    const [flashcardIndex, setFlashcardIndex] = useState(0);
    const [mcqIndex, setMcqIndex] = useState(0);

    const currentFlashcardData = allFlashcards[flashcardIndex];
    const currentMcqData = allMcqs[mcqIndex];

    const handleNextFlashcard = () => {
        setFlashcardIndex(prev => Math.min(prev + 1, allFlashcards.length - 1));
    };

    const handlePrevFlashcard = () => {
        setFlashcardIndex(prev => Math.max(prev - 1, 0));
    };

    const handleNextMcq = () => {
        setMcqIndex(prev => Math.min(prev + 1, allMcqs.length - 1));
    };

    const handlePrevMcq = () => {
        setMcqIndex(prev => Math.max(prev - 1, 0));
    };


  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="flex flex-col">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4 gap-4">
            <h3 className="flex items-center text-2xl font-bold font-headline"><Layers className="mr-3 text-primary"/> Flashcard Review</h3>
        </div>
         {currentFlashcardData ? (
            <FlashcardWidget
                card={currentFlashcardData.item}
                chapterId={currentFlashcardData.chapterId}
                onNext={handleNextFlashcard}
                onPrev={handlePrevFlashcard}
                currentIndex={flashcardIndex}
                totalCount={allFlashcards.length}
            />
         ) : <p>Loading...</p>}
      </div>
      <div className="flex flex-col">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4 gap-4">
            <h3 className="flex items-center text-2xl font-bold font-headline"><ListChecks className="mr-3 text-primary"/> MCQ Challenge</h3>
        </div>
        {currentMcqData ? (
            <McqWidget
                mcq={currentMcqData.item}
                chapterId={currentMcqData.chapterId}
                onNext={handleNextMcq}
                onPrev={handlePrevMcq}
                currentIndex={mcqIndex}
                totalCount={allMcqs.length}
            />
        ) : <p>Loading...</p>}
      </div>
    </div>
  );
}
