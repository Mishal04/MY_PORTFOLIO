"use client";

import { LazyMotion, domAnimation, m } from "framer-motion";
import { FaBriefcase, FaCode, FaMapMarkerAlt } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import { useReducedMotion } from "@/app/hooks/useReducedMotion";

const experiences = [
  {
    type: "work",
    role: "MERN Stack & WordPress Developer",
    company: "Apexora",
    location: "Kohinoor Plaza, Faisalabad",
    period: "2024 — Present",
    status: "current",
    description:
      "Working as a MERN Stack and WordPress developer intern, contributing to real-world client projects. Building full-stack features with MongoDB, Express, React and Node.js alongside WordPress-based client sites.",
    highlights: [
      "Developing full-stack features using the MERN stack",
      "Building and customising WordPress sites for clients",
      "Collaborating with senior devs in an agile workflow",
      "Shipping production-ready, responsive UIs with React & Tailwind",
    ],
    tags: ["MongoDB", "Express", "React", "Node.js", "WordPress", "Tailwind CSS", "Git"],
    color: "#6366f1",
    icon: FaBriefcase,
  },
  {
    type: "self",
    role: "Full-Stack Developer",
    company: "Self Projects",
    location: "Remote / Personal",
    period: "2023 — Present",
    status: "ongoing",
    description:
      "Independently designing and shipping full-stack web applications — from concept to deployment. Each project sharpens a different part of the stack.",
    highlights: [
      "Built Food Express — a full-stack delivery platform with Firebase",
      "Crafted an animated personal portfolio with Three.js & Framer Motion",
      "Developed an event registration system with form validation",
      "Continuously exploring new frameworks and tools",
    ],
    tags: ["Next.js", "Node.js", "MongoDB", "Firebase", "Framer Motion", "Three.js"],
    color: "#22d3ee",
    icon: FaCode,
  },
  {
    type: "education",
    role: "Web Development Training",
    company: "Saylani Mass IT Training",
    location: "Faisalabad",
    period: "2023 — 2024",
    status: "completed",
    description:
      "Completed a structured 1-year web development program covering the full stack — from fundamentals to modern frameworks and deployment.",
    highlights: [
      "Mastered HTML, CSS, JavaScript fundamentals",
      "Learned React and component-based architecture",
      "Built and deployed multiple practice projects",
      "Studied Node.js, Express and MongoDB basics",
    ],
    tags: ["HTML", "CSS", "JavaScript", "React", "Node.js"],
    color: "#a78bfa",
    icon: HiSparkles,
  },
];

const statusConfig = {
  current:   { label: "Current",   dot: "bg-emerald-400", text: "text-emerald-400",  ring: "border-emerald-400/30 bg-emerald-400/10" },
  ongoing:   { label: "Ongoing",   dot: "bg-indigo-400",  text: "text-indigo-400",   ring: "border-indigo-400/30 bg-indigo-400/10"  },
  completed: { label: "Completed", dot: "bg-gray-500",    text: "text-gray-400",     ring: "border-white/10 bg-white/5"             },
};

export default function Experience() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <LazyMotion features={domAnimation}>
      <section
        id="experience"
        aria-labelledby="experience-heading"
        className="relative z-10 py-16 md:py-24 overflow-hidden bg-transparent"
      >
        {/* Ambient glows */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 left-1/4 w-[35rem] h-[35rem] bg-indigo-600/5 rounded-full blur-[130px]" />
          <div className="absolute bottom-0 right-1/4 w-[35rem] h-[35rem] bg-cyan-600/5 rounded-full blur-[130px]" />
        </div>

        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 lg:px-16 flex flex-col items-center gap-14">

          {/* Header */}
          <m.div
            {...(prefersReducedMotion ? {} : { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } })}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-[0.3em] mb-3 block">
              Journey
            </span>
            <h2 id="experience-heading" className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-4">
              Experience &{" "}
              <span className="text-indigo-400">Work</span>
            </h2>
            <p className="text-gray-400 text-sm md:text-base max-w-xl mx-auto">
              From internships to independent builds — every step has been a lesson in shipping real software.
            </p>
          </m.div>

          {/* Timeline */}
          <ol className="w-full relative list-none p-0 m-0">

            {/* Vertical line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent md:-translate-x-px" aria-hidden="true" />

            <div className="flex flex-col gap-10 md:gap-14">
              {experiences.map((exp, i) => {
                const Icon   = exp.icon;
                const status = statusConfig[exp.status as keyof typeof statusConfig];
                const isLeft = i % 2 === 0;

                return (
                  <li
                    key={exp.company}
                    className={`relative flex flex-col md:flex-row gap-6 md:gap-10 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"} pl-12 md:pl-0`}
                  >
                    <m.div
                      {...(prefersReducedMotion ? {} : {
                        initial: { opacity: 0, x: isLeft ? -40 : 40 },
                        whileInView: { opacity: 1, x: 0 },
                        viewport: { once: true, margin: "-80px" },
                      })}
                      transition={{ duration: 0.7, delay: i * 0.1, ease: [0.33, 1, 0.68, 1] }}
                      className="contents"
                    >
                    {/* Timeline dot */}
                    <div
                      className="absolute left-0 md:left-1/2 top-6 md:-translate-x-1/2 flex items-center justify-center"
                      aria-hidden="true"
                    >
                      <div
                        className="w-9 h-9 rounded-full border-2 flex items-center justify-center shadow-lg"
                        style={{ borderColor: exp.color, background: `${exp.color}18` }}
                      >
                        <Icon size={14} style={{ color: exp.color }} aria-hidden="true" />
                      </div>
                      {exp.status === "current" && (
                        <div
                          className="absolute w-9 h-9 rounded-full animate-ping opacity-20"
                          style={{ background: exp.color }}
                        />
                      )}
                    </div>

                    {/* Card */}
                    <div className={`w-full md:w-[calc(50%-3rem)] ${isLeft ? "md:mr-auto md:text-left" : "md:ml-auto md:text-left"}`}>
                      <m.div
                        whileHover={prefersReducedMotion ? {} : { y: -3 }}
                        transition={{ duration: 0.2 }}
                        className="group relative p-5 md:p-6 rounded-2xl bg-white/[0.03] border border-white/[0.07] hover:border-white/[0.14] hover:bg-white/[0.05] transition-all duration-300 shadow-xl"
                      >
                        {/* Glow on hover */}
                        <div
                          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                          style={{ boxShadow: `0 0 40px ${exp.color}12` }}
                          aria-hidden="true"
                        />

                        {/* Top row */}
                        <div className="flex items-start justify-between gap-3 mb-3 flex-wrap">
                          <div>
                            <h3 className="text-white font-bold text-base md:text-lg leading-tight">
                              {exp.role}
                            </h3>
                            <div className="flex items-center gap-1.5 mt-0.5">
                              <span className="font-semibold text-sm" style={{ color: exp.color }}>
                                {exp.company}
                              </span>
                              <span className="text-gray-600" aria-hidden="true">·</span>
                              <span className="text-gray-500 text-xs flex items-center gap-1">
                                <FaMapMarkerAlt size={9} aria-hidden="true" />
                                {exp.location}
                              </span>
                            </div>
                          </div>

                          <div className="flex flex-col items-end gap-1.5 shrink-0">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${status.ring} ${status.text}`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${status.dot} ${exp.status === "current" ? "animate-pulse" : ""}`} aria-hidden="true" />
                              {status.label}
                            </span>
                            <time className="text-[10px] text-gray-600 font-mono">{exp.period}</time>
                          </div>
                        </div>

                        <p className="text-gray-400 text-xs md:text-sm leading-relaxed mb-4">
                          {exp.description}
                        </p>

                        <ul className="flex flex-col gap-1.5 mb-4">
                          {exp.highlights.map((point) => (
                            <li key={point} className="flex items-start gap-2 text-xs text-gray-400">
                              <span className="mt-1.5 w-1 h-1 rounded-full shrink-0" style={{ background: exp.color }} aria-hidden="true" />
                              {point}
                            </li>
                          ))}
                        </ul>

                        <div className="flex flex-wrap gap-1.5" aria-label="Technologies used">
                          {exp.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-white/[0.04] border border-white/[0.08] text-gray-400 group-hover:border-white/15 transition-colors duration-300"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </m.div>
                    </div>
                    </m.div>
                  </li>
                );
              })}
            </div>
          </ol>

        </div>
      </section>
    </LazyMotion>
  );
}
