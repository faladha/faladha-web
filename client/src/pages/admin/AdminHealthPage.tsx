import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminHealthPage() {
  const { data: health, isLoading } = useQuery<any>({
    queryKey: ["/api/admin/health"],
  });

  if (isLoading) {
    return (
      <div className="space-y-6" data-testid="health-loading">
        <h1 className="text-2xl font-bold">صحة المحتوى</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-5 w-24" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-20 w-full" />
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
  const duplicates = {
    slugs: health?.duplicateSlugs || [],
    titles: health?.duplicateTitles || [],
  };

  const getStatusColor = (published: number, total: number) => {
    if (total === 0) return "text-muted-foreground";
    const ratio = published / total;
    if (ratio >= 0.8) return "text-green-600";
    if (ratio >= 0.5) return "text-amber-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold" data-testid="text-health-title">صحة المحتوى</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card data-testid="card-health-blog">
          <CardHeader>
            <CardTitle className="text-base">المقالات</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm">الإجمالي</span>
              <span className="font-bold" data-testid="text-health-blog-total">{blog.total || 0}</span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm">منشور</span>
              <span className={`font-bold ${getStatusColor(blog.published || 0, blog.total || 0)}`} data-testid="text-health-blog-published">
                {blog.published || 0}
              </span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm">مسودة</span>
              <span className="font-bold text-amber-600" data-testid="text-health-blog-draft">{blog.draft || 0}</span>
            </div>
          </CardContent>
        </Card>

        <Card data-testid="card-health-weeks">
          <CardHeader>
            <CardTitle className="text-base">أسابيع الحمل</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm">الإجمالي</span>
              <span className="font-bold" data-testid="text-health-weeks-total">{weeks.total || 0}</span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm">منشور</span>
              <span className={`font-bold ${getStatusColor(weeks.published || 0, weeks.total || 0)}`} data-testid="text-health-weeks-published">
                {weeks.published || 0}
              </span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm">مسودة</span>
              <span className="font-bold text-amber-600" data-testid="text-health-weeks-draft">{weeks.draft || 0}</span>
            </div>
            {(weeks.missingFaq || 0) > 0 && (
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm">بدون أسئلة شائعة</span>
                <Badge variant="destructive" data-testid="badge-weeks-missing-faq">{weeks.missingFaq}</Badge>
              </div>
            )}
            {(weeks.missingMeta || 0) > 0 && (
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm">بدون وصف ميتا</span>
                <Badge variant="destructive" data-testid="badge-weeks-missing-meta">{weeks.missingMeta}</Badge>
              </div>
            )}
          </CardContent>
        </Card>

        <Card data-testid="card-health-symptoms">
          <CardHeader>
            <CardTitle className="text-base">الأعراض</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm">الإجمالي</span>
              <span className="font-bold" data-testid="text-health-symptoms-total">{symptoms.total || 0}</span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm">منشور</span>
              <span className={`font-bold ${getStatusColor(symptoms.published || 0, symptoms.total || 0)}`} data-testid="text-health-symptoms-published">
                {symptoms.published || 0}
              </span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm">مسودة</span>
              <span className="font-bold text-amber-600" data-testid="text-health-symptoms-draft">{symptoms.draft || 0}</span>
            </div>
            {(symptoms.missingFaq || 0) > 0 && (
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm">بدون أسئلة شائعة</span>
                <Badge variant="destructive" data-testid="badge-symptoms-missing-faq">{symptoms.missingFaq}</Badge>
              </div>
            )}
            {(symptoms.missingMeta || 0) > 0 && (
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm">بدون وصف ميتا</span>
                <Badge variant="destructive" data-testid="badge-symptoms-missing-meta">{symptoms.missingMeta}</Badge>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {duplicates && ((duplicates.slugs && duplicates.slugs.length > 0) || (duplicates.titles && duplicates.titles.length > 0)) && (
        <Card data-testid="card-health-duplicates">
          <CardHeader>
            <CardTitle className="text-base text-red-600">محتوى مكرر</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {duplicates.slugs && duplicates.slugs.length > 0 && (
              <div className="space-y-1">
                <p className="text-sm font-medium">روابط مكررة:</p>
                {duplicates.slugs.map((slug: string, i: number) => (
                  <Badge key={i} variant="destructive" className="ml-1" data-testid={`badge-duplicate-slug-${i}`}>
                    {slug}
                  </Badge>
                ))}
              </div>
            )}
            {duplicates.titles && duplicates.titles.length > 0 && (
              <div className="space-y-1">
                <p className="text-sm font-medium">عناوين مكررة:</p>
                {duplicates.titles.map((title: string, i: number) => (
                  <Badge key={i} variant="destructive" className="ml-1" data-testid={`badge-duplicate-title-${i}`}>
                    {title}
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      <Card data-testid="card-health-summary">
        <CardHeader>
          <CardTitle className="text-base">ملخص الحالة</CardTitle>
        </CardHeader>
        <CardContent>
          {(weeks.missingFaq || 0) === 0 &&
           (weeks.missingMeta || 0) === 0 &&
           (symptoms.missingFaq || 0) === 0 &&
           (symptoms.missingMeta || 0) === 0 ? (
            <p className="text-green-600 font-medium" data-testid="text-health-good">
              جميع المحتوى في حالة جيدة
            </p>
          ) : (
            <div className="space-y-1">
              <p className="text-amber-600 font-medium" data-testid="text-health-warnings">
                يوجد محتوى يحتاج إلى تحسين
              </p>
              <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                {(weeks.missingFaq || 0) > 0 && <li>{weeks.missingFaq} أسبوع بدون أسئلة شائعة</li>}
                {(weeks.missingMeta || 0) > 0 && <li>{weeks.missingMeta} أسبوع بدون وصف ميتا</li>}
                {(symptoms.missingFaq || 0) > 0 && <li>{symptoms.missingFaq} عرض بدون أسئلة شائعة</li>}
                {(symptoms.missingMeta || 0) > 0 && <li>{symptoms.missingMeta} عرض بدون وصف ميتا</li>}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
