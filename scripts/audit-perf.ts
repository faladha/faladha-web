import { execSync } from "child_process";
import fs from "fs";
import path from "path";

async function auditPerf() {
  console.log("╔══════════════════════════════════════════╗");
  console.log("║     فلذة - Performance Audit Report      ║");
  console.log("╚══════════════════════════════════════════╝\n");

  const pages = [
    { name: "Homepage", path: "/" },
    { name: "Calculator", path: "/tools/pregnancy-calculator" },
    { name: "Week 20", path: "/pregnancy/week-20" },
    { name: "Symptoms", path: "/symptoms" },
    { name: "Blog", path: "/blog" },
    { name: "Blog Post", path: "/blog/pregnancy-nutrition-complete-guide" },
  ];

  console.log("═══ TTFB MEASUREMENT ═══");
  console.log("Page | TTFB (ms) | Status Code | Size (bytes)");
  console.log("─".repeat(60));

  for (const page of pages) {
    try {
      const start = Date.now();
      const result = execSync(
        `curl -s -o /dev/null -w "%{http_code}|%{size_download}|%{time_starttransfer}" http://localhost:5000${page.path}`,
        { encoding: "utf8", timeout: 10000 }
      ).trim();
      const [statusCode, size, ttfb] = result.split("|");
      const ttfbMs = Math.round(parseFloat(ttfb) * 1000);
      const status = ttfbMs < 200 ? "✓" : ttfbMs < 500 ? "⚠" : "✗";
      console.log(`${status} ${page.name.padEnd(15)} | ${String(ttfbMs).padStart(4)}ms | ${statusCode} | ${size} bytes`);
    } catch (e) {
      console.log(`✗ ${page.name.padEnd(15)} | ERROR`);
    }
  }

  console.log("\n═══ API ENDPOINT RESPONSE TIMES ═══");
  const apis = [
    "/api/public/weeks",
    "/api/public/symptoms",
    "/api/public/blog",
    "/api/public/weeks/week-20",
    "/sitemap.xml",
    "/rss.xml",
  ];

  for (const api of apis) {
    try {
      const result = execSync(
        `curl -s -o /dev/null -w "%{time_total}|%{size_download}" http://localhost:5000${api}`,
        { encoding: "utf8", timeout: 10000 }
      ).trim();
      const [time, size] = result.split("|");
      const ms = Math.round(parseFloat(time) * 1000);
      const sizeKB = Math.round(parseInt(size) / 1024);
      console.log(`  ${api.padEnd(35)} | ${String(ms).padStart(4)}ms | ${sizeKB}KB`);
    } catch (e) {
      console.log(`  ${api.padEnd(35)} | ERROR`);
    }
  }

  console.log("\n═══ STATIC ASSET ANALYSIS ═══");
  const clientDir = path.join(process.cwd(), "client/src");
  let totalFiles = 0;
  let totalSize = 0;

  function walkDir(dir: string): void {
    try {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          walkDir(fullPath);
        } else {
          totalFiles++;
          totalSize += fs.statSync(fullPath).size;
        }
      }
    } catch {}
  }

  walkDir(clientDir);
  console.log(`  Client source files: ${totalFiles}`);
  console.log(`  Client source size: ${Math.round(totalSize / 1024)}KB`);

  console.log("\n═══ PACKAGE DEPENDENCY COUNT ═══");
  try {
    const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"));
    const deps = Object.keys(pkg.dependencies || {}).length;
    const devDeps = Object.keys(pkg.devDependencies || {}).length;
    console.log(`  Dependencies: ${deps}`);
    console.log(`  Dev Dependencies: ${devDeps}`);
    console.log(`  Total: ${deps + devDeps}`);
  } catch {}

  console.log("\n═══ FONT LOADING CHECK ═══");
  try {
    const html = fs.readFileSync("client/index.html", "utf8");
    const hasPreconnect = html.includes('rel="preconnect"');
    const hasDisplaySwap = html.includes("display=swap");
    console.log(`  Preconnect: ${hasPreconnect ? "✓" : "✗ MISSING"}`);
    console.log(`  Font display=swap: ${hasDisplaySwap ? "✓" : "✗ MISSING"}`);
  } catch {}

  console.log("\n═══ IMAGE OPTIMIZATION CHECK ═══");
  const publicDir = path.join(process.cwd(), "client/public");
  try {
    const publicFiles = fs.readdirSync(publicDir);
    const images = publicFiles.filter(f => /\.(png|jpg|jpeg|gif|webp|svg|ico)$/i.test(f));
    console.log(`  Public images: ${images.length}`);
    images.forEach(img => {
      const size = fs.statSync(path.join(publicDir, img)).size;
      const sizeKB = Math.round(size / 1024);
      const status = sizeKB > 200 ? "✗ LARGE" : sizeKB > 100 ? "⚠" : "✓";
      console.log(`    ${status} ${img}: ${sizeKB}KB`);
    });
  } catch {
    console.log("  No public directory found");
  }

  console.log("\n═══ CSR-ONLY DETECTION ═══");
  console.log("  Note: This is a SPA (React + Vite). All pages are CSR.");
  console.log("  For SEO-critical pages, consider SSR/SSG migration.");
  console.log("  Current architecture: Client-Side Rendering only");
  console.log("  Impact: Search engines rely on JS rendering for content");
  console.log("  Mitigation: Google renders JS well, but pre-rendering recommended for best results");

  console.log("\n═══ PERFORMANCE SUMMARY ═══");
  console.log("  Architecture: SPA (CSR) - Express + Vite + React");
  console.log("  Font: IBM Plex Sans Arabic (Google Fonts with preconnect + swap)");
  console.log("  Database: PostgreSQL (Replit built-in)");

  console.log("\n═══ AUDIT COMPLETE ═══");
}

auditPerf().catch(console.error);
