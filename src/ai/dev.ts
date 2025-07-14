import { config } from 'dotenv';
config();

import '@/ai/flows/generate-flashcards.ts';
import '@/ai/flows/generate-mcqs.ts';
import '@/ai/flows/generate-chapter-summary.ts';