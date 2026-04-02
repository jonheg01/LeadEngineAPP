import PublicShell from "@/components/PublicShell";
import HomeInsuranceGuidePage from "@/components/HomeInsuranceGuidePage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home Insurance Guide for Buyers | LeadEngine Real Estate",
  description: "Everything you need to know about home insurance. Coverage types, premium factors, savings tips, flood insurance, and how to file claims.",
  openGraph: { title: "Home Insurance Guide for Buyers | LeadEngine Real Estate", description: "Comprehensive home insurance guide for homebuyers.", type: "website" },
};

export default function HomeInsuranceGuideRoute() {
  return (<PublicShell><HomeInsuranceGuidePage /></PublicShell>);
}
