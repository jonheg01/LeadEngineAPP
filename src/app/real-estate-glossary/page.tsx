import PublicShell from "@/components/PublicShell";
import RealEstateGlossaryPage from "@/components/RealEstateGlossaryPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Real Estate Glossary & Dictionary | LeadEngine Real Estate",
  description: "Comprehensive real estate glossary with 45+ terms explained. From amortization to VA loans, learn the language of real estate.",
  openGraph: { title: "Real Estate Glossary & Dictionary | LeadEngine Real Estate", description: "Learn essential real estate terms and definitions.", type: "website" },
};

export default function RealEstateGlossaryRoute() {
  return (<PublicShell><RealEstateGlossaryPage /></PublicShell>);
}
