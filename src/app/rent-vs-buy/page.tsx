import PublicShell from "@/components/PublicShell";
import RentVsBuyPage from "@/components/RentVsBuyPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rent vs Buy Calculator | LeadEngine Real Estate",
  description:
    "Should you rent or buy? Use our interactive calculator, compare costs, take our readiness quiz, and get personalized advice.",
  openGraph: {
    title: "Rent vs Buy Calculator | LeadEngine Real Estate",
    description:
      "Interactive rent vs buy calculator with cost comparison, readiness quiz, and expert guidance.",
    type: "website",
  },
};

export default function RentVsBuyRoute() {
  return (
    <PublicShell>
      <RentVsBuyPage />
    </PublicShell>
  );
}
