import Contact from "@/app/components/Contact";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "Contact | Mishal Ashfaq",
  description: "Get in touch with Mishal Ashfaq for projects, collaborations or opportunities.",
};

export default function ContactPage() {
  return (
    <main className="relative z-10 overflow-x-hidden bg-transparent w-full flex flex-col pb-0 pt-20">
      <Contact />
      <Footer />
    </main>
  );
}
