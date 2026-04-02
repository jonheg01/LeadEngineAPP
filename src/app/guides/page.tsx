import PublicShell from "@/components/PublicShell";
import GuidesPage from "@/components/GuidesPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Real Estate Guides & Resources | LeadEngine",
  description:
    "Expert guides for home buyers, sellers, and investors. Learn about mortgages, market trends, negotiation strategies, and more from real estate professionals.",
  openGraph: {
    title: "Real Estate Guides & Resources | LeadEngine",
    description:
      "Expert guides for home buyers, sellers, and investors. Learn about mortgages, market trends, negotiation strategies, and more.",
    type: "website",
  },
};

export default function GuidesRoute() {
  return (
    <PublicShell>
      <GuidesPage />
    </PublicShell>
  );
}
