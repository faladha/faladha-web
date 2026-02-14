import { db } from "./db";
import { eq, desc, asc } from "drizzle-orm";
import { pregnancyWeeks, symptomsTable, blogPosts } from "@faladha/shared/schema";

export async function getPublishedWeeks() {
  return db
    .select()
    .from(pregnancyWeeks)
    .where(eq(pregnancyWeeks.status, "published"))
    .orderBy(asc(pregnancyWeeks.weekNumber));
}

export async function getWeekBySlug(slug: string) {
  const [week] = await db
    .select()
    .from(pregnancyWeeks)
    .where(eq(pregnancyWeeks.slug, slug))
    .limit(1);
  return week || null;
}

export async function getPublishedSymptoms() {
  return db
    .select()
    .from(symptomsTable)
    .where(eq(symptomsTable.status, "published"))
    .orderBy(asc(symptomsTable.title));
}

export async function getSymptomBySlug(slug: string) {
  const [symptom] = await db
    .select()
    .from(symptomsTable)
    .where(eq(symptomsTable.slug, slug))
    .limit(1);
  return symptom || null;
}

export async function getPublishedBlogPosts() {
  return db
    .select()
    .from(blogPosts)
    .where(eq(blogPosts.status, "published"))
    .orderBy(desc(blogPosts.publishedAt));
}

export async function getBlogPostBySlug(slug: string) {
  const [post] = await db
    .select()
    .from(blogPosts)
    .where(eq(blogPosts.slug, slug))
    .limit(1);
  return post || null;
}

export async function getBlogPostsByCategory(categorySlug: string) {
  const posts = await getPublishedBlogPosts();
  return posts.filter((p) => p.categorySlug === categorySlug);
}

export async function getBlogPostsByTag(tagSlug: string) {
  const posts = await getPublishedBlogPosts();
  return posts.filter((p) => (p.tagSlugs || []).includes(tagSlug));
}
