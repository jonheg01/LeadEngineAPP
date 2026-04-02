import PublicShell from "@/components/PublicShell";
import RealEstateAgentGuidePage from "@/components/RealEstateAgentGuidePage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Choose a Real Estate Agent | LeadEngine Real Estate",
  description: "Guide to choosing the right real estate agent. What to look for, questions to ask, red flags, and how agents get paid.",
  openGraph: { title: "How to Choose a Real Estate Agent | LeadEngine Real Estate", description: "Find the perfect real estate agent for your needs.", type: "website" },
};

export default function ChooseAnAgentRoute() {
  return (<PublicShell><RealEstateAgentGuidePage /></PublicShell>);
}
