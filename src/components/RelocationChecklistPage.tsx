'use client';

import React, { useState } from 'react';

export default function RelocationChecklistPage() {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);

  const toggleCheckItem = (id: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleFAQ = (id: string) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  const CheckboxIcon = ({ checked }: { checked: boolean }) => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke={checked ? 'var(--le-primary)' : 'var(--le-border)'}
      strokeWidth="2"
      style={{ flexShrink: 0 }}
    >
      <rect x="3" y="3" width="18" height="18" rx="2" />
      {checked && <polyline points="20 6 9 17 4 12" />}
    </svg>
  );

  const ChevronIcon = ({ open }: { open: boolean }) => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      style={{
        transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
        transition: 'transform 0.3s ease',
      }}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );

  const ChecklistSection = ({
    title,
    items,
  }: {
    title: string;
    items: { id: string; label: string; description?: string }[];
  }) => (
    <div
      style={{
        marginBottom: '3rem',
        padding: '2rem',
        backgroundColor: 'var(--le-card-bg)',
        border: '1px solid var(--le-border)',
        borderRadius: '8px',
      }}
    >
      <h3
        style={{
          fontSize: '1.5rem',
          fontWeight: '600',
          color: 'var(--le-text)',
          marginBottom: '1.5rem',
          marginTop: 0,
        }}
      >
        {title}
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => toggleCheckItem(item.id)}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '1rem',
              padding: '1rem',
              backgroundColor: checkedItems[item.id]
                ? 'rgba(var(--le-primary-rgb), 0.05)'
                : 'transparent',
              border: '1px solid var(--le-border)',
              borderRadius: '6px',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                'rgba(var(--le-primary-rgb), 0.08)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                checkedItems[item.id]
                  ? 'rgba(var(--le-primary-rgb), 0.05)'
                  : 'transparent';
            }}
          >
            <CheckboxIcon checked={checkedItems[item.id] || false} />
            <div style={{ flex: 1 }}>
              <p
                style={{
                  fontSize: '1rem',
                  fontWeight: '500',
                  color: 'var(--le-text)',
                  margin: '0 0 0.25rem 0',
                  textDecoration: checkedItems[item.id]
                    ? 'line-through'
                    : 'none',
                  opacity: checkedItems[item.id] ? 0.6 : 1,
                }}
              >
                {item.label}
              </p>
              {item.description && (
                <p
                  style={{
                    fontSize: '0.875rem',
                    color: 'rgba(var(--le-text-rgb), 0.7)',
                    margin: '0.25rem 0 0 0',
                  }}
                >
                  {item.description}
                </p>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  const threeMonthsBefore = [
    { id: 'tm-1', label: 'Start researching neighborhoods', description: 'Review crime rates, schools, walkability, and community amenities' },
    { id: 'tm-2', label: 'Get pre-approved for mortgage', description: 'Work with a lender to understand your budget' },
    { id: 'tm-3', label: 'Begin home search', description: 'Schedule viewings and virtual tours' },
    { id: 'tm-4', label: 'Make an offer and inspect property', description: 'Schedule professional home inspection within 10 days' },
  ];

  const oneMonthBefore = [
    { id: 'om-1', label: 'Finalize mortgage and appraisal', description: 'Ensure financing is on track' },
    { id: 'om-2', label: 'Research movers and get quotes', description: 'Book early for better rates and availability' },
    { id: 'om-3', label: 'Update address with USPS and accounts', description: 'Mail, utilities, banks, subscriptions' },
    { id: 'om-4', label: 'Schedule utility transfers', description: 'Arrange disconnect and reconnect dates' },
    { id: 'om-5', label: 'Obtain school records (if applicable)', description: 'Request transcripts from current schools' },
  ];

  const movingWeek = [
    { id: 'mw-1', label: 'Confirm final moving company details', description: 'Verify date, time, and contact information' },
    { id: 'mw-2', label: 'Defrost freezer and empty perishables', description: 'Prevent food waste during the move' },
    { id: 'mw-3', label: 'Clean your old home', description: 'Coordinate final walkthrough with seller' },
    { id: 'mw-4', label: 'Pack essential box clearly', description: 'Mark with "Open First" and prioritize daily items' },
    { id: 'mw-5', label: 'Create forwarding address list', description: 'Keep with you on moving day' },
  ];

  const firstWeek = [
    { id: 'fw-1', label: 'Locate circuit breaker and water shut-off', description: 'Essential for emergencies' },
    { id: 'fw-2', label: 'Test all utilities and appliances', description: 'Ensure everything is working properly' },
    { id: 'fw-3', label: 'Register to vote in your new location', description: 'Update voter registration' },
    { id: 'fw-4', label: 'Get new driver\u2019s license', description: 'Visit local DMV within required timeframe' },
    { id: 'fw-5', label: 'Explore neighborhood and find essential services', description: 'Grocery stores, pharmacies, doctors, schools' },
    { id: 'fw-6', label: 'Introduce yourself to neighbors', description: 'Build community connections' },
  ];

  return (
    <main style={{ backgroundColor: 'var(--le-bg)', minHeight: '100vh' }}>
      {/* Hero Section */}
      <section
        style={{
          background: 'linear-gradient(135deg, var(--le-primary) 0%, rgba(var(--le-primary-rgb), 0.8) 100%)',
          color: 'white',
          padding: '4rem 2rem',
          textAlign: 'center',
        }}
      >
        <h1
          style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: '700',
            margin: '0 0 1rem 0',
            letterSpacing: '-0.02em',
          }}
        >
          Your Complete Relocation Checklist
        </h1>
        <p
          style={{
            fontSize: '1.25rem',
            margin: '0',
            opacity: 0.95,
            maxWidth: '600px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          A comprehensive guide to moving smoothly from start to finish. Track every step of your relocation journey.
        </p>
      </section>

      {/* Main Content */}
      <section style={{ maxWidth: '900px', margin: '0 auto', padding: '3rem 2rem' }}>
        {/* Overview */}
        <div
          style={{
            marginBottom: '3rem',
            padding: '2rem',
            backgroundColor: 'rgba(var(--le-accent-rgb), 0.05)',
            border: '1px solid var(--le-accent)',
            borderRadius: '8px',
          }}
        >
          <h2
            style={{
              fontSize: '1.75rem',
              fontWeight: '600',
              color: 'var(--le-text)',
              margin: '0 0 1rem 0',
            }}
          >
            Moving Timeline
          </h2>
          <p
            style={{
              fontSize: '1rem',
              color: 'rgba(var(--le-text-rgb), 0.8)',
              lineHeight: '1.6',
              margin: '0',
            }}
          >
            This checklist breaks down the moving process into four key phases. Whether you\u2019re relocating across town or across the country, following this timeline will help ensure nothing falls through the cracks. Check items off as you complete them and use this guide to stay organized throughout your move.
          </p>
        </div>

        {/* Timeline Sections */}
        <ChecklistSection
          title="3 Months Before Moving"
          items={threeMonthsBefore}
        />
        <ChecklistSection
          title="1 Month Before Moving"
          items={oneMonthBefore}
        />
        <ChecklistSection
          title="Moving Week"
          items={movingWeek}
        />
        <ChecklistSection
          title="First Week in Your New Home"
          items={firstWeek}
        />

        {/* Cost Estimation Section */}
        <section
          style={{
            marginBottom: '3rem',
            padding: '2rem',
            backgroundColor: 'var(--le-card-bg)',
            border: '1px solid var(--le-border)',
            borderRadius: '8px',
          }}
        >
          <h2
            style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: 'var(--le-text)',
              margin: '0 0 1.5rem 0',
            }}
          >
            Relocation Budget Estimation
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
            {[
              { label: 'Moving Services', estimate: '$2,000–$10,000', tips: 'Varies by distance and volume. Get 3+ quotes.' },
              { label: 'Real Estate Commission', estimate: '5–6% of sale', tips: 'Negotiate percentage before listing.' },
              { label: 'Closing Costs', estimate: '2–5% of purchase', tips: 'Includes inspection, appraisal, title insurance.' },
              { label: 'Utilities Setup', estimate: '$200–$500', tips: 'Deposits and connection fees.' },
              { label: 'Address Changes', estimate: '$0–$100', tips: 'USPS, licenses, document updates.' },
              { label: 'Travel & Lodging', estimate: '$500–$2,000', tips: 'Depends on distance and timing.' },
            ].map((item, idx) => (
              <div
                key={idx}
                style={{
                  padding: '1.5rem',
                  backgroundColor: 'rgba(var(--le-primary-rgb), 0.05)',
                  border: '1px solid var(--le-border)',
                  borderRadius: '6px',
                }}
              >
                <h4
                  style={{
                    fontSize: '1rem',
                    fontWeight: '600',
                    color: 'var(--le-text)',
                    margin: '0 0 0.5rem 0',
                  }}
                >
                  {item.label}
                </h4>
                <p
                  style={{
                    fontSize: '1.125rem',
                    fontWeight: '700',
                    color: 'var(--le-primary)',
                    margin: '0.5rem 0',
                  }}
                >
                  {item.estimate}
                </p>
                <p
                  style={{
                    fontSize: '0.875rem',
                    color: 'rgba(var(--le-text-rgb), 0.7)',
                    margin: '0.5rem 0 0 0',
                  }}
                >
                  {item.tips}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Neighborhood Selection Guide */}
        <section
          style={{
            marginBottom: '3rem',
            padding: '2rem',
            backgroundColor: 'var(--le-card-bg)',
            border: '1px solid var(--le-border)',
            borderRadius: '8px',
          }}
        >
          <h2
            style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: 'var(--le-text)',
              margin: '0 0 1.5rem 0',
            }}
          >
            Choosing Your Neighborhood
          </h2>
          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            {[
              'Safety and crime statistics—check local police department data',
              'School quality—visit GreatSchools.org for ratings and reviews',
              'Commute times—test your drive during peak hours',
              'Cost of living—compare groceries, services, and property taxes',
              'Walkability score—how accessible are shops, parks, and transit',
              'Community events—active neighborhoods host regular activities',
              'Proximity to healthcare—locate hospitals and clinics',
              'Job market—research employment opportunities in your field',
            ].map((item, idx) => (
              <li
                key={idx}
                style={{
                  fontSize: '1rem',
                  color: 'var(--le-text)',
                  paddingLeft: '2rem',
                  position: 'relative',
                  lineHeight: '1.5',
                }}
              >
                <span
                  style={{
                    position: 'absolute',
                    left: 0,
                    color: 'var(--le-primary)',
                    fontWeight: '700',
                  }}
                >
                  •
                </span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* School Research Tips */}
        <section
          style={{
            marginBottom: '3rem',
            padding: '2rem',
            backgroundColor: 'var(--le-card-bg)',
            border: '1px solid var(--le-border)',
            borderRadius: '8px',
          }}
        >
          <h2
            style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: 'var(--le-text)',
              margin: '0 0 1.5rem 0',
            }}
          >
            Research Schools Before Moving
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {[
              {
                title: 'Academic Performance',
                points: ['Test score rankings', 'Graduation rates', 'Advanced programs (AP, IB, gifted)'],
              },
              {
                title: 'Campus Life',
                points: ['Sports and extracurriculars', 'Class sizes and teacher ratios', 'Special programs and clubs'],
              },
              {
                title: 'Practical Details',
                points: ['School start and end times', 'Lunch and transportation options', 'Parent involvement opportunities'],
              },
              {
                title: 'Community Fit',
                points: ['School culture and values', 'Parent testimonials', 'Visit campus and meet staff'],
              },
            ].map((section, idx) => (
              <div
                key={idx}
                style={{
                  padding: '1.5rem',
                  backgroundColor: 'rgba(var(--le-primary-rgb), 0.03)',
                  border: '1px solid var(--le-border)',
                  borderRadius: '6px',
                }}
              >
                <h4
                  style={{
                    fontSize: '1rem',
                    fontWeight: '600',
                    color: 'var(--le-text)',
                    margin: '0 0 1rem 0',
                  }}
                >
                  {section.title}
                </h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {section.points.map((point, pidx) => (
                    <li
                      key={pidx}
                      style={{
                        fontSize: '0.9rem',
                        color: 'rgba(var(--le-text-rgb), 0.8)',
                        marginBottom: pidx !== section.points.length - 1 ? '0.5rem' : 0,
                      }}
                    >
                      • {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Lead Capture CTA */}
        <section
          style={{
            marginBottom: '3rem',
            padding: '3rem 2rem',
            backgroundColor: 'linear-gradient(135deg, rgba(var(--le-primary-rgb), 0.1) 0%, rgba(var(--le-accent-rgb), 0.05) 100%)',
            border: '2px solid var(--le-primary)',
            borderRadius: '8px',
            textAlign: 'center',
          }}
        >
          <h2
            style={{
              fontSize: '1.75rem',
              fontWeight: '600',
              color: 'var(--le-text)',
              margin: '0 0 1rem 0',
            }}
          >
            Get Expert Help With Your Relocation
          </h2>
          <p
            style={{
              fontSize: '1rem',
              color: 'rgba(var(--le-text-rgb), 0.8)',
              margin: '0 0 2rem 0',
              maxWidth: '500px',
              marginLeft: 'auto',
              marginRight: 'auto',
              lineHeight: '1.6',
            }}
          >
            Our real estate experts can guide you through every step of your move. From neighborhood selection to closing day, we\u2019re here to help.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px', margin: '0 auto' }}>
            <input
              type="text"
              placeholder="Your name"
              style={{
                padding: '0.875rem 1rem',
                fontSize: '1rem',
                border: '1px solid var(--le-border)',
                borderRadius: '6px',
                backgroundColor: 'white',
                color: 'var(--le-text)',
              }}
            />
            <input
              type="email"
              placeholder="Your email"
              style={{
                padding: '0.875rem 1rem',
                fontSize: '1rem',
                border: '1px solid var(--le-border)',
                borderRadius: '6px',
                backgroundColor: 'white',
                color: 'var(--le-text)',
              }}
            />
            <button
              style={{
                padding: '1rem',
                fontSize: '1rem',
                fontWeight: '600',
                color: 'white',
                backgroundColor: 'var(--le-primary)',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--le-hover)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--le-primary)';
              }}
            >
              Get Your Relocation Guide
            </button>
          </div>
        </section>

        {/* FAQ Accordion */}
        <section
          style={{
            marginBottom: '3rem',
            padding: '2rem',
            backgroundColor: 'var(--le-card-bg)',
            border: '1px solid var(--le-border)',
            borderRadius: '8px',
          }}
        >
          <h2
            style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: 'var(--le-text)',
              margin: '0 0 1.5rem 0',
            }}
          >
            Frequently Asked Questions
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              {
                id: 'faq-1',
                question: 'How far in advance should I start planning my move?',
                answer: 'Ideally, begin planning 2–3 months before your target move date. This gives you time to research neighborhoods, secure financing, and arrange moving services at reasonable rates.',
              },
              {
                id: 'faq-2',
                question: 'What if I\u2019m buying and selling simultaneously?',
                answer: 'Coordinate closing dates carefully. Many buyers do contingent offers (sale of current home contingent on purchase of new home) or arrange temporary housing. A real estate agent can help negotiate this timing.',
              },
              {
                id: 'faq-3',
                question: 'How much should I budget for a full relocation?',
                answer: 'Expect $5,000–$25,000+ depending on distance, home price, and family size. Factor in moving costs, travel, temporary housing, and closing costs. Use our budget guide above as a starting point.',
              },
              {
                id: 'faq-4',
                question: 'Should I hire a real estate agent in my new city?',
                answer: 'Yes. A local agent knows neighborhoods, schools, and market conditions. They can attend showings on your behalf and advise on fair pricing. Interview multiple agents before deciding.',
              },
              {
                id: 'faq-5',
                question: 'What\u2019s the best way to find a trustworthy moving company?',
                answer: 'Get quotes from at least three licensed, insured companies. Check online reviews, verify their DOT number, and ask for references. Book early for better rates, especially during peak season (May–September).',
              },
            ].map((faq) => (
              <div
                key={faq.id}
                style={{
                  border: '1px solid var(--le-border)',
                  borderRadius: '6px',
                  overflow: 'hidden',
                }}
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    backgroundColor: expandedFAQ === faq.id ? 'rgba(var(--le-primary-rgb), 0.05)' : 'transparent',
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    transition: 'background-color 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (expandedFAQ !== faq.id) {
                      (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                        'rgba(var(--le-primary-rgb), 0.02)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (expandedFAQ !== faq.id) {
                      (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  <span
                    style={{
                      fontSize: '1rem',
                      fontWeight: '600',
                      color: 'var(--le-text)',
                    }}
                  >
                    {faq.question}
                  </span>
                  <span style={{ color: 'var(--le-primary)', marginLeft: '1rem', flexShrink: 0 }}>
                    <ChevronIcon open={expandedFAQ === faq.id} />
                  </span>
                </button>
                {expandedFAQ === faq.id && (
                  <div
                    style={{
                      padding: '0 1rem 1rem 1rem',
                      backgroundColor: 'rgba(var(--le-primary-rgb), 0.02)',
                      borderTop: '1px solid var(--le-border)',
                    }}
                  >
                    <p
                      style={{
                        fontSize: '0.95rem',
                        color: 'rgba(var(--le-text-rgb), 0.85)',
                        margin: 0,
                        lineHeight: '1.6',
                      }}
                    >
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section style={{ textAlign: 'center', padding: '2rem 0' }}>
          <h2
            style={{
              fontSize: '1.75rem',
              fontWeight: '600',
              color: 'var(--le-text)',
              margin: '0 0 1rem 0',
            }}
          >
            Ready to Start Your Relocation Journey?
          </h2>
          <p
            style={{
              fontSize: '1rem',
              color: 'rgba(var(--le-text-rgb), 0.8)',
              margin: '0 0 2rem 0',
              maxWidth: '500px',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            Connect with a local real estate expert who knows your new market inside and out. We\u2019re here to answer questions and guide your move.
          </p>
          <button
            style={{
              padding: '1rem 2rem',
              fontSize: '1rem',
              fontWeight: '600',
              color: 'white',
              backgroundColor: 'var(--le-primary)',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--le-hover)';
              (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--le-primary)';
              (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
            }}
          >
            Speak with an Agent
          </button>
        </section>
      </section>
    </main>
  );
}
