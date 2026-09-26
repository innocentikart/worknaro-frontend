import { SectionHeading } from "@/components/SectionHeading";

export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="hero-light border-b border-line py-14 lg:py-16">
      <div className="page-wrap">
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />
      </div>
    </section>
  );
}
