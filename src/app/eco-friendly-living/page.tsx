import PublicShell from "@/components/PublicShell";
import EcoFriendlyLivingPage from "@/components/EcoFriendlyLivingPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Eco-Friendly & Sustainable Living Guide | LeadEngine Real Estate",
  description: "Discover eco-friendly homes and sustainable living. Learn about green certifications, solar energy, sustainable materials, and water conservation features.",
  openGraph: { title: "Eco-Friendly & Sustainable Living Guide | LeadEngine Real Estate", description: "Your guide to green homes and sustainable real estate.", type: "website" },
};

export default function EcoFriendlyLivingRoute() {
  return (<PublicShell><EcoFriendlyLivingPage /></PublicShell>);
}
