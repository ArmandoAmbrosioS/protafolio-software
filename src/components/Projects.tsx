// src/components/Projects.tsx
"use client"
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Code } from "lucide-react";
import { useLanguage } from "@/src/context/LanguageContext";

// 1. Agregamos las propiedades 'link' y 'github' a cada objeto
const projectsVisuals = [
  {
    tech: ["Django", "React", "PostgreSQL", "AWS"],
    color: "bg-white dark:bg-zinc-900",
    gradient: "from-cyan-500/20 to-blue-500/20",
    link: "https://tcgproshop.com.mx", // URL de tu demo
    github: "https://github.com/tu-usuario/pos-system" // URL de tu repo
  },
  {
    tech: ["Python", "IoT", "Data Visualization", "FastAPI"],
    color: "bg-zinc-50 dark:bg-zinc-950",
    gradient: "from-emerald-500/20 to-teal-500/20",
    link: "https://urbia-641j.onrender.com",
    github: "https://github.com/tu-usuario/iot-monitor"
  },
  {
    tech: ["OpenAI API", "Python", "NLP", "React"],
    color: "bg-zinc-100 dark:bg-[#050505]",
    gradient: "from-purple-500/20 to-pink-500/20",
    link: "https://tu-ai-agents.com",
    github: "https://github.com/tu-usuario/ai-emotional-agents"
  },
  {
    tech: ["Vue.js", "HTML", "CSS"],
    color: "bg-zinc-100 dark:bg-[#050505]",
    gradient: "from-purple-500/20 to-pink-500/20",
    link: "https://cabustransportaciones.com",
    github: "https://github.com/tu-usuario/ai-emotional-agents"
  }
];

const ProjectCard = ({ projectData, visual, index, progress, targetScale, t }: any) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "start start"] });
  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
  const scale = useTransform(progress, [index * 0.25, 1], [1, targetScale]);

  return (
    <div ref={containerRef} className="h-screen flex items-center justify-center sticky top-0">
      <motion.div 
        style={{ scale, top: `calc(-5vh + ${index * 25}px)` }} 
        className={`relative w-[90vw] max-w-6xl aspect-[16/9] md:aspect-[2/1] rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 flex flex-col md:flex-row shadow-2xl origin-top transition-colors duration-500 ${visual.color}`}
      >
        <div className="w-full md:w-1/2 p-10 md:p-16 flex flex-col justify-between relative z-10">
          <div>
            <span className="text-cyan-500 dark:text-cyan-400 font-mono text-sm tracking-widest uppercase mb-4 block transition-colors duration-500">
              {projectData.category}
            </span>
            <h3 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-6 tracking-tight transition-colors duration-500">
              {projectData.title}
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed mb-8 transition-colors duration-500">
              {projectData.description}
            </p>
            
            <div className="flex flex-wrap gap-3 mb-8">
              {visual.tech.map((t: string, i: number) => (
                <span key={i} className="px-4 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 text-sm border border-zinc-200 dark:border-zinc-700 transition-colors duration-500">
                  {t}
                </span>
              ))}
            </div>
          </div>
          
          <div className="flex gap-4">
            {/* 2. Cambiamos <button> por <motion.a> y añadimos href */}
            <motion.a 
              href={visual.link}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-zinc-900 dark:bg-white text-white dark:text-black px-6 py-3 rounded-full font-bold hover:bg-cyan-500 dark:hover:bg-cyan-400 transition-colors"
            >
              <ExternalLink size={18} /> {t.projects.viewProject}
            </motion.a>

            <motion.a 
              href={visual.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white px-6 py-3 rounded-full font-bold hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors border border-zinc-200 dark:border-zinc-700"
            >
              <Code size={18} /> {t.projects.viewCode}
            </motion.a>
          </div>
        </div>

        <div className="w-full md:w-1/2 relative overflow-hidden bg-zinc-100 dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 transition-colors duration-500">
          <div className={`absolute inset-0 bg-gradient-to-br ${visual.gradient} mix-blend-overlay z-10`} />
          <motion.div 
            style={{ scale: imageScale }}
            className="w-full h-full bg-[url('https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default function Projects() {
  const { t } = useLanguage();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });

  return (
    <section ref={containerRef} className="bg-zinc-50 dark:bg-[#010101] relative pb-[10vh] transition-colors duration-500">
      <div className="sticky top-0 h-[20vh] flex items-end justify-center pb-10 z-0 pointer-events-none">
        <h2 className="text-6xl md:text-8xl font-extrabold text-zinc-900 dark:text-white opacity-5 dark:opacity-20 tracking-tighter transition-colors duration-500">
          {t.projects.title}
        </h2>
      </div>
      <div className="relative mt-[-20vh]">
        {t.projects.items.map((project, i) => {
          const targetScale = 1 - ( (t.projects.items.length - i) * 0.05);
          return (
            <ProjectCard 
              key={i} 
              index={i} 
              projectData={project} 
              visual={projectsVisuals[i]} 
              progress={scrollYProgress} 
              targetScale={targetScale}
              t={t}
            />
          );
        })}
      </div>
    </section>
  );
}