import PublicShell from "@/components/PublicShell";
import FAQPage from "@/components/FAQPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | LeadEngine Real Estate",
  description:
    "Find answers to common questions about buying, selling, and financing your home. Expert guidance from our real estate professionals.",
  openGraph: {
    title: "Frequently Asked Questions | LeadEngine Real Estate",
    description:
      "Answers to your real estate questions about buying, selling, financing, and more.",
    type: "website",
  },
};

export default function FAQRoute() {
  return (
    <PublicShell>
      <FAQPage />
    </PublicShell>
  );
}
