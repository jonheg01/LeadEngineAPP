'use client';

import React, { useState, useMemo } from 'react';

// SVG Icons
const CheckIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const HomeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    <polyline points="9 22 9 12 15 12 15 22"></polyline>
  </svg>
);

const LayoutIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="7" height="7"></rect>
    <rect x="14" y="3" width="7" height="7"></rect>
    <rect x="14" y="14" width="7" height="7"></rect>
    <rect x="3" y="14" width="7" height="7"></rect>
  </svg>
);

const DollarIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="1" x2="12" y2="23"></line>
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
  </svg>
);

const ShieldIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
  </svg>
);

const HelpCircleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M12 16v-4M12 8h.01"></path>
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

const MultiGenerationalLivingPage = () => {
  const [expandedFaq, setExpandedFaq] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [leadEmail, setLeadEmail] = useState('');
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  const benefits = [
    {
      icon: DollarIcon,
      title: 'Financial Savings',
      description: 'Reduce housing costs by 20-40% through shared mortgage, utilities, and maintenance expenses. Build equity together.'
    },
    {
      icon: HomeIcon,
      title: 'Family Support',
      description: 'Childcare assistance, elder care support, and daily help from nearby family members strengthen bonds.'
    },
    {
      icon: ShieldIcon,
      title: 'Cultural Values',
      description: 'Honor multi-generational traditions and maintain close family connections across age groups.'
    },
    {
      icon: LayoutIcon,
      title: 'Flexible Living',
      description: 'Adapt to life changes—from young families to retirement—without moving.'
    }
  ];

  const layoutOptions = [
    {
      title: 'In-Law Suite',
      description: 'Separate apartment within main home with private entrance, kitchen, and bathroom. Ideal for aging parents.',
      pros: ['Affordable conversion', 'Shared utilities', 'Easy monitoring', 'Privacy maintained'],
      cons: ['Building permits required', 'Zoning restrictions', 'Limited independence']
    },
    {
      title: 'Dual Master Bedrooms',
      description: 'Two primary suites on different floors or wings. Perfect for two couples or families.',
      pros: ['Equal independence', 'Shared common areas', 'No shared bathrooms', 'Flexible use'],
      cons: ['Higher initial cost', 'Complex design', 'More utilities']
    },
    {
      title: 'Accessory Dwelling Unit (ADU)',
      description: 'Detached or attached secondary unit. Modern trend in urban and suburban areas.',
      pros: ['Maximum independence', 'Rental potential', 'Strong appreciation', 'Higher resale value'],
      cons: ['Expensive to build', 'Zoning hurdles', 'Parking requirements', 'Extended timeline']
    },
    {
      title: 'Multi-Unit Property',
      description: 'Duplex, triplex, or single-family with separate cottage. Each generation owns a unit.',
      pros: ['Ultimate privacy', 'Independent leases', 'Investment potential', 'Flexible ownership'],
      cons: ['Complex financing', 'HOA challenges', 'Property management', 'Higher taxes']
    }
  ];

  const legalConsiderations = [
    {
      title: 'Zoning & ADU Laws',
      details: 'Check local zoning ordinances for ADU eligibility. Many cities now streamline ADU approvals. Verify setbacks, lot coverage, and unit size limits.'
    },
    {
      title: 'Building Permits & Inspections',
      details: 'In-law suites and ADUs require full permits. Kitchen and bathroom fixtures must meet code. Electrical, plumbing, and structural inspections mandatory.'
    },
    {
      title: 'Property Ownership Structures',
      details: 'Consider joint tenancy, tenancy in common, or LLC setup. Each affects liability, inheritance, and exit strategy. Consult real estate attorney.'
    },
    {
      title: 'HOA Restrictions',
      details: 'Homeowners associations may prohibit ADUs or rental units. Review covenants before purchase. Get written approval before building.'
    },
    {
      title: 'Accessory Unit Regulations',
      details: 'ADU regulations vary by state and city. Some allow short-term rentals; others don\u2019t. Size, setback, and height limits differ widely.'
    },
    {
      title: 'Deed Restrictions',
      details: 'Older properties may have deed restrictions on property division or unit rentals. Title search reveals restrictions. Amendment may require neighbor consent.'
    }
  ];

  const financialStrategies = [
    {
      title: 'Shared Mortgage',
      description: 'Two or more family members co-sign, splitting principal and interest. Increases loan approval odds and reduces individual burden.',
      tip: 'Lenders prefer stable, related borrowers. Document income clearly.'
    },
    {
      title: 'Cost Splitting Agreement',
      description: 'Written agreement allocates mortgage, taxes, utilities, insurance, and maintenance. Update annually as circumstances change.',
      tip: 'Include buyout clauses if one party exits ownership.'
    },
    {
      title: 'Tax Deductions & Credits',
      description: 'Mortgage interest, property taxes, and energy-efficient upgrades offer deductions. ADUs may qualify for tax credits in some states.',
      tip: 'Consult a CPA. Multi-gen ownership structure affects tax filing.'
    },
    {
      title: 'Equity & Buyout Planning',
      description: 'Define buy-sell agreements upfront. What if one party wants to sell? What\u2019s fair market value? Can remaining party buy out exiting member?',
      tip: 'Get property appraised every 2-3 years. Refinancing may be needed.'
    }
  ];

  const designTips = [
    {
      category: 'Privacy Zones',
      items: ['Separate entrances for each generation', 'Soundproofing between units', 'Dedicated outdoor spaces', 'Individual thermostats']
    },
    {
      category: 'Shared Common Areas',
      items: ['Central kitchen for family gatherings', 'Dining room for meals together', 'Living room for entertainment', 'Laundry facilities']
    },
    {
      category: 'Accessibility & Aging',
      items: ['Zero-entry showers or grab bars', 'Wide doorways (36-42 inches)', 'Single-floor living option', 'Stair lifts or elevators', 'Slip-resistant flooring']
    },
    {
      category: 'Technology & Safety',
      items: ['Smart home systems for all units', 'Intercom or communication devices', 'Security cameras for entries', 'Medical alert systems']
    }
  ];

  const faqItems = [
    {
      question: 'What\u2019s the difference between an in-law suite and an ADU?',
      answer: 'An in-law suite is a self-contained unit within the main home with shared foundation and utilities. An ADU is a separate dwelling (attached or detached) with its own utilities and entrance. ADUs offer more independence and rental potential but cost more to build.'
    },
    {
      question: 'Do I need a permit for an in-law suite?',
      answer: 'Yes. Even interior conversions require permits in most jurisdictions. Unpermitted work violates building codes, voids insurance, and creates resale issues. Always pull permits before construction.'
    },
    {
      question: 'What are typical costs for adding an in-law suite?',
      answer: '$50,000–$150,000 depending on existing space, plumbing/electrical, finishes, and location. ADUs cost $100,000–$300,000+. Budget for permits, inspections, and contingencies.'
    },
    {
      question: 'Can we rent out the ADU if one family member moves out?',
      answer: 'Maybe. Local zoning laws determine if ADU rentals are allowed. Some cities prohibit short-term rentals. Check before building. Rental income offers financial benefits but complicates family dynamics.'
    },
    {
      question: 'What if one family member wants to buy out the others?',
      answer: 'Have a buy-sell agreement from day one. Define valuation method (appraisal, formula-based, etc.), financing terms, and timeline. Get a real estate attorney to draft it.'
    },
    {
      question: 'How do we handle utilities and shared expenses?',
      answer: 'Create a detailed cost-sharing agreement. Separate meters for ADUs allow independent billing. For shared utilities, split costs proportionally by square footage or occupancy. Review annually.'
    },
    {
      question: 'What if relationships change and we want to separate?',
      answer: 'A solid legal structure prevents disaster. Have exit clauses, buyout options, and dispute resolution methods in place. Joint ownership without an agreement is risky.'
    },
    {
      question: 'Are multi-gen homes harder to sell?',
      answer: 'No. Today\u2019s market favors versatile properties. In-law suites and ADUs increase property value 10–25%. Buyers appreciate flexible layouts for aging-in-place or rental income. Document all improvements with permits.'
    }
  ];

  const quizQuestions = [
    {
      question: 'How important is financial savings to your family?',
      options: ['Very important', 'Somewhat important', 'Not a primary factor']
    },
    {
      question: 'Are you prepared for shared living space and boundaries?',
      options: ['Yes, we\u2019ve discussed this', 'Somewhat, we\u2019re working on it', 'No, this is a concern']
    },
    {
      question: 'Does your local area allow ADUs or in-law suites?',
      options: ['Yes, explicitly allowed', 'Unclear, need to research', 'No or very restricted']
    },
    {
      question: 'How many generations will live together?',
      options: ['Two (e.g., parents + adult children)', 'Three or more', 'Flexible, depends on circumstances']
    },
    {
      question: 'What\u2019s your timeline for this move?',
      options: ['Within 1 year', '1–2 years', '2+ years or exploring']
    }
  ];

  const handleQuizAnswer = (questionIndex, answerIndex) => {
    setQuizAnswers({
      ...quizAnswers,
      [questionIndex]: answerIndex
    });
  };

  const quizScore = useMemo(() => {
    const answered = Object.keys(quizAnswers).length;
    if (answered === 0) return null;

    let score = 0;
    if (quizAnswers[0] === 0) score += 20;
    if (quizAnswers[1] === 0) score += 20;
    if (quizAnswers[2] === 0) score += 20;
    if (quizAnswers[3] !== 1) score += 20;
    if (quizAnswers[4] === 0) score += 20;

    return score;
  }, [quizAnswers]);

  const handleLeadSubmit = (e) => {
    e.preventDefault();
    if (leadEmail) {
      setLeadSubmitted(true);
      setTimeout(() => {
        setLeadEmail('');
        setLeadSubmitted(false);
      }, 3000);
    }
  };

  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>Multi-Generational Living</h1>
          <p style={styles.heroSubtitle}>Build stronger families. Save money. Honor traditions. Explore modern living arrangements that bring generations together.</p>
          <button
            onClick={() => {
              document.getElementById('compatibility-quiz')?.scrollIntoView({ behavior: 'smooth' });
            }}
            style={styles.ctaButton}
          >
            Take the Compatibility Quiz
          </button>
        </div>
      </section>

      {/* Benefits Section */}
      <section style={styles.section}>
        <div style={styles.sectionInner}>
          <h2 style={styles.sectionTitle}>Why Choose Multi-Generational Living?</h2>
          <div style={styles.benefitsGrid}>
            {benefits.map((benefit, idx) => {
              const IconComponent = benefit.icon;
              return (
                <div key={idx} style={styles.benefitCard}>
                  <div style={styles.benefitIcon}>
                    <IconComponent />
                  </div>
                  <h3 style={styles.benefitTitle}>{benefit.title}</h3>
                  <p style={styles.benefitDescription}>{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Layout Options */}
      <section style={styles.section} style={{ ...styles.section, backgroundColor: 'var(--le-bg-alt)' }}>
        <div style={styles.sectionInner}>
          <h2 style={styles.sectionTitle}>Home Layout Options</h2>
          <p style={styles.sectionDescription}>Discover the right multi-generational setup for your family\u2019s needs.</p>

          <div style={styles.layoutGrid}>
            {layoutOptions.map((option, idx) => (
              <div key={idx} style={styles.layoutCard}>
                <h3 style={styles.layoutTitle}>{option.title}</h3>
                <p style={styles.layoutDescription}>{option.description}</p>

                <div style={styles.proConSection}>
                  <div style={styles.prosList}>
                    <h4 style={styles.prosTitle}>Pros</h4>
                    <ul style={styles.list}>
                      {option.pros.map((pro, i) => (
                        <li key={i} style={styles.listItem}>
                          <span style={styles.checkmark}><CheckIcon /></span>
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div style={styles.consList}>
                    <h4 style={styles.consTitle}>Cons</h4>
                    <ul style={styles.list}>
                      {option.cons.map((con, i) => (
                        <li key={i} style={styles.listItem}>
                          <span style={{ ...styles.checkmark, color: 'var(--le-text-muted)' }}>•</span>
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Legal Considerations */}
      <section style={styles.section}>
        <div style={styles.sectionInner}>
          <h2 style={styles.sectionTitle}>Legal Considerations</h2>
          <p style={styles.sectionDescription}>Navigate zoning, permits, and property ownership structures.</p>

          <div style={styles.legalGrid}>
            {legalConsiderations.map((item, idx) => (
              <div key={idx} style={styles.legalCard}>
                <h3 style={styles.legalTitle}>
                  <span style={styles.legalIcon}><ShieldIcon /></span>
                  {item.title}
                </h3>
                <p style={styles.legalDetails}>{item.details}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Financial Planning */}
      <section style={{ ...styles.section, backgroundColor: 'var(--le-bg-alt)' }}>
        <div style={styles.sectionInner}>
          <h2 style={styles.sectionTitle}>Financial Planning & Strategies</h2>
          <p style={styles.sectionDescription}>Smart approaches to shared mortgages, cost splitting, and equity.</p>

          <div style={styles.financialGrid}>
            {financialStrategies.map((strategy, idx) => (
              <div key={idx} style={styles.financialCard}>
                <h3 style={styles.financialTitle}>{strategy.title}</h3>
                <p style={styles.financialDescription}>{strategy.description}</p>
                <div style={styles.tipBox}>
                  <p style={styles.tipLabel}>Pro Tip:</p>
                  <p style={styles.tipText}>{strategy.tip}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Design Tips */}
      <section style={styles.section}>
        <div style={styles.sectionInner}>
          <h2 style={styles.sectionTitle}>Design Tips for Multi-Gen Homes</h2>
          <p style={styles.sectionDescription}>Create spaces that balance privacy and togetherness.</p>

          <div style={styles.designGrid}>
            {designTips.map((tip, idx) => (
              <div key={idx} style={styles.designCard}>
                <h3 style={styles.designCategory}>{tip.category}</h3>
                <ul style={styles.designList}>
                  {tip.items.map((item, i) => (
                    <li key={i} style={styles.designListItem}>
                      <span style={styles.designCheckmark}><CheckIcon /></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Building vs Buying */}
      <section style={{ ...styles.section, backgroundColor: 'var(--le-bg-alt)' }}>
        <div style={styles.sectionInner}>
          <h2 style={styles.sectionTitle}>Building vs. Buying for Multi-Gen Living</h2>

          <div style={styles.comparisonGrid}>
            <div style={styles.comparisonCard}>
              <h3 style={styles.comparisonTitle}>Buying Existing Home with Conversion</h3>
              <div style={styles.comparisonContent}>
                <p style={styles.comparisonHeading}>Timeline: 6–18 months</p>
                <p style={styles.comparisonHeading}>Cost: $50K–$150K for in-law suite</p>
                <ul style={styles.comparisonList}>
                  <li>Move in faster</li>
                  <li>Lower initial investment</li>
                  <li>Existing neighborhood and amenities</li>
                  <li>May need extensive permits</li>
                  <li>Structure limitations</li>
                </ul>
              </div>
            </div>

            <div style={styles.comparisonCard}>
              <h3 style={styles.comparisonTitle}>New Construction or Development</h3>
              <div style={styles.comparisonContent}>
                <p style={styles.comparisonHeading}>Timeline: 12–36 months</p>
                <p style={styles.comparisonHeading}>Cost: $300K–$1M+ for custom multi-gen build</p>
                <ul style={styles.comparisonList}>
                  <li>Fully customized design</li>
                  <li>Modern efficiency and materials</li>
                  <li>Higher resale value</li>
                  <li>Substantial upfront cost</li>
                  <li>Longer timeline to occupancy</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Communication & Boundaries */}
      <section style={styles.section}>
        <div style={styles.sectionInner}>
          <h2 style={styles.sectionTitle}>Communication & Boundaries</h2>
          <p style={styles.sectionDescription}>Set expectations and agreements that preserve relationships.</p>

          <div style={styles.boundariesGrid}>
            <div style={styles.boundaryItem}>
              <h3 style={styles.boundaryTitle}>Family Meeting</h3>
              <p style={styles.boundaryText}>Discuss expectations before purchase. Topics: finances, childcare, guest policies, quiet hours, decision-making processes.</p>
            </div>

            <div style={styles.boundaryItem}>
              <h3 style={styles.boundaryTitle}>Household Agreement</h3>
              <p style={styles.boundaryText}>Written document covering chores, expenses, noise, privacy, and conflict resolution. Update annually as needed.</p>
            </div>

            <div style={styles.boundaryItem}>
              <h3 style={styles.boundaryTitle}>Financial Clarity</h3>
              <p style={styles.boundaryText}>Separate bills, shared costs, and contribution schedules. Use accounting software or apps to track expenses transparently.</p>
            </div>

            <div style={styles.boundaryItem}>
              <h3 style={styles.boundaryTitle}>Exit Strategy</h3>
              <p style={styles.boundaryText}>Plan for life changes. How does someone buy out co-owners? Selling? Moving? Define buyout prices and terms upfront.</p>
            </div>

            <div style={styles.boundaryItem}>
              <h3 style={styles.boundaryTitle}>Regular Check-Ins</h3>
              <p style={styles.boundaryText}>Monthly or quarterly family meetings to discuss what\u2019s working and what needs adjustment. Normalize open conversation.</p>
            </div>

            <div style={styles.boundaryItem}>
              <h3 style={styles.boundaryTitle}>Conflict Resolution</h3>
              <p style={styles.boundaryText}>Agree on mediation process for disputes. Having a neutral third party (mediator or counselor) prevents escalation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Compatibility Quiz */}
      <section style={{ ...styles.section, backgroundColor: 'var(--le-bg-alt)' }} id="compatibility-quiz">
        <div style={styles.sectionInner}>
          <h2 style={styles.sectionTitle}>Is Multi-Generational Living Right for You?</h2>
          <p style={styles.sectionDescription}>Take this quick quiz to assess your readiness.</p>

          <div style={styles.quizContainer}>
            {!quizStarted ? (
              <div style={styles.quizIntro}>
                <p style={styles.quizIntroText}>Answer 5 quick questions to discover if multi-generational living aligns with your family\u2019s values and circumstances.</p>
                <button
                  onClick={() => setQuizStarted(true)}
                  style={styles.quizStartButton}
                >
                  Start Quiz
                </button>
              </div>
            ) : (
              <div>
                {quizQuestions.map((q, idx) => (
                  <div key={idx} style={styles.quizQuestion}>
                    <h4 style={styles.quizQuestionText}>{idx + 1}. {q.question}</h4>
                    <div style={styles.quizOptions}>
                      {q.options.map((option, optIdx) => (
                        <button
                          key={optIdx}
                          onClick={() => handleQuizAnswer(idx, optIdx)}
                          style={{
                            ...styles.quizOption,
                            ...(quizAnswers[idx] === optIdx ? styles.quizOptionSelected : {})
                          }}
                        >
                          <span style={styles.quizOptionRadio}>
                            {quizAnswers[idx] === optIdx && <div style={styles.quizRadioInner} />}
                          </span>
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}

                {quizScore !== null && (
                  <div style={styles.quizResults}>
                    <h3 style={styles.quizResultsTitle}>Your Readiness Score</h3>
                    <div style={styles.scoreBar}>
                      <div style={{ ...styles.scoreBarFill, width: `${quizScore}%` }} />
                    </div>
                    <p style={styles.scoreText}>{quizScore}% Ready</p>

                    <p style={styles.resultsMessage}>
                      {quizScore >= 80 && 'Excellent! You\u2019re well-prepared for multi-generational living. Next step: consult a real estate attorney and research local zoning.'}
                      {quizScore >= 60 && quizScore < 80 && 'Good position! You have strong fundamentals. Address a few areas (legal structures, boundaries) before proceeding.'}
                      {quizScore >= 40 && quizScore < 60 && 'Consider additional planning. Discuss family dynamics, finances, and legal structures with loved ones and professionals.'}
                      {quizScore < 40 && 'Multi-gen living requires alignment. Have deeper conversations about finances, space, and expectations before moving forward.'}
                    </p>

                    <button
                      onClick={() => {
                        setQuizStarted(false);
                        setQuizAnswers({});
                      }}
                      style={styles.quizRestartButton}
                    >
                      Retake Quiz
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={styles.section}>
        <div style={styles.sectionInner}>
          <h2 style={styles.sectionTitle}>Frequently Asked Questions</h2>

          <div style={styles.faqContainer}>
            {faqItems.map((item, idx) => (
              <div key={idx} style={styles.faqItem}>
                <button
                  onClick={() => setExpandedFaq(expandedFaq === idx ? -1 : idx)}
                  style={styles.faqButton}
                >
                  <span style={styles.faqQuestion}>{item.question}</span>
                  <span style={{
                    ...styles.faqChevron,
                    ...(expandedFaq === idx ? styles.faqChevronOpen : {})
                  }}>
                    <ChevronDownIcon />
                  </span>
                </button>
                {expandedFaq === idx && (
                  <div style={styles.faqAnswer}>
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Capture CTA */}
      <section style={{ ...styles.section, backgroundColor: 'var(--le-primary)' }}>
        <div style={styles.sectionInner}>
          <div style={styles.ctaSection}>
            <h2 style={styles.ctaTitle}>Ready to Explore Multi-Generational Living?</h2>
            <p style={styles.ctaDescription}>Get personalized guidance on layout options, financing, legal structures, and finding the right property for your family.</p>

            <form onSubmit={handleLeadSubmit} style={styles.ctaForm}>
              <input
                type="email"
                placeholder="Enter your email address"
                value={leadEmail}
                onChange={(e) => setLeadEmail(e.target.value)}
                required
                style={styles.ctaInput}
              />
              <button type="submit" style={styles.ctaSubmitButton}>
                {leadSubmitted ? 'Thanks! Check your email.' : 'Get Free Guide'}
              </button>
            </form>

            <p style={styles.ctaPrivacy}>We\u2019ll send you a multi-gen home planning guide and personalized recommendations. No spam, unsubscribe anytime.</p>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section style={styles.section}>
        <div style={styles.sectionInner}>
          <div style={styles.footerCta}>
            <h2 style={styles.footerCtaTitle}>Work with a LeadEngine Real Estate Expert</h2>
            <p style={styles.footerCtaDescription}>Our agents specialize in multi-generational homes and can guide you through every step—from legal structures to finding the perfect property.</p>
            <button style={styles.footerCtaButton}>Schedule a Consultation</button>
          </div>
        </div>
      </section>
    </div>
  );
};

// Inline Styles
const styles = {
  container: {
    fontFamily: 'var(--le-font-family)',
    color: 'var(--le-text)',
    backgroundColor: 'var(--le-bg)',
    lineHeight: '1.6'
  },

  // Hero
  hero: {
    backgroundColor: 'var(--le-primary)',
    color: 'white',
    padding: 'var(--le-spacing-xl) var(--le-spacing-md)',
    textAlign: 'center',
    minHeight: '500px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundImage: 'linear-gradient(135deg, var(--le-primary) 0%, var(--le-primary-dark) 100%)'
  },
  heroContent: {
    maxWidth: '900px',
    margin: '0 auto'
  },
  heroTitle: {
    fontSize: 'clamp(2.5rem, 8vw, 4rem)',
    fontWeight: '700',
    marginBottom: 'var(--le-spacing-lg)',
    letterSpacing: '-0.02em'
  },
  heroSubtitle: {
    fontSize: 'clamp(1.1rem, 3vw, 1.5rem)',
    marginBottom: 'var(--le-spacing-lg)',
    opacity: '0.95',
    fontWeight: '300'
  },
  ctaButton: {
    backgroundColor: 'white',
    color: 'var(--le-primary)',
    padding: '16px 40px',
    fontSize: '1rem',
    fontWeight: '600',
    border: 'none',
    borderRadius: 'var(--le-border-radius)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
  },

  // Sections
  section: {
    padding: 'var(--le-spacing-xl) var(--le-spacing-md)',
    backgroundColor: 'var(--le-bg)'
  },
  sectionInner: {
    maxWidth: '1200px',
    margin: '0 auto'
  },
  sectionTitle: {
    fontSize: 'clamp(2rem, 6vw, 3rem)',
    fontWeight: '700',
    marginBottom: 'var(--le-spacing-lg)',
    letterSpacing: '-0.01em'
  },
  sectionDescription: {
    fontSize: '1.1rem',
    color: 'var(--le-text-secondary)',
    marginBottom: 'var(--le-spacing-lg)',
    maxWidth: '600px'
  },

  // Benefits Grid
  benefitsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: 'var(--le-spacing-lg)'
  },
  benefitCard: {
    backgroundColor: 'white',
    padding: 'var(--le-spacing-lg)',
    borderRadius: 'var(--le-border-radius)',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease'
  },
  benefitIcon: {
    fontSize: '2.5rem',
    color: 'var(--le-primary)',
    marginBottom: 'var(--le-spacing-md)',
    display: 'inline-block'
  },
  benefitTitle: {
    fontSize: '1.3rem',
    fontWeight: '600',
    marginBottom: 'var(--le-spacing-sm)',
    color: 'var(--le-text)'
  },
  benefitDescription: {
    fontSize: '1rem',
    color: 'var(--le-text-secondary)',
    lineHeight: '1.6'
  },

  // Layout Grid
  layoutGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: 'var(--le-spacing-lg)'
  },
  layoutCard: {
    backgroundColor: 'white',
    padding: 'var(--le-spacing-lg)',
    borderRadius: 'var(--le-border-radius)',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
    border: '1px solid var(--le-border)'
  },
  layoutTitle: {
    fontSize: '1.4rem',
    fontWeight: '700',
    marginBottom: 'var(--le-spacing-sm)',
    color: 'var(--le-text)'
  },
  layoutDescription: {
    fontSize: '1rem',
    color: 'var(--le-text-secondary)',
    marginBottom: 'var(--le-spacing-md)',
    lineHeight: '1.6'
  },
  proConSection: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 'var(--le-spacing-md)'
  },
  prosList: {},
  consList: {},
  prosTitle: {
    fontSize: '0.95rem',
    fontWeight: '700',
    marginBottom: 'var(--le-spacing-sm)',
    color: 'var(--le-success)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em'
  },
  consTitle: {
    fontSize: '0.95rem',
    fontWeight: '700',
    marginBottom: 'var(--le-spacing-sm)',
    color: 'var(--le-warning)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em'
  },
  list: {
    listStyle: 'none',
    padding: '0',
    margin: '0'
  },
  listItem: {
    display: 'flex',
    alignItems: 'flex-start',
    marginBottom: 'var(--le-spacing-sm)',
    fontSize: '0.95rem',
    color: 'var(--le-text-secondary)',
    lineHeight: '1.5'
  },
  checkmark: {
    color: 'var(--le-success)',
    marginRight: 'var(--le-spacing-sm)',
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center'
  },

  // Legal Grid
  legalGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: 'var(--le-spacing-lg)'
  },
  legalCard: {
    backgroundColor: 'white',
    padding: 'var(--le-spacing-lg)',
    borderRadius: 'var(--le-border-radius)',
    borderLeft: '4px solid var(--le-primary)',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
  },
  legalTitle: {
    fontSize: '1.1rem',
    fontWeight: '700',
    marginBottom: 'var(--le-spacing-sm)',
    color: 'var(--le-text)',
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--le-spacing-sm)'
  },
  legalIcon: {
    color: 'var(--le-primary)',
    display: 'flex',
    alignItems: 'center'
  },
  legalDetails: {
    fontSize: '0.95rem',
    color: 'var(--le-text-secondary)',
    lineHeight: '1.6'
  },

  // Financial Grid
  financialGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: 'var(--le-spacing-lg)'
  },
  financialCard: {
    backgroundColor: 'white',
    padding: 'var(--le-spacing-lg)',
    borderRadius: 'var(--le-border-radius)',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
    border: '1px solid var(--le-border)'
  },
  financialTitle: {
    fontSize: '1.2rem',
    fontWeight: '700',
    marginBottom: 'var(--le-spacing-sm)',
    color: 'var(--le-text)'
  },
  financialDescription: {
    fontSize: '0.95rem',
    color: 'var(--le-text-secondary)',
    marginBottom: 'var(--le-spacing-md)',
    lineHeight: '1.6'
  },
  tipBox: {
    backgroundColor: 'var(--le-bg-alt)',
    padding: 'var(--le-spacing-md)',
    borderRadius: 'var(--le-border-radius)',
    borderLeft: '3px solid var(--le-primary)'
  },
  tipLabel: {
    fontSize: '0.85rem',
    fontWeight: '700',
    color: 'var(--le-primary)',
    marginBottom: '0.25rem',
    textTransform: 'uppercase',
    letterSpacing: '0.05em'
  },
  tipText: {
    fontSize: '0.9rem',
    color: 'var(--le-text-secondary)',
    margin: '0',
    lineHeight: '1.5'
  },

  // Design Grid
  designGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: 'var(--le-spacing-lg)'
  },
  designCard: {
    backgroundColor: 'white',
    padding: 'var(--le-spacing-lg)',
    borderRadius: 'var(--le-border-radius)',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
  },
  designCategory: {
    fontSize: '1.2rem',
    fontWeight: '700',
    marginBottom: 'var(--le-spacing-md)',
    color: 'var(--le-primary)'
  },
  designList: {
    listStyle: 'none',
    padding: '0',
    margin: '0'
  },
  designListItem: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 'var(--le-spacing-sm)',
    fontSize: '0.95rem',
    color: 'var(--le-text-secondary)',
    lineHeight: '1.5'
  },
  designCheckmark: {
    color: 'var(--le-primary)',
    marginRight: 'var(--le-spacing-sm)',
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center'
  },

  // Comparison Grid
  comparisonGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: 'var(--le-spacing-lg)'
  },
  comparisonCard: {
    backgroundColor: 'white',
    padding: 'var(--le-spacing-lg)',
    borderRadius: 'var(--le-border-radius)',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
    border: '2px solid var(--le-border)'
  },
  comparisonTitle: {
    fontSize: '1.3rem',
    fontWeight: '700',
    marginBottom: 'var(--le-spacing-md)',
    color: 'var(--le-text)'
  },
  comparisonContent: {},
  comparisonHeading: {
    fontSize: '0.95rem',
    fontWeight: '600',
    color: 'var(--le-primary)',
    marginBottom: 'var(--le-spacing-sm)'
  },
  comparisonList: {
    listStyle: 'none',
    padding: '0',
    margin: '0'
  },

  // Boundaries Grid
  boundariesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: 'var(--le-spacing-lg)'
  },
  boundaryItem: {
    backgroundColor: 'white',
    padding: 'var(--le-spacing-lg)',
    borderRadius: 'var(--le-border-radius)',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
    border: '1px solid var(--le-border)'
  },
  boundaryTitle: {
    fontSize: '1.1rem',
    fontWeight: '700',
    marginBottom: 'var(--le-spacing-sm)',
    color: 'var(--le-primary)'
  },
  boundaryText: {
    fontSize: '0.95rem',
    color: 'var(--le-text-secondary)',
    lineHeight: '1.6'
  },

  // Quiz
  quizContainer: {
    backgroundColor: 'white',
    padding: 'var(--le-spacing-xl)',
    borderRadius: 'var(--le-border-radius)',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
    maxWidth: '800px',
    margin: '0 auto'
  },
  quizIntro: {
    textAlign: 'center'
  },
  quizIntroText: {
    fontSize: '1.1rem',
    color: 'var(--le-text-secondary)',
    marginBottom: 'var(--le-spacing-lg)',
    lineHeight: '1.6'
  },
  quizStartButton: {
    backgroundColor: 'var(--le-primary)',
    color: 'white',
    padding: '14px 36px',
    fontSize: '1rem',
    fontWeight: '600',
    border: 'none',
    borderRadius: 'var(--le-border-radius)',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  quizQuestion: {
    marginBottom: 'var(--le-spacing-lg)',
    paddingBottom: 'var(--le-spacing-lg)',
    borderBottom: '1px solid var(--le-border)'
  },
  quizQuestionText: {
    fontSize: '1.1rem',
    fontWeight: '600',
    color: 'var(--le-text)',
    marginBottom: 'var(--le-spacing-md)'
  },
  quizOptions: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--le-spacing-sm)'
  },
  quizOption: {
    display: 'flex',
    alignItems: 'center',
    padding: 'var(--le-spacing-md)',
    backgroundColor: 'var(--le-bg-alt)',
    border: '2px solid transparent',
    borderRadius: 'var(--le-border-radius)',
    cursor: 'pointer',
    fontSize: '1rem',
    color: 'var(--le-text-secondary)',
    transition: 'all 0.2s ease',
    textAlign: 'left'
  },
  quizOptionSelected: {
    backgroundColor: 'var(--le-primary)',
    color: 'white',
    borderColor: 'var(--le-primary)'
  },
  quizOptionRadio: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    border: '2px solid currentColor',
    marginRight: 'var(--le-spacing-md)',
    flexShrink: 0,
  },
  quizRadioInner: {
    width: '8px',
    height: '8px',
    backgroundColor: 'white',
    borderRadius: '50%'
  },
  quizResults: {
    marginTop: 'var(--le-spacing-lg)',
    padding: 'var(--le-spacing-lg)',
    backgroundColor: 'var(--le-bg-alt)',
    borderRadius: 'var(--le-border-radius)',
    borderLeft: '4px solid var(--le-primary)'
  },
  quizResultsTitle: {
    fontSize: '1.3rem',
    fontWeight: '700',
    marginBottom: 'var(--le-spacing-md)',
    color: 'var(--le-text)'
  },
  scoreBar: {
    width: '100%',
    height: '12px',
    backgroundColor: 'var(--le-border)',
    borderRadius: '100px',
    overflow: 'hidden',
    marginBottom: 'var(--le-spacing-md)'
  },
  scoreBarFill: {
    height: '100%',
    backgroundColor: 'var(--le-success)',
    transition: 'width 0.5s ease'
  },
  scoreText: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: 'var(--le-primary)',
    marginBottom: 'var(--le-spacing-md)'
  },
  resultsMessage: {
    fontSize: '0.95rem',
    color: 'var(--le-text-secondary)',
    marginBottom: 'var(--le-spacing-md)',
    lineHeight: '1.6'
  },
  quizRestartButton: {
    backgroundColor: 'var(--le-primary)',
    color: 'white',
    padding: '12px 28px',
    fontSize: '0.95rem',
    fontWeight: '600',
    border: 'none',
    borderRadius: 'var(--le-border-radius)',
    cursor: 'pointer',
    marginTop: 'var(--le-spacing-md)'
  },

  // FAQ
  faqContainer: {
    maxWidth: '900px',
    margin: '0 auto'
  },
  faqItem: {
    borderBottom: '1px solid var(--le-border)',
    marginBottom: 'var(--le-spacing-md)'
  },
  faqButton: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 'var(--le-spacing-md) 0',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1.05rem',
    fontWeight: '600',
    color: 'var(--le-text)',
    textAlign: 'left',
    transition: 'color 0.2s ease'
  },
  faqQuestion: {
    flex: 1
  },
  faqChevron: {
    display: 'flex',
    alignItems: 'center',
    color: 'var(--le-primary)',
    transition: 'transform 0.3s ease',
    marginLeft: 'var(--le-spacing-md)',
    flexShrink: 0
  },
  faqChevronOpen: {
    transform: 'rotate(180deg)'
  },
  faqAnswer: {
    paddingBottom: 'var(--le-spacing-md)',
    animation: 'slideDown 0.3s ease'
  },

  // CTA Section
  ctaSection: {
    textAlign: 'center',
    color: 'white'
  },
  ctaTitle: {
    fontSize: 'clamp(1.8rem, 5vw, 2.5rem)',
    fontWeight: '700',
    marginBottom: 'var(--le-spacing-md)'
  },
  ctaDescription: {
    fontSize: '1.1rem',
    marginBottom: 'var(--le-spacing-lg)',
    opacity: '0.95',
    maxWidth: '600px',
    margin: '0 auto var(--le-spacing-lg)'
  },
  ctaForm: {
    display: 'flex',
    gap: 'var(--le-spacing-sm)',
    maxWidth: '500px',
    margin: '0 auto var(--le-spacing-md)',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  ctaInput: {
    flex: 1,
    minWidth: '250px',
    padding: '14px 16px',
    fontSize: '1rem',
    borderRadius: 'var(--le-border-radius)',
    border: 'none',
    outline: 'none'
  },
  ctaSubmitButton: {
    backgroundColor: 'white',
    color: 'var(--le-primary)',
    padding: '14px 28px',
    fontSize: '1rem',
    fontWeight: '600',
    border: 'none',
    borderRadius: 'var(--le-border-radius)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    whiteSpace: 'nowrap'
  },
  ctaPrivacy: {
    fontSize: '0.85rem',
    opacity: '0.8'
  },

  // Footer CTA
  footerCta: {
    textAlign: 'center',
    padding: 'var(--le-spacing-xl)',
    backgroundColor: 'white',
    borderRadius: 'var(--le-border-radius)',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
    border: '2px solid var(--le-primary)'
  },
  footerCtaTitle: {
    fontSize: '2rem',
    fontWeight: '700',
    marginBottom: 'var(--le-spacing-md)',
    color: 'var(--le-text)'
  },
  footerCtaDescription: {
    fontSize: '1.05rem',
    color: 'var(--le-text-secondary)',
    marginBottom: 'var(--le-spacing-lg)',
    lineHeight: '1.6'
  },
  footerCtaButton: {
    backgroundColor: 'var(--le-primary)',
    color: 'white',
    padding: '14px 40px',
    fontSize: '1rem',
    fontWeight: '600',
    border: 'none',
    borderRadius: 'var(--le-border-radius)',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  }
};

export default MultiGenerationalLivingPage;
