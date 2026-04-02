"use client";

import React, { useState } from "react";
import { useMobile } from "@/hooks/useMobile";
import { Icon, Button, Input, Modal } from "./design-system";

// ═══════════════════════════════════════════════════════════
// LeadCaptureShell — Reusable lead capture modal
// Multi-step, contextual messaging, instant backend sync
// Used by: exit-intent, gating, CTAs, valuation tool, etc.
// ═══════════════════════════════════════════════════════════

type CaptureVariant = "register" | "valuation" | "guide" | "showing" | "general";

interface LeadCaptureShellProps {
  open: boolean;
  onClose: () => void;
  variant?: CaptureVariant;
  /** Source tag for tracking (e.g., "IDX Gate", "Exit Intent") */
  source?: string;
  /** Custom headline override */
  headline?: string;
  /** Custom subtitle override */
  subtitle?: string;
  /** Submit handler — receives form data */
  onSubmit: (data: LeadFormData) => Promise<{ ok: boolean; error?: string }>;
  /** Whether closing is allowed (gated modals can't be dismissed) */
  closable?: boolean;
}

export interface LeadFormData {
  name: string;
  email: string;
  phone: string;
  source: string;
  lead_type?: string;
  notes?: string;
}

const VARIANT_CONFIG: Record<CaptureVariant, { icon: string; headline: string; subtitle: string; leadType: string; buttonLabel: string }> = {
  register: {
    icon: "home",
    headline: "Unlock Full Property Details",
    subtitle: "Create a free account to save searches, view addresses, and get instant listing alerts.",
    leadType: "Buyer",
    buttonLabel: "Get Full Access",
  },
  valuation: {
    icon: "trendingUp",
    headline: "What's Your Home Worth?",
    subtitle: "Get a free, instant home valuation based on recent sales and current market data.",
    leadType: "Seller",
    buttonLabel: "Get My Home Value",
  },
  guide: {
    icon: "download",
    headline: "Download Your Free Guide",
    subtitle: "Get expert insights delivered straight to your inbox. No spam, unsubscribe anytime.",
    leadType: "Buyer",
    buttonLabel: "Send My Guide",
  },
  showing: {
    icon: "clock",
    headline: "Request a Private Showing",
    subtitle: "We'll get back to you within 15 minutes during business hours.",
    leadType: "Buyer",
    buttonLabel: "Request Showing",
  },
  general: {
    icon: "mail",
    headline: "Let's Connect",
    subtitle: "Whether you're buying, selling, or just curious — we're here to help.",
    leadType: "Buyer",
    buttonLabel: "Get in Touch",
  },
};

export default function LeadCaptureShell({
  open,
  onClose,
  variant = "general",
  source = "Website",
  headline,
  subtitle,
  onSubmit,
  closable = true,
}: LeadCaptureShellProps) {
  const isMobile = useMobile();
  const config = VARIANT_CONFIG[variant];

  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    // Step 1: name + email
    if (step === 1) {
      if (!name.trim() || !email.trim()) {
        setError("Please enter your name and email.");
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setError("Please enter a valid email address.");
        return;
      }
      setError("");
      setStep(2);
      return;
    }

    // Step 2: phone (optional but encouraged) + submit
    setSubmitting(true);
    setError("");

    const result = await onSubmit({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      source,
      lead_type: config.leadType,
    });

    setSubmitting(false);

    if (result.ok) {
      setSuccess(true);
    } else {
      setError(result.error || "Something went wrong. Please try again.");
    }
  };

  const handleClose = () => {
    if (!closable && !success) return;
    setStep(1);
    setName("");
    setEmail("");
    setPhone("");
    setError("");
    setSuccess(false);
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose} maxWidth={440} closable={closable || success}>
      <div style={{ padding: isMobile ? "28px 20px" : "36px 32px" }}>
        {/* Close button */}
        {(closable || success) && (
          <button
            onClick={handleClose}
            aria-label="Close"
            style={{
              position: "absolute",
              top: 16,
              right: 16,
              width: 32,
              height: 32,
              borderRadius: "50%",
              border: "none",
              background: "var(--le-bg-surface-2)",
              color: "var(--le-text-secondary)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon name="x" size={16} />
          </button>
        )}

        {success ? (
          /* ── Success State ── */
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: "50%",
                background: "var(--le-gold-bg)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px",
              }}
            >
              <Icon name="checkCircle" size={28} color="var(--le-gold)" />
            </div>
            <h3 style={{ fontSize: 20, fontWeight: 700, color: "var(--le-text-primary)", marginBottom: 8 }}>
              You're All Set!
            </h3>
            <p style={{ fontSize: 14, color: "var(--le-text-secondary)", lineHeight: 1.6, marginBottom: 24 }}>
              We'll be in touch shortly. In the meantime, explore our latest listings and neighborhood guides.
            </p>
            <Button variant="primary" onClick={handleClose} fullWidth>
              Continue Browsing
            </Button>
          </div>
        ) : (
          /* ── Form ── */
          <>
            {/* Header */}
            <div style={{ textAlign: "center", marginBottom: 28 }}>
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "var(--le-radius-lg)",
                  background: "var(--le-gold-bg)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 16px",
                }}
              >
                <Icon name={config.icon} size={22} color="var(--le-gold)" />
              </div>
              <h3 style={{ fontSize: 22, fontWeight: 700, color: "var(--le-text-primary)", marginBottom: 8, letterSpacing: "-0.02em" }}>
                {headline || config.headline}
              </h3>
              <p style={{ fontSize: 14, color: "var(--le-text-secondary)", lineHeight: 1.6 }}>
                {subtitle || config.subtitle}
              </p>
            </div>

            {/* Step indicator */}
            <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
              {[1, 2].map(s => (
                <div
                  key={s}
                  style={{
                    flex: 1,
                    height: 3,
                    borderRadius: 2,
                    background: s <= step ? "var(--le-gold)" : "var(--le-border)",
                    transition: "background var(--le-transition-base)",
                  }}
                />
              ))}
            </div>

            {/* Fields */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {step === 1 ? (
                <>
                  <Input
                    label="Full Name"
                    placeholder="Jon Hegreness"
                    value={name}
                    onChange={setName}
                    required
                    icon="users"
                    name="name"
                    autoComplete="name"
                  />
                  <Input
                    label="Email Address"
                    placeholder="jon@example.com"
                    value={email}
                    onChange={setEmail}
                    type="email"
                    required
                    icon="mail"
                    name="email"
                    autoComplete="email"
                  />
                </>
              ) : (
                <>
                  <Input
                    label="Phone Number"
                    placeholder="(480) 555-0100"
                    value={phone}
                    onChange={setPhone}
                    type="tel"
                    icon="phone"
                    name="phone"
                    autoComplete="tel"
                  />
                  <p style={{ fontSize: 12, color: "var(--le-text-tertiary)", textAlign: "center" }}>
                    Optional — but helps us reach you faster for time-sensitive listings.
                  </p>
                </>
              )}
            </div>

            {/* Error */}
            {error && (
              <div style={{ marginTop: 12, padding: "10px 14px", borderRadius: "var(--le-radius-md)", background: "var(--le-red-bg)", color: "var(--le-red)", fontSize: 13, fontWeight: 500 }}>
                {error}
              </div>
            )}

            {/* Action */}
            <div style={{ marginTop: 20 }}>
              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={handleSubmit}
                disabled={submitting}
                iconRight={step === 1 ? "arrowRight" : undefined}
              >
                {submitting ? "Submitting..." : step === 1 ? "Continue" : config.buttonLabel}
              </Button>
              {step === 2 && (
                <button
                  onClick={() => setStep(1)}
                  style={{
                    display: "block",
                    width: "100%",
                    marginTop: 10,
                    padding: 8,
                    border: "none",
                    background: "none",
                    color: "var(--le-text-secondary)",
                    fontSize: 13,
                    cursor: "pointer",
                  }}
                >
                  &larr; Back
                </button>
              )}
            </div>

            {/* Trust signals */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginTop: 20, fontSize: 11, color: "var(--le-text-tertiary)" }}>
              <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <Icon name="shield" size={12} /> Secure
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <Icon name="check" size={12} /> No Spam
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <Icon name="x" size={12} /> Unsubscribe Anytime
              </span>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
}
