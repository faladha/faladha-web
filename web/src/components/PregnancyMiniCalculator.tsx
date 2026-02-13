"use client";

import { useState } from "react";
import Link from "next/link";
import { Calculator, ArrowLeft } from "lucide-react";

export function PregnancyMiniCalculator() {
  const [lmpDate, setLmpDate] = useState("");
  const [result, setResult] = useState<{ weeks: number; days: number; dueDate: string; trimester: number } | null>(null);

  function calculate() {
    if (!lmpDate) return;
    const lmp = new Date(lmpDate);
    const now = new Date();
    const diff = now.getTime() - lmp.getTime();
    const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(totalDays / 7);
    const days = totalDays % 7;
    const dueDate = new Date(lmp);
    dueDate.setDate(dueDate.getDate() + 280);
    const trimester = weeks < 13 ? 1 : weeks < 27 ? 2 : 3;
    setResult({
      weeks,
      days,
      dueDate: dueDate.toLocaleDateString("ar-SA", { year: "numeric", month: "long", day: "numeric" }),
      trimester,
    });
  }

  return (
    <div className="bg-card border border-border rounded-md p-6 shadow-sm" data-testid="mini-calculator">
      <h3 className="font-bold text-foreground mb-4 text-center">احسبي عمر حملك بسرعة</h3>
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="flex-1 w-full">
          <label className="text-sm text-muted-foreground block mb-1">تاريخ آخر دورة (ميلادي)</label>
          <input
            type="date"
            value={lmpDate}
            onChange={(e) => setLmpDate(e.target.value)}
            className="w-full border border-border rounded-md px-3 py-2 bg-background text-foreground"
            data-testid="input-lmp-date"
          />
        </div>
        <button
          onClick={calculate}
          className="bg-primary text-primary-foreground px-6 py-2 rounded-md font-semibold hover:opacity-90 transition-opacity mt-5 sm:mt-0"
          data-testid="button-calculate"
        >
          احسبي
        </button>
      </div>
      {result && result.weeks >= 0 && result.weeks <= 42 && (
        <div className="mt-4 grid grid-cols-3 gap-3 text-center" data-testid="calculator-result">
          <div className="bg-primary/10 rounded-md p-3">
            <p className="text-2xl font-bold text-primary">{result.weeks}</p>
            <p className="text-xs text-muted-foreground">أسبوع و{result.days} أيام</p>
          </div>
          <div className="bg-primary/10 rounded-md p-3">
            <p className="text-2xl font-bold text-primary">{result.trimester}</p>
            <p className="text-xs text-muted-foreground">الثلث الحالي</p>
          </div>
          <div className="bg-primary/10 rounded-md p-3">
            <p className="text-sm font-bold text-primary">{result.dueDate}</p>
            <p className="text-xs text-muted-foreground">موعد الولادة</p>
          </div>
        </div>
      )}
      <div className="text-center mt-4">
        <Link href="/tools/pregnancy-calculator" className="text-primary text-sm hover:underline inline-flex items-center gap-1">
          الحاسبة التفصيلية بالهجري والميلادي <ArrowLeft className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}
