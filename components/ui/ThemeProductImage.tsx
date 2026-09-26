"use client";

import Image from "next/image";

/**
 * Product screenshot pair that follows html.dark / light landing themes.
 * Both images stay in the DOM so switching is instant (no flash).
 */
export function ThemeProductImage({
  lightSrc,
  darkSrc,
  alt,
  width,
  height,
  className = "",
  priority = false,
  sizes,
}: {
  lightSrc: string;
  darkSrc: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <span className={`theme-product-image ${className}`.trim()}>
      <Image
        src={lightSrc}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        sizes={sizes}
        className="theme-product-image-light"
      />
      <Image
        src={darkSrc}
        alt=""
        width={width}
        height={height}
        sizes={sizes}
        className="theme-product-image-dark"
        aria-hidden="true"
      />
    </span>
  );
}
