"use client";

import { Rocket } from "lucide-react";
import { FadeInWhenVisible } from "@/components/ui/AnimatedSection";
import { HeadingAccent } from "@/components/ui/HeadingAccent";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { djangoRoutes } from "@/lib/site";

export function CTA({
  cmsCta,
}: {
  cmsCta?: {
    title?: string;
    body?: string;
    meta?: { primary_label?: string; secondary_label?: string };
  } | null;
}) {
  const title = cmsCta?.title || "Ready to bring your work together?";
  const body =
    cmsCta?.body ||
    "Create your Worknaro workspace in the application—projects, tasks, clients, files, and finance already live there.";
  const primary = cmsCta?.meta?.primary_label || "Get Started";
  const secondary = cmsCta?.meta?.secondary_label || "Sign In";
  const hasTogether = /together\??$/i.test(title.trim());
  const accentWord = hasTogether ? "together?" : title.split(" ").slice(-1)[0];
  const beforeAccent = hasTogether
    ? title.replace(/\s*together\??$/i, "").trim()
    : title.replace(new RegExp(`\\s*${accentWord.replace(/[?*+^$(){}|[\]\\]/g, "\\$&")}$`), "").trim();

  return (
    <section className="final-cta-section relative overflow-x-clip" aria-labelledby="final-cta-heading">
      <div className="final-cta-deco final-cta-deco-left" aria-hidden="true">
        <span className="final-cta-deco-blob" />
      </div>
      <div className="final-cta-deco final-cta-deco-right" aria-hidden="true">
        <span className="final-cta-deco-blob" />
        <span className="final-cta-rings" />
      </div>

      <div className="why-wrap relative">
        <FadeInWhenVisible>
          <div className="final-cta-panel solutions-editions-panel relative overflow-hidden text-center">
            <div className="solutions-editions-deco" aria-hidden="true" />

            <SectionBadge icon={Rocket} className="mx-auto relative z-[1]">
              Get started
            </SectionBadge>

            <div className="solutions-editions-copy relative z-[1]">
              <span className="solutions-editions-copy-blur" aria-hidden="true" />
              <h2 id="final-cta-heading" className="final-cta-heading relative z-[1] font-display">
                {beforeAccent ? (
                  <>
                    {beforeAccent}{" "}
                    <HeadingAccent>{accentWord}</HeadingAccent>
                  </>
                ) : (
                  <HeadingAccent>{accentWord}</HeadingAccent>
                )}
              </h2>

              <p className="final-cta-lead relative z-[1]">{body}</p>
            </div>

            <div className="final-cta-actions relative z-[1]">
              <a href={djangoRoutes.register()} className="final-cta-primary">
                <span>{primary}</span>
                <span className="final-cta-arrow" aria-hidden="true">
                  →
                </span>
              </a>
              <a href={djangoRoutes.login()} className="final-cta-secondary">
                {secondary}
              </a>
            </div>
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
}
