'use client';

import React, { useState } from 'react';

export default function PropertyTaxGuidePage() {
  const [homeValue, setHomeValue] = useState('');
  const [assessmentRatio, setAssessmentRatio] = useState('100');
  const [millRate, setMillRate] = useState('');
  const [calculatedTax, setCalculatedTax] = useState(null);
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [leadEmail, setLeadEmail] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  const calculateTax = () => {
    if (!homeValue || !millRate) {
      alert('Please enter both home value and mill rate');
      return;
    }

    const value = parseFloat(homeValue);
    const ratio = parseFloat(assessmentRatio) / 100;
    const rate = parseFloat(millRate) / 1000;

    const assessedValue = value * ratio;
    const annualTax = assessedValue * rate;
    const monthlyTax = annualTax / 12;

    setCalculatedTax({
      assessedValue: assessedValue.toFixed(2),
      annualTax: annualTax.toFixed(2),
      monthlyTax: monthlyTax.toFixed(2),
    });
  };

  const handleLeadSubmit = (e) => {
    e.preventDefault();
    if (leadEmail && leadPhone) {
      setLeadSubmitted(true);
      setLeadEmail('');
      setLeadPhone('');
      setTimeout(() => setLeadSubmitted(false), 4000);
    }
  };

  const toggleAccordion = (id) => {
    setActiveAccordion(activeAccordion === id ? null : id);
  };

  const faqItems = [
    {
      id: 'faq1',
      q: 'How often are property taxes reassessed?',
      a: 'Reassessments vary by location but typically occur every 1\u20193 years. Some areas reassess annually. Check with your local assessor\u2019s office for your specific schedule.',
    },
    {
      id: 'faq2',
      q: 'Can I appeal my property tax assessment?',
      a: 'Yes, most jurisdictions allow appeals within 30\u201390 days of receiving your assessment notice. You\u2019ll need to provide evidence that the assessed value is incorrect, such as comparable sales data.',
    },
    {
      id: 'faq3',
      q: 'What happens if I don\u2019t pay my property taxes?',
      a: 'Unpaid property taxes can result in penalties, interest, and eventually a tax lien on your property. In severe cases, the government may foreclose on your home. It\u2019s crucial to pay on time.',
    },
    {
      id: 'faq4',
      q: 'Are property taxes deductible on my federal income tax?',
      a: 'Yes, you can deduct up to $10,000 in state and local taxes (SALT), which includes property taxes, on your federal return if you itemize deductions.',
    },
    {
      id: 'faq5',
      q: 'What\u2019s the difference between assessed value and market value?',
      a: 'Assessed value is determined by the local assessor for tax purposes, while market value is what your home would sell for. They\u2019re often different\u2014the assessed value is typically lower.',
    },
    {
      id: 'faq6',
      q: 'How do property taxes affect my mortgage payment?',
      a: 'If you have an escrow account with your lender, property taxes are included in your monthly payment. The lender collects and pays them on your behalf, ensuring they\u2019re never late.',
    },
  ];

  const exemptions = [
    {
      title: 'Homestead Exemption',
      desc: 'Available to primary residents in most states, reducing assessed value.',
      eligibility: 'Own and occupy the home as your primary residence.',
    },
    {
      title: 'Senior Exemption',
      desc: 'Reduced or frozen taxes for seniors aged 65+.',
      eligibility: 'Must be 65+ and meet income requirements (varies by state).',
    },
    {
      title: 'Veteran Exemption',
      desc: 'Tax relief for military veterans and active-duty service members.',
      eligibility: 'Must have honorable discharge and meet residency requirements.',
    },
    {
      title: 'Disability Exemption',
      desc: 'Tax reduction for homeowners with qualifying disabilities.',
      eligibility: 'Must have verified disability certification; income limits may apply.',
    },
    {
      title: 'Agricultural Exemption',
      desc: 'Lower rates for land used for farming, ranching, or forestry.',
      eligibility: 'Property must be actively used for agricultural purposes.',
    },
  ];

  const taxRates = [
    { area: 'Urban Metropolitan', rate: '1.2%', home_value: '$500,000', annual_tax: '$6,000' },
    { area: 'Suburban District', rate: '0.85%', home_value: '$350,000', annual_tax: '$2,975' },
    { area: 'Rural County', rate: '0.6%', home_value: '$200,000', annual_tax: '$1,200' },
    { area: 'High-Tax State', rate: '1.8%', home_value: '$400,000', annual_tax: '$7,200' },
    { area: 'Low-Tax State', rate: '0.4%', home_value: '$300,000', annual_tax: '$1,200' },
  ];

  const appealSteps = [
    {
      step: 1,
      title: 'Gather Documentation',
      desc: 'Collect recent appraisals, comparable sales (comps), photographs, and any property condition reports.',
    },
    {
      step: 2,
      title: 'File Notice of Intent',
      desc: 'Submit your appeal before the deadline\u2014usually 30\u201390 days after receiving the assessment notice.',
    },
    {
      step: 3,
      title: 'Attend Informal Hearing',
      desc: 'Meet with the assessor\u2019s office to discuss your concerns. Many appeals are resolved at this stage.',
    },
    {
      step: 4,
      title: 'Formal Appeal if Needed',
      desc: 'File with the county board of equalization or appeals board if the assessor doesn\u2019t adjust your assessment.',
    },
    {
      step: 5,
      title: 'Attend Formal Hearing',
      desc: 'Present your evidence before the appeals board. Consider hiring a property tax specialist if the amount is significant.',
    },
  ];

  const taxStrategies = [
    { num: 1, title: 'Apply for Exemptions', desc: 'Research homestead, senior, veteran, or other exemptions you may qualify for.' },
    { num: 2, title: 'Appeal Overvalued Assessments', desc: 'Challenge assessments you believe are too high with comparable sales data.' },
    { num: 3, title: 'Request Reassessment After Improvements', desc: 'Report improvements correctly to avoid inflated base values for future years.' },
    { num: 4, title: 'Monitor Assessment Notices', desc: 'Review notices for errors in property details (square footage, lot size, etc.).' },
    { num: 5, title: 'Manage Escrow Accounts', desc: 'Request escrow analysis annually to catch shortages or surpluses early.' },
    { num: 6, title: 'Time Home Improvements Strategically', desc: 'Some states allow timing improvements to avoid immediate reassessment.' },
    { num: 7, title: 'Deduct Property Taxes', desc: 'Maximize the $10,000 SALT deduction on federal returns if you itemize.' },
    { num: 8, title: 'Consider Property Disposition', desc: 'For high-tax properties, evaluate relocation costs versus long-term tax burden.' },
    { num: 9, title: 'Use Tax-Advantaged Accounts', desc: 'Direct savings through HSAs or 529 plans to offset tax costs.' },
    { num: 10, title: 'Work with a Real Estate Pro', desc: 'A tax-savvy agent or CPA can identify opportunities you\u2019d miss alone.' },
  ];

  return (
    <div style={{ backgroundColor: 'var(--le-bg)', color: 'var(--le-text)', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
      {/* Hero Section */}
      <section style={{ backgroundColor: 'var(--le-primary)', color: '#fff', padding: '60px 20px', textAlign: 'center' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '48px', fontWeight: '700', marginBottom: '20px', lineHeight: '1.2' }}>
            Property Taxes Explained
          </h1>
          <p style={{ fontSize: '20px', marginBottom: '30px', opacity: '0.95', lineHeight: '1.6' }}>
            Understanding property taxes doesn\u2019t have to be complicated. We\u2019ve broken down everything you need to know to manage your tax burden and keep more money in your pocket.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="#calculator"
              style={{
                display: 'inline-block',
                backgroundColor: '#fff',
                color: 'var(--le-primary)',
                padding: '12px 28px',
                borderRadius: '6px',
                fontWeight: '600',
                textDecoration: 'none',
                fontSize: '16px',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => (e.target.style.transform = 'translateY(-2px)')}
              onMouseLeave={(e) => (e.target.style.transform = 'translateY(0)')}
            >
              Try Calculator →
            </a>
            <a
              href="#appeal"
              style={{
                display: 'inline-block',
                backgroundColor: 'rgba(255,255,255,0.2)',
                color: '#fff',
                padding: '12px 28px',
                borderRadius: '6px',
                fontWeight: '600',
                textDecoration: 'none',
                fontSize: '16px',
                border: '1px solid rgba(255,255,255,0.3)',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = 'rgba(255,255,255,0.3)')}
              onMouseLeave={(e) => (e.target.style.backgroundColor = 'rgba(255,255,255,0.2)')}
            >
              Learn Appeal Process
            </a>
          </div>
        </div>
      </section>

      {/* How Property Taxes Work */}
      <section style={{ padding: '60px 20px', backgroundColor: 'var(--le-bg)', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '40px', color: 'var(--le-text)' }}>
          How Property Taxes Work
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px', marginBottom: '40px' }}>
          <div style={{ backgroundColor: 'var(--le-bg-card)', padding: '30px', borderRadius: '8px', border: `1px solid var(--le-border)` }}>
            <div style={{ fontSize: '24px', marginBottom: '12px' }}>📊</div>
            <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px', color: 'var(--le-text)' }}>
              Assessment Process
            </h3>
            <p style={{ color: 'var(--le-text-secondary)', lineHeight: '1.6', fontSize: '15px' }}>
              A local assessor evaluates your property and determines its assessed value. This value is usually a percentage of the market value and is used as the basis for calculating your taxes.
            </p>
          </div>

          <div style={{ backgroundColor: 'var(--le-bg-card)', padding: '30px', borderRadius: '8px', border: `1px solid var(--le-border)` }}>
            <div style={{ fontSize: '24px', marginBottom: '12px' }}>📈</div>
            <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px', color: 'var(--le-text)' }}>
              Mill Rates
            </h3>
            <p style={{ color: 'var(--le-text-secondary)', lineHeight: '1.6', fontSize: '15px' }}>
              A mill rate (or millage rate) is the tax rate expressed per $1,000 of assessed value. It\u2019s set by local governments to fund schools, roads, and services. Higher mill rates mean higher taxes.
            </p>
          </div>

          <div style={{ backgroundColor: 'var(--le-bg-card)', padding: '30px', borderRadius: '8px', border: `1px solid var(--le-border)` }}>
            <div style={{ fontSize: '24px', marginBottom: '12px' }}>📅</div>
            <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px', color: 'var(--le-text)' }}>
              Tax Year Calendar
            </h3>
            <p style={{ color: 'var(--le-text-secondary)', lineHeight: '1.6', fontSize: '15px' }}>
              Tax years vary by location. Most follow the calendar year (Jan\u2013Dec) or fiscal year (April\u2013March). Assessment notices arrive in spring or fall; taxes are due later in the year.
            </p>
          </div>
        </div>

        <div style={{ backgroundColor: 'var(--le-bg-card)', padding: '30px', borderRadius: '8px', border: `1px solid var(--le-border)` }}>
          <h3 style={{ fontSize: '22px', fontWeight: '600', marginBottom: '20px', color: 'var(--le-text)' }}>
            The Tax Formula
          </h3>
          <div style={{ backgroundColor: 'rgba(0,0,0,0.03)', padding: '20px', borderRadius: '6px', fontFamily: 'monospace', fontSize: '15px', color: 'var(--le-text)', lineHeight: '1.8' }}>
            Assessed Value × (Mill Rate ÷ 1,000) = Annual Property Tax
            <br />
            <br />
            <span style={{ fontSize: '14px', color: 'var(--le-text-secondary)' }}>Example: $300,000 home × 90% assessment ratio = $270,000 assessed value</span>
            <br />
            <span style={{ fontSize: '14px', color: 'var(--le-text-secondary)' }}>$270,000 × (12 mills ÷ 1,000) = $3,240 annual property tax</span>
          </div>
        </div>
      </section>

      {/* Property Tax Calculator */}
      <section id="calculator" style={{ padding: '60px 20px', backgroundColor: 'var(--le-bg-card)', borderTop: `1px solid var(--le-border)`, borderBottom: `1px solid var(--le-border)` }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '40px', color: 'var(--le-text)', textAlign: 'center' }}>
            Property Tax Calculator
          </h2>
          <div style={{ backgroundColor: 'var(--le-bg)', padding: '40px', borderRadius: '12px', border: `1px solid var(--le-border)` }}>
            <div style={{ marginBottom: '25px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: 'var(--le-text)', fontSize: '15px' }}>
                Home Value ($)
              </label>
              <input
                type="number"
                placeholder="e.g., 350000"
                value={homeValue}
                onChange={(e) => setHomeValue(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  fontSize: '15px',
                  border: `1px solid var(--le-border)`,
                  borderRadius: '6px',
                  backgroundColor: 'var(--le-bg)',
                  color: 'var(--le-text)',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            <div style={{ marginBottom: '25px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: 'var(--le-text)', fontSize: '15px' }}>
                Assessment Ratio (%)
              </label>
              <input
                type="number"
                placeholder="e.g., 100"
                value={assessmentRatio}
                onChange={(e) => setAssessmentRatio(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  fontSize: '15px',
                  border: `1px solid var(--le-border)`,
                  borderRadius: '6px',
                  backgroundColor: 'var(--le-bg)',
                  color: 'var(--le-text)',
                  boxSizing: 'border-box',
                }}
              />
              <p style={{ fontSize: '13px', color: 'var(--le-text-secondary)', marginTop: '6px' }}>
                Typical values: 50%\u201360% (lower = less tax). Check your local assessor\u2019s office.
              </p>
            </div>

            <div style={{ marginBottom: '30px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: 'var(--le-text)', fontSize: '15px' }}>
                Mill Rate (per $1,000)
              </label>
              <input
                type="number"
                placeholder="e.g., 12.5"
                value={millRate}
                onChange={(e) => setMillRate(e.target.value)}
                step="0.1"
                style={{
                  width: '100%',
                  padding: '12px',
                  fontSize: '15px',
                  border: `1px solid var(--le-border)`,
                  borderRadius: '6px',
                  backgroundColor: 'var(--le-bg)',
                  color: 'var(--le-text)',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            <button
              onClick={calculateTax}
              style={{
                width: '100%',
                padding: '14px',
                backgroundColor: 'var(--le-primary)',
                color: '#fff',
                fontSize: '16px',
                fontWeight: '600',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = 'var(--le-primary-hover)')}
              onMouseLeave={(e) => (e.target.style.backgroundColor = 'var(--le-primary)')}
            >
              Calculate My Taxes
            </button>

            {calculatedTax && (
              <div style={{ marginTop: '30px', padding: '25px', backgroundColor: 'var(--le-bg-card)', borderRadius: '8px', border: `2px solid var(--le-success)` }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px', color: 'var(--le-success)' }}>
                  ✓ Your Estimated Taxes
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '20px' }}>
                  <div>
                    <p style={{ fontSize: '13px', color: 'var(--le-text-secondary)', marginBottom: '5px' }}>Assessed Value</p>
                    <p style={{ fontSize: '22px', fontWeight: '700', color: 'var(--le-text)' }}>
                      ${parseFloat(calculatedTax.assessedValue).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p style={{ fontSize: '13px', color: 'var(--le-text-secondary)', marginBottom: '5px' }}>Annual Tax</p>
                    <p style={{ fontSize: '22px', fontWeight: '700', color: 'var(--le-text)' }}>
                      ${parseFloat(calculatedTax.annualTax).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p style={{ fontSize: '13px', color: 'var(--le-text-secondary)', marginBottom: '5px' }}>Monthly Payment</p>
                    <p style={{ fontSize: '22px', fontWeight: '700', color: 'var(--le-text)' }}>
                      ${parseFloat(calculatedTax.monthlyTax).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Tax Exemptions */}
      <section style={{ padding: '60px 20px', backgroundColor: 'var(--le-bg)', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '40px', color: 'var(--le-text)' }}>
          Property Tax Exemptions
        </h2>
        <p style={{ fontSize: '16px', color: 'var(--le-text-secondary)', marginBottom: '40px', maxWidth: '700px', lineHeight: '1.6' }}>
          Many homeowners qualify for tax breaks. Here are the most common exemptions\u2014check with your local assessor to see if you qualify.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '25px' }}>
          {exemptions.map((exemption, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: 'var(--le-bg-card)',
                padding: '25px',
                borderRadius: '8px',
                border: `1px solid var(--le-border)`,
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--le-primary)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--le-border)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '10px', color: 'var(--le-primary)' }}>
                {exemption.title}
              </h3>
              <p style={{ color: 'var(--le-text)', marginBottom: '12px', fontSize: '15px', lineHeight: '1.5' }}>
                {exemption.desc}
              </p>
              <p style={{ fontSize: '13px', color: 'var(--le-text-secondary)', fontStyle: 'italic' }}>
                <strong>Eligibility:</strong> {exemption.eligibility}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* How to Appeal */}
      <section
        id="appeal"
        style={{ padding: '60px 20px', backgroundColor: 'var(--le-bg-card)', borderTop: `1px solid var(--le-border)`, borderBottom: `1px solid var(--le-border)` }}
      >
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '12px', color: 'var(--le-text)' }}>
            How to Appeal Your Property Tax Assessment
          </h2>
          <p style={{ fontSize: '16px', color: 'var(--le-text-secondary)', marginBottom: '40px', lineHeight: '1.6' }}>
            Believe your property is overvalued? You have the right to appeal. Here\u2019s a step-by-step guide to get it done.
          </p>

          <div style={{ display: 'grid', gap: '25px' }}>
            {appealSteps.map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '60px 1fr',
                  gap: '20px',
                  alignItems: 'flex-start',
                }}
              >
                <div
                  style={{
                    width: '60px',
                    height: '60px',
                    backgroundColor: 'var(--le-primary)',
                    color: '#fff',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '700',
                    fontSize: '24px',
                    flexShrink: 0,
                  }}
                >
                  {item.step}
                </div>
                <div>
                  <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '8px', color: 'var(--le-text)' }}>
                    {item.title}
                  </h3>
                  <p style={{ color: 'var(--le-text-secondary)', fontSize: '15px', lineHeight: '1.6' }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '40px', padding: '25px', backgroundColor: 'var(--le-bg)', borderLeft: `4px solid var(--le-accent)`, borderRadius: '6px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '15px', color: 'var(--le-text)' }}>
              💡 Tips for a Successful Appeal
            </h3>
            <ul style={{ color: 'var(--le-text-secondary)', fontSize: '15px', lineHeight: '1.7', paddingLeft: '20px' }}>
              <li style={{ marginBottom: '10px' }}>
                <strong>Gather comparable sales:</strong> Find 3\u20135 similar homes recently sold in your area.
              </li>
              <li style={{ marginBottom: '10px' }}>
                <strong>Document property condition:</strong> Photograph any damage, outdated features, or maintenance issues.
              </li>
              <li style={{ marginBottom: '10px' }}>
                <strong>Check for errors:</strong> Verify square footage, lot size, number of bedrooms/bathrooms on the assessment.
              </li>
              <li style={{ marginBottom: '10px' }}>
                <strong>Know the deadline:</strong> Appeals must be filed by a specific date\u2014typically 30\u201390 days after the notice.
              </li>
              <li>
                <strong>Consider professional help:</strong> For high-value properties, a property tax specialist pays for itself.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Tax Deductions */}
      <section style={{ padding: '60px 20px', backgroundColor: 'var(--le-bg)', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '40px', color: 'var(--le-text)' }}>
          Tax Deductions for Homeowners
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px' }}>
          <div style={{ backgroundColor: 'var(--le-bg-card)', padding: '25px', borderRadius: '8px', border: `1px solid var(--le-border)` }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px', color: 'var(--le-primary)' }}>
              Mortgage Interest Deduction
            </h3>
            <p style={{ color: 'var(--le-text-secondary)', lineHeight: '1.6', fontSize: '15px', marginBottom: '12px' }}>
              Deduct the interest paid on mortgages up to $750,000 of loan amount (or $1 million if the loan originated before Dec. 16, 2017).
            </p>
            <p style={{ fontSize: '13px', color: 'var(--le-text-secondary)', fontStyle: 'italic' }}>
              Note: Only available if you itemize deductions.
            </p>
          </div>

          <div style={{ backgroundColor: 'var(--le-bg-card)', padding: '25px', borderRadius: '8px', border: `1px solid var(--le-border)` }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px', color: 'var(--le-primary)' }}>
              Property Tax Deduction
            </h3>
            <p style={{ color: 'var(--le-text-secondary)', lineHeight: '1.6', fontSize: '15px', marginBottom: '12px' }}>
              Deduct up to $10,000 in state and local taxes (SALT), including property taxes, on your federal return when itemizing.
            </p>
            <p style={{ fontSize: '13px', color: 'var(--le-text-secondary)', fontStyle: 'italic' }}>
              This limit applies to all SALT combined.
            </p>
          </div>

          <div style={{ backgroundColor: 'var(--le-bg-card)', padding: '25px', borderRadius: '8px', border: `1px solid var(--le-border)` }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px', color: 'var(--le-primary)' }}>
              Home Office Deduction
            </h3>
            <p style={{ color: 'var(--le-text-secondary)', lineHeight: '1.6', fontSize: '15px', marginBottom: '12px' }}>
              If you work from home as a self-employed individual, deduct a portion of mortgage interest, property taxes, utilities, and repairs.
            </p>
            <p style={{ fontSize: '13px', color: 'var(--le-text-secondary)', fontStyle: 'italic' }}>
              Use the simplified method (300 sq. ft. max × $5) or calculate actual expenses.
            </p>
          </div>

          <div style={{ backgroundColor: 'var(--le-bg-card)', padding: '25px', borderRadius: '8px', border: `1px solid var(--le-border)` }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px', color: 'var(--le-primary)' }}>
              Energy Efficiency Credits
            </h3>
            <p style={{ color: 'var(--le-text-secondary)', lineHeight: '1.6', fontSize: '15px', marginBottom: '12px' }}>
              Tax credits (not deductions) for installing solar panels, heat pumps, or making energy-efficient upgrades.
            </p>
            <p style={{ fontSize: '13px', color: 'var(--le-text-secondary)', fontStyle: 'italic' }}>
              These are credits directly reducing your tax liability, not income deductions.
            </p>
          </div>

          <div style={{ backgroundColor: 'var(--le-bg-card)', padding: '25px', borderRadius: '8px', border: `1px solid var(--le-border)` }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px', color: 'var(--le-primary)' }}>
              Capital Gains Exclusion
            </h3>
            <p style={{ color: 'var(--le-text-secondary)', lineHeight: '1.6', fontSize: '15px', marginBottom: '12px' }}>
              Exclude up to $250,000 (single) or $500,000 (married) of profit when selling your primary residence.
            </p>
            <p style={{ fontSize: '13px', color: 'var(--le-text-secondary)', fontStyle: 'italic' }}>
              Must have owned and lived in the home 2 of the last 5 years.
            </p>
          </div>

          <div style={{ backgroundColor: 'var(--le-bg-card)', padding: '25px', borderRadius: '8px', border: `1px solid var(--le-border)` }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px', color: 'var(--le-primary)' }}>
              State-Specific Deductions
            </h3>
            <p style={{ color: 'var(--le-text-secondary)', lineHeight: '1.6', fontSize: '15px', marginBottom: '12px' }}>
              Some states offer additional deductions for property taxes, homeowners\u2019 insurance, or energy improvements.
            </p>
            <p style={{ fontSize: '13px', color: 'var(--le-text-secondary)', fontStyle: 'italic' }}>
              Check your state\u2019s tax agency for local benefits.
            </p>
          </div>
        </div>
      </section>

      {/* Escrow Explained */}
      <section style={{ padding: '60px 20px', backgroundColor: 'var(--le-bg-card)', borderTop: `1px solid var(--le-border)`, borderBottom: `1px solid var(--le-border)` }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '40px', color: 'var(--le-text)' }}>
            Understanding Escrow
          </h2>

          <div style={{ backgroundColor: 'var(--le-bg)', padding: '35px', borderRadius: '10px', border: `1px solid var(--le-border)`, marginBottom: '30px' }}>
            <h3 style={{ fontSize: '22px', fontWeight: '600', marginBottom: '15px', color: 'var(--le-text)' }}>
              What Is an Escrow Account?
            </h3>
            <p style={{ color: 'var(--le-text-secondary)', lineHeight: '1.7', fontSize: '15px' }}>
              An escrow account is a savings account held by your mortgage lender. You contribute a portion of your property taxes and homeowners\u2019 insurance to this account each month as part of your mortgage payment. The lender then pays these bills on your behalf, ensuring they\u2019re never late.
            </p>
          </div>

          <div style={{ backgroundColor: 'var(--le-bg)', padding: '35px', borderRadius: '10px', border: `1px solid var(--le-border)`, marginBottom: '30px' }}>
            <h3 style={{ fontSize: '22px', fontWeight: '600', marginBottom: '15px', color: 'var(--le-text)' }}>
              How Escrow Works (Step-by-Step)
            </h3>
            <ol style={{ color: 'var(--le-text-secondary)', lineHeight: '1.8', fontSize: '15px', paddingLeft: '20px' }}>
              <li style={{ marginBottom: '12px' }}>
                Lender estimates annual property taxes and insurance costs.
              </li>
              <li style={{ marginBottom: '12px' }}>
                Monthly escrow payment is calculated: (Annual taxes + Insurance) ÷ 12 months.
              </li>
              <li style={{ marginBottom: '12px' }}>
                You add this amount to your monthly mortgage payment.
              </li>
              <li style={{ marginBottom: '12px' }}>
                Lender holds the money in an escrow account (interest-free).
              </li>
              <li>
                When bills are due, lender pays them from the escrow account.
              </li>
            </ol>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px' }}>
            <div style={{ backgroundColor: 'var(--le-bg)', padding: '25px', borderRadius: '8px', border: `2px solid var(--le-warning)` }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px', color: 'var(--le-warning)' }}>
                ⚠️ Escrow Shortage
              </h3>
              <p style={{ color: 'var(--le-text-secondary)', lineHeight: '1.6', fontSize: '15px' }}>
                If actual taxes or insurance exceed the estimate, your lender may request a lump-sum payment to cover the difference.
              </p>
            </div>

            <div style={{ backgroundColor: 'var(--le-bg)', padding: '25px', borderRadius: '8px', border: `2px solid var(--le-success)` }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px', color: 'var(--le-success)' }}>
                ✓ Escrow Surplus
              </h3>
              <p style={{ color: 'var(--le-text-secondary)', lineHeight: '1.6', fontSize: '15px' }}>
                If actual costs are lower, you\u2019ll receive a refund. Some lenders apply it to the next year\u2019s escrow payment.
              </p>
            </div>
          </div>

          <div style={{ marginTop: '30px', padding: '25px', backgroundColor: 'var(--le-bg)', borderRadius: '8px', border: `1px solid var(--le-border)` }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '15px', color: 'var(--le-text)' }}>
              Escrow Analysis
            </h3>
            <p style={{ color: 'var(--le-text-secondary)', lineHeight: '1.7', fontSize: '15px' }}>
              Every year, your lender performs an escrow analysis comparing estimated vs. actual costs. Request a copy and review for errors in property tax or insurance amounts. Catching mistakes early can save you hundreds of dollars.
            </p>
          </div>
        </div>
      </section>

      {/* Tax Rates Comparison */}
      <section style={{ padding: '60px 20px', backgroundColor: 'var(--le-bg)', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '12px', color: 'var(--le-text)' }}>
          Property Tax Rate Comparison
        </h2>
        <p style={{ fontSize: '16px', color: 'var(--le-text-secondary)', marginBottom: '40px', lineHeight: '1.6' }}>
          Property tax rates vary dramatically by location. Here\u2019s a sample of different areas to show the range.
        </p>

        <div style={{ overflowX: 'auto', marginBottom: '30px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'var(--le-bg-card)', borderRadius: '8px', overflow: 'hidden' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--le-primary)', color: '#fff' }}>
                <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', fontSize: '15px' }}>Area Type</th>
                <th style={{ padding: '16px', textAlign: 'center', fontWeight: '600', fontSize: '15px' }}>Tax Rate</th>
                <th style={{ padding: '16px', textAlign: 'center', fontWeight: '600', fontSize: '15px' }}>Home Value</th>
                <th style={{ padding: '16px', textAlign: 'center', fontWeight: '600', fontSize: '15px' }}>Annual Tax</th>
              </tr>
            </thead>
            <tbody>
              {taxRates.map((row, idx) => (
                <tr
                  key={idx}
                  style={{
                    borderBottom: idx !== taxRates.length - 1 ? `1px solid var(--le-border)` : 'none',
                    backgroundColor: idx % 2 === 0 ? 'transparent' : 'rgba(0,0,0,0.02)',
                  }}
                >
                  <td style={{ padding: '16px', color: 'var(--le-text)', fontWeight: '500' }}>{row.area}</td>
                  <td style={{ padding: '16px', textAlign: 'center', color: 'var(--le-primary)', fontWeight: '600' }}>{row.rate}</td>
                  <td style={{ padding: '16px', textAlign: 'center', color: 'var(--le-text)' }}>{row.home_value}</td>
                  <td style={{ padding: '16px', textAlign: 'center', color: 'var(--le-text)', fontWeight: '600' }}>{row.annual_tax}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ padding: '25px', backgroundColor: 'var(--le-bg-card)', borderRadius: '8px', border: `1px solid var(--le-border)` }}>
          <p style={{ color: 'var(--le-text-secondary)', fontSize: '15px', lineHeight: '1.6' }}>
            <strong>Why the variation?</strong> Tax rates are determined by local governments and reflect the cost of providing schools, roads, fire, police, and other services. Urban areas with higher service demands often have higher rates. Rural areas may be lower.
          </p>
        </div>
      </section>

      {/* When Taxes Increase */}
      <section style={{ padding: '60px 20px', backgroundColor: 'var(--le-bg-card)', borderTop: `1px solid var(--le-border)`, borderBottom: `1px solid var(--le-border)` }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '40px', color: 'var(--le-text)' }}>
            When (and Why) Property Taxes Increase
          </h2>

          <div style={{ display: 'grid', gap: '20px' }}>
            <div style={{ backgroundColor: 'var(--le-bg)', padding: '25px', borderRadius: '8px', border: `1px solid var(--le-border)` }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '10px', color: 'var(--le-primary)' }}>
                Home Improvements & Renovations
              </h3>
              <p style={{ color: 'var(--le-text-secondary)', lineHeight: '1.6', fontSize: '15px' }}>
                Major upgrades (roof, addition, pool, HVAC) often trigger a reassessment. The assessor may increase the home\u2019s value, raising your taxes. Report improvements correctly to avoid surprises.
              </p>
            </div>

            <div style={{ backgroundColor: 'var(--le-bg)', padding: '25px', borderRadius: '8px', border: `1px solid var(--le-border)` }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '10px', color: 'var(--le-primary)' }}>
                Periodic Reassessment
              </h3>
              <p style={{ color: 'var(--le-text-secondary)', lineHeight: '1.6', fontSize: '15px' }}>
                If market values in your area rise significantly, the assessor may perform a blanket reassessment, raising many properties\u2019 values at once.
              </p>
            </div>

            <div style={{ backgroundColor: 'var(--le-bg)', padding: '25px', borderRadius: '8px', border: `1px solid var(--le-border)` }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '10px', color: 'var(--le-primary)' }}>
                Increased Mill Rates
              </h3>
              <p style={{ color: 'var(--le-text-secondary)', lineHeight: '1.6', fontSize: '15px' }}>
                Local governments may raise mill rates to fund schools, infrastructure, or other services. Even if your assessed value stays the same, your tax bill rises.
              </p>
            </div>

            <div style={{ backgroundColor: 'var(--le-bg)', padding: '25px', borderRadius: '8px', border: `1px solid var(--le-border)` }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '10px', color: 'var(--le-primary)' }}>
                Loss of Exemptions
              </h3>
              <p style={{ color: 'var(--le-text-secondary)', lineHeight: '1.6', fontSize: '15px' }}>
                If you no longer qualify for homestead, senior, or other exemptions, your taxes jump immediately. Stay aware of eligibility changes.
              </p>
            </div>

            <div style={{ backgroundColor: 'var(--le-bg)', padding: '25px', borderRadius: '8px', border: `1px solid var(--le-border)` }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '10px', color: 'var(--le-primary)' }}>
                Change of Ownership
              </h3>
              <p style={{ color: 'var(--le-text-secondary)', lineHeight: '1.6', fontSize: '15px' }}>
                In some states, selling or transferring property triggers a full reassessment at the new market value, potentially raising taxes significantly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tax Minimization Strategies */}
      <section style={{ padding: '60px 20px', backgroundColor: 'var(--le-bg)', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '40px', color: 'var(--le-text)' }}>
          10 Strategies to Minimize Your Property Tax Burden
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '25px' }}>
          {taxStrategies.map((strategy, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: 'var(--le-bg-card)',
                padding: '25px',
                borderRadius: '8px',
                border: `1px solid var(--le-border)`,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div
                style={{
                  width: '45px',
                  height: '45px',
                  backgroundColor: 'var(--le-accent)',
                  color: '#fff',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '700',
                  fontSize: '20px',
                  marginBottom: '15px',
                  flexShrink: 0,
                }}
              >
                {strategy.num}
              </div>
              <h3 style={{ fontSize: '17px', fontWeight: '600', marginBottom: '10px', color: 'var(--le-text)' }}>
                {strategy.title}
              </h3>
              <p style={{ color: 'var(--le-text-secondary)', lineHeight: '1.6', fontSize: '15px' }}>
                {strategy.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '60px 20px', backgroundColor: 'var(--le-bg-card)', borderTop: `1px solid var(--le-border)`, borderBottom: `1px solid var(--le-border)` }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '40px', color: 'var(--le-text)', textAlign: 'center' }}>
            Frequently Asked Questions
          </h2>

          <div style={{ display: 'grid', gap: '12px' }}>
            {faqItems.map((item) => (
              <div
                key={item.id}
                style={{
                  backgroundColor: 'var(--le-bg)',
                  border: `1px solid var(--le-border)`,
                  borderRadius: '8px',
                  overflow: 'hidden',
                }}
              >
                <button
                  onClick={() => toggleAccordion(item.id)}
                  style={{
                    width: '100%',
                    padding: '20px',
                    backgroundColor: activeAccordion === item.id ? 'var(--le-primary)' : 'transparent',
                    color: activeAccordion === item.id ? '#fff' : 'var(--le-text)',
                    fontSize: '16px',
                    fontWeight: '600',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                  onMouseEnter={(e) => {
                    if (activeAccordion !== item.id) {
                      e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.02)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeAccordion !== item.id) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  {item.q}
                  <span style={{ fontSize: '20px', marginLeft: '12px', transform: activeAccordion === item.id ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}>
                    ▼
                  </span>
                </button>

                {activeAccordion === item.id && (
                  <div style={{ padding: '20px', borderTop: `1px solid var(--le-border)`, backgroundColor: 'rgba(0,0,0,0.02)' }}>
                    <p style={{ color: 'var(--le-text-secondary)', lineHeight: '1.7', fontSize: '15px' }}>
                      {item.a}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Capture CTA */}
      <section style={{ padding: '60px 20px', backgroundColor: 'var(--le-primary)', color: '#fff' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '15px' }}>
            Ready to Take Action?
          </h2>
          <p style={{ fontSize: '18px', marginBottom: '35px', opacity: '0.95', lineHeight: '1.6' }}>
            Get connected with a tax-savvy real estate professional who can help you minimize your property tax burden and make smart financial decisions.
          </p>

          {!leadSubmitted ? (
            <form
              onSubmit={handleLeadSubmit}
              style={{
                display: 'grid',
                gap: '15px',
              }}
            >
              <input
                type="email"
                placeholder="Your email address"
                value={leadEmail}
                onChange={(e) => setLeadEmail(e.target.value)}
                required
                style={{
                  padding: '14px',
                  fontSize: '15px',
                  border: 'none',
                  borderRadius: '6px',
                  backgroundColor: 'rgba(255,255,255,0.95)',
                  color: 'var(--le-text)',
                  boxSizing: 'border-box',
                }}
              />
              <input
                type="tel"
                placeholder="Your phone number"
                value={leadPhone}
                onChange={(e) => setLeadPhone(e.target.value)}
                required
                style={{
                  padding: '14px',
                  fontSize: '15px',
                  border: 'none',
                  borderRadius: '6px',
                  backgroundColor: 'rgba(255,255,255,0.95)',
                  color: 'var(--le-text)',
                  boxSizing: 'border-box',
                }}
              />
              <button
                type="submit"
                style={{
                  padding: '14px',
                  fontSize: '16px',
                  fontWeight: '600',
                  backgroundColor: '#fff',
                  color: 'var(--le-primary)',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => (e.target.style.transform = 'translateY(-2px)')}
                onMouseLeave={(e) => (e.target.style.transform = 'translateY(0)')}
              >
                Connect With a Professional
              </button>
            </form>
          ) : (
            <div
              style={{
                padding: '20px',
                backgroundColor: 'rgba(255,255,255,0.15)',
                borderRadius: '6px',
                fontSize: '16px',
              }}
            >
              ✓ Thank you! A real estate professional will be in touch shortly.
            </div>
          )}
        </div>
      </section>

      {/* Footer Info */}
      <section style={{ padding: '40px 20px', backgroundColor: 'var(--le-bg)', borderTop: `1px solid var(--le-border)`, textAlign: 'center' }}>
        <p style={{ color: 'var(--le-text-secondary)', fontSize: '14px', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
          This guide provides general educational information about property taxes. Tax laws vary by state and locality. Please consult with a qualified tax professional or real estate agent for advice specific to your situation. The calculations on this page are estimates only.
        </p>
      </section>

      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqItems.map((item) => ({
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

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://realtyclientengine.app',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Property Tax Guide',
                item: 'https://realtyclientengine.app/property-taxes',
              },
            ],
          }),
        }}
      />
    </div>
  );
}
