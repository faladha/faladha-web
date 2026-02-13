import type { Express } from "express";
import { createServer, type Server } from "http";

const BASE_URL = "https://faladha.com";

const weekSlugs = Array.from({ length: 40 }, (_, i) => `week-${i + 1}`);
const symptomSlugs = [
  "morning-sickness", "fatigue", "breast-changes", "frequent-urination",
  "back-pain", "heartburn", "leg-cramps", "constipation",
  "mood-swings", "swelling", "stretch-marks", "braxton-hicks",
  "insomnia", "shortness-of-breath", "pelvic-pain"
];
const blogSlugs = [
  "preparing-for-pregnancy", "first-trimester-guide", "pregnancy-nutrition-guide",
  "exercise-during-pregnancy", "baby-movement-counting", "choosing-birth-hospital",
  "pregnancy-sleep-tips", "gestational-diabetes", "preparing-hospital-bag",
  "breastfeeding-basics"
];

const staticPages = [
  "/", "/pregnancy", "/symptoms", "/tools/due-date-calculator",
  "/blog", "/faq", "/download", "/about", "/medical-review",
  "/features", "/how-it-works", "/privacy", "/contact"
];

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  app.get("/robots.txt", (_req, res) => {
    res.type("text/plain").send(`User-agent: *
Allow: /
Disallow: /api/
Disallow: /_next/

Sitemap: ${BASE_URL}/sitemap.xml
`);
  });

  app.get("/sitemap.xml", (_req, res) => {
    const today = new Date().toISOString().split("T")[0];

    const urls: { loc: string; priority: string; changefreq: string }[] = [];

    urls.push({ loc: "/", priority: "1.0", changefreq: "weekly" });

    staticPages.slice(1).forEach(p => {
      urls.push({ loc: p, priority: "0.8", changefreq: "monthly" });
    });

    weekSlugs.forEach(s => {
      urls.push({ loc: `/pregnancy/${s}`, priority: "0.9", changefreq: "monthly" });
    });

    symptomSlugs.forEach(s => {
      urls.push({ loc: `/symptoms/${s}`, priority: "0.7", changefreq: "monthly" });
    });

    blogSlugs.forEach(s => {
      urls.push({ loc: `/blog/${s}`, priority: "0.6", changefreq: "monthly" });
    });

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${BASE_URL}${u.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join("\n")}
</urlset>`;

    res.type("application/xml").send(xml);
  });

  app.get("/manifest.webmanifest", (_req, res) => {
    res.json({
      name: "فلذة - متابعة الحمل",
      short_name: "فلذة",
      description: "تطبيق متابعة الحمل الشامل - أسبوعًا بأسبوع",
      start_url: "/",
      display: "standalone",
      background_color: "#faf9fb",
      theme_color: "#7c3aed",
      dir: "rtl",
      lang: "ar",
      icons: [
        { src: "/favicon.png", sizes: "192x192", type: "image/png" },
        { src: "/favicon.png", sizes: "512x512", type: "image/png" }
      ]
    });
  });

  return httpServer;
}
