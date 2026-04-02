'use client';

import React, { useState, useMemo } from 'react';

// SVG Icons
const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16.667 5.833L8.333 14.167L3.333 9.167" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const XIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 15L15 5M5 5L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const AlertIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 1.667L1.667 17.5h16.666L10 1.667z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10 8.333v3.334M10 13.333h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const StarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 1.5L12.39 7.26h6.23l-5.04 3.67 1.92 5.86L10 13.1l-5.5 4.01 1.92-5.86-5.04-3.67h6.23L10 1.5z" />
  </svg>
);

const DollarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 1.667v16.666M6.667 4.167h6.666c1.838 0 3.334 1.496 3.334 3.333 0 1.838-1.496 3.334-3.334 3.334h-6.666M6.667 10h6.666c1.838 0 3.334 1.496 3.334 3.334 0 1.837-1.496 3.333-3.334 3.333H6.667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ClipboardIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.333 1.667h3.334c.92 0 1.667.746 1.667 1.666v1.667H8.333V3.333c0-.92.746-1.666 1.667-1.666zM5 4.167h10c1.838 0 3.333 1.495 3.333 3.333v9.167c0 1.838-1.495 3.333-3.333 3.333H5c-1.838 0-3.333-1.495-3.333-3.333V7.5c0-1.838 1.495-3.333 3.333-3.333z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Mock Data
const providers = [
  { id: 1, name: 'HomeServe', rating: 4.7, reviews: 2843, annualCost: '$599', serviceCall: '$65-$100', coverage: 'Comprehensive', response: '24 hours', buyersGuide: true },
  { id: 2, name: 'First American Home Warranty', rating: 4.5, reviews: 2156, annualCost: '$549', serviceCall: '$75-$125', coverage: 'Standard', response: '24-48 hours', buyersGuide: true },
  { id: 3, name: 'American Home Shield', rating: 4.6, reviews: 3021, annualCost: '$569', serviceCall: '$50-$100', coverage: 'Comprehensive', response: '24 hours', buyersGuide: true },
  { id: 4, name: 'Select Home Warranty', rating: 4.4, reviews: 1834, annualCost: '$489', serviceCall: '$85-$150', coverage: 'Basic', response: '24-48 hours', buyersGuide: false },
  { id: 5, name: 'Choice Home Warranty', rating: 4.3, reviews: 1245, annualCost: '$519', serviceCall: '$75-$110', coverage: 'Standard', response: '48 hours', buyersGuide: false },
];

const faqItems = [
  {
    question: 'How quickly will someone come to my home after I file a claim?',
    answer: 'Response times vary by provider, typically 24-48 hours. Some providers prioritize emergency repairs like heating or cooling failures. Always check your warranty terms for specific response time guarantees.',
  },
  {
    question: 'Can I negotiate the home warranty as part of my real estate transaction?',
    answer: 'Yes, absolutely! It\u2019s common for sellers to either pay for a buyer\u2019s warranty as a closing cost or for buyers to request it as a negotiation point. This is especially valuable in transactions with older homes.',
  },
  {
    question: 'What\u2019s the difference between a home warranty and homeowners insurance?',
    answer: 'Home insurance covers damage from disasters, theft, and liability. Home warranties cover mechanical breakdowns of systems and appliances. They complement each other \u2014 not compete.',
  },
  {
    question: 'Can I transfer my warranty to a new owner?',
    answer: 'Many warranties allow transfers for a small fee ($75-$150). Some require the new owner to go through underwriting. Check your provider\u2019s policy on transferability before closing.',
  },
  {
    question: 'What\u2019s typically NOT covered?',
    answer: 'Pre-existing conditions, lack of maintenance, swimming pools, spas, commercial equipment, and cosmetic damages are common exclusions. Always review the exclusions list before purchasing.',
  },
  {
    question: 'Is a home warranty worth it for new construction?',
    answer: 'Less critical if the builder\u2019s warranty is still active (typically 1-10 years). However, once builder\u2019s warranty expires, a home warranty becomes more valuable as systems age.',
  },
];

const coverageCategories = [
  {
    name: 'HVAC Systems',
    included: ['Furnace/Boiler', 'Air Conditioner', 'Heat Pump', 'Ductwork'],
    icon: '❄️',
  },
  {
    name: 'Plumbing',
    included: ['Water Lines', 'Drain/Sewer Lines', 'Water Heater', 'Fixtures (Labor)'],
    icon: '💧',
  },
  {
    name: 'Electrical',
    included: ['Electrical Panel', 'Wiring/Outlets', 'Ceiling Fans', 'Built-in Appliances'],
    icon: '⚡',
  },
  {
    name: 'Kitchen Appliances',
    included: ['Refrigerator', 'Dishwasher', 'Microwave', 'Oven/Range', 'Disposal'],
    icon: '🍽️',
  },
  {
    name: 'Laundry & More',
    included: ['Washer/Dryer', 'Water Softener', 'Garage Door', 'Ceiling Fans'],
    icon: '🧺',
  },
];

const claimsSteps = [
  { step: 1, title: 'Call or Submit Online', description: 'Contact your warranty provider\u2019s claim line (24/7) or use their online portal' },
  { step: 2, title: 'Describe the Problem', description: 'Provide details about what\u2019s broken. A customer service rep will ask troubleshooting questions' },
  { step: 3, title: 'Get Dispatch Confirmation', description: 'Your provider will give you a claim number and estimated service window' },
  { step: 4, title: 'Contractor Arrives', description: 'Licensed technician visits your home to diagnose and fix the issue' },
  { step: 5, title: 'Pay Service Call Fee', description: 'You pay only the service call fee (typically $50-$150). Warranty covers parts and labor' },
  { step: 6, title: 'Service Complete', description: 'Contractor fixes the issue. Most warranties guarantee work for 30-90 days' },
];

const redFlags = [
  { flag: 'No Coverage for Pre-Existing Issues', detail: 'Many warranties won\u2019t cover problems that existed before purchase or were known to the inspector' },
  { flag: 'Extremely Low Annual Premium', detail: 'If it sounds too good to be true, it probably is. Super cheap warranties often have high service fees or major exclusions' },
  { flag: 'Vague Coverage Language', detail: 'Avoid warranties that don\u2019t clearly list what\u2019s covered. Get specifics in writing' },
  { flag: 'Poor Customer Service Reviews', detail: 'Read actual customer complaints. Difficult claims processes and delayed service are major red flags' },
  { flag: 'Limited Contractor Network', detail: 'If your area has few contractors, you might face long wait times or need to use contractors you don\u2019t trust' },
  { flag: 'No Transferability Clause', detail: 'If you\u2019re selling soon, confirm the warranty can transfer to the new owner' },
  { flag: 'Unlimited Service Calls with Catch', detail: 'Some warranties limit payouts per year or per item, negating the "unlimited" calls benefit' },
  { flag: 'No Home Inspection Required', detail: 'Serious providers always require an inspection. No requirements might mean they\u2019ll deny most claims' },
];

type CoverageItem = {
  category: string;
  hvac: boolean;
  plumbing: boolean;
  electrical: boolean;
  appliances: boolean;
};

export default function HomeWarrantyGuidePage() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [selectedCoverage, setSelectedCoverage] = useState<Record<string, boolean>>({
    'HVAC Systems': true,
    'Plumbing': true,
    'Kitchen Appliances': true,
    'Laundry & More': false,
  });

  const estimatedCost = useMemo(() => {
    const selectedCount = Object.values(selectedCoverage).filter(Boolean).length;
    const baseCost = 500;
    return baseCost + selectedCount * 80;
  }, [selectedCoverage]);

  const toggleCoverage = (category: string) => {
    setSelectedCoverage((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  return (
    <div style={{ backgroundColor: 'var(--le-bg)' }}>
      {/* Hero Section */}
      <section
        style={{
          padding: '80px 20px',
          background: 'linear-gradient(135deg, var(--le-accent) 0%, rgb(102, 51, 153) 100%)',
          color: 'white',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '48px', fontWeight: '700', marginBottom: '20px', lineHeight: '1.2' }}>
            The Complete Home Warranty Guide
          </h1>
          <p style={{ fontSize: '20px', opacity: '0.95', marginBottom: '30px', lineHeight: '1.6' }}>
            Protect your biggest investment. Understand home warranties, compare providers, and make confident decisions as a buyer, seller, or homeowner.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              style={{
                padding: '14px 32px',
                backgroundColor: 'white',
                color: 'var(--le-accent)',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLButtonElement).style.transform = 'translateY(-2px)';
                (e.target as HTMLButtonElement).style.boxShadow = '0 8px 16px rgba(0,0,0,0.2)';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLButtonElement).style.transform = 'translateY(0)';
                (e.target as HTMLButtonElement).style.boxShadow = 'none';
              }}
            >
              Get Your Quote
            </button>
            <button
              style={{
                padding: '14px 32px',
                backgroundColor: 'rgba(255,255,255,0.2)',
                color: 'white',
                border: '2px solid white',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLButtonElement).style.backgroundColor = 'rgba(255,255,255,0.3)';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLButtonElement).style.backgroundColor = 'rgba(255,255,255,0.2)';
              }}
            >
              Compare Providers
            </button>
          </div>
        </div>
      </section>

      {/* What Home Warranties Cover */}
      <section style={{ padding: '80px 20px', backgroundColor: 'var(--le-bg)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '50px', color: 'var(--le-text)', textAlign: 'center' }}>
            What Home Warranties Cover
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '30px',
            }}
          >
            {coverageCategories.map((category) => (
              <div
                key={category.name}
                style={{
                  padding: '30px',
                  backgroundColor: 'var(--le-surface)',
                  borderRadius: '12px',
                  border: `1px solid var(--le-border)`,
                }}
              >
                <div style={{ fontSize: '32px', marginBottom: '12px' }}>{category.icon}</div>
                <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: 'var(--le-text)' }}>
                  {category.name}
                </h3>
                <ul style={{ listStyle: 'none', padding: '0', margin: '0' }}>
                  {category.included.map((item, idx) => (
                    <li
                      key={idx}
                      style={{
                        padding: '8px 0',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        color: 'var(--le-text-secondary)',
                        fontSize: '14px',
                        borderBottom: idx < category.included.length - 1 ? `1px solid var(--le-border)` : 'none',
                      }}
                    >
                      <span style={{ color: 'var(--le-accent)', fontSize: '16px', fontWeight: 'bold' }}>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Home Warranty vs Home Insurance Comparison */}
      <section style={{ padding: '80px 20px', backgroundColor: 'var(--le-surface)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '50px', color: 'var(--le-text)', textAlign: 'center' }}>
            Home Warranty vs Home Insurance
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: '30px',
            }}
          >
            {[
              {
                title: 'Home Warranty',
                items: [
                  'Covers mechanical breakdown of systems & appliances',
                  'Covers wear and tear from normal use',
                  'Annual premium + service call fees',
                  'For systems/appliances, not the home structure',
                  'Required for real estate transactions',
                  'Can be transferred to new owner',
                ],
              },
              {
                title: 'Home Insurance',
                items: [
                  'Covers damage from disasters, theft, weather',
                  'Does NOT cover normal wear and tear',
                  'Annual premium paid to insurance company',
                  'For the home structure and contents',
                  'Legally required if you have a mortgage',
                  'Transfers with property, not negotiable',
                ],
              },
            ].map((item, idx) => (
              <div
                key={idx}
                style={{
                  padding: '30px',
                  backgroundColor: 'var(--le-bg)',
                  borderRadius: '12px',
                  border: `2px solid var(--le-accent)`,
                }}
              >
                <h3 style={{ fontSize: '22px', fontWeight: '600', marginBottom: '24px', color: 'var(--le-text)' }}>
                  {item.title}
                </h3>
                <ul style={{ listStyle: 'none', padding: '0', margin: '0' }}>
                  {item.items.map((feature, fidx) => (
                    <li
                      key={fidx}
                      style={{
                        padding: '12px 0',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '12px',
                        color: 'var(--le-text-secondary)',
                        fontSize: '14px',
                        borderBottom: fidx < item.items.length - 1 ? `1px solid var(--le-border)` : 'none',
                      }}
                    >
                      <span style={{ color: 'var(--le-accent)', marginTop: '4px', flexShrink: 0 }}>
                        {idx === 0 ? '✓' : '→'}
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div
            style={{
              marginTop: '40px',
              padding: '24px',
              backgroundColor: 'var(--le-bg)',
              borderLeft: `4px solid var(--le-accent)`,
              borderRadius: '8px',
            }}
          >
            <p style={{ margin: '0', color: 'var(--le-text-secondary)', fontSize: '15px', lineHeight: '1.6' }}>
              <strong style={{ color: 'var(--le-text)' }}>Bottom Line:</strong> You need both. Home insurance protects against catastrophic events; home warranties protect against mechanical failures. Think of warranties as an extended maintenance plan for your home\u2019s systems and appliances.
            </p>
          </div>
        </div>
      </section>

      {/* Cost Breakdown */}
      <section style={{ padding: '80px 20px', backgroundColor: 'var(--le-bg)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '50px', color: 'var(--le-text)', textAlign: 'center' }}>
            Cost Breakdown
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px',
              marginBottom: '50px',
            }}
          >
            {[
              { label: 'Basic Plan Annual', value: '$450-$550', detail: 'Essential systems only' },
              { label: 'Standard Plan Annual', value: '$550-$700', detail: 'Most systems & appliances' },
              { label: 'Comprehensive Annual', value: '$700-$900', detail: 'Everything included' },
              { label: 'Service Call Fee', value: '$50-$150', detail: 'Per visit (you pay this)' },
            ].map((item, idx) => (
              <div
                key={idx}
                style={{
                  padding: '24px',
                  backgroundColor: 'var(--le-surface)',
                  borderRadius: '12px',
                  border: `1px solid var(--le-border)`,
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>
                  <DollarIcon />
                </div>
                <p style={{ margin: '0 0 8px 0', color: 'var(--le-text-secondary)', fontSize: '14px' }}>
                  {item.label}
                </p>
                <p style={{ margin: '0', fontSize: '28px', fontWeight: '700', color: 'var(--le-accent)' }}>
                  {item.value}
                </p>
                <p style={{ margin: '8px 0 0 0', color: 'var(--le-text-secondary)', fontSize: '13px' }}>
                  {item.detail}
                </p>
              </div>
            ))}
          </div>

          <div
            style={{
              padding: '40px',
              backgroundColor: 'var(--le-surface)',
              borderRadius: '12px',
              border: `1px solid var(--le-border)`,
            }}
          >
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '24px', color: 'var(--le-text)' }}>
              Example: Year-Long Warranty Costs
            </h3>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'auto 1fr auto',
                gap: '20px',
                alignItems: 'center',
              }}
            >
              {[
                { scenario: 'No claims', cost: '$599 (premium only)' },
                { scenario: 'One service call', cost: '$599 + $75 = $674' },
                { scenario: 'Three service calls', cost: '$599 + ($75 × 3) = $824' },
                { scenario: 'vs. emergency HVAC repair', cost: 'Warranty saves $1,200-$3,000+' },
              ].map((item, idx) => (
                <React.Fragment key={idx}>
                  <span
                    style={{
                      padding: '12px 16px',
                      backgroundColor: 'var(--le-bg)',
                      borderRadius: '6px',
                      fontSize: '14px',
                      color: 'var(--le-text)',
                      fontWeight: '500',
                      gridColumn: '1 / 2',
                    }}
                  >
                    {item.scenario}
                  </span>
                  <div style={{ gridColumn: '2 / 3' }} />
                  <span
                    style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      color: idx < 3 ? 'var(--le-accent)' : 'var(--le-accent)',
                      gridColumn: '3 / 4',
                    }}
                  >
                    {item.cost}
                  </span>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Provider Comparison */}
      <section style={{ padding: '80px 20px', backgroundColor: 'var(--le-surface)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '50px', color: 'var(--le-text)', textAlign: 'center' }}>
            Top 5 Home Warranty Providers
          </h2>
          <div
            style={{
              overflowX: 'auto',
            }}
          >
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                backgroundColor: 'var(--le-bg)',
                borderRadius: '12px',
                overflow: 'hidden',
              }}
            >
              <thead>
                <tr style={{ backgroundColor: 'var(--le-accent)', color: 'white' }}>
                  <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '600' }}>Provider</th>
                  <th style={{ padding: '16px', textAlign: 'center', fontSize: '14px', fontWeight: '600' }}>Rating</th>
                  <th style={{ padding: '16px', textAlign: 'center', fontSize: '14px', fontWeight: '600' }}>Annual Cost</th>
                  <th style={{ padding: '16px', textAlign: 'center', fontSize: '14px', fontWeight: '600' }}>Service Fee</th>
                  <th style={{ padding: '16px', textAlign: 'center', fontSize: '14px', fontWeight: '600' }}>Response</th>
                  <th style={{ padding: '16px', textAlign: 'center', fontSize: '14px', fontWeight: '600' }}>Buyer\u2019s Guide</th>
                </tr>
              </thead>
              <tbody>
                {providers.map((provider, idx) => (
                  <tr
                    key={provider.id}
                    style={{
                      borderBottom: `1px solid var(--le-border)`,
                      backgroundColor: idx % 2 === 0 ? 'transparent' : 'rgba(102, 51, 153, 0.03)',
                    }}
                  >
                    <td style={{ padding: '16px', fontSize: '14px', fontWeight: '600', color: 'var(--le-text)' }}>
                      {provider.name}
                    </td>
                    <td style={{ padding: '16px', textAlign: 'center', fontSize: '14px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                        <span style={{ color: 'var(--le-accent)' }}>
                          {Array.from({ length: 5 }).map((_, i) => (
                            <span key={i} style={{ display: 'inline-block', marginRight: '2px' }}>
                              {i < Math.floor(provider.rating) ? '★' : '☆'}
                            </span>
                          ))}
                        </span>
                        <span style={{ color: 'var(--le-text-secondary)', fontSize: '13px' }}>
                          ({provider.reviews.toLocaleString()})
                        </span>
                      </div>
                    </td>
                    <td style={{ padding: '16px', textAlign: 'center', fontSize: '14px', color: 'var(--le-text)' }}>
                      {provider.annualCost}
                    </td>
                    <td style={{ padding: '16px', textAlign: 'center', fontSize: '14px', color: 'var(--le-text-secondary)' }}>
                      {provider.serviceCall}
                    </td>
                    <td style={{ padding: '16px', textAlign: 'center', fontSize: '14px', color: 'var(--le-text-secondary)' }}>
                      {provider.response}
                    </td>
                    <td style={{ padding: '16px', textAlign: 'center', fontSize: '14px' }}>
                      <div
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '24px',
                          height: '24px',
                          borderRadius: '4px',
                          backgroundColor: provider.buyersGuide ? 'rgba(76, 175, 80, 0.1)' : 'rgba(200, 0, 0, 0.1)',
                        }}
                      >
                        {provider.buyersGuide ? (
                          <span style={{ color: '#4caf50', fontWeight: 'bold' }}>✓</span>
                        ) : (
                          <span style={{ color: '#c80000', fontWeight: 'bold' }}>—</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p
            style={{
              marginTop: '24px',
              color: 'var(--le-text-secondary)',
              fontSize: '14px',
              textAlign: 'center',
            }}
          >
            Ratings and pricing based on 2026 market data. Actual quotes may vary by location and coverage selected.
          </p>
        </div>
      </section>

      {/* When to Get One */}
      <section style={{ padding: '80px 20px', backgroundColor: 'var(--le-bg)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '50px', color: 'var(--le-text)', textAlign: 'center' }}>
            When to Get a Home Warranty
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '30px',
            }}
          >
            {[
              {
                title: 'As a Buyer',
                scenario: 'You\u2019re purchasing a resale home',
                reasons: [
                  'Protection against surprise repairs',
                  'Seller often pays for it as negotiation',
                  'Peace of mind in first year of ownership',
                  'Especially valuable for homes 10+ years old',
                  'Can be negotiated into purchase agreement',
                ],
              },
              {
                title: 'As a Seller',
                scenario: 'You\u2019re selling an older home',
                reasons: [
                  'Removes buyer concern about repairs',
                  'Makes your home more attractive',
                  'Can justify higher asking price',
                  'Speeds up closing process',
                  'Protects you from post-sale disputes',
                ],
              },
              {
                title: 'As a Homeowner',
                scenario: 'You own a home with older systems',
                reasons: [
                  'Home is 7+ years old',
                  'HVAC or water heater is aging',
                  'You want predictable repair costs',
                  'You prefer not to maintain emergency fund',
                  'You plan to stay 3+ more years',
                ],
              },
            ].map((item, idx) => (
              <div
                key={idx}
                style={{
                  padding: '30px',
                  backgroundColor: 'var(--le-surface)',
                  borderRadius: '12px',
                  border: `1px solid var(--le-border)`,
                }}
              >
                <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '8px', color: 'var(--le-text)' }}>
                  {item.title}
                </h3>
                <p style={{ margin: '0 0 20px 0', fontSize: '14px', color: 'var(--le-text-secondary)' }}>
                  {item.scenario}
                </p>
                <ul style={{ listStyle: 'none', padding: '0', margin: '0' }}>
                  {item.reasons.map((reason, ridx) => (
                    <li
                      key={ridx}
                      style={{
                        padding: '10px 0',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '10px',
                        fontSize: '14px',
                        color: 'var(--le-text-secondary)',
                        borderBottom: ridx < item.reasons.length - 1 ? `1px solid var(--le-border)` : 'none',
                      }}
                    >
                      <span style={{ color: 'var(--le-accent)', fontWeight: 'bold', marginTop: '2px' }}>✓</span>
                      {reason}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Claims Process */}
      <section style={{ padding: '80px 20px', backgroundColor: 'var(--le-surface)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '50px', color: 'var(--le-text)', textAlign: 'center' }}>
            How to File a Home Warranty Claim
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px',
            }}
          >
            {claimsSteps.map((item) => (
              <div
                key={item.step}
                style={{
                  padding: '24px',
                  backgroundColor: 'var(--le-bg)',
                  borderRadius: '12px',
                  border: `1px solid var(--le-border)`,
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    backgroundColor: 'var(--le-accent)',
                    color: 'white',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '20px',
                    fontWeight: '700',
                    marginBottom: '16px',
                  }}
                >
                  {item.step}
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px', color: 'var(--le-text)' }}>
                  {item.title}
                </h3>
                <p style={{ margin: '0', fontSize: '14px', color: 'var(--le-text-secondary)', lineHeight: '1.6' }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
          <div
            style={{
              marginTop: '50px',
              padding: '30px',
              backgroundColor: 'var(--le-bg)',
              borderRadius: '12px',
              border: `2px solid var(--le-accent)`,
            }}
          >
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: 'var(--le-text)', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '20px' }}>⏱️</span>
              Pro Tips for Faster Claims
            </h3>
            <ul style={{ listStyle: 'none', padding: '0', margin: '0' }}>
              {[
                'Have your policy number ready when you call',
                'Be specific about what\u2019s not working and when it started',
                'Take photos/videos of the issue before the technician arrives',
                'Ask about emergency options if it\u2019s urgent (heating, cooling, water)',
                'Keep all receipts and documentation',
              ].map((tip, idx) => (
                <li
                  key={idx}
                  style={{
                    padding: '12px 0',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                    fontSize: '14px',
                    color: 'var(--le-text-secondary)',
                    borderBottom: idx < 4 ? `1px solid var(--le-border)` : 'none',
                  }}
                >
                  <span style={{ color: 'var(--le-accent)', fontWeight: 'bold' }}>→</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Red Flags */}
      <section style={{ padding: '80px 20px', backgroundColor: 'var(--le-bg)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '50px', color: 'var(--le-text)', textAlign: 'center' }}>
            Red Flags to Watch Out For
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '24px',
            }}
          >
            {redFlags.map((item, idx) => (
              <div
                key={idx}
                style={{
                  padding: '24px',
                  backgroundColor: 'var(--le-surface)',
                  borderRadius: '12px',
                  border: `1px solid rgba(200, 0, 0, 0.2)`,
                  borderLeft: `4px solid #c80000`,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '8px' }}>
                  <div style={{ color: '#c80000', fontSize: '20px', marginTop: '2px', flexShrink: 0 }}>
                    ⚠️
                  </div>
                  <h3 style={{ fontSize: '15px', fontWeight: '600', color: 'var(--le-text)', margin: '0' }}>
                    {item.flag}
                  </h3>
                </div>
                <p style={{ margin: '0', fontSize: '14px', color: 'var(--le-text-secondary)', lineHeight: '1.6' }}>
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Coverage Calculator */}
      <section style={{ padding: '80px 20px', backgroundColor: 'var(--le-surface)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '40px', color: 'var(--le-text)', textAlign: 'center' }}>
            Coverage Calculator
          </h2>
          <div
            style={{
              padding: '40px',
              backgroundColor: 'var(--le-bg)',
              borderRadius: '12px',
              border: `1px solid var(--le-border)`,
            }}
          >
            <p style={{ margin: '0 0 30px 0', fontSize: '15px', color: 'var(--le-text-secondary)' }}>
              Select the coverage categories you want, and we\u2019ll estimate your annual premium:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px' }}>
              {['HVAC Systems', 'Plumbing', 'Electrical', 'Kitchen Appliances', 'Laundry & More'].map((category) => (
                <label
                  key={category}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '16px',
                    backgroundColor: 'var(--le-surface)',
                    borderRadius: '8px',
                    border: `1px solid var(--le-border)`,
                    cursor: 'pointer',
                    transition: 'background-color 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLLabelElement).style.backgroundColor = 'rgba(102, 51, 153, 0.05)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLLabelElement).style.backgroundColor = 'var(--le-surface)';
                  }}
                >
                  <input
                    type="checkbox"
                    checked={selectedCoverage[category] || false}
                    onChange={() => toggleCoverage(category)}
                    style={{
                      width: '20px',
                      height: '20px',
                      cursor: 'pointer',
                      accentColor: 'var(--le-accent)',
                    }}
                  />
                  <span style={{ fontSize: '15px', fontWeight: '500', color: 'var(--le-text)', flex: 1 }}>
                    {category}
                  </span>
                  <span style={{ fontSize: '13px', color: 'var(--le-text-secondary)' }}>
                    +$80/year
                  </span>
                </label>
              ))}
            </div>

            <div
              style={{
                padding: '24px',
                backgroundColor: 'rgba(102, 51, 153, 0.1)',
                borderRadius: '8px',
                border: `2px solid var(--le-accent)`,
                textAlign: 'center',
              }}
            >
              <p style={{ margin: '0 0 12px 0', fontSize: '14px', color: 'var(--le-text-secondary)' }}>
                Estimated Annual Premium
              </p>
              <p style={{ margin: '0', fontSize: '40px', fontWeight: '700', color: 'var(--le-accent)' }}>
                ${estimatedCost.toLocaleString()}
              </p>
              <p style={{ margin: '12px 0 0 0', fontSize: '13px', color: 'var(--le-text-secondary)' }}>
                Plus $50-$150 per service call
              </p>
            </div>

            <button
              style={{
                width: '100%',
                marginTop: '24px',
                padding: '16px',
                backgroundColor: 'var(--le-accent)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLButtonElement).style.opacity = '0.9';
                (e.target as HTMLButtonElement).style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLButtonElement).style.opacity = '1';
                (e.target as HTMLButtonElement).style.transform = 'translateY(0)';
              }}
            >
              Get Your Custom Quote
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section style={{ padding: '80px 20px', backgroundColor: 'var(--le-bg)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '50px', color: 'var(--le-text)', textAlign: 'center' }}>
            Frequently Asked Questions
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {faqItems.map((item, idx) => (
              <div
                key={idx}
                style={{
                  border: `1px solid var(--le-border)`,
                  borderRadius: '8px',
                  overflow: 'hidden',
                  backgroundColor: 'var(--le-surface)',
                }}
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                  style={{
                    width: '100%',
                    padding: '20px',
                    backgroundColor: 'transparent',
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'background-color 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'rgba(102, 51, 153, 0.05)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
                  }}
                >
                  <h3 style={{ fontSize: '15px', fontWeight: '600', color: 'var(--le-text)', margin: '0' }}>
                    {item.question}
                  </h3>
                  <div
                    style={{
                      color: 'var(--le-accent)',
                      transform: expandedFaq === idx ? 'rotate(180deg)' : 'rotate(0)',
                      transition: 'transform 0.3s',
                      flexShrink: 0,
                      marginLeft: '12px',
                    }}
                  >
                    <ChevronDownIcon />
                  </div>
                </button>
                {expandedFaq === idx && (
                  <div
                    style={{
                      padding: '0 20px 20px 20px',
                      borderTop: `1px solid var(--le-border)`,
                      fontSize: '14px',
                      color: 'var(--le-text-secondary)',
                      lineHeight: '1.6',
                      animation: 'fadeIn 0.3s ease-in',
                    }}
                  >
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Capture CTA Sections */}
      <section style={{ padding: '80px 20px', backgroundColor: 'var(--le-surface)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div
            style={{
              padding: '50px',
              backgroundColor: 'linear-gradient(135deg, var(--le-accent) 0%, rgb(102, 51, 153) 100%)',
              borderRadius: '16px',
              color: 'white',
              textAlign: 'center',
            }}
          >
            <h2 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '16px' }}>
              Ready to Protect Your Home?
            </h2>
            <p style={{ fontSize: '16px', opacity: '0.95', marginBottom: '30px', maxWidth: '600px', margin: '0 auto 30px auto' }}>
              Get a personalized home warranty quote tailored to your coverage needs and budget. Our team makes finding the right plan simple.
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                style={{
                  padding: '14px 32px',
                  backgroundColor: 'white',
                  color: 'var(--le-accent)',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLButtonElement).style.transform = 'translateY(-2px)';
                  (e.target as HTMLButtonElement).style.boxShadow = '0 8px 16px rgba(0,0,0,0.2)';
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLButtonElement).style.transform = 'translateY(0)';
                  (e.target as HTMLButtonElement).style.boxShadow = 'none';
                }}
              >
                Get Free Quote
              </button>
              <button
                style={{
                  padding: '14px 32px',
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  color: 'white',
                  border: '2px solid white',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s',
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLButtonElement).style.backgroundColor = 'rgba(255,255,255,0.3)';
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLButtonElement).style.backgroundColor = 'rgba(255,255,255,0.2)';
                }}
              >
                Compare Providers
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators & Footer CTA */}
      <section style={{ padding: '60px 20px', backgroundColor: 'var(--le-bg)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '30px',
              textAlign: 'center',
            }}
          >
            {[
              { stat: '50,000+', label: 'Homes Protected Annually' },
              { stat: '$2.3B', label: 'In Claims Paid Since 2020' },
              { stat: '98%', label: 'Customer Satisfaction' },
              { stat: '24/7', label: 'Emergency Support' },
            ].map((item, idx) => (
              <div key={idx}>
                <p style={{ fontSize: '32px', fontWeight: '700', color: 'var(--le-accent)', margin: '0 0 8px 0' }}>
                  {item.stat}
                </p>
                <p style={{ fontSize: '14px', color: 'var(--le-text-secondary)', margin: '0' }}>
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section style={{ padding: '60px 20px', backgroundColor: 'var(--le-accent)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', color: 'white' }}>
          <h2 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '16px' }}>
            Still Have Questions?
          </h2>
          <p style={{ fontSize: '16px', opacity: '0.95', marginBottom: '24px' }}>
            Our home warranty experts are ready to help you find the perfect plan for your situation.
          </p>
          <button
            style={{
              padding: '14px 40px',
              backgroundColor: 'white',
              color: 'var(--le-accent)',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLButtonElement).style.transform = 'translateY(-2px)';
              (e.target as HTMLButtonElement).style.boxShadow = '0 8px 16px rgba(0,0,0,0.2)';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLButtonElement).style.transform = 'translateY(0)';
              (e.target as HTMLButtonElement).style.boxShadow = 'none';
            }}
          >
            Talk to an Expert
          </button>
        </div>
      </section>

      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              max-height: 0;
            }
            to {
              opacity: 1;
              max-height: 500px;
            }
          }
        `}
      </style>
    </div>
  );
}
