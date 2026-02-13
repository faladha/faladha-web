import { pool } from "../server/db";

const BASE_URL = "https://faladha.com";

async function auditSeo() {
  console.log("╔══════════════════════════════════════════╗");
  console.log("║     فلذة - SEO Audit Report             ║");
  console.log("╚══════════════════════════════════════════╝\n");

  const weeks = (await pool.query("SELECT * FROM pregnancy_weeks WHERE status='published' ORDER BY week_number")).rows;
  const symptoms = (await pool.query("SELECT * FROM symptoms WHERE status='published' ORDER BY slug")).rows;
  const blogs = (await pool.query("SELECT * FROM blog_posts WHERE status='published' ORDER BY slug")).rows;

  console.log(`Published weeks: ${weeks.length}`);
  console.log(`Published symptoms: ${symptoms.length}`);
  console.log(`Published blog posts: ${blogs.length}\n`);

  console.log("═══ META TITLE LENGTH CHECK (target: <=65 chars) ═══");
  const titleIssues: string[] = [];
  [...weeks, ...symptoms, ...blogs].forEach((item: any) => {
    const title = item.meta_title || item.metaTitle || item.title;
    if (!title) titleIssues.push(`MISSING TITLE: ${item.slug}`);
    else if (title.length > 65) titleIssues.push(`TOO LONG (${title.length}): ${item.slug} → "${title}"`);
  });
  if (titleIssues.length === 0) console.log("  ✓ All meta titles within limit");
  else titleIssues.forEach(i => console.log(`  ✗ ${i}`));

  console.log("\n═══ META DESCRIPTION LENGTH CHECK (target: <=165 chars) ═══");
  const descIssues: string[] = [];
  [...weeks, ...symptoms, ...blogs].forEach((item: any) => {
    const desc = item.meta_description || item.metaDescription;
    if (!desc) descIssues.push(`MISSING DESC: ${item.slug}`);
    else if (desc.length > 165) descIssues.push(`TOO LONG (${desc.length}): ${item.slug}`);
    else if (desc.length < 50) descIssues.push(`TOO SHORT (${desc.length}): ${item.slug}`);
  });
  if (descIssues.length === 0) console.log("  ✓ All meta descriptions within limit");
  else descIssues.forEach(i => console.log(`  ✗ ${i}`));

  console.log("\n═══ DUPLICATE TITLES CHECK ═══");
  const titleMap: Record<string, string[]> = {};
  [...weeks, ...symptoms, ...blogs].forEach((item: any) => {
    const t = item.meta_title || item.metaTitle || item.title;
    if (t) { titleMap[t] = titleMap[t] || []; titleMap[t].push(item.slug); }
  });
  const dupTitles = Object.entries(titleMap).filter(([, v]) => v.length > 1);
  if (dupTitles.length === 0) console.log("  ✓ No duplicate titles");
  else dupTitles.forEach(([t, slugs]) => console.log(`  ✗ "${t}" used by: ${slugs.join(", ")}`));

  console.log("\n═══ DUPLICATE DESCRIPTIONS CHECK ═══");
  const descMap: Record<string, string[]> = {};
  [...weeks, ...symptoms, ...blogs].forEach((item: any) => {
    const d = item.meta_description || item.metaDescription;
    if (d) { descMap[d] = descMap[d] || []; descMap[d].push(item.slug); }
  });
  const dupDescs = Object.entries(descMap).filter(([, v]) => v.length > 1);
  if (dupDescs.length === 0) console.log("  ✓ No duplicate descriptions");
  else dupDescs.forEach(([d, slugs]) => console.log(`  ✗ "${d.substring(0, 60)}..." used by: ${slugs.join(", ")}`));

  console.log("\n═══ WORD COUNT CHECK (target: >=300 words per page) ═══");
  console.log("\n  --- Weeks ---");
  weeks.forEach((w: any) => {
    const fd = w.fetal_development || w.fetalDevelopment || [];
    const ms = w.mother_symptoms || w.motherSymptoms || [];
    const tips = w.tips || [];
    const wtcd = w.when_to_call_doctor || w.whenToCallDoctor || [];
    const text = [w.summary, ...fd, ...ms, ...tips, ...wtcd].join(" ");
    const wc = text.split(/\s+/).filter(Boolean).length;
    const faqWords = ((w.faq || []) as any[]).map((f: any) => `${f.question} ${f.answer}`).join(" ").split(/\s+/).filter(Boolean).length;
    const total = wc + faqWords;
    const weekNum = w.week_number || w.weekNumber;
    const status = total < 300 ? "✗ LOW" : total < 500 ? "⚠ MEDIUM" : "✓";
    if (total < 500) console.log(`  ${status} Week ${weekNum}: ${total} words (content: ${wc}, FAQ: ${faqWords})`);
  });

  console.log("\n  --- Symptoms ---");
  symptoms.forEach((s: any) => {
    const text = [s.summary, ...(s.causes || []), ...(s.remedies || []), ...(s.when_to_worry || s.whenToWorry || [])].join(" ");
    const wc = text.split(/\s+/).filter(Boolean).length;
    const faqWords = ((s.faq || []) as any[]).map((f: any) => `${f.question} ${f.answer}`).join(" ").split(/\s+/).filter(Boolean).length;
    const total = wc + faqWords;
    const status = total < 300 ? "✗ LOW" : total < 500 ? "⚠ MEDIUM" : "✓";
    if (total < 500) console.log(`  ${status} ${s.slug}: ${total} words`);
  });

  console.log("\n  --- Blog Posts ---");
  blogs.forEach((b: any) => {
    const sectionText = ((b.sections || []) as any[]).map((s: any) => `${s.heading} ${s.content}`).join(" ");
    const wc = [b.summary, sectionText].join(" ").split(/\s+/).filter(Boolean).length;
    const faqWords = ((b.faqs || []) as any[]).map((f: any) => `${f.question} ${f.answer}`).join(" ").split(/\s+/).filter(Boolean).length;
    const total = wc + faqWords;
    const status = total < 900 ? "✗ LOW" : "✓";
    console.log(`  ${status} ${b.slug}: ${total} words`);
  });

  console.log("\n═══ FAQ PRESENCE CHECK ═══");
  const noFaqWeeks = weeks.filter((w: any) => !w.faq || w.faq.length === 0);
  const noFaqSymptoms = symptoms.filter((s: any) => !s.faq || s.faq.length === 0);
  const noFaqBlogs = blogs.filter((b: any) => !b.faqs || b.faqs.length === 0);
  if (noFaqWeeks.length) console.log(`  ✗ ${noFaqWeeks.length} weeks without FAQ`);
  if (noFaqSymptoms.length) console.log(`  ✗ ${noFaqSymptoms.length} symptoms without FAQ: ${noFaqSymptoms.map((s: any) => s.slug).join(", ")}`);
  if (noFaqBlogs.length) console.log(`  ✗ ${noFaqBlogs.length} blog posts without FAQ`);
  if (!noFaqWeeks.length && !noFaqSymptoms.length && !noFaqBlogs.length) console.log("  ✓ All content has FAQ");

  console.log("\n═══ CONTENT TABLE ═══");
  console.log("  Slug | Title | MetaTitle Len | MetaDesc Len | Words | FAQ | Status");
  console.log("  " + "─".repeat(100));

  [...weeks.slice(0, 5), ...symptoms.slice(0, 5), ...blogs.slice(0, 5)].forEach((item: any) => {
    const slug = item.slug || `week-${item.week_number || item.weekNumber}`;
    const title = (item.title || "").substring(0, 40);
    const mtLen = (item.meta_title || item.metaTitle || "").length;
    const mdLen = (item.meta_description || item.metaDescription || "").length;
    const hasFaq = (item.faq || item.faqs || []).length > 0 ? "Yes" : "No";
    console.log(`  ${slug} | ${title} | ${mtLen} | ${mdLen} | ${hasFaq}`);
  });

  await pool.end();
  console.log("\n═══ AUDIT COMPLETE ═══");
}

auditSeo().catch(console.error);
