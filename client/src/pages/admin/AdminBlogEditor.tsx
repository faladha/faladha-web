import { useEffect } from "react";
import { useParams, useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import type { BlogPost } from "@shared/schema";

function generateSlug(title: string): string {
  return title
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\u0600-\u06FF\w-]/g, "")
    .toLowerCase();
}

export default function AdminBlogEditor() {
  const params = useParams<{ id: string }>();
  const id = params?.id;
  const isNew = !id || id === "new";
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const { data: post, isLoading } = useQuery<BlogPost>({
    queryKey: ["/api/admin/blog", id],
    enabled: !isNew,
  });

  const form = useForm({
    defaultValues: {
      title: "",
      slug: "",
      metaTitle: "",
      metaDescription: "",
      summary: "",
      content: "",
      category: "",
      tags: "",
      status: "draft",
      readTime: "5 دقائق",
      author: "فريق فلذة الطبي",
    },
  });

  useEffect(() => {
    if (post) {
      form.reset({
        title: post.title || "",
        slug: post.slug || "",
        metaTitle: post.metaTitle || "",
        metaDescription: post.metaDescription || "",
        summary: post.summary || "",
        content: post.content || "",
        category: post.category || "",
        tags: (post.tags || []).join(", "),
        status: post.status || "draft",
        readTime: post.readTime || "5 دقائق",
        author: post.author || "فريق فلذة الطبي",
      });
    }
  }, [post, form]);

  const title = form.watch("title");
  useEffect(() => {
    if (isNew && title) {
      form.setValue("slug", generateSlug(title));
    }
  }, [title, isNew, form]);

  const saveMutation = useMutation({
    mutationFn: async (data: any) => {
      const payload = {
        ...data,
        tags: data.tags ? data.tags.split(",").map((t: string) => t.trim()).filter(Boolean) : [],
        tagSlugs: data.tags ? data.tags.split(",").map((t: string) => generateSlug(t.trim())).filter(Boolean) : [],
        categorySlug: generateSlug(data.category || ""),
      };
      if (isNew) {
        await apiRequest("POST", "/api/admin/blog", payload);
      } else {
        await apiRequest("PATCH", `/api/admin/blog/${id}`, payload);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/blog"] });
      toast({ title: "تم الحفظ بنجاح" });
      setLocation("/admin/blog");
    },
    onError: (err: any) => {
      toast({ title: "خطأ في الحفظ", description: err.message, variant: "destructive" });
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    saveMutation.mutate(data);
  });

  if (!isNew && isLoading) {
    return (
      <div className="space-y-4" data-testid="blog-editor-loading">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <h1 className="text-2xl font-bold" data-testid="text-blog-editor-title">
        {isNew ? "مقال جديد" : "تعديل المقال"}
      </h1>

      <form onSubmit={onSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">المعلومات الأساسية</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">العنوان</Label>
              <Input id="title" {...form.register("title")} data-testid="input-blog-title" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">الرابط</Label>
              <Input id="slug" {...form.register("slug")} data-testid="input-blog-slug" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">التصنيف</Label>
                <Input id="category" {...form.register("category")} data-testid="input-blog-category" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tags">الوسوم (مفصولة بفواصل)</Label>
                <Input id="tags" {...form.register("tags")} data-testid="input-blog-tags" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">تحسين محركات البحث</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="metaTitle">عنوان الميتا</Label>
              <Input id="metaTitle" {...form.register("metaTitle")} data-testid="input-blog-meta-title" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="metaDescription">وصف الميتا</Label>
              <Textarea id="metaDescription" {...form.register("metaDescription")} data-testid="input-blog-meta-description" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="summary">الملخص</Label>
              <Textarea id="summary" {...form.register("summary")} data-testid="input-blog-summary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">المحتوى</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="content">المحتوى</Label>
              <Textarea
                id="content"
                {...form.register("content")}
                className="min-h-[300px]"
                data-testid="input-blog-content"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">إعدادات النشر</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>الحالة</Label>
                <Select
                  value={form.watch("status")}
                  onValueChange={(v) => form.setValue("status", v)}
                >
                  <SelectTrigger data-testid="select-blog-status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">مسودة</SelectItem>
                    <SelectItem value="published">منشور</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="readTime">وقت القراءة</Label>
                <Input id="readTime" {...form.register("readTime")} data-testid="input-blog-read-time" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="author">الكاتب</Label>
                <Input id="author" {...form.register("author")} data-testid="input-blog-author" />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex items-center gap-4">
          <Button type="submit" disabled={saveMutation.isPending} data-testid="button-save-blog">
            {saveMutation.isPending ? "جاري الحفظ..." : "حفظ"}
          </Button>
          <Button type="button" variant="outline" onClick={() => setLocation("/admin/blog")} data-testid="button-cancel-blog">
            إلغاء
          </Button>
        </div>
      </form>
    </div>
  );
}
