// components/ProjectCard.js
"use client"
import { motion } from "framer-motion";

export default function ProjectCard({ title, category, image }) {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="relative group overflow-hidden rounded-xl bg-zinc-900 border border-zinc-800"
    >
      <div className="aspect-video bg-zinc-800">
        {/* Aquí iría tu imagen o video corto */}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
          {title}
        </h3>
        <p className="text-zinc-500">{category}</p>
      </div>
    </motion.div>
  );
}