import PublicShell from "@/components/PublicShell";
import GreenHomesGuidePage from "@/components/GreenHomesGuidePage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Green & Energy-Efficient Homes Guide | LeadEngine Real Estate",
  description: "Discover eco-friendly and energy-efficient homes. Green certifications, solar panels, energy savings calculator, and sustainable living tips.",
  openGraph: {
    title: "Green & Energy-Efficient Homes Guide | LeadEngine Real Estate",
    description: "Your complete guide to buying and owning an eco-friendly home.",
    type: "website",
  },
};

export default function GreenHomesGuideRoute() {
  return (
    <PublicShell>
      <GreenHomesGuidePage />
    </PublicShell>
  );
}
