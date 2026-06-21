'use client';

import { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { Api } from '@/lib/api';
import { Icon } from './icons';

let stripePromiseCache = null;
function getStripePromise(pk) {
  if (!pk) return null;
  if (!stripePromiseCache) stripePromiseCache = loadStripe(pk);
  return stripePromiseCache;
}

/**
 * StripeCheckout — creates a PaymentIntent for the given line item and renders
 * Stripe's PaymentElement. When Stripe isn't configured on the server, it falls
 * back to a "demo" pay button so the flow still completes.
 */
export default function StripeCheckout({ kind, bundleSlug, amount, label = 'Pay now', onSuccess }) {
  const [config, setConfig] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);
  const [mock, setMock] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const cfg = await Api.paymentConfig();
        if (!active) return;
        setConfig(cfg);
        const intent = await Api.paymentIntent({ kind, bundleSlug, amount });
        if (!active) return;
        if (intent.mock || !intent.clientSecret) setMock(true);
        else setClientSecret(intent.clientSecret);
      } catch (e) {
        setError(e.message);
      }
    })();
    return () => { active = false; };
  }, [kind, bundleSlug, amount]);

  if (error) return <p className="text-[14px] font-semibold text-live">{error}</p>;

  // Server has no Stripe keys → demo flow
  if (mock) {
    return (
      <div>
        <div className="mb-4 rounded-[11px] bg-brand-tint px-4 py-3 text-[13px] text-[#3C6B58]">
          Payments are in <b>demo mode</b> (no Stripe keys configured). Click below to simulate a successful payment.
        </div>
        <button onClick={() => onSuccess?.({ mock: true })} className="btn-primary w-full !py-3.5">
          {label} (demo) · ${amount}
        </button>
      </div>
    );
  }

  const stripePromise = getStripePromise(config?.publishableKey);
  if (!clientSecret || !stripePromise) {
    return <p className="text-muted">Preparing secure checkout…</p>;
  }

  return (
    <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: 'flat', variables: { colorPrimary: '#0F5C46' } } }}>
      <InnerForm label={label} amount={amount} onSuccess={onSuccess} />
    </Elements>
  );
}

function InnerForm({ label, amount, onSuccess }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function submit(e) {
    e.preventDefault();
    if (!stripe || !elements) return;
    setLoading(true);
    setError('');
    const { error: err, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: 'if_required',
    });
    if (err) {
      setError(err.message);
      setLoading(false);
      return;
    }
    if (paymentIntent && paymentIntent.status === 'succeeded') {
      onSuccess?.({ paymentIntentId: paymentIntent.id });
    }
    setLoading(false);
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <PaymentElement />
      {error && <p className="text-[13.5px] font-semibold text-live">{error}</p>}
      <button disabled={!stripe || loading} className="btn-primary w-full !py-3.5 disabled:opacity-60">
        {loading ? 'Processing…' : `${label} · $${amount}`} <Icon name="check" size={16} />
      </button>
    </form>
  );
}
