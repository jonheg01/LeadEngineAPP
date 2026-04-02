import PublicShell from "@/components/PublicShell";
import { NeighborhoodIndex } from "@/components/NeighborhoodPage";

export const metadata = { title: "Phoenix Metro Neighborhoods | LeadEngine", description: "Explore neighborhoods across the Phoenix metro area with market data and school ratings." };

export default function NeighborhoodsPage() {
  return <PublicShell><NeighborhoodIndex /></PublicShell>;
}
