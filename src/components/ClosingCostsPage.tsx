'use client';

import React, { useState, useMemo } from 'react';

export default function ClosingCostsPage() {
  const [homePrice, setHomePrice] = useState<number>(350000);
  const [loanAmount, setLoanAmount] = useState<number>(280000);
  const [state, setState] = useState<string>('CA');
  const [activeTab, setActiveTab] = useState<'buyer' | 'seller'>('buyer');
  const [showCalculator, setShowCalculator] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [leadCaptured, setLeadCaptured] = useState<boolean>(false);

  const downPayment = homePrice - loanAmount;
  const downPaymentPercent = homePrice > 0 ? ((downPayment / homePrice) * 100).toFixed(1) : 0;

  const buyerCosts = useMemo(() => {
    return {
      originationFee: loanAmount * 0.01,
      appraisalFee: 500,
      creditReportFee: 50,
      inspectionFee: 400,
      titleSearch: 150,
      titleInsurance: homePrice * 0.0035,
      homeowners: (homePrice / 12) * 0.004,
      propertyTaxes: (homePrice / 12) * 0.012,
      recording: 200,
      prepaidInterest: (loanAmount * 0.06) / 365,
      escrow: (homePrice * 0.02) / 2,
      floodInsurance: 150,
    };
  }, [homePrice, loanAmount]);

  const sellerCosts = useMemo(() => {
    return {
      agentCommission: homePrice * 0.06,
      titleInsurance: homePrice * 0.0035,
      transferTax: homePrice * 0.01,
      recordingFees: 300,
      propertySurvey: 400,
      homeRepairs: homePrice * 0.02,
      HOAPayoff: 500,
      closingAttorney: 300,
    };
  }, [homePrice]);

  const stateTransferTaxRates: Record<string, number> = {
    CA: 0.0,
    NY: 0.04,
    TX: 0.0,
    FL: 0.007,
    PA: 0.02,
    IL: 0.01,
    OH: 0.01,
    MI: 0.015,
  };

  const adjustedTransferTax = homePrice * (stateTransferTaxRates[state] || 0.01);

  const totalBuyerCosts = Object.values(buyerCosts).reduce((a, b) => a + b, 0);
  const totalSellerCosts = Object.values(sellerCosts).reduce((a, b) => a + b, 0) + adjustedTransferTax;

  const buyerCostPercent = homePrice > 0 ? ((totalBuyerCosts / homePrice) * 100).toFixed(2) : 0;
  const sellerCostPercent = homePrice > 0 ? ((totalSellerCosts / homePrice) * 100).toFixed(2) : 0;

  const handleLeadCapture = () => {
    if (name && email) {
      console.log('Lead captured:', { name, email, homePrice, loanAmount, state });
      setLeadCaptured(true);
      setTimeout(() => {
        setLeadCaptured(false);
        setName('');
        setEmail('');
      }, 3000);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const buyerItems = [
    { label: 'Loan Origination Fee', value: buyerCosts.originationFee, percent: '0.5\u20131.5%' },
    { label: 'Appraisal Fee', value: buyerCosts.appraisalFee, percent: '0.1\u20130.3%' },
    { label: 'Credit Report Fee', value: buyerCosts.creditReportFee, percent: 'Flat' },
    { label: 'Home Inspection', value: buyerCosts.inspectionFee, percent: '0.1\u20130.3%' },
    { label: 'Title Search & Insurance', value: buyerCosts.titleSearch + buyerCosts.titleInsurance, percent: '0.5\u20131.0%' },
    { label: 'Homeowners Insurance (Year)', value: buyerCosts.homeowners, percent: '0.4\u20130.6%' },
    { label: 'Property Taxes (Year)', value: buyerCosts.propertyTaxes, percent: '0.8\u20131.5%' },
    { label: 'Recording Fees', value: buyerCosts.recording, percent: 'Flat' },
    { label: 'Prepaid Interest', value: buyerCosts.prepaidInterest, percent: 'Variable' },
    { label: 'Escrow Deposit', value: buyerCosts.escrow, percent: '1\u20132%' },
    { label: 'Flood Insurance', value: buyerCosts.floodInsurance, percent: 'Varies' },
    { label: 'Attorney Fees (if applicable)', value: 0, percent: 'Varies' },
  ];

  const sellerItems = [
    { label: 'Real Estate Agent Commission', value: sellerCosts.agentCommission, percent: '5\u20136%' },
    { label: 'Title Insurance', value: sellerCosts.titleInsurance, percent: '0.5\u20131.0%' },
    { label: 'Transfer Tax', value: adjustedTransferTax, percent: 'State-based' },
    { label: 'Recording Fees', value: sellerCosts.recordingFees, percent: 'Flat' },
    { label: 'Property Survey', value: sellerCosts.propertySurvey, percent: 'Varies' },
    { label: 'Home Repairs & Inspections', value: sellerCosts.homeRepairs, percent: '1\u20132%' },
    { label: 'HOA Payoff', value: sellerCosts.HOAPayoff, percent: 'Varies' },
    { label: 'Closing Attorney Fees', value: sellerCosts.closingAttorney, percent: 'Flat' },
  ];

  return (
    <div style={{ backgroundColor: 'var(--le-bg)', color: 'var(--le-text)' }}>
      {/* Hero Section */}
      <section style={{
        backgroundColor: 'var(--le-primary)',
        color: 'white',
        padding: '80px 20px',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h1 style={{
            fontSize: '48px',
            fontWeight: '700',
            marginBottom: '20px',
            lineHeight: '1.2',
          }}>
            Understanding Closing Costs
          </h1>
          <p style={{
            fontSize: '20px',
            marginBottom: '30px',
            lineHeight: '1.6',
            opacity: '0.95',
          }}>
            Closing costs don\u2019t have to be a mystery. Learn what you\u2019ll pay, why you\u2019ll pay it, and how to reduce your burden at the closing table.
          </p>
          <button
            onClick={() => setShowCalculator(true)}
            style={{
              backgroundColor: 'var(--le-accent)',
              color: 'white',
              border: 'none',
              padding: '14px 40px',
              fontSize: '16px',
              fontWeight: '600',
              borderRadius: '6px',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease',
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--le-primary-hover)'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'var(--le-accent)'}
          >
            Calculate Your Closing Costs
          </button>
        </div>
      </section>

      {/* Calculator Modal */}
      {showCalculator && (
        <div style={{
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
          padding: '20px',
        }}>
          <div style={{
            backgroundColor: 'var(--le-bg-card)',
            borderRadius: '8px',
            padding: '40px',
            maxWidth: '600px',
            width: '100%',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
              <h2 style={{ fontSize: '28px', fontWeight: '700', margin: 0 }}>Closing Costs Calculator</h2>
              <button
                onClick={() => setShowCalculator(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '24px',
                  cursor: 'pointer',
                  color: 'var(--le-text-secondary)',
                }}
              >
                ✕
              </button>
            </div>

            <div style={{ marginBottom: '25px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600' }}>
                Home Price
              </label>
              <input
                type="number"
                value={homePrice}
                onChange={(e) => setHomePrice(Number(e.target.value))}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid var(--le-border)',
                  borderRadius: '6px',
                  fontSize: '16px',
                  boxSizing: 'border-box',
                }}
              />
              <div style={{ marginTop: '8px', fontSize: '14px', color: 'var(--le-text-secondary)' }}>
                {formatCurrency(homePrice)}
              </div>
            </div>

            <div style={{ marginBottom: '25px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600' }}>
                Loan Amount
              </label>
              <input
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid var(--le-border)',
                  borderRadius: '6px',
                  fontSize: '16px',
                  boxSizing: 'border-box',
                }}
              />
              <div style={{ marginTop: '8px', fontSize: '14px', color: 'var(--le-text-secondary)' }}>
                Down Payment: {formatCurrency(downPayment)} ({downPaymentPercent}%)
              </div>
            </div>

            <div style={{ marginBottom: '25px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600' }}>
                State
              </label>
              <select
                value={state}
                onChange={(e) => setState(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid var(--le-border)',
                  borderRadius: '6px',
                  fontSize: '16px',
                  boxSizing: 'border-box',
                }}
              >
                <option value="CA">California</option>
                <option value="NY">New York</option>
                <option value="TX">Texas</option>
                <option value="FL">Florida</option>
                <option value="PA">Pennsylvania</option>
                <option value="IL">Illinois</option>
                <option value="OH">Ohio</option>
                <option value="MI">Michigan</option>
              </select>
            </div>

            <div style={{
              backgroundColor: 'var(--le-bg)',
              padding: '20px',
              borderRadius: '6px',
              marginBottom: '25px',
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <p style={{ fontSize: '14px', color: 'var(--le-text-secondary)', margin: '0 0 8px 0' }}>
                    Buyer Closing Costs
                  </p>
                  <p style={{ fontSize: '24px', fontWeight: '700', margin: 0, color: 'var(--le-accent)' }}>
                    {formatCurrency(totalBuyerCosts)}
                  </p>
                  <p style={{ fontSize: '12px', color: 'var(--le-text-secondary)', margin: '4px 0 0 0' }}>
                    {buyerCostPercent}% of home price
                  </p>
                </div>
                <div>
                  <p style={{ fontSize: '14px', color: 'var(--le-text-secondary)', margin: '0 0 8px 0' }}>
                    Seller Closing Costs
                  </p>
                  <p style={{ fontSize: '24px', fontWeight: '700', margin: 0, color: 'var(--le-warning)' }}>
                    {formatCurrency(totalSellerCosts)}
                  </p>
                  <p style={{ fontSize: '12px', color: 'var(--le-text-secondary)', margin: '4px 0 0 0' }}>
                    {sellerCostPercent}% of home price
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowCalculator(false)}
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: 'var(--le-primary)',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
              }}
            >
              View Breakdown
            </button>
          </div>
        </div>
      )}

      {/* Cost Breakdown Tabs */}
      <section style={{ padding: '60px 20px', backgroundColor: 'var(--le-bg)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '36px',
            fontWeight: '700',
            marginBottom: '40px',
            textAlign: 'center',
          }}>
            Itemized Cost Breakdown
          </h2>

          {/* Tab Buttons */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '40px' }}>
            <button
              onClick={() => setActiveTab('buyer')}
              style={{
                padding: '12px 30px',
                fontSize: '16px',
                fontWeight: '600',
                border: 'none',
                borderRadius: '6px',
                backgroundColor: activeTab === 'buyer' ? 'var(--le-primary)' : 'var(--le-bg-card)',
                color: activeTab === 'buyer' ? 'white' : 'var(--le-text)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
            >
              Buyer Costs
            </button>
            <button
              onClick={() => setActiveTab('seller')}
              style={{
                padding: '12px 30px',
                fontSize: '16px',
                fontWeight: '600',
                border: 'none',
                borderRadius: '6px',
                backgroundColor: activeTab === 'seller' ? 'var(--le-primary)' : 'var(--le-bg-card)',
                color: activeTab === 'seller' ? 'white' : 'var(--le-text)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
            >
              Seller Costs
            </button>
          </div>

          {/* Buyer Costs Table */}
          {activeTab === 'buyer' && (
            <div style={{
              backgroundColor: 'var(--le-bg-card)',
              borderRadius: '8px',
              overflow: 'hidden',
              border: '1px solid var(--le-border)',
            }}>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ backgroundColor: 'var(--le-primary)' }}>
                      <th style={{
                        padding: '16px',
                        textAlign: 'left',
                        fontWeight: '700',
                        color: 'white',
                        fontSize: '14px',
                      }}>
                        Cost Item
                      </th>
                      <th style={{
                        padding: '16px',
                        textAlign: 'right',
                        fontWeight: '700',
                        color: 'white',
                        fontSize: '14px',
                      }}>
                        Typical %
                      </th>
                      <th style={{
                        padding: '16px',
                        textAlign: 'right',
                        fontWeight: '700',
                        color: 'white',
                        fontSize: '14px',
                      }}>
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {buyerItems.map((item, idx) => (
                      <tr
                        key={idx}
                        style={{
                          borderBottom: idx < buyerItems.length - 1 ? '1px solid var(--le-border)' : 'none',
                          backgroundColor: idx % 2 === 0 ? 'transparent' : 'var(--le-bg)',
                        }}
                      >
                        <td style={{ padding: '16px', fontSize: '14px' }}>{item.label}</td>
                        <td style={{ padding: '16px', textAlign: 'right', fontSize: '14px', color: 'var(--le-text-secondary)' }}>
                          {item.percent}
                        </td>
                        <td style={{ padding: '16px', textAlign: 'right', fontSize: '14px', fontWeight: '600' }}>
                          {formatCurrency(item.value)}
                        </td>
                      </tr>
                    ))}
                    <tr style={{ backgroundColor: 'var(--le-primary)', fontWeight: '700' }}>
                      <td style={{ padding: '16px', color: 'white' }}>Total Buyer Closing Costs</td>
                      <td style={{ padding: '16px', textAlign: 'right', color: 'white' }}>
                        {buyerCostPercent}%
                      </td>
                      <td style={{ padding: '16px', textAlign: 'right', color: 'white', fontSize: '18px' }}>
                        {formatCurrency(totalBuyerCosts)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Seller Costs Table */}
          {activeTab === 'seller' && (
            <div style={{
              backgroundColor: 'var(--le-bg-card)',
              borderRadius: '8px',
              overflow: 'hidden',
              border: '1px solid var(--le-border)',
            }}>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ backgroundColor: 'var(--le-primary)' }}>
                      <th style={{
                        padding: '16px',
                        textAlign: 'left',
                        fontWeight: '700',
                        color: 'white',
                        fontSize: '14px',
                      }}>
                        Cost Item
                      </th>
                      <th style={{
                        padding: '16px',
                        textAlign: 'right',
                        fontWeight: '700',
                        color: 'white',
                        fontSize: '14px',
                      }}>
                        Typical %
                      </th>
                      <th style={{
                        padding: '16px',
                        textAlign: 'right',
                        fontWeight: '700',
                        color: 'white',
                        fontSize: '14px',
                      }}>
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sellerItems.map((item, idx) => (
                      <tr
                        key={idx}
                        style={{
                          borderBottom: idx < sellerItems.length - 1 ? '1px solid var(--le-border)' : 'none',
                          backgroundColor: idx % 2 === 0 ? 'transparent' : 'var(--le-bg)',
                        }}
                      >
                        <td style={{ padding: '16px', fontSize: '14px' }}>{item.label}</td>
                        <td style={{ padding: '16px', textAlign: 'right', fontSize: '14px', color: 'var(--le-text-secondary)' }}>
                          {item.percent}
                        </td>
                        <td style={{ padding: '16px', textAlign: 'right', fontSize: '14px', fontWeight: '600' }}>
                          {formatCurrency(item.value)}
                        </td>
                      </tr>
                    ))}
                    <tr style={{ backgroundColor: 'var(--le-primary)', fontWeight: '700' }}>
                      <td style={{ padding: '16px', color: 'white' }}>Total Seller Closing Costs</td>
                      <td style={{ padding: '16px', textAlign: 'right', color: 'white' }}>
                        {sellerCostPercent}%
                      </td>
                      <td style={{ padding: '16px', textAlign: 'right', color: 'white', fontSize: '18px' }}>
                        {formatCurrency(totalSellerCosts)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Who Pays What Comparison */}
      <section style={{ padding: '60px 20px', backgroundColor: 'var(--le-bg-card)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '36px',
            fontWeight: '700',
            marginBottom: '40px',
            textAlign: 'center',
          }}>
            Who Pays What?
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            {/* Buyer Column */}
            <div style={{
              backgroundColor: 'var(--le-bg)',
              padding: '30px',
              borderRadius: '8px',
              border: '2px solid var(--le-primary)',
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '20px',
              }}>
                <span style={{ fontSize: '32px' }}>👤</span>
                <h3 style={{ fontSize: '22px', fontWeight: '700', margin: 0 }}>Buyer Typically Pays</h3>
              </div>
              <ul style={{ margin: 0, paddingLeft: '20px', listStyle: 'none' }}>
                {[
                  'Loan origination & discount points',
                  'Appraisal & inspections',
                  'Title search & insurance',
                  'Homeowners & flood insurance (year 1)',
                  'Property taxes (prorated)',
                  'Prepaid interest & escrow',
                  'Recording & attorney fees',
                ].map((item, idx) => (
                  <li
                    key={idx}
                    style={{
                      padding: '10px 0',
                      borderBottom: idx < 6 ? '1px solid var(--le-border)' : 'none',
                      fontSize: '15px',
                      lineHeight: '1.5',
                    }}
                  >
                    <span style={{ color: 'var(--le-primary)', marginRight: '10px', fontWeight: '700' }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Seller Column */}
            <div style={{
              backgroundColor: 'var(--le-bg)',
              padding: '30px',
              borderRadius: '8px',
              border: '2px solid var(--le-warning)',
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '20px',
              }}>
                <span style={{ fontSize: '32px' }}>🏠</span>
                <h3 style={{ fontSize: '22px', fontWeight: '700', margin: 0 }}>Seller Typically Pays</h3>
              </div>
              <ul style={{ margin: 0, paddingLeft: '20px', listStyle: 'none' }}>
                {[
                  'Real estate agent commissions (5\u20136%)',
                  'Title insurance & transfer taxes',
                  'Property survey & inspections',
                  'Home repairs & preparation',
                  'HOA payoff & recording fees',
                  'Prorated property taxes',
                  'Closing attorney & escrow',
                ].map((item, idx) => (
                  <li
                    key={idx}
                    style={{
                      padding: '10px 0',
                      borderBottom: idx < 6 ? '1px solid var(--le-border)' : 'none',
                      fontSize: '15px',
                      lineHeight: '1.5',
                    }}
                  >
                    <span style={{ color: 'var(--le-warning)', marginRight: '10px', fontWeight: '700' }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Negotiable Costs */}
            <div style={{
              backgroundColor: 'var(--le-bg)',
              padding: '30px',
              borderRadius: '8px',
              border: '2px solid var(--le-success)',
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '20px',
              }}>
                <span style={{ fontSize: '32px' }}>💬</span>
                <h3 style={{ fontSize: '22px', fontWeight: '700', margin: 0 }}>Negotiable</h3>
              </div>
              <ul style={{ margin: 0, paddingLeft: '20px', listStyle: 'none' }}>
                {[
                  'Appraisal fees',
                  'Title insurance costs',
                  'Lender credits (buyer)',
                  'Seller concessions',
                  'Property inspections',
                  'Closing attorney fees',
                  'Survey & repair costs',
                ].map((item, idx) => (
                  <li
                    key={idx}
                    style={{
                      padding: '10px 0',
                      borderBottom: idx < 6 ? '1px solid var(--le-border)' : 'none',
                      fontSize: '15px',
                      lineHeight: '1.5',
                    }}
                  >
                    <span style={{ color: 'var(--le-success)', marginRight: '10px', fontWeight: '700' }}>↔</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Ways to Reduce Costs */}
      <section style={{ padding: '60px 20px', backgroundColor: 'var(--le-bg)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '36px',
            fontWeight: '700',
            marginBottom: '40px',
            textAlign: 'center',
          }}>
            10 Ways to Reduce Your Closing Costs
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '25px',
          }}>
            {[
              {
                num: '1',
                title: 'Shop Around for Rates',
                desc: 'Get quotes from multiple lenders. A 0.5% difference in rates can save you thousands.',
              },
              {
                num: '2',
                title: 'Negotiate Lender Credits',
                desc: 'Ask your lender about credits to offset closing costs in exchange for a slightly higher rate.',
              },
              {
                num: '3',
                title: 'Request Seller Concessions',
                desc: 'Negotiate for the seller to cover some costs. In a buyer\u2019s market, this is very achievable.',
              },
              {
                num: '4',
                title: 'Shop Title Companies',
                desc: 'Title insurance rates vary significantly. Compare providers to find the best price.',
              },
              {
                num: '5',
                title: 'Avoid PMI If Possible',
                desc: 'Put down at least 20% to avoid private mortgage insurance, saving ~1% annually.',
              },
              {
                num: '6',
                title: 'Get on Loan Programs',
                desc: 'First-time buyer programs and state-specific grants can offset thousands in costs.',
              },
              {
                num: '7',
                title: 'Eliminate Unnecessary Inspections',
                desc: 'Skip redundant inspections but keep the home inspection. Many costs are optional.',
              },
              {
                num: '8',
                title: 'Bundle Services',
                desc: 'Some companies offer bundled title, escrow, and settlement services at discounts.',
              },
              {
                num: '9',
                title: 'Roll Costs Into Mortgage',
                desc: 'Ask if you can roll closing costs into your mortgage. Check if rates allow this.',
              },
              {
                num: '10',
                title: 'Negotiate Separately',
                desc: 'Each cost is negotiable. Work with your agent to challenge itemized fees.',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: 'var(--le-bg-card)',
                  padding: '25px',
                  borderRadius: '8px',
                  border: '1px solid var(--le-border)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px',
                  marginBottom: '15px',
                }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    backgroundColor: 'var(--le-primary)',
                    color: 'white',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '700',
                    fontSize: '18px',
                  }}>
                    {item.num}
                  </div>
                  <h3 style={{ fontSize: '18px', fontWeight: '700', margin: 0 }}>{item.title}</h3>
                </div>
                <p style={{
                  fontSize: '14px',
                  lineHeight: '1.6',
                  color: 'var(--le-text-secondary)',
                  margin: 0,
                }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Assistance Programs */}
      <section style={{ padding: '60px 20px', backgroundColor: 'var(--le-bg-card)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '36px',
            fontWeight: '700',
            marginBottom: '40px',
            textAlign: 'center',
          }}>
            Closing Cost Assistance Programs
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '30px',
          }}>
            {[
              {
                title: 'First-Time Homebuyer Programs',
                icon: '🏡',
                items: [
                  'State-specific down payment assistance',
                  'Closing cost grants up to $15,000',
                  'Low-interest loans for closing costs',
                  'Reduced or waived origination fees',
                ],
              },
              {
                title: 'VA Loans & Military Benefits',
                icon: '🎖️',
                items: [
                  'Zero down payment loans',
                  'No closing cost fees (lender-paid)',
                  'VA funding fee reduction',
                  'Seller-paid closing cost concessions',
                ],
              },
              {
                title: 'USDA Rural Loans',
                icon: '🌾',
                items: [
                  'Up to 100% financing available',
                  'Seller can pay closing costs',
                  'Low-to-moderate income limits',
                  'Rural property eligibility',
                ],
              },
              {
                title: 'FHA Loans',
                icon: '📋',
                items: [
                  'Lower down payments (3.5%)',
                  'Seller concessions up to 6%',
                  'Gift funds for down payment',
                  'Lower credit score requirements',
                ],
              },
              {
                title: 'Employer Assistance Programs',
                icon: '💼',
                items: [
                  'Many companies offer down payment help',
                  'Closing cost reimbursement',
                  'Employer relocation packages',
                  'Interest rate buydowns',
                ],
              },
              {
                title: 'Nonprofit & Community Programs',
                icon: '🤝',
                items: [
                  'HUD-approved counseling',
                  'Grant funding opportunities',
                  'Matched savings programs',
                  'Local housing authority grants',
                ],
              },
            ].map((program, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: 'var(--le-bg)',
                  padding: '30px',
                  borderRadius: '8px',
                  border: '1px solid var(--le-border)',
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '20px',
                }}>
                  <span style={{ fontSize: '36px' }}>{program.icon}</span>
                  <h3 style={{ fontSize: '18px', fontWeight: '700', margin: 0 }}>{program.title}</h3>
                </div>
                <ul style={{ margin: 0, paddingLeft: '20px' }}>
                  {program.items.map((item, iIdx) => (
                    <li
                      key={iIdx}
                      style={{
                        fontSize: '14px',
                        lineHeight: '1.6',
                        marginBottom: '8px',
                        color: 'var(--le-text-secondary)',
                      }}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section style={{ padding: '60px 20px', backgroundColor: 'var(--le-bg)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '36px',
            fontWeight: '700',
            marginBottom: '40px',
            textAlign: 'center',
          }}>
            When Are Costs Due?
          </h2>

          <div style={{ position: 'relative' }}>
            {[
              {
                phase: 'Pre-Approval',
                timing: 'Week 1',
                costs: 'Credit report ($50), Application fee ($0\u2013$150)',
              },
              {
                phase: 'Under Contract',
                timing: 'Week 2\u20133',
                costs: 'Home inspection ($300\u2013$500), Appraisal ($400\u2013$700)',
              },
              {
                phase: 'After Appraisal',
                timing: 'Week 3\u20134',
                costs: 'Title search ($150\u2013$200), Survey ($300\u2013$700)',
              },
              {
                phase: 'Final Walk-Through',
                timing: 'Day Before Closing',
                costs: 'Final escrow deposit, Title insurance commitment',
              },
              {
                phase: 'Closing Day',
                timing: 'Scheduled Day',
                costs: 'All remaining funds due, Recording fees, Attorney fees',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '150px 100px 1fr',
                  gap: '30px',
                  paddingBottom: '30px',
                  marginBottom: '30px',
                  borderBottom: idx < 4 ? '1px solid var(--le-border)' : 'none',
                  alignItems: 'start',
                }}
              >
                <div>
                  <h3 style={{
                    fontSize: '16px',
                    fontWeight: '700',
                    margin: '0 0 5px 0',
                    color: 'var(--le-primary)',
                  }}>
                    {item.phase}
                  </h3>
                  <p style={{
                    fontSize: '12px',
                    color: 'var(--le-text-secondary)',
                    margin: 0,
                  }}>
                    {item.timing}
                  </p>
                </div>
                <div style={{
                  width: '60px',
                  height: '60px',
                  backgroundColor: 'var(--le-primary)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '24px',
                  fontWeight: '700',
                }}>
                  {idx + 1}
                </div>
                <div>
                  <p style={{
                    fontSize: '14px',
                    lineHeight: '1.6',
                    color: 'var(--le-text-secondary)',
                    margin: 0,
                  }}>
                    {item.costs}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Negotiation Tips */}
      <section style={{ padding: '60px 20px', backgroundColor: 'var(--le-bg-card)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '36px',
            fontWeight: '700',
            marginBottom: '40px',
            textAlign: 'center',
          }}>
            How to Negotiate Closing Costs
          </h2>

          <div style={{
            backgroundColor: 'var(--le-bg)',
            padding: '30px',
            borderRadius: '8px',
            border: '1px solid var(--le-border)',
          }}>
            {[
              {
                title: 'What\u2019s Negotiable?',
                content: 'Appraisal fees, title insurance, inspections, lender credits, survey costs, attorney fees, and homeowners insurance costs are all negotiable. Agent commissions and loan origination fees have some flexibility.',
              },
              {
                title: 'How to Ask Your Lender',
                content: 'Say: "I\u2019ve received quotes from other lenders with better closing cost terms. Can you match or beat their rates and fees?" Get everything in writing before committing.',
              },
              {
                title: 'How to Ask the Seller',
                content: 'In your offer, include: "Seller to pay up to X% of closing costs" or "Seller to contribute $10,000 toward buyer\u2019s closing costs." This is negotiated before escrow.',
              },
              {
                title: 'How to Shop Title Companies',
                content: 'Call multiple title companies for quotes. Fees vary by 30\u201350%. Ask about bundled escrow & closing services for discounts.',
              },
              {
                title: 'What to Avoid',
                content: 'Don\u2019t ask for too many concessions—sellers may walk away. Focus on the biggest costs first. Know what\u2019s standard in your market.',
              },
            ].map((tip, idx) => (
              <div
                key={idx}
                style={{
                  marginBottom: idx < 4 ? '25px' : 0,
                  paddingBottom: idx < 4 ? '25px' : 0,
                  borderBottom: idx < 4 ? '1px solid var(--le-border)' : 'none',
                }}
              >
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '700',
                  margin: '0 0 12px 0',
                  color: 'var(--le-primary)',
                }}>
                  {tip.title}
                </h3>
                <p style={{
                  fontSize: '15px',
                  lineHeight: '1.6',
                  color: 'var(--le-text-secondary)',
                  margin: 0,
                }}>
                  {tip.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Common Surprises */}
      <section style={{ padding: '60px 20px', backgroundColor: 'var(--le-bg)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '36px',
            fontWeight: '700',
            marginBottom: '40px',
            textAlign: 'center',
          }}>
            Common Closing Cost Surprises
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '25px',
          }}>
            {[
              {
                icon: '⚠️',
                title: 'Escrow Shortfalls',
                desc: 'If property taxes or insurance increase, your escrow account may require extra funds at closing.',
              },
              {
                icon: '📊',
                title: 'Property Tax Proration',
                desc: 'You\u2019ll pay property taxes for the days you own the property. This can be $500\u2013$2000 depending on timing.',
              },
              {
                icon: '🏢',
                title: 'HOA Estoppel Fees',
                desc: 'If the home has an HOA, the estoppel letter can cost $200\u2013$500 and is typically buyer\u2019s responsibility.',
              },
              {
                icon: '💧',
                title: 'Flood Insurance Surprises',
                desc: 'Lenders require flood insurance if the property is in a flood zone. This can add $1,000+ annually.',
              },
              {
                icon: '📋',
                title: 'Title Exceptions',
                desc: 'Title issues found at closing can lead to additional insurance costs or legal fees.',
              },
              {
                icon: '🔍',
                title: 'Final Walk-Through Repairs',
                desc: 'If repairs found during final walk-through weren\u2019t completed, you may negotiate credits or escrow holdbacks.',
              },
            ].map((surprise, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: 'var(--le-bg-card)',
                  padding: '25px',
                  borderRadius: '8px',
                  border: '2px solid var(--le-danger)',
                }}
              >
                <div style={{ fontSize: '32px', marginBottom: '12px' }}>{surprise.icon}</div>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '700',
                  margin: '0 0 12px 0',
                }}>
                  {surprise.title}
                </h3>
                <p style={{
                  fontSize: '14px',
                  lineHeight: '1.6',
                  color: 'var(--le-text-secondary)',
                  margin: 0,
                }}>
                  {surprise.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Capture */}
      <section style={{
        padding: '80px 20px',
        backgroundColor: 'var(--le-primary)',
        color: 'white',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '36px',
            fontWeight: '700',
            marginBottom: '15px',
          }}>
            Get Your Personalized Estimate
          </h2>
          <p style={{
            fontSize: '16px',
            marginBottom: '40px',
            lineHeight: '1.6',
            opacity: '0.95',
          }}>
            Confused about closing costs? Our specialists will break down your exact expenses and find ways to save you thousands.
          </p>

          {leadCaptured ? (
            <div style={{
              backgroundColor: 'var(--le-success)',
              padding: '20px',
              borderRadius: '6px',
              marginBottom: '20px',
            }}>
              <p style={{ fontSize: '16px', fontWeight: '600', margin: 0 }}>
                Thank you! We\u2019ll send your personalized estimate within 2 hours.
              </p>
            </div>
          ) : (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '15px',
              marginBottom: '20px',
            }}>
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{
                  padding: '12px 16px',
                  borderRadius: '6px',
                  border: 'none',
                  fontSize: '14px',
                  boxSizing: 'border-box',
                }}
              />
              <input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  padding: '12px 16px',
                  borderRadius: '6px',
                  border: 'none',
                  fontSize: '14px',
                  boxSizing: 'border-box',
                }}
              />
              <button
                onClick={handleLeadCapture}
                style={{
                  padding: '14px 30px',
                  backgroundColor: 'var(--le-accent)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'opacity 0.3s ease',
                }}
                onMouseOver={(e) => e.currentTarget.style.opacity = '0.9'}
                onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
              >
                Get Free Estimate
              </button>
            </div>
          )}

          <p style={{
            fontSize: '12px',
            color: 'rgba(255, 255, 255, 0.7)',
            margin: 0,
          }}>
            We\u2019ll never sell your information. Your privacy is our priority.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '60px 20px', backgroundColor: 'var(--le-bg)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '36px',
            fontWeight: '700',
            marginBottom: '40px',
            textAlign: 'center',
          }}>
            Frequently Asked Questions
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {[
              {
                q: 'What are typical closing costs for a buyer?',
                a: 'Typical closing costs range from 2\u20135% of the home purchase price. For a $350,000 home, this means $7,000\u2013$17,500 in buyer closing costs.',
              },
              {
                q: 'Can the seller pay for the buyer\u2019s closing costs?',
                a: 'Yes, in many cases the seller will pay some or all of the buyer\u2019s closing costs as part of the offer negotiation. This is more common in a buyer\u2019s market.',
              },
              {
                q: 'What\u2019s the difference between loan origination and a discount point?',
                a: 'Origination fees are mandatory charges from the lender. Discount points are optional\u2014you pay extra upfront to lower your interest rate over the loan\u2019s life.',
              },
              {
                q: 'Can closing costs be rolled into my mortgage?',
                a: 'Some lenders allow you to roll closing costs into your mortgage, but this increases the total amount you\u2019ll borrow and pay interest on. Ask your lender about options.',
              },
              {
                q: 'What happens if I find a title issue before closing?',
                a: 'Title issues can usually be resolved before closing through title insurance or legal remedies. Your title company will address any exceptions discovered during the title search.',
              },
              {
                q: 'Is homeowners insurance required at closing?',
                a: 'Yes, lenders require proof of homeowners insurance before closing. You\u2019ll typically need the first year\u2019s premium prepaid.',
              },
            ].map((faq, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: 'var(--le-bg-card)',
                  padding: '25px',
                  borderRadius: '8px',
                  border: '1px solid var(--le-border)',
                }}
              >
                <h3 style={{
                  fontSize: '16px',
                  fontWeight: '700',
                  margin: '0 0 12px 0',
                  color: 'var(--le-primary)',
                }}>
                  {faq.q}
                </h3>
                <p style={{
                  fontSize: '14px',
                  lineHeight: '1.6',
                  color: 'var(--le-text-secondary)',
                  margin: 0,
                }}>
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Schema JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'What are typical closing costs for a buyer?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Typical closing costs range from 2–5% of the home purchase price. For a $350,000 home, this means $7,000–$17,500 in buyer closing costs.',
                },
              },
              {
                '@type': 'Question',
                name: 'Can the seller pay for closing costs?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes, in many cases the seller will pay some or all closing costs as part of the offer negotiation.',
                },
              },
              {
                '@type': 'Question',
                name: 'How can I reduce closing costs?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'You can shop around for rates, negotiate lender credits, request seller concessions, compare title companies, and look into closing cost assistance programs.',
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}
