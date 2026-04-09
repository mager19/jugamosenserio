"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  Ear, Lightbulb, Users, CheckCircle, GameController, type IconProps,
} from "@phosphor-icons/react";
import { fadeUp, staggerContainer } from "@/lib/animations";
import content from "@/data/content.json";

const iconMap: Record<string, React.ForwardRefExoticComponent<IconProps & React.RefAttributes<SVGSVGElement>>> = {
  Ear, Lightbulb, Users, CheckCircle,
};

const bgMap: Record<string, string> = {
  "bg-primary": "#1B2B6B",
  "bg-tertiary": "#F5C842",
  "bg-secondary": "#E8623A",
  "bg-neutral-50": "#FDFCFB",
};

const textMap: Record<string, string> = {
  "text-white": "#FFFFFF",
  "text-neutral-900": "#1A1A18",
};

export function Methodology() {
  const { methodology } = content;
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section id="metodologia" ref={sectionRef} className="bg-[#FDFCFB] py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-16 relative"
        >
          {/* Decoración: control de videojuego — azul paleta */}
          <div className="hidden md:block pointer-events-none absolute -right-8 -top-8 opacity-[0.14] select-none" style={{ color: "#4F86E8" }}>
            <GameController size={240} weight="fill" />
          </div>
          <motion.span
            variants={fadeUp}
            className="inline-flex items-center bg-tertiary/20 text-primary text-xs font-semibold px-3 py-1.5 rounded-full tracking-widest uppercase mb-6"
          >
            {methodology.eyebrow}
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="font-extrabold text-[clamp(2rem,4.5vw,3.5rem)] tracking-tighter leading-tight text-[#1A1A18] max-w-2xl"
          >
            {methodology.headline}
          </motion.h2>
          <motion.p variants={fadeUp} className="text-neutral-500 text-lg mt-4 max-w-xl">
            {methodology.subheadline}
          </motion.p>
        </motion.div>

        {/* Steps — stack visual */}
        <div className="flex flex-col gap-4">
          {methodology.steps.map((step, i) => {
            const Icon = iconMap[step.icon] || CheckCircle;
            const bg = bgMap[step.bg] || "#1B2B6B";
            const textColor = textMap[step.textColor] || "#FFFFFF";
            const isBright = step.bg === "bg-tertiary" || step.bg === "bg-neutral-50";

            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ type: "spring", stiffness: 100, damping: 20, delay: i * 0.1 }}
                className="rounded-2xl overflow-hidden"
                style={{ backgroundColor: bg, border: step.bg === "bg-neutral-50" ? "1px solid #E8E4DE" : "none" }}
              >
                <div className="grid md:grid-cols-[auto_1fr] gap-8 md:gap-12 items-start p-8 md:p-12">
                  {/* Number + icon */}
                  <div className="flex md:flex-col items-center md:items-start gap-4">
                    <span
                      className="font-extrabold text-[clamp(3rem,8vw,6rem)] leading-none"
                      style={{ color: textColor, opacity: 0.12 }}
                    >
                      {step.number}
                    </span>
                    <Icon
                      size={40}
                      weight="duotone"
                      color={isBright ? "#1B2B6B" : "#F5C842"}
                    />
                  </div>

                  {/* Content */}
                  <div>
                    <h3
                      className="font-bold text-2xl mb-3 tracking-tight"
                      style={{ color: textColor }}
                    >
                      {step.title}
                    </h3>
                    <p
                      className="text-base leading-relaxed max-w-lg"
                      style={{ color: textColor, opacity: 0.8 }}
                    >
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
