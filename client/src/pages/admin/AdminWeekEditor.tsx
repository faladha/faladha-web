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
import type { PregnancyWeek } from "@shared/schema";

export default function AdminWeekEditor() {
  const params = useParams<{ id: string }>();
  const id = params?.id;
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const { data: week, isLoading } = useQuery<PregnancyWeek>({
    queryKey: ["/api/admin/weeks", id],
    enabled: !!id,
  });

  const [faq, setFaq] = useState<{ question: string; answer: string }[]>([]);

  const form = useForm({
    defaultValues: {
      weekNumber: 1,
      slug: "",
      title: "",
      metaTitle: "",
      metaDescription: "",
      summary: "",
      trimester: "1",
      fetusLength: "",
      fetusWeight: "",
      fetusComparison: "",
      fetalDevelopment: "",
      motherSymptoms: "",
      tips: "",
      whenToCallDoctor: "",
      relatedSymptoms: "",
      status: "draft",
    },
  });

  useEffect(() => {
    if (week) {
      const fetusSize = (week.fetusSize || {}) as any;
      form.reset({
        weekNumber: week.weekNumber,
        slug: week.slug || "",
        title: week.title || "",
        metaTitle: week.metaTitle || "",
        metaDescription: week.metaDescription || "",
        summary: week.summary || "",
        trimester: String(week.trimester || 1),
        fetusLength: fetusSize.length || "",
        fetusWeight: fetusSize.weight || "",
        fetusComparison: fetusSize.comparison || "",
        fetalDevelopment: (week.fetalDevelopment || []).join("\n"),
        motherSymptoms: (week.motherSymptoms || []).join("\n"),
        tips: (week.tips || []).join("\n"),
        whenToCallDoctor: (week.whenToCallDoctor || []).join("\n"),
        relatedSymptoms: (week.relatedSymptoms || []).join(", "),
        status: week.status || "draft",
      });
      setFaq(Array.isArray(week.faq) ? (week.faq as any[]) : []);
    }
  }, [week, form]);

  const saveMutation = useMutation({
    mutationFn: async (data: any) => {
      const payload = {
        weekNumber: Number(data.weekNumber),
        slug: data.slug,
        title: data.title,
        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription,
        summary: data.summary,
        trimester: Number(data.trimester),
        fetusSize: {
          length: data.fetusLength,
          weight: data.fetusWeight,
          comparison: data.fetusComparison,
        },
        fetalDevelopment: data.fetalDevelopment.split("\n").map((s: string) => s.trim()).filter(Boolean),
        motherSymptoms: data.motherSymptoms.split("\n").map((s: string) => s.trim()).filter(Boolean),
        tips: data.tips.split("\n").map((s: string) => s.trim()).filter(Boolean),
        whenToCallDoctor: data.whenToCallDoctor.split("\n").map((s: string) => s.trim()).filter(Boolean),
        relatedSymptoms: data.relatedSymptoms ? data.relatedSymptoms.split(",").map((s: string) => s.trim()).filter(Boolean) : [],
        faq,
        status: data.status,
      };
      await apiRequest("PATCH", `/api/admin/weeks/${id}`, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/weeks"] });
      toast({ title: "تم الحفظ بنجاح" });
      setLocation("/admin/weeks");
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

  if (isLoading) {
    return (
      <div className="space-y-4" data-testid="week-editor-loading">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <h1 className="text-2xl font-bold" data-testid="text-week-editor-title">
        تعديل الأسبوع {week?.weekNumber}
      </h1>

      <form onSubmit={onSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">المعلومات الأساسية</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="weekNumber">رقم الأسبوع</Label>
                <Input id="weekNumber" type="number" {...form.register("weekNumber")} data-testid="input-week-number" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">الرابط</Label>
                <Input id="slug" {...form.register("slug")} data-testid="input-week-slug" />
              </div>
              <div className="space-y-2">
                <Label>الثلث</Label>
                <Select value={form.watch("trimester")} onValueChange={(v) => form.setValue("trimester", v)}>
                  <SelectTrigger data-testid="select-week-trimester">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">الثلث الأول</SelectItem>
                    <SelectItem value="2">الثلث الثاني</SelectItem>
                    <SelectItem value="3">الثلث الثالث</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="title">العنوان</Label>
              <Input id="title" {...form.register("title")} data-testid="input-week-title" />
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
              <Input id="metaTitle" {...form.register("metaTitle")} data-testid="input-week-meta-title" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="metaDescription">وصف الميتا</Label>
              <Textarea id="metaDescription" {...form.register("metaDescription")} data-testid="input-week-meta-description" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="summary">الملخص</Label>
              <Textarea id="summary" {...form.register("summary")} data-testid="input-week-summary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">حجم الجنين</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fetusLength">الطول</Label>
                <Input id="fetusLength" {...form.register("fetusLength")} data-testid="input-week-fetus-length" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fetusWeight">الوزن</Label>
                <Input id="fetusWeight" {...form.register("fetusWeight")} data-testid="input-week-fetus-weight" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fetusComparison">المقارنة</Label>
                <Input id="fetusComparison" {...form.register("fetusComparison")} data-testid="input-week-fetus-comparison" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">المحتوى (عنصر لكل سطر)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fetalDevelopment">تطور الجنين</Label>
              <Textarea id="fetalDevelopment" {...form.register("fetalDevelopment")} className="min-h-[120px]" data-testid="input-week-fetal-development" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="motherSymptoms">أعراض الأم</Label>
              <Textarea id="motherSymptoms" {...form.register("motherSymptoms")} className="min-h-[120px]" data-testid="input-week-mother-symptoms" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tips">نصائح</Label>
              <Textarea id="tips" {...form.register("tips")} className="min-h-[120px]" data-testid="input-week-tips" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="whenToCallDoctor">متى تتصلين بالطبيب</Label>
              <Textarea id="whenToCallDoctor" {...form.register("whenToCallDoctor")} className="min-h-[120px]" data-testid="input-week-when-to-call-doctor" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2">
            <CardTitle className="text-base">الأسئلة الشائعة</CardTitle>
            <Button type="button" variant="outline" size="sm" onClick={addFaq} data-testid="button-add-faq">
              <Plus className="w-4 h-4 ml-1" />
              إضافة سؤال
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {faq.map((item, index) => (
              <div key={index} className="border rounded-md p-4 space-y-3" data-testid={`faq-item-${index}`}>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 space-y-2">
                    <Label>السؤال</Label>
                    <Input
                      value={item.question}
                      onChange={(e) => updateFaq(index, "question", e.target.value)}
                      data-testid={`input-faq-question-${index}`}
                    />
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFaq(index)}
                    data-testid={`button-remove-faq-${index}`}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                <div className="space-y-2">
                  <Label>الإجابة</Label>
                  <Textarea
                    value={item.answer}
                    onChange={(e) => updateFaq(index, "answer", e.target.value)}
                    data-testid={`input-faq-answer-${index}`}
                  />
                </div>
              </div>
            ))}
            {faq.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4" data-testid="text-no-faq">
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
              <Label htmlFor="relatedSymptoms">الأعراض المرتبطة (مفصولة بفواصل)</Label>
              <Input id="relatedSymptoms" {...form.register("relatedSymptoms")} data-testid="input-week-related-symptoms" />
            </div>
            <div className="space-y-2">
              <Label>الحالة</Label>
              <Select value={form.watch("status")} onValueChange={(v) => form.setValue("status", v)}>
                <SelectTrigger data-testid="select-week-status">
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
          <Button type="submit" disabled={saveMutation.isPending} data-testid="button-save-week">
            {saveMutation.isPending ? "جاري الحفظ..." : "حفظ"}
          </Button>
          <Button type="button" variant="outline" onClick={() => setLocation("/admin/weeks")} data-testid="button-cancel-week">
            إلغاء
          </Button>
        </div>
      </form>
    </div>
  );
}
