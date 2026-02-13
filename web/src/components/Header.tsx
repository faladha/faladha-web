import Link from "next/link";
import { Baby, Calculator, BookOpen, Heart, Menu } from "lucide-react";

const navItems = [
  { label: "الرئيسية", href: "/" },
  { label: "حاسبة الحمل", href: "/tools/pregnancy-calculator", icon: Calculator },
  { label: "أسابيع الحمل", href: "/pregnancy", icon: Baby },
  { label: "الأعراض", href: "/symptoms", icon: Heart },
  { label: "المدونة", href: "/blog", icon: BookOpen },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 text-primary font-bold text-lg" data-testid="link-home-logo">
          <Baby className="w-6 h-6" />
          <span>فلذة</span>
        </Link>
        <nav className="hidden md:flex items-center gap-1" data-testid="nav-main">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground rounded-md transition-colors"
              data-testid={`link-nav-${item.href.replace(/\//g, "-").slice(1) || "home"}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
