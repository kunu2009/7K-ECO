
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal, PlayCircle } from 'lucide-react';
import Image from 'next/image';

type Reel = {
  title: string;
  content: string;
  thumbnail: string;
  hint: string;
};

export default function ReelsSection({ reels }: { reels: Reel[] }) {

  if (!reels || reels.length === 0) {
    return (
      <Alert variant="destructive">
        <Terminal className="h-4 w-4" />
        <AlertTitle>Content Not Found</AlertTitle>
        <AlertDescription>No reels available for this chapter.</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="w-full max-w-xl mx-auto">
        <h2 className="flex items-center text-2xl font-bold font-headline mb-4">
            <PlayCircle className="mr-3 text-primary"/> Educational Reels
        </h2>
        <p className="text-muted-foreground mb-6">
            Quick video-style explainers to help you visualize key concepts. Swipe to learn.
        </p>
      <Carousel className="w-full" opts={{ loop: true }}>
        <CarouselContent>
          {reels.map((reel, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                 <Card className="h-96 flex flex-col justify-between group overflow-hidden relative">
                    <Image
                        src={reel.thumbnail}
                        alt={reel.title}
                        width={600}
                        height={400}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        data-ai-hint={reel.hint}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
                    <CardHeader className="relative z-10 text-white">
                        <CardTitle>{reel.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="relative z-10 text-white/90">
                        <p>{reel.content}</p>
                    </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="ml-12"/>
        <CarouselNext className="mr-12"/>
      </Carousel>
    </div>
  );
};
