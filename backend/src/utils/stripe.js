import Stripe from 'stripe';
import env, { featureFlags } from '../config/env.js';

export const stripe = featureFlags.stripe ? new Stripe(env.stripeSecret) : null;

export const stripeEnabled = () => Boolean(stripe);
