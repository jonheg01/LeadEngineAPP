'use client';

import React, { useState } from 'react';

export default function EcoFriendlyLivingPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: 'general'
  });
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 3000);
    setFormData({ name: '', email: '', phone: '', interest: 'general' });
  };

  const faqItems = [
    {
      question: 'What are the long-term cost savings from eco-friendly homes?',
      answer: 'Eco-friendly homes typically save 20-30% on energy costs annually through superior insulation, efficient HVAC systems, and renewable energy sources. Over 10 years, this translates to $15,000-$30,000 in utility savings, plus increased home value.'
    },
    {
      question: 'Are green certifications worth the investment?',
      answer: 'Yes. LEED and Energy Star certified homes command 3-5% higher resale prices and sell 26-30% faster. The certification investment pays back through increased property value and buyer demand.'
    },
    {
      question: 'How do solar panels affect home resale?',
      answer: 'Solar-equipped homes sell for approximately 4% more and have higher buyer interest. Studies show homes with solar sell 50% faster, especially in sunny regions.'
    },
    {
      question: 'What water conservation features are most effective?',
      answer: 'Low-flow fixtures reduce water use by 30%, rainwater harvesting systems eliminate landscape irrigation costs, and greywater systems save 25-50% on water bills. These systems typically pay for themselves in 5-7 years.'
    },
    {
      question: 'Can I retrofit an existing home to be eco-friendly?',
      answer: 'Absolutely. Start with energy audits, upgrade insulation, install a heat pump, add solar panels, and implement water-saving fixtures. Many retrofits qualify for tax credits and rebates.'
    },
    {
      question: 'What makes a neighborhood eco-friendly?',
      answer: 'Green neighborhoods feature walkable designs, public transit, community gardens, tree coverage, green building standards, and access to parks. These communities have lower emissions, better health outcomes, and strong property values.'
    }
  ];

  const certifications = [
    {
      name: 'LEED Certification',
      levels: 'Certified, Silver, Gold, Platinum',
      focus: 'Comprehensive sustainability across all building systems'
    },
    {
      name: 'Energy Star',
      levels: 'Standard designation',
      focus: 'Energy efficiency superior to building codes'
    },
    {
      name: 'Living Building Challenge',
      levels: 'Most stringent certification',
      focus: 'Zero-net-energy, regenerative design'
    },
    {
      name: 'Passivhaus',
      levels: 'European standard',
      focus: 'Ultra-low energy consumption through passive design'
    }
  ];

  const benefits = [
    {
      icon: 'dollar',
      title: 'Energy Savings',
      description: 'Reduce utility bills by 20-30% annually with efficient heating, cooling, and renewable energy systems.'
    },
    {
      icon: 'heart',
      title: 'Health Benefits',
      description: 'Improved air quality, natural lighting, and non-toxic materials create healthier living environments.'
    },
    {
      icon: 'trending',
      title: 'Resale Value',
      description: 'Green homes sell for 3-5% more and move 25-30% faster than traditional properties.'
    },
    {
      icon: 'leaf',
      title: 'Environmental Impact',
      description: 'Reduce carbon footprint by 50%+ and contribute to a healthier planet for future generations.'
    },
    {
      icon: 'shield',
      title: 'Durability',
      description: 'High-quality sustainable materials mean longer-lasting homes with lower maintenance costs.'
    },
    {
      icon: 'community',
      title: 'Community Value',
      description: 'Eco-friendly neighborhoods foster strong communities with better walkability and shared values.'
    }
  ];

  const IconDollar = () => (
    <svg viewBox="0 0 24 24" style={{ width: '28px', height: '28px', fill: 'none', stroke: 'var(--le-primary)', strokeWidth: '2' }}>
      <path d="M12 1v22M17 5H7a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2z" />
    </svg>
  );

  const IconHeart = () => (
    <svg viewBox="0 0 24 24" style={{ width: '28px', height: '28px', fill: 'none', stroke: 'var(--le-primary)', strokeWidth: '2' }}>
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );

  const IconTrending = () => (
    <svg viewBox="0 0 24 24" style={{ width: '28px', height: '28px', fill: 'none', stroke: 'var(--le-primary)', strokeWidth: '2' }}>
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  );

  const IconLeaf = () => (
    <svg viewBox="0 0 24 24" style={{ width: '28px', height: '28px', fill: 'none', stroke: 'var(--le-primary)', strokeWidth: '2' }}>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
      <path d="M12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z" fill="var(--le-primary)" />
    </svg>
  );

  const IconShield = () => (
    <svg viewBox="0 0 24 24" style={{ width: '28px', height: '28px', fill: 'none', stroke: 'var(--le-primary)', strokeWidth: '2' }}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );

  const IconCommunity = () => (
    <svg viewBox="0 0 24 24" style={{ width: '28px', height: '28px', fill: 'none', stroke: 'var(--le-primary)', strokeWidth: '2' }}>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );

  const iconMap: Record<string, React.ReactNode> = {
    dollar: <IconDollar />,
    heart: <IconHeart />,
    trending: <IconTrending />,
    leaf: <IconLeaf />,
    shield: <IconShield />,
    community: <IconCommunity />
  };

  return (
    <main style={{ backgroundColor: 'var(--le-bg)', color: 'var(--le-text)' }}>
      {/* Hero Section */}
      <section
        style={{
          background: 'linear-gradient(135deg, var(--le-primary) 0%, var(--le-accent) 100%)',
          color: 'white',
          padding: '80px 20px',
          textAlign: 'center'
        }}
      >
        <h1 style={{ fontSize: '48px', fontWeight: '700', marginBottom: '20px' }}>
          Eco-Friendly Living in Modern Real Estate
        </h1>
        <p style={{ fontSize: '18px', marginBottom: '30px', maxWidth: '600px', margin: '0 auto 30px' }}>
          Discover how sustainable homes save money, improve health, and increase property value while protecting our planet.
        </p>
        <button
          onClick={() => document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })}
          style={{
            background: 'white',
            color: 'var(--le-primary)',
            border: 'none',
            padding: '14px 32px',
            fontSize: '16px',
            fontWeight: '600',
            borderRadius: '6px',
            cursor: 'pointer',
            transition: 'transform 0.2s'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          Find Your Green Home
        </button>
      </section>

      {/* Benefits Grid */}
      <section style={{ padding: '60px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '36px', fontWeight: '700', textAlign: 'center', marginBottom: '50px' }}>
          Why Choose Eco-Friendly Homes?
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '30px'
          }}
        >
          {benefits.map((benefit, idx) => (
            <article
              key={idx}
              style={{
                backgroundColor: 'var(--le-card-bg)',
                padding: '30px',
                borderRadius: '8px',
                border: '1px solid var(--le-border)',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{ marginBottom: '16px' }}>{iconMap[benefit.icon]}</div>
              <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px' }}>
                {benefit.title}
              </h3>
              <p style={{ lineHeight: '1.6', color: 'var(--le-text)', opacity: '0.9' }}>
                {benefit.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Green Certifications */}
      <section style={{ padding: '60px 20px', backgroundColor: 'var(--le-card-bg)', borderTop: '1px solid var(--le-border)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '50px', textAlign: 'center' }}>
            Green Home Certifications Explained
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '25px'
            }}
          >
            {certifications.map((cert, idx) => (
              <article
                key={idx}
                style={{
                  backgroundColor: 'var(--le-bg)',
                  padding: '25px',
                  borderRadius: '8px',
                  border: '2px solid var(--le-primary)',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '10px', color: 'var(--le-primary)' }}>
                  {cert.name}
                </h3>
                <p style={{ fontSize: '13px', marginBottom: '12px', opacity: '0.8' }}>
                  <strong>Levels:</strong> {cert.levels}
                </p>
                <p style={{ lineHeight: '1.6', fontSize: '14px' }}>
                  <strong>Focus:</strong> {cert.focus}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Solar & Renewable Energy */}
      <section style={{ padding: '60px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '40px' }}>
          Solar & Renewable Energy Features
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '30px'
          }}
        >
          <article style={{ padding: '25px', backgroundColor: 'var(--le-card-bg)', borderRadius: '8px', border: '1px solid var(--le-border)' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px' }}>Rooftop Solar Panels</h3>
            <p style={{ lineHeight: '1.6', marginBottom: '12px' }}>
              Modern photovoltaic systems generate clean electricity while reducing grid dependency. Average 6-8 kW systems eliminate most utility bills and qualify for 30% federal tax credits.
            </p>
            <p style={{ fontSize: '13px', color: 'var(--le-accent)', fontWeight: '600' }}>
              Payback period: 5-8 years | 25-year warranty
            </p>
          </article>

          <article style={{ padding: '25px', backgroundColor: 'var(--le-card-bg)', borderRadius: '8px', border: '1px solid var(--le-border)' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px' }}>Battery Storage Systems</h3>
            <p style={{ lineHeight: '1.6', marginBottom: '12px' }}>
              Advanced lithium-ion batteries store excess solar energy for use during peak hours and power outages. Maximizes solar self-consumption and provides backup power security.
            </p>
            <p style={{ fontSize: '13px', color: 'var(--le-accent)', fontWeight: '600' }}>
              Capacity: 10-20 kWh | 10-year lifespan
            </p>
          </article>

          <article style={{ padding: '25px', backgroundColor: 'var(--le-card-bg)', borderRadius: '8px', border: '1px solid var(--le-border)' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px' }}>Geothermal Heat Pumps</h3>
            <p style={{ lineHeight: '1.6', marginBottom: '12px' }}>
              Utilize stable ground temperatures for heating and cooling at 3-4x higher efficiency than air-source systems. Reduces heating/cooling energy consumption by 60-70%.
            </p>
            <p style={{ fontSize: '13px', color: 'var(--le-accent)', fontWeight: '600' }}>
              Efficiency rating: 4-6 COP | Quietest option
            </p>
          </article>
        </div>
      </section>

      {/* Sustainable Materials */}
      <section style={{ padding: '60px 20px', backgroundColor: 'var(--le-card-bg)', borderTop: '1px solid var(--le-border)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '40px', textAlign: 'center' }}>
            Sustainable Building Materials
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '20px'
            }}
          >
            {[
              { name: 'Reclaimed Wood', benefit: 'Character, durability, reduces deforestation' },
              { name: 'Cork Flooring', benefit: 'Renewable, antimicrobial, comfortable underfoot' },
              { name: 'Bamboo Products', benefit: 'Fast-growing, strong, sustainable alternative to hardwood' },
              { name: 'Recycled Metal', benefit: 'Reduced mining impact, fully recyclable at end of life' },
              { name: 'Low-VOC Paints', benefit: 'Improved indoor air quality, no harmful off-gassing' },
              { name: 'Natural Stone', benefit: 'Durable, thermally efficient, timeless appeal' }
            ].map((material, idx) => (
              <article
                key={idx}
                style={{
                  backgroundColor: 'var(--le-bg)',
                  padding: '20px',
                  borderRadius: '8px',
                  border: '1px solid var(--le-border)'
                }}
              >
                <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px', color: 'var(--le-primary)' }}>
                  {material.name}
                </h4>
                <p style={{ fontSize: '14px', lineHeight: '1.5' }}>{material.benefit}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Water Conservation */}
      <section style={{ padding: '60px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '40px' }}>
          Water Conservation Features
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
          <article style={{ backgroundColor: 'var(--le-card-bg)', padding: '30px', borderRadius: '8px', border: '1px solid var(--le-border)' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px' }}>Low-Flow Fixtures</h3>
            <p style={{ lineHeight: '1.6' }}>
              Aerating showerheads and faucets reduce water use by 30-50% without sacrificing pressure. Toilets with dual-flush technology save 67% of water per year per person.
            </p>
          </article>

          <article style={{ backgroundColor: 'var(--le-card-bg)', padding: '30px', borderRadius: '8px', border: '1px solid var(--le-border)' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px' }}>Rainwater Harvesting</h3>
            <p style={{ lineHeight: '1.6' }}>
              Collect roof runoff for landscape irrigation and outdoor use. Systems can reduce municipal water consumption by 40-50% in moderate climates.
            </p>
          </article>

          <article style={{ backgroundColor: 'var(--le-card-bg)', padding: '30px', borderRadius: '8px', border: '1px solid var(--le-border)' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px' }}>Greywater Systems</h3>
            <p style={{ lineHeight: '1.6' }}>
              Recycle water from showers, sinks, and washers for toilet flushing and landscape watering. Reduces water usage by 25-50% while decreasing wastewater treatment burden.
            </p>
          </article>

          <article style={{ backgroundColor: 'var(--le-card-bg)', padding: '30px', borderRadius: '8px', border: '1px solid var(--le-border)' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px' }}>Drought-Resistant Landscaping</h3>
            <p style={{ lineHeight: '1.6' }}>
              Native plants and xeriscaping techniques reduce irrigation needs by 50-75%. Beautiful landscapes that thrive in local climate conditions with minimal maintenance.
            </p>
          </article>

          <article style={{ backgroundColor: 'var(--le-card-bg)', padding: '30px', borderRadius: '8px', border: '1px solid var(--le-border)' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px' }}>Smart Irrigation Controllers</h3>
            <p style={{ lineHeight: '1.6' }}>
              Weather-based systems adjust watering based on rainfall and temperature. Reduces landscape water use by 20-30% compared to traditional timer-based systems.
            </p>
          </article>

          <article style={{ backgroundColor: 'var(--le-card-bg)', padding: '30px', borderRadius: '8px', border: '1px solid var(--le-border)' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px' }}>Water Filtration</h3>
            <p style={{ lineHeight: '1.6' }}>
              Advanced filtration systems provide clean drinking water without bottled water waste. Reduces plastic consumption and improves water quality for the household.
            </p>
          </article>
        </div>
      </section>

      {/* Eco-Friendly Neighborhoods */}
      <section style={{ padding: '60px 20px', backgroundColor: 'var(--le-card-bg)', borderTop: '1px solid var(--le-border)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '40px', textAlign: 'center' }}>
            Features of Eco-Friendly Neighborhoods
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
            {[
              'Walkable streets & mixed-use development',
              'Public transit & bike infrastructure',
              'Community gardens & green spaces',
              'Mature tree canopy coverage',
              'Green building codes & standards',
              'Electric vehicle charging stations',
              'Local farmers markets & shops',
              'Public parks & recreation areas',
              'Native plant landscaping',
              'Stormwater management systems',
              'Energy-efficient street lighting',
              'Community composting programs'
            ].map((feature, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: 'var(--le-bg)',
                  padding: '16px',
                  borderRadius: '6px',
                  border: '1px solid var(--le-border)',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <span
                  style={{
                    display: 'inline-block',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--le-primary)',
                    marginRight: '12px',
                    flexShrink: 0
                  }}
                />
                <span style={{ fontSize: '14px', fontWeight: '500' }}>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Capture Form */}
      <section id="lead-form" style={{ padding: '60px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ maxWidth: '500px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '12px', textAlign: 'center' }}>
            Find Your Eco-Friendly Home
          </h2>
          <p style={{ textAlign: 'center', marginBottom: '40px', color: 'var(--le-text)', opacity: '0.85' }}>
            Let\u2019s connect you with sustainable properties that match your values and budget.
          </p>

          {formSubmitted ? (
            <div
              style={{
                backgroundColor: 'var(--le-accent)',
                color: 'white',
                padding: '20px',
                borderRadius: '8px',
                textAlign: 'center',
                fontWeight: '600'
              }}
            >
              Thank you! We\u2019ll contact you soon about eco-friendly homes in your area.
            </div>
          ) : (
            <form onSubmit={handleFormSubmit}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', fontSize: '14px' }}>
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid var(--le-border)',
                    borderRadius: '6px',
                    fontSize: '14px',
                    boxSizing: 'border-box',
                    backgroundColor: 'var(--le-bg)'
                  }}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', fontSize: '14px' }}>
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid var(--le-border)',
                    borderRadius: '6px',
                    fontSize: '14px',
                    boxSizing: 'border-box',
                    backgroundColor: 'var(--le-bg)'
                  }}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', fontSize: '14px' }}>
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleFormChange}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid var(--le-border)',
                    borderRadius: '6px',
                    fontSize: '14px',
                    boxSizing: 'border-box',
                    backgroundColor: 'var(--le-bg)'
                  }}
                />
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', fontSize: '14px' }}>
                  Interest
                </label>
                <select
                  name="interest"
                  value={formData.interest}
                  onChange={handleFormChange}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid var(--le-border)',
                    borderRadius: '6px',
                    fontSize: '14px',
                    boxSizing: 'border-box',
                    backgroundColor: 'var(--le-bg)'
                  }}
                >
                  <option value="general">General Information</option>
                  <option value="solar">Solar Homes</option>
                  <option value="leed">LEED Certified Homes</option>
                  <option value="retrofit">Home Retrofit</option>
                  <option value="neighborhood">Eco-Friendly Neighborhoods</option>
                </select>
              </div>

              <button
                type="submit"
                style={{
                  width: '100%',
                  padding: '14px',
                  backgroundColor: 'var(--le-primary)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--le-hover)')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--le-primary)')}
              >
                Get Started
              </button>
            </form>
          )}
        </div>
      </section>

      {/* FAQ Accordion */}
      <section style={{ padding: '60px 20px', backgroundColor: 'var(--le-card-bg)', borderTop: '1px solid var(--le-border)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '50px', textAlign: 'center' }}>
            Frequently Asked Questions
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {faqItems.map((item, idx) => (
              <article
                key={idx}
                style={{
                  backgroundColor: 'var(--le-bg)',
                  border: '1px solid var(--le-border)',
                  borderRadius: '8px',
                  overflow: 'hidden'
                }}
              >
                <button
                  onClick={() => setExpandedFAQ(expandedFAQ === idx ? null : idx)}
                  style={{
                    width: '100%',
                    padding: '20px',
                    backgroundColor: 'transparent',
                    border: 'none',
                    textAlign: 'left',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--le-card-bg)')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <span>{item.question}</span>
                  <span style={{ fontSize: '20px', transition: 'transform 0.3s', transform: expandedFAQ === idx ? 'rotate(180deg)' : 'rotate(0)' }}>
                    ▼
                  </span>
                </button>

                {expandedFAQ === idx && (
                  <div
                    style={{
                      padding: '0 20px 20px 20px',
                      borderTop: '1px solid var(--le-border)',
                      lineHeight: '1.7',
                      color: 'var(--le-text)',
                      opacity: '0.9'
                    }}
                  >
                    {item.answer}
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section
        style={{
          background: 'linear-gradient(135deg, var(--le-primary) 0%, var(--le-accent) 100%)',
          color: 'white',
          padding: '50px 20px',
          textAlign: 'center'
        }}
      >
        <h2 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '16px' }}>
          Ready to Make the Eco-Friendly Switch?
        </h2>
        <p style={{ fontSize: '16px', marginBottom: '30px', maxWidth: '600px', margin: '0 auto 30px' }}>
          Our team specializes in connecting buyers with sustainable properties that align with their environmental values. Let\u2019s find your perfect green home today.
        </p>
        <button
          onClick={() => document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })}
          style={{
            background: 'white',
            color: 'var(--le-primary)',
            border: 'none',
            padding: '14px 32px',
            fontSize: '16px',
            fontWeight: '600',
            borderRadius: '6px',
            cursor: 'pointer',
            transition: 'transform 0.2s'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          Contact Us Now
        </button>
      </section>
    </main>
  );
}
