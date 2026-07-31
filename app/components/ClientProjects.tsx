"use client";

import { useRef, useState, useCallback } from "react";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { useReducedMotion } from "@/app/hooks/useReducedMotion";
import { FaExternalLinkAlt, FaBuilding } from "react-icons/fa";

/* ─── Inline SVG icon helper ────────────────────────────────────────────── */
function SvgIcon({ path, size, color }: { path: string | string[]; size: number; color: string }) {
  const paths = Array.isArray(path) ? path : [path];
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color}
      strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths.map((d, i) => <path key={i} d={d} />)}
    </svg>
  );
}

/* ─── Purpose-based icons for client projects ───────────────────────────── */
type IconDef = { path: string | string[]; color: string; size: number; x: string; y: string; delay: number };

const CLIENT_ICONS: Record<string, IconDef[]> = {
  // HomeFound Real Estate → house, map pin, search, key, building
  homefound: [
    { path: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2zM9 22V12h6v10", color: "#10b981", size: 30, x: "50%", y: "42%", delay: 0 },
    { path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z", color: "#34d399", size: 22, x: "25%", y: "30%", delay: 0.4 },
    { path: "M11 17.25a6.25 6.25 0 110-12.5 6.25 6.25 0 010 12.5zM22 22l-5-5", color: "#6ee7b7", size: 20, x: "75%", y: "30%", delay: 0.8 },
    { path: "M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4", color: "#a7f3d0", size: 18, x: "30%", y: "68%", delay: 1.2 },
    { path: "M6 22V12H2l10-10 10 10h-4v10H6zM10 22V17h4v5", color: "#34d399", size: 18, x: "72%", y: "68%", delay: 1.6 },
  ],
  // Tronex Trade → bar chart, trending up, globe, shield, zap
  tronex: [
    { path: "M18 20V10M12 20V4M6 20v-6", color: "#6366f1", size: 30, x: "50%", y: "42%", delay: 0 },
    { path: "M23 6l-9.5 9.5-5-5L1 18M23 6h-6M23 6v6", color: "#818cf8", size: 22, x: "26%", y: "30%", delay: 0.3 },
    { path: "M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-2.29-2.333A17.9 17.9 0 018.027 12c0-2.874.67-5.59 1.876-8M6.279 17.245A17.921 17.921 0 014 12c0-2.184.393-4.277 1.108-6.218M15 4.08A12.049 12.049 0 0020 12a11.83 11.83 0 01-1.698 6.152", color: "#a5b4fc", size: 20, x: "74%", y: "30%", delay: 0.6 },
    { path: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", color: "#c7d2fe", size: 18, x: "50%", y: "70%", delay: 0.9 },
  ],
  // StoicaPro brand → eye, layout, pen, sparkles, layers
  stoicapro: [
    { path: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 15a3 3 0 100-6 3 3 0 000 6z", color: "#a78bfa", size: 30, x: "50%", y: "42%", delay: 0 },
    { path: "M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zM3 9h18M9 21V9", color: "#c4b5fd", size: 22, x: "26%", y: "30%", delay: 0.4 },
    { path: "M17 3a2.828 2.828 0 114 4L7.5 20.5 2 22l1.5-5.5L17 3z", color: "#ddd6fe", size: 20, x: "74%", y: "30%", delay: 0.8 },
    { path: "M12 3l1.912 5.813a1 1 0 00.949.687h6.112l-4.946 3.597a1 1 0 00-.364 1.118L17.575 20 12.63 16.4a1 1 0 00-1.26 0L6.425 20l1.91-5.785a1 1 0 00-.363-1.118L2.027 9.5H8.14a1 1 0 00.949-.687L12 3z", color: "#ede9fe", size: 18, x: "50%", y: "70%", delay: 1.2 },
  ],
};

function ClientIconCanvas({ id, accent, accentRgb, rm }: { id: string; accent: string; accentRgb: string; rm: boolean }) {
  const icons = CLIENT_ICONS[id] ?? [];
  return (
    <div className="relative w-full h-full overflow-hidden bg-[#0d0d14]" aria-hidden="true">
      <div className="absolute inset-0" style={{
        backgroundImage: `linear-gradient(rgba(${accentRgb},0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(${accentRgb},0.055) 1px, transparent 1px)`,
        backgroundSize: "28px 28px",
      }} />
      <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at 50% 50%, rgba(${accentRgb},0.10) 0%, transparent 65%)` }} />
      {icons.map(({ path, color, size, x, y, delay }, i) => (
        <m.div key={i} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: x, top: y }}
          animate={rm ? {} : { y: [0, -7, 0] }}
          transition={rm ? {} : { duration: 3.5 + i * 0.4, delay, repeat: Infinity, ease: "easeInOut" }}>
          <div className="flex items-center justify-center rounded-xl bg-white/[0.04] border border-white/[0.07] backdrop-blur-sm"
            style={{ width: size + 18, height: size + 18, boxShadow: `0 0 16px ${color}30` }}>
            <SvgIcon path={path} size={size} color={color} />
          </div>
        </m.div>
      ))}
    </div>
  );
}

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
          {/* Icon canvas panel */}
          <div className="relative lg:w-[45%] overflow-hidden" style={{ minHeight: "220px" }}>
            <ClientIconCanvas id={project.id} accent={project.accent} accentRgb={project.accentRgb} rm={rm} />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#0B0B0F] hidden lg:block pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0F] to-transparent lg:hidden pointer-events-none" />
            {/* Status badge */}
            <div className="absolute top-4 left-4 z-10">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border backdrop-blur-md ${sc.bg} ${sc.border} ${sc.text}`}>
                <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${sc.dot}`} aria-hidden="true" />
                {project.statusLabel}
              </span>
            </div>
            {/* Year */}
            <div className="absolute top-4 right-4 z-10">
              <span className="text-[10px] font-mono text-gray-500 bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-md">{project.year}</span>
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
