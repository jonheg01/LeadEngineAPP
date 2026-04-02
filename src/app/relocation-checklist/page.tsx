import PublicShell from "@/components/PublicShell";
import RelocationChecklistPage from "@/components/RelocationChecklistPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Relocation Checklist & Moving Guide | LeadEngine Real Estate",
  description: "Complete relocation checklist with timeline, cost tips, neighborhood selection guide, and school research. Everything you need for a smooth move.",
  openGraph: { title: "Relocation Checklist & Moving Guide | LeadEngine Real Estate", description: "Your complete guide to relocating to a new city.", type: "website" },
};

export default function RelocationChecklistRoute() {
  return (<PublicShell><RelocationChecklistPage /></PublicShell>);
}
