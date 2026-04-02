'use client';

import React, { useState, useMemo } from 'react';

// Inline SVG Icons
const CheckMarkIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16.67 5.83L8.5 14L3.33 8.83" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const HeartIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 18.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-6.55 8.54L10 18.35z"/>
  </svg>
);

const HomeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 10L10 3L17 10V17H3V10Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 17V12H11V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CalendarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="4" width="14" height="14" rx="1" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M3 8H17" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M7 1V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M13 1V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const DollarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 2V18M14 4H8C6.9 4 6 4.9 6 6V14C6 15.1 6.9 16 8 16H14C15.1 16 16 15.1 16 14V6C16 4.9 15.1 4 14 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const StarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 0L12.39 7.26H20L13.81 11.63L16.2 18.89L10 14.52L3.8 18.89L6.19 11.63L0 7.26H7.61L10 0Z"/>
  </svg>
);

const QuoteIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" opacity="0.15">
    <path d="M12 28C7.03 28 4 25 4 20V8C4 5.5 5.5 4 7 4H15C16.5 4 18 5.5 18 7V20C18 25 15 28 12 28ZM28 28C23.03 28 20 25 20 20V8C20 5.5 21.5 4 23 4H31C32.5 4 34 5.5 34 7V20C34 25 31 28 28 28Z" fill="currentColor"/>
  </svg>
);

// Types
interface ReadinessAnswer {
  questionId: string;
  score: number;
}

interface Testimonial {
  id: string;
  name: string;
  age: number;
  location: string;
  content: string;
  rating: number;
}

interface HousingOption {
  id: string;
  name: string;
  description: string;
  pros: string[];
  cons: string[];
  costRange: string;
}

// Mock Data
const mockHousingOptions: HousingOption[] = [
  {
    id: 'aging-in-place',
    name: 'Aging in Place',
    description: 'Modify your current home to meet changing needs with accessibility improvements and support services.',
    pros: ['Stay in familiar environment', 'Maintain independence', 'Often most cost-effective initially', 'Keep your memories and community'],
    cons: ['Requires home modifications', 'May need to hire care staff', 'Limited social opportunities', 'Ongoing maintenance responsibility'],
    costRange: '$5,000-$50,000+ (modifications)',
  },
  {
    id: 'independent-living',
    name: '55+ Independent Living Community',
    description: 'Vibrant communities designed for active seniors with maintenance-free living and social activities.',
    pros: ['No home maintenance', 'Built-in social community', 'Activity programs included', 'Secure, age-appropriate environment'],
    cons: ['Monthly fees required', 'Less privacy than home ownership', 'Leave behind longtime friends', 'Age restrictions apply'],
    costRange: '$2,000-$5,000/month',
  },
  {
    id: 'assisted-living',
    name: 'Assisted Living Facility',
    description: 'Professional care support with help for daily activities while maintaining some independence.',
    pros: ['Professional staff available 24/7', 'Help with daily needs', 'Medical support on-site', 'Social activities and meals provided'],
    cons: ['Higher monthly costs', 'Less independence than other options', 'Transition can be emotional', 'Shared or small private spaces'],
    costRange: '$4,000-$8,000/month',
  },
  {
    id: 'downsized-home',
    name: 'Downsized Home or Condo',
    description: 'Move to a smaller, low-maintenance property that\u2019s easier to manage while maintaining independence.',
    pros: ['Lower property taxes', 'Easier maintenance', 'Lower utilities', 'Still own your property'],
    cons: ['Moving costs and effort', 'Smaller space', 'Property taxes still apply', 'Selling process takes time'],
    costRange: 'Varies by location',
  },
];

const mockTestimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Margaret Chen',
    age: 72,
    location: 'Portland, OR',
    content: 'After 40 years in the same house, I wasn\u2019t sure I was ready to move. The guide helped me understand that moving to a 55+ community was actually the perfect choice for this chapter of my life. I\u2019m happier than I\u2019ve been in years.',
    rating: 5,
  },
  {
    id: '2',
    name: 'Robert Williams',
    age: 68,
    location: 'Denver, CO',
    content: 'The financial planning section opened my eyes to reverse mortgage options I didn\u2019t know about. Working with a LeadEngine specialist made the entire process smooth and stress-free.',
    rating: 5,
  },
  {
    id: '3',
    name: 'Patricia Martinez',
    age: 75,
    location: 'San Diego, CA',
    content: 'Downsizing after 35 years was emotional, but this guide gave me a clear, room-by-room plan. The expert I was connected with treated my possessions with respect and helped me find new homes for items I couldn\u2019t keep.',
    rating: 5,
  },
  {
    id: '4',
    name: 'James Thompson',
    age: 70,
    location: 'Atlanta, GA',
    content: 'I appreciated how the guide acknowledged that moving isn\u2019t just logistical—it\u2019s emotional. The community resources section connected me with support that made all the difference.',
    rating: 5,
  },
];

const readinessQuestions = [
  { id: 'health', label: 'My health needs are increasing', options: ['No', 'Somewhat', 'Yes'] },
  { id: 'stairs', label: 'Stairs or home maintenance are becoming difficult', options: ['No', 'Somewhat', 'Yes'] },
  { id: 'isolation', label: 'I feel isolated or lonely in my current home', options: ['No', 'Somewhat', 'Yes'] },
  { id: 'financial', label: 'Home upkeep costs are straining my budget', options: ['No', 'Somewhat', 'Yes'] },
  { id: 'family', label: 'My children live far away', options: ['No', 'Some', 'Yes'] },
  { id: 'equity', label: 'I have significant home equity I\u2019d like to access', options: ['No', 'Some', 'Yes'] },
  { id: 'desire', label: 'I desire a more social or community-focused lifestyle', options: ['No', 'Somewhat', 'Yes'] },
  { id: 'cognitive', label: 'Managing home responsibilities feels overwhelming', options: ['No', 'Somewhat', 'Yes'] },
];

const downsizingSteps = [
  { phase: 'Planning', items: ['Set a timeline (3-6 months)', 'Take photos of each room', 'Measure doorways and closets in new space', 'List sentimental items to keep'] },
  { phase: 'Room by Room', items: ['Bedroom: Keep favorite furniture and photos', 'Kitchen: Downsize dishes and gadgets', 'Office: Digitize important documents', 'Living Areas: Keep conversation pieces, donate excess'] },
  { phase: 'Distribution', items: ['Offer items to family members first', 'Contact professional appraiser for valuables', 'Plan estate sale or consignment', 'Arrange donation pickups for charity'] },
  { phase: 'Final Steps', items: ['Schedule moving company', 'Forward mail and update addresses', 'Say goodbye to the home mindfully', 'Celebrate the new beginning'] },
];

const financialConsiderations = [
  { title: 'Home Equity Access', description: 'If you own your home outright, you likely have valuable equity. Consider options like downsizing to unlock capital or exploring reverse mortgages.' },
  { title: 'Capital Gains Exclusion', description: 'When you sell, you may qualify for up to $500,000 in federal capital gains exclusion (if married). Consult a tax professional to maximize benefits.' },
  { title: 'Reverse Mortgage Overview', description: 'Available at 62+, allows you to borrow against home equity. Funds can support aging in place or provide liquidity. Requires mortgage insurance and fees.' },
  { title: 'Property Tax Implications', description: 'Downsizing may reduce annual property taxes. Some states offer property tax breaks for seniors. Check your state\u2019s programs.' },
  { title: 'Cost Comparison', description: 'Compare ongoing costs: property taxes, utilities, maintenance, insurance vs. monthly community fees. Downsizing often reduces total burden.' },
  { title: 'Medicaid Planning', description: 'If long-term care becomes necessary, asset limits apply. Consult an elder law attorney about Medicaid planning and home equity considerations.' },
];

const communityResources = [
  { category: 'Transportation', items: ['Senior bus passes and discounts', 'Medical appointment transportation', 'Volunteer driver programs', 'Specialized senior taxi services'] },
  { category: 'Healthcare', items: ['Medicare counseling services', 'Prescription assistance programs', 'In-home health care providers', 'Senior health clinics and screenings'] },
  { category: 'Social Support', items: ['Senior centers and day programs', 'Faith-based community groups', 'Volunteer opportunities', 'Adult education classes and workshops'] },
  { category: 'Financial Help', items: ['Low-income housing assistance', 'Property tax relief programs', 'Utility assistance for seniors', 'Legal aid for elder issues'] },
];

// Main Component
export default function SeniorMovingGuidePage() {
  const [readinessAnswers, setReadinessAnswers] = useState<Record<string, number>>({});
  const [showReadinessResult, setShowReadinessResult] = useState(false);
  const [emailCapture, setEmailCapture] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [expandedHousingOption, setExpandedHousingOption] = useState<string | null>(null);

  // Calculate readiness score
  const readinessScore = useMemo(() => {
    const scores = Object.values(readinessAnswers);
    if (scores.length === 0) return 0;
    const total = scores.reduce((a, b) => a + b, 0);
    return Math.round((total / (scores.length * 2)) * 100);
  }, [readinessAnswers]);

  const handleReadinessAnswer = (questionId: string, value: number) => {
    setReadinessAnswers(prev => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailCapture.trim()) {
      setEmailSubmitted(true);
      setTimeout(() => {
        setEmailCapture('');
        setEmailSubmitted(false);
      }, 3000);
    }
  };

  const readinessInterpretation = useMemo(() => {
    if (readinessScore >= 70) {
      return { label: 'Ready to Explore', color: 'var(--le-accent)', message: 'It may be a great time to consider your next chapter. Let\u2019s connect you with a specialist.' };
    } else if (readinessScore >= 40) {
      return { label: 'Considering Options', color: '#F59E0B', message: 'You\u2019re thinking about what\u2019s next. Explore resources and connect with an expert to clarify your goals.' };
    } else {
      return { label: 'Staying Put for Now', color: '#10B981', message: 'Your current situation works for you. These resources will be here if your needs change.' };
    }
  }, [readinessScore]);

  return (
    <div style={{ fontFamily: 'var(--le-font-family, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif)', color: 'var(--le-text)', backgroundColor: 'var(--le-bg)' }}>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, var(--le-surface) 0%, var(--le-bg) 100%)',
        padding: '80px 20px',
        textAlign: 'center',
        borderBottom: '1px solid var(--le-border)',
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '48px', fontWeight: 700, marginBottom: '20px', lineHeight: 1.2 }}>
            Your Guide to Life\u2019s Next Chapter
          </h1>
          <p style={{ fontSize: '20px', color: 'var(--le-text-secondary)', marginBottom: '40px', lineHeight: 1.6 }}>
            Whether you\u2019re considering downsizing, exploring new communities, or planning your next move, this comprehensive guide walks you through every step with warmth, respect, and expert guidance.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => document.getElementById('readiness')?.scrollIntoView({ behavior: 'smooth' })}
              style={{
                padding: '14px 32px',
                fontSize: '16px',
                fontWeight: 600,
                backgroundColor: 'var(--le-accent)',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => { (e.target as HTMLElement).style.transform = 'translateY(-2px)'; (e.target as HTMLElement).style.boxShadow = '0 8px 16px rgba(0,0,0,0.12)'; }}
              onMouseLeave={(e) => { (e.target as HTMLElement).style.transform = 'translateY(0)'; (e.target as HTMLElement).style.boxShadow = 'none'; }}
            >
              Take the Readiness Assessment
            </button>
            <button
              onClick={() => document.getElementById('housing')?.scrollIntoView({ behavior: 'smooth' })}
              style={{
                padding: '14px 32px',
                fontSize: '16px',
                fontWeight: 600,
                backgroundColor: 'transparent',
                color: 'var(--le-accent)',
                border: '2px solid var(--le-accent)',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => { (e.target as HTMLElement).style.backgroundColor = 'var(--le-accent)'; (e.target as HTMLElement).style.color = '#fff'; }}
              onMouseLeave={(e) => { (e.target as HTMLElement).style.backgroundColor = 'transparent'; (e.target as HTMLElement).style.color = 'var(--le-accent)'; }}
            >
              Explore Housing Options
            </button>
          </div>
        </div>
      </section>

      {/* When to Consider Moving */}
      <section style={{ padding: '80px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '36px', fontWeight: 700, marginBottom: '50px', textAlign: 'center' }}>When Is It Time to Consider a Move?</h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
          {[
            { title: 'Health Changes', icon: '❤️', items: ['Difficulty with stairs or mobility', 'Need for professional care support', 'Increased doctor visits', 'Medication management challenges'] },
            { title: 'Practical Concerns', icon: '🏠', items: ['Home maintenance becoming overwhelming', 'Rising property taxes and utilities', 'Home upkeep costs straining budget', 'Yard work and repairs challenging'] },
            { title: 'Social Factors', icon: '👥', items: ['Feeling isolated or lonely', 'Family members living far away', 'Loss of longtime friends nearby', 'Desire for built-in community'] },
            { title: 'Financial Opportunity', icon: '💰', items: ['Significant home equity available', 'Desire to simplify financial obligations', 'Interest in accessing retirement funds', 'Planning for long-term care needs'] },
          ].map((category, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: 'var(--le-surface)',
                border: '1px solid var(--le-border)',
                borderRadius: '12px',
                padding: '32px',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
            >
              <div style={{ fontSize: '32px', marginBottom: '16px' }}>{category.icon}</div>
              <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '16px' }}>{category.title}</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {category.items.map((item, i) => (
                  <li key={i} style={{ display: 'flex', gap: '12px', marginBottom: '10px', fontSize: '15px', color: 'var(--le-text-secondary)' }}>
                    <span style={{ color: 'var(--le-accent)', fontWeight: 700 }}>•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Housing Options */}
      <section id="housing" style={{ padding: '80px 20px', backgroundColor: 'var(--le-surface)', borderTop: '1px solid var(--le-border)', borderBottom: '1px solid var(--le-border)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 700, marginBottom: '50px', textAlign: 'center' }}>Compare Your Housing Options</h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {mockHousingOptions.map((option) => (
              <div
                key={option.id}
                style={{
                  backgroundColor: '#fff',
                  border: '1px solid var(--le-border)',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 32px rgba(0,0,0,0.1)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
              >
                <div style={{ padding: '28px' }}>
                  <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <HomeIcon /> {option.name}
                  </h3>
                  <p style={{ fontSize: '14px', color: 'var(--le-accent)', fontWeight: 600, marginBottom: '16px' }}>{option.costRange}</p>
                  <p style={{ fontSize: '15px', color: 'var(--le-text-secondary)', marginBottom: '20px', lineHeight: 1.6 }}>{option.description}</p>

                  {expandedHousingOption === option.id && (
                    <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid var(--le-border)' }}>
                      <div style={{ marginBottom: '16px' }}>
                        <h4 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '10px', color: 'var(--le-accent)' }}>Advantages</h4>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                          {option.pros.map((pro, i) => (
                            <li key={i} style={{ display: 'flex', gap: '10px', marginBottom: '8px', fontSize: '14px', color: 'var(--le-text-secondary)' }}>
                              <span style={{ color: 'var(--le-accent)' }}>+</span> {pro}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '10px', color: '#DC2626' }}>Considerations</h4>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                          {option.cons.map((con, i) => (
                            <li key={i} style={{ display: 'flex', gap: '10px', marginBottom: '8px', fontSize: '14px', color: 'var(--le-text-secondary)' }}>
                              <span style={{ color: '#DC2626' }}>−</span> {con}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  <button
                    onClick={() => setExpandedHousingOption(expandedHousingOption === option.id ? null : option.id)}
                    style={{
                      marginTop: '20px',
                      width: '100%',
                      padding: '12px',
                      backgroundColor: expandedHousingOption === option.id ? 'var(--le-accent)' : 'var(--le-bg)',
                      color: expandedHousingOption === option.id ? '#fff' : 'var(--le-accent)',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '14px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) => { if (expandedHousingOption !== option.id) { (e.target as HTMLElement).style.backgroundColor = 'var(--le-accent)'; (e.target as HTMLElement).style.color = '#fff'; } }}
                    onMouseLeave={(e) => { if (expandedHousingOption !== option.id) { (e.target as HTMLElement).style.backgroundColor = 'var(--le-bg)'; (e.target as HTMLElement).style.color = 'var(--le-accent)'; } }}
                  >
                    {expandedHousingOption === option.id ? 'Hide Details' : 'Learn More'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Downsizing Checklist */}
      <section style={{ padding: '80px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '36px', fontWeight: 700, marginBottom: '50px', textAlign: 'center' }}>The Downsizing Checklist</h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          {downsizingSteps.map((step, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: 'var(--le-surface)',
                border: '1px solid var(--le-border)',
                borderRadius: '12px',
                padding: '28px',
                borderLeft: `4px solid var(--le-accent)`,
              }}
            >
              <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CalendarIcon /> {step.phase}
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {step.items.map((item, i) => (
                  <li key={i} style={{ display: 'flex', gap: '12px', marginBottom: '12px', fontSize: '14px', color: 'var(--le-text-secondary)' }}>
                    <span style={{ color: 'var(--le-accent)', fontWeight: 700, flexShrink: 0 }}><CheckMarkIcon /></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '50px', backgroundColor: 'var(--le-surface)', border: '2px solid var(--le-accent)', borderRadius: '12px', padding: '32px', textAlign: 'center' }}>
          <h3 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '16px', color: 'var(--le-accent)' }}>Pro Tip: Make It Emotional and Meaningful</h3>
          <p style={{ fontSize: '16px', color: 'var(--le-text-secondary)', lineHeight: 1.8 }}>
            Downsizing isn\u2019t just about logistics. Take time to reminisce about cherished memories, honor the chapters of your life, and thoughtfully pass on items that matter. Consider creating a memory box with photos and keepsakes, or recording stories about meaningful possessions before they move on to new homes.
          </p>
        </div>
      </section>

      {/* Financial Planning */}
      <section style={{ padding: '80px 20px', backgroundColor: '#F9FAFB', borderTop: '1px solid var(--le-border)', borderBottom: '1px solid var(--le-border)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 700, marginBottom: '50px', textAlign: 'center' }}>Financial Planning for Your Move</h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {financialConsiderations.map((item, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: '#fff',
                  border: '1px solid var(--le-border)',
                  borderRadius: '12px',
                  padding: '28px',
                }}
              >
                <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--le-accent)' }}>
                  <DollarIcon /> {item.title}
                </h3>
                <p style={{ fontSize: '15px', color: 'var(--le-text-secondary)', lineHeight: 1.6 }}>{item.description}</p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '50px', backgroundColor: '#fff', border: '1px solid var(--le-border)', borderRadius: '12px', padding: '32px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '24px' }}>Common Financial Scenarios</h3>
            <div style={{ display: 'grid', gap: '20px' }}>
              {[
                { scenario: 'Home Equity Rich', plan: 'You may have $200K+ in equity. Downsizing could provide capital for healthcare, travel, or legacy planning. Consult a tax pro about capital gains.' },
                { scenario: 'High Monthly Expenses', plan: 'Move to lower-cost community to reduce budget strain. Compare total costs including utilities, taxes, maintenance vs. community fees.' },
                { scenario: 'Want to Stay Independent', plan: 'Aging in place with modifications (ramps, grab bars) may cost $10K-30K upfront but allows you to stay in your beloved home.' },
                { scenario: 'Need Care Support Soon', plan: 'Assisted living ranges $4K-8K/month. Reverse mortgage or downsizing could make this affordable without depleting savings.' },
              ].map((case_, i) => (
                <div key={i} style={{ paddingBottom: '20px', borderBottom: i < 3 ? '1px solid var(--le-border)' : 'none' }}>
                  <h4 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '8px', color: 'var(--le-accent)' }}>{case_.scenario}</h4>
                  <p style={{ fontSize: '15px', color: 'var(--le-text-secondary)', margin: 0, lineHeight: 1.6 }}>{case_.plan}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Moving Day Preparation */}
      <section style={{ padding: '80px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '36px', fontWeight: 700, marginBottom: '50px', textAlign: 'center' }}>Moving Day Preparation: Senior-Specific Tips</h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginBottom: '50px', alignItems: 'center' }}>
          <div>
            <h3 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '24px' }}>Packing Strategies</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {['Label boxes clearly with room AND contents', 'Use smaller boxes (easier to lift)', 'Pack frequently-used items last', 'Keep medications and important docs with you', 'Color-code by room for fast unpacking', 'Ask movers to place boxes in correct rooms'].map((tip, i) => (
                <li key={i} style={{ display: 'flex', gap: '12px', marginBottom: '16px', fontSize: '15px', color: 'var(--le-text-secondary)' }}>
                  <CheckMarkIcon /> {tip}
                </li>
              ))}
            </ul>
          </div>

          <div style={{ backgroundColor: 'var(--le-surface)', borderRadius: '12px', padding: '32px', border: '1px solid var(--le-border)' }}>
            <h3 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '24px' }}>Hiring Movers: What to Look For</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {['Experience with senior moves', 'Full-service options (packing included)', 'Insurance coverage for your belongings', 'Free, detailed estimates', 'References from other seniors', 'Clear pricing with no surprises'].map((point, i) => (
                <li key={i} style={{ display: 'flex', gap: '12px', marginBottom: '16px', fontSize: '15px', color: 'var(--le-text-secondary)' }}>
                  <span style={{ color: 'var(--le-accent)', fontWeight: 700 }}>{i + 1}.</span> {point}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div style={{ backgroundColor: '#F3F4F6', borderRadius: '12px', padding: '32px', border: '1px solid var(--le-border)' }}>
          <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '20px' }}>Timeline: 6-Month Move Plan</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '20px' }}>
            {[
              { month: 'Month 1', tasks: 'Decide housing type, start viewing options' },
              { month: 'Month 2', tasks: 'Make decision, begin decluttering' },
              { month: 'Month 3', tasks: 'Apply/secure new residence, hire movers' },
              { month: 'Month 4', tasks: 'Downsize final items, plan estate sale' },
              { month: 'Month 5', tasks: 'Pack, process documents, notify contacts' },
              { month: 'Month 6', tasks: 'Moving day, settle into new home' },
            ].map((item, i) => (
              <div key={i} style={{ backgroundColor: '#fff', padding: '16px', borderRadius: '8px', border: '1px solid var(--le-border)' }}>
                <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--le-accent)', marginBottom: '8px' }}>{item.month}</h4>
                <p style={{ fontSize: '13px', color: 'var(--le-text-secondary)', margin: 0 }}>{item.tasks}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Emotional Support */}
      <section style={{ padding: '80px 20px', backgroundColor: 'var(--le-surface)', borderTop: '1px solid var(--le-border)', borderBottom: '1px solid var(--le-border)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 700, marginBottom: '50px', textAlign: 'center' }}>The Emotional Side: Moving Beyond Your Family Home</h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '40px' }}>
            {[
              { title: 'Honoring Your Memories', emoji: '📸', content: 'Before leaving, take photos of each room. Document the house and create a memory album. This helps you hold onto the home while moving forward.' },
              { title: 'Letting Go Gracefully', emoji: '🕊️', content: 'Items aren\u2019t your memories. The memories live in your heart. Gift cherished possessions to family or people who will treasure them.' },
              { title: 'Staying Connected', emoji: '💌', content: 'Keep photos, letters, and heirlooms. Plan visits with longtime neighbors. Your relationships matter more than the address.' },
              { title: 'Celebrating New Beginnings', emoji: '🌟', content: 'This move opens new opportunities for friendship, health, and growth. Approach it as an exciting adventure, not just an ending.' },
            ].map((section, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: '#fff',
                  border: '1px solid var(--le-border)',
                  borderRadius: '12px',
                  padding: '28px',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: '40px', marginBottom: '16px' }}>{section.emoji}</div>
                <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '12px' }}>{section.title}</h3>
                <p style={{ fontSize: '15px', color: 'var(--le-text-secondary)', lineHeight: 1.6, margin: 0 }}>{section.content}</p>
              </div>
            ))}
          </div>

          <div style={{ backgroundColor: '#fff', border: '2px solid var(--le-accent)', borderRadius: '12px', padding: '40px', textAlign: 'center' }}>
            <HeartIcon />
            <p style={{ fontSize: '18px', color: 'var(--le-text-secondary)', lineHeight: 1.8, marginTop: '16px' }}>
              Your home held so many chapters of your life. Moving doesn\u2019t erase those memories—it honors them by creating space for the exciting chapters ahead.
            </p>
          </div>
        </div>
      </section>

      {/* Community Resources */}
      <section style={{ padding: '80px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '36px', fontWeight: 700, marginBottom: '50px', textAlign: 'center' }}>Community Resources & Support Services</h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          {communityResources.map((resource, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: 'var(--le-surface)',
                border: '1px solid var(--le-border)',
                borderRadius: '12px',
                padding: '28px',
              }}
            >
              <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '20px', color: 'var(--le-accent)' }}>{resource.category}</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {resource.items.map((item, i) => (
                  <li key={i} style={{ display: 'flex', gap: '12px', marginBottom: '12px', fontSize: '14px', color: 'var(--le-text-secondary)' }}>
                    <span style={{ color: 'var(--le-accent)', fontWeight: 700 }}>▸</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '50px', backgroundColor: 'var(--le-surface)', border: '1px solid var(--le-border)', borderRadius: '12px', padding: '32px', textAlign: 'center' }}>
          <p style={{ fontSize: '16px', color: 'var(--le-text-secondary)', lineHeight: 1.8, marginBottom: '24px' }}>
            Your local Area Agency on Aging (AAA) is your gateway to senior services. Look up your area\u2019s AAA online or call the Eldercare Locator at 1-800-677-1116.
          </p>
        </div>
      </section>

      {/* Readiness Assessment */}
      <section id="readiness" style={{ padding: '80px 20px', backgroundColor: '#F9FAFB', borderTop: '1px solid var(--le-border)', borderBottom: '1px solid var(--le-border)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 700, marginBottom: '50px', textAlign: 'center' }}>Your Moving Readiness Assessment</h2>

          <div style={{ backgroundColor: '#fff', border: '1px solid var(--le-border)', borderRadius: '12px', padding: '40px' }}>
            <div style={{ display: 'grid', gap: '32px', marginBottom: '40px' }}>
              {readinessQuestions.map((question) => (
                <div key={question.id}>
                  <label style={{ fontSize: '16px', fontWeight: 600, color: 'var(--le-text)', marginBottom: '12px', display: 'block' }}>
                    {question.label}
                  </label>
                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    {question.options.map((option, idx) => (
                      <button
                        key={option}
                        onClick={() => handleReadinessAnswer(question.id, idx)}
                        style={{
                          padding: '10px 20px',
                          fontSize: '14px',
                          fontWeight: 600,
                          backgroundColor: readinessAnswers[question.id] === idx ? 'var(--le-accent)' : 'var(--le-bg)',
                          color: readinessAnswers[question.id] === idx ? '#fff' : 'var(--le-text)',
                          border: `2px solid ${readinessAnswers[question.id] === idx ? 'var(--le-accent)' : 'var(--le-border)'}`,
                          borderRadius: '6px',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                        }}
                        onMouseEnter={(e) => { if (readinessAnswers[question.id] !== idx) { (e.target as HTMLElement).style.borderColor = 'var(--le-accent)'; } }}
                        onMouseLeave={(e) => { if (readinessAnswers[question.id] !== idx) { (e.target as HTMLElement).style.borderColor = 'var(--le-border)'; } }}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {Object.keys(readinessAnswers).length === readinessQuestions.length && (
              <div style={{ backgroundColor: 'var(--le-surface)', border: '1px solid var(--le-border)', borderRadius: '12px', padding: '32px', textAlign: 'center' }}>
                <h3 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '16px' }}>Your Readiness Score</h3>
                <div style={{
                  fontSize: '64px',
                  fontWeight: 700,
                  color: readinessInterpretation.color,
                  marginBottom: '16px',
                }}>
                  {readinessScore}%
                </div>
                <p style={{ fontSize: '18px', fontWeight: 700, color: readinessInterpretation.color, marginBottom: '12px' }}>
                  {readinessInterpretation.label}
                </p>
                <p style={{ fontSize: '15px', color: 'var(--le-text-secondary)', lineHeight: 1.6 }}>
                  {readinessInterpretation.message}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding: '80px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '36px', fontWeight: 700, marginBottom: '50px', textAlign: 'center' }}>Stories From Our Community</h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          {mockTestimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              style={{
                backgroundColor: 'var(--le-surface)',
                border: '1px solid var(--le-border)',
                borderRadius: '12px',
                padding: '32px',
                position: 'relative',
              }}
            >
              <div style={{ position: 'absolute', top: '20px', right: '20px', opacity: 0.5 }}>
                <QuoteIcon />
              </div>
              <div style={{ display: 'flex', gap: '4px', marginBottom: '16px' }}>
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} style={{ color: 'var(--le-accent)' }}>
                    <StarIcon />
                  </span>
                ))}
              </div>
              <p style={{ fontSize: '15px', color: 'var(--le-text-secondary)', lineHeight: 1.7, marginBottom: '20px' }}>
                {testimonial.content}
              </p>
              <div style={{ paddingTop: '20px', borderTop: '1px solid var(--le-border)' }}>
                <p style={{ fontSize: '16px', fontWeight: 700, color: 'var(--le-text)', margin: '0 0 4px 0' }}>
                  {testimonial.name}
                </p>
                <p style={{ fontSize: '14px', color: 'var(--le-text-secondary)', margin: 0 }}>
                  {testimonial.age} years old • {testimonial.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lead Capture Section 1 */}
      <section style={{ padding: '80px 20px', backgroundColor: 'var(--le-surface)', borderTop: '1px solid var(--le-border)', borderBottom: '1px solid var(--le-border)' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '20px' }}>Ready to Explore Your Options?</h2>
          <p style={{ fontSize: '18px', color: 'var(--le-text-secondary)', marginBottom: '32px', lineHeight: 1.6 }}>
            Connect with a LeadEngine Senior Moving Specialist who understands your goals, timeline, and needs.
          </p>

          <form onSubmit={handleEmailSubmit} style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <input
              type="email"
              placeholder="Your email address"
              value={emailCapture}
              onChange={(e) => setEmailCapture(e.target.value)}
              style={{
                padding: '14px 20px',
                fontSize: '16px',
                border: '1px solid var(--le-border)',
                borderRadius: '6px',
                minWidth: '280px',
                fontFamily: 'inherit',
              }}
            />
            <button
              type="submit"
              style={{
                padding: '14px 28px',
                fontSize: '16px',
                fontWeight: 600,
                backgroundColor: 'var(--le-accent)',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => { (e.target as HTMLElement).style.transform = 'translateY(-2px)'; (e.target as HTMLElement).style.boxShadow = '0 8px 16px rgba(0,0,0,0.12)'; }}
              onMouseLeave={(e) => { (e.target as HTMLElement).style.transform = 'translateY(0)'; (e.target as HTMLElement).style.boxShadow = 'none'; }}
            >
              Get Your Free Guide
            </button>
          </form>

          {emailSubmitted && (
            <p style={{ fontSize: '16px', color: 'var(--le-accent)', fontWeight: 600 }}>
              Thanks! Check your email for your guide and specialist contact info.
            </p>
          )}

          <p style={{ fontSize: '13px', color: 'var(--le-text-secondary)' }}>
            We\u2019ll never share your information. Unsubscribe anytime.
          </p>
        </div>
      </section>

      {/* Lead Capture Section 2 - Specialist Connection */}
      <section style={{ padding: '80px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '24px' }}>Connect With a Senior Moving Specialist</h2>
            <p style={{ fontSize: '16px', color: 'var(--le-text-secondary)', lineHeight: 1.8, marginBottom: '24px' }}>
              Our specialists have helped hundreds of seniors navigate moves with confidence. They understand the emotional, practical, and financial sides of your decision and provide guidance every step of the way.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, marginBottom: '32px' }}>
              {[
                'Free, confidential consultation',
                'Personalized housing recommendations',
                'Help with financial planning and estate sales',
                'Network of trusted movers and contractors',
                'Ongoing support after your move',
              ].map((benefit, i) => (
                <li key={i} style={{ display: 'flex', gap: '12px', marginBottom: '16px', fontSize: '15px', color: 'var(--le-text-secondary)' }}>
                  <CheckMarkIcon /> {benefit}
                </li>
              ))}
            </ul>
            <button
              onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
              style={{
                padding: '14px 32px',
                fontSize: '16px',
                fontWeight: 600,
                backgroundColor: 'var(--le-accent)',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => { (e.target as HTMLElement).style.transform = 'translateY(-2px)'; (e.target as HTMLElement).style.boxShadow = '0 8px 16px rgba(0,0,0,0.12)'; }}
              onMouseLeave={(e) => { (e.target as HTMLElement).style.transform = 'translateY(0)'; (e.target as HTMLElement).style.boxShadow = 'none'; }}
            >
              Schedule Your Free Consultation
            </button>
          </div>
          <div style={{ backgroundColor: 'var(--le-surface)', border: '1px solid var(--le-border)', borderRadius: '12px', padding: '40px', textAlign: 'center' }}>
            <div style={{ fontSize: '60px', marginBottom: '20px' }}>👩‍💼</div>
            <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '12px' }}>Expert Guidance You Can Trust</h3>
            <p style={{ fontSize: '15px', color: 'var(--le-text-secondary)', lineHeight: 1.6 }}>
              Our team specializes in senior transitions. We\u2019ve helped people find the right housing, manage moves smoothly, and embrace their next chapter with excitement and confidence.
            </p>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section id="contact-form" style={{ padding: '80px 20px', backgroundColor: 'var(--le-surface)', borderTop: '1px solid var(--le-border)' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '20px' }}>Let\u2019s Talk About Your Next Chapter</h2>
          <p style={{ fontSize: '16px', color: 'var(--le-text-secondary)', marginBottom: '40px', lineHeight: 1.6 }}>
            No pressure, no sales pitch. Just honest, compassionate guidance from someone who understands what you\u2019re going through.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '20px', marginTop: '40px' }}>
            {[
              { icon: '📞', label: 'Call Us', value: '1-800-SENIOR-1' },
              { icon: '✉️', label: 'Email', value: 'moves@leadengine.app' },
              { icon: '💬', label: 'Chat', value: 'Available 24/7' },
            ].map((contact, i) => (
              <div key={i} style={{ padding: '24px', backgroundColor: '#fff', border: '1px solid var(--le-border)', borderRadius: '12px' }}>
                <div style={{ fontSize: '32px', marginBottom: '8px' }}>{contact.icon}</div>
                <p style={{ fontSize: '12px', color: 'var(--le-text-secondary)', margin: '0 0 4px 0' }}>{contact.label}</p>
                <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--le-text)', margin: 0 }}>{contact.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section style={{ padding: '40px 20px', backgroundColor: '#F3F4F6', borderTop: '1px solid var(--le-border)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <p style={{ fontSize: '13px', color: 'var(--le-text-secondary)', textAlign: 'center', marginBottom: '24px', fontWeight: 600, letterSpacing: '0.5px' }}>
            TRUSTED BY SENIORS AND FAMILIES NATIONWIDE
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap', alignItems: 'center' }}>
            {['4.9 ⭐ | 1,200+ Reviews', '25+ Years Experience', 'Senior-Certified Advisors', '100% Confidential'].map((badge, i) => (
              <div key={i} style={{ fontSize: '14px', fontWeight: 600, color: 'var(--le-text-secondary)' }}>
                ✓ {badge}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
