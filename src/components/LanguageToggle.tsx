"use client"
import { motion } from "framer-motion";
import { useLanguage } from "@/src/context/LanguageContext";

export default function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
     
      className="fixed top-6 right-24 z-50 px-4 py-2 rounded-full bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white shadow-lg overflow-hidden flex items-center justify-center h-12 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800 font-mono font-bold text-sm uppercase"
    >
      <motion.span
        key={language}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-block"
      >
        {language === 'es' ? 'ES' : 'EN'}
      </motion.span>
    </button>
  );
}