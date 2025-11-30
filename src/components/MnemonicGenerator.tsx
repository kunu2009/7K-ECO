
"use client";

import { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Button } from './ui/button';
import { Sparkles, Loader2, Copy } from 'lucide-react';
import { generateMnemonic } from '@/ai/flows/generate-mnemonic';
import { useToast } from '@/hooks/use-toast';

type MnemonicGeneratorProps = {
    term: string;
    definition: string;
};

export default function MnemonicGenerator({ term, definition }: MnemonicGeneratorProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [mnemonic, setMnemonic] = useState<string | null>(null);
    const { toast } = useToast();

    const handleGenerate = async () => {
        if (mnemonic) return; // Don't re-generate if we already have one
        setIsLoading(true);
        try {
            const result = await generateMnemonic({ term, definition });
            setMnemonic(result.mnemonic);
        } catch (error) {
            console.error("Failed to generate mnemonic:", error);
            toast({
                title: "Error",
                description: "Could not generate a mnemonic at this time.",
                variant: "destructive"
            });
            setIsOpen(false);
        } finally {
            setIsLoading(false);
        }
    }
    
    const handleCopyToClipboard = () => {
        if (mnemonic) {
            navigator.clipboard.writeText(mnemonic);
            toast({
                title: "Copied!",
                description: "Mnemonic copied to your clipboard."
            });
        }
    }

    const handleOpenChange = (open: boolean) => {
        setIsOpen(open);
        if (open && !mnemonic) {
            handleGenerate();
        }
    }

    return (
        <Popover open={isOpen} onOpenChange={handleOpenChange}>
            <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" title="Generate Mnemonic" className="absolute top-1 right-10">
                    <Sparkles className="w-5 h-5 text-primary/70 hover:text-primary transition-colors" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-4" align="end">
                <div className="space-y-2">
                    <h4 className="font-medium leading-none text-primary">Mnemonic for &ldquo;{term}&rdquo;</h4>
                    {isLoading && (
                         <div className="flex items-center justify-center h-16">
                            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                         </div>
                    )}
                    {mnemonic && (
                        <div>
                             <p className="text-sm text-muted-foreground mt-2 italic">&ldquo;{mnemonic}&rdquo;</p>
                             <Button size="sm" variant="outline" className="mt-4 w-full" onClick={handleCopyToClipboard}>
                                <Copy className="mr-2 h-4 w-4" /> Copy
                             </Button>
                        </div>
                    )}
                </div>
            </PopoverContent>
        </Popover>
    );
}
