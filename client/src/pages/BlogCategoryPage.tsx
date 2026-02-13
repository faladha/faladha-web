import { useParams, Link } from "wouter";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { Clock, Calendar } from "lucide-react";
import NotFound from "./not-found";
import { useMemo } from "react";
import { useSeoMeta } from "@/hooks/useSeoMeta";

export default function BlogCategoryPage() {
  const params = useParams<{ categorySlug: string }>();
  const categorySlug = params.categorySlug || "";

  const { data: allPosts = [], isLoading } = useQuery<any[]>({
    queryKey: ["/api/public/blog"],
  });

  const posts = useMemo(() =>
    allPosts.filter((p: any) => p.categorySlug === categorySlug),
    [allPosts, categorySlug]
  );

  const category = useMemo(() => {
    const post = posts[0];
    if (!post) return null;
    return { name: post.category, slug: post.categorySlug, description: "" };
  }, [posts]);

  const categories = useMemo(() => {
    const catMap = new Map<string, { name: string; slug: string }>();
    allPosts.forEach((p: any) => {
      if (p.categorySlug && !catMap.has(p.categorySlug)) {
        catMap.set(p.categorySlug, { name: p.category, slug: p.categorySlug });
      }
    });
    return Array.from(catMap.values());
  }, [allPosts]);

  useSeoMeta({
    title: category ? `${category.name} - مدونة فلذة | مقالات الحمل والأمومة` : "",
    description: category ? `مقالات عن ${category.name} في مدونة فلذة. نصائح طبية موثوقة ومعلومات شاملة عن الحمل والأمومة.` : "",
    canonical: category ? `/blog/category/${category.slug}` : undefined,
    ogType: "website",
  });

  if (isLoading) {
    return (
      <div data-testid="page-blog-category">
        <div className="bg-gradient-to-b from-primary/5 to-transparent py-10 md:py-14 mb-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <Skeleton className="h-8 w-48 mb-4" />
            <Skeleton className="h-5 w-96" />
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

  if (!category) return <NotFound />;

  return (
    <div data-testid="page-blog-category">
      <BreadcrumbJsonLd items={[
        { name: "الرئيسية", url: "/" },
        { name: "المدونة", url: "/blog" },
        { name: category.name, url: `/blog/category/${category.slug}` },
      ]} />

      <div className="bg-gradient-to-b from-primary/5 to-transparent py-10 md:py-14 mb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Breadcrumbs items={[
            { label: "المدونة", href: "/blog" },
            { label: category.name },
          ]} />
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3" data-testid="text-category-title">
            {category.name}
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-12">
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map(cat => (
            <Link key={cat.slug} href={`/blog/category/${cat.slug}`}>
              <Badge
                variant={cat.slug === category.slug ? "default" : "secondary"}
                className="cursor-pointer text-[11px]"
                data-testid={`category-link-${cat.slug}`}
              >
                {cat.name}
              </Badge>
            </Link>
          ))}
        </div>

        <p className="text-xs text-muted-foreground mb-4">{posts.length} مقال في هذا التصنيف</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {posts.map((post: any) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <Card className="hover-elevate h-full overflow-visible" data-testid={`card-blog-${post.slug}`}>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
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

        {posts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground">لا توجد مقالات في هذا التصنيف حالياً</p>
          </div>
        )}
      </div>
    </div>
  );
}
