import PublicShell from "@/components/PublicShell";
import SellerGuidePage from "@/components/SellerGuidePage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Complete Seller Guide | LeadEngine Real Estate",
  description: "Step-by-step guide to selling your home. Pricing strategy, staging tips, timeline, closing costs, and expert advice.",
  openGraph: {
    title: "Complete Seller Guide | LeadEngine Real Estate",
    description: "Everything you need to know about selling your home in today's market.",
    type: "website",
  },
};

export default function SellerGuideRoute() {
  return (
    <PublicShell>
      <SellerGuidePage />
    </PublicShell>
  );
}
