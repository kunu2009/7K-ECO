
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
import { studyMaterials, type StudyMaterials } from '@/data/study-materials';
import { type Chapter } from '@/data/chapters';
import { cn } from '@/lib/utils';
import ChapterInteractiveChart from '@/components/ChapterInteractiveChart';
import { interactiveCharts, type InteractiveChartConfig } from '@/data/interactive-charts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const buildMustKnowFallback = (chapterTitle: string): string[] => [
  `${chapterTitle}: Core highlights are being curated. Revisit the summary tab for now.`,
  'Use the flashcards to reinforce definitions while we finalize bite-sized notes.',
  'Bookmark this chapter—fresh “must-know” insights will drop shortly.',
];

const buildReelsFallback = (chapterTitle: string): StudyMaterials['reels'] => [
  {
    title: `${chapterTitle} – Reels arriving soon`,
    content: 'We are producing snackable revision reels for this topic. Stay tuned! meanwhile skim the summary for quick retention.',
    thumbnail: 'https://placehold.co/600x400',
    hint: 'hourglass',
  },
  {
    title: 'Use the tabs while you wait',
    content: 'Flip through flashcards or attempt MCQs to keep the concept fresh until the reels go live.',
    thumbnail: 'https://placehold.co/600x400',
    hint: 'cards',
  },
  {
    title: 'Need something specific?',
    content: 'Ping us from the feedback form if you want reels on a particular sub-topic first.',
    thumbnail: 'https://placehold.co/600x400',
    hint: 'chat',
  },
];

type ChapterPageProps = {
  params: {
    id: string;
  };
};

const getChapterData = (id: string) => {
  const chapterId = parseInt(id, 10);
  const chapter = chapters.find((c) => c.id === chapterId);
  const materials = studyMaterials[chapterId];
  const chartConfig = interactiveCharts[chapterId];
  if (!chapter || !materials) {
    return notFound();
  }
  return { chapter, materials, chapterId, chartConfig };
}

// This is a client component, but we can pass server-fetched data to it.
function ChapterClientComponent({ chapter, materials, chapterId, chartConfig }: { chapter: Chapter, materials: StudyMaterials, chapterId: number, chartConfig?: InteractiveChartConfig }) {
  const [activeTab, setActiveTab] = useState('summary');

  const isReelsActive = activeTab === 'reels';
  const hasInteractiveChart = Boolean(chartConfig);
  const safeMustKnow = materials.mustKnow?.length ? materials.mustKnow : buildMustKnowFallback(chapter.title);
  const safeReels = materials.reels?.length ? materials.reels : buildReelsFallback(chapter.title);

  return (
    <div className={cn("min-h-screen bg-background", !isReelsActive && "p-4 md:p-8")}>
      <div className={cn(isReelsActive && "hidden")}>
        <ChapterHeader title={chapter.title} />
      </div>
      <main className={cn(isReelsActive ? "h-screen" : "mt-8")}>
        <Tabs defaultValue="summary" onValueChange={setActiveTab} className="w-full h-full flex flex-col">
          <div className={cn(isReelsActive && "hidden")}>
            <TabsList className="h-auto flex-wrap justify-start">
              <TabsTrigger value="summary"><FileText className="w-4 h-4 mr-2"/>Summary</TabsTrigger>
              <TabsTrigger value="flashcards"><Layers className="w-4 h-4 mr-2"/>Flashcards</TabsTrigger>
              <TabsTrigger value="mcqs"><ListChecks className="w-4 h-4 mr-2"/>MCQs</TabsTrigger>
              <TabsTrigger value="must-know"><Star className="w-4 h-4 mr-2"/>Must Know</TabsTrigger>
                <TabsTrigger value="interactive-chart" disabled={!hasInteractiveChart}><BarChart2 className="w-4 h-4 mr-2"/>Interactive Chart</TabsTrigger>
              <TabsTrigger value="reels"><PlayCircle className="w-4 h-4 mr-2"/>Reels</TabsTrigger>
            </TabsList>
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
            <MustKnowSection mustKnow={safeMustKnow} />
          </TabsContent>
          <TabsContent value="interactive-chart" className="mt-6">
            {chartConfig ? (
              <ChapterInteractiveChart config={chartConfig} />
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Interactive chart coming soon</CardTitle>
                </CardHeader>
                <CardContent>
                  We are still building the visualization for this chapter. Check back shortly!
                </CardContent>
              </Card>
            )}
          </TabsContent>
          <TabsContent value="reels" className="h-full">
            <ReelsSection reels={safeReels} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}


export default function ChapterPage({ params }: ChapterPageProps) {
  // Data fetching happens here, on the server, before the client component renders.
  const { chapter, materials, chapterId, chartConfig } = getChapterData(params.id);

  // We then pass the resolved data as props to the client component.
  return <ChapterClientComponent chapter={chapter} materials={materials} chapterId={chapterId} chartConfig={chartConfig} />;
}
