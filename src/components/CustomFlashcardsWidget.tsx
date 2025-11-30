
"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { PlusCircle, Trash2, ArrowLeft, ArrowRight, Layers } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type Flashcard = {
  id: number;
  term: string;
  definition: string;
};

const CustomFlashcard = ({ card, onDelete }: { card: Flashcard; onDelete: (id: number) => void; }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    
    useEffect(() => {
        setIsFlipped(false);
    }, [card]);

    return (
        <div className="h-full flex flex-col">
            <div className="perspective flex-grow" onClick={() => setIsFlipped(!isFlipped)}>
                <motion.div
                    className="relative h-64 w-full cursor-pointer preserve-3d"
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="absolute w-full h-full backface-hidden">
                        <Card className="h-full bg-primary/20 border-primary">
                            <CardContent className="flex flex-col items-center justify-center p-6 h-full text-center">
                                <h3 className="text-xl font-bold font-headline text-primary-foreground">{card.term}</h3>
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
            <div className="flex items-center justify-center mt-4">
                <Button variant="destructive" size="sm" onClick={(e) => { e.stopPropagation(); onDelete(card.id); }}>
                    <Trash2 className="mr-2 h-4 w-4" /> Delete Card
                </Button>
            </div>
        </div>
    );
};

export default function CustomFlashcardsWidget() {
    const [customCards, setCustomCards] = useState<Flashcard[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [newTerm, setNewTerm] = useState('');
    const [newDefinition, setNewDefinition] = useState('');
    const { toast } = useToast();
    
    useEffect(() => {
        try {
            const savedCards = localStorage.getItem('customFlashcards');
            if (savedCards) {
                setCustomCards(JSON.parse(savedCards));
            }
        } catch (error) {
            console.error("Could not load flashcards from local storage", error);
        }
    }, []);

    const saveCardsToLocalStorage = (cards: Flashcard[]) => {
        try {
            localStorage.setItem('customFlashcards', JSON.stringify(cards));
        } catch (error) {
            console.error("Could not save flashcards to local storage", error);
        }
    };

    const handleAddCard = () => {
        if (newTerm.trim() === '' || newDefinition.trim() === '') {
            toast({
                title: "Incomplete fields",
                description: "Please fill out both term and definition.",
                variant: "destructive",
            });
            return;
        }
        const newCard: Flashcard = {
            id: Date.now(),
            term: newTerm,
            definition: newDefinition
        };
        const updatedCards = [...customCards, newCard];
        setCustomCards(updatedCards);
        saveCardsToLocalStorage(updatedCards);
        setNewTerm('');
        setNewDefinition('');
        setCurrentIndex(updatedCards.length - 1); // Jump to the new card
        toast({
            title: "Success",
            description: "New flashcard created!",
        });
    };

    const handleDeleteCard = (id: number) => {
        const updatedCards = customCards.filter(card => card.id !== id);
        setCustomCards(updatedCards);
        saveCardsToLocalStorage(updatedCards);
        if (currentIndex >= updatedCards.length && updatedCards.length > 0) {
            setCurrentIndex(updatedCards.length - 1);
        } else if (updatedCards.length === 0) {
            setCurrentIndex(0);
        }
        toast({
            title: "Card Deleted",
            description: "Your custom flashcard has been removed.",
            variant: "destructive"
        });
    };

    const handleNext = () => {
        setCurrentIndex(prev => Math.min(prev + 1, customCards.length - 1));
    };

    const handlePrev = () => {
        setCurrentIndex(prev => Math.max(prev - 1, 0));
    };

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="flex items-center"><Layers className="mr-3 text-primary"/> Custom Flashcards</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h4 className="font-bold mb-4">Create a New Card</h4>
                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="term">Term</Label>
                                <Input id="term" value={newTerm} onChange={e => setNewTerm(e.target.value)} placeholder="e.g., Opportunity Cost"/>
                            </div>
                            <div>
                                <Label htmlFor="definition">Definition</Label>
                                <Textarea id="definition" value={newDefinition} onChange={e => setNewDefinition(e.target.value)} placeholder="e.g., The value of the next-best alternative..."/>
                            </div>
                            <Button onClick={handleAddCard}>
                                <PlusCircle className="mr-2 h-4 w-4"/> Add Card
                            </Button>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4">Review Your Cards</h4>
                        {customCards.length > 0 ? (
                            <div className="flex flex-col">
                                <CustomFlashcard card={customCards[currentIndex]} onDelete={handleDeleteCard} />
                                <div className="flex items-center justify-between mt-4">
                                    <Button variant="outline" size="sm" onClick={handlePrev} disabled={currentIndex === 0}>
                                        <ArrowLeft className="mr-2 h-4 w-4"/> Prev
                                    </Button>
                                    <p className="text-sm text-muted-foreground">{currentIndex + 1} / {customCards.length}</p>
                                    <Button variant="outline" size="sm" onClick={handleNext} disabled={currentIndex === customCards.length - 1}>
                                        Next <ArrowRight className="ml-2 h-4 w-4"/>
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center justify-center h-64 bg-muted/50 rounded-lg">
                                <p className="text-muted-foreground">You haven&apos;t created any cards yet.</p>
                            </div>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
