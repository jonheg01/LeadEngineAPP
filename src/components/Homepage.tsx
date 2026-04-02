"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useMobile } from "@/hooks/useMobile";
import { useAgentContext } from "@/contexts/AgentSettingsContext";
import { useLeadCapture } from "@/hooks/useLeadCapture";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Icon, Button, Card, SectionHeading, StatCounter, Input, Badge } from "./design-system";
import LeadCaptureShell from "./LeadCaptureShell";
import type { LeadFormData } from "./LeadCaptureShell";
import { createIDXProvider, DEFAULT_IDX_CONFIG } from "@/lib/idx-provider";
import type { ListingSummary, IDXProvider } from "@/lib/idx-provider";

// ═══════════════════════════════════════════════════════════
// Phone formatter helper
function formatPhone(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 10) return `(${digits.slice(0,3)}) ${digits.slice(3,6)}-${digits.slice(6)}`;
  if (digits.length === 11 && digits[0] === '1') return `(${digits.slice(1,4)}) ${digits.slice(4,7)}-${digits.slice(7)}`;
  return phone;
}
// ═══════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════
// Homepage — Hero + IDX Search + Lead Capture + Social Proof
// The primary landing page and conversion machine
// ═══════════════════════════════════════════════════════════

const idxProvider: IDXProvider = createIDXProvider(DEFAULT_IDX_CONFIG);

export default function Homepage() {
  const isMobile = useMobile();
  const { settings } = useAgentContext();
  const {
    showCapture,
    captureReason,
    openCapture,
    closeCapture,
    submitLead,
    recordView,
    isRegistered,
  } = useLeadCapture({ gateAfterViews: 4, exitIntent: true });

  const handleSubmitLead = useCallback(async (data: LeadFormData) => {
    return submitLead({ ...data, source: data.source || "Homepage" });
  }, [submitLead]);

  return (
    <>
      {/* Lead Capture Modal */}
      <LeadCaptureShell
        open={showCapture}
        onClose={closeCapture}
        variant={captureReason === "exit" ? "guide" : captureReason === "gate" ? "register" : "general"}
        source={captureReason === "exit" ? "Exit Intent" : captureReason === "gate" ? "IDX Gate" : "Homepage CTA"}
        onSubmit={handleSubmitLead}
        closable={captureReason !== "gate"}
      />

      {/* ── Hero Section ── */}
      <HeroSection
        isMobile={isMobile}
        onCtaClick={() => openCapture("cta")}
        onSearch={recordView}
        idxProvider={idxProvider}
      />

      {/* ── Stats Bar ── */}
      <StatsBar isMobile={isMobile} />

      {/* ── Featured Listings ── */}
      <FeaturedListings
        isMobile={isMobile}
        idxProvider={idxProvider}
        onViewListing={recordView}
        isRegistered={isRegistered}
        onRegisterClick={() => openCapture("cta")}
      />

      {/* ── Value Propositions ── */}
      <ValueProps isMobile={isMobile} onCtaClick={() => openCapture("cta")} />

      {/* ── CMA / Home Value Teaser ── */}
      <HomeValueTeaser isMobile={isMobile} onCtaClick={() => openCapture("valuation")} />

      {/* ── Neighborhoods ── */}
      <NeighborhoodGrid isMobile={isMobile} />

      {/* ── Testimonials ── */}
      <Testimonials isMobile={isMobile} />

      {/* ── Final CTA ── */}
      <FinalCTA isMobile={isMobile} onCtaClick={() => openCapture("general")} />
    </>
  );
}

/* ═══════════════════════════════════════════════════════════
   Hero Section — Full-bleed gradient + search bar
   ═══════════════════════════════════════════════════════════ */

function HeroSection({
  isMobile,
  onCtaClick,
  onSearch,
  idxProvider,
}: {
  isMobile: boolean;
  onCtaClick: () => void;
  onSearch: () => void;
  idxProvider: IDXProvider;
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (searchQuery.length < 2) { setSuggestions([]); return; }
    const timer = setTimeout(async () => {
      const results = await idxProvider.getAutocomplete(searchQuery);
      setSuggestions(results);
      setShowSuggestions(results.length > 0);
    }, 200);
    return () => clearTimeout(timer);
  }, [searchQuery, idxProvider]);

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    onSearch();
    // Navigate to search results page
    window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
  };

  return (
    <section
      style={{
        position: "relative",
        minHeight: isMobile ? "85vh" : "90vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--le-hero-bg)",
        overflow: "hidden",
      }}
    >
      {/* Subtle pattern overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at 30% 20%, rgba(16, 185, 129, 0.08) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />

      <div className="le-container" style={{ position: "relative", zIndex: 1, textAlign: "center", padding: isMobile ? "120px 16px 60px" : "0 40px" }}>
        {/* Badge */}
        <div style={{ marginBottom: 20 }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "6px 16px",
              borderRadius: "var(--le-radius-full)",
              background: "rgba(16, 185, 129, 0.12)",
              border: "1px solid rgba(16, 185, 129, 0.25)",
              color: "#6ee7b7",
              fontSize: 13,
              fontWeight: 600,
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#6ee7b7" }} />
            Phoenix Metro&apos;s #1 Real Estate Team
          </span>
        </div>

        {/* Headline */}
        <h1
          style={{
            fontSize: isMobile ? 36 : 56,
            fontWeight: 700,
            color: "#ffffff",
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            maxWidth: 800,
            margin: "0 auto 16px",
          }}
        >
          Find Your Perfect{" "}
          <span style={{ color: "var(--le-gold)" }}>Arizona Home</span>
        </h1>

        <p
          style={{
            fontSize: isMobile ? 16 : 18,
            color: "rgba(255, 255, 255, 0.7)",
            maxWidth: 560,
            margin: "0 auto 36px",
            lineHeight: 1.6,
          }}
        >
          Search thousands of live MLS listings across Phoenix, Scottsdale, Cave Creek, and beyond. Expert guidance from listing to closing.
        </p>

        {/* ── Search Bar ── */}
        <div
          style={{
            position: "relative",
            maxWidth: 640,
            margin: "0 auto",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              background: "#ffffff",
              borderRadius: isMobile ? "var(--le-radius-lg)" : "var(--le-radius-full)",
              padding: isMobile ? "6px 6px 6px 16px" : "6px 6px 6px 24px",
              boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
            }}
          >
            <Icon name="search" size={20} color="var(--le-text-tertiary)" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => { setSearchQuery(e.target.value); setShowSuggestions(true); }}
              onFocus={() => { if (suggestions.length > 0) setShowSuggestions(true); }}
              onKeyDown={e => { if (e.key === "Enter") handleSearch(); }}
              placeholder={isMobile ? "City, ZIP, or address..." : "Search by city, ZIP code, neighborhood, or address..."}
              aria-label="Search properties"
              style={{
                flex: 1,
                border: "none",
                outline: "none",
                background: "transparent",
                fontSize: isMobile ? 15 : 16,
                color: "var(--le-text-primary)",
                padding: isMobile ? "12px 8px" : "14px 12px",
              }}
            />
            <button
              onClick={handleSearch}
              style={{
                padding: isMobile ? "12px 20px" : "14px 28px",
                borderRadius: isMobile ? "var(--le-radius-md)" : "var(--le-radius-full)",
                border: "none",
                background: "var(--le-gold)",
                color: "#ffffff",
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "background var(--le-transition-fast)",
              }}
            >
              {isMobile ? "Search" : "Search Homes"}
            </button>
          </div>

          {/* Autocomplete dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                right: 0,
                marginTop: 8,
                background: "#ffffff",
                borderRadius: "var(--le-radius-lg)",
                boxShadow: "var(--le-shadow-lg)",
                overflow: "hidden",
                zIndex: 10,
              }}
            >
              {suggestions.map((s, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setSearchQuery(s);
                    setShowSuggestions(false);
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    width: "100%",
                    padding: "12px 16px",
                    border: "none",
                    background: "transparent",
                    color: "var(--le-text-primary)",
                    fontSize: 14,
                    cursor: "pointer",
                    textAlign: "left",
                    borderBottom: i < suggestions.length - 1 ? "1px solid var(--le-border-subtle)" : "none",
                    transition: "background var(--le-transition-fast)",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = "var(--le-bg-surface-2)")}
                  onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                >
                  <Icon name="mapPin" size={14} color="var(--le-text-tertiary)" />
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Quick filter pills */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 8,
            marginTop: 20,
          }}
        >
          {["Scottsdale", "Phoenix", "Cave Creek", "Tempe", "Under $500K", "Luxury"].map(pill => (
            <button
              key={pill}
              onClick={() => setSearchQuery(pill)}
              style={{
                padding: "7px 16px",
                borderRadius: "var(--le-radius-full)",
                border: "1px solid rgba(255,255,255,0.2)",
                background: "rgba(255,255,255,0.06)",
                color: "rgba(255,255,255,0.8)",
                fontSize: 13,
                fontWeight: 500,
                cursor: "pointer",
                transition: "all var(--le-transition-fast)",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = "rgba(255,255,255,0.12)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.35)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
              }}
            >
              {pill}
            </button>
          ))}
        </div>

        {/* Secondary CTAs */}
        <div style={{ display: "flex", justifyContent: "center", gap: isMobile ? 12 : 16, marginTop: 36 }}>
          <Button variant="white" size={isMobile ? "md" : "lg"} icon="trendingUp" onClick={onCtaClick}>
            What&apos;s My Home Worth?
          </Button>
          <Button
            variant="outline"
            size={isMobile ? "md" : "lg"}
            icon="phone"
            onClick={onCtaClick}
            style={{ color: "#ffffff", borderColor: "rgba(255,255,255,0.3)" }}
          >
            Speak to an Agent
          </Button>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   Stats Bar — Social proof numbers
   ═══════════════════════════════════════════════════════════ */

function StatsBar({ isMobile }: { isMobile: boolean }) {
  const [ref, visible] = useScrollReveal();

  return (
    <section
      ref={ref}
      style={{
        background: "var(--le-bg-surface)",
        borderBottom: "1px solid var(--le-border-subtle)",
        padding: isMobile ? "32px 0" : "40px 0",
      }}
    >
      <div
        className="le-container"
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
          gap: isMobile ? 20 : 32,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(12px)",
          transition: "all 0.6s ease",
        }}
      >
        <StatCounter value="500+" label="Homes Sold" />
        <StatCounter value="$250M" label="Total Volume" suffix="" />
        <StatCounter value="98" label="Client Satisfaction" suffix="%" />
        <StatCounter value="12" label="Average Days to Sell" />
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   Featured Listings — Live IDX cards
   ═══════════════════════════════════════════════════════════ */

function FeaturedListings({
  isMobile,
  idxProvider,
  onViewListing,
  isRegistered,
  onRegisterClick,
}: {
  isMobile: boolean;
  idxProvider: IDXProvider;
  onViewListing: () => void;
  isRegistered: boolean;
  onRegisterClick: () => void;
}) {
  const [listings, setListings] = useState<ListingSummary[]>([]);
  const [ref, visible] = useScrollReveal();

  useEffect(() => {
    idxProvider.search({ limit: 6, sort: "newest" }).then(r => setListings(r.listings));
  }, [idxProvider]);

  return (
    <section ref={ref} className="le-section" style={{ background: "var(--le-bg-app)" }}>
      <div className="le-container">
        <SectionHeading
          eyebrow="Just Listed"
          title="Featured Properties"
          subtitle="The latest homes hitting the market in the Phoenix Metro area."
          center
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
            gap: isMobile ? 16 : 24,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transition: "all 0.6s ease 0.15s",
          }}
        >
          {listings.map((listing, i) => (
            <ListingCard
              key={listing.id}
              listing={listing}
              isMobile={isMobile}
              delay={i * 0.08}
              onView={onViewListing}
              gated={!isRegistered}
              onRegisterClick={onRegisterClick}
            />
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 40 }}>
          <Button variant="outline" size="lg" iconRight="arrowRight" onClick={() => (window.location.href = "/search")}>
            View All Listings
          </Button>
        </div>
      </div>
    </section>
  );
}

function ListingCard({
  listing,
  isMobile,
  delay,
  onView,
  gated,
  onRegisterClick,
}: {
  listing: ListingSummary;
  isMobile: boolean;
  delay: number;
  onView: () => void;
  gated: boolean;
  onRegisterClick: () => void;
}) {
  return (
    <Card
      hover
      padding={0}
      style={{ overflow: "hidden", animationDelay: `${delay}s` }}
      onClick={() => {
        onView();
        if (!gated) {
          window.location.href = `/listing/${listing.id}`;
        }
      }}
    >
      {/* Photo placeholder */}
      <div
        style={{
          height: 200,
          background: `linear-gradient(135deg, var(--le-bg-sunken) 0%, var(--le-bg-surface-2) 100%)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <Icon name="home" size={40} color="var(--le-text-tertiary)" />
        <div
          style={{
            position: "absolute",
            top: 12,
            left: 12,
            display: "flex",
            gap: 6,
          }}
        >
          <Badge color="var(--le-gold)" bg="rgba(16,185,129,0.9)">
            <span style={{ color: "#fff" }}>{listing.status}</span>
          </Badge>
          {listing.daysOnMarket <= 7 && (
            <Badge color="#ffffff" bg="var(--le-red)">New</Badge>
          )}
        </div>
      </div>

      {/* Details */}
      <div style={{ padding: isMobile ? "14px 14px 16px" : "16px 20px 20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
          <div style={{ fontSize: 22, fontWeight: 700, color: "var(--le-text-primary)", letterSpacing: "-0.02em" }}>
            ${listing.price.toLocaleString()}
          </div>
        </div>

        <div style={{ fontSize: 14, color: "var(--le-text-primary)", fontWeight: 500, marginBottom: 4 }}>
          {gated ? (
            <span style={{ filter: "blur(4px)", userSelect: "none" }}>{listing.address}</span>
          ) : (
            listing.address
          )}
        </div>

        <div style={{ fontSize: 13, color: "var(--le-text-secondary)", marginBottom: 12 }}>
          {listing.city}, {listing.state} {listing.zip}
        </div>

        <div style={{ display: "flex", gap: 16, fontSize: 13, color: "var(--le-text-secondary)" }}>
          <span><strong>{listing.beds}</strong> bed</span>
          <span><strong>{listing.baths}</strong> bath</span>
          <span><strong>{listing.sqft.toLocaleString()}</strong> sqft</span>
        </div>

        {gated && (
          <button
            onClick={e => { e.stopPropagation(); onRegisterClick(); }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              width: "100%",
              marginTop: 14,
              padding: "10px 0",
              borderRadius: "var(--le-radius-md)",
              border: "1px dashed var(--le-gold-border)",
              background: "var(--le-gold-bg)",
              color: "var(--le-gold)",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            <Icon name="shield" size={14} /> Register to See Full Details
          </button>
        )}
      </div>
    </Card>
  );
}

/* ═══════════════════════════════════════════════════════════
   Value Propositions
   ═══════════════════════════════════════════════════════════ */

function ValueProps({ isMobile, onCtaClick }: { isMobile: boolean; onCtaClick: () => void }) {
  const [ref, visible] = useScrollReveal();

  const props = [
    { icon: "search", title: "Live MLS Search", description: "Browse every active listing in the Phoenix MLS. Updated every 15 minutes with new homes, price changes, and status updates." },
    { icon: "trendingUp", title: "Instant Home Values", description: "Get a data-driven estimate of your home's worth in under 60 seconds. Powered by recent sales and market analytics." },
    { icon: "clock", title: "Speed to Lead", description: "Our team responds to every inquiry within 15 minutes. Hot leads get immediate attention — no waiting, no phone trees." },
    { icon: "shield", title: "Full-Service Team", description: "From first showing to closing day, you get a dedicated agent, transaction coordinator, and marketing specialist." },
    { icon: "barChart", title: "Market Intelligence", description: "Weekly market reports, neighborhood insights, and pricing strategies backed by real data — not guesswork." },
    { icon: "heart", title: "500+ Happy Clients", description: "98% client satisfaction rate. Read our reviews and see why families trust us with their biggest investment." },
  ];

  return (
    <section ref={ref} className="le-section" style={{ background: "var(--le-bg-surface)" }}>
      <div className="le-container">
        <SectionHeading
          eyebrow="Why Choose Us"
          title="Real Estate, Reimagined"
          subtitle="We combine deep local expertise with cutting-edge technology to deliver results that speak for themselves."
          center
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
            gap: isMobile ? 16 : 24,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transition: "all 0.6s ease 0.1s",
          }}
        >
          {props.map((p, i) => (
            <Card key={i} hover padding={isMobile ? 20 : 28}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "var(--le-radius-md)",
                  background: "var(--le-gold-bg)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 16,
                }}
              >
                <Icon name={p.icon} size={20} color="var(--le-gold)" />
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--le-text-primary)", marginBottom: 8 }}>
                {p.title}
              </h3>
              <p style={{ fontSize: 14, color: "var(--le-text-secondary)", lineHeight: 1.6 }}>
                {p.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   Home Value Teaser CTA
   ═══════════════════════════════════════════════════════════ */

function HomeValueTeaser({ isMobile, onCtaClick }: { isMobile: boolean; onCtaClick: () => void }) {
  const [ref, visible] = useScrollReveal();

  return (
    <section
      ref={ref}
      style={{
        background: "var(--le-hero-bg)",
        padding: isMobile ? "64px 0" : "96px 0",
      }}
    >
      <div
        className="le-container"
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: "center",
          gap: isMobile ? 32 : 64,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(16px)",
          transition: "all 0.6s ease",
        }}
      >
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "var(--le-gold)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>
            Free Home Valuation
          </div>
          <h2 style={{ fontSize: isMobile ? 28 : 36, fontWeight: 700, color: "#ffffff", letterSpacing: "-0.02em", lineHeight: 1.2, marginBottom: 16 }}>
            Thinking About Selling?
          </h2>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.7)", lineHeight: 1.7, marginBottom: 28 }}>
            Get a free, instant estimate of your home&apos;s value powered by recent sales data and market analytics. No obligation, no pressure — just the numbers you need to make informed decisions.
          </p>
          <Button variant="primary" size="lg" iconRight="arrowRight" onClick={onCtaClick}>
            Get My Home Value
          </Button>
        </div>

        {/* Visual placeholder */}
        <div
          style={{
            width: isMobile ? "100%" : 400,
            height: isMobile ? 240 : 320,
            borderRadius: "var(--le-radius-xl)",
            background: "rgba(16, 185, 129, 0.08)",
            border: "1px solid rgba(16, 185, 129, 0.2)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 16,
            flexShrink: 0,
          }}
        >
          <div style={{ fontSize: 48, fontWeight: 700, color: "var(--le-gold)", letterSpacing: "-0.03em" }}>
            $685,000
          </div>
          <div style={{ fontSize: 14, color: "rgba(255,255,255,0.5)" }}>
            Estimated Value — Cave Creek, AZ
          </div>
          <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
            <Badge color="#6ee7b7" bg="rgba(110, 231, 183, 0.15)">+8.2% YoY</Badge>
            <Badge color="#6ee7b7" bg="rgba(110, 231, 183, 0.15)">High Demand</Badge>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   Neighborhood Grid — Hyper-local landing page teasers
   ═══════════════════════════════════════════════════════════ */

function NeighborhoodGrid({ isMobile }: { isMobile: boolean }) {
  const [ref, visible] = useScrollReveal();

  const neighborhoods = [
    { name: "Scottsdale", count: 342, avgPrice: "$875K", hot: true },
    { name: "Phoenix", count: 891, avgPrice: "$485K", hot: false },
    { name: "Cave Creek", count: 124, avgPrice: "$725K", hot: true },
    { name: "Tempe", count: 267, avgPrice: "$520K", hot: false },
    { name: "Chandler", count: 445, avgPrice: "$545K", hot: false },
    { name: "Gilbert", count: 378, avgPrice: "$575K", hot: false },
  ];

  return (
    <section ref={ref} className="le-section" style={{ background: "var(--le-bg-app)" }}>
      <div className="le-container">
        <SectionHeading
          eyebrow="Explore Areas"
          title="Popular Neighborhoods"
          subtitle="Discover the best communities in the Phoenix Metro area with detailed market data and listings."
          center
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(3, 1fr)",
            gap: isMobile ? 12 : 20,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transition: "all 0.6s ease 0.1s",
          }}
        >
          {neighborhoods.map(n => (
            <Card
              key={n.name}
              hover
              padding={isMobile ? 16 : 24}
              onClick={() => (window.location.href = `/neighborhoods/${n.name.toLowerCase().replace(/\s/g, "-")}`)}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                <h3 style={{ fontSize: isMobile ? 16 : 18, fontWeight: 700, color: "var(--le-text-primary)" }}>{n.name}</h3>
                {n.hot && <Badge color="var(--le-red)">Hot</Badge>}
              </div>
              <div style={{ fontSize: 13, color: "var(--le-text-secondary)", lineHeight: 1.7 }}>
                <div><strong>{n.count}</strong> active listings</div>
                <div>Avg. price: <strong>{n.avgPrice}</strong></div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 12, fontSize: 13, fontWeight: 600, color: "var(--le-gold)" }}>
                Explore <Icon name="arrowRight" size={14} color="var(--le-gold)" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   Testimonials
   ═══════════════════════════════════════════════════════════ */

function Testimonials({ isMobile }: { isMobile: boolean }) {
  const [ref, visible] = useScrollReveal();

  const reviews = [
    { name: "Sarah & Mike T.", text: "Jon and his team made our first home purchase completely stress-free. From the first showing to closing day, we felt supported every step of the way. Couldn't recommend them more highly!", rating: 5 },
    { name: "David R.", text: "Sold our Cave Creek home in 6 days, $15K over asking. The marketing strategy was incredible — professional photos, drone video, targeted social ads. Jon knows this market inside and out.", rating: 5 },
    { name: "Maria L.", text: "As an investor buying my 4th rental property, I needed an agent who understood the numbers. Jon's market analysis and negotiation skills saved me $22K on the purchase price.", rating: 5 },
  ];

  return (
    <section ref={ref} className="le-section" style={{ background: "var(--le-bg-surface)" }}>
      <div className="le-container">
        <SectionHeading
          eyebrow="Client Reviews"
          title="What Our Clients Say"
          subtitle="Real stories from real families we've helped find their perfect home."
          center
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
            gap: isMobile ? 16 : 24,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transition: "all 0.6s ease 0.1s",
          }}
        >
          {reviews.map((r, i) => (
            <Card key={i} padding={isMobile ? 20 : 28}>
              {/* Stars */}
              <div style={{ display: "flex", gap: 2, marginBottom: 14 }}>
                {Array.from({ length: 5 }).map((_, j) => (
                  <Icon key={j} name="star" size={16} color={j < r.rating ? "#fbbf24" : "var(--le-border)"} />
                ))}
              </div>
              <p style={{ fontSize: 14, color: "var(--le-text-primary)", lineHeight: 1.7, marginBottom: 16, fontStyle: "italic" }}>
                &ldquo;{r.text}&rdquo;
              </p>
              <div style={{ fontSize: 14, fontWeight: 600, color: "var(--le-text-primary)" }}>{r.name}</div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   Final CTA Band
   ═══════════════════════════════════════════════════════════ */

function FinalCTA({ isMobile, onCtaClick }: { isMobile: boolean; onCtaClick: () => void }) {
  const { settings } = useAgentContext();
  return (
    <section
      style={{
        background: "var(--le-hero-bg)",
        padding: isMobile ? "48px 0" : "64px 0",
        textAlign: "center",
      }}
    >
      <div className="le-container">
        <h2 style={{ fontSize: isMobile ? 24 : 32, fontWeight: 700, color: "#ffffff", letterSpacing: "-0.02em", marginBottom: 12 }}>
          Ready to Find Your Dream Home?
        </h2>
        <p style={{ fontSize: 16, color: "rgba(255,255,255,0.7)", marginBottom: 28, maxWidth: 480, margin: "0 auto 28px" }}>
          Whether you&apos;re buying, selling, or just exploring — our team is here to help at every step.
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
          <Button variant="primary" size="lg" onClick={onCtaClick}>
            Get Started Today
          </Button>
          <Button
            variant="outline"
            size="lg"
            icon="phone"
            style={{ color: "#ffffff", borderColor: "rgba(255,255,255,0.3)" }}
            onClick={onCtaClick}
          >
            {settings.phone ? formatPhone(settings.phone) : "Contact Us"}
          </Button>
        </div>
      </div>
    </section>
  );
}
