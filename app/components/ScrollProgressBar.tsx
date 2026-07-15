"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useReducedMotion } from "@/app/hooks/useReducedMotion";

export default function ScrollProgressBar() {
  const prefersReducedMotion = useReducedMotion();
  const raw      = useMotionValue(0);
  const smoothed = useSpring(raw, { stiffness: 200, damping: 40 });
  const scaleX   = useTransform(smoothed, [0, 100], [0, 1]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop  = window.scrollY;
      const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
      const pct        = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      raw.set(pct);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [raw]);

  if (prefersReducedMotion) return null;

  return (
    <motion.div
      role="progressbar"
      aria-label="Page scroll progress"
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-[60] h-[2px] origin-left"
      style={{
        scaleX,
        background:  "linear-gradient(90deg, #6366f1, #818cf8, #a5b4fc)",
        boxShadow:   "0 0 10px rgba(99,102,241,0.6), 0 0 20px rgba(99,102,241,0.3)",
      }}
    />
  );
}
