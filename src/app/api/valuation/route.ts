import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { address, name, email, phone } = body;

    if (!address || !name || !email) {
      return NextResponse.json(
        { error: "Address, name, and email are required" },
        { status: 400 }
      );
    }

    // Create or update contact as seller lead
    const { data: existing } = await supabase
      .from("contacts")
      .select("id")
      .eq("email", email.toLowerCase().trim())
      .maybeSingle();

    if (existing) {
      await supabase.from("contact_activity").insert({
        contact_id: existing.id,
        type: "valuation_request",
        description: `Requested home valuation for: ${address}`,
      });
    } else {
      const { data: contact } = await supabase
        .from("contacts")
        .insert({
          name: name.trim(),
          email: email.toLowerCase().trim(),
          phone: phone?.trim() || null,
          lead_type: "Seller",
          source: "Home Valuation Tool",
          probability: 2,
          notes: `Property: ${address}`,
          last_contacted: new Date().toISOString(),
        })
        .select("id")
        .single();

      if (contact) {
        await supabase
          .from("contact_tags")
          .insert({ contact_id: contact.id, tag: "Seller Intent" });
        await supabase.from("contact_activity").insert({
          contact_id: contact.id,
          type: "valuation_request",
          description: `Requested home valuation for: ${address}`,
        });
        await supabase.from("tasks").insert({
          contact_id: contact.id,
          title: `Speed-to-Lead: Valuation request from ${name.trim()}`,
          priority: 1,
          due_date: new Date().toISOString().split("T")[0],
          status: "pending",
        });
      }
    }

    // Return simulated valuation (in production, integrate with real APIs)
    return NextResponse.json({
      success: true,
      valuation: {
        estimated: 685000,
        low: 645000,
        high: 725000,
        confidence: 0.87,
        comparables: 12,
        marketTrend: "appreciating",
        daysToSell: 14,
        pricePerSqft: 285,
      },
    });
  } catch (error) {
    console.error("Valuation API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
