import { createClient, type Client, type Row } from "@libsql/client";
import { nanoid } from "nanoid";

const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

export type CouponStatus = "active" | "used" | "expired";

export interface Coupon {
  token: string;
  phone: string;
  createdAt: number;
  expiresAt: number;
  status: CouponStatus;
  usedAt: number | null;
}

export type RedeemResult =
  | { ok: true; coupon: Coupon }
  | { ok: false; reason: "not_found" | "already_used" | "expired" };

let client: Client | null = null;

function getClient(): Client {
  if (!client) {
    const url = process.env.TURSO_DATABASE_URL;
    const authToken = process.env.TURSO_AUTH_TOKEN;
    if (!url || !authToken) {
      throw new Error(
        "Faltan TURSO_DATABASE_URL o TURSO_AUTH_TOKEN en las variables de entorno"
      );
    }
    client = createClient({ url, authToken });
  }
  return client;
}

function mapRow(row: Row, now: number): Coupon {
  const createdAt = Number(row.created_at);
  const expiresAt = Number(row.expires_at);
  const rawStatus = String(row.status);
  const usedAt = row.used_at != null ? Number(row.used_at) : null;

  const status: CouponStatus =
    rawStatus === "used" ? "used" : now > expiresAt ? "expired" : "active";

  return {
    token: String(row.token),
    phone: String(row.phone),
    createdAt,
    expiresAt,
    status,
    usedAt,
  };
}

export function isValidPhone(phone: string): boolean {
  return /^\d{10,15}$/.test(phone);
}

export async function createOrReuseCoupon(
  phone: string
): Promise<{ coupon: Coupon; reused: boolean }> {
  const db = getClient();
  const now = Date.now();

  const existing = await db.execute({
    sql: `SELECT token, phone, created_at, expires_at, status, used_at
          FROM cabus_coupons
          WHERE phone = ? AND status = 'active' AND expires_at > ?
          ORDER BY created_at DESC LIMIT 1`,
    args: [phone, now],
  });

  if (existing.rows.length > 0) {
    return { coupon: mapRow(existing.rows[0], now), reused: true };
  }

  const token = nanoid(14);
  const expiresAt = now + SEVEN_DAYS_MS;

  await db.execute({
    sql: `INSERT INTO cabus_coupons (token, phone, created_at, expires_at, status, used_at)
          VALUES (?, ?, ?, ?, 'active', NULL)`,
    args: [token, phone, now, expiresAt],
  });

  return {
    coupon: { token, phone, createdAt: now, expiresAt, status: "active", usedAt: null },
    reused: false,
  };
}

export async function getCoupon(token: string): Promise<Coupon | null> {
  const db = getClient();
  const result = await db.execute({
    sql: `SELECT token, phone, created_at, expires_at, status, used_at
          FROM cabus_coupons WHERE token = ?`,
    args: [token],
  });
  if (result.rows.length === 0) return null;
  return mapRow(result.rows[0], Date.now());
}

export async function redeemCoupon(token: string): Promise<RedeemResult> {
  const db = getClient();
  const now = Date.now();
  const coupon = await getCoupon(token);

  if (!coupon) return { ok: false, reason: "not_found" };
  if (coupon.status === "used") return { ok: false, reason: "already_used" };
  if (coupon.status === "expired") return { ok: false, reason: "expired" };

  await db.execute({
    sql: `UPDATE cabus_coupons SET status = 'used', used_at = ? WHERE token = ?`,
    args: [now, token],
  });

  return { ok: true, coupon: { ...coupon, status: "used", usedAt: now } };
}
