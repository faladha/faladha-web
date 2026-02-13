import Link from "next/link";
import type { Metadata } from "next";
import { Baby, Calculator, BookOpen, Heart, Calendar, Clock, CheckCircle, ArrowLeft } from "lucide-react";
import { getPublishedWeeks, getPublishedSymptoms, getPublishedBlogPosts } from "@/lib/data";
import { OrganizationJsonLd, WebSiteJsonLd, FAQJsonLd } from "@/components/JsonLd";
import { SITE_URL, SITE_NAME } from "@/lib/constants";
import { MedicalDisclaimer } from "@/components/MedicalDisclaimer";
import { PregnancyMiniCalculator } from "@/components/PregnancyMiniCalculator";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "حاسبة الحمل الدقيقة بالهجري والميلادي | فلذة - متابعة الحمل أسبوعًا بأسبوع",
  description: "حاسبة الحمل بالهجري والميلادي - تابعي حملك أسبوعًا بأسبوع مع فلذة. احسبي موعد الولادة المتوقع، تعرّفي على تطور الجنين والأعراض في كل أسبوع مع معلومات طبية موثوقة.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "حاسبة الحمل الدقيقة بالهجري والميلادي | فلذة",
    description: "حاسبة الحمل بالهجري والميلادي - تابعي حملك أسبوعًا بأسبوع",
    url: SITE_URL,
  },
};

const faqItems = [
  { question: "كيف أحسب الحمل بالهجري؟", answer: "يمكنك استخدام حاسبة فلذة التي تدعم التقويم الهجري والميلادي. أدخلي تاريخ آخر دورة شهرية بالهجري وستحصلين على موعد الولادة المتوقع." },
  { question: "كم عدد أسابيع الحمل؟", answer: "يستمر الحمل الطبيعي 40 أسبوعًا (280 يومًا) من تاريخ أول يوم في آخر دورة شهرية، وينقسم إلى ثلاثة أثلاث." },
  { question: "متى يبدأ نبض الجنين؟", answer: "يبدأ نبض قلب الجنين عادةً في الأسبوع السادس من الحمل، ويمكن سماعه بجهاز الموجات فوق الصوتية." },
  { question: "ما هي أعراض الحمل في الشهر الأول؟", answer: "تشمل أعراض الحمل المبكرة: تأخر الدورة الشهرية، الغثيان، التعب، حساسية الثدي، كثرة التبول." },
  { question: "كيف أعرف جنس الجنين؟", answer: "يمكن معرفة جنس الجنين عادةً بين الأسبوع 18-22 من الحمل عبر الموجات فوق الصوتية." },
  { question: "هل حاسبة الحمل دقيقة؟", answer: "حاسبة الحمل تعطي تقديرًا تقريبيًا لموعد الولادة. النتيجة الأكثر دقة تكون بالتأكيد عبر الفحص الطبي." },
];

const features = [
  { icon: Calculator, title: "حاسبة الحمل الدقيقة", description: "احسبي موعد ولادتك بالهجري والميلادي" },
  { icon: Calendar, title: "متابعة أسبوعية", description: "تابعي تطور جنينك أسبوعًا بأسبوع" },
  { icon: Heart, title: "معلومات طبية موثوقة", description: "محتوى مراجَع من متخصصين" },
  { icon: BookOpen, title: "مقالات شاملة", description: "نصائح وإرشادات لكل مرحلة من الحمل" },
];

export default async function HomePage() {
  const [weeks, symptoms, posts] = await Promise.all([
    getPublishedWeeks(),
    getPublishedSymptoms(),
    getPublishedBlogPosts(),
  ]);

  return (
    <>
      <OrganizationJsonLd />
      <WebSiteJsonLd />
      <FAQJsonLd items={faqItems} />

      {/* Hero */}
      <section className="relative bg-gradient-to-b from-primary/10 to-background py-16 md:py-24" data-testid="section-hero">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4 leading-tight" data-testid="text-h1-title">
            حاسبة الحمل الدقيقة بالهجري والميلادي
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            تابعي رحلة حملك أسبوعًا بأسبوع مع معلومات طبية موثوقة وأدوات ذكية لحساب موعد الولادة
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link
              href="/tools/pregnancy-calculator"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-md font-semibold hover:opacity-90 transition-opacity"
              data-testid="link-cta-calculator"
            >
              <Calculator className="w-5 h-5" />
              احسبي موعد ولادتك
            </Link>
            <Link
              href="/pregnancy"
              className="inline-flex items-center gap-2 border border-border px-6 py-3 rounded-md font-semibold hover:bg-accent transition-colors"
              data-testid="link-cta-weeks"
            >
              أسابيع الحمل
            </Link>
          </div>
        </div>
      </section>

      {/* Mini Calculator */}
      <section className="max-w-4xl mx-auto px-4 -mt-8 relative z-10" data-testid="section-mini-calculator">
        <PregnancyMiniCalculator />
      </section>

      {/* SEO H2 Sections */}
      <section className="max-w-6xl mx-auto px-4 py-16 space-y-12">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-4">حاسبة الحمل بالهجري</h2>
          <p className="text-muted-foreground leading-relaxed">
            حاسبة الحمل بالهجري من فلذة تمكّنك من حساب موعد الولادة المتوقع باستخدام التقويم الهجري. أدخلي تاريخ آخر دورة شهرية بالتقويم الهجري واحصلي على نتائج دقيقة تشمل عمر الحمل بالأسابيع والأيام، والثلث الحالي، وموعد الولادة المتوقع بالتقويمين الهجري والميلادي.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-4">حاسبة الحمل بالميلادي</h2>
          <p className="text-muted-foreground leading-relaxed">
            حاسبة الحمل بالميلادي تساعدك في تتبع حملك بدقة. أدخلي تاريخ أول يوم من آخر دورة شهرية بالتقويم الميلادي لمعرفة عمر الحمل الحالي وموعد الولادة المتوقع، مع تفاصيل عن تطور الجنين في كل أسبوع.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-4">حاسبة الحمل بالأسابيع والأشهر</h2>
          <p className="text-muted-foreground leading-relaxed">
            تابعي حملك بالأسابيع والأشهر مع فلذة. نوفر لك معلومات مفصلة عن كل أسبوع من أسابيع الحمل الأربعين، من حجم الجنين وتطوره إلى الأعراض المتوقعة ونصائح التغذية والعناية الصحية.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="bg-card py-16" data-testid="section-features">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center text-foreground mb-10">لماذا تختارين فلذة؟</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <div key={i} className="text-center p-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-md bg-primary/10 text-primary mb-4">
                  <f.icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Weeks Grid */}
      <section className="max-w-6xl mx-auto px-4 py-16" data-testid="section-weeks-grid">
        <div className="flex items-center justify-between mb-8 gap-4">
          <h2 className="text-2xl font-bold text-foreground">أسابيع الحمل</h2>
          <Link href="/pregnancy" className="text-primary text-sm hover:underline flex items-center gap-1">
            عرض الكل <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2">
          {weeks.slice(0, 40).map((w) => (
            <Link
              key={w.weekNumber}
              href={`/pregnancy/${w.slug}`}
              className="flex items-center justify-center h-10 rounded-md border border-border text-sm hover:bg-primary hover:text-primary-foreground transition-colors"
              data-testid={`link-week-${w.weekNumber}`}
            >
              {w.weekNumber}
            </Link>
          ))}
        </div>
      </section>

      {/* Latest Blog */}
      {posts.length > 0 && (
        <section className="bg-card py-16" data-testid="section-latest-blog">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-center justify-between mb-8 gap-4">
              <h2 className="text-2xl font-bold text-foreground">أحدث المقالات</h2>
              <Link href="/blog" className="text-primary text-sm hover:underline flex items-center gap-1">
                المزيد <ArrowLeft className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {posts.slice(0, 3).map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="group" data-testid={`link-blog-${post.slug}`}>
                  <div className="border border-border rounded-md p-5 h-full hover:border-primary/30 transition-colors">
                    <span className="text-xs text-primary font-semibold">{post.category}</span>
                    <h3 className="font-bold text-foreground mt-2 mb-2 group-hover:text-primary transition-colors">{post.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{post.summary}</p>
                    <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-4 py-16" data-testid="section-faq">
        <h2 className="text-2xl font-bold text-center text-foreground mb-8">الأسئلة الشائعة عن الحمل</h2>
        <div className="space-y-4">
          {faqItems.map((faq, i) => (
            <details key={i} className="border border-border rounded-md" data-testid={`faq-item-${i}`}>
              <summary className="cursor-pointer p-4 font-semibold text-foreground hover:text-primary transition-colors">
                {faq.question}
              </summary>
              <div className="px-4 pb-4 text-muted-foreground text-sm leading-relaxed">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 pb-8">
        <MedicalDisclaimer />
      </div>
    </>
  );
}
