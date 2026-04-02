'use client';

import React, { useState, useMemo } from 'react';

// SVG Icons
const IconChevronDown = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="6 9 10 13 14 9" />
  </svg>
);

const IconCheck = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="18 6 9 15 2 8" />
  </svg>
);

const IconAlertCircle = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="10" cy="10" r="9" />
    <line x1="10" y1="6" x2="10" y2="10" />
    <line x1="10" y1="14" x2="10" y2="15" />
  </svg>
);

const IconDollarSign = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="10" y1="2" x2="10" y2="18" />
    <path d="M4 7h12a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2z" />
  </svg>
);

const IconHome = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 10l7-7 7 7v7a2 2 0 0 1-2 2h-10a2 2 0 0 1-2-2v-7z" />
    <polyline points="9 15 9 11 11 11 11 15" />
  </svg>
);

const IconTrendingUp = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="23 6 13 16 8 11 2 17" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

const IconFileText = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14 2H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z" />
    <line x1="6" y1="6" x2="14" y2="6" />
    <line x1="6" y1="10" x2="14" y2="10" />
    <line x1="6" y1="14" x2="14" y2="14" />
  </svg>
);

const IconShield = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const IconPhone = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

// Styles
const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
  },
  section: {
    padding: '80px 0',
    borderBottom: '1px solid var(--le-border)',
  },
  sectionTitle: {
    fontSize: '36px',
    fontWeight: '700',
    marginBottom: '16px',
    color: 'var(--le-text)',
  },
  sectionDescription: {
    fontSize: '18px',
    color: 'var(--le-text-secondary)',
    marginBottom: '48px',
    lineHeight: '1.6',
    maxWidth: '600px',
  },
  heroSection: {
    background: `linear-gradient(135deg, var(--le-bg) 0%, var(--le-surface) 100%)`,
    padding: '120px 0',
    textAlign: 'center' as const,
  },
  heroTitle: {
    fontSize: '48px',
    fontWeight: '800',
    marginBottom: '24px',
    color: 'var(--le-text)',
    lineHeight: '1.2',
  },
  heroSubtitle: {
    fontSize: '20px',
    color: 'var(--le-text-secondary)',
    marginBottom: '48px',
    lineHeight: '1.6',
    maxWidth: '700px',
    margin: '0 auto 48px',
  },
  comparisonGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '32px',
    marginBottom: '48px',
  },
  comparisonCard: {
    background: 'var(--le-surface)',
    border: '1px solid var(--le-border)',
    borderRadius: '12px',
    padding: '32px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  comparisonCardActive: {
    background: 'var(--le-bg)',
    borderColor: 'var(--le-accent)',
    boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
  },
  comparisonCardTitle: {
    fontSize: '22px',
    fontWeight: '700',
    marginBottom: '16px',
    color: 'var(--le-text)',
  },
  comparisonCardText: {
    fontSize: '14px',
    color: 'var(--le-text-secondary)',
    lineHeight: '1.6',
  },
  featureTable: {
    width: '100%',
    borderCollapse: 'collapse' as const,
    marginTop: '32px',
  },
  tableHeader: {
    background: 'var(--le-surface)',
    borderBottom: '2px solid var(--le-border)',
    padding: '16px',
    textAlign: 'left' as const,
    fontSize: '14px',
    fontWeight: '700',
    color: 'var(--le-text)',
  },
  tableCell: {
    padding: '16px',
    borderBottom: '1px solid var(--le-border)',
    fontSize: '14px',
    color: 'var(--le-text)',
  },
  featuresList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '24px',
    marginTop: '32px',
  },
  featureItem: {
    display: 'flex',
    gap: '16px',
  },
  featureIcon: {
    flexShrink: 0,
    width: '24px',
    height: '24px',
    color: 'var(--le-accent)',
    marginTop: '2px',
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: 'var(--le-text)',
    marginBottom: '8px',
  },
  featureDescription: {
    fontSize: '14px',
    color: 'var(--le-text-secondary)',
    lineHeight: '1.5',
  },
  accordion: {
    marginTop: '32px',
  },
  accordionItem: {
    border: '1px solid var(--le-border)',
    borderRadius: '8px',
    marginBottom: '16px',
    overflow: 'hidden',
  },
  accordionHeader: {
    background: 'var(--le-surface)',
    padding: '20px',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '16px',
    fontWeight: '600',
    color: 'var(--le-text)',
    border: 'none',
    width: '100%',
    transition: 'all 0.3s ease',
  },
  accordionHeaderActive: {
    background: 'var(--le-accent)',
    color: 'white',
  },
  accordionContent: {
    padding: '20px',
    background: 'var(--le-bg)',
    fontSize: '14px',
    lineHeight: '1.6',
    color: 'var(--le-text-secondary)',
  },
  calculator: {
    background: 'var(--le-surface)',
    borderRadius: '12px',
    padding: '40px',
    marginTop: '32px',
  },
  calculatorInput: {
    width: '100%',
    padding: '12px 16px',
    border: '1px solid var(--le-border)',
    borderRadius: '8px',
    fontSize: '14px',
    marginBottom: '16px',
    fontFamily: 'inherit',
    color: 'var(--le-text)',
    background: 'var(--le-bg)',
  },
  calculatorRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '24px',
    marginBottom: '32px',
  },
  calculatorResult: {
    background: 'var(--le-bg)',
    padding: '24px',
    borderRadius: '8px',
    borderLeft: '4px solid var(--le-accent)',
  },
  calculatorResultLabel: {
    fontSize: '14px',
    color: 'var(--le-text-secondary)',
    marginBottom: '8px',
  },
  calculatorResultValue: {
    fontSize: '28px',
    fontWeight: '700',
    color: 'var(--le-accent)',
  },
  ctaSection: {
    background: `linear-gradient(135deg, var(--le-accent) 0%, var(--le-text) 100%)`,
    borderRadius: '12px',
    padding: '48px',
    color: 'white',
    textAlign: 'center' as const,
    marginTop: '48px',
  },
  ctaTitle: {
    fontSize: '28px',
    fontWeight: '700',
    marginBottom: '16px',
  },
  ctaDescription: {
    fontSize: '16px',
    marginBottom: '32px',
    opacity: '0.9',
    maxWidth: '600px',
    margin: '0 auto 32px',
  },
  ctaButton: {
    background: 'white',
    color: 'var(--le-accent)',
    border: 'none',
    padding: '14px 32px',
    fontSize: '16px',
    fontWeight: '600',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  ctaButtonHover: {
    transform: 'translateY(-2px)',
    boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
  },
  alertBox: {
    background: 'rgba(220, 38, 38, 0.1)',
    border: '1px solid rgba(220, 38, 38, 0.3)',
    borderRadius: '8px',
    padding: '16px',
    display: 'flex',
    gap: '12px',
    marginBottom: '24px',
    color: 'var(--le-text)',
  },
  alertIcon: {
    flexShrink: 0,
    color: '#dc2626',
    marginTop: '2px',
  },
  alertText: {
    fontSize: '14px',
    lineHeight: '1.6',
  },
  grid2Col: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '32px',
    marginTop: '32px',
  },
  card: {
    background: 'var(--le-surface)',
    border: '1px solid var(--le-border)',
    borderRadius: '12px',
    padding: '32px',
  },
  cardTitle: {
    fontSize: '18px',
    fontWeight: '700',
    marginBottom: '16px',
    color: 'var(--le-text)',
  },
  cardText: {
    fontSize: '14px',
    color: 'var(--le-text-secondary)',
    lineHeight: '1.6',
  },
  textBold: {
    fontWeight: '700',
    color: 'var(--le-text)',
  },
};

// Main Component
export default function CondoBuyingGuidePage() {
  const [activeComparison, setActiveComparison] = useState<string>('condo');
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(null);
  const [calculatorValues, setCalculatorValues] = useState({
    homePrice: 400000,
    hoaFees: 350,
    downPayment: 80000,
    interestRate: 6.5,
  });
  const [ctaHover, setCtaHover] = useState(false);

  const comparisonTypes = [
    {
      id: 'condo',
      name: 'Condo',
      description: 'Own unit + shared building amenities',
      pros: ['Low maintenance', 'Amenities included', 'Good for investment'],
      cons: ['HOA fees', 'Shared walls', 'Approval needed'],
    },
    {
      id: 'townhome',
      name: 'Townhome',
      description: 'Own multi-level home with shared walls',
      pros: ['More space', 'Lower HOA typically', 'Parking flexibility'],
      cons: ['Shared responsibility', 'Fewer amenities', 'Resale concerns'],
    },
    {
      id: 'singleFamily',
      name: 'Single Family Home',
      description: 'Fully detached home on own lot',
      pros: ['Complete freedom', 'No HOA', 'Maximum appreciation'],
      cons: ['Higher maintenance', 'All expenses yours', 'Longer sales'],
    },
  ];

  const hoaFeatures = [
    {
      title: 'Monthly Fees',
      description: 'Typically $200\u2013$600+ depending on location and amenities',
    },
    {
      title: 'Reserve Fund',
      description: 'Should maintain 30\u201350% funding for major repairs',
    },
    {
      title: 'Special Assessments',
      description: 'Unexpected charges for major capital projects',
    },
    {
      title: 'Approval Requirements',
      description: 'Most condos require lender approval, many are non-warrantable',
    },
    {
      title: 'Rules & Restrictions',
      description: 'Pet policies, rental restrictions, renovation guidelines',
    },
    {
      title: 'Financial Health',
      description: 'Review annual budgets and litigation history',
    },
  ];

  const financingOptions = [
    {
      title: 'Conventional Loans',
      description: 'Standard 30-year mortgages. Require warrantable condo project. Down payment 3\u201320%.',
      icon: <IconDollarSign />,
    },
    {
      title: 'FHA Loans',
      description: 'Insured by FHA. Down to 3.5%. More flexible on non-warrantable properties.',
      icon: <IconShield />,
    },
    {
      title: 'Portfolio Loans',
      description: 'Lender keeps the loan. Excellent for non-warrantable condos and unique situations.',
      icon: <IconTrendingUp />,
    },
    {
      title: 'Jumbo Loans',
      description: 'For properties over $766,550. Stricter requirements on condo approval.',
      icon: <IconHome />,
    },
  ];

  const whatToLookFor = [
    {
      title: 'Building Condition',
      description: 'Inspect exterior, roof, HVAC, plumbing. Ask about recent major repairs and replacements.',
    },
    {
      title: 'Amenities',
      description: 'Gym, pool, common areas, security. Verify what you\u2019re actually paying for in HOA.',
    },
    {
      title: 'Parking',
      description: 'Assigned or tandem? Costs extra? Visitor parking available? Critical for resale.',
    },
    {
      title: 'Storage',
      description: 'Closet space, basement, climate-controlled units. Condo living requires good storage.',
    },
    {
      title: 'Noise & Privacy',
      description: 'Visit at different times. Check soundproofing between units.',
    },
    {
      title: 'Walkability',
      description: 'Proximity to transit, shops, schools. Lifestyle factors affect resale appeal.',
    },
  ];

  const documentRedFlags = [
    'Underfunded reserves (below 20%)',
    'Pending special assessments',
    'Unresolved litigation',
    'Frequent rule violations',
    'Debt exceeding annual budget',
    'Increasing HOA fees year-over-year',
    'High delinquency rates among owners',
    'Insurance non-renewals',
  ];

  const insuranceTypes = [
    {
      title: 'HO-6 (Condo Insurance)',
      description: 'Covers your unit interior, personal belongings, and liability. Master policy covers building structure.',
    },
    {
      title: 'Master Policy Gap',
      description: 'Building policy may not cover upgrades you made. Your HO-6 covers the gaps.',
    },
    {
      title: 'Loss Assessment Coverage',
      description: 'Covers your portion if HOA is hit with a special assessment claim.',
    },
  ];

  const faqItems = [
    {
      question: 'What\u2019s the difference between a warrantable and non-warrantable condo?',
      answer:
        'Warrantable condos meet Fannie Mae/Freddie Mac standards and work with conventional financing. Non-warrantable condos don\u2019t meet these standards, limiting financing options but often offering better prices. They\u2019re not "bad" — just require FHA or portfolio loans.',
    },
    {
      question: 'Can I rent out my condo?',
      answer:
        'Many condos restrict rentals. Check the bylaws before buying. Some require owner occupancy for a period, allow only a certain percentage of units rented, or have restrictions on short-term rentals. This significantly impacts your investment strategy.',
    },
    {
      question: 'How do I assess HOA financial health?',
      answer:
        'Request: annual budgets (3 years), reserve study, meeting minutes (2 years), and litigation history. Look for reserve funding above 30%, stable or declining special assessments, low delinquency rates, and active board governance.',
    },
    {
      question: 'What happens if the HOA goes insolvent?',
      answer:
        'If an HOA can\u2019t pay for major repairs, they must assess all owners. In rare bankruptcies, you may be responsible for a portion of unpaid HOA expenses. This is why reserve funding is critical.',
    },
    {
      question: 'Are condos harder to sell?',
      answer:
        'Non-warrantable condos and those with high HOA fees or poor reserves take longer to sell. Condos in building-wide litigation sell slower. Work with a real estate agent familiar with condo approval issues.',
    },
    {
      question: 'What should I inspect before buying?',
      answer:
        'Get a professional inspection. Look for: structural damage, water intrusion, HVAC condition, appliance age, and recent capital improvements. Walk the building at different times. Verify parking, storage, and utilities.',
    },
    {
      question: 'How much will HOA fees increase?',
      answer:
        'Review 5 years of fee history. Average increases are 3\u20135% annually. If fees have jumped 10%+ year-over-year, reserves may be underfunded or large projects pending. Factor expected increases into your affordability calculation.',
    },
    {
      question: 'Do I need a condo specialist realtor?',
      answer:
        'Highly recommended. Condo specialists understand building approval, financing quirks, and market conditions. They\u2019ll help navigate HOA documentation and identify red flags you might miss.',
    },
  ];

  const affordinabilityCalc = useMemo(() => {
    const loanAmount = calculatorValues.homePrice - calculatorValues.downPayment;
    const monthlyRate = calculatorValues.interestRate / 100 / 12;
    const numPayments = 360;

    const monthlyPayment =
      (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments))) /
      (Math.pow(1 + monthlyRate, numPayments) - 1);

    const totalMonthly = monthlyPayment + calculatorValues.hoaFees;
    const monthlyIncome = (totalMonthly / 0.28) * 1; // 28% front-end ratio

    return {
      monthlyPayment: monthlyPayment.toFixed(0),
      hoaFees: calculatorValues.hoaFees,
      totalMonthly: totalMonthly.toFixed(0),
      requiredIncome: monthlyIncome.toFixed(0),
      annualIncome: (monthlyIncome * 12).toFixed(0),
    };
  }, [calculatorValues]);

  return (
    <div style={{ background: 'var(--le-bg)' }}>
      {/* Hero Section */}
      <section style={{ ...styles.section, ...styles.heroSection }}>
        <div style={styles.container}>
          <h1 style={styles.heroTitle}>Your Complete Condo Buying Guide</h1>
          <p style={styles.heroSubtitle}>
            Master HOA analysis, financing options, and document review. Everything you need to buy with confidence.
          </p>
          <button
            style={{
              ...styles.ctaButton,
              background: 'var(--le-accent)',
              color: 'white',
              padding: '14px 32px',
              fontSize: '16px',
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLButtonElement).style.transform = 'translateY(-2px)';
              (e.target as HTMLButtonElement).style.boxShadow = '0 12px 24px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLButtonElement).style.transform = 'translateY(0)';
              (e.target as HTMLButtonElement).style.boxShadow = 'none';
            }}
          >
            Get Free Expert Guidance
          </button>
        </div>
      </section>

      {/* Comparison Section */}
      <section style={styles.section}>
        <div style={styles.container}>
          <h2 style={styles.sectionTitle}>Condo vs Townhome vs Single Family</h2>
          <p style={styles.sectionDescription}>
            Each housing type has unique advantages and trade-offs. Understanding the differences helps you make the right choice.
          </p>

          <div style={styles.comparisonGrid}>
            {comparisonTypes.map((type) => (
              <div
                key={type.id}
                style={{
                  ...styles.comparisonCard,
                  ...(activeComparison === type.id ? styles.comparisonCardActive : {}),
                }}
                onClick={() => setActiveComparison(type.id)}
              >
                <h3 style={styles.comparisonCardTitle}>{type.name}</h3>
                <p style={styles.comparisonCardText}>{type.description}</p>
              </div>
            ))}
          </div>

          {activeComparison && (
            <div>
              <div style={styles.grid2Col}>
                <div>
                  <h4 style={{ ...styles.cardTitle, color: 'var(--le-accent)' }}>Advantages</h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {comparisonTypes
                      .find((t) => t.id === activeComparison)
                      ?.pros.map((pro, idx) => (
                        <li
                          key={idx}
                          style={{
                            display: 'flex',
                            gap: '12px',
                            marginBottom: '12px',
                            fontSize: '14px',
                            color: 'var(--le-text)',
                          }}
                        >
                          <span style={{ color: 'var(--le-accent)', fontWeight: 'bold' }}>✓</span>
                          {pro}
                        </li>
                      ))}
                  </ul>
                </div>
                <div>
                  <h4 style={{ ...styles.cardTitle, color: '#dc2626' }}>Considerations</h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {comparisonTypes
                      .find((t) => t.id === activeComparison)
                      ?.cons.map((con, idx) => (
                        <li
                          key={idx}
                          style={{
                            display: 'flex',
                            gap: '12px',
                            marginBottom: '12px',
                            fontSize: '14px',
                            color: 'var(--le-text)',
                          }}
                        >
                          <span style={{ color: '#dc2626', fontWeight: 'bold' }}>•</span>
                          {con}
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* HOA Deep Dive */}
      <section style={styles.section}>
        <div style={styles.container}>
          <h2 style={styles.sectionTitle}>HOA Deep Dive</h2>
          <p style={styles.sectionDescription}>
            Homeowners Association analysis is critical. Your monthly HOA fees can make or break affordability.
          </p>

          <div style={styles.featuresList}>
            {hoaFeatures.map((feature, idx) => (
              <div key={idx} style={styles.featureItem}>
                <div style={styles.featureIcon}>
                  <IconHome />
                </div>
                <div style={styles.featureContent}>
                  <h4 style={styles.featureTitle}>{feature.title}</h4>
                  <p style={styles.featureDescription}>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '48px' }}>
            <h3 style={{ ...styles.sectionTitle, marginBottom: '24px' }}>Evaluating HOA Financial Health</h3>
            <div style={styles.alertBox}>
              <div style={styles.alertIcon}>
                <IconAlertCircle />
              </div>
              <div style={styles.alertText}>
                <strong>Red Flag:</strong> Request financial documents immediately. If an HOA refuses or the documents show red flags, walk away. Bad HOA financials can trap you for years.
              </div>
            </div>

            <div style={styles.grid2Col}>
              <div style={styles.card}>
                <h4 style={styles.cardTitle}>Reserve Study</h4>
                <p style={styles.cardText}>
                  Shows predicted costs for major repairs (roof, parking, structure). Reserve funding should be 30\u201350% of annual budget. Below 20% is concerning.
                </p>
              </div>
              <div style={styles.card}>
                <h4 style={styles.cardTitle}>Annual Budget Trends</h4>
                <p style={styles.cardText}>
                  Review 3\u20135 years of budgets. Watch for: increasing special assessments, utility cost spikes, unexpected capital projects, and percentage growth year-over-year.
                </p>
              </div>
              <div style={styles.card}>
                <h4 style={styles.cardTitle}>Meeting Minutes</h4>
                <p style={styles.cardText}>
                  Read the last 2 years. Look for: disputes among board members, frequent emergency meetings, ignored maintenance issues, or conflicts with individual owners.
                </p>
              </div>
              <div style={styles.card}>
                <h4 style={styles.cardTitle}>Litigation History</h4>
                <p style={styles.cardText}>
                  Any lawsuits involving the building? Lawsuits with contractors or vendors? Active litigation can lead to assessments and slow sales.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Condo Financing */}
      <section style={styles.section}>
        <div style={styles.container}>
          <h2 style={styles.sectionTitle}>Condo Financing Options</h2>
          <p style={styles.sectionDescription}>
            Condo financing is trickier than single-family homes. Know your options and the requirements lenders impose.
          </p>

          <div style={styles.grid2Col}>
            {financingOptions.map((option, idx) => (
              <div key={idx} style={styles.card}>
                <div style={{ ...styles.featureIcon, marginBottom: '12px' }}>{option.icon}</div>
                <h4 style={styles.cardTitle}>{option.title}</h4>
                <p style={styles.cardText}>{option.description}</p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '48px', background: 'var(--le-surface)', borderRadius: '12px', padding: '32px' }}>
            <h3 style={{ ...styles.cardTitle, marginBottom: '24px' }}>Warrantable vs Non-Warrantable</h3>
            <table style={styles.featureTable}>
              <thead>
                <tr>
                  <th style={styles.tableHeader}>Criterion</th>
                  <th style={styles.tableHeader}>Warrantable</th>
                  <th style={styles.tableHeader}>Non-Warrantable</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={styles.tableCell}>
                    <span style={styles.textBold}>Owner Occupancy</span>
                  </td>
                  <td style={styles.tableCell}>50%+ owner-occupied</td>
                  <td style={styles.tableCell}>Less than 50% owner-occupied</td>
                </tr>
                <tr>
                  <td style={styles.tableCell}>
                    <span style={styles.textBold}>Commercial Space</span>
                  </td>
                  <td style={styles.tableCell}>Less than 25%</td>
                  <td style={styles.tableCell}>25%+ commercial</td>
                </tr>
                <tr>
                  <td style={styles.tableCell}>
                    <span style={styles.textBold}>Financing</span>
                  </td>
                  <td style={styles.tableCell}>Conventional, FHA, VA, USDA</td>
                  <td style={styles.tableCell}>FHA, portfolio loans only</td>
                </tr>
                <tr>
                  <td style={styles.tableCell}>
                    <span style={styles.textBold}>Typical Price</span>
                  </td>
                  <td style={styles.tableCell}>Higher (more demand)</td>
                  <td style={styles.tableCell}>Discounted (limited buyers)</td>
                </tr>
                <tr>
                  <td style={styles.tableCell}>
                    <span style={styles.textBold}>Investor Friendly</span>
                  </td>
                  <td style={styles.tableCell}>Yes, easier financing</td>
                  <td style={styles.tableCell}>No, resale difficult</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* What to Look For */}
      <section style={styles.section}>
        <div style={styles.container}>
          <h2 style={styles.sectionTitle}>What to Look For When Inspecting</h2>
          <p style={styles.sectionDescription}>
            A thorough inspection prevents expensive surprises after closing. Know what red flags to watch for.
          </p>

          <div style={styles.grid2Col}>
            {whatToLookFor.map((item, idx) => (
              <div key={idx} style={styles.card}>
                <h4 style={styles.cardTitle}>{item.title}</h4>
                <p style={styles.cardText}>{item.description}</p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '48px', background: 'rgba(59, 130, 246, 0.05)', border: '1px solid rgba(59, 130, 246, 0.2)', borderRadius: '12px', padding: '24px' }}>
            <h4 style={{ ...styles.featureTitle, color: 'var(--le-accent)' }}>Pro Tip: Building-Wide Issues</h4>
            <p style={styles.featureDescription}>
              Ask about recent issues affecting the building: water intrusion, structural problems, foundation issues, or failed roof repairs. One unit\u2019s problem can signal building-wide expenses.
            </p>
          </div>
        </div>
      </section>

      {/* Investment Potential */}
      <section style={styles.section}>
        <div style={styles.container}>
          <h2 style={styles.sectionTitle}>Investment Potential & Appreciation</h2>
          <p style={styles.sectionDescription}>
            Condos can be solid investments if you understand the factors that impact appreciation and resale.
          </p>

          <div style={styles.featuresList}>
            <div style={styles.featureItem}>
              <div style={styles.featureIcon}>
                <IconTrendingUp />
              </div>
              <div style={styles.featureContent}>
                <h4 style={styles.featureTitle}>Rental Income Potential</h4>
                <p style={styles.featureDescription}>
                  Check HOA rules on rentals. Warrantable condos with no rental restrictions appreciate faster and attract more investors.
                </p>
              </div>
            </div>

            <div style={styles.featureItem}>
              <div style={styles.featureIcon}>
                <IconHome />
              </div>
              <div style={styles.featureContent}>
                <h4 style={styles.featureTitle}>Location & Walkability</h4>
                <p style={styles.featureDescription}>
                  Urban condos near transit and amenities appreciate 2\u20133% annually. Suburban condos may lag. Walkability drives condo demand.
                </p>
              </div>
            </div>

            <div style={styles.featureItem}>
              <div style={styles.featureIcon}>
                <IconDollarSign />
              </div>
              <div style={styles.featureContent}>
                <h4 style={styles.featureTitle}>HOA Fee Stability</h4>
                <p style={styles.featureDescription}>
                  Rising HOA fees (above 4\u20135% annually) reduce buyer appeal and slow appreciation. Seek buildings with stable, well-funded budgets.
                </p>
              </div>
            </div>

            <div style={styles.featureItem}>
              <div style={styles.featureIcon}>
                <IconCheck />
              </div>
              <div style={styles.featureContent}>
                <h4 style={styles.featureTitle}>Financial Health</h4>
                <p style={styles.featureDescription}>
                  Buildings with strong reserves, low special assessment history, and active boards are more resilient and hold value better.
                </p>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '48px' }}>
            <h3 style={{ ...styles.sectionTitle, marginBottom: '24px' }}>Resale Challenges to Know</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {[
                'Non-warrantable condos may require all-cash offers or portfolio loans',
                'High HOA fees limit buyer pool compared to single-family homes',
                'Pending special assessments deter buyers and require disclosure',
                'Rental restrictions reduce investor interest and comparable sales',
                'Building litigation or reserves below 20% significantly impact marketability',
                'Condo board approval process can delay sales 30\u201360 days',
              ].map((item, idx) => (
                <li
                  key={idx}
                  style={{
                    display: 'flex',
                    gap: '12px',
                    marginBottom: '16px',
                    fontSize: '14px',
                    color: 'var(--le-text)',
                  }}
                >
                  <span style={{ color: '#dc2626' }}>→</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Document Review */}
      <section style={styles.section}>
        <div style={styles.container}>
          <h2 style={styles.sectionTitle}>Condo Document Review Checklist</h2>
          <p style={styles.sectionDescription}>
            Before making an offer, request and review critical documents. These reveal the true financial and legal picture.
          </p>

          <div style={styles.grid2Col}>
            <div style={styles.card}>
              <h4 style={styles.cardTitle}>Documents to Request</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {[
                  'Resale disclosure packet',
                  'Annual HOA budgets (3 years)',
                  'Reserve study (if available)',
                  'Meeting minutes (2 years)',
                  'HOA rules & bylaws',
                  'Building insurance policy summary',
                  'Litigation history/letters',
                  'Special assessment records',
                ].map((doc, idx) => (
                  <li key={idx} style={{ fontSize: '14px', marginBottom: '12px', color: 'var(--le-text)' }}>
                    ✓ {doc}
                  </li>
                ))}
              </ul>
            </div>

            <div style={styles.card}>
              <h4 style={styles.cardTitle}>Red Flags in Documents</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {documentRedFlags.map((flag, idx) => (
                  <li key={idx} style={{ fontSize: '14px', marginBottom: '12px', color: 'var(--le-text)' }}>
                    ⚠ {flag}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Insurance Guide */}
      <section style={styles.section}>
        <div style={styles.container}>
          <h2 style={styles.sectionTitle}>Condo Insurance Guide</h2>
          <p style={styles.sectionDescription}>
            Condo insurance (HO-6) is different from homeowners insurance. Understand what\u2019s covered and what isn\u2019t.
          </p>

          <div style={styles.grid2Col}>
            {insuranceTypes.map((type, idx) => (
              <div key={idx} style={styles.card}>
                <h4 style={styles.cardTitle}>{type.title}</h4>
                <p style={styles.cardText}>{type.description}</p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '48px', background: 'var(--le-surface)', borderRadius: '12px', padding: '32px' }}>
            <h3 style={{ ...styles.cardTitle, marginBottom: '24px' }}>What Your HO-6 Should Include</h3>
            <div style={styles.grid2Col}>
              <div>
                <h4 style={{ ...styles.featureTitle, color: 'var(--le-accent)' }}>Coverage</h4>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {['Personal property', 'Unit interior walls/fixtures', 'Personal liability', 'Medical payments', 'Loss assessment'].map((item, idx) => (
                    <li key={idx} style={{ fontSize: '14px', marginBottom: '8px', color: 'var(--le-text)' }}>
                      ✓ {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 style={{ ...styles.featureTitle, color: '#dc2626' }}>Not Covered</h4>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {['Building structure', 'Roof/common areas', 'Water damage from building', 'Upgrades beyond unit', 'Shared walls'].map((item, idx) => (
                    <li key={idx} style={{ fontSize: '14px', marginBottom: '8px', color: 'var(--le-text)' }}>
                      ✗ {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Affordability Calculator */}
      <section style={styles.section}>
        <div style={styles.container}>
          <h2 style={styles.sectionTitle}>Condo Affordability Calculator</h2>
          <p style={styles.sectionDescription}>
            See how HOA fees impact your buying power. These aren\u2019t optional—they\u2019re part of your monthly housing costs.
          </p>

          <div style={styles.calculator}>
            <div style={styles.calculatorRow}>
              <div>
                <label style={{ fontSize: '14px', fontWeight: '600', color: 'var(--le-text)', display: 'block', marginBottom: '8px' }}>
                  Home Price
                </label>
                <input
                  type="number"
                  style={styles.calculatorInput}
                  value={calculatorValues.homePrice}
                  onChange={(e) => setCalculatorValues({ ...calculatorValues, homePrice: Number(e.target.value) })}
                />
              </div>
              <div>
                <label style={{ fontSize: '14px', fontWeight: '600', color: 'var(--le-text)', display: 'block', marginBottom: '8px' }}>
                  Down Payment
                </label>
                <input
                  type="number"
                  style={styles.calculatorInput}
                  value={calculatorValues.downPayment}
                  onChange={(e) => setCalculatorValues({ ...calculatorValues, downPayment: Number(e.target.value) })}
                />
              </div>
            </div>

            <div style={styles.calculatorRow}>
              <div>
                <label style={{ fontSize: '14px', fontWeight: '600', color: 'var(--le-text)', display: 'block', marginBottom: '8px' }}>
                  Monthly HOA Fees
                </label>
                <input
                  type="number"
                  style={styles.calculatorInput}
                  value={calculatorValues.hoaFees}
                  onChange={(e) => setCalculatorValues({ ...calculatorValues, hoaFees: Number(e.target.value) })}
                />
              </div>
              <div>
                <label style={{ fontSize: '14px', fontWeight: '600', color: 'var(--le-text)', display: 'block', marginBottom: '8px' }}>
                  Interest Rate (%)
                </label>
                <input
                  type="number"
                  step="0.1"
                  style={styles.calculatorInput}
                  value={calculatorValues.interestRate}
                  onChange={(e) => setCalculatorValues({ ...calculatorValues, interestRate: Number(e.target.value) })}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
              <div style={styles.calculatorResult}>
                <div style={styles.calculatorResultLabel}>Monthly Mortgage Payment</div>
                <div style={styles.calculatorResultValue}>${affordinabilityCalc.monthlyPayment}</div>
              </div>
              <div style={styles.calculatorResult}>
                <div style={styles.calculatorResultLabel}>Total Monthly Housing Cost</div>
                <div style={styles.calculatorResultValue}>${affordinabilityCalc.totalMonthly}</div>
              </div>
              <div style={styles.calculatorResult}>
                <div style={styles.calculatorResultLabel}>Required Annual Income</div>
                <div style={styles.calculatorResultValue}>${affordinabilityCalc.annualIncome}</div>
              </div>
            </div>

            <div style={{ marginTop: '24px', padding: '16px', background: 'var(--le-surface)', borderRadius: '8px' }}>
              <p style={{ fontSize: '14px', color: 'var(--le-text-secondary)', margin: 0 }}>
                <strong style={{ color: 'var(--le-text)' }}>Note:</strong> This assumes a 28% debt-to-income ratio for housing costs. Lenders also consider overall debt (auto loans, student loans, credit cards).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section style={styles.section}>
        <div style={styles.container}>
          <h2 style={styles.sectionTitle}>Frequently Asked Questions</h2>
          <p style={styles.sectionDescription}>
            Still have questions? Here are answers to the most common condo buying concerns.
          </p>

          <div style={styles.accordion}>
            {faqItems.map((item, idx) => (
              <div key={idx} style={styles.accordionItem}>
                <button
                  style={{
                    ...styles.accordionHeader,
                    ...(expandedFaqIndex === idx ? styles.accordionHeaderActive : {}),
                  }}
                  onClick={() => setExpandedFaqIndex(expandedFaqIndex === idx ? null : idx)}
                >
                  <span>{item.question}</span>
                  <div
                    style={{
                      display: 'flex',
                      color: 'currentColor',
                      transform: expandedFaqIndex === idx ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s ease',
                    }}
                  >
                    <IconChevronDown />
                  </div>
                </button>
                {expandedFaqIndex === idx && <div style={styles.accordionContent}>{item.answer}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ ...styles.section, paddingTop: '64px', borderBottom: 'none' }}>
        <div style={styles.container}>
          <div style={styles.ctaSection}>
            <h2 style={styles.ctaTitle}>Ready to Buy with Confidence?</h2>
            <p style={styles.ctaDescription}>
              Connect with our condo financing specialists. We\u2019ll review documents, analyze HOA health, and help you understand your true affordability.
            </p>
            <button
              style={{
                ...styles.ctaButton,
                ...(ctaHover ? styles.ctaButtonHover : {}),
              }}
              onMouseEnter={() => setCtaHover(true)}
              onMouseLeave={() => setCtaHover(false)}
            >
              Get Free Condo Consultation
            </button>
          </div>

          <div style={{ marginTop: '64px', textAlign: 'center' as const }}>
            <h3 style={{ ...styles.sectionTitle, marginBottom: '32px' }}>Other Ways We Help</h3>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '32px',
              }}
            >
              {[
                {
                  icon: <IconFileText />,
                  title: 'Document Analysis',
                  desc: 'We review HOA docs and flag red flags you might miss.',
                },
                {
                  icon: <IconDollarSign />,
                  title: 'Financing Support',
                  desc: 'Help with non-warrantable condos and portfolio loans.',
                },
                {
                  icon: <IconPhone />,
                  title: 'Expert Guidance',
                  desc: 'Direct access to real estate and mortgage specialists.',
                },
              ].map((item, idx) => (
                <div key={idx} style={{ textAlign: 'center' as const }}>
                  <div style={{ ...styles.featureIcon, margin: '0 auto 16px', width: '40px', height: '40px' }}>
                    {item.icon}
                  </div>
                  <h4 style={{ ...styles.featureTitle, marginBottom: '8px' }}>{item.title}</h4>
                  <p style={styles.featureDescription}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
