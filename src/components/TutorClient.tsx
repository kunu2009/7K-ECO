
"use client";

import { useState } from 'react';
import { useActions, useStreamableValue } from 'ai/rsc';
import type { Message } from 'genkit/ai';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Send, User, Bot } from 'lucide-react';
import { cn } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';
import type {actions} from '@/app/actions';


export default function TutorClient() {
  const { chatWithTutor } = useActions<typeof actions>();
  const [history, setHistory] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [data, setData, ] = useStreamableValue<any>();

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input) return;

    const newHistory: Message[] = [...history, { role: 'user', content: [{ text: input }] }];
    setHistory(newHistory);
    setInput('');

    const { stream } = await chatWithTutor(newHistory);
    
    for await (const delta of stream) {
        setData(JSON.parse(delta));
    }
  };

  const streamingMessage = data?.content;

  const allMessages = [...history];
  if(streamingMessage) {
      allMessages.push({ role: 'model', content: [{text: streamingMessage }]})
  }

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
             {history.length === 0 && (
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
            />
            <Button type="submit" size="icon" disabled={!input}>
                <Send className="w-4 h-4" />
            </Button>
        </form>
    </div>
  );
}
