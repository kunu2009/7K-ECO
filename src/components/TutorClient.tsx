
"use client";

import { useState, useRef, useEffect } from 'react';
import type { Message } from 'genkit/ai';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Send, User, Bot, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';
import { chatWithTutor } from '@/ai/flows/chat-with-tutor';
import { ScrollArea } from './ui/scroll-area';

export default function TutorClient() {
  const [history, setHistory] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [history, loading]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input || loading) return;

    setLoading(true);

    const userMessage: Message = { role: 'user', content: [{ text: input }] };
    const newHistory = [...history, userMessage];
    setHistory(newHistory);
    setInput('');

    // Add a placeholder for the streaming AI response
    setHistory(prev => [...prev, { role: 'model', content: [{ text: '' }] }]);

    try {
      const stream = await chatWithTutor(newHistory);
      const reader = stream.getReader();
      const decoder = new TextDecoder();
      let fullResponse = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        fullResponse += decoder.decode(value, { stream: true });
        
        setHistory(prev => {
            const updatedHistory = [...prev];
            updatedHistory[updatedHistory.length - 1] = { role: 'model', content: [{ text: fullResponse }]};
            return updatedHistory;
        });
      }
    } catch (error) {
      console.error("Failed to get response from AI tutor", error);
       setHistory(prev => {
            const updatedHistory = [...prev];
            updatedHistory[updatedHistory.length - 1] = { role: 'model', content: [{ text: 'Sorry, I encountered an error. Please try again.' }]};
            return updatedHistory;
        });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto flex flex-col h-full">
        <ScrollArea className="flex-1 pr-4" ref={scrollAreaRef as any}>
            <div className="space-y-6">
                {history.map((msg, index) => (
                    <div key={index} className={cn("flex items-start gap-4", msg.role === 'user' ? "justify-end" : "justify-start")}>
                        {msg.role === 'model' && (
                            <Avatar className="w-8 h-8">
                                <AvatarFallback><Bot/></AvatarFallback>
                            </Avatar>
                        )}
                        <div className={cn("max-w-md p-3 rounded-lg", msg.role === 'user' ? "bg-primary text-primary-foreground" : "bg-muted")}>
                            {msg.content[0].text ? (
                                <ReactMarkdown className="prose dark:prose-invert text-sm break-words">
                                    {msg.content[0].text}
                                </ReactMarkdown>
                            ) : (
                                <Loader2 className="w-4 h-4 animate-spin"/>
                            )}
                        </div>
                        {msg.role === 'user' && (
                            <Avatar className="w-8 h-8">
                            <AvatarFallback><User/></AvatarFallback>
                            </Avatar>
                        )}
                    </div>
                ))}
                {history.length === 0 && !loading && (
                    <div className="text-center text-muted-foreground">
                        <p>Start the conversation by asking a question about economics!</p>
                    </div>
                )}
            </div>
        </ScrollArea>
        <form onSubmit={handleSendMessage} className="flex items-center gap-2 pt-4 sticky bottom-0 bg-background">
            <Input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="e.g., Explain the Law of Demand..."
                className="flex-1"
                disabled={loading}
            />
            <Button type="submit" size="icon" disabled={!input || loading}>
                {loading ? <Loader2 className="w-4 h-4 animate-spin"/> : <Send className="w-4 h-4" />}
            </Button>
        </form>
    </div>
  );
}
