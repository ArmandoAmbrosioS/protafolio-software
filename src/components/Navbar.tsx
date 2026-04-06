// src/components/Navbar.tsx
"use client"
import { motion } from "framer-motion";
import { Home, Briefcase, Code, Compass } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/src/context/LanguageContext";

export default function Navbar() {
  const { t } = useLanguage();
  const pathname = usePathname();

  const navItems = [
    { name: t.nav.home, icon: Home, href: "/" },
    { name: t.nav.experience, icon: Briefcase, href: "/#experience" },
    { name: t.nav.work, icon: Code, href: "/#work" },
    { name: t.nav.photo, icon: Compass, href: "/hobbies" },
  ];

  return (
    <motion.div 
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 200, damping: 20 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
    >
      <nav className="flex items-center gap-2 md:gap-4 px-4 py-2 bg-white/70 dark:bg-[#050505]/70 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 rounded-full shadow-2xl">
        {navItems.map((item, index) => {
          // Detectamos si está activo basado en la ruta actual o el hash
          const isActive = pathname === item.href || (pathname === "/" && item.href === "/");

          return (
            <Link 
              key={index} 
              href={item.href}
              className={`relative flex items-center gap-2 px-3 py-2 rounded-full transition-colors group ${
                isActive ? "text-cyan-500 dark:text-cyan-400" : "text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
              }`}
            >
              <item.icon size={18} className="transition-transform group-hover:scale-110" />
              <span className="text-sm font-medium hidden md:block">
                {item.name}
              </span>
              
              {/* Indicador activo sutil */}
              {isActive && (
                <motion.div 
                  layoutId="nav-indicator"
                  className="absolute inset-0 bg-zinc-100 dark:bg-zinc-800/50 rounded-full -z-10"
                />
              )}
            </Link>
          );
        })}
      </nav>
    </motion.div>
  );
}