'use client';

import React, { useState } from 'react';

export default function BuyerGuidePage() {
  const [expandedStep, setExpandedStep] = useState<number | null>(null);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    preApproved: 'no'
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const timeline = [
    {
      title: 'Assess Your Finances',
      content: [
        'Before you start house hunting, it\u2019s essential to understand your financial situation. Review your credit report and credit score, which will directly impact your mortgage interest rates. Calculate your current savings, monthly income, and existing debts to get a realistic picture of what you can afford.',
        'Consider consulting with a financial advisor to create a savings plan if you\u2019re not yet ready to buy. Most lenders prefer a credit score of 620 or higher, though scores above 740 typically qualify for better rates. Having at least 3–6 months of expenses saved for emergencies is also recommended.',
        'Start thinking about your down payment goal. While some loans allow as little as 3% down, putting down 20% eliminates private mortgage insurance (PMI) and saves you thousands over the life of the loan.'
      ]
    },
    {
      title: 'Get Pre-Approved',
      content: [
        'A mortgage pre-approval is a lender\u2019s conditional commitment to loan you a specific amount. This involves submitting financial documents—tax returns, pay stubs, bank statements, and employment verification—so the lender can assess your creditworthiness.',
        'Pre-approval typically takes 3–5 business days and shows sellers you\u2019re a serious buyer. This is different from pre-qualification, which is just a rough estimate based on what you tell the lender. Pre-approval carries much more weight in competitive markets.',
        'Once pre-approved, you\u2019ll receive a pre-approval letter stating the maximum loan amount you qualify for. Keep this letter handy when you start touring homes and making offers.'
      ]
    },
    {
      title: 'Find a Real Estate Agent',
      content: [
        'A buyer\u2019s agent works on your behalf to find properties, negotiate offers, and guide you through the entire process. Interview multiple agents to find someone who knows your target market, understands your priorities, and communicates well.',
        'Your agent should have recent sales data for your area, know which neighborhoods are up-and-coming, and understand local market trends. They also help you avoid overpaying and spot potential red flags in properties or deals.',
        'Most buyer\u2019s agents are paid through commission from the seller, so their service typically costs you nothing directly. A good agent is invaluable in navigating negotiations and timelines.'
      ]
    },
    {
      title: 'Start Searching',
      content: [
        'With pre-approval and an agent in hand, the fun part begins: house hunting. Use online platforms like MLS databases, Zillow, Redfin, and your agent\u2019s private network to find listings that match your criteria—location, size, price, and must-haves.',
        'Tour homes in person whenever possible. Photos don\u2019t capture everything; you want to feel the neighborhood, check water pressure, inspect the roof condition, and get a sense of natural light and layout. Take notes and photos for reference.',
        'Make a short list of your top 3–5 homes. Discuss with your agent what comparable homes in the area are selling for to help set realistic expectations and offer prices.'
      ]
    },
    {
      title: 'Make an Offer',
      content: [
        'Once you\u2019ve found a home you love, your agent will help you submit a purchase offer. This offer includes the price, earnest money deposit (typically 1–3% of purchase price), closing date, and any contingencies like home inspection or appraisal.',
        'In a competitive market, a stronger offer might include a larger earnest money deposit, fewer contingencies, or a shorter closing timeline. However, always protect yourself with inspection and appraisal contingencies.',
        'The seller will either accept, reject, or counter your offer. Be prepared to negotiate. If your offer is accepted, you move forward with the inspection phase and formal loan application.'
      ]
    },
    {
      title: 'Home Inspection',
      content: [
        'Schedule a professional home inspection within 7–10 days of your offer being accepted. A licensed inspector examines the structure, roof, plumbing, electrical, HVAC, and other systems, typically spending 2–3 hours on a single-family home.',
        'You have the right to be present during the inspection. Ask questions and take notes. The inspector will provide a detailed report highlighting any issues, from minor cosmetic problems to major structural concerns or code violations.',
        'Based on the inspection report, you can request repairs, credits, or renegotiate. If major issues are found, you can walk away (if you included an inspection contingency). Most homes have some issues—it\u2019s about determining what\u2019s acceptable and getting quotes for repairs.'
      ]
    },
    {
      title: 'Appraisal',
      content: [
        'The lender orders an appraisal to ensure the home\u2019s value supports your loan amount. An appraiser inspects the property and compares it to recently sold, similar homes in the area (comps). The appraisal typically takes 5–7 business days.',
        'If the appraisal comes in lower than your offer price, you have options: renegotiate the price with the seller, pay the difference in cash, or walk away (depending on your contingencies). If the appraisal is higher, you\u2019re in a strong position.',
        'Appraisals are independent and not influenced by the sales price. The lender uses this value to protect their investment. It\u2019s a standard part of the mortgage process that protects both you and the lender.'
      ]
    },
    {
      title: 'Final Underwriting & Approval',
      content: [
        'After the appraisal, your loan file moves to underwriting. The underwriter reviews all your financial documents, the appraisal, title report, and inspection to verify everything meets lending standards.',
        'The underwriter may request additional documents or clarifications. Respond promptly to avoid delays. This phase typically takes 3–5 business days but can be longer if issues arise.',
        'Once the underwriter signs off, you receive a clear-to-close notice, meaning the lender has formally approved your mortgage. At this point, your loan is locked in (assuming rates were locked earlier).'
      ]
    },
    {
      title: 'Final Walkthrough & Closing',
      content: [
        'Before closing, do a final walkthrough of the home to confirm all agreed-upon repairs were completed, any personal property the seller promised to leave is there, and the home is in the expected condition.',
        'At closing, you\u2019ll sign all final documents including the promissory note, deed of trust/mortgage, closing disclosure, and title documents. A title company or attorney facilitates the closing, which typically takes 1–2 hours.',
        'You\u2019ll wire your down payment and closing costs (usually required 24 hours before closing). After signing, the title company records the deed, funds are transferred, and you receive the keys to your new home!'
      ]
    },
    {
      title: 'Move In',
      content: [
        'Congratulations! You\u2019re now a homeowner. Schedule utility transfers (electricity, gas, water, internet) to start on or just before your move-in date. Update your address with the post office, insurance companies, employers, and financial institutions.',
        'Plan your moving logistics carefully. Hire professional movers or arrange help from friends well in advance. Don\u2019t forget to meter reading photos for utilities, get keys copied, and locate important shut-offs (water, gas, electrical).',
        'Take time to settle in, explore your neighborhood, meet neighbors, and locate essential services. Welcome home—you\u2019ve earned this moment!'
      ]
    }
  ];

  const faqs = [
    {
      question: 'What\u2019s the difference between pre-qualification and pre-approval?',
      answer: 'Pre-qualification is an informal estimate based on information you provide; it involves no verification. Pre-approval involves a formal application, documentation review, and credit check. Pre-approval carries significant weight with sellers and shows you\u2019re a serious buyer.'
    },
    {
      question: 'How much should I put down as a down payment?',
      answer: 'Down payments typically range from 3% to 20% of the purchase price. A 20% down payment eliminates PMI and saves you thousands in interest. However, many buyers start with 5–10% down. The minimum depends on your loan type (FHA, VA, conventional) and lender requirements.'
    },
    {
      question: 'What are closing costs?',
      answer: 'Closing costs are fees paid at closing and typically range from 2–5% of the purchase price. They include loan origination fees, appraisal, title insurance, home inspection, attorney fees, property taxes, homeowners insurance, and HOA transfer fees. Lenders are required to provide an estimate upfront.'
    },
    {
      question: 'What\u2019s PMI and can I avoid it?',
      answer: 'Private Mortgage Insurance (PMI) protects the lender if you default. It\u2019s required if you put down less than 20%. PMI costs 0.55–2.25% of your loan annually. You can avoid it by putting down 20%, making a larger down payment, or finding a piggyback loan (a second mortgage alongside your primary loan).'
    },
    {
      question: 'Should I get a home inspection?',
      answer: 'Absolutely. A professional home inspection (usually $300–500) is one of the best investments you can make. It uncovers hidden issues, prevents costly surprises, and gives you leverage to negotiate repairs or price adjustments with the seller.'
    },
    {
      question: 'How long does the entire buying process take?',
      answer: 'From pre-approval to closing typically takes 30–45 days. However, this varies based on appraisal timelines, underwriting, title issues, and market conditions. Competitive markets may move faster; areas with more paperwork may take longer.'
    },
    {
      question: 'What if the appraisal comes in low?',
      answer: 'If the appraised value is lower than your offer price, you can renegotiate the price with the seller, pay the difference in cash, request the seller reduce the price, or walk away (if you included an appraisal contingency). Many experienced agents can help you navigate this.'
    },
    {
      question: 'Is it better to get a fixed or adjustable-rate mortgage?',
      answer: 'Fixed-rate mortgages lock in the same interest rate for the entire loan term (15, 20, or 30 years), providing stability and predictability. Adjustable-rate mortgages (ARMs) have lower initial rates but adjust after a set period, risking higher payments later. Fixed-rate mortgages are generally better for most first-time buyers.'
    },
    {
      question: 'What contingencies should I include in my offer?',
      answer: 'Standard contingencies include home inspection, appraisal, financing approval, and clear title. These protect you if major issues arise. In competitive markets, fewer contingencies make your offer stronger, but always protect yourself with at least inspection and appraisal contingencies.'
    },
    {
      question: 'How do I find the right neighborhood?',
      answer: 'Visit neighborhoods at different times of day to get a feel for safety, noise, and community. Research school ratings, walkability scores, crime statistics, and future development plans. Talk to residents and your real estate agent about neighborhood trends, property values, and lifestyle factors.'
    }
  ];

  const costs = [
    { item: 'Down Payment', percentage: 20, color: 'var(--le-primary)' },
    { item: 'Closing Costs', percentage: 3.5, color: 'var(--le-accent)' },
    { item: 'Home Inspection', percentage: 0.4, color: '#10b981' },
    { item: 'Appraisal', percentage: 0.3, color: '#8b5cf6' },
    { item: 'Title Insurance', percentage: 1, color: '#f59e0b' },
    { item: 'Attorney/Escrow', percentage: 1.5, color: '#ec4899' },
    { item: 'Moving', percentage: 1.2, color: '#14b8a6' },
    { item: 'Home Warranty (optional)', percentage: 0.5, color: '#06b6d4' }
  ];

  const marketTips = [
    {
      title: 'Start Your Search Early',
      description: 'New listings often sell quickly. Set up alerts on MLS and major platforms to be notified immediately when homes matching your criteria hit the market.'
    },
    {
      title: 'Get Pre-Approved Before Searching',
      description: 'Sellers take pre-approved offers seriously. Having pre-approval eliminates back-and-forth on financing and strengthens your negotiating position.'
    },
    {
      title: 'Understand Local Market Trends',
      description: 'Is it a buyer\u2019s or seller\u2019s market? How long do homes typically stay listed? What\u2019s the average price trend? Your agent can provide this crucial market data.'
    },
    {
      title: 'Make a Strong First Offer',
      description: 'In competitive markets, lowball offers often get rejected outright. Research comps, listen to your agent\u2019s advice, and make a competitive offer to avoid losing the home.'
    },
    {
      title: 'Be Flexible on Non-Essentials',
      description: 'Focus your must-haves. If you\u2019re flexible on minor updates, paint colors, or yard landscaping, you expand your options and may find better value.'
    },
    {
      title: 'Don\u2019t Wait for the Perfect Time',
      description: 'The housing market fluctuates, but "perfect timing" is a myth. Focus on finding the right home in your budget now rather than waiting for hypothetical better rates.'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah M., Portland, OR',
      story: 'As a first-time buyer, I felt overwhelmed until I connected with my agent. Getting pre-approved gave me confidence, and having a clear timeline helped me stay organized. Six months later, I\u2019m in my dream home and couldn\u2019t be happier. The process was easier than I expected!',
      home: 'Purchased a 3-bed craftsman in SE Portland'
    },
    {
      name: 'Marcus & Diana, Austin, TX',
      story: 'We waited too long to get pre-approved, which cost us the first home we loved. But that taught us a valuable lesson. We regrouped, got pre-approved immediately, and within three weeks, we had an accepted offer on an even better property. Timing and preparation matter!',
      home: 'Purchased a 4-bed modern home in East Austin'
    },
    {
      name: 'Jennifer L., Denver, CO',
      story: 'The home inspection saved us thousands. We discovered foundation issues that the seller agreed to repair before closing. Without that inspection, we\u2019d have been on the hook for expensive repairs. This was the smartest $400 I\u2019ve ever spent on real estate.',
      home: 'Purchased a 2-bed mountain home with mountain views'
    }
  ];

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 5000);
  };

  return (
    <div style={{ backgroundColor: 'var(--le-bg)', color: 'var(--le-text)', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
      {/* Hero Section */}
      <section style={{ backgroundColor: 'var(--le-primary)', color: 'white', padding: '60px 20px', textAlign: 'center' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h1 style={{ fontSize: 'clamp(28px, 6vw, 48px)', marginBottom: '20px', fontWeight: '700', lineHeight: '1.2' }}>
            The Complete Guide to Buying Your First Home
          </h1>
          <p style={{ fontSize: 'clamp(16px, 2vw, 20px)', marginBottom: '40px', opacity: 0.95, fontWeight: '300', lineHeight: '1.6' }}>
            Everything you need to know—from pre-approval to closing day. Navigate the homebuying journey with confidence.
          </p>
          <button
            onClick={() => document.getElementById('pre-approval-form')?.scrollIntoView({ behavior: 'smooth' })}
            style={{
              backgroundColor: 'var(--le-accent)',
              color: '#fff',
              border: 'none',
              padding: '14px 32px',
              fontSize: '16px',
              fontWeight: '600',
              borderRadius: '6px',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--le-primary-hover)')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--le-accent)')}
          >
            Get Pre-Approved Today
          </button>
        </div>
      </section>

      {/* Timeline Section */}
      <section style={{ padding: '60px 20px', maxWidth: '1000px', margin: '0 auto' }}>
        <h2 style={{ fontSize: 'clamp(28px, 5vw, 40px)', marginBottom: '10px', fontWeight: '700', color: 'var(--le-text)' }}>
          10-Step Buying Timeline
        </h2>
        <p style={{ fontSize: '16px', marginBottom: '40px', color: 'var(--le-text-secondary)', lineHeight: '1.6' }}>
          Follow this roadmap from pre-approval to moving day. Each step typically takes 3–7 days, with the full process taking 30–45 days.
        </p>
        <div style={{ display: 'grid', gap: '20px' }}>
          {timeline.map((step, idx) => (
            <div
              key={idx}
              style={{
                border: `2px solid ${expandedStep === idx ? 'var(--le-primary)' : 'var(--le-border)'}`,
                borderRadius: '8px',
                overflow: 'hidden',
                backgroundColor: expandedStep === idx ? 'var(--le-surface)' : 'transparent',
                transition: 'all 0.3s ease'
              }}
            >
              <button
                onClick={() => setExpandedStep(expandedStep === idx ? null : idx)}
                style={{
                  width: '100%',
                  padding: '20px',
                  backgroundColor: expandedStep === idx ? 'var(--le-surface)' : 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  fontSize: '16px',
                  fontWeight: '600',
                  color: 'var(--le-text)',
                  transition: 'background-color 0.2s ease'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.02)')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = expandedStep === idx ? 'var(--le-surface)' : 'transparent')}
              >
                <div style={{
                  minWidth: '32px',
                  width: '32px',
                  height: '32px',
                  backgroundColor: 'var(--le-primary)',
                  color: 'white',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '700',
                  fontSize: '14px'
                }}>
                  {idx + 1}
                </div>
                <span>{step.title}</span>
                <div style={{ marginLeft: 'auto', fontSize: '20px', fontWeight: '700', color: 'var(--le-primary)' }}>
                  {expandedStep === idx ? '−' : '+'}
                </div>
              </button>
              {expandedStep === idx && (
                <div style={{ padding: '0 20px 20px 20px', borderTop: `1px solid var(--le-border)`, backgroundColor: 'rgba(0,0,0,0.01)' }}>
                  {step.content.map((paragraph, pIdx) => (
                    <p key={pIdx} style={{ fontSize: '14px', lineHeight: '1.7', color: 'var(--le-text-secondary)', marginBottom: pIdx < step.content.length - 1 ? '16px' : '0' }}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Cost Breakdown Section */}
      <section style={{ padding: '60px 20px', backgroundColor: 'var(--le-surface)', maxWidth: '1000px', margin: '0 auto' }}>
        <h2 style={{ fontSize: 'clamp(28px, 5vw, 40px)', marginBottom: '10px', fontWeight: '700', color: 'var(--le-text)' }}>
          Buyer Cost Breakdown
        </h2>
        <p style={{ fontSize: '16px', marginBottom: '40px', color: 'var(--le-text-secondary)', lineHeight: '1.6' }}>
          Here\u2019s what a typical homebuyer should budget for. Your exact costs will depend on location, loan type, and property details.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px' }}>
          <div>
            <div style={{ marginBottom: '20px' }}>
              {costs.map((cost, idx) => (
                <div key={idx} style={{ marginBottom: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '14px', fontWeight: '500' }}>
                    <span>{cost.item}</span>
                    <span style={{ fontWeight: '700' }}>{cost.percentage}%</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', backgroundColor: 'var(--le-border)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: `${Math.min(cost.percentage, 100)}%`, height: '100%', backgroundColor: cost.color, borderRadius: '4px' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ backgroundColor: 'var(--le-bg)', padding: '24px', borderRadius: '8px', border: `1px solid var(--le-border)` }}>
              <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px', color: 'var(--le-text)' }}>
                Example: $400k Home Purchase
              </h3>
              <div style={{ display: 'grid', gap: '10px', fontSize: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Down Payment (20%)</span>
                  <span style={{ fontWeight: '600' }}>$80,000</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Closing Costs (3.5%)</span>
                  <span style={{ fontWeight: '600' }}>$14,000</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Inspection & Appraisal</span>
                  <span style={{ fontWeight: '600' }}>$1,400</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Moving</span>
                  <span style={{ fontWeight: '600' }}>$5,000</span>
                </div>
                <div style={{ borderTop: `1px solid var(--le-border)`, paddingTop: '10px', display: 'flex', justifyContent: 'space-between', fontWeight: '700' }}>
                  <span>Total Upfront</span>
                  <span style={{ color: 'var(--le-primary)' }}>$100,400</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Market Tips Section */}
      <section style={{ padding: '60px 20px', maxWidth: '1000px', margin: '0 auto' }}>
        <h2 style={{ fontSize: 'clamp(28px, 5vw, 40px)', marginBottom: '10px', fontWeight: '700', color: 'var(--le-text)' }}>
          Smart Buyer Tips for 2026
        </h2>
        <p style={{ fontSize: '16px', marginBottom: '40px', color: 'var(--le-text-secondary)', lineHeight: '1.6' }}>
          Current market insights to help you make the best decision.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          {marketTips.map((tip, idx) => (
            <div key={idx} style={{
              padding: '24px',
              backgroundColor: 'var(--le-surface)',
              borderRadius: '8px',
              border: `1px solid var(--le-border)`,
              transition: 'transform 0.3s ease, box-shadow 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
            >
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px', color: 'var(--le-text)' }}>
                {tip.title}
              </h3>
              <p style={{ fontSize: '14px', lineHeight: '1.6', color: 'var(--le-text-secondary)' }}>
                {tip.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section style={{ padding: '60px 20px', backgroundColor: 'var(--le-surface)', maxWidth: '1000px', margin: '0 auto' }}>
        <h2 style={{ fontSize: 'clamp(28px, 5vw, 40px)', marginBottom: '10px', fontWeight: '700', color: 'var(--le-text)' }}>
          Buyer FAQ
        </h2>
        <p style={{ fontSize: '16px', marginBottom: '40px', color: 'var(--le-text-secondary)', lineHeight: '1.6' }}>
          Answers to the most common questions from first-time homebuyers.
        </p>
        <div style={{ display: 'grid', gap: '16px' }}>
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              style={{
                border: `2px solid ${expandedFaq === idx ? 'var(--le-primary)' : 'var(--le-border)'}`,
                borderRadius: '8px',
                overflow: 'hidden',
                backgroundColor: expandedFaq === idx ? 'var(--le-bg)' : 'white',
                transition: 'all 0.3s ease'
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
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  fontSize: '15px',
                  fontWeight: '600',
                  color: 'var(--le-text)',
                  transition: 'background-color 0.2s ease'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.02)')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <span>{faq.question}</span>
                <div style={{ marginLeft: 'auto', fontSize: '18px', fontWeight: '700', color: 'var(--le-primary)', minWidth: '24px' }}>
                  {expandedFaq === idx ? '−' : '+'}
                </div>
              </button>
              {expandedFaq === idx && (
                <div style={{ padding: '0 20px 20px 20px', borderTop: `1px solid var(--le-border)`, backgroundColor: 'var(--le-bg)' }}>
                  <p style={{ fontSize: '14px', lineHeight: '1.7', color: 'var(--le-text-secondary)' }}>
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Success Stories Section */}
      <section style={{ padding: '60px 20px', maxWidth: '1000px', margin: '0 auto' }}>
        <h2 style={{ fontSize: 'clamp(28px, 5vw, 40px)', marginBottom: '10px', fontWeight: '700', color: 'var(--le-text)' }}>
          Real Buyer Success Stories
        </h2>
        <p style={{ fontSize: '16px', marginBottom: '40px', color: 'var(--le-text-secondary)', lineHeight: '1.6' }}>
          See how first-time buyers like you successfully navigated the homebuying process.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '28px' }}>
          {testimonials.map((testimonial, idx) => (
            <div key={idx} style={{
              padding: '28px',
              backgroundColor: 'var(--le-surface)',
              borderRadius: '8px',
              border: `1px solid var(--le-border)`,
              display: 'flex',
              flexDirection: 'column'
            }}>
              <div style={{ marginBottom: '16px', display: 'flex', gap: '4px' }}>
                {[...Array(5)].map((_, i) => (
                  <span key={i} style={{ color: '#fbbf24', fontSize: '18px' }}>★</span>
                ))}
              </div>
              <p style={{ fontSize: '14px', lineHeight: '1.7', color: 'var(--le-text-secondary)', marginBottom: '20px', flex: '1' }}>
                "{testimonial.story}"
              </p>
              <div style={{ borderTop: `1px solid var(--le-border)`, paddingTop: '16px' }}>
                <p style={{ fontSize: '14px', fontWeight: '600', color: 'var(--le-text)', marginBottom: '4px' }}>
                  {testimonial.name}
                </p>
                <p style={{ fontSize: '13px', color: 'var(--le-text-secondary)' }}>
                  {testimonial.home}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pre-Approval Form Section */}
      <section id="pre-approval-form" style={{ padding: '60px 20px', backgroundColor: 'var(--le-primary)', color: 'white', maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ maxWidth: '500px', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(24px, 4vw, 36px)', marginBottom: '10px', fontWeight: '700' }}>
            Get Pre-Approved Today
          </h2>
          <p style={{ fontSize: '15px', marginBottom: '30px', opacity: 0.95, lineHeight: '1.6' }}>
            Start your homebuying journey with pre-approval. We\u2019ll get back to you within 24 hours.
          </p>

          {formSubmitted ? (
            <div style={{
              backgroundColor: 'rgba(255,255,255,0.15)',
              padding: '20px',
              borderRadius: '6px',
              textAlign: 'center',
              fontSize: '15px',
              fontWeight: '500'
            }}>
              <p style={{ marginBottom: '8px' }}>✓ Thank you! We\u2019ve received your information.</p>
              <p style={{ opacity: 0.9, fontSize: '14px' }}>A mortgage specialist will contact you within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} style={{ display: 'grid', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px', opacity: 0.95 }}>
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
                    padding: '12px 14px',
                    fontSize: '14px',
                    border: '1px solid rgba(255,255,255,0.3)',
                    borderRadius: '4px',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    color: 'white',
                    boxSizing: 'border-box',
                    transition: 'background-color 0.2s ease'
                  }}
                  onFocus={(e) => (e.target.style.backgroundColor = 'rgba(255,255,255,0.15)')}
                  onBlur={(e) => (e.target.style.backgroundColor = 'rgba(255,255,255,0.1)')}
                  placeholder="Jane Smith"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px', opacity: 0.95 }}>
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
                    padding: '12px 14px',
                    fontSize: '14px',
                    border: '1px solid rgba(255,255,255,0.3)',
                    borderRadius: '4px',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    color: 'white',
                    boxSizing: 'border-box',
                    transition: 'background-color 0.2s ease'
                  }}
                  onFocus={(e) => (e.target.style.backgroundColor = 'rgba(255,255,255,0.15)')}
                  onBlur={(e) => (e.target.style.backgroundColor = 'rgba(255,255,255,0.1)')}
                  placeholder="jane@example.com"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px', opacity: 0.95 }}>
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
                    padding: '12px 14px',
                    fontSize: '14px',
                    border: '1px solid rgba(255,255,255,0.3)',
                    borderRadius: '4px',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    color: 'white',
                    boxSizing: 'border-box',
                    transition: 'background-color 0.2s ease'
                  }}
                  onFocus={(e) => (e.target.style.backgroundColor = 'rgba(255,255,255,0.15)')}
                  onBlur={(e) => (e.target.style.backgroundColor = 'rgba(255,255,255,0.1)')}
                  placeholder="(555) 123-4567"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '12px', opacity: 0.95 }}>
                  Are you pre-approved?
                </label>
                <div style={{ display: 'flex', gap: '24px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name="preApproved"
                      value="yes"
                      checked={formData.preApproved === 'yes'}
                      onChange={handleFormChange}
                      style={{ cursor: 'pointer' }}
                    />
                    <span style={{ fontSize: '14px' }}>Yes</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name="preApproved"
                      value="no"
                      checked={formData.preApproved === 'no'}
                      onChange={handleFormChange}
                      style={{ cursor: 'pointer' }}
                    />
                    <span style={{ fontSize: '14px' }}>No</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name="preApproved"
                      value="maybe"
                      checked={formData.preApproved === 'maybe'}
                      onChange={handleFormChange}
                      style={{ cursor: 'pointer' }}
                    />
                    <span style={{ fontSize: '14px' }}>In Progress</span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                style={{
                  backgroundColor: 'var(--le-accent)',
                  color: '#fff',
                  border: 'none',
                  padding: '14px 28px',
                  fontSize: '15px',
                  fontWeight: '600',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  marginTop: '8px',
                  transition: 'background-color 0.3s ease',
                  width: '100%'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.25)')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--le-accent)')}
              >
                Request Pre-Approval
              </button>
              <p style={{ fontSize: '12px', opacity: 0.8, textAlign: 'center', marginTop: '12px' }}>
                We\u2019ll never share your information. See our privacy policy for details.
              </p>
            </form>
          )}
        </div>
      </section>

      {/* Footer CTA */}
      <section style={{ padding: '40px 20px', backgroundColor: 'var(--le-surface)', textAlign: 'center' }}>
        <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '16px', color: 'var(--le-text)' }}>
          Ready to start your homebuying journey?
        </h3>
        <p style={{ fontSize: '15px', color: 'var(--le-text-secondary)', marginBottom: '24px', maxWidth: '500px', margin: '0 auto 24px' }}>
          Our team of mortgage specialists is here to guide you every step of the way. Get pre-approved and take the first step toward homeownership.
        </p>
        <button
          onClick={() => document.getElementById('pre-approval-form')?.scrollIntoView({ behavior: 'smooth' })}
          style={{
            backgroundColor: 'var(--le-primary)',
            color: 'white',
            border: 'none',
            padding: '12px 28px',
            fontSize: '14px',
            fontWeight: '600',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--le-primary-hover)')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--le-primary)')}
        >
          Get Started with Pre-Approval
        </button>
      </section>
    </div>
  );
}
