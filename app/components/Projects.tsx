"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const projects = [
  { title: "Food Express App", category: "React & Delivery", image: "/projects/food-express.png", link: "https://food-express-app.vercel.app/" },
  { title: "Portfolio Website", category: "React & Framer Motion", image: "/projects/portfolio.png", link: "https://my-life-career.vercel.app/" },
  { title: "Event Registration Website", category: "Event Management", image: "/projects/event-registration.png", link: "https://my-intro-portfolio.vercel.app/" }
];

export default function Projects() {
  return (
    <section id="projects" className="relative z-10 pt-16 pb-8 md:pt-24 md:pb-12 w-full flex items-center justify-center">
      <div className="w-full max-w-6xl mx-auto px-6 md:px-12 lg:px-16 flex flex-col items-center">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-8 md:mb-12 flex flex-col items-center text-center w-full max-w-3xl"
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-3 md:mb-5 tracking-tight">
            Featured <span className="text-indigo-400">Projects</span>
          </h2>
          <p className="text-gray-300 text-sm md:text-base leading-relaxed">
            Applications including a food delivery platform, interactive portfolios, and event registration systems built with React and modern web technologies.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-8 w-full">
          {projects.map((project, index) => (
            <motion.a
              key={index}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="group relative flex flex-col overflow-hidden rounded-2xl bg-[#0a0a0a] border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)] focus:outline-none focus:ring-2 focus:ring-indigo-500 transform-gpu"
            >
              <div className="w-full relative aspect-[16/9] overflow-hidden bg-[#111]">
                <Image 
                  src={project.image} 
                  alt={`Screenshot of ${project.title}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110 opacity-80 group-hover:opacity-100"
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent pointer-events-none" />
              <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full">
                <p className="text-indigo-400 font-semibold tracking-wider text-xs uppercase mb-2">{project.category}</p>
                <div className="flex items-center justify-between">
                  <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-indigo-300 transition-colors duration-300">{project.title}</h3>
                  <svg className="w-6 h-6 text-indigo-400 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  );
}
