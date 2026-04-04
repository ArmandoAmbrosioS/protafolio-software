// src/components/Services.tsx
"use client"
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Zap, Layers3, BarChart3 } from "lucide-react";
import { useRef } from "react";
import { useLanguage } from "@/src/context/LanguageContext"; // 1. Importamos el contexto

// Mantenemos solo los datos visuales (iconos y colores) aquí
const servicesVisuals = [
  { icon: Zap, color: "text-cyan-500 dark:text-cyan-400" },
  { icon: Layers3, color: "text-purple-500 dark:text-purple-400" },
  { icon: BarChart3, color: "text-amber-500 dark:text-amber-400" },
];

const ServiceCard = ({ serviceData, visual }: any) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  function onMouseMove(e: React.MouseEvent) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = (e.clientX - rect.left) / rect.width - 0.5;
    const mouseY = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(mouseX);
    y.set(mouseY);
  }

  function onMouseLeave() {
    x.set(0); y.set(0);
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative aspect-[3/4] w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 cursor-pointer flex flex-col justify-between overflow-hidden group shadow-xl shadow-zinc-200/50 dark:shadow-black/30 transition-colors duration-500"
    >
      <motion.div
        style={{
          transform: "translateZ(100px)",
          background: `radial-gradient(100px circle at ${mouseXSpring.get() * 100 + 50}% ${mouseYSpring.get() * 100 + 50}%, rgba(34,211,238,0.15), transparent)`,
        }}
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
      />

      <div style={{ transform: "translateZ(50px)" }} className="z-10 flex flex-col items-center text-center">
        <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 mb-8 transition-colors duration-500">
          <visual.icon className={`w-10 h-10 ${visual.color}`} strokeWidth={1.5} />
        </div>
        <h3 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight mb-4 group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors">
          {/* Texto dinámico */}
          {serviceData.title}
        </h3>
        <p className="text-zinc-600 dark:text-zinc-400 text-base leading-relaxed font-light transition-colors duration-500">
          {/* Texto dinámico */}
          {serviceData.description}
        </p>
      </div>
      
      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-zinc-100 dark:bg-zinc-800/50 rounded-full blur-3xl group-hover:bg-cyan-100 dark:group-hover:bg-cyan-900/20 transition-colors duration-500" />
    </motion.div>
  );
};

export default function Services() {
  const { t } = useLanguage(); // 2. Extraemos las traducciones

  return (
    <section className="py-32 bg-zinc-50 dark:bg-[#010101] text-zinc-900 dark:text-white px-5 relative transition-colors duration-500">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24 max-w-2xl"
        >
          <span className="text-cyan-500 dark:text-cyan-400 font-mono mb-3 block uppercase tracking-widest text-sm transition-colors duration-500">
            {t.services.subtitle}
          </span>
          <h2 className="text-5xl md:text-6xl font-extrabold tracking-tighter leading-none text-zinc-900 dark:text-white transition-colors duration-500">
            {t.services.title} <span className="text-zinc-400 dark:text-zinc-500">{t.services.titleAccent}</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full perspective-[1500px]">
          {/* Mapeamos usando los items del diccionario */}
          {t.services.items.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <ServiceCard serviceData={service} visual={servicesVisuals[index]} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}