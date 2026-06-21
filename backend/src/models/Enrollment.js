import mongoose from 'mongoose';

const enrollmentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    bundleSlug: { type: String, required: true },
    bundleName: String,
    teacherSlug: String,
    price: Number,
    currency: { type: String, default: 'usd' },
    paymentStatus: { type: String, enum: ['pending', 'paid', 'refunded', 'failed'], default: 'pending' },
    paymentIntentId: String,
    progress: { type: Number, default: 0 },
    status: { type: String, enum: ['active', 'completed', 'cancelled'], default: 'active' },
  },
  { timestamps: true }
);

enrollmentSchema.index({ user: 1, bundleSlug: 1 }, { unique: true });

export default mongoose.model('Enrollment', enrollmentSchema);
