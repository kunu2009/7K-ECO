"use server";

import { generateChapterSummary } from "@/ai/flows/generate-chapter-summary";
import { generateFlashcards } from "@/ai/flows/generate-flashcards";
import { generateMCQs } from "@/ai/flows/generate-mcqs";

export async function generateSummaryAction(chapterContent: string) {
  try {
    const { summary } = await generateChapterSummary({ chapterText: chapterContent });
    return { success: true, data: summary };
  } catch (error) {
    console.error("Error generating summary:", error);
    return { success: false, error: "Failed to generate summary." };
  }
}

export async function generateFlashcardsAction(chapterContent: string) {
  try {
    const { flashcards } = await generateFlashcards({ chapterContent });
    return { success: true, data: flashcards };
  } catch (error) {
    console.error("Error generating flashcards:", error);
    return { success: false, error: "Failed to generate flashcards." };
  }
}

export async function generateMcqsAction(chapterContent: string) {
  try {
    const { mcqs } = await generateMCQs({ chapterText: chapterContent, numQuestions: 5 });
    return { success: true, data: mcqs };
  } catch (error) {
    console.error("Error generating MCQs:", error);
    return { success: false, error: "Failed to generate MCQs." };
  }
}
