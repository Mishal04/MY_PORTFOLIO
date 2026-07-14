"use client";

import { motion } from "framer-motion";
import { FaLinkedin, FaInstagram, FaGithub } from "react-icons/fa";
import Link from "next/link";

const navLinks = [
  { label: "About",      href: "/about"      },
  { label: "Experience", href: "/experience" },
  { label: "Projects",   href: "/projects"   },
  { label: "Skills",     href: "/skills"     },
  { label: "Resume",     href: "/resume"     },
  { label: "Contact",    href: "/contact"    },
];

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/Mishal04",
    icon: FaGithub,
    hover: "hover:text-white hover:bg-white/10",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/mishal-ashfaq-503237332/",
    icon: FaLinkedin,
    hover: "hover:text-[#0A66C2] hover:bg-[#0A66C2]/10",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/_.mishal1/",
    icon: FaInstagram,
    hover: "hover:text-pink-400 hover:bg-pink-400/10",
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative w-full border-t border-white/[0.07] bg-transparent overflow-hidden">

      {/* Subtle top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent pointer-events-none" />

      <div className="w-full max-w-6xl mx-auto px-6 md:px-12 lg:px-16 py-10 md:py-12">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4"
        >

          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-1.5">
            <Link
              href="/"
              className="text-white font-bold text-xl tracking-tight hover:text-indigo-300 transition-colors duration-300"
            >
              Mishal<span className="text-indigo-400">.</span>
            </Link>
            <p className="text-gray-600 text-xs">
              Full-Stack Developer · Designer
            </p>
          </div>

          {/* Nav links */}
          <nav className="flex items-center gap-5 md:gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-gray-500 hover:text-white text-xs font-medium tracking-wide transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Socials */}
          <div className="flex items-center gap-3">
            {socials.map(({ label, href, icon: Icon, hover }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className={`w-9 h-9 flex items-center justify-center rounded-full border border-white/[0.08] text-gray-500 transition-all duration-300 ${hover}`}
              >
                <Icon size={15} />
              </a>
            ))}
          </div>

        </motion.div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-8 pt-6 border-t border-white/[0.05] flex flex-col sm:flex-row items-center justify-between gap-3"
        >
          <p className="text-gray-600 text-[11px] text-center sm:text-left">
            © {year} Mishal Ashfaq. All rights reserved.
          </p>
          <p className="text-gray-700 text-[11px] flex items-center gap-1.5">
            Built with
            <span className="text-indigo-500 font-semibold">Next.js</span>
            &
            <span className="text-indigo-500 font-semibold">Framer Motion</span>
          </p>
        </motion.div>

      </div>
    </footer>
  );
}
