import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { FileText, Calendar, Stethoscope, AlertTriangle } from "lucide-react";

export default function AdminDashboard() {
  const { data: health, isLoading } = useQuery<any>({
    queryKey: ["/api/admin/health"],
  });

  if (isLoading) {
    return (
      <div className="space-y-6" data-testid="dashboard-loading">
        <h1 className="text-2xl font-bold">لوحة التحكم</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between gap-2 pb-2">
                <Skeleton className="h-4 w-24" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-12" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  const blog = health?.blogStats || {};
  const weeks = health?.weekStats || {};
  const symptoms = health?.symptomStats || {};

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold" data-testid="text-dashboard-title">لوحة التحكم</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card data-testid="card-blog-total">
          <CardHeader className="flex flex-row items-center justify-between gap-2 pb-2">
            <CardTitle className="text-sm font-medium">إجمالي المقالات</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="text-blog-total">{blog.total || 0}</div>
            <p className="text-xs text-muted-foreground">
              {blog.published || 0} منشور · {blog.draft || 0} مسودة
            </p>
          </CardContent>
        </Card>

        <Card data-testid="card-weeks-total">
          <CardHeader className="flex flex-row items-center justify-between gap-2 pb-2">
            <CardTitle className="text-sm font-medium">أسابيع الحمل</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="text-weeks-total">{weeks.total || 0}</div>
            <p className="text-xs text-muted-foreground">
              {weeks.published || 0} منشور · {weeks.draft || 0} مسودة
            </p>
          </CardContent>
        </Card>

        <Card data-testid="card-symptoms-total">
          <CardHeader className="flex flex-row items-center justify-between gap-2 pb-2">
            <CardTitle className="text-sm font-medium">الأعراض</CardTitle>
            <Stethoscope className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="text-symptoms-total">{symptoms.total || 0}</div>
            <p className="text-xs text-muted-foreground">
              {symptoms.published || 0} منشور · {symptoms.draft || 0} مسودة
            </p>
          </CardContent>
        </Card>

        <Card data-testid="card-health-warnings">
          <CardHeader className="flex flex-row items-center justify-between gap-2 pb-2">
            <CardTitle className="text-sm font-medium">تنبيهات المحتوى</CardTitle>
            <AlertTriangle className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600" data-testid="text-warnings-count">
              {(weeks.missingFaq || 0) + (weeks.missingMeta || 0) + (symptoms.missingFaq || 0) + (symptoms.missingMeta || 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              أسئلة شائعة ناقصة أو وصف مفقود
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card data-testid="card-missing-faq">
          <CardHeader>
            <CardTitle className="text-base">محتوى بدون أسئلة شائعة</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {(weeks.missingFaq || 0) > 0 && (
              <p className="text-sm text-amber-600" data-testid="text-weeks-missing-faq">
                {weeks.missingFaq} أسبوع بدون أسئلة شائعة
              </p>
            )}
            {(symptoms.missingFaq || 0) > 0 && (
              <p className="text-sm text-amber-600" data-testid="text-symptoms-missing-faq">
                {symptoms.missingFaq} عرض بدون أسئلة شائعة
              </p>
            )}
            {(weeks.missingFaq || 0) === 0 && (symptoms.missingFaq || 0) === 0 && (
              <p className="text-sm text-green-600" data-testid="text-faq-complete">جميع المحتوى يحتوي على أسئلة شائعة</p>
            )}
          </CardContent>
        </Card>

        <Card data-testid="card-missing-meta">
          <CardHeader>
            <CardTitle className="text-base">محتوى بدون وصف ميتا</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {(weeks.missingMeta || 0) > 0 && (
              <p className="text-sm text-amber-600" data-testid="text-weeks-missing-meta">
                {weeks.missingMeta} أسبوع بدون وصف ميتا
              </p>
            )}
            {(symptoms.missingMeta || 0) > 0 && (
              <p className="text-sm text-amber-600" data-testid="text-symptoms-missing-meta">
                {symptoms.missingMeta} عرض بدون وصف ميتا
              </p>
            )}
            {(weeks.missingMeta || 0) === 0 && (symptoms.missingMeta || 0) === 0 && (
              <p className="text-sm text-green-600" data-testid="text-meta-complete">جميع المحتوى يحتوي على وصف ميتا</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
