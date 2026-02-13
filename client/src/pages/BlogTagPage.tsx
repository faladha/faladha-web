import { useParams, Link } from "wouter";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { Clock, Calendar } from "lucide-react";
import NotFound from "./not-found";
import { useEffect, useMemo } from "react";

export default function BlogTagPage() {
  const params = useParams<{ tagSlug: string }>();
  const tagSlug = params.tagSlug || "";

  const { data: allPosts = [], isLoading } = useQuery<any[]>({
    queryKey: ["/api/public/blog"],
  });

  const posts = useMemo(() =>
    allPosts.filter((p: any) => (p.tagSlugs || []).includes(tagSlug)),
    [allPosts, tagSlug]
  );

  const allTags = useMemo(() => {
    const tagMap = new Map<string, number>();
    const tagNames = new Map<string, string>();
    allPosts.forEach((post: any) => {
      (post.tags || []).forEach((tag: string, i: number) => {
        const slug = (post.tagSlugs || [])[i];
        if (slug) {
          tagMap.set(slug, (tagMap.get(slug) || 0) + 1);
          if (!tagNames.has(slug)) tagNames.set(slug, tag);
        }
      });
    });
    return Array.from(tagMap.entries())
      .map(([slug, count]) => ({ name: tagNames.get(slug) || slug, slug, count }))
      .sort((a, b) => b.count - a.count);
  }, [allPosts]);

  const currentTag = allTags.find(t => t.slug === tagSlug);

  useEffect(() => {
    if (currentTag) {
      document.title = `${currentTag.name} - وسم | مدونة فلذة`;
    }
  }, [currentTag]);

  if (isLoading) {
    return (
      <div data-testid="page-blog-tag">
        <div className="bg-gradient-to-b from-primary/5 to-transparent py-10 md:py-14 mb-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <Skeleton className="h-8 w-48 mb-4" />
            <Skeleton className="h-5 w-64" />
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-48 rounded-md" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!currentTag || posts.length === 0) return <NotFound />;

  return (
    <div data-testid="page-blog-tag">
      <BreadcrumbJsonLd items={[
        { name: "الرئيسية", url: "/" },
        { name: "المدونة", url: "/blog" },
        { name: currentTag.name, url: `/blog/tag/${tagSlug}` },
      ]} />

      <div className="bg-gradient-to-b from-primary/5 to-transparent py-10 md:py-14 mb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Breadcrumbs items={[
            { label: "المدونة", href: "/blog" },
            { label: `وسم: ${currentTag.name}` },
          ]} />
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3" data-testid="text-tag-title">
            مقالات بوسم: {currentTag.name}
          </h1>
          <p className="text-muted-foreground leading-relaxed text-sm">
            {posts.length} مقال يحمل وسم &ldquo;{currentTag.name}&rdquo;
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-12">
        <div className="flex flex-wrap gap-2 mb-6">
          {allTags.slice(0, 15).map(tag => (
            <Link key={tag.slug} href={`/blog/tag/${tag.slug}`}>
              <Badge
                variant={tag.slug === tagSlug ? "default" : "outline"}
                className="cursor-pointer text-[10px]"
                data-testid={`tag-link-${tag.slug}`}
              >
                {tag.name} ({tag.count})
              </Badge>
            </Link>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {posts.map((post: any) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <Card className="hover-elevate h-full overflow-visible" data-testid={`card-blog-${post.slug}`}>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <Link href={`/blog/category/${post.categorySlug}`} onClick={(e: any) => e.stopPropagation()}>
                      <Badge variant="secondary" className="text-[10px]">{post.category}</Badge>
                    </Link>
                    <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {post.readTime}
                    </span>
                    <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {post.publishedAt || post.publishDate}
                    </span>
                  </div>
                  <h2 className="font-semibold text-foreground mb-2 text-sm leading-relaxed">{post.title}</h2>
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">{post.summary}</p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
