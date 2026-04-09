"use client";
import { motion } from "framer-motion";
import { Star, Trophy } from "@phosphor-icons/react";
import { fadeUp, staggerContainer } from "@/lib/animations";
import content from "@/data/content.json";

const sizeMap = {
  large: "w-[440px] min-h-[280px]",
  small: "w-[340px] min-h-[240px] mt-10",
  medium: "w-[390px] min-h-[260px] mt-5",
};

export function Testimonials() {
  const { testimonials } = content;

  return (
    <section className="bg-[#FDFCFB] py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-12 relative"
        >
          {/* Decoración: trofeo — amarillo paleta */}
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

        {/* Scroll horizontal asimétrico */}
        <div className="overflow-x-auto scrollbar-hide -mx-6 px-6">
          <div className="flex gap-5 w-max pb-6">
            {testimonials.items.map((item, i) => {
              const sizeClass = sizeMap[item.size as keyof typeof sizeMap] || sizeMap.medium;

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 100, damping: 20, delay: i * 0.1 }}
                  className={`${sizeClass} flex-shrink-0 border border-neutral-200 rounded-2xl p-8 bg-white flex flex-col`}
                >
                  {/* Stars */}
                  <div className="flex gap-1 mb-5">
                    {Array.from({ length: item.rating }).map((_, j) => (
                      <Star key={j} size={16} weight="fill" className="text-tertiary" />
                    ))}
                  </div>

                  {/* Text */}
                  <p className="text-lg leading-relaxed text-[#1A1A18] font-medium flex-1">
                    &ldquo;{item.text}&rdquo;
                  </p>

                  {/* Divider */}
                  <div className="w-8 h-0.5 bg-secondary mt-6 mb-4" />

                  {/* Author */}
                  <div>
                    <p className="font-bold text-sm text-[#1A1A18]">{item.author}</p>
                    <p className="text-neutral-500 text-xs uppercase tracking-wider mt-0.5">
                      {item.company}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
