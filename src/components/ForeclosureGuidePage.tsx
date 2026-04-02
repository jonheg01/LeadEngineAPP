'use client';

import { useState, useMemo } from 'react';

// SVG Icons
const ChevronDownIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

const CheckCircleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);

const AlertIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3.05h16.94a2 2 0 0 0 1.71-3.05L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
    <line x1="12" y1="9" x2="12" y2="13"></line>
    <line x1="12" y1="17" x2="12.01" y2="17"></line>
  </svg>
);

const TrendingUpIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 17"></polyline>
    <polyline points="17 6 23 6 23 12"></polyline>
  </svg>
);

const MapPinIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);

const DollarSignIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="1" x2="12" y2="23"></line>
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
  </svg>
);

const ClipboardIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
  </svg>
);

const propertyTypes = [
  {
    title: 'Pre-Foreclosure',
    subtitle: 'Distress Sale',
    description: 'Properties where owners are behind on mortgage payments but haven\u2019t yet lost title. Often the best negotiating opportunity.',
    buyingWay: 'Direct negotiation with owner or their attorney.',
    timeline: '1\u20134 months'
  },
  {
    title: 'Foreclosure Auction',
    subtitle: 'Trustee Sale',
    description: 'Properties sold at public auction by the lender. Fastest process but requires due diligence and cash or proof of funds.',
    buyingWay: 'Bid at courthouse steps or online auction platforms.',
    timeline: '1\u20133 days (post-auction)'
  },
  {
    title: 'REO (Bank-Owned)',
    subtitle: 'Real Estate Owned',
    description: 'Properties that didn\u2019t sell at auction and are now owned by the lender. Most stable process with clear title.',
    buyingWay: 'Purchase from bank through real estate agents.',
    timeline: '2\u20136 weeks (standard transaction)'
  },
  {
    title: 'Short Sale',
    subtitle: 'Below-Market Sale',
    description: 'Lender agrees to accept less than owed. Owner motivation is high but lender approval is required.',
    buyingWay: 'Negotiate with seller and lender simultaneously.',
    timeline: '3\u20138 months'
  }
];

const timelineStages = [
  { month: '0\u20133 months', stage: 'Default', details: 'Borrower misses payments; lender begins contact.' },
  { month: '3\u20136 months', stage: 'Notice of Default', details: 'Lender files formal notice; pre-foreclosure opportunity window opens.' },
  { month: '6\u20139 months', stage: 'Pre-foreclosure Period', details: 'Best time for short sales or direct negotiation with owner.' },
  { month: '9\u201312 months', stage: 'Auction Listed', details: 'Property scheduled for public auction; bidding occurs.' },
  { month: '12+ months', stage: 'REO (Bank-Owned)', details: 'If auction doesn\u2019t sell, lender takes title and lists with agent.' }
];

const dueDiligenceItems = [
  { item: 'Title Search & Report', critical: true, description: 'Verify clean title, outstanding liens, back taxes, HOA liens.' },
  { item: 'Lien Check', critical: true, description: 'Identify all liens (mortgage, judgment, tax) that may affect purchase.' },
  { item: 'Property Appraisal', critical: true, description: 'Determine fair market value; needed for financing.' },
  { item: 'Professional Inspection', critical: true, description: 'Identify structural issues, mold, water damage, needed repairs.' },
  { item: 'Occupancy Status', critical: true, description: 'Is property vacant or occupied? Affects timeline and liability.' },
  { item: 'Utility Status', critical: false, description: 'Confirm gas, electric, water are on; required for inspection.' },
  { item: 'HOA Research', critical: false, description: 'Review CC&Rs, financials, special assessments (if applicable).' },
  { item: 'Environmental Screening', critical: false, description: 'Check for mold, radon, lead paint, soil contamination.' },
  { item: 'Eviction Status', critical: false, description: 'Identify occupants with tenant rights; budget for eviction if needed.' },
  { item: 'Permit History', critical: false, description: 'Review unpermitted work; may require correction before sale.' }
];

const financingOptions = [
  {
    name: 'Conventional Loan',
    terms: '20\u201330% down, 15/30-year term',
    pros: 'Lowest interest rates; stable payments; allows rehab via delayed repairs.',
    cons: 'Requires good credit; appraisal must support value; slower approval.',
    best: 'REO purchases with stable condition.'
  },
  {
    name: 'FHA 203(k)',
    terms: 'Down payment 3.5%; rolls rehab costs into mortgage.',
    pros: 'Low down payment; includes renovation in one loan; assumable by buyers.',
    cons: 'Slower approval; caps total loan amount; requires FHA inspection standards.',
    best: 'Primary residence purchases with fixable issues.'
  },
  {
    name: 'Hard Money Loan',
    terms: '25\u201330% down, 6\u20129 months, 10\u201318% interest.',
    pros: 'Fast funding; no credit requirement; based on property value and exit plan.',
    cons: 'High interest; short term; high fees; requires experienced exit strategy.',
    best: 'Fix-and-flip or auction purchases with short timeline.'
  },
  {
    name: 'Cash Offer',
    terms: 'Full purchase price in liquid funds.',
    pros: 'Strongest offer; fastest closing; no lending contingency.',
    cons: 'Locks up capital; limits portfolio flexibility; tax inefficiency.',
    best: 'Auctions, distressed deals, seller motivation situations.'
  },
  {
    name: 'Bridge Loan',
    terms: '6\u201312 months, 6\u201310% interest, based on equity.',
    pros: 'Bridge purchase and sale; temporary solution; no contingencies.',
    cons: 'Short-term debt; higher cost; requires clear exit plan.',
    best: 'Investors with primary home sale pending.'
  }
];

const faqItems = [
  {
    q: 'Can I get a traditional mortgage on a foreclosure?',
    a: 'Yes, but REO properties are easiest. Pre-foreclosure and auction properties may require cash or hard money. Most lenders want an appraisal that supports the price and a property inspection.'
  },
  {
    q: 'What\u2019s the biggest risk when buying at auction?',
    a: 'Auctions require cash or proof of funds, no inspection access, and as-is purchases. You could inherit unknown title issues, liens, or severe damage. Winning a bid you can\u2019t close on costs your deposit.'
  },
  {
    q: 'How do I find foreclosures near me?',
    a: 'Check Zillow foreclosure listings, Redfin distressed properties, county courthouse records, public auction sites (Auction.com, BidAtTrusts.com), or hire a real estate agent specializing in foreclosures.'
  },
  {
    q: 'What\u2019s the difference between pre-foreclosure and REO?',
    a: 'Pre-foreclosure: owner still has title; best negotiating window. REO: lender owns it post-auction; clearer process but less upside.'
  },
  {
    q: 'Do I need cash for a foreclosure purchase?',
    a: 'No, but you\u2019ll need more capital than a traditional home. Consider FHA 203(k) for primary residence, hard money for fix-and-flip, or conventional financing for stable REO properties.'
  },
  {
    q: 'How much should I budget for repairs?',
    a: 'Use your inspection report and the interactive budget estimator. Start with 10\u201320% of purchase price for cosmetic updates, 20\u201340% for moderate repairs, and 40%+ for major structural issues.'
  },
  {
    q: 'Can I negotiate after I win an auction bid?',
    a: 'No. Auction bids are final and binding. Confirm you can close before bidding. This is why due diligence and exit planning are critical.'
  },
  {
    q: 'What\u2019s the typical timeline from offer to closing?',
    a: 'Pre-foreclosure: 30\u201390 days. REO: 30\u201345 days (standard). Auction: 7\u201330 days. Short sale: 60\u2013180 days.'
  }
];

export default function ForeclosureGuidePage() {
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [budgetInputs, setBudgetInputs] = useState({
    purchasePrice: 250000,
    roofing: 0,
    plumbing: 0,
    electrical: 0,
    hvac: 0,
    flooring: 0,
    drywall: 0,
    paint: 0,
    windows: 0,
    appliances: 0
  });

  const [investmentInputs, setInvestmentInputs] = useState({
    purchasePrice: 300000,
    renovationCost: 75000,
    closingCosts: 6000,
    expectedSalePrice: 450000,
    holdingMonths: 6,
    rentalMonthly: 2000
  });

  const budgetCategories = useMemo(() => {
    const repairs = budgetInputs.roofing + budgetInputs.plumbing + budgetInputs.electrical +
                    budgetInputs.hvac + budgetInputs.flooring + budgetInputs.drywall +
                    budgetInputs.paint + budgetInputs.windows + budgetInputs.appliances;
    const closingCosts = budgetInputs.purchasePrice * 0.03;
    const inspectionEtc = 1500;
    const reserve = repairs * 0.1;
    const total = budgetInputs.purchasePrice + repairs + closingCosts + inspectionEtc + reserve;
    return { repairs, closingCosts, inspectionEtc, reserve, total };
  }, [budgetInputs]);

  const investmentMetrics = useMemo(() => {
    const totalInvestment = investmentInputs.purchasePrice + investmentInputs.renovationCost + investmentInputs.closingCosts;

    // Fix-and-flip
    const flipNetProfit = investmentInputs.expectedSalePrice - totalInvestment - (investmentInputs.expectedSalePrice * 0.06);
    const flipROI = ((flipNetProfit / totalInvestment) * 100).toFixed(1);
    const flipMonthlyReturn = (flipNetProfit / (investmentInputs.holdingMonths || 1)).toFixed(0);

    // Buy-and-hold
    const holdMonthlyRevenue = investmentInputs.rentalMonthly * investmentInputs.holdingMonths;
    const propertyAppreciation = totalInvestment * (investmentInputs.holdingMonths / 12) * 0.03; // 3% annual
    const holdTotalReturn = holdMonthlyRevenue + propertyAppreciation - (investmentInputs.renovationCost * 0.05);
    const holdROI = ((holdTotalReturn / totalInvestment) * 100).toFixed(1);
    const holdMonthlyReturn = (holdMonthlyRevenue / investmentInputs.holdingMonths).toFixed(0);

    return {
      flipNetProfit: flipNetProfit.toFixed(0),
      flipROI,
      flipMonthlyReturn,
      holdTotalReturn: holdTotalReturn.toFixed(0),
      holdROI,
      holdMonthlyReturn
    };
  }, [investmentInputs]);

  return (
    <div style={{ backgroundColor: 'var(--le-bg)', color: 'var(--le-text)', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
      {/* Hero Section */}
      <section style={{
        backgroundColor: 'var(--le-surface)',
        borderBottom: '1px solid var(--le-border)',
        padding: '80px 20px',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h1 style={{
            fontSize: '52px',
            fontWeight: '700',
            lineHeight: '1.1',
            marginBottom: '20px',
            color: 'var(--le-accent)'
          }}>
            Foreclosure & REO Buying Guide
          </h1>
          <p style={{
            fontSize: '20px',
            color: 'var(--le-text-secondary)',
            marginBottom: '30px',
            lineHeight: '1.6'
          }}>
            Master the complete process: find distressed properties, navigate financing, conduct due diligence, and maximize ROI.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#types" style={{
              backgroundColor: 'var(--le-accent)',
              color: '#fff',
              padding: '12px 32px',
              borderRadius: '6px',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '16px',
              border: 'none',
              cursor: 'pointer'
            }}>
              Explore Property Types
            </a>
            <a href="#checklist" style={{
              backgroundColor: 'transparent',
              color: 'var(--le-accent)',
              padding: '12px 32px',
              borderRadius: '6px',
              border: '2px solid var(--le-accent)',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '16px',
              cursor: 'pointer'
            }}>
              Due Diligence Checklist
            </a>
          </div>
        </div>
      </section>

      {/* Types of Distressed Properties */}
      <section id="types" style={{
        padding: '80px 20px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <h2 style={{
          fontSize: '40px',
          fontWeight: '700',
          marginBottom: '50px',
          color: 'var(--le-accent)',
          textAlign: 'center'
        }}>
          4 Types of Distressed Properties
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
          {propertyTypes.map((type, idx) => (
            <div key={idx} style={{
              backgroundColor: 'var(--le-surface)',
              border: '1px solid var(--le-border)',
              borderRadius: '8px',
              padding: '32px',
              transition: 'all 0.3s ease'
            }} onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)'}
               onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}>
              <h3 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '8px', color: 'var(--le-accent)' }}>
                {type.title}
              </h3>
              <p style={{
                fontSize: '14px',
                color: 'var(--le-text-secondary)',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '16px'
              }}>
                {type.subtitle}
              </p>
              <p style={{ fontSize: '15px', lineHeight: '1.6', marginBottom: '20px', color: 'var(--le-text-secondary)' }}>
                {type.description}
              </p>
              <div style={{ borderTop: '1px solid var(--le-border)', paddingTop: '16px' }}>
                <p style={{ fontSize: '13px', color: 'var(--le-text-secondary)', marginBottom: '8px' }}>
                  <strong>How to Buy:</strong> {type.buyingWay}
                </p>
                <p style={{ fontSize: '13px', color: 'var(--le-accent)', fontWeight: '600' }}>
                  <strong>Typical Timeline:</strong> {type.timeline}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline Section */}
      <section style={{
        backgroundColor: 'var(--le-surface)',
        borderTop: '1px solid var(--le-border)',
        borderBottom: '1px solid var(--le-border)',
        padding: '80px 20px',
        marginTop: '60px'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '40px',
            fontWeight: '700',
            marginBottom: '50px',
            color: 'var(--le-accent)',
            textAlign: 'center'
          }}>
            Foreclosure Process Timeline
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' }}>
            {timelineStages.map((stage, idx) => (
              <div key={idx} style={{
                backgroundColor: 'var(--le-bg)',
                border: '2px solid var(--le-border)',
                borderRadius: '8px',
                padding: '24px',
                position: 'relative'
              }}>
                <div style={{
                  fontSize: '13px',
                  fontWeight: '700',
                  color: 'var(--le-accent)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginBottom: '12px'
                }}>
                  {stage.month}
                </div>
                <h4 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '12px', color: 'var(--le-text)' }}>
                  {stage.stage}
                </h4>
                <p style={{ fontSize: '14px', color: 'var(--le-text-secondary)', lineHeight: '1.5' }}>
                  {stage.details}
                </p>
                {idx < timelineStages.length - 1 && (
                  <div style={{
                    position: 'absolute',
                    bottom: '-28px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '2px',
                    height: '24px',
                    backgroundColor: 'var(--le-border)'
                  }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Finding Foreclosures */}
      <section style={{
        padding: '80px 20px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <h2 style={{
          fontSize: '40px',
          fontWeight: '700',
          marginBottom: '50px',
          color: 'var(--le-accent)',
          textAlign: 'center'
        }}>
          Where to Find Foreclosures
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ color: 'var(--le-accent)' }}><MapPinIcon /></div>
              <h3 style={{ fontSize: '20px', fontWeight: '700', margin: '0' }}>Courthouse Steps & Auctions</h3>
            </div>
            <p style={{ color: 'var(--le-text-secondary)', lineHeight: '1.6', marginBottom: '16px' }}>
              Monthly foreclosure auctions held at county courthouses. Check your county assessor\u2019s website for auction dates and property lists.
            </p>
            <ul style={{ color: 'var(--le-text-secondary)', lineHeight: '1.8', listStyle: 'none', padding: '0' }}>
              <li style={{ marginBottom: '8px' }}>Auction.com</li>
              <li style={{ marginBottom: '8px' }}>BidAtTrusts.com</li>
              <li style={{ marginBottom: '8px' }}>Zillow Foreclosures</li>
              <li>County Recorder\u2019s Office</li>
            </ul>
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ color: 'var(--le-accent)' }}><DollarSignIcon /></div>
              <h3 style={{ fontSize: '20px', fontWeight: '700', margin: '0' }}>REO Bank-Owned Listings</h3>
            </div>
            <p style={{ color: 'var(--le-text-secondary)', lineHeight: '1.6', marginBottom: '16px' }}>
              Properties the lender owns post-auction, listed through MLS and real estate agents. Clearest transaction process.
            </p>
            <ul style={{ color: 'var(--le-text-secondary)', lineHeight: '1.8', listStyle: 'none', padding: '0' }}>
              <li style={{ marginBottom: '8px' }}>MLS Foreclosure Filter</li>
              <li style={{ marginBottom: '8px' }}>Zillow / Redfin (distressed property filter)</li>
              <li style={{ marginBottom: '8px' }}>Bank-specific REO units (Chase, Bank of America, etc.)</li>
              <li>Real Estate Agent (REO specialist)</li>
            </ul>
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ color: 'var(--le-accent)' }}><ClipboardIcon /></div>
              <h3 style={{ fontSize: '20px', fontWeight: '700', margin: '0' }}>Pre-Foreclosure Direct</h3>
            </div>
            <p style={{ color: 'var(--le-text-secondary)', lineHeight: '1.6', marginBottom: '16px' }}>
              Properties still owned by distressed sellers. Best negotiating opportunity but requires direct outreach or specialized agents.
            </p>
            <ul style={{ color: 'var(--le-text-secondary)', lineHeight: '1.8', listStyle: 'none', padding: '0' }}>
              <li style={{ marginBottom: '8px' }}>Public records (Notice of Default)</li>
              <li style={{ marginBottom: '8px' }}>Pre-foreclosure agents (specialized network)</li>
              <li style={{ marginBottom: '8px' }}>Direct mail campaigns</li>
              <li>Short sale listing networks</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Due Diligence Checklist */}
      <section id="checklist" style={{
        backgroundColor: 'var(--le-surface)',
        borderTop: '1px solid var(--le-border)',
        borderBottom: '1px solid var(--le-border)',
        padding: '80px 20px',
        marginTop: '60px'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '40px',
            fontWeight: '700',
            marginBottom: '50px',
            color: 'var(--le-accent)',
            textAlign: 'center'
          }}>
            Due Diligence Checklist
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px'
          }}>
            {dueDiligenceItems.map((item, idx) => (
              <div key={idx} style={{
                backgroundColor: 'var(--le-bg)',
                border: '1px solid var(--le-border)',
                borderRadius: '8px',
                padding: '20px',
                borderLeft: `4px solid ${item.critical ? 'var(--le-accent)' : 'var(--le-border)'}`
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <div style={{ color: item.critical ? 'var(--le-accent)' : 'var(--le-text-secondary)', marginTop: '2px' }}>
                    {item.critical ? <CheckCircleIcon /> : <AlertIcon />}
                  </div>
                  <div style={{ flex: '1' }}>
                    <h4 style={{
                      fontSize: '16px',
                      fontWeight: '700',
                      marginBottom: '8px',
                      color: 'var(--le-text)'
                    }}>
                      {item.item}
                    </h4>
                    <p style={{ fontSize: '14px', color: 'var(--le-text-secondary)', lineHeight: '1.5', margin: '0' }}>
                      {item.description}
                    </p>
                    {item.critical && (
                      <span style={{
                        display: 'inline-block',
                        marginTop: '8px',
                        fontSize: '12px',
                        fontWeight: '600',
                        color: 'var(--le-accent)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                      }}>
                        Critical
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Financing Options */}
      <section style={{
        padding: '80px 20px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <h2 style={{
          fontSize: '40px',
          fontWeight: '700',
          marginBottom: '50px',
          color: 'var(--le-accent)',
          textAlign: 'center'
        }}>
          Financing Options
        </h2>
        <div style={{ display: 'grid', gap: '24px' }}>
          {financingOptions.map((option, idx) => (
            <div key={idx} style={{
              backgroundColor: 'var(--le-surface)',
              border: '1px solid var(--le-border)',
              borderRadius: '8px',
              padding: '28px',
              transition: 'all 0.3s ease'
            }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
               onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
                <div>
                  <h3 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '8px', color: 'var(--le-accent)' }}>
                    {option.name}
                  </h3>
                  <p style={{
                    fontSize: '14px',
                    color: 'var(--le-text-secondary)',
                    fontWeight: '600',
                    marginBottom: '16px'
                  }}>
                    {option.terms}
                  </p>
                  <div style={{ marginBottom: '20px' }}>
                    <p style={{ fontSize: '13px', fontWeight: '600', color: 'var(--le-text)', marginBottom: '8px' }}>Pros:</p>
                    <p style={{ fontSize: '14px', color: 'var(--le-text-secondary)', lineHeight: '1.6' }}>
                      {option.pros}
                    </p>
                  </div>
                </div>
                <div>
                  <div style={{ marginBottom: '20px' }}>
                    <p style={{ fontSize: '13px', fontWeight: '600', color: 'var(--le-text)', marginBottom: '8px' }}>Cons:</p>
                    <p style={{ fontSize: '14px', color: 'var(--le-text-secondary)', lineHeight: '1.6' }}>
                      {option.cons}
                    </p>
                  </div>
                  <div>
                    <p style={{ fontSize: '13px', fontWeight: '600', color: 'var(--le-accent)', marginBottom: '8px' }}>Best For:</p>
                    <p style={{ fontSize: '14px', color: 'var(--le-text-secondary)', lineHeight: '1.6' }}>
                      {option.best}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Renovation Budget Calculator */}
      <section style={{
        backgroundColor: 'var(--le-surface)',
        borderTop: '1px solid var(--le-border)',
        borderBottom: '1px solid var(--le-border)',
        padding: '80px 20px',
        marginTop: '60px'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '40px',
            fontWeight: '700',
            marginBottom: '50px',
            color: 'var(--le-accent)',
            textAlign: 'center'
          }}>
            Renovation Budget Estimator
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'start' }}>
            <div>
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: 'var(--le-text)' }}>
                  Purchase Price
                </label>
                <input
                  type="number"
                  value={budgetInputs.purchasePrice}
                  onChange={(e) => setBudgetInputs({ ...budgetInputs, purchasePrice: parseFloat(e.target.value) })}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid var(--le-border)',
                    borderRadius: '6px',
                    fontSize: '14px',
                    backgroundColor: 'var(--le-bg)',
                    color: 'var(--le-text)',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              {[
                { key: 'roofing', label: 'Roofing' },
                { key: 'plumbing', label: 'Plumbing' },
                { key: 'electrical', label: 'Electrical' },
                { key: 'hvac', label: 'HVAC' },
                { key: 'flooring', label: 'Flooring' },
                { key: 'drywall', label: 'Drywall & Painting' },
                { key: 'paint', label: 'Interior Paint' },
                { key: 'windows', label: 'Windows & Doors' },
                { key: 'appliances', label: 'Appliances' }
              ].map((repair) => (
                <div key={repair.key} style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '6px', color: 'var(--le-text)' }}>
                    {repair.label}
                  </label>
                  <input
                    type="number"
                    value={budgetInputs[repair.key]}
                    onChange={(e) => setBudgetInputs({ ...budgetInputs, [repair.key]: parseFloat(e.target.value) || 0 })}
                    placeholder="$0"
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid var(--le-border)',
                      borderRadius: '6px',
                      fontSize: '14px',
                      backgroundColor: 'var(--le-bg)',
                      color: 'var(--le-text)',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              ))}
            </div>

            <div style={{
              backgroundColor: 'var(--le-bg)',
              border: '1px solid var(--le-border)',
              borderRadius: '8px',
              padding: '32px'
            }}>
              <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '24px', color: 'var(--le-accent)' }}>
                Budget Summary
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--le-border)', paddingBottom: '12px' }}>
                  <span style={{ fontSize: '14px', color: 'var(--le-text-secondary)' }}>Repairs & Renovations:</span>
                  <span style={{ fontSize: '14px', fontWeight: '600', color: 'var(--le-text)' }}>
                    ${budgetCategories.repairs.toLocaleString()}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--le-border)', paddingBottom: '12px' }}>
                  <span style={{ fontSize: '14px', color: 'var(--le-text-secondary)' }}>Closing Costs (3%):</span>
                  <span style={{ fontSize: '14px', fontWeight: '600', color: 'var(--le-text)' }}>
                    ${budgetCategories.closingCosts.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--le-border)', paddingBottom: '12px' }}>
                  <span style={{ fontSize: '14px', color: 'var(--le-text-secondary)' }}>Inspection & Admin:</span>
                  <span style={{ fontSize: '14px', fontWeight: '600', color: 'var(--le-text)' }}>
                    ${budgetCategories.inspectionEtc.toLocaleString()}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--le-border)', paddingBottom: '12px' }}>
                  <span style={{ fontSize: '14px', color: 'var(--le-text-secondary)' }}>Contingency (10% of repairs):</span>
                  <span style={{ fontSize: '14px', fontWeight: '600', color: 'var(--le-text)' }}>
                    ${budgetCategories.reserve.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </span>
                </div>
              </div>
              <div style={{
                backgroundColor: 'var(--le-accent)',
                color: '#fff',
                padding: '20px',
                borderRadius: '6px',
                textAlign: 'center'
              }}>
                <p style={{ fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
                  Total Investment
                </p>
                <p style={{ fontSize: '32px', fontWeight: '700', margin: '0' }}>
                  ${budgetCategories.total.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </p>
              </div>
              <p style={{ fontSize: '12px', color: 'var(--le-text-secondary)', marginTop: '16px', lineHeight: '1.5' }}>
                This estimate includes purchase price, repairs, closing costs, inspection, and a 10% contingency buffer. Adjust line items based on your inspector\u2019s report.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Analysis Calculator */}
      <section style={{
        padding: '80px 20px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <h2 style={{
          fontSize: '40px',
          fontWeight: '700',
          marginBottom: '50px',
          color: 'var(--le-accent)',
          textAlign: 'center'
        }}>
          Investment Analysis: Fix-and-Flip vs Buy-and-Hold
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'start' }}>
          <div>
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: 'var(--le-text)' }}>
                Purchase Price
              </label>
              <input
                type="number"
                value={investmentInputs.purchasePrice}
                onChange={(e) => setInvestmentInputs({ ...investmentInputs, purchasePrice: parseFloat(e.target.value) })}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid var(--le-border)',
                  borderRadius: '6px',
                  fontSize: '14px',
                  backgroundColor: 'var(--le-bg)',
                  color: 'var(--le-text)',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: 'var(--le-text)' }}>
                Renovation Cost
              </label>
              <input
                type="number"
                value={investmentInputs.renovationCost}
                onChange={(e) => setInvestmentInputs({ ...investmentInputs, renovationCost: parseFloat(e.target.value) })}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid var(--le-border)',
                  borderRadius: '6px',
                  fontSize: '14px',
                  backgroundColor: 'var(--le-bg)',
                  color: 'var(--le-text)',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: 'var(--le-text)' }}>
                Closing Costs
              </label>
              <input
                type="number"
                value={investmentInputs.closingCosts}
                onChange={(e) => setInvestmentInputs({ ...investmentInputs, closingCosts: parseFloat(e.target.value) })}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid var(--le-border)',
                  borderRadius: '6px',
                  fontSize: '14px',
                  backgroundColor: 'var(--le-bg)',
                  color: 'var(--le-text)',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: 'var(--le-text)' }}>
                Expected Sale Price (Flip)
              </label>
              <input
                type="number"
                value={investmentInputs.expectedSalePrice}
                onChange={(e) => setInvestmentInputs({ ...investmentInputs, expectedSalePrice: parseFloat(e.target.value) })}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid var(--le-border)',
                  borderRadius: '6px',
                  fontSize: '14px',
                  backgroundColor: 'var(--le-bg)',
                  color: 'var(--le-text)',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: 'var(--le-text)' }}>
                Hold Period (Months)
              </label>
              <input
                type="number"
                value={investmentInputs.holdingMonths}
                onChange={(e) => setInvestmentInputs({ ...investmentInputs, holdingMonths: parseInt(e.target.value) || 0 })}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid var(--le-border)',
                  borderRadius: '6px',
                  fontSize: '14px',
                  backgroundColor: 'var(--le-bg)',
                  color: 'var(--le-text)',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: 'var(--le-text)' }}>
                Monthly Rental Income (Hold)
              </label>
              <input
                type="number"
                value={investmentInputs.rentalMonthly}
                onChange={(e) => setInvestmentInputs({ ...investmentInputs, rentalMonthly: parseFloat(e.target.value) })}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid var(--le-border)',
                  borderRadius: '6px',
                  fontSize: '14px',
                  backgroundColor: 'var(--le-bg)',
                  color: 'var(--le-text)',
                  boxSizing: 'border-box'
                }}
              />
            </div>
          </div>

          <div>
            <div style={{
              backgroundColor: 'var(--le-surface)',
              border: '1px solid var(--le-border)',
              borderRadius: '8px',
              padding: '28px',
              marginBottom: '24px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                <div style={{ color: 'var(--le-accent)' }}><TrendingUpIcon /></div>
                <h3 style={{ fontSize: '20px', fontWeight: '700', margin: '0', color: 'var(--le-accent)' }}>
                  Fix-and-Flip (Resale)
                </h3>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ borderBottom: '1px solid var(--le-border)', paddingBottom: '12px' }}>
                  <p style={{ fontSize: '13px', color: 'var(--le-text-secondary)', marginBottom: '6px' }}>Net Profit</p>
                  <p style={{ fontSize: '24px', fontWeight: '700', color: 'var(--le-accent)', margin: '0' }}>
                    ${parseInt(investmentMetrics.flipNetProfit).toLocaleString()}
                  </p>
                </div>
                <div style={{ borderBottom: '1px solid var(--le-border)', paddingBottom: '12px' }}>
                  <p style={{ fontSize: '13px', color: 'var(--le-text-secondary)', marginBottom: '6px' }}>ROI</p>
                  <p style={{ fontSize: '24px', fontWeight: '700', color: 'var(--le-accent)', margin: '0' }}>
                    {investmentMetrics.flipROI}%
                  </p>
                </div>
                <div>
                  <p style={{ fontSize: '13px', color: 'var(--le-text-secondary)', marginBottom: '6px' }}>Monthly Return</p>
                  <p style={{ fontSize: '24px', fontWeight: '700', color: 'var(--le-accent)', margin: '0' }}>
                    ${parseInt(investmentMetrics.flipMonthlyReturn).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            <div style={{
              backgroundColor: 'var(--le-surface)',
              border: '1px solid var(--le-border)',
              borderRadius: '8px',
              padding: '28px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                <div style={{ color: 'var(--le-accent)' }}><TrendingUpIcon /></div>
                <h3 style={{ fontSize: '20px', fontWeight: '700', margin: '0', color: 'var(--le-accent)' }}>
                  Buy-and-Hold (Rental)
                </h3>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ borderBottom: '1px solid var(--le-border)', paddingBottom: '12px' }}>
                  <p style={{ fontSize: '13px', color: 'var(--le-text-secondary)', marginBottom: '6px' }}>Total Return</p>
                  <p style={{ fontSize: '24px', fontWeight: '700', color: 'var(--le-accent)', margin: '0' }}>
                    ${parseInt(investmentMetrics.holdTotalReturn).toLocaleString()}
                  </p>
                </div>
                <div style={{ borderBottom: '1px solid var(--le-border)', paddingBottom: '12px' }}>
                  <p style={{ fontSize: '13px', color: 'var(--le-text-secondary)', marginBottom: '6px' }}>ROI</p>
                  <p style={{ fontSize: '24px', fontWeight: '700', color: 'var(--le-accent)', margin: '0' }}>
                    {investmentMetrics.holdROI}%
                  </p>
                </div>
                <div>
                  <p style={{ fontSize: '13px', color: 'var(--le-text-secondary)', marginBottom: '6px' }}>Monthly Return</p>
                  <p style={{ fontSize: '24px', fontWeight: '700', color: 'var(--le-accent)', margin: '0' }}>
                    ${parseInt(investmentMetrics.holdMonthlyReturn).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Risk Assessment */}
      <section style={{
        backgroundColor: 'var(--le-surface)',
        borderTop: '1px solid var(--le-border)',
        borderBottom: '1px solid var(--le-border)',
        padding: '80px 20px',
        marginTop: '60px'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '40px',
            fontWeight: '700',
            marginBottom: '50px',
            color: 'var(--le-accent)',
            textAlign: 'center'
          }}>
            Risk Assessment: Common Pitfalls
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '28px' }}>
            {[
              { title: 'Hidden Liens & Back Taxes', description: 'Property may have unpaid HOA dues, property tax liens, or judgment liens that survive the sale.', mitigation: 'Always order a title search and lien check. Attend pre-closing walkthrough. Ask escrow for lien release.' },
              { title: 'Structural Problems & Mold', description: 'Distressed properties often hide foundation cracks, roof damage, or toxic mold behind cosmetic fixes.', mitigation: 'Hire licensed inspector. Get structural and mold reports. Budget aggressively based on findings.' },
              { title: 'Occupancy & Eviction Costs', description: 'Occupied foreclosures mean eviction costs and timeline delays; vacant ones risk vandalism and squatters.', mitigation: 'Verify occupancy status. Budget $2\u20135K for eviction. Secure property immediately after purchase.' },
              { title: 'No Inspection Access', description: 'Auction properties often don\u2019t allow inspection; you inherit unknown defects after an irreversible bid.', mitigation: 'Only bid auction properties you can afford to repair fully. Get title report & exterior inspection first.' },
              { title: 'Auction Financing Failures', description: 'You bid and win, but can\u2019t secure financing or close; you lose your deposit.', mitigation: 'Pre-arrange hard money or cash before bidding. Know your maximum price. Verify funds are ready to transfer.' },
              { title: 'Underestimated Repair Costs', description: 'Cosmetic inspection misses structural issues; repairs exceed budget by 50%+.', mitigation: 'Add 15\u201320% contingency to repair estimates. Get multiple contractor quotes. Use interactive calculator to pressure-test assumptions.' },
              { title: 'Market Downturn Risk', description: 'Property value drops during renovation or holding period, eliminating profit.', mitigation: 'Know your market. Conservative exit strategy. Don\u2019t overleverage. Rental income provides downside protection.' },
              { title: 'Financing Approval Delays', description: 'Lender delays appraisal, title work, or underwriting; transaction fails or you lose deal.', mitigation: 'Use local lenders familiar with distressed deals. Provide all documents upfront. Start financing early.' }
            ].map((risk, idx) => (
              <div key={idx} style={{
                backgroundColor: 'var(--le-bg)',
                border: '1px solid var(--le-border)',
                borderRadius: '8px',
                padding: '24px'
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '12px' }}>
                  <div style={{ color: '#dc2626', marginTop: '2px' }}><AlertIcon /></div>
                  <h4 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--le-text)', margin: '0' }}>
                    {risk.title}
                  </h4>
                </div>
                <p style={{ fontSize: '14px', color: 'var(--le-text-secondary)', lineHeight: '1.5', marginBottom: '12px' }}>
                  {risk.description}
                </p>
                <div style={{ borderTop: '1px solid var(--le-border)', paddingTop: '12px' }}>
                  <p style={{ fontSize: '12px', fontWeight: '600', color: 'var(--le-accent)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Mitigation:
                  </p>
                  <p style={{ fontSize: '14px', color: 'var(--le-text-secondary)', lineHeight: '1.5', margin: '0' }}>
                    {risk.mitigation}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section style={{
        padding: '80px 20px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <h2 style={{
          fontSize: '40px',
          fontWeight: '700',
          marginBottom: '50px',
          color: 'var(--le-accent)',
          textAlign: 'center'
        }}>
          Frequently Asked Questions
        </h2>
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {faqItems.map((item, idx) => (
            <div key={idx} style={{
              backgroundColor: 'var(--le-surface)',
              border: '1px solid var(--le-border)',
              borderRadius: '8px',
              overflow: 'hidden'
            }}>
              <button
                onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                style={{
                  width: '100%',
                  padding: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  border: 'none',
                  backgroundColor: 'transparent',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: '600',
                  color: 'var(--le-text)',
                  transition: 'all 0.2s ease'
                }}
              >
                <span>{item.q}</span>
                <div style={{
                  color: 'var(--le-accent)',
                  transform: expandedFaq === idx ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <ChevronDownIcon />
                </div>
              </button>
              {expandedFaq === idx && (
                <div style={{
                  padding: '0 20px 20px 20px',
                  borderTop: '1px solid var(--le-border)',
                  backgroundColor: 'var(--le-bg)',
                  animation: 'slideDown 0.3s ease'
                }}>
                  <p style={{
                    fontSize: '15px',
                    color: 'var(--le-text-secondary)',
                    lineHeight: '1.6',
                    margin: '0'
                  }}>
                    {item.a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Lead Capture CTA */}
      <section style={{
        backgroundColor: 'var(--le-accent)',
        color: '#fff',
        padding: '80px 20px',
        textAlign: 'center',
        marginTop: '60px'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '40px',
            fontWeight: '700',
            marginBottom: '20px'
          }}>
            Ready to Buy Your First Foreclosure?
          </h2>
          <p style={{
            fontSize: '18px',
            lineHeight: '1.6',
            marginBottom: '40px',
            opacity: '0.95'
          }}>
            Connect with a LeadEngine foreclosure specialist. We\u2019ll help you navigate due diligence, financing, and close with confidence.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button style={{
              backgroundColor: '#fff',
              color: 'var(--le-accent)',
              padding: '14px 36px',
              borderRadius: '6px',
              border: 'none',
              fontWeight: '600',
              fontSize: '16px',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
               onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
              Get a Foreclosure Specialist
            </button>
            <button style={{
              backgroundColor: 'transparent',
              color: '#fff',
              padding: '14px 36px',
              borderRadius: '6px',
              border: '2px solid #fff',
              fontWeight: '600',
              fontSize: '16px',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
               onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
              Schedule a Consultation
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
