import { Schema, model, Types } from 'mongoose';

export interface EveMemoryDocument {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  mode: 'motivator' | 'strategic_advisor' | 'emotional_regulator';
  prompt: string;
  response: string;
  createdAt: Date;
}

const EveMemorySchema = new Schema<EveMemoryDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    mode: { type: String, enum: ['motivator', 'strategic_advisor', 'emotional_regulator'], required: true },
    prompt: { type: String, required: true },
    response: { type: String, required: true }
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const EveMemoryModel = model<EveMemoryDocument>('EveMemory', EveMemorySchema);
