import PublicShell from "@/components/PublicShell";
import IDXSearchResults from "@/components/IDXSearchResults";

export const metadata = { title: "Search Homes | LeadEngine", description: "Search homes for sale in the Phoenix metro area. Browse MLS listings with detailed filters." };

export default function SearchPage() {
  return <PublicShell showNavCta><IDXSearchResults /></PublicShell>;
}
