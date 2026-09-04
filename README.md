# Summit Coaching — League of Legends

Professional one-page LoL coaching site with three plans and Stripe Checkout integration.

## Setup

1. Install Node.js 18+.
2. Run `npm install`.
3. Copy `.env.example` to `.env`.
4. In Stripe Dashboard, create three one-time Prices and paste their Price IDs into:
   - `STRIPE_PRICE_STARTER`
   - `STRIPE_PRICE_ELITE`
   - `STRIPE_PRICE_PREMIUM`
5. Add your Stripe secret key to `STRIPE_SECRET_KEY` (server-side only).
6. Set `CLIENT_URL` to your deployed frontend URL.
7. Run `npm run dev`.

The checkout endpoint is `/api/create-checkout-session`. It creates a Stripe-hosted Checkout Session using the configured Price ID, then redirects the customer to Stripe.

## Before launch

- Replace `coach@example.com` with your real support email.
- Add your legal business/contact details and privacy/terms pages as required.
- Use Stripe live Price IDs and a live secret key only when ready to accept real payments.
- Configure a production server so `/api/*` is handled by Node/Express and static files are served from the same origin (or adjust CORS/routing accordingly).
