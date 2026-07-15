"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAME    = "MISHAL";
const TAGLINE = "FULL-STACK DEVELOPER";

export default function PreLoader() {
  const [visible, setVisible]   = useState(true);
  const [exit, setExit]         = useState(false);
  const [fontsReady, setFonts]  = useState(false);

  // Wait for fonts so letters render at equal size from frame 1
  useEffect(() => {
    document.fonts.ready.then(() => {
      setFonts(true);
    });
  }, []);

  // Start exit sequence after fonts + animation completes
  useEffect(() => {
    if (!fontsReady) return;
    const t1 = setTimeout(() => setExit(true),    2200);
    const t2 = setTimeout(() => setVisible(false), 3100);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [fontsReady]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          initial={{ y: "0%" }}
          animate={{ y: exit ? "-100%" : "0%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0a0a0a] overflow-hidden"
        >
          {/* Subtle grid */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(rgba(99,102,241,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.07) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          {/* Top-left bracket */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: fontsReady ? 1 : 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="absolute top-8 left-8"
          >
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: fontsReady ? 1 : 0 }}
              transition={{ duration: 0.4, delay: 0.15, ease: "easeOut" }}
              className="w-10 h-px bg-indigo-500/60 origin-left"
            />
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: fontsReady ? 1 : 0 }}
              transition={{ duration: 0.4, delay: 0.15, ease: "easeOut" }}
              className="w-px h-10 bg-indigo-500/60 origin-top"
            />
          </motion.div>

          {/* Bottom-right bracket */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: fontsReady ? 1 : 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="absolute bottom-8 right-8 flex flex-col items-end"
          >
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: fontsReady ? 1 : 0 }}
              transition={{ duration: 0.4, delay: 0.15, ease: "easeOut" }}
              className="w-10 h-px bg-indigo-500/60 origin-right"
            />
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: fontsReady ? 1 : 0 }}
              transition={{ duration: 0.4, delay: 0.15, ease: "easeOut" }}
              className="w-px h-10 bg-indigo-500/60 origin-bottom"
            />
          </motion.div>

          {/* Center content */}
          <div className="flex flex-col items-center gap-5 select-none">

            {/* Name row */}
            <div className="flex items-baseline overflow-hidden">
              {fontsReady && NAME.split("").map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.07,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="inline-block text-[clamp(3.5rem,12vw,8rem)] font-black leading-none tracking-[-0.02em] text-white"
                >
                  {char}
                </motion.span>
              ))}

              {/* Dot */}
              {fontsReady && (
                <motion.span
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    duration: 0.4,
                    delay: NAME.length * 0.07 + 0.05,
                    ease: [0.34, 1.56, 0.64, 1],
                  }}
                  className="inline-block text-[clamp(3.5rem,12vw,8rem)] font-black leading-none text-indigo-400 ml-0.5"
                >
                  .
                </motion.span>
              )}
            </div>

            {/* Divider line */}
            {fontsReady && (
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{
                  duration: 0.7,
                  delay: NAME.length * 0.07 + 0.2,
                  ease: "easeInOut",
                }}
                className="w-full h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent origin-center"
              />
            )}

            {/* Tagline */}
            {fontsReady && (
              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: NAME.length * 0.07 + 0.35,
                  ease: "easeOut",
                }}
                className="text-[10px] md:text-xs font-semibold tracking-[0.4em] text-gray-500 uppercase"
              >
                {TAGLINE}
              </motion.p>
            )}
          </div>

          {/* Bottom labels */}
          {fontsReady && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="absolute bottom-8 left-0 right-0 flex justify-between px-8 md:px-12"
            >
              <span className="text-[9px] text-gray-700 font-mono tracking-[0.2em] uppercase">
                Portfolio 2025
              </span>
              <span className="text-[9px] text-gray-700 font-mono tracking-[0.2em]">
                v2.0
              </span>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
