import PublicShell from "@/components/PublicShell";
import ContactPage from "@/components/ContactPage";

export const metadata = { title: "Contact Us | LeadEngine", description: "Get in touch with Jon Hegreness for all your Arizona real estate needs." };

export default function Contact() {
  return <PublicShell><ContactPage /></PublicShell>;
}
