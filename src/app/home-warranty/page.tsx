import PublicShell from "@/components/PublicShell";
import HomeWarrantyGuidePage from "@/components/HomeWarrantyGuidePage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home Warranty Guide | LeadEngine Real Estate",
  description: "Everything you need to know about home warranties. Coverage options, cost comparison, provider reviews, claims process, and expert advice.",
  openGraph: {
    title: "Home Warranty Guide | LeadEngine Real Estate",
    description: "Your complete guide to understanding and choosing a home warranty.",
    type: "website",
  },
};

export default function HomeWarrantyGuideRoute() {
  return (
    <PublicShell>
      <HomeWarrantyGuidePage />
    </PublicShell>
  );
}
