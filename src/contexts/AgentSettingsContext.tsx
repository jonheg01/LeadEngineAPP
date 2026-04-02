'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useAgentSettings, AgentSettings } from '@/hooks/useAgentSettings';

const defaultSettings: AgentSettings = {
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

interface AgentContextType {
  settings: AgentSettings;
  loading: boolean;
  error: string | null;
}

const AgentSettingsContext = createContext<AgentContextType>({
  settings: defaultSettings,
  loading: true,
  error: null,
});

export function AgentSettingsProvider({ children }: { children: ReactNode }) {
  const { settings, loading, error } = useAgentSettings();
  return (
    <AgentSettingsContext.Provider value={{ settings: settings || defaultSettings, loading, error }}>
      {children}
    </AgentSettingsContext.Provider>
  );
}

export function useAgentContext() {
  return useContext(AgentSettingsContext);
}
