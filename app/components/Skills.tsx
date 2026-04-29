'use client';

import { motion } from 'framer-motion';

const skillGroups = [
  { 
    category: "Front-end", 
    percentage: 95,
    skills: ["React", "Next.js", "Tailwind CSS", "TypeScript", "JavaScript", "HTML/CSS"] 
  },
  { 
    category: "Back-end", 
    percentage: 85,
    skills: ["Node.js", "Express", "Firebase", "MongoDB", "PostgreSQL", "REST APIs"] 
  },
  { 
    category: "Other Tools", 
    percentage: 90,
    skills: ["Git/GitHub", "Deployment", "Vercel", "Performance Optimization", "SEO"] 
  },
];

export default function Skills() {
  return (
    <section id="skills" className="pt-8 pb-8 md:pt-12 md:pb-12 relative overflow-hidden bg-transparent">
      {/* High-Performance Liquid & Particle Background Decor */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30 select-none">
        {/* Glow 1 */}
        <div 
            className="absolute top-[-15%] right-[-10%] w-[35rem] h-[35rem] rounded-full bg-indigo-600/10 blur-[120px]"
            style={{ 
                animation: 'liquid 25s infinite alternate ease-in-out',
                willChange: 'transform'
            }} 
        />
        {/* Glow 2 */}
        <div 
            className="absolute bottom-[-20%] left-[-15%] w-[45rem] h-[45rem] rounded-full bg-violet-600/10 blur-[150px]"
            style={{ 
                animation: 'liquid-reverse 30s infinite alternate ease-in-out',
                willChange: 'transform'
            }} 
        />
        
        {/* Floating Digital Particles (CSS Only for Smoothness) */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-[0.2]"
            style={{
              top: `${(i * 17.5) % 100}%`,
              left: `${(i * 23.3) % 100}%`,
              animation: `drift ${15 + ((i * 7.1) % 15)}s infinite linear alternate`,
              animationDelay: `${-((i * 11.4) % 20)}s`,
              willChange: 'transform'
            }}
          />
        ))}

        {/* CSS for Animations */}
        <style dangerouslySetInnerHTML={{ __html: `
            @keyframes liquid {
                0% { transform: translate3d(0, 0, 0) scale(1); }
                50% { transform: translate3d(100px, -50px, 0) scale(1.1); }
                100% { transform: translate3d(-50px, 100px, 0) scale(0.9); }
            }
            @keyframes liquid-reverse {
                0% { transform: translate3d(0, 0, 0) scale(1.1); }
                50% { transform: translate3d(-80px, 120px, 0) scale(1); }
                100% { transform: translate3d(120px, -40px, 0) scale(1.2); }
            }
            @keyframes drift {
                0% { transform: translate3d(0, 0, 0); }
                100% { transform: translate3d(50px, -50px, 0); }
            }
        ` }} />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 lg:px-16 flex flex-col items-center">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-12"
        >
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-[0.3em] mb-2 block">Capabilities</span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-3 md:mb-5 tracking-tight">
            Technical Expertise<span className="text-indigo-500">.</span>
          </h2>
          <div className="w-12 h-1 bg-indigo-600 mx-auto rounded-full" />
        </motion.div>

        {/* Expertise Grid */}
        <div className="w-full grid grid-cols-1 gap-6 lg:gap-10">
          {skillGroups.map((group, index) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="flex flex-col lg:flex-row items-center lg:items-start gap-6 lg:gap-16 w-full"
            >
              {/* Left Side: Category & Progress */}
              <div className="w-full lg:w-1/3 flex flex-col items-center lg:items-start text-center lg:text-left">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                    <span className="text-indigo-400 font-bold text-sm">{index + 1}</span>
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-white tracking-wide">
                    {group.category}
                  </h3>
                </div>
                
                {/* Visual Progress Bar */}
                <div className="w-full max-w-xs h-1.5 bg-white/5 rounded-full overflow-hidden mt-4">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${group.percentage}%` }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: index * 0.2 }}
                    viewport={{ once: true }}
                    className="h-full bg-gradient-to-r from-indigo-600 to-violet-500"
                  />
                </div>
                <p className="mt-3 text-xs text-gray-500 font-bold uppercase tracking-widest">
                  Expertise Level: <span className="text-gray-300">{group.percentage}%</span>
                </p>
              </div>

              {/* Right Side: Skill Tags */}
              <div className="w-full lg:w-2/3 flex flex-wrap justify-center lg:justify-start gap-3 md:gap-4">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl bg-white/[0.03] border border-white/5 text-gray-300 text-xs sm:text-sm font-semibold transition-all duration-300 hover:bg-white/[0.07] hover:border-white/10 hover:text-white cursor-default transform-gpu hover:-translate-y-1 block shadow-sm hover:shadow-indigo-500/10"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer Meta */}
        <div className="mt-8 py-4 border-t border-white/5 w-full text-center">
           <p className="text-gray-500 text-xs font-medium tracking-wide uppercase">
             Ready to deploy across various modern stacks.
           </p>
        </div>
      </div>
    </section>
  );
}
