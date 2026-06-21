import pino from 'pino';
import env from '../config/env.js';

const logger = pino({
  level: env.logLevel,
  transport: env.isProd ? undefined : { target: 'pino-pretty', options: { colorize: true } },
});

export default logger;
