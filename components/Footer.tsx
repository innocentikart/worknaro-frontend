import Link from "next/link";
import { Logo } from "@/components/Logo";
import { LandingBackground } from "@/components/ui/LandingBackground";
import { djangoRoutes, navLinks, siteConfig } from "@/lib/site";

const productLinks = navLinks.filter((link) =>
  ["/features", "/solutions", "/pricing"].includes(link.href),
);
const companyLinks = navLinks.filter((link) =>
  ["/about", "/contact", "/resources"].includes(link.href),
);

export function Footer() {
  return (
    <footer className="site-footer landing-nav-chrome relative overflow-x-clip">
      <div className="site-footer-bg" aria-hidden="true">
        <LandingBackground variant="home" />
      </div>
      <div className="why-wrap relative z-10 grid gap-12 pb-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate">
            {siteConfig.shortDescription}
          </p>
          <a href={djangoRoutes.register()} className="hero-cta-primary hero-btn btn-shine mt-6">
            Get Started
            <span aria-hidden="true">→</span>
          </a>
        </div>
        <div>
          <p className="site-footer-heading">Product</p>
          <ul className="mt-4 space-y-2.5">
            {productLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="site-footer-link group relative inline-flex">
                  <span className="transition-colors duration-200 group-hover:text-primary">
                    {link.label}
                  </span>
                  <span
                    className="absolute -bottom-0.5 left-0 h-px w-0 bg-primary transition-all duration-200 group-hover:w-full"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="site-footer-heading">Company</p>
          <ul className="mt-4 space-y-2.5">
            {companyLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="site-footer-link group relative inline-flex">
                  <span className="transition-colors duration-200 group-hover:text-primary">
                    {link.label}
                  </span>
                  <span
                    className="absolute -bottom-0.5 left-0 h-px w-0 bg-primary transition-all duration-200 group-hover:w-full"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="site-footer-heading">Account</p>
          <ul className="mt-4 space-y-2.5">
            <li>
              <a href={djangoRoutes.login()} className="site-footer-link group relative inline-flex">
                <span className="transition-colors duration-200 group-hover:text-primary">Sign In</span>
                <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-primary transition-all duration-200 group-hover:w-full" aria-hidden="true" />
              </a>
            </li>
            <li>
              <a href={djangoRoutes.register()} className="site-footer-link group relative inline-flex">
                <span className="transition-colors duration-200 group-hover:text-primary">Get Started</span>
                <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-primary transition-all duration-200 group-hover:w-full" aria-hidden="true" />
              </a>
            </li>
            <li>
              <a href={djangoRoutes.contactSales()} className="site-footer-link group relative inline-flex">
                <span className="transition-colors duration-200 group-hover:text-primary">Contact Sales</span>
                <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-primary transition-all duration-200 group-hover:w-full" aria-hidden="true" />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="site-footer-bottom relative z-10">
        <div className="why-wrap flex flex-col gap-2 py-5 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p>Public website · Application hosted separately</p>
        </div>
      </div>
    </footer>
  );
}
