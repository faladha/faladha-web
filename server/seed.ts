import { db, pool } from "./db";
import { users, blogPosts, pregnancyWeeks, symptomsTable } from "@shared/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { weeks } from "../client/src/data/weeks";
import { symptoms } from "../client/src/data/symptoms";
import { blogPosts as blogData } from "../client/src/data/blog";

async function seed() {
  console.log("Starting seed...");

  try {
    await seedAdmin();
    await seedWeeks();
    await seedSymptoms();
    await seedBlogPosts();

    console.log("Seed completed successfully!");
  } catch (error) {
    console.error("Seed failed:", error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

async function seedAdmin() {
  console.log("Seeding admin user...");
  const email = "admin@faladha.com";
  const [existing] = await db.select().from(users).where(eq(users.email, email));
  if (existing) {
    console.log("  Admin user already exists, skipping.");
    return;
  }
  const hashedPassword = await bcrypt.hash("admin123456", 12);
  await db.insert(users).values({
    email,
    password: hashedPassword,
    name: "مدير النظام",
    role: "admin",
  });
  console.log("  Admin user created.");
}

async function seedWeeks() {
  console.log(`Seeding ${weeks.length} pregnancy weeks...`);
  let inserted = 0;
  let skipped = 0;

  for (const week of weeks) {
    const [existing] = await db.select().from(pregnancyWeeks).where(eq(pregnancyWeeks.slug, week.slug));
    if (existing) {
      skipped++;
      continue;
    }

    const flatTips = [
      ...week.tips.nutrition,
      ...week.tips.sleep,
      ...week.tips.exercise,
    ];

    await db.insert(pregnancyWeeks).values({
      weekNumber: week.weekNumber,
      slug: week.slug,
      title: week.title,
      metaTitle: week.metaTitle,
      metaDescription: week.metaDescription,
      summary: week.summary,
      trimester: week.trimester,
      fetusSize: week.fetusSize,
      fetalDevelopment: week.fetalDevelopment,
      motherSymptoms: week.motherSymptoms,
      tips: flatTips,
      whenToCallDoctor: week.whenToCallDoctor,
      faq: week.faq,
      relatedSymptoms: week.relatedSymptoms,
      status: "published",
    });
    inserted++;
  }

  console.log(`  Weeks: ${inserted} inserted, ${skipped} skipped (already exist).`);
}

async function seedSymptoms() {
  console.log(`Seeding ${symptoms.length} symptoms...`);
  let inserted = 0;
  let skipped = 0;

  for (const symptom of symptoms) {
    const [existing] = await db.select().from(symptomsTable).where(eq(symptomsTable.slug, symptom.slug));
    if (existing) {
      skipped++;
      continue;
    }

    await db.insert(symptomsTable).values({
      slug: symptom.slug,
      title: symptom.title,
      metaTitle: symptom.metaTitle,
      metaDescription: symptom.metaDescription,
      summary: symptom.summary,
      causes: symptom.causes,
      remedies: symptom.remedies,
      whenToWorry: symptom.whenToWorry,
      trimester: symptom.trimester,
      relatedWeeks: symptom.relatedWeeks,
      faq: symptom.faq,
      status: "published",
    });
    inserted++;
  }

  console.log(`  Symptoms: ${inserted} inserted, ${skipped} skipped (already exist).`);
}

async function seedBlogPosts() {
  console.log(`Seeding ${blogData.length} blog posts...`);
  let inserted = 0;
  let skipped = 0;

  for (const post of blogData) {
    const [existing] = await db.select().from(blogPosts).where(eq(blogPosts.slug, post.slug));
    if (existing) {
      skipped++;
      continue;
    }

    const contentParts: string[] = [];
    for (const section of post.sections) {
      const tag = section.headingLevel === 2 ? "h2" : "h3";
      contentParts.push(`<${tag}>${section.heading}</${tag}>`);
      for (const paragraph of section.content) {
        contentParts.push(`<p>${paragraph}</p>`);
      }
    }
    const content = contentParts.join("\n");

    const publishedAt = post.publishDate ? new Date(post.publishDate) : new Date();

    await db.insert(blogPosts).values({
      slug: post.slug,
      title: post.title,
      metaTitle: post.metaTitle,
      metaDescription: post.metaDescription,
      summary: post.summary,
      content,
      category: post.category,
      categorySlug: post.categorySlug,
      tags: post.tags,
      tagSlugs: post.tagSlugs,
      readTime: post.readTime,
      author: post.author,
      medicalReviewed: post.medicalReviewed,
      relatedWeeks: post.relatedWeeks,
      relatedSymptoms: post.relatedSymptoms,
      faqs: post.faqs,
      sections: post.sections,
      status: "published",
      publishedAt,
    });
    inserted++;
  }

  console.log(`  Blog posts: ${inserted} inserted, ${skipped} skipped (already exist).`);
}

seed();
