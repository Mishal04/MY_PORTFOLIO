"use client";

import SmoothScroll from "./components/SmoothScroll";
import HeroText from "./components/HeroText";
import About from "./components/About";
import AboutDetails from "./components/AboutDetails";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import TechMarquee from "./components/TechMarquee";
import GitHubStats from "./components/GitHubStats";
import Footer from "./components/Footer";
import HeroVisual from "./components/HeroVisual";
import Experience from "./components/Experience";

export default function Home() {
  return (
    <SmoothScroll>
      <main className="relative z-10 overflow-x-hidden bg-transparent w-full flex flex-col pb-0">

        {/* ── Hero ─────────────────────────────────────── */}
        <section
          id="hero"
          className="relative h-[100dvh] pt-16 lg:pt-20 pb-0 px-6 md:px-12 lg:px-24 flex items-center overflow-hidden mb-16 md:mb-24"
        >
          <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-8">
            <div className="w-full lg:w-1/2">
              <HeroText />
            </div>
            <div className="w-full lg:w-1/2">
              <HeroVisual />
            </div>
          </div>
        </section>

        {/* ── Tech Marquee ─────────────────────────────── */}
        <TechMarquee />

        {/* ── About ────────────────────────────────────── */}
        <About />
        <AboutDetails />

        {/* ── Experience ───────────────────────────────── */}
        <Experience />

        {/* ── Projects ─────────────────────────────────── */}
        <Projects />

        {/* ── Skills ───────────────────────────────────── */}
        <Skills />

        {/* ── GitHub Stats ─────────────────────────────── */}
        <GitHubStats />

        {/* ── Contact ──────────────────────────────────── */}
        <Contact />

        {/* ── Footer ───────────────────────────────────── */}
        <Footer />

      </main>
    </SmoothScroll>
  );
}
