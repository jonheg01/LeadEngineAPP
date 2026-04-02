"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useMobile } from "@/hooks/useMobile";
import { useLeadCapture } from "@/hooks/useLeadCapture";
import { Icon, Button, Card, Badge, Input, SectionHeading } from "./design-system";
import LeadCaptureShell from "./LeadCaptureShell";
import type { LeadFormData } from "./LeadCaptureShell";
import { createIDXProvider, DEFAULT_IDX_CONFIG } from "@/lib/idx-provider";
import type { ListingSummary, ListingSearchParams, SearchResult } from "@/lib/idx-provider";

const idxProvider = createIDXProvider(DEFAULT_IDX_CONFIG);

const PROPERTY_TYPES = ["All", "Single Family", "Condo", "Townhouse", "Multi-Family", "Land"];
const SORT_OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "sqft", label: "Largest" },
];

export default function IDXSearchResults() {
  const isMobile = useMobile();
  const { showCapture, openCapture, closeCapture, submitLead, recordView, isRegistered, captureReason } = useLeadCapture({ gateAfterViews: 4 });

  const [results, setResults] = useState<SearchResult>({ listings: [], total: 0, page: 1, totalPages: 0 });
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<ListingSearchParams>({ sort: "newest" as const });
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Parse initial query from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get("q") || "";
    setQuery(q);
    doSearch({ query: q, sort: "newest" as const });
  }, []);

  const doSearch = useCallback(async (params: ListingSearchParams) => {
    setLoading(true);
    const res = await idxProvider.search(params);
    setResults(res);
    setLoading(false);
  }, []);

  const handleSearch = () => {
    const params: ListingSearchParams = { ...filters, query };
    doSearch(params);
  };

  const handleSubmitLead = async (data: LeadFormData) => submitLead({ ...data, source: data.source || "IDX Search" });

  return (
    <>
      <LeadCaptureShell open={showCapture} onClose={closeCapture} variant="register" source="IDX Search Gate" onSubmit={handleSubmitLead} closable={captureReason !== "gate"} />

      <div className="le-container" style={{ paddingTop: 32, paddingBottom: 64 }}>
        {/* Search Header */}
        <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: 12, marginBottom: 24 }}>
          <div style={{ flex: 1, display: "flex", gap: 8 }}>
            <div style={{ flex: 1, position: "relative" }}>
              <div style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--le-text-tertiary)", pointerEvents: "none" }}>
                <Icon name="search" size={16} />
              </div>
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleSearch()}
                placeholder="City, ZIP, neighborhood, or address..."
                style={{ width: "100%", padding: "12px 14px 12px 40px", borderRadius: "var(--le-radius-md)", border: "1px solid var(--le-border)", background: "var(--le-bg-surface)", color: "var(--le-text-primary)", fontSize: 14, outline: "none" }}
              />
            </div>
            <Button variant="primary" onClick={handleSearch} icon="search">Search</Button>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <Button variant="outline" onClick={() => setShowFilters(!showFilters)} icon="barChart">
              {isMobile ? "" : "Filters"}
            </Button>
            <Button variant={viewMode === "grid" ? "secondary" : "outline"} onClick={() => setViewMode("grid")} style={{ padding: "12px" }}>
              <Icon name="home" size={16} />
            </Button>
            <Button variant={viewMode === "list" ? "secondary" : "outline"} onClick={() => setViewMode("list")} style={{ padding: "12px" }}>
              <Icon name="menu" size={16} />
            </Button>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <Card style={{ marginBottom: 24, animation: "le-slide-up 0.2s ease" }} padding={isMobile ? 16 : 24}>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(5, 1fr)", gap: 16 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: "var(--le-text-secondary)", display: "block", marginBottom: 6 }}>MIN PRICE</label>
                <select onChange={e => setFilters(f => ({ ...f, minPrice: Number(e.target.value) || undefined }))}
                  style={{ width: "100%", padding: "10px 12px", borderRadius: "var(--le-radius-md)", border: "1px solid var(--le-border)", background: "var(--le-bg-surface)", fontSize: 13, color: "var(--le-text-primary)" }}>
                  <option value="">No Min</option>
                  {[100000, 200000, 300000, 400000, 500000, 750000, 1000000].map(p => <option key={p} value={p}>${(p/1000)}K</option>)}
                </select>
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: "var(--le-text-secondary)", display: "block", marginBottom: 6 }}>MAX PRICE</label>
                <select onChange={e => setFilters(f => ({ ...f, maxPrice: Number(e.target.value) || undefined }))}
                  style={{ width: "100%", padding: "10px 12px", borderRadius: "var(--le-radius-md)", border: "1px solid var(--le-border)", background: "var(--le-bg-surface)", fontSize: 13, color: "var(--le-text-primary)" }}>
                  <option value="">No Max</option>
                  {[300000, 500000, 750000, 1000000, 1500000, 2000000, 3000000].map(p => <option key={p} value={p}>${p >= 1000000 ? (p/1000000) + "M" : (p/1000) + "K"}</option>)}
                </select>
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: "var(--le-text-secondary)", display: "block", marginBottom: 6 }}>BEDS</label>
                <select onChange={e => setFilters(f => ({ ...f, beds: Number(e.target.value) || undefined }))}
                  style={{ width: "100%", padding: "10px 12px", borderRadius: "var(--le-radius-md)", border: "1px solid var(--le-border)", background: "var(--le-bg-surface)", fontSize: 13, color: "var(--le-text-primary)" }}>
                  <option value="">Any</option>
                  {[1, 2, 3, 4, 5].map(b => <option key={b} value={b}>{b}+</option>)}
                </select>
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: "var(--le-text-secondary)", display: "block", marginBottom: 6 }}>BATHS</label>
                <select onChange={e => setFilters(f => ({ ...f, baths: Number(e.target.value) || undefined }))}
                  style={{ width: "100%", padding: "10px 12px", borderRadius: "var(--le-radius-md)", border: "1px solid var(--le-border)", background: "var(--le-bg-surface)", fontSize: 13, color: "var(--le-text-primary)" }}>
                  <option value="">Any</option>
                  {[1, 2, 3, 4].map(b => <option key={b} value={b}>{b}+</option>)}
                </select>
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: "var(--le-text-secondary)", display: "block", marginBottom: 6 }}>SORT</label>
                <select value={filters.sort || "newest"} onChange={e => setFilters(f => ({ ...f, sort: e.target.value as ListingSearchParams["sort"] }))}
                  style={{ width: "100%", padding: "10px 12px", borderRadius: "var(--le-radius-md)", border: "1px solid var(--le-border)", background: "var(--le-bg-surface)", fontSize: 13, color: "var(--le-text-primary)" }}>
                  {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 16, flexWrap: "wrap" }}>
              {PROPERTY_TYPES.map(t => (
                <button key={t} onClick={() => setFilters(f => ({ ...f, propertyType: t === "All" ? undefined : t }))}
                  style={{ padding: "6px 14px", borderRadius: "var(--le-radius-full)", border: `1px solid ${filters.propertyType === t || (t === "All" && !filters.propertyType) ? "var(--le-gold)" : "var(--le-border)"}`, background: filters.propertyType === t || (t === "All" && !filters.propertyType) ? "var(--le-gold-bg)" : "transparent", color: filters.propertyType === t || (t === "All" && !filters.propertyType) ? "var(--le-gold)" : "var(--le-text-secondary)", fontSize: 13, fontWeight: 500, cursor: "pointer" }}>
                  {t}
                </button>
              ))}
            </div>
            <div style={{ marginTop: 16, display: "flex", justifyContent: "flex-end" }}>
              <Button variant="primary" size="sm" onClick={handleSearch}>Apply Filters</Button>
            </div>
          </Card>
        )}

        {/* Results Count + Save Search CTA */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <div style={{ fontSize: 14, color: "var(--le-text-secondary)" }}>
            {loading ? "Searching..." : `${results.total} home${results.total !== 1 ? "s" : ""} found`}
          </div>
          {!isRegistered && (
            <Button variant="outline" size="sm" onClick={() => openCapture("cta")} icon="heart">
              Save This Search
            </Button>
          )}
        </div>

        {/* Results Grid */}
        {loading ? (
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : viewMode === "grid" ? "repeat(3, 1fr)" : "1fr", gap: 20 }}>
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="le-skeleton" style={{ height: viewMode === "grid" ? 320 : 140, borderRadius: "var(--le-radius-lg)" }} />
            ))}
          </div>
        ) : results.listings.length === 0 ? (
          <Card padding={48} style={{ textAlign: "center" }}>
            <Icon name="search" size={40} color="var(--le-text-tertiary)" />
            <h3 style={{ fontSize: 18, fontWeight: 600, color: "var(--le-text-primary)", marginTop: 16 }}>No Homes Found</h3>
            <p style={{ fontSize: 14, color: "var(--le-text-secondary)", marginTop: 8 }}>Try adjusting your filters or search a different area.</p>
          </Card>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : viewMode === "grid" ? "repeat(3, 1fr)" : "1fr", gap: 20 }}>
            {results.listings.map(listing => (
              viewMode === "grid" ? (
                <GridListingCard key={listing.id} listing={listing} isRegistered={isRegistered} onView={recordView} onRegister={() => openCapture("cta")} />
              ) : (
                <ListListingCard key={listing.id} listing={listing} isRegistered={isRegistered} isMobile={isMobile} onView={recordView} onRegister={() => openCapture("cta")} />
              )
            ))}
          </div>
        )}

        {/* Pagination */}
        {results.totalPages > 1 && (
          <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 40 }}>
            {Array.from({ length: Math.min(results.totalPages, 5) }).map((_, i) => (
              <button key={i} onClick={() => doSearch({ ...filters, query, page: i + 1 })}
                style={{ width: 40, height: 40, borderRadius: "var(--le-radius-md)", border: `1px solid ${results.page === i + 1 ? "var(--le-gold)" : "var(--le-border)"}`, background: results.page === i + 1 ? "var(--le-gold)" : "var(--le-bg-surface)", color: results.page === i + 1 ? "#fff" : "var(--le-text-primary)", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

function GridListingCard({ listing, isRegistered, onView, onRegister }: { listing: ListingSummary; isRegistered: boolean; onView: () => void; onRegister: () => void }) {
  return (
    <Card hover padding={0} style={{ overflow: "hidden" }} onClick={() => { onView(); window.location.href = `/listing/${listing.id}`; }}>
      <div style={{ height: 200, background: "linear-gradient(135deg, var(--le-bg-sunken), var(--le-bg-surface-2))", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
        <Icon name="home" size={36} color="var(--le-text-tertiary)" />
        <div style={{ position: "absolute", top: 12, left: 12, display: "flex", gap: 6 }}>
          <Badge color="#fff" bg="rgba(16,185,129,0.9)">{listing.status}</Badge>
          {listing.daysOnMarket <= 7 && <Badge color="#fff" bg="var(--le-red)">New</Badge>}
        </div>
        {!isRegistered && (
          <button onClick={e => { e.stopPropagation(); onRegister(); }}
            style={{ position: "absolute", top: 12, right: 12, width: 32, height: 32, borderRadius: "50%", border: "none", background: "rgba(255,255,255,0.9)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon name="heart" size={16} color="var(--le-text-tertiary)" />
          </button>
        )}
      </div>
      <div style={{ padding: "16px 20px 20px" }}>
        <div style={{ fontSize: 22, fontWeight: 700, color: "var(--le-text-primary)", letterSpacing: "-0.02em" }}>${listing.price.toLocaleString()}</div>
        <div style={{ fontSize: 14, fontWeight: 500, color: "var(--le-text-primary)", marginTop: 4 }}>
          {isRegistered ? listing.address : <span style={{ filter: "blur(4px)", userSelect: "none" }}>{listing.address}</span>}
        </div>
        <div style={{ fontSize: 13, color: "var(--le-text-secondary)", marginTop: 2 }}>{listing.city}, {listing.state} {listing.zip}</div>
        <div style={{ display: "flex", gap: 16, marginTop: 12, fontSize: 13, color: "var(--le-text-secondary)" }}>
          <span><strong>{listing.beds}</strong> bed</span>
          <span><strong>{listing.baths}</strong> bath</span>
          <span><strong>{listing.sqft.toLocaleString()}</strong> sqft</span>
        </div>
      </div>
    </Card>
  );
}

function ListListingCard({ listing, isRegistered, isMobile, onView, onRegister }: { listing: ListingSummary; isRegistered: boolean; isMobile: boolean; onView: () => void; onRegister: () => void }) {
  return (
    <Card hover padding={0} style={{ overflow: "hidden" }} onClick={() => { onView(); window.location.href = `/listing/${listing.id}`; }}>
      <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row" }}>
        <div style={{ width: isMobile ? "100%" : 240, height: isMobile ? 180 : "auto", minHeight: 140, background: "linear-gradient(135deg, var(--le-bg-sunken), var(--le-bg-surface-2))", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, position: "relative" }}>
          <Icon name="home" size={32} color="var(--le-text-tertiary)" />
          <div style={{ position: "absolute", top: 10, left: 10 }}><Badge color="#fff" bg="rgba(16,185,129,0.9)">{listing.status}</Badge></div>
        </div>
        <div style={{ flex: 1, padding: "16px 20px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div style={{ fontSize: 20, fontWeight: 700, color: "var(--le-text-primary)" }}>${listing.price.toLocaleString()}</div>
              <div style={{ fontSize: 14, color: "var(--le-text-primary)", marginTop: 2 }}>
                {isRegistered ? listing.address : <span style={{ filter: "blur(4px)", userSelect: "none" }}>{listing.address}</span>}
              </div>
              <div style={{ fontSize: 13, color: "var(--le-text-secondary)" }}>{listing.city}, {listing.state} {listing.zip}</div>
            </div>
            <div style={{ display: "flex", gap: 12, fontSize: 13, color: "var(--le-text-secondary)", flexShrink: 0 }}>
              <span><strong>{listing.beds}</strong> bd</span>
              <span><strong>{listing.baths}</strong> ba</span>
              <span><strong>{listing.sqft.toLocaleString()}</strong> sf</span>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
            <Badge>{listing.propertyType}</Badge>
            <Badge>{listing.daysOnMarket}d on market</Badge>
          </div>
        </div>
      </div>
    </Card>
  );
}
