import { NextRequest, NextResponse } from "next/server";
import { redeemCoupon } from "@/src/lib/cabus/db";

export const dynamic = "force-dynamic";

const STATUS_BY_REASON: Record<string, number> = {
  not_found: 404,
  already_used: 409,
  expired: 410,
};

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;
  const result = await redeemCoupon(token);

  if (!result.ok) {
    const status = STATUS_BY_REASON[result.reason] ?? 400;
    return NextResponse.json({ error: result.reason }, { status });
  }

  return NextResponse.json({ success: true, usedAt: result.coupon.usedAt });
}
