import PublicShell from "@/components/PublicShell";
import MultiGenerationalLivingPage from "@/components/MultiGenerationalLivingPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Multi-Generational Living Guide | LeadEngine Real Estate",
  description: "Everything about multi-generational homes. In-law suites, ADUs, shared living arrangements, legal considerations, and financial planning.",
  openGraph: {
    title: "Multi-Generational Living Guide | LeadEngine Real Estate",
    description: "Your complete guide to multi-generational living and home options.",
    type: "website",
  },
};

export default function MultiGenerationalLivingRoute() {
  return (
    <PublicShell>
      <MultiGenerationalLivingPage />
    </PublicShell>
  );
}
