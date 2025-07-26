
"use client";

import { useState } from 'react';
import { useActions, useStreamableValue } from 'ai/rsc';
import type { Message } from 'genkit/ai';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Send, User, Bot, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';
import type {actions} from '@/app/actions';


export default function TutorClient() {
  const { chatWithTutor } = useActions<typeof actions>();
  const [history, setHistory] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [data, setData, ] = useStreamableValue<any>();
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input) return;

    setLoading(true);
    const newHistory: Message[] = [...history, { role: 'user', content: [{ text: input }] }];
    setHistory(newHistory);
    setInput('');

    const { stream } = await chatWithTutor(newHistory);
    
    let fullResponse = "";
    for await (const delta of stream) {
        const chunk = JSON.parse(delta);
        if(chunk.content) {
          fullResponse += chunk.content;
          setData(fullResponse);
        }
    }
    setHistory(prev => [...prev, {role: 'model', content: [{text: fullResponse}]}]);
    setData(undefined);
    setLoading(false);
  };

  const allMessages = [...history];
  
  return (
    <div className="max-w-2xl mx-auto flex flex-col h-full">
        <div className="flex-1 overflow-y-auto pr-4 space-y-6">
            {allMessages.map((msg, index) => (
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
                        {data ? (
                             <ReactMarkdown className="prose dark:prose-invert text-sm break-words">
                                {data}
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
