"use client"
import { motion } from "framer-motion";
import { ArrowLeft, Target, Skull, TrendingUp, Award, MapPin, Zap } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/src/context/LanguageContext";
import ThemeToggle from "@/src/components/ThemeToggle";
import LanguageToggle from "@/src/components/LanguageToggle";

export default function ValorantImmersiveDashboard() {
  const { t } = useLanguage();


  const playerData = {
    riotId: { name: "dyfit", tag: "1017" },

    agent: { name: "Clove", image: "/images/gaming/clove-full.png" },
    ranks: {
      current: { tier: "Diamante 1", rr: 28, icon: "/images/gaming/rank-diamond.png" },
      peak: { tier: "Inmortal 1", icon: "/images/gaming/rank-inmortal.png" }
    },
    favorites: {
      weapon: { name: "Vandal", skin: "Champions 2021", image: "/images/gaming/vandal.png" },
      map: { name: "Fracture", image: "/images/gaming/fracture.jpg" }
    },
    stats: { kd: "1.25", winrate: "58.1%" }
  };


  const agentEntryAnimation = {
    hidden: { opacity: 0, x: -100, scale: 1.1, filter: "blur(10px)" },
    visible: { 
      opacity: 1, 
      x: 0, 
      scale: 1, 
      filter: "blur(0px)",
      transition: { 
        duration: 1.2, // Entrada lenta y majestuosa
        ease: [0.22, 1, 0.36, 1], // Cubic-bezier suave
        delay: 0.2
      }
    }
  };

  return (
    // Fondo ultra oscuro con tono rojo muy sutil al hacer selección
    <main className="bg-zinc-50 dark:bg-[#050505] min-h-screen selection:bg-red-500/30 relative transition-colors duration-500 overflow-hidden">
      <ThemeToggle />
      <LanguageToggle />

      {/* OVERLAY DE FONDO TÁCTICO CON LOGO DE VALORANT SUTIL */}
      <div className="absolute inset-0 z-0 opacity-[0.02] dark:opacity-[0.03] pointer-events-none">
         <Image src="/images/gaming/valorant-logo.png" alt="w" fill className="object-cover scale-150" />
      </div>

      {/* MODAL OSCURO  */}
      <div className="pt-32 px-5 max-w-[90rem] mx-auto relative z-10 pb-32">
         
         <Link href="/hobbies/gaming" className="inline-flex items-center gap-2 text-zinc-500 hover:text-red-500 transition-colors font-mono text-sm uppercase tracking-widest group mb-12">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
            {t.gamingHub?.backLink || "Volver"} 
         </Link>

        {/* LAYOUT DIVIDIDO ASIMÉTRICO */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative">
          
          {/*  LADO IZQUIERDO: EL AGENTE CON MARIPOSAS INTELIGENTES */}
          <div className="lg:col-span-5 relative flex flex-col items-center justify-center pt-10 md:pt-0 overflow-hidden">
             
             {/* Texto de Fondo Gigante Estilo Valorant */}
             <div className="absolute top-0 left-0 text-[15rem] md:text-[20rem] font-extrabold text-zinc-100 dark:text-zinc-900/40 tracking-tighter leading-none select-none z-0">
               {playerData.agent.name.toUpperCase()}
             </div>

             {/* Imagen del Agente con Animación Táctica */}
             <motion.div 
               variants={agentEntryAnimation}
               initial="hidden"
               animate="visible"
               className="relative z-10 w-full h-[60vh] md:h-[80vh]"
             >
                <Image 
                  src={playerData.agent.image} 
                  alt={playerData.agent.name} 
                  fill 
                  priority // Carga esta imagen primero
                  className="object-contain drop-shadow-[0_0_50px_rgba(239,68,68,0.2)]"
                />
             </motion.div>
             
             {/* Resplandor Rojo Inferior Sutil de Clove */}
             <div className="absolute bottom-0 h-40 w-full bg-gradient-to-t from-red-500/10 to-transparent blur-3xl z-0" />

            
             {/* Usamos el GIF en el fondo negro para que no cubra el texto */}
             <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden h-[60vh] md:h-[80vh]">
                {/* Instancias sutiles y transparentes de mariposas en el fondo negro */}
                <Image 
                  src="/images/gaming/mariposas.gif" 
                  alt="Mariposas moradas brillantes volando" 
                  fill 
                  className="object-contain opacity-30 drop-shadow-[0_0_15px_rgba(239,68,68,0.2)] grayscale-[30%] blur-sm"
                />
             </div>
          </div>

          {/*  LADO DERECHO: LOS DATOS  */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.8, delay: 0.8 }} // Aparece después del agente
            className="lg:col-span-7 flex flex-col gap-10"
          >
            
            {/* CABECERA TÁCTICA */}
            <div className="border-l-4 border-red-500 pl-6">
              <div className="flex items-center gap-2 text-red-500 font-mono mb-3 uppercase tracking-widest text-sm transition-colors duration-500">
                 <Zap size={18} />
                 <span>{t.gamingHub?.valorant?.subtitle}</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-extrabold tracking-tighter leading-none text-zinc-900 dark:text-white transition-colors duration-500 mb-5 tracking-tight">
                 {t.gamingHub?.valorant?.title} <span className="text-red-500">{t.gamingHub?.valorant?.titleAccent}</span>
              </h1>
              
              {/* RIOT ID BADGE */}
              <div className="inline-flex items-center gap-3 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-5 py-2.5 rounded-xl">
                 <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">{t.gamingHub?.valorant?.riotId}</span>
                 <span className="text-xl font-bold text-zinc-900 dark:text-white tracking-wider">
                   {playerData.riotId.name}<span className="text-zinc-400 font-light">#{playerData.riotId.tag}</span>
                 </span>
              </div>
            </div>

            {/* GRID DE DATOS CLAVE */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               
               {/* RANGO ACTUAL TÁCTICO */}
               <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-xl border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 flex items-center justify-between shadow-xl group hover:border-red-500/40 transition-colors duration-500">
                  <div>
                     <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">{t.gamingHub?.valorant?.stats.currentRank}</span>
                     <h3 className="text-3xl font-extrabold text-zinc-900 dark:text-white mt-1 tracking-tight">{playerData.ranks.current.tier}</h3>
                     <div className="text-red-500 font-mono mt-2 flex items-center gap-2 text-sm">
                        <TrendingUp size={16} /> {playerData.ranks.current.rr} RR
                     </div>
                  </div>
                  <div className="relative w-20 h-20 drop-shadow-[0_0_15px_rgba(239,68,68,0.3)] group-hover:scale-110 transition-transform">
                     <Image src={playerData.ranks.current.icon} alt="Rank" fill className="object-contain" />
                  </div>
               </div>

               {/* PEAK RANK */}
               <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-xl border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 flex items-center justify-between shadow-xl">
                  <div>
                     <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">{t.gamingHub?.valorant?.stats.peakRank}</span>
                     <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mt-1 leading-tight tracking-tight">{playerData.ranks.peak.tier}</h3>
                  </div>
                  <div className="relative w-16 h-16 opacity-50">
                     <Image src={playerData.ranks.peak.icon} alt="Peak Rank" fill className="object-contain" />
                  </div>
               </div>

               {/* ARMA FAVORITA */}
               <div className="md:col-span-2 bg-white dark:bg-zinc-900/50 backdrop-blur-xl border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl group hover:border-red-500/40 transition-colors duration-500">
                  <div className="flex items-center gap-6">
                    <div className="relative w-32 h-16 flex-shrink-0">
                       <Image src={playerData.favorites.weapon.image} alt="Weapon" fill className="object-contain" />
                    </div>
                    <div>
                       <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">{t.gamingHub?.valorant?.weaponTitle}</span>
                       <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mt-1 leading-tight tracking-tight">{playerData.favorites.weapon.name} <span className="text-red-500 font-light text-lg">({playerData.favorites.weapon.skin} Skin)</span></h3>
                    </div>
                  </div>
                  <Target size={32} className="text-zinc-300 dark:text-zinc-700 md:block hidden" />
               </div>

               {/* MAPA FAVORITO */}
               <div className="relative md:col-span-2 h-48 rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 group shadow-xl hover:border-red-500/40 transition-colors duration-500">
                  <Image src={playerData.favorites.map.image} alt="Map" fill className="object-cover opacity-60 group-hover:scale-105 group-hover:opacity-80 transition-all duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent" />
                  <div className="absolute inset-0 p-8 flex items-center gap-5 z-10">
                     <MapPin size={32} className="text-red-500" />
                     <div>
                        <span className="text-xs font-mono text-zinc-300 uppercase tracking-widest leading-tight tracking-tight">{t.gamingHub?.valorant?.mapTitle}</span>
                        <h3 className="text-3xl font-extrabold text-white mt-1 tracking-wider">{playerData.favorites.map.name.toUpperCase()}</h3>
                     </div>
                  </div>
               </div>

               {/* ESTADÍSTICAS FIRMA */}
               <div className="md:col-span-2 bg-zinc-100 dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 shadow-inner">
                  <h4 className="text-sm font-mono text-zinc-500 uppercase tracking-widest mb-6 border-b border-zinc-200 dark:border-zinc-800 pb-4 leading-tight tracking-tight">{t.gamingHub?.valorant?.signatureStats}</h4>
                  <div className="grid grid-cols-2 gap-8">
                     <div className="flex items-center gap-4">
                        <Skull className="text-red-500" size={28} />
                        <div>
                           <div className="text-3xl font-extrabold text-zinc-900 dark:text-white leading-tight tracking-tight">{playerData.stats.kd}</div>
                           <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest">{t.gamingHub?.valorant?.stats.kd}</div>
                        </div>
                     </div>
                     <div className="flex items-center gap-4">
                        <Award className="text-red-500" size={28} />
                        <div>
                           <div className="text-3xl font-extrabold text-zinc-900 dark:text-white leading-tight tracking-tight">{playerData.stats.winrate}</div>
                           <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest">{t.gamingHub?.valorant?.stats.winrate}</div>
                        </div>
                     </div>
                  </div>
               </div>

            </div>
          </motion.div>

        </div>
      </div>
    </main>
  );
}