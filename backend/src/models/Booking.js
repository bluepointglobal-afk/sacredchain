import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true },
    bundleSlug: String,
    day: String,
    time: String,
    sessionType: { type: String, enum: ['video', 'voice'], default: 'video' },
    notes: String,
    isTrial: { type: Boolean, default: true },
    price: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'completed', 'cancelled'],
      default: 'confirmed',
    },
  },
  { timestamps: true }
);

export default mongoose.model('Booking', bookingSchema);
