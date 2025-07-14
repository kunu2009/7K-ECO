// use server'

/**
 * @fileOverview Generates flashcards for a given chapter.
 *
 * - generateFlashcards - A function that generates flashcards for a chapter.
 * - GenerateFlashcardsInput - The input type for the generateFlashcards function.
 * - GenerateFlashcardsOutput - The return type for the generateFlashcards function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateFlashcardsInputSchema = z.object({
  chapterContent: z
    .string()
    .describe('The content of the chapter to generate flashcards for.'),
});
export type GenerateFlashcardsInput = z.infer<typeof GenerateFlashcardsInputSchema>;

const GenerateFlashcardsOutputSchema = z.object({
  flashcards: z.array(
    z.object({
      term: z.string().describe('The term or concept for the flashcard.'),
      definition: z.string().describe('The definition of the term or concept.'),
    })
  ).describe('An array of flashcards for the chapter.'),
});
export type GenerateFlashcardsOutput = z.infer<typeof GenerateFlashcardsOutputSchema>;

export async function generateFlashcards(input: GenerateFlashcardsInput): Promise<GenerateFlashcardsOutput> {
  return generateFlashcardsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateFlashcardsPrompt',
  input: {schema: GenerateFlashcardsInputSchema},
  output: {schema: GenerateFlashcardsOutputSchema},
  prompt: `You are an expert educator specializing in economics. Generate flashcards for the following chapter content. Each flashcard should have a term and a definition.

Chapter Content:
{{{chapterContent}}}

Ensure the flashcards are concise and cover the key concepts of the chapter.`,
});

const generateFlashcardsFlow = ai.defineFlow(
  {
    name: 'generateFlashcardsFlow',
    inputSchema: GenerateFlashcardsInputSchema,
    outputSchema: GenerateFlashcardsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
