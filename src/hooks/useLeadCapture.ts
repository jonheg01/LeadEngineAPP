"use client";

import { useState, useEffect, useCallback, useRef } from "react";

// ═══════════════════════════════════════════════════════════
// Lead Capture Hook — Behavior-triggered gating, exit-intent,
// progressive profiling, and instant backend sync
// ═══════════════════════════════════════════════════════════

interface LeadData {
  name: string;
  email: string;
  phone: string;
  source: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  lead_type?: string;
  notes?: string;
  pages_viewed?: number;
  listings_viewed?: number;
}

interface UseLeadCaptureOptions {
  /** Number of listing views before requiring registration */
  gateAfterViews?: number;
  /** Seconds of inactivity before showing a nudge */
  inactivityNudgeSeconds?: number;
  /** Enable exit-intent detection */
  exitIntent?: boolean;
}

interface UseLeadCaptureReturn {
  /** Whether the user has registered (lead captured) */
  isRegistered: boolean;
  /** Whether to show the lead capture modal */
  showCapture: boolean;
  /** What triggered the modal: "gate" | "exit" | "inactivity" | "cta" | null */
  captureReason: string | null;
  /** Number of property views so far */
  viewCount: number;
  /** Record a property view — may trigger gating */
  recordView: () => void;
  /** Manually open the lead capture modal (for CTA clicks) */
  openCapture: (reason?: string) => void;
  /** Close the modal */
  closeCapture: () => void;
  /** Submit lead data to backend */
  submitLead: (data: LeadData) => Promise<{ ok: boolean; error?: string }>;
  /** Mark user as registered (e.g., after successful submission) */
  markRegistered: () => void;
}

const STORAGE_KEY = "le_pub_lead";
const VIEW_KEY = "le_pub_views";

function getUtmParams(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const utm: Record<string, string> = {};
  for (const key of ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"]) {
    const val = params.get(key);
    if (val) utm[key] = val;
  }
  return utm;
}

export function useLeadCapture(options: UseLeadCaptureOptions = {}): UseLeadCaptureReturn {
  const {
    gateAfterViews = 4,
    exitIntent = true,
  } = options;

  const [isRegistered, setIsRegistered] = useState(false);
  const [showCapture, setShowCapture] = useState(false);
  const [captureReason, setCaptureReason] = useState<string | null>(null);
  const [viewCount, setViewCount] = useState(0);
  const exitIntentFired = useRef(false);

  // Check registration status on mount
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (stored) setIsRegistered(true);
      const views = parseInt(sessionStorage.getItem(VIEW_KEY) || "0", 10);
      setViewCount(views);
    } catch {}
  }, []);

  // Exit-intent detection (mouse leaves viewport top)
  useEffect(() => {
    if (!exitIntent || isRegistered || typeof window === "undefined") return;

    const handler = (e: MouseEvent) => {
      if (e.clientY <= 5 && !exitIntentFired.current && !showCapture) {
        exitIntentFired.current = true;
        setCaptureReason("exit");
        setShowCapture(true);
      }
    };

    document.addEventListener("mouseleave", handler);
    return () => document.removeEventListener("mouseleave", handler);
  }, [exitIntent, isRegistered, showCapture]);

  const recordView = useCallback(() => {
    if (isRegistered) return;
    setViewCount(prev => {
      const next = prev + 1;
      try { sessionStorage.setItem(VIEW_KEY, String(next)); } catch {}
      if (next >= gateAfterViews) {
        setCaptureReason("gate");
        setShowCapture(true);
      }
      return next;
    });
  }, [isRegistered, gateAfterViews]);

  const openCapture = useCallback((reason = "cta") => {
    setCaptureReason(reason);
    setShowCapture(true);
  }, []);

  const closeCapture = useCallback(() => {
    // If gated, don't allow close
    if (captureReason === "gate" && !isRegistered) return;
    setShowCapture(false);
    setCaptureReason(null);
  }, [captureReason, isRegistered]);

  const markRegistered = useCallback(() => {
    setIsRegistered(true);
    setShowCapture(false);
    setCaptureReason(null);
    try { sessionStorage.setItem(STORAGE_KEY, "1"); } catch {}
  }, []);

  const submitLead = useCallback(async (data: LeadData): Promise<{ ok: boolean; error?: string }> => {
    try {
      const utmParams = getUtmParams();
      const payload = {
        ...data,
        ...utmParams,
        pages_viewed: viewCount,
        captured_at: new Date().toISOString(),
        page_url: typeof window !== "undefined" ? window.location.href : "",
      };

      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        return { ok: false, error: body.error || "Failed to submit" };
      }

      markRegistered();
      return { ok: true };
    } catch (err) {
      return { ok: false, error: "Network error — please try again" };
    }
  }, [viewCount, markRegistered]);

  return {
    isRegistered,
    showCapture,
    captureReason,
    viewCount,
    recordView,
    openCapture,
    closeCapture,
    submitLead,
    markRegistered,
  };
}
