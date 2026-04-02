'use client';

import React, { useState, useEffect } from 'react';

interface LeadFormData {
  name: string;
  email: string;
  phone: string;
  workingWithAgent: boolean;
}

interface AmortizationEntry {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

export default function MortgageCalculator() {
  const [activeTab, setActiveTab] = useState<'monthly' | 'affordability' | 'refinance'>('monthly');
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [formData, setFormData] = useState<LeadFormData>({
    name: '',
    email: '',
    phone: '',
    workingWithAgent: false,
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  // Monthly Payment Calculator State
  const [homePrice, setHomePrice] = useState(350000);
  const [downPaymentType, setDownPaymentType] = useState<'percent' | 'dollar'>('percent');
  const [downPaymentValue, setDownPaymentValue] = useState(20);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTerm, setLoanTerm] = useState(30);
  const [propertyTaxRate, setPropertyTaxRate] = useState(1.2);
  const [homeInsurance, setHomeInsurance] = useState(150);
  const [hoaFees, setHoaFees] = useState(0);

  // Affordability Calculator State
  const [annualIncome, setAnnualIncome] = useState(100000);
  const [monthlyDebts, setMonthlyDebts] = useState(500);
  const [affordableDownPayment, setAffordableDownPayment] = useState(60000);
  const [creditScore, setCreditScore] = useState(750);
  const [targetDTI, setTargetDTI] = useState(0.43);

  // Refinance Calculator State
  const [currentBalance, setCurrentBalance] = useState(280000);
  const [currentRate, setCurrentRate] = useState(7.0);
  const [newRate, setNewRate] = useState(6.0);
  const [remainingTerm, setRemainingTerm] = useState(25);
  const [closingCosts, setClosingCosts] = useState(3000);

  // Calculate derived values
  const downPaymentDollar = downPaymentType === 'percent'
    ? (homePrice * downPaymentValue) / 100
    : downPaymentValue;
  const loanAmount = homePrice - downPaymentDollar;
  const ltv = (loanAmount / homePrice) * 100;

  // PMI Calculation
  const needsPMI = ltv > 80;
  const annualPMI = needsPMI ? loanAmount * 0.005 : 0;
  const monthlyPMI = annualPMI / 12;

  // Monthly Payment Calculation
  const monthlyRate = interestRate / 100 / 12;
  const numberOfPayments = loanTerm * 12;
  const monthlyPayment = loanAmount > 0 && monthlyRate > 0
    ? (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
    : 0;

  // Monthly Taxes and Insurance
  const monthlyPropertyTax = (homePrice * (propertyTaxRate / 100)) / 12;
  const monthlyInsurance = homeInsurance;
  const totalMonthlyPayment = monthlyPayment + monthlyPropertyTax + monthlyInsurance + monthlyPMI + hoaFees;

  // Affordability Calculator
  const monthlyIncome = annualIncome / 12;
  const maxDTIPayment = monthlyIncome * targetDTI - monthlyDebts;
  const maxHomePrice = maxDTIPayment > 0 && interestRate > 0
    ? ((maxDTIPayment - monthlyPropertyTax - monthlyInsurance - hoaFees) *
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1)) /
      (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))
    : 0;
  const affordableMaxHome = maxHomePrice + affordableDownPayment;

  // Refinance Calculator
  const currentMonthlyPayment = currentBalance > 0 && currentRate > 0
    ? (currentBalance * ((currentRate / 100 / 12) * Math.pow(1 + (currentRate / 100 / 12), remainingTerm * 12))) /
      (Math.pow(1 + (currentRate / 100 / 12), remainingTerm * 12) - 1)
    : 0;

  const newMonthlyRate = newRate / 100 / 12;
  const newMonthlyPayment = currentBalance > 0 && newRate > 0
    ? (currentBalance * (newMonthlyRate * Math.pow(1 + newMonthlyRate, remainingTerm * 12))) /
      (Math.pow(1 + newMonthlyRate, remainingTerm * 12) - 1)
    : 0;

  const monthlySavings = currentMonthlyPayment - newMonthlyPayment;
  const breakEvenMonths = monthlySavings > 0 ? Math.ceil(closingCosts / monthlySavings) : 0;

  // Amortization Schedule
  const generateAmortization = (): AmortizationEntry[] => {
    const schedule: AmortizationEntry[] = [];
    let balance = loanAmount;

    for (let month = 1; month <= numberOfPayments; month++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = monthlyPayment - interestPayment;
      balance -= principalPayment;

      if (month <= 60 || month === numberOfPayments) {
        schedule.push({
          month,
          payment: monthlyPayment,
          principal: principalPayment,
          interest: interestPayment,
          balance: Math.max(0, balance),
        });
      }
    }

    return schedule;
  };

  const amortization = generateAmortization();
  const [showAmortization, setShowAmortization] = useState(false);

  // Payment Breakdown for Chart
  const principalAndInterest = monthlyPayment;
  const taxes = monthlyPropertyTax;
  const insurance = monthlyInsurance;
  const pmi = monthlyPMI;
  const hoa = hoaFees;
  const totalPayment = principalAndInterest + taxes + insurance + pmi + hoa;

  const breakdownPercents = {
    principal: (principalAndInterest / totalPayment) * 100,
    taxes: (taxes / totalPayment) * 100,
    insurance: (insurance / totalPayment) * 100,
    pmi: (pmi / totalPayment) * 100,
    hoa: (hoa / totalPayment) * 100,
  };

  // Donut Chart Colors
  const chartColors = [
    'var(--le-primary)',
    'var(--le-accent)',
    'var(--le-warning)',
    'var(--le-secondary)',
    'var(--le-success)',
  ];

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
    setFormError('');
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone) {
      setFormError('Please fill in all required fields.');
      return;
    }

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          source: 'mortgage_calculator',
          calculatorData: {
            calculator: activeTab,
            homePrice,
            downPayment: downPaymentDollar,
            interestRate,
            loanTerm,
            estimatedMonthlyPayment: totalMonthlyPayment,
          },
        }),
      });

      if (response.ok) {
        setFormSubmitted(true);
        setTimeout(() => {
          setShowLeadForm(false);
          setFormSubmitted(false);
          setFormData({ name: '', email: '', phone: '', workingWithAgent: false });
        }, 3000);
      } else {
        setFormError('Failed to submit. Please try again.');
      }
    } catch (error) {
      setFormError('An error occurred. Please try again.');
    }
  };

  const containerStyle: React.CSSProperties = {
    minHeight: '100vh',
    backgroundColor: 'var(--le-bg)',
    padding: '2rem 1rem',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  };

  const wrapperStyle: React.CSSProperties = {
    maxWidth: '1400px',
    margin: '0 auto',
  };

  const headerStyle: React.CSSProperties = {
    textAlign: 'center',
    marginBottom: '3rem',
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '2.5rem',
    fontWeight: '700',
    color: 'var(--le-text-primary)',
    marginBottom: '0.5rem',
    letterSpacing: '-0.02em',
  };

  const subtitleStyle: React.CSSProperties = {
    fontSize: '1.125rem',
    color: 'var(--le-text-secondary)',
    maxWidth: '600px',
    margin: '0 auto',
  };

  const tabsContainerStyle: React.CSSProperties = {
    display: 'flex',
    gap: '1rem',
    marginBottom: '3rem',
    justifyContent: 'center',
    flexWrap: 'wrap',
  };

  const tabButtonStyle = (isActive: boolean): React.CSSProperties => ({
    padding: '0.75rem 1.5rem',
    borderRadius: '12px',
    border: 'none',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    backgroundColor: isActive ? 'var(--le-primary)' : 'var(--le-card-bg)',
    color: isActive ? '#fff' : 'var(--le-text-secondary)',
    boxShadow: isActive ? '0 4px 12px rgba(0, 0, 0, 0.1)' : 'none',
  });

  const contentGridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '2rem',
    marginBottom: '3rem',
  };

  const cardStyle: React.CSSProperties = {
    backgroundColor: 'var(--le-card-bg)',
    borderRadius: '16px',
    padding: '2rem',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
    border: '1px solid var(--le-border)',
  };

  const sectionTitleStyle: React.CSSProperties = {
    fontSize: '1.125rem',
    fontWeight: '700',
    color: 'var(--le-text-primary)',
    marginBottom: '1.5rem',
    paddingBottom: '1rem',
    borderBottom: '2px solid var(--le-border)',
  };

  const inputGroupStyle: React.CSSProperties = {
    marginBottom: '1.5rem',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '0.875rem',
    fontWeight: '600',
    color: 'var(--le-text-primary)',
    marginBottom: '0.5rem',
  };

  const sliderStyle: React.CSSProperties = {
    width: '100%',
    height: '6px',
    borderRadius: '3px',
    background: 'var(--le-border)',
    outline: 'none',
    WebkitAppearance: 'none',
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.75rem',
    borderRadius: '8px',
    border: '1px solid var(--le-border)',
    fontSize: '1rem',
    color: 'var(--le-text-primary)',
    backgroundColor: 'var(--le-bg)',
    transition: 'border-color 0.3s ease',
  };

  const selectStyle: React.CSSProperties = {
    ...inputStyle,
  };

  const valueDisplayStyle: React.CSSProperties = {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: 'var(--le-primary)',
    marginTop: '0.5rem',
  };

  const resultsContainerStyle: React.CSSProperties = {
    ...cardStyle,
  };

  const resultItemStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: '1rem',
    marginBottom: '1rem',
    borderBottom: '1px solid var(--le-border)',
  };

  const resultLabelStyle: React.CSSProperties = {
    color: 'var(--le-text-secondary)',
    fontSize: '0.95rem',
  };

  const resultValueStyle: React.CSSProperties = {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: 'var(--le-primary)',
  };

  const ctaButtonStyle: React.CSSProperties = {
    width: '100%',
    padding: '1rem',
    borderRadius: '12px',
    border: 'none',
    backgroundColor: 'var(--le-primary)',
    color: '#fff',
    fontSize: '1rem',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    marginTop: '1.5rem',
  };

  const chartContainerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '2rem 0',
    minHeight: '250px',
  };

  const chartStyle: React.CSSProperties = {
    width: '200px',
    height: '200px',
    borderRadius: '50%',
    background: `conic-gradient(
      var(--le-primary) 0% ${breakdownPercents.principal}%,
      var(--le-accent) ${breakdownPercents.principal}% ${breakdownPercents.principal + breakdownPercents.taxes}%,
      var(--le-warning) ${breakdownPercents.principal + breakdownPercents.taxes}% ${breakdownPercents.principal + breakdownPercents.taxes + breakdownPercents.insurance}%,
      var(--le-secondary) ${breakdownPercents.principal + breakdownPercents.taxes + breakdownPercents.insurance}% ${breakdownPercents.principal + breakdownPercents.taxes + breakdownPercents.insurance + breakdownPercents.pmi}%,
      var(--le-success) ${breakdownPercents.principal + breakdownPercents.taxes + breakdownPercents.insurance + breakdownPercents.pmi}% 100%
    )`,
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  };

  const legendStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '1rem',
    marginTop: '1.5rem',
  };

  const legendItemStyle = (color: string): React.CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.875rem',
  });

  const legendColorStyle = (color: string): React.CSSProperties => ({
    width: '12px',
    height: '12px',
    borderRadius: '2px',
    backgroundColor: color,
  });

  const amortizationTableStyle: React.CSSProperties = {
    width: '100%',
    marginTop: '1.5rem',
    borderCollapse: 'collapse',
  };

  const tableHeaderStyle: React.CSSProperties = {
    backgroundColor: 'var(--le-bg)',
    padding: '0.75rem',
    textAlign: 'left',
    fontSize: '0.875rem',
    fontWeight: '700',
    color: 'var(--le-text-primary)',
    borderBottom: '2px solid var(--le-border)',
  };

  const tableCellStyle: React.CSSProperties = {
    padding: '0.75rem',
    borderBottom: '1px solid var(--le-border)',
    fontSize: '0.875rem',
    color: 'var(--le-text-secondary)',
  };

  const toggleButtonStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.75rem',
    marginTop: '1rem',
    borderRadius: '8px',
    border: '2px solid var(--le-primary)',
    backgroundColor: 'transparent',
    color: 'var(--le-primary)',
    fontSize: '0.95rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  };

  const modalOverlayStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '1rem',
  };

  const modalStyle: React.CSSProperties = {
    backgroundColor: 'var(--le-card-bg)',
    borderRadius: '16px',
    padding: '2rem',
    maxWidth: '500px',
    width: '100%',
    boxShadow: '0 20px 25px rgba(0, 0, 0, 0.15)',
  };

  const formTitleStyle: React.CSSProperties = {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: 'var(--le-text-primary)',
    marginBottom: '0.5rem',
  };

  const formSubtitleStyle: React.CSSProperties = {
    fontSize: '0.95rem',
    color: 'var(--le-text-secondary)',
    marginBottom: '1.5rem',
  };

  const trustSignalsStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    fontSize: '0.85rem',
    color: 'var(--le-text-secondary)',
    marginTop: '1.5rem',
    paddingTop: '1.5rem',
    borderTop: '1px solid var(--le-border)',
  };

  const closeButtonStyle: React.CSSProperties = {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    background: 'none',
    border: 'none',
    fontSize: '1.5rem',
    cursor: 'pointer',
    color: 'var(--le-text-secondary)',
  };

  return (
    <div style={containerStyle}>
      <div style={wrapperStyle}>
        <div style={headerStyle}>
          <h1 style={titleStyle}>Mortgage Calculator & Affordability Tool</h1>
          <p style={subtitleStyle}>
            Discover how much home you can afford and what your monthly payments will be. Get instant insights and connect with a licensed lender.
          </p>
        </div>

        <div style={tabsContainerStyle}>
          <button
            style={tabButtonStyle(activeTab === 'monthly')}
            onClick={() => setActiveTab('monthly')}
          >
            💰 Monthly Payment
          </button>
          <button
            style={tabButtonStyle(activeTab === 'affordability')}
            onClick={() => setActiveTab('affordability')}
          >
            🏠 What Can I Afford?
          </button>
          <button
            style={tabButtonStyle(activeTab === 'refinance')}
            onClick={() => setActiveTab('refinance')}
          >
            ✨ Refinance Analysis
          </button>
        </div>

        {/* Monthly Payment Calculator */}
        {activeTab === 'monthly' && (
          <div style={contentGridStyle}>
            <div>
              <div style={cardStyle}>
                <h2 style={sectionTitleStyle}>Home Details</h2>

                <div style={inputGroupStyle}>
                  <label style={labelStyle}>Home Price</label>
                  <input
                    type="range"
                    min="50000"
                    max="2000000"
                    step="10000"
                    value={homePrice}
                    onChange={(e) => setHomePrice(Number(e.target.value))}
                    style={sliderStyle}
                  />
                  <div style={valueDisplayStyle}>${homePrice.toLocaleString()}</div>
                </div>

                <div style={inputGroupStyle}>
                  <label style={labelStyle}>Down Payment</label>
                  <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <button
                      onClick={() => setDownPaymentType('percent')}
                      style={{
                        flex: 1,
                        padding: '0.5rem',
                        borderRadius: '8px',
                        border: downPaymentType === 'percent' ? '2px solid var(--le-primary)' : '1px solid var(--le-border)',
                        backgroundColor: downPaymentType === 'percent' ? 'var(--le-primary)' : 'var(--le-bg)',
                        color: downPaymentType === 'percent' ? '#fff' : 'var(--le-text-secondary)',
                        cursor: 'pointer',
                        fontSize: '0.85rem',
                        fontWeight: '600',
                      }}
                    >
                      %
                    </button>
                    <button
                      onClick={() => setDownPaymentType('dollar')}
                      style={{
                        flex: 1,
                        padding: '0.5rem',
                        borderRadius: '8px',
                        border: downPaymentType === 'dollar' ? '2px solid var(--le-primary)' : '1px solid var(--le-border)',
                        backgroundColor: downPaymentType === 'dollar' ? 'var(--le-primary)' : 'var(--le-bg)',
                        color: downPaymentType === 'dollar' ? '#fff' : 'var(--le-text-secondary)',
                        cursor: 'pointer',
                        fontSize: '0.85rem',
                        fontWeight: '600',
                      }}
                    >
                      $
                    </button>
                  </div>
                  <input
                    type="range"
                    min={downPaymentType === 'percent' ? '0' : '0'}
                    max={downPaymentType === 'percent' ? '50' : '500000'}
                    step={downPaymentType === 'percent' ? '1' : '10000'}
                    value={downPaymentValue}
                    onChange={(e) => setDownPaymentValue(Number(e.target.value))}
                    style={sliderStyle}
                  />
                  <div style={valueDisplayStyle}>
                    {downPaymentType === 'percent'
                      ? `${downPaymentValue.toFixed(1)}% (${downPaymentDollar.toLocaleString('en-US', { maximumFractionDigits: 0 })})`
                      : `${downPaymentValue.toLocaleString()}`
                    }
                  </div>
                </div>

                <div style={inputGroupStyle}>
                  <label style={labelStyle}>Interest Rate (%)</label>
                  <input
                    type="range"
                    min="2"
                    max="12"
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    style={sliderStyle}
                  />
                  <div style={valueDisplayStyle}>{interestRate.toFixed(2)}%</div>
                </div>

                <div style={inputGroupStyle}>
                  <label style={labelStyle}>Loan Term</label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                    {[15, 20, 30].map((term) => (
                      <button
                        key={term}
                        onClick={() => setLoanTerm(term)}
                        style={{
                          padding: '0.75rem',
                          borderRadius: '8px',
                          border: loanTerm === term ? '2px solid var(--le-primary)' : '1px solid var(--le-border)',
                          backgroundColor: loanTerm === term ? 'var(--le-primary)' : 'var(--le-bg)',
                          color: loanTerm === term ? '#fff' : 'var(--le-text-secondary)',
                          cursor: 'pointer',
                          fontWeight: '600',
                        }}
                      >
                        {term} yr
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div style={{ ...cardStyle, marginTop: '1.5rem' }}>
                <h2 style={sectionTitleStyle}>Additional Costs</h2>

                <div style={inputGroupStyle}>
                  <label style={labelStyle}>Property Tax Rate (% annually)</label>
                  <input
                    type="number"
                    min="0"
                    max="5"
                    step="0.1"
                    value={propertyTaxRate}
                    onChange={(e) => setPropertyTaxRate(Number(e.target.value))}
                    style={inputStyle}
                  />
                  <div style={{ fontSize: '0.875rem', color: 'var(--le-text-secondary)', marginTop: '0.5rem' }}>
                    Monthly: ${(monthlyPropertyTax).toLocaleString('en-US', { maximumFractionDigits: 0 })}
                  </div>
                </div>

                <div style={inputGroupStyle}>
                  <label style={labelStyle}>Homeowner's Insurance (monthly $)</label>
                  <input
                    type="number"
                    min="0"
                    max="500"
                    step="10"
                    value={homeInsurance}
                    onChange={(e) => setHomeInsurance(Number(e.target.value))}
                    style={inputStyle}
                  />
                </div>

                <div style={inputGroupStyle}>
                  <label style={labelStyle}>HOA Fees (monthly $)</label>
                  <input
                    type="number"
                    min="0"
                    max="1000"
                    step="10"
                    value={hoaFees}
                    onChange={(e) => setHoaFees(Number(e.target.value))}
                    style={inputStyle}
                  />
                </div>

                {needsPMI && (
                  <div style={{
                    padding: '1rem',
                    backgroundColor: 'rgba(255, 193, 7, 0.1)',
                    borderRadius: '8px',
                    borderLeft: '4px solid var(--le-warning)',
                  }}>
                    <div style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--le-text-primary)' }}>
                      PMI Required
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--le-text-secondary)', marginTop: '0.25rem' }}>
                      Down payment is less than 20%. PMI: ${monthlyPMI.toLocaleString('en-US', { maximumFractionDigits: 0 })}/month
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div>
              <div style={resultsContainerStyle}>
                <h2 style={sectionTitleStyle}>Monthly Breakdown</h2>

                <div style={resultItemStyle}>
                  <span style={resultLabelStyle}>Principal & Interest</span>
                  <span style={resultValueStyle}>${monthlyPayment.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
                </div>

                <div style={resultItemStyle}>
                  <span style={resultLabelStyle}>Property Tax</span>
                  <span style={resultValueStyle}>${monthlyPropertyTax.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
                </div>

                <div style={resultItemStyle}>
                  <span style={resultLabelStyle}>Homeowner's Insurance</span>
                  <span style={resultValueStyle}>${monthlyInsurance.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
                </div>

                {monthlyPMI > 0 && (
                  <div style={resultItemStyle}>
                    <span style={resultLabelStyle}>PMI</span>
                    <span style={resultValueStyle}>${monthlyPMI.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
                  </div>
                )}

                {hoaFees > 0 && (
                  <div style={resultItemStyle}>
                    <span style={resultLabelStyle}>HOA Fees</span>
                    <span style={resultValueStyle}>${hoaFees.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
                  </div>
                )}

                <div style={{
                  padding: '1rem',
                  backgroundColor: 'var(--le-bg)',
                  borderRadius: '12px',
                  marginTop: '1.5rem',
                  marginBottom: '1.5rem',
                }}>
                  <div style={{ fontSize: '0.875rem', color: 'var(--le-text-secondary)', marginBottom: '0.5rem' }}>
                    TOTAL MONTHLY PAYMENT
                  </div>
                  <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--le-primary)' }}>
                    ${totalMonthlyPayment.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                  </div>
                </div>

                <div style={chartContainerStyle}>
                  <div>
                    <div style={chartStyle}></div>
                    <div style={legendStyle}>
                      <div style={legendItemStyle('')}>
                        <div style={legendColorStyle('var(--le-primary)')}></div>
                        <span>Principal & Interest ({breakdownPercents.principal.toFixed(0)}%)</span>
                      </div>
                      <div style={legendItemStyle('')}>
                        <div style={legendColorStyle('var(--le-accent)')}></div>
                        <span>Taxes ({breakdownPercents.taxes.toFixed(0)}%)</span>
                      </div>
                      <div style={legendItemStyle('')}>
                        <div style={legendColorStyle('var(--le-warning)')}></div>
                        <span>Insurance ({breakdownPercents.insurance.toFixed(0)}%)</span>
                      </div>
                      {breakdownPercents.pmi > 0 && (
                        <div style={legendItemStyle('')}>
                          <div style={legendColorStyle('var(--le-secondary)')}></div>
                          <span>PMI ({breakdownPercents.pmi.toFixed(0)}%)</span>
                        </div>
                      )}
                      {breakdownPercents.hoa > 0 && (
                        <div style={legendItemStyle('')}>
                          <div style={legendColorStyle('var(--le-success)')}></div>
                          <span>HOA ({breakdownPercents.hoa.toFixed(0)}%)</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <button
                    style={toggleButtonStyle}
                    onClick={() => setShowAmortization(!showAmortization)}
                  >
                    {showAmortization ? 'Hide' : 'Show'} Amortization Schedule (First 5 Years)
                  </button>

                  {showAmortization && (
                    <table style={amortizationTableStyle}>
                      <thead>
                        <tr style={{ backgroundColor: 'var(--le-bg)' }}>
                          <th style={tableHeaderStyle}>Month</th>
                          <th style={tableHeaderStyle}>Payment</th>
                          <th style={tableHeaderStyle}>Principal</th>
                          <th style={tableHeaderStyle}>Interest</th>
                          <th style={tableHeaderStyle}>Balance</th>
                        </tr>
                      </thead>
                      <tbody>
                        {amortization.filter((entry) => entry.month <= 60).map((entry) => (
                          <tr key={entry.month}>
                            <td style={tableCellStyle}>{entry.month}</td>
                            <td style={tableCellStyle}>${entry.payment.toLocaleString('en-US', { maximumFractionDigits: 0 })}</td>
                            <td style={tableCellStyle}>${entry.principal.toLocaleString('en-US', { maximumFractionDigits: 0 })}</td>
                            <td style={tableCellStyle}>${entry.interest.toLocaleString('en-US', { maximumFractionDigits: 0 })}</td>
                            <td style={tableCellStyle}>${entry.balance.toLocaleString('en-US', { maximumFractionDigits: 0 })}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>

                <button
                  style={ctaButtonStyle}
                  onClick={() => setShowLeadForm(true)}
                >
                  See Your Personalized Rate
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Affordability Calculator */}
        {activeTab === 'affordability' && (
          <div style={contentGridStyle}>
            <div>
              <div style={cardStyle}>
                <h2 style={sectionTitleStyle}>Financial Information</h2>

                <div style={inputGroupStyle}>
                  <label style={labelStyle}>Annual Income ($)</label>
                  <input
                    type="range"
                    min="30000"
                    max="500000"
                    step="5000"
                    value={annualIncome}
                    onChange={(e) => setAnnualIncome(Number(e.target.value))}
                    style={sliderStyle}
                  />
                  <div style={valueDisplayStyle}>${annualIncome.toLocaleString()}</div>
                </div>

                <div style={inputGroupStyle}>
                  <label style={labelStyle}>Monthly Debt Obligations ($)</label>
                  <input
                    type="number"
                    min="0"
                    max="5000"
                    step="50"
                    value={monthlyDebts}
                    onChange={(e) => setMonthlyDebts(Number(e.target.value))}
                    style={inputStyle}
                  />
                  <div style={{ fontSize: '0.875rem', color: 'var(--le-text-secondary)', marginTop: '0.25rem' }}>
                    Car payments, student loans, credit cards, etc.
                  </div>
                </div>

                <div style={inputGroupStyle}>
                  <label style={labelStyle}>Down Payment Available ($)</label>
                  <input
                    type="range"
                    min="0"
                    max="500000"
                    step="10000"
                    value={affordableDownPayment}
                    onChange={(e) => setAffordableDownPayment(Number(e.target.value))}
                    style={sliderStyle}
                  />
                  <div style={valueDisplayStyle}>${affordableDownPayment.toLocaleString()}</div>
                </div>

                <div style={inputGroupStyle}>
                  <label style={labelStyle}>Credit Score Range</label>
                  <select
                    value={creditScore}
                    onChange={(e) => setCreditScore(Number(e.target.value))}
                    style={selectStyle}
                  >
                    <option value={580}>Poor (580–619)</option>
                    <option value={650}>Fair (620–679)</option>
                    <option value={700}>Good (680–739)</option>
                    <option value={750}>Excellent (740+)</option>
                  </select>
                </div>

                <div style={inputGroupStyle}>
                  <label style={labelStyle}>Target Debt-to-Income Ratio</label>
                  <select
                    value={targetDTI}
                    onChange={(e) => setTargetDTI(Number(e.target.value))}
                    style={selectStyle}
                  >
                    <option value={0.36}>Conservative (36%)</option>
                    <option value={0.40}>Moderate (40%)</option>
                    <option value={0.43}>Standard (43%) - Most Lenders</option>
                    <option value={0.50}>Aggressive (50%)</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <div style={resultsContainerStyle}>
                <h2 style={sectionTitleStyle}>Affordability Results</h2>

                <div style={{
                  padding: '1.5rem',
                  backgroundColor: 'var(--le-bg)',
                  borderRadius: '12px',
                  marginBottom: '1.5rem',
                }}>
                  <div style={{ fontSize: '0.875rem', color: 'var(--le-text-secondary)', marginBottom: '0.5rem' }}>
                    MAXIMUM HOME PRICE YOU CAN AFFORD
                  </div>
                  <div style={{ fontSize: '2.5rem', fontWeight: '700', color: 'var(--le-primary)' }}>
                    ${affordableMaxHome.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                  </div>
                </div>

                <div style={resultItemStyle}>
                  <span style={resultLabelStyle}>Monthly Income</span>
                  <span style={resultValueStyle}>${monthlyIncome.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
                </div>

                <div style={resultItemStyle}>
                  <span style={resultLabelStyle}>Existing Monthly Debts</span>
                  <span style={resultValueStyle}>${monthlyDebts.toLocaleString()}</span>
                </div>

                <div style={resultItemStyle}>
                  <span style={resultLabelStyle}>Max Housing Payment (DTI {(targetDTI * 100).toFixed(0)}%)</span>
                  <span style={resultValueStyle}>${maxDTIPayment.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
                </div>

                <div style={resultItemStyle}>
                  <span style={resultLabelStyle}>Down Payment</span>
                  <span style={resultValueStyle}>${affordableDownPayment.toLocaleString()}</span>
                </div>

                <div style={resultItemStyle}>
                  <span style={resultLabelStyle}>Credit Score</span>
                  <span style={resultValueStyle}}>
                    {creditScore === 580 && 'Poor'}
                    {creditScore === 650 && 'Fair'}
                    {creditScore === 700 && 'Good'}
                    {creditScore === 750 && 'Excellent'}
                  </span>
                </div>

                <div style={{
                  padding: '1rem',
                  backgroundColor: 'rgba(76, 175, 80, 0.1)',
                  borderRadius: '8px',
                  borderLeft: '4px solid var(--le-success)',
                  marginTop: '1.5rem',
                }}>
                  <div style={{ fontSize: '0.85rem', color: 'var(--le-text-secondary)' }}>
                    Based on your financial profile, you may qualify for a home up to <strong>${affordableMaxHome.toLocaleString('en-US', { maximumFractionDigits: 0 })}</strong>. Get connected with a lender to explore options.
                  </div>
                </div>

                <button
                  style={ctaButtonStyle}
                  onClick={() => setShowLeadForm(true)}
                >
                  Connect with a Lender Today
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Refinance Calculator */}
        {activeTab === 'refinance' && (
          <div style={contentGridStyle}>
            <div>
              <div style={cardStyle}>
                <h2 style={sectionTitleStyle}>Current Loan Details</h2>

                <div style={inputGroupStyle}>
                  <label style={labelStyle}>Current Loan Balance ($)</label>
                  <input
                    type="range"
                    min="50000"
                    max="2000000"
                    step="10000"
                    value={currentBalance}
                    onChange={(e) => setCurrentBalance(Number(e.target.value))}
                    style={sliderStyle}
                  />
                  <div style={valueDisplayStyle}>${currentBalance.toLocaleString()}</div>
                </div>

                <div style={inputGroupStyle}>
                  <label style={labelStyle}>Current Interest Rate (%)</label>
                  <input
                    type="range"
                    min="2"
                    max="12"
                    step="0.1"
                    value={currentRate}
                    onChange={(e) => setCurrentRate(Number(e.target.value))}
                    style={sliderStyle}
                  />
                  <div style={valueDisplayStyle}>{currentRate.toFixed(2)}%</div>
                </div>

                <div style={inputGroupStyle}>
                  <label style={labelStyle}>Remaining Loan Term (years)</label>
                  <input
                    type="number"
                    min="1"
                    max="30"
                    value={remainingTerm}
                    onChange={(e) => setRemainingTerm(Number(e.target.value))}
                    style={inputStyle}
                  />
                </div>
              </div>

              <div style={{ ...cardStyle, marginTop: '1.5rem' }}>
                <h2 style={sectionTitleStyle}>New Refinance Terms</h2>

                <div style={inputGroupStyle}>
                  <label style={labelStyle}>New Interest Rate (%)</label>
                  <input
                    type="range"
                    min="2"
                    max="12"
                    step="0.1"
                    value={newRate}
                    onChange={(e) => setNewRate(Number(e.target.value))}
                    style={sliderStyle}
                  />
                  <div style={valueDisplayStyle}>{newRate.toFixed(2)}%</div>
                </div>

                <div style={inputGroupStyle}>
                  <label style={labelStyle}>Estimated Closing Costs ($)</label>
                  <input
                    type="number"
                    min="0"
                    max="20000"
                    step="100"
                    value={closingCosts}
                    onChange={(e) => setClosingCosts(Number(e.target.value))}
                    style={inputStyle}
                  />
                </div>
              </div>
            </div>

            <div>
              <div style={resultsContainerStyle}>
                <h2 style={sectionTitleStyle}>Refinance Analysis</h2>

                <div style={{
                  padding: '1.5rem',
                  backgroundColor: 'var(--le-bg)',
                  borderRadius: '12px',
                  marginBottom: '1.5rem',
                }}>
                  <div style={{ fontSize: '0.875rem', color: 'var(--le-text-secondary)', marginBottom: '0.5rem' }}>
                    MONTHLY SAVINGS
                  </div>
                  <div style={{ fontSize: '2.5rem', fontWeight: '700', color: monthlySavings > 0 ? 'var(--le-success)' : '#ff6b6b' }}>
                    ${Math.abs(monthlySavings).toLocaleString('en-US', { maximumFractionDigits: 0 })}{monthlySavings < 0 ? ' (increase)' : ''}
                  </div>
                </div>

                <div style={resultItemStyle}>
                  <span style={resultLabelStyle}>Current Monthly Payment</span>
                  <span style={resultValueStyle}>${currentMonthlyPayment.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
                </div>

                <div style={resultItemStyle}>
                  <span style={resultLabelStyle}>New Monthly Payment</span>
                  <span style={resultValueStyle}>${newMonthlyPayment.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
                </div>

                <div style={resultItemStyle}>
                  <span style={resultLabelStyle}>Closing Costs</span>
                  <span style={resultValueStyle}>${closingCosts.toLocaleString()}</span>
                </div>

                <div style={resultItemStyle}>
                  <span style={resultLabelStyle}>Break-Even Point</span>
                  <span style={resultValueStyle}}>
                    {breakEvenMonths > 0
                      ? `${breakEvenMonths} months (${(breakEvenMonths / 12).toFixed(1)} years)`
                      : monthlySavings > 0 ? 'Immediate' : 'N/A'
                    }
                  </span>
                </div>

                <div style={{
                  padding: '1rem',
                  backgroundColor: monthlySavings > 0
                    ? 'rgba(76, 175, 80, 0.1)'
                    : 'rgba(255, 152, 0, 0.1)',
                  borderRadius: '8px',
                  borderLeft: `4px solid ${monthlySavings > 0 ? 'var(--le-success)' : 'var(--le-warning)'}`,
                  marginTop: '1.5rem',
                }}>
                  <div style={{ fontSize: '0.85rem', color: 'var(--le-text-secondary)' }}>
                    {monthlySavings > 0
                      ? `Refinancing could save you $${(monthlySavings * 12).toLocaleString('en-US', { maximumFractionDigits: 0 })} annually. You'll break even in ${breakEvenMonths} months.`
                      : 'Your current rate is competitive. Refinancing may not save you money right now.'}
                  </div>
                </div>

                <button
                  style={ctaButtonStyle}
                  onClick={() => setShowLeadForm(true)}
                >
                  Explore Refinance Options
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Lead Capture Modal */}
      {showLeadForm && (
        <div style={modalOverlayStyle} onClick={() => !formSubmitted && setShowLeadForm(false)}>
          <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
            <button
              style={closeButtonStyle}
              onClick={() => !formSubmitted && setShowLeadForm(false)}
            >
              ✕
            </button>

            {!formSubmitted ? (
              <>
                <h2 style={formTitleStyle}>See Your Personalized Rate</h2>
                <p style={formSubtitleStyle}>
                  Connect with our licensed lender partners to get a rate tailored to your financial profile.
                </p>

                <form onSubmit={handleFormSubmit}>
                  <div style={inputGroupStyle}>
                    <label style={labelStyle}>Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleFormChange}
                      placeholder="John Smith"
                      style={inputStyle}
                      required
                    />
                  </div>

                  <div style={inputGroupStyle}>
                    <label style={labelStyle}>Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleFormChange}
                      placeholder="you@example.com"
                      style={inputStyle}
                      required
                    />
                  </div>

                  <div style={inputGroupStyle}>
                    <label style={labelStyle}>Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleFormChange}
                      placeholder="(555) 123-4567"
                      style={inputStyle}
                      required
                    />
                  </div>

                  <div style={{ ...inputGroupStyle, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <input
                      type="checkbox"
                      name="workingWithAgent"
                      checked={formData.workingWithAgent}
                      onChange={handleFormChange}
                      id="agent-checkbox"
                      style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                    />
                    <label htmlFor="agent-checkbox" style={{ ...labelStyle, margin: 0, cursor: 'pointer' }}>
                      I'm working with a real estate agent
                    </label>
                  </div>

                  {formError && (
                    <div style={{
                      padding: '0.75rem',
                      backgroundColor: 'rgba(244, 67, 54, 0.1)',
                      borderRadius: '8px',
                      borderLeft: '4px solid #f44336',
                      marginBottom: '1rem',
                    }}>
                      <div style={{ fontSize: '0.875rem', color: '#f44336' }}>{formError}</div>
                    </div>
                  )}

                  <button
                    type="submit"
                    style={{
                      ...ctaButtonStyle,
                      marginTop: '1.5rem',
                    }}
                  >
                    Get My Rate Estimate
                  </button>
                </form>

                <div style={trustSignalsStyle}>
                  <div>✓ Free, no obligation</div>
                  <div>✓ Your info is secure & encrypted</div>
                  <div>✓ Licensed lender partners only</div>
                </div>
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✓</div>
                <h3 style={{ ...formTitleStyle, marginBottom: '0.5rem' }}>Thank You!</h3>
                <p style={{ color: 'var(--le-text-secondary)', marginBottom: '1rem' }}>
                  We've received your information. A lender will contact you shortly with your personalized rate estimate.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
