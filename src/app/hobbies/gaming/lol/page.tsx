// src/app/hobbies/gaming/lol/page.tsx
"use client"
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ChevronLeft, ChevronRight, ShieldAlert, Trophy, Star, Target, Ghost } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/src/context/LanguageContext";
import ThemeToggle from "@/src/components/ThemeToggle";
import LanguageToggle from "@/src/components/LanguageToggle";
import { useState } from "react";

export default function LoLInteractivePage() {
  const { t } = useLanguage();
  const [activeIdx, setActiveIdx] = useState(0);

  // 🛡️ Extraemos los datos de manera segura
  const lolData = t.gamingHub?.lol;
  const champs = lolData?.champions || []; // Si no encuentra campeones, usa un array vacío

  // 👇 AQUÍ ESTÁ EL CAMBIO: Leemos del diccionario bilingüe con un respaldo seguro 👇
  const myProfile = lolData?.myProfile || {
    riotId: "dyfit#1017",
    favSkin: "Vayne Flor Espiritual",
    currentRank: "Esmeralda II",
    peakRank: "Diamante I",
    hatedChamp: "Milio",
    hatedChampImg: "https://ddragon.leagueoflegends.com/cdn/14.6.1/img/champion/Milio.png"
  };

  // Prevenimos crasheos si el array está vacío
  const nextChamp = () => {
    if (champs.length > 0) setActiveIdx((prev) => (prev + 1) % champs.length);
  };
  const prevChamp = () => {
    if (champs.length > 0) setActiveIdx((prev) => (prev - 1 + champs.length) % champs.length);
  };

  // Si el diccionario aún no carga, mostramos una pantalla oscura de carga rápida
  if (!lolData || champs.length === 0) {
    return <div className="min-h-screen bg-[#010a13] flex items-center justify-center text-[#c8aa6e] font-mono">Cargando sistema Hextech...</div>;
  }

  return (
    <main className="bg-[#010a13] min-h-screen relative text-white overflow-hidden pb-20">
      <ThemeToggle />
      <LanguageToggle />

      {/* 🔴 FONDO DINÁMICO GIGANTE (SIGUE ADAPTÁNDOSE CON EL SPLASH) 🔴 */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIdx}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }} // Sutil opacidad de fondo
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 z-0"
        >
          <Image 
            src={champs[activeIdx].splash} // Sigue usando el Splash completo para el fondo
            alt="Background" 
            fill 
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#010a13] via-transparent to-[#010a13]" />
        </motion.div>
      </AnimatePresence>

      <div className="pt-32 px-5 max-w-7xl mx-auto relative z-10">
        
        <Link href="/hobbies/gaming" className="inline-flex items-center gap-2 text-zinc-400 hover:text-[#c8aa6e] transition-colors font-mono text-xs uppercase tracking-[0.3em] mb-12">
          <ArrowLeft size={16} /> {t.gamingHub?.backLink}
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* BLOQUE IZQUIERDO: DATOS SIEMPRE VISIBLES */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }} 
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-4 space-y-6 lg:sticky lg:top-32"
          >
            <div className="border-l-2 border-[#c8aa6e] pl-6 mb-10">
              <span className="text-[#c8aa6e] font-mono text-xs tracking-widest uppercase">{lolData.subtitle}</span>
              <h1 className="text-4xl font-black italic uppercase tracking-tighter mt-2 leading-none">
                {lolData.title} <span className="text-[#c8aa6e]">{lolData.titleAccent}</span>
              </h1>
            </div>

            {/* Ficha de Identidad */}
            <div className="bg-[#091428]/80 backdrop-blur-md border border-[#c8aa6e]/30 rounded-2xl p-6 space-y-5 shadow-2xl">
              <div className="flex flex-col">
                <span className="text-zinc-500 text-[10px] uppercase font-mono tracking-widest leading-tight tracking-tight">{lolData.staticData.riotId}</span>
                <span className="text-xl font-bold tracking-wider">{myProfile.riotId}</span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#c8aa6e]/10">
                <div>
                  <span className="text-zinc-500 text-[10px] uppercase font-mono">{lolData.staticData.currentRank}</span>
                  <div className="flex items-center gap-2 text-blue-400 font-bold mt-1">
                    <Trophy size={14} /> {myProfile.currentRank}
                  </div>
                </div>
                <div>
                  <span className="text-zinc-500 text-[10px] uppercase font-mono">{lolData.staticData.peakRank}</span>
                  <div className="flex items-center gap-2 text-[#c8aa6e] font-bold mt-1">
                    <Star size={14} /> {myProfile.peakRank}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#c8aa6e]/10">
                <span className="text-zinc-500 text-[10px] uppercase font-mono">{lolData.staticData.favSkin}</span>
                <div className="flex items-center gap-2 text-zinc-200 font-medium mt-1">
                  <Target size={14} className="text-[#c8aa6e]" /> {myProfile.favSkin}
                </div>
              </div>

              {/* Campeón más Odiado */}
              <div className="pt-4 border-t border-red-500/20 bg-red-500/5 -mx-6 px-6 pb-2 rounded-b-2xl">
                <span className="text-red-500/70 text-[10px] uppercase font-mono flex items-center gap-2">
                  <ShieldAlert size={12} /> {lolData.staticData.hatedChamp}
                </span>
                <div className="flex items-center gap-3 mt-2">
                  <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-red-500/30">
                    <Image src={myProfile.hatedChampImg} alt="Hated" fill className="object-cover grayscale" />
                  </div>
                  <span className="text-red-400 font-bold uppercase tracking-tighter text-lg">{myProfile.hatedChamp}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 🔵 BLOQUE CENTRAL: CARRUSEL DE CAMPEONES REDISEÑADO 🔵 */}
          <div className="lg:col-span-8 relative">
            <div className="flex items-center justify-between mb-6">
               <h2 className="text-[#c8aa6e] font-mono text-xs tracking-[0.4em] uppercase">Champion Records</h2>
               <div className="flex gap-4">
                  <button onClick={prevChamp} className="p-3 rounded-full border border-[#c8aa6e]/30 hover:bg-[#c8aa6e] hover:text-black transition-all">
                    <ChevronLeft size={20} />
                  </button>
                  <button onClick={nextChamp} className="p-3 rounded-full border border-[#c8aa6e]/30 hover:bg-[#c8aa6e] hover:text-black transition-all">
                    <ChevronRight size={20} />
                  </button>
               </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeIdx}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.5 }}
                // 👇 NUEVO DISEÑO FLEX SIDE-BY-SIDE 👇
                className="relative min-h-[500px] w-full rounded-3xl overflow-hidden border-2 border-[#c8aa6e]/20 bg-[#091428]/90 backdrop-blur-md flex flex-col md:flex-row group shadow-2xl"
              >
                
                {/* 🔴 Contenedor de la Imagen PNG Flotante 🔴 */}
                <div className="relative w-full md:w-1/2 h-64 md:h-auto flex-shrink-0">
                   <Image 
                      src={champs[activeIdx].png} // 👇 Usamos el Render PNG transparente
                      alt={champs[activeIdx].name} 
                      fill 
                      // 👇 object-contain y drop-shadow para el efecto flotante
                      className="object-contain p-8 transition-transform duration-1000 group-hover:scale-105 drop-shadow-[0_0_30px_rgba(200,170,110,0.3)]"
                   />
                </div>
                
                {/* 🔵 Contenedor de la Información a un lado 🔵 */}
                <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center border-t md:border-t-0 md:border-l border-[#c8aa6e]/10">
                  <div className="flex items-center gap-3 text-[#c8aa6e] font-mono text-xs uppercase tracking-widest mb-2 leading-tight tracking-tight">
                    <Ghost size={16} /> {champs[activeIdx].role}
                  </div>
                  <h3 className="text-5xl md:text-6xl font-black italic uppercase tracking-tighter mb-4 leading-none">
                    {champs[activeIdx].name}
                  </h3>
                  <p className="text-zinc-300 text-lg font-light max-w-xl leading-relaxed mb-6">
                    {champs[activeIdx].desc}
                  </p>
                  
                  {/* Badge de Maestría */}
                  <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 px-6 py-3 rounded-2xl w-fit">
                    <Star className="text-[#c8aa6e] fill-[#c8aa6e]" size={20} />
                    <span className="font-mono text-sm tracking-widest leading-tight tracking-tight">{champs[activeIdx].mastery}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Indicadores de Carrusel */}
            <div className="flex justify-center gap-2 mt-8">
               {champs.map((_, i) => (
                 <div 
                   key={i} 
                   className={`h-1 transition-all duration-500 rounded-full ${i === activeIdx ? 'w-12 bg-[#c8aa6e]' : 'w-4 bg-zinc-800'}`} 
                 />
               ))}
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}