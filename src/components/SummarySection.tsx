
"use client";

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, MessageSquarePlus } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { usePathname } from 'next/navigation';

type Note = {
  id: string;
  chapterId: number;
  selection: string;
  note: string;
  timestamp: number;
};

type Highlight = {
  id: string;
  chapterId: number;
  selection: string;
};

const getChapterIdFromPath = (path: string): number => {
  const match = path.match(/\/chapter\/(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
};

export default function SummarySection({ summary }: { summary: string }) {
  const [selection, setSelection] = useState<Selection | null>(null);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [noteText, setNoteText] = useState("");
  const { toast } = useToast();
  const summaryRef = useRef<HTMLParagraphElement>(null);
  const pathname = usePathname();
  const chapterId = getChapterIdFromPath(pathname);

  const [notes, setNotes] = useState<Note[]>([]);
  const [highlights, setHighlights] = useState<Highlight[]>([]);

  useEffect(() => {
    try {
      const savedNotes = localStorage.getItem('userNotes');
      const savedHighlights = localStorage.getItem('userHighlights');
      if (savedNotes) {
        setNotes(JSON.parse(savedNotes));
      }
      if (savedHighlights) {
        setHighlights(JSON.parse(savedHighlights));
      }
    } catch (error) {
      console.error("Failed to load data from local storage", error);
    }
  }, []);

  const handleMouseUp = () => {
    const currentSelection = window.getSelection();
    if (currentSelection && currentSelection.toString().trim().length > 0) {
      setSelection(currentSelection);
      setPopoverOpen(true);
    } else {
      setSelection(null);
      setPopoverOpen(false);
    }
  };
  
  const saveNote = () => {
    if (!selection || noteText.trim() === "") {
        toast({ title: "Note is empty", description: "Please write something in your note.", variant: "destructive"});
        return;
    };
    const newNote: Note = {
      id: `note-${Date.now()}`,
      chapterId: chapterId,
      selection: selection.toString(),
      note: noteText,
      timestamp: Date.now(),
    };
    const updatedNotes = [...notes, newNote];
    setNotes(updatedNotes);
    localStorage.setItem('userNotes', JSON.stringify(updatedNotes));
    
    // Also save as a highlight
    saveHighlight(selection);

    toast({ title: "Note Saved!", description: "Your note has been added to your collection."});
    setNoteText("");
    setPopoverOpen(false);
  }

  const saveHighlight = (sel: Selection) => {
    const newHighlight: Highlight = {
        id: `highlight-${Date.now()}`,
        chapterId: chapterId,
        selection: sel.toString(),
    };
    // Avoid duplicate highlights
    if (!highlights.some(h => h.selection === newHighlight.selection && h.chapterId === newHighlight.chapterId)) {
        const updatedHighlights = [...highlights, newHighlight];
        setHighlights(updatedHighlights);
        localStorage.setItem('userHighlights', JSON.stringify(updatedHighlights));
    }
  }

  const getHighlightedSummary = () => {
    if (highlights.length === 0) return summary;
    
    const chapterHighlights = highlights
      .filter(h => h.chapterId === chapterId)
      .map(h => h.selection);
      
    if (chapterHighlights.length === 0) return summary;

    // Create a regex to find all highlight texts
    const regex = new RegExp(`(${chapterHighlights.join('|')})`, 'g');
    return summary.replace(regex, `<span class="bg-primary/30 rounded-sm p-0.5">$1</span>`);
  };

  if (!summary) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <p>No summary available for this chapter.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 font-headline text-xl">
             <div className="bg-accent/20 text-accent-foreground p-2 rounded-md">
                <FileText />
             </div>
            Chapter Summary
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
          <PopoverTrigger asChild>
            <p 
                ref={summaryRef}
                onMouseUp={handleMouseUp} 
                className="text-foreground/90 leading-relaxed whitespace-pre-line select-text"
                dangerouslySetInnerHTML={{ __html: getHighlightedSummary() }}
             />
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Add Note</h4>
                <p className="text-sm text-muted-foreground">
                  Add a note to your selected text: <em className="font-bold">"{selection?.toString()}"</em>
                </p>
              </div>
              <div className="grid gap-2">
                <Textarea value={noteText} onChange={e => setNoteText(e.target.value)} placeholder="Type your note here." />
                <Button onClick={saveNote}>
                    <MessageSquarePlus className="mr-2 h-4 w-4" /> Save Note
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </CardContent>
    </Card>
  );
}
