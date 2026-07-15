"use client";

import { LazyMotion, domAnimation, m } from "framer-motion";
import Link from "next/link";
import { useReducedMotion } from "@/app/hooks/useReducedMotion";

export default function HeroText() {
  const prefersReducedMotion = useReducedMotion();

  const fadeUp = (delay: number) =>
    prefersReducedMotion
      ? {}
      : { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, delay } };

  return (
    <LazyMotion features={domAnimation}>
      <div className="flex flex-col items-center text-center lg:items-start lg:text-left relative z-10 w-full px-4 lg:px-0">

        <m.div
          {...(prefersReducedMotion ? {} : { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, delay: 0.2 } })}
        >
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 py-1.5 px-3 md:py-2 md:px-4 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-[10px] sm:text-xs md:text-sm font-medium tracking-wide mb-4 lg:mb-6 hover:bg-indigo-500/20 transition-colors duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
          >
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500" />
            </span>
            Available for full-stack opportunities
          </Link>
        </m.div>

        <m.h1
          {...fadeUp(0.4)}
          className="text-4xl sm:text-5xl md:text-7xl lg:text-[6rem] font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-100 to-indigo-400 leading-[1.1] mb-2 md:mb-4 tracking-tight whitespace-normal md:whitespace-nowrap"
        >
          Mishal Ashfaq
        </m.h1>

        <m.p
          {...fadeUp(0.6)}
          className="text-gray-400 text-sm sm:text-base md:text-lg lg:text-xl max-w-lg lg:max-w-xl mx-auto lg:mx-0 mb-6 md:mb-8 leading-relaxed"
        >
          Building modern, scalable web applications with clean design and robust backend functionality.
        </m.p>

        <m.div
          {...fadeUp(0.8)}
          className="flex flex-wrap gap-3 md:gap-4"
        >
          <Link
            href="/projects"
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 md:px-8 md:py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-full text-sm md:text-base transition-all duration-300 hover:scale-105 shadow-[0_0_30px_-10px_rgba(99,102,241,0.5)] focus:outline-none focus:ring-4 focus:ring-indigo-500/50"
          >
            See My Work
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>

          <a
            href="/resume.pdf"
            download="Mishal_Ashfaq_Resume.pdf"
            aria-label="Download Resume PDF"
            className="group inline-flex items-center justify-center gap-2 px-6 py-2.5 md:px-8 md:py-3 rounded-full text-sm md:text-base font-semibold border border-white/15 text-gray-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] transition-all duration-300 hover:scale-105 hover:border-white/25 focus:outline-none focus:ring-4 focus:ring-white/20 backdrop-blur-sm"
          >
            <svg
              className="w-4 h-4 text-indigo-400 transition-transform duration-300 group-hover:translate-y-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Resume
          </a>
        </m.div>

      </div>
    </LazyMotion>
  );
}
