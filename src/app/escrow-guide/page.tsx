import PublicShell from "@/components/PublicShell";
import EscrowGuidePage from "@/components/EscrowGuidePage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Escrow Process Guide | LeadEngine Real Estate",
  description:
    "Understanding the escrow process step by step. Timeline, fees, common problems, wire fraud protection, and closing day walkthrough.",
  openGraph: {
    title: "Escrow Process Guide | LeadEngine Real Estate",
    description: "Escrow explained simply. Timeline, fees, problems to avoid, and closing day prep.",
    type: "website",
  },
};

export default function EscrowGuideRoute() {
  return (
    <PublicShell>
      <EscrowGuidePage />
    </PublicShell>
  );
}
