import ClientProjects from "@/app/components/ClientProjects";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "Client Projects | Mishal Ashfaq",
  description: "Professional client projects delivered by Mishal Ashfaq at Apexora 360 — Tronex Trade, StoicaPro, HomeFound Real Estate Canada.",
};

export default function ClientProjectsPage() {
  return (
    <main className="relative z-10 overflow-x-hidden bg-transparent w-full flex flex-col pb-0 pt-20">
      <ClientProjects />
      <Footer />
    </main>
  );
}
