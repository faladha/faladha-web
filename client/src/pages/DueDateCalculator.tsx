import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { Calculator, Calendar } from "lucide-react";

export default function DueDateCalculator() {
  useEffect(() => {
    document.title = "حاسبة موعد الولادة المتوقع بالهجري والميلادي | فلذة";
    const m = document.querySelector('meta[name="description"]');
    if (m) m.setAttribute("content", "احسبي موعد ولادتك المتوقع بدقة بالتاريخ الهجري والميلادي. أدخلي تاريخ آخر دورة شهرية واحصلي على النتيجة فورًا.");
  }, []);

  const [lmpDate, setLmpDate] = useState("");
  const [result, setResult] = useState<{ dueDate: string; currentWeek: number; daysLeft: number } | null>(null);

  const calculate = () => {
    if (!lmpDate) return;
    const lmp = new Date(lmpDate);
    const due = new Date(lmp);
    due.setDate(due.getDate() + 280);

    const today = new Date();
    const diffMs = today.getTime() - lmp.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const currentWeek = Math.min(40, Math.max(1, Math.floor(diffDays / 7) + 1));
    const daysLeft = Math.max(0, Math.ceil((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));

    setResult({
      dueDate: due.toLocaleDateString("ar-SA", { year: "numeric", month: "long", day: "numeric" }),
      currentWeek,
      daysLeft,
    });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8" data-testid="page-due-date-calculator">
      <Breadcrumbs items={[
        { label: "الأدوات", href: "/tools/due-date-calculator" },
        { label: "حاسبة موعد الولادة" },
      ]} />

      <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3" data-testid="text-tool-title">
        حاسبة موعد الولادة المتوقع
      </h1>
      <p className="text-muted-foreground leading-relaxed mb-8">
        أدخلي تاريخ أول يوم في آخر دورة شهرية لحساب موعد ولادتك المتوقع
        ومعرفة أسبوعك الحالي من الحمل.
      </p>

      <Card className="p-6 mb-8">
        <div className="flex items-center gap-2 mb-5">
          <Calculator className="w-5 h-5 text-primary" />
          <h2 className="font-semibold text-foreground">أدخلي البيانات</h2>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-foreground mb-2">تاريخ أول يوم في آخر دورة شهرية</label>
            <Input
              type="date"
              value={lmpDate}
              onChange={(e) => setLmpDate(e.target.value)}
              className="max-w-xs"
              data-testid="input-lmp-date"
            />
          </div>
          <Button onClick={calculate} className="gap-2" data-testid="button-calculate">
            <Calendar className="w-4 h-4" /> احسبي الآن
          </Button>
        </div>
      </Card>

      {result && (
        <div className="grid sm:grid-cols-3 gap-4" data-testid="calculator-results">
          <Card className="p-5 text-center bg-primary/5">
            <p className="text-xs text-muted-foreground mb-1">موعد الولادة المتوقع</p>
            <p className="font-bold text-foreground text-lg">{result.dueDate}</p>
          </Card>
          <Card className="p-5 text-center bg-primary/5">
            <p className="text-xs text-muted-foreground mb-1">الأسبوع الحالي</p>
            <p className="font-bold text-primary text-2xl">{result.currentWeek}</p>
          </Card>
          <Card className="p-5 text-center bg-primary/5">
            <p className="text-xs text-muted-foreground mb-1">أيام متبقية</p>
            <p className="font-bold text-foreground text-2xl">{result.daysLeft}</p>
          </Card>
        </div>
      )}
    </div>
  );
}
