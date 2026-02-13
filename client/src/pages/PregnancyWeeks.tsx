import { Link } from "wouter";
import { useSeoMeta } from "@/hooks/useSeoMeta";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import CTABanner from "@/components/sections/CTABanner";

const trimesterLabels: Record<number, string> = { 1: "الثلث الأول (1-13)", 2: "الثلث الثاني (14-27)", 3: "الثلث الثالث (28-40)" };
const trimesterColors: Record<number, string> = {
  1: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800",
  2: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800",
  3: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-800",
};
const trimesterBadge: Record<number, string> = {
  1: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  2: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  3: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
};

export default function PregnancyWeeks() {
  useSeoMeta({
    title: "أسابيع الحمل من الأول للأربعين | متابعة الحمل أسبوعًا بأسبوع – فلذة",
    description: "تابعي تطور حملك أسبوعًا بأسبوع. معلومات مفصلة عن كل أسبوع من الأسبوع الأول حتى الأسبوع الأربعين، تطور الجنين، وأعراض الأم.",
    canonical: "/pregnancy",
    ogType: "website",
  });

  const { data: weeks = [], isLoading } = useQuery<any[]>({
    queryKey: ["/api/public/weeks"],
  });

  const grouped = [1, 2, 3].map(t => ({
    trimester: t,
    label: trimesterLabels[t],
    weeks: weeks.filter((w: any) => w.trimester === t),
  }));

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <Skeleton className="h-8 w-64 mb-4" />
        <Skeleton className="h-5 w-96 mb-10" />
        {[1, 2, 3].map(i => (
          <div key={i} className="mb-10">
            <Skeleton className="h-6 w-48 mb-5" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {Array.from({ length: 10 }).map((_, j) => (
                <Skeleton key={j} className="h-24 rounded-md" />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8" data-testid="page-pregnancy-weeks">
      <Breadcrumbs items={[{ label: "أسابيع الحمل" }]} />

      <div className="mb-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3" data-testid="text-pregnancy-title">
          أسابيع الحمل: دليلك الشامل من الأسبوع 1 إلى 40
        </h1>
        <p className="text-muted-foreground leading-relaxed max-w-3xl">
          تابعي رحلة حملك أسبوعًا بأسبوع. اكتشفي تطور جنينك والتغيرات في جسمك
          والنصائح المناسبة لكل مرحلة. محتوى طبي موثوق ومُراجع من متخصصين.
        </p>
      </div>

      {grouped.map(({ trimester, label, weeks: tw }) => (
        <section key={trimester} className="mb-10" data-testid={`section-trimester-${trimester}`}>
          <h2 className="text-xl font-bold text-foreground mb-5 flex items-center gap-2">
            <span className={`w-3 h-3 rounded-full ${trimester === 1 ? "bg-emerald-500" : trimester === 2 ? "bg-amber-500" : "bg-rose-500"}`} />
            {label}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {tw.map((week: any) => (
              <Link key={week.slug} href={`/pregnancy/${week.slug}`}>
                <Card className="p-4 hover-elevate h-full" data-testid={`card-week-${week.weekNumber}`}>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${trimesterBadge[week.trimester]}`}>
                    {week.fetusSize?.comparison}
                  </span>
                  <p className="text-lg font-bold text-foreground mt-2 mb-1">الأسبوع {week.weekNumber}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{week.title}</p>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      ))}

      <CTABanner />
    </div>
  );
}
