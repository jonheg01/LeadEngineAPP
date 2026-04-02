'use client';

import { useConsumer } from '@/contexts/ConsumerAuthContext';
import { createClient } from '@supabase/supabase-js';

// ═══════════════════════════════════════════════════════════
// Hook for consumer features: saved listings & saved searches
// Works with or without auth (no-op if not logged in)
// ═══════════════════════════════════════════════════════════

interface SavedSearch {
  id: string;
  name: string;
  criteria: Record<string, unknown>;
  created_at: string;
}

export function useConsumerFeatures() {
  const { user, profile, updateProfile } = useConsumer();
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // Save a listing (add to favorite_listings)
  const saveListing = async (listingId: string) => {
    if (!user || !profile) return;

    const current = profile.favorite_listings || [];
    if (current.includes(listingId)) return;

    const updated = [...current, listingId];
    await updateProfile({ favorite_listings: updated });
  };

  // Unsave a listing (remove from favorite_listings)
  const unsaveListing = async (listingId: string) => {
    if (!user || !profile) return;

    const current = profile.favorite_listings || [];
    const updated = current.filter(id => id !== listingId);
    await updateProfile({ favorite_listings: updated });
  };

  // Save a search
  const saveSearch = async (name: string, criteria: Record<string, unknown>) => {
    if (!user || !profile) return;

    const current = profile.saved_searches || [];
    const newSearch: SavedSearch = {
      id: `search_${Date.now()}`,
      name,
      criteria,
      created_at: new Date().toISOString(),
    };

    const updated = [...current, newSearch];
    await updateProfile({ saved_searches: updated });
  };

  // Remove a saved search
  const removeSearch = async (searchId: string) => {
    if (!user || !profile) return;

    const current = profile.saved_searches || [];
    const updated = current.filter((s: SavedSearch) => s.id !== searchId);
    await updateProfile({ saved_searches: updated });
  };

  // Check if a listing is saved
  const isListingSaved = (listingId: string): boolean => {
    if (!profile) return false;
    return (profile.favorite_listings || []).includes(listingId);
  };

  // Get saved listings
  const savedListings = profile?.favorite_listings || [];

  // Get saved searches
  const savedSearches = (profile?.saved_searches || []) as SavedSearch[];

  return {
    saveListing,
    unsaveListing,
    saveSearch,
    removeSearch,
    isListingSaved,
    savedListings,
    savedSearches,
  };
}
