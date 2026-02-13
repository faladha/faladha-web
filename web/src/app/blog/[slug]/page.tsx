import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, Calendar, User, Tag } from "lucide-react";
import { getPublishedBlogPosts, getBlogPostBySlug } from "@/lib/data";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BreadcrumbJsonLd, FAQJsonLd, ArticleJsonLd } from "@/components/JsonLd";
import { MedicalDisclaimer } from "@/components/MedicalDisclaimer";
import { SITE_URL } from "@/lib/constants";

export const revalidate = 86400;

export async function generateStaticParams() {
  const posts = await getPublishedBlogPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

function stripBrand(title: string): string {
  return title.replace(/\s*[||\-]\s*فلذة\s*$/u, "").trim();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return { title: "صفحة غير موجودة" };
  const rawTitle = post.metaTitle || post.title;
  const title = stripBrand(rawTitle);
  return {
    title,
    description: post.metaDescription || post.summary,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: `${title} | فلذة`,
      description: post.metaDescription || post.summary,
      url: `${SITE_URL}/blog/${post.slug}`,
      type: "article",
      publishedTime: post.publishedAt?.toISOString(),
      modifiedTime: post.updatedAt?.toISOString(),
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post || post.status !== "published") notFound();

  const faqs = (post.faqs || []) as { question: string; answer: string }[];
  const sections = (post.sections || []) as { title: string; content: string }[];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <BreadcrumbJsonLd items={[
        { name: "الرئيسية", url: "/" },
        { name: "المدونة", url: "/blog" },
        { name: post.title, url: `/blog/${post.slug}` },
      ]} />
      <ArticleJsonLd
        title={post.metaTitle || post.title}
        description={post.metaDescription || post.summary}
        url={`/blog/${post.slug}`}
        datePublished={post.publishedAt?.toISOString()}
        dateModified={post.updatedAt?.toISOString()}
      />
      {faqs.length > 0 && <FAQJsonLd items={faqs} />}

      <Breadcrumbs items={[
        { label: "المدونة", href: "/blog" },
        { label: post.title },
      ]} />

      <article>
        <header className="mb-8">
          {post.category && (
            <Link href={`/blog/category/${post.categorySlug}`} className="text-sm text-primary font-semibold hover:underline">
              {post.category}
            </Link>
          )}
          <h1 className="text-3xl font-bold text-foreground mt-2 mb-3" data-testid="text-h1-blog-title">{post.title}</h1>
          <p className="text-muted-foreground mb-4">{post.summary}</p>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1"><User className="w-4 h-4" />{post.author}</span>
            <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{post.readTime}</span>
            {post.publishedAt && (
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {new Date(post.publishedAt).toLocaleDateString("ar-SA", { year: "numeric", month: "long", day: "numeric" })}
              </span>
            )}
          </div>
        </header>

        {/* Content */}
        {post.content && (
          <div className="prose prose-lg max-w-none mb-8 text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: post.content }} />
        )}

        {/* Sections */}
        {sections.length > 0 && (
          <div className="space-y-8 mb-8">
            {sections.map((section, i) => (
              <section key={i}>
                <h2 className="text-xl font-bold text-foreground mb-3">{section.title}</h2>
                <div className="text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: section.content }} />
              </section>
            ))}
          </div>
        )}

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-8">
            <Tag className="w-4 h-4 text-muted-foreground" />
            {post.tags.map((tag, i) => {
              const tagSlug = post.tagSlugs?.[i];
              return tagSlug ? (
                <Link
                  key={tag}
                  href={`/blog/tag/${tagSlug}`}
                  className="text-sm bg-accent text-accent-foreground px-2 py-1 rounded-md hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  {tag}
                </Link>
              ) : (
                <span key={tag} className="text-sm bg-accent text-accent-foreground px-2 py-1 rounded-md">{tag}</span>
              );
            })}
          </div>
        )}

        {/* FAQ */}
        {faqs.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-bold text-foreground mb-4">الأسئلة الشائعة</h2>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <details key={i} className="border border-border rounded-md">
                  <summary className="cursor-pointer p-4 font-semibold text-foreground hover:text-primary transition-colors text-sm">
                    {faq.question}
                  </summary>
                  <div className="px-4 pb-4 text-muted-foreground text-sm leading-relaxed">{faq.answer}</div>
                </details>
              ))}
            </div>
          </section>
        )}
      </article>

      <MedicalDisclaimer />
    </div>
  );
}
