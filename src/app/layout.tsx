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
    <html lang="en" suppressHydrationWarning>
      <body className="bg-zinc-50 dark:bg-[#010101] text-zinc-900 dark:text-white flex flex-col min-h-screen overflow-x-clip">
        <ThemeProvider>
          <LanguageProvider>
            {/* <CustomCursor /> */}
            <Navbar />
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}