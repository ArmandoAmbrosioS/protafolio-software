// src/components/CustomCursor.tsx
"use client"
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // Valores de movimiento del ratón
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Física de resorte para un seguimiento ultra suave (smooth trailing)
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    setMounted(true);

    const moveCursor = (e: MouseEvent) => {
      // Restamos la mitad del tamaño (16px) para que el cursor quede exactamente en el centro del puntero
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    // Función para detectar si estamos sobre un elemento clickeable
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Comprueba si el objetivo es un enlace, un botón, o está dentro de uno
      if (
        target.tagName.toLowerCase() === 'button' ||
        target.tagName.toLowerCase() === 'a' ||
        target.closest('button') ||
        target.closest('a')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  // Evitar errores de SSR (Server-Side Rendering)
  if (!mounted) return null;

  return (
    <motion.div
      style={{
        x: smoothX,
        y: smoothY,
      }}
      animate={{
        // Si hace hover, crece al doble de su tamaño
        scale: isHovering ? 2 : 1,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      // Las clases clave: pointer-events-none (para no bloquear clics) y mix-blend-difference
      className="fixed top-0 left-0 w-8 h-8 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
    />
  );
}