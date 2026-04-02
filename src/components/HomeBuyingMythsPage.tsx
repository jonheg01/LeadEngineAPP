'use client';

import { useState } from 'react';

export default function HomeBuyingMythsPage() {
  const [expandedMyth, setExpandedMyth] = useState(null);
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const myths = [
    {
      id: 1,
      myth: 'You need 20% down to buy a home',
      reality: 'Many loan programs allow down payments as low as 3-5%. FHA loans can be as low as 3.5%, and VA loans may require zero down for eligible veterans. The catch: lower down payments mean higher monthly payments and PMI costs.',
    },
    {
      id: 2,
      myth: 'Renting is always cheaper than buying',
      reality: 'Over time, building equity through homeownership typically costs less than renting. Home prices appreciate, but rental rates also increase. Plus, homeowners benefit from tax deductions on mortgage interest and property taxes.',
    },
    {
      id: 3,
      myth: 'A bigger down payment always means better terms',
      reality: 'While a larger down payment reduces your loan-to-value ratio, it\u2019s not the only factor lenders consider. Your credit score, debt-to-income ratio, and market conditions matter equally or more. Sometimes keeping cash for emergencies is smarter.',
    },
    {
      id: 4,
      myth: 'You should max out your approved mortgage amount',
      reality: 'Just because a lender approves you for $500k doesn\u2019t mean you can comfortably afford it. The 28/36 rule suggests limiting housing costs to 28% of gross income. Consider your lifestyle, savings goals, and unexpected expenses.',
    },
    {
      id: 5,
      myth: 'Fixed-rate mortgages are always better than ARMs',
      reality: 'Adjustable-rate mortgages can offer lower initial rates if you plan to sell or refinance within 5-7 years. Fixed-rate mortgages provide predictability. The best choice depends on market conditions and your timeline.',
    },
    {
      id: 6,
      myth: 'Home inspections are optional if the house looks fine',
      reality: 'A professional inspection uncovers hidden issues like foundation problems, roof damage, electrical faults, and pest infestations. The $300-500 inspection fee could save you thousands. It\u2019s essential, not optional.',
    },
    {
      id: 7,
      myth: 'You can\u2019t negotiate with the seller',
      reality: 'Everything is negotiable: price, closing costs, repairs, contingencies, and timelines. Sellers often expect offers below asking price. Your real estate agent can help structure offers strategically based on market conditions.',
    },
    {
      id: 8,
      myth: 'Getting pre-approved means you\u2019re guaranteed financing',
      reality: 'Pre-approval is conditional. Lenders can revoke it if your credit changes, you lose income, or you make large purchases. Final approval (clear to close) comes only after full underwriting and appraisal.',
    },
    {
      id: 9,
      myth: 'Closing costs are always around 2-3% of the purchase price',
      reality: 'Closing costs typically range from 2-5% and vary by location, loan type, and market conditions. They include appraisals, inspections, title work, taxes, insurance, and lender fees. Get a loan estimate within 3 days of applying.',
    },
  ];

  const whyPersist = [
    { icon: '📚', text: 'Outdated information from older generations or social media' },
    { icon: '🏠', text: 'Personal experiences that don\u2019t reflect current market conditions' },
    { icon: '💬', text: 'Marketing claims from lenders emphasizing one factor' },
    { icon: '⚡', text: 'Rapid changes in lending standards and mortgage products' },
  ];

  const faqs = [
    {
      q: 'When should I get pre-approved?',
      a: 'Start the pre-approval process before you begin house hunting. It clarifies your budget, strengthens your offer, and identifies any credit issues early. Pre-approval typically expires in 90 days.',
    },
    {
      q: 'How much should I save for emergencies after buying?',
      a: 'Aim for 6-12 months of expenses in savings. Homeownership costs can be unpredictable: plumbing emergencies, roof repairs, or HVAC replacements. Also maintain a separate fund for property taxes and insurance escrow.',
    },
    {
      q: 'Should I pay off debt before buying a home?',
      a: 'Generally yes, but prioritize high-interest debt. Lenders use your debt-to-income ratio. Paying off credit cards boosts your ratio more than auto loans. Avoid major purchases or new credit inquiries 6-12 months before applying.',
    },
    {
      q: 'Can I negotiate the interest rate?',
      a: 'Absolutely. Compare rates from multiple lenders, get written loan estimates, and ask about rate locks. You can often negotiate discount points or request rate reductions if your credit improves during the loan process.',
    },
    {
      q: 'What\u2019s the best time to buy a home?',
      a: 'When you\u2019re financially ready and find the right property. Seasonal trends exist (spring is active), but your timeline matters more. Don\u2019t rush into a bad deal chasing the "perfect" market.',
    },
  ];

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.phone) {
      setFormSubmitted(true);
      setFormData({ name: '', email: '', phone: '' });
      setTimeout(() => setFormSubmitted(false), 5000);
    }
  };

  const toggleMythExpanded = (id) => {
    setExpandedMyth(expandedMyth === id ? null : id);
  };

  const toggleFaqExpanded = (id) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  return (
    <main style={{ backgroundColor: 'var(--le-bg)', color: 'var(--le-text)' }}>
      {/* Hero Section */}
      <section
        style={{
          padding: '80px 20px',
          textAlign: 'center',
          background: 'linear-gradient(135deg, var(--le-primary), rgba(59, 130, 246, 0.6))',
          color: 'white',
        }}
      >
        <h1 style={{ fontSize: '3.5rem', fontWeight: 'bold', marginBottom: '20px' }}>
          Home Buying Myths Debunked
        </h1>
        <p style={{ fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
          Separate fact from fiction. Discover what actually matters when buying your first, next, or dream home.
        </p>
      </section>

      {/* Myths Section */}
      <section style={{ maxWidth: '900px', margin: '60px auto', padding: '0 20px' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '40px', textAlign: 'center', fontWeight: 'bold' }}>
          9 Myths Home Buyers Need to Know
        </h2>
        <div style={{ display: 'grid', gap: '20px' }}>
          {myths.map(myth => (
            <div
              key={myth.id}
              onClick={() => toggleMythExpanded(myth.id)}
              style={{
                backgroundColor: 'var(--le-card-bg)',
                border: `1px solid var(--le-border)`,
                borderRadius: '8px',
                padding: '24px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: expandedMyth === myth.id ? '0 4px 12px rgba(0,0,0,0.1)' : 'none',
              }}
              onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)'}
              onMouseLeave={(e) => e.currentTarget.style.boxShadow = expandedMyth === myth.id ? '0 4px 12px rgba(0,0,0,0.1)' : 'none'}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px' }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '8px', color: 'var(--le-accent)' }}>
                    Myth {myth.id}: {myth.myth}
                  </h3>
                </div>
                <div
                  style={{
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    color: 'var(--le-primary)',
                    transform: expandedMyth === myth.id ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s ease',
                    flexShrink: 0,
                    marginTop: '2px',
                  }}
                >
                  ▼
                </div>
              </div>
              {expandedMyth === myth.id && (
                <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: `1px solid var(--le-border)` }}>
                  <h4 style={{ fontWeight: 'bold', color: 'var(--le-primary)', marginBottom: '8px' }}>
                    The Reality:
                  </h4>
                  <p style={{ lineHeight: '1.7', color: 'var(--le-text)' }}>
                    {myth.reality}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Why Myths Persist */}
      <section style={{ backgroundColor: 'var(--le-card-bg)', padding: '60px 20px', margin: '60px 0' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '40px', textAlign: 'center', fontWeight: 'bold' }}>
            Why Do These Myths Persist?
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' }}>
            {whyPersist.map((item, idx) => (
              <div
                key={idx}
                style={{
                  padding: '24px',
                  backgroundColor: 'var(--le-bg)',
                  borderRadius: '8px',
                  border: `1px solid var(--le-border)`,
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>
                  {item.icon}
                </div>
                <p style={{ fontSize: '1rem', lineHeight: '1.6' }}>
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Accurate Information Section */}
      <section style={{ maxWidth: '900px', margin: '60px auto', padding: '0 20px' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '32px', textAlign: 'center', fontWeight: 'bold' }}>
          How to Get Accurate Home Buying Information
        </h2>
        <div style={{ display: 'grid', gap: '16px' }}>
          {[
            { icon: '✓', title: 'Work with a licensed real estate agent', desc: 'They understand local market conditions and current lending practices.' },
            { icon: '✓', title: 'Consult a mortgage professional', desc: 'Get loan estimates from multiple lenders and compare terms carefully.' },
            { icon: '✓', title: 'Review official resources', desc: 'HUD, FTC, and consumer protection agencies publish current guidelines.' },
            { icon: '✓', title: 'Get professional inspections', desc: 'Home inspectors, appraisers, and title companies catch hidden issues.' },
            { icon: '✓', title: 'Ask questions during the process', desc: 'Don\u2019t assume anything. Every loan and situation is unique.' },
          ].map((item, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                gap: '16px',
                padding: '16px',
                backgroundColor: 'var(--le-card-bg)',
                borderRadius: '8px',
                border: `1px solid var(--le-border)`,
              }}
            >
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--le-primary)', flexShrink: 0 }}>
                {item.icon}
              </div>
              <div>
                <h4 style={{ fontWeight: 'bold', marginBottom: '4px' }}>
                  {item.title}
                </h4>
                <p style={{ color: 'var(--le-text)', lineHeight: '1.5' }}>
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lead Capture Form */}
      <section style={{ backgroundColor: 'var(--le-primary)', color: 'white', padding: '60px 20px', margin: '60px 0' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '12px', textAlign: 'center', fontWeight: 'bold' }}>
            Ready to Buy with Confidence?
          </h2>
          <p style={{ textAlign: 'center', marginBottom: '32px', fontSize: '1.05rem', lineHeight: '1.6' }}>
            Get personalized guidance from real estate experts who know your market inside and out.
          </p>
          {formSubmitted ? (
            <div
              style={{
                padding: '20px',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '8px',
                textAlign: 'center',
                fontWeight: 'bold',
              }}
            >
              ✓ Thank you! We\u2019ll be in touch soon.
            </div>
          ) : (
            <form onSubmit={handleFormSubmit}>
              <div style={{ display: 'grid', gap: '16px' }}>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleFormChange}
                  required
                  style={{
                    padding: '14px',
                    borderRadius: '6px',
                    border: 'none',
                    fontSize: '1rem',
                    backgroundColor: 'white',
                    color: 'var(--le-text)',
                  }}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleFormChange}
                  required
                  style={{
                    padding: '14px',
                    borderRadius: '6px',
                    border: 'none',
                    fontSize: '1rem',
                    backgroundColor: 'white',
                    color: 'var(--le-text)',
                  }}
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Your Phone Number"
                  value={formData.phone}
                  onChange={handleFormChange}
                  required
                  style={{
                    padding: '14px',
                    borderRadius: '6px',
                    border: 'none',
                    fontSize: '1rem',
                    backgroundColor: 'white',
                    color: 'var(--le-text)',
                  }}
                />
                <button
                  type="submit"
                  style={{
                    padding: '14px',
                    backgroundColor: 'var(--le-accent)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '1.05rem',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'transform 0.2s ease, opacity 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.02)';
                    e.currentTarget.style.opacity = '0.95';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.opacity = '1';
                  }}
                >
                  Get Free Home Buying Guide
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <section style={{ maxWidth: '900px', margin: '60px auto', padding: '0 20px' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '40px', textAlign: 'center', fontWeight: 'bold' }}>
          Frequently Asked Questions
        </h2>
        <div style={{ display: 'grid', gap: '16px' }}>
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              onClick={() => toggleFaqExpanded(idx)}
              style={{
                backgroundColor: 'var(--le-card-bg)',
                border: `1px solid var(--le-border)`,
                borderRadius: '8px',
                padding: '20px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)'}
              onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 'bold', margin: 0 }}>
                  {faq.q}
                </h4>
                <div
                  style={{
                    fontSize: '1.3rem',
                    color: 'var(--le-primary)',
                    transform: expandedFaq === idx ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s ease',
                    flexShrink: 0,
                  }}
                >
                  ▼
                </div>
              </div>
              {expandedFaq === idx && (
                <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: `1px solid var(--le-border)` }}>
                  <p style={{ lineHeight: '1.7', color: 'var(--le-text)', margin: 0 }}>
                    {faq.a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA Footer */}
      <section style={{ backgroundColor: 'var(--le-card-bg)', padding: '60px 20px', textAlign: 'center', marginTop: '60px' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '16px', fontWeight: 'bold' }}>
          Still Have Questions?
        </h2>
        <p style={{ fontSize: '1.1rem', marginBottom: '24px', maxWidth: '600px', margin: '0 auto 24px' }}>
          Our real estate experts are here to help you navigate the home buying process with confidence.
        </p>
        <button
          style={{
            padding: '16px 32px',
            backgroundColor: 'var(--le-primary)',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '1.05rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(59, 130, 246, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          Schedule a Free Consultation
        </button>
      </section>
    </main>
  );
}
