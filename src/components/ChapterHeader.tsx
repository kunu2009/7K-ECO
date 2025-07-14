import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

type ChapterHeaderProps = {
  title: string;
};

const ChapterHeader = ({ title }: ChapterHeaderProps) => {
  return (
    <header className="flex items-center gap-4">
      <Button asChild variant="outline" size="icon">
        <Link href="/">
          <ArrowLeft className="h-4 w-4" />
          <span className="sr-only">Back to dashboard</span>
        </Link>
      </Button>
      <h1 className="text-2xl md:text-3xl font-bold font-headline text-foreground">
        {title}
      </h1>
    </header>
  );
};

export default ChapterHeader;
