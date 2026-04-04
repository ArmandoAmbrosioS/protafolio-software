// src/components/ThemeToggle.tsx
"use client"
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Evitar error de hidratación asegurando que el componente cargó
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="fixed top-6 right-6 z-50 p-3 rounded-full bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white shadow-lg overflow-hidden flex items-center justify-center w-12 h-12 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 0 : 90, scale: isDark ? 1 : 0, opacity: isDark ? 1 : 0 }}
        transition={{ duration: 0.4, type: "spring", stiffness: 200, damping: 10 }}
        className="absolute"
      >
        <Moon size={22} className="text-cyan-600 dark:text-cyan-400" />
      </motion.div>

      <motion.div
        initial={false}
        animate={{ rotate: isDark ? -90 : 0, scale: isDark ? 0 : 1, opacity: isDark ? 0 : 1 }}
        transition={{ duration: 0.4, type: "spring", stiffness: 200, damping: 10 }}
        className="absolute"
      >
        <Sun size={22} className="text-amber-500" />
      </motion.div>
    </button>
  );
}