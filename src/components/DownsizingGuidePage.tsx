'use client';

import { useState } from 'react';

export default function DownsizingGuidePage() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [openFAQ, setOpenFAQ] = useState(0);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: any) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const name = (formData.get('name') as string) || '';
    const email = (formData.get('email') as string) || '';
    const phone = (formData.get('phone') as string) || '';
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          source: 'Downsizing Guide',
          lead_type: 'Buyer',
          page_url: typeof window !== 'undefined' ? window.location.pathname : '/downsizingguide',
          captured_at: new Date().toISOString(),
        }),
      });
      if (res.ok) {
        form.reset();
        alert('Thank you! We\u2019ll be in touch soon.');
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch {
      alert('Something went wrong. Please try again.');
    }
  };

  const checklist = [
    'Kids have moved out or are about to',
    'Maintaining the home feels overwhelming',
    'Property taxes and utilities are rising',
    'You want to eliminate mortgage debt',
    'Desire for a simpler lifestyle',
    'Ready to relocate or travel more',
  ];

  const declutterTips = [
    {
      title: 'The Four-Box Method',
      description: 'Keep, donate, sell, or discard. Be honest about what you actually use.',
    },
    {
      title: 'Room-by-Room Approach',
      description: 'Tackle one room at a time to avoid feeling overwhelmed by the scope.',
    },
    {
      title: 'Digitize Documents',
      description: 'Scan important papers and store them securely in the cloud.',
    },
    {
      title: 'The "One Year" Rule',
      description: 'If you haven\u2019t used something in a year, it\u2019s probably safe to let it go.',
    },
    {
      title: 'Photograph Sentimental Items',
      description: 'Keep memories without keeping the physical clutter.',
    },
    {
      title: 'Sell High-Value Items',
      description: 'Furniture, art, and collectibles can offset moving costs.',
    },
  ];

  const faqItems = [
    {
      question: 'How much can I save by downsizing?',
      answer:
        'Savings vary based on your current and future property values, but homeowners typically save 20-40% annually on property taxes, utilities, and maintenance costs. Cashing out home equity can provide a substantial financial cushion.',
    },
    {
      question: 'What\u2019s the best time of year to downsize?',
      answer:
        'Spring and early summer offer the most buyer activity. However, selling in quieter months can mean less competition. Consider your personal timeline and market conditions.',
    },
    {
      question: 'How do I choose the right smaller home?',
      answer:
        'Prioritize location, walkability, and community amenities. Visit at different times of day. Consider proximity to healthcare, shopping, and family. Think about long-term accessibility as you age.',
    },
    {
      question: 'Should I downsize before or after retirement?',
      answer:
        'Many experts recommend downsizing 2-3 years before retirement to allow time to adjust and to use proceeds for retirement planning. However, personal circumstances vary.',
    },
    {
      question: 'How do I manage the emotional aspect?',
      answer:
        'Take your time. Involve family in decisions. Focus on the benefits: less stress, lower costs, more freedom. Consider it a new chapter, not an ending.',
    },
    {
      question: 'What about storage in a smaller home?',
      answer:
        'Built-in shelving, vertical storage, and multi-functional furniture maximize space. Some people use off-site storage initially, but the goal is to own less.',
    },
  ];

  return (
    <div style={{ backgroundColor: 'var(--le-bg)', color: 'var(--le-text)' }}>
      {/* Hero Section */}
      <section
        style={{
          backgroundImage: 'linear-gradient(135deg, var(--le-primary) 0%, var(--le-accent) 100%)',
          color: '#ffffff',
          padding: '80px 20px',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '3.5rem', fontWeight: '700', marginBottom: '20px', lineHeight: '1.2' }}>
            The Complete Downsizing Guide
          </h1>
          <p style={{ fontSize: '1.25rem', marginBottom: '30px', fontWeight: '300', lineHeight: '1.6' }}>
            Simplify your life, lower your costs, and discover the freedom of a smaller home. Your downsizing journey starts here.
          </p>
          <a
            href="#lead-form"
            style={{
              display: 'inline-block',
              backgroundColor: '#ffffff',
              color: 'var(--le-primary)',
              padding: '16px 40px',
              fontSize: '1.1rem',
              fontWeight: '600',
              borderRadius: '8px',
              textDecoration: 'none',
              transition: 'transform 0.3s, box-shadow 0.3s',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Get Your Free Guide
          </a>
        </div>
      </section>

      {/* Why Downsize Section */}
      <section style={{ padding: '80px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '50px', textAlign: 'center', fontWeight: '700' }}>
          Why Downsize?
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '40px',
          }}
        >
          <article
            style={{
              padding: '40px',
              backgroundColor: 'var(--le-card-bg)',
              borderRadius: '12px',
              border: `1px solid var(--le-border)`,
            }}
          >
            <div style={{ marginBottom: '20px' }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--le-primary)" strokeWidth="2">
                <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"></path>
                <path d="M10 17l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"></path>
              </svg>
            </div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '15px', fontWeight: '600' }}>Financial Benefits</h3>
            <p style={{ lineHeight: '1.7', color: 'var(--le-text)', opacity: 0.9 }}>
              Reduce property taxes, insurance, and maintenance costs. Free up equity to pay off debt or invest in retirement.
            </p>
          </article>

          <article
            style={{
              padding: '40px',
              backgroundColor: 'var(--le-card-bg)',
              borderRadius: '12px',
              border: `1px solid var(--le-border)`,
            }}
          >
            <div style={{ marginBottom: '20px' }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--le-primary)" strokeWidth="2">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"></path>
              </svg>
            </div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '15px', fontWeight: '600' }}>Lifestyle Freedom</h3>
            <p style={{ lineHeight: '1.7', color: 'var(--le-text)', opacity: 0.9 }}>
              Less cleaning, less upkeep, more time for what matters. Spend weekends enjoying life, not maintaining property.
            </p>
          </article>

          <article
            style={{
              padding: '40px',
              backgroundColor: 'var(--le-card-bg)',
              borderRadius: '12px',
              border: `1px solid var(--le-border)`,
            }}
          >
            <div style={{ marginBottom: '20px' }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--le-primary)" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
            </div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '15px', fontWeight: '600' }}>Community Living</h3>
            <p style={{ lineHeight: '1.7', color: 'var(--le-text)', opacity: 0.9 }}>
              Many downsized homes are in vibrant neighborhoods with walkable amenities and active communities.
            </p>
          </article>
        </div>
      </section>

      {/* When to Downsize Checklist */}
      <section style={{ padding: '80px 20px', backgroundColor: 'var(--le-card-bg)', borderTop: `1px solid var(--le-border)`, borderBottom: `1px solid var(--le-border)` }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '50px', textAlign: 'center', fontWeight: '700' }}>
            Is It Time to Downsize?
          </h2>
          <p style={{ fontSize: '1.1rem', marginBottom: '40px', textAlign: 'center', color: 'var(--le-text)', opacity: 0.9 }}>
            Check if these signs resonate with you:
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {checklist.map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '20px',
                  backgroundColor: 'var(--le-bg)',
                  borderRadius: '8px',
                  border: `1px solid var(--le-border)`,
                }}
              >
                <div
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--le-primary)',
                    marginRight: '16px',
                    flexShrink: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                    fontWeight: 'bold',
                    fontSize: '0.9rem',
                  }}
                >
                  ✓
                </div>
                <p style={{ fontSize: '1rem', fontWeight: '500' }}>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Decluttering Tips */}
      <section style={{ padding: '80px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '50px', textAlign: 'center', fontWeight: '700' }}>
          Master the Art of Decluttering
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '30px',
          }}
        >
          {declutterTips.map((tip, idx) => (
            <article
              key={idx}
              style={{
                padding: '30px',
                backgroundColor: 'var(--le-card-bg)',
                borderRadius: '12px',
                border: `1px solid var(--le-border)`,
                transition: 'border-color 0.3s, box-shadow 0.3s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--le-primary)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--le-border)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <h3 style={{ fontSize: '1.3rem', marginBottom: '12px', fontWeight: '600', color: 'var(--le-primary)' }}>
                {tip.title}
              </h3>
              <p style={{ lineHeight: '1.7', color: 'var(--le-text)', opacity: 0.9 }}>{tip.description}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Choosing the Right Smaller Home */}
      <section style={{ padding: '80px 20px', backgroundColor: 'var(--le-card-bg)', borderTop: `1px solid var(--le-border)` }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '50px', textAlign: 'center', fontWeight: '700' }}>
            Choosing Your Perfect Smaller Home
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
            <div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '20px', fontWeight: '600', color: 'var(--le-primary)' }}>
                Priority Features
              </h3>
              <ul style={{ lineHeight: '2', paddingLeft: '20px' }}>
                <li>Walk-in closets and storage solutions</li>
                <li>Modern kitchen with efficient layout</li>
                <li>Accessible bathrooms (aging in place)</li>
                <li>Good natural light</li>
                <li>Energy-efficient systems</li>
              </ul>
            </div>
            <div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '20px', fontWeight: '600', color: 'var(--le-primary)' }}>
                Community Matters
              </h3>
              <ul style={{ lineHeight: '2', paddingLeft: '20px' }}>
                <li>Walkable to shops and restaurants</li>
                <li>Proximity to healthcare facilities</li>
                <li>Active and friendly community</li>
                <li>Safe neighborhood with good schools</li>
                <li>Access to parks and recreation</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Financial Considerations */}
      <section style={{ padding: '80px 20px', maxWidth: '1000px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '50px', textAlign: 'center', fontWeight: '700' }}>
          Financial Considerations
        </h2>
        <div
          style={{
            padding: '40px',
            backgroundColor: 'var(--le-card-bg)',
            borderRadius: '12px',
            border: `2px solid var(--le-primary)`,
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
            <div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '15px', fontWeight: '600' }}>Costs to Plan For</h3>
              <p style={{ lineHeight: '1.8', opacity: 0.9 }}>
                Realtor commissions, closing costs, moving expenses, and potential staging costs. However, these typically pay for themselves through the savings achieved.
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '15px', fontWeight: '600' }}>Ways to Maximize Returns</h3>
              <p style={{ lineHeight: '1.8', opacity: 0.9 }}>
                Price competitively, stage your current home, time the market right, negotiate earnest money, and leverage your equity wisely in your new purchase.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Emotional Preparation */}
      <section style={{ padding: '80px 20px', backgroundColor: 'var(--le-card-bg)', borderTop: `1px solid var(--le-border)` }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '40px', textAlign: 'center', fontWeight: '700' }}>
            Preparing Emotionally for Downsizing
          </h2>
          <div
            style={{
              backgroundColor: 'var(--le-bg)',
              padding: '40px',
              borderRadius: '12px',
              border: `1px solid var(--le-border)`,
            }}
          >
            <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '25px' }}>
              Leaving a home filled with memories is hard. This space holds decades of family moments, holidays, and milestones. That\u2019s normal and valid.
            </p>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '25px' }}>
              Focus on the transition as a new beginning rather than an ending. Photograph special rooms. Share stories with family before you leave. Create a memory box with keepsakes.
            </p>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
              Many downsizers report feeling liberated and energized once they\u2019ve settled into their new homes. The freedom outweighs the nostalgia. And with less to maintain, you\u2019ll have more energy to create new memories.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section style={{ padding: '80px 20px', maxWidth: '900px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '50px', textAlign: 'center', fontWeight: '700' }}>
          Frequently Asked Questions
        </h2>
        <div style={{ display: 'grid', gap: '12px' }}>
          {faqItems.map((item, idx) => (
            <div key={idx} style={{ borderBottom: `1px solid var(--le-border)` }}>
              <button
                onClick={() => setOpenFAQ(openFAQ === idx ? -1 : idx)}
                style={{
                  width: '100%',
                  padding: '24px',
                  backgroundColor: openFAQ === idx ? 'var(--le-card-bg)' : 'transparent',
                  border: 'none',
                  textAlign: 'left',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  transition: 'background-color 0.3s',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  color: 'var(--le-text)',
                }}
                onMouseEnter={(e) => {
                  if (openFAQ !== idx) e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.02)';
                }}
                onMouseLeave={(e) => {
                  if (openFAQ !== idx) e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                {item.question}
                <span style={{ fontSize: '1.5rem', transition: 'transform 0.3s', transform: openFAQ === idx ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                  ▼
                </span>
              </button>
              {openFAQ === idx && (
                <div style={{ padding: '20px 24px 24px', backgroundColor: 'var(--le-card-bg)', fontSize: '1rem', lineHeight: '1.8', color: 'var(--le-text)', opacity: 0.9 }}>
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Lead Capture Form */}
      <section
        id="lead-form"
        style={{
          padding: '80px 20px',
          backgroundColor: 'var(--le-card-bg)',
          borderTop: `1px solid var(--le-border)`,
        }}
      >
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.2rem', marginBottom: '20px', textAlign: 'center', fontWeight: '700' }}>
            Ready to Downsize?
          </h2>
          <p style={{ textAlign: 'center', marginBottom: '40px', fontSize: '1.1rem', opacity: 0.9 }}>
            Get personalized guidance and connect with a real estate expert who specializes in downsizing.
          </p>
          <form onSubmit={handleFormSubmit} style={{ display: 'grid', gap: '20px' }}>
            <div>
              <label
                htmlFor="name"
                style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: '600',
                  fontSize: '0.95rem',
                }}
              >
                Full Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
                required
                style={{
                  width: '100%',
                  padding: '14px',
                  fontSize: '1rem',
                  border: `1px solid var(--le-border)`,
                  borderRadius: '8px',
                  backgroundColor: 'var(--le-bg)',
                  color: 'var(--le-text)',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.3s',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'var(--le-primary)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'var(--le-border)';
                }}
              />
            </div>
            <div>
              <label
                htmlFor="email"
                style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: '600',
                  fontSize: '0.95rem',
                }}
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleFormChange}
                required
                style={{
                  width: '100%',
                  padding: '14px',
                  fontSize: '1rem',
                  border: `1px solid var(--le-border)`,
                  borderRadius: '8px',
                  backgroundColor: 'var(--le-bg)',
                  color: 'var(--le-text)',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.3s',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'var(--le-primary)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'var(--le-border)';
                }}
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: '600',
                  fontSize: '0.95rem',
                }}
              >
                Phone
              </label>
              <input
                id="phone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleFormChange}
                required
                style={{
                  width: '100%',
                  padding: '14px',
                  fontSize: '1rem',
                  border: `1px solid var(--le-border)`,
                  borderRadius: '8px',
                  backgroundColor: 'var(--le-bg)',
                  color: 'var(--le-text)',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.3s',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'var(--le-primary)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'var(--le-border)';
                }}
              />
            </div>
            <button
              type="submit"
              style={{
                padding: '16px',
                fontSize: '1.1rem',
                fontWeight: '600',
                backgroundColor: 'var(--le-primary)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'background-color 0.3s, transform 0.3s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--le-hover)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--le-primary)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Get Your Downsizing Guide
            </button>
          </form>
        </div>
      </section>

      {/* Footer CTA */}
      <section style={{ padding: '60px 20px', textAlign: 'center', backgroundColor: 'var(--le-bg)', borderTop: `1px solid var(--le-border)` }}>
        <h3 style={{ fontSize: '1.8rem', marginBottom: '20px', fontWeight: '600' }}>
          Need personalized advice?
        </h3>
        <p style={{ marginBottom: '30px', fontSize: '1.1rem', opacity: 0.9 }}>
          Our real estate experts can help you navigate every step of your downsizing journey.
        </p>
        <a
          href="/contact"
          style={{
            display: 'inline-block',
            padding: '14px 32px',
            backgroundColor: 'var(--le-primary)',
            color: '#ffffff',
            textDecoration: 'none',
            borderRadius: '8px',
            fontWeight: '600',
            transition: 'background-color 0.3s, transform 0.3s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--le-hover)';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--le-primary)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          Schedule a Consultation
        </a>
      </section>
    </div>
  );
}
