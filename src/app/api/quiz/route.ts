import { NextRequest, NextResponse } from "next/server";


import { getSupabase } from "@/lib/supabase-server";
interface QuizAnswers {
  intent: "buying" | "selling" | "exploring";
  budget?: number;
  bedrooms?: number;
  features?: string[];
  areas?: string[];
  timeline: "immediate" | "3-6months" | "6-12months" | "exploring";
}

interface ContactInfo {
  name: string;
  email: string;
  phone?: string;
}

interface QuizRequest {
  answers: QuizAnswers;
  contact: ContactInfo;
}

// Calculate match count based on criteria (simulated)
function calculateMatchCount(answers: QuizAnswers): number {
  let baseCount = 150; // Default inventory
  if (answers.budget) baseCount = Math.min(baseCount, Math.floor(answers.budget / 50000));
  if (answers.bedrooms) baseCount = Math.max(50, baseCount - Math.abs(3 - answers.bedrooms) * 20);
  return Math.max(8, baseCount);
}

// Generate profile summary from quiz answers
function generateProfileSummary(answers: QuizAnswers): string {
  const parts: string[] = [];

  if (answers.intent === "buying") {
    parts.push(`Looking to purchase${answers.timeline !== "exploring" ? ` within ${answers.timeline}` : ""}`);
    if (answers.budget) parts.push(`Budget: $${answers.budget.toLocaleString()}`);
    if (answers.bedrooms) parts.push(`${answers.bedrooms} bedroom preference`);
    if (answers.areas?.length) parts.push(`Interested in: ${answers.areas.join(", ")}`);
  } else if (answers.intent === "selling") {
    parts.push(`Planning to sell${answers.timeline !== "exploring" ? ` within ${answers.timeline}` : ""}`);
    if (answers.areas?.length) parts.push(`Properties in: ${answers.areas.join(", ")}`);
  } else {
    parts.push("Exploring the market");
    if (answers.areas?.length) parts.push(`Interested in: ${answers.areas.join(", ")}`);
  }

  if (answers.features?.length) {
    parts.push(`Must-haves: ${answers.features.join(", ")}`);
  }

  return parts.join(" | ");
}

export async function POST(req: NextRequest) {
  try {
    const supabase = getSupabase();
    const body: QuizRequest = await req.json();
    const { answers, contact } = body;

    // Validate required fields
    if (!answers || !contact) {
      return NextResponse.json(
        { error: "Answers and contact information are required" },
        { status: 400 }
      );
    }

    if (!answers.intent || !contact.name || !contact.email) {
      return NextResponse.json(
        { error: "Intent, contact name, and email are required" },
        { status: 400 }
      );
    }

    const cleanEmail = contact.email.toLowerCase().trim();
    const cleanName = contact.name.trim();
    const cleanPhone = contact.phone?.trim() || null;

    // Determine lead type and probability from intent
    const leadTypeMap: { [key: string]: string } = {
      buying: "Buyer",
      selling: "Seller",
      exploring: "Inquirer",
    };

    const probabilityMap: { [key: string]: number } = {
      immediate: 4,
      "3-6months": 3,
      "6-12months": 2,
      exploring: 1,
    };

    const leadType = leadTypeMap[answers.intent];
    const probability = probabilityMap[answers.timeline] || 1;

    // Generate profile summary and structured notes
    const profileSummary = generateProfileSummary(answers);
    const quizData = JSON.stringify(answers, null, 2);
    const notes = `Home Match Quiz Result:\n${profileSummary}\n\nDetailed Answers:\n${quizData}`;

    // Create or update contact
    const { data: existing } = await supabase
      .from("contacts")
      .select("id")
      .eq("email", cleanEmail)
      .maybeSingle();

    let contactId: string;

    if (existing) {
      contactId = existing.id;
      // Update with quiz data
      await supabase
        .from("contacts")
        .update({
          lead_type: leadType,
          probability: Math.max(probability, (existing as any).probability || 1),
          notes: notes,
          last_contacted: new Date().toISOString(),
        })
        .eq("id", contactId);
    } else {
      // Create new contact
      const { data: newContact } = await supabase
        .from("contacts")
        .insert({
          name: cleanName,
          email: cleanEmail,
          phone: cleanPhone,
          lead_type: leadType,
          source: "Home Match Quiz",
          probability,
          notes,
          last_contacted: new Date().toISOString(),
        })
        .select("id")
        .single();

      if (!newContact) {
        throw new Error("Failed to create contact");
      }

      contactId = newContact.id;
    }

    // Add intent-based tags
    const tagsToAdd: string[] = ["Quiz Lead"];

    if (answers.intent === "buying") {
      tagsToAdd.push("Active Buyer");
      if (answers.timeline === "immediate") tagsToAdd.push("Hot Lead");
    } else if (answers.intent === "selling") {
      tagsToAdd.push("Seller Intent");
    } else {
      tagsToAdd.push("Early Stage");
    }

    if (answers.features?.includes("luxury")) tagsToAdd.push("Luxury Prospect");
    if (answers.budget && answers.budget > 1000000) tagsToAdd.push("High Value");

    // Insert tags
    for (const tag of tagsToAdd) {
      const { error: tagError } = await supabase
        .from("contact_tags")
        .insert({ contact_id: contactId, tag });
      if (tagError) {
        // Tag may already exist, ignore
      }
    }

    // Log activity
    await supabase.from("contact_activity").insert({
      contact_id: contactId,
      type: "quiz_completed",
      description: `Completed Home Match Quiz (${answers.intent}): ${profileSummary}`,
    });

    // Auto-enroll in appropriate drip based on intent
    const dripSequenceMap: { [key: string]: string } = {
      buying: "buyer-drip-sequence",
      selling: "seller-drip-sequence",
      exploring: "explorer-drip-sequence",
    };

    const dripSequence = dripSequenceMap[answers.intent];

    // Create enrollment record (simulated - would integrate with email automation)
    await supabase.from("contact_activity").insert({
      contact_id: contactId,
      type: "drip_enrollment",
      description: `Auto-enrolled in ${dripSequence} based on quiz results`,
    });

    // Create follow-up task
    const followUpDate = new Date();
    followUpDate.setDate(followUpDate.getDate() + 1);

    await supabase.from("tasks").insert({
      contact_id: contactId,
      title: `Follow up on ${answers.intent} match quiz - ${cleanName}`,
      priority: answers.intent === "selling" ? 1 : 2,
      due_date: followUpDate.toISOString().split("T")[0],
      status: "pending",
    });

    // Calculate match count
    const matchCount = calculateMatchCount(answers);

    return NextResponse.json({
      success: true,
      matchCount,
      profileSummary,
      message: `Found ${matchCount} matching properties based on your preferences!`,
    });
  } catch (error) {
    console.error("Quiz API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
