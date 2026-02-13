import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, boolean, timestamp, jsonb, uniqueIndex } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull(),
  role: text("role").notNull().default("editor"),
});

export const sessions = pgTable("sessions", {
  sid: varchar("sid").primaryKey(),
  sess: jsonb("sess").notNull(),
  expire: timestamp("expire").notNull(),
});

export const blogPosts = pgTable("blog_posts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  metaTitle: text("meta_title").notNull().default(""),
  metaDescription: text("meta_description").notNull().default(""),
  summary: text("summary").notNull().default(""),
  content: text("content").notNull().default(""),
  category: text("category").notNull().default(""),
  categorySlug: text("category_slug").notNull().default(""),
  tags: text("tags").array().notNull().default(sql`ARRAY[]::text[]`),
  tagSlugs: text("tag_slugs").array().notNull().default(sql`ARRAY[]::text[]`),
  readTime: text("read_time").notNull().default("5 دقائق"),
  author: text("author").notNull().default("فريق فلذة الطبي"),
  medicalReviewed: boolean("medical_reviewed").notNull().default(false),
  relatedWeeks: integer("related_weeks").array().notNull().default(sql`ARRAY[]::integer[]`),
  relatedSymptoms: text("related_symptoms").array().notNull().default(sql`ARRAY[]::text[]`),
  faqs: jsonb("faqs").notNull().default(sql`'[]'::jsonb`),
  sections: jsonb("sections").notNull().default(sql`'[]'::jsonb`),
  coverImage: text("cover_image"),
  status: text("status").notNull().default("draft"),
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const pregnancyWeeks = pgTable("pregnancy_weeks", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  weekNumber: integer("week_number").notNull().unique(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  metaTitle: text("meta_title").notNull().default(""),
  metaDescription: text("meta_description").notNull().default(""),
  summary: text("summary").notNull().default(""),
  trimester: integer("trimester").notNull().default(1),
  fetusSize: jsonb("fetus_size").notNull().default(sql`'{}'::jsonb`),
  fetalDevelopment: text("fetal_development").array().notNull().default(sql`ARRAY[]::text[]`),
  motherSymptoms: text("mother_symptoms").array().notNull().default(sql`ARRAY[]::text[]`),
  tips: text("tips").array().notNull().default(sql`ARRAY[]::text[]`),
  whenToCallDoctor: text("when_to_call_doctor").array().notNull().default(sql`ARRAY[]::text[]`),
  faq: jsonb("faq").notNull().default(sql`'[]'::jsonb`),
  relatedSymptoms: text("related_symptoms").array().notNull().default(sql`ARRAY[]::text[]`),
  status: text("status").notNull().default("draft"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const symptomsTable = pgTable("symptoms", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  metaTitle: text("meta_title").notNull().default(""),
  metaDescription: text("meta_description").notNull().default(""),
  summary: text("summary").notNull().default(""),
  causes: text("causes").array().notNull().default(sql`ARRAY[]::text[]`),
  remedies: text("remedies").array().notNull().default(sql`ARRAY[]::text[]`),
  whenToWorry: text("when_to_worry").array().notNull().default(sql`ARRAY[]::text[]`),
  trimester: text("trimester").notNull().default(""),
  relatedWeeks: integer("related_weeks").array().notNull().default(sql`ARRAY[]::integer[]`),
  faq: jsonb("faq").notNull().default(sql`'[]'::jsonb`),
  status: text("status").notNull().default("draft"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const toolsContent = pgTable("tools_content", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  toolSlug: text("tool_slug").notNull().unique(),
  title: text("title").notNull(),
  metaTitle: text("meta_title").notNull().default(""),
  metaDescription: text("meta_description").notNull().default(""),
  intro: text("intro").notNull().default(""),
  sections: jsonb("sections").notNull().default(sql`'[]'::jsonb`),
  faq: jsonb("faq").notNull().default(sql`'[]'::jsonb`),
  settings: jsonb("settings").notNull().default(sql`'{}'::jsonb`),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const siteSettings = pgTable("site_settings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  key: text("key").notNull().unique(),
  value: jsonb("value").notNull().default(sql`'{}'::jsonb`),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  email: true,
  password: true,
  name: true,
  role: true,
});

export const insertBlogPostSchema = createInsertSchema(blogPosts).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertPregnancyWeekSchema = createInsertSchema(pregnancyWeeks).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertSymptomSchema = createInsertSchema(symptomsTable).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertToolsContentSchema = createInsertSchema(toolsContent).omit({
  id: true,
  updatedAt: true,
});

export const insertSiteSettingSchema = createInsertSchema(siteSettings).omit({
  id: true,
  updatedAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type BlogPost = typeof blogPosts.$inferSelect;
export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type PregnancyWeek = typeof pregnancyWeeks.$inferSelect;
export type InsertPregnancyWeek = z.infer<typeof insertPregnancyWeekSchema>;
export type Symptom = typeof symptomsTable.$inferSelect;
export type InsertSymptom = z.infer<typeof insertSymptomSchema>;
export type ToolContent = typeof toolsContent.$inferSelect;
export type InsertToolContent = z.infer<typeof insertToolsContentSchema>;
export type SiteSetting = typeof siteSettings.$inferSelect;
export type InsertSiteSetting = z.infer<typeof insertSiteSettingSchema>;

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
