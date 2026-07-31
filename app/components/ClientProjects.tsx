"use client";

import { LazyMotion, domAnimation, m } from "framer-motion";
import { useReducedMotion } from "@/app/hooks/useReducedMotion";
import { FaExternalLinkAlt, FaBuilding } from "react-icons/fa";

const clientProjects = [
  {
    name: "HomeFound Real Estate Canada",
    company: "Apexora 360",
    website: "https://homefoundrealestate.ca",
    role: "Frontend / WordPress Developer",
    status: "active",
    statusLabel: "Currently Working",
    year: "2025",
    description:
      "Contributing to an international real estate platform serving Canadian clients. Developing and maintaining responsive WordPress pages, implementing UI improvements, optimising website performance, fixing bugs, and delivering client-requested features in collaboration with the development team.",
    contributions: [
      "Developing & customising responsive WordPress pages",
      "Implementing Elementor layouts with pixel-perfect precision",
      "Fixing UI and responsive issues across all screen sizes",
      "Optimising website performance and Core Web Vitals",
      "Implementing client-requested features and changes",
      "Collaborating with the development team on delivery",
    ],
    tags: ["WordPress", "Elementor", "HTML", "CSS", "JavaScript", "Responsive Design"],
    accent: "#10b981",
    number: "01",
  },
  {
    name: "Tronex Trade",
    company: "Apexora 360",
    website: "https://tronex.trade/",
    role: "Frontend Developer Intern",
    status: "completed",
    statusLabel: "Completed",
    year: "2024",
    description:
      "Built and optimised the frontend of Tronex Trade, a trading platform. Developed responsive landing pages, improved mobile responsiveness, resolved UI bugs, and enhanced website performance as part of the internship at Apexora 360.",
    contributions: [
      "Developed responsive WordPress pages and landing pages",
      "Improved mobile responsiveness across all breakpoints",
      "Fixed UI bugs and cross-browser compatibility issues",
      "Optimised website performance and load times",
      "Implemented client-requested design changes",
    ],
    tags: ["WordPress", "HTML", "CSS", "JavaScript"],
    accent: "#6366f1",
    number: "02",
  },
  {
    name: "StoicaPro",
    company: "Apexora 360",
    website: "https://stoicapro.com/",
    role: "Frontend Developer Intern",
    status: "completed",
    statusLabel: "Completed",
    year: "2024",
    description:
      "Worked on the StoicaPro website, handling WordPress development and Elementor customisation. Built responsive layouts, configured plugins, optimised the site, and collaborated with the team to deliver a polished final product.",
    contributions: [
      "WordPress development and theme customisation",
      "Elementor page builder customisation and layouts",
      "Built fully responsive page layouts",
      "Plugin configuration and integration",
      "Website optimisation and performance improvements",
      "Collaborated with the team on timely delivery",
    ],
    tags: ["WordPress", "Elementor", "HTML", "CSS"],
    accent: "#a78bfa",
    number: "03",
  },
];

const statusStyles = {
  active: {
    badge: "bg-emerald-500/15 border-emerald-500/30 text-emerald-400",
    dot:   "bg-emerald-400 animate-pulse",
    glow:  "rgba(16,185,129,0.08)",
    ring:  "hover:border-emerald-500/30",
  },
  completed: {
    badge: "bg-white/[0.05] border-white/10 text-gray-400",
    dot:   "bg-gray-500",
    glow:  "rgba(99,102,241,0.06)",
    ring:  "hover:border-white/20",
  },
};

export default function ClientProjects() {
  const rm = useReducedMotion();

  const fadeUp = (delay = 0) =>
    rm ? {} : {
      initial: { opacity: 0, y: 24 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, margin: "-80px" as const },
      transition: { duration: 0.6, delay, ease: [0.33, 1, 0.68, 1] as const },
    };

  return (
    <LazyMotion features={domAnimation}>
      <section
        id="client-projects"
        aria-labelledby="client-projects-heading"
        className="relative z-10 py-16 md:py-24 w-full overflow-hidden"
      >
        {/* Ambient glows */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 right-1/4 w-[40rem] h-[40rem] bg-emerald-600/4 rounded-full blur-[140px]" />
          <div className="absolute bottom-0 left-1/4 w-[40rem] h-[40rem] bg-indigo-600/4 rounded-full blur-[140px]" />
        </div>

        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 lg:px-16 flex flex-col items-center gap-12 md:gap-16">

          {/* Header */}
          <m.div {...fadeUp()} className="text-center w-full max-w-3xl">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-[0.3em] mb-3 block">
              Professional Work
            </span>
            <h2
              id="client-projects-heading"
              className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-4"
            >
              Client <span className="text-emerald-400">Projects</span>
            </h2>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-xl mx-auto">
              Real-world projects delivered for clients at Apexora 360 — from trading platforms to international real estate websites.
            </p>
          </m.div>

          {/* Cards */}
          <div className="w-full flex flex-col gap-6 md:gap-8">
            {clientProjects.map((project, i) => {
              const s = statusStyles[project.status as keyof typeof statusStyles];
              return (
                <m.div
                  key={project.name}
                  {...fadeUp(i * 0.08)}
                  className="group w-full"
                >
                  <div
                    className={`relative rounded-2xl bg-white/[0.03] border border-white/[0.07] ${s.ring} transition-all duration-500 overflow-hidden`}
                    style={{
                      backdropFilter: "blur(12px)",
                    }}
                  >
                    {/* Hover glow */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                      style={{ background: `radial-gradient(ellipse at 20% 50%, ${s.glow}, transparent 60%)` }}
                      aria-hidden="true"
                    />

                    {/* Active project — top glowing border strip */}
                    {project.status === "active" && (
                      <div
                        className="absolute top-0 left-0 right-0 h-px"
                        style={{ background: `linear-gradient(90deg, transparent, ${project.accent}, transparent)` }}
                        aria-hidden="true"
                      />
                    )}

                    <div className="relative p-6 md:p-8">
                      <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">

                        {/* Left — meta */}
                        <div className="lg:w-64 shrink-0 flex flex-col gap-4">
                          {/* Number watermark */}
                          <span
                            className="text-[4rem] font-black leading-none select-none pointer-events-none opacity-[0.04] absolute -top-2 -left-2"
                            aria-hidden="true"
                          >
                            {project.number}
                          </span>

                          {/* Status badge */}
                          <div className="flex items-center gap-2">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${s.badge}`}>
                              <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${s.dot}`} aria-hidden="true" />
                              {project.statusLabel}
                            </span>
                            <span className="text-gray-700 text-[10px] font-mono">{project.year}</span>
                          </div>

                          {/* Project name */}
                          <div>
                            <h3 className="text-white font-bold text-lg md:text-xl leading-tight mb-1 group-hover:text-indigo-100 transition-colors duration-300">
                              {project.name}
                            </h3>
                            <div className="flex items-center gap-1.5 text-xs text-gray-500">
                              <FaBuilding size={10} aria-hidden="true" />
                              <span>{project.company}</span>
                              <span aria-hidden="true">·</span>
                              <span style={{ color: project.accent }}>{project.role}</span>
                            </div>
                          </div>

                          {/* Website link */}
                          <a
                            href={project.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Visit ${project.name}`}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/20 text-gray-300 hover:text-white transition-all duration-300 w-fit group/link"
                          >
                            <FaExternalLinkAlt size={10} aria-hidden="true" />
                            Visit Website
                            <svg className="w-3 h-3 opacity-0 group-hover/link:opacity-100 group-hover/link:translate-x-0.5 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </a>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-1.5" aria-label="Technologies used">
                            {project.tags.map((tag) => (
                              <span
                                key={tag}
                                className="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-white/[0.04] border border-white/[0.07] text-gray-500 group-hover:border-white/[0.12] transition-colors duration-300"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Divider */}
                        <div className="hidden lg:block w-px bg-white/[0.06] shrink-0" aria-hidden="true" />
                        <div className="lg:hidden h-px w-full bg-white/[0.06]" aria-hidden="true" />

                        {/* Right — description + contributions */}
                        <div className="flex-1 flex flex-col gap-4">
                          <p className="text-gray-400 text-sm leading-relaxed">
                            {project.description}
                          </p>

                          <div>
                            <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-3">
                              My Contributions
                            </p>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                              {project.contributions.map((c) => (
                                <li key={c} className="flex items-start gap-2 text-xs text-gray-400">
                                  <span
                                    className="mt-1.5 w-1 h-1 rounded-full shrink-0"
                                    style={{ background: project.accent }}
                                    aria-hidden="true"
                                  />
                                  {c}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </m.div>
              );
            })}
          </div>

          {/* Footer note */}
          <m.p
            {...fadeUp(0.2)}
            className="text-gray-700 text-xs text-center"
          >
            All client work delivered through{" "}
            <span className="text-indigo-400 font-semibold">Apexora 360</span>
            {" "}· Kohinoor Plaza, Faisalabad
          </m.p>

        </div>
      </section>
    </LazyMotion>
  );
}
