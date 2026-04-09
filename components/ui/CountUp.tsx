"use client";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useCountUp } from "@/hooks/useCountUp";

interface CountUpProps {
  value: number;
  suffix?: string;
  className?: string;
}

export function CountUp({ value, suffix = "", className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (isInView) setStarted(true);
  }, [isInView]);

  const count = useCountUp(value, 2000, started);

  return (
    <span ref={ref} className={className}>
      {count}{suffix}
    </span>
  );
}
