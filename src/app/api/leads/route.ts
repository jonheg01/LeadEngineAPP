import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase-server";
import { getNotificationPriority, SPEED_TO_LEAD } from "@/lib/cross-site-config";

// ═══════════════════════════════════════════════════════════
// /api/leads — Public lead capture endpoint
// Posts to the same Supabase contacts table used by
// ContactsPage.tsx and PipelinePage.tsx in the internal app.
// Now also creates real-time notifications + webhook events.
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

async function createNotification(
  supabase: ReturnType<typeof getSupabase>,
  contactId: string,
  payload: LeadPayload,
  isReturn: boolean
) {
  const source = payload.source || "Website";
  const priority = getNotificationPriority(source, payload.lead_type);
  const speedTarget = SPEED_TO_LEAD[priority];

  const title = isReturn
    ? `Return Visit: ${payload.name}`
    : priority === "critical" || priority === "high"
      ? `HOT LEAD: ${payload.name} — ${speedTarget.label}`
      : `New Lead: ${payload.name}`;

  const bodyParts: string[] = [];
  bodyParts.push(`Source: ${source}`);
  if (payload.email) bodyParts.push(payload.email);
  if (payload.phone) bodyParts.push(payload.phone);
  if (payload.lead_type) bodyParts.push(`Type: ${payload.lead_type}`);
  if (priority === "critical" || priority === "high") bodyParts.push(speedTarget.label);

  const type = isReturn
    ? "return_visit"
    : priority === "critical"
      ? "hot_lead"
      : "new_lead";

  await supabase.from("lead_notifications").insert([{
    type,
    priority,
    title,
    body: bodyParts.join(" · "),
    contact_id: contactId,
    contact_name: payload.name.trim(),
    contact_email: payload.email.toLowerCase().trim(),
    source,
    action_url: `/contacts/${contactId}`,
    read: false,
    dismissed: false,
  }]).then(() => {});

  // Webhook event audit trail
  await supabase.from("webhook_events").insert([{
    event: isReturn ? "lead.updated" : "lead.created",
    source: "public_site",
    contact_id: contactId,
    payload: {
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      source,
      lead_type: payload.lead_type,
      utm_source: payload.utm_source,
      utm_medium: payload.utm_medium,
      utm_campaign: payload.utm_campaign,
      pages_viewed: payload.pages_viewed,
      page_url: payload.page_url,
      captured_at: payload.captured_at,
    },
  }]).then(() => {});
}

export async function POST(request: NextRequest) {
  try {
    const body: LeadPayload = await request.json();

    // ── Validation ──
    if (!body.name?.trim()) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }
    if (!body.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
    }

    const supabase = getSupabase();

    // ── Duplicate detection ──
    const { data: existing } = await supabase
      .from("contacts")
      .select("id, name, email")
      .eq("email", body.email.toLowerCase().trim())
      .limit(1);

    if (existing && existing.length > 0) {
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

      await supabase
        .from("contacts")
        .update({ last_contacted: new Date().toISOString() })
        .eq("id", contact.id);

      // ── Real-time notification for return visit ──
      await createNotification(supabase, contact.id, body, true);

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
      probability: 2,
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

      // ── Real-time notification for new lead ──
      await createNotification(supabase, contactId, body, false);
    }

    // ── Also log to lead_submissions for analytics tracking ──
    if (contactId) {
      await supabase.from("lead_submissions").insert([{
        name: body.name.trim(),
        email: body.email.toLowerCase().trim(),
        phone: body.phone?.trim() || "",
        source_page: body.page_url || "",
        source_form: body.source || "Website",
        interest_type: body.lead_type || "Buyer",
        message: body.notes || "",
        extra_data: {
          utm_source: body.utm_source,
          utm_medium: body.utm_medium,
          utm_campaign: body.utm_campaign,
          utm_content: body.utm_content,
          utm_term: body.utm_term,
          pages_viewed: body.pages_viewed,
          listings_viewed: body.listings_viewed,
        },
        converted_to_contact: true,
        contact_id: contactId,
      }]).then(() => {});
    }

    return NextResponse.json({ ok: true, contactId, existing: false });
  } catch (err) {
    console.error("[/api/leads] Error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
