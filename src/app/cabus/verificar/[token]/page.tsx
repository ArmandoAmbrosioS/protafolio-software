import { getCoupon, type CouponStatus } from "@/src/lib/cabus/db";
import RedeemButton from "./RedeemButton";

export const dynamic = "force-dynamic";

function formatDate(ms: number) {
  return new Date(ms).toLocaleString("es-MX", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

const STATUS_CONFIG: Record<
  CouponStatus,
  { label: string; emoji: string; classes: string }
> = {
  active: {
    label: "VÁLIDO",
    emoji: "✅",
    classes:
      "bg-emerald-500/10 border-emerald-500 text-emerald-600 dark:text-emerald-400",
  },
  used: {
    label: "YA USADO",
    emoji: "⚠️",
    classes: "bg-zinc-500/10 border-zinc-500 text-zinc-600 dark:text-zinc-400",
  },
  expired: {
    label: "CADUCADO",
    emoji: "⛔",
    classes: "bg-red-500/10 border-red-500 text-red-600 dark:text-red-400",
  },
};

export default async function VerificarCuponPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const coupon = await getCoupon(token);

  if (!coupon) {
    return (
      <main className="min-h-screen flex items-center justify-center p-6 bg-zinc-50 dark:bg-[#010101]">
        <div className="max-w-md w-full text-center border-2 border-red-500 rounded-3xl p-10 bg-red-500/10">
          <p className="text-6xl mb-4">❓</p>
          <h1 className="text-2xl font-bold text-red-600 dark:text-red-400">
            CUPÓN NO ENCONTRADO
          </h1>
        </div>
      </main>
    );
  }

  const config = STATUS_CONFIG[coupon.status];

  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-zinc-50 dark:bg-[#010101]">
      <div className={`max-w-md w-full text-center border-2 rounded-3xl p-10 ${config.classes}`}>
        <p className="text-6xl mb-4">{config.emoji}</p>
        <h1 className="text-3xl font-extrabold tracking-tight mb-6">
          {config.label}
        </h1>
        <dl className="text-left text-sm text-zinc-600 dark:text-zinc-400 space-y-2 mb-6">
          <div className="flex justify-between">
            <dt>Teléfono</dt>
            <dd className="font-semibold text-zinc-900 dark:text-white">
              {coupon.phone}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt>Generado</dt>
            <dd>{formatDate(coupon.createdAt)}</dd>
          </div>
          <div className="flex justify-between">
            <dt>Vence</dt>
            <dd>{formatDate(coupon.expiresAt)}</dd>
          </div>
          {coupon.usedAt && (
            <div className="flex justify-between">
              <dt>Usado</dt>
              <dd>{formatDate(coupon.usedAt)}</dd>
            </div>
          )}
        </dl>
        {coupon.status === "active" && <RedeemButton token={coupon.token} />}
      </div>
    </main>
  );
}
