"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight, Trophy } from "@phosphor-icons/react";
import { fadeUp, staggerContainer } from "@/lib/animations";
import content from "@/data/content.json";

const photoColumns: { src: string; alt: string; ratio: string }[][] = [
  // columna flex-1 — portrait
  [
    { src: "/images/3D401789-F382-404A-B440-695DFD447185_1_102_o.jpeg", alt: "Dinámica con tangram", ratio: "3/4" },
    { src: "/images/IMG_9731.jpeg", alt: "Jugando con canicas", ratio: "3/4" },
  ],
  // columna doble ancho — landscape
  [
    { src: "/images/20250221_084455.jpeg", alt: "Equipo en sesión grupal", ratio: "4/3" },
    { src: "/images/F2A8B2CD-3B68-4B25-9B07-4A3C9B58704C_1_102_o.jpeg", alt: "Equipo jugando con diademas", ratio: "4/3" },
  ],
  // columna flex-1 — portrait
  [
    { src: "/images/51ADF3B9-3B2E-4496-8BB2-1A43AA3357D8_1_102_o.jpeg", alt: "Equipo resolviendo puzzle", ratio: "3/4" },
    { src: "/images/D0A361E3-AD54-4002-A1B6-60665B23C6AB_1_102_o.jpeg", alt: "Participante con venda en los ojos", ratio: "3/4" },
  ],
  // columna doble ancho — landscape
  [
    { src: "/images/7CDCD7DD-56C4-4959-8D86-598842F7D4BA_4_5005_c.jpeg", alt: "Equipo representado en Lego", ratio: "16/9" },
    { src: "/images/hibdc36ddve9tbirzw8r.jpeg", alt: "Figuras de plastilina", ratio: "16/9" },
  ],
  // columna flex-1 — portrait
  [
    { src: "/images/IMG_0625.jpeg", alt: "Juego de escape room", ratio: "3/4" },
    { src: "/images/IMG_9734.jpeg", alt: "Concentración en el juego", ratio: "3/4" },
  ],
];

const colConfig = [
  { duration: 5.5, delay: 0,   offsetClass: "mt-12", flexClass: "flex-1"   },
  { duration: 4.6, delay: 0.9, offsetClass: "mt-0",  flexClass: "flex-[2]" },
  { duration: 6.2, delay: 0.4, offsetClass: "mt-8",  flexClass: "flex-1"   },
  { duration: 5.0, delay: 1.2, offsetClass: "mt-0",  flexClass: "flex-[2]" },
  { duration: 5.8, delay: 0.6, offsetClass: "mt-12", flexClass: "flex-1"   },
];

export function Testimonials() {
  const { testimonials } = content;

  return (
    <section id="experiencias" className="bg-[#FDFCFB] py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-16 relative"
        >
          <div className="hidden md:block pointer-events-none absolute -right-8 -top-8 opacity-[0.18] select-none" style={{ color: "#F5C842" }}>
            <Trophy size={240} weight="fill" />
          </div>
          <motion.span
            variants={fadeUp}
            className="inline-flex items-center bg-tertiary/20 text-primary text-xs font-semibold px-3 py-1.5 rounded-full tracking-widest uppercase mb-6"
          >
            {testimonials.eyebrow}
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="font-extrabold text-[clamp(2rem,4.5vw,3.5rem)] tracking-tighter leading-tight text-[#1A1A18]"
          >
            {testimonials.headline}
          </motion.h2>
        </motion.div>

        {/* Grid de casos */}
        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 100, damping: 20, delay: i * 0.08 }}
              className="border border-neutral-200 rounded-2xl bg-white overflow-hidden flex flex-col"
            >
              <div className="flex items-start gap-3 p-7 pb-4">
                <div className="mt-0.5 shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <ArrowUpRight size={16} weight="bold" className="text-primary" />
                </div>
                <h3 className="font-bold text-base text-[#1A1A18] leading-snug">
                  {item.title}
                </h3>
              </div>
              <p className="text-neutral-500 text-sm leading-relaxed px-7 pb-6">
                {item.description}
              </p>
              <div className="mx-7 border-t border-neutral-100" />
              <div className="p-7 pt-5 flex flex-col gap-4 flex-1 justify-between">
                <p className="text-[#1A1A18] text-sm leading-relaxed font-medium italic">
                  &ldquo;{item.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-primary font-bold text-xs">
                      {item.author.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-bold text-sm text-[#1A1A18]">{item.author}</p>
                    <p className="text-neutral-400 text-xs">{item.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Galería de fotos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="mt-20"
        >
          <span className="inline-flex items-center bg-tertiary/20 text-primary text-xs font-semibold px-3 py-1.5 rounded-full tracking-widest uppercase mb-4">
            Galería
          </span>
          <h3 className="font-extrabold text-[clamp(1.6rem,3vw,2.5rem)] tracking-tighter leading-tight text-[#1A1A18] mb-10">
            El juego en acción
          </h3>

          <div className="flex gap-3 md:gap-4 overflow-hidden">
            {photoColumns.map((col, colIdx) => {
              const cfg = colConfig[colIdx];
              return (
                <motion.div
                  key={colIdx}
                  className={`flex flex-col gap-3 md:gap-4 ${cfg.flexClass} ${cfg.offsetClass}`}
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: cfg.duration,
                    delay: cfg.delay,
                    ease: "easeInOut",
                  }}
                >
                  {col.map((img, imgIdx) => (
                    <div
                      key={imgIdx}
                      className="relative w-full overflow-hidden rounded-2xl md:rounded-3xl"
                      style={{ aspectRatio: img.ratio }}
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 20vw, 240px"
                      />
                    </div>
                  ))}
                </motion.div>
              );
            })}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
