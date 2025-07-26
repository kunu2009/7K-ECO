
"use client";

import { useState, useEffect } from 'react';
import { chapters } from '@/data/chapters';
import { connections } from '@/data/connections';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Share2 } from 'lucide-react';

const TOTAL_CHAPTERS = chapters.length;
const RADIUS = 280; // Radius of the circle for desktop
const MOBILE_RADIUS = 140; // Radius for mobile

type NodePosition = {
    x: number;
    y: number;
    id: number;
    title: string;
}

const calculatePositions = (isMobile: boolean): NodePosition[] => {
    const radius = isMobile ? MOBILE_RADIUS : RADIUS;
    return chapters.map((chapter, index) => {
        const angle = (index / TOTAL_CHAPTERS) * 2 * Math.PI - Math.PI / 2;
        return {
            x: radius * Math.cos(angle),
            y: radius * Math.sin(angle),
            id: chapter.id,
            title: chapter.title,
        };
    });
};

export default function ConceptWebClient() {
    const [hoveredNode, setHoveredNode] = useState<number | null>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);
    
    const nodePositions = calculatePositions(isMobile);
    const posMap = new Map(nodePositions.map(p => [p.id, p]));

    const relatedNodes = hoveredNode ? connections[hoveredNode] || [] : [];
    
    const containerSize = isMobile ? 400 : 700;

    return (
        <div className="w-full h-[600px] md:h-[700px] flex items-center justify-center relative">
             <motion.div
                className="absolute text-center z-10"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <div className="flex items-center justify-center w-20 h-20 md:w-28 md:h-28 bg-primary/20 rounded-full">
                   <Share2 className="w-10 h-10 md:w-14 md:h-14 text-primary"/>
                </div>
                 <h3 className="font-bold text-lg md:text-xl mt-2 text-primary-foreground">Concept Web</h3>
                 <p className="text-xs md:text-sm text-muted-foreground">Hover over a chapter</p>
            </motion.div>

            <svg className="w-full h-full absolute top-0 left-0" viewBox={`0 0 ${containerSize} ${containerSize}`}>
                <g transform={`translate(${containerSize/2}, ${containerSize/2})`}>
                    {hoveredNode && posMap.has(hoveredNode) && relatedNodes.map(relatedId => {
                        const start = posMap.get(hoveredNode);
                        const end = posMap.get(relatedId);
                        if (!start || !end) return null;

                        return (
                            <motion.line
                                key={`${hoveredNode}-${relatedId}`}
                                x1={start.x}
                                y1={start.y}
                                x2={end.x}
                                y2={end.y}
                                stroke="hsl(var(--primary))"
                                strokeWidth="1.5"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.4 }}
                                exit={{ opacity: 0 }}
                            />
                        )
                    })}
                </g>
            </svg>

            <div className="w-full h-full relative" style={{ transformStyle: 'preserve-3d' }}>
                {nodePositions.map(pos => {
                    const isRelated = hoveredNode ? relatedNodes.includes(pos.id) || pos.id === hoveredNode : false;
                    return (
                        <motion.div
                            key={pos.id}
                            className="absolute"
                            style={{
                                top: '50%',
                                left: '50%',
                                transform: `translate(-50%, -50%) translate(${pos.x}px, ${pos.y}px)`,
                            }}
                            onMouseEnter={() => setHoveredNode(pos.id)}
                            onMouseLeave={() => setHoveredNode(null)}
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.1 * pos.id }}
                        >
                            <Link href={`/chapter/${pos.id}`} passHref>
                                <div className={cn(
                                    "w-24 h-24 md:w-32 md:h-32 rounded-full flex flex-col items-center justify-center text-center p-2 cursor-pointer transition-all duration-300",
                                    "bg-card border-2 shadow-md",
                                    isRelated ? 'border-primary scale-110 shadow-lg' : 'border-border',
                                    (hoveredNode !== null && !isRelated) ? 'opacity-40' : 'opacity-100'
                                )}>
                                    <span className="font-bold text-sm md:text-base text-primary">Ch. {pos.id}</span>
                                    <p className="text-xs md:text-sm text-muted-foreground leading-tight mt-1">{pos.title}</p>
                                </div>
                            </Link>
                        </motion.div>
                    )
                })}
            </div>
        </div>
    );
}
