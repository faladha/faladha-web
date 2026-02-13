import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import MedicalDisclaimer from "@/components/sections/MedicalDisclaimer";
import CTABanner from "@/components/sections/CTABanner";
import JsonLd, { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Calendar, User, ShieldCheck, BookOpen, ArrowLeft, List } from "lucide-react";
import NotFound from "./not-found";
import { useEffect, useState, useMemo } from "react";
import { useSeoMeta } from "@/hooks/useSeoMeta";

function TableOfContents({ headings }: { headings: { id: string; text: string; level: 2 | 3 }[] }) {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        const visible = entries.filter(e => e.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0.1 }
    );
    headings.forEach(h => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [headings]);

  return (
    <nav className="hidden lg:block" data-testid="table-of-contents">
      <div className="sticky top-20">
        <div className="flex items-center gap-2 mb-3 text-sm font-semibold text-foreground">
          <List className="w-4 h-4" />
          محتويات المقال
        </div>
        <ul className="space-y-1 border-s-2 border-border ps-3">
          {headings.map(h => (
            <li key={h.id}>
              <a
                href={`#${h.id}`}
                className={`block text-xs leading-relaxed py-1 transition-colors ${
                  activeId === h.id
                    ? "text-primary font-medium"
                    : "text-muted-foreground"
                } ${h.level === 3 ? "ps-3" : ""}`}
                data-testid={`toc-link-${h.id}`}
              >
                {h.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default function BlogDetail() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug || "";

  const { data: post, isLoading, error } = useQuery<any>({
    queryKey: ["/api/public/blog", slug],
    enabled: !!slug,
  });

  const { data: allPosts = [] } = useQuery<any[]>({
    queryKey: ["/api/public/blog"],
  });

  const { data: allSymptoms = [] } = useQuery<any[]>({
    queryKey: ["/api/public/symptoms"],
  });

  const headings = useMemo(() => {
    if (!post?.sections) return [];
    return (post.sections as any[]).map((s: any) => ({
      id: s.heading.replace(/\s+/g, "-").replace(/[^\u0600-\u06FF\w-]/g, ""),
      text: s.heading,
      level: s.headingLevel as 2 | 3,
    }));
  }, [post]);

  const symptomTitleMap = useMemo(() => {
    const map: Record<string, string> = {};
    allSymptoms.forEach((s: any) => { map[s.slug] = s.title; });
    return map;
  }, [allSymptoms]);

  const relatedPosts = useMemo(() => {
    if (!post || allPosts.length === 0) return [];
    return allPosts
      .filter((p: any) => p.slug !== post.slug)
      .map((p: any) => {
        let score = 0;
        if (p.categorySlug === post.categorySlug) score += 3;
        (p.tagSlugs || []).forEach((t: string) => {
          if ((post.tagSlugs || []).includes(t)) score += 1;
        });
        return { ...p, score };
      })
      .filter((p: any) => p.score > 0)
      .sort((a: any, b: any) => b.score - a.score)
      .slice(0, 3);
  }, [post, allPosts]);

  useSeoMeta({
    title: post?.metaTitle ?? post?.meta_title ?? "",
    description: post?.metaDescription ?? post?.meta_description ?? "",
    canonical: post ? `/blog/${post.slug}` : undefined,
    ogType: "article",
  });

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <Skeleton className="h-5 w-48 mb-4" />
        <Skeleton className="h-8 w-96 mb-3" />
        <Skeleton className="h-5 w-full mb-8" />
        <Skeleton className="h-96 rounded-md" />
      </div>
    );
  }

  if (error || !post) return <NotFound />;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.metaDescription,
    "url": `https://faladha.com/blog/${post.slug}`,
    "datePublished": post.publishedAt || post.publishDate,
    "dateModified": post.updatedAt,
    "author": { "@type": "Organization", "name": post.author },
    "publisher": {
      "@type": "Organization",
      "name": "فلذة",
      "logo": { "@type": "ImageObject", "url": "https://faladha.com/favicon.png" }
    },
    "inLanguage": "ar",
    "mainEntityOfPage": { "@type": "WebPage", "@id": `https://faladha.com/blog/${post.slug}` },
  };

  const faqJsonLd = (post.faqs || []).length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": post.faqs.map((f: any) => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": { "@type": "Answer", "text": f.answer }
    }))
  } : null;

  const medicalJsonLd = post.medicalReviewed ? {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "name": post.title,
    "description": post.metaDescription,
    "url": `https://faladha.com/blog/${post.slug}`,
    "lastReviewed": post.updatedAt,
    "reviewedBy": { "@type": "Organization", "name": "فريق فلذة الطبي" },
    "inLanguage": "ar",
    "about": { "@type": "MedicalCondition", "name": "الحمل" }
  } : null;

  const sections = post.sections || [];

  return (
    <div data-testid="page-blog-detail">
      <JsonLd data={articleJsonLd} />
      {faqJsonLd && <JsonLd data={faqJsonLd} />}
      {medicalJsonLd && <JsonLd data={medicalJsonLd} />}
      <BreadcrumbJsonLd items={[
        { name: "الرئيسية", url: "/" },
        { name: "المدونة", url: "/blog" },
        { name: post.category, url: `/blog/category/${post.categorySlug}` },
        { name: post.title, url: `/blog/${post.slug}` },
      ]} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <Breadcrumbs items={[
          { label: "المدونة", href: "/blog" },
          { label: post.category, href: `/blog/category/${post.categorySlug}` },
          { label: post.title },
        ]} />

        <div className="flex gap-8">
          <div className="flex-1 max-w-3xl">
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <Link href={`/blog/category/${post.categorySlug}`}>
                <Badge variant="secondary" className="text-xs">{post.category}</Badge>
              </Link>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="w-3 h-3" /> {post.readTime}
              </span>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Calendar className="w-3 h-3" /> {post.publishedAt || post.publishDate}
              </span>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <User className="w-3 h-3" /> {post.author}
              </span>
              {post.medicalReviewed && (
                <span className="text-xs text-green-600 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> مراجعة طبية
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 leading-snug" data-testid="text-blog-title">
              {post.title}
            </h1>
            <p className="text-muted-foreground leading-relaxed mb-8 text-base sm:text-lg">{post.summary}</p>

            <div className="flex flex-wrap gap-1.5 mb-8">
              {(post.tags || []).map((tag: string, i: number) => (
                <Link key={i} href={`/blog/tag/${(post.tagSlugs || [])[i]}`}>
                  <Badge variant="outline" className="text-[10px] cursor-pointer">{tag}</Badge>
                </Link>
              ))}
            </div>

            <article className="prose prose-sm max-w-none" data-testid="blog-content">
              {sections.map((section: any, si: number) => {
                const HeadingTag = section.headingLevel === 2 ? "h2" : "h3";
                const headingId = headings[si]?.id || "";
                return (
                  <section key={si} className="mb-8">
                    <HeadingTag
                      id={headingId}
                      className={`font-bold text-foreground mb-4 scroll-mt-24 ${
                        section.headingLevel === 2 ? "text-xl" : "text-lg"
                      }`}
                    >
                      {section.heading}
                    </HeadingTag>
                    {(section.content || []).map((paragraph: string, pi: number) => (
                      <p key={pi} className="text-foreground leading-relaxed mb-4 text-sm">{paragraph}</p>
                    ))}
                  </section>
                );
              })}

              {(post.faqs || []).length > 0 && (
                <section className="mb-8" id="faq">
                  <h2 className="text-xl font-bold text-foreground mb-4 scroll-mt-24">الأسئلة الشائعة</h2>
                  <div className="space-y-4">
                    {post.faqs.map((faq: any, fi: number) => (
                      <Card key={fi} className="overflow-visible" data-testid={`faq-item-${fi}`}>
                        <div className="p-4">
                          <h3 className="font-semibold text-foreground text-sm mb-2">{faq.question}</h3>
                          <p className="text-muted-foreground text-xs leading-relaxed">{faq.answer}</p>
                        </div>
                      </Card>
                    ))}
                  </div>
                </section>
              )}
            </article>

            <MedicalDisclaimer />

            {(post.relatedWeeks || []).length > 0 && (
              <section className="mt-10 mb-8" data-testid="related-weeks">
                <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  أسابيع الحمل المرتبطة
                </h2>
                <div className="flex flex-wrap gap-2">
                  {(post.relatedWeeks || []).slice(0, 6).map((w: number) => (
                    <Link key={w} href={`/pregnancy/week-${w}`}>
                      <Badge variant="outline" className="cursor-pointer text-xs">
                        الأسبوع {w}
                      </Badge>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {(post.relatedSymptoms || []).length > 0 && (
              <section className="mb-8" data-testid="related-symptoms">
                <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  الأعراض المرتبطة
                </h2>
                <div className="flex flex-wrap gap-2">
                  {(post.relatedSymptoms || []).slice(0, 6).map((slug: string) => (
                    <Link key={slug} href={`/symptoms/${slug}`}>
                      <Badge variant="outline" className="cursor-pointer text-xs">
                        {symptomTitleMap[slug] || slug}
                      </Badge>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {relatedPosts.length > 0 && (
              <section className="mt-10" data-testid="related-posts">
                <h2 className="text-lg font-bold text-foreground mb-4">مقالات مشابهة</h2>
                <div className="grid sm:grid-cols-3 gap-4">
                  {relatedPosts.map((rp: any) => (
                    <Link key={rp.slug} href={`/blog/${rp.slug}`}>
                      <Card className="hover-elevate h-full overflow-visible" data-testid={`related-post-${rp.slug}`}>
                        <div className="p-4">
                          <Badge variant="secondary" className="text-[9px] mb-2">{rp.category}</Badge>
                          <h3 className="font-semibold text-foreground text-xs leading-relaxed mb-1 line-clamp-2">{rp.title}</h3>
                          <p className="text-[10px] text-muted-foreground flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {rp.readTime}
                          </p>
                        </div>
                      </Card>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>

          <div className="w-64 shrink-0">
            <TableOfContents headings={[...headings, ...((post.faqs || []).length > 0 ? [{ id: "faq", text: "الأسئلة الشائعة", level: 2 as const }] : [])]} />
          </div>
        </div>
      </div>

      <CTABanner />
    </div>
  );
}
