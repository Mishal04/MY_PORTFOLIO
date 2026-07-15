"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, AnimatePresence } from "framer-motion";

const NAME    = "MISHAL";
const TAGLINE = "FULL · STACK · DEVELOPER";

export default function PreLoader() {
  const [visible, setVisible] = useState(true);
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const run = async () => {
      await document.fonts.ready;

      // ── Entrance ──────────────────────────────────────────
      // corner brackets
      animate("#pl-tl-x", { scaleX: [0, 1] }, { duration: 0.45, ease: [0.16, 1, 0.3, 1] });
      animate("#pl-tl-y", { scaleY: [0, 1] }, { duration: 0.45, ease: [0.16, 1, 0.3, 1] });
      animate("#pl-br-x", { scaleX: [0, 1] }, { duration: 0.45, ease: [0.16, 1, 0.3, 1] });
      animate("#pl-br-y", { scaleY: [0, 1] }, { duration: 0.45, ease: [0.16, 1, 0.3, 1] });

      // glow
      animate("#pl-glow", { opacity: [0, 1], scale: [0.7, 1] }, { duration: 1.1, ease: [0.25, 0.46, 0.45, 0.94] });

      // letters — staggered, each from clip
      NAME.split("").forEach((_, i) => {
        animate(
          `#pl-letter-${i}`,
          { y: ["105%", "0%"], opacity: [0, 1] },
          { duration: 0.7, delay: i * 0.055, ease: [0.16, 1, 0.3, 1] }
        );
      });

      // dot
      animate(
        "#pl-dot",
        { y: ["105%", "0%"], opacity: [0, 1] },
        { duration: 0.7, delay: NAME.length * 0.055, ease: [0.16, 1, 0.3, 1] }
      );

      // line, tagline, labels
      const afterLetters = NAME.length * 0.055 + 0.15;
      animate("#pl-line",    { scaleX: [0, 1], opacity: [0, 1] }, { duration: 0.8, delay: afterLetters,        ease: [0.25, 0.46, 0.45, 0.94] });
      animate("#pl-tagline", { opacity: [0, 1], y: [8, 0]      }, { duration: 0.7, delay: afterLetters + 0.12, ease: [0.25, 0.46, 0.45, 0.94] });
      animate("#pl-labels",  { opacity: [0, 1], y: [6, 0]      }, { duration: 0.7, delay: afterLetters + 0.2,  ease: [0.25, 0.46, 0.45, 0.94] });

      // ── Hold then exit ─────────────────────────────────────
      const holdMs = 900;
      const totalEntranceMs = (afterLetters + 0.9) * 1000;
      await new Promise(r => setTimeout(r, totalEntranceMs + holdMs));

      await animate(
        "#pl-root",
        { y: ["0%", "-100%"] },
        { duration: 1.0, ease: [0.76, 0, 0.24, 1] }
      ).then(() => setVisible(false));
    };

    run();
  }, []);

  if (!visible) return null;

  return (
    <div
      id="pl-root"
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0a0a0a] overflow-hidden will-change-transform"
    >
      {/* Grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(99,102,241,0.05) 1px,transparent 1px)," +
            "linear-gradient(90deg,rgba(99,102,241,0.05) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Glow */}
      <div
        id="pl-glow"
        className="absolute w-[560px] h-[260px] rounded-full pointer-events-none opacity-0"
        style={{ background: "radial-gradient(ellipse, rgba(99,102,241,0.13) 0%, transparent 70%)" }}
      />

      {/* Top-left bracket */}
      <div className="absolute top-8 left-8">
        <div id="pl-tl-x" className="w-8 h-px bg-indigo-500/50 origin-left" style={{ transform: "scaleX(0)" }} />
        <div id="pl-tl-y" className="w-px h-8 bg-indigo-500/50 origin-top"  style={{ transform: "scaleY(0)" }} />
      </div>

      {/* Bottom-right bracket */}
      <div className="absolute bottom-8 right-8 flex flex-col items-end">
        <div id="pl-br-x" className="w-8 h-px bg-indigo-500/50 origin-right"  style={{ transform: "scaleX(0)" }} />
        <div id="pl-br-y" className="w-px h-8 bg-indigo-500/50 origin-bottom" style={{ transform: "scaleY(0)" }} />
      </div>

      {/* Content */}
      <div className="relative flex flex-col items-center gap-5 select-none">

        {/* Letters */}
        <div className="flex items-baseline gap-0">
          {NAME.split("").map((char, i) => (
            <div key={i} className="overflow-hidden leading-none">
              <div
                id={`pl-letter-${i}`}
                className="inline-block text-[clamp(3.5rem,13vw,8.5rem)] font-black leading-[1.05] tracking-[-0.03em] text-white opacity-0"
                style={{ transform: "translateY(105%)" }}
              >
                {char}
              </div>
            </div>
          ))}

          {/* Dot */}
          <div className="overflow-hidden leading-none">
            <div
              id="pl-dot"
              className="inline-block text-[clamp(3.5rem,13vw,8.5rem)] font-black leading-[1.05] text-indigo-400 opacity-0"
              style={{ transform: "translateY(105%)" }}
            >
              .
            </div>
          </div>
        </div>

        {/* Line */}
        <div
          id="pl-line"
          className="w-48 md:w-64 h-px origin-center opacity-0"
          style={{
            transform: "scaleX(0)",
            background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.55), transparent)",
          }}
        />

        {/* Tagline */}
        <p
          id="pl-tagline"
          className="text-[9px] md:text-[11px] font-semibold tracking-[0.4em] text-gray-500 uppercase opacity-0"
          style={{ transform: "translateY(8px)" }}
        >
          {TAGLINE}
        </p>
      </div>

      {/* Bottom labels */}
      <div
        id="pl-labels"
        className="absolute bottom-8 left-0 right-0 flex justify-between px-10 md:px-14 opacity-0"
        style={{ transform: "translateY(6px)" }}
      >
        <span className="text-[9px] text-gray-700 font-mono tracking-[0.18em] uppercase">Portfolio · 2025</span>
        <span className="text-[9px] text-gray-700 font-mono tracking-[0.18em]">v2.0</span>
      </div>
    </div>
  );
}
