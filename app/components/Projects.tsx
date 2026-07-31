"use client";

import { useRef, useState, useCallback } from "react";
import { LazyMotion, domAnimation, m, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "@/app/hooks/useReducedMotion";

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
type IconDef = { path: string | string[]; size: number; opacity?: number };

const PROJECT_ICONS: Record<string, { hero: IconDef; accent: string; supporting: IconDef[] }> = {
  "food-express": {
    accent: "#f97316",
    hero: { path: "M6 2 3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0", size: 52 },
    supporting: [
      { path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z", size: 22, opacity: 0.5 },
      { path: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z", size: 18, opacity: 0.4 },
      { path: "M9 22a1 1 0 100-2 1 1 0 000 2zm12 0a1 1 0 100-2 1 1 0 000 2zM1 1h4l2.68 13.39a2 2 0 001.99 1.61h9.72a2 2 0 001.99-1.61L23 6H6", size: 20, opacity: 0.45 },
    ],
  },
  "task-manager": {
    accent: "#a855f7",
    hero: { path: "M9 11l3 3L22 4M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11", size: 52 },
    supporting: [
      { path: "M18 20V10M12 20V4M6 20v-6", size: 22, opacity: 0.5 },
      { path: "M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z", size: 20, opacity: 0.4 },
      { path: "M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0", size: 18, opacity: 0.4 },
    ],
  },
  "real-estate": {
    accent: "#22d3ee",
    hero: { path: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2zM9 22V12h6v10", size: 52 },
    supporting: [
      { path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z", size: 22, opacity: 0.5 },
      { path: "M11 17.25a6.25 6.25 0 110-12.5 6.25 6.25 0 010 12.5zM22 22l-5-5", size: 20, opacity: 0.45 },
      { path: "M21 10H3M21 6H3M21 14H3M21 18H3", size: 18, opacity: 0.35 },
    ],
  },
};

/* supporting icon positions: top-left, top-right, bottom-left */
const SUP_POSITIONS = [
  { top: "14%", left: "14%" },
  { top: "14%", right: "14%" },
  { bottom: "22%", left: "14%" },
];

/* ─── Icon canvas — reference-style: blueprint grid + centered hero icon ── */
function IconCanvas({ id, accentRgb, rm }: { id: string; accentRgb: string; rm: boolean }) {
  const def = PROJECT_ICONS[id];
  if (!def) return <div className="w-full h-full bg-[#0d0d14]" aria-hidden="true" />;
  const { hero, accent, supporting } = def;

  return (
    <div className="relative w-full h-full bg-[#0e0e1a] overflow-hidden" aria-hidden="true">
      {/* Horizontal blueprint lines — like the reference */}
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="absolute left-0 right-0 h-px"
          style={{ top: `${8 + i * 8}%`, background: `rgba(${accentRgb},${i % 3 === 0 ? 0.10 : 0.045})` }} />
      ))}
      {/* Vertical lines — sparser */}
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="absolute top-0 bottom-0 w-px"
          style={{ left: `${12 + i * 11}%`, background: `rgba(${accentRgb},0.04)` }} />
      ))}
      {/* Radial glow */}
      <div className="absolute inset-0"
        style={{ background: `radial-gradient(ellipse at 50% 45%, rgba(${accentRgb},0.13) 0%, transparent 60%)` }} />

      {/* Supporting floating icons */}
      {supporting.map((s, i) => {
        const pos = SUP_POSITIONS[i] ?? { top: "20%", left: "20%" };
        return (
          <m.div key={i} className="absolute"
            style={pos as React.CSSProperties}
            animate={rm ? {} : { y: [0, -5, 0] }}
            transition={rm ? {} : { duration: 3 + i * 0.6, delay: 0.3 + i * 0.4, repeat: Infinity, ease: "easeInOut" }}>
            <SvgIcon path={s.path} size={s.size} color={accent} strokeWidth={1.3} />
          </m.div>
        );
      })}

      {/* Hero icon — large, centred */}
      <m.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        animate={rm ? {} : { y: [0, -6, 0] }}
        transition={rm ? {} : { duration: 4, delay: 0, repeat: Infinity, ease: "easeInOut" }}>
        <div className="flex items-center justify-center rounded-2xl bg-white/[0.05] border border-white/[0.09] backdrop-blur-sm"
          style={{ width: hero.size + 28, height: hero.size + 28, boxShadow: `0 0 32px ${accent}35` }}>
          <SvgIcon path={hero.path} size={hero.size} color={accent} strokeWidth={1.4} />
        </div>
      </m.div>
    </div>
  );
}

/* ─── Data ─────────────────────────────────────────────────────────────── */
const PERSONAL_PROJECTS = [
  {
    id: "food-express",
    title: "Food Express",
    category: "Delivery Platform",
    year: "2024",
    description: "Full-stack food delivery app with real-time cart, restaurant listings, and smooth ordering flow.",
    link: "https://food-express-app.vercel.app/",
    github: "https://github.com/Mishal04",
    tags: ["React", "Firebase", "Tailwind"],
    accent: "#f97316", accentRgb: "249,115,22",
  },
  {
    id: "task-manager",
    title: "Task Manager",
    category: "SaaS Dashboard",
    year: "2025",
    description: "Production task management platform with analytics, priority tagging, and activity tracking.",
    link: "https://github.com/Mishal04/Task-Manager",
    github: "https://github.com/Mishal04/Task-Manager",
    tags: ["React", "Node.js", "MongoDB"],
    accent: "#a855f7", accentRgb: "168,85,247",
  },
  {
    id: "real-estate",
    title: "Real Estate",
    category: "Property Search",
    year: "2024",
    description: "Premium property discovery platform with city filtering, search, and curated listings.",
    link: "https://real-estate-web-rho.vercel.app/",
    github: "https://github.com/Mishal04",
    tags: ["React", "Tailwind", "Vercel"],
    accent: "#22d3ee", accentRgb: "34,211,238",
  },
] as const;

const FILTERS = ["All", "Full-Stack", "Frontend"] as const;
type Filter = typeof FILTERS[number];
const FILTER_SETS: Record<Filter, Set<string>> = {
  "All":        new Set(["food-express", "task-manager", "real-estate"]),
  "Full-Stack": new Set(["food-express", "task-manager"]),
  "Frontend":   new Set(["real-estate"]),
};

/* ─── Card ──────────────────────────────────────────────────────────────── */
function ProjectCard({ project, index, rm }: {
  project: typeof PERSONAL_PROJECTS[number]; index: number; rm: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [glow, setGlow] = useState({ x: 50, y: 50, op: 0 });

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

        {/* Mouse spotlight */}
        <div className="absolute inset-0 pointer-events-none z-10 rounded-[inherit] transition-opacity duration-400"
          style={{ opacity: glow.op, background: `radial-gradient(280px circle at ${glow.x}% ${glow.y}%, rgba(${project.accentRgb},0.09), transparent 60%)` }}
          aria-hidden="true" />

        {/* Accent top line */}
        <div className="absolute top-0 left-0 right-0 h-[1.5px] z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: `linear-gradient(90deg, transparent, ${project.accent}, transparent)` }}
          aria-hidden="true" />

        {/* Icon area — ~55% height */}
        <div className="relative w-full" style={{ height: "220px" }}>
          <IconCanvas id={project.id} accentRgb={project.accentRgb} rm={rm} />
          {/* Bottom fade into card */}
          <div className="absolute inset-x-0 bottom-0 h-10 pointer-events-none"
            style={{ background: "linear-gradient(to bottom, transparent, #0e0e1a)" }}
            aria-hidden="true" />
          {/* Year badge */}
          <div className="absolute top-3 right-3 z-10">
            <span className="text-[9px] font-mono text-gray-600 bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-md">{project.year}</span>
          </div>
        </div>

        {/* Text block */}
        <div className="flex flex-col gap-3 px-5 pb-5 pt-3">
          {/* Title row */}
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-white font-black text-lg leading-tight tracking-tight uppercase group-hover:text-white/90 transition-colors duration-300">
              {project.title}
            </h3>
            <span className="text-[9px] font-bold uppercase tracking-[0.12em] text-gray-500 whitespace-nowrap mt-0.5 shrink-0">
              {project.category}
            </span>
          </div>

          {/* Description */}
          <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">{project.description}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map(t => (
              <span key={t} className="text-[9px] font-semibold uppercase tracking-wider text-gray-600 hover:text-gray-400 transition-colors duration-200 cursor-default">
                {t}
              </span>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex gap-2 pt-1 border-t border-white/[0.05]">
            <a href={project.link} target="_blank" rel="noopener noreferrer"
              aria-label={`${project.title} live demo`}
              className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 rounded-xl text-[11px] font-bold text-white transition-all duration-300 hover:brightness-110 focus:outline-none"
              style={{ background: `linear-gradient(135deg, ${project.accent}cc, ${project.accent}77)`, boxShadow: `0 0 12px ${project.accent}30` }}>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Demo
            </a>
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer"
                aria-label={`${project.title} GitHub`}
                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 rounded-xl text-[11px] font-bold border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] text-gray-400 hover:text-white hover:border-white/20 transition-all duration-300">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12"/>
                </svg>
                GitHub
              </a>
            )}
          </div>
        </div>
      </div>
    </m.div>
  );
}

/* ─── Section ───────────────────────────────────────────────────────────── */
export default function Projects() {
  const rm = useReducedMotion();
  const [active, setActive] = useState<Filter>("All");
  const visible = FILTER_SETS[active];

  return (
    <LazyMotion features={domAnimation}>
      <section id="projects" aria-labelledby="projects-heading"
        className="relative z-10 py-20 md:py-24 w-full overflow-hidden">

        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 left-1/4 w-[40rem] h-[40rem] rounded-full bg-indigo-600/[0.04] blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[35rem] h-[35rem] rounded-full bg-violet-600/[0.04] blur-[120px]" />
        </div>

        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 lg:px-16 flex flex-col gap-10 md:gap-12">

          {/* Header */}
          <m.div initial={rm ? false : { opacity: 0, y: 24 }} whileInView={rm ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.55 }}
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-5">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <div className="w-6 h-px bg-indigo-500/60" aria-hidden="true" />
                <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-[0.3em]">Personal Work</span>
              </div>
              <h2 id="projects-heading" className="text-3xl md:text-5xl font-black text-white tracking-tight">
                Personal <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">Projects</span>
              </h2>
            </div>
            <div className="flex items-center gap-1.5 p-1 rounded-full bg-white/[0.04] border border-white/[0.07] self-start sm:self-end">
              {FILTERS.map(f => (
                <button key={f} type="button" onClick={() => setActive(f)}
                  className={`px-3.5 py-1.5 rounded-full text-[11px] font-semibold transition-all duration-300 ${active === f ? "bg-indigo-600 text-white shadow-[0_0_12px_rgba(99,102,241,0.45)]" : "text-gray-500 hover:text-white"}`}>
                  {f}
                </button>
              ))}
            </div>
          </m.div>

          {/* Grid */}
          <AnimatePresence>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {PERSONAL_PROJECTS.filter(p => visible.has(p.id)).map((p, i) => (
                <ProjectCard key={p.id} project={p} index={i} rm={rm} />
              ))}
            </div>
          </AnimatePresence>

          {/* Footer */}
          <m.div initial={rm ? false : { opacity: 0 }} whileInView={rm ? undefined : { opacity: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center justify-between pt-6 border-t border-white/[0.05]">
            <div className="flex items-center gap-6">
              {[{ v: "3+", l: "Shipped" }, { v: "Live", l: "Deployed" }, { v: "100%", l: "Mobile" }].map(s => (
                <div key={s.l} className="flex flex-col">
                  <span className="text-lg font-black text-white">{s.v}</span>
                  <span className="text-[9px] text-gray-600 uppercase tracking-widest">{s.l}</span>
                </div>
              ))}
            </div>
            <a href="https://github.com/Mishal04" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] text-gray-400 hover:text-white text-[11px] font-semibold transition-all duration-300">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12"/>
              </svg>
              All on GitHub
            </a>
          </m.div>
        </div>
      </section>
    </LazyMotion>
  );
}
