"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAME = "MISHAL";
const TAGLINE = "Full-Stack Developer";

export default function PreLoader() {
  const [mounted, setMounted] = useState(false);
  const [phase, setPhase] = useState<"letters" | "hold" | "exit" | "done">("letters");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const holdTimer  = setTimeout(() => setPhase("hold"),  NAME.length * 80 + 400);
    const exitTimer  = setTimeout(() => setPhase("exit"),  NAME.length * 80 + 900);
    const doneTimer  = setTimeout(() => setPhase("done"),  NAME.length * 80 + 1700);

    return () => {
      clearTimeout(holdTimer);
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  if (!mounted || phase === "done") return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
          key="preloader"
          initial={{ y: 0 }}
          animate={{ y: phase === "exit" ? "-100%" : 0 }}
          transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-[#0a0a0a] overflow-hidden"
        >
          {/* Background grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(#6366f1 1px, transparent 1px), linear-gradient(90deg, #6366f1 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          {/* Corner accent lines */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="absolute top-8 left-8 w-16 h-px bg-indigo-500/50 origin-left"
          />
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="absolute top-8 left-8 w-px h-16 bg-indigo-500/50 origin-top"
          />
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="absolute bottom-8 right-8 w-16 h-px bg-indigo-500/50 origin-right"
          />
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="absolute bottom-8 right-8 w-px h-16 bg-indigo-500/50 origin-bottom"
          />

          {/* Main content */}
          <div className="flex flex-col items-center gap-4 relative">

            {/* Letter-by-letter name reveal */}
            <div className="flex items-end gap-1 md:gap-2 overflow-hidden">
              {NAME.split("").map((letter, i) => (
                <motion.span
                  key={i}
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.08,
                    ease: [0.33, 1, 0.68, 1],
                  }}
                  className="block text-[4rem] sm:text-[6rem] md:text-[8rem] font-black tracking-tight text-white leading-none"
                  style={{ display: "inline-block" }}
                >
                  {letter}
                </motion.span>
              ))}

              {/* Accent dot after name */}
              <motion.span
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: NAME.length * 0.08 + 0.1, duration: 0.3, ease: "backOut" }}
                className="text-[4rem] sm:text-[6rem] md:text-[8rem] font-black text-indigo-400 leading-none"
              >
                .
              </motion.span>
            </div>

            {/* Tagline fade-in */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: NAME.length * 0.08 + 0.25, duration: 0.5 }}
              className="text-gray-500 text-xs md:text-sm font-medium tracking-[0.35em] uppercase"
            >
              {TAGLINE}
            </motion.p>

            {/* Thin progress line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{
                delay: NAME.length * 0.08 + 0.1,
                duration: 0.6,
                ease: "easeInOut",
              }}
              className="w-24 md:w-32 h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent origin-left mt-2"
            />
          </div>

          {/* Bottom counter / version tag */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="absolute bottom-8 left-0 right-0 flex justify-between px-8"
          >
            <span className="text-gray-700 text-[10px] font-mono tracking-widest">
              PORTFOLIO 2025
            </span>
            <span className="text-gray-700 text-[10px] font-mono tracking-widest">
              v2.0
            </span>
          </motion.div>
        </motion.div>
    </AnimatePresence>
  );
}
