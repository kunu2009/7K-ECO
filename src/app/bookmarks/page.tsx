
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bookmark, Layers, ListChecks, Trash2 } from 'lucide-react';
import type { BookmarkedItem } from '@/components/DashboardWidgets';
import { studyMaterials } from '@/data/study-materials';
import { chapters } from '@/data/chapters';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';


const getChapterTitle = (chapterId: number) => {
  const chapter = chapters.find(c => c.id === chapterId);
  return chapter ? `Chapter ${chapterId}: ${chapter.title}` : `Chapter ${chapterId}`;
};

const FlashcardBookmark = ({ bookmark, onRemove }: { bookmark: BookmarkedItem; onRemove: (bookmark: BookmarkedItem) => void }) => {
  const card = bookmark.item as { term: string, definition: string };
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-start">
            <div>
                 <CardTitle className="flex items-center text-lg"><Layers className="mr-3 text-primary"/> {card.term}</CardTitle>
                 <CardDescription>
                    Flashcard from <Link href={`/chapter/${bookmark.chapterId}`} className="underline hover:text-primary">{getChapterTitle(bookmark.chapterId)}</Link>
                 </CardDescription>
            </div>
            <Button variant="ghost" size="icon" onClick={() => onRemove(bookmark)} title="Remove bookmark">
                <Trash2 className="w-5 h-5 text-destructive"/>
            </Button>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{card.definition}</p>
      </CardContent>
    </Card>
  );
};

const McqBookmark = ({ bookmark, onRemove }: { bookmark: BookmarkedItem; onRemove: (bookmark: BookmarkedItem) => void }) => {
    const mcq = bookmark.item as { question: string, options: string[], answer: string };
    
    return (
        <Card className="w-full">
            <CardHeader>
                 <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="flex items-center text-lg"><ListChecks className="mr-3 text-primary"/> {mcq.question}</CardTitle>
                         <CardDescription>
                            MCQ from <Link href={`/chapter/${bookmark.chapterId}`} className="underline hover:text-primary">{getChapterTitle(bookmark.chapterId)}</Link>
                         </CardDescription>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => onRemove(bookmark)} title="Remove bookmark">
                        <Trash2 className="w-5 h-5 text-destructive"/>
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <RadioGroup defaultValue={mcq.answer} disabled>
                    {mcq.options.map((option, index) => (
                        <div key={index} className="flex items-center space-x-2">
                            <RadioGroupItem value={option} id={`bm-q${bookmark.timestamp}-o${index}`} />
                            <Label htmlFor={`bm-q${bookmark.timestamp}-o${index}`} className={cn(option === mcq.answer && "text-green-600 font-bold")}>
                                {option}
                            </Label>
                        </div>
                    ))}
                </RadioGroup>
            </CardContent>
        </Card>
    )
}

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState<BookmarkedItem[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    try {
      const savedBookmarks = localStorage.getItem('bookmarks');
      if (savedBookmarks) {
        setBookmarks(JSON.parse(savedBookmarks).sort((a: BookmarkedItem, b: BookmarkedItem) => b.timestamp - a.timestamp));
      }
    } catch (error) {
      console.error("Could not load bookmarks", error);
    }
  }, []);

  const removeBookmark = (bookmarkToRemove: BookmarkedItem) => {
    const updatedBookmarks = bookmarks.filter(b => b.timestamp !== bookmarkToRemove.timestamp);
    setBookmarks(updatedBookmarks);
    localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
    toast({
        title: "Bookmark Removed",
        variant: "destructive"
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-4 sm:p-6 md:p-8">
      <header className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary flex items-center justify-center gap-4">
          <Bookmark className="w-10 h-10" />
          My Bookmarks
        </h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Your saved flashcards and questions for quick review.
        </p>
      </header>
      <main className="max-w-4xl mx-auto">
        {bookmarks.length > 0 ? (
          <div className="space-y-6">
            {bookmarks.map(bookmark => {
              if (bookmark.type === 'flashcard') {
                return <FlashcardBookmark key={bookmark.timestamp} bookmark={bookmark} onRemove={removeBookmark} />;
              }
              if (bookmark.type === 'mcq') {
                return <McqBookmark key={bookmark.timestamp} bookmark={bookmark} onRemove={removeBookmark} />;
              }
              return null;
            })}
          </div>
        ) : (
          <div className="text-center bg-card p-8 rounded-lg">
            <h3 className="text-2xl font-bold">No Bookmarks Yet!</h3>
            <p className="text-muted-foreground mt-2">
              You can bookmark flashcards and MCQs from the dashboard.
            </p>
            <Button asChild className="mt-4">
              <Link href="/">Go to Dashboard</Link>
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
