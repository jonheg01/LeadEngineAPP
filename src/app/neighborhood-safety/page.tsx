import PublicShell from "@/components/PublicShell";
import NeighborhoodSafetyGuidePage from "@/components/NeighborhoodSafetyGuidePage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Neighborhood Safety Guide | LeadEngine Real Estate",
  description: "How to evaluate neighborhood safety when buying a home. Research tools, safety indicators, visiting tips, and community watch programs.",
  openGraph: { title: "Neighborhood Safety Guide | LeadEngine Real Estate", description: "Evaluate neighborhood safety before you buy.", type: "website" },
};

export default function NeighborhoodSafetyRoute() {
  return (<PublicShell><NeighborhoodSafetyGuidePage /></PublicShell>);
}
