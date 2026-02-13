import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import MedicalDisclaimer from "@/components/sections/MedicalDisclaimer";
import FAQAccordion from "@/components/sections/FAQAccordion";
import CTABanner from "@/components/sections/CTABanner";
import { BreadcrumbJsonLd, FAQJsonLd } from "@/components/seo/JsonLd";
import JsonLd from "@/components/seo/JsonLd";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertCircle, Lightbulb, HelpCircle, Calculator, BookOpen } from "lucide-react";
import { useEffect } from "react";
import NotFound from "./not-found";

export default function SymptomDetail() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug || "";

  const { data: symptom, isLoading, error } = useQuery<any>({
    queryKey: ["/api/public/symptoms", slug],
    enabled: !!slug,
  });

  useEffect(() => {
    if (symptom) {
      document.title = symptom.metaTitle;
      const meta = document.querySelector('meta[name="description"]');
      if (meta) meta.setAttribute("content", symptom.metaDescription);
    }
  }, [symptom]);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <Skeleton className="h-5 w-48 mb-4" />
        <Skeleton className="h-8 w-96 mb-3" />
        <Skeleton className="h-5 w-full mb-8" />
        <Skeleton className="h-48 rounded-md mb-6" />
        <Skeleton className="h-48 rounded-md" />
      </div>
    );
  }

  if (error || !symptom) return <NotFound />;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "name": symptom.title,
    "description": symptom.metaDescription,
    "url": `https://faladha.com/symptoms/${symptom.slug}`,
    "inLanguage": "ar",
    "medicalAudience": { "@type": "MedicalAudience", "audienceType": "Patient" },
    "author": { "@type": "Organization", "name": "فلذة" },
    "publisher": { "@type": "Organization", "name": "فلذة", "url": "https://faladha.com" }
  };

  return (
    <div data-testid="page-symptom-detail">
      <JsonLd data={articleJsonLd} />
      <BreadcrumbJsonLd items={[
        { name: "الرئيسية", url: "/" },
        { name: "أعراض الحمل", url: "/symptoms" },
        { name: symptom.title, url: `/symptoms/${symptom.slug}` },
      ]} />
      {symptom.faq && symptom.faq.length > 0 && <FAQJsonLd items={symptom.faq} />}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <Breadcrumbs items={[
          { label: "أعراض الحمل", href: "/symptoms" },
          { label: symptom.title },
        ]} />

        <Badge variant="secondary" className="text-xs mb-4">{symptom.trimester}</Badge>

        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3" data-testid="text-symptom-title">
          {symptom.title}
        </h1>
        <p className="text-muted-foreground leading-relaxed mb-8">{symptom.summary}</p>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-primary" /> الأسباب
          </h2>
          <ul className="space-y-2.5">
            {(symptom.causes || []).map((c: string, i: number) => (
              <li key={i} className="flex items-start gap-3 text-sm text-foreground leading-relaxed">
                <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 shrink-0" /> {c}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-emerald-500" /> نصائح للتخفيف
          </h2>
          <ul className="space-y-2.5">
            {(symptom.remedies || []).map((r: string, i: number) => (
              <li key={i} className="flex items-start gap-3 text-sm text-foreground leading-relaxed">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mt-2 shrink-0" /> {r}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-destructive" /> متى تستشيرين الطبيبة
          </h2>
          <Card className="p-5 border-destructive/20">
            <ul className="space-y-2">
              {(symptom.whenToWorry || []).map((w: string, i: number) => (
                <li key={i} className="flex items-start gap-3 text-sm text-foreground leading-relaxed">
                  <span className="w-1.5 h-1.5 bg-destructive rounded-full mt-2 shrink-0" /> {w}
                </li>
              ))}
            </ul>
          </Card>
        </section>

        {symptom.faq && symptom.faq.length > 0 && (
          <section className="mb-8" data-testid="section-symptom-faq">
            <h2 className="text-xl font-bold text-foreground mb-5 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" /> أسئلة شائعة
            </h2>
            <FAQAccordion items={symptom.faq} />
          </section>
        )}

        {(symptom.relatedWeeks || []).length > 0 && (
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4">أسابيع مرتبطة</h2>
            <div className="flex flex-wrap gap-2">
              {(symptom.relatedWeeks || []).slice(0, 8).map((w: number) => (
                <Link key={w} href={`/pregnancy/week-${w}`}>
                  <Badge variant="secondary" className="text-xs" data-testid={`badge-week-${w}`}>
                    الأسبوع {w}
                  </Badge>
                </Link>
              ))}
            </div>
          </section>
        )}

        <Card className="p-5 mb-8 flex items-center justify-between gap-4 flex-wrap">
          <div>
            <p className="text-sm font-medium text-foreground">هل تريدين حساب موعد ولادتك؟</p>
            <p className="text-xs text-muted-foreground">استخدمي حاسبة الحمل لمعرفة أسبوعك الحالي وموعد الولادة المتوقع</p>
          </div>
          <Link href="/tools/pregnancy-calculator">
            <Button size="sm" className="gap-1" data-testid="link-calculator-from-symptom">
              <Calculator className="w-4 h-4" /> حاسبة الحمل
            </Button>
          </Link>
        </Card>

        <MedicalDisclaimer />
      </div>

      <CTABanner />
    </div>
  );
}
