'use client';

import React, { useState, useMemo } from 'react';

// SVG Icon Components
const ChevronDownIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

const CheckCircleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);

const AlertIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3.05h16.94a2 2 0 0 0 1.71-3.05L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
    <line x1="12" y1="9" x2="12" y2="13"></line>
    <line x1="12" y1="17" x2="12.01" y2="17"></line>
  </svg>
);

const TrendingUpIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 17"></polyline>
    <polyline points="17 6 23 6 23 12"></polyline>
  </svg>
);

const HomeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    <polyline points="9 22 9 12 15 12 15 22"></polyline>
  </svg>
);

const ToolsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 1 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
  </svg>
);

const ClockIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

const PlusIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

// Types
type RenovationType = 'kitchen' | 'bathroom' | 'roof' | 'deck' | 'flooring' | 'windows' | 'siding' | 'basement';

interface RenovationData {
  name: string;
  averageCost: number;
  averageValue: number;
  roi: number;
  description: string;
  complexity: 'low' | 'medium' | 'high';
  timeline: string;
  permitsRequired: boolean;
}

// Mock data
const RENOVATIONS_DATA: Record<RenovationType, RenovationData> = {
  kitchen: {
    name: 'Kitchen Remodel',
    averageCost: 60000,
    averageValue: 42000,
    roi: 70,
    description: 'Complete kitchen redesign with new appliances and layout',
    complexity: 'high',
    timeline: '8-12 weeks',
    permitsRequired: true,
  },
  bathroom: {
    name: 'Bathroom Renovation',
    averageCost: 15000,
    averageValue: 11250,
    roi: 75,
    description: 'Full bathroom update with fixtures and finishes',
    complexity: 'medium',
    timeline: '4-6 weeks',
    permitsRequired: true,
  },
  roof: {
    name: 'Roof Replacement',
    averageCost: 12000,
    averageValue: 10800,
    roi: 90,
    description: 'Complete roof replacement with modern materials',
    complexity: 'high',
    timeline: '2-3 weeks',
    permitsRequired: true,
  },
  deck: {
    name: 'Deck Addition',
    averageCost: 15000,
    averageValue: 11250,
    roi: 75,
    description: 'New elevated deck with composite or wood materials',
    complexity: 'medium',
    timeline: '4-6 weeks',
    permitsRequired: true,
  },
  flooring: {
    name: 'Flooring Upgrade',
    averageCost: 8000,
    averageValue: 5600,
    roi: 70,
    description: 'New hardwood or luxury vinyl flooring throughout main areas',
    complexity: 'low',
    timeline: '1-2 weeks',
    permitsRequired: false,
  },
  windows: {
    name: 'Window Replacement',
    averageCost: 12000,
    averageValue: 8400,
    roi: 70,
    description: 'Energy-efficient replacement windows for entire home',
    complexity: 'medium',
    timeline: '2-3 weeks',
    permitsRequired: false,
  },
  siding: {
    name: 'Siding Replacement',
    averageCost: 18000,
    averageValue: 12600,
    roi: 70,
    description: 'New exterior siding for improved curb appeal and durability',
    complexity: 'medium',
    timeline: '3-4 weeks',
    permitsRequired: false,
  },
  basement: {
    name: 'Basement Finishing',
    averageCost: 35000,
    averageValue: 24500,
    roi: 70,
    description: 'Complete basement renovation with living space',
    complexity: 'high',
    timeline: '8-10 weeks',
    permitsRequired: true,
  },
};

const BUDGET_PERCENTAGES = [
  { label: 'Conservative', percent: 5, description: 'Minor updates and cosmetic improvements' },
  { label: 'Moderate', percent: 10, description: 'One major renovation project' },
  { label: 'Aggressive', percent: 15, description: 'Multiple major projects or whole-home update' },
];

const ROOM_GUIDES = [
  {
    room: 'Kitchen',
    projects: ['Countertop replacement', 'Cabinet refacing', 'New appliances', 'Lighting upgrades', 'Backsplash installation'],
    budgetRange: '$8,000 - $80,000',
    roi: '70%',
  },
  {
    room: 'Bathroom',
    projects: ['Vanity upgrade', 'Tile work', 'Fixture replacement', 'Ventilation improvement', 'Flooring'],
    budgetRange: '$5,000 - $25,000',
    roi: '75%',
  },
  {
    room: 'Basement',
    projects: ['Waterproofing', 'Flooring installation', 'Wall finishing', 'Lighting and HVAC', 'Egress windows'],
    budgetRange: '$15,000 - $50,000',
    roi: '70%',
  },
  {
    room: 'Outdoor',
    projects: ['Deck building', 'Patio installation', 'Landscaping', 'Fence repair', 'Lighting'],
    budgetRange: '$5,000 - $30,000',
    roi: '75%',
  },
];

const COMMON_PERMITS = [
  { project: 'Kitchen Remodel', needsPermit: true },
  { project: 'Bathroom Renovation', needsPermit: true },
  { project: 'Roof Replacement', needsPermit: true },
  { project: 'Deck/Patio', needsPermit: true },
  { project: 'Flooring', needsPermit: false },
  { project: 'Painting', needsPermit: false },
  { project: 'Cabinet Refacing', needsPermit: false },
  { project: 'Window Replacement', needsPermit: false },
];

const BEFORE_AFTER_EXAMPLES = [
  {
    title: 'Kitchen Transformation',
    beforeDesc: 'Dated cabinets, outdated appliances, poor lighting',
    afterDesc: 'Modern white cabinetry, stainless steel appliances, LED lighting',
    costRange: '$40,000 - $80,000',
  },
  {
    title: 'Bathroom Refresh',
    beforeDesc: 'Worn tile, old fixtures, small vanity',
    afterDesc: 'Marble tile, contemporary fixtures, double vanity',
    costRange: '$12,000 - $25,000',
  },
  {
    title: 'Outdoor Living',
    beforeDesc: 'Bare yard with minimal landscaping',
    afterDesc: 'Composite deck with outdoor kitchen and string lights',
    costRange: '$15,000 - $35,000',
  },
];

const FAQ_ITEMS = [
  {
    question: 'What renovation offers the best ROI?',
    answer: 'Roof replacement typically offers the highest ROI at around 90%, followed by bathroom renovations at 75%. Kitchen remodels have lower ROI but add significant value to homes.',
  },
  {
    question: 'How much should I budget for renovations?',
    answer: 'Most experts recommend allocating 5-15% of your home\u2019s current value. A moderate budget of 10% allows for one major project without overextending finances.',
  },
  {
    question: 'Do I need permits for all renovations?',
    answer: 'Major structural changes like kitchens, bathrooms, roofing, and decks require permits. Cosmetic updates usually don\u2019t. Always check local requirements before starting.',
  },
  {
    question: 'Should I hire a contractor or do it myself?',
    answer: 'Complex projects involving electrical, plumbing, or structural work should use licensed professionals. Simple cosmetic updates can be DIY. Consider your skill level and permit requirements.',
  },
  {
    question: 'How long does a typical renovation take?',
    answer: 'Timelines vary: flooring (1-2 weeks), bathrooms (4-6 weeks), kitchens (8-12 weeks), whole-home updates (3-6 months). Permits and weather can extend timelines.',
  },
  {
    question: 'Will renovations increase my home value?',
    answer: 'Most renovations increase home value, though not dollar-for-dollar with what you spend. Kitchen and bathroom updates typically offer the best value recovery.',
  },
];

// Main Component
export default function HomeRenovationROIPage() {
  const [selectedRenovation, setSelectedRenovation] = useState<RenovationType>('kitchen');
  const [customCost, setCustomCost] = useState<number>(60000);
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [expandedRoom, setExpandedRoom] = useState<string | null>(null);
  const [leadEmail, setLeadEmail] = useState('');
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  // Calculate ROI for selected renovation
  const currentRenovation = RENOVATIONS_DATA[selectedRenovation];
  const estimatedValue = useMemo(() => {
    if (!currentRenovation) return 0;
    return (customCost / currentRenovation.averageCost) * currentRenovation.averageValue;
  }, [customCost, currentRenovation]);

  const estimatedROI = useMemo(() => {
    if (customCost === 0) return 0;
    return Math.round((estimatedValue / customCost) * 100);
  }, [estimatedValue, customCost]);

  // Sort renovations by ROI
  const sortedRenovations = useMemo(() => {
    return Object.entries(RENOVATIONS_DATA)
      .sort((a, b) => b[1].roi - a[1].roi)
      .map(([key, value]) => ({ key: key as RenovationType, ...value }));
  }, []);

  // Handle lead capture
  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (leadEmail.trim()) {
      setLeadSubmitted(true);
      setLeadEmail('');
      setTimeout(() => setLeadSubmitted(false), 5000);
    }
  };

  // Calculate budget for home value
  const calculateBudget = (homeValue: number, percent: number) => {
    return Math.round(homeValue * (percent / 100));
  };

  const styles = {
    container: {
      fontFamily: 'system-ui, -apple-system, sans-serif',
      color: 'var(--le-text-primary)',
      backgroundColor: 'var(--le-bg-base)',
      lineHeight: '1.6',
    } as React.CSSProperties,

    section: {
      padding: '80px 20px',
      maxWidth: '1200px',
      margin: '0 auto',
    } as React.CSSProperties,

    sectionDark: {
      backgroundColor: 'var(--le-bg-secondary)',
    } as React.CSSProperties,

    heading1: {
      fontSize: '48px',
      fontWeight: '700',
      lineHeight: '1.2',
      marginBottom: '24px',
      color: 'var(--le-text-primary)',
    } as React.CSSProperties,

    heading2: {
      fontSize: '36px',
      fontWeight: '700',
      marginBottom: '32px',
      color: 'var(--le-text-primary)',
    } as React.CSSProperties,

    heading3: {
      fontSize: '22px',
      fontWeight: '600',
      marginBottom: '16px',
      color: 'var(--le-text-primary)',
    } as React.CSSProperties,

    subtitle: {
      fontSize: '20px',
      color: 'var(--le-text-secondary)',
      marginBottom: '48px',
      maxWidth: '600px',
    } as React.CSSProperties,

    button: {
      padding: '14px 32px',
      fontSize: '16px',
      fontWeight: '600',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      backgroundColor: 'var(--le-primary)',
      color: 'white',
      transition: 'all 0.3s ease',
    } as React.CSSProperties,

    buttonSecondary: {
      padding: '12px 24px',
      fontSize: '14px',
      fontWeight: '600',
      border: '2px solid var(--le-primary)',
      borderRadius: '8px',
      cursor: 'pointer',
      backgroundColor: 'transparent',
      color: 'var(--le-primary)',
      transition: 'all 0.3s ease',
    } as React.CSSProperties,

    card: {
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '32px',
      marginBottom: '24px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
      border: '1px solid rgba(0, 0, 0, 0.05)',
    } as React.CSSProperties,

    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '24px',
      marginBottom: '24px',
    } as React.CSSProperties,

    input: {
      padding: '12px 16px',
      fontSize: '16px',
      borderRadius: '8px',
      border: '1px solid var(--le-border)',
      fontFamily: 'inherit',
      width: '100%',
      boxSizing: 'border-box',
    } as React.CSSProperties,

    label: {
      display: 'block',
      fontSize: '14px',
      fontWeight: '600',
      marginBottom: '8px',
      color: 'var(--le-text-primary)',
    } as React.CSSProperties,

    badge: {
      display: 'inline-block',
      padding: '6px 12px',
      borderRadius: '6px',
      fontSize: '12px',
      fontWeight: '600',
      marginRight: '8px',
      marginBottom: '12px',
    } as React.CSSProperties,

    badgeGreen: {
      backgroundColor: 'rgba(34, 197, 94, 0.1)',
      color: '#22c55e',
    } as React.CSSProperties,

    badgeBlue: {
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      color: '#3b82f6',
    } as React.CSSProperties,

    badgeYellow: {
      backgroundColor: 'rgba(251, 191, 36, 0.1)',
      color: '#fbbf24',
    } as React.CSSProperties,
  };

  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <section style={{ ...styles.section, paddingTop: '100px', paddingBottom: '60px' }}>
        <h1 style={styles.heading1}>
          Home Renovation ROI Calculator & Guide
        </h1>
        <p style={styles.subtitle}>
          Discover which renovations deliver the best return on investment. Make informed decisions about your home improvement projects with expert data and planning tools.
        </p>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <button style={{ ...styles.button, cursor: 'pointer' }} onClick={() => setSelectedRenovation('kitchen')}>
            Explore Projects
          </button>
          <button style={styles.buttonSecondary}>
            Download Guide
          </button>
        </div>
      </section>

      {/* Top Renovations by ROI */}
      <section style={{ ...styles.section, ...styles.sectionDark }}>
        <h2 style={styles.heading2}>Top Renovations by ROI</h2>
        <p style={{ fontSize: '18px', color: 'var(--le-text-secondary)', marginBottom: '32px' }}>
          Average return on investment by project type. Ranked by value recovery percentage.
        </p>
        <div style={{ display: 'grid', gap: '16px' }}>
          {sortedRenovations.map((reno, idx) => (
            <div key={reno.key} style={{
              ...styles.card,
              display: 'grid',
              gridTemplateColumns: '1fr 150px 150px 100px',
              alignItems: 'center',
              gap: '24px',
            }}>
              <div>
                <h3 style={{ marginBottom: '4px' }}>{reno.name}</h3>
                <p style={{ fontSize: '14px', color: 'var(--le-text-secondary)' }}>
                  {reno.description}
                </p>
              </div>
              <div>
                <label style={styles.label}>Avg. Cost</label>
                <p style={{ fontSize: '18px', fontWeight: '600' }}>
                  ${(reno.averageCost / 1000).toFixed(0)}k
                </p>
              </div>
              <div>
                <label style={styles.label}>Avg. Value</label>
                <p style={{ fontSize: '18px', fontWeight: '600' }}>
                  ${(reno.averageValue / 1000).toFixed(0)}k
                </p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <label style={styles.label}>ROI</label>
                <p style={{ fontSize: '24px', fontWeight: '700', color: 'var(--le-primary)' }}>
                  {reno.roi}%
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive ROI Calculator */}
      <section style={styles.section}>
        <h2 style={styles.heading2}>Interactive ROI Calculator</h2>
        <div style={{ maxWidth: '600px' }}>
          <div style={styles.card}>
            <div style={{ marginBottom: '24px' }}>
              <label style={styles.label}>Select Renovation Type</label>
              <select
                value={selectedRenovation}
                onChange={(e) => setSelectedRenovation(e.target.value as RenovationType)}
                style={{ ...styles.input, padding: '12px' }}
              >
                {sortedRenovations.map((reno) => (
                  <option key={reno.key} value={reno.key}>
                    {reno.name}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={styles.label}>Project Cost: ${customCost.toLocaleString()}</label>
              <input
                type="range"
                min="5000"
                max="100000"
                step="5000"
                value={customCost}
                onChange={(e) => setCustomCost(parseInt(e.target.value))}
                style={{ width: '100%', cursor: 'pointer' }}
              />
              <p style={{ fontSize: '12px', color: 'var(--le-text-secondary)', marginTop: '8px' }}>
                Adjust your estimated project cost
              </p>
            </div>

            <hr style={{ borderColor: 'var(--le-border)', marginBottom: '24px' }} />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              <div>
                <p style={{ fontSize: '14px', color: 'var(--le-text-secondary)', marginBottom: '8px' }}>
                  Estimated Home Value Increase
                </p>
                <p style={{ fontSize: '28px', fontWeight: '700', color: 'var(--le-primary)' }}>
                  ${estimatedValue.toLocaleString()}
                </p>
              </div>
              <div>
                <p style={{ fontSize: '14px', color: 'var(--le-text-secondary)', marginBottom: '8px' }}>
                  Return on Investment
                </p>
                <p style={{ fontSize: '28px', fontWeight: '700', color: estimatedROI >= 70 ? '#22c55e' : '#f59e0b' }}>
                  {estimatedROI}%
                </p>
              </div>
            </div>

            <div style={{
              marginTop: '24px',
              padding: '16px',
              backgroundColor: 'rgba(34, 197, 94, 0.05)',
              borderRadius: '8px',
              display: 'flex',
              gap: '12px',
              alignItems: 'flex-start',
            }}>
              <TrendingUpIcon />
              <p style={{ fontSize: '14px' }}>
                This project is estimated to add <strong>${estimatedValue.toLocaleString()}</strong> to your home\u2019s value based on current market averages.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Room-by-Room Guide */}
      <section style={{ ...styles.section, ...styles.sectionDark }}>
        <h2 style={styles.heading2}>Room-by-Room Renovation Guide</h2>
        <div style={styles.grid}>
          {ROOM_GUIDES.map((guide, idx) => (
            <div key={idx} style={styles.card}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '16px' }}>
                <HomeIcon />
                <h3 style={{ margin: 0 }}>{guide.room}</h3>
              </div>
              <div style={{ marginBottom: '16px' }}>
                <p style={{ fontSize: '12px', fontWeight: '600', color: 'var(--le-text-secondary)', marginBottom: '8px' }}>
                  POPULAR PROJECTS
                </p>
                {guide.projects.map((project, pidx) => (
                  <div key={pidx} style={{ display: 'flex', gap: '8px', marginBottom: '8px', fontSize: '14px' }}>
                    <CheckCircleIcon />
                    {project}
                  </div>
                ))}
              </div>
              <hr style={{ borderColor: 'var(--le-border)', margin: '16px 0' }} />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', fontSize: '14px' }}>
                <div>
                  <p style={{ color: 'var(--le-text-secondary)', marginBottom: '4px' }}>Budget Range</p>
                  <p style={{ fontWeight: '600' }}>{guide.budgetRange}</p>
                </div>
                <div>
                  <p style={{ color: 'var(--le-text-secondary)', marginBottom: '4px' }}>Avg. ROI</p>
                  <p style={{ fontWeight: '600', color: 'var(--le-primary)' }}>{guide.roi}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Budget Planning */}
      <section style={styles.section}>
        <h2 style={styles.heading2}>Budget Planning Guide</h2>
        <p style={{ fontSize: '18px', color: 'var(--le-text-secondary)', marginBottom: '32px' }}>
          Determine how much to invest in renovations as a percentage of your home\u2019s value.
        </p>
        <div style={{ maxWidth: '600px' }}>
          <div style={styles.card}>
            <div style={{ marginBottom: '24px' }}>
              <label style={styles.label}>Enter Your Home Value</label>
              <input
                type="number"
                placeholder="e.g., 500000"
                defaultValue="500000"
                onChange={() => {}}
                style={styles.input}
              />
            </div>

            <div style={{ display: 'grid', gap: '16px' }}>
              {BUDGET_PERCENTAGES.map((budget, idx) => (
                <div key={idx} style={{
                  padding: '16px',
                  backgroundColor: idx === 1 ? 'rgba(59, 130, 246, 0.05)' : 'transparent',
                  borderRadius: '8px',
                  border: idx === 1 ? '2px solid var(--le-primary)' : '1px solid var(--le-border)',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '8px' }}>
                    <h4 style={{ margin: 0 }}>{budget.label}</h4>
                    <span style={{ ...styles.badge, ...styles.badgeBlue }}>
                      {budget.percent}%
                    </span>
                  </div>
                  <p style={{ fontSize: '14px', color: 'var(--le-text-secondary)', marginBottom: '8px' }}>
                    {budget.description}
                  </p>
                  <p style={{ fontSize: '16px', fontWeight: '600', color: 'var(--le-primary)' }}>
                    ${calculateBudget(500000, budget.percent).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* DIY vs Professional */}
      <section style={{ ...styles.section, ...styles.sectionDark }}>
        <h2 style={styles.heading2}>DIY vs Professional</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          <div style={styles.card}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '16px' }}>
              <ToolsIcon />
              <h3 style={{ margin: 0 }}>When to DIY</h3>
            </div>
            <ul style={{ marginLeft: '24px', fontSize: '15px' }}>
              <li style={{ marginBottom: '12px' }}>Painting and wall prep</li>
              <li style={{ marginBottom: '12px' }}>Installing trim and baseboards</li>
              <li style={{ marginBottom: '12px' }}>Simple flooring projects</li>
              <li style={{ marginBottom: '12px' }}>Cabinet refinishing</li>
              <li style={{ marginBottom: '12px' }}>Landscaping and patios</li>
              <li style={{ marginBottom: '12px' }}>Drywall repair</li>
            </ul>
            <div style={{
              padding: '12px',
              backgroundColor: 'rgba(34, 197, 94, 0.1)',
              borderRadius: '8px',
              fontSize: '13px',
              marginTop: '16px',
            }}>
              <strong>Savings:</strong> 30-50% on labor costs
            </div>
          </div>

          <div style={styles.card}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '16px' }}>
              <AlertIcon />
              <h3 style={{ margin: 0 }}>Hire a Professional</h3>
            </div>
            <ul style={{ marginLeft: '24px', fontSize: '15px' }}>
              <li style={{ marginBottom: '12px' }}>Electrical work (requires permit)</li>
              <li style={{ marginBottom: '12px' }}>Plumbing installations</li>
              <li style={{ marginBottom: '12px' }}>HVAC systems</li>
              <li style={{ marginBottom: '12px' }}>Roofing work</li>
              <li style={{ marginBottom: '12px' }}>Structural modifications</li>
              <li style={{ marginBottom: '12px' }}>Gas line installations</li>
            </ul>
            <div style={{
              padding: '12px',
              backgroundColor: 'rgba(251, 191, 36, 0.1)',
              borderRadius: '8px',
              fontSize: '13px',
              marginTop: '16px',
            }}>
              <strong>Protection:</strong> Warranty + insurance coverage
            </div>
          </div>
        </div>
      </section>

      {/* Permit Requirements */}
      <section style={styles.section}>
        <h2 style={styles.heading2}>Permit Requirements</h2>
        <p style={{ fontSize: '18px', color: 'var(--le-text-secondary)', marginBottom: '32px' }}>
          Many renovation projects require permits to ensure safety and code compliance. Check your local building department for requirements.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
          {COMMON_PERMITS.map((item, idx) => (
            <div key={idx} style={{
              padding: '16px',
              backgroundColor: 'white',
              borderRadius: '8px',
              border: '1px solid var(--le-border)',
              display: 'flex',
              gap: '12px',
              alignItems: 'center',
            }}>
              {item.needsPermit ? (
                <AlertIcon />
              ) : (
                <CheckCircleIcon />
              )}
              <div>
                <p style={{ margin: 0, fontWeight: '500' }}>{item.project}</p>
                <p style={{ margin: 0, fontSize: '12px', color: 'var(--le-text-secondary)' }}>
                  {item.needsPermit ? 'Permit Required' : 'Typically No Permit'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline Planning */}
      <section style={{ ...styles.section, ...styles.sectionDark }}>
        <h2 style={styles.heading2}>Realistic Project Timelines</h2>
        <p style={{ fontSize: '18px', color: 'var(--le-text-secondary)', marginBottom: '32px' }}>
          Plan your renovation schedule. Timelines vary based on complexity, permitting, and weather.
        </p>
        <div style={styles.grid}>
          {[
            { project: 'Flooring', timeline: '1-2 weeks', notes: 'Fastest projects. Minimal disruption.' },
            { project: 'Painting', timeline: '1-3 weeks', notes: 'Includes prep and drying time.' },
            { project: 'Windows', timeline: '2-3 weeks', notes: 'Weather dependent.' },
            { project: 'Bathroom', timeline: '4-6 weeks', notes: 'Includes plumbing and tile work.' },
            { project: 'Kitchen', timeline: '8-12 weeks', notes: 'Most complex project type.' },
            { project: 'Roof', timeline: '2-3 weeks', notes: 'Weather and material dependent.' },
          ].map((item, idx) => (
            <div key={idx} style={styles.card}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '12px' }}>
                <ClockIcon />
                <h3 style={{ margin: 0 }}>{item.project}</h3>
              </div>
              <p style={{ fontSize: '20px', fontWeight: '700', color: 'var(--le-primary)', marginBottom: '8px' }}>
                {item.timeline}
              </p>
              <p style={{ fontSize: '14px', color: 'var(--le-text-secondary)' }}>
                {item.notes}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Before & After Showcase */}
      <section style={styles.section}>
        <h2 style={styles.heading2}>Before & After Transformations</h2>
        <p style={{ fontSize: '18px', color: 'var(--le-text-secondary)', marginBottom: '32px' }}>
          Inspiring renovation examples showing real transformations.
        </p>
        <div style={styles.grid}>
          {BEFORE_AFTER_EXAMPLES.map((example, idx) => (
            <div key={idx} style={styles.card}>
              <h3 style={styles.heading3}>{example.title}</h3>

              <div style={{ marginBottom: '24px' }}>
                <p style={{ fontSize: '12px', fontWeight: '600', color: 'var(--le-text-secondary)', marginBottom: '8px' }}>
                  BEFORE
                </p>
                <div style={{
                  padding: '24px',
                  backgroundColor: '#f3f4f6',
                  borderRadius: '8px',
                  fontSize: '14px',
                  color: 'var(--le-text-secondary)',
                  fontStyle: 'italic',
                }}>
                  {example.beforeDesc}
                </div>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <p style={{ fontSize: '12px', fontWeight: '600', color: 'var(--le-text-secondary)', marginBottom: '8px' }}>
                  AFTER
                </p>
                <div style={{
                  padding: '24px',
                  backgroundColor: 'rgba(59, 130, 246, 0.05)',
                  borderRadius: '8px',
                  fontSize: '14px',
                  color: 'var(--le-primary)',
                  fontWeight: '500',
                }}>
                  {example.afterDesc}
                </div>
              </div>

              <div style={{
                padding: '12px',
                backgroundColor: 'var(--le-bg-secondary)',
                borderRadius: '8px',
                fontSize: '14px',
              }}>
                <strong>Est. Cost Range:</strong> {example.costRange}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Accordion */}
      <section style={{ ...styles.section, ...styles.sectionDark }}>
        <h2 style={styles.heading2}>Frequently Asked Questions</h2>
        <div style={{ maxWidth: '700px' }}>
          {FAQ_ITEMS.map((item, idx) => (
            <div key={idx} style={{
              marginBottom: '12px',
              backgroundColor: 'white',
              borderRadius: '8px',
              overflow: 'hidden',
              border: '1px solid var(--le-border)',
            }}>
              <button
                onClick={() => setExpandedFAQ(expandedFAQ === idx ? null : idx)}
                style={{
                  width: '100%',
                  padding: '20px',
                  border: 'none',
                  backgroundColor: 'white',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '16px',
                  fontWeight: '600',
                  textAlign: 'left',
                  transition: 'background-color 0.3s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
              >
                {item.question}
                <ChevronDownIcon />
              </button>
              {expandedFAQ === idx && (
                <div style={{
                  padding: '0 20px 20px 20px',
                  fontSize: '15px',
                  color: 'var(--le-text-secondary)',
                  borderTop: '1px solid var(--le-border)',
                }}>
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Lead Capture CTA */}
      <section style={{ ...styles.section, ...styles.sectionDark }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{ ...styles.heading2, textAlign: 'center' }}>
            Ready to Plan Your Renovation?
          </h2>
          <p style={{ ...styles.subtitle, textAlign: 'center', marginBottom: '32px' }}>
            Get a personalized renovation consultation from our expert advisors. We\u2019ll help you maximize ROI and plan your dream home upgrade.
          </p>

          <form onSubmit={handleLeadSubmit} style={styles.card}>
            <div style={{ marginBottom: '16px' }}>
              <label style={styles.label}>Email Address</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={leadEmail}
                onChange={(e) => setLeadEmail(e.target.value)}
                style={styles.input}
                required
              />
            </div>
            <button
              type="submit"
              style={{ ...styles.button, width: '100%', cursor: 'pointer' }}
            >
              Get Free Consultation
            </button>
            {leadSubmitted && (
              <div style={{
                marginTop: '16px',
                padding: '12px',
                backgroundColor: 'rgba(34, 197, 94, 0.1)',
                borderRadius: '8px',
                color: '#22c55e',
                fontSize: '14px',
                textAlign: 'center',
              }}>
                Thank you! We\u2019ll contact you shortly with personalized recommendations.
              </div>
            )}
          </form>

          <p style={{ textAlign: 'center', fontSize: '13px', color: 'var(--le-text-secondary)', marginTop: '16px' }}>
            No spam, no hidden fees. Just expert guidance to maximize your renovation ROI.
          </p>
        </div>
      </section>
    </div>
  );
}
