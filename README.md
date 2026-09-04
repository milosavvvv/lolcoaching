# Summit Coaching — League of Legends

Professional one-page LoL coaching site with three plans and Stripe Checkout.

## Local development

1. Install Node.js 18+.
2. Run `npm install`.
3. Copy `.env.example` to `.env`.
4. Add your Stripe secret key and three Stripe Price IDs.
5. Set `CLIENT_URL=http://localhost:5173`.
6. Run `npm run dev`.

## GitHub Pages + Stripe

GitHub Pages hosts the React frontend only. It does **not** run Node/Express, so Stripe's secret key must remain on a separate backend such as Railway.

1. Deploy the `server/` with the root `package.json` to Railway (or another Node host).
2. Add `STRIPE_SECRET_KEY`, `STRIPE_PRICE_STARTER`, `STRIPE_PRICE_ELITE`, `STRIPE_PRICE_PREMIUM`, and `CLIENT_URL=https://milosavvvv.github.io/lolcoaching/` to the backend.
3. In GitHub: **Settings → Secrets and variables → Actions → Variables**, create `VITE_API_URL` with your backend URL, e.g. `https://your-app.up.railway.app`.
4. In GitHub: **Settings → Pages → Source**, choose **GitHub Actions**.
5. Push to `main`. The included workflow builds with Vite's `/lolcoaching/` base path and deploys `dist/` to Pages.

Do not put `STRIPE_SECRET_KEY` in GitHub Pages, `VITE_*` variables, or frontend source code.
