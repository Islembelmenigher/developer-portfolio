# React Developer Portfolio

A personal portfolio website built with React, TypeScript, Tailwind CSS, and Supabase.

It includes:
- A modern portfolio landing page (hero, about, skills, projects, contact)
- An admin panel for managing projects and editable site content
- Project image upload to Supabase Storage
- A contact form powered by a Supabase Edge Function (`send-contact-email`)
- Light/day mode toggle

## Tech Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS + shadcn/ui
- Supabase (Auth, Postgres, Storage, Edge Functions)
- Resend (email delivery in the contact function)

## Project Structure

- `src/` - frontend app
- `src/pages/Admin.tsx` - admin dashboard
- `src/components/portfolio/` - portfolio sections
- `src/hooks/usePortfolioData.ts` - Supabase data hooks
- `supabase/migrations/` - database schema migration(s)
- `supabase/functions/send-contact-email/` - edge function for contact emails

## Prerequisites

- Node.js 18+ (or newer LTS)
- npm
- A Supabase project
- Supabase CLI (recommended): https://supabase.com/docs/guides/cli
- A Resend API key (for contact email sending)

## 1. Clone and Install

```bash
git clone <your-repo-url>
cd <your-project-folder>
npm install
```

## 2. Configure Environment Variables

Create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
```

These are used by `src/integrations/supabase/client.ts`.

## 3. Set Up Supabase Database

Apply the SQL migration(s) from `supabase/migrations/`.

Options:
1. Use Supabase SQL Editor and run the migration SQL manually.
2. Or use CLI:

```bash
supabase link --project-ref <your-project-ref>
supabase db push
```

This creates:
- `projects`
- `skills`
- `testimonials`
- `site_settings`
- Storage bucket: `portfolio-assets`
- Required RLS policies

## 4. Deploy the Contact Edge Function

The contact form calls `send-contact-email`.

Set function secret:

```bash
supabase secrets set RESEND_API_KEY=your_resend_api_key
```

Deploy function:

```bash
supabase functions deploy send-contact-email
```

`verify_jwt` is configured as `false` in `supabase/config.toml` for this function so public contact form requests can work.

## 5. Run Locally

```bash
npm run dev
```

Open the local URL shown by Vite (usually `http://localhost:5173`).

## Admin Access

- Admin page route: `/auth`
- After sign in, you are redirected to `/admin`
- Admin can:
  - Create/edit/delete projects
  - Mark projects as featured
  - Upload project images to Supabase storage
  - Edit site settings (hero/about/social/cv links)

## Important Security Notes

- Do not commit real `.env` values.
- The signup key in `src/pages/Auth.tsx` is currently hardcoded for gated signup. Replace it with your own value before production.
- Review RLS policies in Supabase and tighten them based on your needs.

## Available Scripts

- `npm run dev` - start dev server
- `npm run build` - production build
- `npm run preview` - preview production build locally
- `npm run lint` - run ESLint

## Deployment

You can deploy the frontend to any static host (Vercel, Netlify, Cloudflare Pages, etc.).

After deployment, ensure:
- frontend env vars are set in hosting platform
- Supabase database + storage are configured
- `send-contact-email` function is deployed with `RESEND_API_KEY`

