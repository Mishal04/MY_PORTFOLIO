"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAME = "MISHAL";
const TAGLINE = "Full-Stack Developer";

// Total time for letters to appear: NAME.length * 80ms + buffer
const LETTERS_DONE = NAME.length * 80 + 300;
const EXIT_START   = LETTERS_DONE + 600;  // hold for 600ms then slide out
const UNMOUNT      = EXIT_START + 900;    // wait for slide animation to finish

export default function PreLoader() {
  const [show, setShow]       = useState(true);
  const [exiting, setExiting] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const exitTimer    = setTimeout(() => setExiting(true), EXIT_START);
    const unmountTimer = setTimeout(() => setShow(false),   UNMOUNT);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(unmountTimer);
    };
  }, []);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="preloader"
          initial={{ y: "0%" }}
          animate={{ y: exiting ? "-100%" : "0%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0a0a0a] overflow-hidden"
        >
          {/* Background grid */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(#6366f1 1px, transparent 1px), linear-gradient(90deg, #6366f1 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          {/* Corner accents — top left */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="absolute top-8 left-8 w-16 h-px bg-indigo-500/50 origin-left"
          />
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="absolute top-8 left-8 w-px h-16 bg-indigo-500/50 origin-top"
          />

          {/* Corner accents — bottom right */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="absolute bottom-8 right-8 w-16 h-px bg-indigo-500/50 origin-right"
          />
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="absolute bottom-8 right-8 w-px h-16 bg-indigo-500/50 origin-bottom"
          />

          {/* Name + tagline */}
          <div className="flex flex-col items-center gap-4 relative">

            {/* Letters */}
            <div className="flex items-end gap-1 md:gap-2 overflow-hidden">
              {NAME.split("").map((letter, i) => (
                <motion.span
                  key={i}
                  initial={{ y: "110%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{
                    duration: 0.55,
                    delay: 0.1 + i * 0.08,
                    ease: [0.33, 1, 0.68, 1],
                  }}
                  className="block text-[4rem] sm:text-[6rem] md:text-[8rem] font-black tracking-tight text-white leading-none select-none"
                  style={{ display: "inline-block" }}
                >
                  {letter}
                </motion.span>
              ))}

              {/* Dot */}
              <motion.span
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  delay: 0.1 + NAME.length * 0.08 + 0.05,
                  duration: 0.35,
                  ease: "backOut",
                }}
                className="text-[4rem] sm:text-[6rem] md:text-[8rem] font-black text-indigo-400 leading-none select-none"
              >
                .
              </motion.span>
            </div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + NAME.length * 0.08 + 0.2, duration: 0.5 }}
              className="text-gray-500 text-xs md:text-sm font-medium tracking-[0.35em] uppercase"
            >
              {TAGLINE}
            </motion.p>

            {/* Progress line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{
                delay: 0.1 + NAME.length * 0.08 + 0.15,
                duration: 0.7,
                ease: "easeInOut",
              }}
              className="w-24 md:w-32 h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent origin-left mt-1"
            />
          </div>

          {/* Bottom labels */}
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
      )}
    </AnimatePresence>
  );
}
