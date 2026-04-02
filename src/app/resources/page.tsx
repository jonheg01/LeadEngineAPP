import PublicShell from "@/components/PublicShell";
import ResourcesPage from "@/components/ResourcesPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Real Estate Resources | LeadEngine Real Estate",
  description: "Free real estate tools, guides, and calculators. Download buyer checklists, seller guides, and use our affordability calculator.",
  openGraph: {
    title: "Real Estate Resources | LeadEngine Real Estate",
    description: "Free tools, guides, and calculators for home buyers and sellers.",
    type: "website",
  },
};

export default function ResourcesRoute() {
  return (
    <PublicShell>
      <ResourcesPage />
    </PublicShell>
  );
}
