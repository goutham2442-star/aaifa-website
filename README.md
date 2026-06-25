# Avighna Abhyasa Institute of Fine Arts (AAIFA) — Website

Official redesigned website for AAIFA, a Bengaluru-based institute for
Bharatanatyam, Carnatic Music, Mridangam, and Drawing & Painting,
founded by Guru Smt. Haripriya Pettem.

## Tech Stack
- Next.js 14 (App Router, TypeScript strict)
- Tailwind CSS v3 + shadcn/ui
- Framer Motion
- Supabase (Postgres + RLS)
- Resend (transactional email)
- Vercel (hosting)

## Getting Started

```bash
npm install
cp .env.example .env.local   # fill in real Supabase + Resend keys
npm run dev
```

Visit http://localhost:3000

## Database Setup
Run `supabase/schema.sql` in your Supabase project's SQL Editor before
testing the contact form.

## Deployment
This project deploys to Vercel, connected to:
`https://github.com/goutham2442-star/aaifa-website`

Push to `main` to trigger a production deployment automatically once
the Vercel project is linked (see Step 8 of the build prompts).

## Project Structure
```
app/                Next.js App Router pages & API routes
components/         UI components (layout, home, programs, gallery, contact, about, shared, ui)
lib/                constants, types, validations, supabase clients & queries
supabase/           SQL schema
```
