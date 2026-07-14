import About from "@/app/components/About";
import AboutDetails from "@/app/components/AboutDetails";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "About | Mishal Ashfaq",
  description: "Learn about Mishal Ashfaq — full-stack developer, his journey, education and skills.",
};

export default function AboutPage() {
  return (
    <main className="relative z-10 overflow-x-hidden bg-transparent w-full flex flex-col pb-0 pt-20">
      <About />
      <AboutDetails />
      <Footer />
    </main>
  );
}
