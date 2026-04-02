import PublicShell from "@/components/PublicShell";
import HOAGuidePage from "@/components/HOAGuidePage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HOA Guide | LeadEngine Real Estate",
  description:
    "Everything you need to know about Homeowners Associations. Fees, rules, pros and cons, and questions to ask before buying.",
  openGraph: {
    title: "HOA Guide | LeadEngine Real Estate",
    description: "HOA guide with fee calculator, document review tips, and red flags to watch for.",
    type: "website",
  },
};

export default function HOAGuideRoute() {
  return (
    <PublicShell>
      <HOAGuidePage />
    </PublicShell>
  );
}
