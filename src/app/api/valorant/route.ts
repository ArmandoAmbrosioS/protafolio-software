// src/app/api/valorant/route.ts
import { NextResponse } from 'next/server';

export const revalidate = 3600; // Caché de 1 hora

export async function GET() {
  const apiKey = process.env.TRACKER_GG_API_KEY;
  
  // Reemplaza con tu ID real de Riot (Nombre#Tag)
  const platform = "riot";
  const persona = "dyfit#1017"; 
  const encodedPersona = encodeURIComponent(persona);

  try {
    if (!apiKey) throw new Error("Falta la API Key en el entorno");

    const response = await fetch(
      `https://public-api.tracker.gg/v2/valorant/standard/profile/${platform}/${encodedPersona}`,
      {
        headers: {
          'TRN-Api-Key': apiKey,
          'Accept': 'application/json',
          'Accept-Encoding': 'gzip'
        }
      }
    );

    if (!response.ok) throw new Error(`Error de Tracker.gg: ${response.status}`);

    const data = await response.json();
    const stats = data.data.segments[0].stats; // Segmento general (Lifetime)

    // Mapeamos los datos reales al formato de nuestra interfaz
    return NextResponse.json({
      player: {
        name: data.data.platformInfo.platformUserHandle.split('#')[0],
        tag: data.data.platformInfo.platformUserHandle.split('#')[1],
        level: stats.accountLevel?.value || 0,
        cardImage: data.data.platformInfo.avatarUrl || "/images/gaming/valorant-card.jpg"
      },
      rank: {
        tier: stats.rank?.displayValue || "Unrated",
        rr: 0, // Tracker.gg a veces separa el RR en otros segmentos
        icon: stats.rank?.metadata?.iconUrl || "/images/gaming/rank-ascendant.png"
      },
      stats: {
        kd: stats.kdRatio?.displayValue || "0.0",
        headshot: stats.headshotPercentage?.displayValue || "0%",
        winrate: stats.matchesWinPct?.displayValue || "0%"
      },
      // Tracker.gg API Standard no siempre devuelve los agentes en el perfil general
      // Así que mantenemos tus agentes favoritos como datos destacados
      topAgents: [
        { name: "Omen", role: "Controlador", hours: 124, image: "/images/gaming/omen.png" },
        { name: "Jett", role: "Duelista", hours: 98, image: "/images/gaming/jett.png" },
        { name: "Sova", role: "Iniciador", hours: 65, image: "/images/gaming/sova.png" }
      ]
    });

  } catch (error) {
    console.warn("⚠️ Tracker.gg inaccesible. Activando Red de Seguridad.");
    
    // Fallback de seguridad idéntico al anterior para que la UI nunca falle
    return NextResponse.json({
      player: { name: "Armando", tag: "DEV", level: 142, cardImage: "/images/gaming/valorant-card.jpg" },
      rank: { tier: "Ascendente 1", rr: 45, icon: "/images/gaming/rank-ascendant.png" },
      stats: { kd: "1.18", headshot: "24.5%", winrate: "54.2%" },
      topAgents: [
        { name: "Omen", role: "Controlador", hours: 124, image: "/images/gaming/omen.png" },
        { name: "Jett", role: "Duelista", hours: 98, image: "/images/gaming/jett.png" }
      ]
    });
  }
}