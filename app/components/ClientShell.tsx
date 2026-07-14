"use client";

import dynamic from "next/dynamic";
import Navbar from "./Navbar";
import CustomCursor from "./CustomCursor";
import ScrollProgressBar from "./ScrollProgressBar";
import PreLoader from "./PreLoader";

const ParticleBackground = dynamic(
  () => import("./ParticleBackground"),
  { ssr: false }
);

export default function ClientShell() {
  return (
    <>
      <PreLoader />
      <CustomCursor />
      <ScrollProgressBar />
      <Navbar />
      <ParticleBackground />
    </>
  );
}
