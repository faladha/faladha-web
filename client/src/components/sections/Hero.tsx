import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Download, Smartphone } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden" data-testid="section-hero">
      <div className="absolute inset-0 bg-gradient-to-bl from-primary/10 via-background to-primary/5" />
      <div className="absolute top-20 start-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 end-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
          <div className="flex-1 text-center md:text-start">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight mb-5" data-testid="text-hero-title">
              فلذة | متابعة الحمل
              <br />
              <span className="text-primary">أسبوعًا بأسبوع</span>
            </h1>
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-8 max-w-xl" data-testid="text-hero-description">
              رفيقتك الموثوقة في رحلة الحمل. معلومات طبية دقيقة، أدوات ذكية،
              ونصائح مخصصة لكل أسبوع من حملك. كل ما تحتاجينه في تطبيق واحد.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-3 justify-center md:justify-start">
              <Link href="/download">
                <Button size="lg" className="gap-2 w-full sm:w-auto" data-testid="button-hero-download">
                  <Download className="w-4 h-4" />
                  حمّلي التطبيق مجاناً
                </Button>
              </Link>
              <Link href="/pregnancy">
                <Button variant="outline" size="lg" className="gap-2 w-full sm:w-auto" data-testid="button-hero-browse">
                  تصفحي أسابيع الحمل
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
                        <p className="text-white/90 text-xs">الأسبوع 24</p>
                        <p className="text-white text-sm font-medium">جنينك بحجم حبة ذرة</p>
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
