'use client';

import React, { useState, useEffect } from 'react';
import { Icon, Button, Card, Badge } from './design-system';
import { useLeadCapture } from '@/hooks/useLeadCapture';

interface VisitorBehavior {
  pagesVisited: number;
  timeOnSite: number; // seconds
  searchPerformed: boolean;
  listingViewed: boolean;
  isReturnVisit: boolean;
}

interface NudgeConfig {
  variant: 'searcher' | 'valuation' | 'neighborhood' | 'default';
  headline: string;
  body: string;
  ctaText: string;
}

const calculateHeatScore = (behavior: VisitorBehavior): number => {
  let score = 0;

  // Page views: 5 points each
  score += behavior.pagesVisited * 5;

  // Time on site: 1 point per 30 seconds
  score += Math.floor(behavior.timeOnSite / 30);

  // Search performed: 15 points
  if (behavior.searchPerformed) score += 15;

  // Listing viewed: 10 points
  if (behavior.listingViewed) score += 10;

  // Return visit: 20 points
  if (behavior.isReturnVisit) score += 20;

  return Math.min(score, 100);
};

const getNudgeConfig = (behavior: VisitorBehavior, score: number): NudgeConfig => {
  if (behavior.searchPerformed && behavior.pagesVisited > 4) {
    return {
      variant: 'searcher',
      headline: 'We noticed you\'re actively searching!',
      body: 'Want us to send you matches that aren\'t on the public market yet?',
      ctaText: 'Send Me Unlisted Deals',
    };
  }

  if (behavior.pagesVisited > 3 && !behavior.searchPerformed) {
    return {
      variant: 'neighborhood',
      headline: 'Love exploring areas?',
      body: 'Let us send you a custom neighborhood guide for your favorite Phoenix neighborhoods.',
      ctaText: 'Get Neighborhood Guide',
    };
  }

  if (behavior.listingViewed && behavior.pagesVisited > 2) {
    return {
      variant: 'valuation',
      headline: 'Thinking of selling?',
      body: 'Get a detailed CMA from a local expert — free, no strings.',
      ctaText: 'Get Free CMA',
    };
  }

  return {
    variant: 'default',
    headline: 'You seem serious about Arizona real estate.',
    body: 'Let\'s chat — no pressure, just answers.',
    ctaText: 'Start a Conversation',
  };
};

export default function HotLeadNudge() {
  const [behavior, setBehavior] = useState<VisitorBehavior>({
    pagesVisited: 1,
    timeOnSite: 0,
    searchPerformed: false,
    listingViewed: false,
    isReturnVisit: false,
  });

  const [heatScore, setHeatScore] = useState(0);
  const [showNudge, setShowNudge] = useState(false);
  const [nudgeConfig, setNudgeConfig] = useState<NudgeConfig | null>(null);
  const [dismissed, setDismissed] = useState(false);

  const { captureRequest } = useLeadCapture();

  // Track pages visited
  useEffect(() => {
    const handlePageChange = () => {
      setBehavior((prev) => ({
        ...prev,
        pagesVisited: prev.pagesVisited + 1,
      }));
    };

    window.addEventListener('popstate', handlePageChange);
    const originalPush = window.history.pushState;
    window.history.pushState = function (...args) {
      handlePageChange();
      return originalPush.apply(this, args);
    };

    return () => {
      window.removeEventListener('popstate', handlePageChange);
      window.history.pushState = originalPush;
    };
  }, []);

  // Track time on site
  useEffect(() => {
    const interval = setInterval(() => {
      setBehavior((prev) => ({
        ...prev,
        timeOnSite: prev.timeOnSite + 5,
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Track search and listing views from sessionStorage
  useEffect(() => {
    const handleStorageChange = () => {
      const searchPerformed = sessionStorage.getItem('search_performed') === 'true';
      const listingViewed = sessionStorage.getItem('listing_viewed') === 'true';
      const isReturnVisit = sessionStorage.getItem('return_visit') === 'true';

      setBehavior((prev) => ({
        ...prev,
        searchPerformed,
        listingViewed,
        isReturnVisit,
      }));
    };

    window.addEventListener('storage', handleStorageChange);
    handleStorageChange(); // initial check

    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Calculate heat score and determine if nudge should show
  useEffect(() => {
    const score = calculateHeatScore(behavior);
    setHeatScore(score);

    const isDismissed = sessionStorage.getItem('nudge_dismissed_until');
    if (isDismissed && new Date(isDismissed) > new Date()) {
      setDismissed(true);
      setShowNudge(false);
      return;
    }

    if (score > 60 && !dismissed) {
      const config = getNudgeConfig(behavior, score);
      setNudgeConfig(config);
      setShowNudge(true);
    } else {
      setShowNudge(false);
    }
  }, [behavior, dismissed]);

  const handleDismiss = () => {
    setShowNudge(false);
    setDismissed(true);
    const dismissUntil = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
    sessionStorage.setItem('nudge_dismissed_until', dismissUntil);
  };

  const handleCTA = () => {
    captureRequest({
      source: 'hot_lead_nudge',
      variant: nudgeConfig?.variant,
      heatScore,
    });
    setShowNudge(false);
  };

  if (!showNudge || !nudgeConfig) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 40,
        animation: 'slideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(400px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>

      <Card
        style={{
          maxWidth: '340px',
          backgroundColor: 'var(--le-bg-card)',
          borderColor: 'var(--le-border-subtle)',
          boxShadow:
            '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '12px',
          }}
        >
          <Badge
            style={{
              backgroundColor: 'var(--le-accent-subtle)',
              color: 'var(--le-accent)',
              padding: '4px 8px',
              fontSize: '12px',
              fontWeight: '600',
            }}
          >
            Special Offer
          </Badge>
          <button
            onClick={handleDismiss}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px',
              color: 'var(--le-text-muted)',
              fontSize: '18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            aria-label="Dismiss"
          >
            <Icon name="x" size={18} />
          </button>
        </div>

        <h3
          style={{
            margin: '0 0 8px 0',
            fontSize: '16px',
            fontWeight: '700',
            color: 'var(--le-text-primary)',
            lineHeight: '1.3',
          }}
        >
          {nudgeConfig.headline}
        </h3>

        <p
          style={{
            margin: '0 0 16px 0',
            fontSize: '14px',
            color: 'var(--le-text-secondary)',
            lineHeight: '1.5',
          }}
        >
          {nudgeConfig.body}
        </p>

        <Button
          onClick={handleCTA}
          style={{
            width: '100%',
            backgroundColor: 'var(--le-accent)',
            color: 'white',
            border: 'none',
            padding: '10px 16px',
            fontSize: '14px',
            fontWeight: '600',
            borderRadius: 'var(--le-radius-md)',
            cursor: 'pointer',
            transition: 'background-color 0.2s',
          }}
          onMouseEnter={(e) => {
            (e.target as HTMLElement).style.backgroundColor = 'var(--le-accent-dark)';
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLElement).style.backgroundColor = 'var(--le-accent)';
          }}
        >
          {nudgeConfig.ctaText}
        </Button>

        <p
          style={{
            margin: '12px 0 0 0',
            fontSize: '11px',
            color: 'var(--le-text-muted)',
            textAlign: 'center',
            fontStyle: 'italic',
          }}
        >
          Heat score: {heatScore}/100
        </p>
      </Card>
    </div>
  );
}
