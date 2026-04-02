import PublicShell from "@/components/PublicShell";
import SmartHomeGuidePage from "@/components/SmartHomeGuidePage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Smart Home Technology Guide | LeadEngine Real Estate",
  description: "Everything about smart home technology. Automation systems, security, energy management, and how smart features add value to your home.",
  openGraph: {
    title: "Smart Home Technology Guide | LeadEngine Real Estate",
    description: "Your complete guide to smart home technology and connected living.",
    type: "website",
  },
};

export default function SmartHomeGuideRoute() {
  return (
    <PublicShell>
      <SmartHomeGuidePage />
    </PublicShell>
  );
}
