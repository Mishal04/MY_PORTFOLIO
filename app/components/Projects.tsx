"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const projects = [
  {
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
    number: "01",
    featured: true,
  },
  {
    title: "Portfolio Website",
    category: "Personal Branding",
    year: "2024",
    description:
      "An animated personal portfolio showcasing projects, skills and contact. Built with React and Framer Motion for fluid page transitions and micro-interactions.",
    image: "/projects/portfolio.png",
    link: "https://my-life-career.vercel.app/",
    github: "https://github.com/Mishal04",
    tags: ["React", "Framer Motion", "CSS3", "Vercel"],
    accent: "#6366f1",
    number: "02",
    featured: true,
  },
  {
    title: "Event Registration",
    category: "Event Management System",
    year: "2023",
    description:
      "A clean event registration platform with form validation, dynamic event listings, and a confirmation flow. Designed for simplicity and speed.",
    image: "/projects/event-registration.png",
    link: "https://my-intro-portfolio.vercel.app/",
    github: "https://github.com/Mishal04",
    tags: ["React", "JavaScript", "HTML5", "CSS3"],
    accent: "#22d3ee",
    number: "03",
    featured: false,
  },
];

export default function Projects() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = ["All", "Full-Stack", "Frontend"];
  const filterMap: Record<string, number[]> = {
    "All":        [0, 1, 2],
    "Full-Stack": [0],
    "Frontend":   [1, 2],
  };
  const visible = filterMap[activeFilter];

  return (
    <section
      id="projects"
      className="relative z-10 pt-16 pb-8 md:pt-24 md:pb-12 w-full"
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-indigo-600/5 rounded-full blur-[130px]" />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 lg:px-16 flex flex-col items-center">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-10 md:mb-14 flex flex-col items-center text-center w-full max-w-3xl"
        >
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-[0.3em] mb-3 block">
            My Work
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 md:mb-5 tracking-tight">
            Featured <span className="text-indigo-400">Projects</span>
          </h2>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-xl mb-8">
            A selection of things I have built — from delivery platforms to
            interactive portfolios. Each crafted with attention to detail and
            real-world usability.
          </p>

          {/* Filter tabs */}
          <div className="flex items-center gap-2 p-1 rounded-full bg-white/[0.03] border border-white/[0.07]">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${
                  activeFilter === f
                    ? "bg-indigo-600 text-white shadow-[0_0_15px_rgba(99,102,241,0.4)]"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </motion.div>

        {/* ── Featured large card (first project) ── */}
        <AnimatePresence mode="wait">
          {visible.includes(0) && (
            <motion.div
              key="featured"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="w-full mb-5 lg:mb-7"
            >
              <a
                href={projects[0].link}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setHovered(0)}
                onMouseLeave={() => setHovered(null)}
                className="group relative flex flex-col lg:flex-row overflow-hidden rounded-3xl bg-[#0d0d0d] border border-white/[0.07] hover:border-white/[0.15] transition-all duration-500 hover:shadow-[0_20px_80px_rgba(0,0,0,0.6)] focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {/* Image — takes 55% on desktop */}
                <div className="relative w-full lg:w-[55%] overflow-hidden bg-[#111]" style={{ minHeight: "260px" }}>
                  <Image
                    src={projects[0].image}
                    alt={projects[0].title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    className="object-cover opacity-70 group-hover:opacity-95 transition-all duration-700 group-hover:scale-105"
                  />
                  {/* Colour tint */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `radial-gradient(ellipse at 40% 60%, ${projects[0].accent}18, transparent 70%)` }}
                  />
                  {/* Number watermark */}
                  <span className="absolute top-5 left-6 text-[5rem] font-black leading-none text-white/[0.04] select-none pointer-events-none">
                    {projects[0].number}
                  </span>
                  {/* Featured badge */}
                  <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-bold text-white uppercase tracking-widest">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                    Featured
                  </div>
                </div>

                {/* Content — takes 45% */}
                <div className="relative flex flex-col justify-between gap-5 p-7 lg:p-10 lg:w-[45%]">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold tracking-[0.25em] uppercase" style={{ color: projects[0].accent }}>
                        {projects[0].category}
                      </span>
                      <span className="text-gray-600 text-[10px] font-mono">{projects[0].year}</span>
                    </div>

                    <h3 className="text-2xl md:text-3xl font-extrabold text-white group-hover:text-indigo-100 transition-colors duration-300 leading-tight">
                      {projects[0].title}
                    </h3>

                    <p className="text-gray-400 text-sm leading-relaxed">
                      {projects[0].description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {projects[0].tags.map((tag) => (
                        <span key={tag} className="px-2.5 py-0.5 text-[10px] font-semibold rounded-full bg-white/[0.05] border border-white/[0.08] text-gray-400 group-hover:border-white/15 transition-colors duration-300">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA row */}
                  <div className="flex items-center gap-3 pt-2 border-t border-white/[0.06]">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-600 group-hover:bg-indigo-500 text-white text-xs font-bold transition-all duration-300">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Live Demo
                    </span>
                    <span className="text-gray-600 text-xs group-hover:text-gray-400 transition-colors duration-300 flex items-center gap-1.5">
                      View project
                      <svg className="w-3.5 h-3.5 -translate-x-0.5 group-hover:translate-x-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </a>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Smaller cards grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6 w-full">
          <AnimatePresence>
            {projects.slice(1).map((project, i) => {
              const realIndex = i + 1;
              if (!visible.includes(realIndex)) return null;
              return (
                <motion.a
                  key={project.title}
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ y: -4 }}
                  onMouseEnter={() => setHovered(realIndex)}
                  onMouseLeave={() => setHovered(null)}
                  className="group relative flex flex-col overflow-hidden rounded-2xl bg-[#0d0d0d] border border-white/[0.07] hover:border-white/[0.15] focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-500 hover:shadow-[0_12px_50px_rgba(0,0,0,0.5)]"
                >
                  {/* Thumbnail */}
                  <div className="relative w-full overflow-hidden bg-[#111]" style={{ aspectRatio: "16/9" }}>
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover opacity-70 group-hover:opacity-95 transition-all duration-700 group-hover:scale-105"
                    />
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: `radial-gradient(ellipse at 50% 100%, ${project.accent}18, transparent 70%)` }}
                    />
                    {/* Number watermark */}
                    <span className="absolute bottom-3 right-4 text-[4rem] font-black leading-none text-white/[0.05] select-none pointer-events-none">
                      {project.number}
                    </span>
                    {/* Live badge */}
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-white text-[10px] font-semibold">
                        <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        Live Preview
                      </div>
                    </div>
                  </div>

                  {/* Gradient */}
                  <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-[#0d0d0d] to-transparent pointer-events-none" />

                  {/* Content */}
                  <div className="relative flex flex-col gap-3 p-5 md:p-6">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: project.accent }}>
                        {project.category}
                      </span>
                      <span className="text-gray-700 text-[10px] font-mono">{project.year}</span>
                    </div>

                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-indigo-200 transition-colors duration-300 leading-tight">
                        {project.title}
                      </h3>
                      <svg
                        className="w-4 h-4 text-indigo-400 shrink-0 mt-1 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-300"
                        fill="none" stroke="currentColor" viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>

                    <p className="text-gray-400 text-xs md:text-sm leading-relaxed line-clamp-2">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 pt-1">
                      {project.tags.map((tag) => (
                        <span key={tag} className="px-2.5 py-0.5 text-[10px] font-semibold rounded-full bg-white/[0.05] border border-white/[0.08] text-gray-400 group-hover:border-white/15 transition-colors duration-300">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.a>
              );
            })}
          </AnimatePresence>
        </div>

        {/* ── Bottom stats bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-12 w-full flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-white/[0.05]"
        >
          <div className="flex items-center gap-8">
            {[
              { value: "3+", label: "Projects Shipped" },
              { value: "100%", label: "Mobile-First" },
              { value: "Live", label: "All Deployed" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center sm:items-start gap-0.5">
                <span className="text-xl font-black text-white">{stat.value}</span>
                <span className="text-[10px] text-gray-600 uppercase tracking-widest font-medium">{stat.label}</span>
              </div>
            ))}
          </div>

          <a
            href="https://github.com/Mishal04"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/20 text-gray-400 hover:text-white text-xs font-semibold transition-all duration-300"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12" />
            </svg>
            View all on GitHub
            <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </motion.div>

      </div>
    </section>
  );
}
