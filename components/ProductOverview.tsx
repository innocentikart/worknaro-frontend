import { SectionHeading } from "@/components/SectionHeading";
import { productCapabilities } from "@/lib/content";

export function ProductOverview() {
  return (
    <section className="page-wrap py-16 lg:py-20">
      <SectionHeading
        eyebrow="Platform"
        title="Everything your workspace needs to deliver"
        description="Organitio connects projects, people, clients, and operations in one modern business workspace."
      />
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
    </section>
  );
}
