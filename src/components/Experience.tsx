// src/components/Experience.tsx
"use client"
import { motion } from "framer-motion";
import { useLanguage } from "@/src/context/LanguageContext";
import { Briefcase } from "lucide-react";

export default function Experience() {
  const { t } = useLanguage();

  return (
    <section className="py-32 bg-white dark:bg-[#050505] text-zinc-900 dark:text-white px-5 relative transition-colors duration-500">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          className="mb-20 text-center"
        >
          <h2 className="text-5xl md:text-6xl font-extrabold tracking-tighter text-zinc-900 dark:text-white transition-colors duration-500">
            {t.experience.title}
          </h2>
        </motion.div>

        <div className="relative border-l border-zinc-200 dark:border-zinc-800 ml-4 md:ml-0 transition-colors duration-500">
          {t.experience.jobs.map((job, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              className="mb-16 pl-8 md:pl-12 relative group"
            >
              {/* Timeline dot */}
              <div className="absolute w-10 h-10 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-full -left-5 top-0 flex items-center justify-center group-hover:border-cyan-500 dark:group-hover:border-cyan-400 transition-colors duration-500">
                <Briefcase size={16} className="text-zinc-400 dark:text-zinc-500 group-hover:text-cyan-500 dark:group-hover:text-cyan-400" />
              </div>
              
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                <h3 className="text-2xl font-bold text-zinc-900 dark:text-white transition-colors duration-500">{job.role}</h3>
                <span className="text-sm font-mono text-cyan-600 dark:text-cyan-400 mt-1 md:mt-0 bg-cyan-50 dark:bg-cyan-950/30 px-3 py-1 rounded-full w-fit transition-colors duration-500">
                  {job.date}
                </span>
              </div>
              
              <h4 className="text-lg text-zinc-500 dark:text-zinc-400 mb-6 font-medium transition-colors duration-500">{job.company}</h4>
              
              <ul className="space-y-3">
                {job.achievements.map((achieve, i) => (
                  <li key={i} className="text-zinc-600 dark:text-zinc-400 leading-relaxed font-light flex items-start transition-colors duration-500">
                    <span className="text-cyan-500 mr-2 mt-1">▹</span>
                    {achieve}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}