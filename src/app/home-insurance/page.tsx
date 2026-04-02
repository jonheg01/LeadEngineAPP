import PublicShell from "@/components/PublicShell";
import HomeInsurancePage from "@/components/HomeInsurancePage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home Insurance Guide | LeadEngine Real Estate",
  description:
    "Understand home insurance coverage types, calculate premiums, compare policies, and learn how to save on your homeowners insurance.",
  openGraph: {
    title: "Home Insurance Guide | LeadEngine Real Estate",
    description:
      "Home insurance made simple. Coverage types, premium calculator, and money-saving tips.",
    type: "website",
  },
};

export default function HomeInsuranceRoute() {
  return (
    <PublicShell>
      <HomeInsurancePage />
    </PublicShell>
  );
}
