import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - الصفحة غير موجودة",
  description: "عذرًا، الصفحة التي تبحثين عنها غير موجودة أو تم نقلها.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20 text-center">
      <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
      <h2 className="text-2xl font-bold text-foreground mb-4">الصفحة غير موجودة</h2>
      <p className="text-muted-foreground mb-8">عذرًا، الصفحة التي تبحثين عنها غير موجودة أو تم نقلها.</p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-md font-semibold hover:opacity-90 transition-opacity"
        data-testid="link-back-home"
      >
        العودة للرئيسية
      </Link>
    </div>
  );
}
