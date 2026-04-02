'use client';

import React, { useState } from 'react';

export default function RentVsBuyPage() {
  const [monthlyRent, setMonthlyRent] = useState(1500);
  const [homePrice, setHomePrice] = useState(350000);
  const [downPayment, setDownPayment] = useState(70000);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanYears, setLoanYears] = useState(30);
  const [activeTab, setActiveTab] = useState('calculator');
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadFormData, setLeadFormData] = useState({ name: '', email: '', phone: '', zipCode: '' });

  // Calculator logic
  const loanAmount = homePrice - downPayment;
  const monthlyRate = interestRate / 100 / 12;
  const numberOfPayments = loanYears * 12;
  const monthlyMortgage =
    monthlyRate === 0
      ? loanAmount / numberOfPayments
      : (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

  const propertyTax = (homePrice * 0.012) / 12;
  const homeInsurance = 120;
  const hoa = 200;
  const maintenance = (homePrice * 0.01) / 12;
  const totalMonthlyCost = monthlyMortgage + propertyTax + homeInsurance + hoa + maintenance;

  const rentIncrease = monthlyRent * 1.03;
  const yearlyRentCost = monthlyRent * 12;
  const yearlyBuyCost = totalMonthlyCost * 12;

  let breakEvenMonth = 0;
  let rentCumulative = 0;
  let buyCumulative = downPayment;
  let buyEquity = downPayment;

  for (let month = 1; month <= 360; month++) {
    const currentRent = monthlyRent * Math.pow(1.03, (month - 1) / 12);
    rentCumulative += currentRent;

    const principalPayment = monthlyMortgage - loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments - month + 1) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    buyEquity += principalPayment;
    buyCumulative += totalMonthlyCost;

    if (buyCumulative < rentCumulative && breakEvenMonth === 0) {
      breakEvenMonth = month;
    }
  }

  const years5RentCost = monthlyRent * 12 * 5 * 1.03;
  const years5BuyCost = totalMonthlyCost * 12 * 5;
  const years5BuyEquity = downPayment + (monthlyMortgage * 60 * 0.3);

  const years10RentCost = monthlyRent * 12 * 10 * 1.03;
  const years10BuyCost = totalMonthlyCost * 12 * 10;
  const years10BuyEquity = downPayment + (monthlyMortgage * 120 * 0.5);

  const quizQuestions = [
    {
      id: 1,
      question: "How long do you plan to stay in your current location?",
      answers: [
        { value: 'under2', label: 'Less than 2 years' },
        { value: '2to5', label: '2-5 years' },
        { value: '5to10', label: '5-10 years' },
        { value: 'over10', label: 'More than 10 years' }
      ]
    },
    {
      id: 2,
      question: "What\u2019s your current credit score?",
      answers: [
        { value: 'poor', label: 'Below 620' },
        { value: 'fair', label: '620-699' },
        { value: 'good', label: '700-749' },
        { value: 'excellent', label: '750+' }
      ]
    },
    {
      id: 3,
      question: "How much have you saved for a down payment?",
      answers: [
        { value: 'none', label: 'Nothing yet' },
        { value: 'small', label: '5-10% of home price' },
        { value: 'medium', label: '10-20% of home price' },
        { value: 'large', label: '20%+ of home price' }
      ]
    },
    {
      id: 4,
      question: "Are you financially prepared for unexpected home repairs?",
      answers: [
        { value: 'no', label: 'Not really' },
        { value: 'somewhat', label: 'Somewhat' },
        { value: 'yes', label: 'Yes, I have an emergency fund' },
        { value: 'very', label: 'Yes, and it\u2019s substantial' }
      ]
    },
    {
      id: 5,
      question: "How stable is your income?",
      answers: [
        { value: 'unstable', label: 'Variable or unstable' },
        { value: 'somewhat', label: 'Somewhat stable' },
        { value: 'stable', label: 'Stable' },
        { value: 'very', label: 'Very stable and growing' }
      ]
    },
    {
      id: 6,
      question: "Do you have other significant debts?",
      answers: [
        { value: 'large', label: 'Yes, very significant' },
        { value: 'moderate', label: 'Moderate amount' },
        { value: 'small', label: 'Small amount' },
        { value: 'none', label: 'None' }
      ]
    },
    {
      id: 7,
      question: "How important is flexibility in your living situation?",
      answers: [
        { value: 'very', label: 'Very important' },
        { value: 'somewhat', label: 'Somewhat important' },
        { value: 'not', label: 'Not very important' },
        { value: 'minimal', label: 'Minimal importance' }
      ]
    },
    {
      id: 8,
      question: "What\u2019s your main motivation for potentially buying?",
      answers: [
        { value: 'stability', label: 'Stability and roots' },
        { value: 'investment', label: 'Investment and wealth building' },
        { value: 'control', label: 'Control over my space' },
        { value: 'family', label: 'Family or lifestyle change' }
      ]
    }
  ];

  const calculateReadiness = () => {
    let score = 0;
    const weights = {
      over10: 4, '5to10': 3, '2to5': 1, under2: 0,
      excellent: 4, good: 3, fair: 1, poor: 0,
      large: 4, medium: 3, small: 1, none: 0,
      very: 4, yes: 3, somewhat: 2, no: 0,
      very: 4, stable: 3, somewhat: 2, unstable: 0,
      none: 4, small: 3, moderate: 1, large: 0,
      minimal: 4, not: 3, somewhat: 2, very: 0,
      investment: 4, family: 3, stability: 2, control: 1
    };

    Object.entries(quizAnswers).forEach(([key, value]) => {
      score += weights[value] || 0;
    });

    return Math.round((score / 32) * 100);
  };

  const readinessScore = Object.keys(quizAnswers).length === 8 ? calculateReadiness() : null;

  const comparisonFactors = [
    {
      factor: 'Upfront Costs',
      rent: { pros: ['No down payment', 'Minimal closing costs'], cons: ['Security deposit', 'First/last month\u2019s rent'] },
      buy: { pros: ['Build equity from day one', 'Tax deductions possible'], cons: ['Down payment required (3-20%)', 'Closing costs (2-5%)'] }
    },
    {
      factor: 'Monthly Costs',
      rent: { pros: ['Predictable payment', 'Landlord covers major repairs'], cons: ['No equity building', 'Rent increases yearly'] },
      buy: { pros: ['Equity building', 'Interest deduction'], cons: ['Mortgage + taxes + insurance + HOA', 'Maintenance costs'] }
    },
    {
      factor: 'Flexibility',
      rent: { pros: ['Easy to relocate', 'Short-term commitment', 'No selling hassle'], cons: ['Lease restrictions', 'Landlord limitations'] },
      buy: { pros: ['Design freedom', 'Long-term stability'], cons: ['Difficult to sell quickly', 'Market risk'] }
    },
    {
      factor: 'Wealth Building',
      rent: { pros: ['Cash available for investing'], cons: ['Zero equity accumulation', 'No appreciation upside'] },
      buy: { pros: ['Home appreciation', 'Forced savings through mortgage'], cons: ['Illiquid asset', 'Market downside risk'] }
    },
    {
      factor: 'Tax Benefits',
      rent: { pros: ['No tax complications'], cons: ['No deductions available'] },
      buy: { pros: ['Mortgage interest deduction', 'Property tax deduction'], cons: ['Requires itemizing', 'Limited benefits'] }
    },
    {
      factor: 'Maintenance & Repairs',
      rent: { pros: ['Landlord handles repairs', 'No maintenance costs'], cons: ['Dependent on landlord', 'May wait for fixes'] },
      buy: { pros: ['Complete control', 'Can do upgrades'], cons: ['All costs on you', 'Unexpected repairs expensive'] }
    },
    {
      factor: 'Property Control',
      rent: { pros: ['No property taxes', 'No insurance responsibility'], cons: ['Can\u2019t paint or renovate', 'Limited personalization'] },
      buy: { pros: ['Complete ownership', 'Full customization'], cons: ['Property taxes & insurance', 'HOA restrictions possible'] }
    },
    {
      factor: 'Insurance & Protection',
      rent: { pros: ['Landlord carries insurance'], cons: ['Your belongings at risk', 'Liability concerns'] },
      buy: { pros: ['Build home equity', 'Insurance protects investment'], cons: ['Homeowners insurance required', 'Higher premiums'] }
    },
    {
      factor: 'Job Flexibility',
      rent: { pros: ['Easy to relocate for jobs', 'Career mobility'], cons: ['Breaking lease is costly'] },
      buy: { pros: ['Stability while building career'], cons: ['Hard to relocate for opportunities'] }
    },
    {
      factor: 'Market Risk',
      rent: { pros: ['No exposure to housing market', 'Predictable costs'], cons: ['Rent inflation impact'] },
      buy: { pros: ['Benefit from appreciation', 'Inflation hedge'], cons: ['Market downturn risk', 'Negative equity possible'] }
    },
    {
      factor: 'Startup Time',
      rent: { pros: ['Move in within weeks', 'Minimal paperwork'], cons: ['Limited availability'] },
      buy: { pros: ['Long-term planning', 'Get exactly what you want'], cons: ['60-90 days to closing', 'Extensive paperwork'] }
    },
    {
      factor: 'Lifestyle Freedom',
      rent: { pros: ['Try different neighborhoods', 'Experiment before buying'], cons: ['Pets restricted', 'Guest limitations'] },
      buy: { pros: ['Host events freely', 'Pets allowed', 'Customize everything'], cons: ['Bound to one location'] }
    },
    {
      factor: 'Credit Impact',
      rent: { pros: ['No impact on credit score', 'No debt ratio concerns'], cons: ['No credit building'] },
      buy: { pros: ['Mortgage builds credit', 'Credit score improvement'], cons: ['Hard inquiries initially', 'Debt increases'] }
    },
    {
      factor: 'Long-term Cost',
      rent: { pros: ['No maintenance surprises'], cons: ['Costs compound over 10+ years', 'Zero asset at end'] },
      buy: { pros: ['Paid off eventually', 'Significant asset ownership'], cons: ['Maintenance costs accumulate'] }
    },
    {
      factor: 'Retirement Planning',
      rent: { pros: ['Lower fixed expenses possible'], cons: ['No housing equity for retirement'] },
      buy: { pros: ['Mortgage-free in retirement', 'Downsizing option', 'Legacy for heirs'], cons: ['Property taxes continue'] }
    }
  ];

  return (
    <div style={{ backgroundColor: 'var(--le-bg)', color: 'var(--le-text)', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif', lineHeight: '1.6' }}>
      {/* JSON-LD Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          'name': 'Rent vs Buy Calculator and Guide',
          'description': 'Compare renting vs buying a home with our interactive calculator, financial analysis, and personalized readiness quiz.',
          'url': 'https://realtyclientengine.app/rent-vs-buy',
          'publisher': {
            '@type': 'Organization',
            'name': 'LeadEngine',
            'logo': 'https://realtyclientengine.app/logo.png'
          }
        })}
      </script>

      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, var(--le-primary) 0%, var(--le-accent) 100%)',
        color: 'white',
        padding: '80px 20px',
        textAlign: 'center',
        borderBottom: '1px solid var(--le-border)'
      }}>
        <h1 style={{ fontSize: '3.5rem', fontWeight: 'bold', marginBottom: '20px', lineHeight: '1.2' }}>
          Should You Rent or Buy?
        </h1>
        <p style={{ fontSize: '1.3rem', marginBottom: '30px', opacity: 0.95, maxWidth: '600px', margin: '0 auto 30px' }}>
          Discover the real financial impact of renting vs buying with our comprehensive calculator, comparison tool, and personalized analysis.
        </p>
        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={() => setActiveTab('calculator')}
            style={{
              padding: '14px 32px',
              background: 'white',
              color: 'var(--le-primary)',
              border: 'none',
              borderRadius: '6px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
          >
            Use Calculator
          </button>
          <button
            onClick={() => setShowQuiz(true)}
            style={{
              padding: '14px 32px',
              background: 'rgba(255,255,255,0.2)',
              color: 'white',
              border: '2px solid white',
              borderRadius: '6px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.3)'}
            onMouseLeave={(e) => e.target.style.background = 'rgba(255,255,255,0.2)'}
          >
            Take Readiness Quiz
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div style={{
        display: 'flex',
        gap: '10px',
        padding: '20px',
        backgroundColor: 'var(--le-bg-card)',
        borderBottom: '1px solid var(--le-border)',
        overflowX: 'auto',
        justifyContent: 'center'
      }}>
        {[
          { id: 'calculator', label: 'Interactive Calculator' },
          { id: 'comparison', label: 'Detailed Comparison' },
          { id: 'market', label: 'Market Conditions' },
          { id: 'situations', label: 'Life Situations' },
          { id: 'faq', label: 'FAQ' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '10px 20px',
              background: activeTab === tab.id ? 'var(--le-primary)' : 'transparent',
              color: activeTab === tab.id ? 'white' : 'var(--le-text)',
              border: '1px solid var(--le-border)',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '0.95rem',
              fontWeight: activeTab === tab.id ? '600' : '500',
              transition: 'all 0.3s ease',
              whiteSpace: 'nowrap'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
        {/* CALCULATOR TAB */}
        {activeTab === 'calculator' && (
          <div>
            {/* Calculator Inputs */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '20px',
              marginBottom: '40px'
            }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: 'var(--le-text)' }}>
                  Monthly Rent: ${monthlyRent.toLocaleString()}
                </label>
                <input
                  type="range"
                  min="500"
                  max="5000"
                  value={monthlyRent}
                  onChange={(e) => setMonthlyRent(parseInt(e.target.value))}
                  style={{ width: '100%', cursor: 'pointer' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: 'var(--le-text)' }}>
                  Home Price: ${homePrice.toLocaleString()}
                </label>
                <input
                  type="range"
                  min="100000"
                  max="1000000"
                  step="10000"
                  value={homePrice}
                  onChange={(e) => setHomePrice(parseInt(e.target.value))}
                  style={{ width: '100%', cursor: 'pointer' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: 'var(--le-text)' }}>
                  Down Payment: ${downPayment.toLocaleString()} ({((downPayment / homePrice) * 100).toFixed(1)}%)
                </label>
                <input
                  type="range"
                  min="0"
                  max={homePrice * 0.5}
                  step="5000"
                  value={downPayment}
                  onChange={(e) => setDownPayment(parseInt(e.target.value))}
                  style={{ width: '100%', cursor: 'pointer' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: 'var(--le-text)' }}>
                  Interest Rate: {interestRate.toFixed(2)}%
                </label>
                <input
                  type="range"
                  min="2"
                  max="10"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(parseFloat(e.target.value))}
                  style={{ width: '100%', cursor: 'pointer' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: 'var(--le-text)' }}>
                  Loan Term: {loanYears} years
                </label>
                <input
                  type="range"
                  min="10"
                  max="30"
                  value={loanYears}
                  onChange={(e) => setLoanYears(parseInt(e.target.value))}
                  style={{ width: '100%', cursor: 'pointer' }}
                />
              </div>
            </div>

            {/* Calculator Results */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '20px',
              marginBottom: '40px'
            }}>
              <div style={{
                background: 'var(--le-bg-card)',
                border: '1px solid var(--le-border)',
                borderRadius: '8px',
                padding: '20px'
              }}>
                <div style={{ fontSize: '0.9rem', color: 'var(--le-text-secondary)', marginBottom: '8px' }}>Monthly Mortgage Payment</div>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--le-primary)' }}>
                  ${monthlyMortgage.toFixed(0)}
                </div>
              </div>
              <div style={{
                background: 'var(--le-bg-card)',
                border: '1px solid var(--le-border)',
                borderRadius: '8px',
                padding: '20px'
              }}>
                <div style={{ fontSize: '0.9rem', color: 'var(--le-text-secondary)', marginBottom: '8px' }}>Total Monthly Cost (Buy)</div>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--le-warning)' }}>
                  ${totalMonthlyCost.toFixed(0)}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--le-text-secondary)', marginTop: '8px' }}>Includes mortgage, taxes, insurance, HOA, maintenance</div>
              </div>
              <div style={{
                background: 'var(--le-bg-card)',
                border: '1px solid var(--le-border)',
                borderRadius: '8px',
                padding: '20px'
              }}>
                <div style={{ fontSize: '0.9rem', color: 'var(--le-text-secondary)', marginBottom: '8px' }}>Monthly Rent</div>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--le-primary)' }}>
                  ${monthlyRent.toFixed(0)}
                </div>
              </div>
              <div style={{
                background: 'var(--le-bg-card)',
                border: '2px solid var(--le-success)',
                borderRadius: '8px',
                padding: '20px'
              }}>
                <div style={{ fontSize: '0.9rem', color: 'var(--le-text-secondary)', marginBottom: '8px' }}>Breakeven Point</div>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--le-success)' }}>
                  {Math.round(breakEvenMonth / 12)} years
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--le-text-secondary)', marginTop: '8px' }}>({breakEvenMonth} months)</div>
              </div>
            </div>

            {/* 5-Year vs 10-Year Comparison */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '40px' }}>
              <div style={{
                background: 'var(--le-bg-card)',
                border: '1px solid var(--le-border)',
                borderRadius: '8px',
                padding: '25px'
              }}>
                <h3 style={{ marginBottom: '20px', fontSize: '1.3rem', fontWeight: 'bold' }}>5-Year Outlook</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  <div>
                    <div style={{ color: 'var(--le-text-secondary)', marginBottom: '5px' }}>Total Rent Cost</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--le-primary)' }}>
                      ${years5RentCost.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                    </div>
                  </div>
                  <div>
                    <div style={{ color: 'var(--le-text-secondary)', marginBottom: '5px' }}>Total Buy Cost</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--le-warning)' }}>
                      ${years5BuyCost.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                    </div>
                  </div>
                  <div>
                    <div style={{ color: 'var(--le-text-secondary)', marginBottom: '5px' }}>Home Equity Built</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--le-success)' }}>
                      ${years5BuyEquity.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                    </div>
                  </div>
                  <div style={{
                    background: 'var(--le-bg)',
                    padding: '10px',
                    borderRadius: '4px',
                    marginTop: '10px'
                  }}>
                    {years5BuyCost + years5BuyEquity < years5RentCost ? (
                      <span style={{ color: 'var(--le-success)' }}>✓ Buying is ahead by ${(years5RentCost - (years5BuyCost + years5BuyEquity)).toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
                    ) : (
                      <span style={{ color: 'var(--le-primary)' }}>Renting is currently ahead by ${((years5BuyCost + years5BuyEquity) - years5RentCost).toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
                    )}
                  </div>
                </div>
              </div>

              <div style={{
                background: 'var(--le-bg-card)',
                border: '1px solid var(--le-border)',
                borderRadius: '8px',
                padding: '25px'
              }}>
                <h3 style={{ marginBottom: '20px', fontSize: '1.3rem', fontWeight: 'bold' }}>10-Year Outlook</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  <div>
                    <div style={{ color: 'var(--le-text-secondary)', marginBottom: '5px' }}>Total Rent Cost</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--le-primary)' }}>
                      ${years10RentCost.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                    </div>
                  </div>
                  <div>
                    <div style={{ color: 'var(--le-text-secondary)', marginBottom: '5px' }}>Total Buy Cost</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--le-warning)' }}>
                      ${years10BuyCost.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                    </div>
                  </div>
                  <div>
                    <div style={{ color: 'var(--le-text-secondary)', marginBottom: '5px' }}>Home Equity Built</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--le-success)' }}>
                      ${years10BuyEquity.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                    </div>
                  </div>
                  <div style={{
                    background: 'var(--le-bg)',
                    padding: '10px',
                    borderRadius: '4px',
                    marginTop: '10px'
                  }}>
                    {years10BuyCost + years10BuyEquity < years10RentCost ? (
                      <span style={{ color: 'var(--le-success)' }}>✓ Buying is significantly ahead by ${(years10RentCost - (years10BuyCost + years10BuyEquity)).toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
                    ) : (
                      <span style={{ color: 'var(--le-primary)' }}>Renting is ahead by ${((years10BuyCost + years10BuyEquity) - years10RentCost).toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Cost Breakdown */}
            <div style={{
              background: 'var(--le-bg-card)',
              border: '1px solid var(--le-border)',
              borderRadius: '8px',
              padding: '25px',
              marginBottom: '40px'
            }}>
              <h3 style={{ marginBottom: '20px', fontSize: '1.3rem', fontWeight: 'bold' }}>Monthly Cost Breakdown (Buying)</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px' }}>
                <div>
                  <div style={{ color: 'var(--le-text-secondary)', marginBottom: '5px' }}>Mortgage Payment</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>${monthlyMortgage.toFixed(0)}</div>
                </div>
                <div>
                  <div style={{ color: 'var(--le-text-secondary)', marginBottom: '5px' }}>Property Tax</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>${propertyTax.toFixed(0)}</div>
                </div>
                <div>
                  <div style={{ color: 'var(--le-text-secondary)', marginBottom: '5px' }}>Home Insurance</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>${homeInsurance.toFixed(0)}</div>
                </div>
                <div>
                  <div style={{ color: 'var(--le-text-secondary)', marginBottom: '5px' }}>HOA Fees</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>${hoa.toFixed(0)}</div>
                </div>
                <div>
                  <div style={{ color: 'var(--le-text-secondary)', marginBottom: '5px' }}>Maintenance Reserve</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>${maintenance.toFixed(0)}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* COMPARISON TAB */}
        {activeTab === 'comparison' && (
          <div>
            <h2 style={{ marginBottom: '30px', fontSize: '2rem', fontWeight: 'bold' }}>Detailed Rent vs Buy Comparison</h2>
            <div style={{ display: 'grid', gap: '20px' }}>
              {comparisonFactors.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    background: 'var(--le-bg-card)',
                    border: '1px solid var(--le-border)',
                    borderRadius: '8px',
                    padding: '25px',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <h3 style={{ marginBottom: '20px', fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--le-primary)' }}>
                    {item.factor}
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                    <div>
                      <h4 style={{ marginBottom: '12px', fontWeight: '600', color: 'var(--le-success)' }}>Renting</h4>
                      <div style={{ marginBottom: '15px' }}>
                        <div style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--le-text)', marginBottom: '8px' }}>Pros:</div>
                        <ul style={{ margin: '0', paddingLeft: '20px', listStyle: 'none' }}>
                          {item.rent.pros.map((pro, pIdx) => (
                            <li key={pIdx} style={{ marginBottom: '6px', color: 'var(--le-text)', fontSize: '0.95rem' }}>
                              ✓ {pro}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <div style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--le-text)', marginBottom: '8px' }}>Cons:</div>
                        <ul style={{ margin: '0', paddingLeft: '20px', listStyle: 'none' }}>
                          {item.rent.cons.map((con, cIdx) => (
                            <li key={cIdx} style={{ marginBottom: '6px', color: 'var(--le-text)', fontSize: '0.95rem' }}>
                              ✗ {con}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div>
                      <h4 style={{ marginBottom: '12px', fontWeight: '600', color: 'var(--le-primary)' }}>Buying</h4>
                      <div style={{ marginBottom: '15px' }}>
                        <div style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--le-text)', marginBottom: '8px' }}>Pros:</div>
                        <ul style={{ margin: '0', paddingLeft: '20px', listStyle: 'none' }}>
                          {item.buy.pros.map((pro, pIdx) => (
                            <li key={pIdx} style={{ marginBottom: '6px', color: 'var(--le-text)', fontSize: '0.95rem' }}>
                              ✓ {pro}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <div style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--le-text)', marginBottom: '8px' }}>Cons:</div>
                        <ul style={{ margin: '0', paddingLeft: '20px', listStyle: 'none' }}>
                          {item.buy.cons.map((con, cIdx) => (
                            <li key={cIdx} style={{ marginBottom: '6px', color: 'var(--le-text)', fontSize: '0.95rem' }}>
                              ✗ {con}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MARKET CONDITIONS TAB */}
        {activeTab === 'market' && (
          <div>
            <h2 style={{ marginBottom: '30px', fontSize: '2rem', fontWeight: 'bold' }}>Current Market Conditions</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '40px' }}>
              <div style={{
                background: 'linear-gradient(135deg, var(--le-primary) 0%, var(--le-primary-hover) 100%)',
                color: 'white',
                borderRadius: '8px',
                padding: '25px'
              }}>
                <div style={{ fontSize: '0.9rem', opacity: 0.9, marginBottom: '10px' }}>Interest Rates</div>
                <div style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '10px' }}>6.5%</div>
                <div style={{ fontSize: '0.9rem', opacity: 0.85 }}>Compared to historical 3.5% average. Higher rates mean larger monthly payments.</div>
              </div>
              <div style={{
                background: 'linear-gradient(135deg, var(--le-warning) 0%, var(--le-accent) 100%)',
                color: 'white',
                borderRadius: '8px',
                padding: '25px'
              }}>
                <div style={{ fontSize: '0.9rem', opacity: 0.9, marginBottom: '10px' }}>Home Appreciation</div>
                <div style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '10px' }}>+3.2%</div>
                <div style={{ fontSize: '0.9rem', opacity: 0.85 }}>Year-over-year appreciation. Buying protects against inflation.</div>
              </div>
              <div style={{
                background: 'linear-gradient(135deg, var(--le-accent) 0%, var(--le-primary) 100%)',
                color: 'white',
                borderRadius: '8px',
                padding: '25px'
              }}>
                <div style={{ fontSize: '0.9rem', opacity: 0.9, marginBottom: '10px' }}>Rent Growth</div>
                <div style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '10px' }}>+4.1%</div>
                <div style={{ fontSize: '0.9rem', opacity: 0.85 }}>Annual rent increases outpace home appreciation in many markets.</div>
              </div>
            </div>

            <div style={{
              background: 'var(--le-bg-card)',
              border: '1px solid var(--le-border)',
              borderRadius: '8px',
              padding: '30px',
              marginBottom: '40px'
            }}>
              <h3 style={{ marginBottom: '20px', fontSize: '1.3rem', fontWeight: 'bold' }}>Factors Favoring Buying Right Now</h3>
              <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px', margin: '0', padding: '0', listStyle: 'none' }}>
                <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--le-success)', fontWeight: 'bold', fontSize: '1.2rem', marginTop: '2px' }}>✓</span>
                  <div>
                    <div style={{ fontWeight: '600', marginBottom: '4px' }}>Build Equity</div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--le-text-secondary)' }}>Every mortgage payment builds ownership, unlike rent.</div>
                  </div>
                </li>
                <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--le-success)', fontWeight: 'bold', fontSize: '1.2rem', marginTop: '2px' }}>✓</span>
                  <div>
                    <div style={{ fontWeight: '600', marginBottom: '4px' }}>Predictable Payments</div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--le-text-secondary)' }}>Fixed-rate mortgage locks in costs for 30 years.</div>
                  </div>
                </li>
                <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--le-success)', fontWeight: 'bold', fontSize: '1.2rem', marginTop: '2px' }}>✓</span>
                  <div>
                    <div style={{ fontWeight: '600', marginBottom: '4px' }}>Tax Deductions</div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--le-text-secondary)' }}>Mortgage interest and property taxes may be deductible.</div>
                  </div>
                </li>
                <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--le-success)', fontWeight: 'bold', fontSize: '1.2rem', marginTop: '2px' }}>✓</span>
                  <div>
                    <div style={{ fontWeight: '600', marginBottom: '4px' }}>Protection from Inflation</div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--le-text-secondary)' }}>Fixed mortgage payments become cheaper relative to income over time.</div>
                  </div>
                </li>
              </ul>
            </div>

            <div style={{
              background: 'var(--le-bg-card)',
              border: '1px solid var(--le-border)',
              borderRadius: '8px',
              padding: '30px'
            }}>
              <h3 style={{ marginBottom: '20px', fontSize: '1.3rem', fontWeight: 'bold' }}>Factors Favoring Renting Right Now</h3>
              <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px', margin: '0', padding: '0', listStyle: 'none' }}>
                <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--le-primary)', fontWeight: 'bold', fontSize: '1.2rem', marginTop: '2px' }}>★</span>
                  <div>
                    <div style={{ fontWeight: '600', marginBottom: '4px' }}>Lower Upfront Costs</div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--le-text-secondary)' }}>No down payment or closing costs. Start immediately.</div>
                  </div>
                </li>
                <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--le-primary)', fontWeight: 'bold', fontSize: '1.2rem', marginTop: '2px' }}>★</span>
                  <div>
                    <div style={{ fontWeight: '600', marginBottom: '4px' }}>Flexibility</div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--le-text-secondary)' }}>Easy to relocate for career, family, or lifestyle changes.</div>
                  </div>
                </li>
                <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--le-primary)', fontWeight: 'bold', fontSize: '1.2rem', marginTop: '2px' }}>★</span>
                  <div>
                    <div style={{ fontWeight: '600', marginBottom: '4px' }}>No Maintenance Risk</div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--le-text-secondary)' }}>Landlord handles all repairs and maintenance costs.</div>
                  </div>
                </li>
                <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--le-primary)', fontWeight: 'bold', fontSize: '1.2rem', marginTop: '2px' }}>★</span>
                  <div>
                    <div style={{ fontWeight: '600', marginBottom: '4px' }}>Higher Interest Rate Environment</div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--le-text-secondary)' }}>Rent may be more affordable than buying right now.</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* LIFE SITUATIONS TAB */}
        {activeTab === 'situations' && (
          <div>
            <h2 style={{ marginBottom: '30px', fontSize: '2rem', fontWeight: 'bold' }}>What\u2019s Best for Your Situation?</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
              <div style={{
                background: 'var(--le-bg-card)',
                border: '2px solid var(--le-primary)',
                borderRadius: '8px',
                padding: '25px'
              }}>
                <h3 style={{ marginBottom: '15px', fontSize: '1.2rem', fontWeight: 'bold' }}>👤 Single Professionals</h3>
                <div style={{ marginBottom: '15px', fontSize: '0.95rem' }}>
                  <strong>Best Option:</strong> Depends on career stability and location commitment.
                </div>
                <ul style={{ margin: '0', paddingLeft: '20px', fontSize: '0.95rem' }}>
                  <li style={{ marginBottom: '8px' }}>Rent if: Career is early-stage, high mobility needed, or frequent relocations expected</li>
                  <li>Buy if: Stable job, plan to stay 5+ years, ready to build wealth through equity</li>
                </ul>
              </div>

              <div style={{
                background: 'var(--le-bg-card)',
                border: '2px solid var(--le-primary)',
                borderRadius: '8px',
                padding: '25px'
              }}>
                <h3 style={{ marginBottom: '15px', fontSize: '1.2rem', fontWeight: 'bold' }}>💑 Couples/Newlyweds</h3>
                <div style={{ marginBottom: '15px', fontSize: '0.95rem' }}>
                  <strong>Best Option:</strong> Buying creates stability and shared investment.
                </div>
                <ul style={{ margin: '0', paddingLeft: '20px', fontSize: '0.95rem' }}>
                  <li style={{ marginBottom: '8px' }}>Rent if: Recently together, unsure about future together, or saving for larger down payment</li>
                  <li>Buy if: Committed, both employed, combined income strong, combined savings ready</li>
                </ul>
              </div>

              <div style={{
                background: 'var(--le-bg-card)',
                border: '2px solid var(--le-primary)',
                borderRadius: '8px',
                padding: '25px'
              }}>
                <h3 style={{ marginBottom: '15px', fontSize: '1.2rem', fontWeight: 'bold' }}>👨‍👩‍👧‍👦 Families with Children</h3>
                <div style={{ marginBottom: '15px', fontSize: '0.95rem' }}>
                  <strong>Best Option:</strong> Usually buying—stability, schools, long-term investment.
                </div>
                <ul style={{ margin: '0', paddingLeft: '20px', fontSize: '0.95rem' }}>
                  <li style={{ marginBottom: '8px' }}>Rent if: Temporary situation, frequent relocations, or building down payment</li>
                  <li>Buy if: Planning to stay in area for 7+ years, good school districts matter, space needs</li>
                </ul>
              </div>

              <div style={{
                background: 'var(--le-bg-card)',
                border: '2px solid var(--le-primary)',
                borderRadius: '8px',
                padding: '25px'
              }}>
                <h3 style={{ marginBottom: '15px', fontSize: '1.2rem', fontWeight: 'bold' }}>🏖️ Retirees</h3>
                <div style={{ marginBottom: '15px', fontSize: '0.95rem' }}>
                  <strong>Best Option:</strong> Usually buying—but depends on lifestyle.
                </div>
                <ul style={{ margin: '0', paddingLeft: '20px', fontSize: '0.95rem' }}>
                  <li style={{ marginBottom: '8px' }}>Rent if: High mobility expected, travel-heavy, want to minimize responsibilities</li>
                  <li>Buy if: Want stability, fixed payments, leave home to heirs, or downsize from larger home</li>
                </ul>
              </div>

              <div style={{
                background: 'var(--le-bg-card)',
                border: '2px solid var(--le-primary)',
                borderRadius: '8px',
                padding: '25px'
              }}>
                <h3 style={{ marginBottom: '15px', fontSize: '1.2rem', fontWeight: 'bold' }}>💼 Investors/Entrepreneurs</h3>
                <div style={{ marginBottom: '15px', fontSize: '0.95rem' }}>
                  <strong>Best Option:</strong> Buying as wealth-building strategy.
                </div>
                <ul style={{ margin: '0', paddingLeft: '20px', fontSize: '0.95rem' }}>
                  <li style={{ marginBottom: '8px' }}>Rent if: Capital better deployed in business ventures or stock market</li>
                  <li>Buy if: Seeking stable, long-term asset, tax benefits important, or real estate investment</li>
                </ul>
              </div>

              <div style={{
                background: 'var(--le-bg-card)',
                border: '2px solid var(--le-primary)',
                borderRadius: '8px',
                padding: '25px'
              }}>
                <h3 style={{ marginBottom: '15px', fontSize: '1.2rem', fontWeight: 'bold' }}>🎯 Remote Workers</h3>
                <div style={{ marginBottom: '15px', fontSize: '0.95rem' }}>
                  <strong>Best Option:</strong> Typically buying—location flexibility but long-term stability.
                </div>
                <ul style={{ margin: '0', paddingLeft: '20px', fontSize: '0.95rem' }}>
                  <li style={{ marginBottom: '8px' }}>Rent if: Still testing remote setup, frequent travel, or location-hopping</li>
                  <li>Buy if: Settled on location, plan to build roots, work from home long-term</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* FAQ TAB */}
        {activeTab === 'faq' && (
          <div>
            <h2 style={{ marginBottom: '30px', fontSize: '2rem', fontWeight: 'bold' }}>Frequently Asked Questions</h2>
            <div style={{ display: 'grid', gap: '20px' }}>
              {[
                {
                  q: "What\u2019s the minimum down payment to buy a home?",
                  a: "Conventional loans typically require 3-20% down. FHA loans allow as little as 3.5%, but require mortgage insurance. VA and USDA loans may allow 0% down for qualified borrowers."
                },
                {
                  q: "How long should I plan to stay to make buying worthwhile?",
                  a: "Generally, if you\u2019re staying less than 5 years, renting is often better due to closing costs and selling expenses. At 5-7 years, it\u2019s a toss-up. Over 7-10 years, buying typically wins financially."
                },
                {
                  q: "What are \u2018closing costs\u2019 and how much will they be?",
                  a: "Closing costs are fees for processing the mortgage and transfer. Expect 2-5% of the home price ($7,000-$17,500 on a $350,000 home). These include appraisal, title, insurance, taxes, and lender fees."
                },
                {
                  q: "What is \u2018PMI\u2019 and do I need to pay it?",
                  a: "Private Mortgage Insurance protects lenders if you default. Required when putting down less than 20%, it adds $100-300+ monthly. You can remove it once you reach 20% equity."
                },
                {
                  q: "How much should I have in savings before buying?",
                  a: "Have at least: down payment + closing costs (2-5%) + 6 months emergency fund. Many experts suggest $50,000+ in liquid savings before a $350,000 purchase."
                },
                {
                  q: "What are the hidden costs of renting?",
                  a: "Annual rent increases (often 3-5%), application fees, security deposits, renter\u2019s insurance, lease-breaking penalties, lack of equity, and no tax benefits."
                },
                {
                  q: "What are the hidden costs of buying?",
                  a: "Property taxes, homeowners insurance, HOA fees, maintenance (1% of home value yearly), utilities, septic/well repairs, roof/HVAC replacement, and potential special assessments."
                },
                {
                  q: "Can I deduct mortgage interest on my taxes?",
                  a: "Only if you itemize deductions (not take standard deduction). The interest on mortgages up to $750,000 is deductible for married couples filing jointly."
                },
                {
                  q: "What if the housing market crashes after I buy?",
                  a: "You\u2019re still building equity through mortgage payments. You can refinance if rates drop. Long-term, markets historically recover. Don\u2019t panic-sell in downturns."
                },
                {
                  q: "Is now a good time to buy or rent?",
                  a: "Depends on YOUR situation, not the market. If you\u2019re ready (savings, stable income, staying 5+ years), buying can be smart. Higher rates are balanced by slower appreciation."
                }
              ].map((faq, idx) => (
                <div
                  key={idx}
                  style={{
                    background: 'var(--le-bg-card)',
                    border: '1px solid var(--le-border)',
                    borderRadius: '8px',
                    padding: '20px'
                  }}
                >
                  <h3 style={{ marginBottom: '12px', fontSize: '1.05rem', fontWeight: '600', color: 'var(--le-primary)' }}>
                    Q: {faq.q}
                  </h3>
                  <p style={{ margin: '0', fontSize: '0.95rem', color: 'var(--le-text)', lineHeight: '1.6' }}>
                    A: {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Quiz Modal */}
      {showQuiz && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px'
        }}>
          <div style={{
            background: 'var(--le-bg)',
            borderRadius: '12px',
            padding: '40px',
            maxWidth: '700px',
            maxHeight: '85vh',
            overflowY: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
              <h2 style={{ margin: '0', fontSize: '1.8rem', fontWeight: 'bold' }}>Buy Readiness Quiz</h2>
              <button
                onClick={() => setShowQuiz(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  color: 'var(--le-text-secondary)'
                }}
              >
                ✕
              </button>
            </div>

            {!readinessScore ? (
              <div>
                {quizQuestions.map((q) => (
                  <div key={q.id} style={{ marginBottom: '30px' }}>
                    <p style={{ marginBottom: '15px', fontWeight: '600', fontSize: '1rem' }}>
                      {q.id}. {q.question}
                    </p>
                    <div style={{ display: 'grid', gap: '10px' }}>
                      {q.answers.map((ans) => (
                        <button
                          key={ans.value}
                          onClick={() => setQuizAnswers({ ...quizAnswers, [q.id]: ans.value })}
                          style={{
                            padding: '12px 16px',
                            background: quizAnswers[q.id] === ans.value ? 'var(--le-primary)' : 'var(--le-bg-card)',
                            color: quizAnswers[q.id] === ans.value ? 'white' : 'var(--le-text)',
                            border: quizAnswers[q.id] === ans.value ? '2px solid var(--le-primary)' : '1px solid var(--le-border)',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            textAlign: 'left',
                            fontSize: '0.95rem',
                            transition: 'all 0.2s ease'
                          }}
                        >
                          {ans.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}

                {Object.keys(quizAnswers).length === 8 && (
                  <button
                    onClick={() => setQuizAnswers(quizAnswers)}
                    style={{
                      width: '100%',
                      padding: '16px',
                      background: 'var(--le-primary)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '1rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      marginTop: '20px'
                    }}
                  >
                    See My Results
                  </button>
                )}
              </div>
            ) : (
              <div style={{ textAlign: 'center' }}>
                <div style={{ marginBottom: '30px' }}>
                  <div style={{ fontSize: '0.9rem', color: 'var(--le-text-secondary)', marginBottom: '10px' }}>Your Readiness Score</div>
                  <div style={{
                    fontSize: '4rem',
                    fontWeight: 'bold',
                    color: readinessScore >= 75 ? 'var(--le-success)' : readinessScore >= 50 ? 'var(--le-warning)' : 'var(--le-danger)',
                    marginBottom: '10px'
                  }}>
                    {readinessScore}%
                  </div>
                </div>

                <div style={{
                  background: 'var(--le-bg-card)',
                  border: '1px solid var(--le-border)',
                  borderRadius: '8px',
                  padding: '20px',
                  marginBottom: '30px',
                  textAlign: 'left'
                }}>
                  {readinessScore >= 75 && (
                    <div>
                      <h3 style={{ color: 'var(--le-success)', marginBottom: '10px', fontWeight: '600' }}>✓ You\u2019re Ready to Buy!</h3>
                      <p style={{ margin: '0', fontSize: '0.95rem' }}>Your financial situation, stability, and readiness indicate you\u2019re a strong candidate for homeownership. Start exploring properties and getting pre-approved.</p>
                    </div>
                  )}
                  {readinessScore >= 50 && readinessScore < 75 && (
                    <div>
                      <h3 style={{ color: 'var(--le-warning)', marginBottom: '10px', fontWeight: '600' }}>~ You\u2019re Somewhat Ready</h3>
                      <p style={{ margin: '0', fontSize: '0.95rem' }}>You have potential, but addressing weak areas will strengthen your position. Consider saving more, improving credit, or stabilizing income before buying.</p>
                    </div>
                  )}
                  {readinessScore < 50 && (
                    <div>
                      <h3 style={{ color: 'var(--le-danger)', marginBottom: '10px', fontWeight: '600' }}>→ More Time Needed</h3>
                      <p style={{ margin: '0', fontSize: '0.95rem' }}>Renting is a smart choice right now. Focus on building savings, improving credit, stabilizing income, and reducing debt before buying.</p>
                    </div>
                  )}
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    onClick={() => {
                      setShowQuiz(false);
                      setQuizAnswers({});
                    }}
                    style={{
                      flex: 1,
                      padding: '12px',
                      background: 'var(--le-bg-card)',
                      color: 'var(--le-text)',
                      border: '1px solid var(--le-border)',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '0.95rem',
                      fontWeight: '600'
                    }}
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      setShowLeadForm(true);
                      setShowQuiz(false);
                    }}
                    style={{
                      flex: 1,
                      padding: '12px',
                      background: 'var(--le-primary)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '0.95rem',
                      fontWeight: '600'
                    }}
                  >
                    Get Personalized Analysis
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Lead Capture Modal */}
      {showLeadForm && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px'
        }}>
          <div style={{
            background: 'var(--le-bg)',
            borderRadius: '12px',
            padding: '40px',
            maxWidth: '500px',
            width: '100%'
          }}>
            <h2 style={{ marginBottom: '10px', fontSize: '1.8rem', fontWeight: 'bold' }}>Get Your Personalized Analysis</h2>
            <p style={{ marginBottom: '30px', color: 'var(--le-text-secondary)' }}>
              Our real estate experts will review your situation and send you a custom rent vs buy analysis.
            </p>

            <form onSubmit={(e) => {
              e.preventDefault();
              console.log('Lead captured:', leadFormData);
              setShowLeadForm(false);
              setLeadFormData({ name: '', email: '', phone: '', zipCode: '' });
              alert('Thank you! Your personalized analysis will be sent to your email shortly.');
            }} style={{ display: 'grid', gap: '15px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.9rem', fontWeight: '600' }}>
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={leadFormData.name}
                  onChange={(e) => setLeadFormData({ ...leadFormData, name: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px',
                    background: 'var(--le-bg-card)',
                    border: '1px solid var(--le-border)',
                    borderRadius: '6px',
                    fontSize: '0.95rem',
                    color: 'var(--le-text)',
                    boxSizing: 'border-box'
                  }}
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.9rem', fontWeight: '600' }}>
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={leadFormData.email}
                  onChange={(e) => setLeadFormData({ ...leadFormData, email: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px',
                    background: 'var(--le-bg-card)',
                    border: '1px solid var(--le-border)',
                    borderRadius: '6px',
                    fontSize: '0.95rem',
                    color: 'var(--le-text)',
                    boxSizing: 'border-box'
                  }}
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.9rem', fontWeight: '600' }}>
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={leadFormData.phone}
                  onChange={(e) => setLeadFormData({ ...leadFormData, phone: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px',
                    background: 'var(--le-bg-card)',
                    border: '1px solid var(--le-border)',
                    borderRadius: '6px',
                    fontSize: '0.95rem',
                    color: 'var(--le-text)',
                    boxSizing: 'border-box'
                  }}
                  placeholder="(555) 123-4567"
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.9rem', fontWeight: '600' }}>
                  Zip Code
                </label>
                <input
                  type="text"
                  value={leadFormData.zipCode}
                  onChange={(e) => setLeadFormData({ ...leadFormData, zipCode: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px',
                    background: 'var(--le-bg-card)',
                    border: '1px solid var(--le-border)',
                    borderRadius: '6px',
                    fontSize: '0.95rem',
                    color: 'var(--le-text)',
                    boxSizing: 'border-box'
                  }}
                  placeholder="12345"
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                <button
                  type="button"
                  onClick={() => setShowLeadForm(false)}
                  style={{
                    flex: 1,
                    padding: '14px',
                    background: 'var(--le-bg-card)',
                    color: 'var(--le-text)',
                    border: '1px solid var(--le-border)',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontWeight: '600',
                    transition: 'all 0.3s ease'
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    flex: 1,
                    padding: '14px',
                    background: 'var(--le-primary)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontWeight: '600',
                    transition: 'all 0.3s ease'
                  }}
                >
                  Get My Analysis
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Lead Capture CTA Section */}
      <div style={{
        background: 'linear-gradient(135deg, var(--le-primary) 0%, var(--le-accent) 100%)',
        color: 'white',
        padding: '60px 20px',
        textAlign: 'center',
        borderTop: '1px solid var(--le-border)'
      }}>
        <h2 style={{ margin: '0 0 20px 0', fontSize: '2rem', fontWeight: 'bold' }}>
          Ready to Make a Decision?
        </h2>
        <p style={{ margin: '0 0 30px 0', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto 30px', opacity: 0.95 }}>
          Get a personalized rent vs buy analysis based on your local market, financial situation, and life goals.
        </p>
        <button
          onClick={() => setShowLeadForm(true)}
          style={{
            padding: '16px 40px',
            background: 'white',
            color: 'var(--le-primary)',
            border: 'none',
            borderRadius: '6px',
            fontSize: '1.1rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => e.target.style.transform = 'translateY(-3px)'}
          onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
        >
          Get Your Free Analysis →
        </button>
      </div>

      {/* Footer */}
      <footer style={{
        background: 'var(--le-bg-card)',
        border: '1px solid var(--le-border)',
        padding: '40px 20px',
        textAlign: 'center',
        color: 'var(--le-text-secondary)',
        fontSize: '0.9rem'
      }}>
        <p style={{ margin: '0 0 15px 0' }}>
          This calculator is for educational purposes. Results are based on standard assumptions and local market averages. Consult with a financial advisor and real estate professional for personalized advice.
        </p>
        <p style={{ margin: '0' }}>
          © 2026 LeadEngine. All rights reserved. | Helping people make smarter real estate decisions.
        </p>
      </footer>
    </div>
  );
}