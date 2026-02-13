import { AlertTriangle } from "lucide-react";

export default function MedicalDisclaimer() {
  return (
    <div className="bg-muted/50 border border-border rounded-md p-4 mt-8" data-testid="medical-disclaimer">
      <div className="flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-foreground mb-1">تنبيه طبي</p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            المعلومات المقدمة في هذه الصفحة إرشادية وتثقيفية ولا تغني عن استشارة
            الطبيب المختص. استشيري طبيبتك دائماً قبل اتخاذ أي قرار يتعلق بصحتك
            أو صحة جنينك.
          </p>
        </div>
      </div>
    </div>
  );
}
