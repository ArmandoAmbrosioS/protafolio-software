"use client"
import { motion } from "framer-motion";
import Image from "next/image";
import { Camera } from "lucide-react";
import { useLanguage } from "@/src/context/LanguageContext";


const photos = [
  {
    id: 1,
    src: "/images/gallery/foto1.jpg", 
    alt: "Fotografía de paisaje",
    className: "md:col-span-2 md:row-span-2"
  },
  {
    id: 2,
    src: "/images/gallery/foto2.jpg",
    alt: "Fotografía urbana",
    className: "md:col-span-1 md:row-span-1" 
  },
  {
    id: 3,
    src: "/images/gallery/foto3.jpg",
    alt: "Fotografía nocturna",
    className: "md:col-span-1 md:row-span-1" 
  },
  {
    id: 4,
    src: "/images/gallery/foto4.jpg",
    alt: "Fotografía de retrato",
    className: "md:col-span-3 md:row-span-1 h-64 md:h-auto" 
  }
];

export default function Photography() {
  const { t } = useLanguage();

  return (
    <section className="py-32 bg-white dark:bg-[#050505] text-zinc-900 dark:text-white px-5 relative transition-colors duration-500 border-t border-zinc-200 dark:border-zinc-900">
      <div className="max-w-7xl mx-auto">
        
        {/* Cabecera de la sección */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-2 text-cyan-500 dark:text-cyan-400 font-mono mb-4 uppercase tracking-widest text-sm transition-colors duration-500">
              <Camera size={18} />
              <span>{t.hobbies.subtitle}</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-extrabold tracking-tighter leading-none text-zinc-900 dark:text-white transition-colors duration-500 mb-6">
              {t.hobbies.title} <span className="text-zinc-400 dark:text-zinc-500">{t.hobbies.titleAccent}</span>
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed font-light transition-colors duration-500">
              {t.hobbies.description}
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[250px] gap-4 md:gap-6">
          {photos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              className={`relative rounded-3xl overflow-hidden group bg-zinc-100 dark:bg-zinc-900 ${photo.className}`}
            >
              {/* Imagen con Next/Image bien optimizada */}
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw" 
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Overlay oscuro al hacer hover */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  );
}