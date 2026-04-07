"use client"
import { motion } from "framer-motion";
import { ArrowLeft, Camera, Trophy, Gamepad2 } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/src/context/LanguageContext";
import ThemeToggle from "@/src/components/ThemeToggle";
import LanguageToggle from "@/src/components/LanguageToggle";
import { useRef } from "react";


const VideoCard = ({ card, index, icon: Icon, videoSrc }: { card: any, index: number, icon: any, videoSrc: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => console.log("Video autoplay prevented:", error));
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause(); 
    }
  };

  return (
    <Link href={card.link} className="block w-full h-[400px]">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.15, duration: 0.6 }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative w-full h-full rounded-3xl overflow-hidden group cursor-pointer shadow-xl shadow-zinc-200/50 dark:shadow-none border border-zinc-200 dark:border-zinc-800"
      >
        {/* EL REPRODUCTOR DE VIDEO */}
        <video
          ref={videoRef}
          src={videoSrc}
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
        />
        

        <div className="absolute inset-0 bg-black/60 group-hover:bg-black/30 transition-colors duration-700" />

        {/* CONTENIDO DE LA TARJETA */}
        <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end z-10">
          <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            <div className={`p-4 rounded-2xl w-fit mb-6 bg-white/10 backdrop-blur-md border border-white/20 text-white group-hover:scale-110 transition-transform duration-500`}>
              <Icon size={32} />
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

export default function HobbiesHub() {
  const { t } = useLanguage();


  const icons = [Camera, Trophy, Gamepad2];
  const videoPaths = [
    "/videos/photography.mp4",
    "/videos/tennis.mp4",
    "/videos/gaming.mp4"
  ];

  return (
    <main className="bg-zinc-50 dark:bg-[#010101] min-h-screen selection:bg-cyan-500/20 relative transition-colors duration-500">
      <ThemeToggle />
      <LanguageToggle />

      <div className="pt-32 px-5 max-w-7xl mx-auto relative z-10 pb-32">
        
        {/* Botón de Regreso al Portafolio */}
        <Link href="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-cyan-500 transition-colors font-mono text-sm uppercase tracking-widest group mb-16">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
          {t.hobbiesHub?.backLink || "Volver al Portafolio"}
        </Link>

        {/* Cabecera del Hub */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-20">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-zinc-900 dark:text-white mb-6">
            {t.hobbiesHub?.title} <span className="text-cyan-500">{t.hobbiesHub?.titleAccent}</span>
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 text-lg md:text-xl max-w-2xl font-light leading-relaxed">
            {t.hobbiesHub?.description}
          </p>
        </motion.div>

        {/* GRID DE VIDEOS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {t.hobbiesHub?.cards.map((card: any, index: number) => (
            <VideoCard 
               key={index} 
               card={card} 
               index={index} 
               icon={icons[index]} 
               videoSrc={videoPaths[index]} 
            />
          ))}
        </div>

      </div>
    </main>
  );
}