import PublicShell from "@/components/PublicShell";
import VeteranHomeBuyerPage from "@/components/VeteranHomeBuyerPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "VA Home Loans & Veteran Home Buying Guide | LeadEngine Real Estate",
  description: "Complete guide to VA loans, military relocation, and home buying for veterans and active duty service members. Zero down payment, no PMI, expert guidance.",
  openGraph: {
    title: "VA Home Loans & Veteran Home Buying Guide | LeadEngine Real Estate",
    description: "Everything veterans need to know about buying a home with VA loan benefits.",
    type: "website",
  },
};

export default function VeteranHomeBuyerRoute() {
  return (
    <PublicShell>
      <VeteranHomeBuyerPage />
    </PublicShell>
  );
}
