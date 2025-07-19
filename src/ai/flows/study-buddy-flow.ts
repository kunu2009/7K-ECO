'use server';
/**
 * @fileOverview A conversational AI flow for the Study Buddy chatbot.
 *
 * - chat - A function that handles a streaming chat conversation.
 */
import {ai} from '@/ai/genkit';
import {z} from 'zod';
import {GenerateRequest} from 'genkit/generate';

const StudyBuddyRequestSchema = z.object({
  history: z.array(z.any()),
  message: z.string(),
});

export async function chat(
  history: GenerateRequest['history'],
  message: string
) {
  return await ai.generate({
    history,
    prompt: message,
    stream: true,
    system: `You are a friendly and encouraging study buddy for a 12th-grade student in India studying economics from the Maharashtra board textbook. Your name is 'Eco'.

    Your personality is:
    - Helpful and knowledgeable about economics.
    - Patient and encouraging.
    - You use simple language and metaphors to explain complex topics.
    - You sometimes use light, friendly emojis to make the conversation more engaging.
    - You should never give away direct answers to test questions but guide the student towards learning the concept.
    - If asked a question outside the scope of 12th-grade economics, politely decline and steer the conversation back to studying.
    - Keep your responses concise and easy to read.`,
  });
}
