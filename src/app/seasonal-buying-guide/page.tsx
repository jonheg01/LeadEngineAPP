import PublicShell from "@/components/PublicShell";
import SeasonalBuyingGuidePage from "@/components/SeasonalBuyingGuidePage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Seasonal Home Buying Guide | LeadEngine Real Estate",
  description: "When is the best time to buy a home? Compare spring, summer, fall, and winter buying seasons with pros, cons, and expert tips.",
  openGraph: { title: "Seasonal Home Buying Guide | LeadEngine Real Estate", description: "Find the best season to buy your next home.", type: "website" },
};

export default function SeasonalBuyingGuideRoute() {
  return (<PublicShell><SeasonalBuyingGuidePage /></PublicShell>);
}
