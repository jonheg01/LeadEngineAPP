import PublicShell from "@/components/PublicShell";
import HomeMaintenancePage from "@/components/HomeMaintenancePage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home Maintenance Guide | LeadEngine Real Estate",
  description:
    "Seasonal home maintenance checklists, cost estimators, emergency guides, and expert tips to protect your investment.",
  openGraph: {
    title: "Home Maintenance Guide | LeadEngine Real Estate",
    description:
      "Protect your investment with seasonal checklists, maintenance budgets, and expert home care tips.",
    type: "website",
  },
};

export default function HomeMaintenanceRoute() {
  return (
    <PublicShell>
      <HomeMaintenancePage />
    </PublicShell>
  );
}
