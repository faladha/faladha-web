import { Link } from "wouter";
import { ChevronLeft } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="مسار التصفح" className="mb-6" data-testid="breadcrumbs">
      <ol className="flex items-center flex-wrap gap-1 text-sm text-muted-foreground">
        <li>
          <Link href="/" className="transition-colors" data-testid="breadcrumb-home">
            الرئيسية
          </Link>
        </li>
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1">
            <ChevronLeft className="w-3.5 h-3.5 shrink-0" />
            {item.href ? (
              <Link href={item.href} className="transition-colors" data-testid={`breadcrumb-${i}`}>
                {item.label}
              </Link>
            ) : (
              <span className="text-foreground font-medium" data-testid={`breadcrumb-current-${i}`}>{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
