# MHIDEY'S HUB💎💕

Affordable wears you’ll love. This is a Next.js + Prisma storefront with WhatsApp checkout and a simple admin dashboard.

## Setup

1) Install dependencies

```bash
npm install
```

2) Configure environment

Copy `.env.example` to `.env` and set values. Make sure `NEXT_PUBLIC_WHATSAPP_NUMBER` is set to your business WhatsApp number.
For Supabase, set `DATABASE_URL` to the Transaction Pooler string and `DIRECT_URL` to the Direct (or Session Pooler) string.

3) Initialize the database

```bash
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
```

4) Run the dev server

```bash
npm run dev
```

## Admin

- Visit `/admin/login`
- Sign in with the seeded admin user (from env vars)

## Deployment

- Recommended: Vercel + Postgres (Supabase). Update `DATABASE_URL` and `DIRECT_URL`.
- Ensure `NEXTAUTH_URL`, `NEXTAUTH_SECRET`, and admin envs are set.
- If Cloudinary keys are configured, uploads go to Cloudinary; otherwise local `/public/uploads` is used in dev.

## Notes

- WhatsApp checkout uses `NEXT_PUBLIC_WHATSAPP_NUMBER` and builds a prefilled message.
- Products and categories are seeded with realistic placeholders.