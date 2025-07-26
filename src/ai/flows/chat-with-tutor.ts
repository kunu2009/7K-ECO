
'use server';
/**
 * @fileOverview An AI flow for a conversational economics tutor.
 *
 * - chatWithTutor - A function that takes a chat history and returns a streamed response.
 */

import {ai} from '@/ai/genkit';
import { Message } from 'genkit/ai';
import {chapters} from '@/data/chapters';

const chapterContext = chapters.map(c => `Chapter ${c.id} (${c.title}): ${c.description}`).join('\n');


export function chatWithTutor(history: Message[]): ReadableStream<Uint8Array> {
  const { stream } = ai.generate({
    model: 'googleai/gemini-1.5-flash',
    history,
    prompt: `You are an expert and friendly economics tutor for a 12th-grade student in India. 
    Your role is to answer their questions clearly and concisely.
    Use simple language and provide relatable examples when possible.
    If the user asks a question outside the scope of 12th-grade economics, gently guide them back to the topic.
    Keep your answers focused and to the point.
    
    Here is the syllabus context to help you answer questions accurately:
    ${chapterContext}
    `,
    stream: true,
  });

  const encodedStream = stream.pipeThrough(
    new TextEncoderStream()
  );

  return encodedStream;
}
