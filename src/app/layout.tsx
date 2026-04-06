// src/app/layout.tsx
import "./globals.css";
import { ThemeProvider } from "@/src/components/ThemeProvider";
import CustomCursor from "@/src/components/CustomCursor";
import { LanguageProvider } from "@/src/context/LanguageContext";
import Navbar from "@/src/components/Navbar";

export const metadata = {
  title: "Armando Ambrosio - Portafolio",
  description: "Portafolio y servicios freelance de Armando Ambrosio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="antialiased transition-colors duration-500">
        <ThemeProvider>
          {/* Envolvemos con el LanguageProvider */}
          <LanguageProvider>
            <CustomCursor />
            <Navbar />
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}