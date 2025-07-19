
"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';

export default function SummarySection({ summary }: { summary: string }) {
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
        <p className="text-foreground/90 leading-relaxed whitespace-pre-line">
          {summary}
        </p>
      </CardContent>
    </Card>
  );
}
