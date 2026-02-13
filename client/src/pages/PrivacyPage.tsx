import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { useSeoMeta } from "@/hooks/useSeoMeta";

export default function PrivacyPage() {
  useSeoMeta({
    title: "سياسة الخصوصية | فلذة - متابعة الحمل",
    description: "سياسة الخصوصية لتطبيق فلذة. تعرّفي على كيفية حماية بياناتك الشخصية وحقوقك كمستخدمة.",
    canonical: "/privacy",
    ogType: "website",
  });

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8" data-testid="page-privacy">
      <Breadcrumbs items={[{ label: "سياسة الخصوصية" }]} />

      <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">
        سياسة الخصوصية
      </h1>

      <div className="space-y-6 text-sm text-foreground leading-relaxed">
        <section>
          <h2 className="text-lg font-bold mb-3">مقدمة</h2>
          <p>نحن في فلذة نقدر خصوصيتك ونلتزم بحماية بياناتك الشخصية. توضح هذه السياسة كيفية جمع واستخدام وحماية معلوماتك عند استخدام تطبيق وموقع فلذة.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold mb-3">البيانات التي نجمعها</h2>
          <p>نجمع فقط البيانات اللازمة لتقديم خدماتنا: معلومات الحمل الأساسية (تاريخ آخر دورة)، تفضيلات الاستخدام، وبيانات الحساب إن اخترت إنشاء واحد.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold mb-3">كيف نستخدم بياناتك</h2>
          <p>نستخدم بياناتك فقط لتخصيص تجربتك وتقديم المحتوى المناسب لمرحلة حملك. لا نبيع أو نشارك بياناتك مع أطراف ثالثة لأغراض تسويقية.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold mb-3">حماية البيانات</h2>
          <p>نستخدم أحدث تقنيات التشفير والأمان لحماية بياناتك. جميع البيانات مشفرة أثناء النقل والتخزين.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold mb-3">حقوقك</h2>
          <p>لديك الحق في الوصول لبياناتك، تعديلها، أو حذفها في أي وقت. يمكنك أيضاً طلب نسخة من بياناتك أو الانسحاب من أي خدمة.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold mb-3">تواصل معنا</h2>
          <p>إذا كان لديك أي استفسار حول سياسة الخصوصية، تواصلي معنا عبر صفحة الاتصال أو البريد الإلكتروني: privacy@faladha.com</p>
        </section>
      </div>
    </div>
  );
}
