import { Schema, model, Types } from 'mongoose';

export interface BlueprintDocument {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  identity: string;
  home: Record<string, unknown>;
  cars: string[];
  body: Record<string, unknown>;
  relationship: Record<string, unknown>;
  wealth: Record<string, unknown>;
  dailyRoutine: Record<string, unknown>;
  emotionalState: string[];
  affirmations: string[];
  completionPercentage: number;
  createdAt: Date;
  updatedAt: Date;
}

const BlueprintSchema = new Schema<BlueprintDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', index: true, required: true },
    identity: { type: String, default: '' },
    home: { type: Schema.Types.Mixed, default: {} },
    cars: { type: [String], default: [] },
    body: { type: Schema.Types.Mixed, default: {} },
    relationship: { type: Schema.Types.Mixed, default: {} },
    wealth: { type: Schema.Types.Mixed, default: {} },
    dailyRoutine: { type: Schema.Types.Mixed, default: {} },
    emotionalState: { type: [String], default: [] },
    affirmations: { type: [String], default: [] },
    completionPercentage: { type: Number, default: 0 }
  },
  { timestamps: true }
);

BlueprintSchema.index({ userId: 1 }, { unique: true });

export const BlueprintModel = model<BlueprintDocument>('Blueprint', BlueprintSchema);
