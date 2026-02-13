import Link from "next/link";
import type { Metadata } from "next";
import { getPublishedWeeks } from "@/lib/data";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { MedicalDisclaimer } from "@/components/MedicalDisclaimer";
import { SITE_URL } from "@/lib/constants";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "أسابيع الحمل - دليلك الشامل للحمل أسبوعًا بأسبوع",
  description: "دليل شامل لأسابيع الحمل الأربعين. تعرّفي على تطور الجنين وتغيرات جسمك في كل أسبوع مع نصائح مخصصة.",
  alternates: { canonical: `${SITE_URL}/pregnancy` },
};

export default async function PregnancyPage() {
  const weeks = await getPublishedWeeks();
  const trimesters = [
    { label: "الثلث الأول (الأسابيع 1-13)", weeks: weeks.filter((w) => w.trimester === 1) },
    { label: "الثلث الثاني (الأسابيع 14-26)", weeks: weeks.filter((w) => w.trimester === 2) },
    { label: "الثلث الثالث (الأسابيع 27-40)", weeks: weeks.filter((w) => w.trimester === 3) },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <BreadcrumbJsonLd items={[{ name: "الرئيسية", url: "/" }, { name: "أسابيع الحمل", url: "/pregnancy" }]} />
      <Breadcrumbs items={[{ label: "أسابيع الحمل" }]} />
      <h1 className="text-3xl font-bold text-foreground mb-4" data-testid="text-h1-weeks">أسابيع الحمل</h1>
      <p className="text-muted-foreground mb-8 max-w-2xl">
        دليلك الشامل لمتابعة الحمل أسبوعًا بأسبوع. تعرّفي على تطور جنينك والتغيرات التي تحدث لجسمك مع نصائح مخصصة لكل أسبوع.
      </p>

      {trimesters.map((trimester, ti) => (
        <div key={ti} className="mb-10">
          <h2 className="text-xl font-bold text-foreground mb-4">{trimester.label}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {trimester.weeks.map((w) => (
              <Link
                key={w.slug}
                href={`/pregnancy/${w.slug}`}
                className="border border-border rounded-md p-4 hover:border-primary/30 transition-colors group"
                data-testid={`link-week-detail-${w.weekNumber}`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-md bg-primary/10 text-primary font-bold text-sm shrink-0">
                    {w.weekNumber}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors text-sm">{w.title}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-1 mt-1">{w.summary}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}

      <MedicalDisclaimer />
    </div>
  );
}
