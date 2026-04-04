// components/Hero.js
"use client"
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="h-screen flex flex-col justify-center items-center bg-[#0a0a0a] text-white px-5">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <span className="text-cyan-400 font-mono mb-4 block uppercase tracking-widest">
          Freelance Developer & Solution Architect
        </span>
        <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tighter">
          Armando <span className="text-zinc-500">Ambrosio.</span>
        </h1>
        <p className="max-w-lg mx-auto text-zinc-400 text-lg mb-8">
          Transformo ideas complejas en productos digitales de alto rendimiento. 
          Especializado en arquitecturas escalables y experiencias interactivas.
        </p>
        
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-cyan-400 transition-colors"
        >
          Ver Proyectos
        </motion.button>
      </motion.div>
      
      {/* Decoración dinámica de fondo */}
      <div className="absolute inset-0 z-[-1] opacity-30">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
      </div>
    </section>
  );
}