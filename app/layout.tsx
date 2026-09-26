import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { SiteShell } from "@/components/SiteShell";
import { ThemeProvider } from "@/components/ThemeProvider";
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
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    url: getSiteUrl(),
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.shortDescription,
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
    var FONTS = [
      'app-font-family-lato','app-font-family-rubik','app-font-family-inter','app-font-family-cinzel',
      'app-font-family-nunito','app-font-family-roboto','app-font-family-ubuntu','app-font-family-poppins',
      'app-font-family-raleway','app-font-family-system-ui','app-font-family-noto-sans','app-font-family-fira-sans',
      'app-font-family-work-sans','app-font-family-open-sans','app-font-family-maven-pro','app-font-family-quicksand',
      'app-font-family-montserrat','app-font-family-josefin-sans','app-font-family-ibm-plex-sans',
      'app-font-family-source-sans-pro','app-font-family-montserrat-alt','app-font-family-roboto-slab'
    ];
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
