import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true, index: true },
    bundleSlug: String,

    // scheduling
    day: String,
    time: String,
    startAt: { type: Date, index: true },
    durationMins: { type: Number, default: 60 },

    sessionType: { type: String, enum: ['video', 'voice'], default: 'video' },
    notes: String,
    isTrial: { type: Boolean, default: true },

    // video room (Jitsi)
    roomName: String,

    // payment
    price: { type: Number, default: 0 },
    currency: { type: String, default: 'usd' },
    paymentStatus: { type: String, enum: ['none', 'pending', 'paid', 'refunded', 'failed'], default: 'none' },
    paymentIntentId: String,

    status: {
      type: String,
      enum: ['pending', 'confirmed', 'completed', 'cancelled'],
      default: 'confirmed',
    },
  },
  { timestamps: true }
);

export default mongoose.model('Booking', bookingSchema);
