"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";

const NAME    = "MISHAL";
const TAGLINE = "FULL · STACK · DEVELOPER";

// Silky custom ease — gentle overshoot, no bounce
const SMOOTH: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];
const EXPO:   [number, number, number, number] = [0.16, 1,    0.3,  1   ];
const EXIT:   [number, number, number, number] = [0.76, 0,    0.24, 1   ];

export default function PreLoader() {
  const [fontsReady, setFonts]  = useState(false);
  const [visible,    setVisible] = useState(true);
  const [exiting,    setExiting] = useState(false);

  useEffect(() => {
    document.fonts.ready.then(() => setFonts(true));
  }, []);

  useEffect(() => {
    if (!fontsReady) return;
    // letters finish at ~(NAME.length * 60ms + 600ms) ≈ 960ms
    // hold for ~800ms then exit
    const t1 = setTimeout(() => setExiting(true),   1900);
    const t2 = setTimeout(() => setVisible(false),   2950);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [fontsReady]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          initial={{ y: "0%"   }}
          animate={{ y: exiting ? "-100%" : "0%" }}
          transition={{ duration: 1.05, ease: EXIT }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0a0a0a] overflow-hidden will-change-transform"
        >

          {/* Grid overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(rgba(99,102,241,0.05) 1px,transparent 1px)," +
                "linear-gradient(90deg,rgba(99,102,241,0.05) 1px,transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          {/* Radial glow behind text */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: fontsReady ? 1 : 0, scale: fontsReady ? 1 : 0.6 }}
            transition={{ duration: 1.2, ease: SMOOTH }}
            className="absolute w-[600px] h-[300px] rounded-full pointer-events-none"
            style={{ background: "radial-gradient(ellipse, rgba(99,102,241,0.10) 0%, transparent 70%)" }}
          />

          {/* Top-left corner bracket */}
          <div className="absolute top-8 left-8">
            <motion.div
              initial={{ scaleX: 0 }} animate={{ scaleX: fontsReady ? 1 : 0 }}
              transition={{ duration: 0.5, delay: 0.05, ease: EXPO }}
              className="w-8 h-px bg-indigo-500/40 origin-left"
            />
            <motion.div
              initial={{ scaleY: 0 }} animate={{ scaleY: fontsReady ? 1 : 0 }}
              transition={{ duration: 0.5, delay: 0.05, ease: EXPO }}
              className="w-px h-8 bg-indigo-500/40 origin-top"
            />
          </div>

          {/* Bottom-right corner bracket */}
          <div className="absolute bottom-8 right-8 flex flex-col items-end">
            <motion.div
              initial={{ scaleX: 0 }} animate={{ scaleX: fontsReady ? 1 : 0 }}
              transition={{ duration: 0.5, delay: 0.05, ease: EXPO }}
              className="w-8 h-px bg-indigo-500/40 origin-right"
            />
            <motion.div
              initial={{ scaleY: 0 }} animate={{ scaleY: fontsReady ? 1 : 0 }}
              transition={{ duration: 0.5, delay: 0.05, ease: EXPO }}
              className="w-px h-8 bg-indigo-500/40 origin-bottom"
            />
          </div>

          {/* ── Main content ── */}
          <div className="relative flex flex-col items-center gap-6 select-none">

            {/* Name — each letter slides up from its own clip */}
            <div className="flex items-baseline gap-0">
              {NAME.split("").map((char, i) => (
                <div key={i} className="overflow-hidden leading-none">
                  <motion.span
                    initial={{ y: "105%", opacity: 0 }}
                    animate={{
                      y:       fontsReady ? "0%"  : "105%",
                      opacity: fontsReady ? 1      : 0,
                    }}
                    transition={{
                      y:       { duration: 0.75, delay: i * 0.06, ease: EXPO   },
                      opacity: { duration: 0.4,  delay: i * 0.06, ease: SMOOTH },
                    }}
                    className="inline-block text-[clamp(3.5rem,13vw,8.5rem)] font-black leading-[1] tracking-[-0.03em] text-white"
                  >
                    {char}
                  </motion.span>
                </div>
              ))}

              {/* Dot — pops in with spring */}
              <div className="overflow-hidden leading-none">
                <motion.span
                  initial={{ y: "105%", opacity: 0 }}
                  animate={{
                    y:       fontsReady ? "0%"  : "105%",
                    opacity: fontsReady ? 1      : 0,
                  }}
                  transition={{
                    y:       { duration: 0.75, delay: NAME.length * 0.06 + 0.04, ease: EXPO   },
                    opacity: { duration: 0.4,  delay: NAME.length * 0.06 + 0.04, ease: SMOOTH },
                  }}
                  className="inline-block text-[clamp(3.5rem,13vw,8.5rem)] font-black leading-[1] text-indigo-400"
                >
                  .
                </motion.span>
              </div>
            </div>

            {/* Thin line */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{
                scaleX:  fontsReady ? 1 : 0,
                opacity: fontsReady ? 1 : 0,
              }}
              transition={{ duration: 0.9, delay: NAME.length * 0.06 + 0.18, ease: SMOOTH }}
              className="w-48 md:w-64 h-px origin-center"
              style={{ background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.6), transparent)" }}
            />

            {/* Tagline — character by character opacity */}
            <motion.p
              initial={{ opacity: 0, letterSpacing: "0.2em" }}
              animate={{
                opacity:       fontsReady ? 1      : 0,
                letterSpacing: fontsReady ? "0.4em" : "0.2em",
              }}
              transition={{ duration: 0.9, delay: NAME.length * 0.06 + 0.3, ease: SMOOTH }}
              className="text-[9px] md:text-[11px] font-semibold text-gray-500 uppercase"
            >
              {TAGLINE}
            </motion.p>
          </div>

          {/* Bottom labels */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: fontsReady ? 1 : 0, y: fontsReady ? 0 : 6 }}
            transition={{ duration: 0.7, delay: 0.6, ease: SMOOTH }}
            className="absolute bottom-8 left-0 right-0 flex justify-between px-10 md:px-14"
          >
            <span className="text-[9px] text-gray-700 font-mono tracking-[0.18em] uppercase">
              Portfolio · 2025
            </span>
            <span className="text-[9px] text-gray-700 font-mono tracking-[0.18em]">
              v2.0
            </span>
          </motion.div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
