import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { SiteShell } from "@/components/SiteShell";
import { ThemeProvider } from "@/components/ThemeProvider";
import { BRAND_ASSETS, BRAND_NAME } from "@/lib/branding";
import { getSiteUrl, siteConfig } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: BRAND_NAME,
  icons: {
    icon: [
      { url: BRAND_ASSETS.favicon32, sizes: "32x32", type: "image/png" },
      { url: BRAND_ASSETS.favicon192, sizes: "192x192", type: "image/png" },
      { url: BRAND_ASSETS.favicon512, sizes: "512x512", type: "image/png" },
      { url: BRAND_ASSETS.faviconIco, sizes: "any" },
    ],
    shortcut: BRAND_ASSETS.faviconIco,
    apple: [{ url: BRAND_ASSETS.favicon192, sizes: "192x192", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    url: getSiteUrl(),
    images: [{ url: BRAND_ASSETS.icon, alt: BRAND_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.shortDescription,
    images: [BRAND_ASSETS.icon],
  },
  alternates: {
    canonical: "/",
  },
};

const themeBootScript = `
(function(){
  try {
    var SKIN_DARK = 'app-skin-dark';
    var SKIN_LIGHT = 'app-skin-light';
    var NAV_DARK = 'app-navigation-dark';
    var NAV_LIGHT = 'app-navigation-light';
    var HEADER_DARK = 'app-header-dark';
    var HEADER_LIGHT = 'app-header-light';
    var FONT_DEFAULT = 'app-font-family-inter';
    var FONT_STACKS = {
      'app-font-family-lato': '"Lato", ui-sans-serif, system-ui, sans-serif',
      'app-font-family-rubik': '"Rubik", ui-sans-serif, system-ui, sans-serif',
      'app-font-family-inter': '"Inter", var(--font-inter), ui-sans-serif, system-ui, sans-serif',
      'app-font-family-cinzel': '"Cinzel", ui-serif, Georgia, serif',
      'app-font-family-nunito': '"Nunito", ui-sans-serif, system-ui, sans-serif',
      'app-font-family-roboto': '"Roboto", ui-sans-serif, system-ui, sans-serif',
      'app-font-family-ubuntu': '"Ubuntu", ui-sans-serif, system-ui, sans-serif',
      'app-font-family-poppins': '"Poppins", ui-sans-serif, system-ui, sans-serif',
      'app-font-family-raleway': '"Raleway", ui-sans-serif, system-ui, sans-serif',
      'app-font-family-system-ui': 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      'app-font-family-noto-sans': '"Noto Sans", ui-sans-serif, system-ui, sans-serif',
      'app-font-family-fira-sans': '"Fira Sans", ui-sans-serif, system-ui, sans-serif',
      'app-font-family-work-sans': '"Work Sans", ui-sans-serif, system-ui, sans-serif',
      'app-font-family-open-sans': '"Open Sans", ui-sans-serif, system-ui, sans-serif',
      'app-font-family-maven-pro': '"Maven Pro", ui-sans-serif, system-ui, sans-serif',
      'app-font-family-quicksand': '"Quicksand", ui-sans-serif, system-ui, sans-serif',
      'app-font-family-montserrat': '"Montserrat", ui-sans-serif, system-ui, sans-serif',
      'app-font-family-josefin-sans': '"Josefin Sans", ui-sans-serif, system-ui, sans-serif',
      'app-font-family-ibm-plex-sans': '"IBM Plex Sans", ui-sans-serif, system-ui, sans-serif',
      'app-font-family-source-sans-pro': '"Source Sans 3", "Source Sans Pro", ui-sans-serif, system-ui, sans-serif',
      'app-font-family-montserrat-alt': '"Montserrat Alternates", ui-sans-serif, system-ui, sans-serif',
      'app-font-family-roboto-slab': '"Roboto Slab", ui-serif, Georgia, serif'
    };
    var FONT_GOOGLE = {
      'app-font-family-lato': 'Lato',
      'app-font-family-rubik': 'Rubik',
      'app-font-family-inter': 'Inter',
      'app-font-family-cinzel': 'Cinzel',
      'app-font-family-nunito': 'Nunito',
      'app-font-family-roboto': 'Roboto',
      'app-font-family-ubuntu': 'Ubuntu',
      'app-font-family-poppins': 'Poppins',
      'app-font-family-raleway': 'Raleway',
      'app-font-family-noto-sans': 'Noto Sans',
      'app-font-family-fira-sans': 'Fira Sans',
      'app-font-family-work-sans': 'Work Sans',
      'app-font-family-open-sans': 'Open Sans',
      'app-font-family-maven-pro': 'Maven Pro',
      'app-font-family-quicksand': 'Quicksand',
      'app-font-family-montserrat': 'Montserrat',
      'app-font-family-josefin-sans': 'Josefin Sans',
      'app-font-family-ibm-plex-sans': 'IBM Plex Sans',
      'app-font-family-source-sans-pro': 'Source Sans 3',
      'app-font-family-montserrat-alt': 'Montserrat Alternates',
      'app-font-family-roboto-slab': 'Roboto Slab'
    };
    var FONTS = Object.keys(FONT_STACKS);
    function readMode(keys, darkValue, lightValue) {
      for (var i = 0; i < keys.length; i++) {
        var v = localStorage.getItem(keys[i]);
        if (v === darkValue) return darkValue;
        if (v === lightValue) return lightValue;
      }
      return lightValue;
    }
    var skin = readMode(['app-skin-dark', 'app-skin'], SKIN_DARK, SKIN_LIGHT);
    var hasDjangoSkin =
      localStorage.getItem('app-skin') === SKIN_DARK ||
      localStorage.getItem('app-skin') === SKIN_LIGHT ||
      localStorage.getItem('app-skin-dark') === SKIN_DARK ||
      localStorage.getItem('app-skin-dark') === SKIN_LIGHT;
    if (!hasDjangoSkin) {
      var legacy = localStorage.getItem('organitio-landing-theme');
      if (legacy === 'dark') skin = SKIN_DARK;
      else if (legacy === 'light') skin = SKIN_LIGHT;
      else if (window.matchMedia('(prefers-color-scheme: dark)').matches) skin = SKIN_DARK;
    }
    var header = readMode(['app-header'], HEADER_DARK, HEADER_LIGHT);
    var navigation = readMode(['app-navigation'], NAV_DARK, NAV_LIGHT);
    var font = localStorage.getItem('font-family');
    if (!font || FONTS.indexOf(font) === -1) font = FONT_DEFAULT;
    var root = document.documentElement;
    root.classList.remove(
      SKIN_DARK, SKIN_LIGHT, NAV_DARK, NAV_LIGHT, HEADER_DARK, HEADER_LIGHT
    );
    for (var f = 0; f < FONTS.length; f++) root.classList.remove(FONTS[f]);
    root.classList.add(skin, header, navigation, font);
    if (skin === SKIN_DARK) root.classList.add('dark');
    else root.classList.remove('dark');
    root.style.colorScheme = skin === SKIN_DARK ? 'dark' : 'light';
    var stack = FONT_STACKS[font] || FONT_STACKS[FONT_DEFAULT];
    root.style.setProperty('--font-sans', stack);
    root.style.setProperty('--appearance-font', stack);
    root.style.setProperty('--font-display', stack);
    var googleFamily = FONT_GOOGLE[font];
    if (googleFamily) {
      var existing = document.getElementById('organitio-appearance-font');
      var href = 'https://fonts.googleapis.com/css2?family=' +
        encodeURIComponent(googleFamily).replace(/%20/g, '+') +
        ':wght@400;500;600;700;800&display=swap';
      if (existing) {
        existing.href = href;
      } else {
        var link = document.createElement('link');
        link.id = 'organitio-appearance-font';
        link.rel = 'stylesheet';
        link.href = href;
        document.head.appendChild(link);
      }
    }
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jakarta.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
      </head>
      <body className="flex min-h-full flex-col font-sans">
        <ThemeProvider>
          <SiteShell>{children}</SiteShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
