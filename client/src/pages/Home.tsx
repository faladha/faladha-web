import Hero from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import HowItWorks from "@/components/sections/HowItWorks";
import Stats from "@/components/sections/Stats";
import Testimonials from "@/components/sections/Testimonials";
import CTABanner from "@/components/sections/CTABanner";
import FAQAccordion from "@/components/sections/FAQAccordion";
import { OrganizationJsonLd, WebSiteJsonLd, FAQJsonLd } from "@/components/seo/JsonLd";
import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import { weeks } from "@/data/weeks";
import { ArrowLeft } from "lucide-react";

const homeFAQ = [
  { question: "ما هو تطبيق فلذة؟", answer: "فلذة هو تطبيق عربي شامل لمتابعة الحمل أسبوعًا بأسبوع. يقدم معلومات طبية موثوقة عن تطور الجنين وصحة الأم، مع أدوات ذكية كحاسبة موعد الولادة ومتابعة حركة الجنين." },
  { question: "هل المعلومات في فلذة موثوقة طبياً؟", answer: "نعم، جميع المعلومات في فلذة مُعدّة بعناية ومراجعة من فريق طبي متخصص. نلتزم بأحدث المراجع الطبية العالمية مع تقديم المحتوى بلغة عربية سهلة ومفهومة." },
  { question: "هل التطبيق مجاني؟", answer: "نعم، تطبيق فلذة مجاني بالكامل مع إمكانية الاشتراك في النسخة المميزة للحصول على ميزات إضافية متقدمة." },
  { question: "كيف أبدأ باستخدام فلذة؟", answer: "حمّلي التطبيق من متجر التطبيقات، أنشئي حسابك، وأدخلي تاريخ آخر دورة شهرية أو موعد الولادة المتوقع. سيبدأ التطبيق فوراً بتقديم محتوى مخصص لأسبوعك الحالي." },
  { question: "هل يمكنني استخدام فلذة بدون حساب؟", answer: "يمكنك تصفح المحتوى العام والمقالات بدون حساب، لكن للاستفادة من المتابعة المخصصة والأدوات الذكية، ستحتاجين لإنشاء حساب مجاني." },
];

const trimesterColors: Record<number, string> = {
  1: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  2: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  3: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
};

export default function Home() {
  return (
    <div data-testid="page-home">
      <OrganizationJsonLd />
      <WebSiteJsonLd />
      <FAQJsonLd items={homeFAQ} />
      <Hero />
      <Features />

      <section className="py-16 md:py-24 bg-card/50" data-testid="section-weeks-preview">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between gap-4 mb-10 flex-wrap">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                أسابيع <span className="text-primary">الحمل</span>
              </h2>
              <p className="text-muted-foreground text-sm">تابعي تطور حملك من الأسبوع الأول حتى الأربعين</p>
            </div>
            <Link href="/pregnancy" className="text-primary text-sm font-medium flex items-center gap-1" data-testid="link-view-all-weeks">
              عرض جميع الأسابيع
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3">
            {weeks.slice(0, 10).map((week) => (
              <Link key={week.slug} href={`/pregnancy/${week.slug}`}>
                <Card className="p-4 hover-elevate h-full" data-testid={`card-week-${week.weekNumber}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${trimesterColors[week.trimester]}`}>
                      {week.trimester === 1 ? "الأول" : week.trimester === 2 ? "الثاني" : "الثالث"}
                    </span>
                  </div>
                  <p className="text-lg font-bold text-foreground mb-1">الأسبوع {week.weekNumber}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{week.fetusSize.comparison}</p>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <HowItWorks />
      <Stats />
      <Testimonials />

      <section className="py-16 md:py-24 bg-card/50" data-testid="section-home-faq">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
              الأسئلة <span className="text-primary">الشائعة</span>
            </h2>
          </div>
          <FAQAccordion items={homeFAQ} />
        </div>
      </section>

      <CTABanner />
    </div>
  );
}
