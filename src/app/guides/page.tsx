import PublicShell from "@/components/PublicShell";
import LeadMagnetLibrary from "@/components/LeadMagnetLibrary";

export const metadata = { title: "Free Real Estate Guides | LeadEngine", description: "Download free guides, checklists, and market reports for Arizona home buyers and sellers." };

export default function GuidesPage() {
  return <PublicShell><LeadMagnetLibrary /></PublicShell>;
}
