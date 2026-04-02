import PublicShell from "@/components/PublicShell";
import HomeValuation from "@/components/HomeValuation";

export const metadata = { title: "What's Your Home Worth? | LeadEngine", description: "Get a free, instant home valuation powered by real-time market data." };

export default function HomeValuePage() {
  return <PublicShell><HomeValuation /></PublicShell>;
}
