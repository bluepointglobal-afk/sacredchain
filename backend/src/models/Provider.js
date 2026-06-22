import mongoose from 'mongoose';

const providerSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    firm: String,
    initials: String,
    rating: { type: Number, default: 5 },
    jobs: { type: Number, default: 0 },
    country: String,
    skills: [String],
    rate: Number,
  },
  { timestamps: true }
);

export default mongoose.model('Provider', providerSchema);
