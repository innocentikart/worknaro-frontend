"use client";

import Link from "next/link";
import {
  BarChart3,
  Briefcase,
  CalendarDays,
  CheckSquare,
  FileStack,
  FolderKanban,
  GanttChart,
  LayoutGrid,
  Search,
  Shield,
  Sparkles,
  Tags,
  Trash2,
  Upload,
  Users,
  type LucideIcon,
} from "lucide-react";
import {
  FadeInWhenVisible,
  StaggerChildren,
} from "@/components/ui/AnimatedSection";
import { HeadingAccent } from "@/components/ui/HeadingAccent";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { Icon } from "@/components/ui/Icon";
import { PremiumModuleCard } from "@/components/cards/PremiumModuleCard";
import type { ModuleVisualKind } from "@/components/cards/ModuleCardVisuals";
import { DeepDiveStory } from "@/components/features/deep-dive/DeepDiveStory";
import { FeaturesIntro } from "@/components/features/FeaturesIntro";
import { InsightsStory } from "@/components/features/insights/InsightsStory";
import { ImportStory } from "@/components/features/import/ImportStory";
import { ModuleStories } from "@/components/features/modules/ModuleStories";
import { highlightFeatures } from "@/lib/content";
import { djangoRoutes } from "@/lib/site";

type OverviewAccent = "blue" | "teal" | "purple" | "orange";

const FEATURE_JUMP: Array<{ id: string; title: string; icon: LucideIcon }> = [
  { id: "projects", title: "Projects", icon: FolderKanban },
  { id: "collaboration", title: "Board", icon: CheckSquare },
  { id: "calendar", title: "Calendar", icon: CalendarDays },
  { id: "gantt", title: "Gantt", icon: GanttChart },
  { id: "clients", title: "Clients", icon: Users },
  { id: "time-budget", title: "Time & finance", icon: Briefcase },
  { id: "leads", title: "Leads", icon: Users },
  { id: "proposals", title: "Proposals", icon: FileStack },
  { id: "files", title: "Files", icon: FileStack },
  { id: "tags", title: "Tags", icon: Tags },
  { id: "trash", title: "Trash", icon: Trash2 },
  { id: "search", title: "Search", icon: Search },
  { id: "reporting", title: "Reports", icon: BarChart3 },
  { id: "access", title: "Access", icon: Shield },
  { id: "insights", title: "AI Insights", icon: Sparkles },
  { id: "import", title: "Import", icon: Upload },
];

const OVERVIEW_CARDS: Array<{
  title: string;
  description: string;
  accent: OverviewAccent;
  icon: LucideIcon;
  visual: ModuleVisualKind;
  href: string;
}> = [
  {
    title: highlightFeatures[0].title,
    description: highlightFeatures[0].description,
    accent: "blue",
    icon: Briefcase,
    visual: "workspaces",
    href: "#collaboration",
  },
  {
    title: highlightFeatures[1].title,
    description: highlightFeatures[1].description,
    accent: "teal",
    icon: CheckSquare,
    visual: "projects",
    href: "#projects",
  },
  {
    title: highlightFeatures[2].title,
    description: highlightFeatures[2].description,
    accent: "purple",
    icon: Users,
    visual: "clients",
    href: "#clients",
  },
  {
    title: highlightFeatures[3].title,
    description: highlightFeatures[3].description,
    accent: "orange",
    icon: CalendarDays,
    visual: "track-bill",
    href: "#time-budget",
  },
];

export function FeaturesLanding() {
  return (
    <>
      <FeaturesIntro />

      <div className="features-page-body">
      <section
        id="modules"
        className="solutions-section features-overview-section relative overflow-hidden scroll-mt-24"
        aria-labelledby="modules-heading"
      >
        <div className="why-deco why-deco-left" aria-hidden="true">
          <span className="why-deco-dots" />
        </div>
        <div className="why-deco why-deco-right" aria-hidden="true">
          <span className="why-deco-dots" />
        </div>

        <div className="why-wrap relative">
          <FadeInWhenVisible>
            <div className="mx-auto max-w-5xl text-center">
              <SectionBadge icon={LayoutGrid} className="mx-auto">
                Product Features
              </SectionBadge>
              <h2 id="modules-heading" className="audience-heading font-display mt-5">
                <span className="audience-heading-line">
                  Everything your team runs in
                </span>
                <HeadingAccent>Worknaro</HeadingAccent>
              </h2>
              <p className="audience-lead mx-auto mt-5 max-w-2xl">
                Four pillars that cover workspace access, delivery work, client
                relationships, and day-to-day operations.
              </p>
            </div>
          </FadeInWhenVisible>

          <StaggerChildren className="about-pillar-grid landing-to-content mx-auto grid w-full gap-5 sm:grid-cols-2 xl:grid-cols-4 xl:gap-6">
            {OVERVIEW_CARDS.map((item, index) => (
              <FadeInWhenVisible key={item.title} className="h-full" delay={index * 50}>
                <PremiumModuleCard
                  title={item.title}
                  description={item.description}
                  icon={item.icon}
                  accent={item.accent}
                  index={index}
                  href={item.href}
                  ctaLabel="Learn more"
                  visual={item.visual}
                />
              </FadeInWhenVisible>
            ))}
          </StaggerChildren>

          <FadeInWhenVisible delay={80} className="features-page-nav">
            <nav aria-label="Feature modules" className="features-jump">
              {FEATURE_JUMP.map((feature) => (
                <a key={feature.id} href={`#${feature.id}`} className="features-jump-link">
                  <span className="features-jump-icon" aria-hidden="true">
                    <Icon icon={feature.icon} size="sm" />
                  </span>
                  {feature.title}
                </a>
              ))}
            </nav>
          </FadeInWhenVisible>
        </div>
      </section>

      <DeepDiveStory />

      <ModuleStories />
      <InsightsStory />
      <ImportStory />

      <section className="features-search-band relative overflow-x-clip" aria-labelledby="features-search-cta-heading">
        <div className="why-deco why-deco-left" aria-hidden="true">
          <span className="why-deco-dots" />
        </div>
        <div className="why-deco why-deco-right" aria-hidden="true">
          <span className="why-deco-dots" />
        </div>
        <div className="why-wrap relative">
          <FadeInWhenVisible>
            <div className="features-search-panel solutions-editions-panel relative overflow-hidden text-center">
              <div className="solutions-editions-deco" aria-hidden="true" />
              <span className="features-search-icon" aria-hidden="true">
                <Search className="h-6 w-6" strokeWidth={1.8} />
              </span>
              <div className="solutions-editions-copy relative z-[1]">
                <h2 id="features-search-cta-heading" className="features-search-heading relative z-[1] font-display">
                  Find work across the workspace
                </h2>
                <p className="features-search-lead relative z-[1]">
                  Search projects, tasks, files, and more from one place—with roles controlling
                  who can see what.
                </p>
              </div>
              <div className="landing-cta-row relative z-[1] mt-8 flex flex-wrap items-center justify-center gap-3">
                <a href={djangoRoutes.register()} className="hero-cta-primary hero-btn btn-shine">
                  Create workspace
                  <span aria-hidden="true">→</span>
                </a>
                <Link href="/solutions" className="hero-cta-secondary hero-btn">
                  Explore solutions
                </Link>
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>
      </div>
    </>
  );
}
