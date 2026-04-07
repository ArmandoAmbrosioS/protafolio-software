"use client"
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ExternalLink} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/src/context/LanguageContext";
import ThemeToggle from "@/src/components/ThemeToggle";

const projectsVisuals = [
  {
    tech: ["Django", "React", "PostgreSQL", "AWS"],
    color: "bg-white dark:bg-zinc-900",
    gradient: "from-cyan-500/20 to-blue-500/20",
    link: "https://tcgproshop.com.mx", 
    github: "https://github.com/tu-usuario/pos-system",
    image: "/images/projects/tcg-pos.jpg" 
  },
  {
    tech: ["Python", "IoT", "Data Visualization", "FastAPI"],
    color: "bg-zinc-50 dark:bg-zinc-950",
    gradient: "from-emerald-500/20 to-teal-500/20",
    link: "https://urbia-641j.onrender.com",
    github: "https://github.com/tu-usuario/iot-monitor",
    image: "/images/projects/urbia-iot.jpg" 
  },
  {
    tech: ["Vue.js", "HTML", "CSS"],
    color: "bg-zinc-100 dark:bg-[#050505]",
    gradient: "from-purple-500/20 to-pink-500/20",
    link: "https://cabustransportaciones.com",
    github: "https://github.com/tu-usuario/ai-emotional-agents",
    image: "/images/projects/cabus.jpg" 
  },
  {
    tech: ["OpenAI API", "Python", "NLP", "React"],
    color: "bg-zinc-100 dark:bg-[#050505]",
    gradient: "from-purple-500/20 to-pink-500/20",
    link: "",
    github: "https://github.com/tu-usuario/ai-emotional-agents",
    image: "/images/projects/ai-agents.jpg" 
  }
];

const ProjectCard = ({ projectData, visual, index, progress, targetScale, t }: any) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "start start"] });
  
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.5, 1]);
  const scale = useTransform(progress, [index * 0.25, 1], [1, targetScale]);

  return (
    <div ref={containerRef} className="min-h-screen flex items-center justify-center sticky top-0 py-10 lg:py-0">
      <motion.div 
        style={{ scale, top: `calc(5vh + ${index * 15}px)` }} 
        className={`relative w-[92vw] lg:w-[90vw] max-w-6xl h-auto lg:aspect-[2/1] rounded-[2rem] lg:rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 flex flex-col lg:flex-row shadow-2xl origin-top transition-colors duration-500 transform-gpu ${visual.color}`}
      >
        <div className="w-full lg:w-1/2 p-6 sm:p-10 lg:p-16 flex flex-col justify-between relative z-10">
          <div>
            <span className="text-cyan-500 dark:text-cyan-400 font-mono text-xs lg:text-sm tracking-widest uppercase mb-3 lg:mb-4 block transition-colors duration-500">
              {projectData.category}
            </span>
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-900 dark:text-white mb-4 lg:mb-6 tracking-tight transition-colors duration-500">
              {projectData.title}
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base lg:text-lg leading-relaxed mb-6 lg:mb-8 transition-colors duration-500">
              {projectData.description}
            </p>
            
            <div className="flex flex-wrap gap-2 lg:gap-3 mb-6 lg:mb-8">
              {visual.tech.map((t: string, i: number) => (
                <span key={i} className="px-3 py-1 lg:px-4 lg:py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 text-[10px] sm:text-xs lg:text-sm border border-zinc-200 dark:border-zinc-700 transition-colors duration-500">
                  {t}
                </span>
              ))}
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 lg:gap-4">
            <motion.a href={visual.link} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center justify-center gap-2 bg-zinc-900 dark:bg-white text-white dark:text-black px-5 py-3 lg:px-6 rounded-full text-sm lg:text-base font-bold hover:bg-cyan-500 dark:hover:bg-cyan-400 transition-colors w-full sm:w-auto">
              <ExternalLink size={16} className="lg:w-[18px] lg:h-[18px]" /> {t.projects?.viewProject || "Ver Proyecto"}
            </motion.a>
          </div>
        </div>

        <div className="w-full lg:w-1/2 relative min-h-[250px] sm:min-h-[300px] lg:min-h-0 overflow-hidden bg-zinc-100 dark:bg-zinc-900 border-t lg:border-t-0 lg:border-l border-zinc-200 dark:border-zinc-800 transition-colors duration-500">
          <motion.div style={{ scale: imageScale }} className="absolute inset-0 w-full h-full p-4 sm:p-6">
            <Image src={visual.image} alt={projectData.title || "Project Image"} fill className="object-contain z-0" />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default function Projects() {
  const { t } = useLanguage();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const projectsT = t.projects;

 return (
    <section id="proyectos" ref={containerRef} className="bg-zinc-50 dark:bg-[#010101] relative pb-[10vh] transition-colors duration-500 overflow-clip">
      <nav className="absolute top-0 left-0 w-full z-50 p-4 sm:p-6 flex items-center justify-between pointer-events-auto">
        <ThemeToggle />
      </nav>

      
      <div className="sticky top-0 h-[15vh] lg:h-[20vh] flex items-end justify-center pb-6 lg:pb-10 z-0 pointer-events-none">
        <h2 className="text-5xl sm:text-7xl lg:text-8xl font-extrabold text-zinc-900 dark:text-white opacity-5 dark:opacity-20 tracking-tighter transition-colors duration-500 text-center w-full px-4 overflow-visible">
          {projectsT?.title || "PROJECTS"}
        </h2>
      </div>
      
      <div className="relative mt-[-15vh] lg:mt-[-20vh]">
        {projectsT?.items?.map((project: any, i: number) => {
          const targetScale = 1 - ( (projectsT.items.length - i) * 0.05);
          return (
            <ProjectCard key={i} index={i} projectData={project} visual={projectsVisuals[i]} progress={scrollYProgress} targetScale={targetScale} t={t} />
          );
        })}
      </div>
    </section>
  );
}