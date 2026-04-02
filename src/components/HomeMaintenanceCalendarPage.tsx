'use client';

import { useState } from 'react';

export default function HomeMaintenanceCalendarPage() {
  const [activeSeason, setActiveSeason] = useState('spring');
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    propertyType: 'single-family'
  });

  const seasonalTasks = {
    spring: [
      { month: 'March', tasks: [
        { task: 'Inspect roof for winter damage', category: 'professional', importance: 'high', cost: '$150-300' },
        { task: 'Clean gutters and downspouts', category: 'diy', importance: 'high', cost: '$0-50' },
        { task: 'Check exterior caulking', category: 'diy', importance: 'medium', cost: '$20-60' }
      ]},
      { month: 'April', tasks: [
        { task: 'Service air conditioning system', category: 'professional', importance: 'high', cost: '$100-200' },
        { task: 'Inspect foundation for cracks', category: 'professional', importance: 'high', cost: '$0' },
        { task: 'Power wash siding', category: 'diy', importance: 'low', cost: '$50-150' }
      ]},
      { month: 'May', tasks: [
        { task: 'Seal deck or patio', category: 'diy', importance: 'medium', cost: '$100-300' },
        { task: 'Inspect and repair grading', category: 'professional', importance: 'medium', cost: '$0-200' },
        { task: 'Check exterior paint', category: 'diy', importance: 'low', cost: '$200-800' }
      ]}
    ],
    summer: [
      { month: 'June', tasks: [
        { task: 'Service lawn irrigation', category: 'diy', importance: 'medium', cost: '$50-150' },
        { task: 'Trim tree branches', category: 'diy', importance: 'medium', cost: '$50-300' },
        { task: 'Inspect exterior doors', category: 'diy', importance: 'low', cost: '$100-400' }
      ]},
      { month: 'July', tasks: [
        { task: 'Check and seal windows', category: 'diy', importance: 'medium', cost: '$30-100' },
        { task: 'Inspect chimney and flashing', category: 'professional', importance: 'high', cost: '$150-300' },
        { task: 'Clean and repair deck stain', category: 'diy', importance: 'low', cost: '$300-800' }
      ]},
      { month: 'August', tasks: [
        { task: 'Service septic system', category: 'professional', importance: 'high', cost: '$200-400' },
        { task: 'Inspect pool/spa equipment', category: 'professional', importance: 'high', cost: '$100-250' },
        { task: 'Check outdoor electrical', category: 'professional', importance: 'medium', cost: '$100-300' }
      ]}
    ],
    fall: [
      { month: 'September', tasks: [
        { task: 'Clean gutters thoroughly', category: 'diy', importance: 'high', cost: '$0-50' },
        { task: 'Inspect weatherstripping', category: 'diy', importance: 'medium', cost: '$20-80' },
        { task: 'Service furnace/HVAC', category: 'professional', importance: 'high', cost: '$150-300' }
      ]},
      { month: 'October', tasks: [
        { task: 'Seal exterior gaps and cracks', category: 'diy', importance: 'high', cost: '$50-150' },
        { task: 'Drain and blow out sprinkler lines', category: 'professional', importance: 'high', cost: '$100-200' },
        { task: 'Inspect roof condition', category: 'professional', importance: 'high', cost: '$0' }
      ]},
      { month: 'November', tasks: [
        { task: 'Trim back landscaping', category: 'diy', importance: 'medium', cost: '$50-300' },
        { task: 'Check basement/crawl space', category: 'diy', importance: 'medium', cost: '$0' },
        { task: 'Prepare water features for winter', category: 'diy', importance: 'low', cost: '$50-200' }
      ]}
    ],
    winter: [
      { month: 'December', tasks: [
        { task: 'Inspect heating system', category: 'professional', importance: 'high', cost: '$100-200' },
        { task: 'Check insulation in attic', category: 'diy', importance: 'medium', cost: '$0' },
        { task: 'Inspect basement for moisture', category: 'diy', importance: 'high', cost: '$0' }
      ]},
      { month: 'January', tasks: [
        { task: 'Monitor roof for ice dams', category: 'professional', importance: 'high', cost: '$500-1500' },
        { task: 'Check weatherstripping damage', category: 'diy', importance: 'medium', cost: '$20-80' },
        { task: 'Inspect plumbing for freezing', category: 'professional', importance: 'high', cost: '$100-500' }
      ]},
      { month: 'February', tasks: [
        { task: 'Service water heater', category: 'professional', importance: 'medium', cost: '$100-200' },
        { task: 'Check exterior doors/seals', category: 'diy', importance: 'medium', cost: '$50-200' },
        { task: 'Inspect foundation settling', category: 'professional', importance: 'medium', cost: '$0' }
      ]}
    ]
  };

  const faqItems = [
    {
      question: 'How much should I budget for annual home maintenance?',
      answer: 'A general rule is to budget 1% of your home\u2019s purchase price annually. For a $400,000 home, that\u2019s roughly $4,000 per year in maintenance and repairs.'
    },
    {
      question: 'What\u2019s the difference between maintenance and repair?',
      answer: 'Maintenance is preventative work (like cleaning gutters) done regularly. Repairs address existing damage or problems. Regular maintenance reduces costly repairs.'
    },
    {
      question: 'When should I hire a professional vs. DIY?',
      answer: 'DIY is fine for low-risk tasks like cleaning and basic inspections. Hire professionals for electrical, plumbing, HVAC, roofing, and structural work—these require licenses and permits.'
    },
    {
      question: 'What\u2019s the most important home maintenance task?',
      answer: 'Roof inspection and gutter cleaning are critical. Water intrusion is the leading cause of major home damage. Regular HVAC servicing also prevents expensive emergency repairs.'
    },
    {
      question: 'Can regular maintenance increase my home\u2019s value?',
      answer: 'Yes. Well-maintained homes appraise higher, sell faster, and command better prices. Documentation of maintenance also boosts buyer confidence.'
    }
  ];

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Lead capture integration point
  };

  const seasonIcon = (season) => {
    const icons = {
      spring: '🌱',
      summer: '☀️',
      fall: '🍂',
      winter: '❄️'
    };
    return icons[season] || '📅';
  };

  const importanceColor = (importance) => {
    switch(importance) {
      case 'high': return 'var(--le-accent)';
      case 'medium': return '#f59e0b';
      default: return '#10b981';
    }
  };

  return (
    <main style={{ backgroundColor: 'var(--le-bg)', color: 'var(--le-text)' }}>
      {/* Hero Section */}
      <section style={{
        padding: '80px 20px',
        background: 'linear-gradient(135deg, var(--le-primary) 0%, rgba(var(--le-primary), 0.8) 100%)',
        color: 'white',
        textAlign: 'center'
      }}>
        <h1 style={{
          fontSize: '48px',
          fontWeight: 'bold',
          marginBottom: '20px',
          lineHeight: '1.2'
        }}>
          Year-Round Home Maintenance Calendar
        </h1>
        <p style={{
          fontSize: '20px',
          marginBottom: '30px',
          opacity: 0.95,
          maxWidth: '600px',
          margin: '20px auto 30px'
        }}>
          Stay ahead of repairs with our comprehensive seasonal maintenance guide. Protect your investment and avoid costly emergencies.
        </p>
      </section>

      {/* Season Selector */}
      <section style={{
        padding: '40px 20px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          marginBottom: '40px'
        }}>
          {Object.keys(seasonalTasks).map(season => (
            <button
              key={season}
              onClick={() => setActiveSeason(season)}
              style={{
                padding: '16px 24px',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: activeSeason === season ? 'bold' : 'normal',
                cursor: 'pointer',
                backgroundColor: activeSeason === season ? 'var(--le-primary)' : 'var(--le-card-bg)',
                color: activeSeason === season ? 'white' : 'var(--le-text)',
                transition: 'all 0.3s ease',
                boxShadow: activeSeason === season ? '0 4px 12px rgba(0,0,0,0.15)' : 'none'
              }}
            >
              <span style={{ marginRight: '8px' }}>{seasonIcon(season)}</span>
              {season.charAt(0).toUpperCase() + season.slice(1)}
            </button>
          ))}
        </div>

        {/* Monthly Tasks */}
        <div style={{ display: 'grid', gap: '24px' }}>
          {seasonalTasks[activeSeason].map((monthData, idx) => (
            <article
              key={idx}
              style={{
                backgroundColor: 'var(--le-card-bg)',
                border: `1px solid var(--le-border)`,
                borderRadius: '12px',
                padding: '24px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
              }}
            >
              <h3 style={{
                fontSize: '22px',
                fontWeight: 'bold',
                marginBottom: '16px',
                color: 'var(--le-primary)'
              }}>
                {monthData.month}
              </h3>
              <div style={{ display: 'grid', gap: '12px' }}>
                {monthData.tasks.map((item, taskIdx) => (
                  <div
                    key={taskIdx}
                    style={{
                      padding: '12px 16px',
                      backgroundColor: 'var(--le-bg)',
                      borderLeft: `4px solid ${importanceColor(item.importance)}`,
                      borderRadius: '4px',
                      display: 'grid',
                      gridTemplateColumns: '1fr auto auto auto',
                      gap: '16px',
                      alignItems: 'center',
                      fontSize: '14px'
                    }}
                  >
                    <span style={{ fontWeight: '500' }}>{item.task}</span>
                    <span style={{
                      backgroundColor: item.category === 'diy' ? 'rgba(59,130,246,0.15)' : 'rgba(168,85,247,0.15)',
                      color: item.category === 'diy' ? '#3b82f6' : '#a855f7',
                      padding: '4px 12px',
                      borderRadius: '16px',
                      fontSize: '12px',
                      fontWeight: '600',
                      whiteSpace: 'nowrap'
                    }}>
                      {item.category === 'diy' ? 'DIY' : 'Professional'}
                    </span>
                    <span style={{ whiteSpace: 'nowrap' }}>{item.cost}</span>
                    <span style={{
                      fontSize: '12px',
                      fontWeight: '600',
                      color: importanceColor(item.importance),
                      whiteSpace: 'nowrap'
                    }}>
                      {item.importance.toUpperCase()}
                    </span>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section style={{
        padding: '60px 20px',
        backgroundColor: 'var(--le-card-bg)',
        marginTop: '40px'
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '36px',
            fontWeight: 'bold',
            marginBottom: '40px',
            textAlign: 'center',
            color: 'var(--le-primary)'
          }}>
            Frequently Asked Questions
          </h2>
          <div style={{ display: 'grid', gap: '12px' }}>
            {faqItems.map((item, idx) => (
              <div
                key={idx}
                style={{
                  border: `1px solid var(--le-border)`,
                  borderRadius: '8px',
                  overflow: 'hidden',
                  backgroundColor: 'var(--le-bg)'
                }}
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                  style={{
                    width: '100%',
                    padding: '18px 20px',
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    textAlign: 'left',
                    fontSize: '16px',
                    fontWeight: '600',
                    color: 'var(--le-text)'
                  }}
                >
                  <span>{item.question}</span>
                  <svg
                    style={{
                      width: '20px',
                      height: '20px',
                      transition: 'transform 0.3s ease',
                      transform: expandedFaq === idx ? 'rotate(180deg)' : 'rotate(0deg)',
                      flexShrink: 0,
                      marginLeft: '16px'
                    }}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>
                {expandedFaq === idx && (
                  <div style={{
                    padding: '0 20px 18px',
                    fontSize: '15px',
                    lineHeight: '1.6',
                    color: 'var(--le-text)',
                    opacity: 0.9
                  }}>
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Capture CTA */}
      <section style={{
        padding: '60px 20px',
        maxWidth: '900px',
        margin: '0 auto'
      }}>
        <div style={{
          backgroundColor: 'var(--le-primary)',
          color: 'white',
          borderRadius: '12px',
          padding: '40px',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontSize: '32px',
            fontWeight: 'bold',
            marginBottom: '16px'
          }}>
            Let\u2019s Help Protect Your Investment
          </h2>
          <p style={{
            fontSize: '18px',
            marginBottom: '32px',
            opacity: 0.95
          }}>
            Get a personalized maintenance plan and connect with trusted professionals in your area.
          </p>

          <form onSubmit={handleFormSubmit} style={{
            display: 'grid',
            gap: '16px'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '16px'
            }}>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleFormChange}
                required
                style={{
                  padding: '12px 16px',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '14px',
                  backgroundColor: 'rgba(255,255,255,0.95)',
                  color: 'var(--le-text)'
                }}
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleFormChange}
                required
                style={{
                  padding: '12px 16px',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '14px',
                  backgroundColor: 'rgba(255,255,255,0.95)',
                  color: 'var(--le-text)'
                }}
              />
              <input
                type="tel"
                name="phone"
                placeholder="Your Phone"
                value={formData.phone}
                onChange={handleFormChange}
                style={{
                  padding: '12px 16px',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '14px',
                  backgroundColor: 'rgba(255,255,255,0.95)',
                  color: 'var(--le-text)'
                }}
              />
            </div>

            <select
              name="propertyType"
              value={formData.propertyType}
              onChange={handleFormChange}
              style={{
                padding: '12px 16px',
                border: 'none',
                borderRadius: '6px',
                fontSize: '14px',
                backgroundColor: 'rgba(255,255,255,0.95)',
                color: 'var(--le-text)'
              }}
            >
              <option value="single-family">Single Family Home</option>
              <option value="condo">Condo/Townhouse</option>
              <option value="multi-family">Multi-Family</option>
              <option value="commercial">Commercial Property</option>
            </select>

            <button
              type="submit"
              style={{
                padding: '14px 32px',
                backgroundColor: 'var(--le-accent)',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'opacity 0.3s ease'
              }}
              onMouseEnter={(e) => e.target.style.opacity = '0.9'}
              onMouseLeave={(e) => e.target.style.opacity = '1'}
            >
              Get Your Maintenance Plan
            </button>
          </form>
        </div>
      </section>

      {/* Footer Info */}
      <section style={{
        padding: '40px 20px',
        backgroundColor: 'var(--le-card-bg)',
        borderTop: `1px solid var(--le-border)`,
        marginTop: '40px'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '32px',
          textAlign: 'center'
        }}>
          <div>
            <h4 style={{ fontWeight: 'bold', marginBottom: '8px' }}>Seasonal Planning</h4>
            <p style={{ opacity: 0.8 }}>Organized by season for easy reference and budgeting</p>
          </div>
          <div>
            <h4 style={{ fontWeight: 'bold', marginBottom: '8px' }}>Cost Transparency</h4>
            <p style={{ opacity: 0.8 }}>Estimated price ranges for DIY and professional services</p>
          </div>
          <div>
            <h4 style={{ fontWeight: 'bold', marginBottom: '8px' }}>Priority Guidance</h4>
            <p style={{ opacity: 0.8 }}>Know what\u2019s critical vs. what can wait</p>
          </div>
        </div>
      </section>
    </main>
  );
}
