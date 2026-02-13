import { Link } from "wouter";

const tools = [
  {
    title: "المتجر والمنتجات",
    description: "تسوّقي منتجات الحمل والأمومة المختارة بعناية مع توصيل سريع وأسعار مناسبة",
    href: "/download",
    delay: "0s",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10" aria-hidden="true">
        <rect x="6" y="18" width="36" height="24" rx="4" stroke="currentColor" strokeWidth="2.5" />
        <path d="M6 24h36" stroke="currentColor" strokeWidth="2" opacity=".3" />
        <path d="M16 6l-10 12h36L32 6" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" fill="none" />
        <circle cx="20" cy="33" r="2.5" fill="currentColor" opacity=".5" />
        <circle cx="28" cy="33" r="2.5" fill="currentColor" opacity=".5" />
        <path d="M18 36h12" stroke="currentColor" strokeWidth="1.5" opacity=".3" />
      </svg>
    ),
  },
  {
    title: "حاسبة الحمل",
    description: "احسبي موعد ولادتك بالهجري والميلادي وتابعي أسبوعك الحالي بدقة",
    href: "/tools/pregnancy-calculator",
    delay: "0.8s",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10" aria-hidden="true">
        <rect x="8" y="4" width="32" height="40" rx="5" stroke="currentColor" strokeWidth="2.5" />
        <rect x="12" y="9" width="24" height="10" rx="2" fill="currentColor" opacity=".12" />
        <circle cx="17" cy="27" r="2" fill="currentColor" opacity=".45" />
        <circle cx="24" cy="27" r="2" fill="currentColor" opacity=".45" />
        <circle cx="31" cy="27" r="2" fill="currentColor" opacity=".45" />
        <circle cx="17" cy="34" r="2" fill="currentColor" opacity=".45" />
        <circle cx="24" cy="34" r="2" fill="currentColor" opacity=".45" />
        <rect x="28" y="32" width="6" height="4" rx="1" fill="currentColor" opacity=".65" />
      </svg>
    ),
  },
  {
    title: "الصيدلية",
    description: "أدوية ومكملات الحمل الآمنة مع معلومات طبية موثوقة عن كل منتج",
    href: "/download",
    delay: "1.6s",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10" aria-hidden="true">
        <rect x="10" y="8" width="28" height="32" rx="5" stroke="currentColor" strokeWidth="2.5" />
        <path d="M24 18v12M18 24h12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M16 8V5a1 1 0 011-1h14a1 1 0 011 1v3" stroke="currentColor" strokeWidth="2" opacity=".4" />
      </svg>
    ),
  },
  {
    title: "الاستشارات الطبية",
    description: "تواصلي مع طبيبات متخصصات في الحمل والولادة للحصول على إجابات فورية",
    href: "/download",
    delay: "2.4s",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10" aria-hidden="true">
        <circle cx="24" cy="16" r="8" stroke="currentColor" strokeWidth="2.5" />
        <path d="M24 12v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity=".5" />
        <path d="M20 16h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity=".5" />
        <path d="M8 42c0-8.837 7.163-16 16-16s16 7.163 16 16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M20 38h8v2a1 1 0 01-1 1h-6a1 1 0 01-1-1v-2z" fill="currentColor" opacity=".15" />
      </svg>
    ),
  },
];

export default function AppToolsCards() {
  return (
    <div className="tools-cards-grid" data-testid="tools-cards">
      {tools.map((tool, i) => (
        <Link key={i} href={tool.href}>
          <div
            className="tools-card"
            style={{ animationDelay: tool.delay }}
            data-testid={`tool-card-${i}`}
          >
            <div className="text-primary mb-3">{tool.icon}</div>
            <h3 className="font-bold text-foreground text-base mb-1.5">{tool.title}</h3>
            <p className="text-muted-foreground text-xs leading-relaxed">{tool.description}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
