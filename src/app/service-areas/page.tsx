import PublicShell from "@/components/PublicShell";
import ServiceAreasPage from "@/components/ServiceAreasPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Service Areas | LeadEngine Real Estate",
  description:
    "Explore the neighborhoods and communities we serve. Market data, school ratings, walkability scores, and local insights for every area.",
  openGraph: {
    title: "Service Areas | LeadEngine Real Estate",
    description:
      "Comprehensive real estate coverage across the region. Find your perfect neighborhood.",
    type: "website",
  },
};

export default function ServiceAreasRoute() {
  return (
    <PublicShell>
      <ServiceAreasPage />
    </PublicShell>
  );
}
