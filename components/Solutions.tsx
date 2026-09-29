"use client";

import {
  BookOpen,
  Briefcase,
  Heart,
  LayoutGrid,
  Rocket,
  Share2,
  Store,
  UserRound,
  Users,
  type LucideIcon,
} from "lucide-react";
import {
  FadeInWhenVisible,
  StaggerChildren,
} from "@/components/ui/AnimatedSection";
import { HeadingAccent } from "@/components/ui/HeadingAccent";
import { PremiumModuleCard } from "@/components/cards/PremiumModuleCard";
import { SectionBadge } from "@/components/ui/SectionBadge";
import type { ModuleVisualKind } from "@/components/cards/ModuleCardVisuals";
import { solutions } from "@/lib/content";

type AudienceAccent = "blue" | "teal" | "purple" | "orange";

type AudienceMeta = {
  icon: LucideIcon;
  accent: AudienceAccent;
  visual: ModuleVisualKind;
};

const AUDIENCE_META: Record<(typeof solutions)[number]["id"], AudienceMeta> = {
  startups: { icon: Rocket, accent: "blue", visual: "projects" },
  agencies: { icon: Briefcase, accent: "teal", visual: "clients" },
  freelancers: { icon: UserRound, accent: "purple", visual: "tasks" },
  "small-businesses": { icon: Store, accent: "orange", visual: "invoice" },
  "larger-organizations": { icon: Share2, accent: "blue", visual: "team" },
  nonprofits: { icon: Heart, accent: "teal", visual: "programs" },
  "education-teams": { icon: BookOpen, accent: "purple", visual: "education" },
  "client-service": { icon: Users, accent: "orange", visual: "clients-handshake" },
};

export function Solutions({
  showHeading = true,
  limit,
}: {
  showHeading?: boolean;
  limit?: number;
}) {
  const items = typeof limit === "number" ? solutions.slice(0, limit) : solutions;

  return (
    <section
      className="solutions-section relative overflow-hidden"
      aria-labelledby={showHeading ? "solutions-heading" : undefined}
    >
      <div className="why-wrap relative">
        {showHeading ? (
          <FadeInWhenVisible>
            <div className="mx-auto max-w-5xl text-center">
              <SectionBadge icon={LayoutGrid} className="mx-auto">
                Product Features
              </SectionBadge>
              <h2
                id="solutions-heading"
                className="audience-heading font-display"
              >
                <span className="audience-heading-line">
                  Powerful tools and features designed to help teams
                </span>
                <HeadingAccent>collaborate</HeadingAccent>
              </h2>
              <p className="audience-lead mx-auto max-w-2xl">
                Manage projects, and achieve more — all in one place.
              </p>
            </div>
          </FadeInWhenVisible>
        ) : null}

        <StaggerChildren
          className={[
            "about-pillar-grid mx-auto grid w-full gap-5 sm:grid-cols-2 xl:grid-cols-4 xl:gap-6",
            showHeading ? "landing-to-content" : "",
          ].join(" ")}
        >
          {items.map((item, index) => {
            const meta = AUDIENCE_META[item.id];
            return (
              <FadeInWhenVisible key={item.id} className="h-full" delay={index * 50}>
                <PremiumModuleCard
                  title={item.title}
                  description={item.description}
                  icon={meta.icon}
                  accent={meta.accent}
                  index={index}
                  href={`/solutions#${item.id}`}
                  ctaLabel="Learn more"
                  visual={meta.visual}
                />
              </FadeInWhenVisible>
            );
          })}
        </StaggerChildren>
      </div>
    </section>
  );
}

export function SolutionsLight({ showHeading = true }: { showHeading?: boolean }) {
  return <Solutions showHeading={showHeading} />;
}
