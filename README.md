# NEXUS — GitHub Pages + Stripe

A polished, responsive League of Legends-inspired coaching landing page built with plain HTML, CSS and JavaScript.

## Why this architecture works on GitHub Pages

GitHub Pages is static hosting. It cannot safely run a Stripe server endpoint or store a Stripe secret key.

This project therefore uses **Stripe Payment Links**: each pricing button opens Stripe's hosted Checkout page. Your GitHub Pages site never receives or stores card information.

### Configure Stripe

1. In Stripe Dashboard, create three products/prices:
   - Solo Queue — $19/month
   - Climb Lab — $49/month
   - Challenger Room — $99/month
2. Create a Payment Link for each price.
3. Open `index.html`.
4. Replace:
   - `https://buy.stripe.com/REPLACE_SOLO_QUEUE`
   - `https://buy.stripe.com/REPLACE_CLIMB_LAB`
   - `https://buy.stripe.com/REPLACE_CHALLENGER_ROOM`
   with your actual Stripe Payment Links.
5. Commit and push.

## Deploy to GitHub Pages

This is a no-build static site.

1. Create a GitHub repository.
2. Upload `index.html`, `styles.css`, `script.js`, and this README.
3. In **Settings → Pages**, choose **Deploy from a branch**, then your main branch and `/ (root)`.
4. Save.

You can also use GitHub Actions if you prefer.

## Important

Do **not** put a Stripe secret key (`sk_live_...` / `sk_test_...`) into this repository.

If you need custom Stripe Checkout Sessions, webhooks, customer accounts, license provisioning, or server-side order validation, keep the frontend on GitHub Pages and add a separate backend/serverless function (for example, a Stripe-supported server environment). Never expose the secret key in browser JavaScript.

## Branding

NEXUS is an independent concept and is not affiliated with or endorsed by Riot Games.
