import PublicShell from "@/components/PublicShell";
import HomeRenovationROIPage from "@/components/HomeRenovationROIPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home Renovation ROI Guide & Calculator | LeadEngine Real Estate",
  description: "Calculate the ROI of home renovations. Compare costs vs value for kitchen, bathroom, roof, and more. Expert renovation planning guidance.",
  openGraph: {
    title: "Home Renovation ROI Guide & Calculator | LeadEngine Real Estate",
    description: "Find out which home renovations give you the best return on investment.",
    type: "website",
  },
};

export default function HomeRenovationROIRoute() {
  return (
    <PublicShell>
      <HomeRenovationROIPage />
    </PublicShell>
  );
}
