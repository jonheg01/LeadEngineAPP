import PublicShell from "@/components/PublicShell";
import HomeBuyingMythsPage from "@/components/HomeBuyingMythsPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home Buying Myths Debunked | LeadEngine Real Estate",
  description: "Common home buying myths debunked. Learn the truth about down payments, credit scores, renting vs buying, and more from real estate experts.",
  openGraph: { title: "Home Buying Myths Debunked | LeadEngine Real Estate", description: "Don't fall for these common home buying myths.", type: "website" },
};

export default function HomeBuyingMythsRoute() {
  return (<PublicShell><HomeBuyingMythsPage /></PublicShell>);
}
