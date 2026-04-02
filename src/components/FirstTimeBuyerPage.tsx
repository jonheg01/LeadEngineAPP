'use client';

import React, { useState, useRef } from 'react';

export default function FirstTimeBuyerPage() {
  const [expandedSteps, setExpandedSteps] = useState<Set<number>>(new Set());
  const [expandedMistakes, setExpandedMistakes] = useState<Set<number>>(new Set());
  const [expandedFaqs, setExpandedFaqs] = useState<Set<number>>(new Set());
  const [income, setIncome] = useState<string>('75000');
  const [monthlyDebts, setMonthlyDebts] = useState<string>('500');
  const [downPayment, setDownPayment] = useState<string>('50000');
  const [leadEmail, setLeadEmail] = useState<string>('');
  const [leadName, setLeadName] = useState<string>('');
  const [leadPhone, setLeadPhone] = useState<string>('');
  const [leadSubmitted, setLeadSubmitted] = useState<boolean>(false);
  const heroRef = useRef<HTMLDivElement>(null);

  const toggleStep = (index: number) => {
    const newSet = new Set(expandedSteps);
    if (newSet.has(index)) {
      newSet.delete(index);
    } else {
      newSet.add(index);
    }
    setExpandedSteps(newSet);
  };

  const toggleMistake = (index: number) => {
    const newSet = new Set(expandedMistakes);
    if (newSet.has(index)) {
      newSet.delete(index);
    } else {
      newSet.add(index);
    }
    setExpandedMistakes(newSet);
  };

  const toggleFaq = (index: number) => {
    const newSet = new Set(expandedFaqs);
    if (newSet.has(index)) {
      newSet.delete(index);
    } else {
      newSet.add(index);
    }
    setExpandedFaqs(newSet);
  };

  const calculateAffordability = () => {
    const annualIncome = parseFloat(income) || 0;
    const monthlyDebt = parseFloat(monthlyDebts) || 0;
    const downPaymentAmount = parseFloat(downPayment) || 0;

    const monthlyIncome = annualIncome / 12;
    const maxMonthlyPayment = monthlyIncome * 0.43 - monthlyDebt;
    const interestRate = 0.065;
    const monthlyRate = interestRate / 12;
    const loanTerm = 360;

    const maxLoanAmount =
      maxMonthlyPayment *
      (((1 + monthlyRate) ** loanTerm - 1) / (monthlyRate * (1 + monthlyRate) ** loanTerm));

    const maxPriceRange = maxLoanAmount + downPaymentAmount;
    const minDownPaymentPercent = downPaymentAmount / maxPriceRange;

    return {
      priceRange: Math.max(0, maxPriceRange),
      monthlyPayment: Math.max(0, maxMonthlyPayment),
      downPaymentPercent: minDownPaymentPercent * 100,
      loanAmount: Math.max(0, maxLoanAmount),
    };
  };

  const affordability = calculateAffordability();

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (leadEmail && leadName) {
      setLeadSubmitted(true);
      setTimeout(() => {
        setLeadSubmitted(false);
        setLeadEmail('');
        setLeadName('');
        setLeadPhone('');
      }, 3000);
    }
  };

  const steps = [
    {
      number: 1,
      title: 'Check Your Credit Score',
      description:
        'Your credit score determines your interest rate and loan options. Aim for 620+, but 740+ gets you the best rates.',
      details:
        'Get free credit reports at AnnualCreditReport.com. Check all three bureaus (Equifax, Experian, TransUnion). Dispute any errors immediately. Pay down existing debts to improve your score. Most lenders require a minimum score, and first-time buyer programs often have minimum requirements.',
    },
    {
      number: 2,
      title: 'Save for Your Down Payment',
      description:
        'Down payment ranges from 0-20% depending on your loan type. Start small and automate your savings.',
      details:
        'FHA loans require as little as 3.5% down. Conventional loans typically need 5-20%. VA loans may require 0% down. Set up automatic transfers to a dedicated savings account. Consider high-yield savings accounts for your down payment fund. Look into down payment assistance programs while you save.',
    },
    {
      number: 3,
      title: 'Get Pre-Approved for a Mortgage',
      description:
        'Pre-approval shows sellers you\u2019re serious and tells you exactly what you can afford.',
      details:
        'Contact 3-5 lenders to compare rates and terms. Bring recent pay stubs, tax returns, and bank statements. You\u2019ll get a pre-approval letter showing your budget. Pre-approval is free and doesn\u2019t hurt your credit significantly. Keep your pre-approval current (usually valid for 90 days). Don\u2019t miss payments or open new credit during this time.',
    },
    {
      number: 4,
      title: 'Find Your Real Estate Agent',
      description:
        'An experienced agent guides you through the market and negotiates on your behalf.',
      details:
        'Look for agents with first-time buyer experience. Interview 2-3 candidates. Ask about their local market knowledge and client testimonials. Your agent costs you nothing—the seller pays the commission. Build a strong relationship with someone you trust. Let them know your budget, timeline, and must-haves.',
    },
    {
      number: 5,
      title: 'Get a Home Inspection',
      description:
        'An inspection reveals hidden problems before you commit. It\u2019s your safety net.',
      details:
        'Schedule inspection within 7-10 days of your offer. Inspector checks foundation, roof, plumbing, electrical, HVAC, and more. You get a detailed report within 24 hours. Review results carefully. Negotiate repairs or price reduction based on findings. Never skip this step—it can save you thousands.',
    },
    {
      number: 6,
      title: 'Secure a Home Appraisal',
      description:
        'The appraisal ensures the home\u2019s value matches your purchase price. Your lender requires this.',
      details:
        'Lender orders appraisal after you get a purchase agreement. Takes 7-10 days typically. Appraiser inspects interior and exterior, compares similar homes. If appraisal comes in low, you may need to renegotiate or bring more cash. You usually can\u2019t do anything to change the appraisal value.',
    },
    {
      number: 7,
      title: 'Finalize Your Homeowners Insurance',
      description:
        'Your lender requires proof of insurance before closing. Don\u2019t wait until the last minute.',
      details:
        'Get quotes from 3+ insurance companies. Homeowners insurance covers your home and liability. Deductibles typically range from $500-$1,500. Shop around—prices vary significantly. Lock in your rate early. Provide proof to your lender at least a week before closing.',
    },
    {
      number: 8,
      title: 'Close on Your Home',
      description:
        'The final step where you sign documents, transfer funds, and get your keys.',
      details:
        'Closing typically takes 30-45 days after your offer. Review the Closing Disclosure 3 days before closing. Bring ID and proof of funds. Expect to sign 50+ documents. A title company or attorney facilitates. Bring a cashier\u2019s check for down payment and closing costs, or wire funds as instructed. Then you\u2019re a homeowner!',
    },
  ];

  const programs = [
    {
      name: 'FHA Loans',
      icon: '🏠',
      description: 'Federal Housing Administration backed loans with low down payments.',
      minDown: '3.5%',
      minScore: '580',
      eligibility:
        'U.S. citizen or permanent resident, stable employment history, debt-to-income ratio under 50%. Cannot have recent bankruptcy or foreclosure.',
      link: '#learn-fha',
    },
    {
      name: 'VA Loans',
      icon: '🎖️',
      description: 'For eligible military service members, veterans, and spouses.',
      minDown: '0%',
      minScore: 'No minimum',
      eligibility:
        'Active duty, honorable discharge, or eligible surviving spouse. Certificate of Eligibility required. No down payment typically needed.',
      link: '#learn-va',
    },
    {
      name: 'USDA Loans',
      icon: '🌾',
      description: 'For rural and suburban homebuyers with moderate incomes.',
      minDown: '0%',
      minScore: '640',
      eligibility:
        'Property must be in eligible rural area. Income limits apply. U.S. citizen or permanent resident. No minimum down payment required.',
      link: '#learn-usda',
    },
    {
      name: 'State/Local Assistance',
      icon: '📍',
      description: 'Down payment assistance programs vary by location.',
      minDown: 'Varies',
      minScore: 'Varies',
      eligibility:
        'Varies by program and location. Many programs target first-time buyers, minority homebuyers, and lower-income households. Grants may not require repayment.',
      link: '#learn-state',
    },
  ];

  const mistakes = [
    {
      title: 'Not Checking Your Credit Score First',
      problem:
        'You might waste time getting pre-approved only to find your score is too low.',
      solution:
        'Check your credit score and report at least 3 months before house hunting. Dispute errors and pay down debt to improve your score. A higher score can save you tens of thousands in interest.',
    },
    {
      title: 'Making Large Purchases on Credit',
      problem:
        'Buying a car or furniture before closing raises your debt-to-income ratio and can kill your loan approval.',
      solution:
        'Avoid any new credit for at least 6 months before applying. Don\u2019t finance furniture, cars, or appliances. Keep your credit cards inactive and unchanged.',
    },
    {
      title: 'Skipping the Pre-Approval',
      problem:
        'Without pre-approval, sellers won\u2019t take your offer seriously in competitive markets.',
      solution:
        'Get pre-approved early. It\u2019s free, shows you\u2019re serious, and defines your actual budget. Shop rates from multiple lenders.',
    },
    {
      title: 'Not Shopping Around for Lenders',
      problem:
        'Rates vary significantly between lenders. Picking the first one could cost you $10,000+ over the loan life.',
      solution:
        'Get quotes from at least 3-5 lenders. Compare interest rates, points, and fees. A 0.5% difference on a $300k loan means about $100/month.',
    },
    {
      title: 'Underestimating Closing Costs',
      problem:
        'You might not have enough cash at closing for appraisal, inspection, title insurance, and other fees.',
      solution:
        'Budget 2-5% of purchase price for closing costs. Get a loan estimate within 3 days of application. Save separate funds beyond your down payment.',
    },
    {
      title: 'Ignoring Your Debt-to-Income Ratio',
      problem:
        'Lenders won\u2019t approve you if your existing debts are too high relative to your income.',
      solution:
        'Keep debt-to-income below 43% (ideally under 36%). Pay down student loans, credit cards, and car payments before applying.',
    },
    {
      title: 'Not Getting a Home Inspection',
      problem:
        'A serious hidden problem (foundation, plumbing, roof) could cost $20,000+ to fix after purchase.',
      solution:
        'Always get a professional inspection. It\u2019s $300-500 but reveals major issues. Use results to renegotiate or walk away.',
    },
    {
      title: 'Focusing Only on Monthly Payment',
      problem:
        'Low monthly payment on a longer loan means you pay much more interest over time.',
      solution:
        'Consider 15-year vs 30-year mortgages. Calculate total interest paid, not just monthly payment. Aim for shortest term you can afford.',
    },
    {
      title: 'Neglecting Homeowners Insurance Shopping',
      problem:
        'Insurance costs vary wildly. Not comparing quotes means overpaying significantly.',
      solution:
        'Get 3-5 quotes from different companies. Compare coverage and deductibles, not just price. Ask about first-time buyer discounts.',
    },
    {
      title: 'Not Having Emergency Savings After Closing',
      problem:
        'New homes always need repairs. If you\u2019ve spent all your savings on down payment, you\u2019re in trouble.',
      solution:
        'Save 3-6 months of living expenses plus 1% of home price for emergency repairs. Budget for maintenance (roof, HVAC, plumbing).',
    },
  ];

  const costs = [
    { item: 'Home Appraisal', range: '$300-$700', description: 'Lender-required valuation' },
    { item: 'Home Inspection', range: '$300-$600', description: 'Professional evaluation' },
    { item: 'Title Search & Insurance', range: '$500-$2,000', description: 'Property ownership verification' },
    { item: 'Closing Costs', range: '2-5% of price', description: 'Lender, attorney, transfer fees' },
    { item: 'Homeowners Insurance', range: '$800-$2,000/year', description: 'First year typically required upfront' },
    { item: 'Property Taxes', range: 'Varies by location', description: 'Local tax rate prorated at closing' },
    { item: 'HOA Fees (if applicable)', range: '$50-$500/month', description: 'Homeowners association dues' },
    {
      item: 'Mortgage Insurance (if <20% down)',
      range: '$500-$2,000+/year',
      description: 'PMI required for loans under 80% LTV',
    },
  ];

  const timeline = [
    { phase: 'Getting Pre-Approved', time: '1-2 weeks', details: 'Lender review of finances' },
    {
      phase: 'House Shopping & Offer',
      time: '4-12 weeks',
      details: 'Your timeline; offer acceptance immediate',
    },
    { phase: 'Inspection & Appraisal', time: '1-2 weeks', details: 'Inspector and appraiser scheduling' },
    {
      phase: 'Underwriting & Verification',
      time: '5-7 days',
      details: 'Lender final review and document collection',
    },
    {
      phase: 'Appraisal Review',
      time: '3-5 days',
      details: 'Underwriter reviews appraisal results',
    },
    { phase: 'Title Search & Insurance', time: '5-7 days', details: 'Title company work' },
    {
      phase: 'Clear to Close',
      time: '1-2 days',
      details: 'Final lender approval; schedule closing',
    },
    { phase: 'Closing', time: '1 day', details: 'Sign documents and fund loan' },
  ];

  const faqs = [
    {
      q: 'How much do I need for a down payment?',
      a: 'It depends on your loan type. FHA loans require as little as 3.5% down. Conventional loans typically need 5-20%. VA and USDA loans may require 0% down. Most first-time buyers put down 5-10%.',
    },
    {
      q: 'What credit score do I need?',
      a: 'FHA loans accept scores as low as 580 (with 10% down) or 500 (with 3.5% down). Conventional loans usually require 620+. The higher your score, the better your interest rate. Scores above 740 get the best rates.',
    },
    {
      q: 'How long does the entire process take?',
      a: 'Typically 30-45 days from purchase agreement to closing. Pre-approval takes 1-2 weeks. House shopping can take weeks or months. The clock starts when you make an offer.',
    },
    {
      q: 'What\u2019s pre-approval and do I need it?',
      a: 'Pre-approval means a lender has reviewed your finances and approved you for up to a certain amount. It\u2019s free, doesn\u2019t hurt your credit much, and shows sellers you\u2019re serious. You absolutely should get it before shopping.',
    },
    {
      q: 'Can I get a mortgage with no down payment?',
      a: 'Yes! VA loans and some USDA loans offer 0% down. However, you\u2019ll likely pay mortgage insurance premiums. Most first-time buyers put some money down to lower costs.',
    },
    {
      q: 'What\u2019s included in closing costs?',
      a: 'Closing costs typically include appraisal, title insurance, attorney fees, lender fees, property taxes, HOA transfers, and other fees. Budget 2-5% of your purchase price.',
    },
    {
      q: 'Do I need homeowners insurance before closing?',
      a: 'Yes. Your lender will require proof of insurance before they fund the loan. Get quotes early and lock in coverage at least a week before closing.',
    },
    {
      q: 'What\u2019s mortgage insurance and do I need it?',
      a: 'Mortgage insurance (PMI) is required when your down payment is less than 20%. It protects the lender if you default. Once you reach 20% equity, you can request it be removed.',
    },
    {
      q: 'How do I compare loan options?',
      a: 'Get loan estimates from multiple lenders showing interest rate, points, fees, and monthly payment. Compare apples to apples. Don\u2019t just look at rates—factor in all costs.',
    },
    {
      q: 'What\u2019s the difference between FHA, VA, and USDA loans?',
      a: 'FHA is for most first-time buyers (3.5% down). VA is for veterans (0% down). USDA is for rural properties (0% down). Each has different eligibility, requirements, and benefits.',
    },
    {
      q: 'Can I buy a home with existing student loan debt?',
      a: 'Yes, but your student loans count toward your debt-to-income ratio. Lenders consider all monthly debt payments. Pay down loans if possible before applying, or work with a first-time buyer program.',
    },
    {
      q: 'What happens if the appraisal comes in low?',
      a: 'If the appraisal is less than the purchase price, you can renegotiate, request the seller lower their price, make up the difference in cash, or walk away (depending on your contingencies).',
    },
    {
      q: 'Should I get a 15-year or 30-year mortgage?',
      a: 'A 30-year mortgage has lower monthly payments but more interest paid overall. A 15-year mortgage has higher payments but builds equity faster and costs less in interest. Choose what fits your budget.',
    },
    {
      q: 'Can I use a gift for my down payment?',
      a: 'Yes! Many lenders allow gifted funds. The gift donor usually can\u2019t expect repayment. Your lender will require a gift letter explaining the relationship and confirming no repayment is expected.',
    },
    {
      q: 'What should I do to prepare for closing?',
      a: 'Review your Closing Disclosure 3 days before closing. Arrange a wire transfer for down payment and closing costs. Bring ID and proof of funds. Do a final walk-through. Then sign documents and get your keys!',
    },
    {
      q: 'What if I get denied for a mortgage?',
      a: 'Common reasons: low credit score, high debt-to-income ratio, insufficient income, or recent negative credit events. Work on these issues, then apply again. Consider first-time buyer programs or co-borrowers.',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah M.',
      role: 'First-Time Buyer, Austin TX',
      quote:
        'I was nervous about the whole process, but my agent and the lender made it so clear. We found our perfect home and closed in 35 days. Best decision ever!',
      image: '👩',
    },
    {
      name: 'James R.',
      role: 'Military Veteran, San Diego CA',
      quote:
        'The VA loan program was a game-changer. Zero down payment, and the support throughout was incredible. My family is now in our dream home.',
      image: '👨',
    },
    {
      name: 'Maria & Luis G.',
      role: 'First-Time Buyers, Phoenix AZ',
      quote:
        'We thought we\u2019d never save enough, but a down payment assistance program helped us get into our home. We\u2019re so grateful to have our own place.',
      image: '👨‍👩‍👧',
    },
  ];

  return (
    <div style={{ backgroundColor: 'var(--le-bg)', color: 'var(--le-text)', minHeight: '100vh' }}>
      {/* JSON-LD Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'First-Time Home Buyer Guide',
            description:
              'Comprehensive guide for first-time home buyers covering down payments, mortgages, programs, and common mistakes.',
            url: 'https://realtyclientengine.app/first-time-buyer',
            publisher: {
              '@type': 'Organization',
              name: 'LeadEngine',
              logo: {
                '@type': 'ImageObject',
                url: 'https://realtyclientengine.app/logo.png',
                width: 250,
                height: 60,
              },
            },
            mainEntity: {
              '@type': 'Guide',
              name: 'First-Time Home Buyer Guide',
              step: steps.map((step) => ({
                '@type': 'HowToStep',
                position: step.number,
                name: step.title,
                text: step.description,
              })),
            },
          }),
        }}
      />

      {/* HERO SECTION */}
      <div
        ref={heroRef}
        style={{
          backgroundColor: 'var(--le-primary)',
          color: 'white',
          padding: '60px 20px',
          textAlign: 'center',
          backgroundImage:
            'linear-gradient(135deg, var(--le-primary) 0%, var(--le-primary-hover) 100%)',
        }}
      >
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h1
            style={{
              fontSize: 'clamp(28px, 5vw, 52px)',
              marginBottom: '20px',
              fontWeight: '700',
              lineHeight: '1.2',
            }}
          >
            Your Guide to Becoming a First-Time Homeowner
          </h1>
          <p
            style={{
              fontSize: 'clamp(16px, 3vw, 20px)',
              marginBottom: '30px',
              opacity: 0.95,
              lineHeight: '1.5',
            }}
          >
            Everything you need to know about getting your keys, from saving for a down payment to
            closing on your dream home. We\u2019ll walk you through every step.
          </p>
          <button
            onClick={() => {
              document
                .getElementById('lead-capture')
                ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            style={{
              backgroundColor: 'var(--le-accent)',
              color: 'var(--le-text)',
              border: 'none',
              padding: '16px 32px',
              fontSize: '16px',
              fontWeight: '600',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
            }}
          >
            Get Your Free Consultation
          </button>
        </div>
      </div>

      {/* ROADMAP SECTION */}
      <section
        style={{
          padding: '60px 20px',
          maxWidth: '1200px',
          margin: '0 auto',
          borderBottom: `1px solid var(--le-border)`,
        }}
      >
        <h2
          style={{
            fontSize: 'clamp(24px, 4vw, 40px)',
            marginBottom: '40px',
            textAlign: 'center',
            fontWeight: '700',
          }}
        >
          Your 8-Step Roadmap to Homeownership
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px',
          }}
        >
          {steps.map((step, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: 'var(--le-bg-card)',
                border: `1px solid var(--le-border)`,
                borderRadius: '12px',
                padding: '24px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.1)';
                e.currentTarget.style.borderColor = 'var(--le-primary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = 'var(--le-border)';
              }}
              onClick={() => toggleStep(idx)}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '12px',
                  gap: '12px',
                }}
              >
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--le-primary)',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '700',
                    flexShrink: 0,
                  }}
                >
                  {step.number}
                </div>
                <h3
                  style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    margin: 0,
                    flex: 1,
                  }}
                >
                  {step.title}
                </h3>
                <span
                  style={{
                    fontSize: '18px',
                    transition: 'transform 0.3s ease',
                    transform: expandedSteps.has(idx) ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}
                >
                  ▼
                </span>
              </div>

              <p
                style={{
                  fontSize: '14px',
                  color: 'var(--le-text-secondary)',
                  margin: 0,
                  lineHeight: '1.5',
                }}
              >
                {step.description}
              </p>

              {expandedSteps.has(idx) && (
                <div
                  style={{
                    marginTop: '16px',
                    paddingTop: '16px',
                    borderTop: `1px solid var(--le-border)`,
                    fontSize: '14px',
                    lineHeight: '1.6',
                    color: 'var(--le-text-secondary)',
                  }}
                >
                  {step.details}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* PROGRAMS SECTION */}
      <section
        style={{
          padding: '60px 20px',
          maxWidth: '1200px',
          margin: '0 auto',
          borderBottom: `1px solid var(--le-border)`,
        }}
      >
        <h2
          style={{
            fontSize: 'clamp(24px, 4vw, 40px)',
            marginBottom: '40px',
            textAlign: 'center',
            fontWeight: '700',
          }}
        >
          First-Time Buyer Programs & Eligibility
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '24px',
          }}
        >
          {programs.map((prog, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: 'var(--le-bg-card)',
                border: `1px solid var(--le-border)`,
                borderRadius: '12px',
                padding: '28px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div
                style={{
                  fontSize: '40px',
                  marginBottom: '12px',
                }}
              >
                {prog.icon}
              </div>
              <h3
                style={{
                  fontSize: '18px',
                  fontWeight: '700',
                  marginBottom: '8px',
                  margin: 0,
                }}
              >
                {prog.name}
              </h3>
              <p
                style={{
                  fontSize: '14px',
                  color: 'var(--le-text-secondary)',
                  marginBottom: '16px',
                  lineHeight: '1.5',
                  margin: 0,
                  marginBottom: '16px',
                }}
              >
                {prog.description}
              </p>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '12px',
                  marginBottom: '16px',
                  fontSize: '13px',
                }}
              >
                <div
                  style={{
                    backgroundColor: 'var(--le-bg)',
                    padding: '12px',
                    borderRadius: '6px',
                  }}
                >
                  <div
                    style={{
                      fontWeight: '600',
                      color: 'var(--le-primary)',
                      marginBottom: '4px',
                    }}
                  >
                    Min Down
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: '700' }}>{prog.minDown}</div>
                </div>
                <div
                  style={{
                    backgroundColor: 'var(--le-bg)',
                    padding: '12px',
                    borderRadius: '6px',
                  }}
                >
                  <div
                    style={{
                      fontWeight: '600',
                      color: 'var(--le-primary)',
                      marginBottom: '4px',
                    }}
                  >
                    Min Score
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: '700' }}>{prog.minScore}</div>
                </div>
              </div>
              <p
                style={{
                  fontSize: '13px',
                  lineHeight: '1.5',
                  margin: 0,
                  color: 'var(--le-text-secondary)',
                  flex: 1,
                  marginBottom: '16px',
                }}
              >
                <strong>Eligibility:</strong> {prog.eligibility}
              </p>
              <a
                href={prog.link}
                style={{
                  display: 'inline-block',
                  color: 'var(--le-primary)',
                  fontWeight: '600',
                  textDecoration: 'none',
                  fontSize: '14px',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--le-primary-hover)';
                  e.currentTarget.style.textDecoration = 'underline';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--le-primary)';
                  e.currentTarget.style.textDecoration = 'none';
                }}
              >
                Learn More →
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* AFFORDABILITY CALCULATOR */}
      <section
        style={{
          padding: '60px 20px',
          backgroundColor: 'var(--le-bg-card)',
          borderBottom: `1px solid var(--le-border)`,
        }}
      >
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2
            style={{
              fontSize: 'clamp(24px, 4vw, 40px)',
              marginBottom: '40px',
              textAlign: 'center',
              fontWeight: '700',
            }}
          >
            What Can You Afford? 💰
          </h2>

          <div
            style={{
              backgroundColor: 'var(--le-bg)',
              borderRadius: '12px',
              padding: '32px',
              border: `1px solid var(--le-border)`,
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '20px',
                marginBottom: '32px',
              }}
            >
              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '600',
                    marginBottom: '8px',
                    color: 'var(--le-text)',
                  }}
                >
                  Annual Gross Income
                </label>
                <input
                  type="number"
                  value={income}
                  onChange={(e) => setIncome(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: `1px solid var(--le-border)`,
                    borderRadius: '6px',
                    fontSize: '14px',
                    boxSizing: 'border-box',
                    backgroundColor: 'var(--le-bg)',
                    color: 'var(--le-text)',
                  }}
                />
              </div>
              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '600',
                    marginBottom: '8px',
                    color: 'var(--le-text)',
                  }}
                >
                  Monthly Debt Obligations
                </label>
                <input
                  type="number"
                  value={monthlyDebts}
                  onChange={(e) => setMonthlyDebts(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: `1px solid var(--le-border)`,
                    borderRadius: '6px',
                    fontSize: '14px',
                    boxSizing: 'border-box',
                    backgroundColor: 'var(--le-bg)',
                    color: 'var(--le-text)',
                  }}
                />
              </div>
              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '600',
                    marginBottom: '8px',
                    color: 'var(--le-text)',
                  }}
                >
                  Available Down Payment
                </label>
                <input
                  type="number"
                  value={downPayment}
                  onChange={(e) => setDownPayment(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: `1px solid var(--le-border)`,
                    borderRadius: '6px',
                    fontSize: '14px',
                    boxSizing: 'border-box',
                    backgroundColor: 'var(--le-bg)',
                    color: 'var(--le-text)',
                  }}
                />
              </div>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '20px',
              }}
            >
              <div
                style={{
                  backgroundColor: 'var(--le-bg-card)',
                  padding: '20px',
                  borderRadius: '8px',
                  border: `2px solid var(--le-accent)`,
                }}
              >
                <div
                  style={{
                    fontSize: '12px',
                    fontWeight: '600',
                    color: 'var(--le-text-secondary)',
                    marginBottom: '8px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}
                >
                  Home Price Range
                </div>
                <div
                  style={{
                    fontSize: 'clamp(20px, 4vw, 28px)',
                    fontWeight: '700',
                    color: 'var(--le-accent)',
                    lineHeight: '1.2',
                  }}
                >
                  ${(affordability.priceRange / 1000).toFixed(0)}K
                </div>
                <div
                  style={{
                    fontSize: '12px',
                    color: 'var(--le-text-secondary)',
                    marginTop: '4px',
                  }}
                >
                  Estimated max purchase price
                </div>
              </div>

              <div
                style={{
                  backgroundColor: 'var(--le-bg-card)',
                  padding: '20px',
                  borderRadius: '8px',
                  border: `2px solid var(--le-success)`,
                }}
              >
                <div
                  style={{
                    fontSize: '12px',
                    fontWeight: '600',
                    color: 'var(--le-text-secondary)',
                    marginBottom: '8px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}
                >
                  Monthly Payment
                </div>
                <div
                  style={{
                    fontSize: 'clamp(20px, 4vw, 28px)',
                    fontWeight: '700',
                    color: 'var(--le-success)',
                    lineHeight: '1.2',
                  }}
                >
                  ${affordability.monthlyPayment.toFixed(0)}/mo
                </div>
                <div
                  style={{
                    fontSize: '12px',
                    color: 'var(--le-text-secondary)',
                    marginTop: '4px',
                  }}
                >
                  Est. mortgage payment only
                </div>
              </div>

              <div
                style={{
                  backgroundColor: 'var(--le-bg-card)',
                  padding: '20px',
                  borderRadius: '8px',
                  border: `2px solid var(--le-primary)`,
                }}
              >
                <div
                  style={{
                    fontSize: '12px',
                    fontWeight: '600',
                    color: 'var(--le-text-secondary)',
                    marginBottom: '8px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}
                >
                  Down Payment %
                </div>
                <div
                  style={{
                    fontSize: 'clamp(20px, 4vw, 28px)',
                    fontWeight: '700',
                    color: 'var(--le-primary)',
                    lineHeight: '1.2',
                  }}
                >
                  {affordability.downPaymentPercent.toFixed(1)}%
                </div>
                <div
                  style={{
                    fontSize: '12px',
                    color: 'var(--le-text-secondary)',
                    marginTop: '4px',
                  }}
                >
                  Of home price
                </div>
              </div>
            </div>

            <div
              style={{
                marginTop: '24px',
                padding: '16px',
                backgroundColor: 'var(--le-bg)',
                borderLeft: `4px solid var(--le-warning)`,
                borderRadius: '4px',
                fontSize: '13px',
                color: 'var(--le-text-secondary)',
                lineHeight: '1.6',
              }}
            >
              <strong>Disclaimer:</strong> This calculator provides an estimate based on general
              lending standards. Actual loan approval depends on credit score, employment history,
              assets, and other factors. Consult with a lender for personalized pre-approval.
            </div>
          </div>
        </div>
      </section>

      {/* COMMON MISTAKES SECTION */}
      <section
        style={{
          padding: '60px 20px',
          maxWidth: '1200px',
          margin: '0 auto',
          borderBottom: `1px solid var(--le-border)`,
        }}
      >
        <h2
          style={{
            fontSize: 'clamp(24px, 4vw, 40px)',
            marginBottom: '40px',
            textAlign: 'center',
            fontWeight: '700',
          }}
        >
          10 Common Mistakes First-Time Buyers Make
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px',
          }}
        >
          {mistakes.map((mistake, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: 'var(--le-bg-card)',
                border: `1px solid var(--le-border)`,
                borderRadius: '12px',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  backgroundColor: 'var(--le-danger)',
                  color: 'white',
                  padding: '16px',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '12px',
                }}
                onClick={() => toggleMistake(idx)}
              >
                <h3
                  style={{
                    fontSize: '16px',
                    fontWeight: '700',
                    margin: 0,
                    flex: 1,
                  }}
                >
                  {mistake.title}
                </h3>
                <span
                  style={{
                    fontSize: '16px',
                    transition: 'transform 0.3s ease',
                    transform: expandedMistakes.has(idx) ? 'rotate(180deg)' : 'rotate(0deg)',
                    flexShrink: 0,
                  }}
                >
                  ▼
                </span>
              </div>

              <div style={{ padding: '16px' }}>
                <div
                  style={{
                    marginBottom: '12px',
                  }}
                >
                  <div
                    style={{
                      fontSize: '12px',
                      fontWeight: '600',
                      color: 'var(--le-danger)',
                      textTransform: 'uppercase',
                      marginBottom: '4px',
                    }}
                  >
                    ✗ The Problem
                  </div>
                  <p
                    style={{
                      fontSize: '14px',
                      margin: 0,
                      color: 'var(--le-text-secondary)',
                      lineHeight: '1.5',
                    }}
                  >
                    {mistake.problem}
                  </p>
                </div>

                {expandedMistakes.has(idx) && (
                  <div>
                    <div
                      style={{
                        fontSize: '12px',
                        fontWeight: '600',
                        color: 'var(--le-success)',
                        textTransform: 'uppercase',
                        marginBottom: '4px',
                      }}
                    >
                      ✓ The Solution
                    </div>
                    <p
                      style={{
                        fontSize: '14px',
                        margin: 0,
                        color: 'var(--le-text-secondary)',
                        lineHeight: '1.5',
                      }}
                    >
                      {mistake.solution}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* COST BREAKDOWN */}
      <section
        style={{
          padding: '60px 20px',
          backgroundColor: 'var(--le-bg-card)',
          borderBottom: `1px solid var(--le-border)`,
        }}
      >
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2
            style={{
              fontSize: 'clamp(24px, 4vw, 40px)',
              marginBottom: '40px',
              textAlign: 'center',
              fontWeight: '700',
            }}
          >
            Understand the Costs 💸
          </h2>

          <div style={{ overflowX: 'auto' }}>
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                backgroundColor: 'var(--le-bg)',
                borderRadius: '12px',
                overflow: 'hidden',
              }}
            >
              <thead>
                <tr
                  style={{
                    backgroundColor: 'var(--le-primary)',
                    color: 'white',
                  }}
                >
                  <th
                    style={{
                      padding: '16px',
                      textAlign: 'left',
                      fontWeight: '700',
                      fontSize: '14px',
                    }}
                  >
                    Cost Item
                  </th>
                  <th
                    style={{
                      padding: '16px',
                      textAlign: 'left',
                      fontWeight: '700',
                      fontSize: '14px',
                    }}
                  >
                    Typical Range
                  </th>
                  <th
                    style={{
                      padding: '16px',
                      textAlign: 'left',
                      fontWeight: '700',
                      fontSize: '14px',
                    }}
                  >
                    What It Covers
                  </th>
                </tr>
              </thead>
              <tbody>
                {costs.map((cost, idx) => (
                  <tr
                    key={idx}
                    style={{
                      borderBottom: `1px solid var(--le-border)`,
                      backgroundColor: idx % 2 === 0 ? 'var(--le-bg-card)' : 'var(--le-bg)',
                    }}
                  >
                    <td
                      style={{
                        padding: '16px',
                        fontSize: '14px',
                        fontWeight: '600',
                      }}
                    >
                      {cost.item}
                    </td>
                    <td
                      style={{
                        padding: '16px',
                        fontSize: '14px',
                        fontWeight: '600',
                        color: 'var(--le-accent)',
                      }}
                    >
                      {cost.range}
                    </td>
                    <td
                      style={{
                        padding: '16px',
                        fontSize: '13px',
                        color: 'var(--le-text-secondary)',
                        lineHeight: '1.5',
                      }}
                    >
                      {cost.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div
            style={{
              marginTop: '24px',
              padding: '20px',
              backgroundColor: 'var(--le-bg)',
              borderRadius: '8px',
              border: `1px solid var(--le-border)`,
            }}
          >
            <p
              style={{
                fontSize: '14px',
                lineHeight: '1.6',
                margin: 0,
                color: 'var(--le-text-secondary)',
              }}
            >
              <strong>Pro Tip:</strong> Total closing costs typically range from 2-5% of your
              purchase price. If you\u2019re buying a $300,000 home, budget $6,000-$15,000 in
              addition to your down payment.
            </p>
          </div>
        </div>
      </section>

      {/* TIMELINE SECTION */}
      <section
        style={{
          padding: '60px 20px',
          maxWidth: '1200px',
          margin: '0 auto',
          borderBottom: `1px solid var(--le-border)`,
        }}
      >
        <h2
          style={{
            fontSize: 'clamp(24px, 4vw, 40px)',
            marginBottom: '40px',
            textAlign: 'center',
            fontWeight: '700',
          }}
        >
          Timeline: What to Expect ⏱️
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '20px',
          }}
        >
          {timeline.map((item, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: 'var(--le-bg-card)',
                border: `2px solid var(--le-primary)`,
                borderRadius: '12px',
                padding: '24px',
                position: 'relative',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: '-12px',
                  left: '20px',
                  backgroundColor: 'var(--le-primary)',
                  color: 'white',
                  padding: '4px 12px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: '700',
                }}
              >
                {item.time}
              </div>
              <h3
                style={{
                  fontSize: '16px',
                  fontWeight: '700',
                  marginBottom: '12px',
                  marginTop: '12px',
                }}
              >
                {item.phase}
              </h3>
              <p
                style={{
                  fontSize: '13px',
                  color: 'var(--le-text-secondary)',
                  lineHeight: '1.5',
                  margin: 0,
                }}
              >
                {item.details}
              </p>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: '40px',
            padding: '24px',
            backgroundColor: 'var(--le-bg-card)',
            borderRadius: '12px',
            border: `1px solid var(--le-border)`,
            textAlign: 'center',
          }}
        >
          <p
            style={{
              fontSize: '16px',
              fontWeight: '700',
              margin: 0,
              marginBottom: '8px',
              color: 'var(--le-primary)',
            }}
          >
            Total Timeline: 30-45 Days
          </p>
          <p
            style={{
              fontSize: '13px',
              color: 'var(--le-text-secondary)',
              margin: 0,
              lineHeight: '1.5',
            }}
          >
            From purchase agreement to closing. House hunting timeline varies based on market
            conditions and your preferences.
          </p>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section
        style={{
          padding: '60px 20px',
          backgroundColor: 'var(--le-bg-card)',
          borderBottom: `1px solid var(--le-border)`,
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2
            style={{
              fontSize: 'clamp(24px, 4vw, 40px)',
              marginBottom: '40px',
              textAlign: 'center',
              fontWeight: '700',
            }}
          >
            Real Stories from First-Time Buyers
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px',
            }}
          >
            {testimonials.map((testimonial, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: 'var(--le-bg)',
                  border: `1px solid var(--le-border)`,
                  borderRadius: '12px',
                  padding: '32px',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div
                  style={{
                    fontSize: '40px',
                    marginBottom: '16px',
                  }}
                >
                  {testimonial.image}
                </div>
                <p
                  style={{
                    fontSize: '15px',
                    lineHeight: '1.6',
                    margin: 0,
                    marginBottom: '16px',
                    fontStyle: 'italic',
                    color: 'var(--le-text)',
                  }}
                >
                  \u201c{testimonial.quote}\u201d
                </p>
                <div style={{ marginTop: 'auto' }}>
                  <div
                    style={{
                      fontSize: '14px',
                      fontWeight: '700',
                      color: 'var(--le-primary)',
                    }}
                  >
                    {testimonial.name}
                  </div>
                  <div
                    style={{
                      fontSize: '12px',
                      color: 'var(--le-text-secondary)',
                      marginTop: '4px',
                    }}
                  >
                    {testimonial.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section
        style={{
          padding: '60px 20px',
          maxWidth: '1000px',
          margin: '0 auto',
          borderBottom: `1px solid var(--le-border)`,
        }}
      >
        <h2
          style={{
            fontSize: 'clamp(24px, 4vw, 40px)',
            marginBottom: '40px',
            textAlign: 'center',
            fontWeight: '700',
          }}
        >
          Frequently Asked Questions
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '16px',
          }}
        >
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: 'var(--le-bg-card)',
                border: `1px solid var(--le-border)`,
                borderRadius: '8px',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  padding: '20px',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '12px',
                  backgroundColor: expandedFaqs.has(idx) ? 'var(--le-bg)' : 'transparent',
                  transition: 'background-color 0.3s ease',
                }}
                onClick={() => toggleFaq(idx)}
              >
                <h3
                  style={{
                    fontSize: '15px',
                    fontWeight: '600',
                    margin: 0,
                    flex: 1,
                    color: 'var(--le-text)',
                  }}
                >
                  {faq.q}
                </h3>
                <span
                  style={{
                    fontSize: '16px',
                    transition: 'transform 0.3s ease',
                    transform: expandedFaqs.has(idx) ? 'rotate(180deg)' : 'rotate(0deg)',
                    flexShrink: 0,
                    color: 'var(--le-primary)',
                  }}
                >
                  ▼
                </span>
              </div>

              {expandedFaqs.has(idx) && (
                <div
                  style={{
                    padding: '20px',
                    paddingTop: '0px',
                    borderTop: `1px solid var(--le-border)`,
                    fontSize: '14px',
                    lineHeight: '1.6',
                    color: 'var(--le-text-secondary)',
                  }}
                >
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* LEAD CAPTURE CTA */}
      <section
        id="lead-capture"
        style={{
          padding: '60px 20px',
          backgroundColor: 'var(--le-primary)',
          color: 'white',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <h2
            style={{
              fontSize: 'clamp(24px, 4vw, 40px)',
              marginBottom: '16px',
              fontWeight: '700',
            }}
          >
            Ready to Start Your Home Buying Journey?
          </h2>
          <p
            style={{
              fontSize: '16px',
              marginBottom: '32px',
              opacity: 0.95,
              lineHeight: '1.5',
            }}
          >
            Schedule your free first-time buyer consultation. Our experts will guide you through
            financing options, programs, and the entire process.
          </p>

          {leadSubmitted ? (
            <div
              style={{
                backgroundColor: 'var(--le-success)',
                padding: '24px',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
              }}
            >
              ✓ Thank you! We\u2019ll be in touch within 24 hours.
            </div>
          ) : (
            <form
              onSubmit={handleLeadSubmit}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '12px',
                marginBottom: '16px',
              }}
            >
              <input
                type="text"
                placeholder="Your Name"
                value={leadName}
                onChange={(e) => setLeadName(e.target.value)}
                required
                style={{
                  padding: '14px',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '14px',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  boxSizing: 'border-box',
                }}
              />
              <input
                type="email"
                placeholder="Your Email"
                value={leadEmail}
                onChange={(e) => setLeadEmail(e.target.value)}
                required
                style={{
                  padding: '14px',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '14px',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  boxSizing: 'border-box',
                }}
              />
              <input
                type="tel"
                placeholder="Phone (optional)"
                value={leadPhone}
                onChange={(e) => setLeadPhone(e.target.value)}
                style={{
                  padding: '14px',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '14px',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  boxSizing: 'border-box',
                }}
              />
              <button
                type="submit"
                style={{
                  backgroundColor: 'var(--le-accent)',
                  color: 'var(--le-text)',
                  border: 'none',
                  padding: '14px 24px',
                  fontSize: '15px',
                  fontWeight: '700',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Get Free Consultation
              </button>
            </form>
          )}

          <p
            style={{
              fontSize: '12px',
              opacity: 0.8,
              margin: 0,
              lineHeight: '1.4',
            }}
          >
            We\u2019ll never spam you. Your information stays confidential. We\u2019re here to help you
            achieve homeownership.
          </p>
        </div>
      </section>

      {/* FOOTER CTA */}
      <footer
        style={{
          padding: '40px 20px',
          backgroundColor: 'var(--le-bg-card)',
          borderTop: `1px solid var(--le-border)`,
          textAlign: 'center',
          color: 'var(--le-text-secondary)',
          fontSize: '13px',
          lineHeight: '1.6',
        }}
      >
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <p style={{ margin: '0 0 12px 0' }}>
            <strong>LeadEngine First-Time Buyer Guide</strong> \u2013 Your complete resource for
            navigating the home purchase journey.
          </p>
          <p style={{ margin: 0 }}>
            Have questions? Contact us for personalized guidance or schedule a consultation with a
            real estate expert.
          </p>
        </div>
      </footer>
    </div>
  );
}
