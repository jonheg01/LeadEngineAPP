import PublicShell from "@/components/PublicShell";
import RemoteWorkHomesPage from "@/components/RemoteWorkHomesPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Remote Work Home Buying Guide | LeadEngine Real Estate",
  description: "Find the perfect home for remote work. Home office essentials, best locations, internet infrastructure, tax tips, and expert guidance.",
  openGraph: {
    title: "Remote Work Home Buying Guide | LeadEngine Real Estate",
    description: "Your guide to buying a home optimized for remote work and home offices.",
    type: "website",
  },
};

export default function RemoteWorkHomesRoute() {
  return (
    <PublicShell>
      <RemoteWorkHomesPage />
    </PublicShell>
  );
}
