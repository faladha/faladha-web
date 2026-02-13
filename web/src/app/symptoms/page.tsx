import Link from "next/link";
import type { Metadata } from "next";
import { Heart } from "lucide-react";
import { getPublishedSymptoms } from "@/lib/data";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { MedicalDisclaimer } from "@/components/MedicalDisclaimer";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "أعراض الحمل الشائعة - دليلك الشامل",
  description: "تعرّفي على أعراض الحمل الشائعة وكيفية التعامل معها. معلومات طبية موثوقة عن غثيان الصباح، آلام الظهر، حرقة المعدة وغيرها.",
  alternates: { canonical: "/symptoms" },
};

export default async function SymptomsPage() {
  const symptoms = await getPublishedSymptoms();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <BreadcrumbJsonLd items={[{ name: "الرئيسية", url: "/" }, { name: "أعراض الحمل", url: "/symptoms" }]} />
      <Breadcrumbs items={[{ label: "أعراض الحمل" }]} />
      <h1 className="text-3xl font-bold text-foreground mb-4" data-testid="text-h1-symptoms">أعراض الحمل الشائعة</h1>
      <p className="text-muted-foreground mb-8 max-w-2xl">
        دليل شامل لأعراض الحمل مع معلومات عن أسبابها وطرق التخفيف منها ومتى يجب استشارة الطبيبة.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {symptoms.map((s) => (
          <Link
            key={s.slug}
            href={`/symptoms/${s.slug}`}
            className="border border-border rounded-md p-5 hover:border-primary/30 transition-colors group"
            data-testid={`link-symptom-${s.slug}`}
          >
            <div className="flex items-start gap-3">
              <Heart className="w-5 h-5 text-primary mt-1 shrink-0" />
              <div>
                <h2 className="font-semibold text-foreground group-hover:text-primary transition-colors">{s.title}</h2>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{s.summary}</p>
                {s.trimester && (
                  <span className="inline-block mt-2 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-md">{s.trimester}</span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>

      <MedicalDisclaimer />
    </div>
  );
}
