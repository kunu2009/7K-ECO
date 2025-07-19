
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2, BookOpen } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { chapters } from '@/data/chapters';

type Note = {
  id: string;
  chapterId: number;
  selection: string;
  note: string;
  timestamp: number;
};

export default function NoteTakingWidget() {
    const [notes, setNotes] = useState<Note[]>([]);
    const { toast } = useToast();
    
    useEffect(() => {
        try {
            const savedNotes = localStorage.getItem('userNotes');
            if (savedNotes) {
                setNotes(JSON.parse(savedNotes).sort((a: Note, b: Note) => b.timestamp - a.timestamp));
            }
        } catch (error) {
            console.error("Could not load notes from local storage", error);
        }
    }, []);
    
    const deleteNote = (id: string) => {
        const updatedNotes = notes.filter(note => note.id !== id);
        setNotes(updatedNotes);
        localStorage.setItem('userNotes', JSON.stringify(updatedNotes));
        toast({
            title: "Note Deleted",
            description: "Your note has been successfully removed.",
            variant: "destructive"
        });
    };

    const getChapterTitle = (chapterId: number) => {
        const chapter = chapters.find(c => c.id === chapterId);
        return chapter ? chapter.title : "Unknown Chapter";
    };

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="flex items-center"><BookOpen className="mr-3 text-primary"/> My Notes & Highlights</CardTitle>
                <CardDescription>Review all the notes you've taken from the chapter summaries.</CardDescription>
            </CardHeader>
            <CardContent>
                {notes.length > 0 ? (
                    <div className="space-y-4 max-h-[500px] overflow-y-auto pr-4">
                        {notes.map(note => (
                            <div key={note.id} className="p-4 border rounded-lg bg-card/80">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-xs text-muted-foreground">
                                            From <Link href={`/chapter/${note.chapterId}`} className="font-bold underline hover:text-primary">{getChapterTitle(note.chapterId)}</Link>
                                        </p>
                                        <blockquote className="mt-2 pl-4 border-l-4 border-primary/50 italic text-muted-foreground">
                                            "{note.selection}"
                                        </blockquote>
                                        <p className="mt-3 text-foreground font-semibold">{note.note}</p>
                                    </div>
                                    <Button variant="ghost" size="icon" onClick={() => deleteNote(note.id)}>
                                        <Trash2 className="h-4 w-4 text-destructive"/>
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                     <div className="flex flex-col items-center justify-center h-48 bg-muted/50 rounded-lg text-center p-4">
                        <p className="text-muted-foreground font-semibold">You haven't added any notes yet.</p>
                        <p className="text-sm text-muted-foreground mt-2">To get started, go to a chapter summary, select some text, and click 'Add Note'.</p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
