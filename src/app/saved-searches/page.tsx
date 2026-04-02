import PublicShell from "@/components/PublicShell";
import SavedSearchManager from "@/components/SavedSearches";

export const metadata = { title: "Saved Searches & Alerts | LeadEngine", description: "Manage your saved property searches and alert preferences." };

export default function SavedSearchesPage() {
  return <PublicShell><SavedSearchManager /></PublicShell>;
}
