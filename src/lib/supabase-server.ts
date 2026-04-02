import { createClient, SupabaseClient } from "@supabase/supabase-js";

let _supabase: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (!_supabase) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    // Prefer service role key for full access, fall back to anon key
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!url || !key) {
      // Build-time safety: return a dummy client that won't crash the build
      _supabase = createClient(
        "https://placeholder.supabase.co",
        "placeholder-key"
      );
    } else {
      _supabase = createClient(url, key);
    }
  }
  return _supabase;
}
