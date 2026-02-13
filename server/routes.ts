import type { Express } from "express";
import { createServer, type Server } from "http";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import { pool } from "./db";
import { storage } from "./storage";
import { hashPassword, verifyPassword, requireAuth, requireAdmin, requireEditor } from "./auth";
import { loginSchema } from "@shared/schema";

const BASE_URL = "https://faladha.com";
const PgSession = connectPgSimple(session);

const staticPages = [
  "/", "/pregnancy", "/symptoms", "/tools/pregnancy-calculator", "/tools/due-date-calculator",
  "/blog", "/faq", "/download", "/about", "/medical-review",
  "/features", "/how-it-works", "/privacy", "/contact"
];

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  app.use(session({
    store: new PgSession({
      pool: pool as any,
      tableName: "sessions",
      createTableIfMissing: false,
    }),
    secret: process.env.SESSION_SECRET || "faladha-admin-secret-change-me",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    },
  }));

  app.post("/api/auth/login", async (req, res) => {
    try {
      const parsed = loginSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: "بيانات غير صحيحة" });
      }
      const { email, password } = parsed.data;
      const user = await storage.getUserByEmail(email);
      if (!user) {
        return res.status(401).json({ error: "البريد الإلكتروني أو كلمة المرور غير صحيحة" });
      }
      const valid = await verifyPassword(password, user.password);
      if (!valid) {
        return res.status(401).json({ error: "البريد الإلكتروني أو كلمة المرور غير صحيحة" });
      }
      req.session.userId = user.id;
      req.session.userRole = user.role;
      req.session.userEmail = user.email;
      req.session.userName = user.name;
      res.json({ id: user.id, email: user.email, name: user.name, role: user.role });
    } catch (err) {
      res.status(500).json({ error: "خطأ في الخادم" });
    }
  });

  app.post("/api/auth/logout", (req, res) => {
    req.session.destroy(() => {
      res.json({ ok: true });
    });
  });

  app.get("/api/auth/me", (req, res) => {
    if (!req.session?.userId) {
      return res.status(401).json({ error: "غير مسجل الدخول" });
    }
    res.json({
      id: req.session.userId,
      email: req.session.userEmail,
      name: req.session.userName,
      role: req.session.userRole,
    });
  });

  app.get("/api/admin/blog", requireAuth, async (req, res) => {
    const status = req.query.status as string | undefined;
    const category = req.query.category as string | undefined;
    const search = req.query.search as string | undefined;
    const posts = await storage.getBlogPosts({ status, category, search });
    res.json(posts);
  });

  app.get("/api/admin/blog/:id", requireAuth, async (req, res) => {
    const post = await storage.getBlogPost(req.params.id);
    if (!post) return res.status(404).json({ error: "غير موجود" });
    res.json(post);
  });

  app.post("/api/admin/blog", requireEditor, async (req, res) => {
    try {
      const existing = await storage.getBlogPostBySlug(req.body.slug);
      if (existing) return res.status(400).json({ error: "هذا الرابط مستخدم بالفعل" });
      if (req.body.status === "published" && !req.body.publishedAt) {
        req.body.publishedAt = new Date();
      }
      const post = await storage.createBlogPost(req.body);
      res.status(201).json(post);
    } catch (err: any) {
      res.status(400).json({ error: err.message || "خطأ في الإنشاء" });
    }
  });

  app.patch("/api/admin/blog/:id", requireEditor, async (req, res) => {
    try {
      if (req.body.slug) {
        const existing = await storage.getBlogPostBySlug(req.body.slug);
        if (existing && existing.id !== req.params.id) {
          return res.status(400).json({ error: "هذا الرابط مستخدم بالفعل" });
        }
      }
      if (req.body.status === "published" && !req.body.publishedAt) {
        req.body.publishedAt = new Date();
      }
      const post = await storage.updateBlogPost(req.params.id, req.body);
      if (!post) return res.status(404).json({ error: "غير موجود" });
      res.json(post);
    } catch (err: any) {
      res.status(400).json({ error: err.message || "خطأ في التحديث" });
    }
  });

  app.delete("/api/admin/blog/:id", requireAdmin, async (req, res) => {
    await storage.deleteBlogPost(req.params.id);
    res.json({ ok: true });
  });

  app.get("/api/admin/weeks", requireAuth, async (req, res) => {
    const status = req.query.status as string | undefined;
    const weeks = await storage.getWeeks({ status });
    res.json(weeks);
  });

  app.get("/api/admin/weeks/:id", requireAuth, async (req, res) => {
    const week = await storage.getWeek(req.params.id);
    if (!week) return res.status(404).json({ error: "غير موجود" });
    res.json(week);
  });

  app.post("/api/admin/weeks", requireEditor, async (req, res) => {
    try {
      const existingNum = await storage.getWeekByNumber(req.body.weekNumber);
      if (existingNum) return res.status(400).json({ error: "رقم الأسبوع موجود بالفعل" });
      const existingSlug = await storage.getWeekBySlug(req.body.slug);
      if (existingSlug) return res.status(400).json({ error: "هذا الرابط مستخدم بالفعل" });
      const week = await storage.createWeek(req.body);
      res.status(201).json(week);
    } catch (err: any) {
      res.status(400).json({ error: err.message || "خطأ في الإنشاء" });
    }
  });

  app.patch("/api/admin/weeks/:id", requireEditor, async (req, res) => {
    try {
      if (req.body.slug) {
        const existing = await storage.getWeekBySlug(req.body.slug);
        if (existing && existing.id !== req.params.id) {
          return res.status(400).json({ error: "هذا الرابط مستخدم بالفعل" });
        }
      }
      const week = await storage.updateWeek(req.params.id, req.body);
      if (!week) return res.status(404).json({ error: "غير موجود" });
      res.json(week);
    } catch (err: any) {
      res.status(400).json({ error: err.message || "خطأ في التحديث" });
    }
  });

  app.delete("/api/admin/weeks/:id", requireAdmin, async (req, res) => {
    await storage.deleteWeek(req.params.id);
    res.json({ ok: true });
  });

  app.get("/api/admin/symptoms", requireAuth, async (req, res) => {
    const status = req.query.status as string | undefined;
    const search = req.query.search as string | undefined;
    const symptoms = await storage.getSymptoms({ status, search });
    res.json(symptoms);
  });

  app.get("/api/admin/symptoms/:id", requireAuth, async (req, res) => {
    const symptom = await storage.getSymptom(req.params.id);
    if (!symptom) return res.status(404).json({ error: "غير موجود" });
    res.json(symptom);
  });

  app.post("/api/admin/symptoms", requireEditor, async (req, res) => {
    try {
      const existing = await storage.getSymptomBySlug(req.body.slug);
      if (existing) return res.status(400).json({ error: "هذا الرابط مستخدم بالفعل" });
      const symptom = await storage.createSymptom(req.body);
      res.status(201).json(symptom);
    } catch (err: any) {
      res.status(400).json({ error: err.message || "خطأ في الإنشاء" });
    }
  });

  app.patch("/api/admin/symptoms/:id", requireEditor, async (req, res) => {
    try {
      if (req.body.slug) {
        const existing = await storage.getSymptomBySlug(req.body.slug);
        if (existing && existing.id !== req.params.id) {
          return res.status(400).json({ error: "هذا الرابط مستخدم بالفعل" });
        }
      }
      const symptom = await storage.updateSymptom(req.params.id, req.body);
      if (!symptom) return res.status(404).json({ error: "غير موجود" });
      res.json(symptom);
    } catch (err: any) {
      res.status(400).json({ error: err.message || "خطأ في التحديث" });
    }
  });

  app.delete("/api/admin/symptoms/:id", requireAdmin, async (req, res) => {
    await storage.deleteSymptom(req.params.id);
    res.json({ ok: true });
  });

  app.get("/api/admin/tools/:slug", requireAuth, async (req, res) => {
    const content = await storage.getToolContent(req.params.slug);
    res.json(content || null);
  });

  app.put("/api/admin/tools/:slug", requireEditor, async (req, res) => {
    try {
      const content = await storage.upsertToolContent({ ...req.body, toolSlug: req.params.slug });
      res.json(content);
    } catch (err: any) {
      res.status(400).json({ error: err.message || "خطأ في التحديث" });
    }
  });

  app.get("/api/admin/settings", requireAuth, async (_req, res) => {
    const settings = await storage.getSettings();
    res.json(settings);
  });

  app.put("/api/admin/settings/:key", requireAdmin, async (req, res) => {
    try {
      const setting = await storage.upsertSetting(req.params.key, req.body.value);
      res.json(setting);
    } catch (err: any) {
      res.status(400).json({ error: err.message || "خطأ في التحديث" });
    }
  });

  app.get("/api/admin/health", requireAuth, async (_req, res) => {
    const health = await storage.getContentHealth();
    res.json(health);
  });

  app.get("/api/public/weeks", async (_req, res) => {
    const weeks = await storage.getPublishedWeeks();
    res.json(weeks);
  });

  app.get("/api/public/weeks/:slug", async (req, res) => {
    const week = await storage.getWeekBySlug(req.params.slug);
    if (!week || week.status !== "published") return res.status(404).json({ error: "غير موجود" });
    res.json(week);
  });

  app.get("/api/public/symptoms", async (_req, res) => {
    const symptoms = await storage.getPublishedSymptoms();
    res.json(symptoms);
  });

  app.get("/api/public/symptoms/:slug", async (req, res) => {
    const symptom = await storage.getSymptomBySlug(req.params.slug);
    if (!symptom || symptom.status !== "published") return res.status(404).json({ error: "غير موجود" });
    res.json(symptom);
  });

  app.get("/api/public/blog", async (_req, res) => {
    const posts = await storage.getPublishedBlogPosts();
    res.json(posts);
  });

  app.get("/api/public/blog/:slug", async (req, res) => {
    const post = await storage.getBlogPostBySlug(req.params.slug);
    if (!post || post.status !== "published") return res.status(404).json({ error: "غير موجود" });
    res.json(post);
  });

  app.get("/api/public/settings", async (_req, res) => {
    const settings = await storage.getSettings();
    const result: Record<string, any> = {};
    settings.forEach(s => { result[s.key] = s.value; });
    res.json(result);
  });

  app.get("/robots.txt", (_req, res) => {
    res.type("text/plain").send(`User-agent: *
Allow: /
Allow: /blog/
Allow: /blog/category/
Allow: /blog/tag/
Disallow: /api/
Disallow: /admin

Sitemap: ${BASE_URL}/sitemap.xml
`);
  });

  app.get("/sitemap.xml", async (_req, res) => {
    const today = new Date().toISOString().split("T")[0];

    const urls: { loc: string; priority: string; changefreq: string; lastmod?: string }[] = [];

    urls.push({ loc: "/", priority: "1.0", changefreq: "weekly" });

    staticPages.slice(1).forEach(p => {
      const priority = p === "/tools/pregnancy-calculator" ? "0.95" : "0.8";
      urls.push({ loc: p, priority, changefreq: "monthly" });
    });

    try {
      const weeks = await storage.getPublishedWeeks();
      for (const w of weeks) {
        urls.push({
          loc: `/pregnancy/${w.slug}`,
          priority: "0.9",
          changefreq: "monthly",
          lastmod: w.updatedAt?.toISOString().split("T")[0],
        });
      }

      const symptoms = await storage.getPublishedSymptoms();
      for (const s of symptoms) {
        urls.push({
          loc: `/symptoms/${s.slug}`,
          priority: "0.7",
          changefreq: "monthly",
          lastmod: s.updatedAt?.toISOString().split("T")[0],
        });
      }

      const posts = await storage.getPublishedBlogPosts();
      for (const p of posts) {
        urls.push({
          loc: `/blog/${p.slug}`,
          priority: "0.8",
          changefreq: "weekly",
          lastmod: p.updatedAt?.toISOString().split("T")[0],
        });
      }
    } catch (err) {
    }

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${BASE_URL}${u.loc}</loc>
    <lastmod>${u.lastmod || today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join("\n")}
</urlset>`;

    res.type("application/xml").send(xml);
  });

  app.get("/rss.xml", async (_req, res) => {
    try {
      const posts = await storage.getPublishedBlogPosts();
      const items = posts.slice(0, 20);

      const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>مدونة فلذة - مقالات الحمل والأمومة</title>
    <link>${BASE_URL}/blog</link>
    <description>مقالات متخصصة عن الحمل والأمومة مكتوبة بعناية ومُراجعة من متخصصين</description>
    <language>ar</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${BASE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
${items.map((item: any) => `    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${BASE_URL}/blog/${item.slug}</link>
      <guid isPermaLink="true">${BASE_URL}/blog/${item.slug}</guid>
      <description>${escapeXml(item.metaDescription || item.summary)}</description>
      <pubDate>${(item.publishedAt || item.createdAt).toUTCString()}</pubDate>
    </item>`).join("\n")}
  </channel>
</rss>`;

      res.type("application/rss+xml").send(rssXml);
    } catch {
      res.type("application/rss+xml").send(`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>فلذة</title></channel></rss>`);
    }
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

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
