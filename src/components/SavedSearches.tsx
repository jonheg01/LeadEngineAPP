"use client";

import React, { useState } from "react";
import { useMobile } from "@/hooks/useMobile";
import {
  Icon,
  Button,
  Card,
  Input,
  Badge,
  SectionHeading,
  Modal,
} from "./design-system";
import { useLeadCapture } from "@/hooks/useLeadCapture";
import { LeadCaptureShell } from "./LeadCaptureShell";

// Mock data for demo saved searches
const DEMO_SEARCHES = [
  {
    id: "1",
    name: "Scottsdale under $800K",
    criteria: {
      location: "Scottsdale, AZ",
      minPrice: null,
      maxPrice: 800000,
      beds: 3,
      baths: "2+",
      propertyType: "any",
      keywords: "",
    },
    newMatches: 4,
    lastAlert: "2 hours ago",
    frequency: "instant",
  },
  {
    id: "2",
    name: "Cave Creek Horse Properties",
    criteria: {
      location: "Cave Creek, AZ",
      minPrice: null,
      maxPrice: null,
      beds: null,
      baths: null,
      propertyType: "any",
      keywords: "horse property, acres, acreage",
    },
    newMatches: 1,
    lastAlert: "1 day ago",
    frequency: "daily",
  },
  {
    id: "3",
    name: "Phoenix Investment < $400K",
    criteria: {
      location: "Phoenix, AZ",
      minPrice: null,
      maxPrice: 400000,
      beds: null,
      baths: null,
      propertyType: "any",
      keywords: "investment, income",
    },
    newMatches: 7,
    lastAlert: "4 hours ago",
    frequency: "instant",
  },
];

interface SavedSearch {
  id: string;
  name: string;
  criteria: {
    location: string;
    minPrice: number | null;
    maxPrice: number | null;
    beds: number | null;
    baths: string | null;
    propertyType: string;
    keywords: string;
  };
  newMatches: number;
  lastAlert: string;
  frequency: "instant" | "daily" | "weekly";
}

interface SearchCriteria {
  location: string;
  minPrice: string;
  maxPrice: string;
  beds: string;
  baths: string;
  propertyType: string;
  keywords: string;
  frequency: "instant" | "daily" | "weekly";
}

export function SaveSearchButton({
  criteria,
  onSave,
}: {
  criteria?: object;
  onSave?: () => void;
}) {
  const { isRegistered, openCapture } = useLeadCapture();
  const [isSaved, setIsSaved] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [searchName, setSearchName] = useState("");
  const [frequency, setFrequency] = useState<"instant" | "daily" | "weekly">(
    "daily"
  );

  const handleClick = () => {
    if (!isRegistered) {
      openCapture("register");
      return;
    }
    setShowModal(true);
  };

  const handleSave = () => {
    setIsSaved(true);
    setShowModal(false);
    onSave?.();
    // Reset after animation
    setTimeout(() => {
      setSearchName("");
      setFrequency("daily");
    }, 500);
  };

  return (
    <>
      <button
        onClick={handleClick}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "6px",
          transition: "background-color 0.2s",
          color: isSaved ? "var(--le-gold)" : "var(--le-text-secondary)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "var(--le-bg-hover)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "transparent";
        }}
        title={isSaved ? "Saved" : "Save search"}
      >
        <Icon name={isSaved ? "heart-filled" : "heart"} size={20} />
      </button>

      {showModal && (
        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title="Save This Search"
        >
          <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "20px" }}>
            <div>
              <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "500", color: "var(--le-text-primary)" }}>
                Search Name
              </label>
              <Input
                type="text"
                placeholder="e.g., Scottsdale Luxury Homes"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
              />
            </div>

            <div>
              <label style={{ display: "block", marginBottom: "12px", fontSize: "14px", fontWeight: "500", color: "var(--le-text-primary)" }}>
                Alert Frequency
              </label>
              <div style={{ display: "flex", gap: "12px" }}>
                {(["instant", "daily", "weekly"] as const).map((freq) => (
                  <button
                    key={freq}
                    onClick={() => setFrequency(freq)}
                    style={{
                      padding: "10px 16px",
                      border: "2px solid",
                      borderColor:
                        frequency === freq
                          ? "var(--le-gold)"
                          : "var(--le-border)",
                      backgroundColor:
                        frequency === freq
                          ? "var(--le-gold-light)"
                          : "transparent",
                      color:
                        frequency === freq
                          ? "var(--le-gold)"
                          : "var(--le-text-secondary)",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontWeight: "500",
                      fontSize: "14px",
                      transition: "all 0.2s",
                    }}
                  >
                    {freq.charAt(0).toUpperCase() + freq.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end", marginTop: "12px" }}>
              <Button
                variant="secondary"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleSave}
                disabled={!searchName.trim()}
              >
                Save Search
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}

function CreateAlertModal({
  isOpen,
  onClose,
  onSave,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSave: (search: SearchCriteria) => void;
}) {
  const [formData, setFormData] = useState<SearchCriteria>({
    location: "",
    minPrice: "",
    maxPrice: "",
    beds: "",
    baths: "",
    propertyType: "any",
    keywords: "",
    frequency: "daily",
  });

  const handleChange = (field: keyof SearchCriteria, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    onSave(formData);
    setFormData({
      location: "",
      minPrice: "",
      maxPrice: "",
      beds: "",
      baths: "",
      propertyType: "any",
      keywords: "",
      frequency: "daily",
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Alert">
      <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "20px" }}>
        <div>
          <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "500", color: "var(--le-text-primary)" }}>
            Location
          </label>
          <Input
            type="text"
            placeholder="City, State or Neighborhood"
            value={formData.location}
            onChange={(e) => handleChange("location", e.target.value)}
          />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <div>
            <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "500", color: "var(--le-text-primary)" }}>
              Min Price
            </label>
            <Input
              type="number"
              placeholder="No minimum"
              value={formData.minPrice}
              onChange={(e) => handleChange("minPrice", e.target.value)}
            />
          </div>
          <div>
            <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "500", color: "var(--le-text-primary)" }}>
              Max Price
            </label>
            <Input
              type="number"
              placeholder="No maximum"
              value={formData.maxPrice}
              onChange={(e) => handleChange("maxPrice", e.target.value)}
            />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <div>
            <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "500", color: "var(--le-text-primary)" }}>
              Bedrooms
            </label>
            <Input
              type="number"
              placeholder="Any"
              value={formData.beds}
              onChange={(e) => handleChange("beds", e.target.value)}
            />
          </div>
          <div>
            <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "500", color: "var(--le-text-primary)" }}>
              Bathrooms
            </label>
            <Input
              type="text"
              placeholder="Any"
              value={formData.baths}
              onChange={(e) => handleChange("baths", e.target.value)}
            />
          </div>
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "500", color: "var(--le-text-primary)" }}>
            Property Type
          </label>
          <select
            value={formData.propertyType}
            onChange={(e) => handleChange("propertyType", e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              border: "1px solid var(--le-border)",
              borderRadius: "6px",
              fontSize: "14px",
              backgroundColor: "var(--le-bg-primary)",
              color: "var(--le-text-primary)",
              cursor: "pointer",
            }}
          >
            <option value="any">Any Type</option>
            <option value="single-family">Single Family</option>
            <option value="condo">Condo</option>
            <option value="townhome">Townhome</option>
            <option value="multi-family">Multi-Family</option>
            <option value="land">Land</option>
          </select>
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "500", color: "var(--le-text-primary)" }}>
            Keywords
          </label>
          <Input
            type="text"
            placeholder="e.g., pool, garage, updated"
            value={formData.keywords}
            onChange={(e) => handleChange("keywords", e.target.value)}
          />
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "12px", fontSize: "14px", fontWeight: "500", color: "var(--le-text-primary)" }}>
            Alert Frequency
          </label>
          <div style={{ display: "flex", gap: "12px" }}>
            {(["instant", "daily", "weekly"] as const).map((freq) => (
              <button
                key={freq}
                onClick={() => handleChange("frequency", freq)}
                style={{
                  padding: "10px 16px",
                  border: "2px solid",
                  borderColor:
                    formData.frequency === freq
                      ? "var(--le-gold)"
                      : "var(--le-border)",
                  backgroundColor:
                    formData.frequency === freq
                      ? "var(--le-gold-light)"
                      : "transparent",
                  color:
                    formData.frequency === freq
                      ? "var(--le-gold)"
                      : "var(--le-text-secondary)",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: "500",
                  fontSize: "14px",
                  transition: "all 0.2s",
                }}
              >
                {freq.charAt(0).toUpperCase() + freq.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end", marginTop: "12px" }}>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={!formData.location.trim()}
          >
            Create Alert
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default function SavedSearchManager() {
  const { isRegistered, openCapture } = useLeadCapture();
  const isMobile = useMobile();
  const [savedSearches, setSavedSearches] = useState<SavedSearch[]>(DEMO_SEARCHES);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [emailFrequency, setEmailFrequency] = useState("daily");
  const [pushNotifications, setPushNotifications] = useState(true);
  const [quietHoursEnabled, setQuietHoursEnabled] = useState(false);
  const [quietHoursStart, setQuietHoursStart] = useState("22:00");
  const [quietHoursEnd, setQuietHoursEnd] = useState("08:00");

  if (!isRegistered) {
    return (
      <div style={{ padding: isMobile ? "20px" : "40px" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <Card style={{ padding: "40px", textAlign: "center" }}>
            <SectionHeading>Manage Your Saved Searches</SectionHeading>
            <p
              style={{
                color: "var(--le-text-secondary)",
                margin: "16px 0 24px",
                fontSize: "16px",
                lineHeight: "1.5",
              }}
            >
              Create custom property alerts and get notified instantly when new
              listings match your criteria.
            </p>
            <Button
              variant="primary"
              onClick={() => openCapture("register")}
              style={{ minWidth: "200px" }}
            >
              Register to Get Started
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  const handleCreateSearch = (criteria: SearchCriteria) => {
    const newSearch: SavedSearch = {
      id: String(savedSearches.length + 1),
      name: `${criteria.location} Search`,
      criteria: {
        location: criteria.location,
        minPrice: criteria.minPrice ? parseInt(criteria.minPrice) : null,
        maxPrice: criteria.maxPrice ? parseInt(criteria.maxPrice) : null,
        beds: criteria.beds ? parseInt(criteria.beds) : null,
        baths: criteria.baths || null,
        propertyType: criteria.propertyType,
        keywords: criteria.keywords,
      },
      newMatches: 0,
      lastAlert: "Just now",
      frequency: criteria.frequency,
    };
    setSavedSearches([newSearch, ...savedSearches]);
    setShowCreateModal(false);
  };

  const handleDeleteSearch = (id: string) => {
    setSavedSearches(savedSearches.filter((s) => s.id !== id));
  };

  const handleFrequencyChange = (id: string, frequency: "instant" | "daily" | "weekly") => {
    setSavedSearches(
      savedSearches.map((s) =>
        s.id === id ? { ...s, frequency } : s
      )
    );
  };

  const formatCriteriaSummary = (criteria: SavedSearch["criteria"]): string => {
    const parts: string[] = [];
    if (criteria.beds) parts.push(`${criteria.beds} bed${criteria.beds > 1 ? "s" : ""}`);
    if (criteria.baths) parts.push(`${criteria.baths} bath${criteria.baths !== "1" ? "s" : ""}`);
    if (criteria.minPrice)
      parts.push(`$${(criteria.minPrice / 1000).toFixed(0)}K+`);
    if (criteria.maxPrice)
      parts.push(`Under $${(criteria.maxPrice / 1000).toFixed(0)}K`);
    if (criteria.keywords) parts.push(criteria.keywords);
    return parts.length > 0 ? parts.join(" • ") : "All properties";
  };

  return (
    <div
      style={{
        padding: isMobile ? "20px" : "40px",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: "40px" }}>
        <SectionHeading>Saved Searches & Alerts</SectionHeading>
        <p
          style={{
            color: "var(--le-text-secondary)",
            margin: "12px 0 0",
            fontSize: "16px",
          }}
        >
          Manage your property alerts and customize notification preferences
        </p>
      </div>

      {/* Create New Alert Button */}
      <div style={{ marginBottom: "40px" }}>
        <Button
          variant="primary"
          onClick={() => setShowCreateModal(true)}
          style={{ display: "flex", alignItems: "center", gap: "8px" }}
        >
          <Icon name="plus" size={18} />
          Create New Alert
        </Button>
      </div>

      {/* Saved Searches Section */}
      <div style={{ marginBottom: "60px" }}>
        <h3
          style={{
            fontSize: "18px",
            fontWeight: "600",
            color: "var(--le-text-primary)",
            marginBottom: "20px",
          }}
        >
          Your Saved Searches ({savedSearches.length})
        </h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile
              ? "1fr"
              : "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "20px",
          }}
        >
          {savedSearches.map((search) => (
            <Card
              key={search.id}
              style={{
                padding: "24px",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                transition: "all 0.2s",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 8px 24px rgba(0,0,0,0.12)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.06)";
              }}
            >
              {/* Search Name & Badge */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px" }}>
                <h4
                  style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "var(--le-text-primary)",
                    margin: 0,
                    flex: 1,
                  }}
                >
                  {search.name}
                </h4>
                {search.newMatches > 0 && (
                  <Badge
                    style={{
                      backgroundColor: "var(--le-gold)",
                      color: "var(--le-text-inverse)",
                      padding: "6px 10px",
                      borderRadius: "4px",
                      fontSize: "12px",
                      fontWeight: "600",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {search.newMatches} New
                  </Badge>
                )}
              </div>

              {/* Criteria Summary */}
              <p
                style={{
                  fontSize: "14px",
                  color: "var(--le-text-secondary)",
                  margin: 0,
                  lineHeight: "1.4",
                }}
              >
                {formatCriteriaSummary(search.criteria)}
              </p>

              {/* Last Alert Time */}
              <p
                style={{
                  fontSize: "13px",
                  color: "var(--le-text-tertiary)",
                  margin: 0,
                }}
              >
                Last alert: {search.lastAlert}
              </p>

              {/* Frequency Toggle */}
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {(["instant", "daily", "weekly"] as const).map((freq) => (
                  <button
                    key={freq}
                    onClick={() => handleFrequencyChange(search.id, freq)}
                    style={{
                      padding: "6px 12px",
                      border: "1px solid",
                      borderColor:
                        search.frequency === freq
                          ? "var(--le-gold)"
                          : "var(--le-border)",
                      backgroundColor:
                        search.frequency === freq
                          ? "var(--le-gold-light)"
                          : "transparent",
                      color:
                        search.frequency === freq
                          ? "var(--le-gold)"
                          : "var(--le-text-secondary)",
                      borderRadius: "4px",
                      fontSize: "12px",
                      fontWeight: "500",
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                  >
                    {freq === "instant" ? "Instant" : freq === "daily" ? "Daily" : "Weekly"}
                  </button>
                ))}
              </div>

              {/* Action Buttons */}
              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  marginTop: "8px",
                  borderTop: "1px solid var(--le-border)",
                  paddingTop: "16px",
                }}
              >
                <Button
                  variant="secondary"
                  onClick={() => handleDeleteSearch(search.id)}
                  style={{ flex: 1, fontSize: "14px" }}
                >
                  Delete
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {savedSearches.length === 0 && (
          <Card style={{ padding: "40px", textAlign: "center" }}>
            <p
              style={{
                color: "var(--le-text-secondary)",
                fontSize: "16px",
                margin: 0,
              }}
            >
              No saved searches yet. Create your first alert to get started.
            </p>
          </Card>
        )}
      </div>

      {/* Alert Preferences Section */}
      <div style={{ borderTop: "1px solid var(--le-border)", paddingTop: "40px" }}>
        <h3
          style={{
            fontSize: "18px",
            fontWeight: "600",
            color: "var(--le-text-primary)",
            marginBottom: "24px",
          }}
        >
          Alert Preferences
        </h3>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: "40px",
            maxWidth: "800px",
          }}
        >
          {/* Email Frequency */}
          <Card style={{ padding: "24px" }}>
            <h4
              style={{
                fontSize: "15px",
                fontWeight: "600",
                color: "var(--le-text-primary)",
                margin: "0 0 16px",
              }}
            >
              Email Frequency
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {(["instant", "daily", "weekly"] as const).map((freq) => (
                <label
                  key={freq}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="radio"
                    name="email-frequency"
                    value={freq}
                    checked={emailFrequency === freq}
                    onChange={(e) => setEmailFrequency(e.target.value)}
                    style={{
                      cursor: "pointer",
                      width: "16px",
                      height: "16px",
                      accentColor: "var(--le-gold)",
                    }}
                  />
                  <span style={{ fontSize: "14px", color: "var(--le-text-primary)" }}>
                    {freq === "instant"
                      ? "Instant notifications"
                      : freq === "daily"
                      ? "Daily digest"
                      : "Weekly digest"}
                  </span>
                </label>
              ))}
            </div>
          </Card>

          {/* Push Notifications */}
          <Card style={{ padding: "24px" }}>
            <h4
              style={{
                fontSize: "15px",
                fontWeight: "600",
                color: "var(--le-text-primary)",
                margin: "0 0 16px",
              }}
            >
              Notifications
            </h4>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                cursor: "pointer",
              }}
            >
              <input
                type="checkbox"
                checked={pushNotifications}
                onChange={(e) => setPushNotifications(e.target.checked)}
                style={{
                  cursor: "pointer",
                  width: "18px",
                  height: "18px",
                  accentColor: "var(--le-gold)",
                }}
              />
              <span style={{ fontSize: "14px", color: "var(--le-text-primary)" }}>
                Enable push notifications
              </span>
            </label>
          </Card>
        </div>

        {/* Quiet Hours */}
        <Card style={{ padding: "24px", marginTop: "24px", maxWidth: "800px" }}>
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              cursor: "pointer",
              marginBottom: "16px",
            }}
          >
            <input
              type="checkbox"
              checked={quietHoursEnabled}
              onChange={(e) => setQuietHoursEnabled(e.target.checked)}
              style={{
                cursor: "pointer",
                width: "18px",
                height: "18px",
                accentColor: "var(--le-gold)",
              }}
            />
            <span
              style={{
                fontSize: "15px",
                fontWeight: "600",
                color: "var(--le-text-primary)",
              }}
            >
              Enable quiet hours
            </span>
          </label>

          {quietHoursEnabled && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "16px",
                padding: "16px",
                backgroundColor: "var(--le-bg-secondary)",
                borderRadius: "6px",
              }}
            >
              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontSize: "13px",
                    fontWeight: "500",
                    color: "var(--le-text-secondary)",
                  }}
                >
                  Start Time
                </label>
                <Input
                  type="time"
                  value={quietHoursStart}
                  onChange={(e) => setQuietHoursStart(e.target.value)}
                />
              </div>
              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontSize: "13px",
                    fontWeight: "500",
                    color: "var(--le-text-secondary)",
                  }}
                >
                  End Time
                </label>
                <Input
                  type="time"
                  value={quietHoursEnd}
                  onChange={(e) => setQuietHoursEnd(e.target.value)}
                />
              </div>
            </div>
          )}
        </Card>
      </div>

      {/* Create Alert Modal */}
      <CreateAlertModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSave={handleCreateSearch}
      />
    </div>
  );
}
