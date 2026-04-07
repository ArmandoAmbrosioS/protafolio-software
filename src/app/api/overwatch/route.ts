import { NextResponse } from 'next/server';

export const revalidate = 3600;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get('mode') || 'competitive';
  

  const playerId = "Trakatore-1770"; 

  try {
    const fetchSafe = async (url: string) => {
      try {
        const res = await fetch(url);
        return res.ok ? await res.json() : null;
      } catch (e) {
        return null;
      }
    };

    // Lanzamos las 4 peticiones protegidas al mismo tiempo
    const [summaryData, statsData, careerData, heroesList] = await Promise.all([
      fetchSafe(`https://overfast-api.tekrop.fr/players/${playerId}/summary`),
      fetchSafe(`https://overfast-api.tekrop.fr/players/${playerId}/stats/summary?gamemode=${mode}`),
      fetchSafe(`https://overfast-api.tekrop.fr/players/${playerId}/stats/career?gamemode=${mode}`),
      fetchSafe(`https://overfast-api.tekrop.fr/heroes`)
    ]);

  
    if (!summaryData) throw new Error("Perfil inaccesible o BattleTag incorrecto");

   
    const portraits: Record<string, string> = {};
    if (heroesList) {
       heroesList.forEach((h: any) => { portraits[h.key] = h.portrait; });
    }

    // Lógica para extraer los Rangos y sus Iconos
    const getRankInfo = (role: any) => {
      if (!role) return { label: "Unranked", icon: null };
      
      const division = role.division ? role.division.charAt(0).toUpperCase() + role.division.slice(1) : "";
      const tier = role.tier || "";
      return { 
        label: division && tier ? `${division} ${tier}` : (division || "Unranked"), 
        icon: role.rank_icon || null 
      };
    };
    const comp = summaryData.competitive?.pc || {};

    // Procesamiento de Héroes con imágenes dinámicas
    const heroesArray = careerData ? Object.keys(careerData)
      .filter(hero => hero !== 'all-heroes')
      .map(hero => {
        const data = careerData[hero];
        const time_played = data.game?.time_played || 0;
        const games_won = data.game?.games_won || 0;
        const elims_per_life = data.average?.eliminations_per_life || 0;

        const elims = data.combat?.eliminations || 0;
        const assists = data.assists?.assists || 0;
        const deaths = data.combat?.deaths || 0;
        const kda = deaths === 0 ? (elims + assists) : ((elims + assists) / deaths);

        return { 
          hero, 
          image: portraits[hero] || "", 
          time_played, 
          games_won, 
          elims_per_life, 
          kda: Number(kda.toFixed(2)) 
        };
      }) : [];

    return NextResponse.json({
      identity: {
        name: summaryData.username || "Agente",
        title: summaryData.title || "Agente de Overwatch",
        avatar: summaryData.avatar || "",
        endorsement: summaryData.endorsement?.level || 1,
        platform: summaryData.competitive?.pc ? "PC" : "Console"
      },
      competitive: {
        tank: getRankInfo(comp.tank),
        damage: getRankInfo(comp.damage),
        support: getRankInfo(comp.support)
      },
      career: {
        gamesWon: statsData?.general?.games_won || 0,
        winrate: statsData?.general?.winrate || 0,
        kda: statsData?.general?.kda || 0,
        timePlayed: Math.floor((statsData?.general?.time_played || 0) / 3600) + "h"
      },
      heroes: {
        played: [...heroesArray].sort((a, b) => b.time_played - a.time_played).slice(0, 3).map(h => ({ hero: h.hero, image: h.image, value: Math.floor(h.time_played / 3600) + "h" })),
        wins: [...heroesArray].sort((a, b) => b.games_won - a.games_won).slice(0, 3).map(h => ({ hero: h.hero, image: h.image, value: h.games_won })),
        elims: [...heroesArray].sort((a, b) => b.elims_per_life - a.elims_per_life).slice(0, 3).map(h => ({ hero: h.hero, image: h.image, value: h.elims_per_life })),
        kda: [...heroesArray].sort((a, b) => b.kda - a.kda).slice(0, 3).map(h => ({ hero: h.hero, image: h.image, value: h.kda }))
      }
    });

  } catch (error) {
    console.warn(" Error general en API. Activando interfaz de respaldo.");
    return NextResponse.json({
      identity: { name: "Trakatore", title: "Vanguardia", avatar: "https://d15f34w2p8l1cc.cloudfront.net/overwatch/30e37a0d096d92c18f7c6f9519d483e75d1d8ab5280d672f2553f650f4c050e5.png", endorsement: 3, platform: "PC" },
      competitive: { 
        tank: { label: "Unranked", icon: null }, 
        damage: { label: "Platinum", icon: null }, 
        support: { label: "Platinum", icon: null } 
      },
      career: { gamesWon: 1155, winrate: 49.81, kda: 2.94, timePlayed: "302h" },
      heroes: { played: [], wins: [], elims: [], kda: [] }
    });
  }
}