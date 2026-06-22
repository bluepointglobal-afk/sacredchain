import mongoose from 'mongoose';

const bundleSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, index: true },
    subject: String,
    name: { type: String, required: true },
    desc: String,
    weeks: Number,
    perWeek: Number,
    mins: Number,
    level: String,
    price: Number,
    teacherSlug: String,
    rating: { type: Number, default: 5 },
    featured: { type: Boolean, default: false },
    curriculum: [{ title: String, detail: String }],
    includes: [String],
    faq: [{ q: String, a: String }],
  },
  { timestamps: true }
);

export default mongoose.model('Bundle', bundleSchema);
