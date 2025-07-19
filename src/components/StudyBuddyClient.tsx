
"use client";

import { useChat } from 'ai/react';
import { useRef, useEffect } from 'react';
import { ScrollArea } from './ui/scroll-area';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Bot, User, Send, CornerDownLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from './ui/card';

export default function StudyBuddyClient() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
        scrollAreaRef.current.scrollTo({
            top: scrollAreaRef.current.scrollHeight,
            behavior: 'smooth'
        });
    }
  }, [messages]);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isLoading && input.trim() !== '') {
      handleSubmit(e);
    }
  };

  return (
    <div className="h-full flex flex-col p-4">
      <ScrollArea className="flex-1 mb-4 pr-4" ref={scrollAreaRef}>
        <div className="space-y-6">
           {!messages || messages.length === 0 ? (
                <div className="text-center text-sm text-muted-foreground p-4">
                    <p>Hi there! I'm Eco. 👋</p>
                    <p>Ask me anything about 12th-grade economics!</p>
                </div>
            ) : (
                messages.map(m => (
                    <div key={m.id} className={cn("flex items-start gap-3", m.role === 'user' ? 'justify-end' : 'justify-start')}>
                        {m.role === 'assistant' && (
                            <div className="bg-primary rounded-full p-2">
                                <Bot className="w-5 h-5 text-primary-foreground" />
                            </div>
                        )}
                        <Card className={cn(
                            'p-3 max-w-[80%]',
                            m.role === 'user'
                                ? 'bg-primary/20 text-foreground'
                                : 'bg-card text-card-foreground'
                        )}>
                            <CardContent className="p-0 text-sm leading-relaxed whitespace-pre-wrap">
                                {m.content}
                            </CardContent>
                        </Card>
                        {m.role === 'user' && (
                             <div className="bg-muted rounded-full p-2">
                                <User className="w-5 h-5 text-muted-foreground" />
                            </div>
                        )}
                    </div>
                ))
            )}
            {isLoading && (
                <div className="flex items-start gap-3 justify-start">
                     <div className="bg-primary rounded-full p-2">
                        <Bot className="w-5 h-5 text-primary-foreground animate-pulse" />
                    </div>
                    <Card className="p-3 max-w-[80%] bg-card text-card-foreground">
                        <CardContent className="p-0 text-sm leading-relaxed whitespace-pre-wrap">
                            <span className="w-2 h-2 rounded-full bg-muted-foreground inline-block animate-pulse"></span>
                            <span className="w-2 h-2 rounded-full bg-muted-foreground inline-block animate-pulse delay-150"></span>
                            <span className="w-2 h-2 rounded-full bg-muted-foreground inline-block animate-pulse delay-300"></span>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
      </ScrollArea>
      <div className="mt-auto">
        <form onSubmit={handleFormSubmit} className="relative">
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Ask a question about demand, supply, or any other topic..."
            className="pr-12 h-12"
            disabled={isLoading}
          />
          <Button type="submit" size="icon" className="absolute top-1/2 right-2 -translate-y-1/2" disabled={isLoading || !input.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
        <p className="text-xs text-muted-foreground text-center mt-2">
            Press <CornerDownLeft className="inline-block h-3 w-3"/> to send.
        </p>
      </div>
    </div>
  );
}
