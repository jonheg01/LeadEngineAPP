'use client';

import React, { useState } from 'react';

export default function HomeAppraisalProcessPage() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    property: '',
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you! We\u2019ll contact you soon about your home appraisal.');
    setFormData({ name: '', email: '', phone: '', property: '' });
  };

  const faqs = [
    {
      question: 'How long does a home appraisal take?',
      answer: 'A typical home appraisal inspection takes 1\u20132 hours depending on the property size. The appraiser then spends additional time analyzing data and preparing the report, which usually takes 3\u20137 business days.'
    },
    {
      question: 'What if my appraisal comes in lower than expected?',
      answer: 'If the appraisal is lower than the purchase price, you have several options: renegotiate the purchase price, request a re-appraisal, challenge the appraisal with new evidence, or increase your down payment to offset the difference.'
    },
    {
      question: 'Do I need to be home during the appraisal?',
      answer: 'While not always required, it\u2019s recommended to be present so you can answer questions, unlock restricted areas, and provide relevant property information that may affect the valuation.'
    },
    {
      question: 'Can I dispute an appraisal?',
      answer: 'Yes. If you believe the appraisal is inaccurate, you can request a reconsideration of value (ROV) by providing documentation of comparable properties or recent improvements not considered in the initial appraisal.'
    },
    {
      question: 'Who pays for the appraisal?',
      answer: 'In most real estate transactions, the buyer pays for the appraisal as part of closing costs. However, terms can be negotiated in the purchase agreement.'
    },
    {
      question: 'Is an appraisal the same as a home inspection?',
      answer: 'No. An appraisal estimates property value for financing purposes, while an inspection evaluates the property\u2019s condition and structural integrity. Both are important but serve different purposes.'
    },
  ];

  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', color: 'var(--le-text)', backgroundColor: 'var(--le-bg)' }}>
      {/* Hero Section */}
      <section style={{
        background: `linear-gradient(135deg, var(--le-primary) 0%, rgba(var(--le-primary-rgb, 52, 152, 219), 0.8) 100%)`,
        color: '#ffffff',
        padding: '80px 20px',
        textAlign: 'center',
        marginBottom: '60px'
      }}>
        <h1 style={{ fontSize: '48px', fontWeight: '700', marginBottom: '20px', lineHeight: '1.2' }}>
          Understanding the Home Appraisal Process
        </h1>
        <p style={{ fontSize: '18px', marginBottom: '10px', opacity: '0.95', maxWidth: '700px', margin: '0 auto 30px' }}>
          A complete guide to what happens during your property appraisal and how it impacts your real estate transaction
        </p>
        <button style={{
          backgroundColor: 'var(--le-accent)',
          color: '#ffffff',
          border: 'none',
          padding: '14px 32px',
          fontSize: '16px',
          fontWeight: '600',
          borderRadius: '6px',
          cursor: 'pointer',
          transition: 'all 0.3s ease'
        }}
        onMouseOver={(e) => (e.currentTarget.style.transform = 'translateY(-2px)', e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.2)')}
        onMouseOut={(e) => (e.currentTarget.style.transform = 'translateY(0)', e.currentTarget.style.boxShadow = 'none')}
        >
          Get Your Free Appraisal Estimate
        </button>
      </section>

      {/* What is Home Appraisal */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 20px', marginBottom: '60px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '20px' }}>What is a Home Appraisal?</h2>
            <p style={{ fontSize: '16px', lineHeight: '1.8', marginBottom: '15px' }}>
              A home appraisal is an unbiased, professional assessment of your property\u2019s fair market value. Conducted by a licensed appraiser, this evaluation is crucial for mortgage lenders to ensure they\u2019re not lending more than the property is worth.
            </p>
            <p style={{ fontSize: '16px', lineHeight: '1.8', marginBottom: '15px' }}>
              The appraisal determines the maximum loan amount you can receive and protects both you and the lender from overpaying for a property. It\u2019s a standard requirement in nearly all mortgage transactions.
            </p>
            <ul style={{ marginTop: '20px', paddingLeft: '0', listStyle: 'none' }}>
              {['Independent assessment by licensed professional', 'Determines property\u2019s market value', 'Required by lenders', 'Protects both buyer and lender', 'Based on comparable properties'].map((item, idx) => (
                <li key={idx} style={{ padding: '10px 0', fontSize: '15px', display: 'flex', alignItems: 'center' }}>
                  <span style={{ color: 'var(--le-accent)', marginRight: '12px', fontSize: '20px', fontWeight: 'bold' }}>✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div style={{
            backgroundColor: 'var(--le-card-bg)',
            padding: '40px',
            borderRadius: '12px',
            border: '1px solid var(--le-border)',
            textAlign: 'center'
          }}>
            <svg width="120" height="120" viewBox="0 0 120 120" style={{ margin: '0 auto 20px', display: 'block' }}>
              <circle cx="60" cy="60" r="55" fill="none" stroke="var(--le-primary)" strokeWidth="2" />
              <rect x="40" y="30" width="40" height="60" fill="none" stroke="var(--le-primary)" strokeWidth="2" rx="4" />
              <line x1="40" y1="45" x2="80" y2="45" stroke="var(--le-primary)" strokeWidth="1.5" />
              <line x1="40" y1="55" x2="80" y2="55" stroke="var(--le-primary)" strokeWidth="1.5" />
              <line x1="40" y1="65" x2="80" y2="65" stroke="var(--le-primary)" strokeWidth="1.5" />
            </svg>
            <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '15px' }}>Key Facts</h3>
            <p style={{ fontSize: '14px', color: 'var(--le-text)', opacity: '0.8', marginBottom: '20px' }}>
              Appraisals typically cost $300\u2013$800 and take 3\u20137 business days to complete.
            </p>
            <div style={{ backgroundColor: 'var(--le-bg)', padding: '15px', borderRadius: '8px', marginBottom: '15px' }}>
              <p style={{ fontSize: '13px', margin: '8px 0' }}><strong>Duration:</strong> 1\u20132 hours on-site</p>
              <p style={{ fontSize: '13px', margin: '8px 0' }}><strong>Report Time:</strong> 3\u20137 business days</p>
              <p style={{ fontSize: '13px', margin: '8px 0' }}><strong>Cost Range:</strong> $300\u2013$800</p>
            </div>
          </div>
        </div>
      </section>

      {/* The Appraisal Process Step-by-Step */}
      <section style={{ backgroundColor: 'var(--le-card-bg)', padding: '60px 20px', marginBottom: '60px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '50px', textAlign: 'center' }}>
            The Appraisal Process: Step-by-Step
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
            {[
              { num: '1', title: 'Appraisal Ordered', desc: 'Your lender orders an appraisal from an independent appraisal management company.' },
              { num: '2', title: 'Appraiser Selected', desc: 'A licensed appraiser is assigned based on local expertise and property type.' },
              { num: '3', title: 'Property Inspection', desc: 'The appraiser visits and thoroughly inspects your home, both inside and out.' },
              { num: '4', title: 'Data Analysis', desc: 'Comparable properties are researched and analyzed to estimate fair market value.' },
              { num: '5', title: 'Report Prepared', desc: 'A detailed appraisal report is compiled with photos, measurements, and valuation.' },
              { num: '6', title: 'Report Delivered', desc: 'The appraisal report is sent to your lender and you receive a copy.' },
            ].map((step, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: 'var(--le-bg)',
                  padding: '30px',
                  borderRadius: '10px',
                  border: '1px solid var(--le-border)',
                  position: 'relative',
                  paddingLeft: '80px'
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    left: '20px',
                    top: '20px',
                    width: '50px',
                    height: '50px',
                    backgroundColor: 'var(--le-primary)',
                    color: '#ffffff',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px',
                    fontWeight: '700'
                  }}
                >
                  {step.num}
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '10px' }}>{step.title}</h3>
                <p style={{ fontSize: '14px', lineHeight: '1.6', color: 'var(--le-text)', opacity: '0.85' }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Factors That Affect Appraisal Value */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 20px', marginBottom: '60px' }}>
        <h2 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '40px', textAlign: 'center' }}>
          Factors That Affect Appraisal Value
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
          {[
            { icon: '📍', title: 'Location & Neighborhood', desc: 'School districts, proximity to amenities, crime rates, and neighborhood trends heavily influence property value.' },
            { icon: '🏠', title: 'Size & Condition', desc: 'Square footage, age, roof condition, HVAC systems, and overall structural integrity are critical factors.' },
            { icon: '🔧', title: 'Updates & Improvements', desc: 'Modern kitchen, bathrooms, electrical, plumbing, and recent renovations increase appraised value.' },
            { icon: '🌳', title: 'Lot Features', desc: 'Lot size, landscaping, outdoor amenities like pools or decks, and views impact the final appraisal.' },
            { icon: '📊', title: 'Market Conditions', desc: 'Current real estate market trends, interest rates, and supply/demand in your area affect comparable values.' },
            { icon: '🔍', title: 'Comparable Properties', desc: 'Similar properties recently sold in your area (comps) are the primary basis for the appraisal value.' },
          ].map((factor, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: 'var(--le-card-bg)',
                padding: '25px',
                borderRadius: '10px',
                border: '1px solid var(--le-border)',
                display: 'flex',
                gap: '15px'
              }}
            >
              <div style={{ fontSize: '32px', minWidth: '40px' }}>{factor.icon}</div>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>{factor.title}</h3>
                <p style={{ fontSize: '14px', lineHeight: '1.6', color: 'var(--le-text)', opacity: '0.85' }}>
                  {factor.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How to Prepare Your Home */}
      <section style={{ backgroundColor: 'var(--le-card-bg)', padding: '60px 20px', marginBottom: '60px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '40px', textAlign: 'center' }}>
            How to Prepare Your Home for Appraisal
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            {[
              { title: 'Clean & Declutter', items: ['Deep clean inside and out', 'Remove personal clutter', 'Trim bushes and trees', 'Power wash exterior'] },
              { title: 'Make Minor Repairs', items: ['Fix broken windows/doors', 'Repair interior paint', 'Fix leaky faucets', 'Replace missing ceiling tiles'] },
              { title: 'Document Improvements', items: ['Gather receipts for updates', 'Take photos of renovations', 'List recent replacements', 'Note energy-efficient upgrades'] },
              { title: 'Highlight Key Features', items: ['Ensure easy access to attic', 'Clean out gutters', 'Open all closets/cabinets', 'Turn on all lights'] },
            ].map((section, idx) => (
              <div key={idx} style={{ backgroundColor: 'var(--le-bg)', padding: '25px', borderRadius: '10px', border: '1px solid var(--le-border)' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '15px', color: 'var(--le-primary)' }}>
                  {section.title}
                </h3>
                <ul style={{ listStyle: 'none', padding: '0', margin: '0' }}>
                  {section.items.map((item, i) => (
                    <li key={i} style={{ fontSize: '14px', padding: '8px 0', borderBottom: i !== section.items.length - 1 ? '1px solid var(--le-border)' : 'none', display: 'flex', alignItems: 'center' }}>
                      <span style={{ color: 'var(--le-accent)', marginRight: '10px', fontSize: '16px' }}>•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What If Appraisal Is Low */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 20px', marginBottom: '60px' }}>
        <h2 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '40px', textAlign: 'center' }}>
          What to Do If Your Appraisal Is Low
        </h2>
        <div style={{ backgroundColor: 'var(--le-card-bg)', padding: '40px', borderRadius: '12px', border: '2px solid var(--le-border)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
            <div>
              <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '20px', color: 'var(--le-primary)' }}>
                Your Options
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {[
                  { title: 'Request a Reconsideration', desc: 'Provide new comparable sales or omitted information to the appraiser.' },
                  { title: 'Get a Second Opinion', desc: 'Request a new appraisal if you believe the first is inaccurate.' },
                  { title: 'Renegotiate Price', desc: 'Ask the seller to reduce the asking price to match the appraisal.' },
                  { title: 'Increase Down Payment', desc: 'Pay the difference between appraised value and purchase price in cash.' },
                  { title: 'Challenge the Report', desc: 'Work with your agent to dispute specific findings with documentation.' },
                ].map((option, idx) => (
                  <div key={idx} style={{ paddingBottom: '15px', borderBottom: idx !== 4 ? '1px solid var(--le-border)' : 'none' }}>
                    <h4 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '5px' }}>{option.title}</h4>
                    <p style={{ fontSize: '14px', color: 'var(--le-text)', opacity: '0.8', margin: '0' }}>
                      {option.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ backgroundColor: 'var(--le-bg)', padding: '25px', borderRadius: '10px', border: '1px solid var(--le-border)' }}>
              <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '15px' }}>Pro Tips</h4>
              <ul style={{ listStyle: 'none', padding: '0', margin: '0' }}>
                {['Act quickly \u2014 you typically have 3\u201310 days to respond', 'Gather comparable sales data', 'Document all recent improvements', 'Review the appraisal report carefully for errors', 'Consult with your real estate agent or lender'].map((tip, i) => (
                  <li key={i} style={{ fontSize: '14px', padding: '10px 0', display: 'flex' }}>
                    <span style={{ color: 'var(--le-accent)', marginRight: '10px' }}>→</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Appraisal vs Inspection */}
      <section style={{ backgroundColor: 'var(--le-card-bg)', padding: '60px 20px', marginBottom: '60px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '40px', textAlign: 'center' }}>
            Appraisal vs. Home Inspection: What\u2019s the Difference?
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
            {[
              {
                title: 'Home Appraisal',
                items: [
                  { label: 'Purpose', value: 'Determines property market value' },
                  { label: 'Performed By', value: 'Licensed appraiser' },
                  { label: 'Focus', value: 'Market value & comparables' },
                  { label: 'Cost', value: '$300\u2013$800' },
                  { label: 'Required By', value: 'Mortgage lenders' },
                  { label: 'Report Type', value: 'Detailed valuation report' },
                ]
              },
              {
                title: 'Home Inspection',
                items: [
                  { label: 'Purpose', value: 'Evaluates property condition' },
                  { label: 'Performed By', value: 'Certified home inspector' },
                  { label: 'Focus', value: 'Structural integrity & systems' },
                  { label: 'Cost', value: '$300\u2013$500' },
                  { label: 'Required By', value: 'Buyer (optional)' },
                  { label: 'Report Type', value: 'Condition assessment report' },
                ]
              }
            ].map((comparison, idx) => (
              <div key={idx} style={{ backgroundColor: 'var(--le-bg)', padding: '30px', borderRadius: '10px', border: '1px solid var(--le-border)' }}>
                <h3 style={{ fontSize: '22px', fontWeight: '600', marginBottom: '25px', color: 'var(--le-primary)' }}>
                  {comparison.title}
                </h3>
                {comparison.items.map((item, i) => (
                  <div key={i} style={{ marginBottom: '18px', paddingBottom: '18px', borderBottom: i !== comparison.items.length - 1 ? '1px solid var(--le-border)' : 'none' }}>
                    <p style={{ fontSize: '13px', fontWeight: '600', color: 'var(--le-accent)', margin: '0 0 5px 0', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      {item.label}
                    </p>
                    <p style={{ fontSize: '15px', margin: '0', color: 'var(--le-text)' }}>
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <p style={{ marginTop: '30px', fontSize: '15px', color: 'var(--le-text)', opacity: '0.85', textAlign: 'center', fontStyle: 'italic' }}>
            Both appraisals and inspections play important roles in real estate transactions. An appraisal protects the lender; an inspection protects the buyer.
          </p>
        </div>
      </section>

      {/* Lead Capture CTA Form */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 20px', marginBottom: '60px' }}>
        <div style={{ backgroundColor: 'var(--le-primary)', color: '#ffffff', padding: '50px', borderRadius: '12px' }}>
          <h2 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '15px', textAlign: 'center' }}>
            Ready to Get Your Home Appraised?
          </h2>
          <p style={{ fontSize: '16px', textAlign: 'center', marginBottom: '35px', opacity: '0.95' }}>
            Connect with our real estate team to discuss your appraisal needs and get started on your transaction.
          </p>
          <form onSubmit={handleFormSubmit} style={{ maxWidth: '500px', margin: '0 auto' }}>
            <div style={{ marginBottom: '18px' }}>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleFormChange}
                required
                style={{
                  width: '100%',
                  padding: '12px 15px',
                  fontSize: '14px',
                  border: 'none',
                  borderRadius: '6px',
                  backgroundColor: '#ffffff',
                  color: 'var(--le-text)',
                  boxSizing: 'border-box',
                  fontFamily: 'inherit'
                }}
              />
            </div>
            <div style={{ marginBottom: '18px' }}>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleFormChange}
                required
                style={{
                  width: '100%',
                  padding: '12px 15px',
                  fontSize: '14px',
                  border: 'none',
                  borderRadius: '6px',
                  backgroundColor: '#ffffff',
                  color: 'var(--le-text)',
                  boxSizing: 'border-box',
                  fontFamily: 'inherit'
                }}
              />
            </div>
            <div style={{ marginBottom: '18px' }}>
              <input
                type="tel"
                name="phone"
                placeholder="Your Phone"
                value={formData.phone}
                onChange={handleFormChange}
                required
                style={{
                  width: '100%',
                  padding: '12px 15px',
                  fontSize: '14px',
                  border: 'none',
                  borderRadius: '6px',
                  backgroundColor: '#ffffff',
                  color: 'var(--le-text)',
                  boxSizing: 'border-box',
                  fontFamily: 'inherit'
                }}
              />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <input
                type="text"
                name="property"
                placeholder="Property Address (Optional)"
                value={formData.property}
                onChange={handleFormChange}
                style={{
                  width: '100%',
                  padding: '12px 15px',
                  fontSize: '14px',
                  border: 'none',
                  borderRadius: '6px',
                  backgroundColor: '#ffffff',
                  color: 'var(--le-text)',
                  boxSizing: 'border-box',
                  fontFamily: 'inherit'
                }}
              />
            </div>
            <button
              type="submit"
              style={{
                width: '100%',
                padding: '14px',
                fontSize: '16px',
                fontWeight: '600',
                backgroundColor: 'var(--le-accent)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => (e.currentTarget.style.opacity = '0.9', e.currentTarget.style.transform = 'translateY(-2px)')}
              onMouseOut={(e) => (e.currentTarget.style.opacity = '1', e.currentTarget.style.transform = 'translateY(0)')}
            >
              Get Your Free Appraisal Consultation
            </button>
            <p style={{ fontSize: '12px', textAlign: 'center', marginTop: '15px', opacity: '0.85' }}>
              We\u2019ll contact you within 24 hours to discuss your appraisal.
            </p>
          </form>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 20px', marginBottom: '60px' }}>
        <h2 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '40px', textAlign: 'center' }}>
          Frequently Asked Questions
        </h2>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: 'var(--le-card-bg)',
                border: '1px solid var(--le-border)',
                marginBottom: '12px',
                borderRadius: '8px',
                overflow: 'hidden'
              }}
            >
              <button
                onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                style={{
                  width: '100%',
                  padding: '20px',
                  textAlign: 'left',
                  backgroundColor: 'var(--le-card-bg)',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: '600',
                  color: 'var(--le-text)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = 'var(--le-hover)')}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'var(--le-card-bg)')}
              >
                {faq.question}
                <span style={{
                  transform: expandedFaq === idx ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s ease',
                  fontSize: '20px',
                  color: 'var(--le-primary)',
                  marginLeft: '15px',
                  flexShrink: 0
                }}>
                  ▼
                </span>
              </button>
              {expandedFaq === idx && (
                <div style={{
                  padding: '20px',
                  backgroundColor: 'var(--le-bg)',
                  borderTop: '1px solid var(--le-border)',
                  fontSize: '15px',
                  lineHeight: '1.7',
                  color: 'var(--le-text)',
                  animation: 'fadeIn 0.3s ease'
                }}>
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <section style={{
        background: `linear-gradient(135deg, rgba(var(--le-primary-rgb, 52, 152, 219), 0.1) 0%, rgba(var(--le-accent-rgb, 41, 128, 185), 0.05) 100%)`,
        padding: '60px 20px',
        textAlign: 'center',
        borderTop: '1px solid var(--le-border)'
      }}>
        <h2 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '15px' }}>
          Still Have Questions About Home Appraisals?
        </h2>
        <p style={{ fontSize: '16px', marginBottom: '30px', maxWidth: '600px', margin: '0 auto 30px' }}>
          Our experienced real estate team is ready to help you understand the appraisal process and guide you through your next transaction.
        </p>
        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button style={{
            backgroundColor: 'var(--le-primary)',
            color: '#ffffff',
            border: 'none',
            padding: '12px 28px',
            fontSize: '15px',
            fontWeight: '600',
            borderRadius: '6px',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = 'translateY(-2px)', e.currentTarget.style.boxShadow = '0 6px 12px rgba(0,0,0,0.15)')}
          onMouseOut={(e) => (e.currentTarget.style.transform = 'translateY(0)', e.currentTarget.style.boxShadow = 'none')}
          >
            Contact Our Team
          </button>
          <button style={{
            backgroundColor: '#ffffff',
            color: 'var(--le-primary)',
            border: '2px solid var(--le-primary)',
            padding: '10px 26px',
            fontSize: '15px',
            fontWeight: '600',
            borderRadius: '6px',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = 'var(--le-primary)', e.currentTarget.style.color = '#ffffff')}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#ffffff', e.currentTarget.style.color = 'var(--le-primary)')}
          >
            Learn More
          </button>
        </div>
      </section>
    </div>
  );
}
