import { useState, useMemo } from "react";
import { useSeoMeta } from "@/hooks/useSeoMeta";
import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { Clock, Calendar, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function BlogPage() {
  useSeoMeta({
    title: "مدونة فلذة | مقالات الحمل والأمومة الطبية الموثوقة",
    description: "مقالات متخصصة عن الحمل والأمومة مكتوبة بعناية ومراجعة من متخصصين. نصائح تغذية، تمارين، فحوصات، واستعداد للولادة.",
    canonical: "/blog",
    ogType: "website",
  });

  const { data: blogPosts = [], isLoading } = useQuery<any[]>({
    queryKey: ["/api/public/blog"],
  });

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const categories = useMemo(() => {
    const catMap = new Map<string, { name: string; slug: string }>();
    blogPosts.forEach((p: any) => {
      if (p.categorySlug && !catMap.has(p.categorySlug)) {
        catMap.set(p.categorySlug, { name: p.category, slug: p.categorySlug });
      }
    });
    return Array.from(catMap.values());
  }, [blogPosts]);

  const allTags = useMemo(() => {
    const tagMap = new Map<string, number>();
    const tagNames = new Map<string, string>();
    blogPosts.forEach((post: any) => {
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
  }, [blogPosts]);

  const filteredPosts = useMemo(() => {
    let posts = blogPosts;
    if (selectedCategory) {
      posts = posts.filter((p: any) => p.categorySlug === selectedCategory);
    }
    if (selectedTag) {
      posts = posts.filter((p: any) => (p.tagSlugs || []).includes(selectedTag));
    }
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      posts = posts.filter((p: any) =>
        p.title.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q) ||
        (p.tags || []).some((t: string) => t.toLowerCase().includes(q))
      );
    }
    return posts;
  }, [blogPosts, selectedCategory, selectedTag, searchQuery]);

  const clearFilters = () => {
    setSelectedCategory(null);
    setSelectedTag(null);
    setSearchQuery("");
  };

  const hasFilters = selectedCategory || selectedTag || searchQuery.trim();

  if (isLoading) {
    return (
      <div data-testid="page-blog">
        <div className="bg-gradient-to-b from-primary/5 to-transparent py-10 md:py-14 mb-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <Skeleton className="h-8 w-64 mb-4" />
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

  return (
    <div data-testid="page-blog">
      <BreadcrumbJsonLd items={[
        { name: "الرئيسية", url: "/" },
        { name: "المدونة", url: "/blog" },
      ]} />

      <div className="bg-gradient-to-b from-primary/5 to-transparent py-10 md:py-14 mb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Breadcrumbs items={[{ label: "المدونة" }]} />
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3" data-testid="text-blog-heading">
            مركز المعرفة: مقالات الحمل والأمومة
          </h1>
          <p className="text-muted-foreground leading-relaxed max-w-3xl text-sm sm:text-base">
            مقالات طويلة ومفصلة عن الحمل والأمومة مكتوبة بعناية ومُراجعة من متخصصين.
            نصائح عملية ومعلومات موثوقة لكل مرحلة من مراحل حملك.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-12">
        <div className="mb-6">
          <div className="relative max-w-md mb-4">
            <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="ابحثي في المقالات..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="ps-9"
              data-testid="input-blog-search"
            />
          </div>

          <div className="flex flex-wrap gap-2 mb-3">
            <span className="text-xs text-muted-foreground self-center">التصنيفات:</span>
            {categories.map(cat => (
              <Badge
                key={cat.slug}
                variant={selectedCategory === cat.slug ? "default" : "secondary"}
                className="cursor-pointer text-[11px]"
                onClick={() => setSelectedCategory(selectedCategory === cat.slug ? null : cat.slug)}
                data-testid={`filter-category-${cat.slug}`}
              >
                {cat.name}
              </Badge>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 mb-3">
            <span className="text-xs text-muted-foreground self-center">الوسوم:</span>
            {allTags.slice(0, 12).map(tag => (
              <Badge
                key={tag.slug}
                variant={selectedTag === tag.slug ? "default" : "outline"}
                className="cursor-pointer text-[10px]"
                onClick={() => setSelectedTag(selectedTag === tag.slug ? null : tag.slug)}
                data-testid={`filter-tag-${tag.slug}`}
              >
                {tag.name} ({tag.count})
              </Badge>
            ))}
          </div>

          {hasFilters && (
            <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-1 text-xs" data-testid="button-clear-filters">
              <X className="w-3 h-3" />
              مسح الفلاتر
            </Button>
          )}
        </div>

        <p className="text-xs text-muted-foreground mb-4" data-testid="text-results-count">
          {filteredPosts.length} مقال
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filteredPosts.map((post: any) => (
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
                  <div className="flex flex-wrap gap-1 mt-3">
                    {(post.tags || []).slice(0, 3).map((tag: string, i: number) => (
                      <span key={i} className="text-[9px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded-sm">{tag}</span>
                    ))}
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground mb-2">لا توجد مقالات تطابق بحثك</p>
            <Button variant="outline" size="sm" onClick={clearFilters} data-testid="button-reset-search">مسح البحث</Button>
          </div>
        )}
      </div>
    </div>
  );
}
