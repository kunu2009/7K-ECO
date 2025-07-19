
"use client";

import { useState, useRef, useEffect } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bot, User, Send } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCompletion } from 'ai/react';

const StudyBuddyWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useCompletion({
      api: '/api/chat',
  });

  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
        scrollAreaRef.current.scrollTo({
            top: scrollAreaRef.current.scrollHeight,
            behavior: 'smooth'
        });
    }
  }, [messages]);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            size="lg"
            className="rounded-full w-16 h-16 bg-primary hover:bg-primary/90 shadow-lg"
          >
            <Bot className="w-8 h-8" />
            <span className="sr-only">Open Study Buddy</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 md:w-96 mr-4 mb-2 p-0 rounded-lg shadow-xl" side="top" align="end">
          <div className="flex flex-col h-[60vh]">
            <header className="p-4 bg-primary text-primary-foreground rounded-t-lg">
              <h3 className="font-bold text-lg">Eco - Your Study Buddy</h3>
            </header>
            <ScrollArea className="flex-1 p-4 bg-background" ref={scrollAreaRef}>
              <div className="space-y-4">
                {!messages || messages.length === 0 ? (
                    <div className="text-center text-sm text-muted-foreground p-4">
                        <p>Hi there! I'm Eco. 👋</p>
                        <p>Ask me anything about 12th-grade economics!</p>
                    </div>
                ) : (
                  messages.map((m) => (
                    <div key={m.id} className={cn("flex items-start gap-3", m.role === 'user' ? 'justify-end' : 'justify-start')}>
                      {m.role === 'assistant' && <Bot className="w-6 h-6 text-primary flex-shrink-0" />}
                      <div
                        className={cn(
                          'p-3 rounded-lg max-w-[80%]',
                          m.role === 'user'
                            ? 'bg-primary/20 text-primary-foreground'
                            : 'bg-card text-card-foreground'
                        )}
                      >
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{m.content}</p>
                      </div>
                      {m.role === 'user' && <User className="w-6 h-6 text-muted-foreground flex-shrink-0" />}
                    </div>
                  ))
                )}
              </div>
            </ScrollArea>
            <form onSubmit={handleSubmit} className="p-4 border-t bg-card rounded-b-lg">
              <div className="flex items-center gap-2">
                <Input
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Ask a question..."
                  disabled={isLoading}
                />
                <Button type="submit" size="icon" disabled={isLoading || !input}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </form>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default StudyBuddyWidget;
