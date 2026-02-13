import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const testimonials = [
  {
    name: "سارة أحمد",
    initials: "س أ",
    role: "أم لطفلين",
    text: "فلذة كان رفيقي طوال حملي. المعلومات دقيقة ومفصلة لكل أسبوع. أنصح كل حامل باستخدامه.",
    rating: 5,
  },
  {
    name: "نورة محمد",
    initials: "ن م",
    role: "حامل في الأسبوع 32",
    text: "أحب حاسبة موعد الولادة ومتابعة حركة الجنين. التطبيق سهل الاستخدام والمحتوى عربي ممتاز.",
    rating: 5,
  },
  {
    name: "مريم خالد",
    initials: "م خ",
    role: "أم لأول مرة",
    text: "كنت قلقة في حملي الأول لكن فلذة ساعدني أفهم كل مرحلة. المقالات والنصائح كانت مفيدة جداً.",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 md:py-24" data-testid="section-testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
            ماذا تقول <span className="text-primary">أمهاتنا</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
            آلاف الأمهات يثقن بفلذة لمتابعة حملهن
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 md:gap-6">
          {testimonials.map((t) => (
            <Card key={t.name} className="p-6" data-testid={`card-testimonial-${t.name}`}>
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-sm text-foreground leading-relaxed mb-5">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback className="bg-primary/10 text-primary text-sm font-semibold">{t.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-semibold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
