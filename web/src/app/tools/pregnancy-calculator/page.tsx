import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BreadcrumbJsonLd, FAQJsonLd, JsonLd } from "@/components/JsonLd";
import { MedicalDisclaimer } from "@/components/MedicalDisclaimer";
import { SITE_URL, SITE_NAME } from "@/lib/constants";
import { CalculatorWidget } from "@/components/CalculatorWidget";

export const metadata: Metadata = {
  title: {
    absolute: "حاسبة الحمل الدقيقة بالهجري والميلادي - احسبي موعد ولادتك | فلذة",
  },
  description: "حاسبة الحمل بالهجري والميلادي الأكثر دقة. احسبي موعد الولادة المتوقع، عمر الحمل بالأسابيع والأيام، والثلث الحالي. تدعم التقويمين الهجري والميلادي.",
  alternates: { canonical: `${SITE_URL}/tools/pregnancy-calculator` },
  openGraph: {
    title: "حاسبة الحمل الدقيقة بالهجري والميلادي - احسبي موعد ولادتك | فلذة",
    description: "احسبي موعد ولادتك المتوقع بدقة باستخدام حاسبة الحمل بالهجري والميلادي",
    url: `${SITE_URL}/tools/pregnancy-calculator`,
  },
};

const faqItems = [
  { question: "كيف أستخدم حاسبة الحمل؟", answer: "أدخلي تاريخ أول يوم من آخر دورة شهرية واختاري نوع التقويم (هجري أو ميلادي)، ثم اضغطي احسبي للحصول على النتائج." },
  { question: "هل حاسبة الحمل بالهجري دقيقة؟", answer: "نعم، حاسبة فلذة تستخدم خوارزمية دقيقة لتحويل التاريخ الهجري إلى الميلادي لحساب عمر الحمل وموعد الولادة." },
  { question: "ما الفرق بين حاسبة الحمل بالهجري والميلادي؟", answer: "الفرق فقط في طريقة إدخال التاريخ. كلاهما يعطي نفس النتيجة لأن الحساب يعتمد على عدد الأيام من آخر دورة." },
  { question: "كيف يُحسب موعد الولادة؟", answer: "يُحسب موعد الولادة بإضافة 280 يومًا (40 أسبوعًا) إلى تاريخ أول يوم من آخر دورة شهرية. هذه هي قاعدة نيغلي المعتمدة طبيًا." },
  { question: "هل يمكن أن يتغير موعد الولادة؟", answer: "نعم، الموعد المحسوب تقريبي. الفحص بالموجات فوق الصوتية في الثلث الأول هو الأدق لتحديد عمر الحمل." },
  { question: "ما هي أثلاث الحمل؟", answer: "ينقسم الحمل إلى ثلاثة أثلاث: الأول (الأسابيع 1-13)، الثاني (الأسابيع 14-26)، الثالث (الأسابيع 27-40)." },
  { question: "كيف أعرف في أي شهر أنا؟", answer: "قسّمي عدد أسابيع الحمل على 4.3 تقريبًا. الشهر الأول يبدأ من الأسبوع 1-4، الثاني من 5-8، وهكذا." },
  { question: "هل يمكنني استخدام الحاسبة في حالة الحمل بتوائم؟", answer: "نعم، لكن يجب العلم أن الحمل بتوائم عادةً ينتهي أبكر (حوالي الأسبوع 37). استشيري طبيبتك." },
];

export default function PregnancyCalculatorPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <BreadcrumbJsonLd items={[
        { name: "الرئيسية", url: "/" },
        { name: "حاسبة الحمل", url: "/tools/pregnancy-calculator" },
      ]} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "حاسبة الحمل بالهجري والميلادي",
        description: "حاسبة الحمل الدقيقة بالهجري والميلادي من فلذة",
        url: `${SITE_URL}/tools/pregnancy-calculator`,
        applicationCategory: "HealthApplication",
        operatingSystem: "Web",
        offers: { "@type": "Offer", price: "0", priceCurrency: "SAR" },
        author: { "@type": "Organization", name: SITE_NAME },
      }} />
      <FAQJsonLd items={faqItems} />

      <Breadcrumbs items={[{ label: "حاسبة الحمل" }]} />

      <h1 className="text-3xl font-bold text-foreground mb-4" data-testid="text-h1-calculator">
        حاسبة الحمل الدقيقة بالهجري والميلادي
      </h1>
      <p className="text-muted-foreground mb-8 max-w-2xl">
        احسبي موعد ولادتك المتوقع وعمر حملك بالأسابيع والأيام. تدعم الحاسبة التقويمين الهجري والميلادي مع نتائج دقيقة وتفصيلية.
      </p>

      <CalculatorWidget />

      {/* SEO Content */}
      <div className="mt-12 space-y-8">
        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">كيف تعمل حاسبة الحمل؟</h2>
          <p className="text-muted-foreground leading-relaxed">
            تعتمد حاسبة الحمل على قاعدة نيغلي (Naegele's Rule) المعتمدة طبيًا لحساب موعد الولادة المتوقع. يتم إضافة 280 يومًا (40 أسبوعًا) إلى تاريخ أول يوم من آخر دورة شهرية. هذه الطريقة تفترض أن الدورة الشهرية منتظمة كل 28 يومًا وأن الإباضة تحدث في اليوم 14.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">حاسبة الحمل بالهجري</h2>
          <p className="text-muted-foreground leading-relaxed">
            حاسبة الحمل بالهجري مصممة خصيصًا للأمهات اللواتي يفضّلن استخدام التقويم الهجري. أدخلي تاريخ آخر دورة بالهجري وستحصلين على موعد الولادة المتوقع بالتقويمين الهجري والميلادي، مع عرض عمر الحمل الحالي والثلث الذي تمرّين به.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">حاسبة الحمل بالميلادي</h2>
          <p className="text-muted-foreground leading-relaxed">
            حاسبة الحمل بالميلادي توفر نفس الدقة والمعلومات ولكن باستخدام التقويم الميلادي. مناسبة لمن يتعاملن مع التاريخ الميلادي في حياتهن اليومية. النتيجة تشمل موعد الولادة وعمر الحمل بالأسابيع والأيام.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">مراحل الحمل الثلاث</h2>
          <p className="text-muted-foreground leading-relaxed">
            ينقسم الحمل إلى ثلاثة أثلاث: الثلث الأول (الأسابيع 1-13) حيث تتشكل أعضاء الجنين الرئيسية، الثلث الثاني (الأسابيع 14-26) وهو الأكثر راحة للأم وفيه ينمو الجنين بسرعة، والثلث الثالث (الأسابيع 27-40) حيث يكتسب الجنين الوزن ويستعد للولادة.
          </p>
        </section>
      </div>

      {/* FAQ */}
      <section className="mt-12">
        <h2 className="text-xl font-bold text-foreground mb-4">الأسئلة الشائعة عن حاسبة الحمل</h2>
        <div className="space-y-3">
          {faqItems.map((faq, i) => (
            <details key={i} className="border border-border rounded-md" data-testid={`faq-calc-${i}`}>
              <summary className="cursor-pointer p-4 font-semibold text-foreground hover:text-primary transition-colors text-sm">
                {faq.question}
              </summary>
              <div className="px-4 pb-4 text-muted-foreground text-sm leading-relaxed">{faq.answer}</div>
            </details>
          ))}
        </div>
      </section>

      <MedicalDisclaimer />
    </div>
  );
}
