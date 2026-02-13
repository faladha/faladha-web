import { useEffect, useState } from "react";
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
import { Plus, X } from "lucide-react";
import type { Symptom } from "@shared/schema";

function generateSlug(title: string): string {
  return title
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\u0600-\u06FF\w-]/g, "")
    .toLowerCase();
}

export default function AdminSymptomEditor() {
  const params = useParams<{ id: string }>();
  const id = params?.id;
  const isNew = !id || id === "new";
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const { data: symptom, isLoading } = useQuery<Symptom>({
    queryKey: ["/api/admin/symptoms", id],
    enabled: !isNew,
  });

  const [faq, setFaq] = useState<{ question: string; answer: string }[]>([]);

  const form = useForm({
    defaultValues: {
      slug: "",
      title: "",
      metaTitle: "",
      metaDescription: "",
      summary: "",
      causes: "",
      remedies: "",
      whenToWorry: "",
      trimester: "",
      relatedWeeks: "",
      status: "draft",
    },
  });

  useEffect(() => {
    if (symptom) {
      form.reset({
        slug: symptom.slug || "",
        title: symptom.title || "",
        metaTitle: symptom.metaTitle || "",
        metaDescription: symptom.metaDescription || "",
        summary: symptom.summary || "",
        causes: (symptom.causes || []).join("\n"),
        remedies: (symptom.remedies || []).join("\n"),
        whenToWorry: (symptom.whenToWorry || []).join("\n"),
        trimester: symptom.trimester || "",
        relatedWeeks: (symptom.relatedWeeks || []).join(", "),
        status: symptom.status || "draft",
      });
      setFaq(Array.isArray(symptom.faq) ? (symptom.faq as any[]) : []);
    }
  }, [symptom, form]);

  const title = form.watch("title");
  useEffect(() => {
    if (isNew && title) {
      form.setValue("slug", generateSlug(title));
    }
  }, [title, isNew, form]);

  const saveMutation = useMutation({
    mutationFn: async (data: any) => {
      const payload = {
        slug: data.slug,
        title: data.title,
        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription,
        summary: data.summary,
        causes: data.causes.split("\n").map((s: string) => s.trim()).filter(Boolean),
        remedies: data.remedies.split("\n").map((s: string) => s.trim()).filter(Boolean),
        whenToWorry: data.whenToWorry.split("\n").map((s: string) => s.trim()).filter(Boolean),
        trimester: data.trimester,
        relatedWeeks: data.relatedWeeks ? data.relatedWeeks.split(",").map((s: string) => parseInt(s.trim())).filter((n: number) => !isNaN(n)) : [],
        faq,
        status: data.status,
      };
      if (isNew) {
        await apiRequest("POST", "/api/admin/symptoms", payload);
      } else {
        await apiRequest("PATCH", `/api/admin/symptoms/${id}`, payload);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/symptoms"] });
      toast({ title: "تم الحفظ بنجاح" });
      setLocation("/admin/symptoms");
    },
    onError: (err: any) => {
      toast({ title: "خطأ في الحفظ", description: err.message, variant: "destructive" });
    },
  });

  const addFaq = () => setFaq([...faq, { question: "", answer: "" }]);
  const removeFaq = (index: number) => setFaq(faq.filter((_, i) => i !== index));
  const updateFaq = (index: number, field: "question" | "answer", value: string) => {
    const updated = [...faq];
    updated[index] = { ...updated[index], [field]: value };
    setFaq(updated);
  };

  const onSubmit = form.handleSubmit((data) => {
    saveMutation.mutate(data);
  });

  if (!isNew && isLoading) {
    return (
      <div className="space-y-4" data-testid="symptom-editor-loading">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <h1 className="text-2xl font-bold" data-testid="text-symptom-editor-title">
        {isNew ? "عرض جديد" : "تعديل العرض"}
      </h1>

      <form onSubmit={onSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">المعلومات الأساسية</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">العنوان</Label>
              <Input id="title" {...form.register("title")} data-testid="input-symptom-title" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">الرابط</Label>
              <Input id="slug" {...form.register("slug")} data-testid="input-symptom-slug" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="trimester">الثلث</Label>
              <Input id="trimester" {...form.register("trimester")} placeholder="مثال: الثلث الأول والثاني" data-testid="input-symptom-trimester" />
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
              <Input id="metaTitle" {...form.register("metaTitle")} data-testid="input-symptom-meta-title" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="metaDescription">وصف الميتا</Label>
              <Textarea id="metaDescription" {...form.register("metaDescription")} data-testid="input-symptom-meta-description" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="summary">الملخص</Label>
              <Textarea id="summary" {...form.register("summary")} data-testid="input-symptom-summary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">المحتوى (عنصر لكل سطر)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="causes">الأسباب</Label>
              <Textarea id="causes" {...form.register("causes")} className="min-h-[120px]" data-testid="input-symptom-causes" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="remedies">العلاجات</Label>
              <Textarea id="remedies" {...form.register("remedies")} className="min-h-[120px]" data-testid="input-symptom-remedies" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="whenToWorry">متى تقلقين</Label>
              <Textarea id="whenToWorry" {...form.register("whenToWorry")} className="min-h-[120px]" data-testid="input-symptom-when-to-worry" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2">
            <CardTitle className="text-base">الأسئلة الشائعة</CardTitle>
            <Button type="button" variant="outline" size="sm" onClick={addFaq} data-testid="button-add-symptom-faq">
              <Plus className="w-4 h-4 ml-1" />
              إضافة سؤال
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {faq.map((item, index) => (
              <div key={index} className="border rounded-md p-4 space-y-3" data-testid={`symptom-faq-item-${index}`}>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 space-y-2">
                    <Label>السؤال</Label>
                    <Input
                      value={item.question}
                      onChange={(e) => updateFaq(index, "question", e.target.value)}
                      data-testid={`input-symptom-faq-question-${index}`}
                    />
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFaq(index)}
                    data-testid={`button-remove-symptom-faq-${index}`}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                <div className="space-y-2">
                  <Label>الإجابة</Label>
                  <Textarea
                    value={item.answer}
                    onChange={(e) => updateFaq(index, "answer", e.target.value)}
                    data-testid={`input-symptom-faq-answer-${index}`}
                  />
                </div>
              </div>
            ))}
            {faq.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4" data-testid="text-no-symptom-faq">
                لا توجد أسئلة شائعة
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">إعدادات</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="relatedWeeks">الأسابيع المرتبطة (أرقام مفصولة بفواصل)</Label>
              <Input id="relatedWeeks" {...form.register("relatedWeeks")} data-testid="input-symptom-related-weeks" />
            </div>
            <div className="space-y-2">
              <Label>الحالة</Label>
              <Select value={form.watch("status")} onValueChange={(v) => form.setValue("status", v)}>
                <SelectTrigger data-testid="select-symptom-status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">مسودة</SelectItem>
                  <SelectItem value="published">منشور</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <div className="flex items-center gap-4">
          <Button type="submit" disabled={saveMutation.isPending} data-testid="button-save-symptom">
            {saveMutation.isPending ? "جاري الحفظ..." : "حفظ"}
          </Button>
          <Button type="button" variant="outline" onClick={() => setLocation("/admin/symptoms")} data-testid="button-cancel-symptom">
            إلغاء
          </Button>
        </div>
      </form>
    </div>
  );
}
