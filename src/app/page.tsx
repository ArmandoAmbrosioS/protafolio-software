import dynamic from "next/dynamic";
import Hero from "@/src/components/Hero";
import ThemeToggle from "@/src/components/ThemeToggle";
import LanguageToggle from "@/src/components/LanguageToggle";

const SectionSkeleton = () => <div className="w-full py-32 bg-zinc-50 dark:bg-[#010101]" />;

const Services  = dynamic(() => import("@/src/components/Services"),  { loading: SectionSkeleton });
const Projects  = dynamic(() => import("@/src/components/Projects"),  { loading: SectionSkeleton });
const TechStack = dynamic(() => import("@/src/components/TechStack"), { loading: SectionSkeleton });
const Experience = dynamic(() => import("@/src/components/Experience"), { loading: SectionSkeleton });
const Footer    = dynamic(() => import("@/src/components/Footer"),    { loading: () => <div className="w-full py-16 bg-zinc-50 dark:bg-[#010101]" /> });

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