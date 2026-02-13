import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import {
  Baby,
  Calendar,
  BookOpen,
  Bell,
  Shield,
  Heart,
  Calculator,
  Utensils,
  Activity,
  MessageCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "مميزات التطبيق - متابعة الحمل أسبوعيًا",
  description: "اكتشفي مميزات تطبيق فلذة: متابعة أسبوعية، حاسبة الحمل، نصائح طبية، تذكيرات، ومحتوى موثوق مراجع من أطباء متخصصين.",
  alternates: { canonical: "/features" },
};

const features = [
  {
    icon: Baby,
    title: "متابعة تطور الجنين",
    description: "تابعي تطور جنينك أسبوعًا بأسبوع مع معلومات مفصّلة عن حجمه ووزنه ومراحل نموه.",
  },
  {
    icon: Calendar,
    title: "تتبع أسبوعي مفصّل",
    description: "احصلي على معلومات مخصصة لكل أسبوع من أسابيع الحمل الأربعين مع نصائح عملية.",
  },
  {
    icon: Calculator,
    title: "حاسبة موعد الولادة",
    description: "احسبي موعد ولادتك المتوقع بدقة باستخدام حاسبتنا الذكية المبنية على أحدث المعايير الطبية.",
  },
  {
    icon: BookOpen,
    title: "مكتبة محتوى طبي",
    description: "مقالات ومعلومات طبية شاملة حول الحمل والولادة مكتوبة ومراجعة من أطباء متخصصين.",
  },
  {
    icon: Shield,
    title: "محتوى طبي موثوق",
    description: "جميع المعلومات مراجعة ومعتمدة من أطباء أمراض النساء والتوليد لضمان الدقة والموثوقية.",
  },
  {
    icon: Bell,
    title: "تذكيرات ذكية",
    description: "تذكيرات بمواعيد الفحوصات والزيارات الطبية والتطعيمات المهمة طوال فترة الحمل.",
  },
  {
    icon: Utensils,
    title: "نصائح التغذية",
    description: "إرشادات غذائية مخصصة لكل مرحلة من مراحل الحمل مع قائمة بالأطعمة الموصى بها والممنوعة.",
  },
  {
    icon: Activity,
    title: "تمارين الحمل",
    description: "تمارين رياضية آمنة ومناسبة لكل مرحلة من مراحل الحمل لتعزيز صحتك ولياقتك.",
  },
  {
    icon: Heart,
    title: "متابعة الأعراض",
    description: "سجّلي أعراضك اليومية وتابعي التغيرات في جسمك مع نصائح للتعامل مع كل عرض.",
  },
  {
    icon: MessageCircle,
    title: "دعم ومساعدة",
    description: "فريق دعم جاهز لمساعدتك والإجابة على استفساراتك في أي وقت.",
  },
];

export default function FeaturesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8" dir="rtl">
      <BreadcrumbJsonLd items={[{ name: "الرئيسية", url: "/" }, { name: "مميزات فلذة", url: "/features" }]} />
      <Breadcrumbs items={[{ label: "مميزات فلذة" }]} />

      <h1 className="text-3xl font-bold text-foreground mb-6" data-testid="text-h1-features">مميزات فلذة</h1>
      <p className="text-muted-foreground mb-8 leading-relaxed max-w-2xl">
        صُمم تطبيق فلذة ليكون رفيقك المثالي طوال رحلة الحمل. اكتشفي المميزات التي تجعل فلذة الخيار الأول للأمهات العربيات.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div key={index} className="border border-border rounded-md p-5 flex items-start gap-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-md bg-primary/10 text-primary shrink-0">
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-bold text-foreground mb-1">{feature.title}</h2>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
