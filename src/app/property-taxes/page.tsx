import PublicShell from "@/components/PublicShell";
import PropertyTaxGuidePage from "@/components/PropertyTaxGuidePage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Property Tax Guide & Calculator | LeadEngine Real Estate",
  description:
    "Understand property taxes, calculate your estimate, learn about exemptions, and discover strategies to minimize your tax burden.",
  openGraph: {
    title: "Property Tax Guide & Calculator | LeadEngine Real Estate",
    description:
      "Property taxes explained simply. Calculator, exemptions, appeal guide, and savings tips.",
    type: "website",
  },
};

export default function PropertyTaxRoute() {
  return (
    <PublicShell>
      <PropertyTaxGuidePage />
    </PublicShell>
  );
}
