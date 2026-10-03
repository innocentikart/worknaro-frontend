# Worknaro public marketing site (Next.js)

Modern public-facing website for Worknaro. The authenticated application remains the Django app on port 8000.

## Requirements

- Node.js 20+
- Django Worknaro running locally for Login / Get Started deep links

## Setup

```bash
cd frontend
cp .env.local.example .env.local
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment

| Variable | Purpose | Local default |
|----------|---------|---------------|
| `NEXT_PUBLIC_APP_URL` | Django application origin | `http://127.0.0.1:8000` |
| `NEXT_PUBLIC_SITE_URL` | Marketing site origin (SEO canonical / OG) | `http://localhost:3000` |

The authenticated Django app does not host a separate Privacy Policy. Its footer
**Privacy** link uses Django `LANDING_SITE_URL` / `PUBLIC_PRIVACY_POLICY_URL` and
points at this site’s `/privacy/` page (absolute URL across hosts).

Legal pages are managed in Super Admin → Compliance:

- Privacy Policy → `/privacy/` via `GET /api/v1/public/privacy-policy/`
- Terms of Service → `/terms/` via `GET /api/v1/public/terms-of-service/`

Published versions only; SSR on the Next.js pages.

Deep links:

- Login → `{APP_URL}/accounts/login/`
- Get Started → `{APP_URL}/accounts/register/`
- Contact Sales → `{APP_URL}/billing/contact-sales/`

## Scripts

- `npm run dev` — development server
- `npm run build` — production build
- `npm run start` — serve production build
- `npm run lint` — ESLint

## Architecture note

This site does not implement authentication, billing checkout, or Stripe. Those stay in Django. Production deployments should set Django `CORS_ALLOWED_ORIGINS` / `DJANGO_CSRF_TRUSTED_ORIGINS` to the marketing origin if browser APIs are added later.
