'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { createClient } from '@supabase/supabase-js';
import type { User } from '@supabase/supabase-js';

// ═══════════════════════════════════════════════════════════
// Consumer profile type (matches database schema)
interface ConsumerProfile {
  id: string;
  user_id: string;
  name: string;
  email: string;
  phone: string;
  saved_searches: Record<string, unknown>[];
  favorite_listings: string[];
  agent_id: string | null;
  notification_preferences: Record<string, boolean>;
  created_at: string;
}

// Auth context type
interface ConsumerAuthContextType {
  user: User | null;
  profile: ConsumerProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<ConsumerProfile>) => Promise<void>;
}

// ═══════════════════════════════════════════════════════════

const ConsumerAuthContext = createContext<ConsumerAuthContextType | undefined>(undefined);

export function ConsumerAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<ConsumerProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
  const supabase = supabaseUrl && supabaseKey
    ? createClient(supabaseUrl, supabaseKey)
    : null;

  // Initialize auth state and load profile on mount
  useEffect(() => {
    const initAuth = async () => {
      if (!supabase) { setLoading(false); return; }
      try {
        const {
          data: { user: currentUser },
        } = await supabase.auth.getUser();

        setUser(currentUser || null);

        if (currentUser) {
          await loadProfile(currentUser.id);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        setLoading(false);
      }
    };

    initAuth();

    // Subscribe to auth changes
    if (!supabase) return;
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user || null);
        if (session?.user) {
          await loadProfile(session.user.id);
        } else {
          setProfile(null);
        }
      }
    );

    return () => subscription?.unsubscribe();
  }, []);

  // Load or create consumer profile
  const loadProfile = async (userId: string) => {
    if (!supabase) return;
    try {
      const { data: existingProfile, error } = await supabase
        .from('consumer_profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (existingProfile) {
        setProfile(existingProfile as ConsumerProfile);
      } else {
        // Create new profile if it doesn't exist
        const {
          data: { user },
        } = await supabase.auth.getUser();

        const newProfile = {
          user_id: userId,
          name: user?.user_metadata?.name || '',
          email: user?.email || '',
          phone: user?.user_metadata?.phone || '',
          saved_searches: [],
          favorite_listings: [],
          agent_id: null,
          notification_preferences: {
            email_new_listings: true,
            email_price_drops: true,
            email_market_updates: false,
          },
        };

        const { data: created, error: createError } = await supabase
          .from('consumer_profiles')
          .insert([newProfile])
          .select()
          .single();

        if (createError) throw createError;
        setProfile(created as ConsumerProfile);
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  };

  // Sign in with email/password
  const signIn = async (email: string, password: string) => {
    if (!supabase) throw new Error("Auth not configured");
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  };

  // Sign up with name, email, password
  const signUp = async (name: string, email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
        },
      });
      if (error) throw error;
    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    }
  };

  // Sign out
  const signOut = async () => {
    if (!supabase) return;
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setProfile(null);
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    }
  };

  // Update profile
  const updateProfile = async (updates: Partial<ConsumerProfile>) => {
    if (!supabase || !user) return;
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('consumer_profiles')
        .update(updates)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;
      setProfile(data as ConsumerProfile);
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  };

  return (
    <ConsumerAuthContext.Provider
      value={{
        user,
        profile,
        loading,
        signIn,
        signUp,
        signOut,
        updateProfile,
      }}
    >
      {children}
    </ConsumerAuthContext.Provider>
  );
}

// Hook to use consumer auth
export function useConsumer() {
  const context = useContext(ConsumerAuthContext);
  if (!context) {
    throw new Error('useConsumer must be used within ConsumerAuthProvider');
  }
  return context;
}
