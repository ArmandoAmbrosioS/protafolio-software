// src/app/hobbies/gaming/overwatch/page.tsx
"use client"
import { motion } from "framer-motion";
import { ArrowLeft, Activity, Clock, Trophy, Target, Flame, Medal } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/src/context/LanguageContext";
import ThemeToggle from "@/src/components/ThemeToggle";
import LanguageToggle from "@/src/components/LanguageToggle";
import { useState, useEffect } from "react";

export default function OverwatchMegaDashboard() {
  const { t } = useLanguage();
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mode, setMode] = useState<'competitive' | 'quickplay'>('competitive');

  useEffect(() => {
    setIsLoading(true);
    fetch(`/api/overwatch?mode=${mode}`).then(res => res.json()).then(resData => {
      setData(resData);
      setIsLoading(false);
    });
  }, [mode]);

  if (isLoading && !data) {
    return <div className="min-h-screen bg-[#212833] flex items-center justify-center text-[#f99e1a] font-black italic text-3xl uppercase tracking-widest animate-pulse">Iniciando Red Athena...</div>;
  }

  const ow = t.gamingHub?.overwatch;
  const formatHeroName = (name: string) => name.charAt(0).toUpperCase() + name.slice(1).replace('-', ' ');

  // URLs oficiales de Blizzard para los roles
  const roleIcons = {
    tank: "/images/gaming/ow/tank.png",
    damage: "/images/gaming/ow/damage.png",
    support: "/images/gaming/ow/support.png"
  };

  const HeroStatCard = ({ title, icon: Icon, heroes = [], format = "" }: { title: string, icon: any, heroes?: any[], format?: string }) => (
    <div className="bg-[#2b3445] rounded-xl p-6 border-t-4 border-[#f99e1a] shadow-lg hover:-translate-y-2 transition-transform duration-300">
      <div className="flex items-center gap-3 mb-6 border-b border-[#3b475c] pb-4">
        <Icon className="text-[#f99e1a]" size={20} />
        <h3 className="text-lg font-black italic uppercase text-white tracking-wide">{title}</h3>
      </div>
      <div className="space-y-4">
        {heroes.length === 0 ? (
          <div className="text-zinc-500 font-mono text-sm italic py-8 text-center flex flex-col items-center gap-2">
            <Activity size={24} className="opacity-50"/>
            Datos insuficientes en el registro.
          </div>
        ) : (
          heroes.map((h: any, idx: number) => (
            <div key={idx} className="flex items-center justify-between group">
              <div className="flex items-center gap-4">
                 <div className="w-10 h-10 rounded-md overflow-hidden bg-[#212833] border border-[#3b475c] relative group-hover:border-[#f99e1a] transition-colors">
                   <Image src={h.image} alt={h.hero} fill className="object-cover opacity-50 group-hover:opacity-100 transition-opacity" />
                 </div>
                 <span className="font-bold text-zinc-300 uppercase tracking-wider group-hover:text-white transition-colors">{formatHeroName(h.hero)}</span>
              </div>
              <div className="text-xl font-black italic text-[#f99e1a]">
                {h.value}{format}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );

  return (
    <main className="bg-[#212833] min-h-screen relative text-white overflow-hidden pb-32 selection:bg-[#f99e1a]/30">
      <ThemeToggle />
      <LanguageToggle />

      {/* 🔴 FONDO INMERSIVO DE KIRIKO 🔴 */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <video 
          src="/images/gaming/ow/kiriko-bg.mp4" 
          autoPlay 
          loop 
          muted 
          playsInline
          className="absolute w-full h-full object-cover opacity-30" 
        />
        {/* Degradado para fundir el video con el color base y mantener el texto legible */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#212833]/50 via-[#212833]/80 to-[#212833]" />
      </div>

      <div className="pt-32 px-5 max-w-7xl mx-auto relative z-10">
        
        <Link href="/hobbies/gaming" className="inline-flex items-center gap-2 text-zinc-400 hover:text-[#f99e1a] transition-colors font-bold text-sm uppercase tracking-widest mb-12">
          <ArrowLeft size={16} /> {t.gamingHub?.backLink}
        </Link>

        {/* 🟢 IDENTIDAD Y RANGOS 🟢 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-8 bg-[#2b3445] p-8 md:p-10 rounded-2xl flex flex-col md:flex-row items-center gap-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
               <Image src="/images/gaming/overwatch-logo.png" alt="OW" width={250} height={250} className="object-contain" />
            </div>
            
            <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-[#f99e1a] overflow-hidden flex-shrink-0 bg-[#212833] z-10">
               <Image src={data.identity.avatar} alt="Avatar" fill className="object-cover" />
            </div>
            
            <div className="text-center md:text-left flex-1 z-10">
              <span className="text-[#f99e1a] font-bold text-sm uppercase tracking-widest mb-1 block">{ow.subtitle} // {data.identity.platform}</span>
              <h1 className="text-5xl md:text-6xl font-black italic uppercase tracking-tighter text-white leading-none mb-2">
                 {data.identity.name}
              </h1>
              <p className="text-zinc-400 font-bold uppercase tracking-widest text-lg mb-4">{data.identity.title}</p>
              
              <div className="inline-flex items-center gap-3 bg-[#212833] border border-[#3b475c] px-4 py-2 rounded-lg transform -skew-x-12 shadow-lg">
                 <Medal size={16} className="text-[#f99e1a] skew-x-12" />
                 <span className="font-black italic text-[#f99e1a] skew-x-12 tracking-widest">ENDORSEMENT {data.identity.endorsement}</span>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-4 bg-[#f99e1a] rounded-2xl p-8 text-[#212833] shadow-2xl flex flex-col justify-center transform hover:scale-[1.02] transition-transform">
             <h3 className="text-xl font-black italic uppercase tracking-tighter mb-6 border-b border-[#212833]/20 pb-4">{ow.ranksTitle}</h3>
             <div className="space-y-6">
               {[
                 { role: ow.roles.tank, data: data.competitive.tank, img: roleIcons.tank },
                 { role: ow.roles.damage, data: data.competitive.damage, img: roleIcons.damage },
                 { role: ow.roles.support, data: data.competitive.support, img: roleIcons.support }
               ].map((item, i) => (
                 <div key={i} className="flex items-center justify-between">
                   <div className="flex items-center gap-3 font-bold uppercase">
                     {/* 👇 ICONOS OFICIALES DE ROL 👇 */}
                     <Image src={item.img} alt={item.role} width={22} height={22} className="opacity-90" /> {item.role}
                   </div>
                   <div className="flex items-center gap-3">
                     <span className="font-black text-xl italic">{item.data?.label || "Unranked"}</span>
                     {item.data?.icon && (
                       <div className="relative w-8 h-8 drop-shadow-md">
                         <Image src={item.data.icon} alt="Rank" fill className="object-contain" />
                       </div>
                     )}
                   </div>
                 </div>
               ))}
             </div>
          </motion.div>
        </div>

        {/* 🟡 FILTRO TÁCTICO DE MODO DE JUEGO 🟡 */}
        <div className="flex justify-center md:justify-start mb-6">
          <div className="flex bg-[#212833] rounded-lg p-1 border border-[#3b475c] w-fit shadow-inner">
            <button 
              onClick={() => setMode('competitive')}
              className={`px-6 py-2 rounded-md font-black italic uppercase text-sm transition-all duration-300 ${mode === 'competitive' ? 'bg-[#f99e1a] text-[#212833] shadow-md' : 'text-zinc-500 hover:text-white'}`}
            >
              {ow.modes?.competitive || "Temporada Comp"}
            </button>
            <button 
              onClick={() => setMode('quickplay')}
              className={`px-6 py-2 rounded-md font-black italic uppercase text-sm transition-all duration-300 ${mode === 'quickplay' ? 'bg-[#f99e1a] text-[#212833] shadow-md' : 'text-zinc-500 hover:text-white'}`}
            >
              {ow.modes?.quickplay || "Histórico QP"}
            </button>
          </div>
        </div>

        {/* 🔵 HOJA DE SERVICIO Y HÉROES 🔵 */}
        <div className={`transition-opacity duration-500 ${isLoading ? 'opacity-30 pointer-events-none' : 'opacity-100'}`}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
             <div className="bg-[#2b3445] p-6 rounded-xl border border-[#3b475c] text-center">
                <span className="text-zinc-500 font-bold uppercase tracking-widest text-xs">{ow.career.wins}</span>
                <div className="text-3xl font-black italic text-white mt-2">{data.career.gamesWon}</div>
             </div>
             <div className="bg-[#2b3445] p-6 rounded-xl border border-[#3b475c] text-center">
                <span className="text-zinc-500 font-bold uppercase tracking-widest text-xs">{ow.career.winrate}</span>
                <div className="text-3xl font-black italic text-white mt-2">{data.career.winrate}%</div>
             </div>
             <div className="bg-[#2b3445] p-6 rounded-xl border border-[#3b475c] text-center">
                <span className="text-zinc-500 font-bold uppercase tracking-widest text-xs">{ow.career.kda}</span>
                <div className="text-3xl font-black italic text-[#f99e1a] mt-2">{data.career.kda}</div>
             </div>
             <div className="bg-[#2b3445] p-6 rounded-xl border border-[#3b475c] text-center">
                <span className="text-zinc-500 font-bold uppercase tracking-widest text-xs">{ow.career.time}</span>
                <div className="flex items-center justify-center gap-2 text-3xl font-black italic text-white mt-2"><Clock size={20} className="text-[#f99e1a]"/> {data.career.timePlayed}</div>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
             <HeroStatCard title={ow.statsCategories.played} icon={Clock} heroes={data.heroes?.played} />
             <HeroStatCard title={ow.statsCategories.wins} icon={Trophy} heroes={data.heroes?.wins} /> 
             <HeroStatCard title={ow.statsCategories.elims} icon={Flame} heroes={data.heroes?.elims} />
             <HeroStatCard title={ow.statsCategories.kda} icon={Target} heroes={data.heroes?.kda} />
          </div>
        </div>

      </div>
    </main>
  );
}