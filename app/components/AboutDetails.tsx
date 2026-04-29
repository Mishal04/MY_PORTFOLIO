"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FaGraduationCap, FaBriefcase, FaLinkedin, FaInstagram, FaEnvelope } from "react-icons/fa";
import { TbBrandAdobePhotoshop, TbBrandAdobeIllustrator, TbBrandAdobePremier, TbBrandAdobeAfterEffect } from "react-icons/tb";

export default function AboutDetails() {
  return (
    <section id="about-details" className="relative w-full flex items-center justify-center py-16 md:py-24 px-6 md:px-12 lg:px-24 overflow-hidden z-10">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px]" />
      </div>

      <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-16 lg:h-[450px]">
        
        {/* Left Side: Portrait */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="lg:w-[calc(50%-20px)] w-full flex flex-col h-full"
        >
          <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(79,70,229,0.15)] border border-white/10 group">
            <Image 
              src="/projects/mishal_portrait.jpg"
              alt="Mishal Ashfaq"
              fill
              className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent opacity-90" />
            
            {/* Social Icons inside portrait bottom */}
            <div className="absolute bottom-7 left-0 right-0 flex justify-center gap-4 sm:gap-6 z-10">
              <a href="https://www.linkedin.com/in/mishal-ashfaq-503237332/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white/70 hover:text-indigo-400 hover:bg-white/10 transition-all hover:scale-110 transform"><FaLinkedin size={20} /></a>
              <a href="https://www.instagram.com/_mishal1/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white/70 hover:text-purple-400 hover:bg-white/10 transition-all hover:scale-110 transform"><FaInstagram size={20} /></a>
              <a href="mailto:exoticmishaal9@gmail.com" aria-label="Email" className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white/70 hover:text-pink-400 hover:bg-white/10 transition-all hover:scale-110 transform"><FaEnvelope size={20} /></a>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Content */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center h-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-indigo-400 font-semibold tracking-widest uppercase text-sm mb-2">My Journey</h2>
            <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-200 to-indigo-500 mb-3 tracking-tight">Mishal Ashfaq</h1>
            
            <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-5 font-light">
              I am a passionate creative developer and designer with a relentless mindset for innovation. I blend technical expertise with artistic vision to craft immersive, beautiful, and highly functional digital experiences.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
              {/* Education Panel */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-4 rounded-xl shadow-xl transition-all hover:bg-white/10 group">
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-1.5 bg-indigo-500/20 rounded-md text-indigo-400 group-hover:scale-110 transition-transform"><FaGraduationCap size={16} /></div>
                  <h4 className="text-base font-semibold text-white">Education</h4>
                </div>
                <div className="relative border-l border-white/10 pl-3 space-y-3">
                  <div className="relative">
                    <div className="absolute -left-[17px] top-1 w-1.5 h-1.5 bg-indigo-500 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.8)]" />
                    <p className="text-indigo-300 text-[10px] font-bold mb-0.5">Present (6th Semester)</p>
                    <h5 className="text-white font-medium text-xs">BS Computer Science</h5>
                    <p className="text-gray-400 text-[10px] mt-0.5">GC University FSD</p>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[17px] top-1 w-1.5 h-1.5 bg-white/20 rounded-full" />
                    <p className="text-indigo-300 text-[10px] font-bold mb-0.5">2018 - 2020</p>
                    <h5 className="text-white font-medium text-xs">Pre-Engineering</h5>
                  </div>
                </div>
              </div>

              {/* Experience Panel */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-4 rounded-xl shadow-xl transition-all hover:bg-white/10 group">
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-1.5 bg-purple-500/20 rounded-md text-purple-400 group-hover:scale-110 transition-transform"><FaBriefcase size={16} /></div>
                  <h4 className="text-base font-semibold text-white">Experience</h4>
                </div>
                <div className="relative border-l border-white/10 pl-3 space-y-3">
                  <div className="relative">
                    <div className="absolute -left-[17px] top-1 w-1.5 h-1.5 bg-purple-500 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.8)]" />
                    <p className="text-purple-300 text-[10px] font-bold mb-0.5">1 Year Program</p>
                    <h5 className="text-white font-medium text-xs">Saylani Mass IT Training</h5>
                    <p className="text-gray-400 text-[10px] mt-0.5">Web Development Course</p>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[17px] top-1 w-1.5 h-1.5 bg-white/20 rounded-full" />
                    <p className="text-purple-300 text-[10px] font-bold mb-0.5">Ongoing</p>
                    <h5 className="text-white font-medium text-xs">Independent Projects</h5>
                    <p className="text-gray-400 text-[10px] mt-0.5">Building custom web apps</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div>
              <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Tech Stack</h4>
              <div className="flex flex-wrap gap-2">
                {["HTML", "CSS", "JavaScript", "React", "Node.js", "MongoDB", "Git", "Responsive Design"].map((skill) => (
                  <span key={skill} className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 hover:bg-indigo-500/20 transition-all cursor-default">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
