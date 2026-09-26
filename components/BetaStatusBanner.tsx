"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function BetaStatusBanner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [message, setMessage] = useState<string | null>(null);
  const [tone, setTone] = useState<"success" | "danger">("success");

  useEffect(() => {
    const beta = searchParams.get("beta");
    if (beta === "verified") {
      setTone("success");
      setMessage("Email verified. You’re on the Organitio beta waitlist.");
    } else if (beta === "invalid") {
      setTone("danger");
      setMessage("That verification link is invalid or expired.");
    } else {
      return;
    }
    const next = new URLSearchParams(searchParams.toString());
    next.delete("beta");
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }, [searchParams, router, pathname]);

  if (!message) return null;

  return (
    <div
      className={`border-b px-4 py-3 text-center text-sm font-medium ${
        tone === "success"
          ? "border-success/20 bg-success/10 text-success"
          : "border-danger/20 bg-danger/10 text-danger"
      }`}
      role="status"
    >
      {message}
      <button
        type="button"
        className="ml-3 underline opacity-80 hover:opacity-100"
        onClick={() => setMessage(null)}
      >
        Dismiss
      </button>
    </div>
  );
}
