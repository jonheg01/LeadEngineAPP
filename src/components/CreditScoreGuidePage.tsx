'use client';

import React, { useState } from 'react';

export default function CreditScoreGuidePage() {
  const [creditScore, setCreditScore] = useState(720);
  const [loanAmount, setLoanAmount] = useState(300000);
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedMistake, setExpandedMistake] = useState<number | null>(null);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const creditRanges = [
    {
      range: '300\u2013579',
      name: 'Poor',
      impact: 'Mortgage approval difficult; if approved, significantly higher rates (often 2\u20133% higher)',
      color: '#ef4444',
    },
    {
      range: '580\u2013669',
      name: 'Fair',
      impact: 'FHA approval possible; conventional approval unlikely without compensating factors; higher rates (1\u20132% higher)',
      color: '#f97316',
    },
    {
      range: '670\u2013739',
      name: 'Good',
      impact: 'Conventional approval likely; competitive rates available; stronger loan options',
      color: '#eab308',
    },
    {
      range: '740\u2013799',
      name: 'Very Good',
      impact: 'Excellent approval odds; favorable rates; best conventional terms; favorable FHA rates',
      color: '#3b82f6',
    },
    {
      range: '800\u2013850',
      name: 'Excellent',
      impact: 'Guaranteed approval; lowest available rates; best terms on all loan types; maximum negotiating power',
      color: '#10b981',
    },
  ];

  const creditFactors = [
    { name: 'Payment History', percentage: 35, description: 'On-time payments on all accounts' },
    { name: 'Credit Utilization', percentage: 30, description: 'Percentage of available credit used' },
    { name: 'Length of Credit', percentage: 15, description: 'Age of your oldest and average accounts' },
    { name: 'New Credit', percentage: 10, description: 'Recent credit inquiries and new accounts' },
    { name: 'Credit Mix', percentage: 10, description: 'Variety of credit types (cards, loans, etc.)' },
  ];

  const loanTypes = [
    {
      type: 'Conventional',
      minScore: 620,
      recommended: 740,
      rateImpact: 'Prime rates available at 740+',
      details: 'Not backed by government; stricter requirements; best rates for strong credit',
    },
    {
      type: 'FHA',
      minScore: 580,
      recommended: 680,
      rateImpact: '0.5\u20131% higher rates than conventional at same score',
      details: 'Government-backed; lower down payment; smaller credit minimums',
    },
    {
      type: 'VA',
      minScore: 620,
      recommended: 720,
      rateImpact: 'Comparable to conventional; benefits apply regardless of score',
      details: 'For veterans; no down payment requirement; competitive rates',
    },
    {
      type: 'USDA',
      minScore: 640,
      recommended: 720,
      rateImpact: 'Slightly higher than conventional; offset by zero down payment',
      details: 'Rural properties; income limits apply; competitive rates for eligible buyers',
    },
    {
      type: 'Jumbo',
      minScore: 700,
      recommended: 760,
      rateImpact: '0.5\u20131.5% higher than conventional at same score',
      details: 'Loans exceeding conforming limits; stricter credit requirements; larger down payments',
    },
  ];

  const improvementPlan = [
    {
      day: 1,
      action: 'Check your credit report',
      details: 'Visit AnnualCreditReport.com and download all three bureau reports (Equifax, Experian, TransUnion)',
    },
    {
      day: 2,
      action: 'Dispute errors',
      details: 'Identify any inaccuracies and file disputes with the bureaus. Errors fall off after 30 days of investigation.',
    },
    {
      day: 3,
      action: 'Set up payment reminders',
      details: 'Enable automatic payments or calendar reminders for all bills. Missing payments devastates credit.',
    },
    {
      day: 4,
      action: 'Create a payoff strategy',
      details: 'Focus on paying down highest utilization accounts first. Target getting utilization below 30%.',
    },
    {
      day: 5,
      action: 'Request credit limit increases',
      details: 'Contact card issuers and request higher limits (no hard inquiry). This lowers utilization ratio.',
    },
    {
      day: 6,
      action: 'Stop applying for credit',
      details: 'Each inquiry lowers score by 5\u201310 points. Wait until after closing to apply for new credit.',
    },
    {
      day: 7,
      action: 'Review authorized user accounts',
      details: 'Ask to be added to accounts with positive history. This can boost score 10\u201340 points if account is old.',
    },
    {
      day: 8,
      action: 'Check credit monitoring service',
      details: 'Enroll in free monitoring (Credit Karma, AnnualCreditReport) to track improvements weekly.',
    },
    {
      day: 9,
      action: 'Assess credit mix',
      details: 'If you lack diverse credit (cards, installment loans), consider this after pre-approval but before closing.',
    },
    {
      day: 10,
      action: 'Create accountability system',
      details: 'Share goals with your lender. Many offer credit coaching. Schedule check-ins to monitor progress.',
    },
    {
      day: 11,
      action: 'Pay more than minimums',
      details: 'Extra payments dramatically reduce utilization and interest. Every dollar paid helps your score and wallet.',
    },
    {
      day: 12,
      action: 'Don\u2019t close old accounts',
      details: 'Closing accounts lowers credit mix and removes payment history. Keep old accounts open even after paying off.',
    },
    {
      day: 13,
      action: 'Negotiate with creditors',
      details: 'For negative items, request \u201cpay-for-delete\u201d or ask for goodwill removal if mostly positive history.',
    },
    {
      day: 14,
      action: 'Review secured credit options',
      details: 'Secured cards require deposits but help build credit. Use if credit history is very limited or damaged.',
    },
    {
      day: 15,
      action: 'Track monthly progress',
      details: 'Monitor score weekly on free services. Most improvements appear within 30\u201360 days of action.',
    },
    {
      day: 16,
      action: 'Avoid payday loans and cash advances',
      details: 'These products appear as high-risk borrowing and hurt credit. Use traditional credit instead.',
    },
    {
      day: 17,
      action: 'Request goodwill adjustments',
      details: 'Contact creditors about late payments. Some may remove if you\u2019ve been good otherwise.',
    },
    {
      day: 18,
      action: 'Optimize payment timing',
      details: 'Pay before statement closing date. Utilization reported on statement date, not payment date.',
    },
    {
      day: 19,
      action: 'Communicate with lender',
      details: 'Update lender on improvements. Many hold loan approval if credit trend is improving significantly.',
    },
    {
      day: 20,
      action: 'Celebrate progress and maintain',
      details: 'You\u2019ve started fixing credit! Continue habits: on-time payments, low utilization, no new credit.',
    },
    {
      day: 21,
      action: 'Advanced: consider credit counseling',
      details: 'Non-profit NFCC counselors offer free consultations. They negotiate with creditors and create plans.',
    },
    {
      day: 22,
      action: 'Document all improvements',
      details: 'Keep records of disputes filed, letters sent, payments made. Share with mortgage lender for appeals.',
    },
    {
      day: 23,
      action: 'Review credit with your lender',
      details: 'Most lenders re-pull credit before closing. Significant improvements can change loan approval terms.',
    },
    {
      day: 24,
      action: 'Prepare for long-term building',
      details: 'Credit building takes months/years. Stay committed to practices: on-time, low utilization, diverse credit.',
    },
    {
      day: 25,
      action: 'Plan post-purchase credit strategy',
      details: 'After purchase, continue good habits. Your mortgage is now your biggest credit account. Manage wisely.',
    },
    {
      day: 26,
      action: 'Set goals for 740+ score',
      details: 'With 740+ credit, you\u2019ll save hundreds monthly in interest. This goal is worth the effort.',
    },
    {
      day: 27,
      action: 'Learn about credit law',
      details: 'Know your rights: FCRA allows disputes, Fair Debt Collection has protections, EFTA covers errors.',
    },
    {
      day: 28,
      action: 'Join credit-building community',
      details: 'Follow r/personalfinance, credit subreddits for accountability and advice from others building credit.',
    },
    {
      day: 29,
      action: 'Get pre-approval with improved score',
      details: 'If significantly improved (30+ points), request new pre-approval. Rate lock improves with better credit.',
    },
    {
      day: 30,
      action: 'Finalize credit strategy',
      details: 'You\u2019ve done 30 days of intentional credit work. Keep the momentum through your home purchase journey.',
    },
  ];

  const commonMistakes = [
    {
      mistake: 'Opening new credit cards or loans',
      impact: 'Hard inquiries lower score 5\u201310 points; new accounts hurt average age; increases utilization.',
      solution: 'Wait until after closing. Lenders recheck credit; new accounts can trigger loan denial.',
    },
    {
      mistake: 'Making large purchases on credit',
      impact: 'Increases credit utilization instantly; high utilization indicates financial stress to lenders.',
      solution: 'Avoid new debt 6 months before buying. Save and pay cash for major purchases.',
    },
    {
      mistake: 'Missing payments',
      impact: 'Single late payment (30+ days) drops score 100\u2013200 points; stays for 7 years.',
      solution: 'Set automatic payments. Late payments are the most damaging credit event.',
    },
    {
      mistake: 'Paying off and closing old accounts',
      impact: 'Removes credit history from your report; lowers credit mix; decreases average age of accounts.',
      solution: 'Keep accounts open even after paying off. Make occasional small purchases and pay in full.',
    },
    {
      mistake: 'Checking your own credit too often',
      impact: 'Soft inquiries don\u2019t hurt, but obsessive checking suggests financial stress.',
      solution: 'Check monthly using free tools (Credit Karma, AnnualCreditReport). Avoid multiple hard inquiries.',
    },
    {
      mistake: 'Maxing out credit cards',
      impact: 'High utilization is devastating. Each account reported at 99% utilization loses 50\u2013100 points.',
      solution: 'Keep utilization below 30%. Request higher limits before paying down if needed.',
    },
    {
      mistake: 'Ignoring late payments and debt collections',
      impact: 'Unpaid collections appear on credit report for 7 years; severely limit mortgage approval.',
      solution: 'Address immediately: negotiate payment plans, request removal, or hire credit repair agency.',
    },
    {
      mistake: 'Not checking credit report for errors',
      impact: 'Bureaus make mistakes. False negative items destroy scores and are winnable disputes.',
      solution: 'Check all three reports at AnnualCreditReport.com annually. Dispute any errors immediately.',
    },
    {
      mistake: 'Applying for multiple credit products quickly',
      impact: 'Multiple hard inquiries in 2 weeks lower score 25\u201345 points; signal financial desperation.',
      solution: 'Space out credit applications 6+ months. Rate shopping within 14 days counts as single inquiry.',
    },
    {
      mistake: 'Co-signing loans for others',
      impact: 'You\u2019re liable if they default. Their payment history (or late payments) appears on your report.',
      solution: 'Never co-sign before homebuying. If you co-sign, ensure the other person\u2019s payments are perfect.',
    },
  ];

  const creditTools = [
    {
      name: 'Credit Karma',
      type: 'Free Monitoring + Score',
      features: 'Weekly score updates, dispute support, loan pre-qualifications',
      url: 'creditkarma.com',
    },
    {
      name: 'Annual Credit Report',
      type: 'Free Credit Reports',
      features: 'Official source for annual free reports from all three bureaus',
      url: 'annualcreditreport.com',
    },
    {
      name: 'Experian Boost',
      type: 'Score Enhancement',
      features: 'Add utility and streaming payments to credit file; improves score',
      url: 'experian.com/boost',
    },
    {
      name: 'NerdWallet Credit Score',
      type: 'Free Monitoring',
      features: 'Weekly Equifax score, personalized recommendations, no ads',
      url: 'nerdwallet.com',
    },
    {
      name: 'TransUnion Credit Monitoring',
      type: 'Free Monitoring',
      features: 'Free credit monitoring, fraud alerts, dispute support',
      url: 'transunion.com',
    },
    {
      name: 'Discover Credit Scorecard',
      type: 'Free Score',
      features: 'Free monthly TransUnion score; no Discover account needed',
      url: 'discover.com/creditscorecard',
    },
    {
      name: 'NFCC (National Foundation for Credit Counseling)',
      type: 'Counseling Service',
      features: 'Free/low-cost credit counseling from certified advisors',
      url: 'nfcc.org',
    },
    {
      name: 'MyFICO',
      type: 'Comprehensive Monitoring',
      features: 'Official FICO scores, real-time alerts, dispute tools, subscription available',
      url: 'myfico.com',
    },
  ];

  const improvementTimeline = [
    {
      scenario: 'Late payment (30\u201360 days old)',
      time: '3\u20136 months',
      recovery: '40\u201360 point increase as payment ages',
    },
    {
      scenario: 'High utilization \u2192 under 30%',
      time: '1\u20132 months',
      recovery: '20\u201340 point increase per billing cycle',
    },
    {
      scenario: 'Hard inquiry falls off',
      time: '12 months',
      recovery: '5\u201310 points automatically',
    },
    {
      scenario: 'New account reaches 6 months',
      time: '6 months',
      recovery: '5\u201320 points (now has payment history)',
    },
    {
      scenario: 'Collections account paid',
      time: '3\u20136 months',
      recovery: '10\u201330 points (varies by lender)',
    },
    {
      scenario: 'Collections account removed (dispute)',
      time: '30\u2013180 days',
      recovery: '50\u2013100+ points (fastest improvement)',
    },
    {
      scenario: 'Chapter 7 bankruptcy (oldest)',
      time: '7\u201310 years',
      recovery: 'Major increase in year 2\u20133 post-discharge; improves to 700+ by year 5\u20136',
    },
    {
      scenario: 'Chapter 13 bankruptcy (active)',
      time: '3\u20135 years',
      recovery: 'Slow improvement (50\u2013100 points); faster after discharge',
    },
  ];

  const faqs = [
    {
      question: 'What\u2019s a good credit score for getting a mortgage?',
      answer:
        '740+ is considered very good and qualifies for the best rates and terms. However, 620+ may qualify for conventional mortgages, and 580+ for FHA loans. The higher your score, the more favorable your loan terms and the lower your interest rate.',
    },
    {
      question: 'How long does it take to improve credit?',
      answer:
        'Credit improvement depends on your situation. High utilization drops 20\u201340 points per billing cycle when paid down. Late payments impact decreases over 12\u201324 months. Major negative items (collections, bankruptcy) take years. Most buyers see 20\u201350 point improvements within 30\u201390 days with focused effort.',
    },
    {
      question: 'Does checking my credit hurt my score?',
      answer:
        'No, checking your own credit (soft inquiry) doesn\u2019t hurt your score. However, when a lender checks your credit (hard inquiry), it temporarily lowers your score by 5\u201310 points. Multiple hard inquiries within 14 days usually count as one inquiry for credit shopping.',
    },
    {
      question: 'Can I get a mortgage with late payments on my credit?',
      answer:
        'Yes, but with difficulty. A single late payment (30\u201360 days) reduces approval odds and raises rates. Multiple late payments or recent late payments (within 12 months) make approval very difficult. Lenders typically want to see 12\u201324 months of perfect payment history.',
    },
    {
      question: 'Should I pay off collections before buying a home?',
      answer:
        'Yes, but timing matters. If you pay a collection, the account status changes and may negatively affect your score temporarily. Some lenders require paid collections; others don\u2019t care if they\u2019re old. Consider disputes first\u2014removing a collection entirely gives the biggest score boost.',
    },
    {
      question: 'Will bankruptcy automatically disqualify me from a mortgage?',
      answer:
        'No. Chapter 7 bankruptcy (wiped debts) can qualify for FHA loans after 2 years, conventional after 3 years. Chapter 13 (repayment plan) qualifies after 1\u20132 years if still making on-time payments. Each lender has different standards. Older bankruptcies (5+ years) have minimal impact on rates.',
    },
    {
      question: 'Is it better to pay off credit cards completely or keep a small balance?',
      answer:
        'Pay off completely. Carrying a balance costs you in interest and doesn\u2019t help your credit. Credit bureaus report your balance on your statement date; paying down before that date lowers reported utilization. There\u2019s no benefit to carrying a balance.',
    },
    {
      question: 'How much does my credit score affect my mortgage rate?',
      answer:
        'Significantly. A borrower with a 620 score might pay 2\u20133% higher interest than one with a 740+ score. On a $300,000 loan, that\u2019s $200\u2013400 more per month. Building credit to 740+ saves tens of thousands over the life of the loan.',
    },
    {
      question: 'Can I dispute errors on my credit report?',
      answer:
        'Yes. Under the Fair Credit Reporting Act, you can dispute inaccurate information with the credit bureaus. The bureaus must investigate within 30 days. If they can\u2019t verify the item, it must be removed. Errors are a frequent reason for score improvements.',
    },
    {
      question: 'What happens to my credit when I get a mortgage?',
      answer:
        'Your score temporarily drops 10\u201340 points when a lender pulls your credit and you become a mortgage applicant. However, once you close and make on-time payments, your credit recovers quickly and then improves as the mortgage ages. Mortgages are excellent for credit building long-term.',
    },
  ];

  const getMonthlyPaymentDifference = () => {
    const scoreToRate: { [key: number]: number } = {
      579: 5.5,
      669: 5.0,
      739: 4.5,
      799: 4.0,
      850: 3.5,
    };

    let rate = 5.5;
    if (creditScore >= 800) rate = 3.5;
    else if (creditScore >= 740) rate = 4.0;
    else if (creditScore >= 670) rate = 4.5;
    else if (creditScore >= 580) rate = 5.0;

    const monthlyRate = rate / 100 / 12;
    const numberOfPayments = 30 * 12;
    const monthlyPayment =
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    return {
      rate,
      monthlyPayment: Math.round(monthlyPayment),
      totalInterest: Math.round(monthlyPayment * numberOfPayments - loanAmount),
    };
  };

  const currentPayment = getMonthlyPaymentDifference();

  return (
    <div style={{ backgroundColor: 'var(--le-bg)', color: 'var(--le-text)', fontFamily: 'system-ui, -apple-system, sans-serif', lineHeight: '1.6' }}>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Credit Score Guide for Home Buyers',
            description: 'Complete guide to understanding credit scores, improving credit, and securing the best mortgage rates',
            mainEntity: {
              '@type': 'FAQPage',
              mainEntity: faqs.map((faq) => ({
                '@type': 'Question',
                name: faq.question,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: faq.answer,
                },
              })),
            },
          }),
        }}
      />

      {/* Hero Section */}
      <section
        style={{
          backgroundImage: 'linear-gradient(135deg, var(--le-primary) 0%, #1e40af 100%)',
          color: 'white',
          padding: '80px 20px',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '20px' }}>Your Credit Score & Home Buying</h1>
          <p style={{ fontSize: '20px', marginBottom: '30px', opacity: 0.95 }}>
            Understanding your credit is the first step to homeownership. Learn how to improve your score, qualify for better rates, and save thousands on your mortgage.
          </p>
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => setActiveTab('ranges')}
              style={{
                padding: '12px 24px',
                backgroundColor: 'white',
                color: 'var(--le-primary)',
                border: 'none',
                borderRadius: '8px',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontSize: '16px',
              }}
            >
              Check Your Range
            </button>
            <button
              onClick={() => setActiveTab('calculator')}
              style={{
                padding: '12px 24px',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                color: 'white',
                border: '2px solid white',
                borderRadius: '8px',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontSize: '16px',
              }}
            >
              Calculate Savings
            </button>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px',
          padding: '60px 20px',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        {[
          { icon: '📊', label: 'Typical Rate Difference', value: '2-3%' },
          { icon: '💰', label: 'Monthly Savings Potential', value: '$200-400' },
          { icon: '⏱️', label: 'Avg Improvement Time', value: '30-90 days' },
          { icon: '✓', label: 'Minimum for Approval', value: '620 Score' },
        ].map((stat, idx) => (
          <div
            key={idx}
            style={{
              backgroundColor: 'var(--le-bg-card)',
              border: '1px solid var(--le-border)',
              borderRadius: '12px',
              padding: '30px',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '32px', marginBottom: '10px' }}>{stat.icon}</div>
            <div style={{ fontSize: '14px', color: 'var(--le-text-secondary)', marginBottom: '8px' }}>{stat.label}</div>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: 'var(--le-primary)' }}>{stat.value}</div>
          </div>
        ))}
      </section>

      {/* Credit Score Ranges */}
      <section style={{ padding: '60px 20px', backgroundColor: 'var(--le-bg-card)', borderTop: '1px solid var(--le-border)', borderBottom: '1px solid var(--le-border)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '40px', textAlign: 'center' }}>Credit Score Ranges & Mortgage Impact</h2>
          <div style={{ display: 'grid', gap: '20px' }}>
            {creditRanges.map((range, idx) => (
              <div
                key={idx}
                style={{
                  borderLeft: `6px solid ${range.color}`,
                  backgroundColor: 'var(--le-bg)',
                  padding: '25px',
                  borderRadius: '8px',
                  border: `1px solid var(--le-border)`,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '10px' }}>
                  <div>
                    <div style={{ fontSize: '20px', fontWeight: 'bold' }}>{range.name}</div>
                    <div style={{ fontSize: '14px', color: 'var(--le-text-secondary)' }}>Score: {range.range}</div>
                  </div>
                  <div
                    style={{
                      backgroundColor: range.color,
                      color: 'white',
                      padding: '6px 12px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: 'bold',
                    }}
                  >
                    {range.name}
                  </div>
                </div>
                <p style={{ color: 'var(--le-text-secondary)', marginTop: '12px' }}>{range.impact}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How Credit Scores Are Calculated */}
      <section style={{ padding: '60px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '40px', textAlign: 'center' }}>How Your Credit Score is Calculated</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'start' }}>
          <div>
            <div style={{ display: 'grid', gap: '20px' }}>
              {creditFactors.map((factor, idx) => (
                <div key={idx} style={{ backgroundColor: 'var(--le-bg-card)', padding: '20px', borderRadius: '8px', border: '1px solid var(--le-border)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <span style={{ fontWeight: 'bold' }}>{factor.name}</span>
                    <span style={{ color: 'var(--le-primary)', fontWeight: 'bold' }}>{factor.percentage}%</span>
                  </div>
                  <div style={{ backgroundColor: 'var(--le-border)', height: '8px', borderRadius: '4px', marginBottom: '8px', overflow: 'hidden' }}>
                    <div
                      style={{
                        backgroundColor: 'var(--le-primary)',
                        height: '100%',
                        width: `${factor.percentage}%`,
                      }}
                    />
                  </div>
                  <p style={{ fontSize: '14px', color: 'var(--le-text-secondary)' }}>{factor.description}</p>
                </div>
              ))}
            </div>
          </div>
          <div style={{ backgroundColor: 'var(--le-bg-card)', padding: '30px', borderRadius: '12px', border: '1px solid var(--le-border)' }}>
            <h3 style={{ fontWeight: 'bold', marginBottom: '20px' }}>Key Takeaways</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {[
                'Payment history is king\u2014one late payment can drop you 100+ points',
                'Credit utilization (balance vs. limit) impacts your score monthly',
                'Older accounts help; closing accounts hurts your average age',
                'New credit inquiries temporarily lower your score',
                'Diverse credit types (cards, loans, mortgage) improve your score',
              ].map((point, idx) => (
                <li key={idx} style={{ marginBottom: '15px', paddingLeft: '25px', position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0, color: 'var(--le-success)', fontWeight: 'bold' }}>✓</span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Loan Type Requirements */}
      <section style={{ padding: '60px 20px', backgroundColor: 'var(--le-bg-card)', borderTop: '1px solid var(--le-border)', borderBottom: '1px solid var(--le-border)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '40px', textAlign: 'center' }}>Credit Score Requirements by Loan Type</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px' }}>
            {loanTypes.map((loan, idx) => (
              <div key={idx} style={{ backgroundColor: 'var(--le-bg)', padding: '25px', borderRadius: '12px', border: '1px solid var(--le-border)' }}>
                <h3 style={{ fontWeight: 'bold', marginBottom: '15px', fontSize: '18px' }}>{loan.type} Loan</h3>
                <div style={{ marginBottom: '15px' }}>
                  <div style={{ fontSize: '12px', color: 'var(--le-text-secondary)', marginBottom: '4px' }}>Minimum Score</div>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--le-primary)' }}>{loan.minScore}</div>
                </div>
                <div style={{ marginBottom: '15px' }}>
                  <div style={{ fontSize: '12px', color: 'var(--le-text-secondary)', marginBottom: '4px' }}>Recommended Score</div>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--le-success)' }}>{loan.recommended}+</div>
                </div>
                <div style={{ marginBottom: '15px', padding: '12px', backgroundColor: 'var(--le-bg-card)', borderRadius: '6px' }}>
                  <div style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '4px' }}>Rate Impact</div>
                  <div style={{ fontSize: '14px', color: 'var(--le-text-secondary)' }}>{loan.rateImpact}</div>
                </div>
                <p style={{ fontSize: '13px', color: 'var(--le-text-secondary)' }}>{loan.details}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interest Rate Calculator */}
      <section style={{ padding: '60px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '40px', textAlign: 'center' }}>Interest Rate Impact Calculator</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'start' }}>
          <div>
            <div style={{ backgroundColor: 'var(--le-bg-card)', padding: '30px', borderRadius: '12px', border: '1px solid var(--le-border)' }}>
              <div style={{ marginBottom: '30px' }}>
                <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>Your Credit Score: {creditScore}</label>
                <input
                  type="range"
                  min="300"
                  max="850"
                  value={creditScore}
                  onChange={(e) => setCreditScore(Number(e.target.value))}
                  style={{ width: '100%', height: '8px', borderRadius: '4px', cursor: 'pointer' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', fontSize: '12px', color: 'var(--le-text-secondary)' }}>
                  <span>300</span>
                  <span>850</span>
                </div>
              </div>

              <div style={{ marginBottom: '30px' }}>
                <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>Loan Amount: ${loanAmount.toLocaleString()}</label>
                <input
                  type="range"
                  min="100000"
                  max="1000000"
                  step="10000"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  style={{ width: '100%', height: '8px', borderRadius: '4px', cursor: 'pointer' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', fontSize: '12px', color: 'var(--le-text-secondary)' }}>
                  <span>$100K</span>
                  <span>$1M</span>
                </div>
              </div>

              <div style={{ marginTop: '30px', padding: '20px', backgroundColor: 'var(--le-bg)', borderRadius: '8px', border: '1px solid var(--le-border)' }}>
                <p style={{ fontSize: '12px', color: 'var(--le-text-secondary)', marginBottom: '8px' }}>Interest Rate</p>
                <p style={{ fontSize: '28px', fontWeight: 'bold', color: 'var(--le-primary)', marginBottom: '15px' }}>{currentPayment.rate}%</p>
                <p style={{ fontSize: '12px', color: 'var(--le-text-secondary)', marginBottom: '8px' }}>Monthly Payment (30-year)</p>
                <p style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '15px' }}>${currentPayment.monthlyPayment.toLocaleString()}</p>
                <p style={{ fontSize: '12px', color: 'var(--le-text-secondary)', marginBottom: '8px' }}>Total Interest Paid</p>
                <p style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--le-warning)' }}>${currentPayment.totalInterest.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div>
            <div style={{ backgroundColor: 'var(--le-bg-card)', padding: '30px', borderRadius: '12px', border: '1px solid var(--le-border)' }}>
              <h3 style={{ fontWeight: 'bold', marginBottom: '25px' }}>Savings Potential by Score</h3>
              <div style={{ display: 'grid', gap: '15px' }}>
                {[
                  { score: 620, rate: 5.5, label: 'Poor Credit' },
                  { score: 700, rate: 4.5, label: 'Good Credit' },
                  { score: 750, rate: 4.0, label: 'Very Good' },
                  { score: 800, rate: 3.5, label: 'Excellent' },
                ].map((tier, idx) => {
                  const monthlyRate = tier.rate / 100 / 12;
                  const numberOfPayments = 30 * 12;
                  const payment =
                    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
                    (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
                  const savings = Math.round(currentPayment.monthlyPayment - payment);

                  return (
                    <div
                      key={idx}
                      style={{
                        padding: '15px',
                        backgroundColor: creditScore >= tier.score ? 'var(--le-success)' : 'var(--le-bg)',
                        borderRadius: '8px',
                        border: creditScore >= tier.score ? '1px solid var(--le-success)' : '1px solid var(--le-border)',
                        color: creditScore >= tier.score ? 'white' : 'var(--le-text)',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <span style={{ fontWeight: 'bold' }}>{tier.label}</span>
                        <span>{tier.rate}%</span>
                      </div>
                      <div style={{ fontSize: '13px', opacity: 0.9 }}>
                        {savings > 0 ? `Save $${savings}/month` : `Pay $${Math.abs(savings)}/month extra`}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div style={{ marginTop: '20px', padding: '15px', backgroundColor: 'var(--le-accent)', borderRadius: '8px' }}>
                <p style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '5px' }}>Key Insight</p>
                <p style={{ fontSize: '13px' }}>Every 50-point improvement in your credit score can save $50-150 per month, or $18,000-54,000 over 30 years.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 30-Day Credit Improvement Plan */}
      <section style={{ padding: '60px 20px', backgroundColor: 'var(--le-bg-card)', borderTop: '1px solid var(--le-border)', borderBottom: '1px solid var(--le-border)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '15px', textAlign: 'center' }}>30-Day Credit Improvement Plan</h2>
          <p style={{ textAlign: 'center', color: 'var(--le-text-secondary)', marginBottom: '40px', fontSize: '16px' }}>
            Actionable steps to improve your credit score before your mortgage application.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            {improvementPlan.map((item, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: 'var(--le-bg)',
                  padding: '20px',
                  borderRadius: '8px',
                  border: '1px solid var(--le-border)',
                  borderLeft: `4px solid ${idx < 10 ? 'var(--le-primary)' : idx < 20 ? 'var(--le-accent)' : 'var(--le-success)'}`,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                  <div
                    style={{
                      backgroundColor: 'var(--le-primary)',
                      color: 'white',
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold',
                      marginRight: '12px',
                      flexShrink: 0,
                    }}
                  >
                    {item.day}
                  </div>
                  <h3 style={{ fontWeight: 'bold', margin: 0 }}>{item.action}</h3>
                </div>
                <p style={{ color: 'var(--le-text-secondary)', margin: 0, fontSize: '14px' }}>{item.details}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Common Credit Mistakes */}
      <section style={{ padding: '60px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '40px', textAlign: 'center' }}>10 Critical Mistakes Before Buying a Home</h2>
        <div style={{ display: 'grid', gap: '15px' }}>
          {commonMistakes.map((item, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: 'var(--le-bg-card)',
                border: '1px solid var(--le-border)',
                borderRadius: '8px',
                overflow: 'hidden',
              }}
            >
              <button
                onClick={() => setExpandedMistake(expandedMistake === idx ? null : idx)}
                style={{
                  width: '100%',
                  padding: '20px',
                  backgroundColor: 'var(--le-bg-card)',
                  border: 'none',
                  textAlign: 'left',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--le-bg)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--le-bg-card)';
                }}
              >
                <span>❌ {item.mistake}</span>
                <span style={{ fontSize: '20px' }}>{expandedMistake === idx ? '−' : '+'}</span>
              </button>
              {expandedMistake === idx && (
                <div style={{ padding: '0 20px 20px', backgroundColor: 'var(--le-bg)' }}>
                  <div style={{ marginBottom: '15px' }}>
                    <p style={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--le-text-secondary)', marginBottom: '5px' }}>IMPACT</p>
                    <p style={{ margin: 0, color: 'var(--le-danger)' }}>{item.impact}</p>
                  </div>
                  <div>
                    <p style={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--le-text-secondary)', marginBottom: '5px' }}>SOLUTION</p>
                    <p style={{ margin: 0, color: 'var(--le-success)' }}>{item.solution}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Credit Monitoring Tools */}
      <section style={{ padding: '60px 20px', backgroundColor: 'var(--le-bg-card)', borderTop: '1px solid var(--le-border)', borderBottom: '1px solid var(--le-border)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '40px', textAlign: 'center' }}>Free Credit Monitoring Tools</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px' }}>
            {creditTools.map((tool, idx) => (
              <div key={idx} style={{ backgroundColor: 'var(--le-bg)', padding: '25px', borderRadius: '12px', border: '1px solid var(--le-border)' }}>
                <h3 style={{ fontWeight: 'bold', marginBottom: '8px' }}>{tool.name}</h3>
                <div style={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--le-primary)', marginBottom: '12px' }}>{tool.type}</div>
                <p style={{ fontSize: '14px', color: 'var(--le-text-secondary)', marginBottom: '15px' }}>{tool.features}</p>
                <a
                  href={`https://${tool.url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-block',
                    color: 'var(--le-primary)',
                    textDecoration: 'none',
                    fontWeight: 'bold',
                    fontSize: '14px',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.textDecoration = 'underline';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.textDecoration = 'none';
                  }}
                >
                  Visit {tool.name} →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section style={{ padding: '60px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '40px', textAlign: 'center' }}>Credit Improvement Timeline</h2>
        <p style={{ textAlign: 'center', color: 'var(--le-text-secondary)', marginBottom: '40px' }}>
          How long does credit improvement take? It depends on your situation.
        </p>
        <div style={{ display: 'grid', gap: '20px' }}>
          {improvementTimeline.map((item, idx) => (
            <div
              key={idx}
              style={{
                display: 'grid',
                gridTemplateColumns: '250px 1fr',
                gap: '20px',
                alignItems: 'start',
                paddingBottom: '20px',
                borderBottom: idx < improvementTimeline.length - 1 ? '1px solid var(--le-border)' : 'none',
              }}
            >
              <div>
                <h3 style={{ fontWeight: 'bold', margin: '0 0 5px 0' }}>{item.scenario}</h3>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '20px', alignItems: 'center' }}>
                <div
                  style={{
                    backgroundColor: 'var(--le-primary)',
                    color: 'white',
                    padding: '10px 15px',
                    borderRadius: '6px',
                    fontWeight: 'bold',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {item.time}
                </div>
                <p style={{ margin: 0, color: 'var(--le-text-secondary)' }}>{item.recovery}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section style={{ padding: '60px 20px', backgroundColor: 'var(--le-bg-card)', borderTop: '1px solid var(--le-border)', borderBottom: '1px solid var(--le-border)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '40px', textAlign: 'center' }}>Frequently Asked Questions</h2>
          <div style={{ display: 'grid', gap: '15px' }}>
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: 'var(--le-bg)',
                  border: '1px solid var(--le-border)',
                  borderRadius: '8px',
                  overflow: 'hidden',
                }}
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                  style={{
                    width: '100%',
                    padding: '20px',
                    backgroundColor: 'var(--le-bg)',
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--le-bg-card)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--le-bg)';
                  }}
                >
                  <span>{faq.question}</span>
                  <span style={{ fontSize: '20px', color: 'var(--le-primary)', flexShrink: 0 }}>
                    {expandedFaq === idx ? '−' : '+'}
                  </span>
                </button>
                {expandedFaq === idx && (
                  <div style={{ padding: '20px', backgroundColor: 'var(--le-bg-card)', borderTop: '1px solid var(--le-border)' }}>
                    <p style={{ margin: 0, color: 'var(--le-text-secondary)' }}>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dispute Guide */}
      <section style={{ padding: '60px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '40px', textAlign: 'center' }}>How to Dispute Credit Report Errors</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px' }}>
          {[
            {
              step: 1,
              title: 'Get Your Reports',
              description: 'Visit AnnualCreditReport.com and download reports from Equifax, Experian, and TransUnion. Review each for errors.',
            },
            {
              step: 2,
              title: 'Identify Errors',
              description: 'Look for wrong personal info, accounts you didn\u2019t open, incorrect balances, or duplicate entries.',
            },
            {
              step: 3,
              title: 'Document Everything',
              description: 'Take screenshots, print reports, and gather proof (statements, letters, etc.) to support your dispute.',
            },
            {
              step: 4,
              title: 'File Dispute',
              description: 'Contact the bureau online, by mail, or phone. Provide detailed explanation and copies of supporting documents.',
            },
            {
              step: 5,
              title: 'Wait for Investigation',
              description: 'Bureaus have 30 days to investigate. They contact the creditor to verify the account. Check your mail regularly.',
            },
            {
              step: 6,
              title: 'Follow Up',
              description: 'After 30 days, request results. If still inaccurate, file again. Many errors are removed after second dispute.',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: 'var(--le-bg-card)',
                padding: '25px',
                borderRadius: '12px',
                border: '1px solid var(--le-border)',
                borderTop: `4px solid var(--le-primary)`,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '15px',
                }}
              >
                <div
                  style={{
                    backgroundColor: 'var(--le-primary)',
                    color: 'white',
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    marginRight: '12px',
                    flexShrink: 0,
                  }}
                >
                  {item.step}
                </div>
                <h3 style={{ fontWeight: 'bold', margin: 0 }}>{item.title}</h3>
              </div>
              <p style={{ margin: 0, color: 'var(--le-text-secondary)', fontSize: '14px' }}>{item.description}</p>
            </div>
          ))}
        </div>
        <div
          style={{
            marginTop: '40px',
            padding: '25px',
            backgroundColor: 'var(--le-accent)',
            borderRadius: '12px',
            border: '1px solid var(--le-border)',
          }}
        >
          <p style={{ fontWeight: 'bold', marginTop: 0 }}>Pro Tip: Don\u2019t Pay Errors</p>
          <p style={{ margin: '0 0 10px 0', color: 'var(--le-text-secondary)' }}>
            Never pay an error to dispute it. Paying can be interpreted as acceptance. Dispute first, then consider payment only if the bureau validates it.
          </p>
        </div>
      </section>

      {/* Lead Capture Section */}
      <section
        style={{
          backgroundImage: 'linear-gradient(135deg, var(--le-primary) 0%, #1e40af 100%)',
          color: 'white',
          padding: '80px 20px',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '15px' }}>Get Your Free Credit Readiness Assessment</h2>
          <p style={{ fontSize: '18px', marginBottom: '30px', opacity: 0.95 }}>
            Find out exactly where you stand and what you need to do to qualify for the best mortgage rates.
          </p>
          <form
            style={{ display: 'grid', gap: '12px', marginBottom: '20px' }}
            onSubmit={(e) => {
              e.preventDefault();
              alert('Lead capture form submitted. In production, this would send to your CRM.');
            }}
          >
            <input
              type="text"
              placeholder="First Name"
              required
              style={{
                padding: '12px 16px',
                borderRadius: '6px',
                border: 'none',
                fontSize: '16px',
              }}
            />
            <input
              type="email"
              placeholder="Email Address"
              required
              style={{
                padding: '12px 16px',
                borderRadius: '6px',
                border: 'none',
                fontSize: '16px',
              }}
            />
            <input
              type="tel"
              placeholder="Phone Number"
              style={{
                padding: '12px 16px',
                borderRadius: '6px',
                border: 'none',
                fontSize: '16px',
              }}
            />
            <button
              type="submit"
              style={{
                padding: '14px 28px',
                backgroundColor: 'var(--le-accent)',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontWeight: 'bold',
                fontSize: '16px',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '0.9';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '1';
              }}
            >
              Get My Free Assessment
            </button>
          </form>
          <p style={{ fontSize: '12px', opacity: 0.8 }}>No credit card required. We\u2019ll analyze your credit and send recommendations in 24 hours.</p>
        </div>
      </section>

      {/* Footer CTA */}
      <section style={{ padding: '60px 20px', backgroundColor: 'var(--le-bg-card)', borderTop: '1px solid var(--le-border)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '20px' }}>Ready to Buy Your Home?</h2>
          <p style={{ fontSize: '18px', color: 'var(--le-text-secondary)', marginBottom: '30px' }}>
            Start with your credit. Schedule a free consultation with our mortgage experts to create your personalized roadmap.
          </p>
          <button
            style={{
              padding: '14px 32px',
              backgroundColor: 'var(--le-primary)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 'bold',
              fontSize: '16px',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--le-primary-hover)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--le-primary)';
            }}
          >
            Schedule Free Consultation
          </button>
        </div>
      </section>
    </div>
  );
}
