'use client';

import React, { useState, useMemo } from 'react';

// SVG Icons
const SunIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

const LeafIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 2C7 7 3 11 3 16c0 4.4 3.1 8 7 8s7-3.6 7-8c0-1-1-3-3-5l-1-2-1-2z" />
    <path d="M12 2v18" />
  </svg>
);

const WaterIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.32 0z" />
  </svg>
);

const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.5">
    <polyline points="16 4 9 17 4 12" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.5">
    <polyline points="5 8 10 13 15 8" />
  </svg>
);

const DollarIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);

const HomeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const CertificateIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 3h18v10c0 1-1 2-2 2H5c-1 0-2-1-2-2V3z" />
    <path d="M12 14v7M8 21h8" />
    <circle cx="12" cy="9" r="2" />
  </svg>
);

const GreenHomesGuidePage = () => {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});
  const [costScenario, setCostScenario] = useState<'low' | 'mid' | 'high'>('mid');
  const [leadEmail, setLeadEmail] = useState('');
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  // Certifications data
  const certifications = [
    {
      name: 'LEED Certification',
      level: 'Certified, Silver, Gold, Platinum',
      focus: 'Comprehensive sustainability covering energy, water, materials, indoor air quality',
      energy: 'Requires 15%+ energy savings vs baseline',
      icon: CertificateIcon,
    },
    {
      name: 'ENERGY STAR',
      level: 'Single tier - homes 10%+ more efficient',
      focus: 'Energy performance and efficiency optimization',
      energy: '10-20% more efficient than standard homes',
      icon: SunIcon,
    },
    {
      name: 'HERS Rating',
      level: 'Score 0-100+ (lower is better)',
      focus: 'Measures home energy efficiency through inspection',
      energy: 'HERS 50 is ENERGY STAR equivalent',
      icon: HomeIcon,
    },
    {
      name: 'Net Zero Home',
      level: 'Produces as much energy as it consumes',
      focus: 'Complete energy independence via renewables',
      energy: 'Zero net energy consumption annually',
      icon: LeafIcon,
    },
    {
      name: 'Passive House',
      level: 'Rigorous European standard',
      focus: 'Minimal heating/cooling through superior insulation',
      energy: '90% reduction in heating/cooling needs',
      icon: SunIcon,
    },
  ];

  // Energy features
  const energyFeatures = [
    {
      category: 'Solar & Renewable',
      items: [
        { name: 'Solar PV Panels', savings: '25-30% energy bills', lifespan: '25-30 years' },
        { name: 'Solar Thermal Water Heating', savings: '50-80% water heating', lifespan: '20-25 years' },
        { name: 'Wind Turbine', savings: 'Up to 90% generation', lifespan: '20-25 years' },
      ],
    },
    {
      category: 'Insulation & Sealing',
      items: [
        { name: 'Spray Foam Insulation', savings: '15-20% heating/cooling', lifespan: '80+ years' },
        { name: 'Air Sealing', savings: '10-15% energy loss', lifespan: 'Permanent' },
        { name: 'Radiant Barriers', savings: '5-10% summer cooling', lifespan: '50+ years' },
      ],
    },
    {
      category: 'Windows & Doors',
      items: [
        { name: 'Triple-Pane Windows', savings: '20-30% loss reduction', lifespan: '25-30 years' },
        { name: 'Smart Glass', savings: '10-20% adaptive control', lifespan: '25-30 years' },
        { name: 'Insulated Doors', savings: '5-10% entry loss', lifespan: '20-30 years' },
      ],
    },
    {
      category: 'HVAC & Climate',
      items: [
        { name: 'Smart Thermostat', savings: '10-15% usage reduction', lifespan: '10-15 years' },
        { name: 'High-Efficiency Heat Pump', savings: '30-40% vs gas', lifespan: '15-20 years' },
        { name: 'Energy Recovery Ventilation', savings: '15-20% conditioning loss', lifespan: '20-25 years' },
      ],
    },
  ];

  // Cost-benefit calculator
  const costScenarios = {
    low: {
      initialInvestment: 25000,
      annualSavings: 1200,
      title: 'Basic Retrofit (Insulation + Thermostat)',
    },
    mid: {
      initialInvestment: 60000,
      annualSavings: 3500,
      title: 'Moderate Upgrade (Solar + HVAC + Windows)',
    },
    high: {
      initialInvestment: 120000,
      annualSavings: 6500,
      title: 'Comprehensive Green Home (Full Solar + Premium Everything)',
    },
  };

  const selectedScenario = costScenarios[costScenario];
  const paybackYears = selectedScenario.initialInvestment / selectedScenario.annualSavings;
  const savingsYear10 = selectedScenario.annualSavings * 10 - selectedScenario.initialInvestment;
  const savingsYear25 = selectedScenario.annualSavings * 25 - selectedScenario.initialInvestment;

  // Green inspection checklist
  const inspectionChecklist = [
    { id: 1, category: 'Energy Systems', items: ['Solar panels present?', 'HVAC age & efficiency rating', 'Insulation R-value in walls', 'Windows - age & type'] },
    { id: 2, category: 'Water Systems', items: ['Rainwater harvesting system?', 'Greywater recycling?', 'Low-flow fixtures', 'Water heating system efficiency'] },
    { id: 3, category: 'Materials & Air Quality', items: ['Venting system for moisture', 'Non-toxic paint & sealants', 'Low-VOC materials used', 'Mold & air quality testing'] },
    { id: 4, category: 'Certifications & Documentation', items: ['LEED/ENERGY STAR certificates', 'Home energy audit report', 'Maintenance records for systems', 'Warranties on green upgrades'] },
  ];

  // Financing options
  const financingOptions = [
    {
      name: 'Energy-Efficient Mortgage (EEM)',
      rate: '0.25-0.5% lower rates',
      details: 'Standard mortgage with slightly better rates for certified green homes',
      maxAmount: 'Varies by lender',
    },
    {
      name: 'Green Renovation Loan',
      rate: 'Market rates',
      details: 'Specialized loans specifically for energy upgrades with flexible terms',
      maxAmount: '$50,000-$250,000',
    },
    {
      name: 'Federal Tax Credits',
      rate: '30% credit',
      details: 'Up to 30% back on qualified renewable energy and efficiency upgrades',
      maxAmount: '$3,600-$7,500 per year',
    },
    {
      name: 'State Rebate Programs',
      rate: 'Varies',
      details: 'Local incentives for solar, heat pumps, insulation, and water conservation',
      maxAmount: '$1,000-$10,000+',
    },
  ];

  // FAQs
  const faqs = [
    {
      q: 'How much can a green home save on utilities?',
      a: 'Average green homes save 20-30% annually compared to standard homes. With solar, savings can reach 50-80% or even achieve zero net energy consumption.',
    },
    {
      q: 'What\u2019s the payback period for green upgrades?',
      a: 'Most energy upgrades pay for themselves in 7-12 years through utility savings. Solar panels typically pay back in 6-10 years, with 20-30 years of productive life remaining.',
    },
    {
      q: 'Do green homes cost significantly more?',
      a: 'Initial costs are 3-10% higher, but with tax credits and financing options, many upgrades become cost-neutral or actually cheaper long-term compared to standard homes.',
    },
    {
      q: 'What\u2019s the difference between LEED and ENERGY STAR?',
      a: 'LEED is comprehensive (energy, water, materials, indoor air) with multiple levels. ENERGY STAR focuses specifically on energy efficiency with a single certification tier.',
    },
    {
      q: 'Can I retrofit an older home to be green?',
      a: 'Absolutely! Insulation, window replacement, solar, smart thermostats, and air sealing are all retrofit-friendly. Many 30-year-old homes can become highly efficient.',
    },
    {
      q: 'Are green home inspections worth it?',
      a: 'Yes. They verify claimed efficiency, identify hidden issues, and provide documentation for tax credits. They\u2019re especially valuable for retrofit verification.',
    },
  ];

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const toggleChecklist = (id: number) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleLeadSubmit = () => {
    if (leadEmail.trim()) {
      setLeadSubmitted(true);
      setTimeout(() => {
        setLeadEmail('');
        setLeadSubmitted(false);
      }, 3000);
    }
  };

  const checkedCount = Object.values(checkedItems).filter(Boolean).length;
  const totalChecklist = inspectionChecklist.reduce((sum, section) => sum + section.items.length, 0);

  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', color: 'var(--le-text)' }}>
      {/* Hero Section */}
      <section
        style={{
          background: 'linear-gradient(135deg, var(--le-primary) 0%, #2d5a2d 100%)',
          color: 'white',
          padding: '80px 20px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', top: '-50px', right: '-50px', opacity: 0.1, fontSize: '200px' }}>
          <LeafIcon />
        </div>
        <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <h1 style={{ fontSize: '3.5rem', marginBottom: '20px', fontWeight: 700, lineHeight: 1.2 }}>
            Your Guide to Green & Energy-Efficient Homes
          </h1>
          <p style={{ fontSize: '1.3rem', marginBottom: '30px', opacity: 0.95, fontWeight: 300 }}>
            Discover how to find, buy, and own an eco-friendly home that saves money and protects the planet
          </p>
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => document.getElementById('lead-capture').scrollIntoView({ behavior: 'smooth' })}
              style={{
                background: 'white',
                color: 'var(--le-primary)',
                padding: '14px 32px',
                border: 'none',
                borderRadius: 'var(--le-radius, 8px)',
                fontSize: '1rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              Find Your Green Home
            </button>
            <button
              onClick={() => document.getElementById('certifications').scrollIntoView({ behavior: 'smooth' })}
              style={{
                background: 'transparent',
                color: 'white',
                padding: '14px 32px',
                border: '2px solid white',
                borderRadius: 'var(--le-radius, 8px)',
                fontSize: '1rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent';
              }}
            >
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" style={{ padding: '80px 20px', background: 'var(--le-bg, #fafafa)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '15px', textAlign: 'center', fontWeight: 700 }}>
            Green Home Certifications Explained
          </h2>
          <p style={{ fontSize: '1.1rem', textAlign: 'center', marginBottom: '60px', opacity: 0.7 }}>
            Understanding the standards that verify eco-friendly homes
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
            {certifications.map((cert, idx) => {
              const IconComp = cert.icon;
              return (
                <div
                  key={idx}
                  style={{
                    background: 'white',
                    padding: '30px',
                    borderRadius: 'var(--le-radius, 8px)',
                    border: '1px solid rgba(0,0,0,0.08)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 15px 40px rgba(0,0,0,0.1)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'none';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{ color: 'var(--le-primary)', marginBottom: '15px', display: 'flex' }}>
                    <IconComp />
                  </div>
                  <h3 style={{ fontSize: '1.3rem', marginBottom: '8px', fontWeight: 600 }}>{cert.name}</h3>
                  <p style={{ fontSize: '0.9rem', opacity: 0.7, marginBottom: '15px' }}>
                    <strong>Levels:</strong> {cert.level}
                  </p>
                  <p style={{ fontSize: '0.95rem', marginBottom: '12px' }}>{cert.focus}</p>
                  <p style={{ fontSize: '0.95rem', background: '#f0f4e8', padding: '10px', borderRadius: '6px' }}>
                    <strong style={{ color: 'var(--le-primary)' }}>Energy:</strong> {cert.energy}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Energy Features Section */}
      <section style={{ padding: '80px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '15px', textAlign: 'center', fontWeight: 700 }}>
            Energy-Efficient Home Features
          </h2>
          <p style={{ fontSize: '1.1rem', textAlign: 'center', marginBottom: '60px', opacity: 0.7 }}>
            What makes homes more efficient and what savings to expect
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
            {energyFeatures.map((category, catIdx) => (
              <div
                key={catIdx}
                style={{
                  background: 'white',
                  padding: '30px',
                  borderRadius: 'var(--le-radius, 8px)',
                  border: '2px solid var(--le-primary)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                }}
              >
                <h3 style={{ fontSize: '1.3rem', color: 'var(--le-primary)', marginBottom: '20px', fontWeight: 600 }}>
                  {category.category}
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  {category.items.map((item, itemIdx) => (
                    <div key={itemIdx} style={{ borderBottom: '1px solid #f0f0f0', paddingBottom: '15px' }}>
                      <p style={{ fontWeight: 600, marginBottom: '6px', fontSize: '0.95rem' }}>{item.name}</p>
                      <p style={{ fontSize: '0.85rem', color: '#888', marginBottom: '4px' }}>
                        <strong>Savings:</strong> {item.savings}
                      </p>
                      <p style={{ fontSize: '0.85rem', color: '#888' }}>
                        <strong>Lifespan:</strong> {item.lifespan}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cost-Benefit Calculator */}
      <section style={{ padding: '80px 20px', background: '#f5f9f3' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '15px', textAlign: 'center', fontWeight: 700 }}>
            Cost-Benefit Analysis Calculator
          </h2>
          <p style={{ fontSize: '1.1rem', textAlign: 'center', marginBottom: '50px', opacity: 0.7 }}>
            Calculate your potential savings with different green upgrades
          </p>

          <div style={{ background: 'white', padding: '40px', borderRadius: 'var(--le-radius, 8px)', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            <div style={{ marginBottom: '40px' }}>
              <p style={{ fontSize: '1.1rem', marginBottom: '20px', fontWeight: 600 }}>Choose a scenario:</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
                {Object.entries(costScenarios).map(([key, scenario]) => (
                  <button
                    key={key}
                    onClick={() => setCostScenario(key as 'low' | 'mid' | 'high')}
                    style={{
                      padding: '15px',
                      border: costScenario === key ? '2px solid var(--le-primary)' : '1px solid #ddd',
                      background: costScenario === key ? 'var(--le-primary)' : 'white',
                      color: costScenario === key ? 'white' : 'var(--le-text)',
                      borderRadius: 'var(--le-radius, 8px)',
                      cursor: 'pointer',
                      fontWeight: 600,
                      transition: 'all 0.3s ease',
                      fontSize: '0.95rem',
                    }}
                  >
                    {scenario.title}
                  </button>
                ))}
              </div>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '25px',
                marginBottom: '30px',
              }}
            >
              <div style={{ background: '#f9f9f9', padding: '20px', borderRadius: '8px', borderLeft: '4px solid var(--le-primary)' }}>
                <p style={{ fontSize: '0.9rem', opacity: 0.7, marginBottom: '8px' }}>Initial Investment</p>
                <p style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--le-primary)' }}>
                  ${selectedScenario.initialInvestment.toLocaleString()}
                </p>
              </div>
              <div style={{ background: '#f9f9f9', padding: '20px', borderRadius: '8px', borderLeft: '4px solid var(--le-primary)' }}>
                <p style={{ fontSize: '0.9rem', opacity: 0.7, marginBottom: '8px' }}>Annual Savings</p>
                <p style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--le-primary)' }}>
                  ${selectedScenario.annualSavings.toLocaleString()}
                </p>
              </div>
              <div style={{ background: '#f9f9f9', padding: '20px', borderRadius: '8px', borderLeft: '4px solid var(--le-primary)' }}>
                <p style={{ fontSize: '0.9rem', opacity: 0.7, marginBottom: '8px' }}>Payback Period</p>
                <p style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--le-primary)' }}>
                  {paybackYears.toFixed(1)} years
                </p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
              <div style={{ padding: '20px', background: '#e8f5e9', borderRadius: '8px' }}>
                <p style={{ fontSize: '0.85rem', opacity: 0.7, marginBottom: '8px' }}>10-Year Savings</p>
                <p style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--le-primary)' }}>
                  ${savingsYear10.toLocaleString()}
                </p>
              </div>
              <div style={{ padding: '20px', background: '#e8f5e9', borderRadius: '8px' }}>
                <p style={{ fontSize: '0.85rem', opacity: 0.7, marginBottom: '8px' }}>25-Year Savings</p>
                <p style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--le-primary)' }}>
                  ${savingsYear25.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Green Home Inspection Section */}
      <section style={{ padding: '80px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '15px', textAlign: 'center', fontWeight: 700 }}>
            Green Home Inspection Checklist
          </h2>
          <p style={{ fontSize: '1.1rem', textAlign: 'center', marginBottom: '50px', opacity: 0.7 }}>
            What to verify when inspecting an eco-friendly home
          </p>

          <div style={{ background: '#f5f5f5', padding: '20px', borderRadius: '8px', marginBottom: '40px', textAlign: 'center' }}>
            <p style={{ fontSize: '1.1rem', marginBottom: '10px', fontWeight: 600 }}>
              Items Checked: <span style={{ color: 'var(--le-primary)', fontSize: '1.3rem' }}>{checkedCount}/{totalChecklist}</span>
            </p>
            <div style={{ background: '#ddd', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
              <div
                style={{
                  background: 'var(--le-primary)',
                  height: '100%',
                  width: `${(checkedCount / totalChecklist) * 100}%`,
                  transition: 'width 0.3s ease',
                }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '25px' }}>
            {inspectionChecklist.map(section => (
              <div
                key={section.id}
                style={{
                  background: 'white',
                  padding: '25px',
                  borderRadius: 'var(--le-radius, 8px)',
                  border: '1px solid #eee',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                }}
              >
                <h3 style={{ fontSize: '1.2rem', marginBottom: '20px', color: 'var(--le-primary)', fontWeight: 600 }}>
                  {section.category}
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {section.items.map((item, itemIdx) => {
                    const itemId = section.id * 100 + itemIdx;
                    const isChecked = checkedItems[itemId] || false;
                    return (
                      <label
                        key={itemIdx}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          cursor: 'pointer',
                          padding: '10px',
                          borderRadius: '6px',
                          transition: 'background 0.2s',
                          background: isChecked ? '#f0f4e8' : 'transparent',
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleChecklist(itemId)}
                          style={{
                            width: '18px',
                            height: '18px',
                            marginRight: '12px',
                            cursor: 'pointer',
                            accentColor: 'var(--le-primary)',
                          }}
                        />
                        <span style={{ fontSize: '0.95rem', textDecoration: isChecked ? 'line-through' : 'none', opacity: isChecked ? 0.6 : 1 }}>
                          {item}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Financing Section */}
      <section style={{ padding: '80px 20px', background: 'var(--le-bg, #fafafa)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '15px', textAlign: 'center', fontWeight: 700 }}>
            Financing Your Green Home
          </h2>
          <p style={{ fontSize: '1.1rem', textAlign: 'center', marginBottom: '60px', opacity: 0.7 }}>
            Loans, incentives, and tax credits to make green affordable
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px' }}>
            {financingOptions.map((option, idx) => (
              <div
                key={idx}
                style={{
                  background: 'white',
                  padding: '30px',
                  borderRadius: 'var(--le-radius, 8px)',
                  border: '1px solid #eee',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                  <DollarIcon />
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 600, marginLeft: '10px' }}>{option.name}</h3>
                </div>
                <p style={{ fontSize: '1.2rem', color: 'var(--le-primary)', fontWeight: 700, marginBottom: '12px' }}>
                  {option.rate}
                </p>
                <p style={{ fontSize: '0.95rem', marginBottom: '12px', lineHeight: 1.5 }}>{option.details}</p>
                <p style={{ fontSize: '0.85rem', color: '#888', paddingTop: '12px', borderTop: '1px solid #f0f0f0' }}>
                  <strong>Typical Amount:</strong> {option.maxAmount}
                </p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '50px', background: '#e8f5e9', padding: '30px', borderRadius: 'var(--le-radius, 8px)', textAlign: 'center' }}>
            <p style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '10px' }}>Federal Tax Credit: 30% on Renewable & Efficiency</p>
            <p style={{ fontSize: '0.95rem', opacity: 0.8 }}>
              Available through 2032 for qualified solar, heat pumps, insulation, and more. Check eligibility at energy.gov
            </p>
          </div>
        </div>
      </section>

      {/* Water Conservation & Indoor Air Quality */}
      <section style={{ padding: '80px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '50px' }}>
            {/* Water Conservation */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                <div style={{ color: 'var(--le-primary)', marginRight: '15px', fontSize: '2rem' }}>
                  <WaterIcon />
                </div>
                <h2 style={{ fontSize: '2rem', fontWeight: 700 }}>Water Conservation</h2>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ padding: '20px', background: '#f0f4e8', borderRadius: '8px' }}>
                  <p style={{ fontWeight: 600, marginBottom: '8px' }}>Xeriscaping</p>
                  <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>Native drought-resistant landscaping reduces outdoor water use by 30-60%</p>
                </div>
                <div style={{ padding: '20px', background: '#f0f4e8', borderRadius: '8px' }}>
                  <p style={{ fontWeight: 600, marginBottom: '8px' }}>Rainwater Harvesting</p>
                  <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>Collect roof runoff for irrigation and non-potable uses, saving 40% indoor water</p>
                </div>
                <div style={{ padding: '20px', background: '#f0f4e8', borderRadius: '8px' }}>
                  <p style={{ fontWeight: 600, marginBottom: '8px' }}>Greywater Recycling</p>
                  <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>Reuse shower and sink water for toilets and landscaping, cutting consumption 20-30%</p>
                </div>
                <div style={{ padding: '20px', background: '#f0f4e8', borderRadius: '8px' }}>
                  <p style={{ fontWeight: 600, marginBottom: '8px' }}>Low-Flow Fixtures</p>
                  <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>Modern showerheads and faucets use 40-60% less water without losing pressure</p>
                </div>
              </div>
            </div>

            {/* Indoor Air Quality */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                <div style={{ color: 'var(--le-primary)', marginRight: '15px', fontSize: '2rem' }}>
                  <LeafIcon />
                </div>
                <h2 style={{ fontSize: '2rem', fontWeight: 700 }}>Indoor Air Quality</h2>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ padding: '20px', background: '#f0f4e8', borderRadius: '8px' }}>
                  <p style={{ fontWeight: 600, marginBottom: '8px' }}>Low-VOC Materials</p>
                  <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>Paint, flooring, and furnishings without harmful volatile organic compounds</p>
                </div>
                <div style={{ padding: '20px', background: '#f0f4e8', borderRadius: '8px' }}>
                  <p style={{ fontWeight: 600, marginBottom: '8px' }}>Mechanical Ventilation</p>
                  <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>ERV systems provide fresh air while recovering energy from exhaust air</p>
                </div>
                <div style={{ padding: '20px', background: '#f0f4e8', borderRadius: '8px' }}>
                  <p style={{ fontWeight: 600, marginBottom: '8px' }}>Moisture Control</p>
                  <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>Proper drainage and ventilation prevent mold and maintain healthy humidity</p>
                </div>
                <div style={{ padding: '20px', background: '#f0f4e8', borderRadius: '8px' }}>
                  <p style={{ fontWeight: 600, marginBottom: '8px' }}>Natural Materials</p>
                  <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>Wood, stone, clay, and cork are non-toxic alternatives to synthetic materials</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section style={{ padding: '80px 20px', background: 'var(--le-bg, #fafafa)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '15px', textAlign: 'center', fontWeight: 700 }}>Frequently Asked Questions</h2>
          <p style={{ fontSize: '1.1rem', textAlign: 'center', marginBottom: '50px', opacity: 0.7 }}>
            Common questions about green and energy-efficient homes
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                style={{
                  background: 'white',
                  borderRadius: 'var(--le-radius, 8px)',
                  border: '1px solid #eee',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                }}
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  style={{
                    width: '100%',
                    padding: '20px',
                    background: expandedFaq === idx ? '#f0f4e8' : 'white',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={e => {
                    if (expandedFaq !== idx) {
                      e.currentTarget.style.background = '#f9f9f9';
                    }
                  }}
                  onMouseLeave={e => {
                    if (expandedFaq !== idx) {
                      e.currentTarget.style.background = 'white';
                    }
                  }}
                >
                  <p style={{ fontSize: '1rem', fontWeight: 600, textAlign: 'left', margin: 0 }}>{faq.q}</p>
                  <div
                    style={{
                      color: 'var(--le-primary)',
                      marginLeft: '15px',
                      flexShrink: 0,
                      transition: 'transform 0.3s ease',
                      transform: expandedFaq === idx ? 'rotate(180deg)' : 'none',
                    }}
                  >
                    <ChevronDownIcon />
                  </div>
                </button>

                {expandedFaq === idx && (
                  <div style={{ padding: '0 20px 20px 20px', borderTop: '1px solid #f0f0f0' }}>
                    <p style={{ fontSize: '0.95rem', lineHeight: 1.6, opacity: 0.8 }}>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Capture Section */}
      <section id="lead-capture" style={{ padding: '80px 20px', background: 'linear-gradient(135deg, var(--le-primary) 0%, #2d5a2d 100%)' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', color: 'white', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '20px', fontWeight: 700 }}>Ready to Find Your Green Home?</h2>
          <p style={{ fontSize: '1.1rem', marginBottom: '40px', opacity: 0.95 }}>
            Let our green home specialists connect you with eco-friendly properties that match your budget and values
          </p>

          <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
            <input
              type="email"
              placeholder="Your email address"
              value={leadEmail}
              onChange={e => setLeadEmail(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && handleLeadSubmit()}
              style={{
                flex: 1,
                padding: '14px',
                border: 'none',
                borderRadius: 'var(--le-radius, 8px)',
                fontSize: '1rem',
                fontFamily: 'inherit',
              }}
            />
            <button
              onClick={handleLeadSubmit}
              style={{
                padding: '14px 30px',
                background: 'white',
                color: 'var(--le-primary)',
                border: 'none',
                borderRadius: 'var(--le-radius, 8px)',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              Get Started
            </button>
          </div>

          {leadSubmitted && (
            <p style={{ fontSize: '0.95rem', color: '#e8f5e9', fontWeight: 600 }}>
              Thank you! We\u2019ll connect you with green home experts shortly.
            </p>
          )}

          <p style={{ fontSize: '0.85rem', opacity: 0.8, marginTop: '20px' }}>
            We\u2019ll match you with certified green homes and help you maximize your savings.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '40px 20px', background: 'var(--le-bg, #fafafa)', textAlign: 'center', borderTop: '1px solid #eee' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <p style={{ fontSize: '0.9rem', opacity: 0.7, marginBottom: '15px' }}>
            LeadEngine \u2013 Real Estate Intelligence Platform
          </p>
          <p style={{ fontSize: '0.85rem', opacity: 0.6 }}>
            Energy efficiency estimates based on EPA and Department of Energy data. Actual savings vary by location and home specifications.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default GreenHomesGuidePage;
