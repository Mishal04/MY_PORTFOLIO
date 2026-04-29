"use client";

import dynamic from "next/dynamic";
import SmoothScroll from "./components/SmoothScroll";
import HeroText from "./components/HeroText";
import Navbar from "./components/Navbar";
import About from "./components/About";
import AboutDetails from "./components/AboutDetails";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import PreLoader from "./components/PreLoader";
import CustomCursor from "./components/CustomCursor";

const ParticleBackground = dynamic(
  () => import("./components/ParticleBackground"),
  { ssr: false }
);

import HeroVisual from "./components/HeroVisual";

export default function Home() {
  return (
    <>
      <PreLoader />
      <CustomCursor />
      
      <Navbar />
      <ParticleBackground />
      
      <SmoothScroll>
        <main className="relative z-10 overflow-x-hidden bg-transparent w-full flex flex-col pb-0">

        {/* Hero Section */}
        <section id="hero" className="relative h-[100dvh] pt-16 lg:pt-20 pb-0 px-6 md:px-12 lg:px-24 flex items-center overflow-hidden mb-16 md:mb-24">
          <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-8">
            <div className="w-full lg:w-1/2">
              <HeroText />
            </div>
            <div className="w-full lg:w-1/2">
              <HeroVisual />
            </div>
          </div>
        </section>

        {/* Other Sections */}
        <About />
        <AboutDetails />
        <Projects />
        <Skills />
        <Contact />
        </main>
      </SmoothScroll>
    </>
  );
}