'use client';

import { useState } from 'react';

export default function HomeInsuranceGuidePage() {
  const [formData, setFormData] = useState({ name: '', email: '', zipCode: '' });
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 5000);
    setFormData({ name: '', email: '', zipCode: '' });
  };

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  const faqItems = [
    {
      question: 'What\u2019s the difference between actual cash value and replacement cost?',
      answer: 'Replacement cost coverage pays to rebuild or replace your home and belongings at current prices. Actual cash value pays the replacement cost minus depreciation. Replacement cost is typically more expensive but provides better protection.',
    },
    {
      question: 'Does homeowners insurance cover water damage from floods?',
      answer: 'Standard homeowners insurance does not cover flooding. You need a separate flood insurance policy through the National Flood Insurance Program (NFIP) or private insurers. This is especially important if you\u2019re in a high-risk flood area.',
    },
    {
      question: 'How often should I review my homeowners insurance policy?',
      answer: 'Review your policy annually or whenever you make significant home improvements, add valuable items, or life circumstances change. Home values and your coverage needs evolve over time.',
    },
    {
      question: 'Can I get a homeowners insurance discount for security systems?',
      answer: 'Yes. Many insurers offer discounts (5-20%) for deadbolt locks, burglar alarms, fire alarms, and smart home security systems. Ask your agent about available discounts.',
    },
    {
      question: 'What\u2019s the coverage limit I should choose?',
      answer: 'Your dwelling coverage should equal the full replacement cost of your home, not its market value. Work with your agent to determine this amount. Underinsuring can leave you paying out of pocket for repairs.',
    },
  ];

  const coverageTypes = [
    {
      title: 'Dwelling Coverage',
      description: 'Covers the structure of your home including walls, roof, flooring, and built-in appliances.',
      icon: '🏠',
    },
    {
      title: 'Personal Property Coverage',
      description: 'Protects your belongings like furniture, clothing, electronics, and other personal items inside the home.',
      icon: '📦',
    },
    {
      title: 'Liability Coverage',
      description: 'Covers injuries or property damage you\u2019re legally responsible for on your property. Protects against lawsuits.',
      icon: '⚖️',
    },
    {
      title: 'Loss of Use',
      description: 'Reimburses temporary living expenses if your home becomes uninhabitable due to a covered loss.',
      icon: '🏘️',
    },
  ];

  const premiumFactors = [
    { factor: 'Home location', reason: 'High-crime areas, flood-prone regions, and disaster zones have higher premiums' },
    { factor: 'Home age and construction', reason: 'Older homes and those with wood frames typically cost more to insure' },
    { factor: 'Home value and size', reason: 'Larger and more valuable homes require higher coverage limits' },
    { factor: 'Deductible amount', reason: 'Higher deductibles lower your premium; lower deductibles raise it' },
    { factor: 'Claims history', reason: 'Previous claims on your record increase premiums' },
    { factor: 'Credit score', reason: 'Many insurers use credit scores to assess risk' },
    { factor: 'Security features', reason: 'Alarms, locks, and fire suppression systems earn discounts' },
    { factor: 'Distance from fire station', reason: 'Homes closer to fire protection services have lower rates' },
  ];

  const savingsTips = [
    'Bundle your home and auto insurance policies for multi-policy discounts',
    'Install a home security system or upgrade door and window locks',
    'Maintain your roof, plumbing, and electrical systems in good condition',
    'Increase your deductible if you have emergency savings',
    'Look for retiree, military, alumni, or professional association discounts',
    'Ask about going paperless to save 5-10% on premiums',
    'Improve your credit score to potentially lower rates',
    'Review your coverage annually and shop around every 2-3 years',
  ];

  return (
    <main style={{ backgroundColor: 'var(--le-bg)', color: 'var(--le-text)' }}>
      {/* Hero Section */}
      <section
        style={{
          padding: '60px 20px',
          textAlign: 'center',
          background: 'linear-gradient(135deg, var(--le-primary) 0%, rgba(59, 130, 246, 0.1) 100%)',
          borderBottom: '1px solid var(--le-border)',
        }}
      >
        <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '16px', lineHeight: '1.2' }}>
          Complete Guide to Home Insurance for Buyers
        </h1>
        <p style={{ fontSize: '18px', maxWidth: '700px', margin: '0 auto', opacity: 0.9 }}>
          Understand coverage types, premiums, discounts, and how to protect your biggest investment
        </p>
      </section>

      {/* Coverage Types Section */}
      <section
        style={{
          padding: '60px 20px',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '40px', textAlign: 'center' }}>
          Types of Homeowners Insurance Coverage
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
          }}
        >
          {coverageTypes.map((coverage, index) => (
            <div
              key={index}
              style={{
                padding: '24px',
                backgroundColor: 'var(--le-card-bg)',
                border: '1px solid var(--le-border)',
                borderRadius: '8px',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  '0 4px 12px rgba(59, 130, 246, 0.15)';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
              }}
            >
              <div style={{ fontSize: '40px', marginBottom: '12px' }}>{coverage.icon}</div>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px' }}>
                {coverage.title}
              </h3>
              <p style={{ lineHeight: '1.6', fontSize: '15px', opacity: 0.85 }}>
                {coverage.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* What Affects Your Premiums */}
      <section
        style={{
          padding: '60px 20px',
          backgroundColor: 'var(--le-card-bg)',
          borderTop: '1px solid var(--le-border)',
          borderBottom: '1px solid var(--le-border)',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '40px', textAlign: 'center' }}>
            What Affects Your Homeowners Insurance Premiums
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '24px',
            }}
          >
            {premiumFactors.map((item, index) => (
              <div key={index} style={{ padding: '16px', backgroundColor: 'var(--le-bg)', borderRadius: '6px' }}>
                <h4
                  style={{
                    fontSize: '16px',
                    fontWeight: 'bold',
                    color: 'var(--le-primary)',
                    marginBottom: '8px',
                  }}
                >
                  {item.factor}
                </h4>
                <p style={{ fontSize: '14px', lineHeight: '1.6', opacity: 0.8 }}>{item.reason}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Save on Insurance */}
      <section
        style={{
          padding: '60px 20px',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '40px', textAlign: 'center' }}>
          Ways to Save on Homeowners Insurance
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px',
          }}
        >
          {savingsTips.map((tip, index) => (
            <div
              key={index}
              style={{
                padding: '20px',
                display: 'flex',
                gap: '12px',
                backgroundColor: 'var(--le-card-bg)',
                border: '1px solid var(--le-border)',
                borderRadius: '6px',
              }}
            >
              <div
                style={{
                  width: '24px',
                  height: '24px',
                  minWidth: '24px',
                  backgroundColor: 'var(--le-primary)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '14px',
                  fontWeight: 'bold',
                }}
              >
                ✓
              </div>
              <p style={{ fontSize: '15px', lineHeight: '1.5' }}>{tip}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Flood & Earthquake Insurance */}
      <section
        style={{
          padding: '60px 20px',
          backgroundColor: 'var(--le-card-bg)',
          borderTop: '1px solid var(--le-border)',
          borderBottom: '1px solid var(--le-border)',
        }}
      >
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '40px', textAlign: 'center' }}>
            Flood & Earthquake Insurance
          </h2>
          <div style={{ display: 'grid', gap: '32px' }}>
            <div
              style={{
                padding: '24px',
                backgroundColor: 'var(--le-bg)',
                borderLeft: '4px solid var(--le-accent)',
                borderRadius: '4px',
              }}
            >
              <h3 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '12px', color: 'var(--le-accent)' }}>
                Flood Insurance
              </h3>
              <p style={{ fontSize: '15px', lineHeight: '1.7', marginBottom: '12px' }}>
                Standard homeowners policies exclude flooding, including heavy rains, storm surge, and overflowing rivers.
                If you\u2019re in a FEMA flood zone or have a mortgage in a flood-prone area, lenders typically require flood
                insurance. Coverage is available through the National Flood Insurance Program (NFIP) and private insurers.
              </p>
              <p style={{ fontSize: '15px', lineHeight: '1.7' }}>
                Consider flood insurance even if it\u2019s not required—just 1 inch of water can cause over $25,000 in damage.
              </p>
            </div>

            <div
              style={{
                padding: '24px',
                backgroundColor: 'var(--le-bg)',
                borderLeft: '4px solid var(--le-primary)',
                borderRadius: '4px',
              }}
            >
              <h3
                style={{
                  fontSize: '22px',
                  fontWeight: 'bold',
                  marginBottom: '12px',
                  color: 'var(--le-primary)',
                }}
              >
                Earthquake Insurance
              </h3>
              <p style={{ fontSize: '15px', lineHeight: '1.7', marginBottom: '12px' }}>
                Homeowners insurance does not cover earthquake damage. If you live in a seismic zone, earthquake insurance
                is available as an endorsement or separate policy. It covers damage to your home\u2019s structure and contents
                from seismic events.
              </p>
              <p style={{ fontSize: '15px', lineHeight: '1.7' }}>
                Deductibles are typically higher (15-25% of the dwelling coverage limit), but the protection is essential
                in high-risk areas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Claims Filing Tips */}
      <section
        style={{
          padding: '60px 20px',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '40px', textAlign: 'center' }}>
          How to File an Insurance Claim Successfully
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
          }}
        >
          {[
            {
              step: '1. Document Everything',
              details:
                'Take photos and videos of all damage from multiple angles. Keep receipts for any temporary repairs.',
            },
            {
              step: '2. Contact Your Insurer Promptly',
              details: 'Call your insurance company as soon as possible. Delays can complicate your claim.',
            },
            {
              step: '3. Gather Evidence',
              details:
                'Collect receipts, warranties, photos of items before damage, and a list of damaged items with values.',
            },
            {
              step: '4. Get Repair Estimates',
              details:
                'Obtain written estimates from contractors. Your insurer may require multiple quotes.',
            },
            {
              step: '5. Review Your Coverage',
              details:
                'Understand your deductible, coverage limits, and what\u2019s included in your policy before filing.',
            },
            {
              step: '6. Keep Detailed Records',
              details:
                'Document all communications with your insurer including dates, names, and claim numbers.',
            },
          ].map((item, index) => (
            <div
              key={index}
              style={{
                padding: '24px',
                backgroundColor: 'var(--le-card-bg)',
                border: '1px solid var(--le-border)',
                borderRadius: '8px',
              }}
            >
              <h3
                style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  marginBottom: '12px',
                  color: 'var(--le-primary)',
                }}
              >
                {item.step}
              </h3>
              <p style={{ fontSize: '15px', lineHeight: '1.6', opacity: 0.85 }}>{item.details}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Insurance vs Warranty */}
      <section
        style={{
          padding: '60px 20px',
          backgroundColor: 'var(--le-card-bg)',
          borderTop: '1px solid var(--le-border)',
          borderBottom: '1px solid var(--le-border)',
        }}
      >
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '40px', textAlign: 'center' }}>
            Insurance vs Home Warranty: What\u2019s the Difference?
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '24px',
            }}
          >
            <div
              style={{
                padding: '24px',
                backgroundColor: 'var(--le-bg)',
                border: '1px solid var(--le-border)',
                borderRadius: '8px',
              }}
            >
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px', color: 'var(--le-primary)' }}>
                Homeowners Insurance
              </h3>
              <ul style={{ fontSize: '14px', lineHeight: '1.8', opacity: 0.85 }}>
                <li>Covers sudden, accidental damage (fire, theft, storms)</li>
                <li>Protects structure and personal property</li>
                <li>Required by mortgage lenders</li>
                <li>Covers liability and loss of use</li>
                <li>Does not cover maintenance or wear-and-tear</li>
              </ul>
            </div>

            <div
              style={{
                padding: '24px',
                backgroundColor: 'var(--le-bg)',
                border: '1px solid var(--le-border)',
                borderRadius: '8px',
              }}
            >
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px', color: 'var(--le-accent)' }}>
                Home Warranty
              </h3>
              <ul style={{ fontSize: '14px', lineHeight: '1.8', opacity: 0.85 }}>
                <li>Covers repair/replacement of systems and appliances</li>
                <li>Covers wear-and-tear and mechanical failure</li>
                <li>Optional coverage you purchase separately</li>
                <li>Does not cover structure or liability</li>
                <li>Useful for older homes with aging systems</li>
              </ul>
            </div>
          </div>
          <p
            style={{
              marginTop: '24px',
              fontSize: '15px',
              padding: '16px',
              backgroundColor: 'var(--le-bg)',
              borderRadius: '6px',
              borderLeft: '4px solid var(--le-primary)',
            }}
          >
            Both homeowners insurance and a home warranty serve different purposes. Insurance protects against catastrophic
            losses, while a warranty covers appliance and system repairs. Many homeowners benefit from having both.
          </p>
        </div>
      </section>

      {/* Lead Capture CTA Form */}
      <section
        style={{
          padding: '60px 20px',
          maxWidth: '900px',
          margin: '0 auto',
        }}
      >
        <div
          style={{
            padding: '40px',
            backgroundColor: 'var(--le-primary)',
            color: 'white',
            borderRadius: '12px',
          }}
        >
          <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '12px', textAlign: 'center' }}>
            Get a Personalized Insurance Estimate
          </h2>
          <p style={{ fontSize: '16px', textAlign: 'center', marginBottom: '32px', opacity: 0.95 }}>
            Connect with licensed agents to compare quotes and find the best homeowners insurance for your needs.
          </p>

          {formSubmitted ? (
            <div
              style={{
                padding: '20px',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '8px',
                textAlign: 'center',
              }}
            >
              <p style={{ fontSize: '18px', fontWeight: 'bold' }}>
                Thank you! We\u2019ll send you personalized insurance quotes within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} style={{ display: 'grid', gap: '16px' }}>
              <input
                type="text"
                name="name"
                placeholder="Your Full Name"
                value={formData.name}
                onChange={handleFormChange}
                required
                style={{
                  padding: '12px',
                  borderRadius: '6px',
                  border: 'none',
                  fontSize: '15px',
                }}
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email Address"
                value={formData.email}
                onChange={handleFormChange}
                required
                style={{
                  padding: '12px',
                  borderRadius: '6px',
                  border: 'none',
                  fontSize: '15px',
                }}
              />
              <input
                type="text"
                name="zipCode"
                placeholder="Your ZIP Code"
                value={formData.zipCode}
                onChange={handleFormChange}
                required
                style={{
                  padding: '12px',
                  borderRadius: '6px',
                  border: 'none',
                  fontSize: '15px',
                }}
              />
              <button
                type="submit"
                style={{
                  padding: '14px 28px',
                  backgroundColor: 'white',
                  color: 'var(--le-primary)',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.opacity = '0.9';
                  (e.currentTarget as HTMLElement).style.transform = 'scale(1.02)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.opacity = '1';
                  (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
                }}
              >
                Get Free Quotes Now
              </button>
            </form>
          )}
        </div>
      </section>

      {/* FAQ Accordion */}
      <section
        style={{
          padding: '60px 20px',
          maxWidth: '900px',
          margin: '0 auto',
          borderTop: '1px solid var(--le-border)',
        }}
      >
        <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '40px', textAlign: 'center' }}>
          Frequently Asked Questions
        </h2>
        <div style={{ display: 'grid', gap: '12px' }}>
          {faqItems.map((item, index) => (
            <div key={index} style={{ border: '1px solid var(--le-border)', borderRadius: '8px', overflow: 'hidden' }}>
              <button
                onClick={() => toggleFAQ(index)}
                style={{
                  width: '100%',
                  padding: '20px',
                  backgroundColor: expandedFAQ === index ? 'var(--le-primary)' : 'var(--le-card-bg)',
                  color: expandedFAQ === index ? 'white' : 'var(--le-text)',
                  border: 'none',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  if (expandedFAQ !== index) {
                    (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--le-hover)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (expandedFAQ !== index) {
                    (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--le-card-bg)';
                  }
                }}
              >
                <span>{item.question}</span>
                <span style={{ fontSize: '20px' }}>{expandedFAQ === index ? '−' : '+'}</span>
              </button>
              {expandedFAQ === index && (
                <div
                  style={{
                    padding: '20px',
                    backgroundColor: 'var(--le-bg)',
                    borderTop: '1px solid var(--le-border)',
                    fontSize: '15px',
                    lineHeight: '1.7',
                  }}
                >
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <section
        style={{
          padding: '40px 20px',
          textAlign: 'center',
          borderTop: '1px solid var(--le-border)',
          marginTop: '60px',
        }}
      >
        <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '12px' }}>
          Ready to Find the Best Homeowners Insurance?
        </h3>
        <p style={{ fontSize: '16px', marginBottom: '24px', opacity: 0.8 }}>
          Compare quotes from multiple insurers and save on your premiums today.
        </p>
        <button
          style={{
            padding: '14px 32px',
            backgroundColor: 'var(--le-primary)',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.opacity = '0.9';
            (e.currentTarget as HTMLElement).style.transform = 'scale(1.02)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.opacity = '1';
            (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
          }}
        >
          Compare Insurance Quotes
        </button>
      </section>
    </main>
  );
}
