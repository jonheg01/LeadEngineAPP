import PublicShell from "@/components/PublicShell";
import ForeclosureGuidePage from "@/components/ForeclosureGuidePage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Foreclosure & REO Buying Guide | LeadEngine Real Estate",
  description: "Learn how to buy foreclosure and REO properties. Types of distressed sales, financing options, due diligence checklist, and investment analysis tools.",
  openGraph: {
    title: "Foreclosure & REO Buying Guide | LeadEngine Real Estate",
    description: "Your complete guide to buying foreclosure and bank-owned properties.",
    type: "website",
  },
};

export default function ForeclosureGuideRoute() {
  return (
    <PublicShell>
      <ForeclosureGuidePage />
    </PublicShell>
  );
}
