// src/ai/flows/generate-mcqs.ts
'use server';

/**
 * @fileOverview Flow to generate multiple-choice questions (MCQs) for a given chapter.
 *
 * - generateMCQs - A function that generates MCQs for a chapter.
 * - GenerateMCQsInput - The input type for the generateMCQs function.
 * - GenerateMCQsOutput - The return type for the generateMCQs function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateMCQsInputSchema = z.object({
  chapterText: z.string().describe('The text content of the chapter.'),
  numQuestions: z.number().describe('The number of MCQs to generate.'),
});

export type GenerateMCQsInput = z.infer<typeof GenerateMCQsInputSchema>;

const GenerateMCQsOutputSchema = z.object({
  mcqs: z
    .array(
      z.object({
        question: z.string(),
        options: z.array(z.string()),
        answer: z.string(),
      })
    )
    .describe('An array of multiple-choice questions.'),
});

export type GenerateMCQsOutput = z.infer<typeof GenerateMCQsOutputSchema>;

export async function generateMCQs(input: GenerateMCQsInput): Promise<GenerateMCQsOutput> {
  return generateMCQsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateMCQsPrompt',
  input: {schema: GenerateMCQsInputSchema},
  output: {schema: GenerateMCQsOutputSchema},
  prompt: `You are an expert in generating multiple-choice questions (MCQs) based on provided text content.

  Generate {{numQuestions}} MCQs based on the following chapter text. Each question should have 4 options, and clearly indicate the correct answer.

  Chapter Text: {{{chapterText}}}

  Your response should be a JSON object with a 'mcqs' field, which is an array of objects. Each object in the array should have the following fields:
  - question: The MCQ question.
  - options: An array of 4 strings representing the options.
  - answer: The correct answer to the question.
  `,
});

const generateMCQsFlow = ai.defineFlow(
  {
    name: 'generateMCQsFlow',
    inputSchema: GenerateMCQsInputSchema,
    outputSchema: GenerateMCQsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
