import PublicShell from "@/components/PublicShell";
import RelocationGuidePage from "@/components/RelocationGuidePage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Relocation Guide | LeadEngine Real Estate",
  description:
    "Complete relocation guide with checklists, area comparisons, cost estimators, and expert tips for a smooth move to your new city.",
  openGraph: {
    title: "Relocation Guide | LeadEngine Real Estate",
    description:
      "Everything you need to know about relocating. Checklists, cost estimators, and local insights.",
    type: "website",
  },
};

export default function RelocationGuideRoute() {
  return (
    <PublicShell>
      <RelocationGuidePage />
    </PublicShell>
  );
}
