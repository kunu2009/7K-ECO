import Link from 'next/link';
import { BookOpen } from 'lucide-react';
import { chapters } from '@/data/chapters';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import DashboardWidgets from '@/components/DashboardWidgets';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground p-4 sm:p-6 md:p-8">
      <header className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">
          EcoLearn
        </h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Your AI-powered guide to 12th Grade Economics
        </p>
      </header>
      <main>
        <DashboardWidgets />
        <h2 className="text-3xl font-bold font-headline mt-12 mb-6 text-center text-foreground">
          Chapters
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {chapters.map((chapter) => (
            <Link href={`/chapter/${chapter.id}`} key={chapter.id} passHref>
              <Card className="h-full flex flex-col hover:shadow-lg hover:-translate-y-1 transition-transform duration-300 ease-in-out bg-card border-border cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 font-headline">
                    <div className="bg-primary/20 text-primary p-2 rounded-md">
                      <BookOpen className="w-6 h-6" />
                    </div>
                    <span>
                      Chapter {chapter.id}: {chapter.title}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardDescription>{chapter.description}</CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>
      <footer className="text-center mt-12 text-muted-foreground text-sm">
        <p>Maharashtra Board Arts Economics Textbook - Arthshastra</p>
      </footer>
    </div>
  );
}
