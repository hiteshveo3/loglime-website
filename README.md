# Loglime Restaurant SaaS

Restaurant-first Loglime SaaS built with Next.js App Router, TypeScript, CSS variables, Tailwind, and Supabase.

## Quick Start

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

The app runs in demo mode when Supabase environment variables are missing. Add the values from `.env.example` to connect auth, database, and realtime.

## Main Areas

- Marketing: `/`, `/pricing`, `/products/restaurant`, `/solutions/restaurants`, `/demo`, `/contact`
- Auth: `/signup`, `/login`, `/onboarding`
- Restaurant app: `/app/dashboard`, `/app/floor`, `/app/orders`, `/app/kitchen`, `/app/menu`, `/app/staff`, `/app/settings`

## Supabase

Run the migration in `supabase/migrations/0001_restaurant_core.sql` in a Supabase project. The schema is multi-tenant with organization-scoped RLS policies.
