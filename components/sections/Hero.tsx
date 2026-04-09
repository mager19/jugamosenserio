"use client";
import { useRef } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { ArrowRight } from "@phosphor-icons/react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { staggerContainer, fadeUp } from "@/lib/animations";
import content from "@/data/content.json";

export function Hero() {
  const { hero } = content;
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Scrubea el video mientras el hero está visible en pantalla
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const vid = videoRef.current;
    if (!vid || !vid.duration) return;
    vid.currentTime = progress * vid.duration;
  });

  return (
    <section
      ref={sectionRef}
      id="nosotros"
      className="min-h-[100dvh] bg-[#FDFCFB] overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto grid md:grid-cols-[55fr_45fr] min-h-[100dvh]">

        {/* ── Columna izquierda ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.01 }}
          className="flex flex-col justify-center px-6 md:pl-16 md:pr-8 pt-28 pb-16 md:py-0"
        >
          <motion.span
            variants={fadeUp}
            className="inline-flex items-center self-start bg-tertiary/20 text-primary text-xs font-semibold px-3 py-1.5 rounded-full tracking-widest uppercase mb-8"
          >
            {hero.pill}
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="font-extrabold text-[clamp(2.5rem,6vw,5.5rem)] tracking-tighter leading-[0.92] text-[#1A1A18] mb-6"
          >
            El poder del juego{" "}
            <span className="text-secondary">al servicio</span>
            {" "}del equipo.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-lg text-neutral-500 font-normal max-w-md leading-relaxed mb-10"
          >
            {hero.subheadline}
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 items-start">
            <MagneticButton
              as="a"
              href={hero.ctas[0].href}
              className="bg-secondary text-white font-semibold px-7 py-4 rounded-lg hover:bg-secondary-dark transition-colors duration-200 text-sm inline-block"
            >
              {hero.ctas[0].label}
            </MagneticButton>
            <a
              href={hero.ctas[1].href}
              className="text-primary font-medium underline-offset-4 hover:underline flex items-center gap-2 py-4 text-sm transition-all duration-200"
            >
              {hero.ctas[1].label}
              <ArrowRight size={16} weight="bold" />
            </a>
          </motion.div>
        </motion.div>

        {/* ── Columna derecha — Puzzle animado con scroll ── */}
        <div className="relative hidden md:block overflow-hidden">
          <video
            ref={videoRef}
            src="/videos/slider-puzzle.mp4"
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover scale-[0.85]"
          />
        </div>

      </div>
    </section>
  );
}
