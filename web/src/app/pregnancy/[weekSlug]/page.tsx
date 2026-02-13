import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Baby, Heart, Lightbulb, AlertTriangle, Ruler } from "lucide-react";
import { getPublishedWeeks, getWeekBySlug } from "@/lib/data";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BreadcrumbJsonLd, FAQJsonLd, ArticleJsonLd } from "@/components/JsonLd";
import { MedicalDisclaimer } from "@/components/MedicalDisclaimer";
import { SITE_URL } from "@/lib/constants";

export const revalidate = 86400;

export async function generateStaticParams() {
  const weeks = await getPublishedWeeks();
  return weeks.map((w) => ({ weekSlug: w.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ weekSlug: string }> }): Promise<Metadata> {
  const { weekSlug } = await params;
  const week = await getWeekBySlug(weekSlug);
  if (!week) return { title: "صفحة غير موجودة" };
  return {
    title: week.metaTitle || week.title,
    description: week.metaDescription || week.summary,
    alternates: { canonical: `/pregnancy/${week.slug}` },
    openGraph: {
      title: week.metaTitle || week.title,
      description: week.metaDescription || week.summary,
      url: `${SITE_URL}/pregnancy/${week.slug}`,
    },
  };
}

export default async function WeekDetailPage({ params }: { params: Promise<{ weekSlug: string }> }) {
  const { weekSlug } = await params;
  const week = await getWeekBySlug(weekSlug);
  if (!week || week.status !== "published") notFound();

  const fetusSize = week.fetusSize as { fruit?: string; length?: string; weight?: string } | null;
  const faqs = (week.faq || []) as { question: string; answer: string }[];
  const prevWeek = week.weekNumber > 1 ? `week-${week.weekNumber - 1}` : null;
  const nextWeek = week.weekNumber < 40 ? `week-${week.weekNumber + 1}` : null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <BreadcrumbJsonLd items={[
        { name: "الرئيسية", url: "/" },
        { name: "أسابيع الحمل", url: "/pregnancy" },
        { name: week.title, url: `/pregnancy/${week.slug}` },
      ]} />
      <ArticleJsonLd
        title={week.metaTitle || week.title}
        description={week.metaDescription || week.summary}
        url={`/pregnancy/${week.slug}`}
        datePublished={week.createdAt?.toISOString()}
        dateModified={week.updatedAt?.toISOString()}
      />
      {faqs.length > 0 && <FAQJsonLd items={faqs} />}

      <Breadcrumbs items={[
        { label: "أسابيع الحمل", href: "/pregnancy" },
        { label: week.title },
      ]} />

      <h1 className="text-3xl font-bold text-foreground mb-2" data-testid="text-h1-week-title">{week.title}</h1>
      <p className="text-muted-foreground mb-6">{week.summary}</p>

      {/* Fetus Size */}
      {fetusSize && (fetusSize.fruit || fetusSize.length || fetusSize.weight) && (
        <div className="border border-border rounded-md p-5 mb-8 bg-primary/5" data-testid="fetus-size-card">
          <h2 className="font-bold text-foreground mb-3 flex items-center gap-2">
            <Ruler className="w-5 h-5 text-primary" /> حجم الجنين
          </h2>
          <div className="grid grid-cols-3 gap-4 text-center">
            {fetusSize.fruit && (
              <div>
                <p className="text-2xl mb-1">🍎</p>
                <p className="text-sm text-muted-foreground">بحجم {fetusSize.fruit}</p>
              </div>
            )}
            {fetusSize.length && (
              <div>
                <p className="font-bold text-primary text-lg">{fetusSize.length}</p>
                <p className="text-sm text-muted-foreground">الطول</p>
              </div>
            )}
            {fetusSize.weight && (
              <div>
                <p className="font-bold text-primary text-lg">{fetusSize.weight}</p>
                <p className="text-sm text-muted-foreground">الوزن</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Fetal Development */}
      {week.fetalDevelopment && week.fetalDevelopment.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Baby className="w-5 h-5 text-primary" /> تطور الجنين
          </h2>
          <ul className="space-y-2">
            {week.fetalDevelopment.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Mother Symptoms */}
      {week.motherSymptoms && week.motherSymptoms.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Heart className="w-5 h-5 text-primary" /> أعراض الأم
          </h2>
          <ul className="space-y-2">
            {week.motherSymptoms.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Tips */}
      {week.tips && week.tips.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-primary" /> نصائح للأسبوع {week.weekNumber}
          </h2>
          <ul className="space-y-2">
            {week.tips.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* When to Call Doctor */}
      {week.whenToCallDoctor && week.whenToCallDoctor.length > 0 && (
        <section className="mb-8 border border-destructive/30 rounded-md p-5 bg-destructive/5">
          <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-destructive" /> متى تتصلين بالطبيبة
          </h2>
          <ul className="space-y-2">
            {week.whenToCallDoctor.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-destructive mt-2 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* FAQ */}
      {faqs.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold text-foreground mb-4">الأسئلة الشائعة</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <details key={i} className="border border-border rounded-md">
                <summary className="cursor-pointer p-4 font-semibold text-foreground hover:text-primary transition-colors text-sm">
                  {faq.question}
                </summary>
                <div className="px-4 pb-4 text-muted-foreground text-sm leading-relaxed">{faq.answer}</div>
              </details>
            ))}
          </div>
        </section>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between border-t border-border pt-6 gap-4">
        {prevWeek ? (
          <Link href={`/pregnancy/${prevWeek}`} className="text-primary hover:underline text-sm" data-testid="link-prev-week">
            الأسبوع {week.weekNumber - 1} &larr;
          </Link>
        ) : <span />}
        <Link href="/pregnancy" className="text-muted-foreground hover:text-foreground text-sm">كل الأسابيع</Link>
        {nextWeek ? (
          <Link href={`/pregnancy/${nextWeek}`} className="text-primary hover:underline text-sm" data-testid="link-next-week">
            &rarr; الأسبوع {week.weekNumber + 1}
          </Link>
        ) : <span />}
      </div>

      <MedicalDisclaimer />
    </div>
  );
}
