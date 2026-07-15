"use client";

import { LazyMotion, domAnimation, m } from "framer-motion";
import {
  SiReact, SiNextdotjs, SiTypescript, SiJavascript,
  SiTailwindcss, SiNodedotjs, SiMongodb, SiFirebase,
  SiGit, SiGithub, SiVercel, SiFramer,
  SiHtml5, SiCss, SiExpress, SiPostgresql,
} from "react-icons/si";
import { useReducedMotion } from "@/app/hooks/useReducedMotion";

const techs = [
  { icon: SiReact,       name: "React",      color: "#61DAFB" },
  { icon: SiNextdotjs,   name: "Next.js",    color: "#ffffff" },
  { icon: SiTypescript,  name: "TypeScript", color: "#3178C6" },
  { icon: SiJavascript,  name: "JavaScript", color: "#F7DF1E" },
  { icon: SiTailwindcss, name: "Tailwind",   color: "#38BDF8" },
  { icon: SiNodedotjs,   name: "Node.js",    color: "#6CC24A" },
  { icon: SiExpress,     name: "Express",    color: "#ffffff" },
  { icon: SiMongodb,     name: "MongoDB",    color: "#4DB33D" },
  { icon: SiFirebase,    name: "Firebase",   color: "#FFCA28" },
  { icon: SiPostgresql,  name: "PostgreSQL", color: "#336791" },
  { icon: SiGit,         name: "Git",        color: "#F05032" },
  { icon: SiGithub,      name: "GitHub",     color: "#ffffff" },
  { icon: SiVercel,      name: "Vercel",     color: "#ffffff" },
  { icon: SiFramer,      name: "Framer",     color: "#9B59B6" },
  { icon: SiHtml5,       name: "HTML5",      color: "#E34F26" },
  { icon: SiCss,         name: "CSS3",       color: "#1572B6" },
];

// Double for seamless loop
const doubled = [...techs, ...techs];

export default function TechMarquee() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <LazyMotion features={domAnimation}>
    <section
      className="relative w-full py-10 md:py-14 overflow-hidden"
      aria-label="Technologies I work with"
    >
      {/* Top separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" aria-hidden="true" />
      {/* Bottom separator */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" aria-hidden="true" />

      {/* Fade masks */}
      <div className="absolute inset-y-0 left-0 w-24 md:w-40 z-10 bg-gradient-to-r from-[#0a0a0a] to-transparent pointer-events-none" aria-hidden="true" />
      <div className="absolute inset-y-0 right-0 w-24 md:w-40 z-10 bg-gradient-to-l from-[#0a0a0a] to-transparent pointer-events-none" aria-hidden="true" />

      {/* Section label */}
      <m.p
        {...(prefersReducedMotion ? {} : { initial: { opacity: 0, y: 10 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } })}
        transition={{ duration: 0.6 }}
        className="text-center text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase text-gray-600 mb-6"
        aria-hidden="true"
      >
        Technologies I work with
      </m.p>

      {/* Scrolling track — paused when reduced motion is preferred */}
      <ul
        className="flex overflow-hidden list-none m-0 p-0"
        aria-label="Technology list"
      >
        <li
          className="flex gap-6 md:gap-10 shrink-0 list-none"
          style={{
            animation: prefersReducedMotion ? "none" : "marquee 35s linear infinite",
            willChange: prefersReducedMotion ? "auto" : "transform",
          }}
          aria-hidden="true"
        >
          {doubled.map((tech, i) => {
            const Icon = tech.icon;
            const isAriaVisible = i < techs.length;
            return (
              <span
                key={`${tech.name}-${i}`}
                aria-hidden={!isAriaVisible}
                className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.07] hover:border-white/10 transition-all duration-300 group cursor-default shrink-0"
              >
                <Icon
                  size={18}
                  style={{ color: tech.color }}
                  aria-hidden="true"
                  className="opacity-80 group-hover:opacity-100 transition-opacity duration-300 shrink-0"
                />
                <span className="text-gray-400 group-hover:text-white text-xs md:text-sm font-medium transition-colors duration-300 whitespace-nowrap">
                  {tech.name}
                </span>
              </span>
            );
          })}
        </li>
      </ul>

      {/* keyframes injected via globals.css — no dangerouslySetInnerHTML */}
    </section>
    </LazyMotion>
  );
}
