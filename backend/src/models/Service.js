import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, index: true },
    icon: String,
    name: { type: String, required: true },
    cat: String,
    desc: String,
    from: Number,
    providers: Number,
    deliver: String,
    includes: [String],
  },
  { timestamps: true }
);

export default mongoose.model('Service', serviceSchema);
