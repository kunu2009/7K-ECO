
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
import { FileText, Layers, ListChecks, Star, PlayCircle } from 'lucide-react';
import { studyMaterials } from '@/data/study-materials';

type ChapterPageProps = {
  params: {
    id: string;
  };
};

export default function ChapterPage({ params }: ChapterPageProps) {
  const chapterId = parseInt(params.id, 10);
  const chapter = chapters.find((c) => c.id === chapterId);

  if (!chapter || !studyMaterials[chapterId]) {
    notFound();
  }

  const materials = studyMaterials[chapterId];

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <ChapterHeader title={chapter.title} />
      <main className="mt-8">
        <Tabs defaultValue="summary" className="w-full">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-5 bg-card/80 backdrop-blur-sm sticky top-0 z-20">
            <TabsTrigger value="summary"><FileText className="w-4 h-4 mr-2"/>Summary</TabsTrigger>
            <TabsTrigger value="flashcards"><Layers className="w-4 h-4 mr-2"/>Flashcards</TabsTrigger>
            <TabsTrigger value="mcqs"><ListChecks className="w-4 h-4 mr-2"/>MCQs</TabsTrigger>
            <TabsTrigger value="must-know"><Star className="w-4 h-4 mr-2"/>Must Know</TabsTrigger>
            <TabsTrigger value="reels"><PlayCircle className="w-4 h-4 mr-2"/>Reels</TabsTrigger>
          </TabsList>
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
          <TabsContent value="reels" className="mt-6">
            <ReelsSection />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

export async function generateStaticParams() {
  return chapters.map((chapter) => ({
    id: chapter.id.toString(),
  }));
}
