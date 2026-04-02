'use client';

import { useState } from 'react';

export default function RealEstateGlossaryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLetter, setSelectedLetter] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [submitted, setSubmitted] = useState(false);

  const glossaryTerms = [
    {
      term: 'Amortization',
      definition: 'The process of paying off a loan through regular installments over a set period. Each payment includes principal and interest, with the principal portion increasing over time.',
      letter: 'A'
    },
    {
      term: 'Appraisal',
      definition: 'A professional assessment of a property\u2019s market value, typically required by lenders before approving a mortgage. The appraiser evaluates comparable properties and condition.',
      letter: 'A'
    },
    {
      term: 'Appreciation',
      definition: 'An increase in property value over time due to market conditions, improvements, or neighborhood development.',
      letter: 'A'
    },
    {
      term: 'Assessed Value',
      definition: 'The value of a property as determined by local government assessors for property tax purposes, which may differ from market value.',
      letter: 'A'
    },
    {
      term: 'Buyer\u2019s Agent',
      definition: 'A real estate professional who represents the buyer in a transaction and helps negotiate the best terms and price.',
      letter: 'B'
    },
    {
      term: 'Closing Costs',
      definition: 'Fees and expenses paid at the time of closing a real estate transaction, including appraisal, title insurance, and loan origination fees.',
      letter: 'C'
    },
    {
      term: 'Closing Disclosure',
      definition: 'A three-page document provided to borrowers before closing that outlines final loan terms, monthly payments, and closing costs.',
      letter: 'C'
    },
    {
      term: 'Commission',
      definition: 'The compensation earned by real estate agents, typically a percentage of the sale price, split between buyer and seller agents.',
      letter: 'C'
    },
    {
      term: 'Comparable Properties',
      definition: 'Recently sold properties similar in size, condition, and location used to determine the fair market value of a subject property.',
      letter: 'C'
    },
    {
      term: 'Contingency',
      definition: 'A condition that must be met for a purchase agreement to be binding, such as passing inspection or securing financing.',
      letter: 'C'
    },
    {
      term: 'Deed',
      definition: 'A legal document that transfers property ownership from the seller to the buyer, recorded in public property records.',
      letter: 'D'
    },
    {
      term: 'Depreciation',
      definition: 'A decrease in property value over time due to wear, obsolescence, or unfavorable market conditions.',
      letter: 'D'
    },
    {
      term: 'Down Payment',
      definition: 'The initial amount of money a buyer pays toward the purchase price, with the remainder financed through a mortgage.',
      letter: 'D'
    },
    {
      term: 'Earnest Money',
      definition: 'A deposit made by the buyer to demonstrate serious intent to purchase, typically held in escrow until closing.',
      letter: 'E'
    },
    {
      term: 'Easement',
      definition: 'A legal right granted to someone other than the property owner to use the property for a specific purpose, such as utility lines.',
      letter: 'E'
    },
    {
      term: 'Equity',
      definition: 'The difference between a property\u2019s market value and the outstanding mortgage balance, representing the owner\u2019s stake.',
      letter: 'E'
    },
    {
      term: 'Escrow',
      definition: 'A neutral third party holding funds and documents during a transaction until all conditions are met and closing occurs.',
      letter: 'E'
    },
    {
      term: 'Fair Market Value',
      definition: 'The price at which a property would sell between an informed buyer and seller, neither under pressure to buy or sell.',
      letter: 'F'
    },
    {
      term: 'FHA Loan',
      definition: 'A Federal Housing Administration-insured mortgage with flexible credit and down payment requirements, popular for first-time buyers.',
      letter: 'F'
    },
    {
      term: 'Fixed-Rate Mortgage',
      definition: 'A loan where the interest rate remains constant throughout the entire loan term, providing predictable monthly payments.',
      letter: 'F'
    },
    {
      term: 'Flood Plain',
      definition: 'An area of land designated by FEMA as having a high risk of flooding, often requiring special insurance and construction standards.',
      letter: 'F'
    },
    {
      term: 'Foreclosure',
      definition: 'A legal process where a lender takes possession of a property when the borrower defaults on mortgage payments.',
      letter: 'F'
    },
    {
      term: 'Homeowners Association',
      definition: 'An HOA is an organization in a subdivision governing rules, collecting fees, and maintaining common areas and property values.',
      letter: 'H'
    },
    {
      term: 'Home Inspection',
      definition: 'A professional evaluation of a property\u2019s structural and mechanical condition, typically ordered by the buyer during the contingency period.',
      letter: 'H'
    },
    {
      term: 'Home Warranty',
      definition: 'A service contract covering repairs or replacement of major home systems and appliances, typically covering one year from purchase.',
      letter: 'H'
    },
    {
      term: 'Interest Rate',
      definition: 'The percentage of the loan amount charged annually by the lender as the cost of borrowing money.',
      letter: 'I'
    },
    {
      term: 'Inspection Period',
      definition: 'The timeframe in a purchase agreement during which the buyer may conduct inspections and negotiate repairs or credits.',
      letter: 'I'
    },
    {
      term: 'Lien',
      definition: 'A legal claim against a property as security for unpaid debts, such as tax liens or mechanic\u2019s liens.',
      letter: 'L'
    },
    {
      term: 'Listing Agreement',
      definition: 'A contract between a homeowner and real estate agent outlining terms, commission, and marketing responsibilities.',
      letter: 'L'
    },
    {
      term: 'Loan-to-Value Ratio',
      definition: 'The LTV compares the mortgage amount to the property value, with lower ratios indicating less risk and better loan terms.',
      letter: 'L'
    },
    {
      term: 'MLS',
      definition: 'The Multiple Listing Service is a database where real estate agents list properties for sale, widely used to market homes.',
      letter: 'M'
    },
    {
      term: 'Mortgage',
      definition: 'A loan used to purchase real estate, secured by the property itself, typically repaid over 15 to 30 years.',
      letter: 'M'
    },
    {
      term: 'Offer',
      definition: 'A formal proposal from a buyer to purchase a property at a specific price and terms, subject to acceptance by the seller.',
      letter: 'O'
    },
    {
      term: 'PMI',
      definition: 'Private Mortgage Insurance protects lenders when a buyer makes a down payment of less than 20 percent.',
      letter: 'P'
    },
    {
      term: 'Pre-Approval',
      definition: 'A lender\u2019s conditional commitment to loan a specific amount based on a credit check, income verification, and assets.',
      letter: 'P'
    },
    {
      term: 'Pre-Qualification',
      definition: 'An informal estimate of how much a buyer can borrow, based on self-reported financial information, not verified.',
      letter: 'P'
    },
    {
      term: 'Principal',
      definition: 'The original amount borrowed in a loan, separate from interest, that decreases with each mortgage payment.',
      letter: 'P'
    },
    {
      term: 'Property Tax',
      definition: 'An annual tax paid by property owners to local government, based on assessed property value, used for schools and services.',
      letter: 'P'
    },
    {
      term: 'REIT',
      definition: 'A Real Estate Investment Trust is a company owning and managing income-producing properties, allowing investors to buy shares.',
      letter: 'R'
    },
    {
      term: 'Title',
      definition: 'Legal ownership of a property, confirmed through a deed and title search, transferred to the buyer at closing.',
      letter: 'T'
    },
    {
      term: 'Title Insurance',
      definition: 'Insurance protecting the buyer or lender against financial loss from defects in the property title or ownership.',
      letter: 'T'
    },
    {
      term: 'Title Search',
      definition: 'A review of public property records to verify clear ownership and identify any liens, easements, or other encumbrances.',
      letter: 'T'
    },
    {
      term: 'Underwriting',
      definition: 'The process where a lender evaluates a borrower\u2019s creditworthiness, income, and assets to decide whether to approve a loan.',
      letter: 'U'
    },
    {
      term: 'VA Loan',
      definition: 'A U.S. Department of Veterans Affairs mortgage available to eligible veterans with favorable terms and no down payment required.',
      letter: 'V'
    }
  ];

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  const filteredTerms = glossaryTerms.filter((item) => {
    const matchesSearch = item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.definition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLetter = !selectedLetter || item.letter === selectedLetter;
    return matchesSearch && matchesLetter;
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      setSubmitted(true);
      setFormData({ name: '', email: '' });
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <article style={{
      backgroundColor: 'var(--le-bg)',
      color: 'var(--le-text)',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      lineHeight: '1.6'
    }}>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, var(--le-primary) 0%, rgba(59, 130, 246, 0.8) 100%)',
        color: 'white',
        padding: '60px 20px',
        textAlign: 'center',
        borderBottom: '4px solid var(--le-accent)'
      }}>
        <h1 style={{
          fontSize: '48px',
          fontWeight: 'bold',
          marginBottom: '16px',
          letterSpacing: '-1px'
        }}>
          Real Estate Glossary
        </h1>
        <p style={{
          fontSize: '20px',
          opacity: 0.95,
          maxWidth: '600px',
          margin: '0 auto',
          fontWeight: '300'
        }}>
          Master essential real estate terminology. Search, filter, and learn the definitions that power property transactions.
        </p>
      </section>

      {/* Search Section */}
      <section style={{
        padding: '40px 20px',
        backgroundColor: 'var(--le-card-bg)',
        borderBottom: '1px solid var(--le-border)'
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ marginBottom: '30px' }}>
            <label htmlFor="glossary-search" style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '600',
              marginBottom: '8px',
              color: 'var(--le-text)'
            }}>
              Search Glossary Terms
            </label>
            <div style={{ position: 'relative' }}>
              <input
                id="glossary-search"
                type="text"
                placeholder="Search by term or definition..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setSelectedLetter('');
                }}
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  paddingLeft: '40px',
                  fontSize: '16px',
                  border: '2px solid var(--le-border)',
                  borderRadius: '8px',
                  backgroundColor: 'white',
                  color: 'var(--le-text)',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.2s'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'var(--le-primary)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'var(--le-border)';
                }}
              />
              <svg style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '18px',
                height: '18px',
                color: 'var(--le-primary)'
              }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </div>
          </div>

          {/* Letter Navigation */}
          <div>
            <p style={{
              fontSize: '12px',
              fontWeight: '600',
              textTransform: 'uppercase',
              color: 'var(--le-text)',
              opacity: 0.7,
              marginBottom: '12px'
            }}>
              Filter by Letter
            </p>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px'
            }}>
              <button
                onClick={() => {
                  setSelectedLetter('');
                  setSearchTerm('');
                }}
                style={{
                  padding: '8px 12px',
                  fontSize: '14px',
                  fontWeight: '600',
                  border: '2px solid ' + (selectedLetter === '' ? 'var(--le-primary)' : 'var(--le-border)'),
                  backgroundColor: selectedLetter === '' ? 'var(--le-primary)' : 'white',
                  color: selectedLetter === '' ? 'white' : 'var(--le-text)',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  if (selectedLetter !== '') {
                    e.currentTarget.style.borderColor = 'var(--le-primary)';
                    e.currentTarget.style.backgroundColor = 'var(--le-hover)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedLetter !== '') {
                    e.currentTarget.style.borderColor = 'var(--le-border)';
                    e.currentTarget.style.backgroundColor = 'white';
                  }
                }}
              >
                All
              </button>
              {alphabet.map((letter) => (
                <button
                  key={letter}
                  onClick={() => {
                    setSelectedLetter(letter);
                    setSearchTerm('');
                  }}
                  style={{
                    padding: '8px 12px',
                    fontSize: '14px',
                    fontWeight: '600',
                    border: '2px solid ' + (selectedLetter === letter ? 'var(--le-primary)' : 'var(--le-border)'),
                    backgroundColor: selectedLetter === letter ? 'var(--le-primary)' : 'white',
                    color: selectedLetter === letter ? 'white' : 'var(--le-text)',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    if (selectedLetter !== letter) {
                      e.currentTarget.style.borderColor = 'var(--le-primary)';
                      e.currentTarget.style.backgroundColor = 'var(--le-hover)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedLetter !== letter) {
                      e.currentTarget.style.borderColor = 'var(--le-border)';
                      e.currentTarget.style.backgroundColor = 'white';
                    }
                  }}
                >
                  {letter}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Glossary Terms */}
      <section style={{
        padding: '40px 20px',
        maxWidth: '900px',
        margin: '0 auto'
      }}>
        {filteredTerms.length > 0 ? (
          <div>
            <p style={{
              fontSize: '14px',
              color: 'var(--le-text)',
              opacity: 0.7,
              marginBottom: '24px'
            }}>
              Showing {filteredTerms.length} term{filteredTerms.length !== 1 ? 's' : ''}
            </p>
            <div style={{
              display: 'grid',
              gap: '16px'
            }}>
              {filteredTerms.map((item, idx) => (
                <article
                  key={idx}
                  style={{
                    padding: '20px',
                    backgroundColor: 'var(--le-card-bg)',
                    border: '1px solid var(--le-border)',
                    borderRadius: '8px',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                    e.currentTarget.style.borderColor = 'var(--le-primary)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.borderColor = 'var(--le-border)';
                  }}
                >
                  <h3 style={{
                    fontSize: '20px',
                    fontWeight: '700',
                    color: 'var(--le-primary)',
                    marginBottom: '8px'
                  }}>
                    {item.term}
                  </h3>
                  <p style={{
                    fontSize: '16px',
                    lineHeight: '1.7',
                    color: 'var(--le-text)'
                  }}>
                    {item.definition}
                  </p>
                </article>
              ))}
            </div>
          </div>
        ) : (
          <div style={{
            padding: '40px 20px',
            textAlign: 'center',
            backgroundColor: 'var(--le-card-bg)',
            borderRadius: '8px',
            border: '1px solid var(--le-border)'
          }}>
            <p style={{
              fontSize: '18px',
              color: 'var(--le-text)',
              opacity: 0.6
            }}>
              No terms found. Try adjusting your search or filter.
            </p>
          </div>
        )}
      </section>

      {/* Lead Capture CTA */}
      <section style={{
        backgroundColor: 'var(--le-primary)',
        color: 'white',
        padding: '50px 20px',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '32px',
            fontWeight: 'bold',
            marginBottom: '12px'
          }}>
            Ready to Start Your Real Estate Journey?
          </h2>
          <p style={{
            fontSize: '18px',
            opacity: 0.95,
            marginBottom: '30px',
            fontWeight: '300'
          }}>
            Get a free consultation and discover how we can help you navigate the market with confidence.
          </p>

          {submitted ? (
            <div style={{
              padding: '16px',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.4)'
            }}>
              <p style={{
                fontSize: '16px',
                fontWeight: '600',
                margin: 0
              }}>
                Thank you! We\u2019ll be in touch shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleFormChange}
                required
                style={{
                  padding: '12px 16px',
                  fontSize: '16px',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: '6px',
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  color: 'var(--le-text)',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.2s'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'white';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                }}
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleFormChange}
                required
                style={{
                  padding: '12px 16px',
                  fontSize: '16px',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: '6px',
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  color: 'var(--le-text)',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.2s'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'white';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                }}
              />
              <button
                type="submit"
                style={{
                  padding: '14px 32px',
                  fontSize: '16px',
                  fontWeight: '700',
                  backgroundColor: 'var(--le-accent)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                Get Free Consultation
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer Info */}
      <section style={{
        padding: '40px 20px',
        backgroundColor: 'var(--le-card-bg)',
        borderTop: '1px solid var(--le-border)'
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{
            fontSize: '14px',
            color: 'var(--le-text)',
            opacity: 0.7,
            lineHeight: '1.8'
          }}>
            This glossary provides general real estate terminology. For property-specific advice or legal guidance, consult with a licensed real estate professional or attorney. Definitions are simplified for educational purposes.
          </p>
        </div>
      </section>
    </article>
  );
}
