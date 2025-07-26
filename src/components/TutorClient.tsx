
"use client";

import { useState } from 'react';
import type { Message } from 'genkit/ai';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Send, User, Bot, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';
import { chatWithTutor } from '@/ai/flows/chat-with-tutor';


export default function TutorClient() {
  const [history, setHistory] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [streamingResponse, setStreamingResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input) return;

    setLoading(true);
    setStreamingResponse("");

    const newHistory: Message[] = [...history, { role: 'user', content: [{ text: input }] }];
    setHistory(newHistory);
    const userInput = input;
    setInput('');

    try {
        const stream = await chatWithTutor(newHistory);
        const reader = stream.getReader();
        const decoder = new TextDecoder();
        let fullResponse = "";

        while (true) {
            const { done, value } = await reader.read();
            if (done) {
                break;
            }
            const chunk = decoder.decode(value, { stream: true });
            fullResponse += chunk;
            setStreamingResponse(fullResponse);
        }
        
        setHistory(prev => [...prev, {role: 'model', content: [{text: fullResponse}]}]);

    } catch (error) {
        console.error("Failed to get response from AI tutor", error);
    } finally {
        setStreamingResponse(null);
        setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto flex flex-col h-full">
        <div className="flex-1 overflow-y-auto pr-4 space-y-6">
            {history.map((msg, index) => (
                <div key={index} className={cn("flex items-start gap-4", msg.role === 'user' ? "justify-end" : "justify-start")}>
                    {msg.role === 'model' && (
                        <Avatar className="w-8 h-8">
                            <AvatarFallback><Bot/></AvatarFallback>
                        </Avatar>
                    )}
                    <div className={cn("max-w-md p-3 rounded-lg", msg.role === 'user' ? "bg-primary text-primary-foreground" : "bg-muted")}>
                        <ReactMarkdown className="prose dark:prose-invert text-sm break-words">
                          {msg.content[0].text}
                        </ReactMarkdown>
                    </div>
                     {msg.role === 'user' && (
                        <Avatar className="w-8 h-8">
                           <AvatarFallback><User/></AvatarFallback>
                        </Avatar>
                    )}
                </div>
            ))}
             {loading && (
                 <div className="flex items-start gap-4 justify-start">
                    <Avatar className="w-8 h-8">
                        <AvatarFallback><Bot/></AvatarFallback>
                    </Avatar>
                    <div className={cn("max-w-md p-3 rounded-lg bg-muted")}>
                        {streamingResponse !== null ? (
                             <ReactMarkdown className="prose dark:prose-invert text-sm break-words">
                                {streamingResponse}
                            </ReactMarkdown>
                        ) : (
                             <div className="flex items-center justify-center h-full">
                                <Loader2 className="w-4 h-4 animate-spin"/>
                             </div>
                        )}
                    </div>
                </div>
             )}
             {history.length === 0 && !loading && (
                <div className="text-center text-muted-foreground">
                    <p>Start the conversation by asking a question about economics!</p>
                </div>
             )}
        </div>
        <form onSubmit={handleSendMessage} className="flex items-center gap-2 pt-4 sticky bottom-0 bg-background">
            <Input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="e.g., Explain the Law of Demand..."
                className="flex-1"
                disabled={loading}
            />
            <Button type="submit" size="icon" disabled={!input || loading}>
                <Send className="w-4 h-4" />
            </Button>
        </form>
    </div>
  );
}
