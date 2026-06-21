import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import env from './config/env.js';
import routes from './routes/index.js';
import { webhook } from './controllers/paymentController.js';
import { notFound, errorHandler } from './middleware/error.js';
import { initSentry, Sentry } from './utils/sentry.js';

export function createApp() {
  const app = express();
  const sentry = initSentry();

  app.set('trust proxy', 1);
  app.use(helmet());
  app.use(
    cors({
      origin: env.clientOrigin.split(','),
      credentials: true,
    })
  );
  app.use(cookieParser());
  if (env.nodeEnv !== 'test') app.use(morgan('dev'));

  // Stripe webhook needs the raw body and must be mounted BEFORE the JSON parser.
  app.post('/api/payments/webhook', express.raw({ type: 'application/json' }), webhook);

  app.use(express.json({ limit: '1mb' }));

  // Auth endpoints get a tighter rate limit to slow brute force.
  app.use('/api/auth', rateLimit({ windowMs: 60 * 1000, max: 30, standardHeaders: true, legacyHeaders: false }));
  app.use('/api', rateLimit({ windowMs: 60 * 1000, max: 200, standardHeaders: true, legacyHeaders: false }));

  app.get('/', (req, res) => res.json({ service: 'Sacred Knowledge API', docs: '/api/health' }));
  app.use('/api', routes);

  app.use(notFound);
  if (sentry) Sentry.setupExpressErrorHandler(app);
  app.use(errorHandler);

  return app;
}

export default createApp;
