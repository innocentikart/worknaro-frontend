/* Theme-switched wordmarks stay in the DOM so `html.dark` can toggle them. */
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { BRAND_ASSETS, BRAND_NAME } from "@/lib/branding";

export function Logo({
  href = "/",
  inverted = false,
  onClick,
  variant = "wordmark",
}: {
  href?: string;
  inverted?: boolean;
  onClick?: () => void;
  variant?: "wordmark" | "mark";
}) {
  const markOnly = variant === "mark";

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`site-logo${inverted ? " is-inverted" : ""}${markOnly ? " site-logo--mark" : ""}`}
    >
      {markOnly ? (
        <img src={BRAND_ASSETS.icon} alt={BRAND_NAME} className="site-logo-mark" />
      ) : (
        <>
          <img
            src={BRAND_ASSETS.logoOnLight}
            alt=""
            className="site-logo-wordmark site-logo-wordmark--on-light"
          />
          <img
            src={BRAND_ASSETS.logoOnDark}
            alt=""
            className="site-logo-wordmark site-logo-wordmark--on-dark"
          />
          <img src={BRAND_ASSETS.icon} alt="" className="site-logo-mark" />
          <span className="sr-only">{BRAND_NAME}</span>
        </>
      )}
    </Link>
  );
}
