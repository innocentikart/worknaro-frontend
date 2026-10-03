"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/Logo";
import { djangoRoutes, navLinks, siteConfig } from "@/lib/site";

const productLinks = navLinks.filter((link) =>
  ["/features", "/solutions", "/pricing"].includes(link.href),
);
const companyLinks = navLinks.filter((link) =>
  ["/about", "/contact", "/resources"].includes(link.href),
);

function FooterNavLink({
  href,
  children,
  external = false,
}: {
  href: string;
  children: string;
  external?: boolean;
}) {
  const pathname = usePathname();
  const className = "site-footer-link relative inline-flex";

  if (external) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={className}
      aria-current={pathname === href ? "page" : undefined}
    >
      {children}
    </Link>
  );
}

export function Footer() {
  return (
    <footer id="site-footer" className="site-footer landing-nav-chrome relative overflow-x-clip">
      <div className="site-footer-bg" aria-hidden="true">
        <span className="footer-dots footer-dots-patch-left" />
        <span className="footer-dots footer-dots-patch-right" />
      </div>
      <div className="why-wrap relative z-10 grid gap-8 pb-12 sm:grid-cols-2 sm:gap-12 sm:pb-16 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="site-footer-desc mt-4 max-w-xs text-sm leading-relaxed">
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
                <FooterNavLink href={link.href}>{link.label}</FooterNavLink>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="site-footer-heading">Company</p>
          <ul className="mt-4 space-y-2.5">
            {companyLinks.map((link) => (
              <li key={link.href}>
                <FooterNavLink href={link.href}>{link.label}</FooterNavLink>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="site-footer-heading">Account</p>
          <ul className="mt-4 space-y-2.5">
            <li>
              <FooterNavLink href={djangoRoutes.login()} external>
                Sign In
              </FooterNavLink>
            </li>
            <li>
              <FooterNavLink href={djangoRoutes.register()} external>
                Get Started
              </FooterNavLink>
            </li>
            <li>
              <FooterNavLink href={djangoRoutes.contactSales()} external>
                Contact Sales
              </FooterNavLink>
            </li>
          </ul>
        </div>
      </div>
      <div className="site-footer-bottom relative z-10">
        <div className="site-footer-meta why-wrap flex flex-col gap-2 py-5 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <div className="site-footer-legal flex flex-wrap items-center gap-x-4 gap-y-1">
            <FooterNavLink href="/privacy">Privacy Policy</FooterNavLink>
            <FooterNavLink href="/terms">Terms of Service</FooterNavLink>
            <p>Public website · Application hosted separately</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
