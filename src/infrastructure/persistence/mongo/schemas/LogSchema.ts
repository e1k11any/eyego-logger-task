import { Schema, model } from 'mongoose';

const LogSchema = new Schema(
  {
    userId: { type: String, required: true, index: true },
    action: { type: String, required: true },
    timestamp: { type: Date, required: true, default: Date.now },
    metadata: { type: Schema.Types.Mixed, required: false },
  },
  { timestamps: true }
);

export const LogModel = model('Log', LogSchema);
