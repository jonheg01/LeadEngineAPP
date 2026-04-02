import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

interface AlertRequest {
  email: string;
  name: string;
  criteria: {
    minPrice?: number;
    maxPrice?: number;
    bedrooms?: number;
    bathrooms?: number;
    areas?: string[];
    keywords?: string[];
  };
  frequency: "daily" | "weekly" | "immediately";
}

// Generate alert ID
function generateAlertId(): string {
  return `alert_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

export async function POST(req: NextRequest) {
  try {
    const body: AlertRequest = await req.json();
    const { email, name, criteria, frequency } = body;

    // Validate required fields
    if (!email || !name || !criteria || !frequency) {
      return NextResponse.json(
        { error: "Email, name, criteria, and frequency are required" },
        { status: 400 }
      );
    }

    // Validate frequency
    if (!["daily", "weekly", "immediately"].includes(frequency)) {
      return NextResponse.json(
        { error: "Frequency must be daily, weekly, or immediately" },
        { status: 400 }
      );
    }

    const cleanEmail = email.toLowerCase().trim();
    const cleanName = name.trim();
    const alertId = generateAlertId();

    // Create or update contact
    const { data: existing } = await supabase
      .from("contacts")
      .select("id")
      .eq("email", cleanEmail)
      .maybeSingle();

    let contactId: string;

    if (existing) {
      contactId = existing.id;
      // Update notes with new criteria
      const criteriaJson = JSON.stringify(criteria);
      const { data: currentContact } = await supabase
        .from("contacts")
        .select("notes")
        .eq("id", contactId)
        .single();

      const updatedNotes = currentContact?.notes
        ? `${currentContact.notes}\n\nSearch Alert: ${criteriaJson}`
        : `Search Alert: ${criteriaJson}`;

      await supabase.from("contacts").update({ notes: updatedNotes }).eq("id", contactId);
    } else {
      // Create new buyer lead contact
      const criteriaJson = JSON.stringify(criteria);
      const { data: newContact } = await supabase
        .from("contacts")
        .insert({
          name: cleanName,
          email: cleanEmail,
          lead_type: "Buyer",
          source: "Search Alerts",
          probability: 2,
          notes: `Search Alert: ${criteriaJson}`,
          last_contacted: new Date().toISOString(),
        })
        .select("id")
        .single();

      if (!newContact) {
        throw new Error("Failed to create contact");
      }

      contactId = newContact.id;

      // Tag with buyer intent
      await supabase
        .from("contact_tags")
        .insert({ contact_id: contactId, tag: "Active Buyer" });
    }

    // Log alert activity
    const criteriaDescription =
      `${criteria.minPrice ? "$" + criteria.minPrice : ""} - ${criteria.maxPrice ? "$" + criteria.maxPrice : ""} ` +
      `${criteria.bedrooms ? criteria.bedrooms + " bed" : ""} ` +
      `in ${criteria.areas?.join(", ") || "specified areas"}`;

    await supabase.from("contact_activity").insert({
      contact_id: contactId,
      type: "saved_search",
      description: `Created search alert (${frequency}): ${criteriaDescription}`,
    });

    // Create task for agent follow-up
    const nextWeekDate = new Date();
    nextWeekDate.setDate(nextWeekDate.getDate() + 7);

    await supabase.from("tasks").insert({
      contact_id: contactId,
      title: `Follow up on search alert for ${cleanName}`,
      priority: 2,
      due_date: nextWeekDate.toISOString().split("T")[0],
      status: "pending",
    });

    return NextResponse.json({
      success: true,
      alertId,
      message: `Search alert created successfully. You'll receive ${frequency} updates matching your criteria.`,
    });
  } catch (error) {
    console.error("Alerts API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
