import { pool } from "../server/db";
import fs from "fs";
import path from "path";

async function auditLinks() {
  console.log("╔══════════════════════════════════════════╗");
  console.log("║     فلذة - Internal Linking Audit        ║");
  console.log("╚══════════════════════════════════════════╝\n");

  const weeks = (await pool.query("SELECT * FROM pregnancy_weeks WHERE status='published' ORDER BY week_number")).rows;
  const symptoms = (await pool.query("SELECT * FROM symptoms WHERE status='published' ORDER BY slug")).rows;
  const blogs = (await pool.query("SELECT * FROM blog_posts WHERE status='published' ORDER BY slug")).rows;

  const allPages: Record<string, { type: string; inbound: string[]; outbound: string[] }> = {};

  allPages["/"] = { type: "homepage", inbound: [], outbound: [] };
  allPages["/pregnancy"] = { type: "listing", inbound: [], outbound: [] };
  allPages["/symptoms"] = { type: "listing", inbound: [], outbound: [] };
  allPages["/blog"] = { type: "listing", inbound: [], outbound: [] };
  allPages["/tools/pregnancy-calculator"] = { type: "tool", inbound: [], outbound: [] };
  allPages["/tools/due-date-calculator"] = { type: "tool", inbound: [], outbound: [] };
  allPages["/faq"] = { type: "static", inbound: [], outbound: [] };
  allPages["/download"] = { type: "static", inbound: [], outbound: [] };
  allPages["/about"] = { type: "static", inbound: [], outbound: [] };
  allPages["/medical-review"] = { type: "static", inbound: [], outbound: [] };
  allPages["/features"] = { type: "static", inbound: [], outbound: [] };
  allPages["/how-it-works"] = { type: "static", inbound: [], outbound: [] };
  allPages["/privacy"] = { type: "static", inbound: [], outbound: [] };
  allPages["/contact"] = { type: "static", inbound: [], outbound: [] };

  weeks.forEach((w: any) => {
    allPages[`/pregnancy/${w.slug}`] = { type: "week", inbound: [], outbound: [] };
  });
  symptoms.forEach((s: any) => {
    allPages[`/symptoms/${s.slug}`] = { type: "symptom", inbound: [], outbound: [] };
  });
  blogs.forEach((b: any) => {
    allPages[`/blog/${b.slug}`] = { type: "blog", inbound: [], outbound: [] };
  });

  function addLink(from: string, to: string) {
    if (allPages[from]) allPages[from].outbound.push(to);
    if (allPages[to]) allPages[to].inbound.push(from);
  }

  const pagesDir = path.join(process.cwd(), "client/src/pages");
  const componentDir = path.join(process.cwd(), "client/src/components");

  function findLinksInFile(filePath: string, sourceUrl: string) {
    try {
      const content = fs.readFileSync(filePath, "utf8");
      const hrefMatches = content.match(/href=["'`]([^"'`$]+?)["'`]/g) || [];
      const toMatches = content.match(/to=["'`]([^"'`$]+?)["'`]/g) || [];
      [...hrefMatches, ...toMatches].forEach(m => {
        const url = m.match(/["'`](.+?)["'`]/)?.[1];
        if (url && url.startsWith("/") && !url.startsWith("/api") && !url.startsWith("/#")) {
          addLink(sourceUrl, url);
        }
      });
    } catch {}
  }

  findLinksInFile(path.join(pagesDir, "Home.tsx"), "/");
  findLinksInFile(path.join(pagesDir, "PregnancyCalculator.tsx"), "/tools/pregnancy-calculator");
  findLinksInFile(path.join(pagesDir, "PregnancyWeeks.tsx"), "/pregnancy");
  findLinksInFile(path.join(pagesDir, "SymptomsPage.tsx"), "/symptoms");
  findLinksInFile(path.join(pagesDir, "BlogPage.tsx"), "/blog");

  findLinksInFile(path.join(componentDir, "layout/Header.tsx"), "/");
  findLinksInFile(path.join(componentDir, "layout/Footer.tsx"), "/");
  findLinksInFile(path.join(componentDir, "sections/CTABanner.tsx"), "/");
  findLinksInFile(path.join(componentDir, "sections/Hero.tsx"), "/");

  weeks.forEach((w: any) => {
    const wn = w.week_number || w.weekNumber;
    const url = `/pregnancy/${w.slug}`;
    addLink("/pregnancy", url);
    if (wn > 1) addLink(url, `/pregnancy/week-${wn - 1}`);
    if (wn < 40) addLink(url, `/pregnancy/week-${wn + 1}`);
    const rs = w.related_symptoms || w.relatedSymptoms || [];
    rs.forEach((slug: string) => addLink(url, `/symptoms/${slug}`));
    addLink(url, "/download");
  });

  symptoms.forEach((s: any) => {
    const url = `/symptoms/${s.slug}`;
    addLink("/symptoms", url);
    const rw = s.related_weeks || s.relatedWeeks || [];
    rw.forEach((w: number) => addLink(url, `/pregnancy/week-${w}`));
    addLink(url, "/tools/pregnancy-calculator");
  });

  blogs.forEach((b: any) => {
    const url = `/blog/${b.slug}`;
    addLink("/blog", url);
    const brw = b.related_weeks || b.relatedWeeks || [];
    brw.forEach((w: number) => addLink(url, `/pregnancy/week-${w}`));
    const brs = b.related_symptoms || b.relatedSymptoms || [];
    brs.forEach((slug: string) => addLink(url, `/symptoms/${slug}`));
  });

  console.log("═══ PAGE LINK SUMMARY ═══");
  console.log("Page | Type | Inbound | Outbound");
  console.log("─".repeat(70));

  const sorted = Object.entries(allPages).sort((a, b) => a[1].inbound.length - b[1].inbound.length);
  sorted.forEach(([url, data]) => {
    const inUniq = [...new Set(data.inbound)].length;
    const outUniq = [...new Set(data.outbound)].length;
    const status = inUniq === 0 ? "✗ ORPHAN" : inUniq < 3 ? "⚠ LOW" : "✓";
    console.log(`${status} ${url.padEnd(45)} | ${data.type.padEnd(8)} | ${String(inUniq).padStart(3)} in | ${String(outUniq).padStart(3)} out`);
  });

  console.log("\n═══ ORPHAN PAGES (0 inbound links) ═══");
  const orphans = sorted.filter(([, data]) => data.inbound.length === 0);
  if (orphans.length === 0) console.log("  ✓ No orphan pages found");
  else orphans.forEach(([url, data]) => console.log(`  ✗ ${url} (${data.type})`));

  console.log("\n═══ LOW INBOUND PAGES (<3 inbound links) ═══");
  const lowInbound = sorted.filter(([, data]) => {
    const inUniq = [...new Set(data.inbound)].length;
    return inUniq > 0 && inUniq < 3;
  });
  if (lowInbound.length === 0) console.log("  ✓ All pages have sufficient inbound links");
  else lowInbound.forEach(([url, data]) => {
    const inUniq = [...new Set(data.inbound)].length;
    console.log(`  ⚠ ${url}: ${inUniq} inbound from: ${[...new Set(data.inbound)].join(", ")}`);
  });

  console.log("\n═══ LINKING ARCHITECTURE ═══");
  console.log(`
    Homepage (/)
    ├── /tools/pregnancy-calculator (cornerstone)
    │   └── → /pregnancy, /symptoms, /blog
    ├── /pregnancy (listing)
    │   └── /pregnancy/week-{1-40} (detail)
    │       ├── → prev/next week
    │       ├── → related symptoms
    │       └── → /download CTA
    ├── /symptoms (listing)
    │   └── /symptoms/{slug} (detail)
    │       ├── → related weeks
    │       └── → /tools/pregnancy-calculator CTA
    ├── /blog (listing)
    │   └── /blog/{slug} (detail)
    │       ├── → related weeks
    │       ├── → related symptoms
    │       └── → related posts
    ├── /faq, /features, /how-it-works, /download
    ├── /about, /medical-review, /privacy, /contact
    └── Header/Footer (global links)
  `);

  console.log("═══ CROSS-LINKING GAPS ═══");
  const weekPagesWithNoSymptomLinks = weeks.filter((w: any) => {
    const rs = w.related_symptoms || w.relatedSymptoms || [];
    return rs.length === 0;
  });
  if (weekPagesWithNoSymptomLinks.length > 0) {
    console.log(`  ✗ ${weekPagesWithNoSymptomLinks.length} week pages have NO related symptom links`);
  }

  const symptomPagesWithNoWeekLinks = symptoms.filter((s: any) => {
    const rw = s.related_weeks || s.relatedWeeks || [];
    return rw.length === 0;
  });
  if (symptomPagesWithNoWeekLinks.length > 0) {
    console.log(`  ✗ ${symptomPagesWithNoWeekLinks.length} symptom pages have NO related week links`);
  }

  const blogWithNoRelated = blogs.filter((b: any) => {
    const rw = b.related_weeks || b.relatedWeeks || [];
    const rs = b.related_symptoms || b.relatedSymptoms || [];
    return rw.length === 0 && rs.length === 0;
  });
  if (blogWithNoRelated.length > 0) {
    console.log(`  ✗ ${blogWithNoRelated.length} blog posts have NO related weeks or symptoms`);
  }

  await pool.end();
  console.log("\n═══ AUDIT COMPLETE ═══");
}

auditLinks().catch(console.error);
