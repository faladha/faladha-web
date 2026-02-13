import { ShieldCheck } from "lucide-react";

export function MedicalDisclaimer() {
  return (
    <div className="border border-border rounded-md p-4 bg-card text-sm text-muted-foreground mt-8" data-testid="medical-disclaimer">
      <div className="flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-primary mt-0.5 shrink-0" />
        <div>
          <p className="font-semibold text-foreground mb-1">إخلاء مسؤولية طبية</p>
          <p>المعلومات المقدمة في هذا الموقع لأغراض تثقيفية فقط وليست بديلاً عن الاستشارة الطبية المتخصصة. استشيري طبيبتك دائماً بشأن حالتك الصحية.</p>
        </div>
      </div>
    </div>
  );
}
