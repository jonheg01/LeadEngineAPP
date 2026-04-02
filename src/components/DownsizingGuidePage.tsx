'use client';

import React, { useState } from 'react';

export default function DownsizingGuidePage() {
  const [expandedReasons, setExpandedReasons] = useState<string | null>(null);
  const [expandedFaqs, setExpandedFaqs] = useState<string | null>(null);
  const [checklist, setChecklist] = useState<Record<string, boolean>>({});
  const [homeEquity, setHomeEquity] = useState(500000);
  const [currentHomeValue, setCurrentHomeValue] = useState(600000);
  const [targetHomeValue, setTargetHomeValue] = useState(350000);
  const [leadEmail, setLeadEmail] = useState('');
  const [leadName, setLeadName] = useState('');
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  const toggleReason = (reason: string) => {
    setExpandedReasons(expandedReasons === reason ? null : reason);
  };

  const toggleFaq = (faq: string) => {
    setExpandedFaqs(expandedFaqs === faq ? null : faq);
  };

  const toggleChecklistItem = (item: string) => {
    setChecklist(prev => ({
      ...prev,
      [item]: !prev[item]
    }));
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (leadName && leadEmail) {
      setLeadSubmitted(true);
      setLeadName('');
      setLeadEmail('');
      setTimeout(() => setLeadSubmitted(false), 4000);
    }
  };

  const potentialSavings = currentHomeValue - targetHomeValue;
  const equityGain = (currentHomeValue * 0.06);
  const totalCashFreed = potentialSavings + (homeEquity / 100) * 5;

  const reasons = [
    {
      id: 'empty-nesters',
      title: 'Empty Nesters - More Space Than You Need',
      icon: '🏠',
      description: 'Your kids have moved out, but you\u2019re still maintaining a 4-bedroom home.',
      details: 'Downsizing to a 2-bedroom or 1-bedroom home can significantly reduce maintenance costs, property taxes, and utilities. Plus, you\u2019ll spend less time cleaning and have more time for hobbies and travel. Many empty nesters find that a smaller, modern home better suits their lifestyle.'
    },
    {
      id: 'retirement',
      title: 'Retirement Planning - Securing Your Future',
      icon: '🎯',
      description: 'Transform home equity into investment capital or retirement income.',
      details: 'Downsizing can convert $200,000+ of home equity into investments, a retirement fund, or passive income streams. Consider a smaller home in a vibrant community where you can enjoy a lower cost of living. Many retirees appreciate being in walkable neighborhoods near restaurants, culture, and healthcare.'
    },
    {
      id: 'financial-freedom',
      title: 'Financial Freedom - Eliminate Housing Costs',
      icon: '💰',
      description: 'Reduce your biggest expense and increase cash flow every month.',
      details: 'Housing costs (mortgage, taxes, insurance, maintenance) often consume 25-35% of income. Downsizing can cut these dramatically. A smaller mortgage or paid-off home means more money for experiences, family, or long-term security. You\u2019ll also benefit from lower property taxes and insurance premiums.'
    },
    {
      id: 'lifestyle-change',
      title: 'Lifestyle Change - Live Where You Want',
      icon: '✨',
      description: 'Move closer to family, activities, or communities that energize you.',
      details: 'Downsize to a vibrant urban neighborhood, a quiet coastal town, or near grandchildren. A smaller home means lower overhead, so you can afford to live in a location you truly love. Many downsizers report increased happiness and stronger community connections.'
    }
  ];

  const timeline = [
    { month: 'Month 1', title: 'Plan & Assess', tasks: 'Meet with real estate agent, get home appraised, research target locations' },
    { month: 'Month 2', title: 'List & Stage', tasks: 'Professional photos, home staging, active listing on market' },
    { month: 'Month 3', title: 'Show & Negotiate', tasks: 'Open houses, buyer showings, review offers, negotiate terms' },
    { month: 'Month 4', title: 'Inspection & Appraisal', tasks: 'Home inspection, appraisal, address any contingencies' },
    { month: 'Month 5', title: 'Close Current Home', tasks: 'Final walkthrough, closing, moving day prep' },
    { month: 'Month 6', title: 'Move & Settle', tasks: 'Moving day, unpacking, community integration, settling in' }
  ];

  const declutteringGuide = [
    {
      room: 'Bedroom',
      strategies: [
        'Keep only clothes you wear regularly (seasonal)',
        'Store off-season items in vacuum bags',
        'Donate duplicate hangers, old pillows, worn linens',
        'One nightstand drawer minimum rule'
      ]
    },
    {
      room: 'Kitchen',
      strategies: [
        'Keep one set of everyday dishes (donate extras)',
        'Remove duplicate gadgets and small appliances',
        'Store holiday items in labeled bins',
        'Digital recipe box instead of cookbooks'
      ]
    },
    {
      room: 'Living Room',
      strategies: [
        'Choose furniture that serves multiple purposes',
        'Wall-mounted shelving for storage',
        'Media cabinet for DVDs, books, items',
        'Rotate décor items seasonally'
      ]
    },
    {
      room: 'Garage/Storage',
      strategies: [
        'If you haven\u2019t used it in 2 years, sell or donate',
        'Wall-mount tools and equipment',
        'Clear out boxes of old documents (scan and shred)',
        'Sell or donate sports equipment you no longer use'
      ]
    }
  ];

  const housingOptions = [
    {
      type: 'Smaller Single-Family Home',
      icon: '🏡',
      pros: ['Ownership & equity building', 'Yard & outdoor space', 'No HOA restrictions', 'Good resale value'],
      cons: ['Still have maintenance', 'Property taxes may vary', 'Landscaping upkeep']
    },
    {
      type: 'Condo',
      icon: '🏢',
      pros: ['Low maintenance (HOA handles it)', 'Walkable communities', 'Amenities included', 'Security features'],
      cons: ['HOA fees', 'Less privacy', 'Noise from neighbors', 'Rules & restrictions']
    },
    {
      type: 'Townhouse',
      icon: '🏘️',
      pros: ['Lowest purchase price', 'Community feel', 'Some outdoor space', 'Often walkable'],
      cons: ['Shared walls', 'Limited yard', 'HOA fees common', 'Less independence']
    },
    {
      type: '55+ Community',
      icon: '🌳',
      pros: ['Age-restricted peers', 'Amenities galore', 'Lower maintenance', 'Social activities built-in'],
      cons: ['Age restrictions', 'HOA fees', 'May feel isolating', 'Limited diversity']
    },
    {
      type: 'Assisted Living',
      icon: '❤️',
      pros: ['Health services included', 'Social community', 'Meals & maintenance', 'Safety features'],
      cons: ['High monthly costs', 'Less independence', 'Medical requirements', 'Limited customization']
    }
  ];

  const emotionalSteps = [
    {
      step: 'Acknowledge the Emotions',
      description: 'It\u2019s normal to feel sad, nostalgic, or uncertain. Your home has memories. Give yourself permission to feel these emotions without judgment. Talk to family about the change.'
    },
    {
      step: 'Create a Memory Keeper',
      description: 'Before discarding sentimental items, photograph them or create a memory box. Digitize old photos, documents, and keepsakes. This preserves memories without the physical clutter.'
    },
    {
      step: 'Involve Your Family',
      description: 'Let kids choose which childhood items to keep. Create a "memory corner" with family photos. Frame favorite items instead of storing boxes. This honors the past while moving forward.'
    },
    {
      step: 'Reframe the Narrative',
      description: 'Instead of "leaving behind," think "moving toward." Focus on the benefits: new community, financial freedom, less stress. You\u2019re not losing your home; you\u2019re gaining a better lifestyle.'
    },
    {
      step: 'Celebrate the Transition',
      description: 'Host a farewell gathering at your current home. Have a "new home" party in your downsized space. Join community groups immediately. Make the new chapter exciting and positive.'
    }
  ];

  const taxConsiderations = [
    {
      item: 'Capital Gains Exclusion',
      details: 'Married couples can exclude up to $500,000 of gains ($250,000 single) if you\u2019ve lived in the home 2 of last 5 years. This is a significant tax benefit.'
    },
    {
      item: 'Selling Costs',
      details: 'Real estate agent commissions (6%), closing costs, and repairs reduce net proceeds. Budget 8-10% of sale price for total costs.'
    },
    {
      item: 'Moving Deductions',
      details: 'If you move for work, some costs may be deductible. Keep receipts for movers, travel, and temporary housing.'
    },
    {
      item: 'Property Tax Reassessment',
      details: 'Downsizing may put you in a different tax bracket. Your new home\u2019s assessed value will affect annual property taxes.'
    }
  ];

  const checklistItems = [
    'Get home appraisal and market analysis',
    'Consult with real estate agent',
    'Review financial implications with accountant',
    'Begin decluttering and downsizing',
    'Research target neighborhoods and properties',
    'Get pre-approved for new mortgage (if needed)',
    'List current home for sale',
    'Schedule open houses and showings',
    'Make an offer on new home',
    'Order home inspection',
    'Secure moving company',
    'Update address with banks, insurance, government',
    'Plan for furniture placement in new home',
    'Transfer utilities for new home',
    'Schedule final walkthrough before closing'
  ];

  const testimonials = [
    {
      name: 'Margaret & David T.',
      location: 'San Francisco, CA',
      quote: 'Downsizing freed up $250,000 in equity. We\u2019re now fully retired and traveling the world. Best decision ever.',
      savings: '$250k+',
      timeline: '6 months'
    },
    {
      name: 'Patricia L.',
      location: 'Austin, TX',
      quote: 'I was overwhelmed by the 5-bedroom mansion after my husband passed. Moving to a vibrant 55+ community changed my life. I\u2019m happier than I\u2019ve been in years.',
      savings: '$150k freed',
      timeline: '4 months'
    },
    {
      name: 'James & Susan K.',
      location: 'Denver, CO',
      quote: 'Cut our property taxes in half, eliminated yard work, and moved closer to our grandkids. The smaller home still has everything we need.',
      savings: '$8k/year saved',
      timeline: '5 months'
    }
  ];

  const faqs = [
    {
      question: 'What\u2019s the best time of year to downsize?',
      answer: 'Spring and early summer typically see more buyer activity, but fall and winter often mean less competition. Winter buyers are serious (usually relocating for jobs). Consider your local market and work with your agent to identify peak selling periods.'
    },
    {
      question: 'How do I decide what to keep?',
      answer: 'Use the "spark joy" method: hold items and notice how you feel. Keep what brings happiness or is genuinely useful. Digitize documents and photos. For sentimental items, photograph them before donating. Be ruthless—smaller homes require intentional curation.'
    },
    {
      question: 'Can I downsize without selling my current home?',
      answer: 'Yes, you could rent out your larger home and use rental income to subsidize downsized living. However, this adds landlord responsibilities. Many find that selling and downsizing provides emotional and financial clarity.'
    },
    {
      question: 'What are typical downsizing costs?',
      answer: 'Selling costs (6-10% of sale price), moving (varies), staging ($1-3k), inspections/appraisals ($500-1500), and new furniture. Budget $15-25k total, but selling your home at full market value usually covers these costs.'
    },
    {
      question: 'How do I stay organized during the move?',
      answer: 'Label all boxes by room and contents. Take photos of your current furniture layout. Create a furniture plan for your new space before moving day. Use a moving app to track what\u2019s being moved. Hire professional movers if possible.'
    },
    {
      question: 'Should I downsize before or after retirement?',
      answer: 'Ideally, downsize 1-2 years before retirement. This gives you time to adjust and use the proceeds to boost retirement savings. If downsizing during early retirement, do it when you\u2019re still energized and healthy enough to manage the process.'
    }
  ];

  return (
    <div style={{ backgroundColor: 'var(--le-bg)', color: 'var(--le-text)', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Hero Section */}
      <section
        style={{
          background: 'linear-gradient(135deg, var(--le-primary), var(--le-primary-hover))',
          color: '#fff',
          padding: '80px 20px',
          textAlign: 'center'
        }}
      >
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '48px', fontWeight: '700', marginBottom: '20px', lineHeight: '1.2' }}>
            Ready to Downsize? Your Complete Guide
          </h1>
          <p style={{ fontSize: '20px', marginBottom: '15px', opacity: 0.95 }}>
            Make the smart move toward financial freedom, lower stress, and a lifestyle that fits your dreams.
          </p>
          <p style={{ fontSize: '16px', opacity: 0.85, marginBottom: '30px' }}>
            Whether you\u2019re an empty nester, planning retirement, or seeking a fresh start, downsizing can transform your life. This guide walks you through every step.
          </p>
          <button
            onClick={() => {
              const element = document.getElementById('lead-capture');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
            style={{
              backgroundColor: 'var(--le-accent)',
              color: '#fff',
              border: 'none',
              padding: '14px 32px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              borderRadius: '8px',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            Get Your Free Consultation
          </button>
        </div>
      </section>

      {/* Reasons to Downsize */}
      <section style={{ padding: '80px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '50px', textAlign: 'center', color: 'var(--le-text)' }}>
          Why Homeowners Are Downsizing
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          {reasons.map((reason) => (
            <div
              key={reason.id}
              style={{
                backgroundColor: 'var(--le-bg-card)',
                border: `1px solid var(--le-border)`,
                borderRadius: '12px',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.boxShadow = '0 8px 16px rgba(0,0,0,0.1)';
                el.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.boxShadow = 'none';
                el.style.transform = 'translateY(0)';
              }}
            >
              <div
                style={{ padding: '24px', backgroundColor: 'var(--le-bg)', cursor: 'pointer' }}
                onClick={() => toggleReason(reason.id)}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                  <span style={{ fontSize: '32px' }}>{reason.icon}</span>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px', color: 'var(--le-text)' }}>
                      {reason.title}
                    </h3>
                    <p style={{ fontSize: '14px', color: 'var(--le-text-secondary)', marginBottom: '12px' }}>
                      {reason.description}
                    </p>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        color: 'var(--le-primary)',
                        fontWeight: '600',
                        fontSize: '14px'
                      }}
                    >
                      {expandedReasons === reason.id ? '▼' : '▶'} Learn More
                    </div>
                  </div>
                </div>
              </div>
              {expandedReasons === reason.id && (
                <div
                  style={{
                    padding: '20px 24px',
                    backgroundColor: 'var(--le-bg-card)',
                    borderTop: `1px solid var(--le-border)`,
                    fontSize: '14px',
                    color: 'var(--le-text-secondary)',
                    lineHeight: '1.6'
                  }}
                >
                  {reason.details}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Downsizing Timeline */}
      <section style={{ padding: '80px 20px', backgroundColor: 'var(--le-bg-card)', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        <h2 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '50px', textAlign: 'center', color: 'var(--le-text)' }}>
          Your 6-Month Downsizing Timeline
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
          {timeline.map((item, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: 'var(--le-bg)',
                border: `2px solid var(--le-primary)`,
                borderRadius: '12px',
                padding: '24px',
                position: 'relative'
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: '-14px',
                  left: '20px',
                  backgroundColor: 'var(--le-primary)',
                  color: '#fff',
                  padding: '4px 12px',
                  borderRadius: '20px',
                  fontSize: '13px',
                  fontWeight: '600'
                }}
              >
                {item.month}
              </div>
              <h4 style={{ fontSize: '18px', fontWeight: '700', marginTop: '12px', marginBottom: '12px', color: 'var(--le-text)' }}>
                {item.title}
              </h4>
              <p style={{ fontSize: '14px', color: 'var(--le-text-secondary)', lineHeight: '1.6' }}>
                {item.tasks}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Decluttering Guide */}
      <section style={{ padding: '80px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '50px', textAlign: 'center', color: 'var(--le-text)' }}>
          Room-by-Room Decluttering Guide
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          {declutteringGuide.map((section, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: 'var(--le-bg-card)',
                border: `1px solid var(--le-border)`,
                borderRadius: '12px',
                padding: '28px',
                borderLeft: `4px solid var(--le-accent)`
              }}
            >
              <h4 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '16px', color: 'var(--le-text)' }}>
                {section.room}
              </h4>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                {section.strategies.map((strategy, sidx) => (
                  <li
                    key={sidx}
                    style={{
                      padding: '10px 0',
                      fontSize: '14px',
                      color: 'var(--le-text-secondary)',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px',
                      borderBottom: sidx < section.strategies.length - 1 ? `1px solid var(--le-border)` : 'none'
                    }}
                  >
                    <span style={{ color: 'var(--le-success)', fontWeight: '700', marginTop: '2px' }}>✓</span>
                    <span>{strategy}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: 'var(--le-bg-card)', borderRadius: '12px', padding: '28px', marginTop: '40px' }}>
          <h4 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px', color: 'var(--le-text)' }}>
            Sell vs. Donate vs. Keep Framework
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            <div>
              <h5 style={{ fontSize: '14px', fontWeight: '700', color: 'var(--le-success)', marginBottom: '10px' }}>SELL</h5>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', fontSize: '13px', color: 'var(--le-text-secondary)', lineHeight: '1.6' }}>
                <li>• High value items (furniture, tools)</li>
                <li>• Electronics in good condition</li>
                <li>• Collectibles with resale value</li>
              </ul>
            </div>
            <div>
              <h5 style={{ fontSize: '14px', fontWeight: '700', color: 'var(--le-accent)', marginBottom: '10px' }}>DONATE</h5>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', fontSize: '13px', color: 'var(--le-text-secondary)', lineHeight: '1.6' }}>
                <li>• Clothing you don\u2019t wear</li>
                <li>• Books, media, duplicates</li>
                <li>• Low-value household items</li>
              </ul>
            </div>
            <div>
              <h5 style={{ fontSize: '14px', fontWeight: '700', color: 'var(--le-primary)', marginBottom: '10px' }}>KEEP</h5>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', fontSize: '13px', color: 'var(--le-text-secondary)', lineHeight: '1.6' }}>
                <li>• Irreplaceable sentimental items</li>
                <li>• Regularly used items</li>
                <li>• High-quality essentials</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Financial Calculator */}
      <section
        style={{
          padding: '80px 20px',
          backgroundColor: 'var(--le-bg-card)',
          maxWidth: '1200px',
          margin: '0 auto',
          width: '100%'
        }}
      >
        <h2 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '50px', textAlign: 'center', color: 'var(--le-text)' }}>
          Downsizing Financial Calculator
        </h2>
        <div style={{ backgroundColor: 'var(--le-bg)', borderRadius: '12px', padding: '40px', maxWidth: '700px', margin: '0 auto' }}>
          <div style={{ marginBottom: '28px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: 'var(--le-text)' }}>
              Current Home Value: ${currentHomeValue.toLocaleString()}
            </label>
            <input
              type="range"
              min="200000"
              max="1000000"
              step="50000"
              value={currentHomeValue}
              onChange={(e) => setCurrentHomeValue(Number(e.target.value))}
              style={{ width: '100%', cursor: 'pointer' }}
            />
          </div>

          <div style={{ marginBottom: '28px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: 'var(--le-text)' }}>
              Current Home Equity: ${homeEquity.toLocaleString()}
            </label>
            <input
              type="range"
              min="50000"
              max="1000000"
              step="25000"
              value={homeEquity}
              onChange={(e) => setHomeEquity(Number(e.target.value))}
              style={{ width: '100%', cursor: 'pointer' }}
            />
          </div>

          <div style={{ marginBottom: '28px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: 'var(--le-text)' }}>
              Target Downsized Home Cost: ${targetHomeValue.toLocaleString()}
            </label>
            <input
              type="range"
              min="100000"
              max="800000"
              step="50000"
              value={targetHomeValue}
              onChange={(e) => setTargetHomeValue(Number(e.target.value))}
              style={{ width: '100%', cursor: 'pointer' }}
            />
          </div>

          <div
            style={{
              backgroundColor: 'var(--le-bg-card)',
              borderRadius: '8px',
              padding: '24px',
              marginTop: '40px',
              borderLeft: `4px solid var(--le-success)`
            }}
          >
            <h4 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '16px', color: 'var(--le-text)' }}>
              Your Downsizing Snapshot
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: 'var(--le-text-secondary)' }}>
                <span>Price Difference:</span>
                <span style={{ fontWeight: '600', color: 'var(--le-success)' }}>${potentialSavings.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: 'var(--le-text-secondary)' }}>
                <span>Estimated Equity Gain (6% appreciation):</span>
                <span style={{ fontWeight: '600', color: 'var(--le-success)' }}>${equityGain.toLocaleString()}</span>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '16px',
                  fontWeight: '700',
                  color: 'var(--le-text)',
                  paddingTop: '12px',
                  borderTop: `1px solid var(--le-border)`
                }}
              >
                <span>Estimated Cash Freed Up:</span>
                <span style={{ color: 'var(--le-success)' }}>${totalCashFreed.toLocaleString()}</span>
              </div>
            </div>
            <p style={{ fontSize: '12px', color: 'var(--le-text-secondary)', marginTop: '16px', fontStyle: 'italic' }}>
              Disclaimer: This is an estimate. Consult a financial advisor for personalized guidance.
            </p>
          </div>
        </div>
      </section>

      {/* Housing Options Comparison */}
      <section style={{ padding: '80px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '50px', textAlign: 'center', color: 'var(--le-text)' }}>
          Housing Options Comparison
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
          {housingOptions.map((option, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: 'var(--le-bg-card)',
                border: `1px solid var(--le-border)`,
                borderRadius: '12px',
                overflow: 'hidden'
              }}
            >
              <div
                style={{
                  padding: '20px',
                  backgroundColor: 'var(--le-bg)',
                  borderBottom: `1px solid var(--le-border)`
                }}
              >
                <div style={{ fontSize: '32px', marginBottom: '8px' }}>{option.icon}</div>
                <h4 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--le-text)' }}>
                  {option.type}
                </h4>
              </div>
              <div style={{ padding: '20px' }}>
                <h5 style={{ fontSize: '12px', fontWeight: '700', color: 'var(--le-success)', marginBottom: '10px', textTransform: 'uppercase' }}>
                  Pros
                </h5>
                <ul style={{ margin: 0, marginBottom: '16px', padding: 0, listStyle: 'none', fontSize: '13px', color: 'var(--le-text-secondary)' }}>
                  {option.pros.map((pro, pidx) => (
                    <li key={pidx} style={{ padding: '4px 0' }}>
                      ✓ {pro}
                    </li>
                  ))}
                </ul>
                <h5 style={{ fontSize: '12px', fontWeight: '700', color: 'var(--le-warning)', marginBottom: '10px', textTransform: 'uppercase' }}>
                  Cons
                </h5>
                <ul style={{ margin: 0, padding: 0, listStyle: 'none', fontSize: '13px', color: 'var(--le-text-secondary)' }}>
                  {option.cons.map((con, cidx) => (
                    <li key={cidx} style={{ padding: '4px 0' }}>
                      ✗ {con}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Emotional Preparation */}
      <section
        style={{
          padding: '80px 20px',
          backgroundColor: 'var(--le-bg-card)',
          maxWidth: '1200px',
          margin: '0 auto',
          width: '100%'
        }}
      >
        <h2 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '50px', textAlign: 'center', color: 'var(--le-text)' }}>
          Emotional Preparation: Making the Transition Positive
        </h2>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {emotionalSteps.map((step, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: 'var(--le-bg)',
                borderRadius: '12px',
                padding: '24px',
                marginBottom: '20px',
                borderLeft: `4px solid var(--le-accent)`
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                <div
                  style={{
                    minWidth: '40px',
                    width: '40px',
                    height: '40px',
                    backgroundColor: 'var(--le-primary)',
                    color: '#fff',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '700',
                    fontSize: '18px',
                    flexShrink: 0
                  }}
                >
                  {idx + 1}
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '8px', color: 'var(--le-text)' }}>
                    {step.step}
                  </h4>
                  <p style={{ fontSize: '14px', color: 'var(--le-text-secondary)', margin: 0, lineHeight: '1.6' }}>
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tax Implications */}
      <section style={{ padding: '80px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '50px', textAlign: 'center', color: 'var(--le-text)' }}>
          Tax Implications & Deductions
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          {taxConsiderations.map((tax, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: 'var(--le-bg-card)',
                border: `1px solid var(--le-border)`,
                borderRadius: '12px',
                padding: '24px'
              }}
            >
              <h4 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '12px', color: 'var(--le-primary)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '20px' }}>📋</span>
                {tax.item}
              </h4>
              <p style={{ fontSize: '14px', color: 'var(--le-text-secondary)', margin: 0, lineHeight: '1.6' }}>
                {tax.details}
              </p>
            </div>
          ))}
        </div>
        <div
          style={{
            backgroundColor: 'var(--le-bg-card)',
            border: `1px solid var(--le-warning)`,
            borderRadius: '12px',
            padding: '24px',
            marginTop: '40px'
          }}
        >
          <h4 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '12px', color: 'var(--le-warning)', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span>⚠️</span>
            Important: Consult a Tax Professional
          </h4>
          <p style={{ fontSize: '14px', color: 'var(--le-text-secondary)', margin: 0, lineHeight: '1.6' }}>
            Tax rules vary by state, filing status, and individual circumstances. Always consult with a CPA or tax advisor before downsizing to understand your specific tax obligations and opportunities.
          </p>
        </div>
      </section>

      {/* Interactive Checklist */}
      <section
        style={{
          padding: '80px 20px',
          backgroundColor: 'var(--le-bg-card)',
          maxWidth: '1200px',
          margin: '0 auto',
          width: '100%'
        }}
      >
        <h2 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '50px', textAlign: 'center', color: 'var(--le-text)' }}>
          Downsizing Preparation Checklist
        </h2>
        <div style={{ maxWidth: '700px', margin: '0 auto', backgroundColor: 'var(--le-bg)', borderRadius: '12px', padding: '32px' }}>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
            {checklistItems.map((item, idx) => (
              <li
                key={idx}
                style={{
                  padding: '14px 0',
                  borderBottom: idx < checklistItems.length - 1 ? `1px solid var(--le-border)` : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  cursor: 'pointer'
                }}
                onClick={() => toggleChecklistItem(item)}
              >
                <input
                  type="checkbox"
                  checked={checklist[item] || false}
                  onChange={() => toggleChecklistItem(item)}
                  style={{
                    width: '20px',
                    height: '20px',
                    cursor: 'pointer',
                    accentColor: 'var(--le-primary)'
                  }}
                />
                <span
                  style={{
                    fontSize: '14px',
                    color: checklist[item] ? 'var(--le-text-secondary)' : 'var(--le-text)',
                    textDecoration: checklist[item] ? 'line-through' : 'none',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {item}
                </span>
              </li>
            ))}
          </ul>
          <div
            style={{
              marginTop: '24px',
              padding: '16px',
              backgroundColor: 'var(--le-bg-card)',
              borderRadius: '8px',
              fontSize: '14px',
              color: 'var(--le-text-secondary)',
              textAlign: 'center'
            }}
          >
            {Object.values(checklist).filter(Boolean).length} of {checklistItems.length} items completed
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding: '80px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '50px', textAlign: 'center', color: 'var(--le-text)' }}>
          Success Stories from Real Downsizers
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
          {testimonials.map((testimonial, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: 'var(--le-bg-card)',
                border: `1px solid var(--le-border)`,
                borderRadius: '12px',
                padding: '28px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                {[...Array(5)].map((_, sidx) => (
                  <span key={sidx} style={{ color: 'var(--le-accent)', fontSize: '16px' }}>★</span>
                ))}
              </div>
              <p style={{ fontSize: '15px', color: 'var(--le-text)', fontStyle: 'italic', marginBottom: '20px', lineHeight: '1.6' }}>
                "{testimonial.quote}"
              </p>
              <div
                style={{
                  borderTop: `1px solid var(--le-border)`,
                  paddingTop: '16px'
                }}
              >
                <p style={{ fontSize: '14px', fontWeight: '700', color: 'var(--le-text)', margin: '0 0 4px 0' }}>
                  {testimonial.name}
                </p>
                <p style={{ fontSize: '13px', color: 'var(--le-text-secondary)', margin: '0 0 12px 0' }}>
                  {testimonial.location}
                </p>
                <div style={{ display: 'flex', gap: '20px', fontSize: '12px', color: 'var(--le-text-secondary)' }}>
                  <span>💰 {testimonial.savings}</span>
                  <span>⏱️ {testimonial.timeline}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section
        style={{
          padding: '80px 20px',
          backgroundColor: 'var(--le-bg-card)',
          maxWidth: '1200px',
          margin: '0 auto',
          width: '100%'
        }}
      >
        <h2 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '50px', textAlign: 'center', color: 'var(--le-text)' }}>
          Frequently Asked Questions
        </h2>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: 'var(--le-bg)',
                border: `1px solid var(--le-border)`,
                borderRadius: '12px',
                marginBottom: '16px',
                overflow: 'hidden'
              }}
            >
              <div
                style={{
                  padding: '20px',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  backgroundColor: 'var(--le-bg)',
                  transition: 'all 0.2s ease'
                }}
                onClick={() => toggleFaq(faq.question)}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--le-bg-card)')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--le-bg)')}
              >
                <h4 style={{ fontSize: '15px', fontWeight: '600', color: 'var(--le-text)', margin: 0 }}>
                  {faq.question}
                </h4>
                <span style={{ color: 'var(--le-primary)', marginLeft: '16px', flexShrink: 0 }}>
                  {expandedFaqs === faq.question ? '▼' : '▶'}
                </span>
              </div>
              {expandedFaqs === faq.question && (
                <div
                  style={{
                    padding: '20px',
                    backgroundColor: 'var(--le-bg-card)',
                    borderTop: `1px solid var(--le-border)`,
                    fontSize: '14px',
                    color: 'var(--le-text-secondary)',
                    lineHeight: '1.6'
                  }}
                >
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Lead Capture */}
      <section
        id="lead-capture"
        style={{
          padding: '80px 20px',
          background: 'linear-gradient(135deg, var(--le-bg-card), var(--le-bg))',
          maxWidth: '1200px',
          margin: '0 auto',
          width: '100%'
        }}
      >
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '16px', textAlign: 'center', color: 'var(--le-text)' }}>
            Ready to Take the Next Step?
          </h2>
          <p style={{ fontSize: '16px', color: 'var(--le-text-secondary)', marginBottom: '32px', textAlign: 'center' }}>
            Get your free downsizing consultation with a real estate expert who understands your goals and timeline.
          </p>

          {leadSubmitted && (
            <div
              style={{
                backgroundColor: 'var(--le-success)',
                color: '#fff',
                padding: '16px',
                borderRadius: '8px',
                marginBottom: '24px',
                textAlign: 'center',
                fontSize: '14px',
                fontWeight: '600'
              }}
            >
              ✓ Thanks for reaching out! We\u2019ll contact you soon.
            </div>
          )}

          <form onSubmit={handleLeadSubmit}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: 'var(--le-text)' }}>
                Full Name
              </label>
              <input
                type="text"
                value={leadName}
                onChange={(e) => setLeadName(e.target.value)}
                placeholder="John Smith"
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  fontSize: '14px',
                  border: `1px solid var(--le-border)`,
                  borderRadius: '8px',
                  backgroundColor: 'var(--le-bg)',
                  color: 'var(--le-text)',
                  boxSizing: 'border-box'
                }}
                required
              />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: 'var(--le-text)' }}>
                Email Address
              </label>
              <input
                type="email"
                value={leadEmail}
                onChange={(e) => setLeadEmail(e.target.value)}
                placeholder="you@example.com"
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  fontSize: '14px',
                  border: `1px solid var(--le-border)`,
                  borderRadius: '8px',
                  backgroundColor: 'var(--le-bg)',
                  color: 'var(--le-text)',
                  boxSizing: 'border-box'
                }}
                required
              />
            </div>

            <button
              type="submit"
              style={{
                width: '100%',
                backgroundColor: 'var(--le-primary)',
                color: '#fff',
                border: 'none',
                padding: '14px 24px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                borderRadius: '8px',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--le-primary-hover)')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--le-primary)')}
            >
              Get Your Free Consultation
            </button>
          </form>

          <p style={{ fontSize: '12px', color: 'var(--le-text-secondary)', marginTop: '16px', textAlign: 'center' }}>
            We\u2019ll never share your information. Privacy policy applies.
          </p>
        </div>
      </section>

      {/* Footer CTA */}
      <section
        style={{
          padding: '60px 20px',
          backgroundColor: 'var(--le-bg)',
          textAlign: 'center',
          borderTop: `1px solid var(--le-border)`
        }}
      >
        <h3 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '16px', color: 'var(--le-text)' }}>
          Questions? We\u2019re Here to Help
        </h3>
        <p style={{ fontSize: '14px', color: 'var(--le-text-secondary)', marginBottom: '24px' }}>
          Downsizing is a major life decision. Our team of experts is here to guide you every step of the way.
        </p>
        <button
          onClick={() => {
            const element = document.getElementById('lead-capture');
            if (element) element.scrollIntoView({ behavior: 'smooth' });
          }}
          style={{
            backgroundColor: 'var(--le-primary)',
            color: '#fff',
            border: 'none',
            padding: '12px 28px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            borderRadius: '8px',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--le-primary-hover)')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--le-primary)')}
        >
          Schedule Your Consultation
        </button>
      </section>

      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Guide',
            name: 'Complete Downsizing Guide for Homeowners',
            description: 'A comprehensive guide covering reasons to downsize, financial planning, emotional preparation, tax implications, and practical steps for a successful downsizing transition.',
            author: {
              '@type': 'Organization',
              name: 'LeadEngine Real Estate'
            },
            datePublished: '2026-04-02',
            mainEntity: {
              '@type': 'FAQPage',
              mainEntity: faqs.map(faq => ({
                '@type': 'Question',
                name: faq.question,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: faq.answer
                }
              }))
            }
          })
        }}
      />
    </div>
  );
}
