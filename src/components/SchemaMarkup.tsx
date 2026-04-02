import React from "react";

interface Breadcrumb {
  name: string;
  url: string;
}

interface SchemaMarkupProps {
  page?: string;
  breadcrumbs?: Breadcrumb[];
}

export default function SchemaMarkup({
  page = "home",
  breadcrumbs = [],
}: SchemaMarkupProps) {
  // Organization Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "LeadEngine Real Estate",
    url: "https://realtyclientengine.app",
    logo: "https://realtyclientengine.app/logo.png",
    description:
      "Premier real estate platform for Phoenix metro properties with AI-powered tools for buyers and sellers.",
    sameAs: [
      "https://www.facebook.com/leadengine",
      "https://www.instagram.com/leadengine",
      "https://www.linkedin.com/company/leadengine",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "(480) 555-0100",
      contactType: "Customer Service",
    },
  };

  // Local Business Schema
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: "Jon Hegreness - LeadEngine Real Estate",
    url: "https://realtyclientengine.app",
    telephone: "(480) 555-0100",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Phoenix Metropolitan Area",
      addressLocality: "Phoenix",
      addressRegion: "AZ",
      postalCode: "85001",
      addressCountry: "US",
    },
    areaServed: [
      "Phoenix",
      "Scottsdale",
      "Cave Creek",
      "Tempe",
      "Mesa",
      "Chandler",
      "Gilbert",
      "Carefree",
    ],
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
  };

  // Website Schema with SearchAction
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: "https://realtyclientengine.app",
    name: "LeadEngine Real Estate",
    description:
      "Search Phoenix metro homes, get valuations, and find expert guidance.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate:
          "https://realtyclientengine.app/search?q={search_term_string}",
      },
      query_input: "required name=search_term_string",
    },
  };

  // Breadcrumb List Schema
  const breadcrumbItems =
    breadcrumbs.length > 0
      ? breadcrumbs.map((crumb, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: crumb.name,
          item: crumb.url,
        }))
      : [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://realtyclientengine.app",
          },
        ];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbItems,
  };

  // FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How do I search for homes in Phoenix?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Use our advanced search tool to filter by price, location, property type, and more. Browse hundreds of MLS listings updated daily across the Phoenix metro area.",
        },
      },
      {
        "@type": "Question",
        name: "Can I get a free home valuation?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes! Use our Home Value tool to get an instant estimate of your property's worth. Our AI-powered valuation engine analyzes comparable sales and market trends.",
        },
      },
      {
        "@type": "Question",
        name: "What neighborhoods does LeadEngine cover?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We cover the entire Phoenix metropolitan area including Phoenix, Scottsdale, Cave Creek, Carefree, North Scottsdale, and surrounding communities.",
        },
      },
      {
        "@type": "Question",
        name: "How accurate is the mortgage calculator?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our mortgage calculator provides accurate estimates based on current interest rates and your loan parameters. Final approval depends on your lender's terms.",
        },
      },
      {
        "@type": "Question",
        name: "How can I get personalized real estate guidance?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Take our Real Estate Quiz to answer a few questions about your goals. We'll provide personalized recommendations and connect you with expert guidance.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
    </>
  );
}
