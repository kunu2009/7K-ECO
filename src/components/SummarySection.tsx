"use client";

import { useState, useEffect } from 'react';
import { generateSummaryAction } from '@/app/actions';
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal, FileText } from 'lucide-react';

const SummarySkeleton = () => (
    <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline">
                <FileText />
                Chapter Summary
            </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
        </CardContent>
    </Card>
);

export default function SummarySection({ chapterContent }: { chapterContent: string }) {
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchSummary = async () => {
      setLoading(true);
      setError(null);
      const result = await generateSummaryAction(chapterContent);

      if (result.success && result.data) {
        setSummary(result.data);
      } else {
        setError(result.error || 'An unknown error occurred.');
        toast({
          variant: "destructive",
          title: "Error",
          description: result.error || "Failed to generate summary.",
        });
      }
      setLoading(false);
    };

    fetchSummary();
  }, [chapterContent, toast]);

  if (loading) {
    return <SummarySkeleton />;
  }

  if (error) {
    return (
        <Alert variant="destructive">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Generation Failed</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
        </Alert>
    )
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
        <p className="text-foreground/90 leading-relaxed whitespace-pre-line">
          {summary}
        </p>
      </CardContent>
    </Card>
  );
}
