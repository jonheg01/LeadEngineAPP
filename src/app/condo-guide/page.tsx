import PublicShell from "@/components/PublicShell";
import CondoBuyingGuidePage from "@/components/CondoBuyingGuidePage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Condo & Townhome Buying Guide | LeadEngine Real Estate",
  description: "Everything you need to know about buying a condo or townhome. HOA analysis, financing options, document review, and expert guidance.",
  openGraph: {
    title: "Condo & Townhome Buying Guide | LeadEngine Real Estate",
    description: "Your complete guide to buying a condo or townhome.",
    type: "website",
  },
};

export default function CondoBuyingGuideRoute() {
  return (
    <PublicShell>
      <CondoBuyingGuidePage />
    </PublicShell>
  );
}
