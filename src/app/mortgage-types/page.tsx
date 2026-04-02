import PublicShell from "@/components/PublicShell";
import MortgageTypesPage from "@/components/MortgageTypesPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mortgage Types Guide | LeadEngine Real Estate",
  description:
    "Compare mortgage types: Conventional, FHA, VA, USDA, ARM, Jumbo, and more. Payment calculator, PMI guide, and expert matching.",
  openGraph: {
    title: "Mortgage Types Guide | LeadEngine Real Estate",
    description: "Compare all mortgage types with calculator, PMI guide, and personalized matching.",
    type: "website",
  },
};

export default function MortgageTypesRoute() {
  return (
    <PublicShell>
      <MortgageTypesPage />
    </PublicShell>
  );
}
