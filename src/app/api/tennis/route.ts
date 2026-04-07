import { NextResponse } from 'next/server';

export const revalidate = 3600; 

export async function GET() {
  
  const favoriteNames = ["Alcaraz", "Nadal", "Raducanu"];

  try {
  
    const apiKey = process.env.RAPIDAPI_KEY;

    if (!apiKey) {
      throw new Error("No se encontró RAPIDAPI_KEY en el archivo .env.local");
    }


    const response = await fetch('https://tennis.p.rapidapi.com/rankings', {
      headers: {
        'x-rapidapi-key': apiKey,
        'x-rapidapi-host': 'tennis.p.rapidapi.com' 
      },
      next: { revalidate: 3600 }
    });

    if (!response.ok) {
      throw new Error(`Error HTTP de RapidAPI: ${response.status}`);
    }

    const data = await response.json();


    const allPlayers = data.response || [];

    const validPlayers = allPlayers

      .filter((p: any) => favoriteNames.some(name => p.player.name.includes(name)))

      .map((p: any) => {
        let icon = "circle-user";
        let flag = "🎾";
        

        if (p.player.name.includes("Alcaraz")) { icon = "zap"; flag = "🇪🇸"; }
        if (p.player.name.includes("Nadal")) { icon = "target"; flag = "🇪🇸"; }
        if (p.player.name.includes("Raducanu")) { icon = "shield"; flag = "🇬🇧"; }

        return {
          rank: p.ranking,
          name: p.player.name,
          points: p.points.toLocaleString(),
          country: p.player.country.code || "N/A",
          flag: flag,
          icon: icon
        };
      });

    if (validPlayers.length === 0) {
      throw new Error("La API respondió bien, pero no se encontraron los jugadores. Revisa la estructura del JSON.");
    }

    // Ordenamos y enviamos al cliente
    validPlayers.sort((a: any, b: any) => a.rank - b.rank);
    return NextResponse.json(validPlayers);

  } catch (error) {
    console.warn(" Usando Red de Seguridad (Fallback). Motivo:", error);
    

    const fallbackData = [
      { rank: 1, name: "Carlos Alcaraz", points: "13,590", country: "ESP", flag: "🇪🇸", icon: "zap" },
      { rank: 28, name: "Emma Raducanu", points: "1,465", country: "GBR", flag: "🇬🇧", icon: "shield" },
      { rank: 'Retired', name: "Rafa Nadal", points: "--", country: "ESP", flag: "🇪🇸", icon: "target" }
    ];

    fallbackData.sort((a, b) => a.rank - b.rank);
    return NextResponse.json(fallbackData);
  }
}