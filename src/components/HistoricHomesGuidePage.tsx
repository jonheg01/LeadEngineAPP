'use client';

import React, { useState } from 'react';

const HistoricHomesGuidePage = () => {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [showMainForm, setShowMainForm] = useState(false);
  const [mainFormData, setMainFormData] = useState({
    name: '',
    email: '',
    phone: '',
    propertyAge: '',
    interestArea: '',
  });
  const [estimatorData, setEstimatorData] = useState({
    homeAge: 1950,
    condition: 'fair',
  });
  const [estimatedCost, setEstimatedCost] = useState<number | null>(null);

  const handleMainFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setMainFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleMainFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', mainFormData);
    setShowMainForm(false);
    setMainFormData({ name: '', email: '', phone: '', propertyAge: '', interestArea: '' });
  };

  const calculateEstimatedCost = () => {
    const { homeAge, condition } = estimatorData;
    const ageInYears = new Date().getFullYear() - homeAge;

    let baseCost = 5000;
    if (ageInYears > 100) baseCost = 12000;
    else if (ageInYears > 80) baseCost = 9000;
    else if (ageInYears > 60) baseCost = 7000;

    const conditionMultiplier = {
      excellent: 0.6,
      good: 0.85,
      fair: 1.2,
      poor: 1.8,
    }[condition] || 1.2;

    const total = Math.round(baseCost * conditionMultiplier);
    setEstimatedCost(total);
  };

  const handleEstimatorChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEstimatorData(prev => ({
      ...prev,
      [name]: name === 'homeAge' ? parseInt(value) : value,
    }));
  };

  const faqItems = [
    {
      question: 'What qualifies a home as historic?',
      answer: 'A home is typically considered historic if it is at least 50 years old and listed on the National Register of Historic Places, or designated by local or state preservation authorities. Some properties qualify based on architectural significance or historical importance even if they\u2019re younger.',
    },
    {
      question: 'Can I modernize a historic home?',
      answer: 'Yes, but modifications must often comply with historic preservation guidelines. The Secretary of Interior Standards provides guidelines for appropriate changes. You\u2019ll typically need approval from local historic district commissions before making major alterations to exteriors or character-defining features.',
    },
    {
      question: 'Are there tax benefits to owning a historic home?',
      answer: 'Yes! Federal Historic Preservation Tax Credits provide up to 20% credit on qualified rehabilitation expenses. Some states and municipalities offer additional credits, grants, and property tax breaks for owners who maintain historic properties according to preservation standards.',
    },
    {
      question: 'Is homeowner\u2019s insurance more expensive for historic homes?',
      answer: 'It can be, but specialized historic home insurance policies often offer better rates than standard policies. These policies account for the unique construction materials and replacement cost considerations of older homes. Shop around with insurers experienced in historic properties.',
    },
    {
      question: 'What\u2019s the FHA 203(k) loan?',
      answer: 'The FHA 203(k) is a renovation loan that allows you to finance both the purchase and rehabilitation of a property in one mortgage. It\u2019s ideal for historic homes needing upgrades, with lower down payment requirements (typically 3.5%) compared to conventional rehab loans.',
    },
    {
      question: 'How do I find a contractor experienced with historic homes?',
      answer: 'Look for contractors certified by preservation organizations, members of local preservation societies, or those with documented experience on similar period homes. Always ask for references and verify they understand historic building codes and appropriate materials for your home\u2019s era.',
    },
  ];

  const benefitsData = [
    {
      icon: '🏛️',
      title: 'Tax Credits & Grants',
      description: 'Federal and state historic preservation tax credits can offset 20% of qualified rehabilitation costs.',
    },
    {
      icon: '✨',
      title: 'Unique Character',
      description: 'Original architectural details, craftsmanship, and design elements you won\u2019t find in new construction.',
    },
    {
      icon: '🌱',
      title: 'Community Value',
      description: 'Historic neighborhoods often develop strong communities and see stable property appreciation.',
    },
    {
      icon: '🏗️',
      title: 'Solid Construction',
      description: 'Many historic homes feature superior materials and construction techniques compared to modern builds.',
    },
  ];

  const challengesData = [
    {
      icon: '🔧',
      title: 'Maintenance Costs',
      description: 'Specialized repairs, period-appropriate materials, and older systems require ongoing investment.',
    },
    {
      icon: '⚖️',
      title: 'Renovation Restrictions',
      description: 'Historic district rules may limit exterior modifications and require approval for changes.',
    },
    {
      icon: '🛡️',
      title: 'Insurance Complexity',
      description: 'Finding appropriate coverage and managing replacement cost assessments requires careful planning.',
    },
    {
      icon: '⚡',
      title: 'Modern Upgrades',
      description: 'Adding modern systems (HVAC, plumbing, electrical) while preserving historic integrity is challenging.',
    },
  ];

  const inspectionItems = [
    { name: 'Foundation Assessment', description: 'Detailed inspection of masonry, settling, and structural integrity common in older homes.' },
    { name: 'Lead Paint Testing', description: 'Certified testing for lead paint hazards, especially in homes built before 1978.' },
    { name: 'Asbestos Evaluation', description: 'Identification of asbestos in insulation, flooring, siding, and other materials.' },
    { name: 'Electrical Systems', description: 'Assessment of outdated wiring, knob-and-tube systems, and grounding issues.' },
    { name: 'Plumbing Inspection', description: 'Evaluation of original plumbing, water pressure, and material degradation.' },
    { name: 'Roof & Exterior', description: 'Inspection of period roofing materials, siding integrity, and weather-sealing.' },
  ];

  const financingOptions = [
    {
      title: 'Conventional Mortgage',
      description: 'Standard 15 or 30-year mortgages work for historic homes in good condition. Typically require 10-20% down.',
      pros: ['Competitive rates', 'Straightforward process'],
      cons: ['May need separate construction loan for major rehab'],
    },
    {
      title: 'FHA 203(k) Renovation Loan',
      description: 'Combines purchase and renovation financing. Allows financing of rehab work into the mortgage.',
      pros: ['Low down payment (3.5%)', 'Covers renovations', 'Competitive rates'],
      cons: ['Requires HUD-approved lenders', 'More documentation', 'Limited to FHA loan limits'],
    },
    {
      title: 'Historic Tax Credit Financing',
      description: 'Some lenders offer specialized financing tied to historic tax credit projects, with credits offsetting costs.',
      pros: ['Leverages tax credits', 'Lower effective costs', 'Preserves history'],
      cons: ['Requires qualified rehabilitation', 'Complex application', 'Lender involvement required'],
    },
  ];

  const insuranceConsiderations = [
    {
      topic: 'Replacement Cost',
      detail: 'Historic homes often have higher replacement costs due to specialized materials and craftsmanship. Insurers must assess actual reconstruction costs.',
    },
    {
      topic: 'Agreed Value Coverage',
      detail: 'Lock in replacement value upfront to avoid disputes. Recommended for homes with custom details and period materials.',
    },
    {
      topic: 'Specialized Insurers',
      detail: 'Companies experienced with historic properties offer better rates and understanding of unique coverage needs.',
    },
    {
      topic: 'Code Compliance Coverage',
      detail: 'Covers costs to bring systems up to current code when repairs or replacements are needed.',
    },
  ];

  return (
    <div style={{ fontFamily: "'Georgia', serif", color: '#2c3e50', lineHeight: '1.6' }}>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #8b7355 0%, #5d4e37 100%)',
        color: '#fff',
        padding: '120px 20px',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h1 style={{
            fontSize: '48px',
            fontWeight: '700',
            marginBottom: '20px',
            letterSpacing: '-1px',
          }}>
            Your Guide to Historic Home Ownership
          </h1>
          <p style={{
            fontSize: '24px',
            marginBottom: '30px',
            opacity: 0.95,
            fontWeight: '300',
          }}>
            Discover the unique charm, financial benefits, and practical insights for buying and maintaining a piece of history.
          </p>
          <button
            onClick={() => setShowMainForm(true)}
            style={{
              background: '#d4a574',
              color: '#2c3e50',
              border: 'none',
              padding: '16px 40px',
              fontSize: '18px',
              fontWeight: '700',
              borderRadius: '4px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#e8b896';
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#d4a574';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            Learn More About Historic Homes
          </button>
        </div>
      </section>

      {/* Lead Capture Form */}
      {showMainForm && (
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
            background: '#fff',
            padding: '40px',
            borderRadius: '8px',
            maxWidth: '500px',
            width: '100%',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
          }}>
            <h2 style={{ marginBottom: '20px', color: '#2c3e50' }}>
              Get Your Historic Home Guide
            </h2>
            <form onSubmit={handleMainFormSubmit}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={mainFormData.name}
                  onChange={handleMainFormChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '16px',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={mainFormData.email}
                  onChange={handleMainFormChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '16px',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={mainFormData.phone}
                  onChange={handleMainFormChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '16px',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                  Property Age Interest
                </label>
                <select
                  name="propertyAge"
                  value={mainFormData.propertyAge}
                  onChange={handleMainFormChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '16px',
                    boxSizing: 'border-box',
                  }}
                >
                  <option value="">Select age range</option>
                  <option value="pre-1900">Pre-1900</option>
                  <option value="1900-1920">1900-1920</option>
                  <option value="1920-1950">1920-1950</option>
                  <option value="1950-1975">1950-1975</option>
                </select>
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                  Main Interest Area
                </label>
                <select
                  name="interestArea"
                  value={mainFormData.interestArea}
                  onChange={handleMainFormChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '16px',
                    boxSizing: 'border-box',
                  }}
                >
                  <option value="">Select interest area</option>
                  <option value="tax-credits">Tax Credits & Financing</option>
                  <option value="renovation">Renovation & Restoration</option>
                  <option value="inspection">Inspection & Evaluation</option>
                  <option value="general">General Information</option>
                </select>
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  type="submit"
                  style={{
                    flex: '1',
                    background: '#8b7355',
                    color: '#fff',
                    border: 'none',
                    padding: '12px',
                    borderRadius: '4px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                  }}
                >
                  Get Started
                </button>
                <button
                  type="button"
                  onClick={() => setShowMainForm(false)}
                  style={{
                    flex: '1',
                    background: '#ecf0f1',
                    color: '#2c3e50',
                    border: 'none',
                    padding: '12px',
                    borderRadius: '4px',
                    fontSize: '16px',
                    cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* What Makes a Home Historic */}
      <section style={{ padding: '80px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{
          fontSize: '36px',
          fontWeight: '700',
          marginBottom: '40px',
          color: '#2c3e50',
          textAlign: 'center',
        }}>
          What Makes a Home Historic?
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '30px',
        }}>
          {[
            {
              title: 'National Register',
              description: 'Listed on the National Register of Historic Places by the National Park Service.',
            },
            {
              title: 'Local Designation',
              description: 'Designated as historic by city or county preservation authorities based on architectural or historical significance.',
            },
            {
              title: 'Age Threshold',
              description: 'Generally at least 50 years old, though some areas recognize younger homes for exceptional significance.',
            },
            {
              title: 'Architectural Significance',
              description: 'Represents a particular architectural style, building method, or craftsmanship of historical importance.',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              style={{
                background: '#f8f6f4',
                padding: '30px',
                borderRadius: '6px',
                borderLeft: '4px solid #8b7355',
              }}
            >
              <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px', color: '#5d4e37' }}>
                {item.title}
              </h3>
              <p style={{ fontSize: '15px', color: '#555' }}>
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section style={{ padding: '80px 20px', background: '#f8f6f4' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '36px',
            fontWeight: '700',
            marginBottom: '40px',
            color: '#2c3e50',
            textAlign: 'center',
          }}>
            Benefits of Historic Homes
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '30px',
          }}>
            {benefitsData.map((benefit, idx) => (
              <div
                key={idx}
                style={{
                  background: '#fff',
                  padding: '30px',
                  borderRadius: '6px',
                  textAlign: 'center',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                  transition: 'transform 0.3s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>
                  {benefit.icon}
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px', color: '#5d4e37' }}>
                  {benefit.title}
                </h3>
                <p style={{ fontSize: '15px', color: '#666' }}>
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Challenges Section */}
      <section style={{ padding: '80px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{
          fontSize: '36px',
          fontWeight: '700',
          marginBottom: '40px',
          color: '#2c3e50',
          textAlign: 'center',
        }}>
          Challenges to Consider
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '30px',
        }}>
          {challengesData.map((challenge, idx) => (
            <div
              key={idx}
              style={{
                background: '#fff5f3',
                padding: '30px',
                borderRadius: '6px',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>
                {challenge.icon}
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px', color: '#5d4e37' }}>
                {challenge.title}
              </h3>
              <p style={{ fontSize: '15px', color: '#666' }}>
                {challenge.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Historic Home Inspection Section */}
      <section style={{ padding: '80px 20px', background: '#f8f6f4' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '36px',
            fontWeight: '700',
            marginBottom: '40px',
            color: '#2c3e50',
            textAlign: 'center',
          }}>
            Specialized Historic Home Inspections
          </h2>
          <p style={{
            fontSize: '18px',
            marginBottom: '40px',
            color: '#555',
            textAlign: 'center',
            maxWidth: '800px',
            margin: '0 auto 40px',
          }}>
            Historic homes require more thorough inspection than standard properties. Look for inspectors experienced with period construction and historical materials.
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '30px',
          }}>
            {inspectionItems.map((item, idx) => (
              <div
                key={idx}
                style={{
                  background: '#fff',
                  padding: '30px',
                  borderRadius: '6px',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                  borderTop: '3px solid #d4a574',
                }}
              >
                <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px', color: '#5d4e37' }}>
                  {item.name}
                </h3>
                <p style={{ fontSize: '15px', color: '#666' }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Renovation Rules Section */}
      <section style={{ padding: '80px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{
          fontSize: '36px',
          fontWeight: '700',
          marginBottom: '40px',
          color: '#2c3e50',
          textAlign: 'center',
        }}>
          Historic Preservation Guidelines
        </h2>
        <div style={{
          background: '#f8f6f4',
          padding: '40px',
          borderRadius: '8px',
          marginBottom: '30px',
        }}>
          <h3 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '20px', color: '#5d4e37' }}>
            Secretary of Interior Standards
          </h3>
          <p style={{ fontSize: '16px', color: '#555', marginBottom: '16px' }}>
            When you\u2019re making changes to a historic property, especially one with designations, you\u2019ll need to follow established preservation standards. The Secretary of Interior Standards provide guidelines for appropriate modifications that maintain historical integrity while allowing necessary updates.
          </p>
          <ul style={{
            fontSize: '15px',
            color: '#555',
            marginLeft: '20px',
            lineHeight: '1.8',
          }}>
            <li>Preserve character-defining features and their historical properties</li>
            <li>Repair historic materials in-kind when possible, rather than replacement</li>
            <li>Restrict new additions to areas where they won\u2019t damage historic character</li>
            <li>Use contemporary designs for new work that\u2019s clearly distinguishable from historic fabric</li>
            <li>Preserve the historic exterior appearance when possible</li>
          </ul>
        </div>
        <div style={{
          background: '#fff5f3',
          padding: '40px',
          borderRadius: '8px',
        }}>
          <h3 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '20px', color: '#5d4e37' }}>
            Local Review Boards
          </h3>
          <p style={{ fontSize: '16px', color: '#555' }}>
            Most historic properties require approval from a local Historic District Commission or preservation board before making visible exterior changes. This typically includes roof repairs, siding replacement, window restoration, and landscaping modifications. Interior work usually has fewer restrictions. Plan to submit detailed plans and photographs before starting any work.
          </p>
        </div>
      </section>

      {/* Financing Section */}
      <section style={{ padding: '80px 20px', background: '#f8f6f4' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '36px',
            fontWeight: '700',
            marginBottom: '40px',
            color: '#2c3e50',
            textAlign: 'center',
          }}>
            Financing Historic Properties
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '30px',
          }}>
            {financingOptions.map((option, idx) => (
              <div
                key={idx}
                style={{
                  background: '#fff',
                  padding: '30px',
                  borderRadius: '6px',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                }}
              >
                <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px', color: '#5d4e37' }}>
                  {option.title}
                </h3>
                <p style={{ fontSize: '15px', color: '#555', marginBottom: '20px' }}>
                  {option.description}
                </p>
                <div style={{ marginBottom: '16px' }}>
                  <p style={{ fontSize: '13px', fontWeight: '600', color: '#2c3e50', marginBottom: '8px' }}>
                    Pros:
                  </p>
                  <ul style={{ fontSize: '13px', color: '#666', marginLeft: '16px' }}>
                    {option.pros.map((pro, pidx) => (
                      <li key={pidx} style={{ marginBottom: '4px' }}>{pro}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p style={{ fontSize: '13px', fontWeight: '600', color: '#2c3e50', marginBottom: '8px' }}>
                    Cons:
                  </p>
                  <ul style={{ fontSize: '13px', color: '#666', marginLeft: '16px' }}>
                    {option.cons.map((con, cidx) => (
                      <li key={cidx} style={{ marginBottom: '4px' }}>{con}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Insurance Section */}
      <section style={{ padding: '80px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{
          fontSize: '36px',
          fontWeight: '700',
          marginBottom: '40px',
          color: '#2c3e50',
          textAlign: 'center',
        }}>
          Insurance Considerations
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '30px',
        }}>
          {insuranceConsiderations.map((item, idx) => (
            <div
              key={idx}
              style={{
                background: '#f8f6f4',
                padding: '30px',
                borderRadius: '6px',
                borderLeft: '4px solid #d4a574',
              }}
            >
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px', color: '#5d4e37' }}>
                {item.topic}
              </h3>
              <p style={{ fontSize: '15px', color: '#666' }}>
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Maintenance Cost Estimator */}
      <section style={{ padding: '80px 20px', background: '#f8f6f4' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '36px',
            fontWeight: '700',
            marginBottom: '40px',
            color: '#2c3e50',
            textAlign: 'center',
          }}>
            Interactive Maintenance Cost Estimator
          </h2>
          <div style={{
            background: '#fff',
            padding: '40px',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          }}>
            <p style={{
              fontSize: '16px',
              color: '#555',
              marginBottom: '30px',
              textAlign: 'center',
            }}>
              Get an estimate of annual maintenance costs based on your home\u2019s age and condition.
            </p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '30px',
              marginBottom: '30px',
            }}>
              <div>
                <label style={{ display: 'block', marginBottom: '12px', fontWeight: '600', color: '#2c3e50' }}>
                  Home Built Year
                </label>
                <input
                  type="range"
                  name="homeAge"
                  min="1800"
                  max="2000"
                  value={estimatorData.homeAge}
                  onChange={handleEstimatorChange}
                  style={{
                    width: '100%',
                    height: '8px',
                    borderRadius: '4px',
                    background: '#d4a574',
                    outline: 'none',
                    cursor: 'pointer',
                  }}
                />
                <p style={{ marginTop: '8px', fontSize: '14px', color: '#666' }}>
                  Year: {estimatorData.homeAge}
                </p>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '12px', fontWeight: '600', color: '#2c3e50' }}>
                  Current Condition
                </label>
                <select
                  name="condition"
                  value={estimatorData.condition}
                  onChange={handleEstimatorChange}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '16px',
                  }}
                >
                  <option value="excellent">Excellent</option>
                  <option value="good">Good</option>
                  <option value="fair">Fair</option>
                  <option value="poor">Poor</option>
                </select>
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <button
                onClick={calculateEstimatedCost}
                style={{
                  background: '#8b7355',
                  color: '#fff',
                  border: 'none',
                  padding: '14px 40px',
                  fontSize: '16px',
                  fontWeight: '600',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#6b5645';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#8b7355';
                }}
              >
                Calculate Estimate
              </button>
            </div>
            {estimatedCost && (
              <div style={{
                marginTop: '30px',
                padding: '20px',
                background: '#f0ebe7',
                borderRadius: '6px',
                textAlign: 'center',
                borderLeft: '4px solid #d4a574',
              }}>
                <p style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>
                  Estimated Annual Maintenance Cost:
                </p>
                <p style={{
                  fontSize: '32px',
                  fontWeight: '700',
                  color: '#5d4e37',
                }}>
                  ${estimatedCost.toLocaleString()}
                </p>
                <p style={{ fontSize: '13px', color: '#666', marginTop: '10px' }}>
                  This estimate includes foundation, roof, system maintenance, and specialized repairs typical for homes of this age and condition.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section style={{ padding: '80px 20px', maxWidth: '1000px', margin: '0 auto' }}>
        <h2 style={{
          fontSize: '36px',
          fontWeight: '700',
          marginBottom: '40px',
          color: '#2c3e50',
          textAlign: 'center',
        }}>
          Frequently Asked Questions
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {faqItems.map((item, idx) => (
            <div
              key={idx}
              style={{
                border: '1px solid #ddd',
                borderRadius: '6px',
                overflow: 'hidden',
              }}
            >
              <button
                onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                style={{
                  width: '100%',
                  padding: '20px',
                  background: expandedFaq === idx ? '#f0ebe7' : '#fff',
                  border: 'none',
                  textAlign: 'left',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  color: '#2c3e50',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  if (expandedFaq !== idx) {
                    e.currentTarget.style.background = '#f8f6f4';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = expandedFaq === idx ? '#f0ebe7' : '#fff';
                }}
              >
                {item.question}
                <span style={{
                  display: 'inline-block',
                  transform: expandedFaq === idx ? 'rotate(180deg)' : 'rotate(0)',
                  transition: 'transform 0.3s ease',
                  fontSize: '20px',
                }}>
                  ▼
                </span>
              </button>
              {expandedFaq === idx && (
                <div style={{
                  padding: '20px',
                  background: '#f8f6f4',
                  borderTop: '1px solid #ddd',
                  fontSize: '15px',
                  color: '#555',
                  lineHeight: '1.8',
                }}>
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA Section */}
      <section style={{
        background: 'linear-gradient(135deg, #8b7355 0%, #5d4e37 100%)',
        color: '#fff',
        padding: '80px 20px',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '36px',
            fontWeight: '700',
            marginBottom: '20px',
          }}>
            Ready to Find Your Historic Home?
          </h2>
          <p style={{
            fontSize: '18px',
            marginBottom: '30px',
            opacity: 0.95,
          }}>
            Our team specializes in historic property transactions. Let us guide you through every step of the process.
          </p>
          <button
            onClick={() => setShowMainForm(true)}
            style={{
              background: '#d4a574',
              color: '#2c3e50',
              border: 'none',
              padding: '16px 40px',
              fontSize: '18px',
              fontWeight: '700',
              borderRadius: '4px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#e8b896';
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#d4a574';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            Start Your Journey Today
          </button>
        </div>
      </section>

      {/* Footer CTA */}
      <section style={{ padding: '60px 20px', background: '#f8f6f4', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h3 style={{
            fontSize: '24px',
            fontWeight: '600',
            marginBottom: '16px',
            color: '#2c3e50',
          }}>
            Have Questions About Historic Homes?
          </h3>
          <p style={{
            fontSize: '16px',
            color: '#666',
            marginBottom: '24px',
          }}>
            Contact our real estate experts for personalized guidance on your historic home purchase.
          </p>
          <button
            onClick={() => setShowMainForm(true)}
            style={{
              background: '#8b7355',
              color: '#fff',
              border: 'none',
              padding: '14px 36px',
              fontSize: '16px',
              fontWeight: '600',
              borderRadius: '4px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#6b5645';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#8b7355';
            }}
          >
            Get in Touch
          </button>
        </div>
      </section>
    </div>
  );
};

export default HistoricHomesGuidePage;
