import PublicShell from "@/components/PublicShell";
import NewConstructionGuidePage from "@/components/NewConstructionGuidePage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "New Construction Home Buying Guide | LeadEngine Real Estate",
  description: "Everything you need to know about buying a new construction home. Builder selection, customization tips, warranties, financing, and expert guidance.",
  openGraph: {
    title: "New Construction Home Buying Guide | LeadEngine Real Estate",
    description: "Your complete guide to buying a brand new home from a builder.",
    type: "website",
  },
};

export default function NewConstructionGuideRoute() {
  return (
    <PublicShell>
      <NewConstructionGuidePage />
    </PublicShell>
  );
}
