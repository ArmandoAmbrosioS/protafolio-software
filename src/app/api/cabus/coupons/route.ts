import { NextRequest, NextResponse } from "next/server";
import { createOrReuseCoupon, isValidPhone } from "@/src/lib/cabus/db";
import { generateQrDataUrl } from "@/src/lib/cabus/qr";

const SITE_URL = process.env.CABUS_SITE_URL || "https://armandoambrosio.com";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  let body: { phone?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const phone = typeof body.phone === "string" ? body.phone.trim() : "";

  if (!isValidPhone(phone)) {
    return NextResponse.json(
      { error: "Número de teléfono inválido" },
      { status: 400 }
    );
  }

  const { coupon, reused } = await createOrReuseCoupon(phone);
  const verifyUrl = `${SITE_URL}/cabus/verificar/${coupon.token}`;
  const couponUrl = `${SITE_URL}/cabus/cupon/${coupon.token}`;
  const qrDataUrl = await generateQrDataUrl(verifyUrl);

  return NextResponse.json(
    {
      token: coupon.token,
      phone: coupon.phone,
      createdAt: coupon.createdAt,
      expiresAt: coupon.expiresAt,
      status: coupon.status,
      qrDataUrl,
      couponUrl,
    },
    { status: reused ? 200 : 201 }
  );
}
