import MockTestClient from './MockTestClient';

export default function MockTestPage() {
  return (
    <div className="min-h-screen bg-background text-foreground p-4 sm:p-6 md:p-8">
      <header className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">
          Mock Test
        </h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Test your knowledge under exam conditions with a full 80-mark paper.
        </p>
      </header>
      <main>
        <MockTestClient />
      </main>
    </div>
  );
}
