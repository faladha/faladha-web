import { useParams } from "wouter";
import { getBlogPost } from "@/data/blog";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import MedicalDisclaimer from "@/components/sections/MedicalDisclaimer";
import { Badge } from "@/components/ui/badge";
import { Clock, Calendar } from "lucide-react";
import NotFound from "./not-found";

export default function BlogDetail() {
  const params = useParams<{ slug: string }>();
  const post = getBlogPost(params.slug || "");
  if (!post) return <NotFound />;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8" data-testid="page-blog-detail">
      <Breadcrumbs items={[
        { label: "المدونة", href: "/blog" },
        { label: post.title },
      ]} />

      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <Badge variant="secondary" className="text-xs">{post.category}</Badge>
        <span className="text-xs text-muted-foreground flex items-center gap-1">
          <Clock className="w-3 h-3" /> {post.readTime}
        </span>
        <span className="text-xs text-muted-foreground flex items-center gap-1">
          <Calendar className="w-3 h-3" /> {post.publishDate}
        </span>
      </div>

      <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3" data-testid="text-blog-title">
        {post.title}
      </h1>
      <p className="text-muted-foreground leading-relaxed mb-8 text-lg">{post.summary}</p>

      <article className="prose prose-sm max-w-none" data-testid="blog-content">
        {post.content.map((paragraph, i) => (
          <p key={i} className="text-foreground leading-relaxed mb-4 text-sm">{paragraph}</p>
        ))}
      </article>

      <MedicalDisclaimer />
    </div>
  );
}
