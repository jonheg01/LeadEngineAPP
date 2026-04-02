import PublicShell from "@/components/PublicShell";
import MarketReportsPage from "@/components/MarketReportsPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Market Reports & Data | LeadEngine Real Estate",
  description:
    "Stay informed with the latest real estate market data. Median prices, days on market, inventory levels, and neighborhood comparisons.",
  openGraph: {
    title: "Market Reports & Data | LeadEngine Real Estate",
    description:
      "Comprehensive real estate market reports with neighborhood-level data and trends.",
    type: "website",
  },
};

export default function MarketReportsRoute() {
  return (
    <PublicShell>
      <MarketReportsPage />
    </PublicShell>
  );
}
