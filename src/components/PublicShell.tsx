"use client";

import React, { useState, useEffect, useRef } from "react";
import { useMobile } from "@/hooks/useMobile";
import { Icon, Button } from "./design-system";

// ═══════════════════════════════════════════════════════════
// PublicShell — Layout wrapper for all public-facing pages
// Nav + Footer + Mobile menu + CTA integration
// Uses exact same var(--le-*) tokens as internal app
// ═══════════════════════════════════════════════════════════

interface NavLink {
  label: string;
  href: string;
  highlight?: boolean;
}

const NAV_LINKS: NavLink[] = [
  { label: "Search Homes", href: "/search" },
  { label: "Home Value", href: "/home-value" },
  { label: "Neighborhoods", href: "/neighborhoods" },
  { label: "Mortgage Calc", href: "/mortgage-calculator" },
  { label: "Blog", href: "/blog" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "About", href: "/about" },
  { label: "Market Reports", href: "/market-reports" },
  { label: "Meet the Agent", href: "/agent" },
  { label: "Resources", href: "/resources" },
  { label: "Seller Guide", href: "/seller-guide" },
  { label: "Buyer Guide", href: "/buyer-guide" },
  { label: "Investor Guide", href: "/investor-guide" },
  { label: "FAQ", href: "/faq" },
  { label: "Service Areas", href: "/service-areas" },
  { label: "Relocation", href: "/relocation-guide" },
  { label: "Pre-Approval", href: "/pre-approval" },
  { label: "First-Time Buyers", href: "/first-time-buyer" },
  { label: "Home Maintenance", href: "/home-maintenance" },
  { label: "Moving Checklist", href: "/moving-checklist" },
  { label: "Rent vs Buy", href: "/rent-vs-buy" },
  { label: "Downsizing", href: "/downsizing-guide" },
  { label: "Home Insurance", href: "/home-insurance" },
  { label: "Closing Costs", href: "/closing-costs" },
  { label: "Property Taxes", href: "/property-taxes" },
  { label: "Appraisals", href: "/home-appraisal" },
  { label: "Credit Score", href: "/credit-score" },
  { label: "Inspections", href: "/home-inspection" },
  { label: "HOA Guide", href: "/hoa-guide" },
  { label: "Mortgage Types", href: "/mortgage-types" },
  { label: "Escrow Guide", href: "/escrow-guide" },
    { label: "Title Insurance", href: "/title-insurance" },
    { label: "Home Staging", href: "/home-staging" },
    { label: "VA Home Buying", href: "/veteran-home-buyer" },
    { label: "Senior Moving Guide", href: "/senior-moving-guide" },
    { label: "New Construction", href: "/new-construction" },
    { label: "Foreclosure Guide", href: "/foreclosure-guide" },
    { label: "Condo Guide", href: "/condo-guide" },
    { label: "Home Warranty", href: "/home-warranty" },
    { label: "Luxury Homes", href: "/luxury-homes" },
    { label: "Green Homes", href: "/green-homes" },
    { label: "Multi-Generational", href: "/multi-generational" },
    { label: "Renovation ROI", href: "/renovation-roi" },
    { label: "Pet-Friendly Homes", href: "/pet-friendly" },
    { label: "Smart Homes", href: "/smart-homes" },
    { label: "Remote Work Homes", href: "/remote-work-homes" },
    { label: "Historic Homes", href: "/historic-homes" },
    { label: "Downsizing Guide", href: "/downsizing-guide" },
    { label: "Home Office Guide", href: "/home-office-guide" },
    { label: "Eco-Friendly Living", href: "/eco-friendly-living" },
    { label: "First-Time Investor", href: "/first-time-investor" },
    { label: "Relocation Checklist", href: "/relocation-checklist" },
    { label: "Home Insurance Guide", href: "/home-insurance-guide" },
    { label: "Appraisal Process", href: "/appraisal-process" },
    { label: "Refinance Guide", href: "/refinance-guide" },
    { label: "Home Buying Myths", href: "/home-buying-myths" },
    { label: "Seasonal Buying Guide", href: "/seasonal-buying-guide" },
  { label: "Contact", href: "/contact", highlight: true },
];

interface PublicShellProps {
  children: React.ReactNode;
  /** Override nav transparency (hero pages use transparent nav) */
  transparentNav?: boolean;
  /** Show CTA in nav */
  showNavCta?: boolean;
  /** Optional callback when CTA clicked */
  onCtaClick?: () => void;
}

export default function PublicShell({
  children,
  transparentNav = false,
  showNavCta = true,
  onCtaClick,
}: PublicShellProps) {
  const isMobile = useMobile();
  const [mobileMenu, setMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  // Track scroll for nav background transition
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    if (mobileMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenu]);

  const navBg = transparentNav && !scrolled
    ? "transparent"
    : "var(--le-bg-surface)";
  const navBorder = transparentNav && !scrolled
    ? "transparent"
    : "var(--le-border-subtle)";
  const navShadow = scrolled ? "var(--le-shadow-sm)" : "none";
  const textColor = transparentNav && !scrolled
    ? "var(--le-text-inverse)"
    : "var(--le-text-primary)";
  const logoColor = transparentNav && !scrolled
    ? "#ffffff"
    : "var(--le-text-primary)";

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Skip link */}
      <a href="#main-content" className="le-skip-link">Skip to content</a>

      {/* ── Navigation ── */}
      <nav
        ref={navRef}
        className="pub-nav"
        role="navigation"
        aria-label="Main navigation"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          height: "var(--le-nav-height)",
          background: navBg,
          borderBottom: `1px solid ${navBorder}`,
          boxShadow: navShadow,
          backdropFilter: scrolled ? "blur(12px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
          transition: "all var(--le-transition-smooth)",
        }}
      >
        <div
          className="le-container"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "100%",
          }}
        >
          {/* Logo */}
          <a
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              textDecoration: "none",
              color: logoColor,
              transition: "color var(--le-transition-fast)",
            }}
          >
            <span style={{ fontSize: 22, lineHeight: 1 }}>&#9670;</span>
            <span style={{ fontSize: 18, fontWeight: 700, letterSpacing: "-0.03em" }}>
              LeadEngine
            </span>
          </a>

          {/* Desktop nav links */}
          <div className="pub-nav-desktop" style={{ display: "flex", alignItems: "center", gap: 4 }}>
            {NAV_LINKS.map(link =>
              link.highlight ? (
                <Button
                  key={link.label}
                  variant="primary"
                  size="sm"
                  onClick={onCtaClick || undefined}
                  style={{ marginLeft: 8 }}
                >
                  {link.label}
                </Button>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  style={{
                    padding: "8px 16px",
                    borderRadius: "var(--le-radius-sm)",
                    fontSize: 14,
                    fontWeight: 500,
                    color: textColor,
                    textDecoration: "none",
                    transition: "all var(--le-transition-fast)",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = transparentNav && !scrolled
                      ? "rgba(255,255,255,0.1)"
                      : "var(--le-bg-surface-2)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  {link.label}
                </a>
              )
            )}
            {showNavCta && (
              <Button
                variant="primary"
                size="sm"
                icon="phone"
                onClick={onCtaClick}
                style={{ marginLeft: 8 }}
              >
                (480) 555-0100
              </Button>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="pub-hamburger"
            onClick={() => setMobileMenu(!mobileMenu)}
            aria-label={mobileMenu ? "Close navigation" : "Open navigation"}
            aria-expanded={mobileMenu}
            style={{
              display: "none",
              alignItems: "center",
              justifyContent: "center",
              width: 44,
              height: 44,
              borderRadius: "var(--le-radius-md)",
              border: "none",
              background: "transparent",
              color: textColor,
              cursor: "pointer",
              fontSize: 20,
            }}
          >
            <Icon name={mobileMenu ? "x" : "menu"} size={24} color={textColor} />
          </button>
        </div>
      </nav>

      {/* ── Mobile Menu ── */}
      {mobileMenu && (
        <>
          <div
            onClick={() => setMobileMenu(false)}
            aria-hidden="true"
            style={{
              position: "fixed",
              inset: 0,
              background: "var(--le-bg-overlay)",
              zIndex: 49,
              backdropFilter: "blur(2px)",
              WebkitBackdropFilter: "blur(2px)",
            }}
          />
          <div
            className="pub-mobile-menu"
            role="menu"
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              bottom: 0,
              width: 300,
              background: "var(--le-bg-surface)",
              zIndex: 51,
              padding: "80px 24px 24px",
              overflowY: "auto",
              boxShadow: "var(--le-shadow-xl)",
              animation: "le-slide-up 0.2s ease",
            }}
          >
            {NAV_LINKS.map(link => (
              <a
                key={link.label}
                href={link.href}
                role="menuitem"
                onClick={() => setMobileMenu(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "16px 0",
                  fontSize: 16,
                  fontWeight: 500,
                  color: "var(--le-text-primary)",
                  textDecoration: "none",
                  borderBottom: "1px solid var(--le-border-subtle)",
                }}
              >
                {link.label}
              </a>
            ))}
            <div style={{ marginTop: 24 }}>
              <Button variant="primary" size="lg" fullWidth icon="phone" onClick={onCtaClick}>
                Call (480) 555-0100
              </Button>
            </div>
          </div>
        </>
      )}

      {/* ── Main Content ── */}
      <main
        id="main-content"
        style={{
          flex: 1,
          paddingTop: transparentNav ? 0 : "var(--le-nav-height)",
        }}
      >
        {children}
      </main>

      {/* ── Footer ── */}
      <footer
        className="pub-footer"
        style={{
          background: "var(--le-footer-bg)",
          color: "var(--le-sidebar-text)",
          padding: isMobile ? "48px 0 24px" : "64px 0 32px",
        }}
      >
        <div className="le-container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "2fr 1fr 1fr 1fr",
              gap: isMobile ? 32 : 48,
              marginBottom: 40,
            }}
          >
            {/* Brand column */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                <span style={{ fontSize: 22, color: "var(--le-gold)" }}>&#9670;</span>
                <span style={{ fontSize: 18, fontWeight: 700, color: "#ffffff", letterSpacing: "-0.03em" }}>
                  LeadEngine
                </span>
              </div>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: "var(--le-sidebar-text)", maxWidth: 320 }}>
                Your trusted real estate team in the Phoenix Metro area. We combine local expertise with cutting-edge technology to deliver exceptional results.
              </p>
              <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
                {["facebook", "instagram", "linkedin"].map(social => (
                  <a
                    key={social}
                    href="#"
                    aria-label={social}
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      background: "rgba(255,255,255,0.08)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--le-sidebar-text)",
                      transition: "all var(--le-transition-fast)",
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = "var(--le-gold)";
                      e.currentTarget.style.color = "#ffffff";
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                      e.currentTarget.style.color = "var(--le-sidebar-text)";
                    }}
                  >
                    <Icon name={social} size={16} />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#ffffff", marginBottom: 16, letterSpacing: "0.04em", textTransform: "uppercase" }}>
                Quick Links
              </div>
              {["Search Homes", "Home Valuation", "Neighborhoods", "Market Reports", "Buyer Guide", "Seller Guide"].map(link => (
                <a
                  key={link}
                  href="#"
                  style={{
                    display: "block",
                    fontSize: 14,
                    color: "var(--le-sidebar-text)",
                    textDecoration: "none",
                    padding: "5px 0",
                    transition: "color var(--le-transition-fast)",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = "var(--le-gold)")}
                  onMouseLeave={e => (e.currentTarget.style.color = "var(--le-sidebar-text)")}
                >
                  {link}
                </a>
              ))}
            </div>

            {/* Areas */}
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#ffffff", marginBottom: 16, letterSpacing: "0.04em", textTransform: "uppercase" }}>
                Areas We Serve
              </div>
              {["Phoenix", "Scottsdale", "Cave Creek", "Carefree", "Tempe", "Mesa", "Chandler", "Gilbert"].map(area => (
                <a
                  key={area}
                  href="#"
                  style={{
                    display: "block",
                    fontSize: 14,
                    color: "var(--le-sidebar-text)",
                    textDecoration: "none",
                    padding: "5px 0",
                    transition: "color var(--le-transition-fast)",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = "var(--le-gold)")}
                  onMouseLeave={e => (e.currentTarget.style.color = "var(--le-sidebar-text)")}
                >
                  {area}
                </a>
              ))}
            </div>

            {/* Contact */}
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#ffffff", marginBottom: 16, letterSpacing: "0.04em", textTransform: "uppercase" }}>
                Contact
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <Icon name="phone" size={16} color="var(--le-gold)" />
                  <span style={{ fontSize: 14 }}>(480) 555-0100</span>
                </div>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <Icon name="mail" size={16} color="var(--le-gold)" />
                  <span style={{ fontSize: 14 }}>team@leadengine.com</span>
                </div>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <Icon name="mapPin" size={16} color="var(--le-gold)" />
                  <span style={{ fontSize: 14, lineHeight: 1.5 }}>Cave Creek, AZ 85331</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div
            style={{
              borderTop: "1px solid rgba(255,255,255,0.08)",
              paddingTop: 24,
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              justifyContent: "space-between",
              alignItems: isMobile ? "center" : undefined,
              gap: 12,
            }}
          >
            <div style={{ fontSize: 13, color: "var(--le-text-tertiary)" }}>
              &copy; {new Date().getFullYear()} LeadEngine Real Estate. All rights reserved.
            </div>
            <div style={{ display: "flex", gap: 20, fontSize: 13, color: "var(--le-text-tertiary)" }}>
              <a href="#" style={{ color: "inherit", textDecoration: "none" }}>Privacy Policy</a>
              <a href="#" style={{ color: "inherit", textDecoration: "none" }}>Terms of Service</a>
              <a href="#" style={{ color: "inherit", textDecoration: "none" }}>Fair Housing</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
