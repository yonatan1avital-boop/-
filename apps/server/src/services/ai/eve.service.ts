import OpenAI from 'openai';
import { env } from '../../config/env';
import { EveMemoryModel } from '../../models/eve-memory.model';
import { BlueprintModel } from '../../models/blueprint.model';

const openai = new OpenAI({ apiKey: env.OPENAI_API_KEY });

export async function chatWithEve(userId: string, mode: 'motivator' | 'strategic_advisor' | 'emotional_regulator', prompt: string) {
  const blueprint = await BlueprintModel.findOne({ userId });
  const memory = await EveMemoryModel.find({ userId }).sort({ createdAt: -1 }).limit(5);

  const completion = await openai.chat.completions.create({
    model: env.OPENAI_MODEL,
    messages: [
      { role: 'system', content: `You are Eve. Mode=${mode}. Speak with cinematic emotional precision.` },
      { role: 'system', content: `Blueprint snapshot: ${JSON.stringify(blueprint ?? {})}` },
      { role: 'system', content: `Recent memory: ${JSON.stringify(memory.map((m) => ({ p: m.prompt, r: m.response })))}` },
      { role: 'user', content: prompt }
    ],
    temperature: 0.9
  });

  const reply = completion.choices[0]?.message?.content ?? 'Stay aligned with your future self.';

  await EveMemoryModel.create({ userId, mode, prompt, response: reply });

  return { reply };
}
