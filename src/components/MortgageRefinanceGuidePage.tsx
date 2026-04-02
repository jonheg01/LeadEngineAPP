'use client';

import { useState } from 'react';

export default function MortgageRefinanceGuidePage() {
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleFaqToggle = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const handleFormChange = (field, value) => {
    setFormData((prev) => ({
      ...prev || {},
      [field]: value,
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name || '',
          email: formData.email || '',
          phone: formData.phone || '',
          source: 'Mortgage Refinance Guide',
          lead_type: 'Buyer',
          page_url: typeof window !== 'undefined' ? window.location.pathname : '',
          captured_at: new Date().toISOString(),
        }),
      });
      if (res.ok) {
        setFormSubmitted(true);
        setTimeout(() => setFormSubmitted(false), 3000);
        setFormData({ name: '', email: '', phone: '' });
      }
    } catch {
      setFormSubmitted(true);
      setTimeout(() => setFormSubmitted(false), 3000);
    }
  };

  const faqItems = [
    {
      question: 'What\u2019s the difference between a rate-and-term and cash-out refinance?',
      answer: 'A rate-and-term refinance replaces your loan with a new one at better terms. A cash-out refinance lets you borrow more than you owe and take the difference in cash.',
    },
    {
      question: 'How long does the refinance process take?',
      answer: 'Typically 30-45 days from application to closing, depending on appraisal and document review.',
    },
    {
      question: 'What\u2019s the break-even point?',
      answer: 'Calculate when your monthly savings equal closing costs. If you save $150/month and costs are $3,000, break-even is 20 months.',
    },
    {
      question: 'Will refinancing hurt my credit score?',
      answer: 'A small dip is normal (5-10 points) from the hard inquiry. Your score recovers within weeks as you make on-time payments.',
    },
    {
      question: 'Can I refinance with bad credit?',
      answer: 'It\u2019s harder but possible with FHA streamline loans or portfolio lenders. You\u2019ll likely face higher rates.',
    },
    {
      question: 'What if I have an adjustable-rate mortgage (ARM)?',
      answer: 'Refinancing to a fixed-rate mortgage locks in stability before your ARM rate adjusts, protecting you from increases.',
    },
  ];

  return (
    <article style={{ width: '100%' }}>
      {/* Hero Section */}
      <section
        style={{
          background: `linear-gradient(135deg, var(--le-primary) 0%, var(--le-accent) 100%)`,
          color: 'white',
          padding: '60px 20px',
          textAlign: 'center',
        }}
      >
        <h1 style={{ fontSize: '48px', marginBottom: '20px', fontWeight: '700' }}>
          The Complete Mortgage Refinance Guide
        </h1>
        <p style={{ fontSize: '20px', marginBottom: '0', opacity: '0.95' }}>
          Learn when, how, and why to refinance—plus expert tips to maximize your savings
        </p>
      </section>

      {/* Main Content */}
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '60px 20px' }}>
        {/* Quick Stats */}
        <section style={{ marginBottom: '60px' }}>
          <h2 style={{ fontSize: '32px', marginBottom: '30px', color: 'var(--le-text)' }}>
            Why Homeowners Refinance
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '20px',
              marginBottom: '30px',
            }}
          >
            {[
              { icon: '📉', label: 'Lower Rate', desc: 'Save on monthly payments' },
              { icon: '⏱️', label: 'Shorter Term', desc: 'Pay off faster' },
              { icon: '💰', label: 'Cash Out', desc: 'Access home equity' },
              { icon: '🔒', label: 'Fixed Rate', desc: 'Stability and predictability' },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  background: 'var(--le-card-bg)',
                  padding: '20px',
                  borderRadius: '8px',
                  border: '1px solid var(--le-border)',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: '32px', marginBottom: '10px' }}>{item.icon}</div>
                <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>
                  {item.label}
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--le-text)', opacity: '0.7' }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* When to Refinance */}
        <section style={{ marginBottom: '60px' }}>
          <h2 style={{ fontSize: '28px', marginBottom: '20px', color: 'var(--le-text)' }}>
            When Should You Refinance?
          </h2>
          <div style={{ background: 'var(--le-card-bg)', padding: '25px', borderRadius: '8px', border: '1px solid var(--le-border)' }}>
            <p style={{ marginBottom: '15px', lineHeight: '1.6' }}>
              Refinancing makes sense when your situation changes or rates drop. Consider these factors:
            </p>
            <ul style={{ marginLeft: '20px', lineHeight: '1.8' }}>
              <li>Interest rates are 0.5% to 1% lower than your current rate</li>
              <li>You\u2019ve built significant equity (typically 20%+ to avoid PMI)</li>
              <li>You plan to stay in your home at least 2–3 more years</li>
              <li>Your credit score has improved since you got your original loan</li>
              <li>You\u2019re coming out of an ARM that\u2019s about to adjust</li>
              <li>You need cash for home improvements, debt consolidation, or other goals</li>
            </ul>
          </div>
        </section>

        {/* Types of Refinance */}
        <section style={{ marginBottom: '60px' }}>
          <h2 style={{ fontSize: '28px', marginBottom: '20px', color: 'var(--le-text)' }}>
            Types of Mortgage Refinance
          </h2>
          <div style={{ display: 'grid', gap: '20px' }}>
            {[
              {
                title: 'Rate-and-Term Refinance',
                desc: 'Replace your loan with a new one at a better interest rate or shorter term. Most common type—perfect for lowering payments or paying off faster.',
              },
              {
                title: 'Cash-Out Refinance',
                desc: 'Borrow more than you owe and receive the difference in cash. Use equity for renovations, education, or debt consolidation.',
              },
              {
                title: 'FHA Streamline Refinance',
                desc: 'Simplified process for FHA loan holders. Less documentation, faster approval, limited appraisals—designed for speed.',
              },
              {
                title: 'VA Interest Rate Reduction Loan (IRRRL)',
                desc: 'Exclusive to VA loan holders. Streamlined process with minimal documentation to reduce your interest rate.',
              },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  background: 'var(--le-card-bg)',
                  padding: '20px',
                  borderRadius: '8px',
                  border: '1px solid var(--le-border)',
                  borderLeft: '4px solid var(--le-accent)',
                }}
              >
                <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '10px' }}>
                  {item.title}
                </h3>
                <p style={{ color: 'var(--le-text)', opacity: '0.85', lineHeight: '1.6' }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Refinance Process */}
        <section style={{ marginBottom: '60px' }}>
          <h2 style={{ fontSize: '28px', marginBottom: '20px', color: 'var(--le-text)' }}>
            The Refinance Process Step by Step
          </h2>
          <div style={{ position: 'relative' }}>
            {[
              { step: '1', title: 'Pre-Qualification', desc: 'Get quotes from lenders and see approval odds.' },
              { step: '2', title: 'Formal Application', desc: 'Submit financial docs (pay stubs, tax returns, bank statements).' },
              { step: '3', title: 'Home Appraisal', desc: 'Lender orders appraisal to verify home value.' },
              { step: '4', title: 'Underwriting Review', desc: 'Lender verifies info and assesses risk.' },
              { step: '5', title: 'Final Approval', desc: 'Clear conditions and receive final approval letter.' },
              { step: '6', title: 'Closing', desc: 'Sign documents and fund the new loan. Old loan is paid off.' },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  gap: '20px',
                  marginBottom: '30px',
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    width: '50px',
                    height: '50px',
                    background: 'var(--le-primary)',
                    color: 'white',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '700',
                    fontSize: '18px',
                    flexShrink: 0,
                  }}
                >
                  {item.step}
                </div>
                <div style={{ paddingTop: '5px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '5px' }}>
                    {item.title}
                  </h3>
                  <p style={{ color: 'var(--le-text)', opacity: '0.7', fontSize: '14px' }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Costs & Break-Even */}
        <section style={{ marginBottom: '60px' }}>
          <h2 style={{ fontSize: '28px', marginBottom: '20px', color: 'var(--le-text)' }}>
            Refinance Costs and Break-Even Analysis
          </h2>
          <div style={{ background: 'var(--le-card-bg)', padding: '25px', borderRadius: '8px', border: '1px solid var(--le-border)', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '15px' }}>
              Typical Closing Costs (2–5% of loan amount)
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px' }}>
              {[
                { item: 'Origination Fee', range: '$500–$1,500' },
                { item: 'Appraisal', range: '$300–$500' },
                { item: 'Title Search/Insurance', range: '$200–$400' },
                { item: 'Underwriting', range: '$500–$1,000' },
                { item: 'Processing', range: '$200–$500' },
                { item: 'Closing/Attorney', range: '$200–$500' },
              ].map((item, i) => (
                <div key={i}>
                  <p style={{ fontSize: '13px', color: 'var(--le-text)', opacity: '0.7', marginBottom: '5px' }}>
                    {item.item}
                  </p>
                  <p style={{ fontSize: '14px', fontWeight: '600', color: 'var(--le-primary)' }}>
                    {item.range}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div style={{ background: 'var(--le-card-bg)', padding: '25px', borderRadius: '8px', border: '1px solid var(--le-border)' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '15px' }}>
              How to Calculate Your Break-Even Point
            </h3>
            <p style={{ marginBottom: '10px', fontSize: '14px', lineHeight: '1.6' }}>
              Break-even = Total Closing Costs ÷ Monthly Payment Savings
            </p>
            <p style={{ fontSize: '13px', color: 'var(--le-text)', opacity: '0.75', marginBottom: '15px' }}>
              Example: If refinancing costs $3,000 and saves you $150/month, you break even in 20 months (3,000 ÷ 150).
            </p>
            <p style={{ fontSize: '14px', fontStyle: 'italic', color: 'var(--le-text)' }}>
              Only refinance if you\u2019ll stay in the home past your break-even date.
            </p>
          </div>
        </section>

        {/* Pros & Cons */}
        <section style={{ marginBottom: '60px' }}>
          <h2 style={{ fontSize: '28px', marginBottom: '20px', color: 'var(--le-text)' }}>
            Pros and Cons of Refinancing
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            <div
              style={{
                background: 'var(--le-card-bg)',
                padding: '20px',
                borderRadius: '8px',
                border: '2px solid #10b981',
              }}
            >
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '15px', color: '#10b981' }}>
                ✓ Advantages
              </h3>
              <ul style={{ marginLeft: '20px', lineHeight: '1.8', fontSize: '14px' }}>
                <li>Lower monthly payments and interest</li>
                <li>Shorter loan term (faster payoff)</li>
                <li>Access to home equity (cash-out)</li>
                <li>Switch ARM to fixed-rate security</li>
                <li>Consolidate high-interest debt</li>
                <li>Improve loan terms overall</li>
              </ul>
            </div>
            <div
              style={{
                background: 'var(--le-card-bg)',
                padding: '20px',
                borderRadius: '8px',
                border: '2px solid #ef4444',
              }}
            >
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '15px', color: '#ef4444' }}>
                ✗ Disadvantages
              </h3>
              <ul style={{ marginLeft: '20px', lineHeight: '1.8', fontSize: '14px' }}>
                <li>Closing costs ($2k–$5k+)</li>
                <li>Hard inquiry impacts credit score</li>
                <li>Application time (30–45 days)</li>
                <li>Requires stable income and good credit</li>
                <li>Resets loan clock (longer payoff)</li>
                <li>PMI may apply if equity is low</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Rate Environment Tips */}
        <section style={{ marginBottom: '60px' }}>
          <h2 style={{ fontSize: '28px', marginBottom: '20px', color: 'var(--le-text)' }}>
            Current Rate Environment and Strategy Tips
          </h2>
          <div style={{ background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)', padding: '25px', borderRadius: '8px', border: '1px solid var(--le-border)' }}>
            <p style={{ marginBottom: '15px', lineHeight: '1.6' }}>
              <strong>Today\u2019s market reality:</strong> Rates fluctuate based on Fed policy, inflation, and economic conditions. Even small rate drops create real savings.
            </p>
            <ul style={{ marginLeft: '20px', lineHeight: '1.8', fontSize: '14px' }}>
              <li>
                <strong>Monitor rates proactively:</strong> Track Freddie Mac and Mortgage News Daily for trends.
              </li>
              <li>
                <strong>Lock in early:</strong> When you see favorable rates, lock them immediately—rates can change daily.
              </li>
              <li>
                <strong>Shop multiple lenders:</strong> Get 3–5 quotes to compare rates, fees, and terms.
              </li>
              <li>
                <strong>Consider points:</strong> Pay upfront points to buy down your rate if you\u2019re staying long-term.
              </li>
              <li>
                <strong>Watch the Fed:</strong> FOMC announcements often trigger rate movements.
              </li>
            </ul>
          </div>
        </section>

        {/* Lead Capture CTA Form */}
        <section style={{ marginBottom: '60px', background: 'var(--le-card-bg)', padding: '40px', borderRadius: '12px', border: '1px solid var(--le-border)' }}>
          <h2 style={{ fontSize: '28px', marginBottom: '10px', color: 'var(--le-text)', textAlign: 'center' }}>
            Ready to Explore Refinancing?
          </h2>
          <p style={{ textAlign: 'center', color: 'var(--le-text)', opacity: '0.75', marginBottom: '30px' }}>
            Connect with a mortgage specialist to review your options and get personalized quotes.
          </p>
          <form onSubmit={handleFormSubmit}>
            <div style={{ display: 'grid', gap: '15px', maxWidth: '500px', margin: '0 auto' }}>
              <input
                type="text"
                placeholder="Your Full Name"
                value={formData?.name || ''}
                onChange={(e) => handleFormChange('name', e.target.value)}
                style={{
                  padding: '12px',
                  borderRadius: '6px',
                  border: '1px solid var(--le-border)',
                  fontSize: '14px',
                  fontFamily: 'inherit',
                  backgroundColor: 'var(--le-bg)',
                  color: 'var(--le-text)',
                }}
                required
              />
              <input
                type="email"
                placeholder="Your Email"
                value={formData?.email || ''}
                onChange={(e) => handleFormChange('email', e.target.value)}
                style={{
                  padding: '12px',
                  borderRadius: '6px',
                  border: '1px solid var(--le-border)',
                  fontSize: '14px',
                  fontFamily: 'inherit',
                  backgroundColor: 'var(--le-bg)',
                  color: 'var(--le-text)',
                }}
                required
              />
              <input
                type="tel"
                placeholder="Your Phone"
                value={formData?.phone || ''}
                onChange={(e) => handleFormChange('phone', e.target.value)}
                style={{
                  padding: '12px',
                  borderRadius: '6px',
                  border: '1px solid var(--le-border)',
                  fontSize: '14px',
                  fontFamily: 'inherit',
                  backgroundColor: 'var(--le-bg)',
                  color: 'var(--le-text)',
                }}
                required
              />
              <select
                value={formData?.refinanceType || ''}
                onChange={(e) => handleFormChange('refinanceType', e.target.value)}
                style={{
                  padding: '12px',
                  borderRadius: '6px',
                  border: '1px solid var(--le-border)',
                  fontSize: '14px',
                  fontFamily: 'inherit',
                  backgroundColor: 'var(--le-bg)',
                  color: 'var(--le-text)',
                }}
                required
              >
                <option value="">I\u2019m interested in...</option>
                <option value="rate-term">Rate-and-Term Refinance</option>
                <option value="cash-out">Cash-Out Refinance</option>
                <option value="streamline">FHA Streamline</option>
                <option value="not-sure">Not Sure Yet</option>
              </select>
              <button
                type="submit"
                style={{
                  padding: '14px',
                  background: 'var(--le-primary)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--le-hover)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--le-primary)')}
              >
                Get My Free Quote
              </button>
            </div>
            {formSubmitted && (
              <p style={{ textAlign: 'center', color: '#10b981', marginTop: '15px', fontSize: '14px' }}>
                ✓ Thank you! A specialist will contact you shortly.
              </p>
            )}
          </form>
        </section>

        {/* FAQ Accordion */}
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '28px', marginBottom: '20px', color: 'var(--le-text)' }}>
            Frequently Asked Questions
          </h2>
          <div style={{ display: 'grid', gap: '12px' }}>
            {faqItems.map((item, i) => (
              <div
                key={i}
                style={{
                  border: '1px solid var(--le-border)',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  background: 'var(--le-card-bg)',
                }}
              >
                <button
                  onClick={() => handleFaqToggle(i)}
                  style={{
                    width: '100%',
                    padding: '16px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '15px',
                    fontWeight: '600',
                    color: 'var(--le-text)',
                    transition: 'background 0.15s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--le-hover)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  {item.question}
                  <span
                    style={{
                      display: 'inline-block',
                      transform: expandedFaq === i ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s',
                      fontSize: '18px',
                    }}
                  >
                    ▼
                  </span>
                </button>
                {expandedFaq === i && (
                  <div
                    style={{
                      padding: '0 16px 16px',
                      borderTop: '1px solid var(--le-border)',
                      color: 'var(--le-text)',
                      opacity: '0.85',
                      lineHeight: '1.6',
                      fontSize: '14px',
                    }}
                  >
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Closing CTA */}
        <section
          style={{
            background: 'linear-gradient(135deg, var(--le-primary) 0%, var(--le-accent) 100%)',
            color: 'white',
            padding: '40px',
            borderRadius: '12px',
            textAlign: 'center',
            marginBottom: '40px',
          }}
        >
          <h2 style={{ fontSize: '24px', marginBottom: '15px' }}>
            Don\u2019t Leave Money on the Table
          </h2>
          <p style={{ marginBottom: '25px', opacity: '0.95', lineHeight: '1.6' }}>
            Even a 0.5% rate reduction saves thousands over your loan\u2019s lifetime. Talk to a specialist today.
          </p>
          <button
            style={{
              padding: '14px 32px',
              background: 'white',
              color: 'var(--le-primary)',
              border: 'none',
              borderRadius: '6px',
              fontSize: '15px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'transform 0.15s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            Start Your Free Refinance Analysis
          </button>
        </section>
      </div>
    </article>
  );
}
