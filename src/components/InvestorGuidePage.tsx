'use client';

import React, { useState } from 'react';

interface StrategyCardProps {
  title: string;
  description: string;
  pros: string[];
  cons: string[];
  returns: string;
  capital: string;
}

interface ROIData {
  purchasePrice: number;
  downPaymentPercent: number;
  monthlyRent: number;
  monthlyExpenses: number;
}

interface FormData {
  name: string;
  email: string;
  budget: string;
  strategy: string;
}

const StrategyCard: React.FC<StrategyCardProps & { isExpanded: boolean; onToggle: () => void }> = ({
  title,
  description,
  pros,
  cons,
  returns,
  capital,
  isExpanded,
  onToggle,
}) => {
  return (
    <div
      style={{
        backgroundColor: 'var(--le-surface)',
        border: `1px solid var(--le-border)`,
        borderRadius: '12px',
        padding: '24px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        marginBottom: '16px',
      }}
      onClick={onToggle}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: isExpanded ? '16px' : '0',
        }}
      >
        <h3 style={{ color: 'var(--le-text)', fontSize: '18px', fontWeight: '600', margin: 0 }}>
          {title}
        </h3>
        <div
          style={{
            width: '24px',
            height: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--le-primary)',
            fontSize: '20px',
            transition: 'transform 0.3s ease',
            transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        >
          ▼
        </div>
      </div>

      <p style={{ color: 'var(--le-text-secondary)', fontSize: '14px', margin: '0 0 16px 0' }}>
        {description}
      </p>

      {isExpanded && (
        <div style={{ marginTop: '16px', borderTop: `1px solid var(--le-border)`, paddingTop: '16px' }}>
          <div style={{ marginBottom: '16px' }}>
            <h4 style={{ color: 'var(--le-text)', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>
              Pros
            </h4>
            <ul style={{ margin: '0', paddingLeft: '20px', color: 'var(--le-text-secondary)', fontSize: '14px' }}>
              {pros.map((pro, idx) => (
                <li key={idx} style={{ marginBottom: '6px' }}>
                  {pro}
                </li>
              ))}
            </ul>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <h4 style={{ color: 'var(--le-text)', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>
              Cons
            </h4>
            <ul style={{ margin: '0', paddingLeft: '20px', color: 'var(--le-text-secondary)', fontSize: '14px' }}>
              {cons.map((con, idx) => (
                <li key={idx} style={{ marginBottom: '6px' }}>
                  {con}
                </li>
              ))}
            </ul>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={{ backgroundColor: 'var(--le-bg)', padding: '12px', borderRadius: '8px' }}>
              <p style={{ color: 'var(--le-text-secondary)', fontSize: '12px', margin: '0 0 4px 0' }}>
                Typical Returns
              </p>
              <p style={{ color: 'var(--le-primary)', fontSize: '16px', fontWeight: '600', margin: 0 }}>
                {returns}
              </p>
            </div>
            <div style={{ backgroundColor: 'var(--le-bg)', padding: '12px', borderRadius: '8px' }}>
              <p style={{ color: 'var(--le-text-secondary)', fontSize: '12px', margin: '0 0 4px 0' }}>
                Capital Needed
              </p>
              <p style={{ color: 'var(--le-primary)', fontSize: '16px', fontWeight: '600', margin: 0 }}>
                {capital}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ROICalculator: React.FC = () => {
  const [data, setData] = useState<ROIData>({
    purchasePrice: 300000,
    downPaymentPercent: 20,
    monthlyRent: 2000,
    monthlyExpenses: 800,
  });

  const downPaymentAmount = data.purchasePrice * (data.downPaymentPercent / 100);
  const loanAmount = data.purchasePrice - downPaymentAmount;
  const monthlyRoi = data.monthlyRent - data.monthlyExpenses;
  const annualCashFlow = monthlyRoi * 12;
  const cashOnCashReturn = ((monthlyRoi * 12) / downPaymentAmount) * 100;
  const capRate = (annualCashFlow / data.purchasePrice) * 100;

  const handleChange = (field: keyof ROIData, value: number) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div style={{ backgroundColor: 'var(--le-surface)', padding: '32px 24px', borderRadius: '12px', marginTop: '24px' }}>
      <h3 style={{ color: 'var(--le-text)', fontSize: '20px', fontWeight: '600', marginBottom: '24px', margin: 0 }}>
        ROI Calculator
      </h3>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '32px' }}>
        <div>
          <label style={{ display: 'block', color: 'var(--le-text)', fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>
            Purchase Price
          </label>
          <input
            type="number"
            value={data.purchasePrice}
            onChange={(e) => handleChange('purchasePrice', Number(e.target.value))}
            style={{
              width: '100%',
              padding: '10px 12px',
              border: `1px solid var(--le-border)`,
              borderRadius: '8px',
              fontSize: '14px',
              backgroundColor: 'var(--le-bg)',
              color: 'var(--le-text)',
              boxSizing: 'border-box',
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', color: 'var(--le-text)', fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>
            Down Payment %
          </label>
          <input
            type="number"
            value={data.downPaymentPercent}
            onChange={(e) => handleChange('downPaymentPercent', Number(e.target.value))}
            min="0"
            max="100"
            style={{
              width: '100%',
              padding: '10px 12px',
              border: `1px solid var(--le-border)`,
              borderRadius: '8px',
              fontSize: '14px',
              backgroundColor: 'var(--le-bg)',
              color: 'var(--le-text)',
              boxSizing: 'border-box',
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', color: 'var(--le-text)', fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>
            Monthly Rent
          </label>
          <input
            type="number"
            value={data.monthlyRent}
            onChange={(e) => handleChange('monthlyRent', Number(e.target.value))}
            style={{
              width: '100%',
              padding: '10px 12px',
              border: `1px solid var(--le-border)`,
              borderRadius: '8px',
              fontSize: '14px',
              backgroundColor: 'var(--le-bg)',
              color: 'var(--le-text)',
              boxSizing: 'border-box',
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', color: 'var(--le-text)', fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>
            Monthly Expenses
          </label>
          <input
            type="number"
            value={data.monthlyExpenses}
            onChange={(e) => handleChange('monthlyExpenses', Number(e.target.value))}
            style={{
              width: '100%',
              padding: '10px 12px',
              border: `1px solid var(--le-border)`,
              borderRadius: '8px',
              fontSize: '14px',
              backgroundColor: 'var(--le-bg)',
              color: 'var(--le-text)',
              boxSizing: 'border-box',
            }}
          />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
        <div style={{ backgroundColor: 'var(--le-bg)', padding: '16px', borderRadius: '8px' }}>
          <p style={{ color: 'var(--le-text-secondary)', fontSize: '12px', margin: '0 0 8px 0' }}>
            Down Payment
          </p>
          <p style={{ color: 'var(--le-primary)', fontSize: '20px', fontWeight: '600', margin: 0 }}>
            ${downPaymentAmount.toLocaleString('en-US', { maximumFractionDigits: 0 })}
          </p>
        </div>

        <div style={{ backgroundColor: 'var(--le-bg)', padding: '16px', borderRadius: '8px' }}>
          <p style={{ color: 'var(--le-text-secondary)', fontSize: '12px', margin: '0 0 8px 0' }}>
            Loan Amount
          </p>
          <p style={{ color: 'var(--le-primary)', fontSize: '20px', fontWeight: '600', margin: 0 }}>
            ${loanAmount.toLocaleString('en-US', { maximumFractionDigits: 0 })}
          </p>
        </div>

        <div style={{ backgroundColor: 'var(--le-bg)', padding: '16px', borderRadius: '8px' }}>
          <p style={{ color: 'var(--le-text-secondary)', fontSize: '12px', margin: '0 0 8px 0' }}>
            Annual Cash Flow
          </p>
          <p style={{ color: 'var(--le-primary)', fontSize: '20px', fontWeight: '600', margin: 0 }}>
            ${annualCashFlow.toLocaleString('en-US', { maximumFractionDigits: 0 })}
          </p>
        </div>

        <div style={{ backgroundColor: 'var(--le-bg)', padding: '16px', borderRadius: '8px' }}>
          <p style={{ color: 'var(--le-text-secondary)', fontSize: '12px', margin: '0 0 8px 0' }}>
            Cash-on-Cash Return
          </p>
          <p style={{ color: 'var(--le-primary)', fontSize: '20px', fontWeight: '600', margin: 0 }}>
            {cashOnCashReturn.toFixed(2)}%
          </p>
        </div>

        <div style={{ backgroundColor: 'var(--le-bg)', padding: '16px', borderRadius: '8px' }}>
          <p style={{ color: 'var(--le-text-secondary)', fontSize: '12px', margin: '0 0 8px 0' }}>
            Cap Rate
          </p>
          <p style={{ color: 'var(--le-primary)', fontSize: '20px', fontWeight: '600', margin: 0 }}>
            {capRate.toFixed(2)}%
          </p>
        </div>

        <div style={{ backgroundColor: 'var(--le-bg)', padding: '16px', borderRadius: '8px' }}>
          <p style={{ color: 'var(--le-text-secondary)', fontSize: '12px', margin: '0 0 8px 0' }}>
            Monthly Cash Flow
          </p>
          <p style={{ color: 'var(--le-primary)', fontSize: '20px', fontWeight: '600', margin: 0 }}>
            ${monthlyRoi.toLocaleString('en-US', { maximumFractionDigits: 0 })}
          </p>
        </div>
      </div>
    </div>
  );
};

const InvestorGuidePage: React.FC = () => {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    budget: '',
    strategy: '',
  });

  const strategies: StrategyCardProps[] = [
    {
      title: 'Buy & Hold',
      description: 'Purchase properties and hold for long-term appreciation and rental income.',
      pros: [
        'Stable monthly cash flow',
        'Long-term property appreciation',
        'Tax benefits and leverage',
        'Lower maintenance stress',
      ],
      cons: ['Long time to realize returns', 'Vacancy risk', 'Tenant management required', 'Property maintenance costs'],
      returns: '6–12% annually',
      capital: '$25k–$50k minimum',
    },
    {
      title: 'Fix & Flip',
      description: 'Renovate undervalued properties and sell quickly for profit.',
      pros: ['Quick profit potential', 'High ROI possible', 'Market-driven returns', 'Lower holding costs'],
      cons: ['Requires renovation expertise', 'Market timing risk', 'High debt service', 'Contractor management'],
      returns: '20–50% per project',
      capital: '$50k–$100k+ needed',
    },
    {
      title: 'House Hacking',
      description: 'Live in a multi-unit property while renting out other units.',
      pros: [
        'Reduced personal housing costs',
        'Build equity faster',
        'On-site management possible',
        'Easier financing access',
      ],
      cons: ['Sharing living space', 'Landlord responsibilities', 'Limited property types', 'Tenant conflicts'],
      returns: '8–15% annually',
      capital: '$15k–$40k minimum',
    },
    {
      title: 'BRRRR Method',
      description: 'Buy, Renovate, Refinance, Rent out, Repeat—using equity to fund next purchases.',
      pros: [
        'Recycle capital for growth',
        'Build scalable portfolio',
        'Compound leverage over time',
        'Strong long-term wealth building',
      ],
      cons: [
        'Complex financing required',
        'High initial capital needed',
        'Renovation risk',
        'Refinance qualification strict',
      ],
      returns: '12–25% portfolio growth',
      capital: '$50k–$150k+ per cycle',
    },
    {
      title: 'Short-Term Rentals',
      description: 'Rent properties on Airbnb or VRBO for higher nightly rates than traditional rentals.',
      pros: [
        'Higher per-night income',
        'Flexible vacancy management',
        'Personal use possible',
        'Market rate flexibility',
      ],
      cons: [
        'Higher management burden',
        'Seasonal income volatility',
        'Strict local regulations',
        'Higher operating costs',
      ],
      returns: '10–20% annually',
      capital: '$40k–$80k typical',
    },
    {
      title: 'Commercial Properties',
      description: 'Invest in office, retail, or industrial spaces with longer lease terms.',
      pros: [
        'Stable long-term tenants',
        'Higher cap rates',
        'Triple-net lease options',
        'Professional management',
      ],
      cons: ['Higher capital requirements', 'Economic sensitivity', 'Longer lease negotiations', 'Concentrated risk'],
      returns: '7–12% annually',
      capital: '$100k–$500k+ minimum',
    },
  ];

  const marketMetrics = [
    { label: 'Average Cap Rate', value: '6.2%', trend: '+0.3%' },
    { label: 'Rental Demand', value: 'High', trend: 'Growing' },
    { label: 'Appreciation Rate', value: '3.8% YoY', trend: 'Stable' },
    { label: 'Days on Market', value: '45 days', trend: '-8 days' },
  ];

  const faqItems = [
    {
      question: 'How much capital do I need to start real estate investing?',
      answer:
        'Most investors start with $15k–$50k, which covers down payments and closing costs. Some strategies like fix & flip or commercial require more. Consider house hacking or partnering to get started with less.',
    },
    {
      question: 'What\u2019s the difference between cap rate and cash-on-cash return?',
      answer:
        'Cap rate (annual NOI ÷ property price) shows overall property performance. Cash-on-cash return (annual cash flow ÷ cash invested) shows returns on your actual money down. Both matter.',
    },
    {
      question: 'Can I invest in real estate with bad credit?',
      answer:
        'It\u2019s harder but possible. Consider FHA loans, private lenders, partnerships, or rental properties with strong cash flow. Improve credit first when possible—better rates save thousands.',
    },
    {
      question: 'What are the biggest tax advantages for real estate investors?',
      answer:
        'Depreciation deductions, mortgage interest write-offs, operating expense deductions, 1031 exchanges, and cost segregation. Consult a CPA to optimize your specific situation.',
    },
    {
      question: 'How do I evaluate a rental property\u2019s potential?',
      answer:
        'Analyze cap rate, cash-on-cash return, appreciation potential, tenant demand, location trends, and competition. Use the cap rate as a quick filter, then dive deeper into specific cash flows.',
    },
    {
      question: 'Should I invest in single-family or multi-unit properties?',
      answer:
        'Single-family is easier to manage and finance; multi-unit has better cash flow per unit and scaling potential. Consider your experience, capital, and time availability.',
    },
    {
      question: 'What\u2019s a 1031 exchange and why does it matter?',
      answer:
        'A 1031 exchange lets you sell a property and reinvest proceeds tax-free into another investment property. Powerful tool for scaling without paying capital gains tax.',
    },
    {
      question: 'How do I handle vacancy and tenant problems?',
      answer:
        'Screen tenants thoroughly, set realistic rents for your market, build a 3–6 month expense reserve, maintain properties well, and consider property management for peace of mind.',
    },
  ];

  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);

  const handleFormChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({ name: '', email: '', budget: '', strategy: '' });
    alert('Thank you! We\u2019ll send your investment analysis soon.');
  };

  return (
    <div style={{ backgroundColor: 'var(--le-bg)', color: 'var(--le-text)', minHeight: '100vh' }}>
      {/* Hero Section */}
      <section
        style={{
          backgroundColor: 'var(--le-surface)',
          padding: '80px 20px',
          textAlign: 'center',
          borderBottom: `1px solid var(--le-border)`,
        }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1
            style={{
              fontSize: '48px',
              fontWeight: '700',
              margin: '0 0 16px 0',
              lineHeight: '1.2',
              color: 'var(--le-text)',
            }}
          >
            Real Estate Investment Guide
          </h1>
          <p
            style={{
              fontSize: '18px',
              color: 'var(--le-text-secondary)',
              margin: '0',
              lineHeight: '1.6',
            }}
          >
            Master the strategies, metrics, and tax benefits that turn property ownership into lasting wealth
          </p>
        </div>
      </section>

      {/* Investment Strategies Section */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 20px' }}>
        <h2
          style={{
            fontSize: '32px',
            fontWeight: '600',
            margin: '0 0 40px 0',
            color: 'var(--le-text)',
          }}
        >
          6 Core Investment Strategies
        </h2>

        <div>
          {strategies.map((strategy, idx) => (
            <StrategyCard
              key={idx}
              {...strategy}
              isExpanded={expandedCard === idx}
              onToggle={() => setExpandedCard(expandedCard === idx ? null : idx)}
            />
          ))}
        </div>
      </section>

      {/* ROI Calculator */}
      <section
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '60px 20px',
          borderTop: `1px solid var(--le-border)`,
        }}
      >
        <h2
          style={{
            fontSize: '32px',
            fontWeight: '600',
            margin: '0 0 24px 0',
            color: 'var(--le-text)',
          }}
        >
          Analyze Your Investment Potential
        </h2>
        <ROICalculator />
      </section>

      {/* Market Analysis Section */}
      <section
        style={{
          backgroundColor: 'var(--le-surface)',
          padding: '60px 20px',
          borderTop: `1px solid var(--le-border)`,
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2
            style={{
              fontSize: '32px',
              fontWeight: '600',
              margin: '0 0 40px 0',
              color: 'var(--le-text)',
            }}
          >
            Current Market Metrics
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
            {marketMetrics.map((metric, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: 'var(--le-bg)',
                  padding: '24px',
                  borderRadius: '12px',
                  border: `1px solid var(--le-border)`,
                }}
              >
                <p style={{ color: 'var(--le-text-secondary)', fontSize: '14px', margin: '0 0 8px 0' }}>
                  {metric.label}
                </p>
                <p style={{ fontSize: '28px', fontWeight: '700', margin: '0 0 8px 0', color: 'var(--le-primary)' }}>
                  {metric.value}
                </p>
                <p style={{ color: 'var(--le-accent)', fontSize: '13px', margin: 0 }}>
                  {metric.trend}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tax Benefits Section */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 20px' }}>
        <h2
          style={{
            fontSize: '32px',
            fontWeight: '600',
            margin: '0 0 40px 0',
            color: 'var(--le-text)',
          }}
        >
          Tax Advantages for Investors
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          <div style={{ backgroundColor: 'var(--le-surface)', padding: '24px', borderRadius: '12px' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                backgroundColor: 'var(--le-primary)',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px',
              }}
            >
              <svg viewBox="0 0 24 24" width="24" height="24" fill="white">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
              </svg>
            </div>
            <h3 style={{ color: 'var(--le-text)', fontSize: '18px', fontWeight: '600', margin: '0 0 12px 0' }}>
              Depreciation Deductions
            </h3>
            <p style={{ color: 'var(--le-text-secondary)', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>
              Deduct a portion of property value annually, reducing taxable income even if property appreciates
            </p>
          </div>

          <div style={{ backgroundColor: 'var(--le-surface)', padding: '24px', borderRadius: '12px' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                backgroundColor: 'var(--le-primary)',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px',
              }}
            >
              <svg viewBox="0 0 24 24" width="24" height="24" fill="white">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-5.04-6.71l-2.75 3.54-2.16-2.66c-.44-.53-1.25-.53-1.69 0-.44.54-.44 1.39 0 1.93l3 3.67c.44.53 1.25.53 1.69 0l4-5.12c.44-.54.44-1.39 0-1.93-.44-.53-1.25-.53-1.69 0z" />
              </svg>
            </div>
            <h3 style={{ color: 'var(--le-text)', fontSize: '18px', fontWeight: '600', margin: '0 0 12px 0' }}>
              Mortgage Interest Deduction
            </h3>
            <p style={{ color: 'var(--le-text-secondary)', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>
              Write off interest paid on investment property loans to reduce taxable income
            </p>
          </div>

          <div style={{ backgroundColor: 'var(--le-surface)', padding: '24px', borderRadius: '12px' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                backgroundColor: 'var(--le-primary)',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px',
              }}
            >
              <svg viewBox="0 0 24 24" width="24" height="24" fill="white">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
            </div>
            <h3 style={{ color: 'var(--le-text)', fontSize: '18px', fontWeight: '600', margin: '0 0 12px 0' }}>
              Operating Expense Deductions
            </h3>
            <p style={{ color: 'var(--le-text-secondary)', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>
              Deduct property taxes, insurance, utilities, maintenance, and management fees from income
            </p>
          </div>

          <div style={{ backgroundColor: 'var(--le-surface)', padding: '24px', borderRadius: '12px' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                backgroundColor: 'var(--le-primary)',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px',
              }}
            >
              <svg viewBox="0 0 24 24" width="24" height="24" fill="white">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
              </svg>
            </div>
            <h3 style={{ color: 'var(--le-text)', fontSize: '18px', fontWeight: '600', margin: '0 0 12px 0' }}>
              1031 Exchange
            </h3>
            <p style={{ color: 'var(--le-text-secondary)', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>
              Swap investment properties tax-free to defer capital gains and scale your portfolio
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section
        style={{
          backgroundColor: 'var(--le-surface)',
          padding: '60px 20px',
          borderTop: `1px solid var(--le-border)`,
        }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2
            style={{
              fontSize: '32px',
              fontWeight: '600',
              margin: '0 0 40px 0',
              color: 'var(--le-text)',
            }}
          >
            Investor FAQ
          </h2>

          <div>
            {faqItems.map((item, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: 'var(--le-bg)',
                  border: `1px solid var(--le-border)`,
                  borderRadius: '12px',
                  marginBottom: '16px',
                  overflow: 'hidden',
                }}
              >
                <button
                  onClick={() => setActiveFaqIndex(activeFaqIndex === idx ? null : idx)}
                  style={{
                    width: '100%',
                    padding: '20px',
                    border: 'none',
                    backgroundColor: 'transparent',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '16px',
                    fontWeight: '500',
                    color: 'var(--le-text)',
                  }}
                >
                  {item.question}
                  <span
                    style={{
                      color: 'var(--le-primary)',
                      fontSize: '18px',
                      transition: 'transform 0.3s ease',
                      transform: activeFaqIndex === idx ? 'rotate(180deg)' : 'rotate(0deg)',
                      marginLeft: '16px',
                      flexShrink: 0,
                    }}
                  >
                    ▼
                  </span>
                </button>

                {activeFaqIndex === idx && (
                  <div
                    style={{
                      padding: '0 20px 20px 20px',
                      borderTop: `1px solid var(--le-border)`,
                      color: 'var(--le-text-secondary)',
                      fontSize: '15px',
                      lineHeight: '1.6',
                    }}
                  >
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Capture Form Section */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px', alignItems: 'start' }}>
          <div>
            <h2
              style={{
                fontSize: '32px',
                fontWeight: '600',
                margin: '0 0 16px 0',
                color: 'var(--le-text)',
              }}
            >
              Get Your Investment Analysis
            </h2>
            <p
              style={{
                color: 'var(--le-text-secondary)',
                fontSize: '16px',
                lineHeight: '1.6',
                margin: 0,
              }}
            >
              Share your investment interests and budget range. We\u2019ll send a personalized analysis of strategies that match your goals, complete with market data and action steps.
            </p>
          </div>

          <form
            onSubmit={handleFormSubmit}
            style={{
              backgroundColor: 'var(--le-surface)',
              padding: '32px',
              borderRadius: '12px',
              border: `1px solid var(--le-border)`,
            }}
          >
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', color: 'var(--le-text)', fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>
                Full Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleFormChange('name', e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  border: `1px solid var(--le-border)`,
                  borderRadius: '8px',
                  fontSize: '14px',
                  backgroundColor: 'var(--le-bg)',
                  color: 'var(--le-text)',
                  boxSizing: 'border-box',
                }}
                placeholder="Jane Investor"
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', color: 'var(--le-text)', fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleFormChange('email', e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  border: `1px solid var(--le-border)`,
                  borderRadius: '8px',
                  fontSize: '14px',
                  backgroundColor: 'var(--le-bg)',
                  color: 'var(--le-text)',
                  boxSizing: 'border-box',
                }}
                placeholder="jane@example.com"
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', color: 'var(--le-text)', fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>
                Investment Budget Range
              </label>
              <select
                value={formData.budget}
                onChange={(e) => handleFormChange('budget', e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  border: `1px solid var(--le-border)`,
                  borderRadius: '8px',
                  fontSize: '14px',
                  backgroundColor: 'var(--le-bg)',
                  color: 'var(--le-text)',
                  boxSizing: 'border-box',
                }}
              >
                <option value="">Select a range</option>
                <option value="under-50k">Under $50k</option>
                <option value="50k-100k">$50k–$100k</option>
                <option value="100k-250k">$100k–$250k</option>
                <option value="250k-500k">$250k–$500k</option>
                <option value="500k-plus">$500k+</option>
              </select>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', color: 'var(--le-text)', fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>
                Strategy Interest
              </label>
              <select
                value={formData.strategy}
                onChange={(e) => handleFormChange('strategy', e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  border: `1px solid var(--le-border)`,
                  borderRadius: '8px',
                  fontSize: '14px',
                  backgroundColor: 'var(--le-bg)',
                  color: 'var(--le-text)',
                  boxSizing: 'border-box',
                }}
              >
                <option value="">No preference</option>
                <option value="buy-hold">Buy & Hold</option>
                <option value="fix-flip">Fix & Flip</option>
                <option value="house-hacking">House Hacking</option>
                <option value="brrrr">BRRRR Method</option>
                <option value="short-term-rentals">Short-Term Rentals</option>
                <option value="commercial">Commercial</option>
              </select>
            </div>

            <button
              type="submit"
              style={{
                width: '100%',
                padding: '14px 20px',
                backgroundColor: 'var(--le-primary)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease',
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLButtonElement).style.backgroundColor = 'var(--le-primary-hover)';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLButtonElement).style.backgroundColor = 'var(--le-primary)';
              }}
            >
              Get Your Analysis
            </button>

            <p style={{ fontSize: '12px', color: 'var(--le-text-secondary)', margin: '16px 0 0 0' }}>
              We\u2019ll send your personalized investment report within 24 hours. No spam, just insights.
            </p>
          </form>
        </div>
      </section>
    </div>
  );
};

export default InvestorGuidePage;
