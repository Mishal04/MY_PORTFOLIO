"use client";

import { useRef, useState, useCallback } from "react";
import { LazyMotion, domAnimation, m } from "framer-motion";
import Image from "next/image";
import { useReducedMotion } from "@/app/hooks/useReducedMotion";

/* ─── Data ──────────────────────────────────────────────────────────────── */
const CLIENT_PROJECTS = [
  {
    id: "homefound",
    name: "HomeFound Real Estate Canada",
    tagline: "International Real Estate Platform",
    company: "Apexora 360",
    website: "https://homefound.ca/",
    role: "Frontend / WordPress Developer",
    status: "active" as const,
    statusLabel: "Live · Ongoing",
    year: "2025",
    description:
      "Contributing to an international real estate platform serving Canadian clients. Building responsive WordPress pages, Elementor layouts, implementing UI improvements, optimising Core Web Vitals, and delivering client-requested features.",
    contributions: [
      "Responsive WordPress page development",
      "Elementor layouts & pixel-perfect builds",
      "UI bug fixes across all breakpoints",
      "Core Web Vitals & performance tuning",
      "Client feature implementation",
      "Team collaboration & code review",
    ],
    image: "/projects/portfolio.png",
    tags: ["WordPress", "Elementor", "HTML", "CSS", "JavaScript", "Responsive"],
    accent: "#10b981",
    accentRgb: "16,185,129",
  },
  {
    id: "tronex",
    name: "Tronex Trade",
    tagline: "Trading Platform — WordPress",
    company: "Apexora 360",
    website: "https://tronex.trade/",
    role: "Frontend Developer Intern",
    status: "delivered" as const,
    statusLabel: "Delivered",
    year: "2024",
    description:
      "Built and optimised the frontend of Tronex Trade — a trading platform. Developed responsive landing pages, resolved UI bugs, improved mobile responsiveness, and enhanced load performance.",
    contributions: [
      "Landing page development",
      "Mobile responsiveness",
      "UI bug fixes",
      "Performance optimisation",
      "Client design changes",
    ],
    image: "/projects/food-express.png",
    tags: ["WordPress", "HTML", "CSS", "JavaScript"],
    accent: "#6366f1",
    accentRgb: "99,102,241",
  },
  {
    id: "stoicapro",
    name: "StoicaPro",
    tagline: "Brand Website — Elementor",
    company: "Apexora 360",
    website: "https://stoicapro.com/",
    role: "Frontend Developer Intern",
    status: "delivered" as const,
    statusLabel: "Delivered",
    year: "2024",
    description:
      "WordPress development and Elementor customisation for StoicaPro. Built responsive layouts, configured plugins, optimised performance, and collaborated with the team for on-time delivery.",
    contributions: [
      "WordPress theme customisation",
      "Elementor page builder layouts",
      "Responsive layout implementation",
      "Plugin config & integration",
      "Performance optimisation",
    ],
    image: "/projects/task-manager.png",
    tags: ["WordPress", "Elementor", "HTML", "CSS"],
    accent: "#a78bfa",
    accentRgb: "167,139,250",
  },
] as const;

const STATUS_CONFIG = {
  active:    { bg: "bg-emerald-500/10",  border: "border-emerald-500/30", text: "text-emerald-400", dot: "bg-emerald-400 animate-pulse" },
  delivered: { bg: "bg-indigo-500/10",   border: "border-indigo-500/20",  text: "text-indigo-400",  dot: "bg-indigo-400" },
};

/* ─── Card component ────────────────────────────────────────────────────── */
function ClientCard({
  project,
  index,
  rm,
}: {
  project: typeof CLIENT_PROJECTS[number];
  index: number;
  rm: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [glow, setGlow] = useState({ x: 50, y: 50, opacity: 0 });
  const sc = STATUS_CONFIG[project.status];

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (rm || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setGlow({ x, y, opacity: 1 });
  }, [rm]);

  const handleMouseLeave = useCallback(() => {
    setGlow((g) => ({ ...g, opacity: 0 }));
  }, []);

  return (
    <m.div
      initial={rm ? false : { opacity: 0, y: 40 }}
      whileInView={rm ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="group relative rounded-[20px] md:rounded-[24px] overflow-hidden border border-white/[0.08] bg-[#0B0B0F] transition-all duration-500 hover:border-white/20 card-grain"
        style={{
          boxShadow: `0 4px 40px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.04)`,
        }}
      >
        {/* Mouse-tracking spotlight */}
        <div
          className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-300 rounded-[inherit]"
          style={{
            opacity: glow.opacity,
            background: `radial-gradient(300px circle at ${glow.x}% ${glow.y}%, rgba(${project.accentRgb},0.08), transparent 60%)`,
          }}
          aria-hidden="true"
        />

        {/* Active top-line glow */}
        {project.status === "active" && (
          <div
            className="absolute top-0 left-0 right-0 h-[2px] z-20"
            style={{ background: `linear-gradient(90deg, transparent 0%, rgb(${project.accentRgb}) 50%, transparent 100%)` }}
            aria-hidden="true"
          />
        )}

        <div className="relative z-10 flex flex-col lg:flex-row">
          {/* Image panel */}
          <div className="relative lg:w-[45%] overflow-hidden bg-[#0d0d12]" style={{ minHeight: "220px" }}>
            <Image
              src={project.image}
              alt={project.name}
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover opacity-50 group-hover:opacity-75 transition-all duration-700 group-hover:scale-[1.04]"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#0B0B0F] hidden lg:block" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0F] to-transparent lg:hidden" />

            {/* Status badge over image */}
            <div className="absolute top-4 left-4">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border backdrop-blur-md ${sc.bg} ${sc.border} ${sc.text}`}>
                <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${sc.dot}`} aria-hidden="true" />
                {project.statusLabel}
              </span>
            </div>

            {/* Year */}
            <div className="absolute top-4 right-4">
              <span className="text-[10px] font-mono text-gray-500 bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-md">
                {project.year}
              </span>
            </div>
          </div>

          {/* Content panel */}
          <div className="flex-1 p-6 md:p-8 flex flex-col justify-between gap-5">

            {/* Top */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: project.accent }}>
                <span>{project.company}</span>
                <span className="text-white/20" aria-hidden="true">·</span>
                <span className="text-gray-500 normal-case font-medium tracking-wide">{project.role}</span>
              </div>

              <h3 className="text-xl md:text-2xl font-extrabold text-white leading-tight tracking-tight group-hover:text-white/90 transition-colors duration-300">
                {project.name}
              </h3>

              <p className="text-[11px] font-semibold text-gray-600 uppercase tracking-[0.15em]">
                {project.tagline}
              </p>

              <p className="text-gray-400 text-sm leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Contributions */}
            <div>
              <p className="text-[9px] font-bold text-gray-600 uppercase tracking-[0.2em] mb-2.5">Contributions</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5">
                {project.contributions.map((c) => (
                  <li key={c} className="flex items-center gap-2 text-[11px] text-gray-500">
                    <span className="w-1 h-1 rounded-full shrink-0" style={{ background: project.accent }} aria-hidden="true" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>

            {/* Tags + button */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-white/[0.06]">
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-0.5 text-[10px] font-semibold rounded-full border border-white/[0.07] bg-white/[0.03] text-gray-500 group-hover:border-white/[0.12] group-hover:text-gray-400 transition-all duration-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <a
                href={project.website}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${project.name}`}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] text-gray-300 hover:text-white transition-all duration-300 hover:border-white/20 whitespace-nowrap group/btn shrink-0"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Visit Website
                <svg className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </m.div>
  );
}

/* ─── Section ───────────────────────────────────────────────────────────── */
export default function ClientProjects() {
  const rm = useReducedMotion();

  return (
    <LazyMotion features={domAnimation}>
      <section
        id="client-projects"
        aria-labelledby="client-projects-heading"
        className="relative z-10 py-20 md:py-28 w-full overflow-hidden"
      >
        {/* Background atmosphere */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 right-0 w-[50rem] h-[50rem] rounded-full bg-emerald-500/[0.03] blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[50rem] h-[50rem] rounded-full bg-indigo-600/[0.04] blur-[120px]" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wMikiLz48L3N2Zz4=')] opacity-40" />
        </div>

        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 lg:px-16 flex flex-col gap-12 md:gap-16">

          {/* Header */}
          <m.div
            initial={rm ? false : { opacity: 0, y: 30 }}
            whileInView={rm ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-3"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-px bg-emerald-500/60" aria-hidden="true" />
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-[0.35em]">
                Professional Work
              </span>
            </div>
            <h2 id="client-projects-heading" className="text-4xl md:text-6xl font-black text-white tracking-tight leading-[1.0]">
              Client<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                Projects
              </span>
            </h2>
            <p className="text-gray-500 text-sm md:text-base max-w-md leading-relaxed mt-1">
              Real-world products delivered for international clients through Apexora 360.
            </p>
          </m.div>

          {/* Cards */}
          <div className="flex flex-col gap-5 md:gap-6">
            {CLIENT_PROJECTS.map((project, i) => (
              <ClientCard key={project.id} project={project} index={i} rm={rm} />
            ))}
          </div>

          {/* Footer tag */}
          <m.div
            initial={rm ? false : { opacity: 0 }}
            whileInView={rm ? undefined : { opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center gap-3 pt-2"
          >
            <div className="h-px flex-1 bg-white/[0.05]" aria-hidden="true" />
            <span className="text-[10px] text-gray-700 font-mono tracking-widest uppercase">
              All client work via Apexora 360 · Kohinoor Plaza, Faisalabad
            </span>
            <div className="h-px flex-1 bg-white/[0.05]" aria-hidden="true" />
          </m.div>

        </div>
      </section>
    </LazyMotion>
  );
}
