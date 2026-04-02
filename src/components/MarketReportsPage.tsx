'use client';

import React, { useState, useMemo } from 'react';

interface MarketMetric {
  label: string;
  value: string;
  change: number;
  unit: string;
}

interface NeighborhoodData {
  name: string;
  medianPrice: number;
  priceChange: number;
  avgDOM: number;
  activeListing: number;
  soldLast30: number;
}

interface Article {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  content: string;
}

interface ComparisonNeighborhood {
  name: string;
  medianPrice: number;
  priceChange: number;
  avgDOM: number;
  activeListing: number;
  soldLast30: number;
  daysOnMarket: number;
}

const MarketReportsPage = () => {
  const [expandedArticle, setExpandedArticle] = useState<string | null>(null);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof NeighborhoodData;
    direction: 'asc' | 'desc';
  }>({ key: 'medianPrice', direction: 'desc' });
  const [selectedNeighborhoods, setSelectedNeighborhoods] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    neighborhood: '',
    propertyType: 'residential',
    intent: 'researching',
  });
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [trendMetric, setTrendMetric] = useState('price');

  const marketMetrics: MarketMetric[] = [
    { label: 'Median Home Price', value: '$425,000', change: 5.2, unit: 'YoY' },
    { label: 'Average Days on Market', value: '22', change: -3, unit: 'vs last month' },
    { label: 'Active Listings', value: '1,847', change: 12, unit: 'vs last month' },
    { label: 'Homes Sold (Last 30 Days)', value: '342', change: 8, unit: 'units' },
    { label: 'Sale-to-List Price Ratio', value: '98.7%', change: -0.3, unit: 'vs last month' },
    { label: 'Months of Inventory', value: '2.8', change: 0.2, unit: 'months' },
  ];

  const neighborhoodData: NeighborhoodData[] = [
    { name: 'Downtown Core', medianPrice: 520000, priceChange: 6.2, avgDOM: 18, activeListing: 142, soldLast30: 48 },
    { name: 'Riverside District', medianPrice: 485000, priceChange: 7.1, avgDOM: 21, activeListing: 156, soldLast30: 52 },
    { name: 'Oak Park', medianPrice: 395000, priceChange: 4.8, avgDOM: 24, activeListing: 198, soldLast30: 41 },
    { name: 'Tech Quarter', medianPrice: 615000, priceChange: 8.3, avgDOM: 16, activeListing: 89, soldLast30: 35 },
    { name: 'Garden Heights', medianPrice: 325000, priceChange: 3.2, avgDOM: 28, activeListing: 247, soldLast30: 38 },
    { name: 'Historic District', medianPrice: 580000, priceChange: 5.9, avgDOM: 22, activeListing: 104, soldLast30: 44 },
    { name: 'Waterfront Village', medianPrice: 750000, priceChange: 9.1, avgDOM: 19, activeListing: 67, soldLast30: 29 },
    { name: 'Midtown Lofts', medianPrice: 445000, priceChange: 6.5, avgDOM: 20, activeListing: 178, soldLast30: 56 },
    { name: 'Lakeside Estates', medianPrice: 625000, priceChange: 7.8, avgDOM: 23, activeListing: 92, soldLast30: 33 },
    { name: 'Valley View', medianPrice: 355000, priceChange: 2.1, avgDOM: 31, activeListing: 226, soldLast30: 35 },
  ];

  const articles: Article[] = [
    {
      id: 'spring-outlook',
      title: 'Spring 2026 Market Outlook',
      excerpt: 'As we enter spring, the real estate market shows signs of renewed activity with increased buyer interest and fresh inventory...',
      date: 'April 1, 2026',
      readTime: '5 min read',
      content: 'As we enter spring, the real estate market shows signs of renewed activity with increased buyer interest and fresh inventory. Spring has historically been the strongest selling season, and 2026 is shaping up to be no exception. With mortgage rates stabilizing and consumer confidence growing, we expect to see strong competition among buyers in desirable neighborhoods.\n\nThe key trends to watch this spring include:\n• Increased inventory across all price points\n• Competitive bidding wars in premium neighborhoods\n• Growing interest from first-time homebuyers\n• Investment activity in transitional neighborhoods\n\nExperts predict strong demand through May and June, with prices expected to appreciate 3-5% over the next two quarters.',
    },
    {
      id: 'is-now-good-time',
      title: 'Is Now a Good Time to Buy?',
      excerpt: 'With current market conditions, we break down whether 2026 presents the right opportunity for homebuyers...',
      date: 'March 28, 2026',
      readTime: '7 min read',
      content: 'The question of timing is one of the most important in real estate. While no one can perfectly time the market, current conditions suggest opportunities exist for well-prepared buyers.\n\nCurrent advantages for buyers:\n• Stable mortgage rates around 6.8% APR\n• Growing inventory compared to 2025\n• Reduced urgency from sellers in lower-priced segments\n• Government incentives for first-time homebuyers\n\nConsiderations:\n• Prices remain elevated historically\n• Competition is intensifying in desirable areas\n• Job market uncertainty could impact affordability\n\nThe best time to buy is when you are ready financially and have found the right property. Work with a qualified real estate professional to understand your specific situation.',
    },
    {
      id: 'investment-hotspots',
      title: 'Investment Property Hotspots',
      excerpt: 'Identifying neighborhoods with strong appreciation potential and rental yield opportunities...',
      date: 'March 25, 2026',
      readTime: '6 min read',
      content: 'Real estate investors are increasingly looking beyond primary residences. Several neighborhoods are emerging as prime investment opportunities with strong fundamentals and growth trajectories.\n\nTop investment neighborhoods:\n\n1. Tech Quarter: High appreciation (8.3% YoY) with strong rental demand from tech workers. Cap rates around 4.2%.\n\n2. Riverside District: Gentrifying area with infrastructure improvements planned. Median price $485K with 7.1% appreciation.\n\n3. Garden Heights: Entry-level investment with 3.2% appreciation and strong tenant base. Average monthly rent $1,850.\n\n4. Midtown Lofts: Urban revitalization driving demand. 6.5% appreciation with limited inventory.\n\nConsider cash flow, appreciation potential, and local economic fundamentals when evaluating investment opportunities.',
    },
    {
      id: 'first-time-buyer',
      title: 'First-Time Buyer Market Guide',
      excerpt: 'Everything first-time homebuyers need to know about today\'s market and how to navigate the buying process...',
      date: 'March 22, 2026',
      readTime: '8 min read',
      content: 'Buying your first home is exciting and challenging. This guide walks you through the essential steps and considerations for 2026 first-time buyers.\n\nStep 1: Get Pre-Approved\nBefore looking at properties, get a pre-approval letter. This shows sellers you\'re serious and helps you understand your budget.\n\nStep 2: Understand Your Budget\nWith median prices at $425K, calculate what you can comfortably afford with 20% down payment and current mortgage rates.\n\nStep 3: Find the Right Neighborhood\nConsider commute times, school quality, neighborhood growth trends, and amenities. Areas like Garden Heights and Valley View offer good entry points.\n\nStep 4: Make an Offer\nWork with your agent to research comparable sales and market conditions. In today\'s market, strong offers without excessive contingencies win.\n\nStep 5: Home Inspection & Appraisal\nNever skip the home inspection. Appraisal ensures the property value supports the loan amount.\n\nThe current market offers opportunities for prepared buyers. Take your time, do your research, and work with professionals you trust.',
    },
  ];

  const neighborhoodOptions = neighborhoodData.map(n => n.name);

  const comparisonData: Record<string, ComparisonNeighborhood> = {
    'Downtown Core': { name: 'Downtown Core', medianPrice: 520000, priceChange: 6.2, avgDOM: 18, activeListing: 142, soldLast30: 48, daysOnMarket: 18 },
    'Riverside District': { name: 'Riverside District', medianPrice: 485000, priceChange: 7.1, avgDOM: 21, activeListing: 156, soldLast30: 52, daysOnMarket: 21 },
    'Oak Park': { name: 'Oak Park', medianPrice: 395000, priceChange: 4.8, avgDOM: 24, activeListing: 198, soldLast30: 41, daysOnMarket: 24 },
    'Tech Quarter': { name: 'Tech Quarter', medianPrice: 615000, priceChange: 8.3, avgDOM: 16, activeListing: 89, soldLast30: 35, daysOnMarket: 16 },
    'Garden Heights': { name: 'Garden Heights', medianPrice: 325000, priceChange: 3.2, avgDOM: 28, activeListing: 247, soldLast30: 38, daysOnMarket: 28 },
    'Historic District': { name: 'Historic District', medianPrice: 580000, priceChange: 5.9, avgDOM: 22, activeListing: 104, soldLast30: 44, daysOnMarket: 22 },
    'Waterfront Village': { name: 'Waterfront Village', medianPrice: 750000, priceChange: 9.1, avgDOM: 19, activeListing: 67, soldLast30: 29, daysOnMarket: 19 },
    'Midtown Lofts': { name: 'Midtown Lofts', medianPrice: 445000, priceChange: 6.5, avgDOM: 20, activeListing: 178, soldLast30: 56, daysOnMarket: 20 },
    'Lakeside Estates': { name: 'Lakeside Estates', medianPrice: 625000, priceChange: 7.8, avgDOM: 23, activeListing: 92, soldLast30: 33, daysOnMarket: 23 },
    'Valley View': { name: 'Valley View', medianPrice: 355000, priceChange: 2.1, avgDOM: 31, activeListing: 226, soldLast30: 35, daysOnMarket: 31 },
  };

  const priceTrendData = [
    { month: 'Apr', price: 410000 },
    { month: 'May', price: 412000 },
    { month: 'Jun', price: 415000 },
    { month: 'Jul', price: 418000 },
    { month: 'Aug', price: 420000 },
    { month: 'Sep', price: 419000 },
    { month: 'Oct', price: 421000 },
    { month: 'Nov', price: 423000 },
    { month: 'Dec', price: 424000 },
    { month: 'Jan', price: 424500 },
    { month: 'Feb', price: 424800 },
    { month: 'Mar', price: 425000 },
  ];

  const volumeTrendData = [
    { month: 'Apr', volume: 28 },
    { month: 'May', volume: 35 },
    { month: 'Jun', volume: 42 },
    { month: 'Jul', volume: 38 },
    { month: 'Aug', volume: 36 },
    { month: 'Sep', volume: 31 },
    { month: 'Oct', volume: 29 },
    { month: 'Nov', volume: 26 },
    { month: 'Dec', volume: 24 },
    { month: 'Jan', volume: 27 },
    { month: 'Feb', volume: 30 },
    { month: 'Mar', price: 32 },
  ];

  const trendData = trendMetric === 'price' ? priceTrendData : volumeTrendData;
  const maxValue = Math.max(...trendData.map(d => trendMetric === 'price' ? d.price : d.volume));

  const sortedNeighborhoods = useMemo(() => {
    const sorted = [...neighborhoodData].sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];
      const comparison = typeof aVal === 'number' ? aVal - bVal : String(aVal).localeCompare(String(bVal));
      return sortConfig.direction === 'asc' ? comparison : -comparison;
    });
    return sorted;
  }, [sortConfig]);

  const handleSort = (key: keyof NeighborhoodData) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === 'desc' ? 'asc' : 'desc',
    });
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitSuccess(true);
    setFormData({ name: '', email: '', neighborhood: '', propertyType: 'residential', intent: 'researching' });
    setTimeout(() => setSubmitSuccess(false), 5000);
  };

  const handleNeighborhoodSelect = (neighborhood: string) => {
    if (selectedNeighborhoods.includes(neighborhood)) {
      setSelectedNeighborhoods(selectedNeighborhoods.filter(n => n !== neighborhood));
    } else if (selectedNeighborhoods.length < 2) {
      setSelectedNeighborhoods([...selectedNeighborhoods, neighborhood]);
    }
  };

  const ArrowUpIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ display: 'inline', marginRight: '4px' }}>
      <path d="M8 3L2 9h4v4h4v-4h4L8 3Z" fill="currentColor" />
    </svg>
  );

  const ArrowDownIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ display: 'inline', marginRight: '4px' }}>
      <path d="M8 13L2 7h4v-4h4v4h4l-6 6Z" fill="currentColor" />
    </svg>
  );

  const ChevronIcon = ({ direction = 'down' }: { direction?: 'down' | 'up' }) => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      {direction === 'down' ? (
        <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      ) : (
        <path d="M4 10L8 6L12 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      )}
    </svg>
  );

  const styles = {
    container: {
      width: '100%',
      backgroundColor: 'var(--le-bg)',
      color: 'var(--le-text)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      fontSize: '16px',
      lineHeight: '1.6',
    },
    hero: {
      backgroundColor: 'var(--le-surface)',
      padding: 'clamp(60px, 12vw, 100px) 20px',
      textAlign: 'center' as const,
      borderBottom: '1px solid var(--le-border)',
    },
    heroTitle: {
      fontSize: 'clamp(32px, 6vw, 56px)',
      fontWeight: 700,
      marginBottom: '16px',
      color: 'var(--le-text)',
    },
    heroSubtitle: {
      fontSize: '18px',
      color: 'var(--le-text-secondary)',
      marginBottom: '32px',
      maxWidth: '600px',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    ctaButton: {
      backgroundColor: 'var(--le-primary)',
      color: 'white',
      border: 'none',
      padding: '12px 32px',
      borderRadius: '6px',
      fontSize: '16px',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'background-color 0.2s',
    },
    section: {
      padding: '60px 20px',
      maxWidth: '1200px',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    sectionTitle: {
      fontSize: '32px',
      fontWeight: 700,
      marginBottom: '40px',
      color: 'var(--le-text)',
    },
    metricsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '20px',
    },
    metricCard: {
      backgroundColor: 'var(--le-surface)',
      border: '1px solid var(--le-border)',
      borderRadius: '8px',
      padding: '24px',
      textAlign: 'center' as const,
    },
    metricValue: {
      fontSize: '32px',
      fontWeight: 700,
      color: 'var(--le-primary)',
      marginBottom: '8px',
    },
    metricLabel: {
      fontSize: '14px',
      color: 'var(--le-text-secondary)',
      marginBottom: '12px',
    },
    metricChange: {
      fontSize: '14px',
      fontWeight: 600,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    trendContainer: {
      marginTop: '40px',
    },
    trendControls: {
      display: 'flex',
      gap: '12px',
      marginBottom: '24px',
      flexWrap: 'wrap' as const,
    },
    trendButton: {
      padding: '8px 16px',
      border: '1px solid var(--le-border)',
      backgroundColor: 'transparent',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: 500,
      transition: 'all 0.2s',
      color: 'var(--le-text)',
    },
    trendButtonActive: {
      backgroundColor: 'var(--le-primary)',
      color: 'white',
      borderColor: 'var(--le-primary)',
    },
    chartContainer: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-around',
      height: '300px',
      padding: '20px',
      backgroundColor: 'var(--le-surface)',
      borderRadius: '8px',
      border: '1px solid var(--le-border)',
      gap: '8px',
    },
    chartBar: {
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
      flex: 1,
      minWidth: '0',
    },
    barVisual: {
      width: '100%',
      backgroundColor: 'var(--le-primary)',
      borderRadius: '4px 4px 0 0',
      marginBottom: '8px',
      transition: 'opacity 0.2s',
      minHeight: '2px',
    },
    barLabel: {
      fontSize: '12px',
      fontWeight: 500,
      textAlign: 'center' as const,
      width: '100%',
      wordBreak: 'break-word' as const,
    },
    neighborhoodTable: {
      width: '100%',
      borderCollapse: 'collapse' as const,
      marginTop: '20px',
    },
    tableHeader: {
      backgroundColor: 'var(--le-surface)',
      borderBottom: '2px solid var(--le-border)',
      padding: '12px',
      textAlign: 'left' as const,
      fontWeight: 600,
      fontSize: '14px',
      cursor: 'pointer',
      userSelect: 'none' as const,
      color: 'var(--le-text)',
    },
    tableCell: {
      padding: '12px',
      borderBottom: '1px solid var(--le-border)',
      fontSize: '14px',
    },
    tableRow: {
      backgroundColor: 'var(--le-bg)',
    },
    tableRowAlt: {
      backgroundColor: 'var(--le-surface)',
    },
    articlesGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '24px',
    },
    articleCard: {
      backgroundColor: 'var(--le-surface)',
      border: '1px solid var(--le-border)',
      borderRadius: '8px',
      padding: '24px',
      display: 'flex',
      flexDirection: 'column' as const,
    },
    articleTitle: {
      fontSize: '18px',
      fontWeight: 700,
      marginBottom: '12px',
      color: 'var(--le-text)',
    },
    articleMeta: {
      fontSize: '12px',
      color: 'var(--le-text-secondary)',
      marginBottom: '12px',
      display: 'flex',
      gap: '16px',
    },
    articleExcerpt: {
      fontSize: '14px',
      color: 'var(--le-text)',
      marginBottom: '16px',
      lineHeight: '1.6',
      flex: 1,
    },
    articleContent: {
      fontSize: '14px',
      color: 'var(--le-text)',
      lineHeight: '1.8',
      marginBottom: '16px',
      whiteSpace: 'pre-wrap' as const,
    },
    readMoreButton: {
      alignSelf: 'flex-start' as const,
      backgroundColor: 'transparent',
      color: 'var(--le-primary)',
      border: 'none',
      padding: '0',
      fontSize: '14px',
      fontWeight: 600,
      cursor: 'pointer',
      textDecoration: 'underline',
    },
    comparisonContainer: {
      backgroundColor: 'var(--le-surface)',
      border: '1px solid var(--le-border)',
      borderRadius: '8px',
      padding: '24px',
      marginBottom: '20px',
    },
    comparisonSelectors: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '20px',
      marginBottom: '24px',
    },
    selectWrapper: {
      display: 'flex',
      flexDirection: 'column' as const,
    },
    selectLabel: {
      fontSize: '14px',
      fontWeight: 600,
      marginBottom: '8px',
      color: 'var(--le-text)',
    },
    select: {
      padding: '10px',
      border: '1px solid var(--le-border)',
      borderRadius: '6px',
      backgroundColor: 'var(--le-bg)',
      color: 'var(--le-text)',
      fontSize: '14px',
      cursor: 'pointer',
    },
    comparisonTable: {
      width: '100%',
      borderCollapse: 'collapse' as const,
    },
    comparisonHeaderCell: {
      backgroundColor: 'var(--le-bg)',
      border: '1px solid var(--le-border)',
      padding: '12px',
      fontWeight: 600,
      fontSize: '14px',
      textAlign: 'center' as const,
    },
    comparisonDataCell: {
      border: '1px solid var(--le-border)',
      padding: '12px',
      fontSize: '14px',
      textAlign: 'right' as const,
    },
    comparisonLabelCell: {
      border: '1px solid var(--le-border)',
      padding: '12px',
      fontSize: '14px',
      fontWeight: 500,
      textAlign: 'left' as const,
      width: '200px',
      backgroundColor: 'var(--le-surface)',
    },
    comparisonWinner: {
      backgroundColor: 'rgba(76, 175, 80, 0.1)',
      fontWeight: 600,
      color: 'var(--le-accent)',
    },
    leadForm: {
      backgroundColor: 'var(--le-surface)',
      border: '1px solid var(--le-border)',
      borderRadius: '8px',
      padding: '32px',
      maxWidth: '600px',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    formGroup: {
      marginBottom: '20px',
    },
    formLabel: {
      display: 'block',
      fontSize: '14px',
      fontWeight: 600,
      marginBottom: '8px',
      color: 'var(--le-text)',
    },
    formInput: {
      width: '100%',
      padding: '10px 12px',
      border: '1px solid var(--le-border)',
      borderRadius: '6px',
      fontSize: '14px',
      boxSizing: 'border-box' as const,
      backgroundColor: 'var(--le-bg)',
      color: 'var(--le-text)',
    },
    radioGroup: {
      display: 'flex',
      gap: '20px',
      flexWrap: 'wrap' as const,
    },
    radioOption: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      cursor: 'pointer',
    },
    submitButton: {
      width: '100%',
      padding: '12px',
      backgroundColor: 'var(--le-primary)',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      fontSize: '16px',
      fontWeight: 600,
      cursor: 'pointer',
      marginTop: '8px',
    },
    successMessage: {
      marginTop: '16px',
      padding: '12px',
      backgroundColor: 'rgba(76, 175, 80, 0.1)',
      borderLeft: '4px solid var(--le-accent)',
      borderRadius: '4px',
      color: 'var(--le-accent)',
      fontSize: '14px',
    },
  };

  return (
    <div style={styles.container}>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'DataSet',
            name: 'Real Estate Market Reports',
            description: 'Comprehensive real estate market data and analytics',
            datePublished: '2026-04-02',
            spatialCoverage: 'Metropolitan Area',
            distribution: {
              '@type': 'DataDownload',
              encodingFormat: 'JSON',
            },
            includedInDataCatalog: {
              '@type': 'DataCatalog',
              name: 'LeadEngine Market Data',
            },
          }),
        }}
      />

      {/* Hero Section */}
      <section style={styles.hero}>
        <h1 style={styles.heroTitle}>Real Estate Market Reports</h1>
        <p style={styles.heroSubtitle}>
          Stay informed with the latest market data, trends, and insights to make smarter real estate decisions
        </p>
        <button
          style={styles.ctaButton}
          onClick={() => document.getElementById('lead-capture')?.scrollIntoView({ behavior: 'smooth' })}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--le-primary-hover)')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--le-primary)')}
        >
          Get Your Free Report
        </button>
      </section>

      {/* Market Overview Dashboard */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Market Overview</h2>
        <div style={styles.metricsGrid}>
          {marketMetrics.map((metric, idx) => (
            <div key={idx} style={styles.metricCard}>
              <div style={styles.metricLabel}>{metric.label}</div>
              <div style={styles.metricValue}>{metric.value}</div>
              <div
                style={{
                  ...styles.metricChange,
                  color: metric.change > 0 ? 'var(--le-accent)' : metric.change < 0 ? '#e74c3c' : 'var(--le-text-secondary)',
                }}
              >
                {metric.change > 0 && <ArrowUpIcon />}
                {metric.change < 0 && <ArrowDownIcon />}
                {Math.abs(metric.change)}{metric.change !== 0 && '%'} {metric.unit}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Market Trend Charts */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Market Trends</h2>
        <div style={styles.trendContainer}>
          <div style={styles.trendControls}>
            <button
              style={{
                ...styles.trendButton,
                ...(trendMetric === 'price' ? styles.trendButtonActive : {}),
              }}
              onClick={() => setTrendMetric('price')}
            >
              Median Price Trend
            </button>
            <button
              style={{
                ...styles.trendButton,
                ...(trendMetric === 'volume' ? styles.trendButtonActive : {}),
              }}
              onClick={() => setTrendMetric('volume')}
            >
              Sales Volume Trend
            </button>
          </div>

          <div style={styles.chartContainer}>
            {trendData.map((data, idx) => (
              <div key={idx} style={styles.chartBar}>
                <div
                  style={{
                    ...styles.barVisual,
                    height: `${(((trendMetric === 'price' ? data.price : data.volume) / maxValue) * 100)}%`,
                  }}
                  title={trendMetric === 'price' ? `$${data.price.toLocaleString()}` : `${data.volume} sales`}
                />
                <div style={styles.barLabel}>{data.month}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Neighborhood Breakdown */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Neighborhood Breakdown</h2>
        <p style={{ color: 'var(--le-text-secondary)', marginBottom: '20px', fontSize: '14px' }}>
          Click any column header to sort
        </p>
        <div style={{ overflowX: 'auto' }}>
          <table style={styles.neighborhoodTable}>
            <thead>
              <tr style={styles.tableRow}>
                <th
                  style={{ ...styles.tableHeader, cursor: 'pointer' }}
                  onClick={() => handleSort('name')}
                >
                  Neighborhood {sortConfig.key === 'name' && <ChevronIcon direction={sortConfig.direction === 'desc' ? 'down' : 'up'} />}
                </th>
                <th
                  style={{ ...styles.tableHeader, cursor: 'pointer', textAlign: 'right' }}
                  onClick={() => handleSort('medianPrice')}
                >
                  Median Price {sortConfig.key === 'medianPrice' && <ChevronIcon direction={sortConfig.direction === 'desc' ? 'down' : 'up'} />}
                </th>
                <th
                  style={{ ...styles.tableHeader, cursor: 'pointer', textAlign: 'right' }}
                  onClick={() => handleSort('priceChange')}
                >
                  Price Change {sortConfig.key === 'priceChange' && <ChevronIcon direction={sortConfig.direction === 'desc' ? 'down' : 'up'} />}
                </th>
                <th
                  style={{ ...styles.tableHeader, cursor: 'pointer', textAlign: 'right' }}
                  onClick={() => handleSort('avgDOM')}
                >
                  Avg DOM {sortConfig.key === 'avgDOM' && <ChevronIcon direction={sortConfig.direction === 'desc' ? 'down' : 'up'} />}
                </th>
                <th
                  style={{ ...styles.tableHeader, cursor: 'pointer', textAlign: 'right' }}
                  onClick={() => handleSort('activeListing')}
                >
                  Active Listings {sortConfig.key === 'activeListing' && <ChevronIcon direction={sortConfig.direction === 'desc' ? 'down' : 'up'} />}
                </th>
                <th
                  style={{ ...styles.tableHeader, cursor: 'pointer', textAlign: 'right' }}
                  onClick={() => handleSort('soldLast30')}
                >
                  Sold (30d) {sortConfig.key === 'soldLast30' && <ChevronIcon direction={sortConfig.direction === 'desc' ? 'down' : 'up'} />}
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedNeighborhoods.map((neighborhood, idx) => (
                <tr key={idx} style={idx % 2 === 0 ? styles.tableRow : styles.tableRowAlt}>
                  <td style={styles.tableCell}>{neighborhood.name}</td>
                  <td style={{ ...styles.tableCell, textAlign: 'right' }}>${neighborhood.medianPrice.toLocaleString()}</td>
                  <td
                    style={{
                      ...styles.tableCell,
                      textAlign: 'right',
                      color: neighborhood.priceChange > 0 ? 'var(--le-accent)' : '#e74c3c',
                      fontWeight: 600,
                    }}
                  >
                    {neighborhood.priceChange > 0 && '+'}
                    {neighborhood.priceChange}%
                  </td>
                  <td style={{ ...styles.tableCell, textAlign: 'right' }}>{neighborhood.avgDOM} days</td>
                  <td style={{ ...styles.tableCell, textAlign: 'right' }}>{neighborhood.activeListing}</td>
                  <td style={{ ...styles.tableCell, textAlign: 'right' }}>{neighborhood.soldLast30}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Market Analysis Articles */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Market Insights & Analysis</h2>
        <div style={styles.articlesGrid}>
          {articles.map(article => (
            <div key={article.id} style={styles.articleCard}>
              <h3 style={styles.articleTitle}>{article.title}</h3>
              <div style={styles.articleMeta}>
                <span>{article.date}</span>
                <span>{article.readTime}</span>
              </div>
              {expandedArticle === article.id ? (
                <div style={styles.articleContent}>{article.content}</div>
              ) : (
                <p style={styles.articleExcerpt}>{article.excerpt}</p>
              )}
              <button
                style={styles.readMoreButton}
                onClick={() => setExpandedArticle(expandedArticle === article.id ? null : article.id)}
              >
                {expandedArticle === article.id ? 'Show Less' : 'Read More'}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Market Comparison Tool */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Neighborhood Comparison Tool</h2>
        <div style={styles.comparisonContainer}>
          <div style={styles.comparisonSelectors}>
            <div style={styles.selectWrapper}>
              <label style={styles.selectLabel}>Neighborhood 1</label>
              <select
                style={styles.select}
                value={selectedNeighborhoods[0] || ''}
                onChange={(e) => handleNeighborhoodSelect(e.target.value)}
              >
                <option value="">Select a neighborhood</option>
                {neighborhoodOptions.map(name => (
                  <option key={name} value={name} disabled={selectedNeighborhoods.includes(name) && selectedNeighborhoods[0] !== name}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
            <div style={styles.selectWrapper}>
              <label style={styles.selectLabel}>Neighborhood 2</label>
              <select
                style={styles.select}
                value={selectedNeighborhoods[1] || ''}
                onChange={(e) => handleNeighborhoodSelect(e.target.value)}
              >
                <option value="">Select a neighborhood</option>
                {neighborhoodOptions.map(name => (
                  <option key={name} value={name} disabled={selectedNeighborhoods.includes(name) && selectedNeighborhoods[1] !== name}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {selectedNeighborhoods.length === 2 && (
            <div>
              <table style={styles.comparisonTable}>
                <tbody>
                  <tr>
                    <td style={styles.comparisonLabelCell}>Metric</td>
                    <td style={styles.comparisonHeaderCell}>{selectedNeighborhoods[0]}</td>
                    <td style={styles.comparisonHeaderCell}>{selectedNeighborhoods[1]}</td>
                  </tr>
                  {[
                    {
                      label: 'Median Price',
                      key: 'medianPrice',
                      format: (v: number) => `$${v.toLocaleString()}`,
                    },
                    {
                      label: 'Price Change (YoY)',
                      key: 'priceChange',
                      format: (v: number) => `${v > 0 ? '+' : ''}${v}%`,
                    },
                    {
                      label: 'Avg Days on Market',
                      key: 'daysOnMarket',
                      format: (v: number) => `${v} days`,
                    },
                    {
                      label: 'Active Listings',
                      key: 'activeListing',
                      format: (v: number) => v.toString(),
                    },
                    {
                      label: 'Sold (Last 30 Days)',
                      key: 'soldLast30',
                      format: (v: number) => v.toString(),
                    },
                  ].map((metric, idx) => {
                    const val1 = comparisonData[selectedNeighborhoods[0]][metric.key as keyof ComparisonNeighborhood] as number;
                    const val2 = comparisonData[selectedNeighborhoods[1]][metric.key as keyof ComparisonNeighborhood] as number;
                    const winner = metric.key === 'daysOnMarket' || metric.key === 'activeListing'
                      ? val1 < val2 ? 0 : 1
                      : val1 > val2 ? 0 : 1;

                    return (
                      <tr key={idx}>
                        <td style={styles.comparisonLabelCell}>{metric.label}</td>
                        <td
                          style={{
                            ...styles.comparisonDataCell,
                            ...(winner === 0 ? styles.comparisonWinner : {}),
                          }}
                        >
                          {metric.format(val1)}
                          {winner === 0 && ' ✓'}
                        </td>
                        <td
                          style={{
                            ...styles.comparisonDataCell,
                            ...(winner === 1 ? styles.comparisonWinner : {}),
                          }}
                        >
                          {metric.format(val2)}
                          {winner === 1 && ' ✓'}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {selectedNeighborhoods.length < 2 && (
            <p style={{ textAlign: 'center', color: 'var(--le-text-secondary)', fontSize: '14px' }}>
              Select two neighborhoods to compare
            </p>
          )}
        </div>
      </section>

      {/* Lead Capture Section */}
      <section style={styles.section} id="lead-capture">
        <h2 style={styles.sectionTitle}>Get Your Personalized Market Report</h2>
        <form style={styles.leadForm} onSubmit={handleFormSubmit}>
          <div style={styles.formGroup}>
            <label style={styles.formLabel} htmlFor="name">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleFormChange}
              required
              style={styles.formInput}
              placeholder="John Doe"
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.formLabel} htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleFormChange}
              required
              style={styles.formInput}
              placeholder="john@example.com"
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.formLabel} htmlFor="neighborhood">
              Neighborhood of Interest
            </label>
            <select
              id="neighborhood"
              name="neighborhood"
              value={formData.neighborhood}
              onChange={handleFormChange}
              required
              style={styles.formInput}
            >
              <option value="">Select a neighborhood</option>
              {neighborhoodOptions.map(name => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.formLabel} htmlFor="propertyType">
              Property Type
            </label>
            <select
              id="propertyType"
              name="propertyType"
              value={formData.propertyType}
              onChange={handleFormChange}
              style={styles.formInput}
            >
              <option value="residential">Residential</option>
              <option value="commercial">Commercial</option>
              <option value="investment">Investment Property</option>
              <option value="multi-family">Multi-Family</option>
            </select>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.formLabel}>I want to:</label>
            <div style={styles.radioGroup}>
              {['Buy', 'Sell', 'Invest', 'Just researching'].map((option, idx) => (
                <label key={idx} style={styles.radioOption}>
                  <input
                    type="radio"
                    name="intent"
                    value={option.toLowerCase()}
                    checked={formData.intent === option.toLowerCase()}
                    onChange={handleFormChange}
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </div>

          <button type="submit" style={styles.submitButton}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--le-primary-hover)')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--le-primary)')}
          >
            Get My Free Report
          </button>

          {submitSuccess && (
            <div style={styles.successMessage}>
              Thank you! We'll send your personalized market report to your email shortly.
            </div>
          )}
        </form>
      </section>
    </div>
  );
};

export default MarketReportsPage;
