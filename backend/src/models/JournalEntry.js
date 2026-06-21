import mongoose from 'mongoose';

const journalSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    date: String,
    session: String,
    teacher: String,
    private: { type: Boolean, default: true },
    body: { type: String, required: true },
    tags: [String],
  },
  { timestamps: true }
);

export default mongoose.model('JournalEntry', journalSchema);
