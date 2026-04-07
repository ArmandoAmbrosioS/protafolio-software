"use client"
import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'es' | 'en';

const dictionaries = {
  es: {
    hero: {
      role: "PORTAFOLIO PROFESIONAL",
      intro: "Un gusto conocerte, soy", 
      headline1: "Desarrollador",
      headlineAccent: "Full-Stack.",
      description: "Ingeniero de Software y Estudiante de Maestría en Ciencias de la Ingeniería (Cómputo), Bilingüe con más de 3 años de experiencia desarrollando aplicaciones web escalables y APIs de alto rendimiento. Especializado en arquitecturas Full-Stack utilizando ecosistemas de Python (Django, FastAPI) y TypeScript/React (Next.js).",
      button: "Ver mi trabajo"
    },
    nav: {
      home: "Inicio",
      experience: "Experiencia",
      work: "Proyectos",
      photo: "Hobbies"
    },
    hobbiesHub: {
      backLink: "Volver al Portafolio",
      title: "Más allá del ",
      titleAccent: "teclado.",
      description: "El código es mi profesión, pero aquí te muestro lo que me inspira cuando no estoy programando.",
      cards: [
        {
          title: "Fotografía",
          desc: "Mi visión a través de la lente. Galería de paisajes y momentos.",
          link: "/hobbies/photography",
          color: "from-cyan-500/20 to-blue-500/20"
        },
        {
          title: "Tennis",
          desc: "Mi equipo en la cancha y jugadores favoritos.",
          link: "/hobbies/tennis",
          color: "from-emerald-500/20 to-teal-500/20"
        },
        {
          title: "Gaming",
          desc: "Estrategia y reflejos. Mis estadisticas en mis videojuegos favoritos.",
          link: "/hobbies/gaming",
          color: "from-purple-500/20 to-pink-500/20"
        }
      ]
    },
    gamingHub: {
      backLink: "Volver a Hobbies",
      title: "Mi perfil ",
      titleAccent: "Gamer.",
      description: "Estrategia, reflejos y trabajo en equipo. Aquí puedes ver mis estadísticas en tiempo real extraídas directamente de las APIs de los servidores oficiales.",
      cards: [
        {
          title: "Valorant",
          desc: "Rango actual, KDA, porcentaje de headshots y mi agente más jugado en el shooter táctico de Riot.",
          link: "/hobbies/gaming/valorant",
        },
        {
          title: "League of Legends",
          desc: "Mis picks en la Grieta del Invocador, maestría de campeones y winrate de la temporada.",
          link: "/hobbies/gaming/lol",
        },
        {
          title: "Overwatch 2",
          desc: "Estadísticas de daño, curación y horas jugadas con mis héroes favoritos en partidas competitivas.",
          link: "/hobbies/gaming/overwatch",
        }
      ],
      valorant: {
        subtitle: "Setup de Valorant",
        title: "Agente Principal de ",
        titleAccent: "Armando.", 
        description: "Controlador no binario de Escocia. Táctico, sutil y con una conexión única con las mariposas moradas que brillan a su alrededor.",
        riotId: "Riot ID",
        mapTitle: "Mapa Favorito",
        weaponTitle: "Arma Favorita",
        stats: {
          currentRank: "Rango Actual",
          peakRank: "Peak Rank",
          kd: "K/D Ratio",
          winrate: "Win Rate"
        },
        signatureStats: "Estadísticas Clave"
      },
      lol: {
        subtitle: "SISTEMA HEXTECH",
        title: "Expediente de ",
        titleAccent: "Invocador",
        description: "Análisis táctico y registros de combate en la Grieta del Invocador.",
        staticData: {
          riotId: "Riot ID",
          favSkin: "Skin Favorita",
          currentRank: "Rango Actual",
          peakRank: "Peak Rank",
          hatedChamp: "Campeón que más odio",
          hatedChampImg: "https://ddragon.leagueoflegends.com/cdn/14.6.1/img/champion/Milio.png"
        },
        myProfile: {
          riotId: "dyfit#1017",
          favSkin: "Vayne Flor Espiritual",
          currentRank: "Esmeralda II",
          peakRank: "Diamante I",
          hatedChamp: "Milio",
          hatedChampImg: "https://ddragon.leagueoflegends.com/cdn/14.6.1/img/champion/Milio.png"
        },
        champions: [
          { 
            name: "Vayne", 
            title: "La Cazadora Umbría", 
            role: "Tirador", 
            mastery: "1,240,500 pts",
            desc: "Especialista en destruir tanques y movilidad extrema en duelos 1v1. Mi pick de confort cuando la partida requiere un carry de alto riesgo.",
            splash: "/images/gaming/lol/vayne-bg.jpg",
            png: "/images/gaming/lol/vayne.png"
          },
          { 
            name: "Kalista", 
            title: "El Espíritu de la Venganza", 
            role: "Tirador", 
            mastery: "850,200 pts",
            desc: "Kiteo absoluto y control de objetivos. Su pasiva me permite reposicionarme en cada básico, y la acumulación de lanzas la hace letal para dominar la línea.",
            splash: "/images/gaming/lol/kalista-bg.jpg",
            png: "/images/gaming/lol/kalista.png"
          },
          { 
            name: "Jinx", 
            title: "La Bala Perdida", 
            role: "Tirador", 
            mastery: "620,000 pts",
            desc: "Caos total. Su pasiva permite encadenar asesinatos y objetivos de una forma que ningún otro campeón puede igualar.",
            splash: "/images/gaming/lol/jinx-bg.jpg",
            png: "/images/gaming/lol/jinx.png"
          }
        ]
      },
      overwatch: {
        subtitle: "RED DE VANGUARDIA",
        title: "Dossier de ",
        titleAccent: "Agente",
        description: "Estadísticas extraídas en tiempo real de la base de datos oficial de Overwatch. Análisis de rendimiento histórico y actual.",
        ranksTitle: "División Competitiva",
        scopeLabel: "Histórico Competitivo", 
        roles: { tank: "Tanque", damage: "Daño", support: "Apoyo" },
        modes: {
          competitive: "Temporada Actual (Comp)",
          quickplay: "Histórico Global (QP)"
        },
        career: {
          title: "Hoja de Servicio",
          wins: "Victorias Totales",
          winrate: "Win Rate Global", 
          kda: "KDA Promedio",
          time: "Tiempo Jugado"
        },
        statsCategories: {
          played: "Héroes Más Jugados",
          wins: "Partidas Ganadas",   
          elims: "Eliminaciones por Vida",
          kda: "Mejores KDA"
        }
      },
    },
    services: {
      subtitle: "CÓMO TRABAJO",
      title: "Soluciones Digitales de ",
      titleAccent: "Alto Impacto.",
      items: [
        {
          title: "Desarrollo High-Performance",
          description: "Creación de SPAs y SSR con Next.js enfocadas en velocidad, SEO y Core Web Vitals perfectos."
        },
        {
          title: "Arquitectura Escalable",
          description: "Diseño de sistemas modulares y limpios, listos para crecer y fáciles de mantener a largo plazo."
        },
        {
          title: "Soluciones de Negocio",
          description: "Transformo requerimientos complejos en productos digitales que generan valor real y medible."
        }
      ]
    },
    experience: {
      title: "EXPERIENCIA LABORAL",
      jobs: [
        {
          role: "Full Stack Developer",
          company: "Mediaeréa",
          date: "Oct 2022 - Oct 2025",
          achievements: [
            "Lideré el desarrollo y mantenimiento de componentes de alta complejidad utilizando Django, HTML, CSS y Bootstrap.",
            "Arquitecté e integré servicios RESTful APIs de alto rendimiento utilizando FastAPI."
          ]
        },
        {
          role: "Back End Developer",
          company: "Ludens Productions",
          date: "Oct 2022 - Mar 2023",
          achievements: [
            "Desarrollé nuevas funcionalidades en Laravel (PHP, MySQL) y FastAPI (Python).",
            "Gestioné el ciclo de vida del desarrollo mediante Git y ClickUp."
          ]
        },
        {
          role: "Front End Developer",
          company: "Sahuaro Labs LLC",
          date: "Feb 2022 - Jun 2022",
          achievements: [
            "Construí interfaces dinámicas para Tracx.io utilizando Next.js y TypeScript."
          ]
        }
      ]
    },
    projects: {
      title: "PROYECTOS.",
      viewProject: "Ver Proyecto",
      viewCode: "Código",
      items: [
        {
          title: "SaaS Multi-tenant POS",
          category: "Full-Stack / B2B SaaS",
          description: "Punto de venta basado en la nube para tiendas de TCG. Arquitectura multi-tenant con Django."
        },
        {
          title: "Smart City IoT Monitor",
          category: "IoT / Data Analytics",
          description: "Sistema de monitoreo urbano para detectar anomalías sonoras y baches en tiempo real. Desarrollado para Hackathon Smart City HMO 2026."
        },
        {
          title: "Cabus Transportaciones",
          category: "Full-Stack",
          description: "Landing page con funcionalidad de reserva de transporte para o hacia el aéropuerto de Ciudad Obregón."
        },
        {
          title: "Emotional AI Agents",
          category: "IA / NLP",
          description: "Agentes conversacionales con análisis de sentimiento utilizando la API de ChatGPT. Proyecto de tesis de maestría."
        }
      ]
    },
    hobbies: {
      backLink: "Volver al portafolio",
      subtitle: "MÁS ALLÁ DEL CÓDIGO",
      title: "Mi visión a través de la ",
      titleAccent: "lente.",
      description: "Cuando no estoy estructurando bases de datos u optimizando el rendimiento web, me dedico a capturar el mundo real. Aquí una pequeña muestra de mi trabajo fotográfico.",
      
      
      loadMore: "Cargar más fotografías",
      photoTag: "FOTOGRAFÍA",
      gallery: [
        { id: 1, src: "/images/gallery/foto1.jpg", title: "Biznaga.", desc: "La belleza del desierto. Su composición abstracta con patrones complejos en el centro la hacen una maravilla digna de apreciar." },
        { id: 2, src: "/images/gallery/foto2.jpg", title: "Rosa en el desierto.", desc: "La rosa que crece en el desierto." },
        { id: 3, src: "/images/gallery/foto3.jpg", title: "Sahuaros.", desc: "Hermosa fotografía de sahuaros en un encuadre con regla de los tercios." },
        { id: 4, src: "/images/gallery/foto4.jpg", title: "Otra Biznaga.", desc: "¿Ya les conté que me gusta fotografiar Biznagas?" },
        { id: 5, src: "/images/gallery/foto5.jpg", title: "Guts.", desc: "Mi versión de portada del album Guts de Olivia Rodrigo." }
      ]
    },
    tennis: {
      subtitle: "EN LA CANCHA",
      title: "Mi pasión por el ",
      titleAccent: "Tennis.",
      description: "El deporte que me enseña sobre disciplina, estrategia y resiliencia. Aquí te comparto mi equipo y las estadísticas de mis jugadores favoritos.",
      gearTitle: "Mi Equipo (Loadout)",
      gear: [
        { item: "Raqueta", name: "Babolat Pure Aero", desc: "Spin y potencia para el fondo de la cancha.", image: "/images/tennis/raqueta.jpg", fullDesc: "Diseñada para maximizar el spin. Con un marco aerodinámico, me permite generar mayor velocidad de cabeza para tiros profundos y pesados. Es mi arma principal en torneos." },
        { item: "Cuerdas", name: "Toroline O-Toro Tour", desc: "Tensión a 54 lbs para máximo control.", image: "/images/tennis/cuerdas.jpg", fullDesc: "Cuerdas de copoliéster que muerden la pelota increíblemente bien. Mantenerlas a 54 libras me da el equilibrio perfecto entre potencia y control direccional." },
        { item: "Calzado", name: "Nike Air Zoom Vapor Cage 4", desc: "Estabilidad pura en pista dura.", image: "/images/tennis/calzado.jpg", fullDesc: "El tenis es un deporte de pies. Estas Nikes me dan la confianza para deslizarme en canchas duras y frenar en seco sin miedo a torceduras." }
      ],
      atpTitle: "Jugadores Favoritos",
      liveStatus: "Conexión Segura (API/Fallback)",
      
      playersInfo: {
        "Carlos Alcaraz": { image: "/images/tennis/alcaraz.jpg", fullDesc: "El prodigio español. Su estilo explosivo, velocidad en la cancha y mentalidad agresiva son mi mayor inspiración a la hora de jugar." },
        "Rafa Nadal": { image: "/images/tennis/nadal.jpg", fullDesc: "El rey de la arcilla. Su resiliencia, deportividad y espíritu de lucha inquebrantable me enseñaron a jugar cada punto como si fuera el último." },
        "Emma Raducanu": { image: "/images/tennis/raducanu.jpg", fullDesc: "Pura técnica y fluidez. Su histórica victoria en el US Open viniendo desde la qualy es un recordatorio de que con la mentalidad correcta, todo es posible." }
      }
    },
    contact: {
      status: "Disponible para nuevas oportunidades",
      title: "¿Tienes una idea?",
      titleAccent: "Hagámosla código.",
      description: "Ya sea que busques construir una un sitio web, landing page, arquitectura escalable o un SaaS de alto rendimiento.",
      button: "Contactar Ahora",
      modal: {
        title: "Hablemos.",
        subtitle: "Cuéntame sobre tu proyecto y cómo puedo ayudarte.",
        name: "Nombre",
        namePlaceholder: "Ej. Juan Pérez",
        email: "Correo Electrónico",
        message: "Mensaje",
        messagePlaceholder: "Tengo una idea para un SaaS...",
        send: "Enviar Mensaje",
        sending: "Enviando...",
        success: "¡Mensaje enviado con éxito!",
        error: "Todos los campos son obligatorios."
      }
    }
  },
  en: {
    hero: {
      role: "SOFTWARE PORTFOLIO",
      intro: "Nice to meet you, I'm", 
      headline1: "Full-Stack",
      headlineAccent: "Developer.", 
      description: "Software Engineer and Master of Science in Engineering (Computer Science) student, bilingual with over 3 years of experience developing scalable web applications and high-performance APIs. Specialized in full-stack architectures using Python (Django, FastAPI) and TypeScript/React (Next.js) ecosystems.",
      button: "View my work"
    },
    nav: {
      home: "Home",
      experience: "Experience",
      work: "Work",
      photo: "Hobbies"
    },
    hobbiesHub: {
      backLink: "Back to Portfolio",
      title: "Beyond the ",
      titleAccent: "keyboard.",
      description: "Code is my profession, but here is what inspires me when I am not coding.",
      cards: [
        {
          title: "Photography",
          desc: "My vision through the lens. Gallery of landscapes and moments.",
          link: "/hobbies/photography",
          color: "from-cyan-500/20 to-blue-500/20"
        },
        {
          title: "Tennis",
          desc: "My gear on the court and favorite players.",
          link: "/hobbies/tennis",
          color: "from-emerald-500/20 to-teal-500/20"
        },
        {
          title: "Gaming",
          desc: "Strategy and reflexes. My favorite games stats.",
          link: "/hobbies/gaming",
          color: "from-purple-500/20 to-pink-500/20"
        }
      ]
    },
    gamingHub: {
      backLink: "Back to Hobbies",
      title: "My Gamer ",
      titleAccent: "Profile.",
      description: "Strategy, reflexes, and teamwork. Here you can see my real-time statistics pulled directly from official server APIs.",
      cards: [
        {
          title: "Valorant",
          desc: "Current rank, KDA, headshot percentage, and my most played agent in Riot's tactical shooter.",
          link: "/hobbies/gaming/valorant",
        },
        {
          title: "League of Legends",
          desc: "My picks on the Summoner's Rift, champion mastery, and season ranks.",
          link: "/hobbies/gaming/lol",
        },
        {
          title: "Overwatch 2",
          desc: "Damage, healing stats, and hours played with my favorite heroes in competitive matches.",
          link: "/hobbies/gaming/overwatch",
        }
      ],
      valorant: {
        subtitle: "Valorant Setup",
        title: "Main Agent of ",
        titleAccent: "Armando.",
        description: "Non-binary Controller from Scotland. Tactical, subtle, and with a unique connection to the glowing purple butterflies that surround them.",
        riotId: "Riot ID",
        mapTitle: "Favorite Map",
        weaponTitle: "Favorite Weapon",
        stats: {
          currentRank: "Current Rank",
          peakRank: "Peak Rank",
          kd: "K/D Ratio",
          winrate: "Win Rate"
        },
        signatureStats: "Signature Stats"
      },
      lol: {
        subtitle: "HEXTECH SYSTEM",
        title: "Summoner ",
        titleAccent: "Dossier",
        description: "Tactical analysis and combat records on the Summoner's Rift.",
        staticData: {
          riotId: "Riot ID",
          favSkin: "Favorite Skin",
          currentRank: "Current Rank",
          peakRank: "Peak Rank",
          hatedChamp: "Most Hated Champion",
          hatedChampImg: "https://ddragon.leagueoflegends.com/cdn/14.6.1/img/champion/Milio.png"
        },
        myProfile: {
          riotId: "dyfit#1017",
          favSkin: "Spirit Blossom Vayne",
          currentRank: "Emerald II",
          peakRank: "Diamond I",
          hatedChamp: "Milio",
          hatedChampImg: "https://ddragon.leagueoflegends.com/cdn/14.6.1/img/champion/Milio.png"
        },
        champions: [
          { 
            name: "Vayne", 
            title: "The Night Hunter", 
            role: "Marksman", 
            mastery: "1,240,500 pts",
            desc: "Specialist in shredding tanks and extreme mobility in 1v1 duels. My comfort pick when the match requires a high-risk carry.",
            splash: "/images/gaming/lol/vayne-bg.jpg",
            png: "/images/gaming/lol/vayne.png"
          },
          { 
            name: "Kalista", 
            title: "The Spear of Vengeance", 
            role: "Marksman", 
            mastery: "850,200 pts",
            desc: "Absolute kiting and objective control. Her passive allows me to reposition with every auto-attack, and stacking spears makes her lethal for dominating the lane.",
            splash: "/images/gaming/lol/kalista-bg.jpg",
            png: "/images/gaming/lol/kalista.png"
          },
          { 
            name: "Jinx", 
            title: "The Loose Cannon", 
            role: "Marksman", 
            mastery: "620,000 pts",
            desc: "Total chaos. Her passive allows chaining kills and objectives in a way no other champion can match.",
            splash: "/images/gaming/lol/jinx-bg.jpg",
            png: "/images/gaming/lol/jinx.png"
          }
        ]
      },
      overwatch: {
        subtitle: "VANGUARD NETWORK",
        title: "Agent ",
        titleAccent: "Dossier",
        description: "Real-time statistics extracted from the official Overwatch database. Analysis of historical and current performance.",
        ranksTitle: "Competitive Division",
        scopeLabel: "Competitive History", 
        roles: { tank: "Tank", damage: "Damage", support: "Support" },
        modes: {
          competitive: "Current Season (Comp)",
          quickplay: "Lifetime Stats (QP)"
        },
        career: {
          title: "Service Record",
          wins: "Total Wins",
          winrate: "Global Win Rate",
          kda: "Average KDA",
          time: "Time Played"
        },
        statsCategories: {
          played: "Most Played Heroes",
          wins: "Games Won",
          elims: "Eliminations per Life",
          kda: "Best KDA"
        }
      },
    },
    services: {
      subtitle: "HOW I WORK",
      title: "High-Impact ",
      titleAccent: "Digital Solutions.",
      items: [
        {
          title: "High-Performance Development",
          description: "Creation of SPAs and SSR with Next.js focused on speed, SEO, and perfect Core Web Vitals."
        },
        {
          title: "Scalable Architecture",
          description: "Design of modular and clean systems, ready to grow and easy to maintain in the long term."
        },
        {
          title: "Business Solutions",
          description: "I transform complex requirements into digital products that generate real and measurable value."
        }
      ]
    },
    experience: {
      title: "WORK EXPERIENCE",
      jobs: [
        {
          role: "Full Stack Developer",
          company: "Mediaeréa",
          date: "Oct 2022 - Oct 2025",
          achievements: [
            "Led the development and maintenance of high-complexity components using Django, HTML, CSS, and Bootstrap.",
            "Architected and integrated high-performance RESTful APIs using FastAPI."
          ]
        },
        {
          role: "Back End Developer",
          company: "Ludens Productions",
          date: "Oct 2022 - Mar 2023",
          achievements: [
            "Developed new features in Laravel (PHP, MySQL) and FastAPI (Python).",
            "Managed the development lifecycle using Git and ClickUp."
          ]
        },
        {
          role: "Front End Developer",
          company: "Sahuaro Labs LLC",
          date: "Feb 2022 - Jun 2022",
          achievements: [
            "Built dynamic user interfaces for Tracx.io using Next.js and TypeScript."
          ]
        }
      ]
    },
    projects: {
      title: "PROJECTS.",
      viewProject: "View Project",
      viewCode: "Code",
      items: [
        {
          title: "SaaS Multi-tenant POS",
          category: "Full-Stack / B2B SaaS",
          description: "Cloud-based POS for TCG stores. Multi-tenant architecture with Django."
        },
        {
          title: "Smart City IoT Monitor",
          category: "IoT / Data Analytics",
          description: "Urban monitoring system to detect sound anomalies and potholes in real-time. Developed for Hackathon Smart City HMO 2026."
        },
        {
          title: "Cabus Transportaciones",
          category: "Full-Stack",
          description: "Landing page with transportation booking functionality to or from Ciudad Obregón airport."
        },
        {
          title: "Emotional AI Agents",
          category: "AI / NLP",
          description: "Conversational agents with sentiment analysis using ChatGPT API. MD Thesis project."
        },
        
      ]
    },
    hobbies: {
      backLink: "Back to portfolio",
      subtitle: "BEYOND THE CODE",
      title: "My vision through the ",
      titleAccent: "lens.",
      description: "When I'm not structuring databases or optimizing web performance, I spend my time capturing the real world. Here is a small glimpse of my photography work.",
      
  
      loadMore: "Load more photographs",
      photoTag: "PHOTOGRAPHY",
      gallery: [
        { id: 1, src: "/images/gallery/foto1.jpg", title: "Biznaga", desc: "Its abstract composition with complex patterns in the center makes it a wonder worth appreciating." },
        { id: 2, src: "/images/gallery/foto2.jpg", title: "Rose in the desert.", desc: "The rose that grows in the desert." },
        { id: 3, src: "/images/gallery/foto3.jpg", title: "Saguaros", desc: "Beautiful photograph of saguaros in a frame with the rule of thirds." },
        { id: 4, src: "/images/gallery/foto4.jpg", title: "Another Biznaga.", desc: "Did I already tell you that I like to photograph barrel cacti?" },
        { id: 5, src: "/images/gallery/foto5.jpg", title: "Guts.", desc: "My version of the cover of Olivia Rodrigo's album Guts." }
      ]
    },
    tennis: {
      subtitle: "ON THE COURT",
      title: "My passion for ",
      titleAccent: "Tennis.",
      description: "The sport that teaches me about discipline, strategy, and resilience. Here is my gear and the stats of my favorite players.",
      gearTitle: "My Gear (Loadout)",
      gear: [
        { item: "Racquet", name: "Babolat Pure Aero", desc: "Spin and power from the baseline.", image: "/images/tennis/raqueta.jpg", fullDesc: "Designed to maximize spin. With an aerodynamic frame, it allows me to generate more racquet head speed for deep, heavy shots. It's my main weapon in tournaments." },
        { item: "Strings", name: "Toroline O-Toro Tour", desc: "Strung at 54 lbs for maximum control.", image: "/images/tennis/cuerdas.jpg", fullDesc: "Co-polyester strings that bite the ball incredibly well. Keeping them at 54 pounds gives me the perfect balance between power and directional control." },
        { item: "Shoes", name: "Nike Air Zoom Vapor Cage 4", desc: "Pure stability on hard courts.", image: "/images/tennis/calzado.jpg", fullDesc: "Tennis is a game of footwork. These Nikes give me the confidence to slide on hard courts and stop abruptly without fear of twisting an ankle." }
      ],
      atpTitle: "Favorite Players",
      liveStatus: "Secure Connection (API/Fallback)",
      playersInfo: {
        "Carlos Alcaraz": { image: "/images/tennis/alcaraz.jpg", fullDesc: "The Spanish prodigy. His explosive style, court speed, and aggressive mentality are my biggest inspirations when I play." },
        "Rafa Nadal": { image: "/images/tennis/nadal.jpg", fullDesc: "The king of clay. His resilience, sportsmanship, and unbreakable fighting spirit taught me to play every point as if it were the last." },
        "Emma Raducanu": { image: "/images/tennis/raducanu.jpg", fullDesc: "Pure technique and fluidity. Her historic US Open victory coming from the qualifiers is a reminder that with the right mindset, anything is possible." }
      }
    },
    contact: {
      status: "Available for new opportunities",
      title: "Have an idea?",
      titleAccent: "Let's make it code.",
      description: "Whether you're looking to build a web side, langing page, scalable architecture or a high-performance SaaS.",
      button: "Contact Now",
      modal: {
        title: "Let's talk.",
        subtitle: "Tell me about your project and how I can help you.",
        name: "Name",
        namePlaceholder: "e.g. John Doe",
        email: "Email",
        message: "Message",
        messagePlaceholder: "I have an idea for a SaaS...",
        send: "Send Message",
        sending: "Sending...",
        success: "Message sent successfully!",
        error: "All fields are required."
      }
    }
  }
};

type LanguageContextType = {
  language: Language;
  toggleLanguage: () => void;
  t: typeof dictionaries.es; 
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('es');
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'es' ? 'en' : 'es'));
  };

  if (!mounted) return null;

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t: dictionaries[language] as any }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};