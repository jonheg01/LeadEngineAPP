'use client';

import React, { useState } from 'react';

export default function HomeInspectionPage() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({});
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', zip: '', homeType: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const toggleCheckItem = (item: string) => {
    setCheckedItems(prev => ({ ...prev, [item]: !prev[item] }));
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setShowLeadForm(false), 2000);
  };

  const inspectionAreas = [
    { icon: '🏠', title: 'Roof', description: 'Age, condition, missing shingles, water damage, flashing integrity' },
    { icon: '🏗️', title: 'Foundation', description: 'Cracks, settling issues, water intrusion, structural stability' },
    { icon: '💧', title: 'Plumbing', description: 'Water pressure, leaks, pipe material, water heater condition, drainage' },
    { icon: '⚡', title: 'Electrical', description: 'Panel condition, outlet safety, grounding, wiring age, code compliance' },
    { icon: '❄️', title: 'HVAC', description: 'Furnace/AC age, efficiency, maintenance records, ductwork condition' },
    { icon: '🪟', title: 'Windows & Doors', description: 'Seals, operation, glass condition, weatherstripping, frame damage' },
    { icon: '🛡️', title: 'Insulation', description: 'R-value adequacy, moisture issues, gaps, attic insulation levels' },
    { icon: '🔝', title: 'Attic', description: 'Ventilation, moisture, pests, mold, structural framing condition' },
    { icon: '🌊', title: 'Basement', description: 'Water damage, moisture, cracks, flooding history, sump pump function' },
    { icon: '🏡', title: 'Exterior', description: 'Siding damage, paint condition, drainage, grading, deck safety' },
    { icon: '🔧', title: 'Appliances', description: 'Oven, dishwasher, refrigerator, laundry - age and functionality' },
    { icon: '🚨', title: 'Safety Systems', description: 'Smoke detectors, carbon monoxide, fire extinguishers, railings' },
  ];

  const severityLevels = [
    { level: 'Major', color: 'var(--le-danger)', description: 'Immediate repair needed, safety risk, or significant cost' },
    { level: 'Moderate', color: 'var(--le-warning)', description: 'Repair recommended within 1-2 years, moderate expense' },
    { level: 'Minor', color: 'var(--le-accent)', description: 'Low priority, cosmetic, or maintenance item' },
  ];

  const specializedInspections = [
    { name: 'Radon', why: 'Colorless, odorless gas linked to lung cancer. Test in basements.', when: 'Recommended in high-radon areas' },
    { name: 'Mold', why: 'Health hazard, structural damage. Inspection finds hidden mold.', when: 'If water damage or musty smell noted' },
    { name: 'Termites', why: 'Can cause structural damage costing $1000s to repair.', when: 'Common in regions with termite activity' },
    { name: 'Sewer Lines', why: 'Blockages, tree root intrusion, collapse cause backup issues.', when: 'If old home or previous sewer issues' },
    { name: 'Well Water', why: 'Quality testing for contamination, safety, and hardness.', when: 'All homes on private wells' },
    { name: 'Lead Paint', why: 'Health risk for children under 6, neurological damage.', when: 'Homes built before 1978' },
  ];

  const costGuide = [
    { size: 'Small (< 1,000 sq ft)', typical: '$250-400', factors: 'Age, location, access' },
    { size: 'Medium (1,000-2,500 sq ft)', typical: '$400-600', factors: 'Standard rate in most areas' },
    { size: 'Large (2,500-5,000 sq ft)', typical: '$600-900', factors: 'More systems to inspect' },
    { size: 'Very Large (> 5,000 sq ft)', typical: '$900-1,500+', factors: 'Complex systems, more time' },
  ];

  const inspectorQuestions = [
    'How long have you been inspecting homes in this area?',
    'Are you licensed and insured? What\u2019s your insurance coverage?',
    'How long does a typical inspection take?',
    'Can I attend the inspection?',
    'What format is your report? Can I get it electronically?',
    'What\u2019s your experience with homes built in [specific year]?',
    'Have you found issues in homes similar to mine?',
    'What systems or areas do you NOT inspect?',
  ];

  const preInspectionChecklist = [
    'Clear attic access and remove boxes/storage',
    'Unlock electrical panel, HVAC closet, and crawl space doors',
    'Trim bushes/trees for exterior access',
    'Ensure water is on, utilities accessible',
    'Provide documentation: receipts, permits, warranties',
    'Have keys for all doors and windows',
    'Make note of known issues for inspector',
    'Plan to stay home or provide access',
  ];

  const buyerPreparation = [
    'Review the inspector\u2019s credentials and previous reports online',
    'Plan to attend the entire inspection (3-4 hours typical)',
    'Wear appropriate clothing for attic/basement access',
    'Bring notepad or use your phone to document',
    'Don\u2019t let emotions override inspection findings',
    'Prepare a list of concerns to discuss',
    'Ask the inspector to explain findings in plain language',
    'Get a timeline for repair recommendations',
  ];

  const sellerBenefits = [
    'Discover and fix issues BEFORE they scare buyers away',
    'Set accurate home price based on known condition',
    'Build buyer confidence with pre-inspection transparency',
    'Reduce post-inspection negotiation leverage for buyers',
    'Avoid last-minute surprises or deal collapse',
    'Demonstrate proactive home maintenance',
  ];

  const redFlags = [
    'No license or insurance',
    'Pressure to book immediately',
    'Vague pricing or "per-item" charges',
    'Refuses to do certain inspections',
    'Conflicts of interest (also does repairs)',
    'No written report provided',
    'Disorganized, unprofessional demeanor',
    'Unwilling to explain findings clearly',
  ];

  const faqItems = [
    {
      q: 'How long does a home inspection take?',
      a: 'Most inspections take 2-4 hours depending on home size and age. Larger or older homes typically take longer. You should plan to stay for the entire inspection.',
    },
    {
      q: 'Can I be present during the inspection?',
      a: 'Yes, most inspectors encourage buyer attendance. As a seller, you may not be present during a buyer\u2019s inspection per realtor guidelines, but you can arrange a separate pre-listing inspection.',
    },
    {
      q: 'What if the inspector finds major issues?',
      a: 'You\u2019ll have the report to plan repairs, negotiate credits with buyers, or lower the asking price. Buyers can request repairs or credit toward closing costs. This is negotiable.',
    },
    {
      q: 'Is a home inspection required?',
      a: 'Not legally required, but strongly recommended. It\u2019s a standard part of the buying process and protects your investment. You can make your offer contingent on inspection results.',
    },
    {
      q: 'What\u2019s the difference between an inspection and appraisal?',
      a: 'An inspection assesses condition and safety. An appraisal determines market value for lending. Both are important, but serve different purposes.',
    },
    {
      q: 'Do I need specialized inspections beyond the standard?',
      a: 'Depends on location and home age. Radon, mold, and lead paint testing are common in many areas. Your realtor and inspector can advise what\u2019s recommended.',
    },
    {
      q: 'Can I negotiate repairs based on the inspection?',
      a: 'Yes. Common negotiation strategies: request seller repairs, ask for repair credit, agree to accept "as-is," or renegotiate price. Your realtor helps determine what\u2019s reasonable.',
    },
    {
      q: 'How is the inspection report organized?',
      a: 'Reports typically cover each home system separately with findings severity-rated. Many include photos and recommendations. Ask for digital copies for your records.',
    },
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--le-bg)', color: 'var(--le-text)' }}>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqItems.map(item => ({
              '@type': 'Question',
              name: item.q,
              acceptedAnswer: {
                '@type': 'Answer',
                text: item.a,
              },
            })),
          }),
        }}
      />

      {/* Hero Section */}
      <section
        style={{
          background: `linear-gradient(135deg, var(--le-primary) 0%, ${adjustColor('var(--le-primary)', -20)} 100%)`,
          color: 'white',
          padding: '60px 20px',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: '20px', fontWeight: 'bold' }}>
            🏠 Home Inspection Guide
          </h1>
          <p style={{ fontSize: 'clamp(1rem, 3vw, 1.3rem)', marginBottom: '30px', opacity: 0.95 }}>
            Everything you need to know about home inspections—for buyers and sellers. Make informed decisions with confidence.
          </p>
          <button
            onClick={() => setShowLeadForm(true)}
            style={{
              background: 'var(--le-accent)',
              color: 'var(--le-text)',
              padding: '14px 32px',
              fontSize: '1rem',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '600',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
            onMouseEnter={e => {
              (e.target as HTMLButtonElement).style.transform = 'translateY(-2px)';
              (e.target as HTMLButtonElement).style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2)';
            }}
            onMouseLeave={e => {
              (e.target as HTMLButtonElement).style.transform = 'translateY(0)';
              (e.target as HTMLButtonElement).style.boxShadow = 'none';
            }}
          >
            Get Local Inspector Recommendations →
          </button>
        </div>
      </section>

      {/* Lead Form Modal */}
      {showLeadForm && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px',
          }}
          onClick={() => setShowLeadForm(false)}
        >
          <div
            style={{
              backgroundColor: 'var(--le-bg-card)',
              borderRadius: '12px',
              padding: '40px',
              maxWidth: '500px',
              width: '100%',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
              border: `1px solid var(--le-border)`,
            }}
            onClick={e => e.stopPropagation()}
          >
            {!formSubmitted ? (
              <>
                <h2 style={{ marginBottom: '10px', fontSize: '1.8rem', fontWeight: 'bold' }}>
                  Find Local Inspectors
                </h2>
                <p style={{ color: 'var(--le-text-secondary)', marginBottom: '30px' }}>
                  Get vetted inspector recommendations for your area.
                </p>
                <form onSubmit={handleFormSubmit}>
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleFormChange}
                      placeholder="John Smith"
                      required
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: `1px solid var(--le-border)`,
                        borderRadius: '6px',
                        fontSize: '1rem',
                        backgroundColor: 'var(--le-bg)',
                        color: 'var(--le-text)',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleFormChange}
                      placeholder="john@example.com"
                      required
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: `1px solid var(--le-border)`,
                        borderRadius: '6px',
                        fontSize: '1rem',
                        backgroundColor: 'var(--le-bg)',
                        color: 'var(--le-text)',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      name="zip"
                      value={formData.zip}
                      onChange={handleFormChange}
                      placeholder="90210"
                      required
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: `1px solid var(--le-border)`,
                        borderRadius: '6px',
                        fontSize: '1rem',
                        backgroundColor: 'var(--le-bg)',
                        color: 'var(--le-text)',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>
                  <div style={{ marginBottom: '30px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                      Home Type
                    </label>
                    <select
                      name="homeType"
                      value={formData.homeType}
                      onChange={handleFormChange}
                      required
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: `1px solid var(--le-border)`,
                        borderRadius: '6px',
                        fontSize: '1rem',
                        backgroundColor: 'var(--le-bg)',
                        color: 'var(--le-text)',
                        boxSizing: 'border-box',
                      }}
                    >
                      <option value="">Select...</option>
                      <option value="single-family">Single Family Home</option>
                      <option value="condo">Condo/Townhouse</option>
                      <option value="multi-family">Multi-Family</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    style={{
                      width: '100%',
                      padding: '14px',
                      background: 'var(--le-primary)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '1.05rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'background 0.2s',
                    }}
                    onMouseEnter={e => {
                      (e.target as HTMLButtonElement).style.background = 'var(--le-primary-hover)';
                    }}
                    onMouseLeave={e => {
                      (e.target as HTMLButtonElement).style.background = 'var(--le-primary)';
                    }}
                  >
                    Get Recommendations
                  </button>
                </form>
              </>
            ) : (
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', marginBottom: '20px' }}>✓</div>
                <h2 style={{ marginBottom: '10px', color: 'var(--le-success)' }}>Thanks!</h2>
                <p>We\u2019ll send inspector recommendations to your email shortly.</p>
              </div>
            )}
            <button
              onClick={() => setShowLeadForm(false)}
              style={{
                position: 'absolute',
                top: '15px',
                right: '15px',
                background: 'transparent',
                border: 'none',
                fontSize: '1.5rem',
                cursor: 'pointer',
                color: 'var(--le-text-secondary)',
              }}
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* What Inspectors Check */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 20px' }}>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', marginBottom: '40px', fontWeight: 'bold', textAlign: 'center' }}>
          What Inspectors Check
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
          }}
        >
          {inspectionAreas.map((area, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: 'var(--le-bg-card)',
                border: `1px solid var(--le-border)`,
                borderRadius: '8px',
                padding: '24px',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.12)';
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
              }}
            >
              <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>{area.icon}</div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '12px', color: 'var(--le-primary)' }}>
                {area.title}
              </h3>
              <p style={{ color: 'var(--le-text-secondary)', lineHeight: '1.6' }}>
                {area.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Buyer Inspection Guide */}
      <section style={{ backgroundColor: 'var(--le-bg-card)', padding: '60px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', marginBottom: '40px', fontWeight: 'bold', textAlign: 'center' }}>
            Buyer\u2019s Inspection Guide
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
            {/* What to Expect */}
            <div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '16px', color: 'var(--le-primary)' }}>
                What to Expect
              </h3>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {[
                  'Inspector examines all major systems systematically',
                  'Takes photos and notes for documentation',
                  'Explains findings as they discover them',
                  'Typically takes 2-4 hours depending on home size',
                  'Will enter attic, crawlspace, and basement',
                  'May use moisture meters and thermal imaging',
                ].map((item, idx) => (
                  <li key={idx} style={{ marginBottom: '12px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <span style={{ color: 'var(--le-success)', fontWeight: 'bold', marginTop: '2px' }}>→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* How to Prepare */}
            <div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '16px', color: 'var(--le-primary)' }}>
                How to Prepare
              </h3>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {buyerPreparation.map((item, idx) => (
                  <li key={idx} style={{ marginBottom: '12px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <span style={{ color: 'var(--le-accent)', fontWeight: 'bold', marginTop: '2px' }}>✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Attending Tips */}
            <div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '16px', color: 'var(--le-primary)' }}>
                Tips for Attending
              </h3>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {[
                  'Ask questions without distracting the inspector',
                  'Let the inspector lead and observe their process',
                  'Take notes and photos of concerning areas',
                  'Don\u2019t dismiss findings—get specifics',
                  'Discuss repair timeline and severity calmly',
                  'Remember: knowledge is power for negotiation',
                ].map((item, idx) => (
                  <li key={idx} style={{ marginBottom: '12px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <span style={{ color: 'var(--le-accent)', fontWeight: 'bold', marginTop: '2px' }}>★</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Seller Pre-Inspection Guide */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 20px' }}>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', marginBottom: '40px', fontWeight: 'bold', textAlign: 'center' }}>
          Seller\u2019s Pre-Inspection Guide
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
          {/* Benefits */}
          <div style={{ backgroundColor: 'var(--le-bg-card)', borderRadius: '8px', padding: '32px', border: `1px solid var(--le-border)` }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '20px', color: 'var(--le-success)' }}>
              Benefits of Pre-Listing Inspection
            </h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {sellerBenefits.map((benefit, idx) => (
                <li key={idx} style={{ marginBottom: '14px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--le-success)', fontWeight: 'bold', fontSize: '1.3rem' }}>+</span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Common Issues */}
          <div style={{ backgroundColor: 'var(--le-bg-card)', borderRadius: '8px', padding: '32px', border: `1px solid var(--le-border)` }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '20px', color: 'var(--le-warning)' }}>
              Common Issues to Fix First
            </h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {[
                'Roof leaks or missing shingles (major red flag)',
                'Electrical hazards or outdated panels',
                'Foundation cracks or water intrusion',
                'Mold or moisture in basement/attic',
                'HVAC system age or non-functionality',
                'Plumbing leaks or outdated pipes',
                'Peeling paint (especially if pre-1978)',
                'Missing safety equipment or railings',
              ].map((issue, idx) => (
                <li key={idx} style={{ marginBottom: '14px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--le-danger)', fontWeight: 'bold' }}>!</span>
                  <span>{issue}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Understanding the Report */}
      <section style={{ backgroundColor: 'var(--le-bg-card)', padding: '60px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', marginBottom: '40px', fontWeight: 'bold', textAlign: 'center' }}>
            Understanding the Inspection Report
          </h2>

          {/* Severity Levels */}
          <div style={{ marginBottom: '50px' }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '24px', textAlign: 'center', color: 'var(--le-primary)' }}>
              Severity Levels Explained
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              {severityLevels.map((level, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: 'var(--le-bg)',
                    borderLeft: `5px solid ${level.color}`,
                    borderRadius: '6px',
                    padding: '20px',
                    border: `1px solid var(--le-border)`,
                  }}
                >
                  <h4 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '10px', color: level.color }}>
                    {level.level}
                  </h4>
                  <p style={{ color: 'var(--le-text-secondary)', margin: 0 }}>{level.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Sample Findings */}
          <div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '24px', textAlign: 'center', color: 'var(--le-primary)' }}>
              Sample Findings in Reports
            </h3>
            <div style={{ display: 'grid', gap: '16px' }}>
              {[
                { finding: 'Roof shingles at end of life', severity: 'Major', action: 'Plan replacement within 1-2 years' },
                { finding: 'HVAC system 12 years old', severity: 'Moderate', action: 'May need replacement soon, get quotes' },
                { finding: 'Foundation hairline crack', severity: 'Minor', action: 'Monitor but not urgent' },
                { finding: 'Outlet not grounded in bathroom', severity: 'Major', action: 'Requires GFCI installation for safety' },
                { finding: 'Caulking needed around windows', severity: 'Minor', action: 'DIY maintenance or contractor' },
              ].map((item, idx) => (
                <div key={idx} style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '20px', paddingBottom: '16px', borderBottom: `1px solid var(--le-border)` }}>
                  <div style={{ fontWeight: '700', minWidth: '120px' }}>
                    <span
                      style={{
                        display: 'inline-block',
                        padding: '4px 12px',
                        borderRadius: '4px',
                        fontSize: '0.9rem',
                        backgroundColor: item.severity === 'Major' ? 'var(--le-danger)' : item.severity === 'Moderate' ? 'var(--le-warning)' : 'var(--le-accent)',
                        color: 'white',
                      }}
                    >
                      {item.severity}
                    </span>
                  </div>
                  <div>
                    <p style={{ margin: '0 0 8px 0', fontWeight: '600' }}>{item.finding}</p>
                    <p style={{ margin: 0, color: 'var(--le-text-secondary)', fontSize: '0.95rem' }}>{item.action}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Negotiation After Inspection */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 20px' }}>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', marginBottom: '40px', fontWeight: 'bold', textAlign: 'center' }}>
          Negotiating After Inspection
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
          {/* What to Ask For */}
          <div style={{ backgroundColor: 'var(--le-bg-card)', borderRadius: '8px', padding: '32px', border: `1px solid var(--le-border)` }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '20px', color: 'var(--le-primary)' }}>
              What to Negotiate
            </h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {[
                'Seller pays for specific major repairs',
                'Credit toward closing costs ($500-5000+)',
                'Repair allowance for minor items',
                'Warranties extended from seller',
                'Price reduction reflecting needed work',
              ].map((item, idx) => (
                <li key={idx} style={{ marginBottom: '14px', paddingLeft: '24px', position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0, color: 'var(--le-primary)', fontWeight: 'bold' }}>◆</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* What to Let Go */}
          <div style={{ backgroundColor: 'var(--le-bg-card)', borderRadius: '8px', padding: '32px', border: `1px solid var(--le-border)` }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '20px', color: 'var(--le-accent)' }}>
              Know What to Accept
            </h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {[
                'Normal wear and tear (cosmetic only)',
                'Items disclosed before inspection',
                'Age-related issues not safety hazards',
                'Items beyond scope (not a defect)',
                'Problems you discussed in offer stage',
              ].map((item, idx) => (
                <li key={idx} style={{ marginBottom: '14px', paddingLeft: '24px', position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0, color: 'var(--le-accent)', fontWeight: 'bold' }}>◆</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Repair Strategies */}
          <div style={{ backgroundColor: 'var(--le-bg-card)', borderRadius: '8px', padding: '32px', border: `1px solid var(--le-border)` }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '20px', color: 'var(--le-success)' }}>
              Repair vs. Credit Strategies
            </h3>
            <div style={{ marginBottom: '16px' }}>
              <p style={{ fontWeight: '600', marginBottom: '8px', color: 'var(--le-success)' }}>Ask for Credit:</p>
              <p style={{ color: 'var(--le-text-secondary)', fontSize: '0.95rem', margin: 0 }}>When you want contractor choice, or repair may be higher than expected.</p>
            </div>
            <div>
              <p style={{ fontWeight: '600', marginBottom: '8px', color: 'var(--le-success)' }}>Request Repair:</p>
              <p style={{ color: 'var(--le-text-secondary)', fontSize: '0.95rem', margin: 0 }}>When you want seller accountability, or repair cost is well-defined.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Specialized Inspections */}
      <section style={{ backgroundColor: 'var(--le-bg-card)', padding: '60px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', marginBottom: '40px', fontWeight: 'bold', textAlign: 'center' }}>
            Specialized Inspections
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
            {specializedInspections.map((insp, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: 'var(--le-bg)',
                  borderRadius: '8px',
                  border: `1px solid var(--le-border)`,
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
                onClick={() => toggleSection(`spec-${idx}`)}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.1)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
                }}
              >
                <div style={{ padding: '20px', backgroundColor: 'var(--le-primary)', color: 'white' }}>
                  <h3 style={{ margin: 0, fontSize: '1.3rem', fontWeight: '700', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {insp.name}
                    <span style={{ fontSize: '1.5rem' }}>{expandedSection === `spec-${idx}` ? '−' : '+'}</span>
                  </h3>
                </div>
                {expandedSection === `spec-${idx}` && (
                  <div style={{ padding: '20px' }}>
                    <p style={{ marginBottom: '12px' }}>
                      <strong>Why:</strong> {insp.why}
                    </p>
                    <p style={{ margin: 0 }}>
                      <strong>When to test:</strong> {insp.when}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cost Guide */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 20px' }}>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', marginBottom: '40px', fontWeight: 'bold', textAlign: 'center' }}>
          Home Inspection Cost Guide
        </h2>
        <div style={{ overflowX: 'auto' }}>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              backgroundColor: 'var(--le-bg-card)',
              borderRadius: '8px',
              overflow: 'hidden',
              border: `1px solid var(--le-border)`,
            }}
          >
            <thead>
              <tr style={{ backgroundColor: 'var(--le-primary)', color: 'white' }}>
                <th style={{ padding: '16px', textAlign: 'left', fontWeight: '700' }}>Home Size</th>
                <th style={{ padding: '16px', textAlign: 'left', fontWeight: '700' }}>Typical Cost</th>
                <th style={{ padding: '16px', textAlign: 'left', fontWeight: '700' }}>Cost Factors</th>
              </tr>
            </thead>
            <tbody>
              {costGuide.map((row, idx) => (
                <tr
                  key={idx}
                  style={{
                    borderTop: `1px solid var(--le-border)`,
                    backgroundColor: idx % 2 === 0 ? 'var(--le-bg)' : 'var(--le-bg-card)',
                  }}
                >
                  <td style={{ padding: '16px', fontWeight: '600' }}>{row.size}</td>
                  <td style={{ padding: '16px', color: 'var(--le-success)', fontWeight: '600' }}>{row.typical}</td>
                  <td style={{ padding: '16px', color: 'var(--le-text-secondary)' }}>{row.factors}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ backgroundColor: 'var(--le-bg-card)', borderRadius: '8px', padding: '24px', marginTop: '32px', border: `1px solid var(--le-border)` }}>
          <p style={{ margin: 0, color: 'var(--le-text-secondary)' }}>
            <strong>Note:</strong> Costs vary by region, home age, and inspector experience. Always get quotes from multiple inspectors. Some areas require specialized tests (radon, lead, etc.) at additional cost. Many inspectors offer discounts for same-day inspections or client referrals.
          </p>
        </div>
      </section>

      {/* Finding an Inspector */}
      <section style={{ backgroundColor: 'var(--le-bg-card)', padding: '60px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', marginBottom: '40px', fontWeight: 'bold', textAlign: 'center' }}>
            How to Find a Qualified Inspector
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
            {/* Qualifications */}
            <div style={{ backgroundColor: 'var(--le-bg)', borderRadius: '8px', padding: '28px', border: `1px solid var(--le-border)` }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '20px', color: 'var(--le-primary)' }}>
                Key Qualifications
              </h3>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {[
                  'NAHI, ASHI, or state licensing',
                  'Errors & Omissions insurance',
                  '5+ years experience minimum',
                  'Detailed, digital reports',
                  'Professional licensing in your state',
                  'Good online reviews and references',
                ].map((qual, idx) => (
                  <li key={idx} style={{ marginBottom: '12px', display: 'flex', gap: '12px' }}>
                    <span style={{ color: 'var(--le-success)', fontWeight: 'bold' }}>✓</span>
                    {qual}
                  </li>
                ))}
              </ul>
            </div>

            {/* Questions to Ask */}
            <div style={{ backgroundColor: 'var(--le-bg)', borderRadius: '8px', padding: '28px', border: `1px solid var(--le-border)` }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '20px', color: 'var(--le-primary)' }}>
                Questions to Ask
              </h3>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {inspectorQuestions.map((q, idx) => (
                  <li key={idx} style={{ marginBottom: '12px', fontSize: '0.95rem', color: 'var(--le-text-secondary)' }}>
                    {idx + 1}. {q}
                  </li>
                ))}
              </ul>
            </div>

            {/* Red Flags */}
            <div style={{ backgroundColor: 'var(--le-bg)', borderRadius: '8px', padding: '28px', border: `1px solid var(--le-border)` }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '20px', color: 'var(--le-danger)' }}>
                Red Flags to Avoid
              </h3>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {redFlags.map((flag, idx) => (
                  <li key={idx} style={{ marginBottom: '12px', display: 'flex', gap: '12px' }}>
                    <span style={{ color: 'var(--le-danger)', fontWeight: 'bold' }}>✗</span>
                    {flag}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pre-Inspection Checklist */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 20px' }}>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', marginBottom: '40px', fontWeight: 'bold', textAlign: 'center' }}>
          Pre-Inspection Preparation Checklist
        </h2>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <div style={{ backgroundColor: 'var(--le-bg-card)', borderRadius: '8px', padding: '32px', border: `1px solid var(--le-border)` }}>
            {preInspectionChecklist.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '16px', marginBottom: '16px', alignItems: 'flex-start' }}>
                <input
                  type="checkbox"
                  id={`check-${idx}`}
                  checked={checkedItems[`check-${idx}`] || false}
                  onChange={() => toggleCheckItem(`check-${idx}`)}
                  style={{
                    width: '20px',
                    height: '20px',
                    marginTop: '2px',
                    cursor: 'pointer',
                    accentColor: 'var(--le-primary)',
                  }}
                />
                <label
                  htmlFor={`check-${idx}`}
                  style={{
                    cursor: 'pointer',
                    flex: 1,
                    textDecoration: checkedItems[`check-${idx}`] ? 'line-through' : 'none',
                    color: checkedItems[`check-${idx}`] ? 'var(--le-text-secondary)' : 'var(--le-text)',
                  }}
                >
                  {item}
                </label>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section style={{ backgroundColor: 'var(--le-bg-card)', padding: '60px 20px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', marginBottom: '40px', fontWeight: 'bold', textAlign: 'center' }}>
            Frequently Asked Questions
          </h2>
          <div style={{ display: 'grid', gap: '0' }}>
            {faqItems.map((item, idx) => (
              <div
                key={idx}
                style={{
                  borderBottom: `1px solid var(--le-border)`,
                  backgroundColor: expandedSection === `faq-${idx}` ? 'var(--le-bg)' : 'transparent',
                  transition: 'background 0.2s',
                }}
              >
                <button
                  onClick={() => toggleSection(`faq-${idx}`)}
                  style={{
                    width: '100%',
                    padding: '20px',
                    border: 'none',
                    background: 'transparent',
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    color: 'var(--le-text)',
                    fontSize: '1rem',
                  }}
                >
                  <span style={{ fontWeight: '700', flex: 1 }}>{item.q}</span>
                  <span
                    style={{
                      fontSize: '1.5rem',
                      marginLeft: '20px',
                      flexShrink: 0,
                      color: 'var(--le-primary)',
                    }}
                  >
                    {expandedSection === `faq-${idx}` ? '−' : '+'}
                  </span>
                </button>
                {expandedSection === `faq-${idx}` && (
                  <div style={{ padding: '0 20px 20px 20px', color: 'var(--le-text-secondary)' }}>
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        style={{
          background: `linear-gradient(135deg, var(--le-primary) 0%, ${adjustColor('var(--le-primary)', -20)} 100%)`,
          color: 'white',
          padding: '60px 20px',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', marginBottom: '20px', fontWeight: 'bold' }}>
            Ready to Schedule an Inspection?
          </h2>
          <p style={{ fontSize: '1.1rem', marginBottom: '30px', opacity: 0.95 }}>
            Get recommendations for qualified, vetted inspectors in your area. No obligation.
          </p>
          <button
            onClick={() => setShowLeadForm(true)}
            style={{
              background: 'var(--le-accent)',
              color: 'var(--le-text)',
              padding: '16px 40px',
              fontSize: '1.1rem',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '600',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => {
              (e.target as HTMLButtonElement).style.transform = 'scale(1.05)';
            }}
            onMouseLeave={e => {
              (e.target as HTMLButtonElement).style.transform = 'scale(1)';
            }}
          >
            Find Inspectors Near You →
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: 'var(--le-bg-card)', borderTop: `1px solid var(--le-border)`, padding: '40px 20px', textAlign: 'center' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <p style={{ color: 'var(--le-text-secondary)', marginBottom: '16px' }}>
            © 2026 LeadEngine Real Estate. All rights reserved.
          </p>
          <p style={{ color: 'var(--le-text-secondary)', fontSize: '0.9rem', margin: 0 }}>
            This guide is for educational purposes. Always consult with licensed professionals for specific advice.
          </p>
        </div>
      </footer>
    </div>
  );
}

// Helper function to adjust color brightness
function adjustColor(cssVar: string, percent: number): string {
  // This is a placeholder—in production, extract actual color value and adjust
  // For now, return a slightly different shade
  return `hsl(calc(var(--le-h, 210) + 0deg), calc(var(--le-s, 100%) + 0%), calc(var(--le-l, 50%) + ${percent}%))`;
}
