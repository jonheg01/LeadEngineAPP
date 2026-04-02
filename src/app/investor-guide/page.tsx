import PublicShell from "@/components/PublicShell";
import InvestorGuidePage from "@/components/InvestorGuidePage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Real Estate Investment Guide | LeadEngine Real Estate",
  description: "Build wealth through real estate. Investment strategies, ROI calculators, tax benefits, and market analysis for investors.",
  openGraph: {
    title: "Real Estate Investment Guide | LeadEngine Real Estate",
    description: "Comprehensive guide to real estate investing with ROI calculators and strategy comparison.",
    type: "website",
  },
};

export default function InvestorGuideRoute() {
  return (<PublicShell><InvestorGuidePage /></PublicShell>);
}
