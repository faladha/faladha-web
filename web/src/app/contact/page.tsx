import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "اتصل بنا",
  description: "تواصلي معنا لأي استفسار أو اقتراح. فريق فلذة جاهز لمساعدتك في أي وقت.",
  alternates: { canonical: `${SITE_URL}/contact` },
};

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8" dir="rtl">
      <BreadcrumbJsonLd items={[{ name: "الرئيسية", url: "/" }, { name: "اتصل بنا", url: "/contact" }]} />
      <Breadcrumbs items={[{ label: "اتصل بنا" }]} />

      <h1 className="text-3xl font-bold text-foreground mb-6" data-testid="text-h1-contact">اتصل بنا</h1>
      <p className="text-muted-foreground mb-8 leading-relaxed">
        يسعدنا تواصلك معنا! سواء كان لديك سؤال، اقتراح، أو ملاحظة، فريقنا جاهز لمساعدتك. يمكنك استخدام النموذج أدناه أو التواصل معنا عبر وسائل التواصل المتاحة.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section>
          <h2 className="text-xl font-bold text-foreground mb-4">أرسلي رسالة</h2>
          <form className="space-y-4" data-testid="form-contact">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">الاسم</label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="اسمك الكريم"
                data-testid="input-name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">البريد الإلكتروني</label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="example@email.com"
                dir="ltr"
                data-testid="input-email"
              />
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-1">الموضوع</label>
              <input
                type="text"
                id="subject"
                name="subject"
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="موضوع الرسالة"
                data-testid="input-subject"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1">الرسالة</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                placeholder="اكتبي رسالتك هنا..."
                data-testid="input-message"
              />
            </div>
            <button
              type="submit"
              className="bg-primary text-primary-foreground px-6 py-2 rounded-md font-medium hover:opacity-90 transition-opacity"
              data-testid="button-submit-contact"
            >
              إرسال الرسالة
            </button>
          </form>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-4">معلومات التواصل</h2>
          <div className="space-y-4 text-muted-foreground">
            <div>
              <h3 className="font-semibold text-foreground mb-1">البريد الإلكتروني</h3>
              <p dir="ltr" className="text-start">support@faladha.com</p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">وسائل التواصل الاجتماعي</h3>
              <p>تابعينا على منصات التواصل الاجتماعي للحصول على آخر التحديثات والنصائح الصحية.</p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">أوقات الرد</h3>
              <p>نسعى للرد على جميع الرسائل خلال 24-48 ساعة في أيام العمل.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
