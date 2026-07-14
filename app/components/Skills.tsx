'use client';

import { motion } from 'framer-motion';
import {
  SiReact, SiNextdotjs, SiTypescript, SiJavascript,
  SiTailwindcss, SiHtml5, SiCss,
  SiNodedotjs, SiExpress, SiMongodb, SiFirebase, SiPostgresql,
  SiGit, SiGithub, SiVercel, SiFramer,
} from 'react-icons/si';
import { TbApi } from 'react-icons/tb';
import { MdSpeed } from 'react-icons/md';

const skillGroups = [
  {
    category: "Front-End",
    number: "01",
    color: "#6366f1",
    description: "Building pixel-perfect, performant UIs with modern frameworks.",
    skills: [
      { name: "React",       icon: SiReact,       color: "#61DAFB" },
      { name: "Next.js",     icon: SiNextdotjs,   color: "#ffffff" },
      { name: "TypeScript",  icon: SiTypescript,  color: "#3178C6" },
      { name: "JavaScript",  icon: SiJavascript,  color: "#F7DF1E" },
      { name: "Tailwind",    icon: SiTailwindcss, color: "#38BDF8" },
      { name: "HTML5",       icon: SiHtml5,       color: "#E34F26" },
      { name: "CSS3",        icon: SiCss,         color: "#1572B6" },
      { name: "Framer",      icon: SiFramer,      color: "#9B59B6" },
    ],
  },
  {
    category: "Back-End",
    number: "02",
    color: "#22d3ee",
    description: "Designing scalable APIs and robust server-side architectures.",
    skills: [
      { name: "Node.js",    icon: SiNodedotjs,  color: "#6CC24A" },
      { name: "Express",    icon: SiExpress,    color: "#ffffff" },
      { name: "MongoDB",    icon: SiMongodb,    color: "#4DB33D" },
      { name: "Firebase",   icon: SiFirebase,   color: "#FFCA28" },
      { name: "PostgreSQL", icon: SiPostgresql, color: "#336791" },
      { name: "REST APIs",  icon: TbApi,        color: "#a5b4fc" },
    ],
  },
  {
    category: "Tools & DevOps",
    number: "03",
    color: "#f472b6",
    description: "Shipping fast with modern tooling, version control and deployment.",
    skills: [
      { name: "Git",        icon: SiGit,    color: "#F05032" },
      { name: "GitHub",     icon: SiGithub, color: "#ffffff" },
      { name: "Vercel",     icon: SiVercel, color: "#ffffff" },
      { name: "Performance",icon: MdSpeed,  color: "#34d399" },
    ],
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: [0.33, 1, 0.68, 1] as const },
  },
};

export default function Skills() {
  return (
    <section id="skills" className="py-16 md:py-24 relative overflow-hidden bg-transparent">

      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-indigo-600/5 rounded-full blur-[130px]" />
        <div className="absolute bottom-0 left-0 w-[40rem] h-[40rem] bg-violet-600/5 rounded-full blur-[130px]" />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 lg:px-16 flex flex-col items-center gap-14 md:gap-20">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-[0.3em] mb-3 block">
            Capabilities
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-4">
            Technical <span className="text-indigo-400">Expertise</span>
          </h2>
          <p className="text-gray-400 text-sm md:text-base max-w-xl mx-auto">
            A full-stack toolkit — from interactive UIs to scalable APIs and
            production-grade deployments.
          </p>
        </motion.div>

        {/* Skill groups */}
        <div className="w-full flex flex-col gap-12 md:gap-16">
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: gi * 0.1 }}
              viewport={{ once: true, margin: '-80px' }}
              className="flex flex-col gap-6"
            >
              {/* Group header */}
              <div className="flex items-center gap-4">
                <span
                  className="text-5xl md:text-6xl font-black leading-none select-none opacity-10"
                  style={{ color: group.color }}
                >
                  {group.number}
                </span>
                <div className="flex flex-col gap-0.5">
                  <h3 className="text-lg md:text-xl font-bold text-white tracking-wide">
                    {group.category}
                  </h3>
                  <p className="text-gray-500 text-xs md:text-sm">{group.description}</p>
                </div>
                {/* Divider line */}
                <div
                  className="hidden md:block flex-1 h-px ml-2 opacity-20"
                  style={{ background: `linear-gradient(90deg, ${group.color}, transparent)` }}
                />
              </div>

              {/* Icon cards grid */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3"
              >
                {group.skills.map((skill) => {
                  const Icon = skill.icon;
                  return (
                    <motion.div
                      key={skill.name}
                      variants={cardVariants}
                      whileHover={{ y: -4, scale: 1.05 }}
                      className="group flex flex-col items-center gap-2 p-3 md:p-4 rounded-xl bg-white/[0.03] border border-white/[0.07] hover:bg-white/[0.07] hover:border-white/[0.14] transition-colors duration-300 cursor-default"
                    >
                      <Icon
                        size={26}
                        style={{ color: skill.color }}
                        className="opacity-75 group-hover:opacity-100 transition-opacity duration-300 shrink-0"
                      />
                      <span className="text-[10px] md:text-xs text-gray-500 group-hover:text-gray-300 font-medium text-center transition-colors duration-300 leading-tight">
                        {skill.name}
                      </span>
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="w-full pt-6 border-t border-white/[0.05] flex flex-col sm:flex-row items-center justify-between gap-3"
        >
          <p className="text-gray-600 text-xs font-medium tracking-widest uppercase">
            Always learning · Always shipping
          </p>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-gray-500 text-xs">Open to new projects</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
