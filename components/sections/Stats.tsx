import content from "@/data/content.json";

export function Stats() {
  const { stats } = content;

  // Duplicar items para loop seamless
  const items = [...stats, ...stats, ...stats, ...stats];

  const marqueeItems = items.map((s, i) => (
    <span key={i} className="flex items-center gap-6 shrink-0">
      <span className="text-2xl font-extrabold text-white tracking-tight">
        {s.value.toLocaleString()}{s.suffix}&nbsp;{s.label}
      </span>
      <span className="text-tertiary text-xl font-bold">✦</span>
    </span>
  ));

  return (
    <section className="bg-primary py-6 overflow-hidden marquee-track">
      {/* Pista 1 — izquierda a derecha */}
      <div className="flex gap-10 mb-4">
        <div className="flex gap-10 animate-marquee">
          {marqueeItems}
        </div>
        <div className="flex gap-10 animate-marquee" aria-hidden>
          {marqueeItems}
        </div>
      </div>

      {/* Pista 2 — reversa */}
      <div className="flex gap-10">
        <div className="flex gap-10 animate-marquee-reverse">
          {items.map((s, i) => (
            <span key={i} className="flex items-center gap-6 shrink-0">
              <span className="text-lg font-semibold text-white/50 tracking-tight">
                {s.value.toLocaleString()}{s.suffix}&nbsp;{s.label}
              </span>
              <span className="text-tertiary/40 font-bold">◆</span>
            </span>
          ))}
        </div>
        <div className="flex gap-10 animate-marquee-reverse" aria-hidden>
          {items.map((s, i) => (
            <span key={i} className="flex items-center gap-6 shrink-0">
              <span className="text-lg font-semibold text-white/50 tracking-tight">
                {s.value.toLocaleString()}{s.suffix}&nbsp;{s.label}
              </span>
              <span className="text-tertiary/40 font-bold">◆</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
