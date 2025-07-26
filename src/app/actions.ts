
'use server';

import { chatWithTutor } from '@/ai/flows/chat-with-tutor';
import { createStreamableValue } from 'ai/rsc';

export const actions = {
    chatWithTutor: async (history: any) => {
        const stream = createStreamableValue();
        (async () => {
          const {stream: resultStream} = await chatWithTutor(history);
          for await (const chunk of resultStream) {
            stream.update(chunk);
          }
          stream.done();
        })();
        return { stream: stream.value };
    }
};
