import 'dotenv/config';
import mongoose from 'mongoose';
import { connectDB } from '../config/db.js';
import Teacher from '../models/Teacher.js';
import Bundle from '../models/Bundle.js';
import Service from '../models/Service.js';
import Provider from '../models/Provider.js';
import User from '../models/User.js';
import JournalEntry from '../models/JournalEntry.js';
import {
  teachers, bundles, services, providers, demoUser, demoJournal,
} from './data.js';

async function run() {
  await connectDB(process.env.MONGODB_URI);

  console.log('[seed] clearing catalog collections…');
  await Promise.all([
    Teacher.deleteMany({}),
    Bundle.deleteMany({}),
    Service.deleteMany({}),
    Provider.deleteMany({}),
  ]);

  console.log('[seed] inserting catalog…');
  await Teacher.insertMany(teachers);
  await Bundle.insertMany(bundles);
  await Service.insertMany(services);
  await Provider.insertMany(providers);

  console.log('[seed] upserting demo user…');
  let user = await User.findOne({ email: demoUser.email });
  if (!user) {
    user = new User({
      name: demoUser.name,
      first: demoUser.first,
      email: demoUser.email,
      onboarding: demoUser.onboarding,
    });
    await user.setPassword(demoUser.password);
    await user.save();

    await JournalEntry.deleteMany({ user: user._id });
    await JournalEntry.insertMany(demoJournal.map((j) => ({ ...j, user: user._id })));
  }

  console.log(`[seed] done. Teachers: ${teachers.length}, Bundles: ${bundles.length}, Services: ${services.length}, Providers: ${providers.length}`);
  console.log(`[seed] demo login -> ${demoUser.email} / ${demoUser.password}`);
  await mongoose.connection.close();
  process.exit(0);
}

run().catch((err) => {
  console.error('[seed] failed:', err);
  process.exit(1);
});
