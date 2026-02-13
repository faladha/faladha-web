import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card py-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-foreground mb-3">أدوات الحمل</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/tools/pregnancy-calculator" className="hover:text-foreground">حاسبة الحمل</Link></li>
              <li><Link href="/pregnancy" className="hover:text-foreground">أسابيع الحمل</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-foreground mb-3">المحتوى</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/symptoms" className="hover:text-foreground">أعراض الحمل</Link></li>
              <li><Link href="/blog" className="hover:text-foreground">المدونة</Link></li>
              <li><Link href="/faq" className="hover:text-foreground">الأسئلة الشائعة</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-foreground mb-3">عن فلذة</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-foreground">عن التطبيق</Link></li>
              <li><Link href="/features" className="hover:text-foreground">المميزات</Link></li>
              <li><Link href="/medical-review" className="hover:text-foreground">المراجعة الطبية</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-foreground mb-3">قانوني</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/privacy" className="hover:text-foreground">سياسة الخصوصية</Link></li>
              <li><Link href="/contact" className="hover:text-foreground">اتصل بنا</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border pt-6 text-center text-sm text-muted-foreground">
          <p>جميع الحقوق محفوظة &copy; {new Date().getFullYear()} فلذة</p>
          <p className="mt-1">المعلومات المقدمة لأغراض تثقيفية فقط وليست بديلاً عن الاستشارة الطبية.</p>
        </div>
      </div>
    </footer>
  );
}
