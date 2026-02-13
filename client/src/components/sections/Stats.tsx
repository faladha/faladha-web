const stats = [
  { value: "40", label: "أسبوع حمل مُغطى", suffix: "" },
  { value: "15", label: "عرض صحي مُفصّل", suffix: "+" },
  { value: "100", label: "مقال طبي موثوق", suffix: "+" },
  { value: "50", label: "ألف أم تثق بنا", suffix: "K+" },
];

export default function Stats() {
  return (
    <section className="py-16 md:py-20" data-testid="section-stats">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-l from-primary to-primary/80 rounded-2xl p-8 md:p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-white mb-1">
                  {stat.value}<span className="text-white/80">{stat.suffix}</span>
                </p>
                <p className="text-white/80 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
