
'use server';
/**
 * @fileOverview An AI flow for a conversational economics tutor.
 *
 * - chatWithTutor - A function that takes a chat history and returns a streamed response.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';
import {generate} from 'genkit/generate';
import {Message, Role} from 'genkit/ai';
import {chapters} from '@/data/chapters';

const chapterContext = chapters.map(c => `Chapter ${c.id} (${c.title}): ${c.description}`).join('\n');


export async function chatWithTutor(history: Message[]) {
  return await generate({
    model: 'googleai/gemini-1.5-flash',
    history,
    prompt: `You are an expert and friendly economics tutor for a 12th-grade student in India. 
    Your role is to answer their questions clearly and concisely.
    Use simple language and provide relatable examples when possible.
    If the user asks a question outside the scope of 12th-grade economics, gently guide them back to the topic.
    
    Here is the syllabus context to help you answer questions accurately:
    ${chapterContext}
    `,
    streaming: true,
  });
}
