"use client";

import Link from "next/link";
import {
  motion,
  useReducedMotion,
  type HTMLMotionProps,
} from "framer-motion";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "onDark" | "shine";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-white hover:bg-primary-hover shadow-[0_8px_18px_-10px_rgba(52,84,209,0.7)] hover:-translate-y-0.5 hover:shadow-[0_14px_28px_-12px_rgba(52,84,209,0.65)]",
  secondary:
    "bg-surface-elevated text-ink border border-line hover:border-primary/35 hover:text-primary hover:-translate-y-0.5 hover:shadow-md",
  ghost: "text-slate hover:text-primary",
  onDark:
    "border border-white/20 bg-white/5 text-white hover:border-white/40 hover:bg-white/10 hover:-translate-y-0.5",
  shine: "btn-shine text-white",
};

function buttonClasses(variant: ButtonVariant, className: string) {
  return [
    "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold tracking-tight",
    "transition duration-200 will-change-transform",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/45 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    variants[variant],
    className,
  ].join(" ");
}

type Shared = {
  children: ReactNode;
  className?: string;
  variant?: ButtonVariant;
};

type LinkButtonProps = Shared & {
  href: string;
  external?: boolean;
};

type NativeButtonProps = Shared & {
  href?: undefined;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className">;

function MagneticWrap({
  children,
  className,
  enabled,
}: {
  children: ReactNode;
  className: string;
  enabled: boolean;
}) {
  const reduce = useReducedMotion();

  if (!enabled || reduce) {
    return <span className={className}>{children}</span>;
  }

  const hoverProps: HTMLMotionProps<"span"> = {
    whileHover: { scale: 1.03 },
    whileTap: { scale: 0.98 },
    transition: { type: "spring", stiffness: 420, damping: 28 },
  };

  return (
    <motion.span className={`inline-flex ${className}`} {...hoverProps}>
      {children}
    </motion.span>
  );
}

export function Button(props: LinkButtonProps | NativeButtonProps) {
  const variant = props.variant ?? "primary";
  const className = props.className ?? "";
  const classes = buttonClasses(variant, className);
  const shine = variant === "shine" || variant === "primary";

  if (typeof props.href === "string") {
    const inner = props.external ? (
      <a href={props.href} className={classes}>
        {props.children}
      </a>
    ) : (
      <Link href={props.href} className={classes}>
        {props.children}
      </Link>
    );

    return (
      <MagneticWrap className="" enabled={shine}>
        {inner}
      </MagneticWrap>
    );
  }

  const { children, disabled, onClick, type = "button", ...rest } = props;

  return (
    <MagneticWrap className="" enabled={shine && !disabled}>
      <button
        type={type}
        className={classes}
        disabled={disabled}
        onClick={onClick}
        {...rest}
      >
        {children}
      </button>
    </MagneticWrap>
  );
}
