import 'dotenv/config';
import mongoose from 'mongoose';
import env from '../config/env.js';
import { connectDB } from '../config/db.js';
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
    user = new User({ name: spec.name, first: spec.first, email: spec.email, role: spec.role || 'learner', emailVerified: true, onboarding: spec.onboarding });
    await user.setPassword(spec.password);
    await user.save();
  }
  return user;
}

async function run() {
  await connectDB(env.mongoUri);

  console.log('[seed] clearing catalog collections…');
  await Promise.all([Teacher.deleteMany({}), Bundle.deleteMany({}), Service.deleteMany({}), Provider.deleteMany({})]);

  console.log('[seed] inserting catalog…');
  await Teacher.insertMany(teachers.map((t) => ({ ...t, slots: defaultSlots })));
  await Bundle.insertMany(bundles);
  await Service.insertMany(services);
  await Provider.insertMany(providers);

  console.log('[seed] upserting demo users…');
  const learner = await upsertUser(demoUser);
  await upsertUser(demoAdmin);

  const hasJournal = await JournalEntry.countDocuments({ user: learner._id });
  if (!hasJournal) {
    await JournalEntry.insertMany(demoJournal.map((j) => ({ ...j, user: learner._id })));
  }

  console.log(`[seed] done. Teachers: ${teachers.length}, Bundles: ${bundles.length}, Services: ${services.length}, Providers: ${providers.length}`);
  console.log(`[seed] learner login -> ${demoUser.email} / ${demoUser.password}`);
  console.log(`[seed] admin login   -> ${demoAdmin.email} / ${demoAdmin.password}`);
  await mongoose.connection.close();
  process.exit(0);
}

run().catch((err) => {
  console.error('[seed] failed:', err);
  process.exit(1);
});
