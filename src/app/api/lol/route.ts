// src/app/api/lol/route.ts
import { NextResponse } from 'next/server';

export const revalidate = 3600; // Caché de 1 hora

export async function GET() {
  const apiKey = process.env.RIOT_API_KEY;
  
  // 1. Configura tu Riot ID aquí (separando nombre y etiqueta)
  const gameName = "dyfit"; // Tu nombre antes del # (Cámbialo por el tuyo)
  const tagLine = "1017";      // Tu etiqueta después del # (Cámbialo por el tuyo)

  // Como estás en Hermosillo, probablemente juegues en LAN ('la1') o NA ('na1')
  const region = "la1"; 
  const routing = "americas"; // El servidor global para las cuentas de nuestro continente

  try {
    if (!apiKey) throw new Error("Falta RIOT_API_KEY");

    // PASO 1: Obtener el PUUID usando la nueva API de Riot ID
    const accountRes = await fetch(
      `https://${routing}.api.riotgames.net/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(gameName)}/${encodeURIComponent(tagLine)}?api_key=${apiKey}`
    );
    if (!accountRes.ok) throw new Error(`Fallo al buscar Riot ID: ${accountRes.status}`);
    const accountData = await accountRes.json();
    const puuid = accountData.puuid;

    // PASO 2: Obtener el Invocador usando el PUUID
    const summonerRes = await fetch(
      `https://${region}.api.riotgames.net/lol/summoner/v4/summoners/by-puuid/${puuid}?api_key=${apiKey}`
    );
    if (!summonerRes.ok) throw new Error("Fallo al buscar Invocador local");
    const summonerData = await summonerRes.json();
    const encryptedSummonerId = summonerData.id;

    // PASO 3: Obtener Rango (usando el encryptedSummonerId)
    const leagueRes = await fetch(
      `https://${region}.api.riotgames.net/lol/league/v4/entries/by-summoner/${encryptedSummonerId}?api_key=${apiKey}`
    );
    const leagueData = await leagueRes.json();
    const rankedSolo = leagueData.find((entry: any) => entry.queueType === "RANKED_SOLO_5x5");

    // PASO 4: Obtener Maestría de Campeones (La nueva API v4 también exige el PUUID)
    const masteryRes = await fetch(
      `https://${region}.api.riotgames.net/lol/champion-mastery/v4/champion-masteries/by-puuid/${puuid}/top?count=3&api_key=${apiKey}`
    );
    const masteryData = await masteryRes.json();

    // 🟢 ÉXITO: Devolvemos la data viva
    return NextResponse.json({
      name: accountData.gameName,
      level: summonerData.summonerLevel,
      rank: {
        tier: rankedSolo?.tier || "UNRANKED",
        rank: rankedSolo?.rank || "",
        lp: rankedSolo?.leaguePoints || 0,
        winrate: rankedSolo ? ((rankedSolo.wins / (rankedSolo.wins + rankedSolo.losses)) * 100).toFixed(1) : "0"
      },
      topChampions: masteryData.map((champ: any) => ({
        id: champ.championId, // Más adelante podemos mapear esto a un nombre/imagen real
        points: champ.championPoints.toLocaleString(),
        level: champ.championLevel
      }))
    });

  } catch (error) {
    console.error("⚠️ Error conectando con Riot:", error);
    
    // 🛡️ FALLBACK DE SEGURIDAD
    return NextResponse.json({
      name: "Armando",
      level: 250,
      rank: { tier: "PLATINUM", rank: "II", lp: 45, winrate: "54.5" },
      topChampions: [
        { name: "Aatrox", points: "150,000", level: 7, image: "/images/gaming/aatrox.png" },
        { name: "Lee Sin", points: "120,000", level: 7, image: "/images/gaming/leesin.png" },
        { name: "Jax", points: "90,000", level: 6, image: "/images/gaming/jax.png" }
      ]
    });
  }
}