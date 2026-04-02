'use client';

import React, { useState } from 'react';
import { useMobile } from '@/hooks/useMobile';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useLeadCapture } from '@/hooks/useLeadCapture';
import {
  Icon,
  Button,
  Card,
  Badge,
  SectionHeading,
  StatCounter,
} from './design-system';
import { LeadCaptureShell } from './LeadCaptureShell';

interface Guide {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'Buyer Guide' | 'Seller Guide' | 'Market Report' | 'Checklist' | 'Investment';
  downloadCount: number;
  pages: number;
}

const GUIDES: Guide[] = [
  {
    id: 'first-time-buyer',
    title: 'First-Time Home Buyer\'s Guide',
    description: 'Everything you need to know before making your first home purchase. From pre-approval to closing day.',
    icon: 'home',
    category: 'Buyer Guide',
    downloadCount: 2400,
    pages: 32,
  },
  {
    id: 'phoenix-market-q1',
    title: 'Phoenix Market Report Q1 2026',
    description: 'Latest market data, trends, and insights for the Phoenix real estate market.',
    icon: 'trend-up',
    category: 'Market Report',
    downloadCount: 1800,
    pages: 18,
  },
  {
    id: 'sellers-playbook',
    title: 'Home Seller\'s Playbook',
    description: 'Proven strategies to maximize your home\'s value and attract qualified buyers.',
    icon: 'briefcase',
    category: 'Seller Guide',
    downloadCount: 1500,
    pages: 28,
  },
  {
    id: 'moving-checklist',
    title: 'Moving to Arizona Checklist',
    description: 'Complete checklist for relocating to Arizona. Don\'t miss a single step.',
    icon: 'check-list',
    category: 'Checklist',
    downloadCount: 3200,
    pages: 12,
  },
  {
    id: 'investment-calculator',
    title: 'Investment Property Calculator Guide',
    description: 'Learn how to evaluate investment properties and calculate returns accurately.',
    icon: 'calculator',
    category: 'Investment',
    downloadCount: 900,
    pages: 24,
  },
  {
    id: 'staging-tips',
    title: 'Home Staging Tips That Sell',
    description: 'Professional staging techniques to showcase your home\'s best features and get top dollar.',
    icon: 'star',
    category: 'Seller Guide',
    downloadCount: 2100,
    pages: 16,
  },
  {
    id: 'neighborhood-guide',
    title: 'Neighborhood Comparison Guide',
    description: 'Detailed profiles of Phoenix neighborhoods with demographics, schools, and lifestyle data.',
    icon: 'map-pin',
    category: 'Buyer Guide',
    downloadCount: 1300,
    pages: 20,
  },
  {
    id: 'mortgage-roadmap',
    title: 'Mortgage Pre-Approval Roadmap',
    description: 'Step-by-step guide to getting pre-approved and securing the best mortgage rates.',
    icon: 'document',
    category: 'Buyer Guide',
    downloadCount: 2800,
    pages: 14,
  },
];

const CATEGORIES = [
  'All',
  'Buyer Guide',
  'Seller Guide',
  'Market Report',
  'Checklist',
  'Investment',
];

interface LeadMagnetLibraryProps {
  featured?: boolean;
}

export function LeadMagnetLibrary({ featured = false }: LeadMagnetLibraryProps) {
  const isMobile = useMobile();
  const { openCapture } = useLeadCapture();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { ref: revealRef } = useScrollReveal();

  const filteredGuides = selectedCategory === 'All'
    ? GUIDES
    : GUIDES.filter(guide => guide.category === selectedCategory);

  const displayGuides = featured ? filteredGuides.slice(0, 3) : filteredGuides;

  const handleDownload = () => {
    openCapture('guide');
  };

  const containerStyles: React.CSSProperties = {
    width: '100%',
    padding: isMobile ? '32px 24px' : '64px 32px',
    background: 'var(--le-surface-primary)',
  };

  const contentStyles: React.CSSProperties = {
    maxWidth: '1280px',
    margin: '0 auto',
  };

  const heroStyles: React.CSSProperties = {
    marginBottom: '64px',
    textAlign: 'center' as const,
  };

  const eyebrowStyles: React.CSSProperties = {
    fontSize: '14px',
    fontWeight: 600,
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
    color: 'var(--le-gold)',
    marginBottom: '8px',
  };

  const titleStyles: React.CSSProperties = {
    fontSize: isMobile ? '32px' : '48px',
    fontWeight: 700,
    color: 'var(--le-text-primary)',
    marginBottom: '16px',
    lineHeight: 1.2,
  };

  const subtitleStyles: React.CSSProperties = {
    fontSize: isMobile ? '16px' : '18px',
    color: 'var(--le-text-secondary)',
    maxWidth: '600px',
    margin: '0 auto',
  };

  const filterContainerStyles: React.CSSProperties = {
    display: 'flex',
    gap: isMobile ? '8px' : '12px',
    marginBottom: '48px',
    flexWrap: 'wrap',
    justifyContent: 'center',
  };

  const filterPillStyles = (isActive: boolean): React.CSSProperties => ({
    padding: '10px 16px',
    fontSize: '14px',
    fontWeight: 500,
    border: 'none',
    borderRadius: '24px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    background: isActive ? 'var(--le-gold)' : 'var(--le-surface-secondary)',
    color: isActive ? 'var(--le-surface-primary)' : 'var(--le-text-secondary)',
    whiteSpace: 'nowrap',
  });

  const gridStyles: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
    gap: '24px',
    marginBottom: featured ? '48px' : '64px',
  };

  const cardContainerStyles: React.CSSProperties = {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  };

  const cardHeaderStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: '16px',
  };

  const iconContainerStyles: React.CSSProperties = {
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    background: 'var(--le-gold)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--le-surface-primary)',
    flexShrink: 0,
  };

  const cardTitleStyles: React.CSSProperties = {
    fontSize: isMobile ? '16px' : '18px',
    fontWeight: 600,
    color: 'var(--le-text-primary)',
    marginBottom: '8px',
  };

  const cardDescriptionStyles: React.CSSProperties = {
    fontSize: '14px',
    color: 'var(--le-text-secondary)',
    lineHeight: 1.6,
    marginBottom: '16px',
    flexGrow: 1,
  };

  const metaRowStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    marginBottom: '16px',
    fontSize: '13px',
    color: 'var(--le-text-tertiary)',
  };

  const metaItemStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  };

  const ctaSectionStyles: React.CSSProperties = {
    background: 'var(--le-surface-dark)',
    padding: isMobile ? '40px 24px' : '64px 32px',
    borderRadius: '16px',
    textAlign: 'center' as const,
    color: 'white',
  };

  const ctaTitleStyles: React.CSSProperties = {
    fontSize: isMobile ? '28px' : '36px',
    fontWeight: 700,
    marginBottom: '12px',
  };

  const ctaDescriptionStyles: React.CSSProperties = {
    fontSize: '16px',
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: '32px',
    maxWidth: '500px',
    margin: '0 auto 32px',
  };

  return (
    <div style={containerStyles} ref={revealRef}>
      <div style={contentStyles}>
        {!featured && (
          <>
            <div style={heroStyles}>
              <div style={eyebrowStyles}>Free Resources</div>
              <h1 style={titleStyles}>Real Estate Guides & Reports</h1>
              <p style={subtitleStyles}>
                Download our comprehensive guides and market reports to make informed real estate decisions.
              </p>
            </div>

            <div style={filterContainerStyles}>
              {CATEGORIES.map(category => (
                <button
                  key={category}
                  style={filterPillStyles(selectedCategory === category)}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </>
        )}

        <div style={gridStyles}>
          {displayGuides.map(guide => (
            <Card key={guide.id} padding={24} style={cardContainerStyles}>
              <div style={cardHeaderStyles}>
                <div style={iconContainerStyles}>
                  <Icon name={guide.icon} size={24} />
                </div>
                <Badge
                  label={guide.category}
                  variant="secondary"
                  size="sm"
                />
              </div>

              <h3 style={cardTitleStyles}>{guide.title}</h3>
              <p style={cardDescriptionStyles}>{guide.description}</p>

              <div style={metaRowStyles}>
                <div style={metaItemStyles}>
                  <Icon name="document" size={14} />
                  <span>{guide.pages} pages</span>
                </div>
                <div style={metaItemStyles}>
                  <Icon name="download" size={14} />
                  <span>{guide.downloadCount.toLocaleString()} downloads</span>
                </div>
              </div>

              <Button
                variant="primary"
                onClick={handleDownload}
                style={{ width: '100%' }}
              >
                Download Free
              </Button>
            </Card>
          ))}
        </div>

        {!featured && (
          <div style={ctaSectionStyles}>
            <h2 style={ctaTitleStyles}>Need a Custom Report?</h2>
            <p style={ctaDescriptionStyles}>
              We can create a personalized market analysis or investment report tailored to your specific needs.
            </p>
            <Button
              variant="outline"
              onClick={() => openCapture('custom-report')}
              style={{
                borderColor: 'var(--le-gold)',
                color: 'var(--le-gold)',
              }}
            >
              Request Custom Report
            </Button>
          </div>
        )}
      </div>

      <LeadCaptureShell />
    </div>
  );
}

export function LeadMagnetFeatured() {
  return <LeadMagnetLibrary featured={true} />;
}

export default LeadMagnetLibrary;
