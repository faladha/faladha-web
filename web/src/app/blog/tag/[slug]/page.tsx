import type { Metadata } from "next";
import Link from "next/link";
import { Clock } from "lucide-react";
import { getPublishedBlogPosts, getBlogPostsByTag } from "@/lib/data";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BreadcrumbJsonLd } from "@/components/JsonLd";

export const revalidate = 86400;

export async function generateStaticParams() {
  const posts = await getPublishedBlogPosts();
  const allTags = posts.flatMap((p) => p.tagSlugs || []);
  const uniqueTags = [...new Set(allTags.filter(Boolean))];
  return uniqueTags.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const posts = await getBlogPostsByTag(slug);
  const tagName = posts.length > 0
    ? posts[0].tags?.[posts[0].tagSlugs?.indexOf(slug) ?? -1] || slug
    : slug;
  return {
    title: `${tagName} - مدونة الحمل`,
    description: `مقالات بوسم ${tagName} من مدونة فلذة`,
    alternates: { canonical: `/blog/tag/${slug}` },
  };
}

export default async function TagPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const posts = await getBlogPostsByTag(slug);
  const tagName = posts.length > 0
    ? posts[0].tags?.[posts[0].tagSlugs?.indexOf(slug) ?? -1] || slug
    : slug;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <BreadcrumbJsonLd items={[
        { name: "الرئيسية", url: "/" },
        { name: "المدونة", url: "/blog" },
        { name: tagName, url: `/blog/tag/${slug}` },
      ]} />
      <Breadcrumbs items={[
        { label: "المدونة", href: "/blog" },
        { label: tagName },
      ]} />

      <h1 className="text-3xl font-bold text-foreground mb-4" data-testid="text-h1-tag">{tagName}</h1>
      <p className="text-muted-foreground mb-8">{posts.length} مقال بهذا الوسم</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="border border-border rounded-md p-5 hover:border-primary/30 transition-colors group">
            <span className="text-xs text-primary font-semibold">{post.category}</span>
            <h2 className="font-bold text-foreground mt-1 group-hover:text-primary transition-colors">{post.title}</h2>
            <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{post.summary}</p>
            <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
              <Clock className="w-3 h-3" /><span>{post.readTime}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
