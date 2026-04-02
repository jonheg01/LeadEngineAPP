'use client';

import React, { useState, useMemo } from 'react';

// ============================================================================
// SVG Icons (Inline)
// ============================================================================

const CheckCircleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const MapPinIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const DollarSignIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);

const ShieldIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const ClockIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const UserCheckIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="8.5" cy="7" r="4" />
    <polyline points="17 11 19 13 23 9" />
  </svg>
);

const HomeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const TrendingUpIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 17" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

// ============================================================================
// Main Component
// ============================================================================

export default function VeteranHomeBuyerPage() {
  const [eligibilityStep, setEligibilityStep] = useState(0);
  const [expandedMythIndex, setExpandedMythIndex] = useState(null);
  const [fundingFeeInput, setFundingFeeInput] = useState({ serviceCategory: 'first-time', downPayment: 0 });
  const [contactForm, setContactForm] = useState({ name: '', email: '', serviceStatus: '' });
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // ============================================================================
  // Data & Calculations
  // ============================================================================

  const eligibilityQuestions = [
    {
      question: 'What is your military service status?',
      answers: ['Active Duty', 'Reserve/National Guard', 'Veteran', 'Surviving Spouse'],
    },
    {
      question: 'How long have you served?',
      answers: ['Less than 2 years', '2-5 years', 'Over 5 years', 'Still unsure'],
    },
    {
      question: 'What is your discharge status?',
      answers: ['Honorable', 'General (under honorable)', 'Still serving', 'Not sure'],
    },
  ];

  const vaLoanBenefits = [
    { icon: ShieldIcon, title: 'Zero Down Payment', description: 'Buy with no down payment required' },
    { icon: DollarSignIcon, title: 'No PMI', description: 'No private mortgage insurance costs' },
    { icon: TrendingUpIcon, title: 'Competitive Rates', description: 'Typically lower interest rates available' },
    { icon: HomeIcon, title: 'No Maximum Loan', description: 'Borrow up to your full entitlement' },
  ];

  const timelineSteps = [
    { stage: 'Get COE', description: 'Obtain your Certificate of Eligibility from the VA' },
    { stage: 'Pre-Approval', description: 'Work with a VA-savvy lender to get pre-approved' },
    { stage: 'Find Property', description: 'Search homes with your agent; VA appraisal ordered' },
    { stage: 'Make Offer', description: 'Submit offer on your chosen property' },
    { stage: 'VA Appraisal', description: 'VA appraiser inspects property; ensures proper value' },
    { stage: 'Underwriting', description: 'Lender reviews all documents and finalizes terms' },
    { stage: 'Clear to Close', description: 'Final walkthrough and signing of closing documents' },
    { stage: 'Closing', description: 'Fund loan and receive keys to your new home' },
  ];

  const comparisonData = [
    { feature: 'Down Payment', va: 'Zero', conventional: '3-20%' },
    { feature: 'PMI Required', va: 'No', conventional: 'Yes (if < 20% down)' },
    { feature: 'Interest Rates', va: 'Typically lower', conventional: 'Varies' },
    { feature: 'Credit Score', va: 'More flexible', conventional: 'Usually 620+ required' },
    { feature: 'Closing Costs', va: 'Seller often pays', conventional: 'Buyer pays' },
    { feature: 'Funding Fee', va: 'One-time fee', conventional: 'N/A' },
  ];

  const militaryRelocationTips = [
    { title: 'Coordinate with PCS Timeline', description: 'Plan home purchase 2-3 months before your move' },
    { title: 'Research Base Housing', description: 'Compare on-base options with off-base market values' },
    { title: 'BAH Planning', description: 'Use your housing allowance to determine your budget' },
    { title: 'Know Your Area', description: 'Visit the new duty location if possible before buying' },
    { title: 'Schools & Services', description: 'Research schools, healthcare, and military resources' },
  ];

  const myths = [
    {
      myth: 'I must have a 0% down payment\u2014I can\u2019t put money down.',
      truth: 'You can put down 5%, 10%, 20%, or more if you prefer. Many veterans choose to reduce their funding fee or build equity faster by putting down a small amount.',
    },
    {
      myth: 'VA loans take forever to close.',
      truth: 'VA loans close on a similar timeline (30-45 days) as conventional loans. Lender efficiency matters more than loan type.',
    },
    {
      myth: 'I can\u2019t use my VA loan if I\u2019m still on active duty.',
      truth: 'Active duty service members can use their VA loan entitlement. You\u2019ll need a COE and proof of service.',
    },
    {
      myth: 'The property must be perfect for a VA appraisal.',
      truth: 'VA appraisals ensure safety and sanitary conditions, but homes don\u2019t need to be new or high-end.',
    },
    {
      myth: 'My VA loan entitlement runs out after one purchase.',
      truth: 'You can reuse your entitlement for multiple purchases. Paying off a prior VA loan restores your full entitlement.',
    },
    {
      myth: 'I need a specific credit score to qualify.',
      truth: 'VA loans are typically more flexible with credit. Many lenders approve borrowers with scores in the 580-620 range.',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Martinez',
      role: 'Army Veteran, San Antonio, TX',
      quote: 'The VA loan made homeownership a reality for my family. Zero down payment was life-changing.',
      rating: 5,
    },
    {
      name: 'Michael Chen',
      role: 'Navy Officer, San Diego, CA',
      quote: 'My agent understood VA loans inside and out. The process was smooth and transparent from start to finish.',
      rating: 5,
    },
    {
      name: 'Jennifer Rodriguez',
      role: 'Air Force Veteran, Colorado Springs, CO',
      quote: 'No PMI, competitive rates, and supportive lending team. Every veteran should know about this benefit.',
      rating: 5,
    },
  ];

  // ============================================================================
  // Funding Fee Calculation
  // ============================================================================

  const calculateFundingFee = useMemo(() => {
    const baseRates = {
      'first-time': 2.3,
      'subsequent': 3.6,
      'no-down-reserve': 1.25,
    };

    const baseRate = baseRates[fundingFeeInput.serviceCategory] || 2.3;
    const downPaymentPercent = fundingFeeInput.downPayment || 0;
    let adjustedRate = baseRate;

    if (downPaymentPercent >= 10) {
      adjustedRate = baseRate * 0.75;
    } else if (downPaymentPercent >= 5) {
      adjustedRate = baseRate * 0.9;
    }

    // Assume $400k purchase price for example
    const loanAmount = 400000 * (1 - downPaymentPercent / 100);
    const fundingFee = (loanAmount * adjustedRate) / 100;

    return {
      rate: adjustedRate.toFixed(2),
      fee: fundingFee.toFixed(0),
      loanAmount: loanAmount.toFixed(0),
    };
  }, [fundingFeeInput]);

  // ============================================================================
  // Handlers
  // ============================================================================

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setContactSubmitted(true);
    setTimeout(() => {
      setContactForm({ name: '', email: '', serviceStatus: '' });
      setContactSubmitted(false);
    }, 3000);
  };

  // ============================================================================
  // Styles
  // ============================================================================

  const styles = {
    container: {
      width: '100%',
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '0 20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      color: 'var(--le-text)',
      backgroundColor: 'var(--le-bg)',
    },
    section: {
      padding: '80px 0',
      borderBottom: `1px solid var(--le-border)`,
    },
    sectionLast: {
      padding: '80px 0',
      borderBottom: 'none',
    },
    heroSection: {
      padding: '100px 0',
      background: `linear-gradient(135deg, var(--le-surface) 0%, rgba(100, 116, 139, 0.05) 100%)`,
      textAlign: 'center',
    },
    heroTitle: {
      fontSize: '56px',
      fontWeight: '700',
      marginBottom: '20px',
      lineHeight: '1.2',
      maxWidth: '900px',
      margin: '0 auto 20px',
      color: 'var(--le-text)',
    },
    heroSubtitle: {
      fontSize: '20px',
      color: 'var(--le-text-secondary)',
      maxWidth: '700px',
      margin: '0 auto 40px',
      lineHeight: '1.6',
    },
    ctaButton: {
      display: 'inline-block',
      padding: '14px 40px',
      backgroundColor: 'var(--le-accent)',
      color: '#fff',
      textDecoration: 'none',
      borderRadius: '8px',
      fontWeight: '600',
      fontSize: '16px',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
    ctaButtonHover: {
      opacity: 0.9,
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
    },
    grid2: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
      gap: '40px',
      marginTop: '50px',
    },
    grid4: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '30px',
      marginTop: '50px',
    },
    card: {
      padding: '30px',
      backgroundColor: 'var(--le-surface)',
      borderRadius: '12px',
      border: `1px solid var(--le-border)`,
      transition: 'all 0.3s ease',
    },
    cardHover: {
      boxShadow: '0 12px 40px rgba(0, 0, 0, 0.08)',
      borderColor: 'var(--le-accent)',
    },
    benefitCard: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '20px',
      padding: '24px',
      backgroundColor: 'var(--le-surface)',
      borderRadius: '12px',
      border: `1px solid var(--le-border)`,
    },
    benefitIcon: {
      minWidth: '60px',
      width: '60px',
      height: '60px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: `rgba(76, 175, 80, 0.1)`,
      borderRadius: '8px',
      color: 'var(--le-accent)',
    },
    benefitContent: {
      flex: 1,
    },
    benefitTitle: {
      fontSize: '18px',
      fontWeight: '700',
      marginBottom: '8px',
      color: 'var(--le-text)',
    },
    benefitDescription: {
      fontSize: '15px',
      color: 'var(--le-text-secondary)',
      lineHeight: '1.5',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      marginTop: '30px',
      backgroundColor: 'var(--le-surface)',
      borderRadius: '8px',
      overflow: 'hidden',
    },
    tableHeader: {
      backgroundColor: `rgba(76, 175, 80, 0.08)`,
      borderBottom: `2px solid var(--le-accent)`,
    },
    tableHeaderCell: {
      padding: '16px',
      textAlign: 'left',
      fontWeight: '700',
      color: 'var(--le-text)',
      fontSize: '14px',
    },
    tableCell: {
      padding: '16px',
      borderBottom: `1px solid var(--le-border)`,
      fontSize: '15px',
    },
    tableRow: {
      backgroundColor: 'var(--le-surface)',
    },
    tableRowAlt: {
      backgroundColor: `rgba(0, 0, 0, 0.02)`,
    },
    timelineContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '20px',
      marginTop: '40px',
    },
    timelineItem: {
      padding: '24px',
      backgroundColor: 'var(--le-surface)',
      borderRadius: '12px',
      border: `1px solid var(--le-border)`,
      position: 'relative',
    },
    timelineItemNumber: {
      display: 'inline-block',
      width: '40px',
      height: '40px',
      backgroundColor: 'var(--le-accent)',
      color: '#fff',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: '700',
      marginBottom: '12px',
      fontSize: '16px',
    },
    timelineStage: {
      fontSize: '16px',
      fontWeight: '700',
      marginBottom: '8px',
      color: 'var(--le-text)',
    },
    timelineDescription: {
      fontSize: '14px',
      color: 'var(--le-text-secondary)',
      lineHeight: '1.5',
    },
    accordionItem: {
      marginBottom: '20px',
      backgroundColor: 'var(--le-surface)',
      borderRadius: '8px',
      border: `1px solid var(--le-border)`,
      overflow: 'hidden',
    },
    accordionHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '20px',
      cursor: 'pointer',
      backgroundColor: 'var(--le-surface)',
      border: 'none',
      width: '100%',
      fontSize: '16px',
      fontWeight: '600',
      color: 'var(--le-text)',
      transition: 'all 0.3s ease',
    },
    accordionHeaderActive: {
      backgroundColor: `rgba(76, 175, 80, 0.05)`,
      borderBottom: `2px solid var(--le-accent)`,
    },
    accordionContent: {
      padding: '20px',
      backgroundColor: 'var(--le-surface)',
      borderTop: `1px solid var(--le-border)`,
      fontSize: '15px',
      lineHeight: '1.6',
      color: 'var(--le-text-secondary)',
    },
    testimonialCard: {
      padding: '30px',
      backgroundColor: 'var(--le-surface)',
      borderRadius: '12px',
      border: `1px solid var(--le-border)`,
      position: 'relative',
    },
    testimonialQuote: {
      fontSize: '16px',
      fontStyle: 'italic',
      marginBottom: '16px',
      lineHeight: '1.6',
      color: 'var(--le-text)',
    },
    testimonialAuthor: {
      fontWeight: '700',
      color: 'var(--le-text)',
      fontSize: '16px',
    },
    testimonialRole: {
      fontSize: '13px',
      color: 'var(--le-text-secondary)',
      marginTop: '4px',
    },
    stars: {
      color: '#FDB022',
      fontSize: '14px',
      marginBottom: '12px',
    },
    form: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '20px',
      marginTop: '30px',
      padding: '30px',
      backgroundColor: 'var(--le-surface)',
      borderRadius: '12px',
      border: `1px solid var(--le-border)`,
    },
    formInput: {
      padding: '12px 16px',
      borderRadius: '8px',
      border: `1px solid var(--le-border)`,
      fontSize: '15px',
      color: 'var(--le-text)',
      backgroundColor: '#fff',
      fontFamily: 'inherit',
    },
    formInputFocus: {
      outline: 'none',
      borderColor: 'var(--le-accent)',
      boxShadow: '0 0 0 3px rgba(76, 175, 80, 0.1)',
    },
    formButton: {
      gridColumn: '1 / -1',
      padding: '14px 40px',
      backgroundColor: 'var(--le-accent)',
      color: '#fff',
      border: 'none',
      borderRadius: '8px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
    successMessage: {
      gridColumn: '1 / -1',
      padding: '16px',
      backgroundColor: '#f0f8f4',
      color: '#2d5f3f',
      borderRadius: '8px',
      fontSize: '15px',
      textAlign: 'center',
    },
    sectionTitle: {
      fontSize: '42px',
      fontWeight: '700',
      marginBottom: '16px',
      color: 'var(--le-text)',
    },
    sectionSubtitle: {
      fontSize: '18px',
      color: 'var(--le-text-secondary)',
      maxWidth: '600px',
      lineHeight: '1.6',
    },
    calculatorGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '30px',
      marginTop: '40px',
    },
    calculatorInput: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
    },
    calculatorLabel: {
      fontSize: '14px',
      fontWeight: '600',
      color: 'var(--le-text)',
    },
    calculatorSelect: {
      padding: '10px 14px',
      borderRadius: '8px',
      border: `1px solid var(--le-border)`,
      fontSize: '14px',
      color: 'var(--le-text)',
      backgroundColor: '#fff',
      fontFamily: 'inherit',
      cursor: 'pointer',
    },
    calculatorRange: {
      width: '100%',
      height: '6px',
      borderRadius: '3px',
      background: `linear-gradient(to right, var(--le-accent), var(--le-accent))`,
      outline: 'none',
      cursor: 'pointer',
    },
    calculatorResult: {
      padding: '24px',
      backgroundColor: `rgba(76, 175, 80, 0.08)`,
      borderRadius: '8px',
      border: `2px solid var(--le-accent)`,
    },
    calculatorResultLabel: {
      fontSize: '14px',
      fontWeight: '600',
      color: 'var(--le-text-secondary)',
      marginBottom: '8px',
    },
    calculatorResultValue: {
      fontSize: '32px',
      fontWeight: '700',
      color: 'var(--le-accent)',
    },
    eligibilityButton: {
      padding: '14px 24px',
      marginRight: '12px',
      marginBottom: '12px',
      backgroundColor: 'var(--le-surface)',
      border: `2px solid var(--le-border)`,
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '15px',
      fontWeight: '600',
      color: 'var(--le-text)',
      transition: 'all 0.3s ease',
    },
    eligibilityButtonActive: {
      backgroundColor: 'var(--le-accent)',
      color: '#fff',
      borderColor: 'var(--le-accent)',
    },
    relocationGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '24px',
      marginTop: '40px',
    },
  };

  // ============================================================================
  // Render
  // ============================================================================

  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <section style={styles.heroSection}>
        <h1 style={styles.heroTitle}>Your Home. Your Achievement. Your VA Loan.</h1>
        <p style={styles.heroSubtitle}>
          Complete guide to VA loans, military relocation, and expert home buying strategies for veterans and active duty service members.
        </p>
        <button
          style={styles.ctaButton}
          onMouseEnter={(e) => Object.assign(e.target.style, styles.ctaButtonHover)}
          onMouseLeave={(e) => Object.assign(e.target.style, { opacity: '1', transform: 'none', boxShadow: 'none' })}
        >
          Connect with a VA Specialist Agent
        </button>
      </section>

      {/* VA Loan Benefits */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>VA Loan Benefits Overview</h2>
        <p style={styles.sectionSubtitle}>
          Designed specifically for those who served, VA loans offer unmatched advantages to help you achieve homeownership.
        </p>
        <div style={styles.grid4}>
          {vaLoanBenefits.map((benefit, idx) => {
            const Icon = benefit.icon;
            return (
              <div
                key={idx}
                style={styles.benefitCard}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.08)';
                  e.currentTarget.style.borderColor = 'var(--le-accent)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = 'var(--le-border)';
                }}
              >
                <div style={styles.benefitIcon}>
                  <Icon />
                </div>
                <div style={styles.benefitContent}>
                  <div style={styles.benefitTitle}>{benefit.title}</div>
                  <div style={styles.benefitDescription}>{benefit.description}</div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Eligibility Checker */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>VA Loan Eligibility Checker</h2>
        <p style={styles.sectionSubtitle}>
          Find out quickly if you\u2019re eligible for a VA loan. Answer a few simple questions.
        </p>
        <div style={{ marginTop: '40px' }}>
          <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '24px', color: 'var(--le-text)' }}>
            {eligibilityQuestions[eligibilityStep].question}
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            {eligibilityQuestions[eligibilityStep].answers.map((answer, idx) => (
              <button
                key={idx}
                style={{
                  ...styles.eligibilityButton,
                  ...(eligibilityStep === idx ? styles.eligibilityButtonActive : {}),
                }}
                onClick={() => setEligibilityStep((prev) => (prev < eligibilityQuestions.length - 1 ? prev + 1 : prev))}
              >
                {answer}
              </button>
            ))}
          </div>
          {eligibilityStep === eligibilityQuestions.length - 1 && (
            <div
              style={{
                marginTop: '32px',
                padding: '24px',
                backgroundColor: `rgba(76, 175, 80, 0.08)`,
                borderRadius: '12px',
                border: `2px solid var(--le-accent)`,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <CheckCircleIcon />
                <div>
                  <div style={{ fontWeight: '700', color: 'var(--le-text)', marginBottom: '8px' }}>You likely qualify!</div>
                  <p style={{ fontSize: '15px', color: 'var(--le-text-secondary)', lineHeight: '1.6' }}>
                    Based on your answers, you may be eligible for a VA loan. Next step: Get your Certificate of Eligibility (COE) and connect with a VA-specialized lender. Our team is ready to guide you through the entire process.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* VA Loan Process Timeline */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>VA Loan Process Timeline</h2>
        <p style={styles.sectionSubtitle}>
          From Certificate of Eligibility to keys in hand: here\u2019s what to expect.
        </p>
        <div style={styles.timelineContainer}>
          {timelineSteps.map((step, idx) => (
            <div key={idx} style={styles.timelineItem}>
              <div style={styles.timelineItemNumber}>{idx + 1}</div>
              <div style={styles.timelineStage}>{step.stage}</div>
              <div style={styles.timelineDescription}>{step.description}</div>
            </div>
          ))}
        </div>
      </section>

      {/* VA vs Conventional Comparison */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>VA Loan vs. Conventional: Side-by-Side</h2>
        <p style={styles.sectionSubtitle}>
          See how VA loans stack up against traditional financing options.
        </p>
        <table style={styles.table}>
          <thead style={styles.tableHeader}>
            <tr>
              <th style={styles.tableHeaderCell}>Feature</th>
              <th style={styles.tableHeaderCell}>VA Loan</th>
              <th style={styles.tableHeaderCell}>Conventional Loan</th>
            </tr>
          </thead>
          <tbody>
            {comparisonData.map((row, idx) => (
              <tr key={idx} style={idx % 2 === 0 ? styles.tableRow : styles.tableRowAlt}>
                <td style={styles.tableCell}>{row.feature}</td>
                <td style={styles.tableCell}>{row.va}</td>
                <td style={styles.tableCell}>{row.conventional}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Military Relocation Guide */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Military Relocation Guide</h2>
        <p style={styles.sectionSubtitle}>
          PCS moving? We\u2019ve got tips to help you navigate a new home purchase in an unfamiliar area.
        </p>
        <div style={styles.relocationGrid}>
          {militaryRelocationTips.map((tip, idx) => (
            <div key={idx} style={styles.card}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <MapPinIcon />
                <h4 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--le-text)', margin: '0' }}>
                  {tip.title}
                </h4>
              </div>
              <p style={{ fontSize: '15px', color: 'var(--le-text-secondary)', lineHeight: '1.5', margin: '0' }}>
                {tip.description}
              </p>
            </div>
          ))}
        </div>
        <div
          style={{
            marginTop: '40px',
            padding: '30px',
            backgroundColor: 'var(--le-surface)',
            borderRadius: '12px',
            border: `1px solid var(--le-border)`,
          }}
        >
          <h4 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px', color: 'var(--le-text)' }}>
            BAH (Basic Allowance for Housing) Tips
          </h4>
          <p style={{ fontSize: '15px', color: 'var(--le-text-secondary)', lineHeight: '1.6', margin: '0 0 12px 0' }}>
            Your BAH can significantly boost your purchasing power. If your BAH exceeds rent or mortgage, you can use the difference to build equity faster. Talk to your lender about incorporating BAH into your debt-to-income ratio.
          </p>
        </div>
      </section>

      {/* VA Funding Fee Calculator */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>VA Funding Fee Calculator</h2>
        <p style={styles.sectionSubtitle}>
          Estimate your one-time VA funding fee based on service category and down payment.
        </p>
        <div style={styles.calculatorGrid}>
          <div>
            <div style={styles.calculatorInput}>
              <label style={styles.calculatorLabel}>Service Category</label>
              <select
                style={styles.calculatorSelect}
                value={fundingFeeInput.serviceCategory}
                onChange={(e) =>
                  setFundingFeeInput({ ...fundingFeeInput, serviceCategory: e.target.value })
                }
              >
                <option value="first-time">First-Time Buyer (2.3%)</option>
                <option value="subsequent">Subsequent Use (3.6%)</option>
                <option value="no-down-reserve">No Down Payment Reserve Component (1.25%)</option>
              </select>
            </div>
          </div>
          <div>
            <div style={styles.calculatorInput}>
              <label style={styles.calculatorLabel}>Down Payment: {fundingFeeInput.downPayment}%</label>
              <input
                type="range"
                min="0"
                max="50"
                value={fundingFeeInput.downPayment}
                onChange={(e) =>
                  setFundingFeeInput({ ...fundingFeeInput, downPayment: parseInt(e.target.value) })
                }
                style={styles.calculatorRange}
              />
            </div>
          </div>
          <div style={styles.calculatorResult}>
            <div style={styles.calculatorResultLabel}>Estimated Funding Fee</div>
            <div style={styles.calculatorResultValue}>${calculateFundingFee.fee}</div>
            <div style={{ fontSize: '13px', color: 'var(--le-text-secondary)', marginTop: '8px' }}>
              Rate: {calculateFundingFee.rate}% on ${(parseFloat(calculateFundingFee.loanAmount) / 1000).toFixed(0)}k loan
            </div>
          </div>
        </div>
      </section>

      {/* Common Myths FAQ */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Common VA Loan Myths Debunked</h2>
        <p style={styles.sectionSubtitle}>
          Separate fact from fiction. Here\u2019s the truth about VA loans.
        </p>
        <div style={{ marginTop: '40px' }}>
          {myths.map((item, idx) => (
            <div key={idx} style={styles.accordionItem}>
              <button
                style={{
                  ...styles.accordionHeader,
                  ...(expandedMythIndex === idx ? styles.accordionHeaderActive : {}),
                }}
                onClick={() => setExpandedMythIndex(expandedMythIndex === idx ? null : idx)}
              >
                <span>{item.myth}</span>
                <ChevronDownIcon />
              </button>
              {expandedMythIndex === idx && (
                <div style={styles.accordionContent}>
                  <strong style={{ color: 'var(--le-accent)' }}>The Truth:</strong> {item.truth}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Veteran Homebuyer Success Stories</h2>
        <p style={styles.sectionSubtitle}>
          Real veterans sharing their VA loan journey and homeownership experience.
        </p>
        <div style={styles.grid2}>
          {testimonials.map((testimonial, idx) => (
            <div
              key={idx}
              style={styles.testimonialCard}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.08)';
                e.currentTarget.style.borderColor = 'var(--le-accent)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = 'var(--le-border)';
              }}
            >
              <div style={styles.stars}>
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
              <p style={styles.testimonialQuote}>{testimonial.quote}</p>
              <div style={styles.testimonialAuthor}>{testimonial.name}</div>
              <div style={styles.testimonialRole}>{testimonial.role}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Lead Capture CTA #1 */}
      <section style={styles.section}>
        <div
          style={{
            padding: '50px',
            backgroundColor: `rgba(76, 175, 80, 0.08)`,
            borderRadius: '12px',
            border: `2px solid var(--le-accent)`,
            textAlign: 'center',
          }}
        >
          <h3 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '16px', color: 'var(--le-text)' }}>
            Ready to Get Started?
          </h3>
          <p style={{ fontSize: '16px', color: 'var(--le-text-secondary)', maxWidth: '600px', margin: '0 auto 30px', lineHeight: '1.6' }}>
            A VA-specialized agent can walk you through pre-approval, home search, and VA appraisal. Let\u2019s find your next home.
          </p>
          <button
            style={styles.ctaButton}
            onMouseEnter={(e) => Object.assign(e.target.style, styles.ctaButtonHover)}
            onMouseLeave={(e) => Object.assign(e.target.style, { opacity: '1', transform: 'none', boxShadow: 'none' })}
          >
            Connect with a VA Specialist Agent
          </button>
        </div>
      </section>

      {/* Contact Form */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Get Your Free VA Home Buying Guide</h2>
        <p style={styles.sectionSubtitle}>
          Enter your information and we\u2019ll send you resources, timelines, and next steps for your VA loan journey.
        </p>
        <form style={styles.form} onSubmit={handleContactSubmit}>
          <input
            type="text"
            placeholder="Your Full Name"
            value={contactForm.name}
            onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
            style={styles.formInput}
            required
          />
          <input
            type="email"
            placeholder="Email Address"
            value={contactForm.email}
            onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
            style={styles.formInput}
            required
          />
          <select
            value={contactForm.serviceStatus}
            onChange={(e) => setContactForm({ ...contactForm, serviceStatus: e.target.value })}
            style={styles.formInput}
            required
          >
            <option value="">-- Select Service Status --</option>
            <option value="active-duty">Active Duty</option>
            <option value="reserve">Reserve/National Guard</option>
            <option value="veteran">Veteran</option>
            <option value="spouse">Surviving Spouse</option>
          </select>
          <button type="submit" style={styles.formButton}>
            Send Me the Free Guide
          </button>
          {contactSubmitted && (
            <div style={styles.successMessage}>
              Success! Check your email for the VA Home Buying Guide. Our team will reach out within 24 hours.
            </div>
          )}
        </form>
      </section>

      {/* Lead Capture CTA #2 */}
      <section style={styles.sectionLast}>
        <div
          style={{
            padding: '50px',
            backgroundColor: 'var(--le-surface)',
            borderRadius: '12px',
            border: `1px solid var(--le-border)`,
            textAlign: 'center',
          }}
        >
          <h3 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '16px', color: 'var(--le-text)' }}>
            Your Home Deserves a Veteran\u2019s Advantage
          </h3>
          <p style={{ fontSize: '16px', color: 'var(--le-text-secondary)', maxWidth: '600px', margin: '0 auto 30px', lineHeight: '1.6' }}>
            Unlock zero down payment, competitive rates, and expert guidance. Our VA-specialized agents are ready to help.
          </p>
          <button
            style={styles.ctaButton}
            onMouseEnter={(e) => Object.assign(e.target.style, styles.ctaButtonHover)}
            onMouseLeave={(e) => Object.assign(e.target.style, { opacity: '1', transform: 'none', boxShadow: 'none' })}
          >
            Schedule Your Free VA Loan Consultation
          </button>
        </div>
      </section>
    </div>
  );
}
