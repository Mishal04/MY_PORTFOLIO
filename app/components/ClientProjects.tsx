"use client";

import { useRef, useState, useCallback } from "react";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { useReducedMotion } from "@/app/hooks/useReducedMotion";
import { FaExternalLinkAlt, FaBuilding } from "react-icons/fa";

/* ─── SVG icon helper ───────────────────────────────────────────────────── */
function SvgIcon({ path, size, color, strokeWidth = 1.4 }: {
  path: string | string[]; size: number; color: string; strokeWidth?: number;
}) {
  const paths = Array.isArray(path) ? path : [path];
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths.map((d, i) => <path key={i} d={d} />)}
    </svg>
  );
}

/* ─── Icon definitions — one large hero + small supporting ─────────────── */
type IconDef = { path: string | string[]; size: number };

const CLIENT_ICON_DEFS: Record<string, { hero: IconDef; accent: string; accentRgb: string; supporting: IconDef[] }> = {
  homefound: {
    accent: "#10b981", accentRgb: "16,185,129",
    hero: { path: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2zM9 22V12h6v10", size: 52 },
    supporting: [
      { path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z", size: 20 },
      { path: "M11 17.25a6.25 6.25 0 110-12.5 6.25 6.25 0 010 12.5zM22 22l-5-5", size: 18 },
      { path: "M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4", size: 16 },
    ],
  },
  tronex: {
    accent: "#6366f1", accentRgb: "99,102,241",
    hero: { path: "M18 20V10M12 20V4M6 20v-6", size: 52 },
    supporting: [
      { path: "M23 6l-9.5 9.5-5-5L1 18M23 6h-6M23 6v6", size: 20 },
      { path: "M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-14v4l2 2", size: 18 },
      { path: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", size: 16 },
    ],
  },
  stoicapro: {
    accent: "#a78bfa", accentRgb: "167,139,250",
    hero: { path: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 15a3 3 0 100-6 3 3 0 000 6z", size: 52 },
    supporting: [
      { path: "M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zM3 9h18M9 21V9", size: 20 },
      { path: "M17 3a2.828 2.828 0 114 4L7.5 20.5 2 22l1.5-5.5L17 3z", size: 18 },
      { path: "M12 3l1.912 5.813a1 1 0 00.949.687h6.112l-4.946 3.597a1 1 0 00-.364 1.118L17.575 20 12.63 16.4a1 1 0 00-1.26 0L6.425 20l1.91-5.785a1 1 0 00-.363-1.118L2.027 9.5H8.14a1 1 0 00.949-.687L12 3z", size: 16 },
    ],
  },
};

const SUP_POSITIONS = [
  { top: "13%", left: "13%" },
  { top: "13%", right: "13%" },
  { bottom: "20%", left: "13%" },
];

function ClientIconCanvas({ id, rm }: { id: string; rm: boolean }) {
  const def = CLIENT_ICON_DEFS[id];
  if (!def) return <div className="w-full h-full bg-[#0e0e1a]" aria-hidden="true" />;
  const { hero, accent, accentRgb, supporting } = def;

  return (
    <div className="relative w-full h-full bg-[#0e0e1a] overflow-hidden" aria-hidden="true">
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="absolute left-0 right-0 h-px"
          style={{ top: `${8 + i * 8}%`, background: `rgba(${accentRgb},${i % 3 === 0 ? 0.10 : 0.045})` }} />
      ))}
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="absolute top-0 bottom-0 w-px"
          style={{ left: `${12 + i * 11}%`, background: `rgba(${accentRgb},0.04)` }} />
      ))}
      <div className="absolute inset-0"
        style={{ background: `radial-gradient(ellipse at 50% 45%, rgba(${accentRgb},0.13) 0%, transparent 60%)` }} />
      {supporting.map((s, i) => {
        const pos = SUP_POSITIONS[i] ?? { top: "20%", left: "20%" };
        return (
          <m.div key={i} className="absolute" style={pos as React.CSSProperties}
            animate={rm ? {} : { y: [0, -5, 0] }}
            transition={rm ? {} : { duration: 3 + i * 0.6, delay: 0.3 + i * 0.4, repeat: Infinity, ease: "easeInOut" }}>
            <SvgIcon path={s.path} size={s.size} color={accent} strokeWidth={1.3} />
          </m.div>
        );
      })}
      <m.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        animate={rm ? {} : { y: [0, -6, 0] }}
        transition={rm ? {} : { duration: 4, repeat: Infinity, ease: "easeInOut" }}>
        <div className="flex items-center justify-center rounded-2xl bg-white/[0.05] border border-white/[0.09] backdrop-blur-sm"
          style={{ width: hero.size + 28, height: hero.size + 28, boxShadow: `0 0 32px ${accent}35` }}>
          <SvgIcon path={hero.path} size={hero.size} color={accent} strokeWidth={1.4} />
        </div>
      </m.div>
    </div>
  );
}

/* ─── Data ──────────────────────────────────────────────────────────────── */
const CLIENT_PROJECTS = [
  {
    id: "homefound",
    name: "HomeFound Real Estate",
    category: "Real Estate Platform",
    company: "Apexora 360",
    website: "https://homefound.ca/",
    role: "Frontend / WordPress Dev",
    status: "active" as const,
    statusLabel: "Live · Ongoing",
    year: "2025",
    description: "International real estate platform serving Canadian clients — WordPress pages, Elementor layouts, UI fixes, performance tuning.",
    tags: ["WordPress", "Elementor", "HTML", "CSS", "JS"],
  },
  {
    id: "tronex",
    name: "Tronex Trade",
    category: "Trading Platform",
    company: "Apexora 360",
    website: "https://tronex.trade/",
    role: "Frontend Developer Intern",
    status: "delivered" as const,
    statusLabel: "Delivered",
    year: "2024",
    description: "Trading platform frontend — responsive landing pages, UI bug fixes, performance optimisation, mobile responsiveness.",
    tags: ["WordPress", "HTML", "CSS", "JavaScript"],
  },
  {
    id: "stoicapro",
    name: "StoicaPro",
    category: "Brand Website",
    company: "Apexora 360",
    website: "https://stoicapro.com/",
    role: "Frontend Developer Intern",
    status: "delivered" as const,
    statusLabel: "Delivered",
    year: "2024",
    description: "Brand website — Elementor customisation, responsive layouts, plugin config, team collaboration, on-time delivery.",
    tags: ["WordPress", "Elementor", "HTML", "CSS"],
  },
] as const;

const STATUS_STYLE = {
  active:    { bg: "bg-emerald-500/10", border: "border-emerald-500/30", text: "text-emerald-400", dot: "bg-emerald-400 animate-pulse" },
  delivered: { bg: "bg-indigo-500/10",  border: "border-indigo-500/20",  text: "text-indigo-400",  dot: "bg-indigo-400" },
};

/* ─── Card ──────────────────────────────────────────────────────────────── */
function ClientCard({ project, index, rm }: {
  project: typeof CLIENT_PROJECTS[number]; index: number; rm: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [glow, setGlow] = useState({ x: 50, y: 50, op: 0 });
  const def = CLIENT_ICON_DEFS[project.id];
  const sc = STATUS_STYLE[project.status];

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (rm || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setGlow({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100, op: 1 });
  }, [rm]);
  const onLeave = useCallback(() => setGlow(g => ({ ...g, op: 0 })), []);

  return (
    <m.div
      initial={rm ? false : { opacity: 0, y: 32 }}
      whileInView={rm ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}
        className="group relative flex flex-col rounded-[18px] overflow-hidden border border-white/[0.08] bg-[#0e0e1a] hover:border-white/[0.18] transition-all duration-500 card-grain"
        style={{ boxShadow: "0 2px 24px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.04)" }}>

        {/* Spotlight */}
        <div className="absolute inset-0 pointer-events-none z-10 rounded-[inherit] transition-opacity duration-400"
          style={{ opacity: glow.op, background: `radial-gradient(280px circle at ${glow.x}% ${glow.y}%, rgba(${def?.accentRgb ?? "99,102,241"},0.09), transparent 60%)` }}
          aria-hidden="true" />

        {/* Active top glow line */}
        {project.status === "active" && (
          <div className="absolute top-0 left-0 right-0 h-[1.5px] z-20"
            style={{ background: `linear-gradient(90deg, transparent, ${def?.accent}, transparent)` }}
            aria-hidden="true" />
        )}

        {/* Icon area */}
        <div className="relative w-full" style={{ height: "200px" }}>
          <ClientIconCanvas id={project.id} rm={rm} />
          <div className="absolute inset-x-0 bottom-0 h-10 pointer-events-none"
            style={{ background: "linear-gradient(to bottom, transparent, #0e0e1a)" }}
            aria-hidden="true" />
          {/* Status + year */}
          <div className="absolute top-3 left-3 z-10">
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider border backdrop-blur-md ${sc.bg} ${sc.border} ${sc.text}`}>
              <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${sc.dot}`} aria-hidden="true" />
              {project.statusLabel}
            </span>
          </div>
          <div className="absolute top-3 right-3 z-10">
            <span className="text-[9px] font-mono text-gray-600 bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-md">{project.year}</span>
          </div>
        </div>

        {/* Text */}
        <div className="flex flex-col gap-3 px-5 pb-5 pt-3">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-white font-black text-base leading-tight tracking-tight uppercase group-hover:text-white/90 transition-colors duration-300">
              {project.name}
            </h3>
            <span className="text-[9px] font-bold uppercase tracking-[0.12em] text-gray-500 whitespace-nowrap mt-0.5 shrink-0">
              {project.category}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-gray-600">
            <FaBuilding size={9} aria-hidden="true" />
            <span>{project.company}</span>
            <span aria-hidden="true">·</span>
            <span>{project.role}</span>
          </div>
          <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">{project.description}</p>
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map(t => (
              <span key={t} className="text-[9px] font-semibold uppercase tracking-wider text-gray-600 hover:text-gray-400 transition-colors duration-200 cursor-default">{t}</span>
            ))}
          </div>
          <div className="pt-1 border-t border-white/[0.05]">
            <a href={project.website} target="_blank" rel="noopener noreferrer"
              aria-label={`Visit ${project.name}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[11px] font-bold border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] text-gray-300 hover:text-white hover:border-white/20 transition-all duration-300 w-full justify-center group/btn">
              <FaExternalLinkAlt size={10} aria-hidden="true" />
              Visit Website
              <svg className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
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
      <section id="client-projects" aria-labelledby="client-projects-heading"
        className="relative z-10 py-20 md:py-24 w-full overflow-hidden">

        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 right-1/4 w-[40rem] h-[40rem] rounded-full bg-emerald-500/[0.03] blur-[120px]" />
          <div className="absolute bottom-0 left-1/4 w-[35rem] h-[35rem] rounded-full bg-indigo-600/[0.03] blur-[120px]" />
        </div>

        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 lg:px-16 flex flex-col gap-10 md:gap-12">

          {/* Header */}
          <m.div initial={rm ? false : { opacity: 0, y: 24 }} whileInView={rm ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.55 }}
            className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <div className="w-6 h-px bg-emerald-500/60" aria-hidden="true" />
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-[0.3em]">Professional Work</span>
            </div>
            <h2 id="client-projects-heading" className="text-3xl md:text-5xl font-black text-white tracking-tight">
              Client <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Projects</span>
            </h2>
            <p className="text-gray-500 text-sm max-w-md leading-relaxed mt-1">
              Real-world products delivered for international clients through Apexora 360.
            </p>
          </m.div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {CLIENT_PROJECTS.map((p, i) => (
              <ClientCard key={p.id} project={p} index={i} rm={rm} />
            ))}
          </div>

          {/* Footer */}
          <m.div initial={rm ? false : { opacity: 0 }} whileInView={rm ? undefined : { opacity: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-3">
            <div className="h-px flex-1 bg-white/[0.05]" aria-hidden="true" />
            <span className="text-[9px] text-gray-700 font-mono tracking-widest uppercase">
              All client work via Apexora 360 · Kohinoor Plaza, Faisalabad
            </span>
            <div className="h-px flex-1 bg-white/[0.05]" aria-hidden="true" />
          </m.div>
        </div>
      </section>
    </LazyMotion>
  );
}
