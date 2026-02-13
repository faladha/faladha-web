import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function CTABanner() {
  return (
    <section className="py-16 md:py-24" data-testid="section-cta">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="relative overflow-hidden bg-gradient-to-l from-primary to-primary/85 rounded-2xl p-8 md:p-14 text-center">
          <div className="absolute top-0 start-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 end-0 w-80 h-80 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3" />

          <div className="relative">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4" data-testid="text-cta-title">
              ابدئي رحلة حملك مع فلذة اليوم
            </h2>
            <p className="text-white/85 text-base sm:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
              انضمي لأكثر من 50 ألف أم يتابعن حملهن بثقة مع فلذة.
              حمّلي التطبيق مجاناً وابدئي الآن.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-3 justify-center">
              <Link href="/download">
                <Button size="lg" variant="secondary" className="gap-2 w-full sm:w-auto" data-testid="button-cta-download">
                  <Download className="w-4 h-4" />
                  حمّلي من App Store
                </Button>
              </Link>
              <Link href="/download">
                <Button size="lg" variant="outline" className="gap-2 w-full sm:w-auto bg-white/10 text-white border-white/20 backdrop-blur-sm" data-testid="button-cta-googleplay">
                  <Download className="w-4 h-4" />
                  حمّلي من Google Play
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
