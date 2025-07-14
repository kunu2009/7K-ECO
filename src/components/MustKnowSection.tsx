"use client";

import { useState, useEffect } from 'react';
import { generateSummaryAction } from '@/app/actions';
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal, Star } from 'lucide-react';

const MustKnowSkeleton = () => (
    <Card className="bg-primary/10 border-primary/30">
        <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline">
                <Star className="text-primary" />
                Must-Know Concepts
            </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
        </CardContent>
    </Card>
);


export default function MustKnowSection({ chapterContent }: { chapterContent: string }) {
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
          description: result.error || "Failed to generate key concepts.",
        });
      }
      setLoading(false);
    };

    fetchSummary();
  }, [chapterContent, toast]);

  if (loading) {
    return <MustKnowSkeleton />;
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

  const keyPoints = summary.split('. ').filter(point => point.length > 10);

  return (
    <Card className="bg-primary/10 border-primary/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 font-headline text-xl text-primary-foreground/90">
            <div className="bg-primary/20 text-primary p-2 rounded-md">
              <Star className="text-primary"/>
            </div>
            Must-Know Concepts
        </CardTitle>
      </CardHeader>
      <CardContent>
         <ul className="space-y-3 list-disc pl-5 text-foreground">
            {keyPoints.map((point, index) => (
                <li key={index} className="leading-relaxed">{point.trim()}{point.endsWith('.') ? '' : '.'}</li>
            ))}
        </ul>
      </CardContent>
    </Card>
  );
}
