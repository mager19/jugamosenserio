"use client";
import { motion } from "framer-motion";
import { useMagnetic } from "@/hooks/useMagnetic";
import { springConfig } from "@/lib/animations";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  as?: "button" | "a";
  href?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: () => void;
}

export function MagneticButton({
  children,
  className,
  as = "button",
  href,
  type = "button",
  disabled,
  onClick,
}: MagneticButtonProps) {
  const { ref, position, handleMouseMove, handleMouseLeave } = useMagnetic(0.35);

  if (as === "a" && href) {
    return (
      <motion.a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{ x: position.x, y: position.y }}
        transition={springConfig.snappy}
        className={className}
        onClick={onClick}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref as React.Ref<HTMLButtonElement>}
      type={type}
      disabled={disabled}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={springConfig.snappy}
      className={className}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
}
