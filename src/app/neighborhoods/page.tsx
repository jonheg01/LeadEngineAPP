import PublicShell from "@/components/PublicShell";
import NeighborhoodExplorer from "@/components/NeighborhoodExplorer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Explore Neighborhoods | LeadEngine Real Estate",
  description:
    "Discover the perfect neighborhood. Explore market trends, school ratings, walkability scores, lifestyle amenities, and home prices across top communities.",
  openGraph: {
    title: "Explore Neighborhoods | LeadEngine Real Estate",
    description:
      "Discover the perfect neighborhood with market data, school ratings, and lifestyle insights.",
    type: "website",
  },
};

export default function NeighborhoodsRoute() {
  return (
    <PublicShell>
      <NeighborhoodExplorer />
    </PublicShell>
  );
}
