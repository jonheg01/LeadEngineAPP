import PublicShell from "@/components/PublicShell";
import PreApprovalPage from "@/components/PreApprovalPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mortgage Pre-Approval Guide | LeadEngine Real Estate",
  description:
    "Get pre-approved for your mortgage. Compare lenders, check credit score requirements, and use our calculator to estimate your buying power.",
  openGraph: {
    title: "Mortgage Pre-Approval Guide | LeadEngine Real Estate",
    description:
      "Mortgage pre-approval made simple. Lender comparison, credit guidance, and buying power calculator.",
    type: "website",
  },
};

export default function PreApprovalRoute() {
  return (
    <PublicShell>
      <PreApprovalPage />
    </PublicShell>
  );
}
