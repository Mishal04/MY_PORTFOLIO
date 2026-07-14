import Projects from "@/app/components/Projects";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "Projects | Mishal Ashfaq",
  description: "Featured projects by Mishal Ashfaq — full-stack web applications and more.",
};

export default function ProjectsPage() {
  return (
    <main className="relative z-10 overflow-x-hidden bg-transparent w-full flex flex-col pb-0 pt-20">
      <Projects />
      <Footer />
    </main>
  );
}
