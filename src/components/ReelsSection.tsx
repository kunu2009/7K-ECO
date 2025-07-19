
"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';
import { motion } from 'framer-motion';

type Reel = {
  title: string;
  content: string;
  thumbnail: string;
  hint: string;
};

const reelColors = [
    "from-sky-200 to-blue-200",
    "from-amber-100 to-yellow-200",
    "from-teal-100 to-cyan-200",
    "from-rose-100 to-pink-200",
    "from-purple-200 to-indigo-200",
    "from-green-100 to-emerald-200",
];

export default function ReelsSection({ reels }: { reels: Reel[] }) {

  if (!reels || reels.length === 0) {
    return (
      <Alert variant="destructive">
        <Terminal className="h-4 w-4" />
        <AlertTitle>Content Not Found</AlertTitle>
        <AlertDescription>No reels available for this chapter.</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="fixed inset-0 bg-black z-50">
      <div className="h-full w-full max-w-md mx-auto rounded-xl bg-card overflow-y-auto snap-y snap-mandatory scroll-smooth">
        {reels.map((reel, index) => (
            <motion.div
                key={index}
                className="h-full w-full snap-start flex-shrink-0 flex items-center justify-center p-6 bg-gradient-to-br"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.8 }}
                transition={{ duration: 0.5 }}
            >
                <div className={`h-full w-full flex items-center justify-center rounded-lg bg-gradient-to-br ${reelColors[index % reelColors.length]}`}>
                    <Card className="bg-white/70 backdrop-blur-sm shadow-xl w-full max-w-sm m-4">
                        <CardHeader>
                            <CardTitle className="text-foreground font-headline text-2xl">{reel.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-foreground/90 text-lg leading-relaxed">{reel.content}</p>
                        </CardContent>
                    </Card>
                </div>
            </motion.div>
        ))}
      </div>
    </div>
  );
};
