import 'dotenv/config';

const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  isProd: process.env.NODE_ENV === 'production',
  port: parseInt(process.env.PORT || '5000', 10),
  clientOrigin: process.env.CLIENT_ORIGIN || 'http://localhost:3000',
  publicApiUrl: process.env.PUBLIC_API_URL || 'http://localhost:5000',

  mongoUri: process.env.MONGODB_URI,

  jwtSecret: process.env.JWT_SECRET || 'dev-insecure-secret',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '15m',
  refreshSecret: process.env.REFRESH_SECRET || 'dev-insecure-refresh',
  refreshExpiresIn: process.env.REFRESH_EXPIRES_IN || '30d',
  cookieDomain: process.env.COOKIE_DOMAIN || undefined,

  anthropicKey: process.env.ANTHROPIC_API_KEY || '',
  anthropicModel: process.env.ANTHROPIC_MODEL || 'claude-haiku-4-5-20251001',

  stripeSecret: process.env.STRIPE_SECRET_KEY || '',
  stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET || '',
  stripePublishable: process.env.STRIPE_PUBLISHABLE_KEY || '',

  smtpHost: process.env.SMTP_HOST || '',
  smtpPort: parseInt(process.env.SMTP_PORT || '587', 10),
  smtpUser: process.env.SMTP_USER || '',
  smtpPass: process.env.SMTP_PASS || '',
  mailFrom: process.env.MAIL_FROM || 'Sacred Knowledge <no-reply@sacredknowledge.app>',

  awsRegion: process.env.AWS_REGION || 'eu-west-1',
  awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
  awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  s3Bucket: process.env.S3_BUCKET || '',

  jitsiDomain: process.env.JITSI_DOMAIN || 'meet.jit.si',

  sentryDsn: process.env.SENTRY_DSN || '',
  logLevel: process.env.LOG_LEVEL || 'info',
};

export const featureFlags = {
  stripe: Boolean(env.stripeSecret),
  email: Boolean(env.smtpHost && env.smtpUser),
  s3: Boolean(env.awsAccessKeyId && env.s3Bucket),
  ai: Boolean(env.anthropicKey),
  sentry: Boolean(env.sentryDsn),
};

export default env;
