"use client"
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { Mail } from "lucide-react"; 
import { MouseEvent, useState } from "react";
import { useLanguage } from "@/src/context/LanguageContext";
import ContactModal from "./ContactModal";


const LinkedinIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const GithubIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.03c3.15-.38 6.5-1.4 6.5-7.17A5.1 5.1 0 0 0 19 4.82a5.4 5.4 0 0 0-.1-3.2s-1.2-.38-3.9 1.45a13.3 13.3 0 0 0-7 0C5.3 1.24 4.1 1.62 4.1 1.62a5.4 5.4 0 0 0-.1 3.2 5.1 5.1 0 0 0-1.5 3.03c0 5.77 3.34 6.79 6.49 7.17A4.8 4.8 0 0 0 8 18v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export default function Footer() {
  const { t } = useLanguage();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <>
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <section
        onMouseMove={handleMouseMove}
        className="relative bg-zinc-50 dark:bg-[#010101] text-zinc-900 dark:text-white py-32 px-5 overflow-hidden group border-t border-zinc-200 dark:border-zinc-900 transition-colors duration-500"
      >
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 z-0"
          style={{ background: useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(34, 211, 238, 0.12), transparent 80%)` }}
        />

        <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center text-center">
          <div className="flex items-center gap-2 border border-cyan-200 dark:border-cyan-900/50 bg-cyan-50 dark:bg-cyan-950/20 text-cyan-600 dark:text-cyan-400 px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest mb-8 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            {t.contact.status}
          </div>

          <h2 className="text-6xl md:text-8xl font-extrabold tracking-tighter mb-8 leading-none">
            {t.contact.title} <br />
            <span className="text-zinc-400 dark:text-zinc-600">{t.contact.titleAccent}</span>
          </h2>

          <p className="text-zinc-600 dark:text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-light">
            {t.contact.description}
          </p>

          <motion.button
            onClick={() => setIsModalOpen(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 px-10 py-5 rounded-full font-bold flex items-center gap-3 overflow-hidden shadow-2xl mb-24 transition-transform"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <Mail size={20} className="relative z-10 group-hover:text-white dark:group-hover:text-black transition-colors" />
            <span className="relative z-10 group-hover:text-white dark:group-hover:text-black transition-colors">
              {t.contact.button}
            </span>
          </motion.button>

          <div className="w-full flex flex-col md:flex-row justify-between items-center pt-10 border-t border-zinc-200 dark:border-zinc-800/50">
            <p className="text-zinc-500 text-sm">
              © 2026 Armando Ambrosio Soto. Powered by React and Next.js. E-mail armando.ambrosiosoto@gmail.com
            </p>
            <div className="flex gap-6 mt-6 md:mt-0">
              
              <a href="https://www.linkedin.com/in/armando-ambrosio-soto/" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-cyan-500 transition-colors">
                <LinkedinIcon size={20} />
              </a>
              <a href="https://github.com/ArmandoAmbrosioS" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors">
                <GithubIcon size={20} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}