"use client";

import { LazyMotion, domAnimation, m } from "framer-motion";
import Link from "next/link";
import {
  FaDownload,
  FaExternalLinkAlt,
  FaFilePdf,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaLinkedin,
  FaGithub,
  FaBriefcase,
  FaGraduationCap,
  FaCheckCircle,
} from "react-icons/fa";

export default function ResumePage() {
  return (
    <LazyMotion features={domAnimation}>
      <main className="relative z-10 min-h-screen flex flex-col items-center justify-center bg-transparent pt-28 pb-20 px-4 sm:px-6 md:px-8">
        {/* Ambient Glows */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10" aria-hidden="true">
          <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[140px]" />
          <div className="absolute bottom-1/4 right-1/3 w-[450px] h-[450px] bg-cyan-600/10 rounded-full blur-[140px]" />
        </div>

        <m.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-3xl"
        >
          {/* Main Clean Card */}
          <div className="rounded-3xl bg-white/[0.03] border border-white/10 p-6 sm:p-10 md:p-12 shadow-2xl backdrop-blur-2xl card-grain relative overflow-hidden">
            {/* Top accent line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500" />

            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 border-b border-white/[0.08]">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[11px] font-semibold uppercase tracking-wider mb-3">
                  <FaFilePdf size={12} />
                  Curriculum Vitae
                </div>
                <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight uppercase">
                  Mishal Ashfaq
                </h1>
                <p className="text-sm sm:text-base font-semibold text-indigo-400 mt-1">
                  Full-Stack Developer | MERN Stack
                </p>
                <p className="text-gray-400 text-xs sm:text-sm mt-1">
                  Faisalabad, Pakistan
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] text-gray-200 hover:text-white text-xs sm:text-sm font-semibold transition-all duration-300 hover:border-white/20"
                >
                  <FaExternalLinkAlt size={12} className="text-indigo-400" />
                  Open PDF
                </a>

                <a
                  href="/resume.pdf"
                  download="Mishal_Ashfaq_Resume.pdf"
                  className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white text-xs sm:text-sm font-bold transition-all duration-300 hover:scale-105 shadow-[0_0_25px_-5px_rgba(99,102,241,0.6)]"
                >
                  <FaDownload size={13} />
                  Download CV
                </a>
              </div>
            </div>

            {/* Quick Contact Row */}
            <div className="py-6 border-b border-white/[0.08] flex flex-wrap items-center gap-3 text-xs text-gray-300">
              <a
                href="mailto:mishalashfaq40@gmail.com"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/10 hover:border-indigo-400/50 hover:text-white transition-colors"
              >
                <FaEnvelope size={12} className="text-indigo-400" />
                mishalashfaq40@gmail.com
              </a>
              <a
                href="tel:+923143051059"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/10 hover:border-indigo-400/50 hover:text-white transition-colors"
              >
                <FaPhoneAlt size={11} className="text-indigo-400" />
                +92 314 3051059
              </a>
              <a
                href="https://linkedin.com/in/mishal-ashfaq-503237332/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/10 hover:border-indigo-400/50 hover:text-white transition-colors"
              >
                <FaLinkedin size={12} className="text-[#0a66c2]" />
                LinkedIn
              </a>
              <a
                href="https://github.com/Mishal04"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/10 hover:border-indigo-400/50 hover:text-white transition-colors"
              >
                <FaGithub size={12} className="text-gray-200" />
                GitHub
              </a>
            </div>

            {/* Highlights Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-6 border-b border-white/[0.08]">
              {/* Experience Highlights */}
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <div className="flex items-center gap-2 text-indigo-400 mb-2 font-bold text-xs uppercase tracking-wider">
                  <FaBriefcase size={13} />
                  Current Experience
                </div>
                <h4 className="text-white text-sm font-bold">AFZ Prestige Corporate Services</h4>
                <p className="text-gray-400 text-xs mt-0.5">MERN Stack Developer (Remote · Oct 2026 – Present)</p>
                <h4 className="text-white text-sm font-bold mt-3">Apexora 360</h4>
                <p className="text-gray-400 text-xs mt-0.5">Full Stack Developer (On-site · May 2026 – Present)</p>
              </div>

              {/* Education Highlights */}
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <div className="flex items-center gap-2 text-indigo-400 mb-2 font-bold text-xs uppercase tracking-wider">
                  <FaGraduationCap size={14} />
                  Education
                </div>
                <h4 className="text-white text-sm font-bold">BS Computer Science</h4>
                <p className="text-gray-400 text-xs mt-0.5">GC University Fsd (7th Sem · GPA: 3.55 / 4.00)</p>
                <h4 className="text-white text-sm font-bold mt-3">Saylani Mass IT Training</h4>
                <p className="text-gray-400 text-xs mt-0.5">Web Development (2024 – 2025)</p>
              </div>
            </div>

            {/* Bottom note & Contact */}
            <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <FaCheckCircle className="text-emerald-400 shrink-0" size={13} />
                <span>20+ Completed Projects · 1,500+ Hours Coding</span>
              </div>
              <Link
                href="/contact"
                className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors inline-flex items-center gap-1"
              >
                Let&apos;s discuss opportunities →
              </Link>
            </div>
          </div>
        </m.div>
      </main>
    </LazyMotion>
  );
}
