
"use client";

import { useState } from 'react';
import { chapters } from '@/data/chapters';
import { notFound } from 'next/navigation';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import ChapterHeader from '@/components/ChapterHeader';
import SummarySection from '@/components/SummarySection';
import FlashcardSection from '@/components/FlashcardSection';
import McqSection from '@/components/McqSection';
import MustKnowSection from '@/components/MustKnowSection';
import ReelsSection from '@/components/ReelsSection';
import { FileText, Layers, ListChecks, Star, PlayCircle, BarChart2 } from 'lucide-react';
import { studyMaterials } from '@/data/study-materials';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import InteractiveSupplyDemandChart from '@/components/InteractiveSupplyDemandChart';

type ChapterPageProps = {
  params: {
    id: string;
  };
};

export default function ChapterPage({ params }: ChapterPageProps) {
  const [activeTab, setActiveTab] = useState('summary');
  const chapterId = parseInt(params.id, 10);
  const chapter = chapters.find((c) => c.id === chapterId);

  if (!chapter || !studyMaterials[chapterId]) {
    notFound();
  }

  const materials = studyMaterials[chapterId];
  const isReelsActive = activeTab === 'reels';
  const showInteractiveChart = chapterId === 5; // Only show for Chapter 5: Supply Analysis

  return (
    <div className={cn("min-h-screen bg-background", !isReelsActive && "p-4 md:p-8")}>
      <div className={cn(isReelsActive && "hidden")}>
        <ChapterHeader title={chapter.title} />
      </div>
      <main className={cn(isReelsActive ? "h-screen" : "mt-8")}>
        <Tabs defaultValue="summary" onValueChange={setActiveTab} className="w-full h-full flex flex-col">
          <div className={cn(isReelsActive && "hidden")}>
            <ScrollArea className="w-full whitespace-nowrap">
              <TabsList className={cn("grid w-full bg-card/80 backdrop-blur-sm sticky top-0 z-20 sm:w-full", showInteractiveChart ? "grid-cols-6" : "grid-cols-5")}>
                <TabsTrigger value="summary"><FileText className="w-4 h-4 mr-2"/>Summary</TabsTrigger>
                <TabsTrigger value="flashcards"><Layers className="w-4 h-4 mr-2"/>Flashcards</TabsTrigger>
                <TabsTrigger value="mcqs"><ListChecks className="w-4 h-4 mr-2"/>MCQs</TabsTrigger>
                <TabsTrigger value="must-know"><Star className="w-4 h-4 mr-2"/>Must Know</TabsTrigger>
                {showInteractiveChart && (
                   <TabsTrigger value="interactive-chart"><BarChart2 className="w-4 h-4 mr-2"/>Interactive Chart</TabsTrigger>
                )}
                <TabsTrigger value="reels"><PlayCircle className="w-4 h-4 mr-2"/>Reels</TabsTrigger>
              </TabsList>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
          <TabsContent value="summary" className="mt-6">
            <SummarySection summary={materials.summary} />
          </TabsContent>
          <TabsContent value="flashcards" className="mt-6">
            <FlashcardSection flashcards={materials.flashcards} />
          </TabsContent>
          <TabsContent value="mcqs" className="mt-6">
             <McqSection mcqs={materials.mcqs} />
          </TabsContent>
          <TabsContent value="must-know" className="mt-6">
            <MustKnowSection mustKnow={materials.mustKnow} />
          </TabsContent>
           {showInteractiveChart && (
            <TabsContent value="interactive-chart" className="mt-6">
              <InteractiveSupplyDemandChart />
            </TabsContent>
          )}
          <TabsContent value="reels" className="h-full">
            <ReelsSection reels={materials.reels} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
