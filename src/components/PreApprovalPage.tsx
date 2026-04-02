'use client';

import React, { useState } from 'react';

export default function PreApprovalPage() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'comparison' | 'documents'>('comparison');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    annualIncomeRange: '',
    creditScoreRange: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [calculatorInputs, setCalculatorInputs] = useState({
    annualIncome: 75000,
    monthlyDebts: 500,
    downPayment: 50000,
    interestRate: 6.5
  });

  const faqs = [
    {
      question: 'What\u2019s the difference between pre-qualification and pre-approval?',
      answer: 'Pre-qualification is an informal estimate based on information you provide over the phone or online—no verification needed. Pre-approval is a formal process where you submit financial documents, undergo a credit check, and a lender verifies your creditworthiness. Pre-approval is much stronger and shows sellers you\u2019re a serious, qualified buyer. Pre-approval is typically valid for 60–90 days, while pre-qualification expires much sooner.'
    },
    {
      question: 'How long does pre-approval take?',
      answer: 'Pre-approval typically takes 3–5 business days from the time you submit all required documents. Some lenders offer expedited processing (24–48 hours) for urgent situations. The timeline depends on document completeness, verification requirements, and current lender workload. Having everything ready upfront significantly speeds up the process.'
    },
    {
      question: 'Is pre-approval a guarantee I\u2019ll get the loan?',
      answer: 'Pre-approval is a conditional commitment, not a guarantee. The lender has verified your financial situation and creditworthiness, but final approval depends on the property appraisal, title search results, and that your financial situation doesn\u2019t change dramatically before closing. Major changes like job loss, new debt, or a big purchase could affect final approval.'
    },
    {
      question: 'Do I need to be pre-approved before house hunting?',
      answer: 'While not technically required, pre-approval is highly recommended before you start touring homes. It helps you understand your budget, shows sellers you\u2019re a serious buyer, strengthens your offer in competitive markets, and streamlines the closing timeline. Most agents won\u2019t show homes to buyers without pre-approval.'
    },
    {
      question: 'Can my pre-approval amount change?',
      answer: 'Yes, your pre-approval amount can change if your financial situation changes—income increases or decreases, credit score drops, or you take on new debt. Additionally, if you haven\u2019t found a property and interest rates change significantly, lenders may adjust the approved amount based on the new rate environment. Always lock in your rate when you find a home.'
    },
    {
      question: 'What if my credit score is below 580?',
      answer: 'Conventional loans typically require a credit score of 620 or higher, though some lenders have programs for 580+. If your score is below 580, consider FHA loans, which allow scores as low as 500 (with a larger down payment). You can also take time to improve your score by paying down debt and fixing any errors on your credit report before applying.'
    },
    {
      question: 'Can I get pre-approved with a co-applicant?',
      answer: 'Yes, absolutely. Many buyers apply jointly with a spouse, partner, or co-borrower. Both applicants\u2019 incomes, debts, and credit are factored into the pre-approval amount. This often increases your buying power. Both applicants must provide documentation and go through the application process together.'
    },
    {
      question: 'What happens after I\u2019m pre-approved?',
      answer: 'After pre-approval, you\u2019ll receive a pre-approval letter stating your maximum loan amount, interest rate, and any conditions. Use this letter when making offers. Once you have an accepted offer on a home, your pre-approval converts to a formal loan application, with the property appraisal and final underwriting determining your final approval amount.'
    }
  ];

  const documentChecklist = [
    'Recent pay stubs (typically last 30 days)',
    'W-2 forms (last 2 years)',
    'Federal tax returns (last 2 years)',
    'Bank statements (last 2 months)',
    'Proof of employment (offer letter or employment verification letter)',
    'Government-issued ID (driver\u2019s license or passport)',
    'Proof of assets (retirement accounts, investment statements)',
    'List of outstanding debts (credit cards, loans, alimony)'
  ];

  const creditScoreGuide = [
    { range: 'Excellent (740+)', description: 'Best rates available. Lenders actively compete for your business. You qualify for conventional loans with optimal terms.' },
    { range: 'Good (670–739)', description: 'Access to most conventional loans. Rates are competitive but slightly higher than excellent. Down payment requirements are standard (3–20%).' },
    { range: 'Fair (580–669)', description: 'May qualify for FHA or other government-backed loans. Down payments typically 10–15% required. Rates are higher; consider improving score before applying.' },
    { range: 'Poor (Below 580)', description: 'Limited lending options. FHA loans available with significant down payments (15–20%). Higher interest rates. Consider credit repair before applying.' }
  ];

  const comparisonTable = [
    {
      aspect: 'What it is',
      preQualification: 'Informal estimate of borrowing capacity',
      preApproval: 'Formal verification of creditworthiness'
    },
    {
      aspect: 'Process',
      preQualification: 'Quick phone or online conversation',
      preApproval: 'Full application with document verification'
    },
    {
      aspect: 'Documentation',
      preQualification: 'None required',
      preApproval: 'Tax returns, pay stubs, bank statements, ID, employment verification'
    },
    {
      aspect: 'Credit check',
      preQualification: 'Not performed',
      preApproval: 'Hard inquiry performed'
    },
    {
      aspect: 'Time to complete',
      preQualification: 'Minutes to hours',
      preApproval: '3–5 business days'
    },
    {
      aspect: 'Validity period',
      preQualification: 'Days to weeks',
      preApproval: '60–90 days'
    },
    {
      aspect: 'Seller perception',
      preQualification: 'Not impressive to sellers',
      preApproval: 'Shows you\u2019re a serious, qualified buyer'
    },
    {
      aspect: 'Conditions',
      preQualification: 'None—just an estimate',
      preApproval: 'Conditional on property appraisal and underwriting'
    }
  ];

  const benefits = [
    {
      icon: '💪',
      title: 'Stronger Offers',
      description: 'Sellers take you seriously. In competitive markets, a pre-approval letter can be the difference between your offer being accepted and rejected.'
    },
    {
      icon: '📊',
      title: 'Know Your Budget',
      description: 'Clear understanding of how much you can afford helps you focus your search on realistic properties and avoid disappointing situations.'
    },
    {
      icon: '⚡',
      title: 'Faster Closing',
      description: 'Pre-approval streamlines the process. Lenders already have your documentation and creditworthiness verified, reducing delays at closing.'
    },
    {
      icon: '🔒',
      title: 'Lock in Rates',
      description: 'Once pre-approved, you can lock your interest rate, protecting yourself from rate increases while you search for the perfect home.'
    },
    {
      icon: '🏡',
      title: 'Confidence',
      description: 'Start house hunting knowing exactly what you qualify for. Focus on homes within your range instead of wondering if you\u2019ll be approved.'
    },
    {
      icon: '🚀',
      title: 'Competitive Edge',
      description: 'In competitive markets, pre-approval shows you\u2019re ready to move fast and serious about making a purchase.'
    }
  ];

  // Affordability calculator logic
  const monthlyIncome = calculatorInputs.annualIncome / 12;
  const maxDTIPayment = (monthlyIncome * 0.43) - calculatorInputs.monthlyDebts;
  const monthlyRate = calculatorInputs.interestRate / 100 / 12;
  const numberOfPayments = 30 * 12;
  const maxLoanAmount = maxDTIPayment > 0 && monthlyRate > 0
    ? ((maxDTIPayment * (Math.pow(1 + monthlyRate, numberOfPayments) - 1)) /
      (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)))
    : 0;
  const estimatedPreApprovalAmount = Math.round(maxLoanAmount + calculatorInputs.downPayment);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCalculatorChange = (field: string, value: number) => {
    setCalculatorInputs(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.phone && formData.annualIncomeRange && formData.creditScoreRange) {
      setFormSubmitted(true);
      setTimeout(() => {
        setFormSubmitted(false);
        setFormData({ name: '', email: '', phone: '', annualIncomeRange: '', creditScoreRange: '' });
      }, 3000);
    }
  };

  return (
    <div style={{ backgroundColor: 'var(--le-bg)', color: 'var(--le-text)', minHeight: '100vh', paddingTop: '60px' }}>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, var(--le-primary) 0%, var(--le-accent) 100%)',
        color: 'white',
        padding: '80px 20px',
        textAlign: 'center',
        marginBottom: '60px'
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '48px', fontWeight: '700', marginBottom: '20px', lineHeight: '1.2' }}>
            Get Pre-Approved for Your Dream Home
          </h1>
          <p style={{ fontSize: '18px', opacity: '0.95', marginBottom: '30px', lineHeight: '1.6' }}>
            Mortgage pre-approval is your first step toward homeownership. Learn what it takes to get approved, what documents you\u2019ll need, and how pre-approval strengthens your position in today\u2019s competitive market.
          </p>
          <button style={{
            backgroundColor: 'white',
            color: 'var(--le-primary)',
            border: 'none',
            padding: '14px 32px',
            fontSize: '16px',
            fontWeight: '600',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            textDecoration: 'none'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}>
            Start Pre-Approval Journey
          </button>
        </div>
      </section>

      {/* What is Pre-Approval Section */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 20px', marginBottom: '60px' }}>
        <h2 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '40px', textAlign: 'center' }}>
          What is Mortgage Pre-Approval?
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', marginBottom: '50px' }}>
          {benefits.map((benefit, idx) => (
            <div key={idx} style={{
              backgroundColor: 'var(--le-surface)',
              padding: '30px',
              borderRadius: '12px',
              border: `1px solid var(--le-border)`,
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}>
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>{benefit.icon}</div>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px' }}>{benefit.title}</h3>
              <p style={{ color: 'var(--le-text-secondary)', lineHeight: '1.6', margin: '0' }}>{benefit.description}</p>
            </div>
          ))}
        </div>
        <div style={{
          backgroundColor: 'var(--le-surface)',
          padding: '40px',
          borderRadius: '12px',
          border: `2px solid var(--le-primary)`,
          marginTop: '40px'
        }}>
          <h3 style={{ fontSize: '22px', fontWeight: '600', marginBottom: '16px', color: 'var(--le-primary)' }}>
            How the Pre-Approval Process Works
          </h3>
          <ol style={{
            paddingLeft: '20px',
            lineHeight: '1.8',
            fontSize: '15px',
            color: 'var(--le-text-secondary)',
            margin: '0'
          }}>
            <li style={{ marginBottom: '12px' }}><strong>Start the application:</strong> Complete a mortgage pre-approval application with your lender, providing basic financial information.</li>
            <li style={{ marginBottom: '12px' }}><strong>Submit documents:</strong> Gather and submit required financial documents for verification (pay stubs, tax returns, bank statements, ID, employment verification).</li>
            <li style={{ marginBottom: '12px' }}><strong>Credit check:</strong> The lender performs a hard inquiry on your credit report to assess creditworthiness and determine rates.</li>
            <li style={{ marginBottom: '12px' }}><strong>Underwriting review:</strong> A loan officer reviews your entire financial profile, debt-to-income ratio, credit history, and assets.</li>
            <li style={{ marginBottom: '12px' }}><strong>Conditional approval:</strong> Once approved, you receive a pre-approval letter specifying your loan amount, rate lock period, and any conditions that must be met.</li>
            <li><strong>Rate lock option:</strong> You can lock your interest rate immediately to protect against rate increases while you search for a property.</li>
          </ol>
        </div>
      </section>

      {/* Pre-Approval vs Pre-Qualification */}
      <section style={{ backgroundColor: 'var(--le-surface)', padding: '60px 20px', marginBottom: '60px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '40px', textAlign: 'center' }}>
            Pre-Approval vs. Pre-Qualification
          </h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              backgroundColor: 'var(--le-bg)',
              borderRadius: '12px',
              overflow: 'hidden'
            }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--le-primary)', color: 'white' }}>
                  <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', borderBottom: `2px solid var(--le-primary)` }}>Aspect</th>
                  <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', borderBottom: `2px solid var(--le-primary)` }}>Pre-Qualification</th>
                  <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', borderBottom: `2px solid var(--le-primary)` }}>Pre-Approval</th>
                </tr>
              </thead>
              <tbody>
                {comparisonTable.map((row, idx) => (
                  <tr key={idx} style={{
                    borderBottom: `1px solid var(--le-border)`,
                    backgroundColor: idx % 2 === 0 ? 'var(--le-bg)' : 'rgba(59, 130, 246, 0.02)'
                  }}>
                    <td style={{ padding: '16px', fontWeight: '600', color: 'var(--le-text)' }}>{row.aspect}</td>
                    <td style={{ padding: '16px', color: 'var(--le-text-secondary)' }}>{row.preQualification}</td>
                    <td style={{ padding: '16px', color: 'var(--le-text-secondary)' }}>{row.preApproval}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Documents Needed Section */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 20px', marginBottom: '60px' }}>
        <h2 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '40px', textAlign: 'center' }}>
          Documents You\u2019ll Need
        </h2>
        <div style={{
          backgroundColor: 'var(--le-surface)',
          padding: '40px',
          borderRadius: '12px',
          border: `1px solid var(--le-border)`
        }}>
          <p style={{ color: 'var(--le-text-secondary)', marginBottom: '30px', fontSize: '15px' }}>
            Gather these documents before applying for pre-approval. Having everything ready speeds up the process from days to hours.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {documentChecklist.map((doc, idx) => (
              <div key={idx} style={{
                display: 'flex',
                alignItems: 'flex-start',
                padding: '16px',
                backgroundColor: 'var(--le-bg)',
                borderRadius: '8px',
                border: `1px solid var(--le-border)`
              }}>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '28px',
                  height: '28px',
                  backgroundColor: 'var(--le-primary)',
                  color: 'white',
                  borderRadius: '50%',
                  fontWeight: '600',
                  marginRight: '12px',
                  flexShrink: 0,
                  fontSize: '14px'
                }}>
                  ✓
                </span>
                <p style={{ margin: '0', color: 'var(--le-text)', lineHeight: '1.5', fontSize: '15px' }}>{doc}</p>
              </div>
            ))}
          </div>
          <div style={{
            backgroundColor: '#fef3c7',
            border: '1px solid #fcd34d',
            color: '#92400e',
            padding: '16px',
            borderRadius: '8px',
            marginTop: '30px',
            fontSize: '14px'
          }}>
            <strong>Tip:</strong> Keep digital copies organized in a folder. Most lenders now accept documents electronically, making the process faster and more secure.
          </div>
        </div>
      </section>

      {/* Credit Score Guide */}
      <section style={{ backgroundColor: 'var(--le-surface)', padding: '60px 20px', marginBottom: '60px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '40px', textAlign: 'center' }}>
            Understanding Credit Scores
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
            {creditScoreGuide.map((guide, idx) => {
              const colors = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444'];
              return (
                <div key={idx} style={{
                  backgroundColor: 'var(--le-bg)',
                  borderLeft: `4px solid ${colors[idx]}`,
                  padding: '24px',
                  borderRadius: '8px',
                  border: `1px solid var(--le-border)`,
                  borderLeftWidth: '4px'
                }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px', color: colors[idx] }}>
                    {guide.range}
                  </h3>
                  <p style={{ color: 'var(--le-text-secondary)', lineHeight: '1.6', margin: '0', fontSize: '14px' }}>
                    {guide.description}
                  </p>
                </div>
              );
            })}
          </div>
          <div style={{
            backgroundColor: 'var(--le-bg)',
            padding: '30px',
            borderRadius: '12px',
            border: `1px solid var(--le-border)`,
            marginTop: '40px'
          }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>How to Improve Your Credit Score</h3>
            <ul style={{
              listStylePosition: 'inside',
              lineHeight: '1.8',
              color: 'var(--le-text-secondary)',
              fontSize: '14px',
              margin: '0',
              paddingLeft: '0'
            }}>
              <li>Pay bills on time—payment history is 35% of your score.</li>
              <li>Pay down existing debt, especially credit card balances (aim for under 30% utilization).</li>
              <li>Check your credit report for errors and dispute any inaccuracies with the bureau.</li>
              <li>Don\u2019t close old credit accounts; they help build credit history length.</li>
              <li>Limit new credit applications; multiple inquiries can temporarily lower your score.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Affordability Calculator */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 20px', marginBottom: '60px' }}>
        <h2 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '40px', textAlign: 'center' }}>
          Affordability Calculator
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '40px' }}>
          <div style={{
            backgroundColor: 'var(--le-surface)',
            padding: '30px',
            borderRadius: '12px',
            border: `1px solid var(--le-border)`
          }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '24px' }}>Enter Your Information</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: 'var(--le-text)' }}>
                  Annual Income: ${calculatorInputs.annualIncome.toLocaleString()}
                </label>
                <input
                  type="range"
                  min="30000"
                  max="300000"
                  step="5000"
                  value={calculatorInputs.annualIncome}
                  onChange={(e) => handleCalculatorChange('annualIncome', parseInt(e.target.value))}
                  style={{ width: '100%', cursor: 'pointer', height: '6px' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: 'var(--le-text)' }}>
                  Monthly Debts: ${calculatorInputs.monthlyDebts.toLocaleString()}
                </label>
                <input
                  type="range"
                  min="0"
                  max="3000"
                  step="50"
                  value={calculatorInputs.monthlyDebts}
                  onChange={(e) => handleCalculatorChange('monthlyDebts', parseInt(e.target.value))}
                  style={{ width: '100%', cursor: 'pointer', height: '6px' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: 'var(--le-text)' }}>
                  Down Payment: ${calculatorInputs.downPayment.toLocaleString()}
                </label>
                <input
                  type="range"
                  min="0"
                  max="200000"
                  step="5000"
                  value={calculatorInputs.downPayment}
                  onChange={(e) => handleCalculatorChange('downPayment', parseInt(e.target.value))}
                  style={{ width: '100%', cursor: 'pointer', height: '6px' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: 'var(--le-text)' }}>
                  Interest Rate: {calculatorInputs.interestRate.toFixed(2)}%
                </label>
                <input
                  type="range"
                  min="3"
                  max="10"
                  step="0.1"
                  value={calculatorInputs.interestRate}
                  onChange={(e) => handleCalculatorChange('interestRate', parseFloat(e.target.value))}
                  style={{ width: '100%', cursor: 'pointer', height: '6px' }}
                />
              </div>
            </div>
          </div>

          <div style={{
            backgroundColor: 'linear-gradient(135deg, var(--le-primary), var(--le-accent))',
            color: 'white',
            padding: '40px',
            borderRadius: '12px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            textAlign: 'center'
          }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px', opacity: '0.9' }}>
              Estimated Pre-Approval Amount
            </h3>
            <div style={{ fontSize: '48px', fontWeight: '700', marginBottom: '24px' }}>
              ${estimatedPreApprovalAmount.toLocaleString()}
            </div>
            <div style={{ fontSize: '14px', lineHeight: '1.6', opacity: '0.95', marginBottom: '24px' }}>
              Based on a 43% debt-to-income ratio and 30-year fixed rate
            </div>
            <div style={{
              backgroundColor: 'rgba(255,255,255,0.2)',
              padding: '16px',
              borderRadius: '8px',
              fontSize: '13px',
              lineHeight: '1.5'
            }}>
              <p style={{ margin: '0 0 8px 0' }}><strong>Monthly Payment Estimate:</strong> ${Math.round(maxDTIPayment).toLocaleString()}</p>
              <p style={{ margin: '0' }}>This estimate uses your current monthly debt obligations in the calculation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 20px', marginBottom: '60px' }}>
        <h2 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '40px', textAlign: 'center' }}>
          Frequently Asked Questions
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {faqs.map((faq, idx) => (
            <div key={idx} style={{
              backgroundColor: 'var(--le-surface)',
              border: `1px solid var(--le-border)`,
              borderRadius: '12px',
              overflow: 'hidden'
            }}>
              <button
                onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                style={{
                  width: '100%',
                  padding: '20px',
                  backgroundColor: 'var(--le-surface)',
                  border: 'none',
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: '600',
                  color: 'var(--le-text)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(59, 130, 246, 0.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--le-surface)';
                }}
              >
                <span>{faq.question}</span>
                <span style={{
                  transform: expandedFaq === idx ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s ease',
                  fontSize: '20px',
                  marginLeft: '12px',
                  flexShrink: 0
                }}>
                  ▼
                </span>
              </button>
              {expandedFaq === idx && (
                <div style={{
                  padding: '20px',
                  backgroundColor: 'rgba(59, 130, 246, 0.02)',
                  borderTop: `1px solid var(--le-border)`,
                  color: 'var(--le-text-secondary)',
                  lineHeight: '1.7',
                  fontSize: '15px'
                }}>
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Lead Capture Form */}
      <section style={{ backgroundColor: 'var(--le-surface)', padding: '60px 20px' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '12px', textAlign: 'center' }}>
            Start Your Pre-Approval Journey
          </h2>
          <p style={{ textAlign: 'center', color: 'var(--le-text-secondary)', marginBottom: '40px', fontSize: '15px' }}>
            Connect with a lending specialist to begin your pre-approval process today.
          </p>

          {formSubmitted ? (
            <div style={{
              backgroundColor: '#d1fae5',
              border: '1px solid #6ee7b7',
              color: '#065f46',
              padding: '20px',
              borderRadius: '12px',
              textAlign: 'center',
              fontSize: '15px'
            }}>
              <strong>Success!</strong> We\u2019ve received your information. A lending specialist will contact you within 24 hours.
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '6px', color: 'var(--le-text)' }}>
                  Full Name *
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
                    border: `1px solid var(--le-border)`,
                    borderRadius: '8px',
                    fontSize: '15px',
                    backgroundColor: 'var(--le-bg)',
                    color: 'var(--le-text)',
                    boxSizing: 'border-box',
                    transition: 'border-color 0.3s ease'
                  }}
                  onFocus={(e) => { e.target.style.borderColor = 'var(--le-primary)'; }}
                  onBlur={(e) => { e.target.style.borderColor = 'var(--le-border)'; }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '6px', color: 'var(--le-text)' }}>
                  Email Address *
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
                    border: `1px solid var(--le-border)`,
                    borderRadius: '8px',
                    fontSize: '15px',
                    backgroundColor: 'var(--le-bg)',
                    color: 'var(--le-text)',
                    boxSizing: 'border-box',
                    transition: 'border-color 0.3s ease'
                  }}
                  onFocus={(e) => { e.target.style.borderColor = 'var(--le-primary)'; }}
                  onBlur={(e) => { e.target.style.borderColor = 'var(--le-border)'; }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '6px', color: 'var(--le-text)' }}>
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleFormChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: `1px solid var(--le-border)`,
                    borderRadius: '8px',
                    fontSize: '15px',
                    backgroundColor: 'var(--le-bg)',
                    color: 'var(--le-text)',
                    boxSizing: 'border-box',
                    transition: 'border-color 0.3s ease'
                  }}
                  onFocus={(e) => { e.target.style.borderColor = 'var(--le-primary)'; }}
                  onBlur={(e) => { e.target.style.borderColor = 'var(--le-border)'; }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '6px', color: 'var(--le-text)' }}>
                  Annual Income Range *
                </label>
                <select
                  name="annualIncomeRange"
                  value={formData.annualIncomeRange}
                  onChange={handleFormChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: `1px solid var(--le-border)`,
                    borderRadius: '8px',
                    fontSize: '15px',
                    backgroundColor: 'var(--le-bg)',
                    color: 'var(--le-text)',
                    boxSizing: 'border-box',
                    cursor: 'pointer',
                    transition: 'border-color 0.3s ease'
                  }}
                  onFocus={(e) => { e.target.style.borderColor = 'var(--le-primary)'; }}
                  onBlur={(e) => { e.target.style.borderColor = 'var(--le-border)'; }}
                >
                  <option value="">Select income range...</option>
                  <option value="under50k">Under $50,000</option>
                  <option value="50k75k">$50,000 - $75,000</option>
                  <option value="75k100k">$75,000 - $100,000</option>
                  <option value="100k150k">$100,000 - $150,000</option>
                  <option value="150k200k">$150,000 - $200,000</option>
                  <option value="over200k">Over $200,000</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '6px', color: 'var(--le-text)' }}>
                  Credit Score Range *
                </label>
                <select
                  name="creditScoreRange"
                  value={formData.creditScoreRange}
                  onChange={handleFormChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: `1px solid var(--le-border)`,
                    borderRadius: '8px',
                    fontSize: '15px',
                    backgroundColor: 'var(--le-bg)',
                    color: 'var(--le-text)',
                    boxSizing: 'border-box',
                    cursor: 'pointer',
                    transition: 'border-color 0.3s ease'
                  }}
                  onFocus={(e) => { e.target.style.borderColor = 'var(--le-primary)'; }}
                  onBlur={(e) => { e.target.style.borderColor = 'var(--le-border)'; }}
                >
                  <option value="">Select credit score range...</option>
                  <option value="below580">Below 580</option>
                  <option value="580669">580 - 669 (Fair)</option>
                  <option value="670739">670 - 739 (Good)</option>
                  <option value="740plus">740+ (Excellent)</option>
                </select>
              </div>

              <button
                type="submit"
                style={{
                  backgroundColor: 'var(--le-primary)',
                  color: 'white',
                  border: 'none',
                  padding: '14px 28px',
                  fontSize: '16px',
                  fontWeight: '600',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  marginTop: '12px',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--le-primary-hover)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 16px rgba(59, 130, 246, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--le-primary)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                Get Pre-Approved Now
              </button>
            </form>
          )}

          <p style={{ textAlign: 'center', fontSize: '13px', color: 'var(--le-text-secondary)', marginTop: '16px' }}>
            Your information is secure and confidential. We\u2019ll never share your data.
          </p>
        </div>
      </section>

      {/* Bottom CTA */}
      <section style={{ backgroundColor: 'var(--le-bg)', padding: '60px 20px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '16px' }}>
          Ready to Get Pre-Approved?
        </h2>
        <p style={{ fontSize: '16px', color: 'var(--le-text-secondary)', marginBottom: '30px', maxWidth: '600px', margin: '0 auto 30px' }}>
          Connect with a lending specialist today to start your homeownership journey. Pre-approval is the first step toward finding your dream home.
        </p>
        <button style={{
          backgroundColor: 'var(--le-primary)',
          color: 'white',
          border: 'none',
          padding: '14px 36px',
          fontSize: '16px',
          fontWeight: '600',
          borderRadius: '8px',
          cursor: 'pointer',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--le-primary-hover)';
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 8px 16px rgba(59, 130, 246, 0.3)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--le-primary)';
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'none';
        }}>
          Start Your Pre-Approval
        </button>
      </section>
    </div>
  );
}
