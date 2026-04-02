import PublicShell from "@/components/PublicShell";
import BlogPage from "@/components/BlogPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Real Estate Blog & Market Updates | LeadEngine",
  description: "Expert real estate insights, market updates, buying and selling tips from industry professionals.",
};

export default function BlogRoute() {
  return (
    <PublicShell>
      <BlogPage />
    </PublicShell>
  );
}
