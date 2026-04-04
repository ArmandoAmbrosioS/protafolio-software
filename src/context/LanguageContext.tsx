// src/context/LanguageContext.tsx
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
          title: "Emotional AI Agents",
          category: "IA / NLP",
          description: "Agentes conversacionales con análisis de sentimiento utilizando la API de ChatGPT. Proyecto de tesis de maestría."
        },
        {
          title: "Cabus Transportaciones",
          category: "Full-Stack",
          description: "Landing page con funcionalidad de reserva de transporte para o hacia el aéropuerto de Ciudad Obregón."
        }
      ]
    },
    hobbies: {
      subtitle: "MÁS ALLÁ DEL CÓDIGO",
      title: "Mi visión a través de la ",
      titleAccent: "lente.",
      description: "Cuando no estoy estructurando bases de datos o optimizando el rendimiento web, me dedico a capturar el mundo real. Aquí una pequeña muestra de mi trabajo fotográfico."
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
          title: "Emotional AI Agents",
          category: "AI / NLP",
          description: "Conversational agents with sentiment analysis using ChatGPT API. MD Thesis project."
        },
        {
          title: "Cabus Transportaciones",
          category: "Full-Stack",
          description: "Landing page with transportation booking functionality to or from Ciudad Obregón airport."
        }
        
      ]
    },
    hobbies: {
      subtitle: "BEYOND THE CODE",
      title: "My vision through the ",
      titleAccent: "lens.",
      description: "When I'm not structuring databases or optimizing web performance, I spend my time capturing the real world. Here is a small glimpse of my photography work."
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
    <LanguageContext.Provider value={{ language, toggleLanguage, t: dictionaries[language] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};