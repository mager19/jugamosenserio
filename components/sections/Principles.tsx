"use client";
import { motion } from "framer-motion";
import {
  GameController, MagnifyingGlass, Heart, ArrowsOut, Sword, type IconProps,
} from "@phosphor-icons/react";
import { fadeUp } from "@/lib/animations";
import content from "@/data/content.json";

const iconMap: Record<string, React.ForwardRefExoticComponent<IconProps & React.RefAttributes<SVGSVGElement>>> = {
  GameController, MagnifyingGlass, Heart, ArrowsOut,
};

const bgMap: Record<string, string> = {
  "bg-primary": "#1B2B6B",
  "bg-tertiary": "#F5C842",
  "bg-secondary": "#E8623A",
  "bg-neutral-800": "#2A2520",
};

const textColorMap: Record<string, string> = {
  "text-white": "#FFFFFF",
  "text-neutral-900": "#1A1A18",
};

export function Principles() {
  const { principles } = content;
  const items = principles.items;

  return (
    <section id="experiencias" className="bg-[#1A1A18] py-24 md:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          className="mb-14 relative"
        >
          {/* Decoración: espada — verde paleta (solo desktop) */}
          <div className="hidden md:block pointer-events-none absolute -right-8 -top-8 opacity-[0.18] select-none" style={{ color: "#52B96B" }}>
            <Sword size={240} weight="fill" />
          </div>
          <motion.span
            variants={fadeUp}
            className="inline-flex items-center bg-white/10 text-white/70 text-xs font-semibold px-3 py-1.5 rounded-full tracking-widest uppercase mb-6"
          >
            {principles.eyebrow}
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="font-extrabold text-[clamp(2rem,4.5vw,3.5rem)] tracking-tighter leading-tight text-white"
          >
            {principles.headline}
          </motion.h2>
        </motion.div>

        {/* Bento asimétrico — stack en mobile, grid 12 cols en desktop */}
        <div
          className="flex flex-col gap-4 md:grid"
          style={{
            gridTemplateColumns: "repeat(12, 1fr)",
            gridTemplateRows: "auto",
          }}
        >
          {items.map((item, i) => {
            const Icon = iconMap[item.icon] || GameController;
            const bg = bgMap[item.bg] || "#1B2B6B";
            const textColor = textColorMap[item.textColor] || "#FFFFFF";
            const isBright = item.bg === "bg-tertiary";

            // Grid placement
            const gridStyle: React.CSSProperties =
              i === 0
                ? { gridColumn: "span 7", gridRow: "span 2" }
                : i === 1
                ? { gridColumn: "span 5" }
                : i === 2
                ? { gridColumn: "span 5" }
                : { gridColumn: "span 7" };

            const isLarge = i === 0;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ type: "spring", stiffness: 100, damping: 20, delay: i * 0.08 }}
                whileHover={{ scale: 1.015 }}
                className="rounded-2xl cursor-default transition-all duration-200"
                style={{
                  ...gridStyle,
                  backgroundColor: bg,
                  border: item.bg === "bg-neutral-800" ? "1px solid rgba(255,255,255,0.08)" : "none",
                  padding: isLarge ? "3rem" : "2.5rem",
                }}
              >
                <Icon
                  size={isLarge ? 56 : 36}
                  weight="duotone"
                  color={isBright ? "#1B2B6B" : "#F5C842"}
                  className="mb-6"
                />
                <h3
                  className={`font-bold tracking-tight leading-tight mb-3 ${isLarge ? "text-3xl" : "text-xl"}`}
                  style={{ color: textColor }}
                >
                  {item.title}
                </h3>
                <p
                  className={`leading-relaxed ${isLarge ? "text-lg" : "text-sm"}`}
                  style={{ color: textColor, opacity: 0.8 }}
                >
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
