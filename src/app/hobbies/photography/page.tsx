// src/app/hobbies/photography/page.tsx
"use client"
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Camera, ArrowLeft, X, Plus } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/src/context/LanguageContext";
import ThemeToggle from "@/src/components/ThemeToggle";
import LanguageToggle from "@/src/components/LanguageToggle";
import { useState } from "react";

// Componente Inteligente de cada Foto
const SmartPhoto = ({ photo, index, onClick }: { photo: any, index: number, onClick: () => void }) => {
  const [spanClass, setSpanClass] = useState("md:col-span-1 md:row-span-1");
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.9 }}
      transition={{ duration: 0.5 }}
      onClick={onClick}
      className={`relative rounded-3xl overflow-hidden cursor-pointer group bg-zinc-200 dark:bg-zinc-900 transition-all duration-500 shadow-lg ${spanClass}`}
    >
      <Image
        src={photo.src}
        alt={photo.title}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover transition-transform duration-700 group-hover:scale-110"
        onLoad={(e) => {
          const { naturalWidth, naturalHeight } = e.currentTarget;
          const ratio = naturalWidth / naturalHeight;
          if (ratio > 1.2) setSpanClass("md:col-span-2 md:row-span-2");
          else if (ratio < 0.8) setSpanClass("md:col-span-1 md:row-span-2");
          else setSpanClass("md:col-span-1 md:row-span-1");
          setIsLoaded(true);
        }}
      />
      {/* Overlay con ícono de + al pasar el mouse */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-500 flex items-center justify-center">
         <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            whileHover={{ scale: 1.1 }}
            className="opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white/20 backdrop-blur-sm p-4 rounded-full text-white"
         >
            <Plus size={24} />
         </motion.div>
      </div>
    </motion.div>
  );
};

export default function PhotographyPage() {
  const { t } = useLanguage();

  const allPhotos = t.hobbies.gallery;
  
  // Estados para el Modal y el Paginador
  const [selectedPhoto, setSelectedPhoto] = useState<any>(null);
  const [visibleCount, setVisibleCount] = useState(4); // Muestra 4 inicialmente

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 4); // Carga de 4 en 4
  };

  return (
    <main className="bg-zinc-50 dark:bg-[#010101] min-h-screen selection:bg-cyan-500/20 relative transition-colors duration-500 pb-32">
      <ThemeToggle />
      <LanguageToggle />

      <div className="pt-32 px-5 max-w-7xl mx-auto relative z-10">
         
         <Link href="/hobbies" className="inline-flex items-center gap-2 text-zinc-500 hover:text-cyan-500 transition-colors font-mono text-sm uppercase tracking-widest group mb-16">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
            {t.hobbies.backLink || "Volver"} 
         </Link>

        {/* Cabecera */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="max-w-2xl">
            <div className="flex items-center gap-2 text-cyan-500 dark:text-cyan-400 font-mono mb-4 uppercase tracking-widest text-sm transition-colors duration-500">
              <Camera size={18} />
              <span>{t.hobbies.subtitle}</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tighter leading-none text-zinc-900 dark:text-white transition-colors duration-500 mb-6">
              {t.hobbies.title} <span className="text-zinc-400 dark:text-zinc-500">{t.hobbies.titleAccent}</span>
            </h1>
            <p className="text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed font-light transition-colors duration-500">
              {t.hobbies.description}
            </p>
          </motion.div>
        </div>

        {/* El Grid Tetris */}
        <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[250px] md:auto-rows-[300px] gap-4 md:gap-6 grid-flow-row-dense mb-16">
          {allPhotos.slice(0, visibleCount).map((photo: any, index: number) => (
             <SmartPhoto 
                key={photo.id} 
                photo={photo} 
                index={index} 
                onClick={() => setSelectedPhoto(photo)} // Abre el modal
             />
          ))}
        </div>

        {/* Botón de Paginación (Solo se muestra si hay más fotos ocultas) */}
        {visibleCount < allPhotos.length && (
          <div className="flex justify-center">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLoadMore}
              className="px-8 py-3 rounded-full border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white font-medium hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
            >
              {t.hobbies.loadMore}
            </motion.button>
          </div>
        )}
      </div>

      {/* 🟢 MODAL / LIGHTBOX 🟢 */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)} // Cierra al hacer clic fuera
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-black/90 backdrop-blur-xl"
          >
            {/* Botón flotante para cerrar */}
            <button 
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-6 right-6 md:top-10 md:right-10 text-white/50 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all z-50"
            >
              <X size={24} />
            </button>

            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              onClick={(e) => e.stopPropagation()} // Evita que se cierre al hacer clic adentro
              className="bg-white dark:bg-[#050505] border border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden max-w-6xl w-full max-h-[90vh] flex flex-col md:flex-row shadow-2xl relative"
            >
               {/* Contenedor de la Imagen */}
               <div className="relative w-full md:w-2/3 h-[40vh] md:h-[80vh] bg-zinc-100 dark:bg-black">
                 <Image 
                    src={selectedPhoto.src} 
                    alt={selectedPhoto.title} 
                    fill 
                    className="object-contain" // object-contain evita que se corte en el modal
                 />
               </div>
               
               {/* Contenedor de la Información */}
               <div className="w-full md:w-1/3 p-8 md:p-12 flex flex-col justify-center border-l border-zinc-200 dark:border-zinc-800">
                  <div className="inline-flex items-center gap-2 text-cyan-500 font-mono text-xs uppercase tracking-widest mb-4">
                    <Camera size={14} /> {t.hobbies.photoTag}
                  </div>
                  <h2 className="text-3xl md:text-4xl font-extrabold text-zinc-900 dark:text-white mb-6 tracking-tight leading-tight">
                    {selectedPhoto.title}
                  </h2>
                  <p className="text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed font-light">
                    {selectedPhoto.desc}
                  </p>
               </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}