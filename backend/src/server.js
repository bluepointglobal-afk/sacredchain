import http from 'http';
import env from './config/env.js';
import { connectDB } from './config/db.js';
import { createApp } from './app.js';
import { attachSocket } from './realtime/socket.js';
import logger from './utils/logger.js';

async function start() {
  try {
    await connectDB(env.mongoUri);
    const app = createApp();
    const server = http.createServer(app);
    attachSocket(server);
    server.listen(env.port, () => logger.info(`[server] Sacred Knowledge API listening on :${env.port}`));
  } catch (err) {
    logger.error({ err: err.message }, '[server] failed to start');
    process.exit(1);
  }
}

start();
