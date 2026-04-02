'use client'

import { useState } from 'react';

export default function HomeEquityGuidePage() {
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name || '',
          email: formData.email || '',
          phone: formData.phone || '',
          source: 'Home Equity Guide',
          lead_type: 'Buyer',
          page_url: typeof window !== 'undefined' ? window.location.pathname : '',
          captured_at: new Date().toISOString(),
        }),
      });
      if (res.ok) {
        setFormSubmitted(true);
        setTimeout(() => setFormSubmitted(false), 3000);
        setFormData({ name: '', email: '', phone: '' });
      }
    } catch {
      setFormSubmitted(true);
      setTimeout(() => setFormSubmitted(false), 3000);
    }
  };

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const faqItems = [
    {
      question: "What\u2019s the difference between home equity and home value?",
      answer: "Home value is what your property is worth on the market. Home equity is the difference between that value and what you owe on your mortgage. If your home is worth $500,000 and you owe $300,000, your equity is $200,000."
    },
    {
      question: "How much equity do I need to borrow against?",
      answer: "Most lenders require at least 15-20% equity in your home to qualify for a home equity loan or HELOC. Some lenders may go as low as 10% equity, but terms are usually better with more equity available."
    },
    {
      question: "Can I use home equity to invest in real estate?",
      answer: "Yes, many investors use home equity to fund down payments on investment properties. This can be an effective strategy, but it does carry risk since your primary residence is collateral."
    },
    {
      question: "How long does it take to build home equity?",
      answer: "It depends on your mortgage term and local market conditions. With a 30-year mortgage, you build equity slowly at first (mostly interest payments), but faster over time. Making extra principal payments or refinancing can accelerate equity building significantly."
    },
    {
      question: "What happens to my equity if my home value drops?",
      answer: "If your home value decreases, your equity decreases proportionally. In extreme cases (market crash), you could end up underwater if your home is worth less than your mortgage balance. This is why understanding risk is crucial."
    },
    {
      question: "Is a home equity loan or HELOC better for me?",
      answer: "Home equity loans offer fixed rates and predictable payments, ideal for large one-time expenses. HELOCs offer flexibility like a credit card, ideal for ongoing expenses. Choose based on your spending plans and comfort with variable rates."
    }
  ];

  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: 'var(--le-bg)',
      color: 'var(--le-text)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    },
    hero: {
      background: 'linear-gradient(135deg, var(--le-primary) 0%, var(--le-accent) 100%)',
      padding: '80px 20px',
      textAlign: 'center',
      color: 'white',
      marginBottom: '60px',
    },
    heroTitle: {
      fontSize: '48px',
      fontWeight: 700,
      marginBottom: '20px',
      lineHeight: 1.2,
    },
    heroSubtitle: {
      fontSize: '20px',
      opacity: 0.95,
      maxWidth: '600px',
      margin: '0 auto',
    },
    content: {
      maxWidth: '900px',
      margin: '0 auto',
      padding: '0 20px',
    },
    section: {
      marginBottom: '60px',
    },
    sectionTitle: {
      fontSize: '32px',
      fontWeight: 700,
      marginBottom: '20px',
      color: 'var(--le-primary)',
    },
    sectionSubtitle: {
      fontSize: '24px',
      fontWeight: 600,
      marginBottom: '16px',
      marginTop: '32px',
      color: 'var(--le-text)',
    },
    paragraph: {
      fontSize: '16px',
      lineHeight: 1.8,
      marginBottom: '16px',
      color: 'var(--le-text)',
    },
    list: {
      fontSize: '16px',
      lineHeight: 1.8,
      marginBottom: '16px',
      paddingLeft: '28px',
    },
    listItem: {
      marginBottom: '12px',
    },
    highlightBox: {
      background: 'var(--le-card-bg)',
      border: '2px solid var(--le-primary)',
      padding: '24px',
      borderRadius: '8px',
      marginBottom: '20px',
    },
    highlightTitle: {
      fontSize: '18px',
      fontWeight: 600,
      marginBottom: '12px',
      color: 'var(--le-primary)',
    },
    comparisonTable: {
      width: '100%',
      borderCollapse: 'collapse',
      marginBottom: '20px',
      borderRadius: '8px',
      overflow: 'hidden',
      border: '1px solid var(--le-border)',
    },
    tableHeader: {
      background: 'var(--le-primary)',
      color: 'white',
      padding: '16px',
      textAlign: 'left',
      fontWeight: 600,
    },
    tableCell: {
      padding: '16px',
      borderBottom: '1px solid var(--le-border)',
    },
    tableRow: {
      background: 'var(--le-card-bg)',
    },
    formSection: {
      background: 'var(--le-card-bg)',
      padding: '40px',
      borderRadius: '8px',
      marginBottom: '40px',
      border: '1px solid var(--le-border)',
    },
    formTitle: {
      fontSize: '28px',
      fontWeight: 700,
      marginBottom: '12px',
      color: 'var(--le-primary)',
    },
    formSubtitle: {
      fontSize: '16px',
      marginBottom: '24px',
      color: 'var(--le-text)',
      opacity: 0.85,
    },
    formGroup: {
      marginBottom: '16px',
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
      padding: '12px 16px',
      fontSize: '16px',
      border: '1px solid var(--le-border)',
      borderRadius: '6px',
      background: 'white',
      color: 'var(--le-text)',
      boxSizing: 'border-box',
    },
    formButton: {
      background: 'var(--le-primary)',
      color: 'white',
      padding: '14px 32px',
      fontSize: '16px',
      fontWeight: 600,
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      marginTop: '8px',
      transition: 'background 0.3s ease',
    },
    formButtonHover: {
      background: 'var(--le-hover)',
    },
    successMessage: {
      background: '#e8f5e9',
      color: '#2e7d32',
      padding: '12px 16px',
      borderRadius: '6px',
      marginTop: '12px',
      fontSize: '14px',
      fontWeight: 500,
    },
    faqSection: {
      marginBottom: '40px',
    },
    faqItem: {
      marginBottom: '12px',
      border: '1px solid var(--le-border)',
      borderRadius: '6px',
      overflow: 'hidden',
    },
    faqQuestion: {
      padding: '18px',
      background: 'var(--le-card-bg)',
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: 600,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      userSelect: 'none',
      transition: 'background 0.2s ease',
    },
    faqQuestionHover: {
      background: 'var(--le-hover)',
    },
    faqAnswer: {
      padding: '18px',
      background: 'white',
      fontSize: '15px',
      lineHeight: 1.7,
      borderTop: '1px solid var(--le-border)',
    },
    icon: {
      width: '20px',
      height: '20px',
      transition: 'transform 0.3s ease',
    },
    equityBuildersGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '20px',
      marginBottom: '20px',
    },
    equityBuilderCard: {
      background: 'var(--le-card-bg)',
      padding: '20px',
      borderRadius: '8px',
      border: '1px solid var(--le-border)',
    },
    cardTitle: {
      fontSize: '18px',
      fontWeight: 600,
      marginBottom: '12px',
      color: 'var(--le-primary)',
    },
    cardText: {
      fontSize: '15px',
      lineHeight: 1.6,
      color: 'var(--le-text)',
    },
  };

  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <section style={styles.hero}>
        <h1 style={styles.heroTitle}>Home Equity 101</h1>
        <p style={styles.heroSubtitle}>
          Understand what home equity is, how to build it faster, and smart ways to use it for your financial goals.
        </p>
      </section>

      {/* Main Content */}
      <main style={styles.content}>
        {/* What is Home Equity */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>What is Home Equity?</h2>
          <p style={styles.paragraph}>
            Home equity is the portion of your home that you truly own. It\u2019s calculated by subtracting what you owe on your mortgage from your home\u2019s current market value. For example, if your home is worth $400,000 and you have a $250,000 mortgage balance, you have $150,000 in equity.
          </p>
          <p style={styles.paragraph}>
            Home equity represents your financial stake in your property and becomes increasingly valuable as you pay down your mortgage and as your property appreciates over time. It\u2019s one of the most accessible and tax-advantaged assets most homeowners have.
          </p>
          
          <div style={styles.highlightBox}>
            <div style={styles.highlightTitle}>Quick Example</div>
            <p style={styles.paragraph}>
              Home Value: $500,000 minus Mortgage Balance: $300,000 equals Home Equity: $200,000
            </p>
          </div>
        </section>

        {/* How Equity Builds Over Time */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>How Home Equity Builds Over Time</h2>
          <p style={styles.paragraph}>
            Home equity grows through two primary mechanisms: principal paydown and property appreciation.
          </p>
          
          <h3 style={styles.sectionSubtitle}>1. Mortgage Principal Paydown</h3>
          <p style={styles.paragraph}>
            Each monthly payment includes a portion applied to principal. Early in your mortgage, most goes to interest, but this shifts over time. By the final years of a 30-year mortgage, nearly every payment builds equity significantly. Making extra principal payments can dramatically accelerate this process.
          </p>

          <h3 style={styles.sectionSubtitle}>2. Property Appreciation</h3>
          <p style={styles.paragraph}>
            Real estate typically appreciates over time. Historical averages show properties gaining value at roughly 3-4% annually, though this varies by market. Strategic improvements and renovations can boost appreciation in your specific property.
          </p>

          <h3 style={styles.sectionSubtitle}>3. Refinancing Benefits</h3>
          <p style={styles.paragraph}>
            Refinancing to a shorter loan term (15-year vs 30-year) or capturing lower interest rates can dramatically increase the principal portion of each payment, building equity much faster.
          </p>
        </section>

        {/* Ways to Increase Equity Faster */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Ways to Increase Equity Faster</h2>
          <div style={styles.equityBuildersGrid}>
            <div style={styles.equityBuilderCard}>
              <div style={styles.cardTitle}>Make Extra Payments</div>
              <p style={styles.cardText}>
                Adding just $100-200 monthly to principal can shorten your loan by years and save thousands in interest.
              </p>
            </div>
            <div style={styles.equityBuilderCard}>
              <div style={styles.cardTitle}>Bi-Weekly Payments</div>
              <p style={styles.cardText}>
                Paying half your mortgage every two weeks results in 26 payments annually instead of 24, building equity faster.
              </p>
            </div>
            <div style={styles.equityBuilderCard}>
              <div style={styles.cardTitle}>Strategic Renovations</div>
              <p style={styles.cardText}>
                Kitchen and bathroom upgrades, roof replacement, and energy-efficient improvements increase home value directly.
              </p>
            </div>
            <div style={styles.equityBuilderCard}>
              <div style={styles.cardTitle}>Refinance to Lower Rate</div>
              <p style={styles.cardText}>
                A lower interest rate increases the principal portion of each payment, building equity more efficiently.
              </p>
            </div>
            <div style={styles.equityBuilderCard}>
              <div style={styles.cardTitle}>Maintain Your Property</div>
              <p style={styles.cardText}>
                Regular maintenance prevents depreciation and helps your home appreciate in line with market trends.
              </p>
            </div>
            <div style={styles.equityBuilderCard}>
              <div style={styles.cardTitle}>Improve Your Neighborhood</div>
              <p style={styles.cardText}>
                Community development and reduced local crime rates can boost property values across your area.
              </p>
            </div>
          </div>
        </section>

        {/* Home Equity Loans vs HELOCs */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Home Equity Loans vs HELOCs</h2>
          <p style={styles.paragraph}>
            Both home equity loans and home equity lines of credit (HELOCs) allow you to borrow against your equity, but they work differently. Here\u2019s how they compare:
          </p>

          <table style={styles.comparisonTable}>
            <thead>
              <tr style={styles.tableRow}>
                <th style={{ ...styles.tableHeader, width: '35%' }}>Feature</th>
                <th style={styles.tableHeader}>Home Equity Loan</th>
                <th style={styles.tableHeader}>HELOC</th>
              </tr>
            </thead>
            <tbody>
              <tr style={styles.tableRow}>
                <td style={styles.tableCell}><strong>Funds Disbursement</strong></td>
                <td style={styles.tableCell}>Lump sum upfront</td>
                <td style={styles.tableCell}>Draw as needed during draw period</td>
              </tr>
              <tr style={styles.tableRow}>
                <td style={styles.tableCell}><strong>Interest Rate</strong></td>
                <td style={styles.tableCell}>Fixed rate (predictable)</td>
                <td style={styles.tableCell}>Variable rate (fluctuates)</td>
              </tr>
              <tr style={styles.tableRow}>
                <td style={styles.tableCell}><strong>Payments</strong></td>
                <td style={styles.tableCell}>Fixed monthly payments</td>
                <td style={styles.tableCell}>Flexible; interest-only options</td>
              </tr>
              <tr style={styles.tableRow}>
                <td style={styles.tableCell}><strong>Best For</strong></td>
                <td style={styles.tableCell}>Large one-time expenses</td>
                <td style={styles.tableCell}>Ongoing or flexible needs</td>
              </tr>
              <tr style={styles.tableRow}>
                <td style={styles.tableCell}><strong>Timeline</strong></td>
                <td style={styles.tableCell}>5-15 years typical</td>
                <td style={styles.tableCell}>10-30 years typical</td>
              </tr>
            </tbody>
          </table>

          <div style={styles.highlightBox}>
            <div style={styles.highlightTitle}>Key Difference</div>
            <p style={styles.paragraph}>
              Home equity loans give you a fixed lump sum with a fixed rate and predictable payments. HELOCs work like a credit card tied to your home, offering flexibility but variable rates.
            </p>
          </div>
        </section>

        {/* Using Equity for Investments */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Using Home Equity for Investments</h2>
          <p style={styles.paragraph}>
            Many investors use home equity strategically to fund real estate investments, business ventures, or other wealth-building opportunities. This can be powerful, but requires careful consideration.
          </p>

          <h3 style={styles.sectionSubtitle}>Investment Applications</h3>
          <ul style={styles.list}>
            <li style={styles.listItem}><strong>Investment Property Down Payments:</strong> Using equity as a down payment on rental properties, increasing your real estate portfolio.</li>
            <li style={styles.listItem}><strong>Business Funding:</strong> Capitalizing a small business or expanding an existing venture with competitive rates versus other borrowing options.</li>
            <li style={styles.listItem}><strong>Stock Portfolio:</strong> For experienced investors, borrowing at mortgage rates to invest in diversified securities can amplify returns.</li>
            <li style={styles.listItem}><strong>Home Improvements:</strong> Renovations that increase property value and generate appreciation.</li>
          </ul>

          <p style={styles.paragraph}>
            The advantage is that home equity borrowing rates are significantly lower than unsecured loans or credit cards, typically 2-3 percentage points below personal loan rates. This lower cost of capital makes equity leverage attractive for investments with higher expected returns.
          </p>
        </section>

        {/* Risks of Tapping Equity */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Risks of Tapping Your Home Equity</h2>
          <p style={styles.paragraph}>
            While home equity access is powerful, borrowing against your home carries distinct risks that demand respect and strategic thinking.
          </p>

          <h3 style={styles.sectionSubtitle}>Primary Risks</h3>
          <ul style={styles.list}>
            <li style={styles.listItem}><strong>Foreclosure Risk:</strong> Your home is collateral. Failure to repay could result in foreclosure and loss of your primary residence.</li>
            <li style={styles.listItem}><strong>Market Downturn:</strong> If your home value drops, you could end up underwater (owing more than it\u2019s worth), reducing your net worth.</li>
            <li style={styles.listItem}><strong>Rising Interest Rates:</strong> HELOC rates are variable. Rate increases can dramatically raise your monthly payments unexpectedly.</li>
            <li style={styles.listItem}><strong>Over-Leveraging:</strong> Tapping equity reduces your financial safety margin and increases your total debt burden.</li>
            <li style={styles.listItem}><strong>Investment Risk:</strong> Using home equity for investments means personal financial security backs speculative ventures.</li>
            <li style={styles.listItem}><strong>Closing Costs:</strong> Home equity loans and HELOCs involve closing costs similar to mortgages, reducing net proceeds.</li>
          </ul>

          <div style={styles.highlightBox}>
            <div style={styles.highlightTitle}>Golden Rule</div>
            <p style={styles.paragraph}>
              Only tap home equity for investments or purposes that generate returns exceeding the borrowing cost, and only when you\u2019re confident in the outcome.
            </p>
          </div>
        </section>

        {/* Lead Capture Form */}
        <section style={styles.formSection}>
          <h3 style={styles.formTitle}>Ready to Maximize Your Home Equity?</h3>
          <p style={styles.formSubtitle}>
            Get a personalized consultation on leveraging your equity smartly. Share your information and we\u2019ll connect you with an expert.
          </p>

          {!formSubmitted ? (
            <form onSubmit={handleFormSubmit}>
              <div style={styles.formGroup}>
                <label htmlFor="name" style={styles.formLabel}>Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  placeholder="Your full name"
                  style={styles.formInput}
                  required
                />
              </div>

              <div style={styles.formGroup}>
                <label htmlFor="email" style={styles.formLabel}>Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  placeholder="your@email.com"
                  style={styles.formInput}
                  required
                />
              </div>

              <div style={styles.formGroup}>
                <label htmlFor="phone" style={styles.formLabel}>Phone Number (Optional)</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleFormChange}
                  placeholder="(555) 000-0000"
                  style={styles.formInput}
                />
              </div>

              <button
                type="submit"
                style={styles.formButton}
                onMouseEnter={(e) => e.target.style.background = 'var(--le-hover)'}
                onMouseLeave={(e) => e.target.style.background = 'var(--le-primary)'}
              >
                Get My Equity Consultation
              </button>
            </form>
          ) : (
            <div style={styles.successMessage}>
              Thank you! We\u2019ve received your information and will be in touch shortly with personalized guidance.
            </div>
          )}
        </section>

        {/* FAQ Section */}
        <section style={styles.faqSection}>
          <h2 style={styles.sectionTitle}>Frequently Asked Questions</h2>

          {faqItems.map((item, index) => (
            <div key={index} style={styles.faqItem}>
              <div
                style={styles.faqQuestion}
                onClick={() => toggleFaq(index)}
                onMouseEnter={(e) => e.currentTarget.style.background = 'var(--le-hover)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'var(--le-card-bg)'}
              >
                <span>{item.question}</span>
                <svg
                  style={{
                    ...styles.icon,
                    transform: expandedFaq === index ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>

              {expandedFaq === index && (
                <div style={styles.faqAnswer}>{item.answer}</div>
              )}
            </div>
          ))}
        </section>

        {/* Closing Section */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Take Control of Your Financial Future</h2>
          <p style={styles.paragraph}>
            Home equity is one of your most powerful financial assets. Whether you\u2019re looking to fund home improvements, invest in additional properties, consolidate debt, or pursue other goals, understanding how to build and use your equity strategically is essential.
          </p>
          <p style={styles.paragraph}>
            Every homeowner\u2019s situation is unique. The best approach depends on your goals, risk tolerance, market conditions, and long-term plans. A consultation with a qualified real estate professional or financial advisor can help you develop a personalized strategy that aligns with your objectives.
          </p>
          <p style={styles.paragraph}>
            Ready to explore your equity options? Connect with our team today for a no-obligation conversation about maximizing your home\u2019s financial potential.
          </p>
        </section>
      </main>

      {/* Footer Spacing */}
      <div style={{ height: '40px' }}></div>
    </div>
  );
}
