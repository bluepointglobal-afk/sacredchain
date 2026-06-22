import { asyncHandler } from '../middleware/error.js';
import { stripe, stripeEnabled } from '../utils/stripe.js';
import { featureFlags } from '../config/env.js';
import Booking from '../models/Booking.js';
import Enrollment from '../models/Enrollment.js';
import Bundle from '../models/Bundle.js';
import logger from '../utils/logger.js';

async function ensureCustomer(user) {
  if (!stripeEnabled()) return null;
  if (user.stripeCustomerId) return user.stripeCustomerId;
  const customer = await stripe.customers.create({ email: user.email, name: user.name, metadata: { userId: user._id.toString() } });
  user.stripeCustomerId = customer.id;
  await user.save();
  return customer.id;
}

// GET /api/payments/config — publishable key + whether payments are live
export const config = asyncHandler(async (req, res) => {
  res.json({ enabled: featureFlags.stripe, publishableKey: process.env.STRIPE_PUBLISHABLE_KEY || '' });
});

// POST /api/payments/intent  body: { kind: 'booking'|'bundle', refId }
// Creates a PaymentIntent for a paid lesson or a bundle enrolment.
export const createIntent = asyncHandler(async (req, res) => {
  const { kind, bundleSlug, amount, currency = 'usd' } = req.body;

  let computedAmount = amount;
  let metadata = { userId: req.user._id.toString(), kind };

  if (kind === 'bundle') {
    const bundle = await Bundle.findOne({ slug: bundleSlug });
    if (!bundle) return res.status(404).json({ error: 'Bundle not found' });
    computedAmount = bundle.price;
    metadata.bundleSlug = bundleSlug;
  }

  if (!computedAmount || computedAmount <= 0) {
    return res.status(400).json({ error: 'A positive amount is required' });
  }

  if (!stripeEnabled()) {
    // Dev fallback: no Stripe configured — return a mock so the UI can proceed.
    return res.json({ mock: true, clientSecret: null, amount: computedAmount, currency });
  }

  const customerId = await ensureCustomer(req.user);
  const intent = await stripe.paymentIntents.create({
    amount: Math.round(computedAmount * 100),
    currency,
    customer: customerId,
    automatic_payment_methods: { enabled: true },
    metadata,
  });

  res.json({ clientSecret: intent.client_secret, paymentIntentId: intent.id, amount: computedAmount, currency });
});

// POST /api/payments/webhook — Stripe events (raw body)
export const webhook = asyncHandler(async (req, res) => {
  if (!stripeEnabled()) return res.json({ received: true, ignored: true });
  const sig = req.headers['stripe-signature'];
  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    logger.warn({ err: err.message }, '[stripe] webhook signature failed');
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'payment_intent.succeeded') {
    const intent = event.data.object;
    const { kind, bundleSlug, userId } = intent.metadata || {};
    if (kind === 'bundle' && bundleSlug && userId) {
      const bundle = await Bundle.findOne({ slug: bundleSlug });
      await Enrollment.findOneAndUpdate(
        { user: userId, bundleSlug },
        { $set: { paymentStatus: 'paid', paymentIntentId: intent.id, bundleName: bundle?.name, teacherSlug: bundle?.teacherSlug, price: bundle?.price, status: 'active' } },
        { upsert: true, new: true }
      );
    }
    await Booking.updateOne({ paymentIntentId: intent.id }, { $set: { paymentStatus: 'paid', status: 'confirmed' } });
    logger.info({ intent: intent.id }, '[stripe] payment succeeded');
  }

  res.json({ received: true });
});
