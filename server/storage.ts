import {
  users, blogPosts, pregnancyWeeks, symptomsTable, toolsContent, siteSettings,
  type User, type InsertUser,
  type BlogPost, type InsertBlogPost,
  type PregnancyWeek, type InsertPregnancyWeek,
  type Symptom, type InsertSymptom,
  type ToolContent, type InsertToolContent,
  type SiteSetting, type InsertSiteSetting,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, asc, ilike, and, sql, count } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getUsers(): Promise<User[]>;

  getBlogPosts(filters?: { status?: string; category?: string; search?: string }): Promise<BlogPost[]>;
  getBlogPost(id: string): Promise<BlogPost | undefined>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  updateBlogPost(id: string, data: Partial<InsertBlogPost>): Promise<BlogPost | undefined>;
  deleteBlogPost(id: string): Promise<boolean>;

  getWeeks(filters?: { status?: string }): Promise<PregnancyWeek[]>;
  getWeek(id: string): Promise<PregnancyWeek | undefined>;
  getWeekByNumber(num: number): Promise<PregnancyWeek | undefined>;
  getWeekBySlug(slug: string): Promise<PregnancyWeek | undefined>;
  createWeek(week: InsertPregnancyWeek): Promise<PregnancyWeek>;
  updateWeek(id: string, data: Partial<InsertPregnancyWeek>): Promise<PregnancyWeek | undefined>;
  deleteWeek(id: string): Promise<boolean>;

  getSymptoms(filters?: { status?: string; search?: string }): Promise<Symptom[]>;
  getSymptom(id: string): Promise<Symptom | undefined>;
  getSymptomBySlug(slug: string): Promise<Symptom | undefined>;
  createSymptom(symptom: InsertSymptom): Promise<Symptom>;
  updateSymptom(id: string, data: Partial<InsertSymptom>): Promise<Symptom | undefined>;
  deleteSymptom(id: string): Promise<boolean>;

  getToolContent(slug: string): Promise<ToolContent | undefined>;
  upsertToolContent(data: InsertToolContent): Promise<ToolContent>;

  getSetting(key: string): Promise<SiteSetting | undefined>;
  getSettings(): Promise<SiteSetting[]>;
  upsertSetting(key: string, value: any): Promise<SiteSetting>;

  getContentHealth(): Promise<{
    blogStats: { total: number; published: number; draft: number };
    weekStats: { total: number; published: number; draft: number; missingFaq: number; missingMeta: number };
    symptomStats: { total: number; published: number; draft: number; missingFaq: number; missingMeta: number };
    duplicateSlugs: string[];
    duplicateTitles: string[];
  }>;

  getPublishedBlogPosts(): Promise<BlogPost[]>;
  getPublishedWeeks(): Promise<PregnancyWeek[]>;
  getPublishedSymptoms(): Promise<Symptom[]>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string) {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByEmail(email: string) {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  async createUser(user: InsertUser) {
    const [created] = await db.insert(users).values(user).returning();
    return created;
  }

  async getUsers() {
    return db.select().from(users);
  }

  async getBlogPosts(filters?: { status?: string; category?: string; search?: string }) {
    let query = db.select().from(blogPosts).orderBy(desc(blogPosts.updatedAt));
    const conditions: any[] = [];
    if (filters?.status) conditions.push(eq(blogPosts.status, filters.status));
    if (filters?.category) conditions.push(eq(blogPosts.categorySlug, filters.category));
    if (filters?.search) conditions.push(ilike(blogPosts.title, `%${filters.search}%`));
    if (conditions.length > 0) {
      return db.select().from(blogPosts).where(and(...conditions)).orderBy(desc(blogPosts.updatedAt));
    }
    return query;
  }

  async getBlogPost(id: string) {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.id, id));
    return post;
  }

  async getBlogPostBySlug(slug: string) {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
    return post;
  }

  async createBlogPost(post: InsertBlogPost) {
    const [created] = await db.insert(blogPosts).values({
      ...post,
      updatedAt: new Date(),
    }).returning();
    return created;
  }

  async updateBlogPost(id: string, data: Partial<InsertBlogPost>) {
    const [updated] = await db.update(blogPosts)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(blogPosts.id, id))
      .returning();
    return updated;
  }

  async deleteBlogPost(id: string) {
    const result = await db.delete(blogPosts).where(eq(blogPosts.id, id));
    return true;
  }

  async getWeeks(filters?: { status?: string }) {
    if (filters?.status) {
      return db.select().from(pregnancyWeeks)
        .where(eq(pregnancyWeeks.status, filters.status))
        .orderBy(asc(pregnancyWeeks.weekNumber));
    }
    return db.select().from(pregnancyWeeks).orderBy(asc(pregnancyWeeks.weekNumber));
  }

  async getWeek(id: string) {
    const [week] = await db.select().from(pregnancyWeeks).where(eq(pregnancyWeeks.id, id));
    return week;
  }

  async getWeekByNumber(num: number) {
    const [week] = await db.select().from(pregnancyWeeks).where(eq(pregnancyWeeks.weekNumber, num));
    return week;
  }

  async getWeekBySlug(slug: string) {
    const [week] = await db.select().from(pregnancyWeeks).where(eq(pregnancyWeeks.slug, slug));
    return week;
  }

  async createWeek(week: InsertPregnancyWeek) {
    const [created] = await db.insert(pregnancyWeeks).values({
      ...week,
      updatedAt: new Date(),
    }).returning();
    return created;
  }

  async updateWeek(id: string, data: Partial<InsertPregnancyWeek>) {
    const [updated] = await db.update(pregnancyWeeks)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(pregnancyWeeks.id, id))
      .returning();
    return updated;
  }

  async deleteWeek(id: string) {
    await db.delete(pregnancyWeeks).where(eq(pregnancyWeeks.id, id));
    return true;
  }

  async getSymptoms(filters?: { status?: string; search?: string }) {
    const conditions: any[] = [];
    if (filters?.status) conditions.push(eq(symptomsTable.status, filters.status));
    if (filters?.search) conditions.push(ilike(symptomsTable.title, `%${filters.search}%`));
    if (conditions.length > 0) {
      return db.select().from(symptomsTable).where(and(...conditions)).orderBy(asc(symptomsTable.title));
    }
    return db.select().from(symptomsTable).orderBy(asc(symptomsTable.title));
  }

  async getSymptom(id: string) {
    const [symptom] = await db.select().from(symptomsTable).where(eq(symptomsTable.id, id));
    return symptom;
  }

  async getSymptomBySlug(slug: string) {
    const [symptom] = await db.select().from(symptomsTable).where(eq(symptomsTable.slug, slug));
    return symptom;
  }

  async createSymptom(symptom: InsertSymptom) {
    const [created] = await db.insert(symptomsTable).values({
      ...symptom,
      updatedAt: new Date(),
    }).returning();
    return created;
  }

  async updateSymptom(id: string, data: Partial<InsertSymptom>) {
    const [updated] = await db.update(symptomsTable)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(symptomsTable.id, id))
      .returning();
    return updated;
  }

  async deleteSymptom(id: string) {
    await db.delete(symptomsTable).where(eq(symptomsTable.id, id));
    return true;
  }

  async getToolContent(slug: string) {
    const [content] = await db.select().from(toolsContent).where(eq(toolsContent.toolSlug, slug));
    return content;
  }

  async upsertToolContent(data: InsertToolContent) {
    const existing = await this.getToolContent(data.toolSlug);
    if (existing) {
      const [updated] = await db.update(toolsContent)
        .set({ ...data, updatedAt: new Date() })
        .where(eq(toolsContent.toolSlug, data.toolSlug))
        .returning();
      return updated;
    }
    const [created] = await db.insert(toolsContent).values({
      ...data,
      updatedAt: new Date(),
    }).returning();
    return created;
  }

  async getSetting(key: string) {
    const [setting] = await db.select().from(siteSettings).where(eq(siteSettings.key, key));
    return setting;
  }

  async getSettings() {
    return db.select().from(siteSettings).orderBy(asc(siteSettings.key));
  }

  async upsertSetting(key: string, value: any) {
    const existing = await this.getSetting(key);
    if (existing) {
      const [updated] = await db.update(siteSettings)
        .set({ value, updatedAt: new Date() })
        .where(eq(siteSettings.key, key))
        .returning();
      return updated;
    }
    const [created] = await db.insert(siteSettings).values({
      key,
      value,
      updatedAt: new Date(),
    }).returning();
    return created;
  }

  async getContentHealth() {
    const allBlogs = await db.select().from(blogPosts);
    const allWeeks = await db.select().from(pregnancyWeeks);
    const allSymptoms = await db.select().from(symptomsTable);

    const blogPublished = allBlogs.filter((b: BlogPost) => b.status === "published").length;
    const weekPublished = allWeeks.filter((w: PregnancyWeek) => w.status === "published").length;
    const symptomPublished = allSymptoms.filter((s: Symptom) => s.status === "published").length;

    const weeksMissingFaq = allWeeks.filter((w: PregnancyWeek) => !w.faq || (w.faq as any[]).length === 0).length;
    const weeksMissingMeta = allWeeks.filter((w: PregnancyWeek) => !w.metaDescription || w.metaDescription.length < 10).length;
    const symptomsMissingFaq = allSymptoms.filter((s: Symptom) => !s.faq || (s.faq as any[]).length === 0).length;
    const symptomsMissingMeta = allSymptoms.filter((s: Symptom) => !s.metaDescription || s.metaDescription.length < 10).length;

    const allSlugs = [
      ...allBlogs.map((b: BlogPost) => b.slug),
      ...allWeeks.map((w: PregnancyWeek) => w.slug),
      ...allSymptoms.map((s: Symptom) => s.slug),
    ];
    const slugCounts: Record<string, number> = {};
    allSlugs.forEach((s: string) => { slugCounts[s] = (slugCounts[s] || 0) + 1; });
    const duplicateSlugs = Object.entries(slugCounts).filter(([, c]) => c > 1).map(([s]) => s);

    const allTitles = [
      ...allBlogs.map((b: BlogPost) => b.title),
      ...allWeeks.map((w: PregnancyWeek) => w.title),
      ...allSymptoms.map((s: Symptom) => s.title),
    ];
    const titleCounts: Record<string, number> = {};
    allTitles.forEach((t: string) => { titleCounts[t] = (titleCounts[t] || 0) + 1; });
    const duplicateTitles = Object.entries(titleCounts).filter(([, c]) => c > 1).map(([t]) => t);

    return {
      blogStats: { total: allBlogs.length, published: blogPublished, draft: allBlogs.length - blogPublished },
      weekStats: { total: allWeeks.length, published: weekPublished, draft: allWeeks.length - weekPublished, missingFaq: weeksMissingFaq, missingMeta: weeksMissingMeta },
      symptomStats: { total: allSymptoms.length, published: symptomPublished, draft: allSymptoms.length - symptomPublished, missingFaq: symptomsMissingFaq, missingMeta: symptomsMissingMeta },
      duplicateSlugs,
      duplicateTitles,
    };
  }

  async getPublishedBlogPosts() {
    return db.select().from(blogPosts).where(eq(blogPosts.status, "published")).orderBy(desc(blogPosts.publishedAt));
  }

  async getPublishedWeeks() {
    return db.select().from(pregnancyWeeks).where(eq(pregnancyWeeks.status, "published")).orderBy(asc(pregnancyWeeks.weekNumber));
  }

  async getPublishedSymptoms() {
    return db.select().from(symptomsTable).where(eq(symptomsTable.status, "published")).orderBy(asc(symptomsTable.title));
  }
}

export const storage = new DatabaseStorage();
