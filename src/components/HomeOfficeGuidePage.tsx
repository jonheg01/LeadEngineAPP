'use client';

import { useState } from 'react';

export default function HomeOfficeGuidePage() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Lead captured:', formData);
    setFormData({ name: '', email: '', phone: '' });
    alert('Thank you! We\u2019ll be in touch soon.');
  };

  const faqItems = [
    {
      question: 'What square footage do I need for a home office?',
      answer: 'A dedicated home office should ideally be 10-15 square feet minimum for comfort. This allows space for a desk, chair, shelving, and movement. Larger spaces (over 150 square feet) offer flexibility for meetings and equipment.'
    },
    {
      question: 'How important is natural light for productivity?',
      answer: 'Natural light is crucial—studies show it boosts productivity and mood. Look for homes with east or north-facing windows in your office space. This reduces glare while providing consistent illumination throughout the day.'
    },
    {
      question: 'Can I deduct home office expenses from taxes?',
      answer: 'Yes! The IRS allows home office deductions if you use a dedicated space exclusively for work. You can deduct utilities, rent/mortgage interest, repairs, supplies, and depreciation. Keep detailed records and consult a tax professional.'
    },
    {
      question: 'What internet speeds do remote workers need?',
      answer: 'For video calls and streaming, aim for at least 10-25 Mbps download and 2-5 Mbps upload. For heavy uploads or multiple users, 50+ Mbps is better. Ask the seller about ISP options and previous speeds.'
    },
    {
      question: 'How do I reduce noise in a home office?',
      answer: 'Install weatherstripping, use thick curtains, add rugs and acoustic panels, and consider foam sound insulation. Newer homes often have better insulation. Corner offices away from busy streets are ideal for sound control.'
    }
  ];

  const features = [
    {
      icon: '☀️',
      title: 'Natural Light',
      description: 'Windows positioned to provide consistent daylight without harsh glare. Energy efficient and boosts focus.'
    },
    {
      icon: '🔇',
      title: 'Soundproofing',
      description: 'Insulated walls, carpet, and design that minimizes external noise and keeps video calls clear.'
    },
    {
      icon: '🚪',
      title: 'Dedicated Space',
      description: 'A separate room or enclosed area that keeps work distinct from living space for better focus.'
    },
    {
      icon: '📡',
      title: 'Internet Infrastructure',
      description: 'Fiber or cable internet available, proper router placement, and backup connectivity options.'
    },
    {
      icon: '🌡️',
      title: 'Climate Control',
      description: 'Independent temperature control to maintain comfort during long work days year-round.'
    },
    {
      icon: '⚡',
      title: 'Power & Outlets',
      description: 'Multiple outlets, dedicated circuits, and surge protection for equipment and charging needs.'
    }
  ];

  const neighborhoods = [
    'Downtown Tech District - Fast fiber internet, walkable cafes, vibrant community',
    'Riverside Quiet Zone - Tree-lined streets, low traffic noise, family-friendly',
    'University Heights - Young professional hub, modern apartments, excellent connectivity',
    'Westside Creative District - Artist community, flexible leases, collaborative spaces',
    'North End Business Park - Corporate proximity, professional services, established infrastructure'
  ];

  const designTips = [
    'Invest in an ergonomic chair and sit-stand desk for health and productivity',
    'Use task lighting to supplement natural light and reduce eye strain',
    'Choose calming colors—soft blues and greens increase focus and creativity',
    'Add storage solutions to keep your space organized and distraction-free',
    'Consider a small plant or water feature for improved air quality and mental clarity',
    'Position your desk to face a window or door—natural sightlines reduce fatigue'
  ];

  return (
    <div style={{ background: 'var(--le-bg)', color: 'var(--le-text)' }}>
      {/* Hero Section */}
      <section
        style={{
          padding: '80px 40px',
          textAlign: 'center',
          background: `linear-gradient(135deg, var(--le-primary), var(--le-accent))`,
          color: 'white'
        }}
      >
        <h1 style={{ fontSize: '48px', fontWeight: '700', marginBottom: '20px', lineHeight: '1.2' }}>
          Your Perfect Home Office Awaits
        </h1>
        <p style={{ fontSize: '20px', marginBottom: '30px', opacity: 0.95, maxWidth: '700px', margin: '0 auto 30px' }}>
          Remote work has changed everything. Your home is now your office. Discover homes designed for productivity, focus, and professional success.
        </p>
        <button
          onClick={() => document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })}
          style={{
            padding: '14px 40px',
            fontSize: '16px',
            fontWeight: '600',
            background: 'white',
            color: 'var(--le-primary)',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'transform 0.2s'
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
          onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          Find Your Ideal Home
        </button>
      </section>

      {/* Why Home Office Matters */}
      <section style={{ padding: '80px 40px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '40px', textAlign: 'center' }}>
          Why Your Home Office Matters in 2026
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '30px'
          }}
        >
          {[
            {
              title: 'Work-Life Balance',
              text: 'A dedicated office space creates psychological separation between work and home. This improves focus during work hours and allows genuine relaxation when you\u2019re done.'
            },
            {
              title: 'Productivity & Earnings',
              text: 'Studies show remote workers in dedicated spaces earn 10-20% more than those without proper setups. Better environments equal better output and career advancement.'
            },
            {
              title: 'Tax Advantages',
              text: 'A dedicated home office qualifies for significant IRS deductions—office supplies, utilities, equipment, and even mortgage interest portions are deductible.'
            },
            {
              title: 'Property Value',
              text: 'Homes with professional-grade office spaces are increasingly attractive to today\u2019s buyers. Your investment in a good setup protects and enhances your property value.'
            }
          ].map((item, idx) => (
            <div
              key={idx}
              style={{
                padding: '30px',
                background: 'var(--le-card-bg)',
                borderRadius: '12px',
                border: `1px solid var(--le-border)`,
                transition: 'box-shadow 0.3s'
              }}
              onMouseOver={(e) => (e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)')}
              onMouseOut={(e) => (e.currentTarget.style.boxShadow = 'none')}
            >
              <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px' }}>
                {item.title}
              </h3>
              <p style={{ fontSize: '16px', lineHeight: '1.6', opacity: 0.85 }}>
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Key Features Section */}
      <section style={{ padding: '80px 40px', background: 'var(--le-card-bg)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '50px', textAlign: 'center' }}>
            What to Look For in a Home Office
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '40px'
            }}
          >
            {features.map((feature, idx) => (
              <article key={idx} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>
                  {feature.icon}
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px' }}>
                  {feature.title}
                </h3>
                <p style={{ fontSize: '15px', lineHeight: '1.6', opacity: 0.8 }}>
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Design Tips */}
      <section style={{ padding: '80px 40px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '40px', textAlign: 'center' }}>
          Home Office Design Tips
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px'
          }}
        >
          {designTips.map((tip, idx) => (
            <div
              key={idx}
              style={{
                padding: '20px',
                background: 'var(--le-card-bg)',
                borderRadius: '8px',
                borderLeft: `4px solid var(--le-primary)`,
                display: 'flex',
                alignItems: 'flex-start',
                gap: '16px'
              }}
            >
              <div
                style={{
                  fontSize: '20px',
                  fontWeight: '700',
                  color: 'var(--le-primary)',
                  minWidth: '24px'
                }}
              >
                ✓
              </div>
              <p style={{ fontSize: '16px', lineHeight: '1.5' }}>
                {tip}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Tax Deductions */}
      <section style={{ padding: '60px 40px', background: 'linear-gradient(135deg, rgba(var(--le-primary-rgb), 0.05), rgba(var(--le-accent-rgb), 0.05))' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '30px', textAlign: 'center' }}>
            Tax Deductions for Home Offices
          </h2>
          <p style={{ fontSize: '16px', lineHeight: '1.7', marginBottom: '30px', textAlign: 'center' }}>
            The IRS allows you to deduct legitimate home office expenses using two methods:
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '25px'
            }}
          >
            <div style={{ padding: '25px', background: 'white', borderRadius: '8px', border: `1px solid var(--le-border)` }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '15px' }}>
                Simplified Method
              </h3>
              <p style={{ fontSize: '15px', lineHeight: '1.6', marginBottom: '15px' }}>
                Deduct $5 per square foot (up to 300 sq ft = $1,500 max).
              </p>
              <p style={{ fontSize: '13px', opacity: 0.75 }}>
                Easiest for tax filing, no detailed record keeping required.
              </p>
            </div>
            <div style={{ padding: '25px', background: 'white', borderRadius: '8px', border: `1px solid var(--le-border)` }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '15px' }}>
                Regular Method
              </h3>
              <p style={{ fontSize: '15px', lineHeight: '1.6', marginBottom: '15px' }}>
                Deduct actual expenses: utilities, mortgage interest, repairs, supplies, depreciation.
              </p>
              <p style={{ fontSize: '13px', opacity: 0.75 }}>
                Higher deductions possible; requires detailed documentation.
              </p>
            </div>
          </div>
          <p style={{ fontSize: '14px', marginTop: '25px', textAlign: 'center', opacity: 0.7, fontStyle: 'italic' }}>
            Consult a tax professional to determine the best method for your situation.
          </p>
        </div>
      </section>

      {/* Best Neighborhoods */}
      <section style={{ padding: '80px 40px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '50px', textAlign: 'center' }}>
          Best Neighborhoods for Remote Workers
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px'
          }}
        >
          {neighborhoods.map((neighborhood, idx) => (
            <div
              key={idx}
              style={{
                padding: '25px',
                background: 'var(--le-card-bg)',
                borderRadius: '8px',
                border: `1px solid var(--le-border)`,
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '4px',
                  height: '100%',
                  background: 'var(--le-primary)'
                }}
              />
              <p style={{ fontSize: '16px', lineHeight: '1.5', paddingLeft: '12px' }}>
                {neighborhood}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Lead Capture Form */}
      <section
        id="lead-form"
        style={{
          padding: '80px 40px',
          background: `linear-gradient(135deg, var(--le-primary), var(--le-accent))`,
          color: 'white'
        }}
      >
        <div style={{ maxWidth: '500px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '15px', textAlign: 'center' }}>
            Ready to Find Your Perfect Home Office?
          </h2>
          <p style={{ fontSize: '16px', marginBottom: '40px', textAlign: 'center', opacity: 0.95 }}>
            Tell us about your work-from-home needs. We\u2019ll match you with homes that have the ideal office setup.
          </p>
          <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleFormChange}
              required
              style={{
                padding: '12px 16px',
                border: 'none',
                borderRadius: '6px',
                fontSize: '15px',
                fontFamily: 'inherit'
              }}
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleFormChange}
              required
              style={{
                padding: '12px 16px',
                border: 'none',
                borderRadius: '6px',
                fontSize: '15px',
                fontFamily: 'inherit'
              }}
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleFormChange}
              style={{
                padding: '12px 16px',
                border: 'none',
                borderRadius: '6px',
                fontSize: '15px',
                fontFamily: 'inherit'
              }}
            />
            <button
              type="submit"
              style={{
                padding: '14px',
                background: 'white',
                color: 'var(--le-primary)',
                border: 'none',
                borderRadius: '6px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                marginTop: '8px',
                transition: 'opacity 0.2s'
              }}
              onMouseOver={(e) => (e.currentTarget.style.opacity = '0.9')}
              onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
            >
              Get Personalized Recommendations
            </button>
          </form>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section style={{ padding: '80px 40px', maxWidth: '800px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '50px', textAlign: 'center' }}>
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
                background: 'var(--le-card-bg)'
              }}
            >
              <button
                onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                style={{
                  width: '100%',
                  padding: '20px',
                  background: 'transparent',
                  border: 'none',
                  textAlign: 'left',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  transition: 'background 0.2s'
                }}
                onMouseOver={(e) => (e.currentTarget.style.background = 'rgba(0,0,0,0.03)')}
                onMouseOut={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                <span>{item.question}</span>
                <span style={{ fontSize: '20px', transition: 'transform 0.3s', transform: expandedFaq === idx ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                  ▼
                </span>
              </button>
              {expandedFaq === idx && (
                <div style={{ padding: '0 20px 20px 20px', borderTop: `1px solid var(--le-border)`, marginTop: '10px' }}>
                  <p style={{ fontSize: '15px', lineHeight: '1.6', opacity: 0.85 }}>
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <section style={{ padding: '60px 40px', textAlign: 'center', background: 'var(--le-card-bg)', borderTop: `1px solid var(--le-border)` }}>
        <h3 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>
          Don\u2019t Compromise on Your Workspace
        </h3>
        <p style={{ fontSize: '16px', marginBottom: '24px', opacity: 0.8 }}>
          Your home is your office. Let\u2019s find you the perfect match.
        </p>
        <button
          onClick={() => document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })}
          style={{
            padding: '12px 32px',
            fontSize: '15px',
            fontWeight: '600',
            background: 'var(--le-primary)',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            transition: 'opacity 0.2s'
          }}
          onMouseOver={(e) => (e.currentTarget.style.opacity = '0.9')}
          onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
        >
          Start Your Search Today
        </button>
      </section>
    </div>
  );
}
