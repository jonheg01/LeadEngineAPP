"use client";

import React from "react";
import { useMobile } from "@/hooks/useMobile";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Icon, Button, Card, Badge, SectionHeading, StatCounter } from "./design-system";

// ═══════════════════════════════════════════════════════════
// AboutPage — Agent bio, stats, value propositions, testimonials
// Trust-focused design with social proof, certifications, CTA
// ═══════════════════════════════════════════════════════════

export default function AboutPage() {
  const isMobile = useMobile();
  const [statsRef, statsVisible] = useScrollReveal();
  const [valueRef, valueVisible] = useScrollReveal();
  const [testimonialsRef, testimonialsVisible] = useScrollReveal();
  const [awardsRef, awardsVisible] = useScrollReveal();

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
            About Jon Hegreness
          </h1>
          <p
            style={{
              fontSize: 18,
              color: "rgba(255,255,255,0.8)",
              maxWidth: 640,
              margin: "0 auto",
              lineHeight: 1.6,
              fontWeight: 500,
            }}
          >
            Your Trusted Arizona Real Estate Expert
          </p>
        </div>
      </section>

      {/* Agent Profile Card */}
      <section
        className="le-section"
        style={{
          background: "var(--le-bg-surface)",
          paddingTop: isMobile ? 32 : 48,
          paddingBottom: isMobile ? 32 : 48,
        }}
      >
        <div className="le-container">
          <Card padding={isMobile ? 24 : 40} style={{ maxWidth: 800, margin: "0 auto" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "200px 1fr",
                gap: isMobile ? 24 : 40,
                alignItems: "start",
              }}
            >
              {/* Avatar */}
              <div style={{ textAlign: isMobile ? "center" : "left" }}>
                <div
                  style={{
                    width: isMobile ? 140 : 160,
                    height: isMobile ? 140 : 160,
                    borderRadius: "var(--le-radius-xl)",
                    background: "var(--le-gold-bg)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: isMobile ? "0 auto" : 0,
                    fontSize: isMobile ? 48 : 56,
                    fontWeight: 700,
                    color: "var(--le-gold)",
                  }}
                >
                  JH
                </div>
              </div>

              {/* Bio */}
              <div>
                <h2 style={{ fontSize: 28, fontWeight: 700, color: "var(--le-text-primary)", marginBottom: 4 }}>
                  Jon Hegreness
                </h2>
                <div
                  style={{
                    fontSize: 15,
                    fontWeight: 600,
                    color: "var(--le-gold)",
                    marginBottom: 16,
                  }}
                >
                  REALTOR® | RE/MAX Fine Properties
                </div>
                <p style={{ fontSize: 15, color: "var(--le-text-secondary)", lineHeight: 1.8, marginBottom: 20 }}>
                  With over 15 years of real estate experience across the Phoenix metropolitan area, I've helped hundreds
                  of families and investors achieve their real estate goals. My deep knowledge of Arizona neighborhoods,
                  combined with a commitment to personalized service and cutting-edge market tools, makes me the trusted
                  choice for buyers, sellers, and investors throughout the region.
                </p>
                <p style={{ fontSize: 15, color: "var(--le-text-secondary)", lineHeight: 1.8 }}>
                  Whether you're a first-time homebuyer, seasoned investor, or looking to sell in today's market, I bring
                  integrity, expertise, and unwavering dedication to every transaction.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Stats */}
      <section ref={statsRef} style={{ background: "var(--le-bg-app)", padding: isMobile ? "32px 0" : "40px 0", borderBottom: "1px solid var(--le-border-subtle)" }}>
        <div className="le-container" style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)", gap: 24, opacity: statsVisible ? 1 : 0, transform: statsVisible ? "translateY(0)" : "translateY(12px)", transition: "all 0.6s ease" }}>
          <StatCounter value="15+" label="Years Experience" />
          <StatCounter value="500+" label="Transactions" />
          <StatCounter value="$250M+" label="Sales Volume" />
          <StatCounter value="98%" label="Satisfaction" />
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="le-section" style={{ background: "var(--le-bg-surface)" }}>
        <div className="le-container">
          <SectionHeading
            eyebrow="Why Choose Jon"
            title="Why Work With Me"
            subtitle="Six core strengths that set me apart from other realtors in Arizona."
          />
          <div
            ref={valueRef}
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
              gap: 20,
              opacity: valueVisible ? 1 : 0,
              transition: "all 0.6s ease",
            }}
          >
            {[
              {
                icon: "mapPin",
                title: "Local Expertise",
                description: "Deep knowledge of Phoenix metro neighborhoods, market trends, and investment opportunities.",
                color: "var(--le-green)",
                bgColor: "rgba(110,231,183,0.15)",
              },
              {
                icon: "shield",
                title: "Negotiation Skills",
                description: "Proven track record of securing favorable terms and maximizing client returns.",
                color: "var(--le-blue)",
                bgColor: "var(--le-blue-bg)",
              },
              {
                icon: "users",
                title: "Full-Service Support",
                description: "From property search to closing, I handle every detail with professional care.",
                color: "var(--le-orange)",
                bgColor: "var(--le-orange-bg)",
              },
              {
                icon: "calculator",
                title: "Technology-Driven",
                description: "Advanced tools and analytics to give you competitive advantage and data-backed insights.",
                color: "var(--le-gold)",
                bgColor: "var(--le-gold-bg)",
              },
              {
                icon: "phone",
                title: "Responsive Communication",
                description: "Quick answers to your questions, regular updates, and always available when you need me.",
                color: "var(--le-purple)",
                bgColor: "rgba(167,139,250,0.15)",
              },
              {
                icon: "trendingUp",
                title: "Market Intelligence",
                description: "Stay informed with my exclusive market reports and investment opportunity alerts.",
                color: "var(--le-red)",
                bgColor: "rgba(239,68,68,0.15)",
              },
            ].map((prop) => (
              <Card key={prop.title} hover padding={24}>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: "var(--le-radius-md)",
                    background: prop.bgColor,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 16,
                  }}
                >
                  <Icon name={prop.icon} size={22} color={prop.color} />
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 600, color: "var(--le-text-primary)", marginBottom: 8 }}>
                  {prop.title}
                </h3>
                <p style={{ fontSize: 14, color: "var(--le-text-secondary)", lineHeight: 1.6 }}>
                  {prop.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="le-section" style={{ background: "var(--le-bg-app)" }}>
        <div className="le-container">
          <SectionHeading
            eyebrow="Client Testimonials"
            title="What My Clients Say"
            subtitle="Real feedback from real people I've had the privilege to work with."
          />
          <div
            ref={testimonialsRef}
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(5, 1fr)",
              gap: 16,
              opacity: testimonialsVisible ? 1 : 0,
              transition: "all 0.6s ease",
            }}
          >
            {[
              {
                name: "Sarah Martinez",
                role: "Buyer",
                quote: "Jon made our home buying experience seamless. His market knowledge and professionalism are unmatched.",
              },
              {
                name: "Michael Chen",
                role: "Seller",
                quote: "Sold our home in just 2 weeks above asking price. Jon's strategy and execution were exceptional.",
              },
              {
                name: "Jennifer Cole",
                role: "First-Time Buyer",
                quote: "As a first-time buyer, I was nervous. Jon's patient guidance made everything clear and comfortable.",
              },
              {
                name: "Robert Davis",
                role: "Investor",
                quote: "Jon identified an investment opportunity that's already returned 25% in equity. Highly recommend him.",
              },
              {
                name: "Amanda Thompson",
                role: "Relocation",
                quote: "Moving to Phoenix was daunting, but Jon helped us find the perfect neighborhood and home immediately.",
              },
            ].map((testimonial) => (
              <Card key={testimonial.name} padding={20} hover>
                {/* Star rating */}
                <div style={{ display: "flex", gap: 4, marginBottom: 12 }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Icon key={star} name="star" size={16} color="var(--le-gold)" />
                  ))}
                </div>
                <p
                  style={{
                    fontSize: 14,
                    color: "var(--le-text-primary)",
                    lineHeight: 1.6,
                    marginBottom: 14,
                    fontStyle: "italic",
                  }}
                >
                  "{testimonial.quote}"
                </p>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "var(--le-text-primary)" }}>
                    {testimonial.name}
                  </div>
                  <div style={{ fontSize: 12, color: "var(--le-text-secondary)" }}>{testimonial.role}</div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Awards & Certifications */}
      <section className="le-section" style={{ background: "var(--le-bg-surface)" }}>
        <div className="le-container">
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <h2 style={{ fontSize: 28, fontWeight: 700, color: "var(--le-text-primary)", marginBottom: 8 }}>
              Awards & Credentials
            </h2>
            <p style={{ fontSize: 15, color: "var(--le-text-secondary)" }}>
              Industry recognition and professional certifications
            </p>
          </div>
          <div
            ref={awardsRef}
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(4, 1fr)",
              gap: 20,
              opacity: awardsVisible ? 1 : 0,
              transition: "all 0.6s ease",
            }}
          >
            {[
              {
                icon: "award",
                badge: "RE/MAX",
                label: "Hall of Fame",
                color: "var(--le-gold)",
                bgColor: "var(--le-gold-bg)",
              },
              {
                icon: "users",
                badge: "NAR",
                label: "Certified Member",
                color: "var(--le-blue)",
                bgColor: "var(--le-blue-bg)",
              },
              {
                icon: "shield",
                badge: "AZREA",
                label: "Certified Realtor",
                color: "var(--le-green)",
                bgColor: "rgba(110,231,183,0.15)",
              },
              {
                icon: "star",
                badge: "Google",
                label: "4.9/5 Stars",
                color: "var(--le-orange)",
                bgColor: "var(--le-orange-bg)",
              },
            ].map((award) => (
              <Card key={award.label} padding={24} style={{ textAlign: "center" }}>
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    background: award.bgColor,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 16px",
                  }}
                >
                  <Icon name={award.icon} size={28} color={award.color} />
                </div>
                <div style={{ fontSize: 12, fontWeight: 600, color: "var(--le-text-secondary)", marginBottom: 4 }}>
                  {award.badge}
                </div>
                <div style={{ fontSize: 15, fontWeight: 600, color: "var(--le-text-primary)" }}>
                  {award.label}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section
        style={{
          background: "var(--le-sidebar-bg)",
          padding: isMobile ? "48px 0" : "64px 0",
          textAlign: "center",
        }}
      >
        <div className="le-container">
          <h2
            style={{
              fontSize: isMobile ? 28 : 36,
              fontWeight: 700,
              color: "#ffffff",
              marginBottom: 16,
            }}
          >
            Ready to Get Started?
          </h2>
          <p
            style={{
              fontSize: 16,
              color: "rgba(255,255,255,0.8)",
              maxWidth: 500,
              margin: "0 auto 24px",
              lineHeight: 1.6,
            }}
          >
            Whether you're buying, selling, or investing, let's connect and explore your real estate goals together.
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 12,
              flexWrap: isMobile ? "wrap" : "nowrap",
            }}
          >
            <Button
              variant="primary"
              size="lg"
              icon="phone"
              onClick={() => (window.location.href = "/contact")}
            >
              Get in Touch
            </Button>
            <Button
              variant="outline"
              size="lg"
              style={{ color: "#fff", borderColor: "rgba(255,255,255,0.3)" }}
              icon="calendar"
              onClick={() => (window.location.href = "/contact")}
            >
              Schedule a Call
            </Button>
          </div>
        </div>
      </section>

      {/* Google Reviews Badge */}
      <section style={{ background: "var(--le-bg-surface)", padding: isMobile ? "32px 0" : "40px 0" }}>
        <div className="le-container">
          <Card padding={24} style={{ textAlign: "center", maxWidth: 320, margin: "0 auto" }}>
            <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 12 }}>
              <Icon name="star" size={20} color="var(--le-gold)" />
              <Icon name="star" size={20} color="var(--le-gold)" />
              <Icon name="star" size={20} color="var(--le-gold)" />
              <Icon name="star" size={20} color="var(--le-gold)" />
              <Icon name="star" size={20} color="var(--le-gold)" />
            </div>
            <div style={{ fontSize: 24, fontWeight: 700, color: "var(--le-text-primary)", marginBottom: 4 }}>
              4.9 out of 5
            </div>
            <div style={{ fontSize: 13, color: "var(--le-text-secondary)" }}>
              Based on 87 Google reviews from verified clients
            </div>
          </Card>
        </div>
      </section>
    </>
  );
}
