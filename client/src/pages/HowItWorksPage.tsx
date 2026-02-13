import Breadcrumbs from "@/components/layout/Breadcrumbs";
import HowItWorks from "@/components/sections/HowItWorks";
import CTABanner from "@/components/sections/CTABanner";
import { useSeoMeta } from "@/hooks/useSeoMeta";

export default function HowItWorksPage() {
  useSeoMeta({
    title: "كيف يعمل تطبيق فلذة لمتابعة الحمل | فلذة",
    description: "تعرّفي على طريقة عمل تطبيق فلذة لمتابعة الحمل. خطوات بسيطة لبدء متابعة حملك أسبوعًا بأسبوع.",
    canonical: "/how-it-works",
    ogType: "website",
  });

  return (
    <div data-testid="page-how-it-works">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <Breadcrumbs items={[{ label: "كيف يعمل" }]} />
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
          كيف يعمل تطبيق فلذة
        </h1>
        <p className="text-muted-foreground leading-relaxed max-w-3xl">
          ثلاث خطوات بسيطة لبدء متابعة حملك مع فلذة
        </p>
      </div>
      <HowItWorks />
      <CTABanner />
    </div>
  );
}
