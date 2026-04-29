"use client";

import { motion } from "framer-motion";

export default function HeroText() {
  return (
    <div className="flex flex-col items-center text-center lg:items-start lg:text-left relative z-10 w-full px-4 lg:px-0">

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="inline-flex items-center gap-2 py-1.5 px-3 md:py-2 md:px-4 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-[10px] sm:text-xs md:text-sm font-medium tracking-wide mb-4 lg:mb-6"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
        </span>
        Available for full-stack opportunities
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-4xl sm:text-5xl md:text-7xl lg:text-[6rem] font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-100 to-indigo-400 leading-[1.1] mb-2 md:mb-4 tracking-tight whitespace-nowrap"
      >
        Mishal Ashfaq
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="text-gray-400 text-sm sm:text-base md:text-lg lg:text-xl max-w-lg lg:max-w-xl mx-auto lg:mx-0 mb-6 md:mb-8 leading-relaxed"
      >
        Building modern, scalable web applications with clean design and robust backend functionality.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="flex gap-4 md:gap-6"
      >
        <a 
          href="#projects" 
          aria-label="See My Work"
          className="inline-flex items-center justify-center px-6 py-2 md:px-8 md:py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-full text-sm md:text-base transition-all duration-300 hover:scale-105 shadow-[0_0_30px_-10px_rgba(99,102,241,0.5)] focus:outline-none focus:ring-4 focus:ring-indigo-500/50"
        >
          See My Work
        </a>
      </motion.div>

    </div>
  );
}