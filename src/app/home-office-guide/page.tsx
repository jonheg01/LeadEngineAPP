import PublicShell from "@/components/PublicShell";
import HomeOfficeGuidePage from "@/components/HomeOfficeGuidePage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home Office Guide for Remote Workers | LeadEngine Real Estate",
  description: "Find the perfect home for remote work. Guide to home office features, design tips, tax deductions, and best neighborhoods for remote workers.",
  openGraph: { title: "Home Office Guide for Remote Workers | LeadEngine Real Estate", description: "Find homes with the perfect home office setup for remote work.", type: "website" },
};

export default function HomeOfficeGuideRoute() {
  return (<PublicShell><HomeOfficeGuidePage /></PublicShell>);
}
