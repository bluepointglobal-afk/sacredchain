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

// Hashed refresh tokens for rotation / revocation.
const refreshTokenSchema = new mongoose.Schema(
  {
    jti: String,
    hash: String,
    expiresAt: Date,
    createdAt: { type: Date, default: Date.now },
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

    emailVerified: { type: Boolean, default: false },
    verifyTokenHash: { type: String, default: null },
    resetTokenHash: { type: String, default: null },
    resetTokenExpires: { type: Date, default: null },

    refreshTokens: { type: [refreshTokenSchema], default: [] },

    stripeCustomerId: { type: String, default: null },
    teacherProfile: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', default: null },

    onboarding: { type: onboardingSchema, default: () => ({}) },
    favourites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' }],
  },
  { timestamps: true }
);

userSchema.methods.setPassword = async function setPassword(password) {
  this.passwordHash = await bcrypt.hash(password, 12);
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
    emailVerified: this.emailVerified,
    onboarding: this.onboarding,
    favourites: this.favourites,
    teacherProfile: this.teacherProfile,
  };
};

export default mongoose.model('User', userSchema);
