import Hero from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import HowItWorks from "@/components/sections/HowItWorks";
import Stats from "@/components/sections/Stats";
import Testimonials from "@/components/sections/Testimonials";
import CTABanner from "@/components/sections/CTABanner";
import FAQAccordion from "@/components/sections/FAQAccordion";
import { OrganizationJsonLd, WebSiteJsonLd, FAQJsonLd } from "@/components/seo/JsonLd";
import JsonLd from "@/components/seo/JsonLd";
import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Calculator, BookOpen, Download, CheckCircle } from "lucide-react";
import { useEffect } from "react";

const homeFAQ = [
  { question: "كيف أحسب حملي بحاسبة الحمل؟", answer: "أدخلي تاريخ أول يوم في آخر دورة شهرية في حاسبة الحمل، سواء بالتقويم الميلادي أو الهجري. ستحسب الأداة تلقائياً موعد الولادة المتوقع وعمر الحمل الحالي بالأسابيع والأيام والأشهر." },
  { question: "هل حاسبة الحمل بالهجري دقيقة؟", answer: "نعم، حاسبة الحمل بالهجري في فلذة تحول التاريخ الهجري إلى ميلادي بدقة ثم تحسب موعد الولادة والأسبوع الحالي. النتائج تُعرض بالتقويمين معاً لسهولة المتابعة." },
  { question: "ما هو تطبيق فلذة؟", answer: "فلذة هو تطبيق عربي شامل لمتابعة الحمل أسبوعًا بأسبوع. يقدم معلومات طبية موثوقة عن تطور الجنين وصحة الأم، مع أدوات ذكية كحاسبة الحمل ومتابعة حركة الجنين." },
  { question: "هل المعلومات في فلذة موثوقة طبياً؟", answer: "نعم، جميع المعلومات في فلذة مُعدّة بعناية ومراجعة من فريق طبي متخصص. نلتزم بأحدث المراجع الطبية العالمية مع تقديم المحتوى بلغة عربية سهلة ومفهومة." },
  { question: "هل التطبيق مجاني؟", answer: "نعم، تطبيق فلذة مجاني بالكامل مع إمكانية الاشتراك في النسخة المميزة للحصول على ميزات إضافية متقدمة." },
  { question: "كيف أعرف أسبوعي الحالي من الحمل؟", answer: "استخدمي حاسبة الحمل في فلذة وأدخلي تاريخ آخر دورة. ستعرض لك الأداة فوراً أسبوعك الحالي مع رابط مباشر لمعلومات تفصيلية عن هذا الأسبوع وتطور جنينك." },
  { question: "هل يمكنني استخدام حاسبة الحمل بالأسابيع والأشهر؟", answer: "نعم، حاسبة الحمل في فلذة تعرض عمر الحمل بالأسابيع والأيام (الطريقة الطبية) وبالأشهر (الطريقة الشائعة) معاً. كما تحدد الثلث الحالي من الحمل." },
  { question: "كيف أبدأ باستخدام فلذة؟", answer: "حمّلي التطبيق من متجر التطبيقات أو استخدمي حاسبة الحمل على الموقع مباشرة. أدخلي تاريخ آخر دورة وسيبدأ فلذة بتقديم محتوى مخصص لأسبوعك الحالي." },
];

const trimesterColors: Record<number, string> = {
  1: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  2: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  3: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
};

const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "حاسبة الحمل - فلذة",
  "url": "https://faladha.com",
  "description": "حاسبة الحمل الدقيقة بالهجري والميلادي مع متابعة الحمل أسبوعًا بأسبوع.",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "Web",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "SAR" },
  "inLanguage": "ar"
};

export default function Home() {
  const { data: weeks = [], isLoading } = useQuery<any[]>({
    queryKey: ["/api/public/weeks"],
  });

  useEffect(() => {
    document.title = "حاسبة الحمل الدقيقة بالهجري والميلادي | متابعة الحمل أسبوعًا بأسبوع – فلذة";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "احسبي موعد الولادة بدقة باستخدام حاسبة الحمل بالهجري والميلادي، وتابعي تطور حملك أسبوعًا بأسبوع مع فلذة. أدوات ذكية وجداول أسابيع الحمل من 1 إلى 40.");
  }, []);

  return (
    <div data-testid="page-home">
      <OrganizationJsonLd />
      <WebSiteJsonLd />
      <FAQJsonLd items={homeFAQ} />
      <JsonLd data={webAppJsonLd} />
      <Hero />

      <section className="py-16 md:py-20" data-testid="section-how-calculator-works">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">
            كيف تعمل <span className="text-primary">حاسبة الحمل</span>؟
          </h2>
          <div className="space-y-4 text-sm text-foreground leading-relaxed">
            <p>
              حاسبة الحمل هي أداة طبية معتمدة تُستخدم لتحديد موعد الولادة المتوقع وعمر الحمل الحالي. تعتمد على قاعدة نيغيلي الطبية التي تضيف 280 يوماً (40 أسبوعاً) إلى تاريخ أول يوم في آخر دورة شهرية. هذه الطريقة هي المعتمدة في جميع المستشفيات والعيادات حول العالم.
            </p>
            <p>
              عندما تستخدمين حاسبة الحمل في فلذة، تحصلين فوراً على معلومات شاملة: موعد الولادة المتوقع بالتقويمين الميلادي والهجري، عمر الحمل الحالي بالأسابيع والأيام، الشهر الحالي من الحمل، والثلث الذي أنتِ فيه. كما تعرض جدولاً بتواريخ بداية كل أسبوع قادم مع روابط مباشرة لمعلومات تفصيلية عن كل أسبوع.
            </p>
            <p>
              تتميز حاسبة الحمل في فلذة بدعم التقويم الهجري، مما يتيح للأمهات في المنطقة العربية إدخال تاريخ آخر دورة بالهجري مباشرة. الحاسبة تحول التاريخ تلقائياً وتعرض النتائج بالتقويمين. هذا يجعلها الأنسب للأمهات اللواتي يتابعن مواعيدهن بالتقويم الهجري.
            </p>
            <p>
              من المهم معرفة أن حاسبة الحمل تعطي تقديراً وليس موعداً ثابتاً - فقط 5% من الأطفال يولدون في الموعد المحدد. الطبيبة تستخدم أيضاً فحص الموجات فوق الصوتية لتأكيد عمر الحمل. استخدمي حاسبة الحمل كنقطة انطلاق، واعتمدي على المتابعة الطبية المنتظمة.
            </p>
          </div>
          <div className="mt-6">
            <Link href="/tools/pregnancy-calculator">
              <Button className="gap-2" data-testid="button-try-calculator">
                <Calculator className="w-4 h-4" /> جربي حاسبة الحمل الكاملة
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-card/50" data-testid="section-hijri-calc">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-5">
            حاسبة الحمل <span className="text-primary">بالهجري</span>
          </h2>
          <div className="space-y-3 text-sm text-foreground leading-relaxed">
            <p>
              حاسبة الحمل بالهجري خاصية فريدة تقدمها فلذة للأمهات في المنطقة العربية. يمكنك إدخال تاريخ آخر دورة شهرية بالتقويم الهجري مباشرة دون الحاجة للتحويل يدوياً. الأداة تحول التاريخ تلقائياً وتعرض جميع النتائج بالهجري والميلادي معاً.
            </p>
            <p>
              هذه الميزة مفيدة بشكل خاص للأمهات اللواتي يعتمدن التقويم الهجري في حياتهن اليومية أو يتابعن المواعيد الطبية بالتاريخ الهجري. جدول الأسابيع القادمة يُعرض أيضاً بالتاريخين لسهولة المتابعة والتخطيط.
            </p>
          </div>
          <div className="mt-5">
            <Link href="/tools/pregnancy-calculator">
              <Button variant="outline" className="gap-2" data-testid="link-hijri-calc">
                استخدمي حاسبة الحمل بالهجري <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16" data-testid="section-gregorian-calc">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-5">
            حاسبة الحمل <span className="text-primary">بالميلادي</span>
          </h2>
          <div className="space-y-3 text-sm text-foreground leading-relaxed">
            <p>
              حاسبة الحمل بالميلادي هي الطريقة الأكثر استخداماً عالمياً لحساب موعد الولادة. تعتمد على التقويم الميلادي الذي تستخدمه معظم الأنظمة الصحية. أدخلي تاريخ آخر دورة بالميلادي في الحقل المخصص وستحصلين على موعد الولادة المتوقع وعمر الحمل فوراً.
            </p>
            <p>
              النتائج تشمل: تاريخ الولادة المتوقع بالميلادي والهجري، عمر الحمل بالأسابيع والأيام والأشهر، الثلث الحالي، وجدول الأسابيع القادمة مع تواريخها. كل أسبوع مرتبط بصفحة تفصيلية عن تطور الجنين وصحة الأم.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-card/50" data-testid="section-weeks-months-calc">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-5">
            حاسبة الحمل <span className="text-primary">بالأسابيع والأشهر</span>
          </h2>
          <div className="space-y-3 text-sm text-foreground leading-relaxed">
            <p>
              يُقاس عمر الحمل طبياً بالأسابيع والأيام، لكن كثير من الأمهات يفضلن معرفة الشهر أيضاً. حاسبة الحمل في فلذة تعرض الاثنين معاً: مثلاً "الأسبوع 20 و3 أيام = الشهر الخامس". هذا يسهّل فهم مرحلة الحمل ومشاركة المعلومة مع العائلة والأصدقاء.
            </p>
            <p>
              تقسيم الأشهر: الشهور 1-3 (الثلث الأول)، 4-6 (الثلث الثاني)، 7-9 (الثلث الثالث). كل ثلث له خصائصه وأعراضه واحتياجاته الغذائية المختلفة. حاسبة فلذة تعرض لك الثلث الحالي مع نصائح مخصصة.
            </p>
          </div>
        </div>
      </section>

      <Features />

      <section className="py-16 md:py-24" data-testid="section-weeks-preview">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between gap-4 mb-4 flex-wrap">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                متابعة الحمل <span className="text-primary">أسبوعًا بأسبوع</span>
              </h2>
              <p className="text-muted-foreground text-sm">تابعي تطور جنينك وصحتك من الأسبوع الأول حتى الأربعين مع معلومات طبية مفصلة لكل أسبوع</p>
            </div>
            <Link href="/pregnancy" className="text-primary text-sm font-medium flex items-center gap-1" data-testid="link-view-all-weeks">
              عرض جميع الأسابيع
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>

          <div className="mb-6 flex gap-3 flex-wrap">
            <Badge variant="secondary" className="text-xs">الثلث الأول: الأسابيع 1-13</Badge>
            <Badge variant="secondary" className="text-xs">الثلث الثاني: الأسابيع 14-27</Badge>
            <Badge variant="secondary" className="text-xs">الثلث الثالث: الأسابيع 28-40</Badge>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3">
              {Array.from({ length: 20 }).map((_, i) => (
                <Skeleton key={i} className="h-24 rounded-md" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3">
              {weeks.map((week: any) => (
                <Link key={week.slug} href={`/pregnancy/${week.slug}`}>
                  <Card className="p-3 hover-elevate h-full" data-testid={`card-week-${week.weekNumber}`}>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${trimesterColors[week.trimester]}`}>
                        {week.trimester === 1 ? "الأول" : week.trimester === 2 ? "الثاني" : "الثالث"}
                      </span>
                    </div>
                    <p className="text-sm font-bold text-foreground mb-0.5">الأسبوع {week.weekNumber}</p>
                    <p className="text-[11px] text-muted-foreground leading-relaxed line-clamp-2">{week.fetusSize?.comparison}</p>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <HowItWorks />
      <Stats />
      <Testimonials />

      <section className="py-12 md:py-16 bg-card/50" data-testid="section-why-faladha">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">
            لماذا فلذة أفضل من <span className="text-primary">حاسبات الحمل</span> التقليدية؟
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { title: "دعم التقويم الهجري", desc: "حاسبة الحمل الوحيدة التي تدعم الإدخال بالهجري مع عرض النتائج بالتقويمين" },
              { title: "محتوى عربي أصلي", desc: "معلومات طبية مكتوبة خصيصاً بالعربية ومراجعة من متخصصين، وليست ترجمة حرفية" },
              { title: "متابعة أسبوعية شاملة", desc: "40 صفحة مفصلة عن كل أسبوع من الحمل مع تطور الجنين وأعراض الأم ونصائح عملية" },
              { title: "أدوات ذكية متعددة", desc: "حاسبة الحمل بالأسابيع والأشهر، جدول الأسابيع، متابعة الأعراض، ومعلومات طبية شاملة" },
              { title: "تصميم سهل الاستخدام", desc: "واجهة بسيطة ومريحة مصممة خصيصاً للأمهات الحوامل مع دعم كامل للعربية" },
              { title: "مجانية بالكامل", desc: "جميع الأدوات والمعلومات متاحة مجاناً دون إعلانات مزعجة أو اشتراكات إجبارية" },
            ].map((item, i) => (
              <Card key={i} className="p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground text-sm mb-1">{item.title}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24" data-testid="section-home-faq">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
              أسئلة شائعة عن <span className="text-primary">حاسبة الحمل</span>
            </h2>
          </div>
          <FAQAccordion items={homeFAQ} />
        </div>
      </section>

      <CTABanner />
    </div>
  );
}
