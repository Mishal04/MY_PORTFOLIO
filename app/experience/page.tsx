import Experience from "@/app/components/Experience";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "Experience | Mishal Ashfaq",
  description: "Work experience and journey of Mishal Ashfaq — internship at Apexora and self projects.",
};

export default function ExperiencePage() {
  return (
    <main className="relative z-10 overflow-x-hidden bg-transparent w-full flex flex-col pb-0 pt-20">
      <Experience />
      <Footer />
    </main>
  );
}
