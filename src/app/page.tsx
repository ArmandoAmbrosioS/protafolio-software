import dynamic from "next/dynamic";
import Hero from "@/src/components/Hero";
import ThemeToggle from "@/src/components/ThemeToggle";
import LanguageToggle from "@/src/components/LanguageToggle";

const Services = dynamic(() => import("@/src/components/Services"));
const Projects = dynamic(() => import("@/src/components/Projects"));
const TechStack = dynamic(() => import("@/src/components/TechStack"));
const Experience = dynamic(() => import("@/src/components/Experience"));
const Footer = dynamic(() => import("@/src/components/Footer"));

export default function Home() {
  return (
    <main className="relative w-full overflow-clip">

      <ThemeToggle />
      <LanguageToggle />
      <Hero />
      

      <Services />
      <Experience />
      <Projects />
      <TechStack />
      <Footer />
    </main>
  );
}