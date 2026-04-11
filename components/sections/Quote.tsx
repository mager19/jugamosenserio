"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { staggerContainer, fadeUp, slideInLeft } from "@/lib/animations";
import content from "@/data/content.json";

export function Quote() {
  const { quote } = content;

  return (
    <section className="bg-primary overflow-hidden">
      <div className="max-w-[1440px] mx-auto grid md:grid-cols-[45fr_55fr] min-h-[60dvh]">
        {/* Left: foto */}
        <motion.div
          variants={slideInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative h-72 md:h-auto overflow-hidden"
        >
          <Image
            src={quote.author.image.src}
            alt={quote.author.image.alt}
            fill
            className="object-cover object-[center_15%]"
            style={{ filter: "grayscale(40%) brightness(0.9)" }}
            sizes="45vw"
          />
          {/* Tinte azul duotone */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "#1B2B6B",
              mixBlendMode: "color",
              opacity: 0.35,
            }}
          />
          {/* Fade lateral hacia el texto */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(to right, transparent 45%, #1B2B6B 95%)",
            }}
          />
          {/* Fade inferior para anclar */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(to top, #1B2B6B 0%, transparent 35%)",
            }}
          />
          {/* Badge nombre */}
          <div className="absolute bottom-8 left-8 bg-tertiary text-primary font-bold text-sm px-4 py-2 rounded">
            {quote.author.name}
          </div>
        </motion.div>

        {/* Right: cita */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative flex flex-col justify-center pl-8 md:pl-16 pr-8 md:pr-20 py-16 md:py-24"
        >
          {/* Quote mark decorativo */}
          <span
            className="absolute top-8 right-8 text-secondary font-serif leading-none opacity-20 select-none pointer-events-none"
            style={{ fontSize: "160px" }}
          >
            &ldquo;
          </span>

          <motion.blockquote
            variants={fadeUp}
            className="relative z-10 font-semibold text-2xl md:text-3xl xl:text-4xl leading-snug text-white tracking-tight"
          >
            {quote.text}
          </motion.blockquote>

          <motion.div variants={fadeUp} className="w-16 h-0.5 bg-tertiary mt-8 mb-4" />

          <motion.div variants={fadeUp}>
            <p className="text-white font-bold text-base">{quote.author.name}</p>
            <p className="text-tertiary text-sm">{quote.author.role}</p>
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="text-blue-200/70 text-sm leading-relaxed mt-6 max-w-md"
          >
            {quote.author.bio}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
