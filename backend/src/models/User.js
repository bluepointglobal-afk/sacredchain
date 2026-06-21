import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const onboardingSchema = new mongoose.Schema(
  {
    pathway: { type: String, enum: ['student', 'seeker', null], default: null },
    answers: { type: Object, default: {} },
    completed: { type: Boolean, default: false },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    first: { type: String, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['learner', 'teacher', 'admin'], default: 'learner' },
    onboarding: { type: onboardingSchema, default: () => ({}) },
    favourites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' }],
  },
  { timestamps: true }
);

userSchema.methods.setPassword = async function setPassword(password) {
  this.passwordHash = await bcrypt.hash(password, 10);
};

userSchema.methods.verifyPassword = function verifyPassword(password) {
  return bcrypt.compare(password, this.passwordHash);
};

userSchema.methods.toSafeJSON = function toSafeJSON() {
  return {
    id: this._id,
    name: this.name,
    first: this.first || this.name.split(' ')[0],
    email: this.email,
    role: this.role,
    onboarding: this.onboarding,
    favourites: this.favourites,
  };
};

export default mongoose.model('User', userSchema);
