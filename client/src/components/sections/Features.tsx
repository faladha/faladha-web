import { Card } from "@/components/ui/card";
import { Calendar, Heart, Baby, Calculator, BookOpen, Bell } from "lucide-react";

const features = [
  {
    icon: Calendar,
    title: "متابعة أسبوعية",
    description: "تتبعي تطور حملك أسبوعًا بأسبوع مع معلومات مفصلة عن نمو الجنين والتغيرات في جسمك",
  },
  {
    icon: Heart,
    title: "معلومات طبية موثوقة",
    description: "محتوى مراجع طبياً يغطي كل ما تحتاجين معرفته عن صحتك وصحة جنينك",
  },
  {
    icon: Baby,
    title: "تطور الجنين",
    description: "اكتشفي حجم جنينك ومراحل نموه مع مقارنات بسيطة وصور توضيحية لكل أسبوع",
  },
  {
    icon: Calculator,
    title: "أدوات ذكية",
    description: "حاسبة موعد الولادة وأدوات متابعة الوزن وحركة الجنين والمزيد من الأدوات المفيدة",
  },
  {
    icon: BookOpen,
    title: "مدونة متخصصة",
    description: "مقالات متنوعة عن التغذية والرياضة والنوم والتحضير للولادة وما بعدها",
  },
  {
    icon: Bell,
    title: "تذكيرات مخصصة",
    description: "تنبيهات لمواعيد الفحوصات والأدوية والنصائح المناسبة لكل مرحلة من حملك",
  },
];

export default function Features() {
  return (
    <section className="py-16 md:py-24" data-testid="section-features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4" data-testid="text-features-title">
            كل ما تحتاجينه في <span className="text-primary">تطبيق واحد</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            فلذة يجمع لك أفضل الأدوات والمعلومات لمتابعة حملك بثقة وراحة
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {features.map((feature) => (
            <Card key={feature.title} className="p-6 hover-elevate" data-testid={`card-feature-${feature.title}`}>
              <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <feature.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
