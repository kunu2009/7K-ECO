import { chat } from '@/ai/flows/study-buddy-flow';
import { StreamingTextResponse } from 'ai';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const { messages } = await req.json();

  const { stream } = await chat(messages, messages[messages.length - 1].content);

  return new StreamingTextResponse(stream);
}
