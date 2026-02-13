import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BreadcrumbJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "سياسة الخصوصية - فلذة",
  description: "سياسة الخصوصية لتطبيق فلذة. تعرّفي على كيفية جمع واستخدام وحماية بياناتك الشخصية.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8" dir="rtl">
      <BreadcrumbJsonLd items={[{ name: "الرئيسية", url: "/" }, { name: "سياسة الخصوصية", url: "/privacy" }]} />
      <Breadcrumbs items={[{ label: "سياسة الخصوصية" }]} />

      <h1 className="text-3xl font-bold text-foreground mb-6" data-testid="text-h1-privacy">سياسة الخصوصية</h1>
      <p className="text-muted-foreground mb-8 leading-relaxed">
        آخر تحديث: فبراير 2026. نلتزم في فلذة بحماية خصوصيتك وبياناتك الشخصية. توضح هذه السياسة كيفية جمع واستخدام وحماية المعلومات التي تقدمينها لنا.
      </p>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-foreground mb-3">1. المعلومات التي نجمعها</h2>
        <p className="text-muted-foreground mb-3 leading-relaxed">
          نقوم بجمع أنواع محددة من المعلومات لتقديم خدمة أفضل لك:
        </p>
        <ul className="space-y-2 text-muted-foreground mr-4">
          <li>• <strong className="text-foreground">المعلومات الشخصية:</strong> مثل الاسم والبريد الإلكتروني عند التسجيل في التطبيق.</li>
          <li>• <strong className="text-foreground">المعلومات الصحية:</strong> مثل تاريخ آخر دورة شهرية وموعد الولادة المتوقع لتقديم محتوى مخصص.</li>
          <li>• <strong className="text-foreground">بيانات الاستخدام:</strong> معلومات حول كيفية استخدامك للتطبيق لتحسين تجربة المستخدم.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-foreground mb-3">2. كيفية استخدام المعلومات</h2>
        <p className="text-muted-foreground mb-3 leading-relaxed">نستخدم المعلومات التي نجمعها للأغراض التالية:</p>
        <ul className="space-y-2 text-muted-foreground mr-4">
          <li>• تقديم محتوى مخصص يتناسب مع مرحلة حملك الحالية.</li>
          <li>• إرسال إشعارات وتذكيرات مهمة متعلقة بصحتك وصحة جنينك.</li>
          <li>• تحسين خدماتنا ومحتوانا بناءً على أنماط الاستخدام.</li>
          <li>• التواصل معك بشأن التحديثات والمستجدات المهمة.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-foreground mb-3">3. حماية البيانات</h2>
        <p className="text-muted-foreground leading-relaxed">
          نتخذ إجراءات أمنية صارمة لحماية بياناتك الشخصية من الوصول غير المصرح به أو التعديل أو الإفشاء أو الإتلاف. نستخدم تقنيات التشفير المتقدمة ونلتزم بأعلى معايير أمن المعلومات لضمان سرية بياناتك.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-foreground mb-3">4. مشاركة المعلومات مع أطراف ثالثة</h2>
        <p className="text-muted-foreground leading-relaxed">
          لا نقوم ببيع أو تأجير أو مشاركة بياناتك الشخصية مع أطراف ثالثة لأغراض تسويقية. قد نشارك معلومات مجمّعة وغير محددة الهوية مع شركائنا لأغراض تحليلية وتحسين الخدمة.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-foreground mb-3">5. حقوقك</h2>
        <p className="text-muted-foreground mb-3 leading-relaxed">يحق لك في أي وقت:</p>
        <ul className="space-y-2 text-muted-foreground mr-4">
          <li>• الوصول إلى بياناتك الشخصية المخزنة لدينا.</li>
          <li>• طلب تصحيح أو تحديث بياناتك.</li>
          <li>• طلب حذف بياناتك الشخصية من أنظمتنا.</li>
          <li>• سحب موافقتك على معالجة بياناتك في أي وقت.</li>
          <li>• تقديم شكوى إلى الجهة الرقابية المختصة.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-foreground mb-3">6. ملفات تعريف الارتباط (Cookies)</h2>
        <p className="text-muted-foreground leading-relaxed">
          نستخدم ملفات تعريف الارتباط وتقنيات مشابهة لتحسين تجربتك على موقعنا. يمكنك التحكم في إعدادات ملفات تعريف الارتباط من خلال متصفحك. يرجى ملاحظة أن تعطيل بعض ملفات تعريف الارتباط قد يؤثر على وظائف الموقع.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-foreground mb-3">7. التعديلات على سياسة الخصوصية</h2>
        <p className="text-muted-foreground leading-relaxed">
          نحتفظ بالحق في تعديل هذه السياسة في أي وقت. سنقوم بإخطارك بأي تغييرات جوهرية عبر البريد الإلكتروني أو من خلال إشعار بارز في التطبيق. ننصحك بمراجعة هذه السياسة بشكل دوري للاطلاع على أي تحديثات.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-foreground mb-3">8. التواصل معنا</h2>
        <p className="text-muted-foreground leading-relaxed">
          إذا كانت لديك أي أسئلة أو استفسارات حول سياسة الخصوصية هذه أو ممارساتنا المتعلقة بالبيانات، يمكنك التواصل معنا عبر صفحة <a href="/contact" className="text-primary hover:underline">اتصل بنا</a>.
        </p>
      </section>
    </div>
  );
}
