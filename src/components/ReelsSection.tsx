import Image from 'next/image';
import { PlayCircle } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

const reels = [
  {
    title: 'Micro vs. Macro in 60 Seconds',
    thumbnail: 'https://placehold.co/600x400',
    hint: 'economics explainer',
  },
  {
    title: 'The Law of Demand Explained',
    thumbnail: 'https://placehold.co/600x400',
    hint: 'classroom blackboard',
  },
  {
    title: 'What is Utility?',
    thumbnail: 'https://placehold.co/600x400',
    hint: 'question mark',
  },
  {
    title: 'Market Structures Simplified',
    thumbnail: 'https://placehold.co/600x400',
    hint: 'market stall',
  },
];

const ReelsSection = () => {
  return (
    <div>
        <h2 className="text-2xl font-bold font-headline mb-4">Educational Reels</h2>
        <p className="text-muted-foreground mb-6">
            Quick video explainers to help you visualize key concepts.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {reels.map((reel, index) => (
                <Card key={index} className="overflow-hidden group cursor-pointer">
                    <CardContent className="p-0 relative">
                        <Image
                            src={reel.thumbnail}
                            alt={reel.title}
                            width={600}
                            height={400}
                            className="object-cover aspect-video transition-transform duration-300 group-hover:scale-105"
                            data-ai-hint={reel.hint}
                        />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                            <PlayCircle className="w-16 h-16 text-white/70 group-hover:text-white transition-colors" />
                        </div>
                    </CardContent>
                    <CardFooter className="p-4 bg-card">
                        <h3 className="font-semibold text-foreground truncate">{reel.title}</h3>
                    </CardFooter>
                </Card>
            ))}
        </div>
    </div>
  );
};

export default ReelsSection;
