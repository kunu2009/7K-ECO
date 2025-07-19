'use server';
/**
 * @fileOverview An AI flow to analyze mock test results and generate personalized feedback.
 *
 * - analyzeMockTest - A function that takes incorrect questions and returns a study plan.
 * - AnalyzeTestInput - The input type for the analyzeMockTest function.
 * - AnalyzeTestOutput - The return type for the analyzeMockTest function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

export const AnalyzeTestInputSchema = z.object({
  incorrectQuestions: z.array(z.object({
    question: z.string(),
    correctAnswer: z.string(),
  })).describe("An array of questions the user answered incorrectly."),
});
export type AnalyzeTestInput = z.infer<typeof AnalyzeTestInputSchema>;

export const AnalyzeTestOutputSchema = z.object({
  analysis: z.string().describe("A brief, overall summary of the user's performance in 1-2 sentences. Be encouraging."),
  recommendations: z.array(z.object({
      concept: z.string().describe("The core economic concept or chapter the user struggled with."),
      suggestion: z.string().describe("A specific, actionable suggestion for improvement, like 'Review the flashcards for Chapter X' or 'Try the interactive chart for...'.")
  })).describe("A list of 2-3 personalized recommendations.")
});
export type AnalyzeTestOutput = z.infer<typeof AnalyzeTestOutputSchema>;

export async function analyzeMockTest(input: AnalyzeTestInput): Promise<AnalyzeTestOutput> {
  return analyzeTestFlow(input);
}

const prompt = ai.definePrompt({
  name: 'mockTestAnalyzerPrompt',
  input: {schema: AnalyzeTestInputSchema},
  output: {schema: AnalyzeTestOutputSchema},
  prompt: `You are an expert and encouraging economics tutor. A student has just completed a mock test.
  
You will be provided with a list of questions they answered incorrectly. Your task is to analyze these questions to identify the key concepts or chapters where the student is weakest.

Based on the incorrect questions below, generate a brief, encouraging analysis and provide 2-3 specific, actionable recommendations for them to improve. The recommendations should point to specific features in the app like 'flashcards for Chapter X', 'the interactive chart', or 'the summary for Chapter Y'.

Do not just list the chapter numbers. Identify the topic name (e.g., "Elasticity of Demand", "National Income", "Forms of Market").

Incorrect Questions:
{{#each incorrectQuestions}}
- Question: {{{question}}} (Correct Answer: {{{correctAnswer}}})
{{/each}}
`,
});

const analyzeTestFlow = ai.defineFlow(
  {
    name: 'analyzeTestFlow',
    inputSchema: AnalyzeTestInputSchema,
    outputSchema: AnalyzeTestOutputSchema,
  },
  async (input) => {
    if (input.incorrectQuestions.length === 0) {
        return {
            analysis: "Excellent work! You didn't get any questions wrong. You have a strong grasp of these concepts.",
            recommendations: [
                {
                    concept: "Keep Practicing",
                    suggestion: "Continue reviewing all chapters to keep the concepts fresh in your mind."
                }
            ]
        }
    }

    const {output} = await prompt(input);
    return output!;
  }
);
