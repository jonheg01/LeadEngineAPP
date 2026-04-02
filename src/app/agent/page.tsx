import PublicShell from "@/components/PublicShell";
import AgentProfilePage from "@/components/AgentProfilePage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Meet Your Agent | LeadEngine Real Estate",
  description:
    "Learn about our experienced real estate agent. 150+ transactions closed, $75M+ in volume, 4.9-star client rating.",
  openGraph: {
    title: "Meet Your Agent | LeadEngine Real Estate",
    description:
      "Experienced real estate professional dedicated to your success.",
    type: "website",
  },
};

export default function AgentRoute() {
  return (
    <PublicShell>
      <AgentProfilePage />
    </PublicShell>
  );
}
