import PublicShell from "@/components/PublicShell";
import NeighborhoodPage from "@/components/NeighborhoodPage";

export const metadata = { title: "Neighborhood Guide | LeadEngine", description: "Detailed market data, school ratings, and community insights." };

export default async function NeighborhoodSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <PublicShell><NeighborhoodPage slug={slug} /></PublicShell>;
}
