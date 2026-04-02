"use client";

import React, { useState, useEffect } from "react";
import { useMobile } from "@/hooks/useMobile";
import { useLeadCapture } from "@/hooks/useLeadCapture";
import { Icon, Button, Card, Badge, Input } from "./design-system";
import LeadCaptureShell from "./LeadCaptureShell";
import type { LeadFormData } from "./LeadCaptureShell";
import { createIDXProvider, DEFAULT_IDX_CONFIG } from "@/lib/idx-provider";
import type { ListingDetail as ListingDetailType } from "@/lib/idx-provider";

const idxProvider = createIDXProvider(DEFAULT_IDX_CONFIG);

export default function ListingDetail({ listingId }: { listingId: string }) {
  const isMobile = useMobile();
  const { showCapture, openCapture, closeCapture, submitLead, recordView, isRegistered, captureReason } = useLeadCapture({ gateAfterViews: 3 });
  const [listing, setListing] = useState<ListingDetailType | null>(null);
  const [loading, setLoading] = useState(true);
  const [showingRequested, setShowingRequested] = useState(false);

  useEffect(() => {
    recordView();
    idxProvider.getDetail(listingId).then(d => { setListing(d); setLoading(false); });
  }, [listingId]);

  const handleSubmitLead = async (data: LeadFormData) => submitLead({ ...data, source: data.source || "Listing Detail", notes: `Viewed listing: ${listing?.address || listingId}` });

  if (loading) return (
    <div className="le-container" style={{ paddingTop: 32 }}>
      <div className="le-skeleton" style={{ height: 400, borderRadius: "var(--le-radius-xl)", marginBottom: 24 }} />
      <div className="le-skeleton" style={{ height: 200, borderRadius: "var(--le-radius-lg)" }} />
    </div>
  );

  if (!listing) return (
    <div className="le-container" style={{ paddingTop: 64, textAlign: "center" }}>
      <Icon name="home" size={48} color="var(--le-text-tertiary)" />
      <h2 style={{ fontSize: 22, fontWeight: 700, marginTop: 16, color: "var(--le-text-primary)" }}>Listing Not Found</h2>
      <p style={{ color: "var(--le-text-secondary)", marginTop: 8 }}>This property may have been removed or sold.</p>
      <Button variant="primary" style={{ marginTop: 24 }} onClick={() => window.location.href = "/search"}>Browse All Listings</Button>
    </div>
  );

  return (
    <>
      <LeadCaptureShell open={showCapture} onClose={closeCapture} variant={captureReason === "gate" ? "register" : "showing"} source="Listing Detail" onSubmit={handleSubmitLead} closable={captureReason !== "gate"} />

      <div className="le-container" style={{ paddingTop: 24, paddingBottom: 64 }}>
        {/* Back */}
        <button onClick={() => window.history.back()} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", color: "var(--le-text-secondary)", fontSize: 14, cursor: "pointer", marginBottom: 16 }}>
          <Icon name="arrowRight" size={14} color="var(--le-text-secondary)" /> Back to Search
        </button>

        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 380px", gap: 32 }}>
          {/* Main Content */}
          <div>
            {/* Photo */}
            <div style={{ height: isMobile ? 260 : 440, borderRadius: "var(--le-radius-xl)", background: "linear-gradient(135deg, var(--le-bg-sunken), var(--le-bg-surface-2))", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", marginBottom: 24 }}>
              <Icon name="home" size={64} color="var(--le-text-tertiary)" />
              <div style={{ position: "absolute", top: 16, left: 16, display: "flex", gap: 8 }}>
                <Badge color="#fff" bg="rgba(16,185,129,0.9)">{listing.status}</Badge>
                {listing.daysOnMarket <= 7 && <Badge color="#fff" bg="var(--le-red)">New Listing</Badge>}
              </div>
            </div>

            {/* Price & Address */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: isMobile ? 28 : 36, fontWeight: 700, color: "var(--le-text-primary)", letterSpacing: "-0.02em" }}>${listing.price.toLocaleString()}</div>
              <div style={{ fontSize: 18, fontWeight: 500, color: "var(--le-text-primary)", marginTop: 4 }}>
                {isRegistered ? listing.address : <span style={{ filter: "blur(5px)", userSelect: "none" }}>{listing.address}</span>}
              </div>
              <div style={{ fontSize: 15, color: "var(--le-text-secondary)" }}>{listing.city}, {listing.state} {listing.zip}</div>
            </div>

            {/* Key Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 32 }}>
              {[
                { label: "Bedrooms", value: listing.beds },
                { label: "Bathrooms", value: listing.baths },
                { label: "Sq Ft", value: listing.sqft.toLocaleString() },
                { label: "Year Built", value: listing.yearBuilt },
              ].map(s => (
                <Card key={s.label} padding={isMobile ? 12 : 16} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: isMobile ? 20 : 24, fontWeight: 700, color: "var(--le-text-primary)" }}>{s.value}</div>
                  <div style={{ fontSize: 12, color: "var(--le-text-secondary)", marginTop: 4, textTransform: "uppercase", letterSpacing: "0.04em" }}>{s.label}</div>
                </Card>
              ))}
            </div>

            {/* Description */}
            <Card padding={isMobile ? 20 : 28} style={{ marginBottom: 24 }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--le-text-primary)", marginBottom: 12 }}>About This Home</h3>
              <p style={{ fontSize: 15, color: "var(--le-text-secondary)", lineHeight: 1.7 }}>{listing.description}</p>
            </Card>

            {/* Features */}
            <Card padding={isMobile ? 20 : 28} style={{ marginBottom: 24 }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--le-text-primary)", marginBottom: 16 }}>Features & Details</h3>
              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(3, 1fr)", gap: 12 }}>
                {[
                  { label: "Property Type", value: listing.propertyType || "Single Family" },
                  { label: "Lot Size", value: `${listing.lotSize?.toLocaleString() || "—"} sqft` },
                  { label: "Garage", value: `${listing.garage || 0} car` },
                  { label: "Pool", value: listing.pool ? "Yes" : "No" },
                  { label: "Days on Market", value: listing.daysOnMarket },
                  { label: "MLS #", value: listing.mlsNumber },
                ].map(f => (
                  <div key={f.label}>
                    <div style={{ fontSize: 12, color: "var(--le-text-tertiary)", textTransform: "uppercase", letterSpacing: "0.04em" }}>{f.label}</div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "var(--le-text-primary)", marginTop: 2 }}>{f.value}</div>
                  </div>
                ))}
              </div>
              {listing.features && listing.features.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 20 }}>
                  {listing.features.map(f => <Badge key={f}>{f}</Badge>)}
                </div>
              )}
            </Card>
          </div>

          {/* Sidebar — Agent CTA */}
          <div>
            <Card padding={isMobile ? 20 : 28} style={{ position: isMobile ? "static" : "sticky", top: 96 }}>
              <div style={{ textAlign: "center", marginBottom: 20 }}>
                <div style={{ width: 64, height: 64, borderRadius: "50%", background: "var(--le-gold-bg)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
                  <span style={{ fontSize: 24, fontWeight: 700, color: "var(--le-gold)" }}>JH</span>
                </div>
                <div style={{ fontSize: 16, fontWeight: 700, color: "var(--le-text-primary)" }}>{listing.agentName}</div>
                <div style={{ fontSize: 13, color: "var(--le-text-secondary)" }}>{listing.officeName}</div>
              </div>

              {showingRequested ? (
                <div style={{ textAlign: "center", padding: "16px 0" }}>
                  <Icon name="checkCircle" size={32} color="var(--le-gold)" />
                  <p style={{ fontSize: 14, fontWeight: 600, color: "var(--le-text-primary)", marginTop: 12 }}>Showing Requested!</p>
                  <p style={{ fontSize: 13, color: "var(--le-text-secondary)", marginTop: 4 }}>We&apos;ll reach out within 15 minutes.</p>
                </div>
              ) : (
                <>
                  <Button variant="primary" size="lg" fullWidth onClick={() => { if (!isRegistered) openCapture("showing"); else setShowingRequested(true); }} icon="clock">
                    Request a Showing
                  </Button>
                  <Button variant="outline" size="lg" fullWidth onClick={() => openCapture("general")} icon="mail" style={{ marginTop: 10 }}>
                    Ask a Question
                  </Button>
                  <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                    <Button variant="ghost" fullWidth icon="phone" onClick={() => window.location.href = `tel:${listing.agentPhone}`}>
                      Call
                    </Button>
                    <Button variant="ghost" fullWidth icon="heart" onClick={() => { if (!isRegistered) openCapture("register"); }}>
                      Save
                    </Button>
                  </div>
                </>
              )}

              {/* Mortgage estimate */}
              <div style={{ marginTop: 24, padding: "16px 0 0", borderTop: "1px solid var(--le-border-subtle)" }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: "var(--le-text-secondary)", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 8 }}>EST. MONTHLY PAYMENT</div>
                <div style={{ fontSize: 24, fontWeight: 700, color: "var(--le-text-primary)" }}>
                  ${Math.round((listing.price * 0.8 * 0.065 / 12) / (1 - Math.pow(1 + 0.065/12, -360))).toLocaleString()}/mo
                </div>
                <div style={{ fontSize: 12, color: "var(--le-text-tertiary)", marginTop: 4 }}>20% down, 6.5% rate, 30yr fixed</div>
                <Button variant="outline" size="sm" fullWidth style={{ marginTop: 12 }} onClick={() => window.location.href = "/home-value"}>
                  Get Pre-Approved
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
