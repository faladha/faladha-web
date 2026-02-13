import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BreadcrumbJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "كيف تعمل فلذة - دليل استخدام التطبيق",
  description: "تعرّفي على كيفية استخدام تطبيق فلذة لمتابعة حملك خطوة بخطوة. من التسجيل إلى المتابعة الأسبوعية.",
  alternates: { canonical: "/how-it-works" },
};

const steps = [
  {
    number: "1",
    title: "حمّلي التطبيق",
    description: "حمّلي تطبيق فلذة مجانًا من متجر آبل أو جوجل بلاي وأنشئي حسابك في ثوانٍ معدودة.",
  },
  {
    number: "2",
    title: "أدخلي بياناتك",
    description: "أدخلي تاريخ آخر دورة شهرية أو موعد الولادة المتوقع ليتمكن التطبيق من تخصيص المحتوى لمرحلة حملك.",
  },
  {
    number: "3",
    title: "تابعي حملك أسبوعيًا",
    description: "احصلي على معلومات مفصّلة عن تطور جنينك وتغيرات جسمك كل أسبوع مع نصائح عملية ومخصصة.",
  },
  {
    number: "4",
    title: "استكشفي المحتوى",
    description: "اقرأي المقالات الطبية الموثوقة، تعرّفي على الأعراض الشائعة، واستفيدي من أدوات الحساب المتنوعة.",
  },
];

export default function HowItWorksPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8" dir="rtl">
      <BreadcrumbJsonLd items={[{ name: "الرئيسية", url: "/" }, { name: "كيف تعمل فلذة", url: "/how-it-works" }]} />
      <Breadcrumbs items={[{ label: "كيف تعمل فلذة" }]} />

      <h1 className="text-3xl font-bold text-foreground mb-6" data-testid="text-h1-how-it-works">كيف تعمل فلذة</h1>
      <p className="text-muted-foreground mb-8 leading-relaxed max-w-2xl">
        فلذة مصمم ليكون سهل الاستخدام ويقدم لك تجربة متابعة حمل شاملة. اتبعي هذه الخطوات البسيطة لبدء رحلتك مع فلذة.
      </p>

      <div className="space-y-6 mb-10">
        {steps.map((step, index) => (
          <div key={index} className="flex items-start gap-4 border border-border rounded-md p-5">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold text-lg shrink-0">
              {step.number}
            </div>
            <div>
              <h2 className="font-bold text-foreground mb-1">{step.title}</h2>
              <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
            </div>
          </div>
        ))}
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-foreground mb-4">ما الذي ستحصلين عليه؟</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="border border-border rounded-md p-4">
            <h3 className="font-bold text-foreground mb-2">معلومات أسبوعية</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              كل أسبوع ستحصلين على تقرير مفصّل عن حجم جنينك، مراحل نموه، والتغيرات التي تحدث في جسمك.
            </p>
          </div>
          <div className="border border-border rounded-md p-4">
            <h3 className="font-bold text-foreground mb-2">نصائح مخصصة</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              نصائح تغذية، تمارين، ورعاية صحية مصممة خصيصًا لمرحلة حملك الحالية.
            </p>
          </div>
          <div className="border border-border rounded-md p-4">
            <h3 className="font-bold text-foreground mb-2">أدوات مفيدة</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              حاسبة موعد الولادة، متتبع الأعراض، وقائمة الفحوصات المطلوبة لكل مرحلة.
            </p>
          </div>
          <div className="border border-border rounded-md p-4">
            <h3 className="font-bold text-foreground mb-2">مقالات طبية</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              مكتبة شاملة من المقالات الطبية المراجعة من أطباء متخصصين حول مواضيع الحمل والولادة.
            </p>
          </div>
        </div>
      </section>

      <section className="text-center border border-primary/20 bg-primary/5 rounded-md p-6">
        <h2 className="text-xl font-bold text-foreground mb-2">ابدئي رحلتك مع فلذة اليوم</h2>
        <p className="text-muted-foreground mb-4">حمّلي التطبيق مجانًا وانضمي لآلاف الأمهات اللاتي يثقن بفلذة.</p>
        <a
          href="/download"
          className="inline-block bg-primary text-primary-foreground px-6 py-2 rounded-md font-medium hover:opacity-90 transition-opacity"
          data-testid="link-download-cta"
        >
          تحميل التطبيق
        </a>
      </section>
    </div>
  );
}
