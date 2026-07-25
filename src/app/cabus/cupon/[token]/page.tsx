import { getCoupon, type CouponStatus } from "@/src/lib/cabus/db";
import { generateQrDataUrl } from "@/src/lib/cabus/qr";

export const dynamic = "force-dynamic";

const SITE_URL = process.env.CABUS_SITE_URL || "https://armandoambrosio.com";

function formatDate(ms: number) {
  return new Date(ms).toLocaleString("es-MX", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

const STATUS_LABEL: Record<CouponStatus, string> = {
  active: "Vigente",
  used: "Ya utilizado",
  expired: "Caducado",
};

export default async function CuponPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const coupon = await getCoupon(token);

  if (!coupon) {
    return (
      <main className="min-h-screen flex items-center justify-center p-6 bg-zinc-50 dark:bg-[#010101]">
        <p className="text-xl font-bold text-red-500">Cupón no encontrado</p>
      </main>
    );
  }

  const verifyUrl = `${SITE_URL}/cabus/verificar/${coupon.token}`;
  const qrDataUrl = await generateQrDataUrl(verifyUrl);

  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-zinc-50 dark:bg-[#010101]">
      <div className="max-w-sm w-full text-center border-2 border-yellow-400 rounded-3xl p-8 bg-white dark:bg-zinc-900 shadow-2xl">
        <p className="uppercase text-xs font-bold tracking-widest text-yellow-500 mb-1">
          Cabus Transportaciones
        </p>
        <h1 className="text-2xl font-extrabold mb-4">Tu cupón</h1>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={qrDataUrl}
          alt="Código QR del cupón"
          width={220}
          height={220}
          className="mx-auto rounded-xl border border-zinc-200 dark:border-zinc-700 mb-4"
        />
        <p className="font-bold text-lg mb-1">{STATUS_LABEL[coupon.status]}</p>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Válido hasta {formatDate(coupon.expiresAt)}
        </p>
        <p className="text-xs text-zinc-400 mt-4">
          Muestra este código al conductor para validar tu cupón.
        </p>
      </div>
    </main>
  );
}
