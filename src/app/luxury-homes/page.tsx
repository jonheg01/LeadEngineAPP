import PublicShell from "@/components/PublicShell";
import LuxuryHomeBuyingPage from "@/components/LuxuryHomeBuyingPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Luxury Home Buying Guide | LeadEngine Real Estate",
  description: "Your guide to buying luxury and high-end properties. Jumbo financing, privacy considerations, premium amenities, and white-glove service.",
  openGraph: {
    title: "Luxury Home Buying Guide | LeadEngine Real Estate",
    description: "Expert guidance for purchasing luxury and high-end real estate.",
    type: "website",
  },
};

export default function LuxuryHomeBuyingRoute() {
  return (
    <PublicShell>
      <LuxuryHomeBuyingPage />
    </PublicShell>
  );
}
