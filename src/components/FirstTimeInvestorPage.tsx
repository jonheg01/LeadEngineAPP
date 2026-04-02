'use client';

import { useState } from 'react';

export default function FirstTimeInvestorPage() {
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
          source: 'First Time Investor',
          lead_type: 'Buyer',
          page_url: typeof window !== 'undefined' ? window.location.pathname : '/firsttimeinvestor',
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

  const investmentTypes = [
    {
      title: 'Rental Properties',
      icon: 'home',
      description: 'Generate steady monthly income through tenant rent. Build long-term wealth through appreciation and mortgage paydown.',
      benefits: ['Monthly cash flow', 'Tax deductions', 'Appreciation', 'Leverage'],
    },
    {
      title: 'Fix-and-Flip',
      icon: 'hammer',
      description: 'Purchase undervalued properties, renovate, and sell for profit. Requires capital and market knowledge but higher short-term returns.',
      benefits: ['Higher margins', 'Quick returns', 'Active strategy', 'Market opportunity'],
    },
    {
      title: 'Commercial Real Estate',
      icon: 'building',
      description: 'Office, retail, or industrial properties with longer leases and institutional-grade tenants. Higher investment required but stable returns.',
      benefits: ['Longer leases', 'Professional tenants', 'Higher valuations', 'Portfolio diversity'],
    },
    {
      title: 'REITs & Syndications',
      icon: 'chart',
      description: 'Pool capital with other investors through Real Estate Investment Trusts. Lower entry cost with passive income and diversification.',
      benefits: ['Passive income', 'Low entry cost', 'Diversified', 'No management'],
    },
  ];

  const financingOptions = [
    {
      name: 'Conventional Loans',
      details: 'Bank mortgages with 20-30% down, fixed rates, 15-30 year terms. Best for steady cash flow investors with good credit.',
    },
    {
      name: 'FHA Loans',
      details: 'Government-backed loans with 3.5% down. Limited to primary residence but excellent starter option for new investors.',
    },
    {
      name: 'Hard Money Loans',
      details: 'Short-term, asset-based financing for fix-and-flip projects. Higher rates but faster approval and flexible terms.',
    },
    {
      name: 'Portfolio Loans',
      details: 'Held by banks without selling to secondary markets. Flexible credit requirements, ideal for multiple properties.',
    },
    {
      name: 'HELOC & Cash-Out Refinance',
      details: 'Leverage existing home equity to fund new investments. Tax-efficient and lower rates than hard money.',
    },
    {
      name: 'Private Money',
      details: 'Loans from individuals or investment groups. Flexible terms but higher rates. Build relationships with local investors.',
    },
  ];

  const commonMistakes = [
    {
      mistake: 'Overleveraging',
      solution: 'Don\u2019t borrow more than 75-80% of property value. Keep cash reserves for vacancies and repairs. Maintain debt service coverage ratios over 1.25x.',
    },
    {
      mistake: 'Skipping Due Diligence',
      solution: 'Always inspect properties thoroughly. Get professional appraisals and title searches. Research neighborhood trends and local ordinances.',
    },
    {
      mistake: 'Underestimating Expenses',
      solution: 'Budget conservatively. Include vacancy, repairs, insurance, taxes, and property management. Add a 10% contingency buffer.',
    },
    {
      mistake: 'Ignoring Market Cycles',
      solution: 'Buy below market value during downturns. Diversify across markets and property types. Track leading indicators like job growth.',
    },
    {
      mistake: 'Poor Tenant Selection',
      solution: 'Screen thoroughly: credit checks, employment verification, references. Use professional property management if needed.',
    },
    {
      mistake: 'Not Considering the Team',
      solution: 'Build relationships with local real estate agents, contractors, accountants, and attorneys. Quality advisors save money long-term.',
    },
  ];

  const marketAnalysisTips = [
    'Track unemployment rates—rising joblessness signals potential rent defaults and declining demand.',
    'Monitor population migration and demographic trends. Young professionals moving to a city increase demand and rental rates.',
    'Study new construction permits. High permits indicate growth; declining permits suggest market saturation.',
    'Analyze rent growth rates. If rents grow 3-5% annually in a market, it\u2019s typically stable and attractive.',
    'Compare price-to-rent ratios. Lower ratios (under 15:1) suggest better rental yields; higher ratios favor longer holds.',
    'Review school district ratings and local amenities. Quality schools and walkability drive property values and demand.',
  ];

  const taxBenefits = [
    {
      benefit: 'Mortgage Interest Deduction',
      detail: 'Deduct all mortgage interest paid on investment properties. This alone can reduce taxable income significantly in early years.',
    },
    {
      benefit: 'Depreciation',
      detail: 'Deduct building value (not land) over 27.5 years. Creates tax-free cash flow despite positive property appreciation.',
    },
    {
      benefit: 'Operating Expense Deductions',
      detail: 'Deduct utilities, insurance, taxes, HOA fees, repairs, and maintenance. Most operating costs reduce your tax bill.',
    },
    {
      benefit: '1031 Exchange',
      detail: 'Defer capital gains tax indefinitely by exchanging one investment property for another. Powerful wealth-building tool.',
    },
    {
      benefit: 'Cost Segregation',
      detail: 'Accelerate depreciation on components of buildings. Advanced strategy can significantly increase early-year deductions.',
    },
    {
      benefit: 'Home Office Deduction',
      detail: 'Deduct home office space if you manage rental properties from home. Include utilities, rent, and internet proportionally.',
    },
  ];

  const faqItems = [
    {
      question: 'How much money do I need to start investing in real estate?',
      answer: 'It depends on your strategy. Traditional rentals require 20-25% down (around $50,000-$100,000 for a $250,000 property). Fix-and-flip requires sufficient capital for purchase and renovation. REITs can be started with as little as $500. FHA loans allow 3.5% down for owner-occupied properties.',
    },
    {
      question: 'Should I start with a primary residence or investment property?',
      answer: 'Many successful investors start by house-hacking: buying a 2-4 unit property with an FHA loan, living in one unit, and renting others. This leverages owner-financing advantages while generating immediate income. Alternatively, start with a single-family rental in your market to learn the business.',
    },
    {
      question: 'What\u2019s a good return on investment for real estate?',
      answer: 'Target 8-12% annual returns (cash-on-cash return on down payment plus appreciation). Strong markets can deliver 12-15%. Be skeptical of anyone promising over 20% returns consistently. Returns vary by market, property type, and leverage.',
    },
    {
      question: 'How do I evaluate if a property is a good investment?',
      answer: 'Use the 1% rule: monthly rent should be 1% of purchase price. For $200,000 property, rent should be $2,000+. Calculate cap rate (NOI divided by purchase price). Aim for 5-10%. Run pro formas including all expenses, vacancy, and maintenance reserves.',
    },
    {
      question: 'Do I need a real estate license to invest?',
      answer: 'No. A license is useful if you\u2019ll buy/sell multiple properties or want agent commissions. Many investors use agents without licenses. Getting licensed can save on commissions over time.',
    },
    {
      question: 'What\u2019s the difference between cash flow and appreciation?',
      answer: 'Cash flow is monthly rent minus expenses. Appreciation is property value growth over time. Both matter. Some markets offer strong cash flow (Midwest), others strong appreciation (Coasts). Diversification across both strategies builds wealth faster.',
    },
    {
      question: 'Should I use a property manager or manage myself?',
      answer: 'Property managers cost 8-12% of rent but save time and typically reduce vacancy through professional marketing. Early investors often self-manage one or two properties to learn. As your portfolio grows, managers free you to focus on acquisition and strategy.',
    },
    {
      question: 'How do I protect my investment legally?',
      answer: 'Form an LLC for each property or group of properties. This separates liability from personal assets. Maintain adequate insurance. Keep detailed records. Consult with a real estate attorney on contracts and landlord-tenant law in your state.',
    },
  ];

  const renderIcon = (type: string) => {
    const iconStyle = { width: '24px', height: '24px', display: 'inline-block' };
    switch (type) {
      case 'home':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" style={iconStyle}>
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <polyline points="9 22 9 12 15 12 15 22" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      case 'hammer':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" style={iconStyle}>
            <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5a2 2 0 0 1-1 .5H3v-3.5a2 2 0 0 1 .5-1L17 3z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      case 'building':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" style={iconStyle}>
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" strokeWidth="2" />
            <line x1="9" y1="3" x2="9" y2="21" strokeWidth="2" strokeLinecap="round" />
            <line x1="15" y1="3" x2="15" y2="21" strokeWidth="2" strokeLinecap="round" />
            <line x1="3" y1="9" x2="21" y2="9" strokeWidth="2" strokeLinecap="round" />
            <line x1="3" y1="15" x2="21" y2="15" strokeWidth="2" strokeLinecap="round" />
          </svg>
        );
      case 'chart':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" style={iconStyle}>
            <line x1="12" y1="2" x2="12" y2="22" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M17 5H9.5a1.5 1.5 0 0 0-1.5 1.5v12a1.5 1.5 0 0 0 1.5 1.5H17" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4 12h16" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      case 'check':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{ ...iconStyle, color: 'var(--le-accent)' }}>
            <polyline points="20 6 9 17 4 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div style={{ backgroundColor: 'var(--le-bg)', color: 'var(--le-text)' }}>
      {/* Hero Section */}
      <section
        style={{
          backgroundImage: 'linear-gradient(135deg, var(--le-primary) 0%, var(--le-accent) 100%)',
          color: '#ffffff',
          padding: '100px 20px',
          textAlign: 'center',
        }}
      >
        <h1 style={{ fontSize: '48px', fontWeight: '700', marginBottom: '20px', lineHeight: '1.2' }}>
          The Complete Guide to First-Time Real Estate Investing
        </h1>
        <p style={{ fontSize: '20px', marginBottom: '30px', maxWidth: '800px', margin: '0 auto 30px' }}>
          Learn how to build wealth through real estate. This comprehensive guide covers property types, financing, ROI, taxes, and strategies successful investors use to grow their portfolios.
        </p>
      </section>

      {/* Why Invest in Real Estate Section */}
      <section style={{ padding: '80px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '50px', textAlign: 'center' }}>
          Why Real Estate Investing Works
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
          <div style={{ borderLeft: '4px solid var(--le-accent)', paddingLeft: '20px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '10px' }}>Monthly Income</h3>
            <p style={{ lineHeight: '1.6' }}>
              Rental properties generate predictable monthly cash flow. This passive income covers expenses and builds wealth while you sleep.
            </p>
          </div>
          <div style={{ borderLeft: '4px solid var(--le-accent)', paddingLeft: '20px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '10px' }}>Appreciation</h3>
            <p style={{ lineHeight: '1.6' }}>
              Real estate historically appreciates 3-4% annually. Over time, this growth compounds into substantial wealth with minimal effort.
            </p>
          </div>
          <div style={{ borderLeft: '4px solid var(--le-accent)', paddingLeft: '20px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '10px' }}>Leverage</h3>
            <p style={{ lineHeight: '1.6' }}>
              Use borrowed money to amplify returns. A 20% down payment controls 100% of the property. Mortgage payments are made by tenants.
            </p>
          </div>
          <div style={{ borderLeft: '4px solid var(--le-accent)', paddingLeft: '20px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '10px' }}>Tax Benefits</h3>
            <p style={{ lineHeight: '1.6' }}>
              Deduct mortgage interest, depreciation, repairs, and operating expenses. Real estate offers more tax advantages than stocks.
            </p>
          </div>
          <div style={{ borderLeft: '4px solid var(--le-accent)', paddingLeft: '20px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '10px' }}>Tangible Asset</h3>
            <p style={{ lineHeight: '1.6' }}>
              You own something real, not a digital ticker. Real estate can\u2019t disappear overnight and provides security and control.
            </p>
          </div>
          <div style={{ borderLeft: '4px solid var(--le-accent)', paddingLeft: '20px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '10px' }}>Equity Building</h3>
            <p style={{ lineHeight: '1.6' }}>
              Tenants pay down your mortgage. You build equity through appreciation plus every mortgage payment. Your investment funds itself.
            </p>
          </div>
        </div>
      </section>

      {/* Investment Types Section */}
      <section style={{ backgroundColor: 'var(--le-card-bg)', padding: '80px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '50px', textAlign: 'center' }}>
            Types of Real Estate Investments
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
            {investmentTypes.map((type, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: 'var(--le-bg)',
                  border: `1px solid var(--le-border)`,
                  borderRadius: '8px',
                  padding: '30px',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-5px)';
                  (e.currentTarget as HTMLDivElement).style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
                  (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
                }}
              >
                <div style={{ color: 'var(--le-accent)', marginBottom: '15px' }}>
                  {renderIcon(type.icon)}
                </div>
                <h3 style={{ fontSize: '22px', fontWeight: '600', marginBottom: '15px' }}>
                  {type.title}
                </h3>
                <p style={{ lineHeight: '1.6', marginBottom: '20px', fontSize: '15px' }}>
                  {type.description}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {type.benefits.map((benefit, i) => (
                    <span
                      key={i}
                      style={{
                        backgroundColor: 'var(--le-primary)',
                        color: '#ffffff',
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '13px',
                      }}
                    >
                      {benefit}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Financing Options Section */}
      <section style={{ padding: '80px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '50px', textAlign: 'center' }}>
          Financing Options for Investors
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '30px' }}>
          {financingOptions.map((option, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: 'var(--le-card-bg)',
                border: `1px solid var(--le-border)`,
                padding: '25px',
                borderRadius: '8px',
              }}
            >
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '10px', color: 'var(--le-primary)' }}>
                {option.name}
              </h3>
              <p style={{ lineHeight: '1.6', fontSize: '15px' }}>
                {option.details}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ROI Calculation Section */}
      <section style={{ backgroundColor: 'var(--le-card-bg)', padding: '80px 20px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '40px', textAlign: 'center' }}>
            Understanding ROI & Investment Metrics
          </h2>
          <div style={{ backgroundColor: 'var(--le-bg)', padding: '40px', borderRadius: '8px', marginBottom: '30px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '15px' }}>Cap Rate (Capitalization Rate)</h3>
            <p style={{ lineHeight: '1.7', marginBottom: '10px' }}>
              <strong>Formula:</strong> Net Operating Income (NOI) ÷ Purchase Price
            </p>
            <p style={{ lineHeight: '1.6', fontSize: '15px' }}>
              Measures annual return on your cash investment. A 5% cap rate on a $200,000 property means $10,000 annual NOI. Aim for 5-10% depending on market.
            </p>
          </div>
          <div style={{ backgroundColor: 'var(--le-bg)', padding: '40px', borderRadius: '8px', marginBottom: '30px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '15px' }}>Cash-on-Cash Return</h3>
            <p style={{ lineHeight: '1.7', marginBottom: '10px' }}>
              <strong>Formula:</strong> Annual Cash Flow ÷ Total Cash Invested
            </p>
            <p style={{ lineHeight: '1.6', fontSize: '15px' }}>
              If you invest $50,000 down payment and net $6,000 annual cash flow, your cash-on-cash return is 12%. This shows true return on your actual dollars invested.
            </p>
          </div>
          <div style={{ backgroundColor: 'var(--le-bg)', padding: '40px', borderRadius: '8px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '15px' }}>Debt Service Coverage Ratio (DSCR)</h3>
            <p style={{ lineHeight: '1.7', marginBottom: '10px' }}>
              <strong>Formula:</strong> NOI ÷ Annual Mortgage Payment
            </p>
            <p style={{ lineHeight: '1.6', fontSize: '15px' }}>
              Lenders want DSCR over 1.25x. This means your property generates 25% more income than needed for mortgage payments. Essential for refinancing and portfolio growth.
            </p>
          </div>
        </div>
      </section>

      {/* Common Mistakes Section */}
      <section style={{ padding: '80px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '50px', textAlign: 'center' }}>
          Common Mistakes to Avoid
        </h2>
        <div style={{ display: 'grid', gap: '30px' }}>
          {commonMistakes.map((item, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: 'var(--le-card-bg)',
                border: `1px solid var(--le-border)`,
                padding: '30px',
                borderRadius: '8px',
              }}
            >
              <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                <div style={{ color: 'var(--le-accent)', marginTop: '3px' }}>
                  {renderIcon('check')}
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '10px', color: '#d32f2f' }}>
                    {item.mistake}
                  </h3>
                  <p style={{ lineHeight: '1.6', fontSize: '15px' }}>
                    {item.solution}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Market Analysis Tips Section */}
      <section style={{ backgroundColor: 'var(--le-card-bg)', padding: '80px 20px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '50px', textAlign: 'center' }}>
            How to Analyze Investment Markets
          </h2>
          <div style={{ display: 'grid', gap: '20px' }}>
            {marketAnalysisTips.map((tip, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  gap: '15px',
                  backgroundColor: 'var(--le-bg)',
                  padding: '20px',
                  borderRadius: '8px',
                  border: `1px solid var(--le-border)`,
                }}
              >
                <div
                  style={{
                    minWidth: '32px',
                    width: '32px',
                    height: '32px',
                    backgroundColor: 'var(--le-primary)',
                    color: '#ffffff',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '600',
                    fontSize: '16px',
                  }}
                >
                  {idx + 1}
                </div>
                <p style={{ lineHeight: '1.6', fontSize: '15px', marginTop: '5px' }}>
                  {tip}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tax Benefits Section */}
      <section style={{ padding: '80px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '50px', textAlign: 'center' }}>
          Tax Benefits of Real Estate Investing
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
          {taxBenefits.map((item, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: 'var(--le-card-bg)',
                padding: '25px',
                borderRadius: '8px',
                border: `1px solid var(--le-border)`,
              }}
            >
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '10px', color: 'var(--le-primary)' }}>
                {item.benefit}
              </h3>
              <p style={{ lineHeight: '1.6', fontSize: '14px' }}>
                {item.detail}
              </p>
            </div>
          ))}
        </div>
        <div
          style={{
            backgroundColor: '#e3f2fd',
            padding: '25px',
            marginTop: '40px',
            borderRadius: '8px',
            borderLeft: `4px solid var(--le-primary)`,
          }}
        >
          <p style={{ lineHeight: '1.6', fontSize: '15px', color: '#1565c0' }}>
            <strong>Pro Tip:</strong> Consult with a real estate accountant to maximize deductions. Many investors find that tax savings alone justify professional accounting fees.
          </p>
        </div>
      </section>

      {/* Lead Capture Form Section */}
      <section style={{ backgroundColor: 'var(--le-primary)', color: '#ffffff', padding: '80px 20px' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '20px' }}>
            Ready to Start Your Investing Journey?
          </h2>
          <p style={{ fontSize: '18px', marginBottom: '40px', lineHeight: '1.6' }}>
            Get our complete Investor\u2019s Guide with property analysis templates, market rankings, and financing checklists.
          </p>

          <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleFormChange}
              required
              style={{
                padding: '14px 16px',
                borderRadius: '6px',
                border: 'none',
                fontSize: '16px',
                backgroundColor: '#ffffff',
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
                padding: '14px 16px',
                borderRadius: '6px',
                border: 'none',
                fontSize: '16px',
                backgroundColor: '#ffffff',
                color: 'var(--le-text)',
              }}
            />
            <input
              type="tel"
              name="phone"
              placeholder="Your Phone"
              value={formData.phone}
              onChange={handleFormChange}
              style={{
                padding: '14px 16px',
                borderRadius: '6px',
                border: 'none',
                fontSize: '16px',
                backgroundColor: '#ffffff',
                color: 'var(--le-text)',
              }}
            />
            <button
              type="submit"
              style={{
                padding: '16px 32px',
                backgroundColor: 'var(--le-accent)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '6px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--le-hover)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--le-accent)';
              }}
            >
              Get the Investor\u2019s Guide
            </button>
          </form>
        </div>
      </section>

      {/* FAQ Section */}
      <section style={{ padding: '80px 20px', maxWidth: '1000px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '50px', textAlign: 'center' }}>
          Frequently Asked Questions
        </h2>
        <div style={{ display: 'grid', gap: '15px' }}>
          {faqItems.map((faq, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: 'var(--le-card-bg)',
                border: `1px solid var(--le-border)`,
                borderRadius: '8px',
                overflow: 'hidden',
              }}
            >
              <button
                onClick={() => setOpenFAQ(openFAQ === idx ? -1 : idx)}
                style={{
                  width: '100%',
                  padding: '20px',
                  border: 'none',
                  backgroundColor: 'transparent',
                  textAlign: 'left',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '16px',
                  fontWeight: '600',
                  color: 'var(--le-text)',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--le-hover)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
                }}
              >
                <span>{faq.question}</span>
                <span
                  style={{
                    display: 'inline-block',
                    transform: openFAQ === idx ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s ease',
                    color: 'var(--le-accent)',
                  }}
                >
                  \u25BC
                </span>
              </button>
              {openFAQ === idx && (
                <div
                  style={{
                    padding: '0 20px 20px 20px',
                    borderTop: `1px solid var(--le-border)`,
                    lineHeight: '1.7',
                    fontSize: '15px',
                  }}
                >
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA Footer Section */}
      <section style={{ backgroundColor: 'var(--le-card-bg)', padding: '60px 20px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '15px' }}>
          Take the First Step Today
        </h2>
        <p style={{ fontSize: '18px', marginBottom: '30px', maxWidth: '700px', margin: '0 auto 30px' }}>
          Real estate investing has created more millionaires than any other asset class. Our experts are ready to help you build your wealth.
        </p>
        <button
          onClick={() => document.querySelector('input[name="name"]')?.focus()}
          style={{
            padding: '16px 40px',
            backgroundColor: 'var(--le-primary)',
            color: '#ffffff',
            border: 'none',
            borderRadius: '6px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--le-hover)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--le-primary)';
          }}
        >
          Start Your Investor Journey
        </button>
      </section>
    </div>
  );
}
