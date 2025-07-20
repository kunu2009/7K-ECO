import { studyBuddyFlow } from '@/ai/flows/study-buddy-flow';
import { run } from '@genkit-ai/next';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

export async function POST(req: Request) {
  const { messages } = await req.json();

  return run(studyBuddyFlow, messages);
}
