import { useEffect } from "react";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { Card } from "@/components/ui/card";
import { Heart, Target, Users, Shield } from "lucide-react";

export default function AboutPage() {
  useEffect(() => {
    document.title = "عن فلذة | تطبيق متابعة الحمل الشامل";
    const m = document.querySelector('meta[name="description"]');
    if (m) m.setAttribute("content", "تعرّفي على فلذة، تطبيق متابعة الحمل الشامل في العالم العربي. رؤيتنا، فريقنا، وكيف نساعد الأمهات في رحلة الحمل.");
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8" data-testid="page-about">
      <Breadcrumbs items={[{ label: "من نحن" }]} />

      <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
        عن فلذة
      </h1>
      <p className="text-muted-foreground leading-relaxed mb-8 text-lg">
        فلذة هو تطبيق عربي رائد في متابعة الحمل، يهدف لتمكين كل أم عربية
        من متابعة حملها بثقة ومعرفة.
      </p>

      <div className="grid sm:grid-cols-2 gap-4 mb-10">
        <Card className="p-6">
          <Target className="w-6 h-6 text-primary mb-3" />
          <h3 className="font-semibold text-foreground mb-2">رؤيتنا</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            أن نكون المرجع الأول والأكثر موثوقية لمتابعة الحمل في العالم العربي،
            مع تقديم محتوى طبي دقيق بلغة عربية سلسة ومفهومة.
          </p>
        </Card>
        <Card className="p-6">
          <Heart className="w-6 h-6 text-primary mb-3" />
          <h3 className="font-semibold text-foreground mb-2">رسالتنا</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            تمكين كل أم عربية من الوصول لمعلومات طبية موثوقة ومحدثة عن حملها،
            مع أدوات ذكية تسهل عليها متابعة صحتها وصحة جنينها.
          </p>
        </Card>
      </div>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-foreground mb-5">قيمنا</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { icon: Shield, title: "الموثوقية", desc: "كل معلومة مراجعة طبياً ومبنية على أحدث الأبحاث العلمية" },
            { icon: Users, title: "الشمولية", desc: "محتوى يناسب كل أم عربية بغض النظر عن خبرتها السابقة" },
            { icon: Heart, title: "الاهتمام", desc: "نضع صحة الأم والجنين في أولوياتنا في كل قرار" },
            { icon: Target, title: "التحديث", desc: "نحدث محتوانا باستمرار وفقاً لأحدث التوصيات الطبية" },
          ].map(v => (
            <div key={v.title} className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <v.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-sm mb-1">{v.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{v.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-foreground mb-4">فريقنا</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          يتكون فريق فلذة من مطورين ومصممين ومتخصصين في المحتوى الصحي.
          نعمل معاً لتقديم أفضل تجربة ممكنة لكل أم عربية.
          يضم فريقنا الطبي استشاريين في أمراض النساء والتوليد يراجعون
          المحتوى بشكل دوري لضمان دقته وحداثته.
        </p>
      </section>
    </div>
  );
}
