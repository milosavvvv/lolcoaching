const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const Stripe = require('stripe');

dotenv.config();
const app = express();
const port = process.env.PORT || 4242;
const stripe = process.env.STRIPE_SECRET_KEY ? Stripe(process.env.STRIPE_SECRET_KEY) : null;

app.use(express.json());

// Allow the GitHub Pages frontend to call this API. Set CLIENT_URL to your Pages URL.
app.use((req, res, next) => {
  const origin = process.env.CLIENT_URL;
  if (origin) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

const plans = {
  starter: { price: process.env.STRIPE_PRICE_STARTER, name: 'Climb Session' },
  elite: { price: process.env.STRIPE_PRICE_ELITE, name: 'Elite Coaching' },
  premium: { price: process.env.STRIPE_PRICE_PREMIUM, name: 'Pro Package' }
};

app.post('/api/create-checkout-session', async (req, res) => {
  try {
    if (!stripe) return res.status(500).json({ error: 'Stripe is not configured. Add STRIPE_SECRET_KEY to .env.' });
    const plan = plans[req.body.plan];
    if (!plan?.price) return res.status(400).json({ error: 'This plan is not configured with a Stripe Price ID.' });
    const base = process.env.CLIENT_URL || 'http://localhost:5173';
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [{ price: plan.price, quantity: 1 }],
      success_url: `${base}/?checkout=success`,
      cancel_url: `${base}/?checkout=cancelled`,
      billing_address_collection: 'auto',
      allow_promotion_codes: true,
      metadata: { coaching_plan: req.body.plan }
    });
    res.json({ url: session.url });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message || 'Unable to create checkout session.' });
  }
});

const dist = path.join(__dirname, '..', 'dist');
app.use(express.static(dist));
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api/')) return next();
  res.sendFile(path.join(dist, 'index.html'));
});

app.listen(port, () => console.log(`Server running on port ${port}`));
