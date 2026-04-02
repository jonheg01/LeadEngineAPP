import PublicShell from "@/components/PublicShell";
import HomeEquityGuidePage from "@/components/HomeEquityGuidePage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home Equity Guide | LeadEngine Real Estate",
  description: "Learn about home equity — what it is, how to build it, home equity loans vs HELOCs, and smart ways to use your equity for investments.",
  openGraph: { title: "Home Equity Guide | LeadEngine Real Estate", description: "Understand and leverage your home equity wisely.", type: "website" },
};

export default function HomeEquityGuideRoute() {
  return (<PublicShell><HomeEquityGuidePage /></PublicShell>);
}
