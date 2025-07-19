'use server';
/**
 * @fileOverview An AI flow to analyze an image of a textbook page and identify the chapter.
 *
 * - analyzeTextbookPage - A function that takes an image and returns the most relevant chapter ID.
 * - AnalyzePageInput - The input type for the analyzeTextbookPage function.
 * - AnalyzePageOutput - The return type for the analyzeTextbookPage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';
import {chapters} from '@/data/chapters';

const chapterTitles = chapters.map(c => `Chapter ${c.id}: ${c.title}`).join('\n');

const AnalyzePageInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a textbook page, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type AnalyzePageInput = z.infer<typeof AnalyzePageInputSchema>;

const AnalyzePageOutputSchema = z.object({
  chapterId: z.number().describe('The most likely chapter ID from the provided list based on the text in the image. Return 0 if no chapter can be identified.'),
});
export type AnalyzePageOutput = z.infer<typeof AnalyzePageOutputSchema>;


export async function analyzeTextbookPage(input: AnalyzePageInput): Promise<AnalyzePageOutput> {
  return analyzePageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'textbookPageAnalyzerPrompt',
  input: {schema: AnalyzePageInputSchema},
  output: {schema: AnalyzePageOutputSchema},
  prompt: `You are an expert at analyzing images of textbook pages for a 12th-grade economics textbook.
  
Your task is to identify the most relevant chapter from the text visible in the provided image.
Analyze the headings, paragraphs, and any keywords in the image to determine which chapter it belongs to.

Here is the list of chapters:
${chapterTitles}

Based on the image content, determine the most likely chapter ID. The image may be blurry or at an angle, do your best to read the text. If you cannot confidently identify a chapter, return 0.

Image of textbook page: {{media url=photoDataUri}}
`,
});

const analyzePageFlow = ai.defineFlow(
  {
    name: 'analyzePageFlow',
    inputSchema: AnalyzePageInputSchema,
    outputSchema: AnalyzePageOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
