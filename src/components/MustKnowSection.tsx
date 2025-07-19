
"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal, Star } from 'lucide-react';

export default function MustKnowSection({ mustKnow }: { mustKnow: string[] }) {
  if (!mustKnow || mustKnow.length === 0) {
    return (
       <Alert variant="destructive">
           <Terminal className="h-4 w-4" />
           <AlertTitle>Content Not Found</AlertTitle>
           <AlertDescription>No key concepts available for this chapter.</AlertDescription>
       </Alert>
   )
  }

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
            {mustKnow.map((point, index) => (
                <li key={index} className="leading-relaxed">{point}</li>
            ))}
        </ul>
      </CardContent>
    </Card>
  );
}
