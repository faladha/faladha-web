import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import FAQAccordion from "@/components/sections/FAQAccordion";
import MedicalDisclaimer from "@/components/sections/MedicalDisclaimer";
import { ArticleJsonLd, BreadcrumbJsonLd, FAQJsonLd, MedicalWebPageJsonLd } from "@/components/seo/JsonLd";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ArrowLeft, Baby, Heart, AlertCircle, Download, Ruler, Weight, Scale, Lightbulb } from "lucide-react";
import NotFound from "./not-found";

export default function WeekDetail() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug || "";

  const { data: week, isLoading: weekLoading, error: weekError } = useQuery<any>({
    queryKey: ["/api/public/weeks", slug],
    enabled: !!slug,
  });

  const { data: allWeeks = [], isLoading: weeksLoading } = useQuery<any[]>({
    queryKey: ["/api/public/weeks"],
  });

  const isLoading = weekLoading || weeksLoading;

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <Skeleton className="h-5 w-48 mb-4" />
        <Skeleton className="h-8 w-96 mb-3" />
        <Skeleton className="h-5 w-full mb-8" />
        <div className="grid sm:grid-cols-3 gap-3 mb-10">
          {[1, 2, 3].map(i => <Skeleton key={i} className="h-24 rounded-md" />)}
        </div>
        <Skeleton className="h-48 rounded-md mb-6" />
        <Skeleton className="h-48 rounded-md" />
      </div>
    );
  }

  if (weekError || !week) return <NotFound />;

  const sortedWeeks = [...allWeeks].sort((a: any, b: any) => a.weekNumber - b.weekNumber);
  const prev = week.weekNumber > 1 ? sortedWeeks.find((w: any) => w.weekNumber === week.weekNumber - 1) : null;
  const next = week.weekNumber < 40 ? sortedWeeks.find((w: any) => w.weekNumber === week.weekNumber + 1) : null;

  const tips: string[] = Array.isArray(week.tips) ? week.tips : [];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8" data-testid="page-week-detail">
      <ArticleJsonLd title={week.metaTitle} description={week.metaDescription} url={`/pregnancy/${week.slug}`} />
      <BreadcrumbJsonLd items={[
        { name: "الرئيسية", url: "/" },
        { name: "أسابيع الحمل", url: "/pregnancy" },
        { name: `الأسبوع ${week.weekNumber}`, url: `/pregnancy/${week.slug}` },
      ]} />
      <MedicalWebPageJsonLd title={week.metaTitle} description={week.metaDescription} url={`/pregnancy/${week.slug}`} />
      <FAQJsonLd items={week.faq || []} />
      <Breadcrumbs items={[
        { label: "أسابيع الحمل", href: "/pregnancy" },
        { label: `الأسبوع ${week.weekNumber}` },
      ]} />

      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <Badge variant="secondary" className="text-xs">
          الثلث {week.trimester === 1 ? "الأول" : week.trimester === 2 ? "الثاني" : "الثالث"}
        </Badge>
        {prev && (
          <Link href={`/pregnancy/${prev.slug}`}>
            <Button variant="ghost" size="sm" className="gap-1 text-xs" data-testid="button-prev-week">
              <ArrowRight className="w-3 h-3" /> الأسبوع {prev.weekNumber}
            </Button>
          </Link>
        )}
        {next && (
          <Link href={`/pregnancy/${next.slug}`}>
            <Button variant="ghost" size="sm" className="gap-1 text-xs" data-testid="button-next-week">
              الأسبوع {next.weekNumber} <ArrowLeft className="w-3 h-3" />
            </Button>
          </Link>
        )}
      </div>

      <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3" data-testid="text-week-title">
        الأسبوع {week.weekNumber} من الحمل: {week.title}
      </h1>
      <p className="text-muted-foreground leading-relaxed mb-8">{week.summary}</p>

      <div className="grid sm:grid-cols-3 gap-3 mb-10">
        <Card className="p-5 text-center" data-testid="card-fetus-length">
          <Ruler className="w-5 h-5 text-primary mx-auto mb-2" />
          <p className="text-xs text-muted-foreground mb-1">الطول</p>
          <p className="font-bold text-foreground">{week.fetusSize?.length}</p>
        </Card>
        <Card className="p-5 text-center" data-testid="card-fetus-weight">
          <Weight className="w-5 h-5 text-primary mx-auto mb-2" />
          <p className="text-xs text-muted-foreground mb-1">الوزن</p>
          <p className="font-bold text-foreground">{week.fetusSize?.weight}</p>
        </Card>
        <Card className="p-5 text-center" data-testid="card-fetus-comparison">
          <Scale className="w-5 h-5 text-primary mx-auto mb-2" />
          <p className="text-xs text-muted-foreground mb-1">الحجم يشبه</p>
          <p className="font-bold text-foreground">{week.fetusSize?.comparison}</p>
        </Card>
      </div>

      <section className="mb-10" data-testid="section-fetal-development">
        <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
          <Baby className="w-5 h-5 text-primary" /> تطور الجنين
        </h2>
        <ul className="space-y-2.5">
          {(week.fetalDevelopment || []).map((item: string, i: number) => (
            <li key={i} className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 shrink-0" />
              <span className="text-sm text-foreground leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-10" data-testid="section-mother-symptoms">
        <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
          <Heart className="w-5 h-5 text-primary" /> أعراض الأم
        </h2>
        <ul className="space-y-2.5">
          {(week.motherSymptoms || []).map((item: string, i: number) => (
            <li key={i} className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 bg-rose-400 rounded-full mt-2 shrink-0" />
              <span className="text-sm text-foreground leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {tips.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-primary" /> نصائح
          </h2>
          <ul className="space-y-2">
            {tips.map((t: string, i: number) => (
              <li key={i} className="flex items-start gap-3 text-sm text-foreground leading-relaxed">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mt-2 shrink-0" /> {t}
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mb-10">
        <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-destructive" /> متى تتصلين بالطبيبة
        </h2>
        <Card className="p-5 border-destructive/20">
          <ul className="space-y-2">
            {(week.whenToCallDoctor || []).map((t: string, i: number) => (
              <li key={i} className="flex items-start gap-3 text-sm text-foreground leading-relaxed">
                <span className="w-1.5 h-1.5 bg-destructive rounded-full mt-2 shrink-0" /> {t}
              </li>
            ))}
          </ul>
        </Card>
      </section>

      {(week.relatedSymptoms || []).length > 0 && (
        <section className="mb-10" data-testid="section-related-symptoms">
          <h2 className="text-lg font-bold text-foreground mb-4">أعراض مرتبطة</h2>
          <div className="flex flex-wrap gap-2">
            {(week.relatedSymptoms || []).map((slug: string) => (
              <Link key={slug} href={`/symptoms/${slug}`}>
                <Badge variant="secondary" className="text-xs" data-testid={`badge-symptom-${slug}`}>
                  {slug}
                </Badge>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="mb-8" data-testid="section-week-faq">
        <h2 className="text-xl font-bold text-foreground mb-4">الأسئلة الشائعة - الأسبوع {week.weekNumber}</h2>
        <FAQAccordion items={week.faq || []} />
      </section>

      <div className="flex items-center justify-between gap-4 py-6 border-t border-border flex-wrap">
        {prev ? (
          <Link href={`/pregnancy/${prev.slug}`}>
            <Button variant="outline" className="gap-2" data-testid="button-nav-prev">
              <ArrowRight className="w-4 h-4" /> الأسبوع {prev.weekNumber}
            </Button>
          </Link>
        ) : <div />}
        <Link href="/download">
          <Button className="gap-2" data-testid="button-week-download">
            <Download className="w-4 h-4" /> حمّلي التطبيق
          </Button>
        </Link>
        {next ? (
          <Link href={`/pregnancy/${next.slug}`}>
            <Button variant="outline" className="gap-2" data-testid="button-nav-next">
              الأسبوع {next.weekNumber} <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
        ) : <div />}
      </div>

      <MedicalDisclaimer />
    </div>
  );
}
