import PublicShell from "@/components/PublicShell";
import DownsizingGuidePage from "@/components/DownsizingGuidePage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Downsizing Guide | LeadEngine Real Estate",
  description:
    "Complete guide to downsizing your home. Timeline, financial calculator, decluttering tips, and housing options for empty nesters and retirees.",
  openGraph: {
    title: "Downsizing Guide | LeadEngine Real Estate",
    description:
      "Ready to downsize? Get your 6-month plan, financial calculator, and expert guidance.",
    type: "website",
  },
};

export default function DownsizingGuideRoute() {
  return (
    <PublicShell>
      <DownsizingGuidePage />
    </PublicShell>
  );
}
