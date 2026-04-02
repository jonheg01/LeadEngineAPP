"use client";

import React, { useState } from "react";
import { useMobile } from "@/hooks/useMobile";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Icon, Button, Card, Input, Badge, SectionHeading, StatCounter } from "./design-system";

export default function HomeValuation() {
  const isMobile = useMobile();
  const [step, setStep] = useState<"form" | "loading" | "result">("form");
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!address.trim()) { setError("Please enter your property address."); return; }
    if (!name.trim() || !email.trim()) { setError("Please enter your name and email."); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError("Please enter a valid email."); return; }
    setError("");
    setStep("loading");

    // Submit lead
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, source: "Home Value Request", lead_type: "Seller", notes: `Property: ${address}` }),
      });
    } catch {}

    // Simulate valuation processing
    setTimeout(() => setStep("result"), 2500);
  };

  if (step === "loading") {
    return (
      <div className="le-container" style={{ paddingTop: 64, paddingBottom: 96, textAlign: "center" }}>
        <div style={{ maxWidth: 480, margin: "0 auto" }}>
          <div className="le-pulse-glow" style={{ width: 64, height: 64, borderRadius: "50%", background: "var(--le-gold-bg)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
            <Icon name="trendingUp" size={28} color="var(--le-gold)" />
          </div>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: "var(--le-text-primary)", marginBottom: 12 }}>Analyzing Your Property...</h2>
          <p style={{ fontSize: 15, color: "var(--le-text-secondary)" }}>Comparing recent sales, market trends, and property data.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 32, maxWidth: 320, margin: "32px auto 0" }}>
            {["Checking recent comparable sales", "Analyzing market trends", "Calculating equity estimate"].map((s, i) => (
              <div key={s} className="le-slide-up" style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 16px", borderRadius: "var(--le-radius-md)", background: "var(--le-bg-surface)", border: "1px solid var(--le-border-subtle)", animationDelay: `${i * 0.4}s` }}>
                <Icon name="checkCircle" size={16} color="var(--le-gold)" />
                <span style={{ fontSize: 13, color: "var(--le-text-secondary)" }}>{s}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (step === "result") {
    return (
      <div className="le-container" style={{ paddingTop: 32, paddingBottom: 96 }}>
        {/* Result Header */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <Badge color="var(--le-gold)">Your Free Home Valuation</Badge>
          <h1 style={{ fontSize: isMobile ? 28 : 40, fontWeight: 700, color: "var(--le-text-primary)", letterSpacing: "-0.02em", marginTop: 16 }}>Estimated Home Value</h1>
          <p style={{ fontSize: 15, color: "var(--le-text-secondary)", marginTop: 8 }}>{address}</p>
        </div>

        {/* Value Display */}
        <Card padding={isMobile ? 24 : 40} style={{ maxWidth: 640, margin: "0 auto 32px", textAlign: "center" }}>
          <div style={{ fontSize: isMobile ? 40 : 56, fontWeight: 700, color: "var(--le-gold)", letterSpacing: "-0.03em" }}>$685,000</div>
          <div style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 16 }}>
            <Badge color="var(--le-gold)">+8.2% Year over Year</Badge>
            <Badge color="var(--le-blue)">High Demand Area</Badge>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginTop: 32, paddingTop: 24, borderTop: "1px solid var(--le-border-subtle)" }}>
            <StatCounter value="$645K" label="Low Estimate" />
            <StatCounter value="$685K" label="Best Estimate" />
            <StatCounter value="$725K" label="High Estimate" />
          </div>
        </Card>

        {/* Market Context */}
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: 20, maxWidth: 800, margin: "0 auto 40px" }}>
          {[
            { icon: "trendingUp", title: "Market Trend", value: "Seller's Market", desc: "Demand exceeds supply in your area" },
            { icon: "clock", title: "Avg. Days to Sell", value: "14 days", desc: "Homes are moving fast in this ZIP" },
            { icon: "barChart", title: "Price per Sq Ft", value: "$285/sqft", desc: "Above the metro average of $245" },
          ].map(m => (
            <Card key={m.title} padding={20}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: "var(--le-radius-md)", background: "var(--le-gold-bg)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon name={m.icon} size={18} color="var(--le-gold)" />
                </div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "var(--le-text-secondary)" }}>{m.title}</div>
              </div>
              <div style={{ fontSize: 20, fontWeight: 700, color: "var(--le-text-primary)" }}>{m.value}</div>
              <div style={{ fontSize: 13, color: "var(--le-text-tertiary)", marginTop: 4 }}>{m.desc}</div>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <Card padding={isMobile ? 24 : 36} style={{ maxWidth: 640, margin: "0 auto", textAlign: "center", background: "var(--le-sidebar-bg)", border: "none" }}>
          <h3 style={{ fontSize: 20, fontWeight: 700, color: "#ffffff", marginBottom: 8 }}>Want a More Precise Estimate?</h3>
          <p style={{ fontSize: 14, color: "var(--le-sidebar-text)", marginBottom: 20 }}>Schedule a free, no-obligation Comparative Market Analysis with our team. We'll walk through your home's unique features and provide a detailed pricing strategy.</p>
          <div style={{ display: "flex", justifyContent: "center", gap: 12 }}>
            <Button variant="primary" size="lg" icon="phone">Schedule Free CMA</Button>
            <Button variant="outline" size="lg" style={{ color: "#fff", borderColor: "rgba(255,255,255,0.3)" }} icon="download">Download Full Report</Button>
          </div>
        </Card>
      </div>
    );
  }

  // Form step
  return (
    <div className="le-container" style={{ paddingTop: 32, paddingBottom: 96 }}>
      <div style={{ maxWidth: 600, margin: "0 auto" }}>
        {/* Hero */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ width: 56, height: 56, borderRadius: "var(--le-radius-xl)", background: "var(--le-gold-bg)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
            <Icon name="trendingUp" size={24} color="var(--le-gold)" />
          </div>
          <h1 style={{ fontSize: isMobile ? 28 : 36, fontWeight: 700, color: "var(--le-text-primary)", letterSpacing: "-0.02em" }}>What's Your Home Worth?</h1>
          <p style={{ fontSize: 16, color: "var(--le-text-secondary)", marginTop: 10, lineHeight: 1.6 }}>Get a free, instant estimate powered by recent sales data and real-time market analytics. No obligation, no pressure.</p>
        </div>

        {/* Form */}
        <Card padding={isMobile ? 24 : 36}>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <Input label="Property Address" placeholder="123 Main St, Phoenix, AZ 85001" value={address} onChange={setAddress} icon="mapPin" required />
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 16 }}>
              <Input label="Your Name" placeholder="Jon Hegreness" value={name} onChange={setName} icon="users" required name="name" autoComplete="name" />
              <Input label="Email" placeholder="jon@example.com" value={email} onChange={setEmail} type="email" icon="mail" required name="email" autoComplete="email" />
            </div>
            <Input label="Phone (Optional)" placeholder="(480) 555-0100" value={phone} onChange={setPhone} type="tel" icon="phone" name="phone" autoComplete="tel" />
          </div>

          {error && <div style={{ marginTop: 12, padding: "10px 14px", borderRadius: "var(--le-radius-md)", background: "var(--le-red-bg)", color: "var(--le-red)", fontSize: 13 }}>{error}</div>}

          <Button variant="primary" size="lg" fullWidth onClick={handleSubmit} iconRight="arrowRight" style={{ marginTop: 24 }}>
            Get My Free Home Value
          </Button>

          <div style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 16, fontSize: 12, color: "var(--le-text-tertiary)" }}>
            <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Icon name="shield" size={12} /> Secure</span>
            <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Icon name="clock" size={12} /> 60 Seconds</span>
            <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Icon name="check" size={12} /> No Obligation</span>
          </div>
        </Card>

        {/* Social Proof */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginTop: 40 }}>
          <StatCounter value="2,400+" label="Valuations Delivered" />
          <StatCounter value="98" label="Accuracy Rate" suffix="%" />
          <StatCounter value="$250M" label="Total Volume" />
        </div>
      </div>
    </div>
  );
}
