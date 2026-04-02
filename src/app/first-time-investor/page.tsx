import PublicShell from "@/components/PublicShell";
import FirstTimeInvestorPage from "@/components/FirstTimeInvestorPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "First-Time Real Estate Investor Guide | LeadEngine Real Estate",
  description: "Complete guide for first-time real estate investors. Learn about investment property types, financing options, ROI calculations, tax benefits, and common mistakes.",
  openGraph: { title: "First-Time Real Estate Investor Guide | LeadEngine Real Estate", description: "Start your real estate investment journey with expert guidance.", type: "website" },
};

export default function FirstTimeInvestorRoute() {
  return (<PublicShell><FirstTimeInvestorPage /></PublicShell>);
}
