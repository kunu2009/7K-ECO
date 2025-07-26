
'use server';

import { ai } from '@/ai/genkit';
import { chatWithTutor } from '@/ai/flows/chat-with-tutor';
import { streamableValue } from 'ai/rsc';

export const getAIActions = () => {
    return {
        chatWithTutor: async (history: any) => {
            const stream = streamableValue();
            (async () => {
              const resultStream = await chatWithTutor(history);
              for await (const chunk of resultStream) {
                stream.update(chunk);
              }
              stream.done();
            })();
            return { stream: stream.value };
        }
    }
}
