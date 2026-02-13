import { useParams, Link } from "wouter";
import { getSymptom } from "@/data/symptoms";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import MedicalDisclaimer from "@/components/sections/MedicalDisclaimer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Lightbulb, HelpCircle } from "lucide-react";
import NotFound from "./not-found";

export default function SymptomDetail() {
  const params = useParams<{ slug: string }>();
  const symptom = getSymptom(params.slug || "");
  if (!symptom) return <NotFound />;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8" data-testid="page-symptom-detail">
      <Breadcrumbs items={[
        { label: "أعراض الحمل", href: "/symptoms" },
        { label: symptom.title },
      ]} />

      <Badge variant="secondary" className="text-xs mb-4">{symptom.trimester}</Badge>

      <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3" data-testid="text-symptom-title">
        {symptom.title}
      </h1>
      <p className="text-muted-foreground leading-relaxed mb-8">{symptom.summary}</p>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-primary" /> الأسباب
        </h2>
        <ul className="space-y-2.5">
          {symptom.causes.map((c, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-foreground leading-relaxed">
              <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 shrink-0" /> {c}
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-emerald-500" /> نصائح للتخفيف
        </h2>
        <ul className="space-y-2.5">
          {symptom.remedies.map((r, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-foreground leading-relaxed">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mt-2 shrink-0" /> {r}
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-destructive" /> متى تستشيرين الطبيبة
        </h2>
        <Card className="p-5 border-destructive/20">
          <ul className="space-y-2">
            {symptom.whenToWorry.map((w, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-foreground leading-relaxed">
                <span className="w-1.5 h-1.5 bg-destructive rounded-full mt-2 shrink-0" /> {w}
              </li>
            ))}
          </ul>
        </Card>
      </section>

      {symptom.relatedWeeks.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-bold text-foreground mb-4">أسابيع مرتبطة</h2>
          <div className="flex flex-wrap gap-2">
            {symptom.relatedWeeks.slice(0, 8).map(w => (
              <Link key={w} href={`/pregnancy/week-${w}`}>
                <Badge variant="secondary" className="text-xs" data-testid={`badge-week-${w}`}>
                  الأسبوع {w}
                </Badge>
              </Link>
            ))}
          </div>
        </section>
      )}

      <MedicalDisclaimer />
    </div>
  );
}
