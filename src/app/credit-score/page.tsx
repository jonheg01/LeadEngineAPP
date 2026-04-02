import PublicShell from "@/components/PublicShell";
import CreditScoreGuidePage from "@/components/CreditScoreGuidePage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Credit Score Guide for Home Buyers | LeadEngine Real Estate",
  description:
    "Understand how your credit score impacts home buying. Score requirements by loan type, improvement plan, and rate impact calculator.",
  openGraph: {
    title: "Credit Score Guide for Home Buyers | LeadEngine Real Estate",
    description: "Credit score guide with 30-day improvement plan, rate calculator, and loan requirements.",
    type: "website",
  },
};

export default function CreditScoreRoute() {
  return (
    <PublicShell>
      <CreditScoreGuidePage />
    </PublicShell>
  );
}
