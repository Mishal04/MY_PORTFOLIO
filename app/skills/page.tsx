import Skills from "@/app/components/Skills";
import TechMarquee from "@/app/components/TechMarquee";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "Skills | Mishal Ashfaq",
  description: "Technical skills and expertise of Mishal Ashfaq — React, Next.js, Node.js and more.",
};

export default function SkillsPage() {
  return (
    <main className="relative z-10 overflow-x-hidden bg-transparent w-full flex flex-col pb-0 pt-20">
      <TechMarquee />
      <Skills />
      <Footer />
    </main>
  );
}
