
"use client";

import { useState } from 'react';
import { chapters } from '@/data/chapters';
import { connections } from '@/data/connections';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

export default function ConceptWebClient() {
    const [hoveredNode, setHoveredNode] = useState<number | null>(null);

    const getRelatedNodes = (chapterId: number) => {
        return connections[chapterId] || [];
    };

    return (
        <div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" 
            onMouseLeave={() => setHoveredNode(null)}
        >
            {chapters.map((chapter, index) => {
                const relatedNodes = getRelatedNodes(chapter.id);
                const isRelated = hoveredNode ? getRelatedNodes(hoveredNode).includes(chapter.id) : false;
                const isHovered = hoveredNode === chapter.id;

                return (
                    <Link
                        key={chapter.id}
                        href={`/chapter/${chapter.id}`}
                        passHref
                        className={cn(
                            "transition-opacity duration-300 h-full",
                            (hoveredNode !== null && !isHovered && !isRelated) && "opacity-30"
                        )}
                        onMouseEnter={() => setHoveredNode(chapter.id)}
                    >
                        <Card className={cn(
                            "h-full flex flex-col hover:shadow-lg hover:-translate-y-1 transition-transform duration-300 ease-in-out bg-card border-2",
                            (isHovered || isRelated) ? "border-primary" : "border-border"
                        )}>
                            <CardHeader>
                                <CardTitle>Chapter {chapter.id}: {chapter.title}</CardTitle>
                                <CardDescription>
                                    {relatedNodes.length > 0 ? `Connects to: Ch. ${relatedNodes.join(', ')}` : "No direct connections listed."}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <p className="text-sm text-muted-foreground">{chapter.description}</p>
                            </CardContent>
                            <CardFooter className="flex justify-end">
                                 <ArrowRight className="w-5 h-5 text-primary"/>
                            </CardFooter>
                        </Card>
                    </Link>
                );
            })}
        </div>
    );
}
