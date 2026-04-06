// src/components/Hero.tsx
"use client"
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { ArrowRight, Bot } from "lucide-react";
import { useState, useRef } from "react";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import Image from "next/image"; // Importamos Image de Next.js
import { useLanguage } from "@/src/context/LanguageContext";

function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}

const letterVariants = {
  initial: { y: 100, opacity: 0 },
  animate: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: { delay: i * 0.03, duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  }),
};

// Componente AnimatedText con "Red de Seguridad" Senior
const AnimatedText = ({ text, className }: { text: string; className: string }) => {
  if (!text) return null; // Validación Senior: si no hay texto, no intentes hacer el .split()

  return (
    <span className={cn("inline-block", className)}>
      {text.split("").map((letter, i) => (
        <motion.span
          key={`${letter}-${i}`}
          variants={letterVariants}
          initial="initial"
          animate="animate"
          custom={i}
          className="inline-block"
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </span>
  );
};

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

  const buttonRef = useRef<HTMLButtonElement>(null);
  const [magneticPosition, setMagneticPosition] = useState({ x: 0, y: 0 });

  const handleMagneticMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    setMagneticPosition({ x: (clientX - (left + width / 2)) / 2.5, y: (clientY - (top + height / 2)) / 2.5 });
  };

  return (
    <section 
      className="min-h-screen flex flex-col justify-center items-center bg-zinc-50 dark:bg-[#010101] text-zinc-900 dark:text-white px-5 relative overflow-hidden transition-colors duration-500"
      onMouseMove={onMouseMove} 
    >
      {/* Fondos dinámicos */}
      <motion.div style={{ x: bgX1, y: bgY1 }} className="absolute top-[-25%] left-[-20%] w-[110vh] h-[110vh] bg-cyan-300/30 dark:bg-cyan-700/20 rounded-full blur-[160px] pointer-events-none transition-colors duration-500" />
      <motion.div style={{ x: bgX2, y: bgY2 }} className="absolute bottom-[-35%] right-[-20%] w-[110vh] h-[110vh] bg-purple-300/30 dark:bg-purple-700/15 rounded-full blur-[160px] pointer-events-none transition-colors duration-500" />

      <div className="text-center z-10 flex flex-col items-center max-w-7xl mt-10">
        
        {/* Cápsula de Portafolio Profesional */}
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 100, damping: 15 }}
          className="flex items-center gap-2 border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/40 text-zinc-600 dark:text-zinc-300 px-5 py-2 rounded-full text-xs font-mono uppercase tracking-widest mb-8 backdrop-blur-md shadow-xl shadow-zinc-200/50 dark:shadow-cyan-950/20 transition-colors duration-500"
        >
          <Bot size={15} className="text-cyan-500 dark:text-cyan-400" />
          <span>{t.hero.role}</span>
        </motion.div>

        {/* Saludo y Nombre */}
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-xl md:text-2xl text-zinc-500 dark:text-zinc-400 font-medium mb-10 transition-colors duration-500"
        >
          Un gusto conocerte, soy <span className="text-zinc-900 dark:text-white font-bold">Armando Ambrosio.</span>
        </motion.h2>
        
        {/* CONTENEDOR DE FOTO Y TEXTO GIGANTE */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16 mb-12">
          
          {/* FOTO ALTAMENTE ESTILIZADA CON EFECTO */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: -30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 0.7, type: "spring", stiffness: 100, damping: 20 }}
            whileHover={{ scale: 1.05 }} // Pequeño efecto magnético al hover
            className="relative w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-white dark:border-zinc-900 shadow-2xl group transition-all duration-500"
          >
            {/* Imagen en blanco y negro suave (Modo Oscuro) */}
            <Image 
              src="/images/me.jpg" // Asegúrate de tener tu foto en /public/images/me.jpg
              alt="Armando Ambrosio"
              fill
              className="object-cover transition-all duration-500 grayscale group-hover:grayscale-0" // Efecto grayscale a color
              priority // Carga rápida
            />
            
            {/* Superposición de cyan al hover para integrarse con la tipografía */}
            <div className="absolute inset-0 bg-cyan-500/0 group-hover:bg-cyan-500/10 transition-colors duration-500" />
          </motion.div>

          {/* TEXTO GIGANTE Y BRUTALISTA */}
          <h1 className="text-5xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter leading-[0.9] flex flex-col items-center md:items-start justify-center overflow-hidden py-2 text-center md:text-left transition-colors duration-500">
            <span className="text-zinc-900 dark:text-white mb-2 md:mb-4">
              {t.hero.headline1}
            </span>
            <AnimatedText text={t.hero.headlineAccent} className="text-cyan-600 dark:text-cyan-400" />
          </h1>
        </div>
        
        {/* Descripción */}
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl mx-auto text-zinc-600 dark:text-zinc-400 text-lg md:text-xl mb-16 leading-relaxed font-light px-4 transition-colors duration-500"
        >
          {t.hero.description}
        </motion.p>
        
        {/* Botón */}
        <motion.button 
          ref={buttonRef} 
          onMouseMove={handleMagneticMouseMove}
          onMouseLeave={() => setMagneticPosition({ x: 0, y: 0 })}
          animate={{ x: magneticPosition.x, y: magneticPosition.y }} 
          transition={{ type: "spring", stiffness: 150, damping: 20 }} 
          whileHover={{ scale: 1.05 }} 
          whileTap={{ scale: 0.98 }}
          className="group relative bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 px-12 py-5 rounded-full font-extrabold transition-colors flex items-center gap-2.5 overflow-hidden shadow-xl shadow-zinc-300 dark:shadow-cyan-900/10"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_40px_10px_rgba(34,211,238,0.2)]" />
          <span className="relative z-10 flex items-center gap-2.5 group-hover:text-white dark:group-hover:text-black transition-colors">
            {t.hero.button}
            <ArrowRight size={22} className="relative z-10 group-hover:translate-x-1.5 transition-transform" />
          </span>
        </motion.button>
      </div>
      
      {/* Texto cinético de fondo */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-zinc-300 dark:text-zinc-800 font-mono text-xs uppercase tracking-[0.5em] pointer-events-none whitespace-nowrap opacity-60 dark:opacity-30 z-0 transition-colors duration-500"
      >
        <motion.span animate={{ x: [0, -100, 0] }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="inline-block">
          React / Next.js / Python / Django / FastAPI / Docker / AWS
        </motion.span>
      </motion.div>
    </section>
  );
}