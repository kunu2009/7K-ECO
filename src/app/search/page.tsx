
"use client";

import { useSearchParams } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import { chapters } from '@/data/chapters';
import { studyMaterials } from '@/data/study-materials';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Link from 'next/link';
import { FileText, Layers, BookOpen, Search as SearchIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

type SearchResult = {
    type: 'Chapter' | 'Flashcard' | 'Note';
    title: string;
    content: string;
    chapterId: number;
    link: string;
};

type Note = {
  id: string;
  chapterId: number;
  selection: string;
  note: string;
  timestamp: number;
};


function SearchComponent() {
    const searchParams = useSearchParams();
    const query = searchParams.get('q');
    const [results, setResults] = useState<SearchResult[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (typeof window !== 'undefined' && query) {
            setLoading(true);
            const lowerCaseQuery = query.toLowerCase();
            const searchResults: SearchResult[] = [];

            // Search Chapters (Summaries)
            chapters.forEach(chapter => {
                const summary = studyMaterials[chapter.id]?.summary || '';
                if (chapter.title.toLowerCase().includes(lowerCaseQuery) || summary.toLowerCase().includes(lowerCaseQuery)) {
                    searchResults.push({
                        type: 'Chapter',
                        title: chapter.title,
                        content: summary.substring(0, 150) + '...',
                        chapterId: chapter.id,
                        link: `/chapter/${chapter.id}`
                    });
                }
            });

            // Search Flashcards
            chapters.forEach(chapter => {
                studyMaterials[chapter.id]?.flashcards.forEach(card => {
                    if (card.term.toLowerCase().includes(lowerCaseQuery) || card.definition.toLowerCase().includes(lowerCaseQuery)) {
                        searchResults.push({
                            type: 'Flashcard',
                            title: card.term,
                            content: card.definition,
                            chapterId: chapter.id,
                            link: `/chapter/${chapter.id}?tab=flashcards`
                        });
                    }
                });
            });

            // Search Notes from Local Storage
            try {
                const savedNotes = localStorage.getItem('userNotes');
                if (savedNotes) {
                    const notes: Note[] = JSON.parse(savedNotes);
                    notes.forEach(note => {
                        if (note.note.toLowerCase().includes(lowerCaseQuery) || note.selection.toLowerCase().includes(lowerCaseQuery)) {
                            searchResults.push({
                                type: 'Note',
                                title: `Note on: "${note.selection.substring(0, 30)}..."`,
                                content: note.note,
                                chapterId: note.chapterId,
                                link: `/chapter/${note.chapterId}?tab=summary`
                            });
                        }
                    });
                }
            } catch (error) {
                console.error("Could not load or search notes from local storage", error);
            }

            setResults(searchResults);
            setLoading(false);
        }
    }, [query]);

    const getIcon = (type: SearchResult['type']) => {
        switch (type) {
            case 'Chapter': return <FileText className="w-5 h-5 text-primary" />;
            case 'Flashcard': return <Layers className="w-5 h-5 text-accent" />;
            case 'Note': return <BookOpen className="w-5 h-5 text-yellow-500" />;
            default: return null;
        }
    }

    if (!query) {
        return (
            <div className="text-center">
                <p className="text-muted-foreground">Please enter a search term in the sidebar.</p>
            </div>
        )
    }

    if (loading) {
        return <p>Loading search results...</p>;
    }

    return (
        <div>
            {results.length > 0 ? (
                <div className="space-y-4">
                    {results.map((result, index) => (
                        <Link href={result.link} key={index} passHref>
                           <Card className="hover:shadow-md transition-shadow cursor-pointer">
                                <CardHeader>
                                    <div className="flex items-start gap-3">
                                        <span className="flex-shrink-0">{getIcon(result.type)}</span>
                                        <CardTitle className="text-lg truncate">{result.title}</CardTitle>
                                    </div>
                                    <CardDescription>
                                        Found in <span className="font-semibold">{result.type}</span> from Chapter {result.chapterId}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground truncate">{result.content}</p>
                                </CardContent>
                           </Card>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="text-center bg-card p-8 rounded-lg">
                    <h3 className="text-2xl font-bold">No Results Found</h3>
                    <p className="text-muted-foreground mt-2">
                        Could not find any content matching "{query}".
                    </p>
                </div>
            )}
        </div>
    );
};


export default function SearchPage() {
    return (
        <div className="min-h-screen bg-background text-foreground p-4 sm:p-6 md:p-8">
            <header className="text-center mb-12">
                 <Suspense fallback={<div>Loading...</div>}>
                    <SearchHeader />
                 </Suspense>
            </header>
            <main className="max-w-4xl mx-auto">
                 <Suspense fallback={<div>Searching...</div>}>
                    <SearchComponent />
                 </Suspense>
            </main>
        </div>
    );
}

function SearchHeader() {
    const searchParams = useSearchParams();
    const query = searchParams.get('q');
    return (
        <h1 className="font-headline text-3xl md:text-5xl font-bold text-primary flex items-center justify-center gap-4 flex-wrap">
            <SearchIcon className="w-8 h-8 md:w-10 md:h-10" />
            <span>Search Results for "{query}"</span>
        </h1>
    )
}
