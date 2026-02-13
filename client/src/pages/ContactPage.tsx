import { useEffect } from "react";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { Card } from "@/components/ui/card";
import { Mail, MessageSquare, MapPin } from "lucide-react";

export default function ContactPage() {
  useEffect(() => {
    document.title = "تواصلي معنا | فلذة - متابعة الحمل";
    const m = document.querySelector('meta[name="description"]');
    if (m) m.setAttribute("content", "تواصلي مع فريق فلذة لأي استفسار أو اقتراح. نحن هنا لمساعدتك في رحلة حملك.");
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8" data-testid="page-contact">
      <Breadcrumbs items={[{ label: "تواصل معنا" }]} />

      <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
        تواصلي معنا
      </h1>
      <p className="text-muted-foreground leading-relaxed mb-8">
        نسعد بتواصلك معنا. اختاري الطريقة المناسبة لك.
      </p>

      <div className="grid sm:grid-cols-3 gap-4">
        <Card className="p-6 text-center">
          <Mail className="w-6 h-6 text-primary mx-auto mb-3" />
          <h3 className="font-semibold text-foreground mb-2 text-sm">البريد الإلكتروني</h3>
          <p className="text-xs text-muted-foreground">support@faladha.com</p>
        </Card>
        <Card className="p-6 text-center">
          <MessageSquare className="w-6 h-6 text-primary mx-auto mb-3" />
          <h3 className="font-semibold text-foreground mb-2 text-sm">الدعم الفني</h3>
          <p className="text-xs text-muted-foreground">متاح من الأحد إلى الخميس<br />9 صباحاً - 5 مساءً</p>
        </Card>
        <Card className="p-6 text-center">
          <MapPin className="w-6 h-6 text-primary mx-auto mb-3" />
          <h3 className="font-semibold text-foreground mb-2 text-sm">الموقع</h3>
          <p className="text-xs text-muted-foreground">الرياض، المملكة العربية السعودية</p>
        </Card>
      </div>
    </div>
  );
}
