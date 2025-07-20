/**
 * @fileOverview A conversational AI flow for the Study Buddy chatbot.
 *
 * - studyBuddyFlow - A function that handles a streaming chat conversation.
 */
'use server';
import {ai} from '@/ai/genkit';
import {z} from 'zod';
import {CoreMessage, streamToReader} from 'ai';

export const studyBuddyFlow = ai.defineFlow(
  {
    name: 'studyBuddyFlow',
    inputSchema: z.array(z.any()),
    outputSchema: z.any(),
  },
  async (messages) => {
    const systemPrompt = `You are a friendly and encouraging study buddy for a 12th-grade student in India studying economics from the Maharashtra board textbook. Your name is 'Eco'.

    Your personality is:
    - Helpful and knowledgeable about economics.
    - Patient and encouraging.
    - You use simple language and metaphors to explain complex topics.
    - You sometimes use light, friendly emojis to make the conversation more engaging.
    - You should never give away direct answers to test questions but guide the student towards learning the concept.
    - If asked a question outside the scope of 12th-grade economics, politely decline and steer the conversation back to studying.
    - Keep your responses concise and easy to read.`;
    
    const {stream, response} = ai.generateStream({
      model: 'google/gemini-1.5-flash-latest',
      prompt: {
        system: systemPrompt,
        messages: messages as CoreMessage[],
      },
    });

    return new Response(streamToReader(stream));
  }
);
