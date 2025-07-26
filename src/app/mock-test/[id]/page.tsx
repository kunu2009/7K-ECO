
import MockTestClient from './MockTestRunner';
import { notFound } from 'next/navigation';
import { mockPaper as mockPaper1 } from '@/data/mock-paper';
import { mockPaper2 } from '@/data/mock-paper-2';
import { mockPaper3 } from '@/data/mock-paper-3';
import { Timer } from 'lucide-react';
import type { MockPaper } from '@/data/mock-paper';

type MockTestPageProps = {
  params: {
    id: string;
  };
};

const getMockPaper = (id: string): MockPaper | null => {
  switch (id) {
    case '1': return mockPaper1;
    case '2': return mockPaper2;
    case '3': return mockPaper3;
    default: return null;
  }
};

export default function MockTestRunnerPage({ params }: MockTestPageProps) {
  const paper = getMockPaper(params.id);

  if (!paper) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-4 sm:p-6 md:p-8">
      <header className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary flex items-center justify-center gap-4">
            <Timer className="w-10 h-10" />
            {paper.title}
        </h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Test your knowledge under exam conditions.
        </p>
      </header>
      <main>
        <MockTestClient paper={paper} />
      </main>
    </div>
  );
}
