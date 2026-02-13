import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { SiApple, SiGoogleplay } from "react-icons/si";
import { Download, Star, Shield, Smartphone } from "lucide-react";
import { useSeoMeta } from "@/hooks/useSeoMeta";

export default function DownloadPage() {
  useSeoMeta({
    title: "حمّلي تطبيق فلذة لمتابعة الحمل | فلذة",
    description: "حمّلي تطبيق فلذة لمتابعة حملك أسبوعًا بأسبوع. متوفر على أندرويد وآيفون مع حاسبة الحمل وأدوات ذكية.",
    canonical: "/download",
    ogType: "website",
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8" data-testid="page-download">
      <Breadcrumbs items={[{ label: "حمّل التطبيق" }]} />

      <div className="text-center mb-12">
        <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-5">
          <span className="text-primary-foreground font-bold text-3xl">ف</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3" data-testid="text-download-title">
          حمّلي تطبيق فلذة مجاناً
        </h1>
        <p className="text-muted-foreground leading-relaxed max-w-xl mx-auto mb-8">
          رفيقتك الموثوقة في رحلة الحمل. متابعة أسبوعية، أدوات ذكية،
          ومعلومات طبية موثوقة — كل ذلك في تطبيق واحد.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3 justify-center">
          <Button size="lg" className="gap-2 w-full sm:w-auto" data-testid="button-appstore">
            <SiApple className="w-5 h-5" />
            حمّلي من App Store
          </Button>
          <Button size="lg" variant="outline" className="gap-2 w-full sm:w-auto" data-testid="button-googleplay">
            <SiGoogleplay className="w-5 h-5" />
            حمّلي من Google Play
          </Button>
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 mb-12">
        <Card className="p-6 text-center">
          <Star className="w-6 h-6 text-yellow-500 mx-auto mb-3" />
          <p className="font-bold text-foreground text-2xl mb-1">4.8</p>
          <p className="text-xs text-muted-foreground">تقييم المستخدمين</p>
        </Card>
        <Card className="p-6 text-center">
          <Download className="w-6 h-6 text-primary mx-auto mb-3" />
          <p className="font-bold text-foreground text-2xl mb-1">+50K</p>
          <p className="text-xs text-muted-foreground">عملية تحميل</p>
        </Card>
        <Card className="p-6 text-center">
          <Shield className="w-6 h-6 text-emerald-500 mx-auto mb-3" />
          <p className="font-bold text-foreground text-2xl mb-1">100%</p>
          <p className="text-xs text-muted-foreground">آمن وموثوق</p>
        </Card>
      </div>

      <section>
        <h2 className="text-xl font-bold text-foreground mb-6 text-center">لماذا فلذة؟</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { icon: Smartphone, title: "واجهة سهلة", desc: "تصميم بسيط وسهل الاستخدام باللغة العربية" },
            { icon: Shield, title: "محتوى موثوق", desc: "معلومات طبية مراجعة من متخصصين" },
            { icon: Star, title: "أدوات ذكية", desc: "حاسبات ومتتبعات لكل مرحلة من الحمل" },
            { icon: Download, title: "مجاني بالكامل", desc: "جميع الميزات الأساسية متاحة مجاناً" },
          ].map((f) => (
            <Card key={f.title} className="p-5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <f.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-sm mb-1">{f.title}</h3>
                <p className="text-xs text-muted-foreground">{f.desc}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
