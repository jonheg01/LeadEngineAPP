'use client';

import { useState } from 'react';

export default function RealEstateAgentGuidePage() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setFormData({ name: '', email: '', phone: '' });
    setTimeout(() => setFormSubmitted(false), 3000);
  };

  const faqItems = [
    {
      question: 'How much commission do real estate agents typically charge?',
      answer: 'Most agents earn 5-6% commission, split between buyer and seller agents. This is typically negotiable and varies by market and property type.'
    },
    {
      question: 'Should I use the listing agent to buy a property?',
      answer: 'It\u2019s generally better to have your own buyer\u2019s agent. They represent your interests exclusively and you typically pay no fee—the seller\u2019s agent commission covers both sides.'
    },
    {
      question: 'How do I know if an agent is trustworthy?',
      answer: 'Check their MLS history, read client reviews, verify their licensing status, and ask for references. A good agent will be transparent about experience and track record.'
    },
    {
      question: 'How long should I commit to working with an agent?',
      answer: 'Most buyer agency agreements last 3 months. You can renegotiate or end early if the relationship isn\u2019t working. For sellers, listings typically run 4-6 months.'
    },
    {
      question: 'Can an agent represent both buyer and seller?',
      answer: 'In dual agency situations, one agent represents both parties. This is legal but creates conflicts of interest. Many buyers and sellers prefer separate representation.'
    }
  ];

  const qualities = [
    { title: 'Local Market Expertise', desc: 'Deep knowledge of neighborhoods, prices, and trends' },
    { title: 'Responsive & Accessible', desc: 'Returns calls quickly and available when you need them' },
    { title: 'Negotiation Skills', desc: 'Proven ability to get favorable terms and prices' },
    { title: 'Honest Communication', desc: 'Tells you what you need to hear, not just what you want' },
    { title: 'Tech-Savvy', desc: 'Uses modern tools, virtual tours, and digital marketing' },
    { title: 'Strong Network', desc: 'Connections with other agents, lenders, and contractors' }
  ];

  const questions = [
    'How many homes have you sold in our target area in the past year?',
    'What\u2019s your average sale price and how do they compare to list price?',
    'How do you price homes? What data do you use?',
    'What\u2019s your marketing strategy for my home/search?',
    'Are you a full-time agent or do you do this part-time?',
    'How will you keep me informed during the process?',
    'How do you handle negotiations and multiple offers?',
    'What are your commission rates and are they negotiable?',
    'Can you provide references from recent clients?',
    'What happens if we don\u2019t find a home/sell within our timeframe?'
  ];

  const redFlags = [
    'Pushes you to list/buy without a proper market analysis',
    'Unavailable or slow to respond to questions',
    'Refuses to provide references or client testimonials',
    'Suggests paying commission upfront before closing',
    'Discourages you from getting a home inspection',
    'Pressures you into bidding higher without justification',
    'Lacks knowledge about the current local market',
    'Works from a home office with no physical presence',
    'Doesn\u2019t use a contract or has vague terms',
    'Makes unrealistic promises about price or timeline'
  ];

  return (
    <article style={{ backgroundColor: 'var(--le-bg)', color: 'var(--le-text)' }}>
      <section style={{ padding: '60px 20px', backgroundColor: 'var(--le-primary)', color: 'white', textAlign: 'center' }}>
        <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '16px' }}>
          How to Choose the Right Real Estate Agent
        </h1>
        <p style={{ fontSize: '18px', opacity: 0.9, maxWidth: '600px', margin: '0 auto' }}>
          Your agent is one of the most important people in your real estate transaction. Learn how to find the perfect fit for your goals.
        </p>
      </section>

      <section style={{ maxWidth: '900px', margin: '0 auto', padding: '60px 20px' }}>
        <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '16px' }}>Why You Need the Right Agent</h2>
        <p style={{ fontSize: '16px', lineHeight: '1.6', marginBottom: '24px' }}>
          Real estate is one of life\u2019s biggest transactions. The right agent can save you thousands of dollars, help you avoid costly mistakes, and guide you through complex negotiations. They bring market knowledge, industry connections, and legal expertise that you likely don\u2019t have.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginTop: '32px' }}>
          <div style={{ padding: '24px', backgroundColor: 'var(--le-card-bg)', borderRadius: '8px', borderLeft: '4px solid var(--le-primary)' }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>
              <svg viewBox="0 0 24 24" width="24" height="24" fill="var(--le-primary)" style={{ display: 'inline' }}>
                <path d="M12 2c5.5 0 10 4.5 10 10s-4.5 10-10 10S2 17.5 2 12 6.5 2 12 2m0 3c-3.9 0-7 3.1-7 7s3.1 7 7 7 7-3.1 7-7-3.1-7-7-7m3.3 9.5l-4.3-2.5V8c0-.4-.3-.7-.7-.7s-.7.3-.7.7v5.5c0 .4.2.7.5.9l4.8 2.8c.3.2.8.1 1-.2.2-.3.1-.8-.2-1z" />
              </svg>
            </div>
            <h3 style={{ fontWeight: 'bold', marginBottom: '8px' }}>Time Saved</h3>
            <p style={{ fontSize: '14px', opacity: 0.8 }}>Agents handle showings, paperwork, and coordination so you can focus on your life.</p>
          </div>
          <div style={{ padding: '24px', backgroundColor: 'var(--le-card-bg)', borderRadius: '8px', borderLeft: '4px solid var(--le-accent)' }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>
              <svg viewBox="0 0 24 24" width="24" height="24" fill="var(--le-accent)" style={{ display: 'inline' }}>
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
              </svg>
            </div>
            <h3 style={{ fontWeight: 'bold', marginBottom: '8px' }}>Better Deals</h3>
            <p style={{ fontSize: '14px', opacity: 0.8 }}>Market knowledge and negotiation skills typically earn back their commission many times over.</p>
          </div>
          <div style={{ padding: '24px', backgroundColor: 'var(--le-card-bg)', borderRadius: '8px', borderLeft: '4px solid var(--le-primary)' }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>
              <svg viewBox="0 0 24 24" width="24" height="24" fill="var(--le-primary)" style={{ display: 'inline' }}>
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
              </svg>
            </div>
            <h3 style={{ fontWeight: 'bold', marginBottom: '8px' }}>Legal Protection</h3>
            <p style={{ fontSize: '14px', opacity: 0.8 }}>Agents understand contracts, disclosures, and protect your interests throughout the transaction.</p>
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: 'var(--le-card-bg)', padding: '60px 20px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '32px', textAlign: 'center' }}>Key Qualities to Look For</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {qualities.map((quality, idx) => (
              <div key={idx} style={{ padding: '20px', backgroundColor: 'var(--le-bg)', borderRadius: '8px' }}>
                <h3 style={{ fontWeight: 'bold', marginBottom: '8px', fontSize: '16px' }}>{quality.title}</h3>
                <p style={{ fontSize: '14px', opacity: 0.8 }}>{quality.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ maxWidth: '900px', margin: '0 auto', padding: '60px 20px' }}>
        <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '24px' }}>Questions to Ask Prospective Agents</h2>
        <p style={{ fontSize: '16px', marginBottom: '24px', opacity: 0.9 }}>
          Before committing to an agent, conduct a thorough interview. Here are the essential questions you should ask:
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          {questions.map((q, idx) => (
            <div key={idx} style={{ padding: '16px', backgroundColor: 'var(--le-card-bg)', borderRadius: '6px', borderLeft: '3px solid var(--le-accent)' }}>
              <p style={{ fontSize: '14px', fontWeight: 'bold' }}>{q}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ backgroundColor: 'var(--le-card-bg)', padding: '60px 20px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '32px', textAlign: 'center' }}>Buyer vs. Listing Agent: What\u2019s the Difference?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
            <div>
              <h3 style={{ fontWeight: 'bold', fontSize: '18px', marginBottom: '16px', color: 'var(--le-primary)' }}>Buyer\u2019s Agent</h3>
              <ul style={{ fontSize: '14px', lineHeight: '1.8', paddingLeft: '20px' }}>
                <li style={{ marginBottom: '8px' }}>Represents you (the buyer) exclusively</li>
                <li style={{ marginBottom: '8px' }}>Finds properties and schedules showings</li>
                <li style={{ marginBottom: '8px' }}>Helps you make competitive offers</li>
                <li style={{ marginBottom: '8px' }}>Negotiates on your behalf</li>
                <li style={{ marginBottom: '8px' }}>No cost to you (seller pays commission)</li>
                <li>Typically earns 2.5-3% of purchase price</li>
              </ul>
            </div>
            <div>
              <h3 style={{ fontWeight: 'bold', fontSize: '18px', marginBottom: '16px', color: 'var(--le-accent)' }}>Listing Agent</h3>
              <ul style={{ fontSize: '14px', lineHeight: '1.8', paddingLeft: '20px' }}>
                <li style={{ marginBottom: '8px' }}>Represents the seller exclusively</li>
                <li style={{ marginBottom: '8px' }}>Markets the property to potential buyers</li>
                <li style={{ marginBottom: '8px' }}>Schedules showings and open houses</li>
                <li style={{ marginBottom: '8px' }}>Negotiates with buyer\u2019s agents</li>
                <li style={{ marginBottom: '8px' }}>Paid by the seller from sale proceeds</li>
                <li>Typically earns 2.5-3% of purchase price</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section style={{ maxWidth: '900px', margin: '0 auto', padding: '60px 20px' }}>
        <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '24px' }}>How Agents Get Paid: Commission Structure Explained</h2>
        <div style={{ padding: '24px', backgroundColor: 'var(--le-card-bg)', borderRadius: '8px', marginBottom: '24px' }}>
          <h3 style={{ fontWeight: 'bold', marginBottom: '12px' }}>Standard Commission</h3>
          <p style={{ fontSize: '14px', marginBottom: '12px' }}>
            The typical real estate commission is 5-6% of the sale price. This is usually split 50/50 between the listing agent and buyer\u2019s agent. So each agent typically earns 2.5-3% on most transactions.
          </p>
          <p style={{ fontSize: '14px', opacity: 0.9 }}>
            Important: Commission is negotiable. Many agents, especially experienced ones, may negotiate lower rates or discuss different commission structures.
          </p>
        </div>
        <div style={{ padding: '24px', backgroundColor: 'var(--le-card-bg)', borderRadius: '8px', marginBottom: '24px' }}>
          <h3 style={{ fontWeight: 'bold', marginBottom: '12px' }}>Who Pays?</h3>
          <p style={{ fontSize: '14px' }}>
            For home sales, the seller typically pays both commissions from the proceeds at closing. As a buyer, you don\u2019t pay your agent directly—the seller\u2019s commission covers both agents. This is why you should always have your own buyer\u2019s agent to ensure your interests are protected.
          </p>
        </div>
        <div style={{ padding: '24px', backgroundColor: 'var(--le-card-bg)', borderRadius: '8px' }}>
          <h3 style={{ fontWeight: 'bold', marginBottom: '12px' }}>For Sellers</h3>
          <p style={{ fontSize: '14px' }}>
            When listing your home, you\u2019ll negotiate the commission rate with your listing agent. This becomes the starting point for what buyer\u2019s agents will earn. Higher commissions can incentivize more buyer\u2019s agents to show your home.
          </p>
        </div>
      </section>

      <section style={{ backgroundColor: 'var(--le-card-bg)', padding: '60px 20px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '32px', textAlign: 'center' }}>Red Flags to Watch Out For</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
            {redFlags.map((flag, idx) => (
              <div key={idx} style={{ padding: '16px', backgroundColor: 'var(--le-bg)', borderRadius: '6px', borderLeft: '3px solid #d9534f' }}>
                <p style={{ fontSize: '14px', fontWeight: '500' }}>{flag}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ maxWidth: '900px', margin: '0 auto', padding: '60px 20px' }}>
        <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '32px' }}>Agent Interview Checklist</h2>
        <div style={{ backgroundColor: 'var(--le-card-bg)', padding: '32px', borderRadius: '8px' }}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'flex', alignItems: 'center', fontSize: '14px', marginBottom: '12px', cursor: 'pointer' }}>
              <input type="checkbox" style={{ marginRight: '12px', cursor: 'pointer' }} />
              Verified licensing and active MLS membership
            </label>
            <label style={{ display: 'flex', alignItems: 'center', fontSize: '14px', marginBottom: '12px', cursor: 'pointer' }}>
              <input type="checkbox" style={{ marginRight: '12px', cursor: 'pointer' }} />
              Track record and sales history in target area
            </label>
            <label style={{ display: 'flex', alignItems: 'center', fontSize: '14px', marginBottom: '12px', cursor: 'pointer' }}>
              <input type="checkbox" style={{ marginRight: '12px', cursor: 'pointer' }} />
              References from recent clients (at least 3)
            </label>
            <label style={{ display: 'flex', alignItems: 'center', fontSize: '14px', marginBottom: '12px', cursor: 'pointer' }}>
              <input type="checkbox" style={{ marginRight: '12px', cursor: 'pointer' }} />
              Clear understanding of your needs and timeline
            </label>
            <label style={{ display: 'flex', alignItems: 'center', fontSize: '14px', marginBottom: '12px', cursor: 'pointer' }}>
              <input type="checkbox" style={{ marginRight: '12px', cursor: 'pointer' }} />
              Transparency about commission and pricing
            </label>
            <label style={{ display: 'flex', alignItems: 'center', fontSize: '14px', marginBottom: '12px', cursor: 'pointer' }}>
              <input type="checkbox" style={{ marginRight: '12px', cursor: 'pointer' }} />
              Professional and responsive communication style
            </label>
            <label style={{ display: 'flex', alignItems: 'center', fontSize: '14px', marginBottom: '12px', cursor: 'pointer' }}>
              <input type="checkbox" style={{ marginRight: '12px', cursor: 'pointer' }} />
              Modern technology and marketing approach
            </label>
            <label style={{ display: 'flex', alignItems: 'center', fontSize: '14px', cursor: 'pointer' }}>
              <input type="checkbox" style={{ marginRight: '12px', cursor: 'pointer' }} />
              Clear explanation of their process and expectations
            </label>
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: 'var(--le-primary)', color: 'white', padding: '60px 20px' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '16px' }}>Ready to Find Your Agent?</h2>
          <p style={{ fontSize: '16px', marginBottom: '32px', opacity: 0.95 }}>
            Get connected with vetted real estate professionals in your area. Let us help match you with the right agent for your goals.
          </p>

          {formSubmitted ? (
            <div style={{ padding: '24px', backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: '8px', fontSize: '16px' }}>
              Thanks for reaching out! We\u2019ll connect you with top agents in your area shortly.
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} style={{ display: 'grid', gap: '12px' }}>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleFormChange}
                required
                style={{
                  padding: '12px 16px',
                  borderRadius: '6px',
                  border: 'none',
                  fontSize: '14px',
                  fontFamily: 'inherit'
                }}
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleFormChange}
                required
                style={{
                  padding: '12px 16px',
                  borderRadius: '6px',
                  border: 'none',
                  fontSize: '14px',
                  fontFamily: 'inherit'
                }}
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleFormChange}
                style={{
                  padding: '12px 16px',
                  borderRadius: '6px',
                  border: 'none',
                  fontSize: '14px',
                  fontFamily: 'inherit'
                }}
              />
              <button
                type="submit"
                style={{
                  padding: '14px 24px',
                  backgroundColor: 'var(--le-accent)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  marginTop: '8px'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
              >
                Connect Me With Agents
              </button>
            </form>
          )}
        </div>
      </section>

      <section style={{ maxWidth: '900px', margin: '0 auto', padding: '60px 20px' }}>
        <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '32px' }}>Frequently Asked Questions</h2>
        <div style={{ display: 'grid', gap: '12px' }}>
          {faqItems.map((item, idx) => (
            <div
              key={idx}
              style={{
                border: `1px solid var(--le-border)`,
                borderRadius: '6px',
                overflow: 'hidden',
                backgroundColor: expandedFaq === idx ? 'var(--le-card-bg)' : 'transparent'
              }}
            >
              <button
                onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                style={{
                  width: '100%',
                  padding: '16px',
                  textAlign: 'left',
                  backgroundColor: expandedFaq === idx ? 'var(--le-card-bg)' : 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '15px',
                  fontWeight: 'bold',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontFamily: 'inherit',
                  color: 'var(--le-text)'
                }}
              >
                {item.question}
                <span style={{ fontSize: '18px', opacity: 0.6 }}>
                  {expandedFaq === idx ? '−' : '+'}
                </span>
              </button>
              {expandedFaq === idx && (
                <div style={{ padding: '0 16px 16px 16px', fontSize: '14px', opacity: 0.85, borderTop: `1px solid var(--le-border)` }}>
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <footer style={{ backgroundColor: 'var(--le-card-bg)', padding: '40px 20px', marginTop: '40px', textAlign: 'center', fontSize: '13px', opacity: 0.7 }}>
        <p>Real Estate Agent Guide - RealtyClientEngine.app</p>
      </footer>
    </article>
  );
}
