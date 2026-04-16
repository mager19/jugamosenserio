import content from "@/data/content.json";

export function Stats() {
  const items = content.stats as string[];

  const track = [...items, ...items, ...items, ...items];

  const renderItems = (list: string[], key: string) =>
    list.map((label, i) => (
      <span key={`${key}-${i}`} className="flex items-center gap-6 shrink-0">
        <span className="text-2xl font-extrabold text-white tracking-tight">
          {label}
        </span>
        <span className="text-tertiary text-xl font-bold">✦</span>
      </span>
    ));

  const renderItemsSmall = (list: string[], key: string) =>
    list.map((label, i) => (
      <span key={`${key}-${i}`} className="flex items-center gap-6 shrink-0">
        <span className="text-lg font-semibold text-white/50 tracking-tight">
          {label}
        </span>
        <span className="text-tertiary/40 font-bold">◆</span>
      </span>
    ));

  return (
    <section className="bg-primary py-6 overflow-hidden marquee-track">
      {/* Pista 1 — izquierda a derecha */}
      <div className="flex gap-10 mb-4">
        <div className="flex gap-10 animate-marquee">
          {renderItems(track, "a")}
        </div>
        <div className="flex gap-10 animate-marquee" aria-hidden>
          {renderItems(track, "b")}
        </div>
      </div>

      {/* Pista 2 — reversa */}
      <div className="flex gap-10">
        <div className="flex gap-10 animate-marquee-reverse">
          {renderItemsSmall(track, "c")}
        </div>
        <div className="flex gap-10 animate-marquee-reverse" aria-hidden>
          {renderItemsSmall(track, "d")}
        </div>
      </div>
    </section>
  );
}
