import PublicShell from "@/components/PublicShell";
import PetFriendlyHomesPage from "@/components/PetFriendlyHomesPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pet-Friendly Home Buying Guide | LeadEngine Real Estate",
  description: "Find the perfect home for you and your pets. Pet-friendly features, neighborhood tips, HOA policies, and expert guidance for pet owners.",
  openGraph: {
    title: "Pet-Friendly Home Buying Guide | LeadEngine Real Estate",
    description: "Your guide to finding a home that works for the whole family, pets included.",
    type: "website",
  },
};

export default function PetFriendlyHomesRoute() {
  return (
    <PublicShell>
      <PetFriendlyHomesPage />
    </PublicShell>
  );
}
