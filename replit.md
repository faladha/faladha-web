# فلذة (Faladha) - Arabic Pregnancy Tracking Website

## Overview
A comprehensive Arabic pregnancy tracking website with SEO-optimized content, admin CMS dashboard, and PostgreSQL-backed content management. Built with Express + Vite + React, featuring full Arabic RTL support and a purple-themed UI.

## Current State
- Fully functional website with 40 week-by-week pregnancy pages, 15 symptom pages, 10 blog articles
- Pregnancy calculator supporting both Hijri and Gregorian calendars
- SEO-optimized homepage with keyword-rich H2 sections and mini calculator
- JSON-LD structured data on all pages (FAQ, Breadcrumb, WebApplication, Organization)
- Sitemap at /sitemap.xml dynamically generated from database
- RSS feed at /rss.xml for published blog posts
- Admin CMS dashboard at /admin with authentication and RBAC
- All content served from PostgreSQL database via public API

## Architecture

### Tech Stack
- **Frontend**: React + Vite + TypeScript, Tailwind CSS, Shadcn UI, wouter (routing)
- **Backend**: Express.js with session-based auth, bcryptjs, RBAC middleware
- **Database**: PostgreSQL (Replit built-in) with Drizzle ORM
- **Styling**: Purple theme (primary: hsl(265 85% 58%)), RTL layout, IBM Plex Sans Arabic font
- **Auth**: express-session with connect-pg-simple, bcryptjs password hashing

### Project Structure
```
client/src/
  pages/
    admin/          # Admin CMS pages (AdminLogin, AdminLayout, AdminDashboard, etc.)
    Home.tsx, WeekDetail.tsx, SymptomDetail.tsx, BlogDetail.tsx, etc.
  components/
    layout/         # Header, Footer, Breadcrumbs
    sections/       # Hero, Features, HowItWorks, Stats, Testimonials, CTABanner, FAQAccordion, MedicalDisclaimer
    seo/            # JsonLd structured data components
    ui/             # Shadcn UI components
  data/             # Static content data (kept as reference, DB is source of truth)
  lib/
    queryClient.ts  # React Query setup with default fetcher
    auth.tsx        # Auth context provider (useAuth hook)
server/
  routes.ts         # All API routes: auth, admin CRUD, public API, sitemap, RSS
  storage.ts        # DatabaseStorage class with IStorage interface
  auth.ts           # Auth middleware: requireAuth, requireAdmin, requireEditor
  db.ts             # Drizzle + pg pool setup
  seed.ts           # Database seeder (run with: npx tsx server/seed.ts)
  vite.ts           # Vite dev server setup (DO NOT MODIFY)
shared/
  schema.ts         # Drizzle ORM schema for all 7 tables + Zod insert schemas
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

### Important Notes
- Hijri calendar conversion is done client-side (no external API)
- All content is in Arabic with RTL support
- Week data uses `weekNumber` field (not `week`)
- The app binds to port 5000
- Do NOT modify vite.ts, drizzle.config.ts, or package.json scripts
- Database is the source of truth; static data files kept as reference only
- Run `npx tsx server/seed.ts` to seed/reseed the database

## User Preferences
- Purple color theme
- Arabic-first design
- SEO-focused content with keyword targeting
- Medical accuracy with disclaimer on all pages
- Hijri calendar support is critical
