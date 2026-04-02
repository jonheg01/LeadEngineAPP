'use client';

import React, { useState } from 'react';

export default function HomeInsurancePage() {
  const [expandedCoverage, setExpandedCoverage] = useState<string | null>(null);
  const [homeValue, setHomeValue] = useState('300000');
  const [locationType, setLocationType] = useState('suburban');
  const [deductible, setDeductible] = useState('1000');
  const [estimatedPremium, setEstimatedPremium] = useState<number | null>(null);
  const [expandedClaim, setExpandedClaim] = useState<string | null>(null);
  const [expandedDiscount, setExpandedDiscount] = useState<string | null>(null);
  const [expandedGlossary, setExpandedGlossary] = useState<string | null>(null);
  const [expandedStep, setExpandedStep] = useState<string | null>(null);
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);
  const [leadEmail, setLeadEmail] = useState('');
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  const calculatePremium = () => {
    const baseRate = 0.005;
    const locationMultiplier = locationType === 'urban' ? 1.3 : locationType === 'rural' ? 0.8 : 1.0;
    const deductibleDiscount = (1000 - parseInt(deductible)) / 100;
    const calculatedPremium = Math.max(
      parseInt(homeValue) * baseRate * locationMultiplier - deductibleDiscount,
      500
    );
    setEstimatedPremium(Math.round(calculatedPremium));
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (leadEmail.trim()) {
      setLeadSubmitted(true);
      setLeadEmail('');
      setTimeout(() => setLeadSubmitted(false), 4000);
    }
  };

  const ShieldIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );

  const ChevronIcon = ({ isExpanded }: { isExpanded: boolean }) => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      style={{
        transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
        transition: 'transform 0.3s ease',
      }}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );

  const CheckIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );

  const AlertIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3.05h16.94a2 2 0 0 0 1.71-3.05L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );

  const coverageTypes = [
    {
      id: 'dwelling',
      title: 'Dwelling Coverage',
      shortDesc: 'Your home\u2019s structure protection',
      fullDesc:
        'Covers the physical structure of your home including walls, roof, built-in appliances, flooring, and attached structures like garages. This is the backbone of your homeowners insurance and typically covers repairs or rebuilding due to covered perils like fire, theft, and weather damage.',
      importance: 'Essential',
    },
    {
      id: 'personal-property',
      title: 'Personal Property Coverage',
      shortDesc: 'Your belongings and valuables',
      fullDesc:
        'Protects your personal belongings inside and sometimes outside your home, including furniture, clothing, electronics, and other items. Coverage typically extends 10-20% of your dwelling coverage. Some items like jewelry or art may require additional coverage.',
      importance: 'Essential',
    },
    {
      id: 'liability',
      title: 'Liability Coverage',
      shortDesc: 'Legal and medical protection',
      fullDesc:
        'Covers legal expenses and medical bills if someone is injured on your property and sues you. This includes both bodily injury and property damage liability. Standard policies offer $100,000-$500,000 in coverage, with options to increase.',
      importance: 'Essential',
    },
    {
      id: 'ale',
      title: 'Additional Living Expenses (ALE)',
      shortDesc: 'Coverage if you can\u2019t stay home',
      fullDesc:
        'Pays for temporary housing, meals, and other living expenses if your home becomes uninhabitable due to a covered loss. This typically covers costs up to 20-30% of your dwelling coverage and lasts until repairs are complete.',
      importance: 'Important',
    },
    {
      id: 'medical-payments',
      title: 'Medical Payments to Others',
      shortDesc: 'Guest injury coverage',
      fullDesc:
        'Covers medical expenses for guests injured on your property, regardless of fault. This typically includes hospital bills, dental work, and necessary funeral services. Coverage limits are usually $1,000-$5,000 per person.',
      importance: 'Helpful',
    },
  ];

  const coverageTiers = [
    {
      name: 'Basic',
      price: '$800-1,200',
      features: [
        'Dwelling: 80% replacement cost',
        'Personal Property: $40,000',
        'Liability: $100,000',
        'ALE: $10,000',
        'Medical Payments: $1,000',
      ],
      bestFor: 'Budget-conscious homeowners',
    },
    {
      name: 'Standard',
      price: '$1,200-1,800',
      features: [
        'Dwelling: 100% replacement cost',
        'Personal Property: $80,000',
        'Liability: $300,000',
        'ALE: $30,000',
        'Medical Payments: $5,000',
      ],
      bestFor: 'Most homeowners',
      highlighted: true,
    },
    {
      name: 'Premium',
      price: '$1,800-2,800',
      features: [
        'Dwelling: 125% replacement cost',
        'Personal Property: $150,000+',
        'Liability: $500,000+',
        'ALE: $60,000',
        'Medical Payments: $5,000+',
      ],
      bestFor: 'High-value homes & luxury properties',
    },
  ];

  const rateFactors = [
    {
      factor: 'Location & Zip Code',
      impact: 'Very High',
      desc: 'Urban areas with theft risk cost more. Disaster-prone areas (hurricanes, earthquakes) significantly increase premiums.',
    },
    {
      factor: 'Home Age & Condition',
      impact: 'Very High',
      desc: 'Older homes, especially with outdated electrical or plumbing, cost more. Newer homes get better rates.',
    },
    {
      factor: 'Home Value & Rebuild Cost',
      impact: 'Very High',
      desc: 'Higher-valued homes cost more to insure. Square footage and construction materials matter.',
    },
    {
      factor: 'Claims History',
      impact: 'Very High',
      desc: 'Multiple claims dramatically increase rates. A claims-free history earns significant discounts.',
    },
    {
      factor: 'Credit Score',
      impact: 'High',
      desc: 'Insurance companies use credit as a risk indicator. Higher scores typically get better rates.',
    },
    {
      factor: 'Deductible Amount',
      impact: 'High',
      desc: 'Choosing higher deductibles ($2,500+) lowers your annual premium significantly.',
    },
    {
      factor: 'Security & Safety Features',
      impact: 'High',
      desc: 'Burglar alarms, deadbolts, fire extinguishers, and sprinkler systems can reduce rates 5-25%.',
    },
    {
      factor: 'Occupancy & Vacancy Status',
      impact: 'Medium',
      desc: 'Vacant homes or investment properties cost more. Primary residences get better rates.',
    },
    {
      factor: 'Distance to Fire Station',
      impact: 'Medium',
      desc: 'Homes within 3 miles of a fire station typically receive discounts.',
    },
    {
      factor: 'Roof & HVAC Age',
      impact: 'Medium',
      desc: 'Newer roofs and heating/cooling systems reduce premiums. Old roofs may increase rates significantly.',
    },
    {
      factor: 'Bundling with Auto Insurance',
      impact: 'Medium',
      desc: 'Combining policies with the same insurer typically saves 10-25%.',
    },
    {
      factor: 'Tobacco Use in Household',
      impact: 'Low-Medium',
      desc: 'Households with smokers typically pay slightly higher rates.',
    },
  ];

  const commonClaims = [
    {
      id: 'fire',
      title: 'House Fires',
      percentage: '24%',
      prevention: [
        'Install working smoke detectors on every level',
        'Keep flammable materials away from heaters and appliances',
        'Don\u2019t leave cooking unattended',
        'Inspect electrical cords for damage',
        'Keep chimneys clean and inspected annually',
      ],
    },
    {
      id: 'water',
      title: 'Water Damage',
      percentage: '27%',
      prevention: [
        'Regularly inspect pipes and connections',
        'Install water detection devices near appliances',
        'Maintain gutters and downspouts',
        'Keep AC unit drain line clear',
        'Shut off main water valve when away for extended periods',
      ],
    },
    {
      id: 'theft',
      title: 'Theft & Break-ins',
      percentage: '14%',
      prevention: [
        'Install deadbolts on exterior doors',
        'Use motion-sensor lights outside',
        'Install security system or cameras',
        'Don\u2019t advertise valuables on social media',
        'Keep doors and windows locked',
      ],
    },
    {
      id: 'liability',
      title: 'Liability Claims',
      percentage: '18%',
      prevention: [
        'Maintain safe walkways and stairs',
        'Keep property free of hazards',
        'Trim tree branches over sidewalks',
        'Maintain a safe pool (if applicable)',
        'Inform guests of known hazards',
      ],
    },
    {
      id: 'weather',
      title: 'Weather & Storm Damage',
      percentage: '17%',
      prevention: [
        'Trim trees regularly to reduce wind damage',
        'Secure outdoor items before storms',
        'Inspect roof after severe weather',
        'Consider impact-resistant windows in high-wind areas',
        'Document your home\u2019s condition with photos',
      ],
    },
  ];

  const discounts = [
    {
      id: 'bundling',
      title: 'Policy Bundling',
      desc: 'Combine homeowners with auto insurance for 10-25% savings.',
    },
    {
      id: 'security',
      title: 'Security Systems',
      desc: 'Burglar alarms and monitoring systems earn 5-15% discounts.',
    },
    {
      id: 'new-home',
      title: 'New Home Discount',
      desc: 'Newly constructed homes get 5-10% discounts.',
    },
    {
      id: 'claims-free',
      title: 'Claims-Free Discount',
      desc: '3+ years without claims: 5-10% off. Track your history.',
    },
    {
      id: 'loyalty',
      title: 'Loyalty Discount',
      desc: 'Long-term customers get 5-15% off premiums.',
    },
    {
      id: 'occupancy',
      title: 'Occupancy Discount',
      desc: 'Primary residence vs. investment property rates differ.',
    },
    {
      id: 'auto-pay',
      title: 'Automatic Payment Discount',
      desc: 'Set up auto-pay for 1-5% savings.',
    },
    {
      id: 'paperless',
      title: 'Paperless Discount',
      desc: 'Receive bills and documents digitally for 1-3% off.',
    },
    {
      id: 'affinity',
      title: 'Affinity Discounts',
      desc: 'Alumni, military, or professional group member discounts.',
    },
    {
      id: 'fire-resistant',
      title: 'Fire-Resistant Materials',
      desc: 'Homes with fire-resistant roofing get 10-25% discounts.',
    },
  ];

  const claimSteps = [
    {
      id: 'step1',
      number: '1',
      title: 'Ensure Safety First',
      desc: 'If there\u2019s immediate danger, call 911. Evacuate if necessary and move to a safe location.',
    },
    {
      id: 'step2',
      number: '2',
      title: 'Document the Damage',
      desc: 'Take photos and videos of all damage from multiple angles. Don\u2019t move or throw away damaged items.',
    },
    {
      id: 'step3',
      number: '3',
      title: 'Prevent Further Damage',
      desc: 'Make reasonable efforts to prevent additional damage (e.g., shut off water, cover broken windows).',
    },
    {
      id: 'step4',
      number: '4',
      title: 'Contact Your Insurance Company',
      desc: 'Call the claims number on your policy within 24-48 hours. Provide basic information about the incident.',
    },
    {
      id: 'step5',
      number: '5',
      title: 'File an Official Claim',
      desc: 'Complete the official claim form with detailed information about the damage and any injuries.',
    },
    {
      id: 'step6',
      number: '6',
      title: 'Schedule the Adjuster Visit',
      desc: 'The adjuster will inspect the damage, assess the claim value, and answer your questions.',
    },
    {
      id: 'step7',
      number: '7',
      title: 'Submit Supporting Documents',
      desc: 'Provide receipts, invoices, repair estimates, proof of ownership, and any other relevant documentation.',
    },
    {
      id: 'step8',
      number: '8',
      title: 'Review the Settlement Offer',
      desc: 'The adjuster will determine the payout amount based on your policy and the assessment.',
    },
    {
      id: 'step9',
      number: '9',
      title: 'Appeal If Necessary',
      desc: 'If you disagree with the settlement, you can appeal or request a second opinion (appraisal).',
    },
    {
      id: 'step10',
      number: '10',
      title: 'Receive Your Payout',
      desc: 'Once approved, your claim payment is typically issued within 30 days.',
    },
  ];

  const glossaryTerms = [
    {
      id: 'deductible',
      term: 'Deductible',
      definition:
        'The amount you must pay out-of-pocket before insurance coverage kicks in. Higher deductibles lower your premium.',
    },
    {
      id: 'premium',
      term: 'Premium',
      definition: 'Your annual or monthly insurance payment to maintain coverage.',
    },
    {
      id: 'coverage-limit',
      term: 'Coverage Limit',
      definition: 'The maximum amount your insurance will pay for a particular type of claim.',
    },
    {
      id: 'peril',
      term: 'Peril',
      definition: 'A specific event or cause of loss covered by your policy (e.g., fire, theft, windstorm).',
    },
    {
      id: 'replacement-cost',
      term: 'Replacement Cost',
      definition: 'What it would cost to replace damaged items at current market prices.',
    },
    {
      id: 'actual-cash-value',
      term: 'Actual Cash Value (ACV)',
      definition: 'Replacement cost minus depreciation. Items are valued at their current worth, not original cost.',
    },
    {
      id: 'endorsement',
      term: 'Endorsement',
      definition: 'An addition to your policy that modifies coverage or adds protection for specific items.',
    },
    {
      id: 'rider',
      term: 'Rider',
      definition: 'Same as endorsement. An add-on to your policy for extra coverage on jewelry, art, or other valuables.',
    },
    {
      id: 'adjuster',
      term: 'Claims Adjuster',
      definition: 'The person who investigates and assesses the value of your insurance claim.',
    },
    {
      id: 'underwriting',
      term: 'Underwriting',
      definition: 'The process insurers use to evaluate risk and determine your rates.',
    },
    {
      id: 'exclusion',
      term: 'Exclusion',
      definition: 'Something not covered by your insurance policy.',
    },
    {
      id: 'subrogation',
      term: 'Subrogation',
      definition: 'When insurance companies recover costs by taking legal action against a responsible third party.',
    },
    {
      id: 'named-peril',
      term: 'Named Peril Policy',
      definition: 'Insurance that covers only specifically listed perils (more limited than all-risk).',
    },
    {
      id: 'all-risk',
      term: 'All-Risk Policy',
      definition: 'Insurance that covers all perils except those specifically excluded.',
    },
    {
      id: 'nfip',
      term: 'National Flood Insurance Program (NFIP)',
      definition:
        'Federal insurance program providing flood coverage, typically required if your home is in a flood zone.',
    },
  ];

  const faqs = [
    {
      id: 'faq1',
      question: 'How much homeowners insurance do I need?',
      answer:
        'You need enough to cover the cost of rebuilding your home (dwelling coverage) and replacing your belongings (personal property coverage). Your mortgage lender will require at least dwelling coverage. Many experts recommend 100-125% of your home\u2019s rebuild cost to account for inflation.',
    },
    {
      id: 'faq2',
      question: 'Does homeowners insurance cover earthquakes and floods?',
      answer:
        'Standard homeowners insurance does not cover earthquake or flood damage. These require separate policies. Flood insurance is available through the National Flood Insurance Program (NFIP) or private insurers. Earthquake insurance must be added as an endorsement.',
    },
    {
      id: 'faq3',
      question: 'What\u2019s the difference between replacement cost and actual cash value?',
      answer:
        'Replacement cost covers the full cost to replace items at current prices. Actual cash value pays replacement cost minus depreciation. For example, a 5-year-old $1,000 TV might be worth $600 in ACV but $1,000 in replacement cost.',
    },
    {
      id: 'faq4',
      question: 'Can my insurance be cancelled?',
      answer:
        'Yes. Insurers can cancel for non-payment, material misrepresentation, or in some states, excessive claims. They must provide notice and specific reasons. You have the right to appeal or seek coverage with another company.',
    },
    {
      id: 'faq5',
      question: 'How often should I review my homeowners insurance?',
      answer:
        'Review your policy annually or when major life events occur: home renovations, significant purchases, policy changes, or rate increases. Getting quotes from other insurers every 2-3 years helps you stay competitive.',
    },
    {
      id: 'faq6',
      question: 'What if I disagree with my claim settlement?',
      answer:
        'You can request a second inspection, file a formal complaint with your state\u2019s insurance commissioner, or use appraisal clauses that allow independent evaluation. An insurance attorney can also review your case.',
    },
  ];

  return (
    <div style={{ backgroundColor: 'var(--le-bg)', color: 'var(--le-text)', fontFamily: 'system-ui, -apple-system, sans-serif', lineHeight: '1.6' }}>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
              },
            })),
          }),
        }}
      />

      {/* Hero Section */}
      <section
        style={{
          background: `linear-gradient(135deg, var(--le-primary) 0%, var(--le-primary-hover) 100%)`,
          color: 'white',
          padding: '80px 20px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', opacity: 0.1, top: '-50px', right: '-50px' }}>
          <ShieldIcon />
        </div>
        <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '20px', maxWidth: '800px', margin: '0 auto 20px' }}>
          Understanding Home Insurance
        </h1>
        <p style={{ fontSize: '20px', opacity: 0.95, maxWidth: '600px', margin: '0 auto 30px' }}>
          Comprehensive guide to protecting your home and peace of mind
        </p>
        <button
          onClick={() => {
            const element = document.getElementById('lead-capture');
            element?.scrollIntoView({ behavior: 'smooth' });
          }}
          style={{
            backgroundColor: 'white',
            color: 'var(--le-primary)',
            border: 'none',
            padding: '14px 32px',
            fontSize: '16px',
            fontWeight: 'bold',
            borderRadius: '6px',
            cursor: 'pointer',
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}
          onMouseEnter={(e) => {
            (e.target as HTMLElement).style.transform = 'translateY(-2px)';
            (e.target as HTMLElement).style.boxShadow = '0 8px 16px rgba(0,0,0,0.2)';
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLElement).style.transform = 'translateY(0)';
            (e.target as HTMLElement).style.boxShadow = 'none';
          }}
        >
          Get Connected with Insurance Providers
        </button>
      </section>

      {/* Coverage Types Section */}
      <section style={{ padding: '60px 20px', maxWidth: '1000px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '40px', textAlign: 'center' }}>
          Coverage Types Explained
        </h2>
        <div style={{ display: 'grid', gap: '20px' }}>
          {coverageTypes.map((coverage) => (
            <div
              key={coverage.id}
              style={{
                backgroundColor: 'var(--le-bg-card)',
                border: `1px solid var(--le-border)`,
                borderRadius: '8px',
                overflow: 'hidden',
                transition: 'box-shadow 0.3s',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
              }}
            >
              <button
                onClick={() => setExpandedCoverage(expandedCoverage === coverage.id ? null : coverage.id)}
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '20px',
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontSize: '16px',
                }}
              >
                <div>
                  <h3 style={{ margin: '0 0 5px 0', fontSize: '18px', fontWeight: 'bold', color: 'var(--le-primary)' }}>
                    {coverage.title}
                  </h3>
                  <p style={{ margin: 0, color: 'var(--le-text-secondary)', fontSize: '14px' }}>
                    {coverage.shortDesc}
                  </p>
                </div>
                <div style={{ color: 'var(--le-primary)', flexShrink: 0, marginLeft: '20px' }}>
                  <ChevronIcon isExpanded={expandedCoverage === coverage.id} />
                </div>
              </button>
              {expandedCoverage === coverage.id && (
                <div style={{ padding: '0 20px 20px 20px', borderTop: `1px solid var(--le-border)`, paddingTop: '20px' }}>
                  <p style={{ margin: '0 0 15px 0', lineHeight: '1.8', color: 'var(--le-text)' }}>
                    {coverage.fullDesc}
                  </p>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '10px 15px',
                      backgroundColor: 'var(--le-bg)',
                      borderRadius: '6px',
                      fontSize: '14px',
                    }}
                  >
                    <span style={{ color: 'var(--le-accent)', fontWeight: 'bold' }}>Importance:</span>
                    <span>{coverage.importance}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Insurance Cost Calculator */}
      <section style={{ padding: '60px 20px', maxWidth: '900px', margin: '0 auto', backgroundColor: 'var(--le-bg-card)' }}>
        <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '40px', textAlign: 'center' }}>
          Insurance Cost Calculator
        </h2>
        <div
          style={{
            backgroundColor: 'var(--le-bg)',
            padding: '40px',
            borderRadius: '8px',
            border: `1px solid var(--le-border)`,
          }}
        >
          <div style={{ display: 'grid', gap: '30px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold', color: 'var(--le-text)' }}>
                Home Value: ${parseInt(homeValue).toLocaleString()}
              </label>
              <input
                type="range"
                min="100000"
                max="1000000"
                step="10000"
                value={homeValue}
                onChange={(e) => setHomeValue(e.target.value)}
                style={{ width: '100%', height: '6px', borderRadius: '3px', cursor: 'pointer' }}
              />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px', marginTop: '10px', fontSize: '12px', color: 'var(--le-text-secondary)' }}>
                <span>$100K</span>
                <span>$350K</span>
                <span>$500K</span>
                <span>$750K</span>
                <span>$1M</span>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>
                Location Type
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                {['urban', 'suburban', 'rural'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setLocationType(type)}
                    style={{
                      padding: '12px',
                      border: locationType === type ? `2px solid var(--le-primary)` : `1px solid var(--le-border)`,
                      backgroundColor: locationType === type ? 'var(--le-primary)' : 'var(--le-bg-card)',
                      color: locationType === type ? 'white' : 'var(--le-text)',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontWeight: 'bold',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      if (locationType !== type) {
                        (e.target as HTMLElement).style.backgroundColor = 'var(--le-bg)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (locationType !== type) {
                        (e.target as HTMLElement).style.backgroundColor = 'var(--le-bg-card)';
                      }
                    }}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>
                Deductible: ${deductible}
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
                {['500', '1000', '2500', '5000'].map((amount) => (
                  <button
                    key={amount}
                    onClick={() => setDeductible(amount)}
                    style={{
                      padding: '12px',
                      border: deductible === amount ? `2px solid var(--le-primary)` : `1px solid var(--le-border)`,
                      backgroundColor: deductible === amount ? 'var(--le-primary)' : 'var(--le-bg-card)',
                      color: deductible === amount ? 'white' : 'var(--le-text)',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontWeight: 'bold',
                    }}
                    onMouseEnter={(e) => {
                      if (deductible !== amount) {
                        (e.target as HTMLElement).style.backgroundColor = 'var(--le-bg)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (deductible !== amount) {
                        (e.target as HTMLElement).style.backgroundColor = 'var(--le-bg-card)';
                      }
                    }}
                  >
                    ${amount}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={calculatePremium}
              style={{
                backgroundColor: 'var(--le-primary)',
                color: 'white',
                border: 'none',
                padding: '16px',
                fontSize: '16px',
                fontWeight: 'bold',
                borderRadius: '6px',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.backgroundColor = 'var(--le-primary-hover)';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.backgroundColor = 'var(--le-primary)';
              }}
            >
              Calculate Estimated Premium
            </button>

            {estimatedPremium !== null && (
              <div
                style={{
                  backgroundColor: 'var(--le-bg)',
                  padding: '20px',
                  borderRadius: '6px',
                  border: `2px solid var(--le-accent)`,
                  textAlign: 'center',
                }}
              >
                <p style={{ margin: '0 0 10px 0', color: 'var(--le-text-secondary)' }}>
                  Estimated Annual Premium
                </p>
                <p style={{ margin: 0, fontSize: '32px', fontWeight: 'bold', color: 'var(--le-accent)' }}>
                  ${estimatedPremium.toLocaleString()}
                </p>
                <p style={{ margin: '10px 0 0 0', fontSize: '12px', color: 'var(--le-text-secondary)' }}>
                  (~${Math.round(estimatedPremium / 12)}/month)
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Coverage Comparison Table */}
      <section style={{ padding: '60px 20px', maxWidth: '1100px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '40px', textAlign: 'center' }}>
          Policy Comparison
        </h2>
        <div style={{ overflowX: 'auto' }}>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              backgroundColor: 'var(--le-bg-card)',
              borderRadius: '8px',
              overflow: 'hidden',
            }}
          >
            <thead>
              <tr style={{ backgroundColor: 'var(--le-primary)', color: 'white' }}>
                <th style={{ padding: '20px', textAlign: 'left', fontWeight: 'bold' }}>
                  Coverage Type
                </th>
                {coverageTiers.map((tier) => (
                  <th
                    key={tier.name}
                    style={{
                      padding: '20px',
                      textAlign: 'center',
                      fontWeight: 'bold',
                      backgroundColor: tier.highlighted ? 'var(--le-primary-hover)' : 'var(--le-primary)',
                    }}
                  >
                    {tier.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: `1px solid var(--le-border)` }}>
                <td style={{ padding: '16px', fontWeight: 'bold' }}>Annual Cost</td>
                {coverageTiers.map((tier) => (
                  <td
                    key={tier.name}
                    style={{
                      padding: '16px',
                      textAlign: 'center',
                      fontWeight: 'bold',
                      backgroundColor: tier.highlighted ? 'rgba(var(--le-primary-rgb), 0.05)' : 'transparent',
                      color: tier.highlighted ? 'var(--le-primary)' : 'var(--le-text)',
                    }}
                  >
                    {tier.price}
                  </td>
                ))}
              </tr>
              {coverageTiers[0].features.map((feature, idx) => (
                <tr key={idx} style={{ borderBottom: `1px solid var(--le-border)` }}>
                  <td style={{ padding: '16px' }}>{feature}</td>
                  <td style={{ padding: '16px', textAlign: 'center' }}>
                    <CheckIcon />
                  </td>
                  <td style={{ padding: '16px', textAlign: 'center', backgroundColor: 'rgba(var(--le-primary-rgb), 0.05)' }}>
                    <CheckIcon />
                  </td>
                  <td style={{ padding: '16px', textAlign: 'center' }}>
                    <CheckIcon />
                  </td>
                </tr>
              ))}
              <tr style={{ borderBottom: `1px solid var(--le-border)`, backgroundColor: 'var(--le-bg)' }}>
                <td style={{ padding: '16px', fontWeight: 'bold', color: 'var(--le-text-secondary)' }}>
                  Best For
                </td>
                {coverageTiers.map((tier) => (
                  <td
                    key={tier.name}
                    style={{
                      padding: '16px',
                      textAlign: 'center',
                      fontSize: '14px',
                      color: 'var(--le-text-secondary)',
                      fontWeight: tier.highlighted ? 'bold' : 'normal',
                      backgroundColor: tier.highlighted ? 'rgba(var(--le-primary-rgb), 0.05)' : 'transparent',
                    }}
                  >
                    {tier.bestFor}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Rate Factors Section */}
      <section style={{ padding: '60px 20px', maxWidth: '1000px', margin: '0 auto', backgroundColor: 'var(--le-bg-card)' }}>
        <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '40px', textAlign: 'center' }}>
          What Affects Your Rate?
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          {rateFactors.map((rf) => (
            <div
              key={rf.factor}
              style={{
                backgroundColor: 'var(--le-bg)',
                padding: '20px',
                borderRadius: '8px',
                border: `1px solid var(--le-border)`,
              }}
            >
              <h3 style={{ margin: '0 0 10px 0', fontSize: '16px', fontWeight: 'bold', color: 'var(--le-primary)' }}>
                {rf.factor}
              </h3>
              <div
                style={{
                  display: 'inline-block',
                  padding: '4px 12px',
                  backgroundColor:
                    rf.impact === 'Very High'
                      ? 'var(--le-danger)'
                      : rf.impact === 'High'
                        ? 'var(--le-warning)'
                        : 'var(--le-success)',
                  color: 'white',
                  borderRadius: '4px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  marginBottom: '10px',
                }}
              >
                {rf.impact} Impact
              </div>
              <p style={{ margin: 0, fontSize: '14px', color: 'var(--le-text-secondary)', lineHeight: '1.6' }}>
                {rf.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Common Claims Section */}
      <section style={{ padding: '60px 20px', maxWidth: '1000px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '40px', textAlign: 'center' }}>
          Common Claims & Prevention
        </h2>
        <div style={{ display: 'grid', gap: '20px' }}>
          {commonClaims.map((claim) => (
            <div
              key={claim.id}
              style={{
                backgroundColor: 'var(--le-bg-card)',
                border: `1px solid var(--le-border)`,
                borderRadius: '8px',
                overflow: 'hidden',
              }}
            >
              <button
                onClick={() => setExpandedClaim(expandedClaim === claim.id ? null : claim.id)}
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '20px',
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <div>
                  <h3 style={{ margin: '0 0 5px 0', fontSize: '18px', fontWeight: 'bold', color: 'var(--le-primary)' }}>
                    {claim.title}
                  </h3>
                  <p style={{ margin: 0, color: 'var(--le-text-secondary)', fontSize: '14px' }}>
                    {claim.percentage} of homeowners insurance claims
                  </p>
                </div>
                <div style={{ color: 'var(--le-primary)', flexShrink: 0, marginLeft: '20px' }}>
                  <ChevronIcon isExpanded={expandedClaim === claim.id} />
                </div>
              </button>
              {expandedClaim === claim.id && (
                <div style={{ padding: '0 20px 20px 20px', borderTop: `1px solid var(--le-border)`, paddingTop: '20px' }}>
                  <h4 style={{ margin: '0 0 10px 0', fontSize: '14px', fontWeight: 'bold', color: 'var(--le-text)' }}>
                    Prevention Tips:
                  </h4>
                  <ul style={{ margin: 0, paddingLeft: '20px', color: 'var(--le-text-secondary)' }}>
                    {claim.prevention.map((tip, idx) => (
                      <li key={idx} style={{ marginBottom: '8px' }}>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Discounts Section */}
      <section style={{ padding: '60px 20px', maxWidth: '1000px', margin: '0 auto', backgroundColor: 'var(--le-bg-card)' }}>
        <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '40px', textAlign: 'center' }}>
          Insurance Discounts Guide
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          {discounts.map((discount) => (
            <div
              key={discount.id}
              style={{
                backgroundColor: 'var(--le-bg)',
                padding: '20px',
                borderRadius: '8px',
                border: `1px solid var(--le-border)`,
                cursor: 'pointer',
                transition: 'all 0.3s',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 16px rgba(0,0,0,0.1)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
              }}
              onClick={() => setExpandedDiscount(expandedDiscount === discount.id ? null : discount.id)}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold', color: 'var(--le-primary)', flex: 1 }}>
                  {discount.title}
                </h3>
                <ChevronIcon isExpanded={expandedDiscount === discount.id} />
              </div>
              {expandedDiscount === discount.id && (
                <p style={{ margin: '15px 0 0 0', fontSize: '14px', color: 'var(--le-text-secondary)', lineHeight: '1.6' }}>
                  {discount.desc}
                </p>
              )}
              {expandedDiscount !== discount.id && (
                <p style={{ margin: '10px 0 0 0', fontSize: '13px', color: 'var(--le-text-secondary)' }}>
                  {discount.desc.substring(0, 50)}...
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Filing a Claim Walkthrough */}
      <section style={{ padding: '60px 20px', maxWidth: '1000px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '40px', textAlign: 'center' }}>
          How to File a Claim: Step-by-Step
        </h2>
        <div style={{ display: 'grid', gap: '15px' }}>
          {claimSteps.map((step) => (
            <div
              key={step.id}
              style={{
                backgroundColor: 'var(--le-bg-card)',
                border: `1px solid var(--le-border)`,
                borderRadius: '8px',
                overflow: 'hidden',
              }}
            >
              <button
                onClick={() => setExpandedStep(expandedStep === step.id ? null : step.id)}
                style={{
                  width: '100%',
                  display: 'flex',
                  gap: '20px',
                  alignItems: 'center',
                  padding: '20px',
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <div
                  style={{
                    minWidth: '50px',
                    width: '50px',
                    height: '50px',
                    backgroundColor: 'var(--le-primary)',
                    color: 'white',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    fontSize: '18px',
                    flexShrink: 0,
                  }}
                >
                  {step.number}
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: '0 0 5px 0', fontSize: '16px', fontWeight: 'bold', color: 'var(--le-text)' }}>
                    {step.title}
                  </h3>
                  <p style={{ margin: 0, color: 'var(--le-text-secondary)', fontSize: '14px' }}>
                    {step.desc}
                  </p>
                </div>
                <div style={{ color: 'var(--le-primary)', flexShrink: 0 }}>
                  <ChevronIcon isExpanded={expandedStep === step.id} />
                </div>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Flood & Earthquake Section */}
      <section style={{ padding: '60px 20px', maxWidth: '1000px', margin: '0 auto', backgroundColor: 'var(--le-bg-card)' }}>
        <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '40px', textAlign: 'center' }}>
          Flood & Earthquake Insurance
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
          <div
            style={{
              backgroundColor: 'var(--le-bg)',
              padding: '30px',
              borderRadius: '8px',
              border: `1px solid var(--le-border)`,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
              <AlertIcon />
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 'bold', color: 'var(--le-danger)' }}>
                Flood Insurance
              </h3>
            </div>
            <p style={{ margin: '0 0 15px 0', color: 'var(--le-text-secondary)', lineHeight: '1.8' }}>
              Standard homeowners insurance does not cover flooding. Flood insurance is required if your home is in a high-risk flood zone and financed with a mortgage.
            </p>
            <h4 style={{ margin: '20px 0 10px 0', fontWeight: 'bold', color: 'var(--le-text)' }}>
              NFIP Coverage:
            </h4>
            <ul style={{ margin: 0, paddingLeft: '20px', color: 'var(--le-text-secondary)' }}>
              <li>Up to $250,000 for dwelling</li>
              <li>Up to $100,000 for contents</li>
              <li>Available through government program</li>
              <li>Private flood insurance also available</li>
            </ul>
          </div>

          <div
            style={{
              backgroundColor: 'var(--le-bg)',
              padding: '30px',
              borderRadius: '8px',
              border: `1px solid var(--le-border)`,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
              <AlertIcon />
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 'bold', color: 'var(--le-warning)' }}>
                Earthquake Insurance
              </h3>
            </div>
            <p style={{ margin: '0 0 15px 0', color: 'var(--le-text-secondary)', lineHeight: '1.8' }}>
              Standard homeowners insurance excludes earthquake damage. If you live in an earthquake-prone area, add earthquake coverage as an endorsement.
            </p>
            <h4 style={{ margin: '20px 0 10px 0', fontWeight: 'bold', color: 'var(--le-text)' }}>
              Typically Covers:
            </h4>
            <ul style={{ margin: 0, paddingLeft: '20px', color: 'var(--le-text-secondary)' }}>
              <li>Dwelling damage from quakes</li>
              <li>Personal property coverage</li>
              <li>Temporary housing</li>
              <li>Higher deductibles (10-25%)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Terminology Glossary */}
      <section style={{ padding: '60px 20px', maxWidth: '1000px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '40px', textAlign: 'center' }}>
          Insurance Terminology Glossary
        </h2>
        <div style={{ display: 'grid', gap: '15px' }}>
          {glossaryTerms.map((item) => (
            <div
              key={item.id}
              style={{
                backgroundColor: 'var(--le-bg-card)',
                border: `1px solid var(--le-border)`,
                borderRadius: '8px',
                overflow: 'hidden',
              }}
            >
              <button
                onClick={() => setExpandedGlossary(expandedGlossary === item.id ? null : item.id)}
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '18px 20px',
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold', color: 'var(--le-primary)' }}>
                  {item.term}
                </h3>
                <div style={{ color: 'var(--le-primary)', flexShrink: 0 }}>
                  <ChevronIcon isExpanded={expandedGlossary === item.id} />
                </div>
              </button>
              {expandedGlossary === item.id && (
                <div style={{ padding: '0 20px 20px 20px', borderTop: `1px solid var(--le-border)`, paddingTop: '15px' }}>
                  <p style={{ margin: 0, color: 'var(--le-text-secondary)', lineHeight: '1.7' }}>
                    {item.definition}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section style={{ padding: '60px 20px', maxWidth: '1000px', margin: '0 auto', backgroundColor: 'var(--le-bg-card)' }}>
        <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '40px', textAlign: 'center' }}>
          Frequently Asked Questions
        </h2>
        <div style={{ display: 'grid', gap: '15px' }}>
          {faqs.map((faq) => (
            <div
              key={faq.id}
              style={{
                backgroundColor: 'var(--le-bg)',
                border: `1px solid var(--le-border)`,
                borderRadius: '8px',
                overflow: 'hidden',
              }}
            >
              <button
                onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '20px',
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold', color: 'var(--le-primary)' }}>
                  {faq.question}
                </h3>
                <div style={{ color: 'var(--le-primary)', flexShrink: 0, marginLeft: '20px' }}>
                  <ChevronIcon isExpanded={expandedFaq === faq.id} />
                </div>
              </button>
              {expandedFaq === faq.id && (
                <div style={{ padding: '0 20px 20px 20px', borderTop: `1px solid var(--le-border)`, paddingTop: '15px' }}>
                  <p style={{ margin: 0, color: 'var(--le-text-secondary)', lineHeight: '1.8' }}>
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Lead Capture Section */}
      <section
        id="lead-capture"
        style={{
          padding: '60px 20px',
          maxWidth: '900px',
          margin: '0 auto',
          backgroundColor: 'linear-gradient(135deg, var(--le-primary) 0%, var(--le-primary-hover) 100%)',
          borderRadius: '12px',
          color: 'white',
        }}
      >
        <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '15px', textAlign: 'center' }}>
          Get Connected with Top Insurance Providers
        </h2>
        <p style={{ fontSize: '18px', textAlign: 'center', marginBottom: '40px', opacity: 0.95 }}>
          Receive personalized quotes and expert guidance from qualified insurance professionals
        </p>

        <form
          onSubmit={handleLeadSubmit}
          style={{
            display: 'grid',
            gap: '15px',
            maxWidth: '500px',
            margin: '0 auto',
          }}
        >
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
              Email Address
            </label>
            <input
              type="email"
              value={leadEmail}
              onChange={(e) => setLeadEmail(e.target.value)}
              placeholder="your@email.com"
              required
              style={{
                width: '100%',
                padding: '12px',
                border: 'none',
                borderRadius: '6px',
                fontSize: '16px',
                boxSizing: 'border-box',
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              backgroundColor: 'white',
              color: 'var(--le-primary)',
              border: 'none',
              padding: '14px',
              fontSize: '16px',
              fontWeight: 'bold',
              borderRadius: '6px',
              cursor: 'pointer',
              transition: 'transform 0.2s',
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.transform = 'translateY(0)';
            }}
          >
            Get Connected Now
          </button>
        </form>

        {leadSubmitted && (
          <div
            style={{
              marginTop: '20px',
              padding: '15px 20px',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '6px',
              textAlign: 'center',
              fontWeight: 'bold',
            }}
          >
            Thanks for your interest! A specialist will contact you shortly.
          </div>
        )}
      </section>

      {/* Footer */}
      <footer
        style={{
          backgroundColor: 'var(--le-bg-card)',
          borderTop: `1px solid var(--le-border)`,
          padding: '40px 20px',
          marginTop: '60px',
          color: 'var(--le-text-secondary)',
          fontSize: '14px',
        }}
      >
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ margin: '0 0 10px 0' }}>
            &copy; 2026 LeadEngine. All information is provided for educational purposes.
          </p>
          <p style={{ margin: 0 }}>
            Consult with a licensed insurance agent for personalized advice specific to your situation.
          </p>
        </div>
      </footer>
    </div>
  );
}
