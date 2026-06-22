import * as Sentry from '@sentry/node';
import env, { featureFlags } from '../config/env.js';

export function initSentry() {
  if (!featureFlags.sentry) return null;
  Sentry.init({ dsn: env.sentryDsn, environment: env.nodeEnv, tracesSampleRate: 0.1 });
  return Sentry;
}

export { Sentry };
