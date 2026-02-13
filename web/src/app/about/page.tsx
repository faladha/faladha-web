import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BreadcrumbJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "عن فلذة - تطبيق متابعة الحمل الشامل",
  description: "تعرّفي على فلذة، التطبيق العربي الأول لمتابعة الحمل بمعلومات طبية موثوقة ومراجعة من أطباء متخصصين.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8" dir="rtl">
      <BreadcrumbJsonLd items={[{ name: "الرئيسية", url: "/" }, { name: "عن فلذة", url: "/about" }]} />
      <Breadcrumbs items={[{ label: "عن فلذة" }]} />

      <h1 className="text-3xl font-bold text-foreground mb-6" data-testid="text-h1-about">عن فلذة</h1>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-foreground mb-3">رسالتنا</h2>
        <p className="text-muted-foreground mb-4 leading-relaxed">
          فلذة هو التطبيق العربي الأول المتخصص في متابعة الحمل أسبوعًا بأسبوع. نؤمن بأن كل أم تستحق الحصول على معلومات طبية دقيقة وموثوقة بلغتها الأم، لذلك أنشأنا فلذة ليكون رفيقك الموثوق طوال رحلة الحمل.
        </p>
        <p className="text-muted-foreground mb-4 leading-relaxed">
          نسعى لتمكين الأمهات من اتخاذ قرارات صحية مستنيرة من خلال توفير محتوى طبي مراجع من أطباء متخصصين في أمراض النساء والتوليد.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-foreground mb-3">لماذا فلذة؟</h2>
        <ul className="space-y-3 text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold mt-1">•</span>
            <span>محتوى طبي موثوق ومراجع من أطباء متخصصين</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold mt-1">•</span>
            <span>متابعة أسبوعية مفصّلة لتطور الجنين وتغيرات جسم الأم</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold mt-1">•</span>
            <span>أدوات حساب موعد الولادة المتوقع</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold mt-1">•</span>
            <span>نصائح تغذية وتمارين مخصصة لكل مرحلة من مراحل الحمل</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold mt-1">•</span>
            <span>واجهة عربية بالكامل مصممة خصيصًا للأم العربية</span>
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-foreground mb-3">فريقنا</h2>
        <p className="text-muted-foreground mb-4 leading-relaxed">
          يتكون فريق فلذة من مجموعة من المتخصصين في الطب والتقنية، يجمعهم هدف واحد: تقديم أفضل تجربة لمتابعة الحمل للأمهات العربيات. يعمل فريقنا الطبي على مراجعة كل المحتوى لضمان دقته وموثوقيته.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-foreground mb-3">رؤيتنا</h2>
        <p className="text-muted-foreground leading-relaxed">
          نطمح أن نكون المرجع الأول والأكثر ثقة للأمهات العربيات في كل ما يتعلق بالحمل والأمومة. نعمل باستمرار على تطوير محتوانا وأدواتنا لتلبية احتياجات الأمهات في كل مرحلة من مراحل الأمومة.
        </p>
      </section>
    </div>
  );
}
