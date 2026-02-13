import { useEffect } from "react";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import FAQAccordion from "@/components/sections/FAQAccordion";

const faqCategories = [
  {
    title: "عن تطبيق فلذة",
    items: [
      { question: "ما هو تطبيق فلذة؟", answer: "فلذة هو تطبيق عربي شامل لمتابعة الحمل أسبوعًا بأسبوع. يقدم معلومات طبية موثوقة عن تطور الجنين وصحة الأم، مع أدوات ذكية كحاسبة موعد الولادة ومتابعة حركة الجنين." },
      { question: "هل تطبيق فلذة مجاني؟", answer: "نعم، تطبيق فلذة مجاني بالكامل مع إمكانية الاشتراك في النسخة المميزة للحصول على ميزات إضافية متقدمة." },
      { question: "على أي أجهزة يتوفر فلذة؟", answer: "يتوفر فلذة على أجهزة iPhone عبر App Store وأجهزة Android عبر Google Play." },
      { question: "هل يحتاج فلذة اتصال بالإنترنت؟", answer: "يمكنك تصفح المحتوى الأساسي بدون إنترنت بعد تحميله أول مرة. بعض الميزات كالمزامنة والتحديثات تحتاج اتصالاً." },
    ]
  },
  {
    title: "الحمل والصحة",
    items: [
      { question: "هل المعلومات في فلذة موثوقة طبياً؟", answer: "نعم، جميع المعلومات مُعدة بعناية ومراجعة من فريق طبي متخصص. نلتزم بأحدث المراجع الطبية العالمية." },
      { question: "هل يمكن أن يحل فلذة محل زيارة الطبيب؟", answer: "لا، فلذة أداة تثقيفية وإرشادية ولا يغني عن المتابعة الطبية المنتظمة. استشيري طبيبتك دائماً لأي قرار طبي." },
      { question: "كيف أحسب أسبوع حملي؟", answer: "يُحسب الحمل من أول يوم في آخر دورة شهرية. يمكنك استخدام حاسبة موعد الولادة في فلذة لمعرفة أسبوعك الحالي بدقة." },
      { question: "متى يجب أن أبدأ بمتابعة حملي؟", answer: "يُنصح ببدء المتابعة الطبية فور معرفتك بالحمل. يمكنك البدء باستخدام فلذة في أي أسبوع من حملك." },
    ]
  },
  {
    title: "الخصوصية والأمان",
    items: [
      { question: "هل بياناتي آمنة في فلذة؟", answer: "نعم، نلتزم بأعلى معايير حماية البيانات. جميع بياناتك مشفرة ولا نشاركها مع أطراف ثالثة." },
      { question: "هل يمكنني حذف حسابي وبياناتي؟", answer: "نعم، يمكنك حذف حسابك وجميع بياناتك في أي وقت من إعدادات التطبيق. الحذف نهائي ولا يمكن التراجع عنه." },
    ]
  },
];

export default function FAQPage() {
  useEffect(() => {
    document.title = "الأسئلة الشائعة عن الحمل والولادة | فلذة";
    const m = document.querySelector('meta[name="description"]');
    if (m) m.setAttribute("content", "إجابات على أكثر الأسئلة شيوعًا عن الحمل والولادة والأمومة. معلومات طبية موثوقة من فريق فلذة المتخصص.");
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8" data-testid="page-faq">
      <Breadcrumbs items={[{ label: "الأسئلة الشائعة" }]} />

      <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
        الأسئلة الشائعة عن فلذة
      </h1>
      <p className="text-muted-foreground leading-relaxed mb-10">
        أجوبة على أكثر الأسئلة شيوعاً حول تطبيق فلذة ومتابعة الحمل.
      </p>

      {faqCategories.map((cat, i) => (
        <section key={i} className="mb-8">
          <h2 className="text-lg font-bold text-foreground mb-4">{cat.title}</h2>
          <FAQAccordion items={cat.items} />
        </section>
      ))}
    </div>
  );
}
