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
  "pregnancy-nausea-morning-sickness-guide",
  "pregnancy-nutrition-complete-guide",
  "pregnancy-sleep-problems-solutions",
  "pregnancy-tests-checkups-schedule",
  "preparing-for-birth-complete-guide",
  "common-pregnancy-symptoms-week-by-week",
  "gestational-diabetes-complete-guide",
  "pregnancy-back-pain-causes-treatment",
  "pregnancy-exercises-safe-guide",
  "frequently-asked-pregnancy-questions",
];

const categorySlugs = [
  "pregnancy-symptoms",
  "pregnancy-nutrition",
  "sleep-rest",
  "tests-checkups",
  "birth-preparation",
  "common-questions",
];

const tagSlugs = [
  "pregnancy-nausea", "morning-sickness", "first-trimester", "early-symptoms", "natural-remedies",
  "pregnancy-nutrition", "prenatal-vitamins", "folic-acid", "iron", "foods-to-avoid",
  "pregnancy-sleep", "pregnancy-insomnia", "sleeping-positions", "third-trimester", "rest",
  "pregnancy-tests", "pregnancy-checkups", "ultrasound", "blood-tests", "anomaly-scan",
  "birth", "hospital-bag", "birth-plan", "labor-signs",
  "pregnancy-symptoms", "second-trimester", "pregnancy-signs",
  "gestational-diabetes", "pregnancy-complications", "insulin",
  "back-pain", "pregnancy-exercises",
  "pregnancy-fitness", "prenatal-yoga", "walking-pregnancy", "kegel",
  "faq", "pregnancy",
];

const uniqueTagSlugs = [...new Set(tagSlugs)];

const blogPostDates: Record<string, { published: string; updated: string }> = {
  "pregnancy-nausea-morning-sickness-guide": { published: "2026-01-10", updated: "2026-02-01" },
  "pregnancy-nutrition-complete-guide": { published: "2026-01-05", updated: "2026-02-05" },
  "pregnancy-sleep-problems-solutions": { published: "2026-01-15", updated: "2026-02-03" },
  "pregnancy-tests-checkups-schedule": { published: "2026-01-08", updated: "2026-02-02" },
  "preparing-for-birth-complete-guide": { published: "2026-01-12", updated: "2026-02-04" },
  "common-pregnancy-symptoms-week-by-week": { published: "2026-01-03", updated: "2026-02-06" },
  "gestational-diabetes-complete-guide": { published: "2026-01-18", updated: "2026-02-07" },
  "pregnancy-back-pain-causes-treatment": { published: "2026-01-20", updated: "2026-02-08" },
  "pregnancy-exercises-safe-guide": { published: "2026-01-22", updated: "2026-02-09" },
  "frequently-asked-pregnancy-questions": { published: "2026-01-25", updated: "2026-02-10" },
};

const blogPostTitles: Record<string, string> = {
  "pregnancy-nausea-morning-sickness-guide": "غثيان الحمل (الوحام): أسبابه وأعراضه و15 طريقة فعالة للتخفيف منه",
  "pregnancy-nutrition-complete-guide": "التغذية أثناء الحمل: دليلك الشامل لكل ثلث مع جدول غذائي مفصل",
  "pregnancy-sleep-problems-solutions": "مشاكل النوم أثناء الحمل: الأسباب والحلول ووضعيات النوم الآمنة",
  "pregnancy-tests-checkups-schedule": "فحوصات وتحاليل الحمل: الجدول الكامل من الأسبوع الأول حتى الولادة",
  "preparing-for-birth-complete-guide": "الاستعداد للولادة: دليلك الشامل من خطة الولادة حتى حقيبة المستشفى",
  "common-pregnancy-symptoms-week-by-week": "أعراض الحمل أسبوعًا بأسبوع: دليل شامل لكل ما تتوقعينه",
  "gestational-diabetes-complete-guide": "سكري الحمل: الدليل الكامل للتشخيص والعلاج والوقاية والتأثير على الجنين",
  "pregnancy-back-pain-causes-treatment": "ألم الظهر أثناء الحمل: الأسباب والعلاج وتمارين فعالة للتخفيف",
  "pregnancy-exercises-safe-guide": "الرياضة أثناء الحمل: دليل شامل للتمارين الآمنة والممنوعة لكل ثلث",
  "frequently-asked-pregnancy-questions": "أسئلة شائعة عن الحمل: إجابات مفصلة على 20 سؤالاً تشغل بال كل حامل",
};

const blogPostDescriptions: Record<string, string> = {
  "pregnancy-nausea-morning-sickness-guide": "دليل طبي شامل عن غثيان الحمل الصباحي (الوحام). تعرفي على الأسباب، متى يبدأ وينتهي، و15 طريقة مجربة للتخفيف من الغثيان أثناء الحمل.",
  "pregnancy-nutrition-complete-guide": "دليل تغذية الحامل الشامل مع جدول غذائي مفصل لكل ثلث. الفيتامينات، المعادن، الأطعمة الممنوعة، ونصائح التغذية السليمة أثناء الحمل.",
  "pregnancy-sleep-problems-solutions": "تعانين من الأرق أثناء الحمل؟ دليل شامل لمشاكل النوم وحلولها، أفضل وضعيات النوم الآمنة لكل ثلث، ونصائح لنوم هادئ ومريح.",
  "pregnancy-tests-checkups-schedule": "الدليل الشامل لفحوصات وتحاليل الحمل المطلوبة. جدول مفصل لكل ثلث يشمل الموجات فوق الصوتية والتحاليل وفحوصات التشوهات.",
  "preparing-for-birth-complete-guide": "كل ما تحتاجين لتحضيره قبل الولادة. خطة الولادة، حقيبة المستشفى، علامات المخاض، واختيار المستشفى. دليل متكامل للأم.",
  "common-pregnancy-symptoms-week-by-week": "اكتشفي أعراض الحمل في كل أسبوع وكل ثلث. من الأعراض المبكرة في الأسابيع الأولى حتى علامات اقتراب الولادة. دليل مفصل وموثوق.",
  "gestational-diabetes-complete-guide": "كل ما تحتاجين معرفته عن سكري الحمل: الأسباب، التشخيص، النظام الغذائي المناسب، العلاج، وتأثيره على الأم والجنين. دليل طبي موثوق.",
  "pregnancy-back-pain-causes-treatment": "تعانين من ألم الظهر أثناء الحمل؟ تعرفي على الأسباب العلمية وأفضل التمارين والعلاجات الآمنة للتخفيف من آلام الظهر في كل مرحلة.",
  "pregnancy-exercises-safe-guide": "هل الرياضة آمنة أثناء الحمل؟ دليل مفصل للتمارين المناسبة لكل ثلث، فوائد الرياضة للحامل، والرياضات الممنوعة. نصائح من متخصصين.",
  "frequently-asked-pregnancy-questions": "إجابات شاملة ومفصلة على أكثر 20 سؤالاً شيوعاً عن الحمل. من الأعراض والتغذية والفحوصات حتى الولادة. معلومات طبية موثوقة.",
};

const staticPages = [
  "/", "/pregnancy", "/symptoms", "/tools/pregnancy-calculator", "/tools/due-date-calculator",
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
Allow: /blog/
Allow: /blog/category/
Allow: /blog/tag/
Disallow: /api/
Disallow: /_next/

Sitemap: ${BASE_URL}/sitemap.xml
`);
  });

  app.get("/sitemap.xml", (_req, res) => {
    const today = new Date().toISOString().split("T")[0];

    const urls: { loc: string; priority: string; changefreq: string; lastmod?: string }[] = [];

    urls.push({ loc: "/", priority: "1.0", changefreq: "weekly" });

    staticPages.slice(1).forEach(p => {
      const priority = p === "/tools/pregnancy-calculator" ? "0.95" : "0.8";
      urls.push({ loc: p, priority, changefreq: "monthly" });
    });

    weekSlugs.forEach(s => {
      urls.push({ loc: `/pregnancy/${s}`, priority: "0.9", changefreq: "monthly" });
    });

    symptomSlugs.forEach(s => {
      urls.push({ loc: `/symptoms/${s}`, priority: "0.7", changefreq: "monthly" });
    });

    blogSlugs.forEach(s => {
      const dates = blogPostDates[s];
      urls.push({
        loc: `/blog/${s}`,
        priority: "0.8",
        changefreq: "weekly",
        lastmod: dates?.updated || today,
      });
    });

    categorySlugs.forEach(s => {
      urls.push({ loc: `/blog/category/${s}`, priority: "0.6", changefreq: "weekly" });
    });

    uniqueTagSlugs.forEach(s => {
      urls.push({ loc: `/blog/tag/${s}`, priority: "0.5", changefreq: "weekly" });
    });

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

  app.get("/rss.xml", (_req, res) => {
    const items = blogSlugs
      .map(slug => ({
        slug,
        title: blogPostTitles[slug] || slug,
        description: blogPostDescriptions[slug] || "",
        date: blogPostDates[slug]?.published || "2026-01-01",
      }))
      .sort((a, b) => b.date.localeCompare(a.date))
      .slice(0, 20);

    const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>مدونة فلذة - مقالات الحمل والأمومة</title>
    <link>${BASE_URL}/blog</link>
    <description>مقالات متخصصة عن الحمل والأمومة مكتوبة بعناية ومُراجعة من متخصصين</description>
    <language>ar</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${BASE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
${items.map(item => `    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${BASE_URL}/blog/${item.slug}</link>
      <guid isPermaLink="true">${BASE_URL}/blog/${item.slug}</guid>
      <description>${escapeXml(item.description)}</description>
      <pubDate>${new Date(item.date).toUTCString()}</pubDate>
    </item>`).join("\n")}
  </channel>
</rss>`;

    res.type("application/rss+xml").send(rssXml);
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
