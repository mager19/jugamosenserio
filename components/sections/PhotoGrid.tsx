"use client";
import { motion } from "framer-motion";
import Image from "next/image";

// Cada imagen tiene un aspectRatio distinto para variedad visual
// Reemplazá src con tus fotos reales: "/images/foto1.jpg", etc.
const columns: { src: string; alt: string; ratio: string }[][] = [
  [
    { src: "https://picsum.photos/seed/jes01/400/560", alt: "Dinámica grupal", ratio: "4/5.5" },
    { src: "https://picsum.photos/seed/jes02/400/320", alt: "Equipo jugando", ratio: "4/3.2" },
  ],
  [
    { src: "https://picsum.photos/seed/jes03/400/300", alt: "Taller colaborativo", ratio: "4/3" },
    { src: "https://picsum.photos/seed/jes04/400/520", alt: "Participantes en sesión", ratio: "4/5.2" },
  ],
  [
    { src: "https://picsum.photos/seed/jes05/400/480", alt: "Facilitación en equipo", ratio: "4/4.8" },
    { src: "https://picsum.photos/seed/jes06/400/340", alt: "Juego estratégico", ratio: "4/3.4" },
  ],
  [
    { src: "https://picsum.photos/seed/jes07/400/340", alt: "Co-creación grupal", ratio: "4/3.4" },
    { src: "https://picsum.photos/seed/jes08/400/500", alt: "Conexión de equipo", ratio: "4/5" },
  ],
  [
    { src: "https://picsum.photos/seed/jes09/400/520", alt: "Reto colectivo", ratio: "4/5.2" },
    { src: "https://picsum.photos/seed/jes10/400/300", alt: "Celebración de equipo", ratio: "4/3" },
  ],
];

const columnConfig = [
  { duration: 5.5, delay: 0,   offsetClass: "mt-12" },
  { duration: 4.6, delay: 0.9, offsetClass: "mt-0"  },
  { duration: 6.2, delay: 0.4, offsetClass: "mt-8"  },
  { duration: 5.0, delay: 1.2, offsetClass: "mt-0"  },
  { duration: 5.8, delay: 0.6, offsetClass: "mt-12" },
];

export function PhotoGrid() {
  return (
    <section className="bg-white pt-14 pb-10 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-8">
        {/* Header */}
        <div className="mb-10">
          <span className="inline-flex items-center bg-tertiary/20 text-primary text-xs font-semibold px-3 py-1.5 rounded-full tracking-widest uppercase mb-4">
            Galería
          </span>
          <h2 className="font-extrabold text-[clamp(1.8rem,3.5vw,3rem)] tracking-tighter leading-tight text-[#1A1A18]">
            El juego en acción
          </h2>
        </div>

        <div className="flex gap-3 md:gap-4">
          {columns.map((col, colIdx) => {
            const cfg = columnConfig[colIdx];
            return (
              <motion.div
                key={colIdx}
                className={`flex flex-col gap-3 md:gap-4 flex-1 ${cfg.offsetClass}`}
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
                      sizes="(max-width: 768px) 20vw, 280px"
                    />
                  </div>
                ))}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
