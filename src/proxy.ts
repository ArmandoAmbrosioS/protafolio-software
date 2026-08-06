import { NextRequest, NextResponse } from "next/server";

function getAllowedOrigins(): string[] {
  return (process.env.CABUS_ALLOWED_ORIGIN || "")
    .split(",")
    .map((o) => o.trim())
    .filter(Boolean);
}

function corsHeaders(origin: string | null): Headers {
  const headers = new Headers();
  const allowed = getAllowedOrigins();

  // Cloudflare may strip the Origin header — if so, fall back to first allowed origin
  const effectiveOrigin = origin ?? (allowed[0] ?? null);

  if (effectiveOrigin && allowed.includes(effectiveOrigin)) {
    headers.set("Access-Control-Allow-Origin", effectiveOrigin);
    headers.set("Vary", "Origin");
  }
  headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  headers.set("Access-Control-Allow-Headers", "Content-Type");
  return headers;
}

export function proxy(request: NextRequest) {
  const origin = request.headers.get("origin");
  const headers = corsHeaders(origin);

  if (request.method === "OPTIONS") {
    return new NextResponse(null, { status: 204, headers });
  }

  const response = NextResponse.next();
  headers.forEach((value, key) => response.headers.set(key, value));
  return response;
}

export const config = {
  matcher: "/api/cabus/:path*",
};
