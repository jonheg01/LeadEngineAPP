import PublicShell from "@/components/PublicShell";
import MortgageCalculator from "@/components/MortgageCalculator";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mortgage Calculator | LeadEngine Real Estate",
  description: "Calculate your monthly mortgage payment, see how much home you can afford, or explore refinance savings. Free, instant results with no obligation.",
  openGraph: {
    title: "Mortgage Calculator | LeadEngine Real Estate",
    description: "Calculate your monthly mortgage payment, affordability, or refinance savings.",
    type: "website",
  },
};

export default function MortgageCalculatorPage() {
  return (
    <PublicShell>
      <MortgageCalculator />
    </PublicShell>
  );
}
