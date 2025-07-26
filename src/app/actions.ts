
'use server';

import { chatWithTutor } from '@/ai/flows/chat-with-tutor';
import { createStreamableValue, render, getAIState } from 'ai/rsc';
import { toAIStream } from 'ai';
import type {AIState, UIState} from '@/lib/types';
import { nanoid } from 'nanoid';
import { UserMessage } from '@/components/UserMessage';

export const getActions = () => {
  async function chat(input: string) {
    'use server';
    const history = getAIState();
    const uiStream = createStreamableUI(
      <div className="flex items-center gap-2">
        <Loader2 className="animate-spin" />
        <span className="text-muted-foreground">Thinking...</span>
      </div>
    );
    const aiState = createStreamableValue(null);

    (async () => {
      try {
        const result = await streamUI({
          model: 'openai:gpt-3.5-turbo',
          messages: [...history.get(), { role: 'user', content: input }],
          text: ({ content, done }) => {
            if (done) {
              history.done((prev: AIState) => [
                ...prev,
                { role: 'user', content: input },
                { role: 'assistant', content },
              ]);
              aiState.done({
                role: 'assistant',
                content,
              });
            }
            return <Markdown>{content}</Markdown>;
          },
        });
        uiStream.done(<BotMessage>{result.value}</BotMessage>);
      } catch (e) {
        console.error(e);
        const error = new Error(
          'The AI got an error. Please try again later.'
        );
        uiStream.error(error);
        aiState.error(error);
      }
    })();

    return {
      id: nanoid(),
      display: uiStream.value,
      aiState: aiState.value,
    };
  }

  const actions = {
    chat,
  };
  return actions;
};
