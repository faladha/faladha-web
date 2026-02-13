import { Link, useLocation } from "wouter";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "/", label: "الرئيسية" },
  { href: "/pregnancy", label: "أسابيع الحمل" },
  { href: "/symptoms", label: "الأعراض" },
  { href: "/tools/due-date-calculator", label: "الأدوات" },
  { href: "/blog", label: "المدونة" },
  { href: "/faq", label: "الأسئلة الشائعة" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50" data-testid="header">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between gap-4 h-16">
          <Link href="/" className="flex items-center gap-2 shrink-0" data-testid="link-home-logo">
            <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">ف</span>
            </div>
            <span className="font-bold text-lg text-foreground">فلذة</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1" data-testid="nav-desktop">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} data-testid={`link-nav-${link.href.replace(/\//g, '')}`}>
                <span className={`px-3 py-2 rounded-md text-sm transition-colors ${
                  location === link.href
                    ? "text-primary font-semibold"
                    : "text-muted-foreground"
                }`}>
                  {link.label}
                </span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link href="/download">
              <Button size="sm" data-testid="button-download-header">
                حمّل التطبيق
              </Button>
            </Link>
            <Button
              size="icon"
              variant="ghost"
              className="md:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              data-testid="button-mobile-menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-border/50 bg-background" data-testid="nav-mobile">
          <nav className="flex flex-col p-4 gap-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)} data-testid={`link-mobile-${link.href.replace(/\//g, '')}`}>
                <span className={`block px-4 py-3 rounded-md text-sm transition-colors ${
                  location === link.href
                    ? "bg-primary/10 text-primary font-semibold"
                    : "text-muted-foreground"
                }`}>
                  {link.label}
                </span>
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
