import PublicShell from "@/components/PublicShell";
import HomeAppraisalPage from "@/components/HomeAppraisalPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home Appraisal Guide | LeadEngine Real Estate",
  description:
    "Everything you need to know about home appraisals. Process walkthrough, preparation checklist, and what to do if your appraisal comes in low.",
  openGraph: {
    title: "Home Appraisal Guide | LeadEngine Real Estate",
    description: "Home appraisal guide with preparation tips, cost estimator, and myth-busting.",
    type: "website",
  },
};

export default function HomeAppraisalRoute() {
  return (
    <PublicShell>
      <HomeAppraisalPage />
    </PublicShell>
  );
}
