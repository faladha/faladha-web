# فلذة (Faladha) - Arabic Pregnancy Tracking Website

## Overview
A comprehensive Arabic pregnancy tracking website with SEO-optimized content targeting keywords like "حاسبة الحمل بالهجري" and "حاسبة الحمل بالميلادي". Built with Express + Vite + React, featuring full Arabic RTL support and a purple-themed UI.

## Current State
- Fully functional website with 40 week-by-week pregnancy pages, 15 symptom pages, 10 blog articles
- Pregnancy calculator supporting both Hijri and Gregorian calendars
- SEO-optimized homepage with keyword-rich H2 sections and mini calculator
- JSON-LD structured data on all pages (FAQ, Breadcrumb, WebApplication, Organization)
- Sitemap at /sitemap.xml with proper priorities

## Architecture

### Tech Stack
- **Frontend**: React + Vite + TypeScript, Tailwind CSS, Shadcn UI, wouter (routing)
- **Backend**: Express.js (serves sitemap.xml, SSR meta tags)
- **Styling**: Purple theme (primary: hsl(265 85% 58%)), RTL layout, IBM Plex Sans Arabic font
- **Data**: Static data files in `client/src/data/` (weeks.ts, symptoms.ts, blog.ts)

### Project Structure
```
client/src/
  pages/            # Page components (Home, PregnancyCalculator, WeekDetail, SymptomDetail, BlogDetail, etc.)
  components/
    layout/         # Header, Footer, Breadcrumbs
    sections/       # Hero, Features, HowItWorks, Stats, Testimonials, CTABanner, FAQAccordion, MedicalDisclaimer
    seo/            # JsonLd structured data components
    ui/             # Shadcn UI components
  data/             # Static content data
    weeks.ts        # 40 weeks of pregnancy data (WeekData interface)
    symptoms.ts     # 15 symptom pages with FAQ data (SymptomData interface)
    blog.ts         # 10 blog articles with categories and tags
  lib/              # Utility functions and query client
server/
  routes.ts         # API routes + sitemap generation
  storage.ts        # Storage interface (IStorage)
  vite.ts           # Vite dev server setup (DO NOT MODIFY)
shared/
  schema.ts         # Drizzle ORM schema
```

### Key Routes
- `/` - Homepage with SEO content and mini calculator
- `/tools/pregnancy-calculator` - Cornerstone pregnancy calculator (priority 0.95)
- `/tools/due-date-calculator` - Due date calculator
- `/pregnancy` - Week listing page
- `/pregnancy/week-{1-40}` - Individual week detail pages
- `/symptoms` - Symptom listing page
- `/symptoms/{slug}` - Individual symptom detail pages
- `/blog` - Blog listing
- `/blog/{slug}` - Blog article detail
- `/faq` - FAQ page
- `/download`, `/about`, `/medical-review`, `/features`, `/how-it-works`, `/privacy`, `/contact`

### Data Models
- **WeekData**: weekNumber, slug, title, metaTitle, metaDescription, summary, trimester, fetusSize, fetalDevelopment, motherSymptoms, tips, whenToCallDoctor, faq, relatedSymptoms
- **SymptomData**: slug, title, metaTitle, metaDescription, summary, causes, remedies, whenToWorry, trimester, relatedWeeks, faq
- **BlogPost**: slug, title, metaTitle, metaDescription, category, tags, content, relatedWeeks, relatedSymptoms

### SEO Strategy
- H1 on homepage targets "حاسبة الحمل الدقيقة بالهجري والميلادي"
- H2 sections target: "حاسبة الحمل بالهجري", "حاسبة الحمل بالميلادي", "حاسبة الحمل بالأسابيع والأشهر"
- Calculator page has 1500+ words of SEO content with 8 FAQ items
- JSON-LD: FAQPage, BreadcrumbList, WebApplication, Organization, WebSite schemas
- Sitemap includes all pages with proper priority settings

### Important Notes
- Hijri calendar conversion is done client-side (no external API)
- All content is in Arabic with RTL support
- Week data uses `weekNumber` field (not `week`)
- The app binds to port 5000
- Do NOT modify vite.ts, drizzle.config.ts, or package.json scripts

## User Preferences
- Purple color theme
- Arabic-first design
- SEO-focused content with keyword targeting
- Medical accuracy with disclaimer on all pages
- Hijri calendar support is critical
