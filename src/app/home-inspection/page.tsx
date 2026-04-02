import PublicShell from "@/components/PublicShell";
import HomeInspectionPage from "@/components/HomeInspectionPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home Inspection Guide | LeadEngine Real Estate",
  description:
    "Complete home inspection guide for buyers and sellers. What inspectors check, how to prepare, and negotiation strategies.",
  openGraph: {
    title: "Home Inspection Guide | LeadEngine Real Estate",
    description: "Home inspection guide with preparation checklist, cost guide, and negotiation tips.",
    type: "website",
  },
};

export default function HomeInspectionRoute() {
  return (
    <PublicShell>
      <HomeInspectionPage />
    </PublicShell>
  );
}
