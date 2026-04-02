'use client';

import React, { useState, useMemo } from 'react';

// SVG Icons defined inline
const CheckmarkIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

const HomeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    <polyline points="9 22 9 12 15 12 15 22"></polyline>
  </svg>
);

const SearchIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8"></circle>
    <path d="m21 21-4.35-4.35"></path>
  </svg>
);

const ShieldIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
  </svg>
);

const HeartIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
  </svg>
);

const StarIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <polygon points="12 2 15.09 10.26 24 10.26 17.55 16.48 19.64 24.74 12 19.52 4.36 24.74 6.45 16.48 0 10.26 8.91 10.26 12 2"></polygon>
  </svg>
);

const TrendingUpIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 17"></polyline>
    <polyline points="17 6 23 6 23 12"></polyline>
  </svg>
);

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

interface AmenityItem {
  id: string;
  name: string;
  category: string;
}

export default function LuxuryHomeBuyingPage() {
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
  const [selectedAmenities, setSelectedAmenities] = useState<Set<string>>(new Set());
  const [showCaptureForm, setShowCaptureForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const faqItems: FAQItem[] = [
    {
      id: 'faq-1',
      question: 'What price range qualifies as a luxury home?',
      answer: 'Luxury homes typically start at $1-2 million and can exceed $10+ million depending on location. In major markets like New York, Los Angeles, and Miami, luxury begins around $2-5 million. However, it\u2019s more about amenities, location, and exclusivity than pure price point.'
    },
    {
      id: 'faq-2',
      question: 'How do I access pocket listings and off-market deals?',
      answer: 'Pocket listings are exclusively available through luxury real estate agents with strong networks. Your agent must have established relationships with other luxury brokers. Building this network takes years. We recommend working with an agent who specializes in your target neighborhood and has demonstrated access to these exclusive opportunities.'
    },
    {
      id: 'faq-3',
      question: 'What\u2019s the difference between a jumbo loan and a portfolio loan?',
      answer: 'Jumbo loans are conforming loans that exceed traditional loan limits (typically above $766,550). Portfolio loans are held by lenders and have more flexible guidelines. Portfolio loans often offer lower rates but require larger down payments and higher credit scores. Choose based on your financial profile and the property\u2019s specific characteristics.'
    },
    {
      id: 'faq-4',
      question: 'How can I purchase a luxury property anonymously?',
      answer: 'You can use a trust, LLC, or other legal entity to purchase a property anonymously. This protects privacy but requires legal and tax consultation. Many luxury buyers use this strategy for security or discretion. Work with a real estate attorney and tax professional to structure the purchase correctly.'
    },
    {
      id: 'faq-5',
      question: 'What structural inspections are critical for luxury homes?',
      answer: 'Beyond standard inspections, luxury homes need: foundation engineering review, specialized HVAC and smart home systems inspection, pool/spa engineering assessment, wine cellar climate control review, and seismic assessments in earthquake zones. Budget $5,000-$15,000+ for comprehensive luxury inspections.'
    },
    {
      id: 'faq-6',
      question: 'How do 1031 exchanges work with luxury properties?',
      answer: 'A 1031 exchange allows you to defer capital gains taxes by reinvesting in a like-kind property. Luxury properties qualify, but strict timelines apply: you have 45 days to identify replacements and 180 days to close. Work with a qualified intermediary and tax advisor to ensure compliance and maximize tax benefits.'
    },
    {
      id: 'faq-7',
      question: 'What\u2019s included in lifestyle concierge services?',
      answer: 'Premium concierge services handle relocation logistics, private school enrollment, country club memberships, household staff hiring, interior design referrals, and more. Many luxury communities include these as amenities. Standalone services charge $500-$5,000+ monthly depending on service scope.'
    },
    {
      id: 'faq-8',
      question: 'How important is title insurance for luxury properties?',
      answer: 'Title insurance is essential for all properties, including luxury homes. For high-value purchases, ensure you have an updated title search covering several decades and consider enhanced coverage. The cost is minimal compared to property value but provides crucial protection against title claims.'
    }
  ];

  const amenitiesData: AmenityItem[] = [
    { id: 'pool', name: 'Resort-Style Pool & Spa', category: 'Outdoor Living' },
    { id: 'wine', name: 'Climate-Controlled Wine Cellar', category: 'Entertainment' },
    { id: 'theater', name: 'Private Home Theater', category: 'Entertainment' },
    { id: 'gym', name: 'Fitness Center & Spa', category: 'Wellness' },
    { id: 'sauna', name: 'Sauna & Steam Room', category: 'Wellness' },
    { id: 'smart', name: 'Smart Home Automation', category: 'Technology' },
    { id: 'security', name: '24/7 Security System', category: 'Security' },
    { id: 'elevator', name: 'Private Elevator', category: 'Convenience' },
    { id: 'chef', name: 'Chef\u2019s Kitchen & Pantry', category: 'Culinary' },
    { id: 'guest', name: 'Guest House', category: 'Space' },
    { id: 'garage', name: 'Climate-Controlled Garage', category: 'Space' },
    { id: 'studio', name: 'Art Studio or Creative Space', category: 'Space' },
    { id: 'court', name: 'Tennis or Sports Court', category: 'Recreation' },
    { id: 'helipad', name: 'Helipad Access', category: 'Luxury' },
    { id: 'aquarium', name: 'Custom Aquarium', category: 'Luxury' },
  ];

  const toggleAmenity = (id: string) => {
    const newSelected = new Set(selectedAmenities);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedAmenities(newSelected);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    console.log('Form submitted:', formData);
    setFormSubmitted(true);
    setTimeout(() => {
      setShowCaptureForm(false);
      setFormData({ name: '', email: '', phone: '' });
      setFormSubmitted(false);
    }, 2000);
  };

  const selectedAmenityCount = selectedAmenities.size;
  const amenityCategories = useMemo(() => {
    const categories: { [key: string]: AmenityItem[] } = {};
    amenitiesData.forEach(item => {
      if (!categories[item.category]) {
        categories[item.category] = [];
      }
      categories[item.category].push(item);
    });
    return categories;
  }, []);

  return (
    <div style={{ fontFamily: 'var(--le-font-family, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif)' }}>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, var(--le-primary, #1a3a52) 0%, var(--le-secondary, #2d5f7f) 100%)',
        color: 'var(--le-text-light, #ffffff)',
        padding: '120px 20px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '900px', margin: '0 auto' }}>
          <h1 style={{
            fontSize: '52px',
            fontWeight: '300',
            letterSpacing: '0.5px',
            marginBottom: '20px',
            lineHeight: '1.2'
          }}>
            The Art of Luxury Home Acquisition
          </h1>
          <p style={{
            fontSize: '20px',
            fontWeight: '300',
            marginBottom: '40px',
            opacity: '0.95',
            lineHeight: '1.6'
          }}>
            Navigate the nuanced world of high-end real estate with white-glove expertise and discretion.
          </p>
          <button onClick={() => setShowCaptureForm(true)} style={{
            background: 'var(--le-accent, #c89c5c)',
            color: 'var(--le-primary, #1a3a52)',
            border: 'none',
            padding: '16px 48px',
            fontSize: '16px',
            fontWeight: '600',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
          }}>
            Connect with a Specialist
          </button>
        </div>
      </section>

      {/* What Defines Luxury */}
      <section style={{
        padding: '80px 20px',
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        <h2 style={{
          fontSize: '42px',
          fontWeight: '300',
          marginBottom: '60px',
          textAlign: 'center',
          color: 'var(--le-primary, #1a3a52)',
        }}>
          What Defines Luxury Real Estate
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '40px',
          marginBottom: '60px',
        }}>
          {[
            {
              icon: HomeIcon,
              title: 'Price Point',
              description: 'Typically $1M-$10M+, varies by location. In premier markets like Aspen, Beverly Hills, and Miami Beach, luxury begins at $2M+.',
            },
            {
              icon: SearchIcon,
              title: 'Exclusivity & Location',
              description: 'Gated communities, prestigious neighborhoods, waterfront access, or mountain views. Location history and architectural significance matter.',
            },
            {
              icon: HeartIcon,
              title: 'Amenities & Design',
              description: 'Smart home technology, resort-style pools, wine cellars, private theaters, and bespoke finishes by renowned designers.',
            },
            {
              icon: ShieldIcon,
              title: 'Privacy & Security',
              description: 'Gated access, security systems, NDA protections, anonymous purchasing options, and discretionary representation.',
            },
            {
              icon: StarIcon,
              title: 'Lifestyle Elements',
              description: 'Club memberships, concierge services, proximity to fine dining, cultural institutions, and exclusive community amenities.',
            },
            {
              icon: TrendingUpIcon,
              title: 'Investment Potential',
              description: 'Strong appreciation history, limited supply, desirable market trends, and tax-advantaged ownership structures.',
            },
          ].map((item, idx) => (
            <div key={idx} style={{
              padding: '30px',
              background: 'var(--le-bg-light, #f8f9fa)',
              borderRadius: '8px',
              border: '1px solid var(--le-border, #e0e0e0)',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.08)';
              e.currentTarget.style.transform = 'translateY(-4px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.transform = 'translateY(0)';
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                background: 'var(--le-accent, #c89c5c)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                marginBottom: '20px',
              }}>
                <item.icon />
              </div>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '600',
                marginBottom: '12px',
                color: 'var(--le-primary, #1a3a52)',
              }}>
                {item.title}
              </h3>
              <p style={{
                color: 'var(--le-text-muted, #666)',
                lineHeight: '1.6',
                fontSize: '15px',
              }}>
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Finding Luxury Properties */}
      <section style={{
        padding: '80px 20px',
        background: 'var(--le-bg-light, #f8f9fa)',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '42px',
            fontWeight: '300',
            marginBottom: '60px',
            textAlign: 'center',
            color: 'var(--le-primary, #1a3a52)',
          }}>
            Finding Your Luxury Property
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '60px',
            alignItems: 'center',
          }}>
            <div>
              <h3 style={{
                fontSize: '28px',
                fontWeight: '500',
                marginBottom: '24px',
                color: 'var(--le-primary, #1a3a52)',
              }}>
                Off-Market & Pocket Listings
              </h3>
              <p style={{
                color: 'var(--le-text-muted, #666)',
                lineHeight: '1.7',
                marginBottom: '20px',
                fontSize: '15px',
              }}>
                The most exclusive luxury properties never hit the open market. Pocket listings—available only to select agents and their networks—represent 30-40% of high-end transactions. Access requires:
              </p>
              <ul style={{
                listStyle: 'none',
                padding: '0',
                margin: '0',
              }}>
                {[
                  'Representation by a top-tier luxury agent',
                  'Established relationships within broker networks',
                  'Demonstrated purchasing power and serious intent',
                  'Discretion and confidentiality agreements',
                ].map((item, idx) => (
                  <li key={idx} style={{
                    padding: '12px 0',
                    paddingLeft: '32px',
                    position: 'relative',
                    color: 'var(--le-text-muted, #666)',
                    fontSize: '15px',
                    lineHeight: '1.6',
                  }}>
                    <span style={{
                      position: 'absolute',
                      left: '0',
                      top: '14px',
                      color: 'var(--le-accent, #c89c5c)',
                    }}>
                      <CheckmarkIcon />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div style={{
              background: 'linear-gradient(135deg, #f5f1e8 0%, #ece5d9 100%)',
              borderRadius: '12px',
              padding: '40px',
              textAlign: 'center',
            }}>
              <div style={{
                fontSize: '48px',
                fontWeight: '300',
                marginBottom: '12px',
                color: 'var(--le-primary, #1a3a52)',
              }}>
                30-40%
              </div>
              <p style={{
                color: 'var(--le-text-muted, #666)',
                fontSize: '15px',
                marginBottom: '24px',
              }}>
                of luxury transactions involve pocket listings
              </p>
              <div style={{
                fontSize: '14px',
                color: 'var(--le-text-muted, #666)',
                lineHeight: '1.7',
                background: 'rgba(255, 255, 255, 0.6)',
                padding: '20px',
                borderRadius: '8px',
              }}>
                Luxury agents invest years building networks to unlock these exclusive opportunities. Your agent\u2019s reputation and connections directly impact deal access.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Due Diligence */}
      <section style={{
        padding: '80px 20px',
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        <h2 style={{
          fontSize: '42px',
          fontWeight: '300',
          marginBottom: '60px',
          textAlign: 'center',
          color: 'var(--le-primary, #1a3a52)',
        }}>
          Due Diligence for High-End Properties
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '30px',
        }}>
          {[
            {
              title: 'Structural & Foundation',
              items: ['Engineering inspection', 'Seismic assessment', 'Subsidence evaluation', 'Water damage assessment'],
              cost: '$3,000-$8,000',
            },
            {
              title: 'Smart Home & Systems',
              items: ['Integrated home automation', 'HVAC & climate control', 'Security system integration', 'Energy efficiency audit'],
              cost: '$2,000-$5,000',
            },
            {
              title: 'Outdoor Living',
              items: ['Pool & spa engineering', 'Landscape assessment', 'Irrigation systems', 'Hardscape durability'],
              cost: '$2,000-$6,000',
            },
            {
              title: 'Specialized Features',
              items: ['Wine cellar climate systems', 'Theater acoustics & equipment', 'Custom lighting design', 'Home automation protocols'],
              cost: '$2,000-$4,000',
            },
            {
              title: 'Environmental',
              items: ['Air quality testing', 'Mold & asbestos screening', 'Radon assessment', 'Underground storage tanks'],
              cost: '$1,500-$3,500',
            },
            {
              title: 'Title & Legal',
              items: ['Extended title search', 'Lien investigations', 'HOA review', 'Easement analysis'],
              cost: '$1,000-$2,500',
            },
          ].map((category, idx) => (
            <div key={idx} style={{
              padding: '28px',
              background: 'var(--le-bg-light, #f8f9fa)',
              borderRadius: '8px',
              border: '1px solid var(--le-border, #e0e0e0)',
            }}>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                marginBottom: '16px',
                color: 'var(--le-primary, #1a3a52)',
              }}>
                {category.title}
              </h3>
              <ul style={{
                listStyle: 'none',
                padding: '0',
                margin: '0 0 20px 0',
              }}>
                {category.items.map((item, itemIdx) => (
                  <li key={itemIdx} style={{
                    padding: '8px 0',
                    fontSize: '14px',
                    color: 'var(--le-text-muted, #666)',
                    paddingLeft: '20px',
                    position: 'relative',
                  }}>
                    <span style={{
                      position: 'absolute',
                      left: '0',
                      color: 'var(--le-accent, #c89c5c)',
                    }}>
                      •
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <div style={{
                paddingTop: '16px',
                borderTop: '1px solid var(--le-border, #e0e0e0)',
                fontSize: '14px',
                fontWeight: '600',
                color: 'var(--le-accent, #c89c5c)',
              }}>
                Est. {category.cost}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Financing */}
      <section style={{
        padding: '80px 20px',
        background: 'var(--le-primary, #1a3a52)',
        color: 'var(--le-text-light, #ffffff)',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '42px',
            fontWeight: '300',
            marginBottom: '60px',
            textAlign: 'center',
          }}>
            Financing Luxury Properties
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '40px',
          }}>
            {[
              {
                title: 'Jumbo Loans',
                description: 'Traditional mortgages exceeding conforming loan limits ($766,550+). Offered by major lenders with competitive rates.',
                details: [
                  'Require 20-25% down payment',
                  '750+ credit score typical',
                  'Rates slightly above conventional',
                  'Full documentation required',
                ],
              },
              {
                title: 'Portfolio Loans',
                description: 'Loans held by lenders rather than sold. More flexible guidelines for unique properties or situations.',
                details: [
                  'Asset-based lending options',
                  'Lower documentation requirements',
                  'Flexible property types accepted',
                  'Larger down payments (30-40%)',
                ],
              },
              {
                title: 'Asset-Based Lending',
                description: 'Loan amounts based on liquid assets rather than income. Ideal for high net-worth individuals with variable income.',
                details: [
                  'Uses investment portfolio as collateral',
                  'Flexible income documentation',
                  'Loan amounts up to 65-80% of assets',
                  'Rates competitive with portfolio loans',
                ],
              },
              {
                title: 'Private Money',
                description: 'Financing from private investors or alternative lenders. Quick approval and flexible terms.',
                details: [
                  'Fast closing (7-14 days)',
                  'Flexible underwriting standards',
                  'Higher interest rates (6-12%+)',
                  'Useful for bridge financing',
                ],
              },
              {
                title: 'Cash + Secondary',
                description: 'Strategic combination of cash down payment with secondary financing for tax efficiency.',
                details: [
                  'Leverages interest deduction benefits',
                  'Reduces capital gains impact',
                  'Maintains liquidity',
                  'Tax-optimized structure',
                ],
              },
              {
                title: 'Owner Financing',
                description: 'Seller provides financing, common in unique or difficult-to-finance properties.',
                details: [
                  'Negotiated terms & rates',
                  'Faster closing possible',
                  'Reduced bank requirements',
                  'Creative deal structures',
                ],
              },
            ].map((option, idx) => (
              <div key={idx} style={{
                padding: '32px',
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
              }}>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  marginBottom: '12px',
                }}>
                  {option.title}
                </h3>
                <p style={{
                  marginBottom: '20px',
                  lineHeight: '1.6',
                  fontSize: '15px',
                  opacity: '0.9',
                }}>
                  {option.description}
                </p>
                <ul style={{
                  listStyle: 'none',
                  padding: '0',
                  margin: '0',
                }}>
                  {option.details.map((detail, detailIdx) => (
                    <li key={detailIdx} style={{
                      padding: '8px 0',
                      paddingLeft: '20px',
                      position: 'relative',
                      fontSize: '14px',
                      opacity: '0.85',
                    }}>
                      <span style={{
                        position: 'absolute',
                        left: '0',
                        color: 'var(--le-accent, #c89c5c)',
                      }}>
                        •
                      </span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy & Security */}
      <section style={{
        padding: '80px 20px',
        background: 'var(--le-bg-light, #f8f9fa)',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '42px',
            fontWeight: '300',
            marginBottom: '60px',
            textAlign: 'center',
            color: 'var(--le-primary, #1a3a52)',
          }}>
            Privacy, Security & Discretion
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '50px',
            alignItems: 'start',
          }}>
            <div>
              <h3 style={{
                fontSize: '26px',
                fontWeight: '500',
                marginBottom: '28px',
                color: 'var(--le-primary, #1a3a52)',
              }}>
                Protecting Your Identity
              </h3>
              {[
                {
                  title: 'Anonymous Purchases',
                  description: 'Use trusts, LLCs, or holding companies to mask your identity. Requires legal structuring but maintains complete privacy.',
                },
                {
                  title: 'NDAs & Confidentiality',
                  description: 'Binding agreements prevent disclosure of property details, sale price, or negotiations. Standard in high-profile transactions.',
                },
                {
                  title: 'Private Showings',
                  description: 'Exclusive appointments outside regular hours. Third-party agents represent you to prevent direct contact.',
                },
                {
                  title: 'Blind Bidding',
                  description: 'Submit offers without revealing identity. Seller accepts based on terms only, not who you are.',
                },
              ].map((item, idx) => (
                <div key={idx} style={{ marginBottom: '32px' }}>
                  <h4 style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    marginBottom: '8px',
                    color: 'var(--le-primary, #1a3a52)',
                  }}>
                    {item.title}
                  </h4>
                  <p style={{
                    color: 'var(--le-text-muted, #666)',
                    fontSize: '14px',
                    lineHeight: '1.6',
                  }}>
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
            <div>
              <h3 style={{
                fontSize: '26px',
                fontWeight: '500',
                marginBottom: '28px',
                color: 'var(--le-primary, #1a3a52)',
              }}>
                Security Features
              </h3>
              {[
                {
                  title: 'Gated Access & Perimeter',
                  description: 'Private entrance, monitored gates, and controlled driveway access. Multiple barrier layers for protection.',
                },
                {
                  title: '24/7 Security Systems',
                  description: 'Professional monitoring, armed response, video surveillance, and panic buttons. Integrated with smart home.',
                },
                {
                  title: 'Safe Rooms & Panic Rooms',
                  description: 'Reinforced rooms with independent communications, air filtration, and supplies. Accessible from multiple points.',
                },
                {
                  title: 'Staff Vetting & Clearances',
                  description: 'Background checks for household staff, contractors, and vendors. NDAs and security clearance requirements standard.',
                },
              ].map((item, idx) => (
                <div key={idx} style={{ marginBottom: '32px' }}>
                  <h4 style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    marginBottom: '8px',
                    color: 'var(--le-primary, #1a3a52)',
                  }}>
                    {item.title}
                  </h4>
                  <p style={{
                    color: 'var(--le-text-muted, #666)',
                    fontSize: '14px',
                    lineHeight: '1.6',
                  }}>
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Amenities Checklist */}
      <section style={{
        padding: '80px 20px',
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        <h2 style={{
          fontSize: '42px',
          fontWeight: '300',
          marginBottom: '60px',
          textAlign: 'center',
          color: 'var(--le-primary, #1a3a52)',
        }}>
          Luxury Amenities Checklist
        </h2>
        <div style={{
          marginBottom: '40px',
          textAlign: 'center',
        }}>
          <p style={{
            fontSize: '16px',
            color: 'var(--le-text-muted, #666)',
            marginBottom: '20px',
          }}>
            Selected: {selectedAmenityCount} of {amenitiesData.length} amenities
          </p>
          <div style={{
            height: '4px',
            background: 'var(--le-border, #e0e0e0)',
            borderRadius: '2px',
            overflow: 'hidden',
            maxWidth: '300px',
            margin: '0 auto',
          }}>
            <div style={{
              height: '100%',
              background: 'var(--le-accent, #c89c5c)',
              width: `${(selectedAmenityCount / amenitiesData.length) * 100}%`,
              transition: 'width 0.3s ease',
            }} />
          </div>
        </div>
        {Object.entries(amenityCategories).map(([category, items]) => (
          <div key={category} style={{ marginBottom: '40px' }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              marginBottom: '16px',
              color: 'var(--le-primary, #1a3a52)',
              paddingBottom: '12px',
              borderBottom: '2px solid var(--le-border, #e0e0e0)',
            }}>
              {category}
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '16px',
            }}>
              {items.map(item => (
                <label key={item.id} style={{
                  padding: '16px',
                  background: selectedAmenities.has(item.id) ? 'var(--le-accent, #c89c5c)' : 'var(--le-bg-light, #f8f9fa)',
                  borderRadius: '6px',
                  border: '1px solid ' + (selectedAmenities.has(item.id) ? 'var(--le-accent, #c89c5c)' : 'var(--le-border, #e0e0e0)'),
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  transition: 'all 0.2s ease',
                  userSelect: 'none',
                }} onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
                }} onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'none';
                }}>
                  <input
                    type="checkbox"
                    checked={selectedAmenities.has(item.id)}
                    onChange={() => toggleAmenity(item.id)}
                    style={{
                      width: '18px',
                      height: '18px',
                      cursor: 'pointer',
                    }}
                  />
                  <span style={{
                    fontSize: '15px',
                    fontWeight: '500',
                    color: selectedAmenities.has(item.id) ? 'white' : 'var(--le-primary, #1a3a52)',
                  }}>
                    {item.name}
                  </span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Investment Considerations */}
      <section style={{
        padding: '80px 20px',
        background: 'linear-gradient(135deg, var(--le-primary, #1a3a52) 0%, #3d6b8f 100%)',
        color: 'var(--le-text-light, #ffffff)',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '42px',
            fontWeight: '300',
            marginBottom: '60px',
            textAlign: 'center',
          }}>
            Investment Considerations
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '40px',
          }}>
            {[
              {
                title: 'Market Appreciation',
                points: [
                  'Luxury markets appreciate 3-5% annually on average',
                  'Limited supply in premier locations drives value',
                  'Unique properties hold value better than standard homes',
                  'Off-market deal access reduces risk of overpayment',
                ],
              },
              {
                title: 'Tax Efficiency',
                points: [
                  'Mortgage interest deduction up to $750,000 loan amount',
                  'Property tax deductions (subject to SALT caps)',
                  'Capital gains planning for future sales',
                  'Estate planning benefits through trusts',
                ],
              },
              {
                title: '1031 Exchanges',
                points: [
                  'Defer capital gains taxes by reinvesting in like-kind property',
                  '45-day identification period after sale',
                  '180-day closing period on replacement property',
                  'Strategic timing maximizes tax benefits',
                ],
              },
              {
                title: 'Portfolio Diversification',
                points: [
                  'Real estate hedge against market volatility',
                  'Inflation protection through appreciating asset',
                  'Tangible asset with usage value and enjoyment',
                  'Geographic diversification across multiple properties',
                ],
              },
            ].map((section, idx) => (
              <div key={idx} style={{
                padding: '32px',
                background: 'rgba(255, 255, 255, 0.08)',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.15)',
              }}>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  marginBottom: '20px',
                }}>
                  {section.title}
                </h3>
                <ul style={{
                  listStyle: 'none',
                  padding: '0',
                  margin: '0',
                }}>
                  {section.points.map((point, pointIdx) => (
                    <li key={pointIdx} style={{
                      padding: '10px 0',
                      paddingLeft: '24px',
                      position: 'relative',
                      fontSize: '14px',
                      lineHeight: '1.6',
                      opacity: '0.9',
                    }}>
                      <span style={{
                        position: 'absolute',
                        left: '0',
                        color: 'var(--le-accent, #c89c5c)',
                      }}>
                        ✓
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lifestyle Concierge */}
      <section style={{
        padding: '80px 20px',
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        <h2 style={{
          fontSize: '42px',
          fontWeight: '300',
          marginBottom: '60px',
          textAlign: 'center',
          color: 'var(--le-primary, #1a3a52)',
        }}>
          White-Glove Lifestyle Services
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '40px',
        }}>
          {[
            {
              title: 'Relocation Services',
              description: 'Full-service moving coordination, international logistics, temporary housing, and settlement assistance.',
            },
            {
              title: 'Private School Enrollment',
              description: 'Connections to top preparatory and private schools. Admissions guidance and legacy benefits leveraging.',
            },
            {
              title: 'Country Club Memberships',
              description: 'Access to exclusive golf, yacht, and country clubs. Membership sponsorships and initiation coordination.',
            },
            {
              title: 'Household Staff Placement',
              description: 'Vetted chef, housekeeping, nanny, and estate manager hiring. Background checks and NDA management.',
            },
            {
              title: 'Design & Architecture',
              description: 'Connections to renowned architects and interior designers. Renovation and custom build coordination.',
            },
            {
              title: 'Travel & Concierge',
              description: 'Private jet charter, luxury travel planning, yacht rentals, and exclusive event access worldwide.',
            },
            {
              title: 'Wealth Management',
              description: 'Referrals to private wealth advisors, tax strategists, and estate planning attorneys.',
            },
            {
              title: 'Security Consulting',
              description: 'Security system design, staff vetting protocols, insurance optimization, and threat assessment.',
            },
            {
              title: 'Art & Collectibles',
              description: 'Gallery connections, valuation services, appraisals, and curation for investment pieces.',
            },
          ].map((service, idx) => (
            <div key={idx} style={{
              padding: '28px',
              background: 'var(--le-bg-light, #f8f9fa)',
              borderRadius: '8px',
              border: '1px solid var(--le-border, #e0e0e0)',
              textAlign: 'center',
            }}>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                marginBottom: '12px',
                color: 'var(--le-primary, #1a3a52)',
              }}>
                {service.title}
              </h3>
              <p style={{
                color: 'var(--le-text-muted, #666)',
                fontSize: '14px',
                lineHeight: '1.6',
                margin: '0',
              }}>
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section style={{
        padding: '80px 20px',
        background: 'var(--le-bg-light, #f8f9fa)',
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '42px',
            fontWeight: '300',
            marginBottom: '60px',
            textAlign: 'center',
            color: 'var(--le-primary, #1a3a52)',
          }}>
            Frequently Asked Questions
          </h2>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}>
            {faqItems.map(item => (
              <div key={item.id} style={{
                background: 'white',
                borderRadius: '6px',
                border: '1px solid var(--le-border, #e0e0e0)',
                overflow: 'hidden',
              }}>
                <button onClick={() => setExpandedFAQ(expandedFAQ === item.id ? null : item.id)} style={{
                  width: '100%',
                  padding: '20px',
                  background: 'white',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '16px',
                  fontWeight: '500',
                  color: 'var(--le-primary, #1a3a52)',
                  transition: 'background 0.2s ease',
                }}>
                  <span>{item.question}</span>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '24px',
                    height: '24px',
                    color: 'var(--le-accent, #c89c5c)',
                    transition: 'transform 0.3s ease',
                    transform: expandedFAQ === item.id ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}>
                    <ChevronDownIcon />
                  </div>
                </button>
                {expandedFAQ === item.id && (
                  <div style={{
                    padding: '20px 20px',
                    borderTop: '1px solid var(--le-border, #e0e0e0)',
                    background: 'rgba(200, 156, 92, 0.02)',
                    fontSize: '15px',
                    lineHeight: '1.7',
                    color: 'var(--le-text-muted, #666)',
                  }}>
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{
        padding: '100px 20px',
        background: 'linear-gradient(135deg, var(--le-primary, #1a3a52) 0%, var(--le-secondary, #2d5f7f) 100%)',
        color: 'var(--le-text-light, #ffffff)',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '42px',
            fontWeight: '300',
            marginBottom: '24px',
            lineHeight: '1.2',
          }}>
            Ready to Acquire Your Luxury Home?
          </h2>
          <p style={{
            fontSize: '18px',
            marginBottom: '40px',
            opacity: '0.95',
            lineHeight: '1.6',
          }}>
            Connect with our specialists who understand the nuances of high-end real estate acquisition, from pocket listings to financing strategies.
          </p>
          <button onClick={() => setShowCaptureForm(true)} style={{
            background: 'var(--le-accent, #c89c5c)',
            color: 'var(--le-primary, #1a3a52)',
            border: 'none',
            padding: '18px 52px',
            fontSize: '16px',
            fontWeight: '600',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
          }}>
            Connect with a Specialist
          </button>
        </div>
      </section>

      {/* Lead Capture Modal */}
      {showCaptureForm && (
        <div style={{
          position: 'fixed',
          top: '0',
          left: '0',
          right: '0',
          bottom: '0',
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: '1000',
          padding: '20px',
        }}>
          <div style={{
            background: 'white',
            borderRadius: '8px',
            padding: '40px',
            maxWidth: '500px',
            width: '100%',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
          }}>
            {!formSubmitted ? (
              <>
                <h3 style={{
                  fontSize: '28px',
                  fontWeight: '300',
                  marginBottom: '12px',
                  color: 'var(--le-primary, #1a3a52)',
                }}>
                  Connect With a Specialist
                </h3>
                <p style={{
                  color: 'var(--le-text-muted, #666)',
                  marginBottom: '32px',
                  fontSize: '15px',
                  lineHeight: '1.6',
                }}>
                  Our luxury home specialists will reach out within 24 hours to discuss your property goals.
                </p>
                <form onSubmit={handleFormSubmit} style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                }}>
                  <div>
                    <label style={{
                      display: 'block',
                      marginBottom: '8px',
                      fontSize: '14px',
                      fontWeight: '500',
                      color: 'var(--le-primary, #1a3a52)',
                    }}>
                      Full Name
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
                        border: '1px solid var(--le-border, #e0e0e0)',
                        borderRadius: '4px',
                        fontSize: '15px',
                        fontFamily: 'inherit',
                        boxSizing: 'border-box',
                      }}
                      placeholder="John Smith"
                    />
                  </div>
                  <div>
                    <label style={{
                      display: 'block',
                      marginBottom: '8px',
                      fontSize: '14px',
                      fontWeight: '500',
                      color: 'var(--le-primary, #1a3a52)',
                    }}>
                      Email Address
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
                        border: '1px solid var(--le-border, #e0e0e0)',
                        borderRadius: '4px',
                        fontSize: '15px',
                        fontFamily: 'inherit',
                        boxSizing: 'border-box',
                      }}
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label style={{
                      display: 'block',
                      marginBottom: '8px',
                      fontSize: '14px',
                      fontWeight: '500',
                      color: 'var(--le-primary, #1a3a52)',
                    }}>
                      Phone Number
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
                        border: '1px solid var(--le-border, #e0e0e0)',
                        borderRadius: '4px',
                        fontSize: '15px',
                        fontFamily: 'inherit',
                        boxSizing: 'border-box',
                      }}
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  <button type="submit" style={{
                    background: 'var(--le-accent, #c89c5c)',
                    color: 'white',
                    border: 'none',
                    padding: '14px',
                    borderRadius: '4px',
                    fontSize: '15px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    marginTop: '16px',
                    transition: 'all 0.3s ease',
                  }}>
                    Connect with Specialist
                  </button>
                  <button type="button" onClick={() => setShowCaptureForm(false)} style={{
                    background: 'transparent',
                    color: 'var(--le-text-muted, #666)',
                    border: 'none',
                    padding: '12px',
                    cursor: 'pointer',
                    fontSize: '14px',
                  }}>
                    Cancel
                  </button>
                </form>
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div style={{
                  fontSize: '48px',
                  marginBottom: '16px',
                  color: 'var(--le-accent, #c89c5c)',
                }}>
                  ✓
                </div>
                <h4 style={{
                  fontSize: '22px',
                  marginBottom: '12px',
                  color: 'var(--le-primary, #1a3a52)',
                }}>
                  Thank You!
                </h4>
                <p style={{
                  color: 'var(--le-text-muted, #666)',
                  marginBottom: '24px',
                  fontSize: '15px',
                }}>
                  We\u2019ll connect you with a specialist within 24 hours.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
