import PublicShell from "@/components/PublicShell";
import HomeStagingPage from "@/components/HomeStagingPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home Staging Guide | LeadEngine Real Estate",
  description: "Sell faster with home staging. Room-by-room tips, DIY strategies, virtual staging, and professional staging ROI.",
  openGraph: {
    title: "Home Staging Guide | LeadEngine Real Estate",
    description: "Home staging guide with room-by-room tips, DIY strategies, and ROI statistics.",
    type: "website",
  },
};

export default function HomeStagingRoute() {
  return (<PublicShell><HomeStagingPage /></PublicShell>);
}
