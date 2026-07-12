import http from 'http';
import env from './config/env.js';
import { connectDB } from './config/db.js';
import { createApp } from './app.js';
import { attachSocket } from './realtime/socket.js';
import logger from './utils/logger.js';

async function start() {
  try {
    let uri = env.mongoUri;
    let demo = false;

    // Zero-setup demo mode: no MONGODB_URI → start an in-memory MongoDB and seed it.
    if (!uri) {
      logger.warn('[demo] No MONGODB_URI set — starting in-memory MongoDB (demo mode).');
      const { startMemoryMongo } = await import('./config/demoDb.js');
      uri = await startMemoryMongo();
      demo = true;
    }

    await connectDB(uri);

    if (demo) {
      const { seedDatabase } = await import('./seed/seedCore.js');
      await seedDatabase({ force: false });
      logger.info('DEMO MODE — in-memory database seeded (data is ephemeral).');
      logger.info('Login: amina@example.com / password123  |  Admin: admin@example.com / password123');
      logger.info('Set MONGODB_URI in .env to use a persistent database.');
    }

    const app = createApp();
    const server = http.createServer(app);
    attachSocket(server);
    server.listen(env.port, () => logger.info(`[server] Sacred Knowledge API listening on :${env.port}${demo ? ' (demo mode)' : ''}`));
  } catch (err) {
    logger.error({ err: err.message }, '[server] failed to start');
    process.exit(1);
  }
}

start();
