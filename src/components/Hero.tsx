"use client"
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { ArrowRight, Bot } from "lucide-react"; 
import { useState, useRef } from "react";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import Image from "next/image";
import { useLanguage } from "@/src/context/LanguageContext";

function cn(...inputs: any[]) { return twMerge(clsx(inputs)); }

const letterVariants = {
  initial: { y: 100, opacity: 0 },
  animate: (i: number) => ({
    y: 0, opacity: 1, transition: { delay: i * 0.03, duration: 0.8, ease: [0.22, 1, 0.36, 1] as any, },
  }),
};

const AnimatedText = ({ text, className }: { text: string; className: string }) => {
  if (!text) return null;
  return (
    <span className={cn("inline-block", className)}>
      <motion.h1 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        {text}
      </motion.h1>
    </span >
  );
};

const GithubIcon = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.03c3.15-.38 6.5-1.4 6.5-7.17A5.1 5.1 0 0 0 19 4.82a5.4 5.4 0 0 0-.1-3.2s-1.2-.38-3.9 1.45a13.3 13.3 0 0 0-7 0C5.3 1.24 4.1 1.62 4.1 1.62a5.4 5.4 0 0 0-.1 3.2 5.1 5.1 0 0 0-1.5 3.03c0 5.77 3.34 6.79 6.49 7.17A4.8 4.8 0 0 0 8 18v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const InstagramIcon = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const FacebookIcon = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

export default function Hero() {
  const { t } = useLanguage();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 60, damping: 20 });

  function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const bgX1 = useTransform(smoothX, [0, 1000], [250, -250]);
  const bgY1 = useTransform(smoothY, [0, 800], [250, -250]);
  const bgX2 = useTransform(smoothX, [0, 1000], [-350, 350]);
  const bgY2 = useTransform(smoothY, [0, 800], [-350, 350]);

  const buttonRef = useRef<HTMLAnchorElement>(null);
  const [magneticPosition, setMagneticPosition] = useState({ x: 0, y: 0 });

  const handleMagneticMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!buttonRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    setMagneticPosition({ x: (clientX - (left + width / 2)) / 2.5, y: (clientY - (top + height / 2)) / 2.5 });
  };

 
  const socialLinks = [
    { icon: GithubIcon, href: "https://github.com/ArmandoAmbrosioS", label: "GitHub" },
    { icon: LinkedinIcon, href: "https://www.linkedin.com/in/armando-ambrosio-soto/", label: "LinkedIn" },
    { icon: InstagramIcon, href: "https://www.instagram.com/armando.ambrosiosoto/", label: "Instagram" },
    { icon: FacebookIcon, href: "https://www.facebook.com/trakator.boombang", label: "Facebook" },
  ];

  return (
    <section 
      className="min-h-screen h-auto flex flex-col justify-center items-center bg-zinc-50 dark:bg-[#010101] text-zinc-900 dark:text-white px-5 sm:px-10 relative overflow-hidden transition-colors duration-500 py-32 lg:py-0"
      onMouseMove={onMouseMove} 
    >
      <motion.div style={{ x: bgX1, y: bgY1 }} className="absolute top-[-25%] left-[-20%] w-[110vh] h-[110vh] bg-cyan-300/30 dark:bg-cyan-700/20 rounded-full blur-[160px] pointer-events-none transition-colors duration-500" />
      <motion.div style={{ x: bgX2, y: bgY2 }} className="absolute bottom-[-35%] right-[-20%] w-[110vh] h-[110vh] bg-purple-300/30 dark:bg-purple-700/15 rounded-full blur-[160px] pointer-events-none transition-colors duration-500" />

      <div className="text-center z-10 flex flex-col items-center max-w-7xl mt-10 w-full">
        <motion.div initial={{ opacity: 0, y: -20, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: 0.3, type: "spring", stiffness: 100, damping: 15 }} className="flex items-center gap-2 border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/40 text-zinc-600 dark:text-zinc-300 px-4 py-2 sm:px-5 sm:py-2 rounded-full text-[10px] sm:text-xs font-mono uppercase tracking-widest mb-8 backdrop-blur-md shadow-xl shadow-zinc-200/50 dark:shadow-cyan-950/20 transition-colors duration-500">
          <Bot size={15} className="text-cyan-500 dark:text-cyan-400" />
          <span>{t.hero.role}</span>
        </motion.div>

        <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8 }} className="text-lg sm:text-xl md:text-2xl text-zinc-500 dark:text-zinc-400 font-medium mb-8 sm:mb-10 transition-colors duration-500">
          {t.hero.intro} <span className="text-zinc-900 dark:text-white font-bold">Armando Ambrosio.</span>
        </motion.h2>
        
        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 sm:gap-10 lg:gap-16 mb-10 sm:mb-12 w-full">
          <motion.div initial={{ opacity: 0, scale: 0.8, x: -30 }} animate={{ opacity: 1, scale: 1, x: 0 }} transition={{ delay: 0.7, type: "spring", stiffness: 100, damping: 20 }} whileHover={{ scale: 1.05 }} className="relative flex-shrink-0 w-32 h-32 sm:w-48 sm:h-48 lg:w-56 lg:h-56 rounded-full overflow-hidden border-4 border-white dark:border-zinc-900 shadow-2xl group transition-all duration-500">
            <Image src="/images/me.jpg" alt="Armando Ambrosio" fill className="object-cover transition-all duration-500 grayscale group-hover:grayscale-0" priority />
            <div className="absolute inset-0 bg-cyan-500/0 group-hover:bg-cyan-500/10 transition-colors duration-500" />
          </motion.div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-extrabold tracking-tighter leading-[1.1] lg:leading-[0.9] flex flex-col items-center lg:items-start justify-center overflow-visible py-2 text-center lg:text-left transition-colors duration-500">
            <span className="text-zinc-900 dark:text-white mb-1 lg:mb-4">{t.hero.headline1}</span>
            <AnimatedText text={t.hero.headlineAccent} className="text-cyan-600 dark:text-cyan-400" />
          </h1>
        </div>
        
        <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 1, ease: [0.22, 1, 0.36, 1] }} className="max-w-2xl mx-auto text-zinc-600 dark:text-zinc-400 text-base sm:text-lg md:text-xl mb-12 sm:mb-16 leading-relaxed font-light px-4 lg:px-2 transition-colors duration-500">
          {t.hero.description}
        </motion.p>
        
        <div className="flex flex-col items-center gap-8">
          <motion.a href="/#proyectos" ref={buttonRef} onMouseMove={handleMagneticMouseMove} onMouseLeave={() => setMagneticPosition({ x: 0, y: 0 })} animate={{ x: magneticPosition.x, y: magneticPosition.y }} transition={{ type: "spring", stiffness: 150, damping: 20 }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }} className="group relative bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 px-8 py-4 sm:px-12 sm:py-5 rounded-full text-sm sm:text-base font-extrabold transition-colors flex items-center gap-2.5 overflow-hidden shadow-xl shadow-zinc-300 dark:shadow-cyan-900/10">
            <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_40px_10px_rgba(34,211,238,0.2)]" />
            <span className="relative z-10 flex items-center gap-2.5 group-hover:text-white dark:group-hover:text-black transition-colors">
              {t.hero.button}
              <ArrowRight size={20} className="relative z-10 group-hover:translate-x-1.5 transition-transform" />
            </span>
          </motion.a>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="flex items-center gap-6"
          >
            {socialLinks.map((link, i) => (
              <motion.a
                key={i}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="text-zinc-400 hover:text-cyan-500 dark:text-zinc-500 dark:hover:text-cyan-400 transition-colors duration-300"
                aria-label={link.label}
              >
                <link.icon size={24} />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="relative lg:absolute mt-16 lg:mt-0 bottom-auto lg:bottom-6 left-auto lg:left-1/2 lg:-translate-x-1/2 text-zinc-300 dark:text-zinc-800 font-mono text-[10px] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.5em] pointer-events-none whitespace-nowrap opacity-60 dark:opacity-30 z-0 transition-colors duration-500"
      >
        <motion.span animate={{ x: [0, -100, 0] }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="inline-block">
          React / Next.js / Python / Django / Java / FastAPI / Docker / AWS
        </motion.span>
      </motion.div>
    </section>
  );
}