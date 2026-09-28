import { Phone, Rocket } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { djangoRoutes } from "@/lib/site";

export function ContactSplit() {
  return (
    <section className="contact-section relative overflow-hidden" aria-label="Contact and get started">
      <div className="contact-deco contact-deco-left" aria-hidden="true">
        <span className="contact-deco-blob" />
        <span className="contact-deco-dots" />
      </div>
      <div className="contact-deco contact-deco-right" aria-hidden="true">
        <span className="contact-deco-blob" />
        <span className="contact-deco-dots" />
      </div>

      <div className="why-wrap relative grid gap-5 lg:grid-cols-2">
        <Reveal>
          <article className="contact-card contact-card-light h-full">
            <SectionBadge icon={Phone}>Sales</SectionBadge>
            <h2 className="contact-title">Talk with the Worknaro team</h2>
            <p className="contact-copy">
              Enterprise plan quotas and commercial terms are handled through the existing contact-sales form in the application.
            </p>
            <div className="contact-card-actions">
              <a href={djangoRoutes.contactSales()} className="pricing-cta-secondary">
                Contact Sales
              </a>
            </div>
          </article>
        </Reveal>
        <Reveal delay={80}>
          <article className="contact-card contact-card-dark h-full">
            <span className="contact-glow" aria-hidden="true" />
            <SectionBadge icon={Rocket} variant="on-dark">
              Start
            </SectionBadge>
            <h2 className="contact-title contact-title-light">Create your workspace</h2>
            <p className="contact-copy contact-copy-light">
              Registration stays in the Worknaro application. This page does not collect emails or create a second account system.
            </p>
            <div className="contact-card-actions">
              <a href={djangoRoutes.register()} className="hero-cta-primary hero-btn">
                Get Started
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
