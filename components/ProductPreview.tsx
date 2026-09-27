import Image from "next/image";
import { AiInsightsPreview } from "@/components/insights/AiInsightsPreview";

export type PreviewKind =
  | "dashboard"
  | "board"
  | "projects"
  | "clients"
  | "finance"
  | "files"
  | "reports"
  | "insights"
  | "import";

const shots: Record<PreviewKind, { src: string; alt: string }> = {
  dashboard: {
    src: "/product/dashboard.png",
    alt: "Worknaro dashboard with workspace overview, onboarding, and pinned projects",
  },
  projects: {
    src: "/product/projects.png",
    alt: "Worknaro projects list with status, priority, and dates",
  },
  board: {
    src: "/product/board.png",
    alt: "Worknaro workspace workflow board with status columns and task cards",
  },
  clients: {
    src: "/product/project-create.png",
    alt: "Worknaro project creation including client project type",
  },
  finance: {
    src: "/product/gantt.png",
    alt: "Worknaro Gantt chart for project timelines and task schedules",
  },
  files: {
    src: "/product/tasks.png",
    alt: "Worknaro tasks workspace with filters, priorities, and assignments",
  },
  reports: {
    src: "/product/workspaces.png",
    alt: "Worknaro workspace picker for switching between workspaces",
  },
  insights: {
    src: "/product/dashboard.png",
    alt: "Worknaro dashboard where AI Insights appear when enabled",
  },
  import: {
    src: "/product/projects.png",
    alt: "Worknaro projects list that imported work can populate",
  },
};

export function ProductPreview({
  kind = "dashboard",
  orbit = false,
  priority = false,
}: {
  kind?: PreviewKind;
  orbit?: boolean;
  priority?: boolean;
}) {
  const shot = shots[kind];

  return (
    <div className="relative">
      {orbit ? (
        <>
          <span className="deco-orb -left-6 top-10 hidden h-16 w-16 bg-primary/15 lg:block" />
          <span className="deco-orb -right-3 top-0 hidden h-10 w-10 bg-info/15 lg:block" />
          <span className="deco-orb bottom-8 left-1/2 hidden h-7 w-7 bg-primary/20 lg:block" />
          <div className="absolute -left-10 bottom-10 z-10 hidden w-[42%] overflow-hidden rounded-xl border border-line bg-surface-elevated shadow-[0_18px_40px_-20px_rgba(15,39,64,0.45)] lg:block">
            <Image
              src="/product/board.png"
              alt=""
              width={960}
              height={500}
              className="h-auto w-full"
            />
          </div>
        </>
      ) : null}

      {kind === "insights" ? (
        <AiInsightsPreview />
      ) : (
        <figure className="ui-panel relative overflow-hidden rounded-2xl">
          <div className="flex items-center gap-2 border-b border-line bg-chrome px-4 py-2.5">
            <span className="h-2 w-2 rounded-full bg-white/25" />
            <span className="h-2 w-2 rounded-full bg-white/25" />
            <span className="h-2 w-2 rounded-full bg-white/25" />
            <span className="ml-2 text-[11px] font-medium text-white/65">Worknaro</span>
          </div>
          <Image
            src={shot.src}
            alt={shot.alt}
            width={1920}
            height={980}
            priority={priority}
            className="h-auto w-full"
          />
        </figure>
      )}
    </div>
  );
}
