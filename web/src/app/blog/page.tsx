import Link from "next/link";
import type { Metadata } from "next";
import { Clock, Tag } from "lucide-react";
import { getPublishedBlogPosts } from "@/lib/data";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BreadcrumbJsonLd } from "@/components/JsonLd";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "مدونة الحمل والأمومة - مقالات طبية موثوقة",
  description: "مقالات متخصصة عن الحمل والولادة والأمومة. نصائح طبية موثوقة ومعلومات شاملة لكل حامل.",
  alternates: { canonical: "/blog" },
};

export default async function BlogPage() {
  const posts = await getPublishedBlogPosts();
  const categories = [...new Set(posts.map((p) => p.category).filter(Boolean))];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <BreadcrumbJsonLd items={[{ name: "الرئيسية", url: "/" }, { name: "المدونة", url: "/blog" }]} />
      <Breadcrumbs items={[{ label: "المدونة" }]} />
      <h1 className="text-3xl font-bold text-foreground mb-4" data-testid="text-h1-blog">مدونة فلذة</h1>
      <p className="text-muted-foreground mb-8 max-w-2xl">
        مقالات متخصصة عن الحمل والولادة والأمومة مع نصائح طبية موثوقة.
      </p>

      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => {
            const catSlug = posts.find((p) => p.category === cat)?.categorySlug;
            return catSlug ? (
              <Link
                key={cat}
                href={`/blog/category/${catSlug}`}
                className="text-sm border border-border px-3 py-1.5 rounded-md hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {cat}
              </Link>
            ) : null;
          })}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="border border-border rounded-md overflow-hidden hover:border-primary/30 transition-colors group"
            data-testid={`link-blog-card-${post.slug}`}
          >
            <div className="p-5">
              <span className="text-xs text-primary font-semibold">{post.category}</span>
              <h2 className="font-bold text-foreground mt-2 mb-2 group-hover:text-primary transition-colors">{post.title}</h2>
              <p className="text-sm text-muted-foreground line-clamp-3">{post.summary}</p>
              <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
                {post.publishedAt && (
                  <span>{new Date(post.publishedAt).toLocaleDateString("ar-SA")}</span>
                )}
              </div>
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-3">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="text-xs bg-accent text-accent-foreground px-2 py-0.5 rounded-md">{tag}</span>
                  ))}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
