import Breadcrumbs from "@/components/layout/Breadcrumbs";
import Features from "@/components/sections/Features";
import CTABanner from "@/components/sections/CTABanner";

export default function FeaturesPage() {
  return (
    <div data-testid="page-features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <Breadcrumbs items={[{ label: "مميزات فلذة" }]} />
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
          مميزات تطبيق فلذة
        </h1>
        <p className="text-muted-foreground leading-relaxed max-w-3xl">
          فلذة يقدم لك مجموعة شاملة من الأدوات والمعلومات لمتابعة حملك بثقة.
          تعرفي على كل ما يقدمه التطبيق.
        </p>
      </div>
      <Features />
      <CTABanner />
    </div>
  );
}
