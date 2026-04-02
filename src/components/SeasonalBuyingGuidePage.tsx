'use client'

import { useState } from 'react'

export default function SeasonalBuyingGuidePage() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' })
  const [formSubmitted, setFormSubmitted] = useState(false)

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormSubmitted(true)
    setTimeout(() => {
      setFormData({ name: '', email: '', phone: '' })
      setFormSubmitted(false)
    }, 3000)
  }

  const seasons = [
    {
      name: 'Spring',
      icon: '🌸',
      pros: [
        'Largest selection of homes on market',
        'Beautiful curb appeal and landscaping',
        'Buyer and seller motivation align',
        'Best weather for home inspections',
        'Schools resuming normal schedules'
      ],
      cons: [
        'Most competitive buyer market',
        'Higher prices and bidding wars',
        'Fast-moving listings require speed',
        'Showings scheduled frequently',
        'Tax refunds inflate buyer budgets'
      ],
      tips: 'Get pre-approved early. Work with a local agent. Be ready to move fast on offers. Focus on homes with strong fundamentals rather than cosmetic appeal.'
    },
    {
      name: 'Summer',
      icon: '☀️',
      pros: [
        'Excellent natural lighting in homes',
        'Families want to settle before school',
        'Vacation flexibility for viewings',
        'Outdoor spaces fully visible',
        'Strong summer job market'
      ],
      cons: [
        'Peak prices and market competition',
        'Many properties already pre-selected',
        'Buyers have limited time before August',
        'Inspections delayed due to demand',
        'Moving costs at premium prices'
      ],
      tips: 'Schedule inspections promptly. Make strong offers early. Consider homes in less-desirable condition (great negotiating power). Lock in financing quickly.'
    },
    {
      name: 'Fall',
      icon: '🍂',
      pros: [
        'Serious buyers only (less competition)',
        'Prices begin stabilizing downward',
        'Still plenty of home inventory',
        'Weather remains favorable for viewings',
        'Motivated sellers after summer',
        'Better negotiating position'
      ],
      cons: [
        'Inventory begins decreasing',
        'Holiday season approaches',
        'School year already underway',
        'Fewer buyer options available',
        'Some sellers delay until spring'
      ],
      tips: 'Leverage less competition for better pricing. Focus on motivated sellers. Use fall as negotiation advantage. Lock in rates before year-end.'
    },
    {
      name: 'Winter',
      icon: '❄️',
      pros: [
        'Least competitive buyer market',
        'Significant price reductions available',
        'Motivated sellers (genuine need)',
        'Strong negotiating leverage',
        'Year-end financing incentives',
        'Serious buyers only'
      ],
      cons: [
        'Minimal inventory selection',
        'Weather complicates inspections',
        'Holiday season distractions',
        'Financing tighter before year-end',
        'Fewer open houses',
        'Closing during holidays difficult'
      ],
      tips: 'Expect lower inventory but better deals. Use weather as negotiating tool. Ask sellers to cover winter maintenance. Bundle inspections efficiently.'
    }
  ]

  const faqs = [
    {
      q: 'What is the best time to buy a home?',
      a: 'The best time depends on your situation. Winter offers the best prices and negotiation power. Fall provides balanced selection and pricing. Spring and summer offer more inventory but higher prices. Consider your personal timeline, market conditions, and financial readiness.'
    },
    {
      q: 'Why are homes more expensive in spring and summer?',
      a: 'Spring and summer attract more buyers due to ideal weather, school schedules, and vacation flexibility. Higher demand drives prices up. More inventory is listed, but competition increases faster than supply.'
    },
    {
      q: 'Can I get a better deal if I buy in winter?',
      a: 'Yes, winter typically offers 5-15% price reductions compared to spring peaks. Motivated sellers, less competition, and year-end financing pressures create better buyer leverage and negotiating conditions.'
    },
    {
      q: 'Does seasonal buying affect mortgage rates?',
      a: 'Mortgage rates fluctuate based on economic factors, not season. However, lenders often offer year-end incentives in Q4, and inventory of motivated properties is highest in winter months when sellers have genuine urgency.'
    },
    {
      q: 'How does weather affect home inspections?',
      a: 'Spring and summer weather allows thorough roof, foundation, and exterior inspections. Winter weather can hide problems and complicate inspections. Always hire qualified inspectors regardless of season and request follow-ups if needed.'
    },
    {
      q: 'What about school year considerations?',
      a: 'Spring and summer are preferred by families wanting summer settlement. Fall works for those wanting kids in school immediately. Winter and early spring closings require mid-year school transfers. Plan around your family\u2019s educational calendar.'
    }
  ]

  return (
    <article style={{ backgroundColor: 'var(--le-bg)', color: 'var(--le-text)' }}>
      {/* Hero Section */}
      <section
        style={{
          padding: '80px 40px',
          textAlign: 'center',
          background: 'linear-gradient(135deg, var(--le-primary) 0%, var(--le-accent) 100%)',
          color: 'white'
        }}
      >
        <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '16px' }}>
          Seasonal Home Buying Guide
        </h1>
        <p style={{ fontSize: '18px', opacity: 0.95, maxWidth: '600px', margin: '0 auto' }}>
          Discover the pros, cons, and strategic advantages of buying a home in each season.
          Learn how to leverage market timing for better deals and negotiating power.
        </p>
      </section>

      {/* Season Cards Grid */}
      <section style={{ padding: '80px 40px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '60px', textAlign: 'center' }}>
          Buying Guide by Season
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '30px'
          }}
        >
          {seasons.map((season, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: 'var(--le-card-bg)',
                border: `1px solid var(--le-border)`,
                borderRadius: '8px',
                padding: '30px',
                transition: 'transform 0.3s, box-shadow 0.3s',
                cursor: 'pointer'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)'
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>{season.icon}</div>
              <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>
                {season.name} Buying
              </h3>

              <div style={{ marginBottom: '20px' }}>
                <h4 style={{ fontSize: '14px', fontWeight: 'bold', color: 'var(--le-primary)', marginBottom: '8px', textTransform: 'uppercase' }}>
                  Advantages
                </h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {season.pros.map((pro, i) => (
                    <li key={i} style={{ fontSize: '13px', marginBottom: '6px', paddingLeft: '20px', position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 0, color: 'var(--le-primary)' }}>✓</span>
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <h4 style={{ fontSize: '14px', fontWeight: 'bold', color: 'var(--le-accent)', marginBottom: '8px', textTransform: 'uppercase' }}>
                  Challenges
                </h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {season.cons.map((con, i) => (
                    <li key={i} style={{ fontSize: '13px', marginBottom: '6px', paddingLeft: '20px', position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 0, color: 'var(--le-accent)' }}>•</span>
                      {con}
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ paddingTop: '16px', borderTop: `1px solid var(--le-border)` }}>
                <p style={{ fontSize: '13px', fontStyle: 'italic', color: 'var(--le-text)', opacity: 0.8 }}>
                  {season.tips}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Seasonal Price Trends */}
      <section style={{ padding: '80px 40px', backgroundColor: 'var(--le-card-bg)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '40px', textAlign: 'center' }}>
            Seasonal Price Trends Explained
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
            <div>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>
                Peak Season (Spring-Summer)
              </h3>
              <p style={{ fontSize: '15px', lineHeight: '1.6', marginBottom: '12px' }}>
                Prices peak during spring and summer when buyer demand is highest. More families are
                motivated to move due to school schedules and weather. Sellers have more time to prepare
                and market their homes. Competitive bidding drives prices 8-15 percent higher than fall and
                winter baselines.
              </p>
              <p style={{ fontSize: '15px', lineHeight: '1.6', color: 'var(--le-text)', opacity: 0.8 }}>
                Expect longer negotiation timelines and limited seller concessions.
              </p>
            </div>

            <div>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>
                Off-Season (Fall-Winter)
              </h3>
              <p style={{ fontSize: '15px', lineHeight: '1.6', marginBottom: '12px' }}>
                Prices stabilize and often decrease as buyer demand drops. Fewer families want to move
                during holidays or mid-school year. Serious buyers face less competition. Motivated sellers
                offer price reductions and concessions like repairs, warranties, or closing cost help. Prices
                typically 5-12 percent lower than spring peaks.
              </p>
              <p style={{ fontSize: '15px', lineHeight: '1.6', color: 'var(--le-text)', opacity: 0.8 }}>
                Expect faster decisions and better negotiating leverage.
              </p>
            </div>
          </div>

          <div style={{ marginTop: '40px', padding: '24px', backgroundColor: 'var(--le-bg)', borderRadius: '8px', borderLeft: `4px solid var(--le-primary)` }}>
            <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '12px' }}>
              Market Timing Strategy
            </h4>
            <p style={{ fontSize: '14px', lineHeight: '1.6' }}>
              The difference between peak and off-season can represent 5-15 percent of purchase price—potentially
              tens of thousands of dollars. However, don\u2019t wait for perfect timing if you need to move now. Focus on
              finding the right home and negotiating aggressively rather than trying to time markets perfectly.
            </p>
          </div>
        </div>
      </section>

      {/* Best Time to Buy Analysis */}
      <section style={{ padding: '80px 40px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '40px', textAlign: 'center' }}>
          When Should You Buy?
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px' }}>
          <div style={{ backgroundColor: 'var(--le-card-bg)', padding: '24px', borderRadius: '8px', border: `1px solid var(--le-border)` }}>
            <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '12px', color: 'var(--le-primary)' }}>
              Buy Now If:
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '14px', lineHeight: '1.8' }}>
              <li>✓ Your family or job requires it</li>
              <li>✓ You found your ideal home</li>
              <li>✓ Interest rates are favorable</li>
              <li>✓ You have stable financing</li>
              <li>✓ Local inventory meets needs</li>
            </ul>
          </div>

          <div style={{ backgroundColor: 'var(--le-card-bg)', padding: '24px', borderRadius: '8px', border: `1px solid var(--le-border)` }}>
            <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '12px', color: 'var(--le-accent)' }}>
              Strategic Timing:
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '14px', lineHeight: '1.8' }}>
              <li>• Winter for lowest prices</li>
              <li>• Fall for balance &amp; selection</li>
              <li>• Early spring before peak rush</li>
              <li>• Before rate increases</li>
              <li>• Before season ends (Aug/Dec)</li>
            </ul>
          </div>

          <div style={{ backgroundColor: 'var(--le-card-bg)', padding: '24px', borderRadius: '8px', border: `1px solid var(--le-border)` }}>
            <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '12px', color: 'var(--le-primary)' }}>
              Avoid If:
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '14px', lineHeight: '1.8' }}>
              <li>✗ Job/income is uncertain</li>
              <li>✗ You\u2019re unprepared financially</li>
              <li>✗ No clear timeline identified</li>
              <li>✗ High unemployment locally</li>
              <li>✗ Rates rising significantly</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Lead Capture CTA Form */}
      <section
        style={{
          padding: '80px 40px',
          backgroundColor: 'var(--le-primary)',
          color: 'white'
        }}
      >
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '16px', textAlign: 'center' }}>
            Ready to Buy This Season?
          </h2>
          <p style={{ fontSize: '16px', textAlign: 'center', marginBottom: '40px', opacity: 0.95 }}>
            Get personalized guidance from our real estate experts. We\u2019ll help you navigate seasonal timing and
            find your perfect home at the best price.
          </p>

          {formSubmitted ? (
            <div style={{
              backgroundColor: 'rgba(255,255,255,0.15)',
              padding: '24px',
              borderRadius: '8px',
              textAlign: 'center',
              fontSize: '16px'
            }}>
              <p style={{ margin: 0, fontWeight: 'bold' }}>
                Thank you! We\u2019ll be in touch shortly with seasonal buying insights for your situation.
              </p>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit}>
              <div style={{ marginBottom: '16px' }}>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleFormChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '6px',
                    border: 'none',
                    fontSize: '14px',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
              <div style={{ marginBottom: '16px' }}>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleFormChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '6px',
                    border: 'none',
                    fontSize: '14px',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
              <div style={{ marginBottom: '24px' }}>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleFormChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '6px',
                    border: 'none',
                    fontSize: '14px',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
              <button
                type="submit"
                style={{
                  width: '100%',
                  padding: '14px',
                  backgroundColor: 'var(--le-accent)',
                  color: 'white',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  transition: 'opacity 0.3s'
                }}
                onMouseOver={(e) => { e.currentTarget.style.opacity = '0.9' }}
                onMouseOut={(e) => { e.currentTarget.style.opacity = '1' }}
              >
                Get Seasonal Buying Guide
              </button>
            </form>
          )}
        </div>
      </section>

      {/* FAQ Accordion */}
      <section style={{ padding: '80px 40px', maxWidth: '900px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '60px', textAlign: 'center' }}>
          Seasonal Buying Questions
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {faqs.map((faq, idx) => (
            <div key={idx} style={{ border: `1px solid var(--le-border)`, borderRadius: '6px', overflow: 'hidden' }}>
              <button
                onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                style={{
                  width: '100%',
                  padding: '20px',
                  backgroundColor: expandedFaq === idx ? 'var(--le-card-bg)' : 'transparent',
                  border: 'none',
                  textAlign: 'left',
                  fontSize: '15px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  transition: 'background-color 0.2s'
                }}
              >
                <span>{faq.q}</span>
                <span style={{
                  display: 'inline-block',
                  transition: 'transform 0.3s',
                  transform: expandedFaq === idx ? 'rotate(180deg)' : 'rotate(0)'
                }}>
                  ▼
                </span>
              </button>

              {expandedFaq === idx && (
                <div style={{
                  padding: '20px',
                  backgroundColor: 'var(--le-bg)',
                  borderTop: `1px solid var(--le-border)`,
                  fontSize: '14px',
                  lineHeight: '1.6',
                  color: 'var(--le-text)',
                  opacity: 0.9
                }}>
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section style={{ padding: '60px 40px', backgroundColor: 'var(--le-card-bg)', textAlign: 'center' }}>
        <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>
          Start Your Home Search Today
        </h3>
        <p style={{ fontSize: '15px', marginBottom: '24px', opacity: 0.8 }}>
          Whether you\u2019re buying this season or planning ahead, our agents are ready to guide you through the process.
        </p>
        <button
          style={{
            padding: '14px 32px',
            backgroundColor: 'var(--le-primary)',
            color: 'white',
            fontSize: '15px',
            fontWeight: 'bold',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            transition: 'transform 0.2s, box-shadow 0.2s'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)'
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'scale(1)'
            e.currentTarget.style.boxShadow = 'none'
          }}
        >
          Connect With an Agent
        </button>
      </section>
    </article>
  )
}
