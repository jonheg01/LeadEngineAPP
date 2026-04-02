import { Metadata } from "next";

interface SeoHeadProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: "website" | "article" | "product";
  locale?: string;
}

/**
 * Enhanced metadata helper for per-page SEO configuration.
 * Use this to generate metadata object for individual pages.
 *
 * Example:
 * export const metadata: Metadata = generateSeoMetadata({
 *   title: "Home Value Estimation | LeadEngine",
 *   description: "Get a free home valuation in Phoenix...",
 *   canonicalUrl: "https://realtyclientengine.app/home-value",
 * });
 */
export function generateSeoMetadata(props: SeoHeadProps): Metadata {
  const {
    title = "LeadEngine Real Estate | Phoenix Metro Homes for Sale",
    description = "Search live MLS listings across Phoenix, Scottsdale, Cave Creek, and the entire Valley. Get instant home valuations, neighborhood guides, and expert real estate guidance.",
    canonicalUrl = "https://realtyclientengine.app",
    ogImage = "https://realtyclientengine.app/og-image.jpg",
    ogType = "website",
    locale = "en_US",
  } = props;

  return {
    metadataBase: new URL("https://realtyclientengine.app"),
    title,
    description,
    canonical: canonicalUrl,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "en-US": "https://realtyclientengine.app",
      },
    },
    openGraph: {
      type: ogType,
      locale,
      url: canonicalUrl,
      siteName: "LeadEngine Real Estate",
      title,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: "LeadEngine Real Estate",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
      nocache: false,
    },
  };
}

/**
 * React component that renders enhanced SEO metadata tags in the document head.
 * This is a server component that should be used in the <head> section.
 *
 * Includes:
 * - Canonical URL
 * - Alternate hreflang for en-US
 * - Preconnect hints for performance
 * - Geo-targeting metadata
 * - ICBM coordinates for Phoenix, AZ
 */
export function SeoHeadComponent({
  canonicalUrl = "https://realtyclientengine.app",
}: {
  canonicalUrl?: string;
}) {
  // Phoenix, AZ coordinates (central Phoenix)
  const icbmCoordinates = "33.4484,-112.0742";

  return (
    <>
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Alternate hreflang for language targeting */}
      <link
        rel="alternate"
        hrefLang="en-US"
        href={canonicalUrl}
      />

      {/* Preconnect to critical third-party origins */}
      <link
        rel="preconnect"
        href="https://fonts.googleapis.com"
        crossOrigin="anonymous"
      />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link
        rel="preconnect"
        href="https://api.supabase.co"
        crossOrigin="anonymous"
      />

      {/* DNS prefetch for additional resources */}
      <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      <link rel="dns-prefetch" href="https://www.googletagmanager.com" />

      {/* Geo-targeting metadata */}
      <meta name="geo.region" content="US-AZ" />
      <meta name="geo.placename" content="Phoenix" />
      <meta name="geo.position" content={icbmCoordinates} />
      <meta name="ICBM" content={icbmCoordinates} />

      {/* Additional SEO meta tags */}
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="author" content="Jon Hegreness - LeadEngine Real Estate" />
      <meta name="copyright" content="2024 LeadEngine Real Estate" />

      {/* Mobile optimization */}
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black" />
      <meta
        name="apple-mobile-web-app-title"
        content="LeadEngine Real Estate"
      />
    </>
  );
}

/**
 * Generates structured metadata for neighborhood pages
 */
export function generateNeighborhoodMetadata(
  neighborhood: string,
  description: string
): Metadata {
  const neighborhoodTitle = `${neighborhood.charAt(0).toUpperCase() + neighborhood.slice(1).replace(/-/g, " ")} | Phoenix Real Estate`;

  return generateSeoMetadata({
    title: neighborhoodTitle,
    description,
    canonicalUrl: `https://realtyclientengine.app/neighborhoods/${neighborhood}`,
    ogType: "website",
  });
}

/**
 * Generates structured metadata for article/guide pages
 */
export function generateGuideMetadata(
  title: string,
  description: string,
  slug: string,
  ogImage?: string
): Metadata {
  return generateSeoMetadata({
    title: `${title} | LeadEngine Real Estate`,
    description,
    canonicalUrl: `https://realtyclientengine.app/guides/${slug}`,
    ogImage,
    ogType: "article",
  });
}
