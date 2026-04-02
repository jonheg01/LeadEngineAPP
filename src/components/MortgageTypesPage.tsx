'use client';

import React, { useState } from 'react';

export default function MortgageTypesPage() {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [calculatorInputs, setCalculatorInputs] = useState({
    loanType: 'conventional',
    loanAmount: 300000,
    interestRate: 6.5,
    loanTerm: 30,
  });
  const [comparisonFilter, setComparisonFilter] = useState<string | null>(null);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    creditScore: 'good',
    downPayment: '',
    propertyType: 'primary',
  });

  // Mortgage type definitions
  const mortgageTypes = [
    {
      id: 'conventional',
      name: 'Conventional',
      emoji: '🏦',
      shortDesc: 'Traditional loans not backed by government',
      fullDesc: 'Conventional mortgages are standard loans issued by private lenders without government guarantees. They typically require higher credit scores and larger down payments but offer flexibility in terms and rates.',
      downPaymentMin: '3-20%',
      creditScoreMin: '620',
      pmiRequired: 'Yes, if down payment < 20%',
      avgRate: '6.25-7.5%',
      maxLoanAmount: 'Up to $766,550 (conforming)',
      bestFor: 'Borrowers with good credit, stable income, and ability to put down 3%+ down payment',
    },
    {
      id: 'fha',
      name: 'FHA Loan',
      emoji: '🏛️',
      shortDesc: 'Government-backed loans for first-time buyers',
      fullDesc: 'FHA loans are insured by the Federal Housing Administration and designed to help borrowers with lower credit scores and smaller down payments. They\u2019re popular with first-time homebuyers.',
      downPaymentMin: '3.5% (may go lower)',
      creditScoreMin: '500+',
      pmiRequired: 'Yes, always (UFMIP + annual MIP)',
      avgRate: '6.0-7.0%',
      maxLoanAmount: 'Varies by county; typically $766,550-$1,149,825',
      bestFor: 'First-time homebuyers, lower credit scores, those with smaller down payments',
    },
    {
      id: 'va',
      name: 'VA Loan',
      emoji: '🎖️',
      shortDesc: 'Zero-down mortgages for veterans and active service',
      fullDesc: 'VA loans are guaranteed by the Department of Veterans Affairs for eligible military service members. They offer zero down payment, no PMI, and often better rates than conventional loans.',
      downPaymentMin: '0%',
      creditScoreMin: '580+',
      pmiRequired: 'No',
      avgRate: '5.5-6.5%',
      maxLoanAmount: 'No limit (lender-dependent)',
      bestFor: 'Active military, veterans, surviving spouses of service members',
    },
    {
      id: 'usda',
      name: 'USDA Loan',
      emoji: '🚜',
      shortDesc: 'Zero-down loans for rural properties',
      fullDesc: 'USDA loans are backed by the U.S. Department of Agriculture and designed for rural and suburban homebuyers. They offer zero down payment and competitive rates for eligible properties.',
      downPaymentMin: '0%',
      creditScoreMin: '620+',
      pmiRequired: 'No PMI; annual fee instead',
      avgRate: '5.75-6.75%',
      maxLoanAmount: 'Property-value dependent; no set limit',
      bestFor: 'Rural and suburban homebuyers, zero-down seekers, moderate to good credit',
    },
    {
      id: 'jumbo',
      name: 'Jumbo Loan',
      emoji: '💎',
      shortDesc: 'Large loans exceeding conforming limits',
      fullDesc: 'Jumbo loans exceed the conforming loan limits ($766,550 for single-family homes in most areas) and are used for high-value properties. They\u2019re tailored to affluent buyers.',
      downPaymentMin: '10-20%',
      creditScoreMin: '700+',
      pmiRequired: 'Usually no PMI; compensating factors',
      avgRate: '6.5-8.0%',
      maxLoanAmount: 'No limit; lender-dependent',
      bestFor: 'High-net-worth buyers, luxury homes, expensive markets',
    },
    {
      id: 'arm',
      name: 'ARM (Adjustable-Rate)',
      emoji: '📈',
      shortDesc: 'Variable rates that adjust after initial period',
      fullDesc: 'ARMs start with a lower initial rate (fixed for 3, 5, 7, or 10 years), then adjust periodically based on market conditions. Ideal for those planning to sell or refinance before rate adjustments.',
      downPaymentMin: '3-20%',
      creditScoreMin: '620+',
      pmiRequired: 'Yes, if down payment < 20%',
      avgRate: '5.5-6.5% (initial)',
      maxLoanAmount: 'Up to $766,550 (conforming)',
      bestFor: 'Short-term homeowners, those expecting income growth, rate-comfortable borrowers',
    },
    {
      id: 'fixed',
      name: 'Fixed-Rate',
      emoji: '🔒',
      shortDesc: 'Same rate and payment for entire loan term',
      fullDesc: 'Fixed-rate mortgages lock in the same interest rate and monthly payment for the entire loan term (typically 15, 20, or 30 years). They\u2019re the most popular and predictable option.',
      downPaymentMin: '3-20%',
      creditScoreMin: '620+',
      pmiRequired: 'Yes, if down payment < 20%',
      avgRate: '6.0-7.5%',
      maxLoanAmount: 'Up to $766,550 (conforming)',
      bestFor: 'Most homebuyers; those who value predictability and stability',
    },
    {
      id: 'interestonly',
      name: 'Interest-Only',
      emoji: '📊',
      shortDesc: 'Pay interest only for initial period',
      fullDesc: 'Interest-only mortgages allow borrowers to pay only interest for 5-10 years, then transition to principal + interest. They offer lower initial payments but higher long-term costs.',
      downPaymentMin: '10-25%',
      creditScoreMin: '700+',
      pmiRequired: 'No (higher down payment req\u2019d)',
      avgRate: '6.0-7.5%',
      maxLoanAmount: 'Up to $766,550 (conforming)',
      bestFor: 'Investors, high-income earners, those planning to refinance, short-term holders',
    },
    {
      id: 'bridge',
      name: 'Bridge Loan',
      emoji: '🌉',
      shortDesc: 'Short-term financing to bridge property gaps',
      fullDesc: 'Bridge loans provide short-term funding (typically 6-12 months) to help buyers bridge the gap between purchasing a new home and selling their current one.',
      downPaymentMin: 'Varies (often 10-25%)',
      creditScoreMin: '700+',
      pmiRequired: 'No',
      avgRate: '7.0-9.0%',
      maxLoanAmount: 'Up to 80% of combined home values',
      bestFor: 'Buyers needing quick funding, those selling another property, competitive markets',
    },
    {
      id: 'construction',
      name: 'Construction Loan',
      emoji: '🏗️',
      shortDesc: 'Financing for new construction homes',
      fullDesc: 'Construction loans fund the building of a new home, with funds released in phases as construction progresses. They\u2019re usually short-term, converting to permanent mortgages upon completion.',
      downPaymentMin: '10-20%',
      creditScoreMin: '680+',
      pmiRequired: 'Typically no',
      avgRate: '7.0-8.5%',
      maxLoanAmount: 'Up to appraised value of finished home',
      bestFor: 'New construction buyers, custom home builders, those building on owned land',
    },
  ];

  // Comparison table data
  const comparisonData = [
    {
      criterion: 'Min Down Payment',
      conventional: '3-20%',
      fha: '3.5%',
      va: '0%',
      usda: '0%',
      jumbo: '10-20%',
      arm: '3-20%',
      fixed: '3-20%',
      interestonly: '10-25%',
      bridge: '10-25%',
      construction: '10-20%',
    },
    {
      criterion: 'Min Credit Score',
      conventional: '620',
      fha: '500+',
      va: '580+',
      usda: '620+',
      jumbo: '700+',
      arm: '620+',
      fixed: '620+',
      interestonly: '700+',
      bridge: '700+',
      construction: '680+',
    },
    {
      criterion: 'PMI Required',
      conventional: 'Yes (<20%)',
      fha: 'Yes (always)',
      va: 'No',
      usda: 'No (fee instead)',
      jumbo: 'Usually no',
      arm: 'Yes (<20%)',
      fixed: 'Yes (<20%)',
      interestonly: 'No',
      bridge: 'No',
      construction: 'No',
    },
    {
      criterion: 'Avg Interest Rate',
      conventional: '6.25-7.5%',
      fha: '6.0-7.0%',
      va: '5.5-6.5%',
      usda: '5.75-6.75%',
      jumbo: '6.5-8.0%',
      arm: '5.5-6.5%',
      fixed: '6.0-7.5%',
      interestonly: '6.0-7.5%',
      bridge: '7.0-9.0%',
      construction: '7.0-8.5%',
    },
    {
      criterion: 'Max Loan Amount',
      conventional: '$766,550',
      fha: '$766,550-$1,149,825',
      va: 'Unlimited',
      usda: 'Property-dependent',
      jumbo: 'Unlimited',
      arm: '$766,550',
      fixed: '$766,550',
      interestonly: '$766,550',
      bridge: '80% combined value',
      construction: 'Up to appraised value',
    },
    {
      criterion: 'Flexibility',
      conventional: 'High',
      fha: 'Moderate',
      va: 'Low restrictions',
      usda: 'Property-limited',
      jumbo: 'Very high',
      arm: 'High',
      fixed: 'Moderate',
      interestonly: 'High',
      bridge: 'Moderate',
      construction: 'High',
    },
  ];

  // Calculate monthly payment
  const calculatePayment = () => {
    const principal = calculatorInputs.loanAmount;
    const monthlyRate = calculatorInputs.interestRate / 100 / 12;
    const numPayments = calculatorInputs.loanTerm * 12;

    if (monthlyRate === 0) {
      return (principal / numPayments).toFixed(2);
    }

    const monthlyPayment =
      (principal *
        (monthlyRate * Math.pow(1 + monthlyRate, numPayments))) /
      (Math.pow(1 + monthlyRate, numPayments) - 1);

    // Add PMI if applicable
    let pmiMonthly = 0;
    const downPaymentPercent =
      ((calculatorInputs.loanAmount - principal) / calculatorInputs.loanAmount) *
      100;
    if (
      (calculatorInputs.loanType === 'conventional' ||
        calculatorInputs.loanType === 'arm' ||
        calculatorInputs.loanType === 'fixed') &&
      downPaymentPercent < 20
    ) {
      pmiMonthly = (principal * 0.005) / 12; // ~0.5% annually
    }

    return (monthlyPayment + pmiMonthly).toFixed(2);
  };

  // Down payment guide data
  const downPaymentGuide = [
    {
      type: 'Conventional',
      minimum: '3%',
      recommended: '20%',
      zeroDown: 'No',
      notes: 'Less than 20% requires PMI',
    },
    {
      type: 'FHA',
      minimum: '3.5%',
      recommended: '10%',
      zeroDown: 'No',
      notes: 'Always requires mortgage insurance',
    },
    {
      type: 'VA',
      minimum: '0%',
      recommended: '0%',
      zeroDown: 'Yes',
      notes: 'No down payment required for eligible veterans',
    },
    {
      type: 'USDA',
      minimum: '0%',
      recommended: '0%',
      zeroDown: 'Yes',
      notes: 'Zero down for eligible rural properties',
    },
    {
      type: 'Jumbo',
      minimum: '10%',
      recommended: '20%',
      zeroDown: 'No',
      notes: 'Higher down payment for larger loans',
    },
  ];

  // FAQ data
  const faqs = [
    {
      question: 'What\u2019s the difference between a fixed-rate and ARM?',
      answer:
        'Fixed-rate mortgages lock in the same interest rate for the entire loan term, providing predictable payments. ARMs have a lower initial fixed rate that adjusts periodically based on market conditions, potentially increasing your payment significantly.',
    },
    {
      question: 'Do I need 20% down to avoid PMI?',
      answer:
        'Yes, putting down 20% or more on a conventional loan eliminates PMI. However, many borrowers can get approved with 3-5% down; they\u2019ll just pay PMI until they reach 20% equity. FHA loans always require mortgage insurance regardless of down payment.',
    },
    {
      question: 'What is PMI and can I remove it?',
      answer:
        'PMI (Private Mortgage Insurance) protects lenders if you default. You can remove PMI once you reach 20% equity in your home, either through appreciation or by paying down the principal. Some lenders remove it automatically at 22% equity.',
    },
    {
      question: 'Who is eligible for a VA loan?',
      answer:
        'Active-duty service members, veterans, and surviving spouses of eligible service members can qualify for VA loans. You\u2019ll need a Certificate of Eligibility from the VA. VA loans offer zero down, no PMI, and competitive rates.',
    },
    {
      question: 'Can I refinance my mortgage?',
      answer:
        'Yes, refinancing allows you to replace your current mortgage with a new one, typically to lower your rate, change your loan term, or access home equity. Refinancing involves new closing costs, so compare savings carefully.',
    },
    {
      question: 'What\u2019s the best mortgage type for me?',
      answer:
        'The best mortgage depends on your credit score, down payment amount, job stability, risk tolerance, and timeline. Fixed-rate loans are safest for long-term buyers; ARMs suit those planning short stays. VA/USDA loans are best if you\u2019re eligible.',
    },
    {
      question: 'How do interest rates affect my monthly payment?',
      answer:
        'A higher interest rate increases your monthly payment and total interest paid over the loan term. Even a 0.5% difference can mean thousands in additional interest. Shop rates from multiple lenders to get the best deal.',
    },
    {
      question: 'Can self-employed people get mortgages?',
      answer:
        'Yes, self-employed borrowers can qualify, but they\u2019ll need to provide additional documentation like tax returns, profit-and-loss statements, and bank statements. Some lenders specialize in self-employed financing with more flexible requirements.',
    },
  ];

  // Refinancing break-even concept
  const refinanceScenario = {
    currentRate: 7.5,
    newRate: 6.5,
    loanAmount: 300000,
    closingCosts: 6000,
  };

  const calculateBreakEven = () => {
    const oldPayment =
      (refinanceScenario.loanAmount *
        (refinanceScenario.currentRate / 100 / 12 *
          Math.pow(1 + refinanceScenario.currentRate / 100 / 12, 360))) /
      (Math.pow(1 + refinanceScenario.currentRate / 100 / 12, 360) - 1);

    const newPayment =
      (refinanceScenario.loanAmount *
        (refinanceScenario.newRate / 100 / 12 *
          Math.pow(1 + refinanceScenario.newRate / 100 / 12, 360))) /
      (Math.pow(1 + refinanceScenario.newRate / 100 / 12, 360) - 1);

    const monthlySavings = oldPayment - newPayment;
    return Math.ceil(refinanceScenario.closingCosts / monthlySavings);
  };

  // Inline SVG Icons
  const CheckIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  );

  const ChevronDownIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  );

  const ChevronUpIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <polyline points="18 15 12 9 6 15"></polyline>
    </svg>
  );

  const ArrowRightIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <line x1="5" y1="12" x2="19" y2="12"></line>
      <polyline points="12 5 19 12 12 19"></polyline>
    </svg>
  );

  const styles = {
    page: {
      backgroundColor: 'var(--le-bg)',
      color: 'var(--le-text)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      lineHeight: '1.6',
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 20px',
    },
    hero: {
      backgroundColor: 'linear-gradient(135deg, var(--le-primary) 0%, var(--le-primary-hover) 100%)',
      padding: '80px 20px',
      textAlign: 'center',
      color: '#ffffff',
      marginBottom: '60px',
    },
    heroTitle: {
      fontSize: '3.5rem',
      fontWeight: '700',
      marginBottom: '20px',
      lineHeight: '1.2',
    },
    heroSubtitle: {
      fontSize: '1.3rem',
      marginBottom: '30px',
      opacity: '0.95',
      maxWidth: '600px',
      margin: '0 auto 30px',
    },
    heroCTA: {
      display: 'inline-block',
      backgroundColor: 'var(--le-accent)',
      color: '#ffffff',
      padding: '15px 40px',
      borderRadius: '8px',
      fontSize: '1rem',
      fontWeight: '600',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
    section: {
      marginBottom: '80px',
    },
    sectionTitle: {
      fontSize: '2.5rem',
      fontWeight: '700',
      marginBottom: '40px',
      textAlign: 'center',
      color: 'var(--le-text)',
    },
    sectionSubtitle: {
      fontSize: '1.1rem',
      textAlign: 'center',
      color: 'var(--le-text-secondary)',
      marginBottom: '20px',
      maxWidth: '700px',
      margin: '0 auto 40px',
    },
    cardGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
      gap: '24px',
      marginBottom: '40px',
    },
    mortgageCard: {
      backgroundColor: 'var(--le-bg-card)',
      border: `1px solid var(--le-border)`,
      borderRadius: '12px',
      padding: '28px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
    mortgageCardHover: {
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
      borderColor: 'var(--le-primary)',
    },
    cardHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '16px',
    },
    cardEmoji: {
      fontSize: '2.5rem',
      marginRight: '12px',
    },
    cardTitle: {
      fontSize: '1.4rem',
      fontWeight: '700',
      color: 'var(--le-text)',
      margin: '0 0 8px 0',
    },
    cardShortDesc: {
      fontSize: '0.95rem',
      color: 'var(--le-text-secondary)',
      marginBottom: '16px',
    },
    cardDetails: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '12px',
      fontSize: '0.9rem',
      color: 'var(--le-text-secondary)',
      marginBottom: '20px',
    },
    detailItem: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '8px',
    },
    expandedContent: {
      marginTop: '20px',
      paddingTop: '20px',
      borderTop: `1px solid var(--le-border)`,
      fontSize: '0.95rem',
      color: 'var(--le-text)',
      lineHeight: '1.7',
    },
    comparisonTable: {
      overflowX: 'auto',
      marginBottom: '40px',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      backgroundColor: 'var(--le-bg-card)',
      border: `1px solid var(--le-border)`,
      borderRadius: '8px',
      overflow: 'hidden',
    },
    th: {
      backgroundColor: 'var(--le-primary)',
      color: '#ffffff',
      padding: '16px',
      textAlign: 'left',
      fontSize: '0.9rem',
      fontWeight: '600',
      minWidth: '100px',
    },
    td: {
      padding: '14px 16px',
      borderBottom: `1px solid var(--le-border)`,
      fontSize: '0.9rem',
    },
    tdAlt: {
      backgroundColor: 'rgba(0, 0, 0, 0.02)',
    },
    deepDiveSection: {
      backgroundColor: 'var(--le-bg-card)',
      border: `1px solid var(--le-border)`,
      borderRadius: '12px',
      padding: '40px',
      marginBottom: '40px',
    },
    deepDiveTitle: {
      fontSize: '1.8rem',
      fontWeight: '700',
      marginBottom: '20px',
      color: 'var(--le-text)',
    },
    comparisonBox: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '24px',
      marginTop: '20px',
    },
    comparisonItem: {
      backgroundColor: 'var(--le-bg)',
      border: `1px solid var(--le-border)`,
      borderRadius: '8px',
      padding: '20px',
    },
    comparisonItemTitle: {
      fontSize: '1.1rem',
      fontWeight: '700',
      marginBottom: '12px',
      color: 'var(--le-text)',
    },
    prosList: {
      listStylePosition: 'inside',
      color: 'var(--le-text-secondary)',
      fontSize: '0.9rem',
    },
    proListItem: {
      marginBottom: '8px',
      display: 'flex',
      alignItems: 'flex-start',
      gap: '8px',
    },
    checkmarkGreen: {
      color: 'var(--le-success)',
      flexShrink: 0,
      marginTop: '2px',
    },
    calculator: {
      backgroundColor: 'var(--le-bg-card)',
      border: `1px solid var(--le-border)`,
      borderRadius: '12px',
      padding: '40px',
      marginBottom: '40px',
    },
    calculatorRow: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '24px',
      marginBottom: '30px',
    },
    inputGroup: {
      display: 'flex',
      flexDirection: 'column',
    },
    label: {
      fontSize: '0.95rem',
      fontWeight: '600',
      marginBottom: '8px',
      color: 'var(--le-text)',
    },
    input: {
      padding: '12px 16px',
      border: `1px solid var(--le-border)`,
      borderRadius: '6px',
      fontSize: '1rem',
      backgroundColor: 'var(--le-bg)',
      color: 'var(--le-text)',
      fontFamily: 'inherit',
    },
    select: {
      padding: '12px 16px',
      border: `1px solid var(--le-border)`,
      borderRadius: '6px',
      fontSize: '1rem',
      backgroundColor: 'var(--le-bg)',
      color: 'var(--le-text)',
      fontFamily: 'inherit',
      cursor: 'pointer',
    },
    resultBox: {
      backgroundColor: 'var(--le-primary)',
      color: '#ffffff',
      padding: '30px',
      borderRadius: '8px',
      textAlign: 'center',
      marginTop: '20px',
    },
    resultLabel: {
      fontSize: '1rem',
      opacity: '0.9',
      marginBottom: '10px',
    },
    resultValue: {
      fontSize: '2.5rem',
      fontWeight: '700',
    },
    downPaymentTable: {
      backgroundColor: 'var(--le-bg-card)',
      border: `1px solid var(--le-border)`,
      borderRadius: '8px',
      overflow: 'hidden',
    },
    pmiSection: {
      backgroundColor: 'var(--le-bg-card)',
      border: `1px solid var(--le-border)`,
      borderRadius: '12px',
      padding: '40px',
      marginBottom: '40px',
    },
    pmiGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '24px',
      marginTop: '20px',
    },
    pmiCard: {
      backgroundColor: 'var(--le-bg)',
      border: `1px solid var(--le-border)`,
      borderRadius: '8px',
      padding: '24px',
    },
    pmiCardTitle: {
      fontSize: '1.1rem',
      fontWeight: '700',
      marginBottom: '12px',
      color: 'var(--le-text)',
    },
    govLoanGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '24px',
    },
    govLoanCard: {
      backgroundColor: 'var(--le-bg-card)',
      border: `1px solid var(--le-border)`,
      borderRadius: '12px',
      padding: '28px',
    },
    govLoanTitle: {
      fontSize: '1.3rem',
      fontWeight: '700',
      marginBottom: '16px',
      color: 'var(--le-text)',
    },
    benefitsList: {
      listStylePosition: 'inside',
      color: 'var(--le-text-secondary)',
      fontSize: '0.9rem',
    },
    benefitListItem: {
      marginBottom: '10px',
      display: 'flex',
      alignItems: 'flex-start',
      gap: '8px',
    },
    faqSection: {
      backgroundColor: 'var(--le-bg-card)',
      border: `1px solid var(--le-border)`,
      borderRadius: '12px',
      overflow: 'hidden',
      marginBottom: '40px',
    },
    faqItem: {
      borderBottom: `1px solid var(--le-border)`,
      padding: '20px',
      cursor: 'pointer',
      transition: 'background-color 0.2s ease',
    },
    faqItemLast: {
      borderBottom: 'none',
    },
    faqQuestion: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontSize: '1rem',
      fontWeight: '600',
      color: 'var(--le-text)',
    },
    faqAnswer: {
      marginTop: '16px',
      color: 'var(--le-text-secondary)',
      fontSize: '0.95rem',
      lineHeight: '1.7',
    },
    specialSituationsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '24px',
    },
    situationCard: {
      backgroundColor: 'var(--le-bg-card)',
      border: `1px solid var(--le-border)`,
      borderRadius: '12px',
      padding: '28px',
    },
    situationTitle: {
      fontSize: '1.2rem',
      fontWeight: '700',
      marginBottom: '12px',
      color: 'var(--le-text)',
    },
    situationDesc: {
      color: 'var(--le-text-secondary)',
      fontSize: '0.95rem',
      lineHeight: '1.6',
    },
    leadFormOverlay: {
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
    },
    leadFormModal: {
      backgroundColor: 'var(--le-bg)',
      borderRadius: '12px',
      padding: '40px',
      maxWidth: '500px',
      width: '90%',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
    },
    formTitle: {
      fontSize: '1.8rem',
      fontWeight: '700',
      marginBottom: '10px',
      color: 'var(--le-text)',
    },
    formSubtitle: {
      fontSize: '0.95rem',
      color: 'var(--le-text-secondary)',
      marginBottom: '30px',
    },
    formGroup: {
      marginBottom: '20px',
    },
    submitBtn: {
      width: '100%',
      padding: '14px 20px',
      backgroundColor: 'var(--le-primary)',
      color: '#ffffff',
      border: 'none',
      borderRadius: '6px',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      marginTop: '10px',
    },
    closeBtn: {
      position: 'absolute',
      top: '20px',
      right: '20px',
      backgroundColor: 'transparent',
      border: 'none',
      fontSize: '1.5rem',
      cursor: 'pointer',
      color: 'var(--le-text)',
    },
    refinanceBox: {
      backgroundColor: 'var(--le-bg-card)',
      border: `1px solid var(--le-border)`,
      borderRadius: '12px',
      padding: '28px',
      marginBottom: '20px',
    },
    refinanceBoxTitle: {
      fontSize: '1.2rem',
      fontWeight: '700',
      marginBottom: '16px',
      color: 'var(--le-text)',
    },
    refinanceStats: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '20px',
    },
    refinanceStat: {
      backgroundColor: 'var(--le-bg)',
      border: `1px solid var(--le-border)`,
      borderRadius: '6px',
      padding: '16px',
      textAlign: 'center',
    },
    refinanceStatLabel: {
      fontSize: '0.85rem',
      color: 'var(--le-text-secondary)',
      fontWeight: '500',
      marginBottom: '8px',
    },
    refinanceStatValue: {
      fontSize: '1.6rem',
      fontWeight: '700',
      color: 'var(--le-primary)',
    },
    ctaBanner: {
      backgroundColor: 'var(--le-primary)',
      color: '#ffffff',
      padding: '60px 20px',
      textAlign: 'center',
      borderRadius: '12px',
      marginBottom: '60px',
    },
    ctaBannerTitle: {
      fontSize: '2rem',
      fontWeight: '700',
      marginBottom: '16px',
    },
    ctaBannerDesc: {
      fontSize: '1.1rem',
      marginBottom: '30px',
      opacity: '0.95',
      maxWidth: '600px',
      margin: '0 auto 30px',
    },
    ctaButton: {
      backgroundColor: 'var(--le-accent)',
      color: '#ffffff',
      padding: '16px 50px',
      borderRadius: '6px',
      border: 'none',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
    footer: {
      backgroundColor: 'var(--le-bg-card)',
      border: `1px solid var(--le-border)`,
      padding: '40px 20px',
      textAlign: 'center',
      color: 'var(--le-text-secondary)',
      fontSize: '0.95rem',
    },
  };

  return (
    <div style={styles.page}>
      {/* Hero Section */}
      <section style={{ ...styles.hero }}>
        <div style={styles.container}>
          <h1 style={styles.heroTitle}>Understanding Mortgage Types</h1>
          <p style={styles.heroSubtitle}>
            Find the right mortgage for your situation. Compare loans, calculate payments, and make
            informed decisions with confidence.
          </p>
          <button
            style={styles.heroCTA}
            onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            onClick={() => setShowLeadForm(true)}
          >
            Get Matched with Your Mortgage
          </button>
        </div>
      </section>

      <div style={styles.container}>
        {/* Mortgage Types Cards Section */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>10 Mortgage Types Explained</h2>
          <p style={styles.sectionSubtitle}>
            Explore the characteristics, requirements, and best uses for each mortgage type
          </p>

          <div style={styles.cardGrid}>
            {mortgageTypes.map((type) => (
              <div
                key={type.id}
                style={{
                  ...styles.mortgageCard,
                  ...(expandedCard === type.id ? styles.mortgageCardHover : {}),
                }}
                onMouseEnter={(e) => {
                  if (expandedCard !== type.id) {
                    Object.assign(e.currentTarget.style, {
                      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.08)',
                      borderColor: 'var(--le-primary)',
                    });
                  }
                }}
                onMouseLeave={(e) => {
                  if (expandedCard !== type.id) {
                    Object.assign(e.currentTarget.style, {
                      boxShadow: 'none',
                      borderColor: 'var(--le-border)',
                    });
                  }
                }}
                onClick={() => setExpandedCard(expandedCard === type.id ? null : type.id)}
              >
                <div style={styles.cardHeader}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <span style={styles.cardEmoji}>{type.emoji}</span>
                      <div>
                        <h3 style={styles.cardTitle}>{type.name}</h3>
                      </div>
                    </div>
                  </div>
                  <div style={{ color: 'var(--le-primary)', flexShrink: 0 }}>
                    {expandedCard === type.id ? <ChevronUpIcon /> : <ChevronDownIcon />}
                  </div>
                </div>

                <p style={styles.cardShortDesc}>{type.shortDesc}</p>

                <div style={styles.cardDetails}>
                  <div style={styles.detailItem}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--le-text-secondary)' }}>
                      📋
                    </span>
                    <span>Down: {type.downPaymentMin}</span>
                  </div>
                  <div style={styles.detailItem}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--le-text-secondary)' }}>
                      💳
                    </span>
                    <span>Credit: {type.creditScoreMin}</span>
                  </div>
                  <div style={styles.detailItem}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--le-text-secondary)' }}>
                      🛡️
                    </span>
                    <span>PMI: {type.pmiRequired}</span>
                  </div>
                  <div style={styles.detailItem}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--le-text-secondary)' }}>
                      📊
                    </span>
                    <span>Rate: {type.avgRate}</span>
                  </div>
                </div>

                {expandedCard === type.id && (
                  <div style={styles.expandedContent}>
                    <p style={{ marginTop: 0, marginBottom: '16px' }}>{type.fullDesc}</p>
                    <div style={{ display: 'grid', gap: '12px', fontSize: '0.9rem' }}>
                      <div>
                        <strong style={{ color: 'var(--le-text)' }}>Maximum Loan Amount:</strong>
                        <p style={{ margin: '4px 0 0 0', color: 'var(--le-text-secondary)' }}>
                          {type.maxLoanAmount}
                        </p>
                      </div>
                      <div>
                        <strong style={{ color: 'var(--le-text)' }}>Best For:</strong>
                        <p style={{ margin: '4px 0 0 0', color: 'var(--le-text-secondary)' }}>
                          {type.bestFor}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Comparison Table Section */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Side-by-Side Comparison</h2>
          <p style={styles.sectionSubtitle}>
            Compare key features across all mortgage types at a glance
          </p>

          <div style={styles.comparisonTable}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Feature</th>
                  <th style={styles.th}>Conventional</th>
                  <th style={styles.th}>FHA</th>
                  <th style={styles.th}>VA</th>
                  <th style={styles.th}>USDA</th>
                  <th style={styles.th}>Jumbo</th>
                  <th style={styles.th}>ARM</th>
                  <th style={styles.th}>Fixed-Rate</th>
                  <th style={styles.th}>Interest-Only</th>
                  <th style={styles.th}>Bridge</th>
                  <th style={styles.th}>Construction</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, idx) => (
                  <tr key={idx}>
                    <td style={{ ...styles.td, fontWeight: '600', color: 'var(--le-text)' }}>
                      {row.criterion}
                    </td>
                    <td style={{ ...styles.td, ...(idx % 2 ? styles.tdAlt : {}) }}>
                      {row.conventional}
                    </td>
                    <td style={{ ...styles.td, ...(idx % 2 ? styles.tdAlt : {}) }}>
                      {row.fha}
                    </td>
                    <td style={{ ...styles.td, ...(idx % 2 ? styles.tdAlt : {}) }}>{row.va}</td>
                    <td style={{ ...styles.td, ...(idx % 2 ? styles.tdAlt : {}) }}>
                      {row.usda}
                    </td>
                    <td style={{ ...styles.td, ...(idx % 2 ? styles.tdAlt : {}) }}>
                      {row.jumbo}
                    </td>
                    <td style={{ ...styles.td, ...(idx % 2 ? styles.tdAlt : {}) }}>{row.arm}</td>
                    <td style={{ ...styles.td, ...(idx % 2 ? styles.tdAlt : {}) }}>
                      {row.fixed}
                    </td>
                    <td style={{ ...styles.td, ...(idx % 2 ? styles.tdAlt : {}) }}>
                      {row.interestonly}
                    </td>
                    <td style={{ ...styles.td, ...(idx % 2 ? styles.tdAlt : {}) }}>
                      {row.bridge}
                    </td>
                    <td style={{ ...styles.td, ...(idx % 2 ? styles.tdAlt : {}) }}>
                      {row.construction}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Fixed vs ARM Deep Dive */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Fixed-Rate vs. Adjustable-Rate Mortgages</h2>

          <div style={styles.comparisonBox}>
            <div style={styles.comparisonItem}>
              <div style={styles.comparisonItemTitle}>🔒 Fixed-Rate Mortgages</div>
              <div style={{ marginTop: '16px' }}>
                <div style={{ ...styles.comparisonItemTitle, fontSize: '1rem' }}>How It Works</div>
                <p style={{ color: 'var(--le-text-secondary)', fontSize: '0.9rem', margin: 0 }}>
                  Your interest rate and monthly payment remain the same for the entire loan term
                  (typically 15, 20, or 30 years). Predictable and stable.
                </p>
              </div>
              <div style={{ marginTop: '20px' }}>
                <div style={{ ...styles.comparisonItemTitle, fontSize: '1rem', color: 'var(--le-success)' }}>
                  ✓ Pros
                </div>
                <ul style={styles.prosList}>
                  <li style={styles.proListItem}>
                    <span style={styles.checkmarkGreen}>✓</span> Predictable monthly payments
                  </li>
                  <li style={styles.proListItem}>
                    <span style={styles.checkmarkGreen}>✓</span> Protected from rate increases
                  </li>
                  <li style={styles.proListItem}>
                    <span style={styles.checkmarkGreen}>✓</span> Easier budgeting and planning
                  </li>
                  <li style={styles.proListItem}>
                    <span style={styles.checkmarkGreen}>✓</span> Best for long-term homeowners
                  </li>
                </ul>
              </div>
              <div style={{ marginTop: '20px' }}>
                <div
                  style={{
                    ...styles.comparisonItemTitle,
                    fontSize: '1rem',
                    color: 'var(--le-warning)',
                  }}
                >
                  ⚠ Cons
                </div>
                <ul style={styles.prosList}>
                  <li style={styles.proListItem}>
                    <span style={{ color: 'var(--le-warning)', marginTop: '2px' }}>✗</span> Higher
                    initial rates
                  </li>
                  <li style={styles.proListItem}>
                    <span style={{ color: 'var(--le-warning)', marginTop: '2px' }}>✗</span> Miss
                    potential rate drops
                  </li>
                  <li style={styles.proListItem}>
                    <span style={{ color: 'var(--le-warning)', marginTop: '2px' }}>✗</span> Less
                    flexibility
                  </li>
                </ul>
              </div>
            </div>

            <div style={styles.comparisonItem}>
              <div style={styles.comparisonItemTitle}>📈 Adjustable-Rate Mortgages (ARMs)</div>
              <div style={{ marginTop: '16px' }}>
                <div style={{ ...styles.comparisonItemTitle, fontSize: '1rem' }}>How It Works</div>
                <p style={{ color: 'var(--le-text-secondary)', fontSize: '0.9rem', margin: 0 }}>
                  Your rate is fixed for an initial period (3, 5, 7, or 10 years), then adjusts
                  periodically based on market conditions. Adjustments are subject to caps.
                </p>
              </div>
              <div style={{ marginTop: '20px' }}>
                <div style={{ ...styles.comparisonItemTitle, fontSize: '1rem', color: 'var(--le-success)' }}>
                  ✓ Pros
                </div>
                <ul style={styles.prosList}>
                  <li style={styles.proListItem}>
                    <span style={styles.checkmarkGreen}>✓</span> Lower initial rates
                  </li>
                  <li style={styles.proListItem}>
                    <span style={styles.checkmarkGreen}>✓</span> Benefit from rate decreases
                  </li>
                  <li style={styles.proListItem}>
                    <span style={styles.checkmarkGreen}>✓</span> Good for short-term ownership
                  </li>
                  <li style={styles.proListItem}>
                    <span style={styles.checkmarkGreen}>✓</span> Lower early payments
                  </li>
                </ul>
              </div>
              <div style={{ marginTop: '20px' }}>
                <div
                  style={{
                    ...styles.comparisonItemTitle,
                    fontSize: '1rem',
                    color: 'var(--le-danger)',
                  }}
                >
                  ✗ Cons
                </div>
                <ul style={styles.prosList}>
                  <li style={styles.proListItem}>
                    <span style={{ color: 'var(--le-danger)', marginTop: '2px' }}>✗</span> Payment
                    uncertainty
                  </li>
                  <li style={styles.proListItem}>
                    <span style={{ color: 'var(--le-danger)', marginTop: '2px' }}>✗</span> Risk of
                    payment shock
                  </li>
                  <li style={styles.proListItem}>
                    <span style={{ color: 'var(--le-danger)', marginTop: '2px' }}>✗</span> Complex
                    terms
                  </li>
                  <li style={styles.proListItem}>
                    <span style={{ color: 'var(--le-danger)', marginTop: '2px' }}>✗</span> Budget
                    challenges
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div style={styles.deepDiveSection}>
            <h3 style={styles.deepDiveTitle}>When to Choose Fixed-Rate vs. ARM</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginTop: '20px' }}>
              <div>
                <strong style={{ color: 'var(--le-text)' }}>Choose Fixed-Rate If You:</strong>
                <ul style={styles.prosList}>
                  <li style={styles.proListItem}>
                    <span style={styles.checkmarkGreen}>✓</span> Plan to stay 7+ years
                  </li>
                  <li style={styles.proListItem}>
                    <span style={styles.checkmarkGreen}>✓</span> Prefer payment certainty
                  </li>
                  <li style={styles.proListItem}>
                    <span style={styles.checkmarkGreen}>✓</span> Have tight monthly budgets
                  </li>
                  <li style={styles.proListItem}>
                    <span style={styles.checkmarkGreen}>✓</span> Rates are historically low
                  </li>
                </ul>
              </div>
              <div>
                <strong style={{ color: 'var(--le-text)' }}>Choose ARM If You:</strong>
                <ul style={styles.prosList}>
                  <li style={styles.proListItem}>
                    <span style={styles.checkmarkGreen}>✓</span> Plan to sell within 5-7 years
                  </li>
                  <li style={styles.proListItem}>
                    <span style={styles.checkmarkGreen}>✓</span> Expect income growth
                  </li>
                  <li style={styles.proListItem}>
                    <span style={styles.checkmarkGreen}>✓</span> Comfortable with rate risk
                  </li>
                  <li style={styles.proListItem}>
                    <span style={styles.checkmarkGreen}>✓</span> Want lower initial payments
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Payment Calculator */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Monthly Payment Calculator</h2>
          <p style={styles.sectionSubtitle}>
            Calculate your estimated monthly mortgage payment based on loan type and terms
          </p>

          <div style={styles.calculator}>
            <div style={styles.calculatorRow}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Mortgage Type</label>
                <select
                  style={styles.select}
                  value={calculatorInputs.loanType}
                  onChange={(e) =>
                    setCalculatorInputs({ ...calculatorInputs, loanType: e.target.value })
                  }
                >
                  <option value="conventional">Conventional</option>
                  <option value="fha">FHA</option>
                  <option value="va">VA</option>
                  <option value="usda">USDA</option>
                  <option value="jumbo">Jumbo</option>
                  <option value="arm">ARM</option>
                  <option value="fixed">Fixed-Rate</option>
                </select>
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Loan Amount: ${calculatorInputs.loanAmount.toLocaleString()}</label>
                <input
                  style={styles.input}
                  type="range"
                  min="50000"
                  max="1000000"
                  step="10000"
                  value={calculatorInputs.loanAmount}
                  onChange={(e) =>
                    setCalculatorInputs({ ...calculatorInputs, loanAmount: parseInt(e.target.value) })
                  }
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Interest Rate: {calculatorInputs.interestRate}%</label>
                <input
                  style={styles.input}
                  type="range"
                  min="3"
                  max="12"
                  step="0.1"
                  value={calculatorInputs.interestRate}
                  onChange={(e) =>
                    setCalculatorInputs({
                      ...calculatorInputs,
                      interestRate: parseFloat(e.target.value),
                    })
                  }
                />
              </div>
            </div>

            <div style={styles.calculatorRow}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Loan Term (Years)</label>
                <select
                  style={styles.select}
                  value={calculatorInputs.loanTerm}
                  onChange={(e) =>
                    setCalculatorInputs({ ...calculatorInputs, loanTerm: parseInt(e.target.value) })
                  }
                >
                  <option value="15">15 years</option>
                  <option value="20">20 years</option>
                  <option value="30">30 years</option>
                </select>
              </div>
            </div>

            <div style={styles.resultBox}>
              <div style={styles.resultLabel}>Estimated Monthly Payment (Principal + Interest + PMI)</div>
              <div style={styles.resultValue}>${parseFloat(calculatePayment()).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
              <p style={{ margin: '16px 0 0 0', opacity: '0.9', fontSize: '0.9rem' }}>
                This estimate does not include property taxes, insurance, or HOA fees
              </p>
            </div>
          </div>
        </section>

        {/* Down Payment Guide */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Down Payment Guide</h2>
          <p style={styles.sectionSubtitle}>
            Minimum down payment requirements by loan type
          </p>

          <div style={styles.downPaymentTable}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Loan Type</th>
                  <th style={styles.th}>Minimum Down Payment</th>
                  <th style={styles.th}>Recommended</th>
                  <th style={styles.th}>Zero-Down Option</th>
                  <th style={styles.th}>Notes</th>
                </tr>
              </thead>
              <tbody>
                {downPaymentGuide.map((item, idx) => (
                  <tr key={idx}>
                    <td style={{ ...styles.td, fontWeight: '600', ...(idx % 2 ? styles.tdAlt : {}) }}>
                      {item.type}
                    </td>
                    <td style={{ ...styles.td, ...(idx % 2 ? styles.tdAlt : {}) }}>
                      <strong style={{ color: 'var(--le-primary)' }}>{item.minimum}</strong>
                    </td>
                    <td style={{ ...styles.td, ...(idx % 2 ? styles.tdAlt : {}) }}>
                      {item.recommended}
                    </td>
                    <td style={{ ...styles.td, ...(idx % 2 ? styles.tdAlt : {}) }}>
                      {item.zeroDown === 'Yes' ? (
                        <span style={{ color: 'var(--le-success)', fontWeight: '600' }}>✓ Yes</span>
                      ) : (
                        <span style={{ color: 'var(--le-text-secondary)' }}>No</span>
                      )}
                    </td>
                    <td style={{ ...styles.td, fontSize: '0.85rem', ...(idx % 2 ? styles.tdAlt : {}) }}>
                      {item.notes}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={styles.deepDiveSection}>
            <h3 style={styles.deepDiveTitle}>Maximizing Your Down Payment Strategy</h3>
            <div style={styles.pmiGrid}>
              <div style={styles.pmiCard}>
                <div style={styles.pmiCardTitle}>3% Down Payment</div>
                <p style={{ color: 'var(--le-text-secondary)', fontSize: '0.9rem', margin: '12px 0 0 0' }}>
                  Most accessible option for first-time buyers. PMI required. Allows entry into
                  homeownership with minimal savings.
                </p>
              </div>
              <div style={styles.pmiCard}>
                <div style={styles.pmiCardTitle}>10% Down Payment</div>
                <p style={{ color: 'var(--le-text-secondary)', fontSize: '0.9rem', margin: '12px 0 0 0' }}>
                  Reduces PMI costs. Shows lender stronger commitment. Better rates than 3-5% down.
                </p>
              </div>
              <div style={styles.pmiCard}>
                <div style={styles.pmiCardTitle}>20% Down Payment</div>
                <p style={{ color: 'var(--le-text-secondary)', fontSize: '0.9rem', margin: '12px 0 0 0' }}>
                  Eliminates PMI entirely. Lowest interest rates. Strongest negotiating position with
                  lenders.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* PMI Explained */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>PMI: Private Mortgage Insurance Explained</h2>
          <p style={styles.sectionSubtitle}>
            Understand what PMI is, when it\u2019s required, and how to eliminate it
          </p>

          <div style={styles.pmiSection}>
            <h3 style={styles.deepDiveTitle}>What is PMI?</h3>
            <p style={{ color: 'var(--le-text-secondary)', fontSize: '0.95rem', lineHeight: '1.7', marginBottom: '20px' }}>
              Private Mortgage Insurance (PMI) is a type of insurance that protects lenders if you
              default on your mortgage loan. It allows borrowers to get approved with down payments
              less than 20% by shifting some of the lender\u2019s risk. PMI is an additional monthly
              cost added to your mortgage payment.
            </p>

            <h3 style={{ ...styles.deepDiveTitle, marginTop: '30px' }}>When is PMI Required?</h3>
            <p style={{ color: 'var(--le-text-secondary)', fontSize: '0.95rem', lineHeight: '1.7', marginBottom: '20px' }}>
              PMI is typically required when your down payment is less than 20% of the home\u2019s
              purchase price. However, some loans always require PMI (like FHA loans), while others
              never do (like VA loans).
            </p>

            <div style={styles.pmiGrid}>
              <div style={styles.pmiCard}>
                <div style={styles.pmiCardTitle}>Mortgage Types Requiring PMI</div>
                <ul style={styles.prosList}>
                  <li style={styles.proListItem}>
                    <span style={styles.checkmarkGreen}>•</span> Conventional (down payment under 20%)
                  </li>
                  <li style={styles.proListItem}>
                    <span style={styles.checkmarkGreen}>•</span> FHA (always)
                  </li>
                  <li style={styles.proListItem}>
                    <span style={styles.checkmarkGreen}>•</span> ARM (down payment under 20%)
                  </li>
                  <li style={styles.proListItem}>
                    <span style={styles.checkmarkGreen}>•</span> Fixed-Rate (down payment under 20%)
                  </li>
                </ul>
              </div>

              <div style={styles.pmiCard}>
                <div style={styles.pmiCardTitle}>Mortgage Types Without PMI</div>
                <ul style={styles.prosList}>
                  <li style={styles.proListItem}>
                    <span style={styles.checkmarkGreen}>•</span> VA Loans
                  </li>
                  <li style={styles.proListItem}>
                    <span style={styles.checkmarkGreen}>•</span> USDA Loans
                  </li>
                  <li style={styles.proListItem}>
                    <span style={styles.checkmarkGreen}>•</span> Interest-Only
                  </li>
                  <li style={styles.proListItem}>
                    <span style={styles.checkmarkGreen}>•</span> Bridge Loans
                  </li>
                </ul>
              </div>

              <div style={styles.pmiCard}>
                <div style={styles.pmiCardTitle}>PMI Cost Estimates</div>
                <p style={{ color: 'var(--le-text-secondary)', fontSize: '0.9rem', margin: '12px 0 0 0' }}>
                  <strong style={{ color: 'var(--le-text)' }}>Typical Range:</strong> 0.3% - 1.5% of
                  the loan amount annually
                </p>
                <p style={{ color: 'var(--le-text-secondary)', fontSize: '0.9rem', margin: '12px 0 0 0' }}>
                  <strong style={{ color: 'var(--le-text)' }}>Example:</strong> $300,000 loan might
                  cost $75-375/month in PMI
                </p>
              </div>
            </div>

            <h3 style={{ ...styles.deepDiveTitle, marginTop: '30px' }}>How to Remove PMI</h3>
            <div style={{ color: 'var(--le-text-secondary)', fontSize: '0.95rem', lineHeight: '1.7' }}>
              <p>
                <strong style={{ color: 'var(--le-text)' }}>Automatic Removal:</strong> Once you
                reach 22% equity in your home, lenders must automatically remove PMI.
              </p>
              <p>
                <strong style={{ color: 'var(--le-text)' }}>Request Removal:</strong> You can request
                PMI removal once you\u2019ve paid down to 20% equity.
              </p>
              <p>
                <strong style={{ color: 'var(--le-text)' }}>Refinancing:</strong> If your home has
                appreciated or you\u2019ve paid principal, refinancing might eliminate PMI entirely.
              </p>
            </div>
          </div>
        </section>

        {/* Refinancing Section */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Refinancing: When and How</h2>
          <p style={styles.sectionSubtitle}>
            Understand refinancing options and calculate break-even points
          </p>

          <div style={styles.refinanceBox}>
            <div style={styles.refinanceBoxTitle}>When Should You Refinance?</div>
            <div style={styles.refinanceStats}>
              <div style={styles.refinanceStat}>
                <div style={styles.refinanceStatLabel}>Interest Rates Drop</div>
                <p style={{ color: 'var(--le-text-secondary)', fontSize: '0.9rem', margin: '8px 0 0 0' }}>
                  0.5-1% rate reduction can save thousands
                </p>
              </div>
              <div style={styles.refinanceStat}>
                <div style={styles.refinanceStatLabel}>Home Appreciates</div>
                <p style={{ color: 'var(--le-text-secondary)', fontSize: '0.9rem', margin: '8px 0 0 0' }}>
                  Build equity faster and eliminate PMI
                </p>
              </div>
              <div style={styles.refinanceStat}>
                <div style={styles.refinanceStatLabel}>Shorter Payoff Goal</div>
                <p style={{ color: 'var(--le-text-secondary)', fontSize: '0.9rem', margin: '8px 0 0 0' }}>
                  Refinance to 15-year term to pay off faster
                </p>
              </div>
              <div style={styles.refinanceStat}>
                <div style={styles.refinanceStatLabel}>Credit Improves</div>
                <p style={{ color: 'var(--le-text-secondary)', fontSize: '0.9rem', margin: '8px 0 0 0' }}>
                  Better rates with higher credit scores
                </p>
              </div>
            </div>
          </div>

          <div style={styles.deepDiveSection}>
            <h3 style={styles.deepDiveTitle}>Break-Even Calculator Example</h3>
            <p style={{ color: 'var(--le-text-secondary)', fontSize: '0.95rem', marginBottom: '20px' }}>
              Scenario: Refinancing $300,000 from 7.5% to 6.5% with $6,000 closing costs
            </p>
            <div style={styles.refinanceStats}>
              <div style={styles.refinanceStat}>
                <div style={styles.refinanceStatLabel}>Current Monthly Payment</div>
                <div style={styles.refinanceStatValue}>
                  ${(
                    (300000 *
                      (0.075 / 100 / 12 *
                        Math.pow(1 + 0.075 / 100 / 12, 360))) /
                    (Math.pow(1 + 0.075 / 100 / 12, 360) - 1)
                  ).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
              </div>
              <div style={styles.refinanceStat}>
                <div style={styles.refinanceStatLabel}>New Monthly Payment</div>
                <div style={styles.refinanceStatValue}>
                  ${(
                    (300000 *
                      (0.065 / 100 / 12 *
                        Math.pow(1 + 0.065 / 100 / 12, 360))) /
                    (Math.pow(1 + 0.065 / 100 / 12, 360) - 1)
                  ).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
              </div>
              <div style={styles.refinanceStat}>
                <div style={styles.refinanceStatLabel}>Monthly Savings</div>
                <div style={styles.refinanceStatValue}>
                  ${(
                    (300000 *
                      (0.075 / 100 / 12 *
                        Math.pow(1 + 0.075 / 100 / 12, 360))) /
                    (Math.pow(1 + 0.075 / 100 / 12, 360) - 1) -
                    (300000 *
                      (0.065 / 100 / 12 *
                        Math.pow(1 + 0.065 / 100 / 12, 360))) /
                      (Math.pow(1 + 0.065 / 100 / 12, 360) - 1)
                  ).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
              </div>
              <div style={styles.refinanceStat}>
                <div style={styles.refinanceStatLabel}>Break-Even Point</div>
                <div
                  style={{
                    ...styles.refinanceStatValue,
                    color: 'var(--le-success)',
                  }}
                >
                  {calculateBreakEven()} months
                </div>
              </div>
            </div>
            <p style={{ color: 'var(--le-text-secondary)', fontSize: '0.9rem', marginTop: '20px' }}>
              After {calculateBreakEven()} months, you\u2019ll break even on closing costs and begin
              saving money overall.
            </p>
          </div>

          <div style={styles.deepDiveSection}>
            <h3 style={styles.deepDiveTitle}>Types of Refinancing</h3>
            <div style={styles.pmiGrid}>
              <div style={styles.pmiCard}>
                <div style={styles.pmiCardTitle}>Rate-and-Term</div>
                <p style={{ color: 'var(--le-text-secondary)', fontSize: '0.9rem', margin: '12px 0 0 0' }}>
                  Refinance to a lower rate or shorter term without changing loan amount. Most common type.
                </p>
              </div>
              <div style={styles.pmiCard}>
                <div style={styles.pmiCardTitle}>Cash-Out</div>
                <p style={{ color: 'var(--le-text-secondary)', fontSize: '0.9rem', margin: '12px 0 0 0' }}>
                  Refinance for more than you owe and receive the difference in cash for home improvements or debt consolidation.
                </p>
              </div>
              <div style={styles.pmiCard}>
                <div style={styles.pmiCardTitle}>Cash-In</div>
                <p style={{ color: 'var(--le-text-secondary)', fontSize: '0.9rem', margin: '12px 0 0 0' }}>
                  Refinance for less than you owe by bringing cash to closing. Reduces loan balance and PMI.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Government Loan Programs */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Government Loan Programs</h2>
          <p style={styles.sectionSubtitle}>
            Detailed overview of FHA, VA, and USDA loan eligibility and benefits
          </p>

          <div style={styles.govLoanGrid}>
            <div style={styles.govLoanCard}>
              <div style={styles.govLoanTitle}>🏛️ FHA Loans</div>
              <div style={{ marginTop: '16px' }}>
                <strong style={{ color: 'var(--le-text)' }}>Who\u2019s Eligible:</strong>
                <ul style={styles.prosList}>
                  <li style={styles.proListItem}>
                    <span style={styles.checkmarkGreen}>•</span> First-time homebuyers
                  </li>
                  <li style={styles.proListItem}>
                    <span style={styles.checkmarkGreen}>•</span> Credit scores 500+
                  </li>
                  <li style={styles.proListItem}>
                    <span style={styles.checkmarkGreen}>•</span> Primary residence only
                  </li>
                  <li style={styles.proListItem}>
                    <span style={styles.checkmarkGreen}>•</span> Reasonable debt-to-income ratio
                  </li>
                </ul>
              </div>
              <div style={{ marginTop: '16px' }}>
                <strong style={{ color: 'var(--le-text)' }}>Key Benefits:</strong>
                <ul style={styles.prosList}>
                  <li style={styles.proListItem}>
                    <span style={styles.checkmarkGreen}>✓</span> 3.5% down payment
                  </li>
                  <li style={styles.proListItem}>
                    <span style={styles.checkmarkGreen}>✓</span> Lower credit score requirements
                  </li>
                  <li style={styles.proListItem}>
                    <span style={styles.checkmarkGreen}>✓</span> Competitive interest rates
                  </li>
                  <li style={styles.proListItem}>
                    <span style={styles.checkmarkGreen}>✓</span> Flexible employment history
                  </li>
                </ul>
              </div>
            </div>

            <div style={styles.govLoanCard}>
              <div style={styles.govLoanTitle}>🎖️ VA Loans</div>
              <div style={{ marginTop: '16px' }}>
                <strong style={{ color: 'var(--le-text)' }}>Who\u2019s Eligible:</strong>
                <ul style={styles.prosList}>
                  <li style={styles.proListItem}>
                    <span style={styles.checkmarkGreen}>•</span> Active-duty service members
                  </li>
                  <li style={styles.proListItem}>
                    <span style={styles.checkmarkGreen}>•</span> Veterans (generally 90+ days)
                  </li>
                  <li style={styles.proListItem}>
                    <span style={styles.checkmarkGreen}>•</span> National Guard/Reserves
                  </li>
                  <li style={styles.proListItem}>
                    <span style={styles.checkmarkGreen}>•</span> Surviving spouses
                  </li>
                </ul>
              </div>
              <div style={{ marginTop: '16px' }}>
                <strong style={{ color: 'var(--le-text)' }}>Key Benefits:</strong>
                <ul style={styles.prosList}>
                  <li style={styles.proListItem}>
                    <span style={styles.checkmarkGreen}>✓</span> Zero down payment
                  </li>
                  <li style={styles.proListItem}>
                    <span style={styles.checkmarkGreen}>✓</span> No PMI
                  </li>
                  <li style={styles.proListItem}>
                    <span style={styles.checkmarkGreen}>✓</span> Lowest interest rates
                  </li>
                  <li style={styles.proListItem}>
                    <span style={styles.checkmarkGreen}>✓</span> Limited closing costs
                  </li>
                </ul>
              </div>
            </div>

            <div style={styles.govLoanCard}>
              <div style={styles.govLoanTitle}>🚜 USDA Loans</div>
              <div style={{ marginTop: '16px' }}>
                <strong style={{ color: 'var(--le-text)' }}>Who\u2019s Eligible:</strong>
                <ul style={styles.prosList}>
                  <li style={styles.proListItem}>
                    <span style={styles.checkmarkGreen}>•</span> Rural property buyers
                  </li>
                  <li style={styles.proListItem}>
                    <span style={styles.checkmarkGreen}>•</span> Credit scores 620+
                  </li>
                  <li style={styles.proListItem}>
                    <span style={styles.checkmarkGreen}>•</span> Moderate income limits
                  </li>
                  <li style={styles.proListItem}>
                    <span style={styles.checkmarkGreen}>•</span> U.S. citizens/permanent residents
                  </li>
                </ul>
              </div>
              <div style={{ marginTop: '16px' }}>
                <strong style={{ color: 'var(--le-text)' }}>Key Benefits:</strong>
                <ul style={styles.prosList}>
                  <li style={styles.proListItem}>
                    <span style={styles.checkmarkGreen}>✓</span> Zero down payment
                  </li>
                  <li style={styles.proListItem}>
                    <span style={styles.checkmarkGreen}>✓</span> No PMI (annual fee instead)
                  </li>
                  <li style={styles.proListItem}>
                    <span style={styles.checkmarkGreen}>✓</span> Competitive rates
                  </li>
                  <li style={styles.proListItem}>
                    <span style={styles.checkmarkGreen}>✓</span> Rural development support
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Special Situations */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Mortgages for Special Situations</h2>
          <p style={styles.sectionSubtitle}>
            Financing solutions for unique borrowing circumstances
          </p>

          <div style={styles.specialSituationsGrid}>
            <div style={styles.situationCard}>
              <div style={styles.situationTitle}>👔 Self-Employed Borrowers</div>
              <p style={styles.situationDesc}>
                Self-employed individuals can qualify for mortgages but need additional documentation.
                Lenders typically require 2 years of tax returns, profit-and-loss statements, and bank
                statements. Some lenders specialize in self-employed financing with more flexible requirements.
              </p>
            </div>

            <div style={styles.situationCard}>
              <div style={styles.situationTitle}>🏢 Investment Properties</div>
              <p style={styles.situationDesc}>
                Investment property loans typically require higher down payments (15-25%), higher credit
                scores (680+), and proof of rental income. Interest rates are higher due to increased
                risk. Cash reserves are often required by lenders.
              </p>
            </div>

            <div style={styles.situationCard}>
              <div style={styles.situationTitle}>🏡 Second Homes</div>
              <p style={styles.situationDesc}>
                Second home mortgages require similar qualifications to primary residences but with
                slightly higher rates. Down payments of 10-25% are typical. Lenders may scrutinize
                existing mortgage obligations more closely.
              </p>
            </div>

            <div style={styles.situationCard}>
              <div style={styles.situationTitle}>👥 Co-Signer Loans</div>
              <p style={styles.situationDesc}>
                A co-signer can help borrowers with lower credit scores or insufficient income get
                approved. The co-signer is equally responsible for the loan. Both borrowers\u2019 credit
                and income are considered in qualification.
              </p>
            </div>

            <div style={styles.situationCard}>
              <div style={styles.situationTitle}>📋 Non-Qualified Mortgages (Non-QM)</div>
              <p style={styles.situationDesc}>
                Non-QM loans accommodate borrowers who don\u2019t fit standard lending criteria. These
                loans consider alternative income documentation, bank statements, and assets. Rates
                are typically higher to offset increased risk.
              </p>
            </div>

            <div style={styles.situationCard}>
              <div style={styles.situationTitle}>💰 Portfolio Loans</div>
              <p style={styles.situationDesc}>
                Portfolio loans are kept by the lender rather than sold on the secondary market.
                They offer flexibility for unique situations. Rates may be higher, but qualification
                criteria are often more flexible.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Frequently Asked Questions</h2>

          <div style={styles.faqSection}>
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                style={{
                  ...styles.faqItem,
                  ...(idx === faqs.length - 1 ? styles.faqItemLast : {}),
                  backgroundColor:
                    expandedCard === `faq-${idx}` ? 'rgba(0, 0, 0, 0.02)' : 'transparent',
                }}
                onClick={() =>
                  setExpandedCard(expandedCard === `faq-${idx}` ? null : `faq-${idx}`)
                }
              >
                <div style={styles.faqQuestion}>
                  <span>{faq.question}</span>
                  <span style={{ color: 'var(--le-primary)', flexShrink: 0 }}>
                    {expandedCard === `faq-${idx}` ? <ChevronUpIcon /> : <ChevronDownIcon />}
                  </span>
                </div>

                {expandedCard === `faq-${idx}` && (
                  <div style={styles.faqAnswer}>{faq.answer}</div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* CTA Banner */}
        <section style={styles.ctaBanner}>
          <h2 style={styles.ctaBannerTitle}>Ready to Find Your Perfect Mortgage?</h2>
          <p style={styles.ctaBannerDesc}>
            Get matched with the right mortgage for your situation. Our experts will help you
            navigate the process and find the best rates.
          </p>
          <button
            style={styles.ctaButton}
            onMouseOver={(e) => (e.currentTarget.style.opacity = '0.9')}
            onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
            onClick={() => setShowLeadForm(true)}
          >
            Start Your Mortgage Journey
          </button>
        </section>
      </div>

      {/* Lead Capture Form Modal */}
      {showLeadForm && (
        <div style={styles.leadFormOverlay} onClick={() => setShowLeadForm(false)}>
          <div style={styles.leadFormModal} onClick={(e) => e.stopPropagation()}>
            <button
              style={styles.closeBtn}
              onClick={() => setShowLeadForm(false)}
            >
              ✕
            </button>
            <h2 style={styles.formTitle}>Get Matched with Your Mortgage</h2>
            <p style={styles.formSubtitle}>
              Tell us a bit about your situation and we\u2019ll connect you with the right mortgage
              option.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                console.log('Lead form submitted:', formData);
                setShowLeadForm(false);
              }}
            >
              <div style={styles.formGroup}>
                <label style={styles.label}>Full Name</label>
                <input
                  style={styles.input}
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="John Doe"
                  required
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Email Address</label>
                <input
                  style={styles.input}
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="john@example.com"
                  required
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Phone Number</label>
                <input
                  style={styles.input}
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="(555) 123-4567"
                  required
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Credit Score Range</label>
                <select
                  style={styles.select}
                  value={formData.creditScore}
                  onChange={(e) => setFormData({ ...formData, creditScore: e.target.value })}
                >
                  <option value="excellent">Excellent (750+)</option>
                  <option value="good">Good (700-749)</option>
                  <option value="fair">Fair (650-699)</option>
                  <option value="poor">Poor (Below 650)</option>
                </select>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Down Payment Available</label>
                <input
                  style={styles.input}
                  type="text"
                  value={formData.downPayment}
                  onChange={(e) => setFormData({ ...formData, downPayment: e.target.value })}
                  placeholder="$50,000 or 20%"
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Property Type</label>
                <select
                  style={styles.select}
                  value={formData.propertyType}
                  onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                >
                  <option value="primary">Primary Residence</option>
                  <option value="second">Second Home</option>
                  <option value="investment">Investment Property</option>
                </select>
              </div>

              <button style={styles.submitBtn} type="submit">
                Get Your Mortgage Matches
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer style={styles.footer}>
        <p>
          LeadEngine Mortgage Guide © 2026. All information is educational and not financial advice.
          Consult with licensed loan officers for specific guidance.
        </p>
      </footer>

      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Understanding Mortgage Types',
            description:
              'Comprehensive guide to mortgage types including conventional, FHA, VA, USDA, jumbo, ARM, and more. Compare loans, calculate payments, and learn about down payments and PMI.',
            url: 'https://realtyclientengine.app/mortgage-types',
            mainEntity: {
              '@type': 'FAQPage',
              mainEntity: faqs.map((faq) => ({
                '@type': 'Question',
                name: faq.question,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: faq.answer,
                },
              })),
            },
          }),
        }}
      />
    </div>
  );
}
