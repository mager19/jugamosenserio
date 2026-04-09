"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { List, X } from "@phosphor-icons/react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import content from "@/data/content.json";

// Cuadritos del puzzle: color + posición base en grid 2×2
const SQUARES = [
  { color: "#4F86E8", left: "0%",  top: "0%"  }, // azul    ↖
  { color: "#F5C842", left: "50%", top: "0%"  }, // amarillo ↗
  { color: "#52B96B", left: "0%",  top: "50%" }, // verde   ↙
  { color: "#E8694A", left: "50%", top: "50%" }, // naranja  ↘
];


// Radio de órbita y keyframes por fase para cada cuadrito
// Cada uno orbita 360° desfasado 90° del anterior → forman un cuadrado giratorio
const R = 5;
const orbitX = (phase: number) => {
  const a = (n: number) => Math.cos((n * Math.PI) / 2 + phase) * R;
  return [a(0), a(1), a(2), a(3), a(4)];
};
const orbitY = (phase: number) => {
  const a = (n: number) => Math.sin((n * Math.PI) / 2 + phase) * R;
  return [a(0), a(1), a(2), a(3), a(4)];
};

const ORBIT = [0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((phase) => ({
  x: orbitX(phase),
  y: orbitY(phase),
}));

const LOOP = { repeat: Infinity, duration: 5, ease: "linear" as const };

function PuzzleSquares() {
  return (
    <div className="relative w-9 h-9 shrink-0">
      {SQUARES.map((sq, i) => (
        <motion.div
          key={i}
          animate={{ x: ORBIT[i].x, y: ORBIT[i].y }}
          transition={LOOP}
          style={{
            backgroundColor: sq.color,
            position: "absolute",
            left: sq.left,
            top: sq.top,
            width: 14,
            height: 14,
            borderRadius: 3,
          }}
        />
      ))}
    </div>
  );
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { nav } = content;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#FDFCFB] border-b border-neutral-200/60 py-3 shadow-sm"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="font-extrabold text-xl text-primary tracking-tight leading-none">
            Jugamos<br />
            <span className="text-secondary">en Serio</span>
          </a>

          {/* Desktop nav links */}
          <nav className="hidden md:flex items-center gap-8">
            {nav.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="relative text-sm font-medium text-neutral-700 hover:text-primary transition-colors duration-200 group"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Derecha: cuadritos + CTA */}
          <div className="hidden md:flex items-center gap-5">
            <PuzzleSquares />
            <MagneticButton
              as="a"
              href={nav.cta.href}
              className="bg-tertiary text-primary font-semibold text-sm px-5 py-2.5 rounded-md hover:bg-tertiary-dark transition-colors duration-200 inline-block"
            >
              {nav.cta.label}
            </MagneticButton>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-primary p-1"
            onClick={() => setOpen(!open)}
            aria-label="Menú"
          >
            {open ? <X size={24} weight="bold" /> : <List size={24} weight="bold" />}
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 35 }}
            className="fixed inset-y-0 right-0 z-40 w-72 bg-[#FDFCFB] shadow-2xl flex flex-col pt-24 px-8 pb-8"
          >
            <nav className="flex flex-col gap-6">
              {nav.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-2xl font-bold text-primary hover:text-secondary transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="mt-auto">
              <a
                href={nav.cta.href}
                onClick={() => setOpen(false)}
                className="block w-full bg-tertiary text-primary font-bold text-center py-4 rounded-md"
              >
                {nav.cta.label}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 bg-black/20 md:hidden"
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
