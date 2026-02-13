import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Heart, Pill, AlertTriangle, HelpCircle } from "lucide-react";
import { getPublishedSymptoms, getSymptomBySlug } from "@/lib/data";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BreadcrumbJsonLd, FAQJsonLd, MedicalWebPageJsonLd } from "@/components/JsonLd";
import { MedicalDisclaimer } from "@/components/MedicalDisclaimer";
import { SITE_URL } from "@/lib/constants";

export const revalidate = 86400;

export async function generateStaticParams() {
  const symptoms = await getPublishedSymptoms();
  return symptoms.map((s) => ({ slug: s.slug }));
}

function stripBrand(title: string): string {
  return title.replace(/\s*[||\-]\s*فلذة\s*$/u, "").trim();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const symptom = await getSymptomBySlug(slug);
  if (!symptom) return { title: "صفحة غير موجودة" };
  const rawTitle = symptom.metaTitle || symptom.title;
  const title = stripBrand(rawTitle);
  return {
    title,
    description: symptom.metaDescription || symptom.summary,
    alternates: { canonical: `${SITE_URL}/symptoms/${symptom.slug}` },
    openGraph: {
      title: `${title} | فلذة`,
      description: symptom.metaDescription || symptom.summary,
      url: `${SITE_URL}/symptoms/${symptom.slug}`,
    },
  };
}

export default async function SymptomDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const symptom = await getSymptomBySlug(slug);
  if (!symptom || symptom.status !== "published") notFound();

  const faqs = (symptom.faq || []) as { question: string; answer: string }[];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <BreadcrumbJsonLd items={[
        { name: "الرئيسية", url: "/" },
        { name: "أعراض الحمل", url: "/symptoms" },
        { name: symptom.title, url: `/symptoms/${symptom.slug}` },
      ]} />
      <MedicalWebPageJsonLd title={symptom.title} description={symptom.metaDescription || symptom.summary} url={`/symptoms/${symptom.slug}`} />
      {faqs.length > 0 && <FAQJsonLd items={faqs} />}

      <Breadcrumbs items={[
        { label: "أعراض الحمل", href: "/symptoms" },
        { label: symptom.title },
      ]} />

      <h1 className="text-3xl font-bold text-foreground mb-2" data-testid="text-h1-symptom-title">{symptom.title}</h1>
      <p className="text-muted-foreground mb-6">{symptom.summary}</p>
      {symptom.trimester && (
        <span className="inline-block mb-6 text-sm bg-primary/10 text-primary px-3 py-1 rounded-md">{symptom.trimester}</span>
      )}

      {/* Causes */}
      {symptom.causes && symptom.causes.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-primary" /> الأسباب
          </h2>
          <ul className="space-y-2">
            {symptom.causes.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Remedies */}
      {symptom.remedies && symptom.remedies.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Pill className="w-5 h-5 text-primary" /> طرق التخفيف
          </h2>
          <ul className="space-y-2">
            {symptom.remedies.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* When to Worry */}
      {symptom.whenToWorry && symptom.whenToWorry.length > 0 && (
        <section className="mb-8 border border-destructive/30 rounded-md p-5 bg-destructive/5">
          <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-destructive" /> متى تستشيرين الطبيبة
          </h2>
          <ul className="space-y-2">
            {symptom.whenToWorry.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-destructive mt-2 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Related Weeks */}
      {symptom.relatedWeeks && symptom.relatedWeeks.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold text-foreground mb-4">الأسابيع المرتبطة</h2>
          <div className="flex flex-wrap gap-2">
            {symptom.relatedWeeks.map((wn) => (
              <Link
                key={wn}
                href={`/pregnancy/week-${wn}`}
                className="border border-border rounded-md px-3 py-1.5 text-sm hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                الأسبوع {wn}
              </Link>
            ))}
          </div>
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

      <MedicalDisclaimer />
    </div>
  );
}
