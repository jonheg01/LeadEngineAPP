"use client";

import React, { useState } from "react";
import { useMobile } from "@/hooks/useMobile";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Icon, Button, Card, Input, SectionHeading, Badge } from "./design-system";

// ═══════════════════════════════════════════════════════════
// ContactPage — Multi-purpose contact & inquiry form
// Direct form submission to /api/leads with source/lead_type
// Trust signals, quick-action cards, success state
// ═══════════════════════════════════════════════════════════

type InquiryType = "Buying" | "Selling" | "Both" | "Investing" | "Other";
type ContactMethod = "Email" | "Phone" | "Text";

export default function ContactPage() {
  const isMobile = useMobile();
  const [trustRef, trustVisible] = useScrollReveal();
  const [formRef, formVisible] = useScrollReveal();

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [inquiryType, setInquiryType] = useState<InquiryType>("Buying");
  const [message, setMessage] = useState("");
  const [preferredContact, setPreferredContact] = useState<ContactMethod>("Email");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!phone.trim()) {
      setError("Please enter your phone number.");
      return;
    }

    setSubmitting(true);

    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          source: "Contact Form",
          lead_type: inquiryType === "Selling" ? "Seller" : "Buyer",
          notes: `Inquiry Type: ${inquiryType}\nPreferred Contact: ${preferredContact}\nMessage: ${message}`,
        }),
      });
      setSuccess(true);
      setTimeout(() => {
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
        setInquiryType("Buying");
        setPreferredContact("Email");
        setSuccess(false);
      }, 3500);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Success state
  if (success) {
    return (
      <div className="le-container" style={{ paddingTop: 64, paddingBottom: 96 }}>
        <div style={{ maxWidth: 480, margin: "0 auto", textAlign: "center" }}>
          <div
            className="le-pulse-glow"
            style={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              background: "var(--le-gold-bg)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 24px",
            }}
          >
            <Icon name="checkCircle" size={40} color="var(--le-gold)" />
          </div>
          <h2 style={{ fontSize: 28, fontWeight: 700, color: "var(--le-text-primary)", marginBottom: 12 }}>
            Thanks for Reaching Out!
          </h2>
          <p style={{ fontSize: 15, color: "var(--le-text-secondary)", lineHeight: 1.6, marginBottom: 24 }}>
            I've received your inquiry and will get back to you within 24 hours via {preferredContact.toLowerCase()}.
          </p>
          <p style={{ fontSize: 13, color: "var(--le-text-tertiary)" }}>
            In the meantime, feel free to explore more properties or check out our buying/selling guides.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero */}
      <section style={{ background: "var(--le-hero-bg)", padding: isMobile ? "48px 0" : "72px 0", textAlign: "center" }}>
        <div className="le-container">
          <h1
            style={{
              fontSize: isMobile ? 32 : 48,
              fontWeight: 700,
              color: "#fff",
              letterSpacing: "-0.03em",
              marginBottom: 16,
            }}
          >
            Get in Touch
          </h1>
          <p
            style={{
              fontSize: 16,
              color: "rgba(255,255,255,0.7)",
              maxWidth: 560,
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            Whether you're buying, selling, or investing, I'm here to help guide you through every step.
          </p>
        </div>
      </section>

      {/* Quick Action Cards */}
      <section
        className="le-section"
        style={{
          background: "var(--le-bg-app)",
          paddingTop: isMobile ? 32 : 48,
          paddingBottom: isMobile ? 32 : 48,
        }}
      >
        <div className="le-container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
              gap: 20,
            }}
          >
            {[
              {
                icon: "clock",
                title: "Schedule a Call",
                description: "Book a time that works for you",
                color: "var(--le-blue)",
                bgColor: "var(--le-blue-bg)",
              },
              {
                icon: "calculator",
                title: "Request Home Value",
                description: "Get a free property valuation",
                color: "var(--le-gold)",
                bgColor: "var(--le-gold-bg)",
              },
              {
                icon: "search",
                title: "Search Homes",
                description: "Explore listings in your area",
                color: "var(--le-green)",
                bgColor: "rgba(110,231,183,0.15)",
              },
            ].map((card) => (
              <Card key={card.title} hover padding={24} style={{ textAlign: "center" }}>
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: "var(--le-radius-md)",
                    background: card.bgColor,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 16px",
                  }}
                >
                  <Icon name={card.icon} size={24} color={card.color} />
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 600, color: "var(--le-text-primary)", marginBottom: 8 }}>
                  {card.title}
                </h3>
                <p style={{ fontSize: 14, color: "var(--le-text-secondary)" }}>{card.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="le-section" style={{ background: "var(--le-bg-surface)" }}>
        <div className="le-container">
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "2fr 1fr", gap: 40 }}>
            {/* Contact Form */}
            <div ref={formRef} style={{ opacity: formVisible ? 1 : 0, transition: "all 0.6s ease" }}>
              <div style={{ marginBottom: 32 }}>
                <h2 style={{ fontSize: 28, fontWeight: 700, color: "var(--le-text-primary)", marginBottom: 12 }}>
                  Let's Chat
                </h2>
                <p style={{ fontSize: 15, color: "var(--le-text-secondary)", lineHeight: 1.6 }}>
                  Fill out the form below and I'll get back to you shortly. No pressure, no obligation.
                </p>
              </div>

              <Card padding={isMobile ? 24 : 32}>
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                  <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 16 }}>
                    <Input
                      label="Your Name"
                      placeholder="Jon Hegreness"
                      value={name}
                      onChange={setName}
                      icon="users"
                      required
                      name="name"
                      autoComplete="name"
                    />
                    <Input
                      label="Email Address"
                      placeholder="jon@example.com"
                      value={email}
                      onChange={setEmail}
                      type="email"
                      icon="mail"
                      required
                      name="email"
                      autoComplete="email"
                    />
                  </div>

                  <Input
                    label="Phone Number"
                    placeholder="(480) 555-0100"
                    value={phone}
                    onChange={setPhone}
                    type="tel"
                    icon="phone"
                    required
                    name="phone"
                    autoComplete="tel"
                  />

                  {/* Inquiry Type Dropdown */}
                  <div>
                    <label style={{ display: "block", fontSize: 14, fontWeight: 500, color: "var(--le-text-primary)", marginBottom: 8 }}>
                      What are you interested in?
                    </label>
                    <select
                      value={inquiryType}
                      onChange={(e) => setInquiryType(e.target.value as InquiryType)}
                      style={{
                        width: "100%",
                        padding: "11px 14px",
                        borderRadius: "var(--le-radius-md)",
                        border: "1px solid var(--le-border-subtle)",
                        background: "var(--le-bg-app)",
                        color: "var(--le-text-primary)",
                        fontSize: 15,
                        fontFamily: "inherit",
                        cursor: "pointer",
                      }}
                    >
                      <option>Buying</option>
                      <option>Selling</option>
                      <option>Both</option>
                      <option>Investing</option>
                      <option>Other</option>
                    </select>
                  </div>

                  {/* Message Textarea */}
                  <div>
                    <label style={{ display: "block", fontSize: 14, fontWeight: 500, color: "var(--le-text-primary)", marginBottom: 8 }}>
                      Tell me more (optional)
                    </label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="e.g., I'm looking for a 3-bed home near schools..."
                      style={{
                        width: "100%",
                        padding: "11px 14px",
                        borderRadius: "var(--le-radius-md)",
                        border: "1px solid var(--le-border-subtle)",
                        background: "var(--le-bg-app)",
                        color: "var(--le-text-primary)",
                        fontSize: 15,
                        fontFamily: "inherit",
                        minHeight: 100,
                        resize: "vertical",
                      }}
                    />
                  </div>

                  {/* Preferred Contact Method */}
                  <div>
                    <label style={{ display: "block", fontSize: 14, fontWeight: 500, color: "var(--le-text-primary)", marginBottom: 12 }}>
                      How should I contact you?
                    </label>
                    <div style={{ display: "flex", gap: 16 }}>
                      {(["Email", "Phone", "Text"] as const).map((method) => (
                        <label key={method} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
                          <input
                            type="radio"
                            name="contact-method"
                            value={method}
                            checked={preferredContact === method}
                            onChange={(e) => setPreferredContact(e.target.value as ContactMethod)}
                            style={{ cursor: "pointer" }}
                          />
                          <span style={{ fontSize: 14, color: "var(--le-text-primary)" }}>{method}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {error && (
                    <div
                      style={{
                        padding: "12px 14px",
                        borderRadius: "var(--le-radius-md)",
                        background: "var(--le-red-bg)",
                        color: "var(--le-red)",
                        fontSize: 13,
                      }}
                    >
                      {error}
                    </div>
                  )}

                  <Button
                    variant="primary"
                    size="lg"
                    fullWidth
                    type="submit"
                    disabled={submitting}
                    iconRight="arrowRight"
                    onClick={() => {}}
                  >
                    {submitting ? "Sending..." : "Send Message"}
                  </Button>

                  <div style={{ display: "flex", justifyContent: "center", gap: 16, fontSize: 12, color: "var(--le-text-tertiary)" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <Icon name="shield" size={12} /> Secure
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <Icon name="clock" size={12} /> Quick Response
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <Icon name="check" size={12} /> No Spam
                    </span>
                  </div>
                </form>
              </Card>
            </div>

            {/* Contact Info Sidebar */}
            <div style={{ opacity: formVisible ? 1 : 0, transition: "all 0.6s ease", transitionDelay: "0.1s" }}>
              <div style={{ position: "sticky", top: 100 }}>
                <div style={{ marginBottom: 32 }}>
                  <h3 style={{ fontSize: 16, fontWeight: 600, color: "var(--le-text-primary)", marginBottom: 16 }}>
                    Contact Information
                  </h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                    {/* Phone */}
                    <div style={{ display: "flex", gap: 12 }}>
                      <div
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: "var(--le-radius-md)",
                          background: "var(--le-blue-bg)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <Icon name="phone" size={18} color="var(--le-blue)" />
                      </div>
                      <div>
                        <div style={{ fontSize: 12, color: "var(--le-text-secondary)", marginBottom: 2 }}>Phone</div>
                        <div style={{ fontSize: 15, fontWeight: 600, color: "var(--le-text-primary)" }}>
                          (480) 555-0100
                        </div>
                      </div>
                    </div>

                    {/* Email */}
                    <div style={{ display: "flex", gap: 12 }}>
                      <div
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: "var(--le-radius-md)",
                          background: "var(--le-gold-bg)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <Icon name="mail" size={18} color="var(--le-gold)" />
                      </div>
                      <div>
                        <div style={{ fontSize: 12, color: "var(--le-text-secondary)", marginBottom: 2 }}>Email</div>
                        <div style={{ fontSize: 15, fontWeight: 600, color: "var(--le-text-primary)" }}>
                          jon@realtyclientengine.app
                        </div>
                      </div>
                    </div>

                    {/* Office Address */}
                    <div style={{ display: "flex", gap: 12 }}>
                      <div
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: "var(--le-radius-md)",
                          background: "rgba(110,231,183,0.15)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <Icon name="mapPin" size={18} color="var(--le-green)" />
                      </div>
                      <div>
                        <div style={{ fontSize: 12, color: "var(--le-text-secondary)", marginBottom: 2 }}>Office</div>
                        <div style={{ fontSize: 15, fontWeight: 600, color: "var(--le-text-primary)" }}>
                          Cave Creek, AZ
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Office Hours */}
                <Card padding={16} style={{ background: "var(--le-bg-app)", marginBottom: 32 }}>
                  <h4 style={{ fontSize: 13, fontWeight: 600, color: "var(--le-text-primary)", marginBottom: 12 }}>
                    Office Hours
                  </h4>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 13, color: "var(--le-text-secondary)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span>Monday – Friday</span>
                      <span>8:00 AM – 6:00 PM</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span>Saturday</span>
                      <span>9:00 AM – 3:00 PM</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span>Sunday</span>
                      <span>By Appointment</span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section ref={trustRef} style={{ background: "var(--le-bg-app)", padding: isMobile ? "32px 0" : "48px 0", borderTop: "1px solid var(--le-border-subtle)" }}>
        <div className="le-container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(3, 1fr)",
              gap: isMobile ? 16 : 24,
              opacity: trustVisible ? 1 : 0,
              transform: trustVisible ? "translateY(0)" : "translateY(12px)",
              transition: "all 0.6s ease",
            }}
          >
            {[
              { icon: "shield", label: "Licensed REALTOR®", value: "Arizona" },
              { icon: "award", label: "Experience", value: "15+ Years" },
              { icon: "users", label: "Happy Clients", value: "500+" },
            ].map((stat) => (
              <div key={stat.label} style={{ textAlign: "center" }}>
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    background: "var(--le-gold-bg)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 12px",
                  }}
                >
                  <Icon name={stat.icon} size={24} color="var(--le-gold)" />
                </div>
                <div style={{ fontSize: 13, color: "var(--le-text-secondary)", marginBottom: 4 }}>{stat.label}</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: "var(--le-text-primary)" }}>{stat.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
