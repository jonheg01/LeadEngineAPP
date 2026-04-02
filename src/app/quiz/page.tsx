import PublicShell from "@/components/PublicShell";
import HomeMatchQuiz from "@/components/HomeMatchQuiz";

export const metadata = { title: "Find Your Perfect Home | LeadEngine", description: "Take our quick quiz to find your ideal Arizona home match." };

export default function QuizPage() {
  return <PublicShell><HomeMatchQuiz /></PublicShell>;
}
