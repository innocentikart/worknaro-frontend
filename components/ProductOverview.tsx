import { SectionHeading } from "@/components/SectionHeading";
import { productCapabilities } from "@/lib/content";

export function ProductOverview() {
  return (
    <section className="band">
      <div className="page-wrap">
      <SectionHeading
        eyebrow="Platform"
        title="Everything your workspace needs to deliver"
        description="Worknaro connects projects, people, clients, and operations in one modern business workspace."
      />
      <div className="landing-to-content grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {productCapabilities.map((item) => (
          <article
            key={item.title}
            className="rounded-2xl border border-line bg-surface-elevated p-5 transition hover:border-primary/35"
          >
            <h3 className="text-base font-semibold text-ink">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate">
              {item.description}
            </p>
          </article>
        ))}
      </div>
      </div>
    </section>
  );
}
