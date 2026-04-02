import PublicShell from "@/components/PublicShell";
import HomeAppraisalProcessPage from "@/components/HomeAppraisalProcessPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home Appraisal Process Guide | LeadEngine Real Estate",
  description: "Complete guide to the home appraisal process. Learn what appraisers look for, how to prepare, and what to do if your appraisal comes in low.",
  openGraph: { title: "Home Appraisal Process Guide | LeadEngine Real Estate", description: "Everything you need to know about home appraisals.", type: "website" },
};

export default function AppraisalProcessRoute() {
  return (<PublicShell><HomeAppraisalProcessPage /></PublicShell>);
}
