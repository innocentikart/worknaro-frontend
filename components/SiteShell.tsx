import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AppearanceCustomizer } from "@/components/AppearanceCustomizer";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-full flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <AppearanceCustomizer />
    </div>
  );
}
