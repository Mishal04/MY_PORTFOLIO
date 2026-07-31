"use client";

import { useRef, useState, useCallback } from "react";
import { LazyMotion, domAnimation, m, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "@/app/hooks/useReducedMotion";

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

/* ─── Purpose-based icon definitions per project ────────────────────────── */
// Icons chosen for what the project *does*, not the tech stack
type IconDef = { path: string | string[]; color: string; size: number; x: string; y: string; delay: number };

const PROJECT_ICONS: Record<string, IconDef[]> = {
  // Food delivery → bag, pin, star, cart, mobile
  "food-express": [
    { path: "M6 2 3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0", color: "#f97316", size: 28, x: "50%", y: "42%", delay: 0 },
    { path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z", color: "#fb923c", size: 22, x: "25%", y: "32%", delay: 0.4 },
    { path: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z", color: "#fdba74", size: 20, x: "76%", y: "30%", delay: 0.8 },
    { path: "M9 22C9.55 22 10 21.55 10 21s-.45-1-1-1-1 .45-1 1 .45 1 1 1zm12 0c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1zM1 1h4l2.68 13.39a2 2 0 001.99 1.61h9.72a2 2 0 001.99-1.61L23 6H6", color: "#fed7aa", size: 20, x: "30%", y: "66%", delay: 1.2 },
    { path: "M12 18H12.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z", color: "#fb923c", size: 18, x: "72%", y: "66%", delay: 1.6 },
  ],
  // Task manager → check, bar chart, tag, calendar, bell
  "task-manager": [
    { path: "M9 11l3 3L22 4M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11", color: "#a855f7", size: 28, x: "50%", y: "42%", delay: 0 },
    { path: "M18 20V10M12 20V4M6 20v-6", color: "#c084fc", size: 22, x: "25%", y: "30%", delay: 0.3 },
    { path: "M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82zM7 7h.01", color: "#d8b4fe", size: 20, x: "76%", y: "30%", delay: 0.6 },
    { path: "M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z", color: "#e9d5ff", size: 20, x: "28%", y: "66%", delay: 0.9 },
    { path: "M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0", color: "#c084fc", size: 18, x: "74%", y: "66%", delay: 1.2 },
  ],
  // Real estate → building, map pin, search, home, key
  "real-estate": [
    { path: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2zM9 22V12h6v10", color: "#22d3ee", size: 28, x: "50%", y: "42%", delay: 0 },
    { path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z", color: "#67e8f9", size: 22, x: "26%", y: "30%", delay: 0.4 },
    { path: "M11 17.25a6.25 6.25 0 110-12.5 6.25 6.25 0 010 12.5zM22 22l-5-5", color: "#a5f3fc", size: 20, x: "74%", y: "30%", delay: 0.8 },
    { path: "M21 10H3M21 6H3M21 14H3M21 18H3", color: "#67e8f9", size: 18, x: "50%", y: "68%", delay: 1.2 },
  ],
};

function IconCanvas({ id, accent, accentRgb, rm }: { id: string; accent: string; accentRgb: string; rm: boolean }) {
  const icons = PROJECT_ICONS[id] ?? [];
  return (
    <div className="relative w-full h-full overflow-hidden bg-[#0d0d14]" aria-hidden="true" style={{ minHeight: "inherit" }}>
      {/* Blueprint grid */}
      <div className="absolute inset-0" style={{
        backgroundImage: `linear-gradient(rgba(${accentRgb},0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(${accentRgb},0.055) 1px, transparent 1px)`,
        backgroundSize: "32px 32px",
      }} />
      {/* Centre radial glow */}
      <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at 50% 50%, rgba(${accentRgb},0.10) 0%, transparent 65%)` }} />
      {/* Floating icons */}
      {icons.map(({ path, color, size, x, y, delay }, i) => (
        <m.div key={i} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: x, top: y }}
          animate={rm ? {} : { y: [0, -8, 0] }}
          transition={rm ? {} : { duration: 3.5 + i * 0.4, delay, repeat: Infinity, ease: "easeInOut" }}>
          <div className="flex items-center justify-center rounded-xl bg-white/[0.04] border border-white/[0.07] backdrop-blur-sm"
            style={{ width: size + 20, height: size + 20, boxShadow: `0 0 18px ${color}30` }}>
            <SvgIcon path={path} size={size} color={color} />
          </div>
        </m.div>
      ))}
    </div>
  );
}

/* ─── Data ─────────────────────────────────────────────────────────────── */
const PERSONAL_PROJECTS = [
  {
    id: "food-express",
    title: "Food Express App",
    category: "Full-Stack Delivery Platform",
    year: "2024",
    description:
      "A fully functional food delivery web app with real-time cart management, restaurant listings, and a smooth ordering flow. Focused on performance and mobile-first design.",
    image: "/projects/food-express.png",
    link: "https://food-express-app.vercel.app/",
    github: "https://github.com/Mishal04",
    tags: ["React", "Tailwind CSS", "Firebase", "Vercel"],
    accent: "#f97316",
    accentRgb: "249,115,22",
    featured: true,
  },
  {
    id: "task-manager",
    title: "Task Manager",
    category: "Full-Stack SaaS App",
    year: "2025",
    description:
      "TaskFlow Pro — a beautifully designed task management platform with dashboards, analytics, priority tagging, custom categories, and real-time activity tracking.",
    image: "/projects/task-manager.png",
    link: "https://github.com/Mishal04/Task-Manager",
    github: "https://github.com/Mishal04/Task-Manager",
    tags: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
    accent: "#a855f7",
    accentRgb: "168,85,247",
    featured: false,
  },
  {
    id: "real-estate",
    title: "Real Estate Platform",
    category: "Real Estate Web App",
    year: "2024",
    description:
      "A premium real estate platform to discover and explore curated properties — from cosy apartments to grand estates. Features property search and city filtering.",
    image: "/projects/event-registration.png",
    link: "https://real-estate-web-rho.vercel.app/",
    github: "https://github.com/Mishal04",
    tags: ["React", "Tailwind CSS", "Vercel"],
    accent: "#22d3ee",
    accentRgb: "34,211,238",
    featured: false,
  },
] as const;

const FILTERS = ["All", "Full-Stack", "Frontend"] as const;
type Filter = typeof FILTERS[number];

const FILTER_SETS: Record<Filter, Set<string>> = {
  "All":        new Set(["food-express", "task-manager", "real-estate"]),
  "Full-Stack": new Set(["food-express", "task-manager"]),
  "Frontend":   new Set(["real-estate"]),
};

type Project = typeof PERSONAL_PROJECTS[number];

/* ─── Featured card (large horizontal) ─────────────────────────────────── */
function FeaturedCard({
  project,
  rm,
}: {
  project: Project;
  rm: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [glow, setGlow] = useState({ x: 50, y: 50, opacity: 0 });

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (rm || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setGlow({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100, opacity: 1 });
  }, [rm]);

  const onLeave = useCallback(() => setGlow((g) => ({ ...g, opacity: 0 })), []);

  return (
    <m.div
      initial={rm ? false : { opacity: 0, y: 40 }}
      whileInView={rm ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="w-full"
    >
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="group relative rounded-[24px] overflow-hidden border border-white/[0.08] bg-[#0B0B0F] transition-all duration-500 hover:border-white/20 card-grain"
        style={{ boxShadow: "0 8px 60px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.04)" }}
      >
        {/* Spotlight */}
        <div
          className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-500 rounded-[inherit]"
          style={{ opacity: glow.opacity, background: `radial-gradient(380px circle at ${glow.x}% ${glow.y}%, rgba(${project.accentRgb},0.10), transparent 55%)` }}
          aria-hidden="true"
        />
        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] z-20" style={{ background: `linear-gradient(90deg, transparent, ${project.accent}, transparent)` }} aria-hidden="true" />

        <div className="relative z-10 flex flex-col lg:flex-row min-h-[320px]">
          {/* Icon canvas */}
          <div className="relative w-full lg:w-[55%]" style={{ minHeight: "260px" }}>
            <IconCanvas id={project.id} accent={project.accent} accentRgb={project.accentRgb} rm={rm} />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0B0B0F] hidden lg:block pointer-events-none" aria-hidden="true" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0F] to-transparent lg:hidden pointer-events-none" aria-hidden="true" />
            {/* Featured badge */}
            <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-bold text-white uppercase tracking-widest z-10">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" aria-hidden="true" />
              Featured
            </div>
            <div className="absolute top-4 right-4 z-10">
              <span className="text-[10px] font-mono text-gray-500 bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded-md">{project.year}</span>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-7 lg:p-10 flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-3">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em]" style={{ color: project.accent }}>{project.category}</span>
              <h3 className="text-2xl md:text-3xl font-extrabold text-white leading-tight tracking-tight group-hover:text-white/90 transition-colors duration-300">
                {project.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="px-2.5 py-0.5 text-[10px] font-semibold rounded-full border border-white/[0.08] bg-white/[0.04] text-gray-400 hover:border-white/20 hover:text-gray-200 transition-all duration-200 cursor-default">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            {/* Buttons */}
            <div className="flex items-center gap-3 pt-4 border-t border-white/[0.06]">
              <a href={project.link} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} live demo`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold text-white transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-[#0B0B0F]"
                style={{ background: `linear-gradient(135deg, ${project.accent}cc, ${project.accent}88)`, boxShadow: `0 0 20px ${project.accent}40` }}>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Live Demo
              </a>
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} GitHub`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] text-gray-300 hover:text-white hover:border-white/20 transition-all duration-300 group/gh">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12"/>
                  </svg>
                  GitHub
                  <svg className="w-3 h-3 group-hover/gh:translate-x-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </m.div>
  );
}

/* ─── Grid card (smaller) ───────────────────────────────────────────────── */
function GridCard({
  project,
  index,
  rm,
}: {
  project: Project;
  index: number;
  rm: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [glow, setGlow] = useState({ x: 50, y: 50, opacity: 0 });

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (rm || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setGlow({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100, opacity: 1 });
  }, [rm]);

  const onLeave = useCallback(() => setGlow((g) => ({ ...g, opacity: 0 })), []);

  return (
    <m.div
      initial={rm ? false : { opacity: 0, y: 30 }}
      whileInView={rm ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="h-full"
    >
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="group relative flex flex-col h-full rounded-[20px] overflow-hidden border border-white/[0.07] bg-[#0B0B0F] hover:border-white/20 transition-all duration-500 card-grain"
        style={{ boxShadow: "0 4px 30px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.03)" }}
      >
        {/* Spotlight */}
        <div
          className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-500"
          style={{ opacity: glow.opacity, background: `radial-gradient(260px circle at ${glow.x}% ${glow.y}%, rgba(${project.accentRgb},0.09), transparent 55%)` }}
          aria-hidden="true"
        />

        {/* Icon canvas */}
        <div className="relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
          <IconCanvas id={project.id} accent={project.accent} accentRgb={project.accentRgb} rm={rm} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0F] via-[#0B0B0F]/20 to-transparent pointer-events-none" aria-hidden="true" />
          {/* Year top-right */}
          <div className="absolute top-3 right-3 z-10">
            <span className="text-[10px] font-mono text-gray-600 bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded-md">{project.year}</span>
          </div>
          {/* Hover live badge */}
          <div className="absolute top-3 left-3 z-10 opacity-0 group-hover:opacity-100 -translate-y-1 group-hover:translate-y-0 transition-all duration-300">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-white text-[10px] font-semibold">
              <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Live Preview
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col flex-1 gap-3 p-5 md:p-6">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: project.accent }}>{project.category}</span>

          <div className="flex items-start justify-between gap-2">
            <h3 className="text-lg font-extrabold text-white leading-tight group-hover:text-white/90 transition-colors duration-300">
              {project.title}
            </h3>
            <svg className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>

          <p className="text-gray-500 text-xs leading-relaxed line-clamp-2 flex-1">{project.description}</p>

          <div className="flex flex-wrap gap-1.5 pt-1">
            {project.tags.map((tag) => (
              <span key={tag} className="px-2.5 py-0.5 text-[10px] font-semibold rounded-full border border-white/[0.07] bg-white/[0.03] text-gray-500 hover:border-white/20 hover:text-gray-300 transition-all duration-200 cursor-default">
                {tag}
              </span>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-2 pt-3 border-t border-white/[0.06]">
            <a href={project.link} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} live demo`}
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-[11px] font-bold text-white transition-all duration-300 hover:scale-[1.02] focus:outline-none"
              style={{ background: `linear-gradient(135deg, ${project.accent}bb, ${project.accent}77)`, boxShadow: `0 0 14px ${project.accent}33` }}>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Demo
            </a>
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} GitHub`}
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-[11px] font-bold border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] text-gray-400 hover:text-white hover:border-white/20 transition-all duration-300">
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
  const featured = PERSONAL_PROJECTS.find((p) => p.featured && visible.has(p.id));
  const grid     = PERSONAL_PROJECTS.filter((p) => !p.featured && visible.has(p.id));

  return (
    <LazyMotion features={domAnimation}>
      <section
        id="projects"
        aria-labelledby="projects-heading"
        className="relative z-10 py-20 md:py-28 w-full overflow-hidden"
      >
        {/* Background */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 left-1/4 w-[50rem] h-[50rem] rounded-full bg-indigo-600/[0.04] blur-[130px]" />
          <div className="absolute bottom-0 right-1/4 w-[40rem] h-[40rem] rounded-full bg-violet-600/[0.04] blur-[130px]" />
        </div>

        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 lg:px-16 flex flex-col gap-12 md:gap-16">

          {/* Header */}
          <m.div
            initial={rm ? false : { opacity: 0, y: 30 }}
            whileInView={rm ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-6"
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-px bg-indigo-500/60" aria-hidden="true" />
                <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-[0.35em]">Personal Work</span>
              </div>
              <h2 id="projects-heading" className="text-4xl md:text-6xl font-black text-white tracking-tight leading-[1.0]">
                Personal<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">
                  Projects
                </span>
              </h2>
              <p className="text-gray-500 text-sm md:text-base max-w-md leading-relaxed mt-1">
                Side projects and self-initiated builds — each one exploring a different stack or idea.
              </p>
            </div>

            {/* Filter pills */}
            <div className="flex items-center gap-2 p-1 rounded-full bg-white/[0.04] border border-white/[0.07] self-start sm:self-end">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setActive(f)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${
                    active === f
                      ? "bg-indigo-600 text-white shadow-[0_0_15px_rgba(99,102,241,0.5)]"
                      : "text-gray-500 hover:text-white"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </m.div>

          {/* Featured card */}
          <AnimatePresence mode="wait">
            {featured && (
              <m.div
                key={featured.id}
                initial={rm ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <FeaturedCard project={featured as Project} rm={rm} />
              </m.div>
            )}
          </AnimatePresence>

          {/* Grid */}
          <AnimatePresence>
            {grid.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                {grid.map((p, i) => (
                  <GridCard key={p.id} project={p} index={i} rm={rm} />
                ))}
              </div>
            )}
          </AnimatePresence>

          {/* Stats + GitHub link */}
          <m.div
            initial={rm ? false : { opacity: 0, y: 20 }}
            whileInView={rm ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-white/[0.05]"
          >
            <div className="flex items-center gap-8">
              {[
                { value: "3+", label: "Projects Shipped" },
                { value: "100%", label: "Mobile-First" },
                { value: "Live", label: "All Deployed" },
              ].map((s) => (
                <div key={s.label} className="flex flex-col items-center sm:items-start gap-0.5">
                  <span className="text-xl font-black text-white">{s.value}</span>
                  <span className="text-[10px] text-gray-600 uppercase tracking-widest font-medium">{s.label}</span>
                </div>
              ))}
            </div>
            <a
              href="https://github.com/Mishal04"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/20 text-gray-400 hover:text-white text-xs font-semibold transition-all duration-300"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12"/>
              </svg>
              View all on GitHub
              <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </m.div>

        </div>
      </section>
    </LazyMotion>
  );
}
