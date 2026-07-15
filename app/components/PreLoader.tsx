"use client";

import { useEffect, useRef, useState } from "react";

const NAME    = "MISHAL";
const TAGLINE = "FULL · STACK · DEVELOPER";

export default function PreLoader() {
  const [visible, setVisible] = useState(true);
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;

    document.fonts.ready.then(() => {
      // Skip all animations if user prefers reduced motion
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const root = document.getElementById("pl-root");
      if (root) root.classList.add("pl-ready");

      const exitDelay = prefersReduced ? 0 : 1300;
      const unmountDelay = prefersReduced ? 50 : 2000;

      setTimeout(() => {
        if (root) root.classList.add("pl-exit");
        setTimeout(() => setVisible(false), prefersReduced ? 50 : 700);
      }, exitDelay);
    });
  }, []);

  if (!visible) return null;

  return (
    <>
      <style>{`
        /* ── letter clip-reveal ── */
        .pl-letter-wrap {
          display: inline-block;
          overflow: hidden;
          line-height: 1.05;
        }
        .pl-letter {
          display: inline-block;
          opacity: 0;
          transform: translateY(110%);
          will-change: transform, opacity;
        }
        /* stagger via custom property */
        ${NAME.split("").map((_, i) => `
        #pl-root.pl-ready .pl-letter-${i} {
          animation: pl-rise 0.75s cubic-bezier(0.16,1,0.3,1) ${(i * 0.06).toFixed(2)}s both;
        }`).join("")}
        #pl-root.pl-ready .pl-dot {
          animation: pl-rise 0.75s cubic-bezier(0.16,1,0.3,1) ${(NAME.length * 0.06).toFixed(2)}s both;
        }

        @keyframes pl-rise {
          from { opacity: 0; transform: translateY(110%); }
          to   { opacity: 1; transform: translateY(0%);   }
        }

        /* ── line scale ── */
        .pl-line {
          transform: scaleX(0);
          transform-origin: center;
          opacity: 0;
          will-change: transform, opacity;
        }
        #pl-root.pl-ready .pl-line {
          animation: pl-line-grow 0.9s cubic-bezier(0.25,0.46,0.45,0.94) ${(NAME.length * 0.06 + 0.18).toFixed(2)}s both;
        }
        @keyframes pl-line-grow {
          from { opacity: 0; transform: scaleX(0); }
          to   { opacity: 1; transform: scaleX(1); }
        }

        /* ── tagline fade up ── */
        .pl-tagline {
          opacity: 0;
          transform: translateY(8px);
          will-change: transform, opacity;
        }
        #pl-root.pl-ready .pl-tagline {
          animation: pl-fade-up 0.7s cubic-bezier(0.25,0.46,0.45,0.94) ${(NAME.length * 0.06 + 0.32).toFixed(2)}s both;
        }

        /* ── brackets ── */
        .pl-bx { transform: scaleX(0); opacity: 0; will-change: transform, opacity; }
        .pl-by { transform: scaleY(0); opacity: 0; will-change: transform, opacity; }
        #pl-root.pl-ready .pl-bx { animation: pl-bx-in 0.5s cubic-bezier(0.16,1,0.3,1) 0.05s both; }
        #pl-root.pl-ready .pl-by { animation: pl-by-in 0.5s cubic-bezier(0.16,1,0.3,1) 0.05s both; }
        @keyframes pl-bx-in { from { opacity:0; transform:scaleX(0); } to { opacity:1; transform:scaleX(1); } }
        @keyframes pl-by-in { from { opacity:0; transform:scaleY(0); } to { opacity:1; transform:scaleY(1); } }

        /* ── labels ── */
        .pl-labels { opacity: 0; transform: translateY(6px); will-change: transform, opacity; }
        #pl-root.pl-ready .pl-labels {
          animation: pl-fade-up 0.7s cubic-bezier(0.25,0.46,0.45,0.94) 0.55s both;
        }

        /* ── glow ── */
        .pl-glow { opacity: 0; transform: scale(0.7); will-change: transform, opacity; }
        #pl-root.pl-ready .pl-glow {
          animation: pl-glow-in 1.2s cubic-bezier(0.25,0.46,0.45,0.94) 0s both;
        }
        @keyframes pl-glow-in { from { opacity:0; transform:scale(0.7); } to { opacity:1; transform:scale(1); } }

        @keyframes pl-fade-up {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0);   }
        }

        /* ── exit slide up ── */
        .pl-exit {
          animation: pl-slide-up 0.7s cubic-bezier(0.76,0,0.24,1) 0s both !important;
        }
        @keyframes pl-slide-up {
          from { transform: translateY(0%);    }
          to   { transform: translateY(-100%); }
        }
      `}</style>

      <div
        id="pl-root"
        role="status"
        aria-label="Loading portfolio"
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0a0a0a] overflow-hidden"
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
          className="pl-glow absolute w-[560px] h-[260px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(99,102,241,0.13) 0%, transparent 70%)" }}
        />

        {/* Top-left bracket */}
        <div className="absolute top-8 left-8">
          <div className="pl-bx w-8 h-px bg-indigo-500/50 origin-left" />
          <div className="pl-by w-px h-8 bg-indigo-500/50 origin-top"  />
        </div>

        {/* Bottom-right bracket */}
        <div className="absolute bottom-8 right-8 flex flex-col items-end">
          <div className="pl-bx w-8 h-px bg-indigo-500/50 origin-right"  />
          <div className="pl-by w-px h-8 bg-indigo-500/50 origin-bottom" />
        </div>

        {/* Content */}
        <div className="relative flex flex-col items-center gap-5 select-none">

          {/* Letters */}
          <div className="flex items-baseline">
            {NAME.split("").map((char, i) => (
              <div key={i} className="pl-letter-wrap">
                <span
                  className={`pl-letter pl-letter-${i} text-[clamp(3.5rem,13vw,8.5rem)] font-black tracking-[-0.03em] text-white`}
                >
                  {char}
                </span>
              </div>
            ))}
            <div className="pl-letter-wrap">
              <span className="pl-letter pl-dot text-[clamp(3.5rem,13vw,8.5rem)] font-black text-indigo-400">
                .
              </span>
            </div>
          </div>

          {/* Line */}
          <div
            className="pl-line w-48 md:w-64 h-px"
            style={{ background: "linear-gradient(90deg,transparent,rgba(99,102,241,0.55),transparent)" }}
          />

          {/* Tagline */}
          <p className="pl-tagline text-[9px] md:text-[11px] font-semibold tracking-[0.4em] text-gray-500 uppercase">
            {TAGLINE}
          </p>
        </div>

        {/* Labels */}
        <div className="pl-labels absolute bottom-8 left-0 right-0 flex justify-between px-10 md:px-14">
          <span className="text-[9px] text-gray-700 font-mono tracking-[0.18em] uppercase">Portfolio · 2025</span>
          <span className="text-[9px] text-gray-700 font-mono tracking-[0.18em]">v2.0</span>
        </div>
      </div>
    </>
  );
}
