import StudyBuddyClient from '@/components/StudyBuddyClient';
import { Bot } from 'lucide-react';

export default function StudyBuddyPage() {
  return (
    <div className="flex h-screen flex-col bg-background">
      <header className="flex items-center gap-4 border-b bg-card p-4">
        <Bot className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-xl font-bold font-headline">Eco - Your Study Buddy</h1>
          <p className="text-sm text-muted-foreground">
            Ask me anything about 12th Grade Economics!
          </p>
        </div>
      </header>
      <main className="flex-1 overflow-hidden">
        <StudyBuddyClient />
      </main>
    </div>
  );
}
