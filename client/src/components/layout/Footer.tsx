import { Link } from "wouter";

const footerLinks = [
  {
    title: "أسابيع الحمل",
    links: [
      { href: "/pregnancy", label: "جميع الأسابيع" },
      { href: "/pregnancy/week-1", label: "الثلث الأول" },
      { href: "/pregnancy/week-14", label: "الثلث الثاني" },
      { href: "/pregnancy/week-28", label: "الثلث الثالث" },
    ],
  },
  {
    title: "أدوات وموارد",
    links: [
      { href: "/tools/due-date-calculator", label: "حاسبة موعد الولادة" },
      { href: "/symptoms", label: "أعراض الحمل" },
      { href: "/blog", label: "المدونة" },
      { href: "/faq", label: "الأسئلة الشائعة" },
    ],
  },
  {
    title: "عن فلذة",
    links: [
      { href: "/about", label: "من نحن" },
      { href: "/features", label: "المميزات" },
      { href: "/medical-review", label: "المراجعة الطبية" },
      { href: "/download", label: "حمّل التطبيق" },
    ],
  },
  {
    title: "قانوني",
    links: [
      { href: "/privacy", label: "سياسة الخصوصية" },
      { href: "/contact", label: "تواصل معنا" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border" data-testid="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-foreground mb-4 text-sm">{section.title}</h3>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-muted-foreground text-sm leading-relaxed" data-testid={`link-footer-${link.href.replace(/\//g, '-').slice(1)}`}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xs">ف</span>
              </div>
              <span className="font-bold text-foreground">فلذة</span>
            </div>
            <p className="text-muted-foreground text-xs text-center">
              جميع الحقوق محفوظة &copy; {new Date().getFullYear()} فلذة. المعلومات المقدمة إرشادية ولا تغني عن استشارة الطبيب.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
