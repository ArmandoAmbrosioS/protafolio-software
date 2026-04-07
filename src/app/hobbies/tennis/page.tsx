"use client"
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Trophy, Activity, Target, Shield, Zap, X, CircleUser } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/src/context/LanguageContext";
import ThemeToggle from "@/src/components/ThemeToggle";
import LanguageToggle from "@/src/components/LanguageToggle";
import { useState, useEffect } from "react";

export default function TennisPage() {
  const { t } = useLanguage();
  const gearIcons = [Target, Zap, Shield]; 
  
  const [players, setPlayers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  
  const [selectedItem, setSelectedItem] = useState<any>(null);


  const [modalLayout, setModalLayout] = useState("flex flex-col");
  const [imageContainerClass, setImageContainerClass] = useState("relative w-full h-80 bg-zinc-100 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800");
  const [textContainerClass, setTextContainerClass] = useState("w-full p-8 md:p-12 flex flex-col justify-center");
  const [isImageLoaded, setIsImageLoaded] = useState(false);


  useEffect(() => {
    const fetchTennisData = async () => {
      try {
        const response = await fetch('/api/tennis');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setPlayers(data);
      } catch (error) {
        console.error("Error fetching tennis data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTennisData();
  }, []);

  return (
    <main className="bg-zinc-50 dark:bg-[#010101] min-h-screen selection:bg-cyan-500/20 relative transition-colors duration-500 pb-32">
      <ThemeToggle />
      <LanguageToggle />

      <div className="pt-32 px-5 max-w-7xl mx-auto relative z-10">
         
         <Link href="/hobbies" className="inline-flex items-center gap-2 text-zinc-500 hover:text-cyan-500 transition-colors font-mono text-sm uppercase tracking-widest group mb-16">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
            {t.hobbies?.backLink || "Volver"} 
         </Link>

        {/* Cabecera */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="max-w-2xl">
            <div className="flex items-center gap-2 text-emerald-500 font-mono mb-4 uppercase tracking-widest text-sm transition-colors duration-500">
              <Trophy size={18} />
              <span>{t.tennis.subtitle}</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tighter leading-none text-zinc-900 dark:text-white transition-colors duration-500 mb-6">
              {t.tennis.title} <span className="text-emerald-500">{t.tennis.titleAccent}</span>
            </h1>
            <p className="text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed font-light transition-colors duration-500">
              {t.tennis.description}
            </p>
          </motion.div>
        </div>

        {/* Layout Dividido */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* LADO IZQUIERDO: Inventario */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2 flex items-center gap-3">
               {t.tennis.gearTitle}
            </h2>
            
            {t.tennis.gear.map((item: any, index: number) => (
              <div 
                key={index} 
                onClick={() => setSelectedItem({ ...item, type: 'gear' })}
                className="group cursor-pointer relative bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 md:p-6 rounded-3xl flex items-center gap-6 hover:border-emerald-500/50 transition-colors shadow-lg shadow-zinc-200/50 dark:shadow-none"
              >
                {/* Imagen del Producto en miniatura */}
                <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 flex-shrink-0">
                  <Image src={item.image} alt={item.name} fill sizes="100px" className="object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div>
                  <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">{item.item}</span>
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-white mt-1 mb-2 group-hover:text-emerald-500 transition-colors">{item.name}</h3>
                  <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed line-clamp-2">{item.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* LADO DERECHO: Dashboard Dinámico (API) */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="flex flex-col gap-6">
             <div className="flex justify-between items-end mb-2">
               <h2 className="text-2xl font-bold text-zinc-900 dark:text-white flex items-center gap-3">
                  {t.tennis.atpTitle}
               </h2>
             </div>

             <div className="bg-zinc-900 dark:bg-[#050505] border border-zinc-800 rounded-3xl p-6 shadow-2xl text-white">
                <div className="grid grid-cols-12 text-xs font-mono text-zinc-500 pb-4 border-b border-zinc-800 mb-4 px-2 uppercase tracking-wider">
                   <div className="col-span-2">Rank</div>
                   <div className="col-span-7">Player</div>
                   <div className="col-span-3 text-right">Points</div>
                </div>

                <div className="flex flex-col gap-2 min-h-[250px]">
                   {isLoading ? (
                      Array(3).fill(0).map((_, i) => (
                         <div key={i} className="flex gap-4 p-3 animate-pulse">
                            <div className="h-4 bg-zinc-800 rounded w-8"></div>
                            <div className="h-10 w-10 bg-zinc-800 rounded-full"></div>
                            <div className="h-4 bg-zinc-800 rounded w-full mt-3"></div>
                         </div>
                      ))
                   ) : (
                      players.map((player, idx) => {
                        const extendedInfo = (t.tennis.playersInfo as Record<string, any>)[player.name]; 
                        
                        return (
                          <motion.div 
                            initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.1 }}
                            key={player.rank} 
                            onClick={() => setSelectedItem({ ...player, ...extendedInfo, type: 'player' })}
                            className="grid grid-cols-12 items-center p-2 md:p-3 hover:bg-zinc-800/50 rounded-2xl transition-colors cursor-pointer group"
                          >
                             <div className="col-span-2 font-mono text-zinc-400 pl-2">#{player.rank}</div>
                             
                             <div className="col-span-7 font-medium flex items-center gap-3">
                                {/* Avatar del Jugador */}
                                <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border border-zinc-700 group-hover:border-emerald-500 transition-colors flex-shrink-0">
                                   <Image src={extendedInfo?.image || "/images/me.jpg"} alt={player.name} fill sizes="50px" className="object-cover group-hover:scale-110 transition-transform duration-500" />
                                </div>
                                <div className="flex flex-col">
                                   <span className="group-hover:text-emerald-400 transition-colors">{player.name}</span>
                                   <span className="text-xs font-mono text-zinc-500">{player.country} {player.flag}</span>
                                </div>
                             </div>

                             <div className="col-span-3 text-right font-mono text-emerald-400 pr-2">
                                {player.points}
                             </div>
                          </motion.div>
                        );
                      })
                   )}
                </div>
             </div>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => { setSelectedItem(null); setIsImageLoaded(false); }} // Cerramos y reseteamos el estado de carga
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-black/90 backdrop-blur-xl"
          >
            {/* Botón de Cerrar */}
            <button onClick={() => { setSelectedItem(null); setIsImageLoaded(false); }} className="absolute top-6 right-6 text-white/50 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all z-50">
              <X size={24} />
            </button>

            {/* Contenedor del Modal con diseño dinámico */}
            <motion.div
              initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 30 }}
              onClick={(e) => e.stopPropagation()} // Evita cerrar al hacer clic adentro
              className={`bg-white dark:bg-[#050505] border border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden max-w-5xl shadow-2xl relative transition-all duration-500 ${modalLayout}`}
            >
               {/* Contenedor de la Imagen con diseño dinámico */}
               <div className={`${imageContainerClass}`}>
                 <Image 
                    src={selectedItem.image} 
                    alt={selectedItem.name} 
                    fill 
                    className={`object-contain transition-opacity duration-300 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`} // object-contain para no cortar la imagen
                    onLoad={(e) => {
                       
                       const { naturalWidth, naturalHeight } = e.currentTarget;
                       const ratio = naturalWidth / naturalHeight;

                       if (ratio < 0.85) {
                          // Es Vertical (Retrato) o casi cuadrada -> Mantenemos Side-by-Side en md
                          setModalLayout("flex flex-col md:flex-row max-w-4xl");
                          setImageContainerClass("relative w-full md:w-1/2 h-96 md:h-[70vh] bg-zinc-100 dark:bg-black flex items-center justify-center");
                          setTextContainerClass("w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center border-l border-zinc-200 dark:border-zinc-800");
                       } else {
                          // Es Horizontal (Paisaje) -> Stackeamos vertical flex-col
                          setModalLayout("flex flex-col max-w-2xl");
                          setImageContainerClass("relative w-full h-96 bg-zinc-100 dark:bg-black border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-center");
                          setTextContainerClass("w-full p-8 md:p-12 flex flex-col justify-center");
                       }
                       setIsImageLoaded(true); // Mostramos la imagen solo cuando se cargó y se calculó el diseño
                    }}
                 />
               </div>
               
               {/* Contenedor de la Información con diseño dinámico */}
               <div className={`${textContainerClass}`}>
                  <div className="inline-flex items-center gap-2 text-emerald-500 font-mono text-xs uppercase tracking-widest mb-4">
                    <Trophy size={14} /> 
                    {selectedItem.type === 'gear' ? selectedItem.item : 'PRO PLAYER'}
                  </div>
                  
                  <h2 className="text-3xl md:text-4xl font-extrabold text-zinc-900 dark:text-white mb-4 tracking-tight leading-tight">
                    {selectedItem.name}
                  </h2>

                  {/* Badges rápidos de info si es jugador */}
                  {selectedItem.type === 'player' && (
                     <div className="flex gap-3 mb-6">
                        <span className="px-3 py-1 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs font-mono text-zinc-600 dark:text-zinc-400">
                           Rank: #{selectedItem.rank}
                        </span>
                        <span className="px-3 py-1 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs font-mono text-emerald-600 dark:text-emerald-400">
                           Points: {selectedItem.points}
                        </span>
                     </div>
                  )}
                  
                  <p className="text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed font-light">
                    {selectedItem.fullDesc}
                  </p>
               </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}