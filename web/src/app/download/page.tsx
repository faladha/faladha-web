import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BreadcrumbJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "تحميل التطبيق مجانًا",
  description: "حمّلي تطبيق فلذة مجانًا لمتابعة حملك أسبوعًا بأسبوع مع معلومات طبية موثوقة ونصائح مخصصة.",
  alternates: { canonical: "/download" },
};

export default function DownloadPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8" dir="rtl">
      <BreadcrumbJsonLd items={[{ name: "الرئيسية", url: "/" }, { name: "تحميل التطبيق", url: "/download" }]} />
      <Breadcrumbs items={[{ label: "تحميل التطبيق" }]} />

      <h1 className="text-3xl font-bold text-foreground mb-6" data-testid="text-h1-download">تحميل التطبيق</h1>
      <p className="text-muted-foreground mb-8 leading-relaxed max-w-2xl">
        حمّلي تطبيق فلذة الآن وابدئي رحلة متابعة حملك مع معلومات طبية موثوقة ونصائح مخصصة لكل أسبوع. التطبيق مجاني بالكامل ومتاح على جميع الأجهزة.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
        <div className="border border-border rounded-md p-6 text-center">
          <h2 className="text-lg font-bold text-foreground mb-2">iOS - آيفون</h2>
          <p className="text-muted-foreground text-sm mb-4">متاح على متجر آبل لأجهزة آيفون وآيباد</p>
          <a
            href="#"
            className="inline-block bg-primary text-primary-foreground px-6 py-2 rounded-md font-medium hover:opacity-90 transition-opacity"
            data-testid="link-download-ios"
          >
            تحميل من App Store
          </a>
        </div>
        <div className="border border-border rounded-md p-6 text-center">
          <h2 className="text-lg font-bold text-foreground mb-2">أندرويد</h2>
          <p className="text-muted-foreground text-sm mb-4">متاح على متجر جوجل بلاي لأجهزة أندرويد</p>
          <a
            href="#"
            className="inline-block bg-primary text-primary-foreground px-6 py-2 rounded-md font-medium hover:opacity-90 transition-opacity"
            data-testid="link-download-android"
          >
            تحميل من Google Play
          </a>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-foreground mb-4">لماذا تحمّلين فلذة؟</h2>
        <ul className="space-y-3 text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold mt-1">•</span>
            <span>متابعة تطور الجنين أسبوعًا بأسبوع مع صور توضيحية</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold mt-1">•</span>
            <span>حاسبة موعد الولادة وعمر الحمل</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold mt-1">•</span>
            <span>نصائح يومية مخصصة لمرحلة حملك</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold mt-1">•</span>
            <span>محتوى طبي موثوق ومراجع من أطباء متخصصين</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold mt-1">•</span>
            <span>مجاني بالكامل بدون إعلانات مزعجة</span>
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-foreground mb-3">متطلبات التشغيل</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-muted-foreground text-sm">
          <div>
            <h3 className="font-semibold text-foreground mb-1">iOS</h3>
            <p>يتطلب iOS 15.0 أو أحدث. متوافق مع آيفون وآيباد.</p>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-1">أندرويد</h3>
            <p>يتطلب أندرويد 8.0 أو أحدث. متوافق مع معظم أجهزة أندرويد.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
