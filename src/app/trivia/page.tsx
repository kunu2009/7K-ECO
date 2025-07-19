
import { Puzzle } from 'lucide-react';
import TriviaClient from '@/components/TriviaClient';

export default function TriviaPage() {
  return (
    <div className="min-h-screen bg-background text-foreground p-4 sm:p-6 md:p-8">
      <header className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary flex items-center justify-center gap-4">
          <Puzzle className="w-10 h-10" />
          Trivia Challenge
        </h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Take a quick break and test your knowledge with 10 random questions!
        </p>
      </header>
      <main>
        <TriviaClient />
      </main>
    </div>
  );
}
