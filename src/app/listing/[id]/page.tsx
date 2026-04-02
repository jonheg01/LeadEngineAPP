import PublicShell from "@/components/PublicShell";
import ListingDetail from "@/components/ListingDetail";

export const metadata = { title: "Property Details | LeadEngine", description: "View full property details, photos, and request a showing." };

export default async function ListingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <PublicShell><ListingDetail listingId={id} /></PublicShell>;
}
