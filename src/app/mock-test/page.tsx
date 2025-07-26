
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { FileText, Timer } from 'lucide-react';

const mockPapers = [
  { id: 1, title: 'Mock Paper - Set 1', description: 'The original mock paper covering a wide range of topics.' },
  { id: 2, title: 'Mock Paper - Set 2', description: 'A new set of questions to test your comprehensive knowledge.' },
  { id: 3, title: 'Mock Paper - Set 3', description: 'A challenging paper focusing on application and analysis.' },
];

export default function MockTestPage() {
  return (
    <div className="min-h-screen bg-background text-foreground p-4 sm:p-6 md:p-8">
      <header className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary flex items-center justify-center gap-4">
            <Timer className="w-10 h-10" />
            Mock Test Center
        </h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Choose a paper to test your knowledge under exam conditions.
        </p>
      </header>
      <main className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockPapers.map((paper) => (
            <Link href={`/mock-test/${paper.id}`} key={paper.id} passHref>
              <Card className="h-full flex flex-col hover:shadow-lg hover:-translate-y-1 transition-transform duration-300 ease-in-out bg-card border-border cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 font-headline">
                    <div className="bg-primary/20 text-primary p-2 rounded-md">
                      <FileText className="w-6 h-6" />
                    </div>
                    <span>{paper.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardDescription>{paper.description}</CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
