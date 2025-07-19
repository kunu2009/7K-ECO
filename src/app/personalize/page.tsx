import CustomFlashcardsWidget from '@/components/CustomFlashcardsWidget';
import NoteTakingWidget from '@/components/NoteTakingWidget';

export default function PersonalizePage() {
  return (
    <div className="min-h-screen bg-background text-foreground p-4 sm:p-6 md:p-8">
      <header className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">
          Personalize Your Study
        </h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Create custom flashcards and manage your notes.
        </p>
      </header>
      <main className="space-y-8">
        <NoteTakingWidget />
        <CustomFlashcardsWidget />
      </main>
    </div>
  );
}
