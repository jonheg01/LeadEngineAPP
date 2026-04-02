import PublicShell from "@/components/PublicShell";
import MovingWithPetsGuidePage from "@/components/MovingWithPetsGuidePage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Moving With Pets Guide | LeadEngine Real Estate",
  description: "Complete guide to moving with pets. Tips for preparing your pet, finding pet-friendly homes, moving day advice, and settling into a new neighborhood.",
  openGraph: { title: "Moving With Pets Guide | LeadEngine Real Estate", description: "Make your move stress-free for your furry family members.", type: "website" },
};

export default function MovingWithPetsRoute() {
  return (<PublicShell><MovingWithPetsGuidePage /></PublicShell>);
}
