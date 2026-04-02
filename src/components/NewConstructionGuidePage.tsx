'use client';

import { useState, useMemo } from 'react';

// SVG Icons
const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M17.5 5L7.5 15L2.5 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const XIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChevronUpIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M15 12.5L10 7.5L5 12.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CalculatorIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M7 10H17M7 14H17M7 18H17M10 3V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const WarningIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M12 2L2 20h20L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 9v4M12 17h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const TimelineIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle cx="6" cy="4" r="2" stroke="currentColor" strokeWidth="2" />
    <circle cx="6" cy="12" r="2" stroke="currentColor" strokeWidth="2" />
    <circle cx="6" cy="20" r="2" stroke="currentColor" strokeWidth="2" />
    <path d="M8 4h10M8 12h10M8 20h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M6 6v4M6 14v4" stroke="currentColor" strokeWidth="2" />
  </svg>
);

// Comparison Data
const comparisonData = [
  {
    category: 'Price & Negotiation',
    newBuild: 'Limited negotiation; builder controls terms. May include incentives.',
    resale: 'Highly negotiable; room for haggling and creative deals.',
  },
  {
    category: 'Customization',
    newBuild: 'Choose floor plan, colors, finishes (within builder options).',
    resale: 'Buy as-is or negotiate cosmetic updates pre-closing.',
  },
  {
    category: 'Condition',
    newBuild: 'Brand new, everything works. Full builder warranty.',
    resale: 'May need repairs immediately. Older systems less reliable.',
  },
  {
    category: 'Timeline',
    newBuild: '8-12 months from lot selection to closing.',
    resale: '30-60 days typical. Faster closing process.',
  },
  {
    category: 'Hidden Costs',
    newBuild: 'Homeowners association, upgrade costs, closing costs can surprise.',
    resale: 'Inspection repairs, negotiated concessions, title issues possible.',
  },
  {
    category: 'Financing',
    newBuild: 'Construction loans, builder preferred lenders, possible rate buy-downs.',
    resale: 'Traditional mortgages, no construction phase.',
  },
];

// Builder Selection Criteria
const builderCriteria = [
  {
    title: 'Reputation & Track Record',
    description: 'Check reviews on Google, Zillow, BBB. Ask to visit completed communities.',
    redFlag: 'Multiple unresolved complaints, short company history, or lots of negative reviews.',
  },
  {
    title: 'License & Insurance',
    description: 'Verify state contractor license, liability insurance, and bonding.',
    redFlag: 'No verifiable license, lapsed insurance, or bonding disputes.',
  },
  {
    title: 'Warranty Coverage',
    description: 'Compare structural, mechanical, and cosmetic warranty terms.',
    redFlag: 'Only 1-year warranty or caveat-filled coverage that excludes basics.',
  },
  {
    title: 'Financial Stability',
    description: 'Research company financials, ownership, and project history.',
    redFlag: 'Recent bankruptcies, multiple lawsuits, or constant ownership changes.',
  },
  {
    title: 'Design & Customization',
    description: 'Review available floor plans, upgrade options, and design flexibility.',
    redFlag: 'Limited options, poor design quality, or expensive upgrade markups.',
  },
];

// Timeline Phases
const timelinePhases = [
  {
    phase: 'Phase 1: Lot Selection',
    duration: '2-4 weeks',
    details: 'Choose your lot, sign purchase agreement, pay deposit (usually 5-10%).',
  },
  {
    phase: 'Phase 2: Loan Pre-Approval',
    duration: '2-3 weeks',
    details: 'Get construction loan pre-approval; coordinate with builder\u2019s preferred lenders.',
  },
  {
    phase: 'Phase 3: Design & Customization',
    duration: '4-8 weeks',
    details: 'Select floor plan, colors, finishes, and upgrades. Lock in design.',
  },
  {
    phase: 'Phase 4: Permitting & Site Prep',
    duration: '4-6 weeks',
    details: 'Builder obtains permits and prepares the lot for construction.',
  },
  {
    phase: 'Phase 5: Foundation & Framing',
    duration: '6-8 weeks',
    details: 'Foundation poured, framing erected. You may do your first site walkthrough.',
  },
  {
    phase: 'Phase 6: Rough-In & Systems',
    duration: '4-6 weeks',
    details: 'Plumbing, electrical, HVAC installed. Interior walls framed.',
  },
  {
    phase: 'Phase 7: Finishes & Interior',
    duration: '6-8 weeks',
    details: 'Drywall, flooring, cabinetry, painting, fixture installation.',
  },
  {
    phase: 'Phase 8: Final Walkthrough & Closing',
    duration: '2 weeks',
    details: 'Final inspection, punch list review, closing, keys handed over.',
  },
];

// Upgrade Recommendations
const upgrades = [
  {
    name: 'Upgraded Flooring',
    addValue: true,
    cost: '$3,000 - $8,000',
    reason: 'Quality flooring adds visible, lasting value. Recoup 70-80% at resale.',
  },
  {
    name: 'Premium Appliances',
    addValue: true,
    cost: '$2,000 - $5,000',
    reason: 'Stainless steel, smart features appeal to future buyers.',
  },
  {
    name: 'Updated Kitchen Cabinetry',
    addValue: true,
    cost: '$4,000 - $10,000',
    reason: 'Kitchen is focal point. Better cabinets = higher perceived value.',
  },
  {
    name: 'Added Outdoor Living Space',
    addValue: true,
    cost: '$2,000 - $6,000',
    reason: 'Deck, patio, or expanded porch directly increases livability.',
  },
  {
    name: 'Smart Home Prewiring',
    addValue: true,
    cost: '$1,000 - $3,000',
    reason: 'Wiring infrastructure is inexpensive now; expensive after closing.',
  },
  {
    name: 'Extended Paint Colors',
    addValue: false,
    cost: '$500 - $1,500',
    reason: 'Trendy paint gets outdated quickly. Basic white/neutral works long-term.',
  },
  {
    name: 'Granite Upgrades Everywhere',
    addValue: false,
    cost: '$2,000 - $4,000',
    reason: 'Not every surface needs premium finishes. Buyers may prefer modern quartz anyway.',
  },
  {
    name: 'Luxury Tile Bathrooms',
    addValue: false,
    cost: '$1,500 - $3,000',
    reason: 'Unless it\u2019s a luxury segment, modest tile works fine.',
  },
  {
    name: 'Oversized Garage',
    addValue: false,
    cost: '$5,000 - $12,000',
    reason: 'Most buyers don\u2019t need 4-car garages. Expensive add-on with limited ROI.',
  },
];

// Warranty Information
const warrantiesInfo = [
  {
    type: 'Structural Warranty',
    duration: '10 years',
    covers: 'Foundation, roof, framing, load-bearing walls.',
    process: 'Submit claim to builder within warranty period. May require inspection.',
  },
  {
    type: 'Mechanical Warranty',
    duration: '1-2 years',
    covers: 'HVAC, plumbing, electrical systems, water heater.',
    process: 'Call builder service; they schedule repair or replacement.',
  },
  {
    type: 'Cosmetic Warranty',
    duration: '1 year',
    covers: 'Paint, drywall, trim, finish work, minor defects.',
    process: 'Document defects during walkthrough. Builder addresses in punch list.',
  },
  {
    type: 'Roof Warranty',
    duration: '20-30 years',
    covers: 'Shingles, membrane, flashing (varies by builder).',
    process: 'Register warranty separately. Keep documentation for future claims.',
  },
];

// FAQ Data
const faqData = [
  {
    question: 'Do I need a home inspection on a new build?',
    answer: 'Yes, absolutely. New homes are not perfect. A third-party inspection catches builder mistakes, missed items, and defects before closing. This is separate from the builder\u2019s walkthrough.',
  },
  {
    question: 'Can I negotiate the price of a new build?',
    answer: 'Limited negotiation is possible, especially in slower markets. Instead of price cuts, negotiate builder incentives: closing cost credits, upgraded appliances, or extended warranties.',
  },
  {
    question: 'What\u2019s the difference between a construction loan and a mortgage?',
    answer: 'A construction loan funds the building process (interest-only payments during construction). At closing, you convert to a permanent mortgage. Some builders offer loans that combine both phases.',
  },
  {
    question: 'Am I locked into the builder\u2019s preferred lender?',
    answer: 'No. You can shop your own lender, but builder preferred lenders often offer better rates and incentives. Always compare terms and rates.',
  },
  {
    question: 'What should I look for during the final walkthrough?',
    answer: 'Check every fixture, test all systems, review the punch list, inspect for cosmetic defects, check for water damage, and verify all promised upgrades are installed. Bring your inspection report.',
  },
  {
    question: 'Are homeowners association fees included in new builds?',
    answer: 'Often yes. HOA communities control shared spaces, maintenance, and amenities. Review HOA rules, fees (can be $200-$1,000+ monthly), and restrictions before buying.',
  },
  {
    question: 'Can I make changes after signing?',
    answer: 'Early changes (during design phase) are possible but expensive. Once framing starts, changes become very costly or impossible. Lock in your design early.',
  },
  {
    question: 'What if the builder goes bankrupt?',
    answer: 'This is risky. Check builder financial stability and bonding. Ask if your deposit is held in escrow. Get title insurance. In some cases, you may recover losses through bonds or legal action.',
  },
];

// Main Component
export default function NewConstructionGuidePage() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [budgetBase, setBudgetBase] = useState(350000);
  const [selectedUpgrades, setSelectedUpgrades] = useState<string[]>([]);
  const [expandedPhase, setExpandedPhase] = useState<number | null>(null);

  // Budget calculation
  const upgradeCosts = useMemo(() => {
    return selectedUpgrades.reduce((sum, upgradeName) => {
      const upgrade = upgrades.find((u) => u.name === upgradeName);
      if (upgrade) {
        // Parse first number in cost range
        const costMatch = upgrade.cost.match(/\$(\d+)/);
        return sum + (costMatch ? parseInt(costMatch[1]) : 0);
      }
      return sum;
    }, 0);
  }, [selectedUpgrades]);

  const totalBudget = budgetBase + upgradeCosts;

  const toggleUpgrade = (name: string) => {
    setSelectedUpgrades((prev) =>
      prev.includes(name) ? prev.filter((u) => u !== name) : [...prev, name]
    );
  };

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const togglePhase = (index: number) => {
    setExpandedPhase(expandedPhase === index ? null : index);
  };

  return (
    <div
      style={{
        backgroundColor: 'var(--le-bg)',
        color: 'var(--le-text)',
        fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      {/* Hero Section */}
      <section
        style={{
          background: `linear-gradient(135deg, var(--le-accent) 0%, var(--le-surface) 100%)`,
          padding: '80px 20px',
          textAlign: 'center',
          borderBottom: '1px solid var(--le-border)',
        }}
      >
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h1
            style={{
              fontSize: '3.5rem',
              fontWeight: 'bold',
              marginBottom: '20px',
              lineHeight: '1.2',
              color: 'white',
            }}
          >
            The Complete Guide to Buying New Construction
          </h1>
          <p
            style={{
              fontSize: '1.3rem',
              color: 'rgba(255, 255, 255, 0.9)',
              marginBottom: '0',
              lineHeight: '1.6',
            }}
          >
            Everything you need to know about builder selection, customization, warranties, financing, and closing on your dream new home.
          </p>
        </div>
      </section>

      {/* New Build vs Resale Comparison */}
      <section style={{ padding: '80px 20px', borderBottom: '1px solid var(--le-border)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2
            style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              marginBottom: '50px',
              textAlign: 'center',
            }}
          >
            New Build vs. Resale: Head-to-Head
          </h2>
          <div
            style={{
              overflowX: 'auto',
              borderRadius: '8px',
              border: '1px solid var(--le-border)',
            }}
          >
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                backgroundColor: 'var(--le-surface)',
              }}
            >
              <thead>
                <tr style={{ borderBottom: '2px solid var(--le-border)' }}>
                  <th
                    style={{
                      padding: '16px',
                      textAlign: 'left',
                      fontWeight: 'bold',
                      color: 'var(--le-text)',
                      backgroundColor: 'var(--le-bg)',
                    }}
                  >
                    Category
                  </th>
                  <th
                    style={{
                      padding: '16px',
                      textAlign: 'left',
                      fontWeight: 'bold',
                      color: 'var(--le-text)',
                      backgroundColor: 'var(--le-bg)',
                    }}
                  >
                    New Build
                  </th>
                  <th
                    style={{
                      padding: '16px',
                      textAlign: 'left',
                      fontWeight: 'bold',
                      color: 'var(--le-text)',
                      backgroundColor: 'var(--le-bg)',
                    }}
                  >
                    Resale
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, idx) => (
                  <tr
                    key={idx}
                    style={{
                      borderBottom: '1px solid var(--le-border)',
                      backgroundColor: idx % 2 === 0 ? 'var(--le-surface)' : 'var(--le-bg)',
                    }}
                  >
                    <td style={{ padding: '16px', fontWeight: '600' }}>{row.category}</td>
                    <td style={{ padding: '16px', color: 'var(--le-text-secondary)' }}>
                      {row.newBuild}
                    </td>
                    <td style={{ padding: '16px', color: 'var(--le-text-secondary)' }}>
                      {row.resale}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Builder Selection Guide */}
      <section style={{ padding: '80px 20px', borderBottom: '1px solid var(--le-border)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2
            style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              marginBottom: '50px',
              textAlign: 'center',
            }}
          >
            Builder Selection Guide
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '30px' }}>
            {builderCriteria.map((criterion, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: 'var(--le-surface)',
                  border: '1px solid var(--le-border)',
                  borderRadius: '8px',
                  padding: '30px',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.transform = 'translateY(-4px)';
                  el.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.1)';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.transform = 'translateY(0)';
                  el.style.boxShadow = 'none';
                }}
              >
                <h3
                  style={{
                    fontSize: '1.3rem',
                    fontWeight: '700',
                    marginBottom: '12px',
                    color: 'var(--le-accent)',
                  }}
                >
                  {criterion.title}
                </h3>
                <p
                  style={{
                    color: 'var(--le-text-secondary)',
                    marginBottom: '16px',
                    lineHeight: '1.6',
                  }}
                >
                  {criterion.description}
                </p>
                <div
                  style={{
                    backgroundColor: 'rgba(220, 38, 38, 0.08)',
                    border: '1px solid rgba(220, 38, 38, 0.2)',
                    borderRadius: '6px',
                    padding: '12px',
                    display: 'flex',
                    gap: '8px',
                  }}
                >
                  <div style={{ color: 'rgb(220, 38, 38)', flexShrink: 0 }}>
                    <WarningIcon />
                  </div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--le-text)' }}>
                    <strong>Red Flag:</strong> {criterion.redFlag}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section style={{ padding: '80px 20px', borderBottom: '1px solid var(--le-border)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
              <TimelineIcon />
            </div>
            <h2
              style={{
                fontSize: '2.5rem',
                fontWeight: 'bold',
              }}
            >
              The New Construction Timeline
            </h2>
            <p
              style={{
                fontSize: '1.1rem',
                color: 'var(--le-text-secondary)',
                marginTop: '12px',
              }}
            >
              From lot selection to keys in hand: expect 8-12 months
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {timelinePhases.map((item, idx) => (
              <div key={idx}>
                <button
                  onClick={() => togglePhase(idx)}
                  style={{
                    width: '100%',
                    backgroundColor: 'var(--le-surface)',
                    border: '1px solid var(--le-border)',
                    borderRadius: '8px',
                    padding: '20px',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLButtonElement;
                    el.style.backgroundColor = 'var(--le-bg)';
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLButtonElement;
                    el.style.backgroundColor = 'var(--le-surface)';
                  }}
                >
                  <div style={{ textAlign: 'left' }}>
                    <h4
                      style={{
                        fontSize: '1.1rem',
                        fontWeight: '600',
                        marginBottom: '4px',
                      }}
                    >
                      {item.phase}
                    </h4>
                    <p
                      style={{
                        fontSize: '0.9rem',
                        color: 'var(--le-accent)',
                        fontWeight: '600',
                      }}
                    >
                      {item.duration}
                    </p>
                  </div>
                  <div style={{ color: 'var(--le-accent)' }}>
                    {expandedPhase === idx ? <ChevronUpIcon /> : <ChevronDownIcon />}
                  </div>
                </button>
                {expandedPhase === idx && (
                  <div
                    style={{
                      backgroundColor: 'var(--le-bg)',
                      border: '1px solid var(--le-border)',
                      borderTop: 'none',
                      borderRadius: '0 0 8px 8px',
                      padding: '20px',
                      color: 'var(--le-text-secondary)',
                      lineHeight: '1.6',
                    }}
                  >
                    {item.details}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customization & Upgrades */}
      <section style={{ padding: '80px 20px', borderBottom: '1px solid var(--le-border)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2
            style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              marginBottom: '50px',
              textAlign: 'center',
            }}
          >
            Customization: What Adds Value
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
            {upgrades.map((upgrade, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: 'var(--le-surface)',
                  border: `2px solid ${upgrade.addValue ? 'var(--le-accent)' : 'rgba(127, 127, 127, 0.2)'}`,
                  borderRadius: '8px',
                  padding: '24px',
                  opacity: upgrade.addValue ? 1 : 0.75,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                    marginBottom: '12px',
                  }}
                >
                  <div
                    style={{
                      marginTop: '2px',
                      color: upgrade.addValue ? 'var(--le-accent)' : 'rgba(127, 127, 127, 0.5)',
                    }}
                  >
                    {upgrade.addValue ? <CheckIcon /> : <XIcon />}
                  </div>
                  <div>
                    <h4
                      style={{
                        fontSize: '1.1rem',
                        fontWeight: '700',
                        marginBottom: '4px',
                      }}
                    >
                      {upgrade.name}
                    </h4>
                    <p
                      style={{
                        fontSize: '0.9rem',
                        color: 'var(--le-accent)',
                        fontWeight: '600',
                      }}
                    >
                      {upgrade.cost}
                    </p>
                  </div>
                </div>
                <p
                  style={{
                    color: 'var(--le-text-secondary)',
                    fontSize: '0.95rem',
                    lineHeight: '1.6',
                  }}
                >
                  {upgrade.reason}
                </p>
                <div
                  style={{
                    fontSize: '0.8rem',
                    marginTop: '12px',
                    padding: '8px 12px',
                    backgroundColor: upgrade.addValue ? 'rgba(51, 210, 130, 0.1)' : 'rgba(127, 127, 127, 0.1)',
                    borderRadius: '4px',
                    color: upgrade.addValue ? 'var(--le-accent)' : 'var(--le-text-secondary)',
                    fontWeight: '500',
                  }}
                >
                  {upgrade.addValue ? 'Strong ROI' : 'Limited ROI'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Warranty Guide */}
      <section style={{ padding: '80px 20px', borderBottom: '1px solid var(--le-border)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2
            style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              marginBottom: '50px',
              textAlign: 'center',
            }}
          >
            Understanding Builder Warranties
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
            {warrantiesInfo.map((warranty, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: 'var(--le-surface)',
                  border: '1px solid var(--le-border)',
                  borderRadius: '8px',
                  padding: '28px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '16px',
                  }}
                >
                  <h3
                    style={{
                      fontSize: '1.2rem',
                      fontWeight: '700',
                      color: 'var(--le-accent)',
                    }}
                  >
                    {warranty.type}
                  </h3>
                  <span
                    style={{
                      backgroundColor: 'var(--le-accent)',
                      color: 'white',
                      padding: '6px 12px',
                      borderRadius: '4px',
                      fontSize: '0.85rem',
                      fontWeight: '600',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {warranty.duration}
                  </span>
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <p
                    style={{
                      fontSize: '0.9rem',
                      color: 'var(--le-text-secondary)',
                      marginBottom: '8px',
                    }}
                  >
                    <strong>Covers:</strong> {warranty.covers}
                  </p>
                  <p
                    style={{
                      fontSize: '0.9rem',
                      color: 'var(--le-text-secondary)',
                    }}
                  >
                    <strong>Process:</strong> {warranty.process}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inspection Importance */}
      <section
        style={{
          padding: '80px 20px',
          backgroundColor: 'var(--le-surface)',
          borderBottom: '1px solid var(--le-border)',
        }}
      >
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2
            style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              marginBottom: '30px',
              textAlign: 'center',
            }}
          >
            Why Inspections Matter on New Builds
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px',
              marginBottom: '40px',
            }}
          >
            {[
              {
                title: 'Builders Aren\u2019t Perfect',
                description: 'Construction mistakes happen. Third-party inspectors catch defects you\u2019d miss.',
              },
              {
                title: 'Separate from Walkthrough',
                description: 'Builder walkthrough promotes the home. Inspector advocates for YOU.',
              },
              {
                title: 'Creates Bargaining Power',
                description: 'Inspection report gives you leverage to request repairs before closing.',
              },
              {
                title: 'Protects Warranty',
                description: 'Documented defects before closing qualify for warranty coverage.',
              },
              {
                title: 'Catches Code Violations',
                description: 'Inspectors verify work meets building codes and permits.',
              },
              {
                title: 'Long-Term Peace of Mind',
                description: 'Know your home is built right before you sign the deed.',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: 'var(--le-bg)',
                  border: '1px solid var(--le-border)',
                  borderRadius: '8px',
                  padding: '20px',
                }}
              >
                <h4
                  style={{
                    fontSize: '1.05rem',
                    fontWeight: '700',
                    marginBottom: '8px',
                    color: 'var(--le-accent)',
                  }}
                >
                  {item.title}
                </h4>
                <p
                  style={{
                    fontSize: '0.95rem',
                    color: 'var(--le-text-secondary)',
                    lineHeight: '1.5',
                  }}
                >
                  {item.description}
                </p>
              </div>
            ))}
          </div>
          <div
            style={{
              backgroundColor: 'var(--le-bg)',
              border: '2px solid var(--le-accent)',
              borderRadius: '8px',
              padding: '24px',
              textAlign: 'center',
            }}
          >
            <p
              style={{
                fontSize: '1rem',
                fontWeight: '600',
                color: 'var(--le-text)',
                lineHeight: '1.6',
              }}
            >
              Best Practice: Hire a certified inspector at least 7-10 days before final closing. Budget $300-$600 for a comprehensive new construction inspection.
            </p>
          </div>
        </div>
      </section>

      {/* Financing Section */}
      <section style={{ padding: '80px 20px', borderBottom: '1px solid var(--le-border)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2
            style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              marginBottom: '50px',
              textAlign: 'center',
            }}
          >
            Financing New Construction
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '30px',
            }}
          >
            {[
              {
                title: 'Construction Loan',
                description: 'Funds the building process. Interest-only payments during construction. Converts to mortgage at closing.',
              },
              {
                title: 'Builder Preferred Lenders',
                description: 'Often offer better rates and incentives. Compare with other lenders. Not mandatory.',
              },
              {
                title: 'Builder Incentives',
                description: 'Closing cost credits, upgraded appliances, rate buy-downs, extended warranties.',
              },
              {
                title: 'Pre-Approval Timeline',
                description: 'Get construction loan pre-approval before selecting lot. Coordinates with builder timeline.',
              },
              {
                title: 'Rate Locks',
                description: 'Discuss rate lock options. Some builders offer guaranteed rates; others lock at construction start.',
              },
              {
                title: 'Down Payment',
                description: 'Typically 5-10% on lot (earnest money), then 20% of home price for loan approval.',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: 'var(--le-surface)',
                  border: '1px solid var(--le-border)',
                  borderRadius: '8px',
                  padding: '24px',
                }}
              >
                <h3
                  style={{
                    fontSize: '1.15rem',
                    fontWeight: '700',
                    marginBottom: '12px',
                    color: 'var(--le-accent)',
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    color: 'var(--le-text-secondary)',
                    lineHeight: '1.6',
                    fontSize: '0.95rem',
                  }}
                >
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Budget Planner */}
      <section
        style={{
          padding: '80px 20px',
          backgroundColor: 'var(--le-surface)',
          borderBottom: '1px solid var(--le-border)',
        }}
      >
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
              <CalculatorIcon />
            </div>
            <h2
              style={{
                fontSize: '2.5rem',
                fontWeight: 'bold',
              }}
            >
              Interactive Budget Planner
            </h2>
            <p
              style={{
                fontSize: '1rem',
                color: 'var(--le-text-secondary)',
                marginTop: '12px',
              }}
            >
              See how upgrades impact your total investment
            </p>
          </div>

          <div
            style={{
              backgroundColor: 'var(--le-bg)',
              border: '1px solid var(--le-border)',
              borderRadius: '8px',
              padding: '30px',
              marginBottom: '30px',
            }}
          >
            <div style={{ marginBottom: '30px' }}>
              <label
                style={{
                  display: 'block',
                  fontSize: '1rem',
                  fontWeight: '600',
                  marginBottom: '12px',
                }}
              >
                Base Home Price: ${budgetBase.toLocaleString()}
              </label>
              <input
                type="range"
                min="250000"
                max="800000"
                step="10000"
                value={budgetBase}
                onChange={(e) => setBudgetBase(Number(e.target.value))}
                style={{
                  width: '100%',
                  height: '8px',
                  borderRadius: '4px',
                  background: 'var(--le-border)',
                  outline: 'none',
                  accentColor: 'var(--le-accent)',
                }}
              />
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginTop: '8px',
                  fontSize: '0.85rem',
                  color: 'var(--le-text-secondary)',
                }}
              >
                <span>$250K</span>
                <span>$800K</span>
              </div>
            </div>

            <div>
              <h4
                style={{
                  fontSize: '1rem',
                  fontWeight: '600',
                  marginBottom: '16px',
                }}
              >
                Select Upgrades:
              </h4>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                  gap: '12px',
                }}
              >
                {upgrades
                  .filter((u) => u.addValue)
                  .map((upgrade) => (
                    <label
                      key={upgrade.name}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '12px',
                        backgroundColor: 'var(--le-surface)',
                        border: '1px solid var(--le-border)',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLLabelElement;
                        el.style.borderColor = 'var(--le-accent)';
                        el.style.backgroundColor = 'var(--le-bg)';
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLLabelElement;
                        el.style.borderColor = 'var(--le-border)';
                        el.style.backgroundColor = 'var(--le-surface)';
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={selectedUpgrades.includes(upgrade.name)}
                        onChange={() => toggleUpgrade(upgrade.name)}
                        style={{
                          width: '18px',
                          height: '18px',
                          cursor: 'pointer',
                          accentColor: 'var(--le-accent)',
                        }}
                      />
                      <div>
                        <div style={{ fontWeight: '500', fontSize: '0.95rem' }}>
                          {upgrade.name}
                        </div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--le-text-secondary)' }}>
                          {upgrade.cost}
                        </div>
                      </div>
                    </label>
                  ))}
              </div>
            </div>
          </div>

          <div
            style={{
              backgroundColor: 'var(--le-accent)',
              color: 'white',
              borderRadius: '8px',
              padding: '30px',
              textAlign: 'center',
            }}
          >
            <p
              style={{
                fontSize: '0.9rem',
                marginBottom: '8px',
                opacity: 0.9,
              }}
            >
              Total Estimated Investment:
            </p>
            <p
              style={{
                fontSize: '2.5rem',
                fontWeight: 'bold',
              }}
            >
              ${totalBudget.toLocaleString()}
            </p>
            {upgradeCosts > 0 && (
              <p style={{ fontSize: '0.9rem', marginTop: '12px', opacity: 0.9 }}>
                Upgrades: ${upgradeCosts.toLocaleString()}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section style={{ padding: '80px 20px', borderBottom: '1px solid var(--le-border)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2
            style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              marginBottom: '50px',
              textAlign: 'center',
            }}
          >
            Frequently Asked Questions
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {faqData.map((item, idx) => (
              <div key={idx}>
                <button
                  onClick={() => toggleFaq(idx)}
                  style={{
                    width: '100%',
                    backgroundColor: 'var(--le-surface)',
                    border: '1px solid var(--le-border)',
                    borderRadius: '8px',
                    padding: '20px',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    transition: 'all 0.3s ease',
                    textAlign: 'left',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLButtonElement;
                    el.style.backgroundColor = 'var(--le-bg)';
                    el.style.borderColor = 'var(--le-accent)';
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLButtonElement;
                    el.style.backgroundColor = 'var(--le-surface)';
                    el.style.borderColor = 'var(--le-border)';
                  }}
                >
                  <h3
                    style={{
                      fontSize: '1.05rem',
                      fontWeight: '600',
                      margin: '0',
                      flex: 1,
                      color: 'var(--le-text)',
                    }}
                  >
                    {item.question}
                  </h3>
                  <div style={{ color: 'var(--le-accent)', flexShrink: 0, marginLeft: '16px' }}>
                    {expandedFaq === idx ? <ChevronUpIcon /> : <ChevronDownIcon />}
                  </div>
                </button>
                {expandedFaq === idx && (
                  <div
                    style={{
                      backgroundColor: 'var(--le-bg)',
                      border: '1px solid var(--le-border)',
                      borderTop: 'none',
                      borderRadius: '0 0 8px 8px',
                      padding: '20px',
                      color: 'var(--le-text-secondary)',
                      lineHeight: '1.7',
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

      {/* Lead Capture CTA */}
      <section
        style={{
          background: `linear-gradient(135deg, var(--le-accent) 0%, var(--le-surface) 100%)`,
          padding: '80px 20px',
          textAlign: 'center',
          borderBottom: '1px solid var(--le-border)',
        }}
      >
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <h2
            style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              color: 'white',
              marginBottom: '20px',
            }}
          >
            Ready to Buy New Construction?
          </h2>
          <p
            style={{
              fontSize: '1.1rem',
              color: 'rgba(255, 255, 255, 0.95)',
              marginBottom: '30px',
              lineHeight: '1.6',
            }}
          >
            Let our real estate experts guide you through every step. Get personalized builder recommendations, financing options, and closing support.
          </p>
          <button
            style={{
              backgroundColor: 'white',
              color: 'var(--le-accent)',
              padding: '16px 40px',
              fontSize: '1.05rem',
              fontWeight: '700',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              marginRight: '12px',
              marginBottom: '12px',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLButtonElement;
              el.style.transform = 'translateY(-2px)';
              el.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2)';
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLButtonElement;
              el.style.transform = 'translateY(0)';
              el.style.boxShadow = 'none';
            }}
          >
            Get Expert Guidance
          </button>
          <button
            style={{
              backgroundColor: 'transparent',
              color: 'white',
              padding: '16px 40px',
              fontSize: '1.05rem',
              fontWeight: '700',
              border: '2px solid white',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLButtonElement;
              el.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLButtonElement;
              el.style.backgroundColor = 'transparent';
            }}
          >
            Request a Consultation
          </button>
        </div>
      </section>

      {/* Footer CTA */}
      <section
        style={{
          padding: '60px 20px',
          textAlign: 'center',
          backgroundColor: 'var(--le-surface)',
        }}
      >
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h3
            style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              marginBottom: '16px',
            }}
          >
            Have Questions About New Construction?
          </h3>
          <p
            style={{
              color: 'var(--le-text-secondary)',
              marginBottom: '24px',
              fontSize: '1rem',
              lineHeight: '1.6',
            }}
          >
            Our team specializes in new construction transactions. We\u2019ll help you navigate builder selection, customization decisions, warranty issues, and financing to ensure you get the best new home at the best value.
          </p>
          <form
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            <input
              type="email"
              placeholder="Your email address"
              style={{
                padding: '12px 16px',
                border: '1px solid var(--le-border)',
                borderRadius: '6px',
                fontSize: '0.95rem',
                backgroundColor: 'var(--le-bg)',
                color: 'var(--le-text)',
              }}
            />
            <button
              type="submit"
              style={{
                backgroundColor: 'var(--le-accent)',
                color: 'white',
                padding: '12px 24px',
                border: 'none',
                borderRadius: '6px',
                fontSize: '0.95rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLButtonElement;
                el.style.opacity = '0.9';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLButtonElement;
                el.style.opacity = '1';
              }}
            >
              Get Free New Construction Guide
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
