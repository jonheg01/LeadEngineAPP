'use client';

import { useState, useEffect } from 'react';

export interface AgentSettings {
  display_name: string;
  title: string;
  brokerage: string;
  phone: string;
  email: string;
  photo_url: string;
  bio: string;
  license_number: string;
  service_areas: string[];
  specialties: string[];
  social: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    youtube?: string;
    tiktok?: string;
  };
  branding: {
    primary_color?: string;
    logo_url?: string;
    tagline?: string;
  };
  slug: string;
  tagline: string;
}

interface UseAgentSettingsReturn {
  settings: AgentSettings | null;
  loading: boolean;
  error: string | null;
}

const DEFAULT_SETTINGS: AgentSettings = {
  display_name: '',
  title: '',
  brokerage: '',
  phone: '',
  email: '',
  photo_url: '',
  bio: '',
  license_number: '',
  service_areas: [],
  specialties: [],
  social: {},
  branding: {
    primary_color: 'var(--le-primary)',
    logo_url: '',
    tagline: '',
  },
  slug: '',
  tagline: '',
};

let cachedSettings: AgentSettings | null = null;
let cacheTime: number = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export function useAgentSettings(): UseAgentSettingsReturn {
  const [settings, setSettings] = useState<AgentSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        // Check if we have a cached result
        const now = Date.now();
        if (cachedSettings && cacheTime && now - cacheTime < CACHE_DURATION) {
          setSettings(cachedSettings);
          setLoading(false);
          return;
        }

        const response = await fetch('/api/settings');
        if (!response.ok) {
          throw new Error(`Failed to fetch settings: ${response.statusText}`);
        }

        const data = await response.json();
        const agentSettings: AgentSettings = {
          ...DEFAULT_SETTINGS,
          ...(data.settings || {}),
        };

        cachedSettings = agentSettings;
        cacheTime = now;
        setSettings(agentSettings);
        setError(null);
      } catch (err) {
        console.error('Error fetching agent settings:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
        // Fall back to default settings
        setSettings(DEFAULT_SETTINGS);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  return { settings, loading, error };
}
