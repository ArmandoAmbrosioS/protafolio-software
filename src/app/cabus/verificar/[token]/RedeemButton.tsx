"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RedeemButton({ token }: { token: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRedeem = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/cabus/coupons/${token}/redeem`, {
        method: "POST",
      });
      if (!res.ok) {
        throw new Error("No se pudo canjear");
      }
      router.refresh();
    } catch {
      setError("No se pudo marcar como usado. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleRedeem}
        disabled={loading}
        className="w-full bg-black dark:bg-white text-white dark:text-black font-bold py-3 rounded-xl hover:opacity-90 transition disabled:opacity-50"
      >
        {loading ? "Marcando..." : "Marcar como usado"}
      </button>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
}
