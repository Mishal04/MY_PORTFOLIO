"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function ResumePage() {
  const [loaded, setLoaded] = useState(false);

  return (
    <main className="relative z-10 min-h-screen flex flex-col bg-transparent pt-20">

      {/* Top bar */}
      <div className="w-full max-w-6xl mx-auto px-6 md:px-12 lg:px-16 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs font-bold text-indigo-400 uppercase tracking-[0.3em] mb-1">My CV</p>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Resume
          </h1>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center gap-3"
        >
          {/* Open in new tab */}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] text-gray-300 hover:text-white text-xs font-semibold transition-all duration-300 hover:border-white/20"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Open
          </a>

          {/* Download */}
          <a
            href="/resume.pdf"
            download="Mishal_Ashfaq_Resume.pdf"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all duration-300 hover:scale-105 shadow-[0_0_20px_-5px_rgba(99,102,241,0.6)]"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download CV
          </a>
        </motion.div>
      </div>

      {/* PDF viewer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex-1 w-full max-w-6xl mx-auto px-6 md:px-12 lg:px-16 pb-16"
      >
        <div className="relative w-full rounded-2xl overflow-hidden border border-white/[0.08] shadow-2xl bg-white/[0.02]"
          style={{ minHeight: "85vh" }}
        >
          {/* Loading skeleton */}
          {!loaded && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[#0d0d0d]">
              <div className="w-10 h-10 rounded-full border-2 border-indigo-500/30 border-t-indigo-500 animate-spin" />
              <p className="text-gray-500 text-sm">Loading resume…</p>
            </div>
          )}

          <iframe
            src="/resume.pdf#toolbar=0&navpanes=0&scrollbar=1&view=FitH"
            className={`w-full transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
            style={{ minHeight: "85vh", border: "none" }}
            onLoad={() => setLoaded(true)}
            title="Mishal Ashfaq Resume"
          />
        </div>
      </motion.div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="w-full max-w-6xl mx-auto px-6 md:px-12 lg:px-16 pb-16 flex flex-col sm:flex-row items-center justify-between gap-4"
      >
        <p className="text-gray-600 text-xs">
          Want to work together?{" "}
          <Link href="/contact" className="text-indigo-400 hover:text-indigo-300 transition-colors">
            Get in touch →
          </Link>
        </p>
        <a
          href="/resume.pdf"
          download="Mishal_Ashfaq_Resume.pdf"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold transition-all duration-300 hover:scale-105 shadow-[0_0_25px_-5px_rgba(99,102,241,0.5)]"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download CV
        </a>
      </motion.div>

    </main>
  );
}
