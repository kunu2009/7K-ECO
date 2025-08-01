
"use client";

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { EmblaCarouselType } from 'embla-carousel-react'
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useToast } from '@/hooks/use-toast';
import MnemonicGenerator from './MnemonicGenerator';

type Flashcard = {
  term: string;
  definition: string;
};

const FlashcardComponent = ({ card, onFlip }: { card: Flashcard, onFlip: () => void }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const hasFlipped = useRef(false);

  useEffect(() => {
      setIsFlipped(false);
      hasFlipped.current = false;
  }, [card]);

  const handleFlip = () => {
      setIsFlipped(!isFlipped);
      if (!hasFlipped.current) {
          onFlip();
          hasFlipped.current = true;
      }
  }

  return (
    <div className="perspective h-full" onClick={handleFlip}>
      <motion.div
        className="relative h-80 w-full cursor-pointer preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Front of the card */}
        <div className="absolute w-full h-full backface-hidden">
          <Card className="h-full bg-accent/20 border-accent relative">
            <MnemonicGenerator term={card.term} definition={card.definition} />
            <CardContent className="flex flex-col items-center justify-center p-6 h-full text-center">
              <p className="text-muted-foreground text-sm mb-4">Term</p>
              <h3 className="text-xl md:text-2xl font-bold font-headline text-accent-foreground break-words">{card.term}</h3>
            </CardContent>
          </Card>
        </div>

        {/* Back of the card */}
        <div className="absolute w-full h-full backface-hidden rotate-y-180">
          <Card className="h-full bg-card border-border">
             <CardContent className="flex flex-col items-center justify-center p-6 h-full text-center">
              <p className="text-muted-foreground text-sm mb-4">Definition</p>
              <p className="text-sm md:text-md font-code text-foreground">{card.definition}</p>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
};


export default function FlashcardSection({ flashcards }: { flashcards: Flashcard[] }) {
  const [api, setApi] = useState<EmblaCarouselType>()
  const [jumpTo, setJumpTo] = useState("");
  const { toast } = useToast();
  
  if (!flashcards || flashcards.length === 0) {
    return (
      <Alert variant="destructive">
        <Terminal className="h-4 w-4" />
        <AlertTitle>Content Not Found</AlertTitle>
        <AlertDescription>No flashcards available for this chapter.</AlertDescription>
      </Alert>
    );
  }

  const handleJump = (e: React.FormEvent) => {
    e.preventDefault();
    const slideNum = parseInt(jumpTo, 10);
    if (api && !isNaN(slideNum) && slideNum > 0 && slideNum <= flashcards.length) {
      api.scrollTo(slideNum - 1);
    } else {
        toast({
            title: "Invalid number",
            description: `Please enter a number between 1 and ${flashcards.length}.`,
            variant: "destructive",
        })
    }
    setJumpTo("");
  }


  return (
    <div className="w-full p-4 md:p-6">
      <Carousel className="w-full max-w-xl mx-auto" opts={{ loop: true }} setApi={setApi}>
        <CarouselContent>
          {flashcards.map((card, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <FlashcardComponent card={card} onFlip={() => {}}/>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:inline-flex" />
        <CarouselNext className="hidden sm:inline-flex" />
      </Carousel>
       <form onSubmit={handleJump} className="mt-4 flex gap-2 justify-center items-center">
            <Input
                type="number"
                min="1"
                max={flashcards.length}
                value={jumpTo}
                onChange={e => setJumpTo(e.target.value)}
                placeholder={`Jump to card (1-${flashcards.length})`}
                className="w-48"
            />
            <Button type="submit">Jump</Button>
       </form>
    </div>
  );
}
