import PublicShell from "@/components/PublicShell";
import TitleInsurancePage from "@/components/TitleInsurancePage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Title Insurance Guide | LeadEngine Real Estate",
  description: "Understanding title insurance: owner vs lender policies, coverage, costs, and how to choose a title company.",
  openGraph: {
    title: "Title Insurance Guide | LeadEngine Real Estate",
    description: "Title insurance explained. Coverage types, costs, and provider selection guide.",
    type: "website",
  },
};

export default function TitleInsuranceRoute() {
  return (<PublicShell><TitleInsurancePage /></PublicShell>);
}
