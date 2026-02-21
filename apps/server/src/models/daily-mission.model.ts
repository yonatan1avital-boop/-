import { Schema, model, Types } from 'mongoose';

export interface DailyMissionDocument {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  day: number;
  title: string;
  description: string;
  unlocked: boolean;
  completed: boolean;
  completedAt?: Date;
}

const DailyMissionSchema = new Schema<DailyMissionDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    day: { type: Number, min: 1, max: 30, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    unlocked: { type: Boolean, default: false },
    completed: { type: Boolean, default: false },
    completedAt: { type: Date }
  },
  { timestamps: true }
);

DailyMissionSchema.index({ userId: 1, day: 1 }, { unique: true });

export const DailyMissionModel = model<DailyMissionDocument>('DailyMission', DailyMissionSchema);
