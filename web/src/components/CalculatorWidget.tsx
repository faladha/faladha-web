"use client";

import { useState } from "react";
import { Calculator, Calendar } from "lucide-react";

type CalendarType = "gregorian" | "hijri";

const hijriMonths = [
  "محرم", "صفر", "ربيع الأول", "ربيع الآخر", "جمادى الأولى", "جمادى الآخرة",
  "رجب", "شعبان", "رمضان", "شوال", "ذو القعدة", "ذو الحجة",
];

function hijriToGregorian(year: number, month: number, day: number): Date {
  const a = Math.floor((11 * year + 3) / 30);
  const b = Math.floor(year / 100);
  const c = Math.floor(year / 400);
  const jd = Math.floor((10985 * month - 9995) / 30) + day + year * 365 + a + 1948440 - 385;
  const l = jd + 68569;
  const n = Math.floor((4 * l) / 146097);
  const l2 = l - Math.floor((146097 * n + 3) / 4);
  const i = Math.floor((4000 * (l2 + 1)) / 1461001);
  const l3 = l2 - Math.floor((1461 * i) / 4) + 31;
  const j = Math.floor((80 * l3) / 2447);
  const gDay = l3 - Math.floor((2447 * j) / 80);
  const l4 = Math.floor(j / 11);
  const gMonth = j + 2 - 12 * l4;
  const gYear = 100 * (n - 49) + i + l4;
  return new Date(gYear, gMonth - 1, gDay);
}

interface Result {
  weeks: number;
  days: number;
  totalDays: number;
  dueDate: Date;
  trimester: number;
  monthEstimate: number;
  progress: number;
}

export function CalculatorWidget() {
  const [calType, setCalType] = useState<CalendarType>("gregorian");
  const [gDate, setGDate] = useState("");
  const [hYear, setHYear] = useState("1446");
  const [hMonth, setHMonth] = useState("1");
  const [hDay, setHDay] = useState("1");
  const [result, setResult] = useState<Result | null>(null);

  function calculate() {
    let lmp: Date;
    if (calType === "gregorian") {
      if (!gDate) return;
      lmp = new Date(gDate);
    } else {
      lmp = hijriToGregorian(parseInt(hYear), parseInt(hMonth), parseInt(hDay));
    }

    const now = new Date();
    const diff = now.getTime() - lmp.getTime();
    const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (totalDays < 0 || totalDays > 300) return;

    const weeks = Math.floor(totalDays / 7);
    const days = totalDays % 7;
    const dueDate = new Date(lmp);
    dueDate.setDate(dueDate.getDate() + 280);
    const trimester = weeks < 13 ? 1 : weeks < 27 ? 2 : 3;
    const monthEstimate = Math.floor(weeks / 4.345);
    const progress = Math.min((totalDays / 280) * 100, 100);

    setResult({ weeks, days, totalDays, dueDate, trimester, monthEstimate, progress });
  }

  return (
    <div className="border border-border rounded-md p-6 bg-card" data-testid="calculator-widget">
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setCalType("gregorian")}
          className={`flex-1 py-2 rounded-md text-sm font-semibold transition-colors ${calType === "gregorian" ? "bg-primary text-primary-foreground" : "border border-border"}`}
          data-testid="button-gregorian"
        >
          ميلادي
        </button>
        <button
          onClick={() => setCalType("hijri")}
          className={`flex-1 py-2 rounded-md text-sm font-semibold transition-colors ${calType === "hijri" ? "bg-primary text-primary-foreground" : "border border-border"}`}
          data-testid="button-hijri"
        >
          هجري
        </button>
      </div>

      {calType === "gregorian" ? (
        <div className="mb-4">
          <label className="text-sm text-muted-foreground block mb-1">تاريخ أول يوم من آخر دورة (ميلادي)</label>
          <input
            type="date"
            value={gDate}
            onChange={(e) => setGDate(e.target.value)}
            className="w-full border border-border rounded-md px-3 py-2 bg-background text-foreground"
            data-testid="input-gregorian-date"
          />
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div>
            <label className="text-sm text-muted-foreground block mb-1">السنة</label>
            <input
              type="number"
              value={hYear}
              onChange={(e) => setHYear(e.target.value)}
              className="w-full border border-border rounded-md px-3 py-2 bg-background text-foreground"
              data-testid="input-hijri-year"
            />
          </div>
          <div>
            <label className="text-sm text-muted-foreground block mb-1">الشهر</label>
            <select
              value={hMonth}
              onChange={(e) => setHMonth(e.target.value)}
              className="w-full border border-border rounded-md px-3 py-2 bg-background text-foreground"
              data-testid="input-hijri-month"
            >
              {hijriMonths.map((m, i) => (
                <option key={i + 1} value={i + 1}>{m}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm text-muted-foreground block mb-1">اليوم</label>
            <input
              type="number"
              value={hDay}
              onChange={(e) => setHDay(e.target.value)}
              min={1}
              max={30}
              className="w-full border border-border rounded-md px-3 py-2 bg-background text-foreground"
              data-testid="input-hijri-day"
            />
          </div>
        </div>
      )}

      <button
        onClick={calculate}
        className="w-full bg-primary text-primary-foreground py-3 rounded-md font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
        data-testid="button-calculate-full"
      >
        <Calculator className="w-5 h-5" />
        احسبي موعد ولادتك
      </button>

      {result && (
        <div className="mt-6 space-y-4" data-testid="calculator-full-result">
          <div className="w-full bg-accent rounded-md h-3 overflow-hidden">
            <div className="bg-primary h-full rounded-md transition-all" style={{ width: `${result.progress}%` }} />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
            <div className="bg-primary/10 rounded-md p-4">
              <p className="text-2xl font-bold text-primary">{result.weeks}</p>
              <p className="text-xs text-muted-foreground">أسبوع</p>
            </div>
            <div className="bg-primary/10 rounded-md p-4">
              <p className="text-2xl font-bold text-primary">{result.days}</p>
              <p className="text-xs text-muted-foreground">يوم</p>
            </div>
            <div className="bg-primary/10 rounded-md p-4">
              <p className="text-2xl font-bold text-primary">{result.trimester}</p>
              <p className="text-xs text-muted-foreground">الثلث</p>
            </div>
            <div className="bg-primary/10 rounded-md p-4">
              <p className="text-2xl font-bold text-primary">{result.monthEstimate}</p>
              <p className="text-xs text-muted-foreground">شهر تقريبًا</p>
            </div>
          </div>

          <div className="border border-border rounded-md p-4 text-center">
            <p className="text-sm text-muted-foreground mb-1">موعد الولادة المتوقع</p>
            <p className="text-lg font-bold text-primary flex items-center justify-center gap-2">
              <Calendar className="w-5 h-5" />
              {result.dueDate.toLocaleDateString("ar-SA", { year: "numeric", month: "long", day: "numeric" })}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {result.dueDate.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            <p>المتبقي على الولادة: <strong className="text-foreground">{280 - result.totalDays > 0 ? 280 - result.totalDays : 0}</strong> يوم</p>
          </div>
        </div>
      )}
    </div>
  );
}
