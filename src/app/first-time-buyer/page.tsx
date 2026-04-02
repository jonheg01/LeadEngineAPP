import PublicShell from "@/components/PublicShell";
import FirstTimeBuyerPage from "@/components/FirstTimeBuyerPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "First-Time Home Buyer Guide | LeadEngine Real Estate",
  description:
    "Complete first-time home buyer guide with step-by-step roadmap, affordability calculator, loan program comparisons, and expert tips.",
  openGraph: {
    title: "First-Time Home Buyer Guide | LeadEngine Real Estate",
    description:
      "Your complete roadmap to buying your first home. Calculator, programs, and expert guidance.",
    type: "website",
  },
};

export default function FirstTimeBuyerRoute() {
  return (
    <PublicShell>
      <FirstTimeBuyerPage />
    </PublicShell>
  );
}
