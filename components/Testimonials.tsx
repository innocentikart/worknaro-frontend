"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { BadgeCheck, ChevronLeft, ChevronRight, MessageSquareQuote, Star } from "lucide-react";
import { FadeInWhenVisible } from "@/components/ui/AnimatedSection";
import { HeadingAccent } from "@/components/ui/HeadingAccent";
import { SectionBadge } from "@/components/ui/SectionBadge";

export type TestimonialItem = {
  quote: string;
  name: string;
  role: string;
  company?: string;
  avatar?: string;
  initials?: string;
  verified?: boolean;
  rating?: number;
};

const placeholders: TestimonialItem[] = [
  {
    name: "Daniel Okafor",
    role: "Product Manager",
    company: "NovaTech",
    initials: "DO",
    rating: 5,
    quote:
      "Worknaro has completely transformed how our team manages projects. The interface is clean, intuitive, and has everything we need in one place.",
  },
  {
    name: "Sarah Mitchell",
    role: "CEO",
    company: "BrightPath Solutions",
    initials: "SM",
    verified: true,
    rating: 5,
    quote:
      "Worknaro has helped us stay organized, meet deadlines, and deliver projects faster than ever before.",
  },
  {
    name: "James Tunde",
    role: "Founder",
    company: "Creative Agency",
    initials: "JT",
    rating: 5,
    quote:
      "Worknaro gives our team a much clearer way to manage clients, projects, and delivery without jumping between multiple tools.",
  },
];

function initialsFromName(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return "CN";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

function StarRating({ value = 5 }: { value?: number }) {
  const count = Math.max(0, Math.min(5, Math.round(value ?? 5)));
  return (
    <div className="story-stars" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={i < count ? "story-star story-star-on" : "story-star"}
          fill={i < count ? "currentColor" : "none"}
          strokeWidth={1.75}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

function Avatar({ item }: { item: TestimonialItem }) {
  const initials = item.initials || initialsFromName(item.name);
  if (item.avatar) {
    return (
      <span className="story-avatar">
        <Image
          src={item.avatar}
          alt=""
          width={64}
          height={64}
          className="story-avatar-img"
        />
      </span>
    );
  }
  return (
    <span className="story-avatar story-avatar-fallback" aria-hidden="true">
      {initials}
    </span>
  );
}

function TestimonialCard({
  item,
  featured = false,
}: {
  item: TestimonialItem;
  featured?: boolean;
}) {
  const roleLine = [item.role, item.company].filter(Boolean).join(", ");

  return (
    <article
      className={["story-card", featured ? "story-card-featured" : ""].join(" ")}
    >
      <header className="story-card-header">
        <div className="story-card-identity">
          <Avatar item={item} />
          <div className="story-card-meta">
            <p className="story-card-name">{item.name}</p>
            <p className="story-card-role">{roleLine}</p>
          </div>
        </div>
        {featured && item.verified ? (
          <span className="story-verified">
            <BadgeCheck className="h-3.5 w-3.5" aria-hidden="true" />
            Verified Customer
          </span>
        ) : null}
      </header>

      <StarRating value={item.rating ?? 5} />

      <div className="story-quote-block">
        <span className="story-quote-mark" aria-hidden="true">
          “
        </span>
        <blockquote className="story-quote">{item.quote}</blockquote>
      </div>
    </article>
  );
}

const slideVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 48 : -48,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -48 : 48,
    opacity: 0,
  }),
};

const slideTransition = {
  x: { type: "spring" as const, stiffness: 260, damping: 32, mass: 0.7 },
  opacity: { duration: 0.28, ease: [0.22, 1, 0.36, 1] as const },
};

export function Testimonials({
  cmsItems,
}: {
  cmsItems?: TestimonialItem[] | null;
}) {
  const reduceMotion = useReducedMotion();
  const items = useMemo(() => {
    if (cmsItems?.length) return cmsItems;
    return placeholders;
  }, [cmsItems]);

  const [active, setActive] = useState(() =>
    items.length >= 3 ? 1 : 0,
  );
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    setActive(items.length >= 3 ? Math.min(1, items.length - 1) : 0);
    setDirection(0);
  }, [items.length]);

  const count = items.length;

  const go = useCallback(
    (dir: -1 | 1) => {
      if (!count) return;
      setDirection(dir);
      setActive((i) => (i + dir + count) % count);
    },
    [count],
  );

  const jumpTo = useCallback(
    (index: number) => {
      if (!count || index === active) return;
      setDirection(index > active ? 1 : -1);
      setActive(index);
    },
    [active, count],
  );

  const visible = useMemo(() => {
    if (!count) return [] as { item: TestimonialItem; index: number; featured: boolean }[];
    if (count === 1) {
      return [{ item: items[0], index: 0, featured: true }];
    }
    if (count === 2) {
      return items.map((item, index) => ({
        item,
        index,
        featured: index === active,
      }));
    }
    const left = (active - 1 + count) % count;
    const right = (active + 1) % count;
    return [
      { item: items[left], index: left, featured: false },
      { item: items[active], index: active, featured: true },
      { item: items[right], index: right, featured: false },
    ];
  }, [active, count, items]);

  return (
    <section
      className="stories-section relative"
      aria-labelledby="stories-heading"
    >
      <div className="stories-ambient" aria-hidden="true">
        <span className="stories-blob stories-blob-tr" />
        <span className="stories-blob stories-blob-bl" />
      </div>

      <div className="stories-wrap relative">
        <FadeInWhenVisible>
          <div className="stories-header">
            <SectionBadge icon={MessageSquareQuote} className="mx-auto">
              Customer Stories
            </SectionBadge>

            <h2 id="stories-heading" className="stories-heading font-display">
              <span className="block">What teams say about</span>
              <HeadingAccent>Worknaro</HeadingAccent>
            </h2>

            <p className="stories-lead">
              Teams using Worknaro to run projects, clients, and delivery in one
              workspace.
            </p>
          </div>
        </FadeInWhenVisible>

        <FadeInWhenVisible delay={80} className="stories-carousel-wrap">
          <div className="stories-carousel" aria-roledescription="carousel">
            <button
              type="button"
              className="stories-nav stories-nav-prev"
              aria-label="Previous testimonial"
              onClick={() => go(-1)}
              disabled={count < 2}
            >
              <ChevronLeft className="h-5 w-5" strokeWidth={2.2} />
            </button>

            <div className="stories-track-viewport">
              <AnimatePresence mode="wait" custom={direction} initial={false}>
                <motion.div
                  key={active}
                  className="stories-track"
                  custom={direction}
                  variants={reduceMotion ? undefined : slideVariants}
                  initial={reduceMotion ? false : "enter"}
                  animate="center"
                  exit={reduceMotion ? undefined : "exit"}
                  transition={reduceMotion ? { duration: 0 } : slideTransition}
                  aria-live="polite"
                >
                  {visible.map(({ item, index, featured }) => (
                    <div
                      key={`${item.name}-${index}`}
                      className={[
                        "stories-slide",
                        featured ? "stories-slide-featured" : "stories-slide-side",
                      ].join(" ")}
                    >
                      <TestimonialCard item={item} featured={featured} />
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            <button
              type="button"
              className="stories-nav stories-nav-next"
              aria-label="Next testimonial"
              onClick={() => go(1)}
              disabled={count < 2}
            >
              <ChevronRight className="h-5 w-5" strokeWidth={2.2} />
            </button>
          </div>

          {count > 1 ? (
            <div className="stories-dots" role="tablist" aria-label="Testimonials">
              {items.map((item, index) => (
                <button
                  key={`${item.name}-dot-${index}`}
                  type="button"
                  role="tab"
                  aria-selected={index === active}
                  aria-label={`Show testimonial from ${item.name}`}
                  className={[
                    "stories-dot",
                    index === active ? "stories-dot-active" : "",
                  ].join(" ")}
                  onClick={() => jumpTo(index)}
                />
              ))}
            </div>
          ) : null}
        </FadeInWhenVisible>
      </div>
    </section>
  );
}
