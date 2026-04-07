"use client"
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Loader2 } from "lucide-react";
import { useState } from "react";
import { sendEmail } from "@/src/actions/sendEmail";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [isPending, setIsPending] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ text: string; type: "error" | "success" } | null>(null);

 
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    setStatusMsg(null);

    const formData = new FormData(e.currentTarget);
    const result = await sendEmail(formData);

    if (result.error) {
      setStatusMsg({ text: result.error, type: "error" });
      setIsPending(false);
    } else if (result.success) {
      setStatusMsg({ text: result.success, type: "success" });
      setIsPending(false);

      setTimeout(() => {
        onClose();
        setStatusMsg(null);
      }, 2000);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay oscuro (Fondo desenfocado) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />

          {/* Contenedor del Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-[101] pointer-events-none p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 w-full max-w-lg shadow-2xl pointer-events-auto relative overflow-hidden"
            >
              {/* Botón Cerrar */}
              <button 
                onClick={onClose}
                className="absolute top-6 right-6 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800"
              >
                <X size={20} />
              </button>

              <div className="mb-8">
                <h3 className="text-3xl font-extrabold text-zinc-900 dark:text-white mb-2">Hablemos.</h3>
                <p className="text-zinc-600 dark:text-zinc-400">Cuéntame sobre tu proyecto y cómo puedo ayudarte.</p>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {/* Inputs con diseño limpio */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Nombre</label>
                  <input required type="text" id="name" name="name" 
                    className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white focus:ring-2 focus:ring-cyan-500 outline-none transition-all"
                    placeholder="Ej. Juan Pérez"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Correo Electrónico</label>
                  <input required type="email" id="email" name="email" 
                    className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white focus:ring-2 focus:ring-cyan-500 outline-none transition-all"
                    placeholder="hola@ejemplo.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Mensaje</label>
                  <textarea required id="message" name="message" rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white focus:ring-2 focus:ring-cyan-500 outline-none transition-all resize-none"
                    placeholder="Tengo una idea para un SaaS..."
                  />
                </div>

                {/* Mensaje de feedback */}
                {statusMsg && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                    className={`text-sm ${statusMsg.type === "error" ? "text-red-500" : "text-emerald-500"}`}
                  >
                    {statusMsg.text}
                  </motion.p>
                )}

                {/* Botón Enviar Dinámico */}
                <button 
                  disabled={isPending}
                  type="submit" 
                  className="mt-2 w-full bg-zinc-900 dark:bg-white text-white dark:text-black py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors disabled:opacity-70"
                >
                  {isPending ? (
                    <> <Loader2 size={18} className="animate-spin" /> Enviando... </>
                  ) : (
                    <> Enviar Mensaje <Send size={18} /> </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}