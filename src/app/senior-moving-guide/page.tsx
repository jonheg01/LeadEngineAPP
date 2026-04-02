import PublicShell from "@/components/PublicShell";
import SeniorMovingGuidePage from "@/components/SeniorMovingGuidePage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Senior Moving Guide | LeadEngine Real Estate",
  description: "A compassionate guide for seniors planning a move. Downsizing tips, housing options, financial planning, and expert support for your next chapter.",
  openGraph: {
    title: "Senior Moving Guide | LeadEngine Real Estate",
    description: "Everything seniors need to plan a smooth, stress-free move to their next home.",
    type: "website",
  },
};

export default function SeniorMovingGuideRoute() {
  return (
    <PublicShell>
      <SeniorMovingGuidePage />
    </PublicShell>
  );
}
