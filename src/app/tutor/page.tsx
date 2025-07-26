
import { MessageSquare } from 'lucide-react';
import TutorClient from '@/components/TutorClient';


export default function TutorPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col h-screen">
      <header className="text-center mb-6 mt-8 md:mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary flex items-center justify-center gap-4">
            <MessageSquare className="w-10 h-10" />
            AI Economics Tutor
        </h1>
        <p className="text-muted-foreground mt-2 text-lg max-w-2xl mx-auto">
          Ask any question about your 12th-grade economics syllabus.
        </p>
      </header>
      <main className="flex-1 overflow-y-auto p-4">
        <TutorClient />
      </main>
    </div>
  );
}
