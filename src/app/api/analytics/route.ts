import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

interface AnalyticsEvent {
  event: string;
  category: string;
  action: string;
  label?: string;
  value?: number;
  utm?: {
    source?: string;
    medium?: string;
    campaign?: string;
    content?: string;
  };
  referrer?: string;
  page?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: AnalyticsEvent = await req.json();
    const { event, category, action, label, value, utm, referrer, page } = body;

    // Validate required fields
    if (!event || !category || !action) {
      return NextResponse.json(
        { error: "Event, category, and action are required" },
        { status: 400 }
      );
    }

    // Build analytics log entry
    const analyticsLog = {
      event: event.trim(),
      category: category.trim(),
      action: action.trim(),
      label: label?.trim() || null,
      value: value || null,
      utm_source: utm?.source || null,
      utm_medium: utm?.medium || null,
      utm_campaign: utm?.campaign || null,
      utm_content: utm?.content || null,
      referrer: referrer || null,
      page: page || null,
      timestamp: new Date().toISOString(),
      user_agent: req.headers.get("user-agent") || null,
      ip_address: req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || null,
    };

    // Attempt to insert into analytics_logs table
    // If table doesn't exist yet, operation will fail silently (fire-and-forget)
    await supabase
      .from("analytics_logs")
      .insert(analyticsLog)
      .catch((error) => {
        // Log to console for debugging (table may not exist yet)
        console.log("Analytics event logged:", {
          event: analyticsLog.event,
          category: analyticsLog.category,
          action: analyticsLog.action,
          value: analyticsLog.value,
          timestamp: analyticsLog.timestamp,
        });
      });

    // Fire-and-forget: always return success immediately
    return NextResponse.json({ success: true });
  } catch (error) {
    // Log error but still return success (fire-and-forget pattern)
    console.error("Analytics API error:", error);
    return NextResponse.json({ success: true });
  }
}
