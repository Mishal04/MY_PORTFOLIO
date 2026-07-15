"use client";

import { useEffect, useState } from "react";
import { LazyMotion, domAnimation, m, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useReducedMotion } from "@/app/hooks/useReducedMotion";

const navLinks = [
  { label: "Home",       href: "/"           },
  { label: "About",      href: "/about"      },
  { label: "Experience", href: "/experience" },
  { label: "Projects",   href: "/projects"   },
  { label: "Skills",     href: "/skills"     },
  { label: "Resume",     href: "/resume"     },
  { label: "Contact",    href: "/contact"    },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen]     = useState(false);
  const pathname                = usePathname();
  const prefersReducedMotion    = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setIsOpen(false); }, [pathname]);

  return (
    <LazyMotion features={domAnimation}>
      <>
        <m.nav
          {...(prefersReducedMotion ? {} : { initial: { y: -100, opacity: 0 }, animate: { y: 0, opacity: 1 } })}
          transition={{ duration: 0.8, ease: "easeOut" }}
          aria-label="Main navigation"
          className={`fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-300 w-full ${
            scrolled
              ? "backdrop-blur-xl bg-black/40 border-b border-white/10 shadow-lg shadow-black/20 py-2 md:py-3"
              : "bg-transparent border-b border-transparent py-3 md:py-4"
          }`}
        >
          <div className="w-full max-w-6xl mx-auto px-6 md:px-12 lg:px-16 flex items-center justify-between">

            {/* Logo */}
            <Link
              href="/"
              className="text-white font-bold text-base md:text-lg tracking-tight transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-sm"
              aria-label="Go to homepage"
            >
              Mishal<span className="text-indigo-400">.</span>
            </Link>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((item, i) => {
                const isActive = pathname === item.href;
                return (
                  <m.div
                    key={item.href}
                    {...(prefersReducedMotion ? {} : { initial: { opacity: 0, y: -10 }, animate: { opacity: 1, y: 0 } })}
                    transition={{ delay: i * 0.1 + 0.2 }}
                  >
                    <Link
                      href={item.href}
                      className={`text-xs md:text-sm font-medium tracking-wide transition-colors duration-300 relative group focus:outline-none rounded-sm ${
                        isActive ? "text-indigo-400" : "text-gray-400 hover:text-white"
                      }`}
                    >
                      {item.label}
                      <span
                        className={`absolute -bottom-1 left-0 h-px transition-all duration-300 ${
                          isActive ? "w-full bg-indigo-400" : "w-0 bg-indigo-400 group-hover:w-full"
                        }`}
                      />
                    </Link>
                  </m.div>
                );
              })}

              {/* Hire Me */}
              <m.div
                {...(prefersReducedMotion ? {} : { initial: { opacity: 0 }, animate: { opacity: 1 } })}
                transition={{ delay: 0.7 }}
              >
                <Link
                  href="/contact"
                  className={`px-4 py-1.5 border text-xs md:text-sm font-medium rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-[#0a0a0a] ${
                    pathname === "/contact"
                      ? "bg-indigo-500 text-white border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.5)]"
                      : "border-indigo-500 text-indigo-400 hover:bg-indigo-500 hover:text-white"
                  }`}
                >
                  Hire Me
                </Link>
              </m.div>
            </div>

            {/* Mobile hamburger */}
            <button
              type="button"
              className="md:hidden text-white flex flex-col justify-center items-center w-8 h-8 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-sm"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close Menu" : "Open Menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              <span className={`bg-white h-0.5 w-6 rounded-sm transition-all duration-300 ${isOpen ? "rotate-45 translate-y-1.5" : "-translate-y-1"}`} />
              <span className={`bg-white h-0.5 w-6 rounded-sm transition-all duration-300 ${isOpen ? "opacity-0" : "opacity-100"}`} />
              <span className={`bg-white h-0.5 w-6 rounded-sm transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-1.5" : "translate-y-1"}`} />
            </button>
          </div>
        </m.nav>

        {/* Mobile overlay */}
        <AnimatePresence>
          {isOpen && (
            <m.div
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
              {...(prefersReducedMotion
                ? {}
                : { initial: { opacity: 0, y: -20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 } }
              )}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-black/95 backdrop-blur-3xl flex flex-col items-center justify-center pt-24 pb-10 px-6"
            >
              <div className="flex flex-col items-center gap-8 text-center w-full">
                {navLinks.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`text-2xl font-bold transition-all duration-300 hover:scale-110 ${
                        isActive ? "text-indigo-400 scale-110" : "text-gray-300 hover:text-white"
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
                <Link
                  href="/contact"
                  className="mt-4 px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-full text-lg transition-all duration-300 w-full max-w-xs focus:ring-4 focus:ring-indigo-500/50 outline-none"
                >
                  Hire Me
                </Link>
              </div>
            </m.div>
          )}
        </AnimatePresence>
      </>
    </LazyMotion>
  );
}
