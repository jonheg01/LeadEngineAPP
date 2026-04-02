import PublicShell from "@/components/PublicShell";
import TestimonialsPage from "@/components/TestimonialsPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Client Testimonials & Reviews | LeadEngine Real Estate",
  description:
    "See what 500+ happy clients say about working with us. 4.9-star average rating with 98% recommendation rate. Real stories from real home buyers and sellers.",
  openGraph: {
    title: "Client Testimonials & Reviews | LeadEngine Real Estate",
    description:
      "500+ happy clients, 4.9-star rating, 98% recommendation rate. Read real stories.",
    type: "website",
  },
};

export default function TestimonialsRoute() {
  return (
    <PublicShell>
      <TestimonialsPage />
    </PublicShell>
  );
}
