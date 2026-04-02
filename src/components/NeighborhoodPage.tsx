"use client";

import React, { useState, useEffect } from "react";
import { useMobile } from "@/hooks/useMobile";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Icon, Button, Card, Badge, SectionHeading, StatCounter } from "./design-system";
import { useLeadCapture } from "@/hooks/useLeadCapture";
import LeadCaptureShell from "./LeadCaptureShell";
import type { LeadFormData } from "./LeadCaptureShell";

interface NeighborhoodData {
  name: string;
  slug: string;
  description: string;
  medianPrice: string;
  avgPricePerSqft: string;
  activeListings: number;
  avgDaysOnMarket: number;
  yoyChange: string;
  population: string;
  schools: { name: string; rating: number; type: string }[];
  highlights: string[];
  nearbyAreas: string[];
}

const NEIGHBORHOODS: Record<string, NeighborhoodData> = {
  "scottsdale": { name: "Scottsdale", slug: "scottsdale", description: "Known for luxury living, world-class golf, and vibrant nightlife, Scottsdale offers an exceptional quality of life with stunning desert landscapes and top-rated schools.", medianPrice: "$875,000", avgPricePerSqft: "$385", activeListings: 342, avgDaysOnMarket: 18, yoyChange: "+6.8%", population: "241,000", schools: [{ name: "Basis Scottsdale", rating: 10, type: "Charter" }, { name: "Desert Mountain HS", rating: 9, type: "Public" }, { name: "Scottsdale Unified", rating: 8, type: "District" }], highlights: ["Old Town Arts District", "TPC Scottsdale Golf", "Fashion Square Mall", "McDowell Sonoran Preserve", "Salt River Pima Community"], nearbyAreas: ["Paradise Valley", "Fountain Hills", "Cave Creek", "Carefree"] },
  "phoenix": { name: "Phoenix", slug: "phoenix", description: "Arizona's capital and largest city, Phoenix offers incredible diversity in neighborhoods, price points, and lifestyle. From the historic charm of Arcadia to the urban energy of Roosevelt Row.", medianPrice: "$485,000", avgPricePerSqft: "$265", activeListings: 891, avgDaysOnMarket: 22, yoyChange: "+4.2%", population: "1,680,000", schools: [{ name: "Madison School District", rating: 9, type: "District" }, { name: "ASU Preparatory", rating: 8, type: "Charter" }, { name: "Phoenix Union", rating: 7, type: "District" }], highlights: ["Camelback Mountain", "Desert Botanical Garden", "Roosevelt Row Arts", "South Mountain Park", "Papago Park"], nearbyAreas: ["Scottsdale", "Tempe", "Glendale", "Mesa"] },
  "cave-creek": { name: "Cave Creek", slug: "cave-creek", description: "A charming Western-themed town north of Phoenix, Cave Creek offers a rural lifestyle with stunning desert scenery, horseback riding, and a tight-knit community feel.", medianPrice: "$725,000", avgPricePerSqft: "$310", activeListings: 124, avgDaysOnMarket: 28, yoyChange: "+9.1%", population: "5,800", schools: [{ name: "Cactus Shadows HS", rating: 8, type: "Public" }, { name: "Desert Willow Elementary", rating: 9, type: "Public" }], highlights: ["Spur Cross Ranch", "Cave Creek Trail Rides", "Frontier Town", "Desert Foothills Library", "Bartlett Lake"], nearbyAreas: ["Carefree", "Scottsdale", "Phoenix", "Anthem"] },
  "tempe": { name: "Tempe", slug: "tempe", description: "Home to Arizona State University, Tempe blends college-town energy with family-friendly neighborhoods, light rail access, and Tempe Town Lake.", medianPrice: "$520,000", avgPricePerSqft: "$295", activeListings: 267, avgDaysOnMarket: 16, yoyChange: "+5.4%", population: "185,000", schools: [{ name: "Tempe Preparatory", rating: 9, type: "Charter" }, { name: "Corona del Sol HS", rating: 8, type: "Public" }], highlights: ["Tempe Town Lake", "Mill Avenue", "ASU Campus", "Papago Park", "Tempe Marketplace"], nearbyAreas: ["Phoenix", "Scottsdale", "Mesa", "Chandler"] },
  "chandler": { name: "Chandler", slug: "chandler", description: "A booming tech hub with top-rated schools, Chandler combines suburban comfort with a growing downtown scene and excellent employment opportunities.", medianPrice: "$545,000", avgPricePerSqft: "$275", activeListings: 445, avgDaysOnMarket: 20, yoyChange: "+5.1%", population: "275,000", schools: [{ name: "Chandler Unified", rating: 9, type: "District" }, { name: "Hamilton HS", rating: 9, type: "Public" }], highlights: ["Downtown Chandler", "Intel Campus", "Chandler Fashion Center", "Veterans Oasis Park", "Tumbleweed Park"], nearbyAreas: ["Gilbert", "Tempe", "Mesa", "Phoenix"] },
  "gilbert": { name: "Gilbert", slug: "gilbert", description: "Consistently rated one of the safest cities in America, Gilbert offers award-winning schools, master-planned communities, and a vibrant Heritage District.", medianPrice: "$575,000", avgPricePerSqft: "$280", activeListings: 378, avgDaysOnMarket: 19, yoyChange: "+4.8%", population: "280,000", schools: [{ name: "Gilbert Classical Academy", rating: 10, type: "Charter" }, { name: "Highland HS", rating: 9, type: "Public" }], highlights: ["Heritage District", "Riparian Preserve", "San Tan Village", "Cosmo Dog Park", "Freestone Recreation Center"], nearbyAreas: ["Chandler", "Mesa", "Queen Creek", "San Tan Valley"] },
};

export default function NeighborhoodPage({ slug }: { slug: string }) {
  const isMobile = useMobile();
  const data = NEIGHBORHOODS[slug];
  const { showCapture, openCapture, closeCapture, submitLead, captureReason } = useLeadCapture({});
  const [statsRef, statsVisible] = useScrollReveal();
  const [schoolsRef, schoolsVisible] = useScrollReveal();

  const handleSubmitLead = async (d: LeadFormData) => submitLead({ ...d, source: `Neighborhood: ${data?.name || slug}`, lead_type: "Buyer" });

  if (!data) return (
    <div className="le-container" style={{ paddingTop: 64, textAlign: "center" }}>
      <h2 style={{ fontSize: 22, fontWeight: 700 }}>Neighborhood Not Found</h2>
      <Button variant="primary" style={{ marginTop: 20 }} onClick={() => window.location.href = "/neighborhoods"}>View All Areas</Button>
    </div>
  );

  return (
    <>
      <LeadCaptureShell open={showCapture} onClose={closeCapture} variant="register" source={`Neighborhood: ${data.name}`} onSubmit={handleSubmitLead} closable={captureReason !== "gate"} />

      {/* Hero */}
      <section style={{ background: "var(--le-hero-bg)", padding: isMobile ? "48px 0" : "72px 0", textAlign: "center" }}>
        <div className="le-container">
          <Badge color="#6ee7b7" bg="rgba(110,231,183,0.15)">{data.activeListings} Active Listings</Badge>
          <h1 style={{ fontSize: isMobile ? 32 : 48, fontWeight: 700, color: "#fff", letterSpacing: "-0.03em", marginTop: 16 }}>Homes for Sale in {data.name}</h1>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.7)", maxWidth: 560, margin: "12px auto 28px", lineHeight: 1.6 }}>{data.description}</p>
          <div style={{ display: "flex", justifyContent: "center", gap: 12 }}>
            <Button variant="primary" size="lg" onClick={() => window.location.href = `/search?q=${data.name}`} icon="search">Search {data.name} Homes</Button>
            <Button variant="outline" size="lg" style={{ color: "#fff", borderColor: "rgba(255,255,255,0.3)" }} onClick={() => openCapture("cta")} icon="heart">Get Alerts</Button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section ref={statsRef} style={{ background: "var(--le-bg-surface)", borderBottom: "1px solid var(--le-border-subtle)", padding: isMobile ? "32px 0" : "40px 0" }}>
        <div className="le-container" style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(5, 1fr)", gap: 24, opacity: statsVisible ? 1 : 0, transform: statsVisible ? "translateY(0)" : "translateY(12px)", transition: "all 0.6s ease" }}>
          <StatCounter value={data.medianPrice} label="Median Price" />
          <StatCounter value={data.avgPricePerSqft} label="Avg $/Sq Ft" />
          <StatCounter value={String(data.activeListings)} label="Active Listings" />
          <StatCounter value={String(data.avgDaysOnMarket)} label="Avg Days to Sell" />
          <StatCounter value={data.yoyChange} label="Year over Year" />
        </div>
      </section>

      {/* Schools */}
      <section ref={schoolsRef} className="le-section" style={{ background: "var(--le-bg-app)" }}>
        <div className="le-container">
          <SectionHeading eyebrow="Education" title={`Top Schools in ${data.name}`} subtitle="Highly rated schools are a major draw for families moving to this area." />
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: 16, opacity: schoolsVisible ? 1 : 0, transition: "all 0.6s ease" }}>
            {data.schools.map(s => (
              <Card key={s.name} hover padding={20}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 600, color: "var(--le-text-primary)" }}>{s.name}</div>
                    <div style={{ fontSize: 13, color: "var(--le-text-secondary)", marginTop: 2 }}>{s.type}</div>
                  </div>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: s.rating >= 9 ? "var(--le-gold-bg)" : s.rating >= 7 ? "var(--le-blue-bg)" : "var(--le-orange-bg)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 700, color: s.rating >= 9 ? "var(--le-gold)" : s.rating >= 7 ? "var(--le-blue)" : "var(--le-orange)" }}>
                    {s.rating}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="le-section" style={{ background: "var(--le-bg-surface)" }}>
        <div className="le-container">
          <SectionHeading eyebrow="Things to Do" title={`Living in ${data.name}`} subtitle="Local attractions, parks, and community highlights." />
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            {data.highlights.map(h => (
              <Card key={h} hover padding="14px 20px" style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Icon name="mapPin" size={16} color="var(--le-gold)" />
                <span style={{ fontSize: 14, fontWeight: 500, color: "var(--le-text-primary)" }}>{h}</span>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Nearby Areas */}
      <section className="le-section" style={{ background: "var(--le-bg-app)" }}>
        <div className="le-container">
          <SectionHeading eyebrow="Explore More" title="Nearby Areas" />
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            {data.nearbyAreas.map(a => (
              <Button key={a} variant="outline" onClick={() => window.location.href = `/neighborhoods/${a.toLowerCase().replace(/\s/g, "-")}`} iconRight="arrowRight">
                {a}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "var(--le-hero-bg)", padding: isMobile ? "48px 0" : "64px 0", textAlign: "center" }}>
        <div className="le-container">
          <h2 style={{ fontSize: isMobile ? 24 : 32, fontWeight: 700, color: "#fff", marginBottom: 12 }}>Ready to Call {data.name} Home?</h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.7)", marginBottom: 24 }}>Let us help you find the perfect property in this incredible community.</p>
          <Button variant="primary" size="lg" onClick={() => openCapture("general")}>Connect with an Agent</Button>
        </div>
      </section>
    </>
  );
}

export function NeighborhoodIndex() {
  const isMobile = useMobile();
  const areas = Object.values(NEIGHBORHOODS);

  return (
    <div className="le-container" style={{ paddingTop: 32, paddingBottom: 64 }}>
      <SectionHeading eyebrow="Explore Areas" title="Phoenix Metro Neighborhoods" subtitle="Detailed market data, school ratings, and community insights for every area we serve." center />
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: 20 }}>
        {areas.map(a => (
          <Card key={a.slug} hover padding={24} onClick={() => window.location.href = `/neighborhoods/${a.slug}`}>
            <h3 style={{ fontSize: 20, fontWeight: 700, color: "var(--le-text-primary)", marginBottom: 8 }}>{a.name}</h3>
            <p style={{ fontSize: 14, color: "var(--le-text-secondary)", lineHeight: 1.6, marginBottom: 16 }}>{a.description.slice(0, 120)}...</p>
            <div style={{ display: "flex", gap: 16, fontSize: 13, color: "var(--le-text-secondary)" }}>
              <span>Median: <strong>{a.medianPrice}</strong></span>
              <span><strong>{a.activeListings}</strong> listings</span>
              <span style={{ color: "var(--le-gold)", fontWeight: 600 }}>{a.yoyChange}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 14, fontSize: 14, fontWeight: 600, color: "var(--le-gold)" }}>
              Explore {a.name} <Icon name="arrowRight" size={14} color="var(--le-gold)" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
