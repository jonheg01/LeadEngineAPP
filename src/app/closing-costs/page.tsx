import PublicShell from "@/components/PublicShell";
import ClosingCostsPage from "@/components/ClosingCostsPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Closing Costs Guide & Calculator | LeadEngine Real Estate",
  description:
    "Understand closing costs for buyers and sellers. Interactive calculator, itemized breakdowns, and tips to reduce costs.",
  openGraph: {
    title: "Closing Costs Guide & Calculator | LeadEngine Real Estate",
    description:
      "Closing costs made simple. Calculate, compare, and save with our comprehensive guide.",
    type: "website",
  },
};

export default function ClosingCostsRoute() {
  return (
    <PublicShell>
      <ClosingCostsPage />
    </PublicShell>
  );
}
