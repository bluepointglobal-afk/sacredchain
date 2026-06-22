import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    name: String,
    rating: Number,
    date: String,
    body: String,
  },
  { _id: false }
);

const credentialSchema = new mongoose.Schema(
  {
    title: String,
    issuer: String,
    year: String,
  },
  { _id: false }
);

// Weekly recurring availability slot, e.g. { dow: 1, start: '19:00', end: '21:00' }
const slotSchema = new mongoose.Schema(
  { dow: Number, start: String, end: String },
  { _id: false }
);

const teacherSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, index: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    active: { type: Boolean, default: true },
    name: { type: String, required: true },
    ar: String,
    title: String,
    short: String,
    country: String,
    flag: String,
    rating: { type: Number, default: 5 },
    reviews: { type: Number, default: 0 },
    gender: { type: String, enum: ['male', 'female'] },
    track: { type: String, enum: ['student', 'seeker'], default: 'student' },
    languages: [String],
    experience: String,
    price: Number,
    specialties: [String],
    subjects: [String],
    featured: { type: Boolean, default: false },
    photo: String,
    weekend: { type: Boolean, default: false },
    bio: String,
    approach: [String],
    credentials: [credentialSchema],
    reviewList: [reviewSchema],
    availability: [String],
    // structured recurring availability used for booking conflict checks
    slots: { type: [slotSchema], default: [] },
  },
  { timestamps: true }
);

teacherSchema.index({ name: 'text', specialties: 'text', subjects: 'text', short: 'text' });

export default mongoose.model('Teacher', teacherSchema);
