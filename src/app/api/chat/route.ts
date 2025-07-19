import { streamText } from 'ai';
import { chat } from '@/ai/flows/study-buddy-flow';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText(chat(messages));

  return result.toAIStreamResponse();
}
