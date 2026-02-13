import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "المراجعة الطبية والمصادر العلمية",
  description: "تعرّفي على عملية المراجعة الطبية في فلذة وكيف نضمن دقة وموثوقية المحتوى الصحي المقدم للأمهات.",
  alternates: { canonical: `${SITE_URL}/medical-review` },
};

export default function MedicalReviewPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8" dir="rtl">
      <BreadcrumbJsonLd items={[{ name: "الرئيسية", url: "/" }, { name: "المراجعة الطبية", url: "/medical-review" }]} />
      <Breadcrumbs items={[{ label: "المراجعة الطبية" }]} />

      <h1 className="text-3xl font-bold text-foreground mb-6" data-testid="text-h1-medical-review">المراجعة الطبية</h1>
      <p className="text-muted-foreground mb-8 leading-relaxed">
        نلتزم في فلذة بتقديم محتوى طبي دقيق وموثوق. كل معلومة تقرأينها على منصتنا تمر بعملية مراجعة طبية صارمة لضمان سلامتك وسلامة جنينك.
      </p>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-foreground mb-3">عملية المراجعة الطبية</h2>
        <p className="text-muted-foreground mb-4 leading-relaxed">
          يمر كل محتوى طبي في فلذة بعملية مراجعة متعددة المراحل لضمان أعلى مستويات الدقة:
        </p>
        <div className="space-y-4">
          <div className="border border-border rounded-md p-4">
            <h3 className="font-bold text-foreground mb-1">1. البحث والإعداد</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              يقوم فريق المحتوى بإعداد المواد بناءً على أحدث الأبحاث العلمية والمراجع الطبية المعتمدة عالميًا، مع الاستناد إلى إرشادات منظمة الصحة العالمية والجمعيات الطبية المتخصصة.
            </p>
          </div>
          <div className="border border-border rounded-md p-4">
            <h3 className="font-bold text-foreground mb-1">2. المراجعة الطبية الأولية</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              يراجع طبيب متخصص في أمراض النساء والتوليد المحتوى للتأكد من دقة المعلومات الطبية ومطابقتها لأحدث الممارسات السريرية.
            </p>
          </div>
          <div className="border border-border rounded-md p-4">
            <h3 className="font-bold text-foreground mb-1">3. التدقيق اللغوي والعلمي</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              يتم تدقيق المحتوى لغويًا وعلميًا لضمان وضوح المعلومات وسهولة فهمها مع الحفاظ على الدقة العلمية.
            </p>
          </div>
          <div className="border border-border rounded-md p-4">
            <h3 className="font-bold text-foreground mb-1">4. التحديث الدوري</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              نراجع ونحدّث المحتوى بشكل دوري لمواكبة أحدث التطورات في مجال طب النساء والتوليد وصحة الأم والجنين.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-foreground mb-3">فريقنا الطبي</h2>
        <p className="text-muted-foreground mb-4 leading-relaxed">
          يضم فريقنا الطبي نخبة من الأطباء المتخصصين في أمراض النساء والتوليد، طب الأطفال وحديثي الولادة، والتغذية العلاجية. يتمتع أعضاء فريقنا بخبرة سريرية واسعة وشغف لتوفير معلومات صحية موثوقة للأمهات.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-foreground mb-3">مصادرنا المرجعية</h2>
        <ul className="space-y-2 text-muted-foreground mr-4">
          <li>• إرشادات منظمة الصحة العالمية (WHO)</li>
          <li>• الكلية الأمريكية لأطباء النساء والتوليد (ACOG)</li>
          <li>• الأبحاث المنشورة في المجلات الطبية المحكّمة</li>
          <li>• البروتوكولات السريرية المعتمدة من الهيئات الصحية المحلية</li>
        </ul>
      </section>

      <section className="mb-8 bg-primary/5 border border-primary/20 rounded-md p-5">
        <h2 className="text-lg font-bold text-foreground mb-2">تنبيه مهم</h2>
        <p className="text-muted-foreground text-sm leading-relaxed">
          المعلومات المقدمة في فلذة هي لأغراض تثقيفية فقط ولا تُغني عن استشارة الطبيب المختص. إذا كانت لديك أي مخاوف صحية أثناء الحمل، يُرجى مراجعة طبيبك فورًا. كل حمل فريد ويتطلب متابعة طبية شخصية.
        </p>
      </section>
    </div>
  );
}
