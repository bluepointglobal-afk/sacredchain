import mongoose from 'mongoose';

// One doc per user per day to cap AI usage / cost.
const aiUsageSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    day: { type: String, required: true }, // YYYY-MM-DD
    count: { type: Number, default: 0 },
  },
  { timestamps: true }
);

aiUsageSchema.index({ user: 1, day: 1 }, { unique: true });

export default mongoose.model('AiUsage', aiUsageSchema);
