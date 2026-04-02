"use client";

import React from "react";
import { AgentSettingsProvider } from "@/contexts/AgentSettingsContext";
import { ConsumerAuthProvider } from "@/contexts/ConsumerAuthContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AgentSettingsProvider>
      <ConsumerAuthProvider>
        {children}
      </ConsumerAuthProvider>
    </AgentSettingsProvider>
  );
}
