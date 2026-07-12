// Reusable seeding routine — used by the standalone `npm run seed` script and by
// demo mode (in-memory Mongo) at server startup. Assumes mongoose is already connected.
import Teacher from '../models/Teacher.js';
import Bundle from '../models/Bundle.js';
import Service from '../models/Service.js';
import Provider from '../models/Provider.js';
import User from '../models/User.js';
import JournalEntry from '../models/JournalEntry.js';
import {
  teachers, bundles, services, providers, demoUser, demoAdmin, demoJournal, defaultSlots,
} from './data.js';

async function upsertUser(spec) {
  let user = await User.findOne({ email: spec.email });
  if (!user) {
    user = new User({
      name: spec.name, first: spec.first, email: spec.email,
      role: spec.role || 'learner', emailVerified: true, onboarding: spec.onboarding,
    });
    await user.setPassword(spec.password);
    await user.save();
  }
  return user;
}

/**
 * Seed catalog + demo users. Idempotent: catalog is replaced, users upserted.
 * @param {object} opts
 * @param {boolean} opts.force  when false, skips if teachers already exist (used in demo mode)
 */
export async function seedDatabase({ force = true } = {}) {
  const existing = await Teacher.estimatedDocumentCount();
  if (!force && existing > 0) return { skipped: true };

  await Promise.all([
    Teacher.deleteMany({}), Bundle.deleteMany({}), Service.deleteMany({}), Provider.deleteMany({}),
  ]);

  await Teacher.insertMany(teachers.map((t) => ({ ...t, slots: defaultSlots })));
  await Bundle.insertMany(bundles);
  await Service.insertMany(services);
  await Provider.insertMany(providers);

  const learner = await upsertUser(demoUser);
  await upsertUser(demoAdmin);

  const hasJournal = await JournalEntry.countDocuments({ user: learner._id });
  if (!hasJournal) {
    await JournalEntry.insertMany(demoJournal.map((j) => ({ ...j, user: learner._id })));
  }

  return {
    skipped: false,
    counts: { teachers: teachers.length, bundles: bundles.length, services: services.length, providers: providers.length },
  };
}
