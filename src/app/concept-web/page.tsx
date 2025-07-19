
import { Share2 } from 'lucide-react';
import ConceptWebClient from './ConceptWebClient';


export default function ConceptWebPage() {
  return (
    <div className="min-h-screen bg-background text-foreground p-4 sm:p-6 md:p-8">
      <header className="text-center mb-6 md:mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary flex items-center justify-center gap-4">
            <Share2 className="w-10 h-10" />
            Concept Connection Web
        </h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Visualize how different economic concepts are interconnected.
        </p>
      </header>
      <main>
        <ConceptWebClient />
      </main>
    </div>
  );
}
