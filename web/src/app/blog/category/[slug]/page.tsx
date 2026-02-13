import type { Metadata } from "next";
import Link from "next/link";
import { Clock } from "lucide-react";
import { getPublishedBlogPosts, getBlogPostsByCategory } from "@/lib/data";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BreadcrumbJsonLd } from "@/components/JsonLd";

export const revalidate = 86400;

export async function generateStaticParams() {
  const posts = await getPublishedBlogPosts();
  const slugs = [...new Set(posts.map((p) => p.categorySlug).filter(Boolean))];
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const posts = await getBlogPostsByCategory(slug);
  const categoryName = posts[0]?.category || slug;
  return {
    title: `${categoryName} - مدونة فلذة`,
    description: `مقالات في تصنيف ${categoryName} من مدونة فلذة`,
    alternates: { canonical: `/blog/category/${slug}` },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const posts = await getBlogPostsByCategory(slug);
  const categoryName = posts[0]?.category || slug;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <BreadcrumbJsonLd items={[
        { name: "الرئيسية", url: "/" },
        { name: "المدونة", url: "/blog" },
        { name: categoryName, url: `/blog/category/${slug}` },
      ]} />
      <Breadcrumbs items={[
        { label: "المدونة", href: "/blog" },
        { label: categoryName },
      ]} />

      <h1 className="text-3xl font-bold text-foreground mb-4" data-testid="text-h1-category">{categoryName}</h1>
      <p className="text-muted-foreground mb-8">{posts.length} مقال في هذا التصنيف</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="border border-border rounded-md p-5 hover:border-primary/30 transition-colors group">
            <h2 className="font-bold text-foreground group-hover:text-primary transition-colors">{post.title}</h2>
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
