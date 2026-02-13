# فلذة (Faladha) - Arabic Pregnancy Tracking Website

## Overview
A comprehensive Arabic pregnancy tracking website with SEO-optimized content, admin CMS dashboard, and PostgreSQL-backed content management. Dual architecture: Next.js App Router (SSG/ISR) for public pages + Express + Vite + React for admin dashboard. Features full Arabic RTL support and a purple-themed UI.

## Current State
- **Next.js frontend in /web**: All public pages migrated to Next.js App Router with SSG/ISR
  - 40 week-by-week pregnancy pages (SSG with ISR revalidate=86400)
  - 15 symptom pages (SSG with ISR)
  - 10+ blog articles with category/tag pages (SSG with ISR)
  - Pregnancy calculator with Hijri/Gregorian support (Server Component + Client Widget)
  - Static pages: about, privacy, contact, faq, features, how-it-works, medical-review, download
  - SEO: generateMetadata, JSON-LD, sitemap.ts, robots.ts, rss.xml route
  - Revalidation API at /api/revalidate (protected by REVALIDATE_SECRET)
- **Express backend**: Admin CMS dashboard at /admin, authentication, API
- **Legacy client/**: Original Vite SPA (kept for admin, being deprecated for public pages)
- All content served from PostgreSQL database

## Architecture

### Tech Stack
- **Public Frontend (NEW)**: Next.js 16 App Router + TypeScript, Tailwind CSS, SSG/ISR
- **Admin Frontend (legacy)**: React + Vite + TypeScript, Tailwind CSS, Shadcn UI, wouter
- **Backend**: Express.js with session-based auth, bcryptjs, RBAC middleware
- **Database**: PostgreSQL (Replit built-in) with Drizzle ORM
- **Styling**: Purple theme (primary: hsl(265 85% 58%)), RTL layout, IBM Plex Sans Arabic font (next/font)
- **Auth**: express-session with connect-pg-simple, bcryptjs password hashing

### Project Structure
```
web/                          # NEW: Next.js App Router (public pages)
  src/
    app/
      page.tsx                # Homepage (SSG/ISR)
      layout.tsx              # Root layout (RTL, font, Header/Footer)
      sitemap.ts              # Dynamic sitemap from DB
      robots.ts               # robots.txt
      not-found.tsx           # 404 page
      rss.xml/route.ts        # RSS feed
      api/revalidate/route.ts # ISR revalidation endpoint
      pregnancy/
        page.tsx              # Week listing (SSG/ISR)
        [weekSlug]/page.tsx   # Week detail with generateStaticParams (SSG/ISR)
      symptoms/
        page.tsx              # Symptom listing (SSG/ISR)
        [slug]/page.tsx       # Symptom detail (SSG/ISR)
      blog/
        page.tsx              # Blog listing (SSG/ISR)
        [slug]/page.tsx       # Blog article (SSG/ISR)
        category/[slug]/      # Category filter (SSG/ISR)
        tag/[slug]/           # Tag filter (SSG/ISR)
      tools/
        pregnancy-calculator/ # Calculator (Server + Client components)
      about/, faq/, privacy/, contact/, features/, download/,
      how-it-works/, medical-review/   # Static pages
    components/
      Header.tsx, Footer.tsx, Breadcrumbs.tsx, JsonLd.tsx,
      MedicalDisclaimer.tsx, PregnancyMiniCalculator.tsx, CalculatorWidget.tsx
    lib/
      db.ts                   # Drizzle + pg pool (reads from DATABASE_URL)
      data.ts                 # Data access functions (getPublishedWeeks, etc.)
      constants.ts            # SITE_URL, SITE_NAME, SITE_DESCRIPTION
  next.config.js              # Rewrites to Express admin, Turbopack + webpack aliases
  tailwind.config.ts          # Purple theme config
  tsconfig.json               # Path aliases: @/* and @shared/*
client/src/                   # LEGACY: Vite SPA (admin dashboard)
  pages/admin/                # Admin CMS pages
  components/, lib/, data/
server/
  routes.ts                   # API routes: auth, admin CRUD, public API
  storage.ts                  # DatabaseStorage class
  auth.ts, db.ts, seed.ts, vite.ts
shared/
  schema.ts                   # Drizzle ORM schema (shared between Next.js and Express)
```

### Database Tables
- **users**: id, email, password (bcrypt), name, role (admin/editor)
- **sessions**: sid, sess (jsonb), expire (connect-pg-simple)
- **blog_posts**: id, slug, title, metaTitle, metaDescription, summary, content, category, categorySlug, tags[], tagSlugs[], sections (jsonb), faqs (jsonb), status, publishedAt
- **pregnancy_weeks**: id, weekNumber, slug, title, metaTitle, metaDescription, summary, trimester, fetusSize (jsonb), fetalDevelopment[], motherSymptoms[], tips[], whenToCallDoctor[], faq (jsonb), relatedSymptoms[], status
- **symptoms**: id, slug, title, metaTitle, metaDescription, summary, causes[], remedies[], whenToWorry[], trimester, relatedWeeks[], faq (jsonb), status
- **tools_content**: id, toolSlug, title, metaTitle, metaDescription, intro, sections (jsonb), faq (jsonb), settings (jsonb)
- **site_settings**: id, key, value (jsonb)

### API Routes

#### Auth API
- POST `/api/auth/login` - Login with email/password
- POST `/api/auth/logout` - Logout
- GET `/api/auth/me` - Get current user

#### Admin API (requires authentication)
- GET/POST `/api/admin/blog` - List/create blog posts (editor+)
- GET/PATCH/DELETE `/api/admin/blog/:id` - Read/update/delete blog post
- GET/POST `/api/admin/weeks` - List/create weeks (editor+)
- GET/PATCH/DELETE `/api/admin/weeks/:id` - Read/update/delete week
- GET/POST `/api/admin/symptoms` - List/create symptoms (editor+)
- GET/PATCH/DELETE `/api/admin/symptoms/:id` - Read/update/delete symptom
- GET/PUT `/api/admin/tools/:slug` - Read/upsert tool content
- GET `/api/admin/settings` - List settings
- PUT `/api/admin/settings/:key` - Upsert setting (admin only)
- GET `/api/admin/health` - Content health report

#### Public API (no auth)
- GET `/api/public/weeks` - Published weeks
- GET `/api/public/weeks/:slug` - Published week by slug
- GET `/api/public/symptoms` - Published symptoms
- GET `/api/public/symptoms/:slug` - Published symptom by slug
- GET `/api/public/blog` - Published blog posts
- GET `/api/public/blog/:slug` - Published blog post by slug
- GET `/api/public/settings` - Public settings

### Key Routes (Frontend)
- `/` - Homepage with SEO content and mini calculator
- `/tools/pregnancy-calculator` - Cornerstone pregnancy calculator
- `/tools/due-date-calculator` - Due date calculator
- `/pregnancy` - Week listing page
- `/pregnancy/week-{1-40}` - Individual week detail pages
- `/symptoms` - Symptom listing page
- `/symptoms/{slug}` - Individual symptom detail pages
- `/blog` - Blog listing
- `/blog/{slug}` - Blog article detail
- `/admin/login` - Admin login
- `/admin` - Admin dashboard
- `/admin/blog` - Blog management
- `/admin/weeks` - Week management
- `/admin/symptoms` - Symptom management
- `/admin/health` - Content health dashboard

### Admin Credentials (Default)
- Email: admin@faladha.com
- Password: admin123456
- Role: admin

### SEO Strategy
- H1 on homepage targets "حاسبة الحمل الدقيقة بالهجري والميلادي"
- H2 sections target: "حاسبة الحمل بالهجري", "حاسبة الحمل بالميلادي", "حاسبة الحمل بالأسابيع والأشهر"
- Calculator page has 1500+ words of SEO content with 8 FAQ items
- JSON-LD: FAQPage, BreadcrumbList, WebApplication, Organization, WebSite schemas
- Sitemap dynamically generated from database with lastmod timestamps

### Running the Project
- **Current (Express + Vite)**: `npm run dev` starts Express on port 5000
- **Next.js (public pages)**: `cd web && npx next dev -p 5000 --hostname 0.0.0.0`
- **Both together**: `bash start-all.sh` (Express on 5001, Next.js on 5000)
- **Build Next.js**: `cd web && npx next build`
- **Vercel deployment**: Deploy /web with env vars: DATABASE_URL, REVALIDATE_SECRET, SITE_URL

### Important Notes
- Hijri calendar conversion is done client-side (no external API)
- All content is in Arabic with RTL support
- Week data uses `weekNumber` field (not `week`)
- Express app binds to port 5000 (legacy) or 5001 (when running with Next.js)
- Next.js reads DB directly via shared/schema.ts (no API dependency for SSG)
- Do NOT modify vite.ts, drizzle.config.ts, or package.json scripts
- Database is the source of truth; static data files kept as reference only
- Run `npx tsx server/seed.ts` to seed/reseed the database
- Next.js rewrites /admin/* and /api/admin/* to Express on port 5001

## User Preferences
- Purple color theme
- Arabic-first design
- SEO-focused content with keyword targeting
- Medical accuracy with disclaimer on all pages
- Hijri calendar support is critical
