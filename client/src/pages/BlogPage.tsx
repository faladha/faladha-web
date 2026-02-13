import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { blogPosts } from "@/data/blog";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { Clock } from "lucide-react";

export default function BlogPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8" data-testid="page-blog">
      <Breadcrumbs items={[{ label: "المدونة" }]} />

      <div className="mb-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
          مدونة فلذة: مقالات الحمل والأمومة
        </h1>
        <p className="text-muted-foreground leading-relaxed max-w-3xl">
          مقالات متخصصة عن الحمل والأمومة مكتوبة بعناية ومُراجعة من متخصصين.
          نصائح عملية ومعلومات موثوقة لكل مرحلة.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {blogPosts.map(post => (
          <Link key={post.slug} href={`/blog/${post.slug}`}>
            <Card className="hover-elevate h-full overflow-visible" data-testid={`card-blog-${post.slug}`}>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  <Badge variant="secondary" className="text-[10px]">{post.category}</Badge>
                  <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {post.readTime}
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
  );
}
