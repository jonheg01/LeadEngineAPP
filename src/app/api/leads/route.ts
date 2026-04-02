import { NextRequest, NextResponse } from "next/server";

import { getSupabase } from "@/lib/supabase-server";
// ═══════════════════════════════════════════════════════════
// /api/leads — Public lead capture endpoint
// Posts to the same Supabase contacts table used by
// ContactsPage.tsx and PipelinePage.tsx in the internal app
// ═══════════════════════════════════════════════════════════



interface LeadPayload {
  name: string;
  email: string;
  phone?: string;
  source?: string;
  lead_type?: string;
  notes?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  pages_viewed?: number;
  listings_viewed?: number;
  captured_at?: string;
  page_url?: string;
}

export async function POST(request: NextRequest) {
  try {
    const supabase = getSupabase();
    const body: LeadPayload = await request.json();

    // ── Validation ──
    if (!body.name?.trim()) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }
    if (!body.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
    }

    // ── Duplicate detection ──
    const { data: existing } = await supabase
      .from("contacts")
      .select("id, name, email")
      .eq("email", body.email.toLowerCase().trim())
      .limit(1);

    if (existing && existing.length > 0) {
      // Update existing contact with new activity
      const contact = existing[0];
      const activityNote = [
        `Return visit via ${body.source || "Website"}`,
        body.utm_source ? `UTM: ${body.utm_source}/${body.utm_medium || ""}/${body.utm_campaign || ""}` : null,
        body.pages_viewed ? `${body.pages_viewed} pages viewed` : null,
        body.page_url ? `Page: ${body.page_url}` : null,
      ].filter(Boolean).join(" | ");

      await supabase.from("contact_activity").insert([{
        contact_id: contact.id,
        activity_type: "website_visit",
        subject: `Return visit — ${body.source || "Website"}`,
        preview: activityNote,
      }]);

      // Update last_contacted
      await supabase
        .from("contacts")
        .update({ last_contacted: new Date().toISOString() })
        .eq("id", contact.id);

      return NextResponse.json({ ok: true, contactId: contact.id, existing: true });
    }

    // ── Build UTM/source notes ──
    const utmNotes = [
      body.utm_source ? `UTM Source: ${body.utm_source}` : null,
      body.utm_medium ? `UTM Medium: ${body.utm_medium}` : null,
      body.utm_campaign ? `UTM Campaign: ${body.utm_campaign}` : null,
      body.utm_content ? `UTM Content: ${body.utm_content}` : null,
      body.pages_viewed ? `Pages Viewed: ${body.pages_viewed}` : null,
      body.page_url ? `Capture Page: ${body.page_url}` : null,
      body.captured_at ? `Captured: ${body.captured_at}` : null,
    ].filter(Boolean).join("\n");

    // ── Insert new contact ──
    const { data, error } = await supabase.from("contacts").insert([{
      name: body.name.trim(),
      email: body.email.toLowerCase().trim(),
      phone: body.phone?.trim() || "",
      source: body.source || "Website",
      lead_type: body.lead_type || "Buyer",
      category: "Active Lead",
      probability: 2, // Hot — they just registered
      notes: [body.notes, utmNotes].filter(Boolean).join("\n\n"),
      city: "",
      state: "AZ",
      zip: "",
      address: "",
      last_contacted: new Date().toISOString(),
    }]).select("id");

    if (error) {
      console.error("[/api/leads] Insert error:", error);
      return NextResponse.json({ error: "Failed to save lead" }, { status: 500 });
    }

    const contactId = data?.[0]?.id;

    if (contactId) {
      // ── Auto-tag based on source ──
      const tagMap: Record<string, { name: string; color: string }> = {
        "IDX Gate": { name: "Active Buyer", color: "#2563eb" },
        "Exit Intent": { name: "Website Lead", color: "#6b7280" },
        "Homepage CTA": { name: "Website Lead", color: "#6b7280" },
        "Home Value": { name: "Seller Intent", color: "#dc2626" },
        "Buyer Registration": { name: "Active Buyer", color: "#2563eb" },
        "Showing Request": { name: "Showing Request", color: "#059669" },
      };
      const tag = Object.entries(tagMap).find(([k]) => (body.source || "").includes(k));
      if (tag) {
        await supabase.from("contact_tags").insert([{
          contact_id: contactId,
          tag_name: tag[1].name,
          tag_color: tag[1].color,
        }]);
      }

      // ── Speed to Lead task ──
      await supabase.from("tasks").insert([{
        contact_id: contactId,
        title: `SPEED TO LEAD: Call ${body.name.trim()} NOW — ${body.source || "Website"}`,
        due_date: new Date().toISOString().slice(0, 10),
        priority: 1,
        task_type: "speed_to_lead",
        completed: false,
        auto_generated: true,
      }]);

      // ── Auto-enroll in drip ──
      const dripName = (body.lead_type === "Seller" || body.source?.includes("Value"))
        ? "Seller Prep Sequence"
        : "New Buyer Nurture";

      const { data: drip } = await supabase
        .from("drip_campaigns")
        .select("id")
        .eq("name", dripName)
        .limit(1);

      if (drip?.[0]) {
        await supabase.from("drip_enrollments").insert([{
          contact_id: contactId,
          drip_campaign_id: drip[0].id,
          current_step: 0,
          enrolled_at: new Date().toISOString(),
          status: "active",
        }]);
      }

      // ── Activity log ──
      await supabase.from("contact_activity").insert([{
        contact_id: contactId,
        activity_type: "lead_capture",
        subject: `New lead captured — ${body.source || "Website"}`,
        preview: `${body.name} registered via ${body.source || "website"}. ${body.phone ? "Phone: " + body.phone : "No phone provided."}`,
      }]);
    }

    return NextResponse.json({ ok: true, contactId, existing: false });
  } catch (err) {
    console.error("[/api/leads] Error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
