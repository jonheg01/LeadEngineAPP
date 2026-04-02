import PublicShell from "@/components/PublicShell";
import HistoricHomesGuidePage from "@/components/HistoricHomesGuidePage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Historic Homes Buying Guide | LeadEngine Real Estate",
  description: "Everything about buying historic and heritage properties. Tax credits, renovation rules, specialized inspections, and preservation guidance.",
  openGraph: {
    title: "Historic Homes Buying Guide | LeadEngine Real Estate",
    description: "Your guide to owning a piece of history with a historic home purchase.",
    type: "website",
  },
};

export default function HistoricHomesGuideRoute() {
  return (
    <PublicShell>
      <HistoricHomesGuidePage />
    </PublicShell>
  );
}
