import { useState, useMemo } from "react";
import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import FAQAccordion from "@/components/sections/FAQAccordion";
import CTABanner from "@/components/sections/CTABanner";
import MedicalDisclaimer from "@/components/sections/MedicalDisclaimer";
import JsonLd, { BreadcrumbJsonLd, FAQJsonLd } from "@/components/seo/JsonLd";
import { Calculator, Calendar, Baby, ArrowLeft, Download, Clock, BookOpen, Heart } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useSeoMeta } from "@/hooks/useSeoMeta";

function hijriToGregorian(year: number, month: number, day: number): Date {
  const jd = Math.floor((11 * year + 3) / 30) + 354 * year + 30 * month - Math.floor((month - 1) / 2) + day + 1948440 - 385;
  const l = jd + 68569;
  const n = Math.floor(4 * l / 146097);
  const l2 = l - Math.floor((146097 * n + 3) / 4);
  const i = Math.floor(4000 * (l2 + 1) / 1461001);
  const l3 = l2 - Math.floor(1461 * i / 4) + 31;
  const j = Math.floor(80 * l3 / 2447);
  const gDay = l3 - Math.floor(2447 * j / 80);
  const l4 = Math.floor(j / 11);
  const gMonth = j + 2 - 12 * l4;
  const gYear = 100 * (n - 49) + i + l4;
  return new Date(gYear, gMonth - 1, gDay);
}

function gregorianToHijri(date: Date): { year: number; month: number; day: number } {
  const gYear = date.getFullYear();
  const gMonth = date.getMonth() + 1;
  const gDay = date.getDate();
  const jd = Math.floor((1461 * (gYear + 4800 + Math.floor((gMonth - 14) / 12))) / 4) +
    Math.floor((367 * (gMonth - 2 - 12 * Math.floor((gMonth - 14) / 12))) / 12) -
    Math.floor((3 * Math.floor((gYear + 4900 + Math.floor((gMonth - 14) / 12)) / 100)) / 4) + gDay - 32075;
  const l = jd - 1948440 + 10632;
  const n = Math.floor((l - 1) / 10631);
  const l2 = l - 10631 * n + 354;
  const j = Math.floor((10985 - l2) / 5316) * Math.floor((50 * l2) / 17719) + Math.floor(l2 / 5670) * Math.floor((43 * l2) / 15238);
  const l3 = l2 - Math.floor((30 - j) / 15) * Math.floor((17719 * j) / 50) - Math.floor(j / 16) * Math.floor((15238 * j) / 43) + 29;
  const hMonth = Math.floor((24 * l3) / 709);
  const hDay = l3 - Math.floor((709 * hMonth) / 24);
  const hYear = 30 * n + j - 30;
  return { year: hYear, month: hMonth, day: hDay };
}

const hijriMonths = [
  "محرم", "صفر", "ربيع الأول", "ربيع الثاني", "جمادى الأولى", "جمادى الآخرة",
  "رجب", "شعبان", "رمضان", "شوال", "ذو القعدة", "ذو الحجة"
];

const calculatorFAQ = [
  { question: "كيف تعمل حاسبة الحمل؟", answer: "تعمل حاسبة الحمل بإضافة 280 يوماً (40 أسبوعاً) إلى تاريخ أول يوم في آخر دورة شهرية (LMP). هذه هي الطريقة المعتمدة طبياً والمعروفة بقاعدة نيغيلي. تحسب الأداة عمر الحمل بالأسابيع والأيام، وبالأشهر التقريبية، وتعرض تاريخ الولادة المتوقع." },
  { question: "هل حاسبة الحمل دقيقة؟", answer: "حاسبة الحمل تعطي تقديراً جيداً لموعد الولادة المتوقع، لكن فقط 5% من الأطفال يولدون في الموعد المحدد تماماً. معظم الولادات تحدث في نطاق أسبوعين قبل أو بعد الموعد المتوقع. الفحص بالموجات فوق الصوتية في الثلث الأول يعطي تقديراً أدق." },
  { question: "هل يمكن أن تخطئ حاسبة الحمل؟", answer: "نعم، قد يختلف التقدير إذا كانت الدورة الشهرية غير منتظمة، أو إذا لم تتذكري تاريخ آخر دورة بدقة، أو إذا حدث الإخصاب في وقت مختلف عن المتوقع. الطبيبة تستخدم الموجات فوق الصوتية لتأكيد عمر الحمل وتعديل الموعد المتوقع عند الحاجة." },
  { question: "كيف أحسب حملي بالهجري؟", answer: "حاسبة الحمل في فلذة تدعم الإدخال بالتقويم الهجري. أدخلي تاريخ آخر دورة بالهجري وستحوله الحاسبة تلقائياً وتعرض لك النتائج بالتقويمين. هذا مفيد للأمهات اللواتي يتابعن التقويم الهجري." },
  { question: "ما الفرق بين عمر الحمل وعمر الجنين؟", answer: "عمر الحمل يُحسب من أول يوم في آخر دورة شهرية ويكون أطول بأسبوعين تقريباً من عمر الجنين الفعلي. عمر الجنين يُحسب من تاريخ الإخصاب الفعلي. الأطباء يستخدمون عمر الحمل (وليس عمر الجنين) في جميع المتابعات." },
  { question: "متى أعمل أول سونار (موجات فوق صوتية)؟", answer: "يُوصى بعمل أول فحص بالموجات فوق الصوتية بين الأسبوعين 8-12 من الحمل. هذا الفحص يؤكد الحمل داخل الرحم، يحدد عدد الأجنة، يقيس حجم الجنين لتأكيد عمر الحمل، ويمكن سماع نبض القلب." },
  { question: "كيف أحسب أشهر الحمل من الأسابيع؟", answer: "تقسيم أسابيع الحمل على الأشهر ليس دقيقاً تماماً لأن الأشهر ليست 4 أسابيع بالضبط. بشكل تقريبي: الأسابيع 1-4 = الشهر الأول، 5-8 = الثاني، 9-13 = الثالث، 14-17 = الرابع، 18-22 = الخامس، 23-27 = السادس، 28-31 = السابع، 32-35 = الثامن، 36-40 = التاسع." },
  { question: "هل حاسبة الحمل تعمل مع الحمل بالتوائم؟", answer: "حاسبة الحمل تعطي نفس تاريخ الولادة المتوقع سواء كان الحمل بجنين واحد أو توائم. لكن في حالة التوائم، غالباً ما تكون الولادة قبل الموعد المتوقع (الأسبوع 36-37 للتوائم الثنائية). طبيبتك ستحدد الخطة المناسبة." },
];

function getMonthFromWeek(week: number): number {
  if (week <= 4) return 1;
  if (week <= 8) return 2;
  if (week <= 13) return 3;
  if (week <= 17) return 4;
  if (week <= 22) return 5;
  if (week <= 27) return 6;
  if (week <= 31) return 7;
  if (week <= 35) return 8;
  return 9;
}

function getTrimesterName(week: number): string {
  if (week <= 13) return "الثلث الأول";
  if (week <= 27) return "الثلث الثاني";
  return "الثلث الثالث";
}

interface CalculatorResult {
  dueDate: Date;
  currentWeek: number;
  currentDay: number;
  currentMonth: number;
  daysLeft: number;
  trimester: string;
  weeksTable: { week: number; startDate: Date }[];
  lmpDate: Date;
}

export default function PregnancyCalculator() {
  const { data: weeks = [] } = useQuery<any[]>({
    queryKey: ["/api/public/weeks"],
  });

  const [calendarType, setCalendarType] = useState<"gregorian" | "hijri">("gregorian");
  const [gDate, setGDate] = useState("");
  const [hYear, setHYear] = useState("");
  const [hMonth, setHMonth] = useState("");
  const [hDay, setHDay] = useState("");
  const [result, setResult] = useState<CalculatorResult | null>(null);

  useSeoMeta({
    title: "حاسبة الحمل – احسبي موعد الولادة بالهجري والميلادي | فلذة",
    description: "حاسبة الحمل الدقيقة بالهجري والميلادي. احسبي موعد الولادة المتوقع، عمر الحمل بالأسابيع والأشهر، وتابعي حملك أسبوعًا بأسبوع مع جدول مفصل. أداة مجانية من فلذة.",
    canonical: "/tools/pregnancy-calculator",
    ogType: "website",
  });

  const calculate = () => {
    let lmp: Date;
    if (calendarType === "gregorian") {
      if (!gDate) return;
      lmp = new Date(gDate);
    } else {
      const y = parseInt(hYear), m = parseInt(hMonth), d = parseInt(hDay);
      if (!y || !m || !d) return;
      lmp = hijriToGregorian(y, m, d);
    }

    if (isNaN(lmp.getTime())) return;

    const due = new Date(lmp);
    due.setDate(due.getDate() + 280);

    const today = new Date();
    const diffMs = today.getTime() - lmp.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(diffDays / 7);
    const remainingDays = diffDays % 7;
    const currentWeek = Math.min(42, Math.max(1, totalWeeks + 1));
    const currentDay = Math.max(0, remainingDays);
    const daysLeft = Math.max(0, Math.ceil((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));

    const weeksTable: { week: number; startDate: Date }[] = [];
    const startWeek = Math.max(1, currentWeek);
    for (let w = startWeek; w <= 40; w++) {
      const weekStart = new Date(lmp);
      weekStart.setDate(weekStart.getDate() + (w - 1) * 7);
      weeksTable.push({ week: w, startDate: weekStart });
    }

    setResult({
      dueDate: due,
      currentWeek: Math.min(currentWeek, 40),
      currentDay,
      currentMonth: getMonthFromWeek(Math.min(currentWeek, 40)),
      daysLeft,
      trimester: getTrimesterName(Math.min(currentWeek, 40)),
      weeksTable: weeksTable.slice(0, 12),
      lmpDate: lmp,
    });
  };

  const formatGregorianDate = (d: Date) => d.toLocaleDateString("ar-SA", { year: "numeric", month: "long", day: "numeric", calendar: "gregory" });
  const formatHijriDate = (d: Date) => {
    const h = gregorianToHijri(d);
    return `${h.day} ${hijriMonths[h.month - 1]} ${h.year} هـ`;
  };

  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "حاسبة الحمل - فلذة",
    "url": "https://faladha.com/tools/pregnancy-calculator",
    "description": "حاسبة الحمل الدقيقة بالهجري والميلادي. احسبي موعد الولادة المتوقع وعمر الحمل بالأسابيع.",
    "applicationCategory": "HealthApplication",
    "operatingSystem": "Web",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "SAR" },
    "inLanguage": "ar",
    "author": { "@type": "Organization", "name": "فلذة" }
  };

  return (
    <div data-testid="page-pregnancy-calculator">
      <JsonLd data={webAppJsonLd} />
      <BreadcrumbJsonLd items={[
        { name: "الرئيسية", url: "/" },
        { name: "الأدوات", url: "/tools/pregnancy-calculator" },
        { name: "حاسبة الحمل", url: "/tools/pregnancy-calculator" },
      ]} />
      <FAQJsonLd items={calculatorFAQ} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <Breadcrumbs items={[
          { label: "الأدوات", href: "/tools/pregnancy-calculator" },
          { label: "حاسبة الحمل" },
        ]} />

        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-4 leading-tight" data-testid="text-calc-title">
          حاسبة الحمل – احسبي موعد الولادة بالهجري والميلادي
        </h1>
        <p className="text-muted-foreground leading-relaxed mb-8 text-sm sm:text-base">
          استخدمي حاسبة الحمل من فلذة لمعرفة موعد ولادتك المتوقع وعمر حملك الحالي بالأسابيع والأيام والأشهر.
          أدخلي تاريخ أول يوم في آخر دورة شهرية بالتقويم الميلادي أو الهجري وستحصلين على نتائج فورية دقيقة.
        </p>

        <Card className="p-6 mb-10" data-testid="calculator-form">
          <div className="flex items-center gap-2 mb-5">
            <Calculator className="w-5 h-5 text-primary" />
            <h2 className="font-semibold text-foreground text-lg">احسبي حملك الآن</h2>
          </div>

          <Tabs value={calendarType} onValueChange={(v) => setCalendarType(v as "gregorian" | "hijri")} className="mb-5">
            <TabsList className="w-full sm:w-auto">
              <TabsTrigger value="gregorian" data-testid="tab-gregorian">التقويم الميلادي</TabsTrigger>
              <TabsTrigger value="hijri" data-testid="tab-hijri">التقويم الهجري</TabsTrigger>
            </TabsList>

            <TabsContent value="gregorian" className="mt-4">
              <label className="block text-sm text-foreground mb-2">تاريخ أول يوم في آخر دورة شهرية (ميلادي)</label>
              <Input
                type="date"
                value={gDate}
                onChange={(e) => setGDate(e.target.value)}
                className="max-w-xs"
                data-testid="input-gregorian-date"
              />
            </TabsContent>

            <TabsContent value="hijri" className="mt-4">
              <label className="block text-sm text-foreground mb-3">تاريخ أول يوم في آخر دورة شهرية (هجري)</label>
              <div className="flex gap-3 flex-wrap">
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">اليوم</label>
                  <Input
                    type="number"
                    min={1}
                    max={30}
                    placeholder="يوم"
                    value={hDay}
                    onChange={(e) => setHDay(e.target.value)}
                    className="w-20"
                    data-testid="input-hijri-day"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">الشهر</label>
                  <Input
                    type="number"
                    min={1}
                    max={12}
                    placeholder="شهر"
                    value={hMonth}
                    onChange={(e) => setHMonth(e.target.value)}
                    className="w-20"
                    data-testid="input-hijri-month"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">السنة</label>
                  <Input
                    type="number"
                    min={1440}
                    max={1460}
                    placeholder="سنة"
                    value={hYear}
                    onChange={(e) => setHYear(e.target.value)}
                    className="w-24"
                    data-testid="input-hijri-year"
                  />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">مثال: 15 جمادى الأولى 1447</p>
            </TabsContent>
          </Tabs>

          <Button onClick={calculate} className="gap-2" data-testid="button-calculate">
            <Calendar className="w-4 h-4" /> احسبي موعد الولادة
          </Button>
        </Card>

        {result && (
          <div className="mb-12" data-testid="calculator-results">
            <h2 className="text-xl font-bold text-foreground mb-5 flex items-center gap-2">
              <Baby className="w-5 h-5 text-primary" /> نتائج حاسبة الحمل
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <Card className="p-5 text-center bg-primary/5" data-testid="result-due-date">
                <p className="text-xs text-muted-foreground mb-1">موعد الولادة المتوقع</p>
                <p className="font-bold text-foreground">{formatGregorianDate(result.dueDate)}</p>
                <p className="text-xs text-muted-foreground mt-1">{formatHijriDate(result.dueDate)}</p>
              </Card>
              <Card className="p-5 text-center bg-primary/5" data-testid="result-current-week">
                <p className="text-xs text-muted-foreground mb-1">عمر الحمل</p>
                <p className="font-bold text-primary text-xl">{result.currentWeek} أسبوع و {result.currentDay} أيام</p>
              </Card>
              <Card className="p-5 text-center bg-primary/5" data-testid="result-month">
                <p className="text-xs text-muted-foreground mb-1">الشهر الحالي</p>
                <p className="font-bold text-foreground text-xl">الشهر {result.currentMonth}</p>
                <p className="text-xs text-muted-foreground mt-1">{result.trimester}</p>
              </Card>
              <Card className="p-5 text-center bg-primary/5" data-testid="result-days-left">
                <p className="text-xs text-muted-foreground mb-1">أيام متبقية</p>
                <p className="font-bold text-foreground text-xl">{result.daysLeft} يوم</p>
              </Card>
            </div>

            {result.currentWeek >= 1 && result.currentWeek <= 40 && (
              <Card className="p-5 mb-6 flex items-center justify-between gap-4 flex-wrap">
                <div>
                  <p className="text-sm text-foreground font-medium">أنتِ الآن في الأسبوع {result.currentWeek} من الحمل</p>
                  <p className="text-xs text-muted-foreground">
                    {weeks[result.currentWeek - 1]?.title}
                  </p>
                </div>
                <Link href={`/pregnancy/week-${result.currentWeek}`}>
                  <Button variant="outline" size="sm" className="gap-1" data-testid="link-current-week">
                    تفاصيل الأسبوع <ArrowLeft className="w-3 h-3" />
                  </Button>
                </Link>
              </Card>
            )}

            {result.weeksTable.length > 0 && (
              <div className="mb-6">
                <h3 className="text-base font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" /> جدول الأسابيع القادمة
                </h3>
                <Card className="overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm" data-testid="weeks-table">
                      <thead>
                        <tr className="border-b border-border bg-muted/30">
                          <th className="p-3 text-start font-medium text-foreground">الأسبوع</th>
                          <th className="p-3 text-start font-medium text-foreground">تاريخ البداية (ميلادي)</th>
                          <th className="p-3 text-start font-medium text-foreground">تاريخ البداية (هجري)</th>
                          <th className="p-3 text-start font-medium text-foreground"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {result.weeksTable.map(row => (
                          <tr key={row.week} className={`border-b border-border/50 ${row.week === result.currentWeek ? "bg-primary/5" : ""}`}>
                            <td className="p-3 font-medium text-foreground">
                              الأسبوع {row.week}
                              {row.week === result.currentWeek && <Badge variant="secondary" className="text-[9px] ms-2">الحالي</Badge>}
                            </td>
                            <td className="p-3 text-muted-foreground">{formatGregorianDate(row.startDate)}</td>
                            <td className="p-3 text-muted-foreground">{formatHijriDate(row.startDate)}</td>
                            <td className="p-3">
                              {row.week <= 40 && (
                                <Link href={`/pregnancy/week-${row.week}`}>
                                  <span className="text-primary text-xs cursor-pointer">التفاصيل</span>
                                </Link>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
              </div>
            )}
          </div>
        )}

        <article className="prose-sm max-w-none">
          <section className="mb-10">
            <h2 className="text-xl font-bold text-foreground mb-4">كيف تعمل حاسبة الحمل؟</h2>
            <p className="text-sm text-foreground leading-relaxed mb-3">
              حاسبة الحمل هي أداة طبية تُستخدم لتحديد موعد الولادة المتوقع (EDD) وعمر الحمل الحالي. تعتمد هذه الحاسبة على قاعدة نيغيلي (Naegele's Rule) المعتمدة طبياً، والتي تحسب موعد الولادة بإضافة 280 يوماً (40 أسبوعاً) إلى تاريخ أول يوم في آخر دورة شهرية (Last Menstrual Period - LMP).
            </p>
            <p className="text-sm text-foreground leading-relaxed mb-3">
              عندما تُدخلين تاريخ آخر دورة في حاسبة الحمل، تقوم الأداة بحساب عدة معلومات مهمة: أولاً تحدد موعد الولادة المتوقع (EDD)، ثم تحسب عمر الحمل الحالي بالأسابيع والأيام بناءً على الفرق بين تاريخ آخر دورة واليوم الحالي. كما تحول عمر الحمل إلى أشهر لتسهيل الفهم، وتعرض الثلث الحالي من الحمل (الأول أو الثاني أو الثالث).
            </p>
            <p className="text-sm text-foreground leading-relaxed mb-3">
              من المهم معرفة أن حاسبة الحمل تفترض أن الدورة الشهرية منتظمة بطول 28 يوماً وأن الإباضة حدثت في اليوم 14. إذا كانت دورتك أطول أو أقصر، قد يختلف الموعد الفعلي قليلاً. لذلك يعتمد الأطباء أيضاً على فحص الموجات فوق الصوتية في الثلث الأول لتأكيد عمر الحمل وتعديل الموعد المتوقع عند الحاجة.
            </p>
            <p className="text-sm text-foreground leading-relaxed mb-3">
              تقدم حاسبة الحمل في فلذة ميزة إضافية وهي دعم التقويم الهجري، مما يسمح للأمهات اللواتي يتابعن التقويم الهجري بإدخال التاريخ مباشرة دون الحاجة للتحويل يدوياً. كما تعرض الحاسبة جدولاً بتواريخ بداية كل أسبوع قادم بالتقويمين الميلادي والهجري.
            </p>
            <p className="text-sm text-foreground leading-relaxed">
              تذكري أن 5% فقط من الأطفال يولدون في الموعد المحدد تماماً. الولادة الطبيعية تحدث عادةً في أي وقت بين الأسبوعين 37 و42. لذلك اعتبري موعد الولادة المتوقع تقديراً وليس موعداً ثابتاً، واستعدي للولادة قبل أسابيع من الموعد المتوقع.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-foreground mb-4">حاسبة الحمل بالهجري</h2>
            <p className="text-sm text-foreground leading-relaxed mb-3">
              حاسبة الحمل بالهجري هي خاصية مهمة في حاسبة فلذة تتيح للأمهات في المنطقة العربية إدخال تاريخ آخر دورة شهرية بالتقويم الهجري مباشرة. هذا مفيد بشكل خاص للأمهات اللواتي يعتمدن التقويم الهجري في حياتهن اليومية أو يتابعن المواعيد الطبية بالتاريخ الهجري.
            </p>
            <p className="text-sm text-foreground leading-relaxed mb-3">
              عند استخدام حاسبة الحمل بالهجري، تقوم الأداة بتحويل التاريخ الهجري إلى ميلادي بشكل تلقائي ثم تجري جميع الحسابات. النتائج تُعرض بالتقويمين معاً حتى تستطيعي متابعة حملك بالطريقة التي تفضلينها. تاريخ الولادة المتوقع يُعرض أيضاً بالهجري والميلادي.
            </p>
            <p className="text-sm text-foreground leading-relaxed">
              لاستخدام حاسبة الحمل بالهجري، انتقلي إلى تبويب "التقويم الهجري" أعلاه وأدخلي اليوم والشهر والسنة الهجرية لتاريخ آخر دورة. اضغطي "احسبي موعد الولادة" وستظهر لك جميع النتائج بما فيها جدول الأسابيع بالتاريخين.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-foreground mb-4">حاسبة الحمل بالميلادي</h2>
            <p className="text-sm text-foreground leading-relaxed mb-3">
              حاسبة الحمل بالميلادي هي الطريقة الأكثر شيوعاً واستخداماً عالمياً لحساب موعد الولادة. تعتمد على التقويم الميلادي (الجريجوري) الذي يستخدمه معظم الأنظمة الصحية حول العالم. أغلب المستشفيات والعيادات تعتمد التقويم الميلادي في متابعة الحمل.
            </p>
            <p className="text-sm text-foreground leading-relaxed">
              لاستخدام حاسبة الحمل بالميلادي، ببساطة أدخلي تاريخ أول يوم في آخر دورة شهرية في حقل التاريخ الميلادي. ستحصلين فوراً على موعد الولادة المتوقع وعمر الحمل بالأسابيع والأيام. الحاسبة تعرض النتائج أيضاً بالهجري لمن ترغب في المقارنة.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-foreground mb-4">حاسبة الحمل بالأسابيع والأشهر</h2>
            <p className="text-sm text-foreground leading-relaxed mb-3">
              يُقاس عمر الحمل طبياً بالأسابيع والأيام (مثلاً: 24 أسبوع و3 أيام). لكن كثير من الأمهات يفضلن معرفة عمر الحمل بالأشهر أيضاً. حاسبة الحمل في فلذة تعرض لك عمر الحمل بالطريقتين: بالأسابيع والأيام (الطريقة الطبية الدقيقة)، وبالأشهر (الطريقة الشائعة).
            </p>
            <p className="text-sm text-foreground leading-relaxed mb-3">
              تقسيم أسابيع الحمل إلى أشهر: الشهر الأول يشمل الأسابيع 1 إلى 4، والشهر الثاني من 5 إلى 8، والشهر الثالث من 9 إلى 13 (نهاية الثلث الأول). الشهر الرابع من الأسبوع 14 إلى 17، والخامس من 18 إلى 22، والسادس من 23 إلى 27 (نهاية الثلث الثاني). الشهر السابع من 28 إلى 31، والثامن من 32 إلى 35، والتاسع من 36 إلى 40 (نهاية الحمل).
            </p>
            <p className="text-sm text-foreground leading-relaxed">
              مثال عملي: إذا كنتِ في الأسبوع 20 من الحمل، فأنتِ في الشهر الخامس من الحمل وفي منتصف الثلث الثاني تقريباً. حجم الجنين يكون بحجم حبة موز تقريباً ويمكنك الشعور بحركاته. حاسبة فلذة تعرض لك كل هذه المعلومات تلقائياً بعد إدخال تاريخ آخر دورة.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-foreground mb-4">طريقة حساب الحمل من آخر دورة</h2>
            <p className="text-sm text-foreground leading-relaxed mb-3">
              حساب الحمل من آخر دورة هو الأسلوب الأكثر دقة وشيوعاً في الممارسة الطبية. يعتمد على قاعدة بسيطة: يبدأ حساب الحمل من أول يوم في آخر دورة شهرية طبيعية، وليس من يوم الإخصاب الفعلي. هذا يعني أن الأسبوعين الأولين من الحمل يسبقان الإخصاب فعلياً.
            </p>
            <p className="text-sm text-foreground leading-relaxed mb-3">
              لحساب موعد الولادة يدوياً باستخدام قاعدة نيغيلي: خذي تاريخ أول يوم في آخر دورة، أضيفي سنة واحدة، اطرحي 3 أشهر، ثم أضيفي 7 أيام. مثال: إذا كان تاريخ آخر دورة 1 يناير 2026، فموعد الولادة المتوقع هو 8 أكتوبر 2026.
            </p>
            <p className="text-sm text-foreground leading-relaxed mb-3">
              هناك حالات قد لا تكون فيها هذه الطريقة دقيقة: إذا كانت الدورة الشهرية غير منتظمة (أطول أو أقصر من 28 يوماً)، أو إذا كنتِ لا تتذكرين تاريخ آخر دورة بدقة، أو إذا حملتِ أثناء استخدام حبوب منع الحمل. في هذه الحالات، يعتمد الطبيب على فحص الموجات فوق الصوتية في الثلث الأول لتحديد عمر الحمل بدقة.
            </p>
            <p className="text-sm text-foreground leading-relaxed">
              حاسبة الحمل في فلذة تقوم بهذا الحساب تلقائياً وفورياً. فقط أدخلي تاريخ آخر دورة وستحصلين على جميع المعلومات التي تحتاجينها: موعد الولادة، عمر الحمل الحالي، الأسبوع والشهر، وجدول الأسابيع القادمة مع روابط مباشرة لمعلومات كل أسبوع.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-foreground mb-4">هل يمكن أن تخطئ حاسبة الحمل؟</h2>
            <p className="text-sm text-foreground leading-relaxed mb-3">
              نعم، حاسبة الحمل قد تعطي تقديراً غير دقيق تماماً في بعض الحالات. أهم أسباب عدم الدقة هي: عدم انتظام الدورة الشهرية حيث تفترض الحاسبة أن الدورة 28 يوماً والإباضة في اليوم 14، وعدم تذكر تاريخ آخر دورة بدقة.
            </p>
            <p className="text-sm text-foreground leading-relaxed mb-3">
              كما أن النساء اللواتي حملن مباشرة بعد إيقاف حبوب منع الحمل قد لا تكون لديهن دورة طبيعية كمرجع، والحمل بالتلقيح الاصطناعي أو أطفال الأنابيب يُحسب بطريقة مختلفة. في جميع هذه الحالات، الفحص بالموجات فوق الصوتية يعطي تقديراً أدق.
            </p>
            <p className="text-sm text-foreground leading-relaxed">
              رغم ذلك، تظل حاسبة الحمل أداة مفيدة جداً لتقدير موعد الولادة ومتابعة تقدم الحمل. الأطباء أنفسهم يبدأون بحساب الحمل من آخر دورة ثم يعدلون الموعد لاحقاً بناءً على فحص السونار. استخدمي الحاسبة كنقطة بداية واعتمدي على متابعة طبيبتك لتأكيد الموعد.
            </p>
          </section>

          <section className="mb-10" data-testid="section-browse-weeks">
            <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" /> تصفحي أسابيع الحمل
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              تابعي تطور جنينك وصحتك في كل أسبوع من أسابيع الحمل الأربعين
            </p>
            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-2">
              {weeks.map(w => (
                <Link key={w.slug} href={`/pregnancy/${w.slug}`}>
                  <Card className="p-2 text-center hover-elevate" data-testid={`week-link-${w.weekNumber}`}>
                    <p className="text-xs font-bold text-foreground">{w.weekNumber}</p>
                  </Card>
                </Link>
              ))}
            </div>
          </section>

          <section className="mb-10" data-testid="section-related-symptoms">
            <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Heart className="w-5 h-5 text-primary" /> أعراض شائعة أثناء الحمل
            </h2>
            <div className="flex flex-wrap gap-2">
              {[
                { slug: "morning-sickness", name: "الغثيان الصباحي" },
                { slug: "fatigue", name: "التعب والإرهاق" },
                { slug: "back-pain", name: "آلام الظهر" },
                { slug: "heartburn", name: "حرقة المعدة" },
                { slug: "frequent-urination", name: "كثرة التبول" },
              ].map(s => (
                <Link key={s.slug} href={`/symptoms/${s.slug}`}>
                  <Badge variant="secondary" className="text-xs cursor-pointer">{s.name}</Badge>
                </Link>
              ))}
            </div>
          </section>
        </article>

        <section className="mb-10" data-testid="section-calc-faq">
          <h2 className="text-xl font-bold text-foreground mb-5">الأسئلة الشائعة عن حاسبة الحمل</h2>
          <FAQAccordion items={calculatorFAQ} />
        </section>

        <MedicalDisclaimer />

        <div className="mt-8 text-center">
          <Link href="/download">
            <Button size="lg" className="gap-2" data-testid="button-download-cta">
              <Download className="w-4 h-4" /> حمّلي تطبيق فلذة مجاناً
            </Button>
          </Link>
        </div>
      </div>

      <CTABanner />
    </div>
  );
}
