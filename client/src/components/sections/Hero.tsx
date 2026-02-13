import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Download, Smartphone, Calculator, ArrowLeft } from "lucide-react";
import { useState } from "react";

export default function Hero() {
  const [lmpDate, setLmpDate] = useState("");
  const [miniResult, setMiniResult] = useState<{ week: number; dueDate: string } | null>(null);

  const quickCalc = () => {
    if (!lmpDate) {
      setMiniResult(null);
      return;
    }
    const parts = lmpDate.split("-");
    const lmp = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
    if (isNaN(lmp.getTime())) {
      setMiniResult(null);
      return;
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (lmp > today) {
      setMiniResult(null);
      return;
    }
    const due = new Date(lmp);
    due.setDate(due.getDate() + 280);
    const diffDays = Math.floor((today.getTime() - lmp.getTime()) / (1000 * 60 * 60 * 24));
    const week = Math.min(40, Math.max(1, Math.floor(diffDays / 7) + 1));
    setMiniResult({
      week,
      dueDate: due.toLocaleDateString("ar-SA", { year: "numeric", month: "long", day: "numeric", calendar: "gregory" }),
    });
  };

  return (
    <section className="relative overflow-hidden" data-testid="section-hero">
      <div className="absolute inset-0 bg-gradient-to-bl from-primary/10 via-background to-primary/5" />
      <div className="absolute top-20 start-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 end-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
          <div className="flex-1 text-center md:text-start">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight mb-5" data-testid="text-hero-title">
              حاسبة الحمل الدقيقة بالهجري والميلادي |{" "}
              <span className="text-primary">متابعة الحمل أسبوعًا بأسبوع</span>
              {" "}<span className="text-foreground/80">– فلذة</span>
            </h1>
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-6 max-w-xl" data-testid="text-hero-description">
              هل تبحثين عن حاسبة حمل دقيقة؟ فلذة تقدم لك أدق حاسبة حمل بالهجري والميلادي لحساب موعد ولادتك المتوقع وتحديد أسبوعك الحالي.
              تابعي تطور حملك أسبوعًا بأسبوع مع معلومات طبية موثوقة عن تطور الجنين وصحة الأم. استخدمي حاسبة الحمل بالأسابيع والأشهر لمعرفة كل تفاصيل رحلتك.
              أدوات ذكية، جداول أسابيع الحمل من 1 إلى 40، ونصائح مخصصة في تطبيق واحد.
            </p>

            <Card className="p-4 mb-6 max-w-md mx-auto md:mx-0" data-testid="mini-calculator">
              <div className="flex items-center gap-2 mb-3">
                <Calculator className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold text-foreground">احسبي حملك سريعاً</span>
              </div>
              <div className="flex gap-2 items-end flex-wrap">
                <div className="flex-1 min-w-[150px]">
                  <label className="text-xs text-muted-foreground mb-1 block">تاريخ آخر دورة</label>
                  <Input
                    type="date"
                    value={lmpDate}
                    onChange={(e) => setLmpDate(e.target.value)}
                    data-testid="input-hero-lmp"
                  />
                </div>
                <Button onClick={quickCalc} size="sm" data-testid="button-hero-calc">
                  احسبي
                </Button>
              </div>
              {miniResult && (
                <div className="mt-3 flex items-center justify-between gap-2 text-sm bg-primary/5 rounded-md p-3" data-testid="mini-result">
                  <div>
                    <p className="text-foreground font-medium">الأسبوع {miniResult.week} | الولادة: {miniResult.dueDate}</p>
                  </div>
                  <Link href="/tools/pregnancy-calculator">
                    <span className="text-primary text-xs flex items-center gap-1 cursor-pointer whitespace-nowrap" data-testid="link-mini-calc-details">
                      تفاصيل أكثر <ArrowLeft className="w-3 h-3" />
                    </span>
                  </Link>
                </div>
              )}
            </Card>

            <div className="flex flex-col sm:flex-row items-center gap-3 justify-center md:justify-start">
              <Link href="/tools/pregnancy-calculator">
                <Button size="lg" className="gap-2 w-full sm:w-auto" data-testid="button-hero-calculator">
                  <Calculator className="w-4 h-4" />
                  جربي حاسبة الحمل الآن
                </Button>
              </Link>
              <Link href="/download">
                <Button variant="outline" size="lg" className="gap-2 w-full sm:w-auto" data-testid="button-hero-download">
                  <Download className="w-4 h-4" />
                  حمّلي تطبيق فلذة
                </Button>
              </Link>
            </div>
            <div className="flex items-center gap-6 mt-8 justify-center md:justify-start">
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">40</p>
                <p className="text-xs text-muted-foreground">أسبوع حمل</p>
              </div>
              <div className="w-px h-8 bg-border" />
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">+100</p>
                <p className="text-xs text-muted-foreground">مقال طبي</p>
              </div>
              <div className="w-px h-8 bg-border" />
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">+50K</p>
                <p className="text-xs text-muted-foreground">أم سعيدة</p>
              </div>
            </div>
          </div>

          <div className="flex-1 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-primary/5 rounded-[2.5rem] blur-2xl scale-110" />
              <div className="relative w-60 sm:w-72 animate-float" data-testid="phone-mockup">
                <div className="bg-card border border-border/50 rounded-[2.5rem] p-3 shadow-xl">
                  <div className="bg-gradient-to-b from-primary/90 to-primary rounded-[2rem] aspect-[9/16] flex flex-col items-center justify-center p-6">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4">
                      <Smartphone className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-white font-bold text-xl mb-2">فلذة</h3>
                    <p className="text-white/80 text-sm text-center leading-relaxed">
                      تطبيق متابعة الحمل الأشمل في العالم العربي
                    </p>
                    <div className="mt-6 space-y-2 w-full">
                      <div className="bg-white/15 rounded-xl p-3">
                        <p className="text-white/90 text-xs">حاسبة الحمل</p>
                        <p className="text-white text-sm font-medium">احسبي موعد ولادتك</p>
                      </div>
                      <div className="bg-white/15 rounded-xl p-3">
                        <p className="text-white/90 text-xs">نصيحة اليوم</p>
                        <p className="text-white text-sm font-medium">اشربي 8 أكواب ماء</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
