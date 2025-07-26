
'use server';

import { chatWithTutor } from '@/ai/flows/chat-with-tutor';
import { createStreamableValue, render } from 'ai/rsc';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { toAIStream } from 'ai';

export const actions = {
    chatWithTutor: async (history: any) => {
        const stream = createStreamableValue();
        (async () => {
            const llmStream = await chatWithTutor(history);
            const aiStream = toAIStream(llmStream, {
                async onFinal(completion) {
                    stream.done();
                },
            });
            render({
                stream: aiStream,
                schema: {},
                messages: <ReactMarkdown>{aiStream.value}</ReactMarkdown>
            });
            stream.update(aiStream.value);
        })();
        
        return { stream: stream.value };
    }
};
