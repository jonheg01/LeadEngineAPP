import PublicShell from "@/components/PublicShell";
import MortgageRefinanceGuidePage from "@/components/MortgageRefinanceGuidePage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mortgage Refinance Guide | LeadEngine Real Estate",
  description: "Complete guide to mortgage refinancing. Learn when to refinance, types of refinance options, costs, and how to calculate your break-even point.",
  openGraph: { title: "Mortgage Refinance Guide | LeadEngine Real Estate", description: "Should you refinance your mortgage? Find out with our guide.", type: "website" },
};

export default function RefinanceGuideRoute() {
  return (<PublicShell><MortgageRefinanceGuidePage /></PublicShell>);
}
