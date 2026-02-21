import { Schema, model, Types } from 'mongoose';

export interface SceneConfigDocument {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  config: Record<string, unknown>;
  generationProvider: 'three-native' | 'spline' | 'luma';
  status: 'pending' | 'ready' | 'failed';
  createdAt: Date;
  updatedAt: Date;
}

const SceneConfigSchema = new Schema<SceneConfigDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', index: true, required: true },
    config: { type: Schema.Types.Mixed, required: true },
    generationProvider: { type: String, enum: ['three-native', 'spline', 'luma'], default: 'three-native' },
    status: { type: String, enum: ['pending', 'ready', 'failed'], default: 'ready' }
  },
  { timestamps: true }
);

export const SceneConfigModel = model<SceneConfigDocument>('SceneConfig', SceneConfigSchema);
