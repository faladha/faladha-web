import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { symptoms } from "@/data/symptoms";
import Breadcrumbs from "@/components/layout/Breadcrumbs";

export default function SymptomsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8" data-testid="page-symptoms">
      <Breadcrumbs items={[{ label: "أعراض الحمل" }]} />

      <div className="mb-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
          أعراض الحمل الشائعة: دليلك الشامل
        </h1>
        <p className="text-muted-foreground leading-relaxed max-w-3xl">
          تعرفي على أعراض الحمل الشائعة وأسبابها وطرق التعامل معها بأمان.
          كل عرض مشروح بالتفصيل مع نصائح عملية ومعلومات طبية موثوقة.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {symptoms.map(symptom => (
          <Link key={symptom.slug} href={`/symptoms/${symptom.slug}`}>
            <Card className="p-5 hover-elevate h-full" data-testid={`card-symptom-${symptom.slug}`}>
              <Badge variant="secondary" className="text-[10px] mb-3">
                {symptom.trimester}
              </Badge>
              <h2 className="font-semibold text-foreground mb-2 text-sm">{symptom.title}</h2>
              <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">{symptom.summary}</p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
