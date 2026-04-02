import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const agentId = searchParams.get("agent_id");
    const slug = searchParams.get("slug");

    let query = supabase
      .from("agent_profile")
      .select("*");

    if (agentId) {
      query = query.eq("id", agentId);
    } else if (slug) {
      query = query.eq("slug", slug);
    } else {
      query = query.order("created_at", { ascending: true }).limit(1);
    }

    const { data: profile, error } = await query.single();

    if (error || !profile) {
      return NextResponse.json({ settings: {} });
    }

    return NextResponse.json({
      settings: {
        display_name: profile.name || "",
        title: profile.title || "Real Estate Professional",
        brokerage: profile.brokerage || "",
        phone: profile.phone || "",
        email: profile.email || "",
        photo_url: profile.headshot_url || "",
        bio: profile.bio || "",
        license_number: profile.license_number || "",
        service_areas: profile.neighborhoods || [],
        specialties: profile.areas_of_focus || [],
        social: {
          facebook: profile.facebook_url || "",
          instagram: profile.instagram_url || "",
          linkedin: profile.linkedin_url || "",
          youtube: profile.youtube_url || "",
          tiktok: profile.tiktok_url || "",
        },
        branding: {
          primary_color: "var(--le-primary)",
          logo_url: profile.logo_url || "",
          tagline: profile.tagline || "",
        },
        slug: profile.slug || "",
        tagline: profile.tagline || "",
      },
    });
  } catch (err) {
    return NextResponse.json({ settings: {} });
  }
}
