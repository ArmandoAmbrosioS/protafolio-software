// src/app/hobbies/gaming/page.tsx
"use client"
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react"; // Ya no necesitamos Crosshair, Swords, etc.
import Link from "next/link";
import Image from "next/image"; // Importamos Image para los logos
import { useLanguage } from "@/src/context/LanguageContext";
import ThemeToggle from "@/src/components/ThemeToggle";
import LanguageToggle from "@/src/components/LanguageToggle";
import { useRef } from "react";

// Sub-componente actualizado para recibir logos en lugar de íconos genéricos
const GameVideoCard = ({ card, index, logoSrc, videoSrc }: { card: any, index: number, logoSrc: string, videoSrc: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(e => console.log("Autoplay prevenido:", e));
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <Link href={card.link} className="block w-full h-[450px]">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.15, duration: 0.6 }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative w-full h-full rounded-3xl overflow-hidden group cursor-pointer shadow-xl shadow-zinc-200/50 dark:shadow-none border border-zinc-200 dark:border-zinc-800"
      >
        {/* Video de Fondo */}
        <video
          ref={videoRef}
          src={videoSrc}
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
        />
        
        {/* Overlay Oscuro */}
        <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors duration-700" />

        {/* Contenido */}
        <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end z-10">
          <div className="translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
            
            {/* EL LOGO OFICIAL FLOTANTE */}
            <div className="relative w-12 h-12 md:w-16 md:h-16 mb-6 group-hover:scale-110 transition-transform duration-500">
               <Image 
                  src={logoSrc} 
                  alt={`${card.title} logo`} 
                  fill 
                  sizes="(max-width: 768px) 48px, 64px" // <-- Esta es la solución
                  className="object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.6)] transition-all duration-500" 
               />
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              {card.title}
            </h2>
            <p className="text-zinc-300 text-sm md:text-base leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 line-clamp-3">
              {card.desc}
            </p>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default function GamingHubPage() {
  const { t } = useLanguage();

  // Rutas a tus logos oficiales (Archivos PNG transparentes o SVG blancos)
  const logos = [
    "/images/gaming/valorant-logo.png",
    "/images/gaming/lol-logo.png",
    "/images/gaming/overwatch-logo.png"
  ];
  
  // Rutas a tus videos
  const videoPaths = [
    "/videos/valorant.mp4",
    "/videos/lol.mp4",
    "/videos/overwatch.mp4"
  ];

  return (
    <main className="bg-zinc-50 dark:bg-[#010101] min-h-screen selection:bg-cyan-500/20 relative transition-colors duration-500">
      <ThemeToggle />
      <LanguageToggle />

      <div className="pt-32 px-5 max-w-7xl mx-auto relative z-10 pb-32">
        
        {/* Botón de Regreso a Hobbies */}
        <Link href="/hobbies" className="inline-flex items-center gap-2 text-zinc-500 hover:text-cyan-500 transition-colors font-mono text-sm uppercase tracking-widest group mb-16">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
          {t.gamingHub?.backLink || "Volver"}
        </Link>

        {/* Cabecera */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-20">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-zinc-900 dark:text-white mb-6">
            {t.gamingHub?.title} <span className="text-cyan-500">{t.gamingHub?.titleAccent}</span>
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 text-lg md:text-xl max-w-2xl font-light leading-relaxed">
            {t.gamingHub?.description}
          </p>
        </motion.div>

        {/* Grid de Juegos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {t.gamingHub?.cards.map((card: any, index: number) => (
            <GameVideoCard 
               key={index} 
               card={card} 
               index={index} 
               logoSrc={logos[index]} 
               videoSrc={videoPaths[index]} 
            />
          ))}
        </div>

      </div>
    </main>
  );
}