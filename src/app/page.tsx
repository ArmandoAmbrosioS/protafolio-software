// src/app/page.tsx
import Hero from "@/src/components/Hero";
import Services from "@/src/components/Services"; 
import Experience from "@/src/components/Experience";
import Projects from "@/src/components/Projects";
import Photography from "@/src/components/Photography";
import TechStack from "@/src/components/TechStack";
import Footer from "@/src/components/Footer";
import ThemeToggle from "@/src/components/ThemeToggle";
import LanguageToggle from "@/src/components/LanguageToggle";
export default function Home() {
  return (
    <main className="bg-zinc-50 dark:bg-[#010101] min-h-screen selection:bg-cyan-500/20 relative transition-colors duration-500">
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