import PublicShell from "@/components/PublicShell";
import HomeMaintenanceCalendarPage from "@/components/HomeMaintenanceCalendarPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home Maintenance Calendar & Seasonal Guide | LeadEngine Real Estate",
  description: "Seasonal home maintenance calendar with DIY and professional tasks, cost estimates, and importance ratings. Keep your home in top shape year-round.",
  openGraph: { title: "Home Maintenance Calendar | LeadEngine Real Estate", description: "Your year-round guide to essential home maintenance.", type: "website" },
};

export default function HomeMaintenanceCalendarRoute() {
  return (<PublicShell><HomeMaintenanceCalendarPage /></PublicShell>);
}
