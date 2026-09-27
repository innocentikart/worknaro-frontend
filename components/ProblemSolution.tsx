import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { problemPoints, solutionPoints } from "@/lib/content";

export function ProblemSolution() {
  return (
    <section className="band">
      <div className="page-wrap">
        <Reveal>
          <SectionHeading
            eyebrow="The shift"
            title="Replace scattered tools with one workspace"
            description="Worknaro is for teams who need project work, client delivery, and operational tracking without jumping between disconnected products."
            align="center"
          />
        </Reveal>
        <div className="landing-to-content grid gap-5 lg:grid-cols-2">
          <Reveal>
            <article className="h-full rounded-2xl border border-line bg-surface-elevated p-7">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
                The old way
              </p>
              <h3 className="mt-3 text-xl font-semibold text-ink">Work stays fragmented</h3>
              <ul className="mt-6 space-y-4">
                {problemPoints.map((item) => (
                  <li key={item.title} className="flex gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-muted" />
                    <div>
                      <p className="text-sm font-semibold text-ink">{item.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-slate">
                        {item.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
          <Reveal delay={80}>
            <article className="h-full rounded-2xl border border-primary/25 bg-chrome p-7 text-white">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
                The better way
              </p>
              <h3 className="mt-3 text-xl font-semibold">A centralized workspace</h3>
              <ul className="mt-6 space-y-4">
                {solutionPoints.map((item) => (
                  <li key={item.title} className="flex gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <div>
                      <p className="text-sm font-semibold">{item.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-white/65">
                        {item.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
