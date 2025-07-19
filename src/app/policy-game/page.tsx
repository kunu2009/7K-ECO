import PolicyGameClient from './PolicyGameClient';
import { Gamepad } from 'lucide-react';

export default function PolicyGamePage() {
  return (
    <div className="min-h-screen bg-background text-foreground p-4 sm:p-6 md:p-8">
      <header className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary flex items-center justify-center gap-4">
            <Gamepad className="w-10 h-10" />
            Fiscal Policy Challenge
        </h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Can you manage the economy? Make decisions and see their impact.
        </p>
      </header>
      <main>
        <PolicyGameClient />
      </main>
    </div>
  );
}
