import PublicShell from "@/components/PublicShell";
import DownsizingGuidePage from "@/components/DownsizingGuidePage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Downsizing Your Home Guide | LeadEngine Real Estate",
  description: "Expert guide to downsizing your home. Learn when to downsize, decluttering tips, financial considerations, and how to find the perfect smaller home.",
  openGraph: { title: "Downsizing Your Home Guide | LeadEngine Real Estate", description: "Expert guide to downsizing your home — tips, checklist, and financial advice.", type: "website" },
};

export default function DownsizingGuideRoute() {
  return (<PublicShell><DownsizingGuidePage /></PublicShell>);
}
