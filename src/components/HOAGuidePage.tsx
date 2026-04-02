'use client';

import { useState } from 'react';

export default function HOAGuidePage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [monthlyFee, setMonthlyFee] = useState(250);
  const [yearsOwned, setYearsOwned] = useState(10);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setEmail('');
    }, 3000);
  };

  const hoaPros = [
    { title: 'Increased Property Values', description: 'Well-maintained HOAs typically have higher property values and better resale potential.' },
    { title: 'Professional Maintenance', description: 'Landscaping, common areas, and exterior are maintained to consistent standards.' },
    { title: 'Community Amenities', description: 'Access to pools, fitness centers, clubhouses, and recreational facilities.' },
    { title: 'Security & Safety', description: 'Gated communities often have enhanced security measures and lower crime rates.' },
    { title: 'Predictable Expenses', description: 'Monthly fees help budget for maintenance; major repairs are shared costs.' },
    { title: 'Rule Enforcement', description: 'Consistent enforcement keeps properties looking uniform and maintained.' },
    { title: 'Community Connection', description: 'Organized events and meetings foster a sense of neighborhood and belonging.' },
    { title: 'Dispute Resolution', description: 'HOA provides processes to mediate neighbor disagreements professionally.' },
  ];

  const hoaCons = [
    { title: 'Monthly Fees', description: 'Ongoing costs can be substantial and increase annually without strict governance.' },
    { title: 'Limited Freedom', description: 'Architectural restrictions and rules limit personal choices for your home.' },
    { title: 'Special Assessments', description: 'Surprise large bills for unexpected repairs or capital improvements.' },
    { title: 'Potential Mismanagement', description: 'Poor board decisions can waste money or neglect important maintenance.' },
    { title: 'Bureaucratic Delays', description: 'Getting approval for home improvements can be slow and frustrating.' },
    { title: 'Mandatory Participation', description: 'You cannot opt out of HOA membership or avoid its rules and fees.' },
    { title: 'Poor Communication', description: 'Some HOAs lack transparency in finances and decision-making processes.' },
    { title: 'Enforcement Issues', description: 'Inconsistent rule enforcement can create resentment among homeowners.' },
  ];

  const feeBreakdown = [
    { item: 'Landscaping & Grounds', percentage: 25, description: 'Lawn care, tree trimming, common area landscaping' },
    { item: 'Amenity Maintenance', percentage: 20, description: 'Pool, fitness center, clubhouse upkeep and staffing' },
    { item: 'Insurance', percentage: 15, description: 'Liability and property insurance for common areas' },
    { item: 'Management Company', percentage: 15, description: 'Professional management, administrative staff, accounting' },
    { item: 'Reserve Fund', percentage: 15, description: 'Savings for major repairs, roof replacement, paving' },
    { item: 'Utilities', percentage: 5, description: 'Water, electric for common areas and streetlights' },
    { item: 'Miscellaneous', percentage: 5, description: 'Contingency, legal, audit, enforcement' },
  ];

  const questions = [
    'What are the current monthly HOA fees and how often do they increase?',
    'What is included in the monthly fee and what costs extra?',
    'How much is in the reserve fund and is it properly funded?',
    'Are there pending special assessments or capital improvement plans?',
    'Has the HOA faced any lawsuits in the past 5 years?',
    'What are the current rules regarding pet ownership and size limits?',
    'Can I modify my exterior (paint color, landscaping, roof type)?',
    'What rental restrictions exist for investment properties?',
    'How often are board meetings held and are they open to residents?',
    'How is the board elected and how long are terms?',
    'What happens if homeowners don\u2019t pay HOA fees?',
    'Are there any pending environmental issues or deferred maintenance?',
    'What is the process for challenging or changing HOA rules?',
    'How well-attended are board meetings and community events?',
    'Can board members make decisions without homeowner approval?',
    'What amenities are actually functioning and regularly used?',
  ];

  const redFlags = [
    { flag: 'Depleted Reserves', details: 'Reserve fund less than 50% of annual budget or no reserve study' },
    { flag: 'Frequent Special Assessments', details: 'Multiple assessments in past 3 years indicates poor planning' },
    { flag: 'Pending Lawsuits', details: 'Current litigation between HOA and residents or vendor issues' },
    { flag: 'Low Attendance at Meetings', details: 'Lack of resident engagement suggests apathy or problems' },
    { flag: 'Deferred Maintenance', details: 'Visible deterioration of common areas, facilities, or infrastructure' },
    { flag: 'High Turnover of Management', details: 'Frequent changes suggest management-board conflicts' },
    { flag: 'Budget Opacity', details: 'Unclear financials or resistance to sharing budget details' },
    { flag: 'Aging Infrastructure', details: 'Roof, parking lot, plumbing nearing end of life without replacement plan' },
  ];

  const faqItems = [
    {
      q: 'Are HOA fees tax-deductible?',
      a: 'Only if the home is a rental investment property. Primary residence HOA fees are not tax-deductible, but capital improvements may be. Consult a tax professional.'
    },
    {
      q: 'Can an HOA foreclose on my home?',
      a: 'Yes, in most states. If you don\u2019t pay HOA fees, the HOA can place a lien and potentially foreclose. This is why it\u2019s crucial to understand fee structures before buying.'
    },
    {
      q: 'How often do HOA fees typically increase?',
      a: 'Increases range from 3-5% annually in stable communities. Some HOAs increase more aggressively depending on reserves, inflation, and capital needs. Always ask for historical increases.'
    },
    {
      q: 'Can I sell my home if there are special assessments?',
      a: 'Yes, but you may need to disclose pending assessments. Some HOAs allow transfer of liability to the new owner, while others require payment before sale. Check your CC&Rs.'
    },
    {
      q: 'What\u2019s the difference between an HOA and a condo association?',
      a: 'HOAs govern single-family home communities; condo associations manage multi-unit buildings. Condos typically have higher fees but the HOA owns less land and fewer amenities.'
    },
    {
      q: 'Can I challenge an HOA rule I disagree with?',
      a: 'Yes. Attend board meetings, gather neighbor support, present your case. If that fails, you can petition for a rule change vote or consult a lawyer about legal challenges.'
    },
    {
      q: 'How much should be in the HOA reserve fund?',
      a: 'Most experts recommend 25-50% of the annual budget. A reserve study assesses major components and recommends adequate funding. Low reserves often mean future special assessments.'
    },
    {
      q: 'What happens if the HOA goes bankrupt?',
      a: 'Homeowners typically become responsible for common area maintenance and may face a special assessment to cover unpaid obligations. This is very rare but devastating when it occurs.'
    },
  ];

  const comparisonData = [
    { category: 'Monthly Costs', hoa: '$200-500', nonHoa: '$0 HOA (varies by maintenance)' },
    { category: 'Maintenance Responsibility', hoa: 'Shared, professional', nonHoa: 'Yours alone' },
    { category: 'Exterior Modifications', hoa: 'Restricted', nonHoa: 'Full freedom' },
    { category: 'Community Amenities', hoa: 'Included', nonHoa: 'Not included' },
    { category: 'Property Value Potential', hoa: 'Often higher', nonHoa: 'Varies by location' },
    { category: 'Rule Enforcement', hoa: 'Consistent', nonHoa: 'None' },
    { category: 'Personal Freedom', hoa: 'Limited', nonHoa: 'Maximum' },
    { category: 'Predictability', hoa: 'High', nonHoa: 'Variable' },
  ];

  const totalCost = monthlyFee * 12 * yearsOwned;
  const estimatedCostWithIncreases = totalCost * 1.03 ** yearsOwned;

  return (
    <div style={{ backgroundColor: 'var(--le-bg)', color: 'var(--le-text)', minHeight: '100vh' }}>
      {/* Hero Section */}
      <section style={{
        backgroundColor: 'linear-gradient(135deg, var(--le-primary) 0%, var(--le-accent) 100%)',
        backgroundImage: 'linear-gradient(135deg, var(--le-primary) 0%, var(--le-accent) 100%)',
        padding: '80px 20px',
        textAlign: 'center',
        color: 'white'
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '20px', lineHeight: 1.2 }}>
            Understanding HOAs: The Complete Buyer\u2019s Guide
          </h1>
          <p style={{ fontSize: '20px', marginBottom: '30px', opacity: 0.95, lineHeight: 1.6 }}>
            Make informed decisions about Homeowners Associations. Learn what to expect, what to avoid, and how to protect your investment.
          </p>
          <p style={{ fontSize: '16px', opacity: 0.9 }}>
            Whether you\u2019re considering a home in an HOA community or already own one, understanding your rights and responsibilities is essential for financial success.
          </p>
        </div>
      </section>

      {/* Quick Navigation */}
      <section style={{ backgroundColor: 'var(--le-bg-card)', borderBottom: '1px solid var(--le-border)', padding: '0', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 0 }}>
          {[
            { id: 'overview', label: '📋 Overview' },
            { id: 'proscons', label: '⚖️ Pros & Cons' },
            { id: 'fees', label: '💰 Fees' },
            { id: 'calculator', label: '🧮 Calculator' },
            { id: 'questions', label: '❓ Questions' },
            { id: 'documents', label: '📄 Documents' },
            { id: 'comparison', label: '🏠 vs Non-HOA' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                flex: 1,
                minWidth: '120px',
                padding: '16px 12px',
                border: 'none',
                backgroundColor: activeTab === tab.id ? 'var(--le-primary)' : 'transparent',
                color: activeTab === tab.id ? 'white' : 'var(--le-text-secondary)',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: activeTab === tab.id ? 'bold' : 'normal',
                transition: 'all 0.3s ease',
                borderBottom: activeTab === tab.id ? '3px solid var(--le-primary-hover)' : 'none',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      {/* Main Content */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <section>
            <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '30px', color: 'var(--le-primary)' }}>
              What is an HOA?
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '40px' }}>
              <div style={{ backgroundColor: 'var(--le-bg-card)', padding: '30px', borderRadius: '8px', border: '1px solid var(--le-border)' }}>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '15px', color: 'var(--le-primary)' }}>
                  🏘️ Purpose
                </h3>
                <p style={{ fontSize: '16px', lineHeight: 1.6, color: 'var(--le-text)' }}>
                  An HOA is an organization of homeowners that sets rules, maintains common areas, and collects fees to ensure community standards and property values.
                </p>
              </div>

              <div style={{ backgroundColor: 'var(--le-bg-card)', padding: '30px', borderRadius: '8px', border: '1px solid var(--le-border)' }}>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '15px', color: 'var(--le-primary)' }}>
                  ⚙️ Structure
                </h3>
                <p style={{ fontSize: '16px', lineHeight: 1.6, color: 'var(--le-text)' }}>
                  Governed by a Board of Directors elected by homeowners. The board hires management, enforces rules, budgets for maintenance, and handles finances.
                </p>
              </div>

              <div style={{ backgroundColor: 'var(--le-bg-card)', padding: '30px', borderRadius: '8px', border: '1px solid var(--le-border)' }}>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '15px', color: 'var(--le-primary)' }}>
                  📋 Governance
                </h3>
                <p style={{ fontSize: '16px', lineHeight: 1.6, color: 'var(--le-text)' }}>
                  Guided by Covenants, Conditions & Restrictions (CC&Rs), bylaws, and state laws. Homeowners must comply or face fines and potential legal action.
                </p>
              </div>
            </div>

            <div style={{ backgroundColor: 'var(--le-bg-card)', padding: '30px', borderRadius: '8px', border: '1px solid var(--le-border)', marginBottom: '40px' }}>
              <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px', color: 'var(--le-primary)' }}>
                The Three Pillars of HOA Governance
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                <div>
                  <h4 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px', color: 'var(--le-accent)' }}>
                    1. Covenants (CC&Rs)
                  </h4>
                  <p style={{ fontSize: '15px', lineHeight: 1.6, color: 'var(--le-text-secondary)' }}>
                    Binding legal restrictions on property use. Govern architectural standards, pet policies, rental restrictions, and land use rules.
                  </p>
                </div>
                <div>
                  <h4 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px', color: 'var(--le-accent)' }}>
                    2. Bylaws
                  </h4>
                  <p style={{ fontSize: '15px', lineHeight: 1.6, color: 'var(--le-text-secondary)' }}>
                    Operating procedures for the HOA. Cover board elections, meetings, voting, duties, and how decisions are made.
                  </p>
                </div>
                <div>
                  <h4 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px', color: 'var(--le-accent)' }}>
                    3. Rules & Regulations
                  </h4>
                  <p style={{ fontSize: '15px', lineHeight: 1.6, color: 'var(--le-text-secondary)' }}>
                    Specific policies established by the board. More flexible than CC&Rs and can be modified more easily.
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Pros & Cons Tab */}
        {activeTab === 'proscons' && (
          <section>
            <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '40px', color: 'var(--le-primary)' }}>
              The Pros and Cons of HOA Living
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', gap: '40px' }}>
              {/* Pros */}
              <div>
                <h3 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '20px', color: 'var(--le-success)' }}>
                  ✓ Advantages
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  {hoaPros.map((pro, idx) => (
                    <div
                      key={idx}
                      style={{
                        backgroundColor: 'var(--le-bg-card)',
                        padding: '15px',
                        borderRadius: '6px',
                        border: `2px solid ${`var(--le-success)`}`,
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--le-bg)';
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--le-bg-card)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '5px', color: 'var(--le-primary)' }}>
                        {pro.title}
                      </h4>
                      <p style={{ fontSize: '14px', color: 'var(--le-text-secondary)', lineHeight: 1.5 }}>
                        {pro.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cons */}
              <div>
                <h3 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '20px', color: 'var(--le-danger)' }}>
                  ✗ Disadvantages
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  {hoaCons.map((con, idx) => (
                    <div
                      key={idx}
                      style={{
                        backgroundColor: 'var(--le-bg-card)',
                        padding: '15px',
                        borderRadius: '6px',
                        border: `2px solid ${`var(--le-danger)`}`,
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--le-bg)';
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--le-bg-card)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '5px', color: 'var(--le-primary)' }}>
                        {con.title}
                      </h4>
                      <p style={{ fontSize: '14px', color: 'var(--le-text-secondary)', lineHeight: 1.5 }}>
                        {con.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Fees Tab */}
        {activeTab === 'fees' && (
          <section>
            <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '40px', color: 'var(--le-primary)' }}>
              HOA Fee Breakdown & Typical Ranges
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '40px', marginBottom: '40px' }}>
              {/* Fee Breakdown */}
              <div>
                <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px', color: 'var(--le-primary)' }}>
                  Where Your Money Goes
                </h3>
                <div style={{ backgroundColor: 'var(--le-bg-card)', padding: '20px', borderRadius: '8px', border: '1px solid var(--le-border)' }}>
                  {feeBreakdown.map((item, idx) => (
                    <div key={idx} style={{ marginBottom: idx !== feeBreakdown.length - 1 ? '20px' : '0', paddingBottom: idx !== feeBreakdown.length - 1 ? '20px' : '0', borderBottom: idx !== feeBreakdown.length - 1 ? '1px solid var(--le-border)' : 'none' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <h4 style={{ fontSize: '15px', fontWeight: 'bold', color: 'var(--le-primary)' }}>
                          {item.item}
                        </h4>
                        <span style={{ fontSize: '14px', fontWeight: 'bold', color: 'var(--le-accent)' }}>
                          {item.percentage}%
                        </span>
                      </div>
                      <div style={{
                        backgroundColor: 'var(--le-bg)',
                        height: '8px',
                        borderRadius: '4px',
                        overflow: 'hidden',
                        marginBottom: '8px',
                      }}>
                        <div style={{
                          backgroundColor: 'var(--le-accent)',
                          height: '100%',
                          width: `${item.percentage}%`,
                          transition: 'width 0.3s ease',
                        }} />
                      </div>
                      <p style={{ fontSize: '13px', color: 'var(--le-text-secondary)', lineHeight: 1.4 }}>
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Typical Ranges */}
              <div>
                <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px', color: 'var(--le-primary)' }}>
                  Typical Monthly Fee Ranges
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  {[
                    { community: 'Single-Family Home Community (No Amenities)', low: '$75', high: '$150' },
                    { community: 'Single-Family with Basic Amenities', low: '$150', high: '$300' },
                    { community: 'Single-Family with Pool & Fitness', low: '$250', high: '$400' },
                    { community: 'Townhome Community', low: '$200', high: '$450' },
                    { community: 'Condo Building', low: '$300', high: '$800' },
                    { community: 'Luxury Resort-Style Community', low: '$500', high: '$1500+' },
                  ].map((item, idx) => (
                    <div key={idx} style={{ backgroundColor: 'var(--le-bg-card)', padding: '15px', borderRadius: '6px', border: '1px solid var(--le-border)' }}>
                      <p style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '5px', color: 'var(--le-primary)' }}>
                        {item.community}
                      </p>
                      <p style={{ fontSize: '16px', fontWeight: 'bold', color: 'var(--le-accent)' }}>
                        {item.low} - {item.high}/month
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ backgroundColor: 'var(--le-bg-card)', padding: '30px', borderRadius: '8px', border: '1px solid var(--le-border)', marginBottom: '40px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px', color: 'var(--le-primary)' }}>
                Important Fee Concepts
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                <div>
                  <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px', color: 'var(--le-accent)' }}>
                    Special Assessments
                  </h4>
                  <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--le-text-secondary)' }}>
                    One-time charges for unexpected repairs or major capital improvements not covered by the annual budget.
                  </p>
                </div>
                <div>
                  <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px', color: 'var(--le-accent)' }}>
                    Annual Increases
                  </h4>
                  <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--le-text-secondary)' }}>
                    Most HOAs increase fees 3-5% annually. Review historical increases to predict future costs.
                  </p>
                </div>
                <div>
                  <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px', color: 'var(--le-accent)' }}>
                    Capital Reserve Fund
                  </h4>
                  <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--le-text-secondary)' }}>
                    Portion of fees dedicated to major future repairs. A reserve study recommends appropriate funding levels.
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Calculator Tab */}
        {activeTab === 'calculator' && (
          <section>
            <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '40px', color: 'var(--le-primary)' }}>
              HOA Cost Calculator
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '40px' }}>
              <div style={{ backgroundColor: 'var(--le-bg-card)', padding: '30px', borderRadius: '8px', border: '1px solid var(--le-border)' }}>
                <h3 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '25px', color: 'var(--le-primary)' }}>
                  Estimate Your Costs
                </h3>

                <div style={{ marginBottom: '25px' }}>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '8px', color: 'var(--le-primary)' }}>
                    Monthly HOA Fee: ${monthlyFee}
                  </label>
                  <input
                    type="range"
                    min="50"
                    max="2000"
                    step="25"
                    value={monthlyFee}
                    onChange={(e) => setMonthlyFee(Number(e.target.value))}
                    style={{
                      width: '100%',
                      height: '8px',
                      borderRadius: '4px',
                      backgroundColor: 'var(--le-bg)',
                      cursor: 'pointer',
                      accentColor: 'var(--le-primary)',
                    }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', fontSize: '12px', color: 'var(--le-text-secondary)' }}>
                    <span>$50</span>
                    <span>$2000</span>
                  </div>
                </div>

                <div style={{ marginBottom: '30px' }}>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '8px', color: 'var(--le-primary)' }}>
                    Years of Ownership: {yearsOwned}
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="30"
                    step="1"
                    value={yearsOwned}
                    onChange={(e) => setYearsOwned(Number(e.target.value))}
                    style={{
                      width: '100%',
                      height: '8px',
                      borderRadius: '4px',
                      backgroundColor: 'var(--le-bg)',
                      cursor: 'pointer',
                      accentColor: 'var(--le-primary)',
                    }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', fontSize: '12px', color: 'var(--le-text-secondary)' }}>
                    <span>1 year</span>
                    <span>30 years</span>
                  </div>
                </div>

                <div style={{
                  backgroundColor: 'var(--le-bg)',
                  padding: '20px',
                  borderRadius: '6px',
                  border: `2px solid var(--le-primary)`,
                }}>
                  <p style={{ fontSize: '13px', color: 'var(--le-text-secondary)', marginBottom: '10px' }}>
                    Estimated Total Cost (without increases)
                  </p>
                  <p style={{ fontSize: '28px', fontWeight: 'bold', color: 'var(--le-primary)', marginBottom: '15px' }}>
                    ${totalCost.toLocaleString()}
                  </p>
                  <p style={{ fontSize: '13px', color: 'var(--le-text-secondary)', marginBottom: '10px' }}>
                    Estimated Total (with 3% annual increases)
                  </p>
                  <p style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--le-accent)' }}>
                    ${Math.round(estimatedCostWithIncreases).toLocaleString()}
                  </p>
                </div>
              </div>

              <div style={{ backgroundColor: 'var(--le-bg-card)', padding: '30px', borderRadius: '8px', border: '1px solid var(--le-border)' }}>
                <h3 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '20px', color: 'var(--le-primary)' }}>
                  What This Means
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div>
                    <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px', color: 'var(--le-accent)' }}>
                      Annual Cost
                    </h4>
                    <p style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--le-primary)' }}>
                      ${(monthlyFee * 12).toLocaleString()}/year
                    </p>
                  </div>

                  <div>
                    <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px', color: 'var(--le-accent)' }}>
                      Additional With 3% Increase
                    </h4>
                    <p style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--le-accent)' }}>
                      ${Math.round(estimatedCostWithIncreases - totalCost).toLocaleString()} more
                    </p>
                  </div>

                  <div style={{ backgroundColor: 'var(--le-bg)', padding: '15px', borderRadius: '6px' }}>
                    <h4 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '10px', color: 'var(--le-primary)' }}>
                      💡 Tip
                    </h4>
                    <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--le-text-secondary)' }}>
                      This calculator shows basic HOA costs. Don\u2019t forget to factor in special assessments, insurance, taxes, and maintenance for your own property.
                    </p>
                  </div>

                  <div style={{ backgroundColor: 'var(--le-warning)15', padding: '15px', borderRadius: '6px', border: `1px solid var(--le-warning)` }}>
                    <h4 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '10px', color: 'var(--le-warning)' }}>
                      ⚠️ Reality Check
                    </h4>
                    <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--le-text-secondary)' }}>
                      Our 3% estimate is conservative. Some HOAs increase 5-7% annually. Ask for historical increase data before buying.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Questions Tab */}
        {activeTab === 'questions' && (
          <section>
            <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '40px', color: 'var(--le-primary)' }}>
              15+ Critical Questions to Ask Before Buying
            </h2>

            <p style={{ fontSize: '16px', lineHeight: 1.6, marginBottom: '30px', color: 'var(--le-text-secondary)' }}>
              Request HOA documents from the seller\u2019s agent or the HOA directly. Ask these questions during your inspection period before committing to the purchase.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '15px' }}>
              {questions.map((q, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: 'var(--le-bg-card)',
                    padding: '20px',
                    borderRadius: '6px',
                    border: '1px solid var(--le-border)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.borderColor = 'var(--le-primary)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.borderColor = 'var(--le-border)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <span style={{ fontSize: '20px', flexShrink: 0 }}>❓</span>
                    <p style={{ fontSize: '15px', lineHeight: 1.5, color: 'var(--le-text)', fontWeight: '500' }}>
                      {q}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ backgroundColor: 'var(--le-bg-card)', padding: '30px', borderRadius: '8px', border: '1px solid var(--le-border)', marginTop: '40px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '15px', color: 'var(--le-primary)' }}>
                How to Get Answers
              </h3>
              <ol style={{ fontSize: '15px', lineHeight: 1.8, color: 'var(--le-text-secondary)', paddingLeft: '20px' }}>
                <li style={{ marginBottom: '10px' }}>Contact the HOA management company or Board President</li>
                <li style={{ marginBottom: '10px' }}>Request official HOA documents including financials and meeting minutes</li>
                <li style={{ marginBottom: '10px' }}>Attend an HOA board meeting to observe the board in action</li>
                <li style={{ marginBottom: '10px' }}>Talk to current residents about their experience</li>
                <li style={{ marginBottom: '10px' }}>Hire a real estate attorney to review CC&Rs and identify red flags</li>
                <li>Review the Resale Disclosure Package provided by law in many states</li>
              </ol>
            </div>
          </section>
        )}

        {/* Documents Tab */}
        {activeTab === 'documents' && (
          <section>
            <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '40px', color: 'var(--le-primary)' }}>
              Key HOA Documents to Review
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '20px', marginBottom: '40px' }}>
              {[
                {
                  doc: 'Covenants, Conditions & Restrictions (CC&Rs)',
                  what: 'The legal foundation of the HOA. Binding restrictions on property use, architectural standards, pet policies, and rental restrictions.',
                  lookFor: 'Overly restrictive rules that might impact your lifestyle. Architectural approval process. Pet restrictions. Rental limitations.',
                },
                {
                  doc: 'Bylaws',
                  what: 'Rules governing how the HOA operates. Cover board elections, meeting procedures, voting rights, and board member duties.',
                  lookFor: 'How often board meetings occur. What percentage of votes required for changes. How board members are elected. Term limits.',
                },
                {
                  doc: 'Budget & Financial Statements',
                  what: 'Shows where money comes from and how it\u2019s spent. Indicates if the HOA is financially healthy.',
                  lookFor: 'Reserve fund adequacy (should be 25-50% of annual budget). Unexplained increases in major expense categories. Deficit spending.',
                },
                {
                  doc: 'Meeting Minutes',
                  what: 'Records of board decisions over the past 1-3 years. Shows what issues the HOA has dealt with.',
                  lookFor: 'Frequency of special assessments. Unresolved conflicts. Major decisions made. Level of resident participation.',
                },
                {
                  doc: 'Reserve Study',
                  what: 'Professional assessment of major components and their remaining lifespan. Recommends reserve funding.',
                  lookFor: 'Whether reserves are adequately funded. When major items (roof, parking lot) need replacement. Projected costs.',
                },
                {
                  doc: 'Rules & Regulations',
                  what: 'Specific policies about noise, parking, guests, common area use, and architectural modifications.',
                  lookFor: 'How enforcement happens. What fines are imposed. Flexibility in rules. How restrictive the rules are.',
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: 'var(--le-bg-card)',
                    padding: '25px',
                    borderRadius: '8px',
                    border: '1px solid var(--le-border)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                  onClick={() => setExpandedSection(expandedSection === item.doc ? null : item.doc)}
                  onMouseOver={(e) => {
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <h3 style={{ fontSize: '17px', fontWeight: 'bold', marginBottom: '10px', color: 'var(--le-primary)' }}>
                    📄 {item.doc}
                  </h3>
                  <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--le-text-secondary)', marginBottom: '10px' }}>
                    {item.what}
                  </p>
                  {expandedSection === item.doc && (
                    <div style={{ backgroundColor: 'var(--le-bg)', padding: '15px', borderRadius: '6px', marginTop: '10px', borderLeft: `3px solid var(--le-accent)` }}>
                      <p style={{ fontSize: '13px', fontWeight: 'bold', color: 'var(--le-accent)', marginBottom: '8px' }}>
                        What to Look For:
                      </p>
                      <p style={{ fontSize: '13px', lineHeight: 1.6, color: 'var(--le-text-secondary)' }}>
                        {item.lookFor}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div style={{ backgroundColor: 'var(--le-bg-card)', padding: '30px', borderRadius: '8px', border: '1px solid var(--le-border)' }}>
              <h3 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '20px', color: 'var(--le-primary)' }}>
                Red Flags in HOA Documents
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '15px' }}>
                {redFlags.map((item, idx) => (
                  <div key={idx} style={{ backgroundColor: 'var(--le-bg)', padding: '15px', borderRadius: '6px', border: `2px solid var(--le-danger)` }}>
                    <h4 style={{ fontSize: '15px', fontWeight: 'bold', marginBottom: '8px', color: 'var(--le-danger)' }}>
                      🚩 {item.flag}
                    </h4>
                    <p style={{ fontSize: '13px', lineHeight: 1.5, color: 'var(--le-text-secondary)' }}>
                      {item.details}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Comparison Tab */}
        {activeTab === 'comparison' && (
          <section>
            <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '40px', color: 'var(--le-primary)' }}>
              HOA vs. Non-HOA Communities
            </h2>

            <div style={{ overflowX: 'auto', marginBottom: '40px' }}>
              <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                backgroundColor: 'var(--le-bg-card)',
                borderRadius: '8px',
                overflow: 'hidden',
                border: '1px solid var(--le-border)',
              }}>
                <thead>
                  <tr style={{ backgroundColor: 'var(--le-primary)', color: 'white' }}>
                    <th style={{ padding: '16px', textAlign: 'left', fontWeight: 'bold', fontSize: '15px', borderRight: '1px solid var(--le-border)' }}>
                      Category
                    </th>
                    <th style={{ padding: '16px', textAlign: 'left', fontWeight: 'bold', fontSize: '15px', borderRight: '1px solid var(--le-border)' }}>
                      HOA Community
                    </th>
                    <th style={{ padding: '16px', textAlign: 'left', fontWeight: 'bold', fontSize: '15px' }}>
                      Non-HOA Community
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, idx) => (
                    <tr
                      key={idx}
                      style={{
                        backgroundColor: idx % 2 === 0 ? 'var(--le-bg-card)' : 'var(--le-bg)',
                        borderBottom: '1px solid var(--le-border)',
                      }}
                    >
                      <td style={{ padding: '16px', fontWeight: 'bold', color: 'var(--le-primary)', borderRight: '1px solid var(--le-border)', fontSize: '14px' }}>
                        {row.category}
                      </td>
                      <td style={{ padding: '16px', color: 'var(--le-text-secondary)', borderRight: '1px solid var(--le-border)', fontSize: '14px' }}>
                        {row.hoa}
                      </td>
                      <td style={{ padding: '16px', color: 'var(--le-text-secondary)', fontSize: '14px' }}>
                        {row.nonHoa}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '20px' }}>
              <div style={{ backgroundColor: 'var(--le-bg-card)', padding: '30px', borderRadius: '8px', border: '1px solid var(--le-border)' }}>
                <h3 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '15px', color: 'var(--le-primary)' }}>
                  🏘️ Choose HOA If You:
                </h3>
                <ul style={{ fontSize: '14px', lineHeight: 1.8, color: 'var(--le-text-secondary)', paddingLeft: '20px' }}>
                  <li>Want professionally maintained grounds and common areas</li>
                  <li>Value community amenities like pools and fitness centers</li>
                  <li>Prefer consistent neighborhood aesthetics</li>
                  <li>Want shared responsibility for major maintenance</li>
                  <li>Appreciate the sense of community and social events</li>
                  <li>Are comfortable with rules and restrictions</li>
                  <li>Prioritize predictable monthly costs</li>
                </ul>
              </div>

              <div style={{ backgroundColor: 'var(--le-bg-card)', padding: '30px', borderRadius: '8px', border: '1px solid var(--le-border)' }}>
                <h3 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '15px', color: 'var(--le-accent)' }}>
                  🏡 Choose Non-HOA If You:
                </h3>
                <ul style={{ fontSize: '14px', lineHeight: 1.8, color: 'var(--le-text-secondary)', paddingLeft: '20px' }}>
                  <li>Want complete freedom to modify your property</li>
                  <li>Prefer not to pay monthly fees or assessments</li>
                  <li>Don\u2019t need or want community amenities</li>
                  <li>Enjoy handling your own maintenance decisions</li>
                  <li>Don\u2019t like being governed by community rules</li>
                  <li>Want to avoid the politics of HOA board meetings</li>
                  <li>Prioritize independence over community structure</li>
                </ul>
              </div>
            </div>
          </section>
        )}
      </div>

      {/* Your Rights Section */}
      <section style={{ backgroundColor: 'var(--le-bg-card)', padding: '40px 20px', marginBottom: '40px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '30px', color: 'var(--le-primary)', textAlign: 'center' }}>
            Your Rights as a Homeowner
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
            {[
              {
                right: 'Right to Attend Meetings',
                desc: 'Board meetings must be open to residents. You can listen, ask questions, and voice concerns.',
              },
              {
                right: 'Right to Vote',
                desc: 'You can vote on major decisions, including board member elections and bylaw changes.',
              },
              {
                right: 'Right to Run for Board',
                desc: 'Any homeowner can run for a board position (typically 2-4 year terms).',
              },
              {
                right: 'Right to Access Records',
                desc: 'You can request and review financial records, meeting minutes, and other official documents.',
              },
              {
                right: 'Right to Challenge Enforcement',
                desc: 'If fined unfairly, you can request a hearing and present your case to the board.',
              },
              {
                right: 'Right to Privacy',
                desc: 'The HOA cannot conduct unreasonable searches or enter your home without proper notice and cause.',
              },
            ].map((item, idx) => (
              <div key={idx} style={{ backgroundColor: 'var(--le-bg)', padding: '20px', borderRadius: '6px', border: `2px solid var(--le-success)` }}>
                <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px', color: 'var(--le-primary)' }}>
                  ✓ {item.right}
                </h3>
                <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--le-text-secondary)' }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
        <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '40px', color: 'var(--le-primary)', textAlign: 'center' }}>
          Frequently Asked Questions
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', gap: '15px' }}>
          {faqItems.map((item, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: 'var(--le-bg-card)',
                borderRadius: '6px',
                border: '1px solid var(--le-border)',
                overflow: 'hidden',
              }}
            >
              <button
                onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                style={{
                  width: '100%',
                  padding: '20px',
                  backgroundColor: expandedFaq === idx ? 'var(--le-primary)' : 'transparent',
                  color: expandedFaq === idx ? 'white' : 'var(--le-text)',
                  border: 'none',
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                {item.q}
                <span style={{ fontSize: '20px', marginLeft: '10px', transition: 'transform 0.3s ease', transform: expandedFaq === idx ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                  ▼
                </span>
              </button>
              {expandedFaq === idx && (
                <div style={{ padding: '20px', backgroundColor: 'var(--le-bg)', borderTop: '1px solid var(--le-border)' }}>
                  <p style={{ fontSize: '15px', lineHeight: 1.7, color: 'var(--le-text-secondary)' }}>
                    {item.a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Lead Capture */}
      <section style={{ backgroundColor: 'var(--le-primary)', color: 'white', padding: '60px 20px', marginTop: '60px' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '20px', textAlign: 'center' }}>
            Get Help Reviewing HOA Documents
          </h2>
          <p style={{ fontSize: '18px', lineHeight: 1.6, textAlign: 'center', marginBottom: '30px', opacity: 0.95 }}>
            Considering a home in an HOA? We\u2019ll help you review documents and identify potential issues before you commit.
          </p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                padding: '14px 16px',
                fontSize: '15px',
                border: 'none',
                borderRadius: '6px',
                backgroundColor: 'white',
                color: 'var(--le-text)',
                fontFamily: 'inherit',
              }}
            />
            <button
              type="submit"
              style={{
                padding: '14px 28px',
                fontSize: '16px',
                fontWeight: 'bold',
                border: 'none',
                borderRadius: '6px',
                backgroundColor: submitted ? 'var(--le-success)' : 'var(--le-primary-hover)',
                color: 'white',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
            >
              {submitted ? '✓ Thank You!' : 'Get HOA Document Review Guide'}
            </button>
          </form>

          {submitted && (
            <p style={{ marginTop: '20px', fontSize: '14px', opacity: 0.9, textAlign: 'center' }}>
              Check your email for our HOA document review checklist and next steps.
            </p>
          )}
        </div>
      </section>

      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqItems.map((item) => ({
              '@type': 'Question',
              name: item.q,
              acceptedAnswer: {
                '@type': 'Answer',
                text: item.a,
              },
            })),
          }),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: 'Understanding HOAs: The Complete Buyer\u2019s Guide',
            description: 'Comprehensive guide to HOAs covering pros, cons, fees, documents, and homeowner rights.',
            author: {
              '@type': 'Organization',
              name: 'LeadEngine',
            },
            datePublished: '2024-01-01',
            image: 'https://realtyclientengine.app/og-image.jpg',
          }),
        }}
      />
    </div>
  );
}
