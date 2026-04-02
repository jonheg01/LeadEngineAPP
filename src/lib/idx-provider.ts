// ═══════════════════════════════════════════════════════════
// IDX Provider Abstraction Layer
// Supports: SPARK API (broker/owners) + third-party IDX
// services (iHomeFinder, IDX Broker, ShowcaseIDX, etc.)
// Backend handles both — this is the unified interface
// ═══════════════════════════════════════════════════════════

export type IDXProviderType =
  | "spark"           // Direct SPARK/RESO API (broker/owners with their own IDX feed)
  | "ihomefinder"     // iHomeFinder organic MLS
  | "idxbroker"       // IDX Broker
  | "showcaseidx"     // ShowcaseIDX
  | "diverse"         // Diverse Solutions
  | "custom"          // Custom RETS/RESO feed
  | "demo";           // Demo/mock data for development

export interface IDXConfig {
  provider: IDXProviderType;
  /** API key or access token for the provider */
  apiKey?: string;
  /** SPARK API token (for direct SPARK connections) */
  sparkToken?: string;
  /** Base URL for the provider API */
  baseUrl?: string;
  /** MLS ID (required for SPARK) */
  mlsId?: string;
  /** Agent MLS ID for filtering */
  agentMlsId?: string;
  /** Whether to require registration to see full details */
  requireRegistration?: boolean;
  /** Number of free views before gating */
  freeViewLimit?: number;
  /** iframe embed URL for third-party providers */
  embedUrl?: string;
}

export interface ListingSearchParams {
  query?: string;
  city?: string;
  zip?: string;
  neighborhood?: string;
  minPrice?: number;
  maxPrice?: number;
  beds?: number;
  baths?: number;
  propertyType?: string;
  status?: "active" | "pending" | "sold";
  sort?: "price_asc" | "price_desc" | "newest" | "sqft";
  page?: number;
  limit?: number;
  bbox?: { north: number; south: number; east: number; west: number };
}

export interface ListingSummary {
  id: string;
  mlsNumber: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  propertyType: string;
  status: string;
  photos: string[];
  listDate: string;
  daysOnMarket: number;
  latitude?: number;
  longitude?: number;
  /** Whether full details are gated (requires registration) */
  gated?: boolean;
}

export interface ListingDetail extends ListingSummary {
  description: string;
  yearBuilt: number;
  lotSize: number;
  garage: number;
  pool: boolean;
  features: string[];
  agentName: string;
  agentPhone: string;
  agentEmail: string;
  officeName: string;
  virtualTourUrl?: string;
  openHouses?: { date: string; startTime: string; endTime: string }[];
  taxAmount?: number;
  hoaAmount?: number;
  priceHistory?: { date: string; price: number; event: string }[];
}

export interface SearchResult {
  listings: ListingSummary[];
  total: number;
  page: number;
  totalPages: number;
}

// ═══════════════════════════════════════════════════════════
// Provider interface — each provider implements this
// ═══════════════════════════════════════════════════════════

export interface IDXProvider {
  search(params: ListingSearchParams): Promise<SearchResult>;
  getDetail(id: string): Promise<ListingDetail | null>;
  getAutocomplete(query: string): Promise<string[]>;
  /** Whether this provider supports native map search */
  supportsMapSearch: boolean;
  /** Whether this provider renders via iframe embed */
  isEmbedded: boolean;
}

// ═══════════════════════════════════════════════════════════
// Demo provider — development/preview mode
// ═══════════════════════════════════════════════════════════

const DEMO_LISTINGS: ListingSummary[] = [
  {
    id: "demo-1", mlsNumber: "6789012", address: "8234 E Camelback Rd", city: "Scottsdale", state: "AZ", zip: "85251",
    price: 785000, beds: 4, baths: 3, sqft: 2850, propertyType: "Single Family", status: "Active",
    photos: [], listDate: "2026-03-15", daysOnMarket: 18, latitude: 33.5092, longitude: -111.9280,
  },
  {
    id: "demo-2", mlsNumber: "6789013", address: "4521 N 36th St", city: "Phoenix", state: "AZ", zip: "85018",
    price: 549900, beds: 3, baths: 2, sqft: 1950, propertyType: "Single Family", status: "Active",
    photos: [], listDate: "2026-03-20", daysOnMarket: 13, latitude: 33.4800, longitude: -111.9700,
  },
  {
    id: "demo-3", mlsNumber: "6789014", address: "15678 E Cavern Rd", city: "Cave Creek", state: "AZ", zip: "85331",
    price: 1250000, beds: 5, baths: 4, sqft: 4200, propertyType: "Single Family", status: "Active",
    photos: [], listDate: "2026-03-10", daysOnMarket: 23, latitude: 33.8303, longitude: -111.9500,
  },
  {
    id: "demo-4", mlsNumber: "6789015", address: "7890 E McDowell Rd #204", city: "Scottsdale", state: "AZ", zip: "85257",
    price: 385000, beds: 2, baths: 2, sqft: 1200, propertyType: "Condo", status: "Active",
    photos: [], listDate: "2026-03-25", daysOnMarket: 8, latitude: 33.4650, longitude: -111.9180,
  },
  {
    id: "demo-5", mlsNumber: "6789016", address: "2345 W Baseline Rd", city: "Tempe", state: "AZ", zip: "85283",
    price: 425000, beds: 3, baths: 2, sqft: 1680, propertyType: "Townhouse", status: "Active",
    photos: [], listDate: "2026-03-22", daysOnMarket: 11, latitude: 33.3778, longitude: -111.9400,
  },
  {
    id: "demo-6", mlsNumber: "6789017", address: "9012 E Pinnacle Peak Rd", city: "Scottsdale", state: "AZ", zip: "85255",
    price: 2100000, beds: 6, baths: 5, sqft: 5800, propertyType: "Single Family", status: "Active",
    photos: [], listDate: "2026-02-28", daysOnMarket: 33, latitude: 33.7275, longitude: -111.8500,
  },
];

export class DemoProvider implements IDXProvider {
  supportsMapSearch = true;
  isEmbedded = false;

  async search(params: ListingSearchParams): Promise<SearchResult> {
    let results = [...DEMO_LISTINGS];

    if (params.city) results = results.filter(l => l.city.toLowerCase().includes(params.city!.toLowerCase()));
    if (params.zip) results = results.filter(l => l.zip.includes(params.zip!));
    if (params.minPrice) results = results.filter(l => l.price >= params.minPrice!);
    if (params.maxPrice) results = results.filter(l => l.price <= params.maxPrice!);
    if (params.beds) results = results.filter(l => l.beds >= params.beds!);
    if (params.baths) results = results.filter(l => l.baths >= params.baths!);
    if (params.query) {
      const q = params.query.toLowerCase();
      results = results.filter(l =>
        l.address.toLowerCase().includes(q) ||
        l.city.toLowerCase().includes(q) ||
        l.zip.includes(q)
      );
    }

    if (params.sort === "price_asc") results.sort((a, b) => a.price - b.price);
    if (params.sort === "price_desc") results.sort((a, b) => b.price - a.price);
    if (params.sort === "newest") results.sort((a, b) => b.listDate.localeCompare(a.listDate));

    return {
      listings: results,
      total: results.length,
      page: 1,
      totalPages: 1,
    };
  }

  async getDetail(id: string): Promise<ListingDetail | null> {
    const listing = DEMO_LISTINGS.find(l => l.id === id);
    if (!listing) return null;

    return {
      ...listing,
      description: "Beautiful home in a prime location with stunning mountain views. Recently updated kitchen with granite countertops, stainless steel appliances, and custom cabinetry. Open floor plan with vaulted ceilings and abundant natural light.",
      yearBuilt: 2018,
      lotSize: 8500,
      garage: 2,
      pool: true,
      features: ["Pool", "Mountain Views", "Updated Kitchen", "Vaulted Ceilings", "Smart Home", "RV Gate"],
      agentName: "Jon Hegreness",
      agentPhone: "(480) 555-0100",
      agentEmail: "jon@leadengine.com",
      officeName: "RE/MAX Cave Creek",
    };
  }

  async getAutocomplete(query: string): Promise<string[]> {
    const cities = ["Phoenix", "Scottsdale", "Cave Creek", "Carefree", "Tempe", "Mesa", "Chandler", "Gilbert", "Glendale", "Peoria"];
    const zips = ["85251", "85018", "85331", "85257", "85283", "85255", "85260", "85281"];
    const all = [...cities, ...zips];
    return all.filter(s => s.toLowerCase().includes(query.toLowerCase())).slice(0, 6);
  }
}

// ═══════════════════════════════════════════════════════════
// SPARK API provider stub — for broker/owners
// ═══════════════════════════════════════════════════════════

export class SparkProvider implements IDXProvider {
  supportsMapSearch = true;
  isEmbedded = false;
  private config: IDXConfig;

  constructor(config: IDXConfig) {
    this.config = config;
  }

  async search(params: ListingSearchParams): Promise<SearchResult> {
    // TODO: Wire to SPARK/RESO API
    // Endpoint: ${this.config.baseUrl}/v1/listings
    // Auth: Bearer ${this.config.sparkToken}
    // Filter: MLS board = ${this.config.mlsId}
    console.log("[SPARK] Search:", params, "Config:", this.config.mlsId);
    return { listings: [], total: 0, page: 1, totalPages: 0 };
  }

  async getDetail(id: string): Promise<ListingDetail | null> {
    // TODO: Wire to SPARK/RESO API detail endpoint
    console.log("[SPARK] Detail:", id);
    return null;
  }

  async getAutocomplete(query: string): Promise<string[]> {
    // TODO: Wire to SPARK location autocomplete
    return [];
  }
}

// ═══════════════════════════════════════════════════════════
// Third-party embed provider — for agents using IDX services
// Renders the provider's iframe in a wrapper
// ═══════════════════════════════════════════════════════════

export class EmbeddedProvider implements IDXProvider {
  supportsMapSearch = false;
  isEmbedded = true;
  embedUrl: string;

  constructor(config: IDXConfig) {
    this.embedUrl = config.embedUrl || "";
  }

  async search(): Promise<SearchResult> {
    // Embedded providers handle search in their iframe
    return { listings: [], total: 0, page: 1, totalPages: 0 };
  }

  async getDetail(): Promise<ListingDetail | null> {
    return null;
  }

  async getAutocomplete(): Promise<string[]> {
    return [];
  }
}

// ═══════════════════════════════════════════════════════════
// Factory — returns the correct provider based on config
// ═══════════════════════════════════════════════════════════

export function createIDXProvider(config: IDXConfig): IDXProvider {
  switch (config.provider) {
    case "spark":
      return new SparkProvider(config);
    case "ihomefinder":
    case "idxbroker":
    case "showcaseidx":
    case "diverse":
      return new EmbeddedProvider(config);
    case "demo":
    default:
      return new DemoProvider();
  }
}

/** Default config — demo mode for development */
export const DEFAULT_IDX_CONFIG: IDXConfig = {
  provider: "demo",
  requireRegistration: true,
  freeViewLimit: 4,
};
