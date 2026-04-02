import PublicShell from "@/components/PublicShell";
import BuyerGuidePage from "@/components/BuyerGuidePage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Complete Home Buyer Guide | LeadEngine Real Estate",
  description: "Step-by-step guide to buying your first home. Pre-approval, searching, making offers, inspections, closing, and moving.",
  openGraph: {
    title: "Complete Home Buyer Guide | LeadEngine Real Estate",
    description: "Everything first-time buyers need to know about purchasing a home.",
    type: "website",
  },
};

export default function BuyerGuideRoute() {
  return (<PublicShell><BuyerGuidePage /></PublicShell>);
}
