import mongoose from 'mongoose';

// "Become a teacher" applications + SacredChain B2B briefs.
const applicationSchema = new mongoose.Schema(
  {
    kind: { type: String, enum: ['teacher', 'brief'], required: true },
    // teacher application fields
    name: String,
    email: String,
    phone: String,
    gender: String,
    bio: String,
    specialties: [String],
    // SacredChain brief fields
    serviceSlug: String,
    organisation: String,
    details: String,
    status: { type: String, enum: ['submitted', 'reviewing', 'accepted', 'rejected'], default: 'submitted' },
  },
  { timestamps: true }
);

export default mongoose.model('Application', applicationSchema);
