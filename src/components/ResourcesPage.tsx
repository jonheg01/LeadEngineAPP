'use client';

import React, { useState } from 'react';

interface Guide {
  id: string;
  title: string;
  description: string;
  pageCount: number;
  category: 'All' | 'Buyers' | 'Sellers' | 'First-Time Buyers' | 'Investors' | 'Tools';
}

interface Tool {
  id: string;
  name: string;
  description: string;
  icon: string;
}

interface Video {
  id: string;
  title: string;
  duration: string;
  category: string;
  thumbnail: string;
}

interface BlogArticle {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: number;
}

interface EmailCaptureState {
  name: string;
  email: string;
  type: 'Buyer' | 'Seller' | 'Investor';
  submitted: boolean;
}

const ResourcesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Buyers' | 'Sellers' | 'First-Time Buyers' | 'Investors' | 'Tools'>('All');
  const [activeCalculatorTab, setActiveCalculatorTab] = useState<'affordability' | 'closing' | 'rentVsBuy'>('affordability');
  const [emailCapture, setEmailCapture] = useState<EmailCaptureState>({
    name: '',
    email: '',
    type: 'Buyer',
    submitted: false,
  });
  const [calculatorValues, setCalculatorValues] = useState({
    affordability: { income: '', debts: '', rate: 6.5 },
    closing: { purchasePrice: '' },
    rentVsBuy: { monthlyRent: '', monthlyMortgage: '' },
  });
  const [showGateModal, setShowGateModal] = useState<{ show: boolean; guideId?: string }>({ show: false });

  const guides: Guide[] = [
    {
      id: 'ftb-checklist',
      title: 'First-Time Buyer Checklist',
      description: 'Your essential checklist covering credit scores, pre-approval, down payment savings, and closing day preparation. Everything you need before making your first offer.',
      pageCount: 12,
      category: 'First-Time Buyers',
    },
    {
      id: 'selling-prep',
      title: 'Home Selling Preparation Guide',
      description: 'Master the art of selling. Detailed steps on decluttering, staging, pricing strategy, and marketing your home to attract serious buyers.',
      pageCount: 16,
      category: 'Sellers',
    },
    {
      id: 'investment-framework',
      title: 'Investment Property Analysis Framework',
      description: 'Professional analysis tools for evaluating investment properties. Learn to calculate cap rates, cash flow projections, and identify undervalued opportunities.',
      pageCount: 20,
      category: 'Investors',
    },
    {
      id: 'moving-checklist',
      title: 'Moving Day Checklist',
      description: 'Comprehensive moving timeline and checklist. Utilities, address changes, forwarding mail, settling into your new home—we\u2019ve got you covered.',
      pageCount: 8,
      category: 'Buyers',
    },
    {
      id: 'maintenance-calendar',
      title: 'Home Maintenance Calendar',
      description: 'Month-by-month home maintenance schedule. Stay on top of seasonal tasks, HVAC service, inspections, and preventive maintenance to protect your investment.',
      pageCount: 10,
      category: 'Buyers',
    },
    {
      id: 'mortgage-preapproval',
      title: 'Mortgage Pre-Approval Guide',
      description: 'Step-by-step walkthrough of the mortgage pre-approval process. Documentation checklist, timeline expectations, and how to strengthen your application.',
      pageCount: 14,
      category: 'Buyers',
    },
  ];

  const videos: Video[] = [
    {
      id: 'video-1',
      title: 'Home Buying 101: From Offer to Closing',
      duration: '12:45',
      category: 'Buying',
      thumbnail: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    },
    {
      id: 'video-2',
      title: 'Staging Tips That Sell: Professional Techniques on a Budget',
      duration: '8:30',
      category: 'Selling',
      thumbnail: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    },
    {
      id: 'video-3',
      title: 'Understanding Home Inspections: What to Expect',
      duration: '10:15',
      category: 'Buying',
      thumbnail: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    },
    {
      id: 'video-4',
      title: 'Real Estate Investment Fundamentals',
      duration: '15:20',
      category: 'Investing',
      thumbnail: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    },
    {
      id: 'video-5',
      title: 'Negotiating Like a Pro: Seller\u2019s Edition',
      duration: '11:10',
      category: 'Selling',
      thumbnail: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    },
    {
      id: 'video-6',
      title: 'Market Trends: Reading Data for Investment Decisions',
      duration: '13:40',
      category: 'Investing',
      thumbnail: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
    },
  ];

  const articles: BlogArticle[] = [
    {
      id: 'article-1',
      title: '2026 Real Estate Market Outlook: What\u2019s Ahead for Buyers and Sellers',
      excerpt: 'Interest rates, inventory trends, and economic indicators point to significant shifts in the 2026 market. Here\u2019s what you need to know.',
      date: 'Apr 1, 2026',
      category: 'Market Updates',
      readTime: 7,
    },
    {
      id: 'article-2',
      title: 'The Hidden Costs of Home Buying: Budget Beyond Down Payment',
      excerpt: 'Closing costs, inspections, appraisals, and insurance—understand all expenses before you commit to a purchase.',
      date: 'Mar 28, 2026',
      category: 'Buying Tips',
      readTime: 6,
    },
    {
      id: 'article-3',
      title: 'Maximizing Home Sale Price: Staging Strategies That Work',
      excerpt: 'Professional staging doesn\u2019t require expensive renovations. Learn psychological tricks that attract buyers and increase offers.',
      date: 'Mar 25, 2026',
      category: 'Selling Tips',
      readTime: 5,
    },
    {
      id: 'article-4',
      title: 'Building Wealth Through Real Estate: Multi-Unit Investment Secrets',
      excerpt: 'Scale your portfolio with multi-family properties. Learn financing strategies, tenant management, and maximizing cash flow.',
      date: 'Mar 22, 2026',
      category: 'Investment',
      readTime: 9,
    },
  ];

  const filteredGuides = guides.filter((guide) => {
    const matchesCategory = selectedCategory === 'All' || guide.category === selectedCategory;
    const matchesSearch = guide.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guide.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleGateSubmit = () => {
    if (emailCapture.name && emailCapture.email) {
      setShowGateModal({ show: false });
      alert(`Thank you! Your ${showGateModal.guideId} guide will be sent to ${emailCapture.email}`);
    }
  };

  const handleEmailCaptureSubmit = () => {
    if (emailCapture.name && emailCapture.email) {
      setEmailCapture({ ...emailCapture, submitted: true });
      setTimeout(() => {
        setEmailCapture({ name: '', email: '', type: 'Buyer', submitted: false });
      }, 3000);
    }
  };

  const calculateAffordability = () => {
    const income = parseFloat(calculatorValues.affordability.income) || 0;
    const debts = parseFloat(calculatorValues.affordability.debts) || 0;
    const rate = calculatorValues.affordability.rate || 6.5;

    if (income === 0) return null;

    const monthlyIncome = income / 12;
    const monthlyDebts = debts / 12;
    const availableForMortgage = monthlyIncome * 0.28 - monthlyDebts;

    // Simplified calculation: max home price based on affordable monthly payment
    const monthlyRate = rate / 100 / 12;
    const numPayments = 360; // 30 years
    const maxPayment = Math.max(availableForMortgage, 0);
    const maxPrice = (maxPayment * ((1 + monthlyRate) ** numPayments - 1)) / (monthlyRate * (1 + monthlyRate) ** numPayments);

    return maxPrice;
  };

  const calculateClosingCosts = () => {
    const purchasePrice = parseFloat(calculatorValues.closing.purchasePrice) || 0;
    if (purchasePrice === 0) return null;

    return {
      title: purchasePrice * 0.01,
      appraisal: 500,
      inspection: 400,
      credit: 50,
      origination: purchasePrice * 0.01,
      insurance: purchasePrice * 0.003,
      taxesAndRecording: purchasePrice * 0.005,
      totalEstimate: purchasePrice * 0.02 + 950 + purchasePrice * 0.003 + purchasePrice * 0.005,
    };
  };

  const affordabilityResult = calculateAffordability();
  const closingCosts = calculateClosingCosts();

  // Inline SVG Icons
  const DownloadIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );

  const SearchIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );

  const PlayIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  );

  const CalendarIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );

  const CheckIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );

  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: 'var(--le-bg)',
      color: 'var(--le-text)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    },
    heroSection: {
      padding: '60px 20px',
      textAlign: 'center' as const,
      borderBottom: '1px solid var(--le-border)',
    },
    heroTitle: {
      fontSize: 'clamp(32px, 5vw, 48px)',
      fontWeight: 700,
      marginBottom: '16px',
      margin: '0 0 16px 0',
    },
    heroSubtitle: {
      fontSize: '18px',
      color: 'var(--le-text-secondary)',
      maxWidth: '600px',
      margin: '0 auto 32px',
    },
    searchContainer: {
      maxWidth: '500px',
      margin: '0 auto',
      position: 'relative' as const,
    },
    searchInput: {
      width: '100%',
      padding: '12px 40px 12px 16px',
      borderRadius: '8px',
      border: '1px solid var(--le-border)',
      backgroundColor: 'var(--le-surface)',
      color: 'var(--le-text)',
      fontSize: '16px',
    },
    searchIcon: {
      position: 'absolute' as const,
      right: '12px',
      top: '50%',
      transform: 'translateY(-50%)',
      color: 'var(--le-text-secondary)',
    },
    categoryNav: {
      display: 'flex',
      gap: '8px',
      overflowX: 'auto' as const,
      padding: '20px',
      justifyContent: 'center',
      borderBottom: '1px solid var(--le-border)',
      flexWrap: 'wrap' as const,
    },
    categoryPill: (isActive: boolean) => ({
      padding: '8px 16px',
      borderRadius: '24px',
      border: 'none',
      cursor: 'pointer',
      backgroundColor: isActive ? 'var(--le-primary)' : 'var(--le-surface)',
      color: isActive ? '#fff' : 'var(--le-text)',
      fontSize: '14px',
      fontWeight: 500,
      transition: 'all 0.3s ease',
    }),
    section: {
      padding: '60px 20px',
      borderBottom: '1px solid var(--le-border)',
    },
    sectionTitle: {
      fontSize: '28px',
      fontWeight: 700,
      marginBottom: '8px',
      margin: '0 0 8px 0',
    },
    sectionDescription: {
      color: 'var(--le-text-secondary)',
      marginBottom: '32px',
      margin: '0 0 32px 0',
    },
    guidesGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '24px',
      maxWidth: '1200px',
      margin: '0 auto',
    },
    guideCard: {
      padding: '24px',
      backgroundColor: 'var(--le-surface)',
      borderRadius: '12px',
      border: '1px solid var(--le-border)',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
    },
    guideTitle: {
      fontSize: '18px',
      fontWeight: 600,
      marginBottom: '12px',
      margin: '0 0 12px 0',
    },
    guideDescription: {
      color: 'var(--le-text-secondary)',
      marginBottom: '16px',
      fontSize: '14px',
      lineHeight: 1.6,
      margin: '0 0 16px 0',
    },
    guideMeta: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '16px',
      fontSize: '13px',
      color: 'var(--le-text-secondary)',
    },
    downloadBtn: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '8px 16px',
      backgroundColor: 'var(--le-primary)',
      color: '#fff',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: 500,
    },
    toolsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
      gap: '24px',
      maxWidth: '1200px',
      margin: '0 auto',
    },
    toolCard: {
      padding: '24px',
      backgroundColor: 'var(--le-surface)',
      borderRadius: '12px',
      border: '1px solid var(--le-border)',
    },
    toolTabs: {
      display: 'flex',
      gap: '12px',
      marginBottom: '32px',
      borderBottom: '1px solid var(--le-border)',
      flexWrap: 'wrap' as const,
    },
    toolTab: (isActive: boolean) => ({
      padding: '12px 0',
      borderBottom: isActive ? '2px solid var(--le-primary)' : 'none',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: 500,
      color: isActive ? 'var(--le-primary)' : 'var(--le-text-secondary)',
    }),
    calculatorContent: {
      backgroundColor: 'var(--le-surface)',
      padding: '24px',
      borderRadius: '12px',
      marginBottom: '24px',
    },
    calculatorInput: {
      marginBottom: '16px',
    },
    calculatorLabel: {
      display: 'block',
      fontSize: '14px',
      fontWeight: 500,
      marginBottom: '6px',
      color: 'var(--le-text)',
    },
    input: {
      width: '100%',
      padding: '10px',
      borderRadius: '6px',
      border: '1px solid var(--le-border)',
      backgroundColor: 'var(--le-bg)',
      color: 'var(--le-text)',
      fontSize: '14px',
      boxSizing: 'border-box' as const,
    },
    resultBox: {
      backgroundColor: 'var(--le-primary)',
      color: '#fff',
      padding: '20px',
      borderRadius: '12px',
      marginTop: '16px',
    },
    resultTitle: {
      fontSize: '14px',
      color: 'rgba(255, 255, 255, 0.8)',
      marginBottom: '8px',
    },
    resultValue: {
      fontSize: '32px',
      fontWeight: 700,
      margin: '0',
    },
    videosGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      gap: '24px',
      maxWidth: '1200px',
      margin: '0 auto',
    },
    videoCard: {
      borderRadius: '12px',
      overflow: 'hidden',
      border: '1px solid var(--le-border)',
      cursor: 'pointer',
      transition: 'transform 0.3s ease',
    },
    videoThumbnail: {
      height: '160px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative' as const,
      color: '#fff',
    },
    playButton: {
      width: '60px',
      height: '60px',
      borderRadius: '50%',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--le-primary)',
    },
    videoInfo: {
      padding: '16px',
      backgroundColor: 'var(--le-surface)',
    },
    videoTitle: {
      fontSize: '16px',
      fontWeight: 600,
      marginBottom: '8px',
      margin: '0 0 8px 0',
    },
    videoMeta: {
      display: 'flex',
      gap: '12px',
      fontSize: '13px',
      color: 'var(--le-text-secondary)',
    },
    articlesGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      gap: '24px',
      maxWidth: '1200px',
      margin: '0 auto',
    },
    articleCard: {
      padding: '20px',
      backgroundColor: 'var(--le-surface)',
      borderRadius: '12px',
      border: '1px solid var(--le-border)',
    },
    articleTitle: {
      fontSize: '16px',
      fontWeight: 600,
      marginBottom: '12px',
      margin: '0 0 12px 0',
      lineHeight: 1.4,
    },
    articleExcerpt: {
      color: 'var(--le-text-secondary)',
      fontSize: '14px',
      marginBottom: '16px',
      lineHeight: 1.6,
    },
    articleMeta: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontSize: '13px',
      color: 'var(--le-text-secondary)',
      paddingTop: '12px',
      borderTop: '1px solid var(--le-border)',
    },
    captureSection: {
      backgroundColor: 'var(--le-surface)',
      borderRadius: '12px',
      padding: '40px',
      maxWidth: '500px',
      margin: '0 auto',
    },
    captureTitle: {
      fontSize: '24px',
      fontWeight: 700,
      marginBottom: '12px',
      margin: '0 0 12px 0',
      textAlign: 'center' as const,
    },
    captureSubtitle: {
      color: 'var(--le-text-secondary)',
      marginBottom: '24px',
      textAlign: 'center' as const,
      fontSize: '14px',
      margin: '0 0 24px 0',
    },
    formGroup: {
      marginBottom: '16px',
    },
    formLabel: {
      display: 'block',
      fontSize: '14px',
      fontWeight: 500,
      marginBottom: '6px',
    },
    select: {
      width: '100%',
      padding: '10px',
      borderRadius: '6px',
      border: '1px solid var(--le-border)',
      backgroundColor: 'var(--le-bg)',
      color: 'var(--le-text)',
      fontSize: '14px',
      boxSizing: 'border-box' as const,
    },
    submitBtn: {
      width: '100%',
      padding: '12px',
      backgroundColor: 'var(--le-primary)',
      color: '#fff',
      border: 'none',
      borderRadius: '6px',
      fontSize: '16px',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    },
    successMessage: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '12px 16px',
      backgroundColor: '#10b981',
      color: '#fff',
      borderRadius: '6px',
      marginBottom: '16px',
    },
    modal: {
      position: 'fixed' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
    },
    modalContent: {
      backgroundColor: 'var(--le-bg)',
      padding: '32px',
      borderRadius: '12px',
      maxWidth: '450px',
      width: '90%',
    },
    closeBtn: {
      float: 'right' as const,
      background: 'none',
      border: 'none',
      fontSize: '24px',
      cursor: 'pointer',
      color: 'var(--le-text-secondary)',
    },
  };

  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <section style={styles.heroSection}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={styles.heroTitle}>Real Estate Resources</h1>
          <p style={styles.heroSubtitle}>Free tools, guides, and expert insights to help buyers, sellers, and investors make confident decisions.</p>

          <div style={styles.searchContainer}>
            <input
              type="text"
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={styles.searchInput}
            />
            <div style={styles.searchIcon}>
              <SearchIcon />
            </div>
          </div>
        </div>
      </section>

      {/* Category Navigation */}
      <div style={styles.categoryNav}>
        {['All', 'Buyers', 'Sellers', 'First-Time Buyers', 'Investors', 'Tools'].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat as any)}
            style={styles.categoryPill(selectedCategory === cat)}
            onMouseOver={(e) => {
              if (selectedCategory !== cat) {
                (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--le-border)';
              }
            }}
            onMouseOut={(e) => {
              if (selectedCategory !== cat) {
                (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--le-surface)';
              }
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Downloadable Guides Section */}
      <section style={styles.section}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={styles.sectionTitle}>Downloadable Guides</h2>
          <p style={styles.sectionDescription}>Free, comprehensive guides packed with actionable advice for every stage of your real estate journey.</p>

          {filteredGuides.length === 0 ? (
            <p style={{ textAlign: 'center', color: 'var(--le-text-secondary)' }}>No guides match your search.</p>
          ) : (
            <div style={styles.guidesGrid}>
              {filteredGuides.map((guide) => (
                <div
                  key={guide.id}
                  style={styles.guideCard}
                  onMouseOver={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.1)';
                  }}
                  onMouseOut={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                    (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                  }}
                >
                  <h3 style={styles.guideTitle}>{guide.title}</h3>
                  <p style={styles.guideDescription}>{guide.description}</p>
                  <div style={styles.guideMeta}>
                    <span>{guide.pageCount} pages</span>
                  </div>
                  <button
                    onClick={() => setShowGateModal({ show: true, guideId: guide.id })}
                    style={styles.downloadBtn}
                    onMouseOver={(e) => {
                      (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--le-primary-hover)';
                    }}
                    onMouseOut={(e) => {
                      (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--le-primary)';
                    }}
                  >
                    <DownloadIcon />
                    Download Guide
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Interactive Tools Section */}
      <section style={styles.section}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={styles.sectionTitle}>Interactive Tools</h2>
          <p style={styles.sectionDescription}>Use these powerful calculators to make informed real estate decisions.</p>

          <div style={styles.toolTabs}>
            <div
              onClick={() => setActiveCalculatorTab('affordability')}
              style={styles.toolTab(activeCalculatorTab === 'affordability')}
            >
              Affordability Calculator
            </div>
            <div
              onClick={() => setActiveCalculatorTab('closing')}
              style={styles.toolTab(activeCalculatorTab === 'closing')}
            >
              Closing Cost Estimator
            </div>
            <div
              onClick={() => setActiveCalculatorTab('rentVsBuy')}
              style={styles.toolTab(activeCalculatorTab === 'rentVsBuy')}
            >
              Rent vs Buy
            </div>
          </div>

          {/* Affordability Calculator */}
          {activeCalculatorTab === 'affordability' && (
            <div style={styles.calculatorContent}>
              <h3 style={{ marginBottom: '24px', margin: '0 0 24px 0' }}>How Much Can You Afford?</h3>

              <div style={styles.calculatorInput}>
                <label style={styles.calculatorLabel}>Annual Gross Income ($)</label>
                <input
                  type="number"
                  value={calculatorValues.affordability.income}
                  onChange={(e) =>
                    setCalculatorValues({
                      ...calculatorValues,
                      affordability: { ...calculatorValues.affordability, income: e.target.value },
                    })
                  }
                  placeholder="100000"
                  style={styles.input}
                />
              </div>

              <div style={styles.calculatorInput}>
                <label style={styles.calculatorLabel}>Monthly Debt Payments ($)</label>
                <input
                  type="number"
                  value={calculatorValues.affordability.debts}
                  onChange={(e) =>
                    setCalculatorValues({
                      ...calculatorValues,
                      affordability: { ...calculatorValues.affordability, debts: e.target.value },
                    })
                  }
                  placeholder="500"
                  style={styles.input}
                />
              </div>

              <div style={styles.calculatorInput}>
                <label style={styles.calculatorLabel}>Interest Rate (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={calculatorValues.affordability.rate}
                  onChange={(e) =>
                    setCalculatorValues({
                      ...calculatorValues,
                      affordability: { ...calculatorValues.affordability, rate: parseFloat(e.target.value) },
                    })
                  }
                  style={styles.input}
                />
              </div>

              {affordabilityResult !== null && (
                <div style={styles.resultBox}>
                  <div style={styles.resultTitle}>Maximum Home Price</div>
                  <p style={styles.resultValue}>
                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(affordabilityResult)}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Closing Cost Estimator */}
          {activeCalculatorTab === 'closing' && (
            <div style={styles.calculatorContent}>
              <h3 style={{ marginBottom: '24px', margin: '0 0 24px 0' }}>Estimate Your Closing Costs</h3>

              <div style={styles.calculatorInput}>
                <label style={styles.calculatorLabel}>Purchase Price ($)</label>
                <input
                  type="number"
                  value={calculatorValues.closing.purchasePrice}
                  onChange={(e) =>
                    setCalculatorValues({
                      ...calculatorValues,
                      closing: { purchasePrice: e.target.value },
                    })
                  }
                  placeholder="350000"
                  style={styles.input}
                />
              </div>

              {closingCosts && (
                <div style={{ marginTop: '24px' }}>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '12px',
                      marginBottom: '16px',
                    }}
                  >
                    <div style={{ padding: '12px', backgroundColor: 'var(--le-bg)', borderRadius: '8px' }}>
                      <div style={{ fontSize: '13px', color: 'var(--le-text-secondary)' }}>Title Insurance</div>
                      <div style={{ fontSize: '16px', fontWeight: 600 }}>
                        {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(closingCosts.title)}
                      </div>
                    </div>
                    <div style={{ padding: '12px', backgroundColor: 'var(--le-bg)', borderRadius: '8px' }}>
                      <div style={{ fontSize: '13px', color: 'var(--le-text-secondary)' }}>Appraisal Fee</div>
                      <div style={{ fontSize: '16px', fontWeight: 600 }}>
                        {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(closingCosts.appraisal)}
                      </div>
                    </div>
                    <div style={{ padding: '12px', backgroundColor: 'var(--le-bg)', borderRadius: '8px' }}>
                      <div style={{ fontSize: '13px', color: 'var(--le-text-secondary)' }}>Inspection Fee</div>
                      <div style={{ fontSize: '16px', fontWeight: 600 }}>
                        {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(closingCosts.inspection)}
                      </div>
                    </div>
                    <div style={{ padding: '12px', backgroundColor: 'var(--le-bg)', borderRadius: '8px' }}>
                      <div style={{ fontSize: '13px', color: 'var(--le-text-secondary)' }}>Credit Report</div>
                      <div style={{ fontSize: '16px', fontWeight: 600 }}>
                        {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(closingCosts.credit)}
                      </div>
                    </div>
                    <div style={{ padding: '12px', backgroundColor: 'var(--le-bg)', borderRadius: '8px' }}>
                      <div style={{ fontSize: '13px', color: 'var(--le-text-secondary)' }}>Origination Fee</div>
                      <div style={{ fontSize: '16px', fontWeight: 600 }}>
                        {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(closingCosts.origination)}
                      </div>
                    </div>
                    <div style={{ padding: '12px', backgroundColor: 'var(--le-bg)', borderRadius: '8px' }}>
                      <div style={{ fontSize: '13px', color: 'var(--le-text-secondary)' }}>Home Insurance</div>
                      <div style={{ fontSize: '16px', fontWeight: 600 }}>
                        {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(closingCosts.insurance)}
                      </div>
                    </div>
                  </div>

                  <div style={styles.resultBox}>
                    <div style={styles.resultTitle}>Estimated Total Closing Costs</div>
                    <p style={styles.resultValue}>
                      {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(closingCosts.totalEstimate)}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Rent vs Buy */}
          {activeCalculatorTab === 'rentVsBuy' && (
            <div style={styles.calculatorContent}>
              <h3 style={{ marginBottom: '24px', margin: '0 0 24px 0' }}>Rent vs Buy Comparison</h3>

              <div style={styles.calculatorInput}>
                <label style={styles.calculatorLabel}>Monthly Rent ($)</label>
                <input
                  type="number"
                  value={calculatorValues.rentVsBuy.monthlyRent}
                  onChange={(e) =>
                    setCalculatorValues({
                      ...calculatorValues,
                      rentVsBuy: { ...calculatorValues.rentVsBuy, monthlyRent: e.target.value },
                    })
                  }
                  placeholder="2000"
                  style={styles.input}
                />
              </div>

              <div style={styles.calculatorInput}>
                <label style={styles.calculatorLabel}>Monthly Mortgage Payment ($)</label>
                <input
                  type="number"
                  value={calculatorValues.rentVsBuy.monthlyMortgage}
                  onChange={(e) =>
                    setCalculatorValues({
                      ...calculatorValues,
                      rentVsBuy: { ...calculatorValues.rentVsBuy, monthlyMortgage: e.target.value },
                    })
                  }
                  placeholder="2500"
                  style={styles.input}
                />
              </div>

              {calculatorValues.rentVsBuy.monthlyRent && calculatorValues.rentVsBuy.monthlyMortgage && (
                <div style={{ marginTop: '24px' }}>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '16px',
                    }}
                  >
                    <div style={{ padding: '16px', backgroundColor: 'var(--le-bg)', borderRadius: '8px', textAlign: 'center' as const }}>
                      <div style={{ fontSize: '14px', color: 'var(--le-text-secondary)' }}>Renting</div>
                      <div style={{ fontSize: '28px', fontWeight: 700 }}>
                        {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
                          parseFloat(calculatorValues.rentVsBuy.monthlyRent || '0')
                        )}
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--le-text-secondary)', marginTop: '8px' }}>per month</div>
                    </div>

                    <div style={{ padding: '16px', backgroundColor: 'var(--le-bg)', borderRadius: '8px', textAlign: 'center' as const }}>
                      <div style={{ fontSize: '14px', color: 'var(--le-text-secondary)' }}>Buying</div>
                      <div style={{ fontSize: '28px', fontWeight: 700 }}>
                        {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
                          parseFloat(calculatorValues.rentVsBuy.monthlyMortgage || '0')
                        )}
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--le-text-secondary)', marginTop: '8px' }}>per month</div>
                    </div>
                  </div>

                  <div
                    style={{
                      marginTop: '16px',
                      padding: '16px',
                      backgroundColor: parseFloat(calculatorValues.rentVsBuy.monthlyMortgage || '0') < parseFloat(calculatorValues.rentVsBuy.monthlyRent || '0')
                        ? '#d1fae5'
                        : '#fee2e2',
                      borderRadius: '8px',
                      textAlign: 'center' as const,
                    }}
                  >
                    <strong>
                      {parseFloat(calculatorValues.rentVsBuy.monthlyMortgage || '0') < parseFloat(calculatorValues.rentVsBuy.monthlyRent || '0')
                        ? 'Buying is more affordable!'
                        : 'Renting is more affordable!'}
                    </strong>
                    <div style={{ fontSize: '13px', marginTop: '8px', color: 'var(--le-text-secondary)' }}>
                      Monthly difference:{' '}
                      {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
                        Math.abs(
                          parseFloat(calculatorValues.rentVsBuy.monthlyMortgage || '0') - parseFloat(calculatorValues.rentVsBuy.monthlyRent || '0')
                        )
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Video Library Section */}
      <section style={styles.section}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={styles.sectionTitle}>Video Library</h2>
          <p style={styles.sectionDescription}>Short, expert videos on key real estate topics. Learn at your pace from industry professionals.</p>

          <div style={styles.videosGrid}>
            {videos.map((video) => (
              <div key={video.id} style={styles.videoCard}>
                <div
                  style={{
                    ...styles.videoThumbnail,
                    background: video.thumbnail,
                  }}
                >
                  <div style={styles.playButton}>
                    <PlayIcon />
                  </div>
                </div>
                <div style={styles.videoInfo}>
                  <h3 style={styles.videoTitle}>{video.title}</h3>
                  <div style={styles.videoMeta}>
                    <span>{video.duration}</span>
                    <span>{video.category}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Highlights Section */}
      <section style={styles.section}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={styles.sectionTitle}>Blog Highlights</h2>
          <p style={styles.sectionDescription}>Stay informed with expert insights on market trends, buying strategies, and real estate investing.</p>

          <div style={styles.articlesGrid}>
            {articles.map((article) => (
              <div key={article.id} style={styles.articleCard}>
                <h3 style={styles.articleTitle}>{article.title}</h3>
                <p style={styles.articleExcerpt}>{article.excerpt}</p>
                <div style={styles.articleMeta}>
                  <span>{article.date}</span>
                  <span>{article.readTime} min read</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Capture Section */}
      <section style={styles.section}>
        <div style={styles.captureSection}>
          {emailCapture.submitted ? (
            <div style={styles.successMessage}>
              <CheckIcon />
              <span>Success! Check your email for your Starter Kit.</span>
            </div>
          ) : (
            <>
              <h2 style={styles.captureTitle}>Get Your Free Starter Kit</h2>
              <p style={styles.captureSubtitle}>Market insights, checklists, and calculators tailored to your real estate goals.</p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleEmailCaptureSubmit();
                }}
              >
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Name</label>
                  <input
                    type="text"
                    value={emailCapture.name}
                    onChange={(e) => setEmailCapture({ ...emailCapture, name: e.target.value })}
                    placeholder="Your name"
                    style={styles.input}
                    required
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Email</label>
                  <input
                    type="email"
                    value={emailCapture.email}
                    onChange={(e) => setEmailCapture({ ...emailCapture, email: e.target.value })}
                    placeholder="your@email.com"
                    style={styles.input}
                    required
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>I am a...</label>
                  <select
                    value={emailCapture.type}
                    onChange={(e) => setEmailCapture({ ...emailCapture, type: e.target.value as any })}
                    style={styles.select}
                  >
                    <option value="Buyer">Buyer</option>
                    <option value="Seller">Seller</option>
                    <option value="Investor">Investor</option>
                  </select>
                </div>

                <button type="submit" style={styles.submitBtn}>
                  Get My Free Starter Kit
                </button>
              </form>
            </>
          )}
        </div>
      </section>

      {/* Download Gate Modal */}
      {showGateModal.show && (
        <div style={styles.modal} onClick={() => setShowGateModal({ show: false })}>
          <div
            style={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button style={styles.closeBtn} onClick={() => setShowGateModal({ show: false })}>
              ×
            </button>

            <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '12px', margin: '0 0 12px 0' }}>Download Guide</h3>
            <p style={{ color: 'var(--le-text-secondary)', marginBottom: '24px', margin: '0 0 24px 0' }}>
              Enter your details to access this guide.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleGateSubmit();
              }}
            >
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Name</label>
                <input
                  type="text"
                  value={emailCapture.name}
                  onChange={(e) => setEmailCapture({ ...emailCapture, name: e.target.value })}
                  placeholder="Your name"
                  style={styles.input}
                  required
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Email</label>
                <input
                  type="email"
                  value={emailCapture.email}
                  onChange={(e) => setEmailCapture({ ...emailCapture, email: e.target.value })}
                  placeholder="your@email.com"
                  style={styles.input}
                  required
                />
              </div>

              <button type="submit" style={styles.submitBtn}>
                Download Now
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResourcesPage;
