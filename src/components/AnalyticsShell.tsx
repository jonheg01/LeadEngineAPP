'use client';

import React, { useEffect } from 'react';

// Analytics tracking functions
export const trackEvent = (category: string, action: string, label?: string) => {
  const payload = { category, action, label };
  fetch('/api/analytics', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type: 'event', ...payload }),
  }).catch(() => {}); // fire-and-forget

  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    console.log('[Analytics Event]', payload);
  }
};

export const trackConversion = (type: string, value?: string | number) => {
  const payload = { type, value };
  fetch('/api/analytics', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type: 'conversion', conversionType: type, conversionValue: value }),
  }).catch(() => {});

  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    console.log('[Analytics Conversion]', payload);
  }
};

export const getUTMParams = () => {
  if (typeof window === 'undefined') return {};

  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get('utm_source'),
    utm_medium: params.get('utm_medium'),
    utm_campaign: params.get('utm_campaign'),
    utm_content: params.get('utm_content'),
    utm_term: params.get('utm_term'),
  };
};

const reportWebVitals = () => {
  if (typeof window === 'undefined') return;

  // Core Web Vitals reporting stub
  if ('web-vital' in window) {
    const handler = (metric: any) => {
      fetch('/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'webvital', name: metric.name, value: metric.value }),
      }).catch(() => {});
    };

    if (process.env.NODE_ENV === 'development') {
      console.log('[Web Vitals] monitoring enabled');
    }
  }
};

interface AnalyticsShellProps {
  children: React.ReactNode;
}

export default function AnalyticsShell({ children }: AnalyticsShellProps) {
  useEffect(() => {
    // Capture UTM parameters on mount
    const utmParams = getUTMParams();
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('utm_params', JSON.stringify(utmParams));
      sessionStorage.setItem('landing_page', window.location.pathname);
      sessionStorage.setItem('referrer', document.referrer);
      sessionStorage.setItem('session_start', new Date().toISOString());
    }

    // Track page view
    trackEvent('page', 'view', window.location.pathname);

    // Setup Web Vitals reporting
    reportWebVitals();

    // Track session duration periodically
    const sessionTimer = setInterval(() => {
      if (typeof window !== 'undefined') {
        const startTime = sessionStorage.getItem('session_start');
        if (startTime) {
          const duration = Math.floor((Date.now() - new Date(startTime).getTime()) / 1000);
          sessionStorage.setItem('session_duration', duration.toString());
        }
      }
    }, 30000);

    return () => clearInterval(sessionTimer);
  }, []);

  return <>{children}</>;
}
