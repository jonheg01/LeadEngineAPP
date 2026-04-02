import PublicShell from "@/components/PublicShell";
import MovingChecklistPage from "@/components/MovingChecklistPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Moving Checklist & Planner | LeadEngine Real Estate",
  description:
    "Complete 8-week moving checklist with budget calculator, packing tips, utility transfer guide, and expert moving advice.",
  openGraph: {
    title: "Moving Checklist & Planner | LeadEngine Real Estate",
    description:
      "Your ultimate moving checklist. Budget calculator, packing tips, and week-by-week timeline.",
    type: "website",
  },
};

export default function MovingChecklistRoute() {
  return (
    <PublicShell>
      <MovingChecklistPage />
    </PublicShell>
  );
}
