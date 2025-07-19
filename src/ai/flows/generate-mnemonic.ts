'use server';
/**
 * @fileOverview An AI flow to generate mnemonics for economic terms.
 *
 * - generateMnemonic - A function that takes a term and definition and returns a mnemonic.
 * - GenerateMnemonicInput - The input type for the generateMnemonic function.
 * - GenerateMnemonicOutput - The return type for the generateMnemonic function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const GenerateMnemonicInputSchema = z.object({
  term: z.string().describe('The economic term to create a mnemonic for.'),
  definition: z
    .string()
    .describe('The definition of the term for context.'),
});
export type GenerateMnemonicInput = z.infer<typeof GenerateMnemonicInputSchema>;

const GenerateMnemonicOutputSchema = z.object({
  mnemonic: z.string().describe('The generated mnemonic phrase or acronym.'),
});
export type GenerateMnemonicOutput = z.infer<typeof GenerateMnemonicOutputSchema>;

export async function generateMnemonic(
  input: GenerateMnemonicInput
): Promise<GenerateMnemonicOutput> {
  return generateMnemonicFlow(input);
}

const prompt = ai.definePrompt({
  name: 'mnemonicGeneratorPrompt',
  input: {schema: GenerateMnemonicInputSchema},
  output: {schema: GenerateMnemonicOutputSchema},
  prompt: `You are a creative and helpful learning assistant for a 12th-grade economics student. 
  
Your task is to generate a simple and memorable mnemonic for the given economic term based on its definition. 
The mnemonic should be an acronym or a short, catchy phrase that helps the student remember the term's key components or meaning.

Keep the mnemonic concise and easy to understand.

Term: {{{term}}}
Definition: {{{definition}}}

Generate a mnemonic for the term.`,
});

const generateMnemonicFlow = ai.defineFlow(
  {
    name: 'generateMnemonicFlow',
    inputSchema: GenerateMnemonicInputSchema,
    outputSchema: GenerateMnemonicOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
