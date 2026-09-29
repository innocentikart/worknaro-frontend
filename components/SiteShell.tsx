import { AppearanceCustomizer } from "@/components/AppearanceCustomizer";
import { BetaCampaign } from "@/components/BetaCampaign";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="landing-shell flex min-h-full flex-col">
      <BetaCampaign>
        <Navbar />
      </BetaCampaign>
      <main className="flex-1">{children}</main>
      <Footer />
      <AppearanceCustomizer />
    </div>
  );
}
