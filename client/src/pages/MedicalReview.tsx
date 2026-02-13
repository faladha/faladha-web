import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { Card } from "@/components/ui/card";
import { Shield, BookOpen, RefreshCw, Users } from "lucide-react";
import { useSeoMeta } from "@/hooks/useSeoMeta";

export default function MedicalReview() {
  useSeoMeta({
    title: "المراجعة الطبية | فلذة - محتوى طبي موثوق",
    description: "كيف نضمن دقة المحتوى الطبي في فلذة. تعرّفي على عملية المراجعة الطبية والفريق المتخصص.",
    canonical: "/medical-review",
    ogType: "website",
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8" data-testid="page-medical-review">
      <Breadcrumbs items={[{ label: "المراجعة الطبية" }]} />

      <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
        المراجعة الطبية في فلذة
      </h1>
      <p className="text-muted-foreground leading-relaxed mb-8 text-lg">
        نلتزم بأعلى معايير الدقة الطبية في كل محتوى نقدمه.
        تعرفي على عملية المراجعة الطبية لدينا.
      </p>

      <div className="grid sm:grid-cols-2 gap-4 mb-10">
        <Card className="p-6">
          <Shield className="w-6 h-6 text-primary mb-3" />
          <h3 className="font-semibold text-foreground mb-2">مراجعة طبية شاملة</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            كل محتوى في فلذة يمر بعملية مراجعة طبية دقيقة من فريقنا الطبي
            المتخصص قبل نشره للتأكد من دقته وسلامته.
          </p>
        </Card>
        <Card className="p-6">
          <BookOpen className="w-6 h-6 text-primary mb-3" />
          <h3 className="font-semibold text-foreground mb-2">مصادر موثوقة</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            نعتمد على المراجع الطبية العالمية المعتمدة مثل ACOG وWHO
            ومجلات طبية محكّمة لضمان حداثة ودقة المعلومات.
          </p>
        </Card>
        <Card className="p-6">
          <RefreshCw className="w-6 h-6 text-primary mb-3" />
          <h3 className="font-semibold text-foreground mb-2">تحديث مستمر</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            نراجع ونحدث المحتوى بشكل دوري وفقاً لأحدث الأبحاث والتوصيات
            الطبية لضمان تقديم أفضل المعلومات.
          </p>
        </Card>
        <Card className="p-6">
          <Users className="w-6 h-6 text-primary mb-3" />
          <h3 className="font-semibold text-foreground mb-2">فريق طبي متخصص</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            يضم فريقنا الطبي استشاريين في أمراض النساء والتوليد وطب الأجنة.
            يمكن تحديث أسماء الفريق الطبي لاحقاً عند توفرها.
          </p>
        </Card>
      </div>

      <section className="bg-muted/50 rounded-lg p-6">
        <h2 className="text-lg font-bold text-foreground mb-3">عملية المراجعة الطبية</h2>
        <ol className="space-y-3">
          {[
            "إعداد المحتوى بناءً على المراجع الطبية العالمية",
            "مراجعة أولية من كاتب المحتوى الطبي المتخصص",
            "مراجعة ثانية من استشاري أمراض النساء والتوليد",
            "التدقيق اللغوي والتأكد من سلاسة المحتوى",
            "النشر مع وضع تاريخ المراجعة وتنبيه طبي واضح",
          ].map((step, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                {i + 1}
              </span>
              <span className="text-sm text-foreground leading-relaxed">{step}</span>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
