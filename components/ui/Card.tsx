"use client";

import { memo, type ReactNode } from "react";
import { MotionHover } from "@/components/ui/AnimatedSection";

export type CardVariant = "default" | "feature" | "pricing" | "testimonial" | "accent";
export type CardAccent = "blue" | "teal" | "purple" | "orange" | "none";

const accentClass: Record<CardAccent, string> = {
  none: "",
  blue: "ui-card-accent-blue",
  teal: "ui-card-accent-teal",
  purple: "ui-card-accent-purple",
  orange: "ui-card-accent-orange",
};

const variantClass: Record<CardVariant, string> = {
  default: "ui-card",
  feature: "ui-card ui-card-feature",
  pricing: "ui-card ui-card-pricing",
  testimonial: "ui-card ui-card-testimonial",
  accent: "ui-card ui-card-feature",
};

type CardProps = {
  icon?: ReactNode;
  title?: string;
  description?: string;
  children?: ReactNode;
  footer?: ReactNode;
  badge?: ReactNode;
  variant?: CardVariant;
  accent?: CardAccent;
  featured?: boolean;
  className?: string;
  hover?: boolean;
};

function CardComponent({
  icon,
  title,
  description,
  children,
  footer,
  badge,
  variant = "default",
  accent = "none",
  featured = false,
  className = "",
  hover = true,
}: CardProps) {
  const classes = [
    variantClass[variant],
    accentClass[accent],
    featured ? "is-featured" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const body = (
    <article className={classes}>
      {(icon || badge) && (
        <div className="flex items-start justify-between gap-3">
          {icon ? <span className="ui-card-icon">{icon}</span> : <span />}
          {badge ? <span className="ui-card-badge">{badge}</span> : null}
        </div>
      )}
      {title ? <h3 className="ui-card-title">{title}</h3> : null}
      {description ? <p className="ui-card-description">{description}</p> : null}
      {children}
      {footer ? <div className="ui-card-footer">{footer}</div> : null}
    </article>
  );

  if (!hover) return body;

  return (
    <MotionHover className="h-full" scale={1.01} y={-6}>
      {body}
    </MotionHover>
  );
}

export const Card = memo(CardComponent);
