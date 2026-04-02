'use client';

import { useState } from 'react';

export default function NeighborhoodSafetyGuidePage() {
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name || '',
          email: formData.email || '',
          phone: formData.phone || '',
          source: 'Neighborhood Safety Guide',
          lead_type: 'Buyer',
          page_url: typeof window !== 'undefined' ? window.location.pathname : '',
          captured_at: new Date().toISOString(),
        }),
      });
      if (res.ok) {
        setFormSubmitted(true);
        setTimeout(() => setFormSubmitted(false), 3000);
        setFormData({ name: '', email: '', phone: '' });
      }
    } catch {
      setFormSubmitted(true);
      setTimeout(() => setFormSubmitted(false), 3000);
    }
  };

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const faqItems = [
    {
      question: 'What\u2019s the most important safety metric to research?',
      answer: 'Crime statistics are essential, but also consider property crime vs. violent crime rates. Cross-reference data from multiple sources like NeighborhoodScout and the FBI\u2019s crime database for accuracy.'
    },
    {
      question: 'How do I know if a neighborhood is really safe?',
      answer: 'Visit at different times: early morning, daytime, and evening. Walk around, observe street lighting, maintenance levels, and community presence. Talk to residents and check emergency response times.'
    },
    {
      question: 'Are gated communities always safer?',
      answer: 'Not necessarily. Gated communities can offer controlled access, but safety depends on local crime rates, police presence, and community engagement. Research the specific area regardless of gates.'
    },
    {
      question: 'What should I look for during a neighborhood visit?',
      answer: 'Check for well-lit streets, maintained properties, visible community activity, police presence, and access to emergency services. Notice if neighbors appear engaged and if there are signs of active community programs.'
    },
    {
      question: 'How do I talk to neighbors about safety?',
      answer: 'Be friendly and genuine. Ask open-ended questions like "How long have you lived here?" and "What do you like most about the neighborhood?" Listen for mentions of safety concerns organically.'
    }
  ];

  const SafetyCheckIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );

  const MapIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );

  const TrendIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="23 6 13 16 8 11 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  );

  const UsersIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );

  const HomeIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );

  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', color: 'var(--le-text)', backgroundColor: 'var(--le-bg)' }}>
      {/* Hero Section */}
      <section style={{
        backgroundImage: 'linear-gradient(135deg, var(--le-primary) 0%, rgba(0,0,0,0.1) 100%)',
        color: '#fff',
        padding: '80px 20px',
        textAlign: 'center',
        marginBottom: '60px'
      }}>
        <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '20px', lineHeight: '1.2' }}>
          Complete Guide to Neighborhood Safety
        </h1>
        <p style={{ fontSize: '20px', maxWidth: '600px', margin: '0 auto', opacity: 0.95 }}>
          Learn how to evaluate neighborhood safety before making your home purchase decision
        </p>
      </section>

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 20px', marginBottom: '80px' }}>
        {/* How to Research Section */}
        <section style={{ marginBottom: '70px' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '30px', borderBottom: '2px solid var(--le-primary)', paddingBottom: '15px' }}>
            How to Research Neighborhood Safety
          </h2>
          <p style={{ fontSize: '16px', lineHeight: '1.7', marginBottom: '30px', color: 'var(--le-text)' }}>
            Researching neighborhood safety involves multiple layers of investigation. Start by gathering quantitative data like crime statistics, then supplement with qualitative research through personal visits and community engagement. The most informed decision comes from combining data with on-the-ground observations.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {[
              { title: 'Gather Crime Data', desc: 'Use official crime statistics, FBI databases, and neighborhood reports' },
              { title: 'Visit at Different Times', desc: 'Check the area early morning, daytime, and evening to observe patterns' },
              { title: 'Talk to Residents', desc: 'Ask current neighbors about their safety experiences and concerns' },
              { title: 'Check Emergency Services', desc: 'Verify police and fire department response times in the area' }
            ].map((item, i) => (
              <div key={i} style={{
                backgroundColor: 'var(--le-card-bg)',
                padding: '25px',
                borderRadius: '8px',
                border: '1px solid var(--le-border)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
              }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '10px', color: 'var(--le-primary)' }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '14px', lineHeight: '1.6', color: 'var(--le-text)' }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Key Safety Indicators Section */}
        <section style={{ marginBottom: '70px' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '30px', borderBottom: '2px solid var(--le-primary)', paddingBottom: '15px' }}>
            Key Safety Indicators to Track
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '25px' }}>
            {[
              {
                icon: SafetyCheckIcon,
                title: 'Crime Rate Trends',
                items: ['Violent crime rates', 'Property crime statistics', '5-year trend analysis', 'Comparison to city/state averages']
              },
              {
                icon: MapIcon,
                title: 'Environmental Factors',
                items: ['Street lighting quality', 'Property maintenance levels', 'Visible police presence', 'Community infrastructure']
              },
              {
                icon: TrendIcon,
                title: 'Community Engagement',
                items: ['Neighborhood watch programs', 'Community events', 'Local business vitality', 'Population stability']
              },
              {
                icon: UsersIcon,
                title: 'Local Resources',
                items: ['Police station proximity', 'Fire department coverage', 'School safety ratings', 'Emergency response times']
              }
            ].map((indicator, i) => {
              const IconComponent = indicator.icon;
              return (
                <div key={i} style={{
                  backgroundColor: 'var(--le-card-bg)',
                  padding: '30px',
                  borderRadius: '8px',
                  border: '1px solid var(--le-border)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px', color: 'var(--le-primary)' }}>
                    <IconComponent />
                    <h3 style={{ fontSize: '18px', fontWeight: '600', marginLeft: '12px', margin: 0 }}>
                      {indicator.title}
                    </h3>
                  </div>
                  <ul style={{ margin: '0', paddingLeft: '20px' }}>
                    {indicator.items.map((item, j) => (
                      <li key={j} style={{ fontSize: '14px', lineHeight: '1.8', color: 'var(--le-text)' }}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>

        {/* Online Tools Section */}
        <section style={{ marginBottom: '70px' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '30px', borderBottom: '2px solid var(--le-primary)', paddingBottom: '15px' }}>
            Online Tools and Resources
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
            {[
              { name: 'NeighborhoodScout', focus: 'Comprehensive safety scores and crime data analysis' },
              { name: 'CrimeReports.com', focus: 'Detailed crime statistics by location and type' },
              { name: 'FBI Crime Data Explorer', focus: 'Official federal crime statistics and trends' },
              { name: 'Zillow/Trulia Neighborhood Pages', focus: 'Safety ratings with local insights' },
              { name: 'Google Maps Street View', focus: 'Visual assessment of streets and surroundings' },
              { name: 'Local Police Department Website', focus: 'Community policing info and safety resources' }
            ].map((tool, i) => (
              <div key={i} style={{
                backgroundColor: 'var(--le-card-bg)',
                padding: '20px',
                borderRadius: '8px',
                border: `1px solid var(--le-border)`,
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
              }}>
                <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px', color: 'var(--le-primary)', margin: 0 }}>
                  {tool.name}
                </h4>
                <p style={{ fontSize: '14px', lineHeight: '1.6', color: 'var(--le-text)', margin: 0 }}>
                  {tool.focus}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Visiting Neighborhood Section */}
        <section style={{ marginBottom: '70px' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '30px', borderBottom: '2px solid var(--le-primary)', paddingBottom: '15px' }}>
            What to Look for When Visiting
          </h2>
          <div style={{ backgroundColor: 'var(--le-card-bg)', padding: '40px', borderRadius: '8px', border: '1px solid var(--le-border)' }}>
            <ul style={{ margin: 0, paddingLeft: 0 }}>
              {[
                'Street lighting: Are streetlights visible and functional? Darkness increases crime opportunity.',
                'Property maintenance: Well-maintained homes and yards suggest community pride and engagement.',
                'People activity: Observe if residents are outside, engaged, and visible during your visit.',
                'Commercial areas: Are local businesses open, staffed, and appear active and safe?',
                'Graffiti and vandalism: Check for signs of gang activity or lack of community maintenance.',
                'Parked cars and traffic: Note if the area has appropriate foot and vehicle traffic patterns.',
                'Trash and cleanliness: A clean neighborhood often correlates with community engagement.',
                'Parks and recreation: Safe, maintained public spaces indicate active community investment.'
              ].map((item, i) => (
                <li key={i} style={{
                  fontSize: '15px',
                  lineHeight: '1.8',
                  marginBottom: '16px',
                  paddingLeft: '0',
                  color: 'var(--le-text)'
                }}>
                  <strong style={{ color: 'var(--le-primary)' }}>
                    {item.split(':')[0]}:
                  </strong>
                  {' ' + item.split(':').slice(1).join(':')}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Talking to Neighbors Section */}
        <section style={{ marginBottom: '70px' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '30px', borderBottom: '2px solid var(--le-primary)', paddingBottom: '15px' }}>
            Tips for Talking to Neighbors
          </h2>
          <div style={{ backgroundColor: 'rgba(var(--le-primary-rgb), 0.05)', padding: '30px', borderRadius: '8px', borderLeft: '4px solid var(--le-primary)' }}>
            <p style={{ fontSize: '15px', lineHeight: '1.7', marginBottom: '20px', color: 'var(--le-text)' }}>
              Neighbors provide invaluable insights that statistics can\u2019t capture. Approach conversations authentically and listen actively to understand the community\u2019s real character.
            </p>
            <ul style={{ margin: 0, paddingLeft: '20px' }}>
              {[
                'Be genuine and friendly: Introduce yourself as someone considering the neighborhood',
                'Ask open-ended questions: "How long have you lived here?" and "What do you like about the neighborhood?"',
                'Listen for safety mentions: Don\u2019t ask directly about crime; let conversations flow naturally',
                'Visit multiple times: Talk to different people across different days and times',
                'Ask about schools: Parents often have detailed neighborhood knowledge and insights',
                'Inquire about changes: Ask if the neighborhood has improved or declined in recent years',
                'Understand context: Crime in a 5-block radius differs significantly from block-to-block variation'
              ].map((tip, i) => (
                <li key={i} style={{ fontSize: '14px', lineHeight: '1.8', marginBottom: '12px', color: 'var(--le-text)' }}>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Safety Features Section */}
        <section style={{ marginBottom: '70px' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '30px', borderBottom: '2px solid var(--le-primary)', paddingBottom: '15px' }}>
            Safety Features to Look for in Homes
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
            {[
              { icon: HomeIcon, feature: 'Security Systems', desc: 'Alarm systems and monitoring services' },
              { feature: 'Gated Entry', desc: 'Controlled access points and gates' },
              { feature: 'Lighting Features', desc: 'Motion sensors and exterior lighting' },
              { feature: 'Window Locks', desc: 'Secure locks on all windows and doors' },
              { feature: 'Fence/Boundaries', desc: 'Defined property boundaries and fencing' },
              { feature: 'Neighborhood Patrol', desc: 'Visible security or HOA patrols' }
            ].map((item, i) => (
              <div key={i} style={{
                backgroundColor: 'var(--le-card-bg)',
                padding: '20px',
                borderRadius: '8px',
                border: '1px solid var(--le-border)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
              }}>
                <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px', color: 'var(--le-primary)', margin: 0 }}>
                  {item.feature}
                </h4>
                <p style={{ fontSize: '14px', lineHeight: '1.6', color: 'var(--le-text)', margin: 0 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Community Watch Programs Section */}
        <section style={{ marginBottom: '70px' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '30px', borderBottom: '2px solid var(--le-primary)', paddingBottom: '15px' }}>
            Community Watch Programs
          </h2>
          <div style={{ backgroundColor: 'var(--le-card-bg)', padding: '35px', borderRadius: '8px', border: '1px solid var(--le-border)' }}>
            <p style={{ fontSize: '15px', lineHeight: '1.7', marginBottom: '20px', color: 'var(--le-text)' }}>
              Active neighborhood watch programs are strong indicators of community engagement and safety. These organized groups work with law enforcement to prevent crime and build safer neighborhoods.
            </p>
            <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '15px', color: 'var(--le-primary)' }}>
              What to Look for:
            </h4>
            <ul style={{ margin: 0, paddingLeft: '20px' }}>
              {[
                'Visible program signage in the neighborhood',
                'Active social media or communication groups',
                'Regular neighborhood meetings and events',
                'Partnership with local police department',
                'Community-wide communication about safety issues',
                'Organized patrols or monitoring activities',
                'Quick response to suspicious activity reports'
              ].map((item, i) => (
                <li key={i} style={{ fontSize: '14px', lineHeight: '1.8', marginBottom: '10px', color: 'var(--le-text)' }}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Lead Capture CTA Form */}
        <section style={{
          backgroundColor: 'linear-gradient(135deg, rgba(var(--le-primary-rgb), 0.1) 0%, rgba(var(--le-accent-rgb), 0.05) 100%)',
          padding: '50px 30px',
          borderRadius: '8px',
          marginBottom: '70px',
          border: '1px solid var(--le-border)'
        }}>
          <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '15px', textAlign: 'center' }}>
            Get Your Personalized Safety Report
          </h2>
          <p style={{ fontSize: '16px', textAlign: 'center', marginBottom: '35px', color: 'var(--le-text)' }}>
            Let our real estate experts help you evaluate neighborhood safety for your specific area of interest.
          </p>

          {formSubmitted ? (
            <div style={{
              backgroundColor: '#d4edda',
              border: '1px solid #c3e6cb',
              borderRadius: '6px',
              padding: '20px',
              textAlign: 'center',
              color: '#155724',
              maxWidth: '400px',
              margin: '0 auto'
            }}>
              <p style={{ margin: 0, fontWeight: '600', fontSize: '16px' }}>
                Thank you! We\u2019ll contact you shortly with neighborhood safety insights.
              </p>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} style={{ maxWidth: '500px', margin: '0 auto' }}>
              <div style={{ marginBottom: '15px' }}>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleFormChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px 15px',
                    fontSize: '14px',
                    border: '1px solid var(--le-border)',
                    borderRadius: '6px',
                    boxSizing: 'border-box',
                    backgroundColor: '#fff'
                  }}
                />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleFormChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px 15px',
                    fontSize: '14px',
                    border: '1px solid var(--le-border)',
                    borderRadius: '6px',
                    boxSizing: 'border-box',
                    backgroundColor: '#fff'
                  }}
                />
              </div>
              <div style={{ marginBottom: '20px' }}>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleFormChange}
                  style={{
                    width: '100%',
                    padding: '12px 15px',
                    fontSize: '14px',
                    border: '1px solid var(--le-border)',
                    borderRadius: '6px',
                    boxSizing: 'border-box',
                    backgroundColor: '#fff'
                  }}
                />
              </div>
              <button
                type="submit"
                style={{
                  width: '100%',
                  padding: '14px 20px',
                  fontSize: '16px',
                  fontWeight: '600',
                  backgroundColor: 'var(--le-primary)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => e.target.style.opacity = '0.9'}
                onMouseLeave={(e) => e.target.style.opacity = '1'}
              >
                Get Safety Insights
              </button>
            </form>
          )}
        </section>

        {/* FAQ Accordion Section */}
        <section style={{ marginBottom: '80px' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '35px', borderBottom: '2px solid var(--le-primary)', paddingBottom: '15px' }}>
            Frequently Asked Questions
          </h2>
          <div>
            {faqItems.map((item, i) => (
              <div key={i} style={{
                backgroundColor: 'var(--le-card-bg)',
                marginBottom: '12px',
                borderRadius: '8px',
                border: '1px solid var(--le-border)',
                overflow: 'hidden',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
              }}>
                <button
                  onClick={() => toggleFaq(i)}
                  style={{
                    width: '100%',
                    padding: '20px',
                    fontSize: '15px',
                    fontWeight: '600',
                    textAlign: 'left',
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    color: 'var(--le-text)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(var(--le-primary-rgb), 0.05)'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                >
                  <span>{item.question}</span>
                  <span style={{ color: 'var(--le-primary)', fontSize: '20px', marginLeft: '15px' }}>
                    {expandedFaq === i ? '−' : '+'}
                  </span>
                </button>
                {expandedFaq === i && (
                  <div style={{
                    padding: '0 20px 20px 20px',
                    borderTop: '1px solid var(--le-border)',
                    fontSize: '14px',
                    lineHeight: '1.7',
                    color: 'var(--le-text)',
                    backgroundColor: 'rgba(var(--le-primary-rgb), 0.02)'
                  }}>
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Footer CTA */}
      <section style={{
        backgroundColor: 'var(--le-primary)',
        color: '#fff',
        padding: '50px 20px',
        textAlign: 'center'
      }}>
        <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '15px' }}>
          Ready to Find Your Safe Neighborhood?
        </h2>
        <p style={{ fontSize: '16px', marginBottom: '25px', opacity: 0.95 }}>
          Connect with our real estate experts who understand neighborhood dynamics and safety considerations.
        </p>
        <button style={{
          padding: '14px 32px',
          fontSize: '16px',
          fontWeight: '600',
          backgroundColor: '#fff',
          color: 'var(--le-primary)',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
        onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
        >
          Schedule a Consultation
        </button>
      </section>
    </div>
  );
}
