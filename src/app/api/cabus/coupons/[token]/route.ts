import { NextRequest, NextResponse } from "next/server";
import { getCoupon } from "@/src/lib/cabus/db";

export const dynamic = "force-dynamic";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;
  const coupon = await getCoupon(token);

  if (!coupon) {
    return NextResponse.json({ error: "Cupón no encontrado" }, { status: 404 });
  }

  return NextResponse.json(coupon);
}
