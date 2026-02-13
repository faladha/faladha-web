import { Download, CalendarCheck, Sparkles } from "lucide-react";

const steps = [
  {
    icon: Download,
    step: "١",
    title: "حمّلي التطبيق",
    description: "حمّلي تطبيق فلذة مجاناً من متجر التطبيقات وأنشئي حسابك في ثوانٍ",
  },
  {
    icon: CalendarCheck,
    step: "٢",
    title: "أدخلي موعد حملك",
    description: "أدخلي تاريخ آخر دورة أو موعد الولادة المتوقع وسنحسب كل شيء لك",
  },
  {
    icon: Sparkles,
    step: "٣",
    title: "تابعي حملك يومياً",
    description: "احصلي على معلومات مخصصة وتذكيرات ونصائح تناسب أسبوعك الحالي بالضبط",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-16 md:py-24 bg-card/50" data-testid="section-how-it-works">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
            كيف <span className="text-primary">يعمل</span> فلذة؟
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
            ثلاث خطوات بسيطة لبدء رحلة متابعة حملك
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {steps.map((step, i) => (
            <div key={i} className="text-center">
              <div className="relative w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-5">
                <step.icon className="w-7 h-7 text-primary" />
                <span className="absolute -top-1 -end-1 w-6 h-6 bg-primary text-primary-foreground text-xs font-bold rounded-full flex items-center justify-center">
                  {step.step}
                </span>
              </div>
              <h3 className="font-semibold text-foreground mb-2 text-lg">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
