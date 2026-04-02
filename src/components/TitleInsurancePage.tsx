'use client';

import React, { useState } from 'react';

export default function TitleInsurancePage() {
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [quoteFormData, setQuoteFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    propertyLocation: '',
    purchasePrice: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleQuoteFormChange = (field: string, value: string) => {
    setQuoteFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setQuoteFormData({
        fullName: '',
        email: '',
        phone: '',
        propertyLocation: '',
        purchasePrice: '',
      });
      setFormSubmitted(false);
    }, 3000);
  };

  const faqs = [
    {
      question: 'What\u2019s the difference between an owner\u2019s and a lender\u2019s title policy?',
      answer:
        'An owner\u2019s policy protects your equity in the property and lasts as long as you own it. A lender\u2019s policy protects the lender\u2019s interest and is required by most mortgage lenders. Both policies are typically issued at the same time for a one-time premium.',
    },
    {
      question: 'Can I shop around for title insurance?',
      answer:
        'Yes, you can shop around and compare quotes from different title companies. Rates are often regulated by state, but companies may offer different services, customer support, and closing coordination options. It\u2019s worth getting multiple quotes.',
    },
    {
      question: 'How long does the title search process take?',
      answer:
        'A standard title search typically takes 3-7 business days, depending on the property location and the title company\u2019s workload. Rush searches may be available for an additional fee if you need faster results.',
    },
    {
      question: 'What happens if a title issue is discovered during the search?',
      answer:
        'If a title defect is found, the title company will work to resolve it before issuing the policy. This may involve obtaining a waiver, clearing a lien, correcting records, or getting clarification. Most issues are resolved before closing.',
    },
    {
      question: 'Is title insurance required by law?',
      answer:
        'Owner\u2019s title insurance is not required by law, but it\u2019s strongly recommended for protection. Lender\u2019s title insurance is required by virtually all mortgage lenders as a condition of the loan.',
    },
    {
      question: 'Can I file a claim years after closing?',
      answer:
        'Yes, you can file a claim at any time during your ownership if a covered title defect is discovered. There\u2019s no time limit on most owner\u2019s policies, which is one reason title insurance is such valuable long-term protection.',
    },
    {
      question: 'Are there any title issues that aren\u2019t covered?',
      answer:
        'Standard title policies don\u2019t cover issues you knew about before purchasing, defects created by you after closing, environmental liens, or easements that would be visible during a property inspection. Enhanced policies may cover additional items.',
    },
    {
      question: 'What if I buy a new construction home?',
      answer:
        'New construction homes still need title insurance. The builder or developer typically obtains a title policy to verify clear ownership of the land before development. You\u2019ll still get your own owner\u2019s and lender\u2019s policies.',
    },
  ];

  const coveredIssues = [
    {
      icon: '⚠️',
      title: 'Liens and Encumbrances',
      description:
        'Protection against unpaid property taxes, mortgage liens, judgment liens, or HOA liens that weren\u2019t disclosed.',
    },
    {
      icon: '✍️',
      title: 'Forgery and Fraud',
      description:
        'Coverage if a previous owner forged documents or fraudulently transferred the property without proper authority.',
    },
    {
      icon: '📋',
      title: 'Recording Errors',
      description:
        'Protection against mistakes in public records, such as documents filed under the wrong name or property description.',
    },
    {
      icon: '👥',
      title: 'Undisclosed Heirs',
      description:
        'Coverage if an unknown heir to a previous owner later claims an interest in the property and challenges your ownership.',
    },
    {
      icon: '🚫',
      title: 'Invalid Deeds',
      description:
        'Protection if a deed is invalid due to improper execution, lack of authority, or failure to meet legal requirements.',
    },
    {
      icon: '🏘️',
      title: 'Boundary Disputes',
      description:
        'Coverage for disputes with neighbors about property boundary lines and easement encroachments.',
    },
    {
      icon: '📜',
      title: 'Missing Documents',
      description:
        'Protection if a required document is missing from the chain of title, creating a gap in ownership history.',
    },
    {
      icon: '💰',
      title: 'Unpaid Assessments',
      description:
        'Coverage against special assessments or HOA fees that weren\u2019t paid by the previous owner and now are your responsibility.',
    },
    {
      icon: '🔍',
      title: 'Defective Titles',
      description:
        'Protection against any defect in the title that wasn\u2019t discovered during the title search process.',
    },
    {
      icon: '⚖️',
      title: 'Statutory Liens',
      description:
        'Coverage for liens imposed by law, such as mechanic\u2019s liens, tax liens, or judgment liens filed against the property.',
    },
  ];

  const commonIssues = [
    {
      name: 'Outstanding Liens',
      description:
        'Unpaid mortgages, property taxes, or contractor bills create liens on the property. The title company works to ensure these are paid off at closing.',
    },
    {
      name: 'Boundary and Survey Issues',
      description:
        'A survey may reveal that structures or improvements encroach on neighboring property. Easements may also be discovered that affect your use of the land.',
    },
    {
      name: 'Clerical Errors in Public Records',
      description:
        'Names may be misspelled, descriptions inaccurate, or documents misfiled. These errors can cloud title and must be corrected.',
    },
    {
      name: 'Missing or Defective Deeds',
      description:
        'A break in the chain of title occurs when a deed is missing from the public record or was improperly recorded, creating a gap in ownership history.',
    },
    {
      name: 'Undisclosed Heirs',
      description:
        'If a previous owner died without a will and the estate wasn\u2019t properly settled, unknown heirs may have a claim to the property.',
    },
    {
      name: 'HOA or Covenant Issues',
      description:
        'Restrictive covenants on the property may limit how you can use it. Unpaid HOA fees or special assessments may also be discovered.',
    },
    {
      name: 'Judgment Liens and Tax Issues',
      description:
        'Unpaid taxes or court judgments against the previous owner may create liens that attach to the property.',
    },
    {
      name: 'Fraudulent or Forged Documents',
      description:
        'In rare cases, a previous owner may have forged documents or committed fraud to transfer the property. Title insurance protects you from this liability.',
    },
  ];

  const myths = [
    {
      myth: 'Title insurance is like homeowner\u2019s insurance and covers physical damage.',
      reality:
        'Title insurance only protects against ownership and legal issues, not physical damage or defects in the structure itself.',
    },
    {
      myth: 'Once a home is sold, there are no title issues to worry about.',
      reality:
        'Title defects can be discovered years after purchase. Title insurance protects you for as long as you own the property.',
    },
    {
      myth: 'Title insurance is too expensive and not worth the cost.',
      reality:
        'A one-time premium typically costs 0.5-1% of the purchase price and provides lifetime coverage. This is a small price for significant protection.',
    },
    {
      myth: 'All title insurance companies charge the same price.',
      reality:
        'While rates are often regulated, companies may offer different prices, services, and bundled closing services. Shopping around can save you money.',
    },
    {
      myth: 'A real estate agent or realtor checks the title, so title insurance is unnecessary.',
      reality:
        'Real estate agents facilitate the sale but don\u2019t examine title records. That\u2019s the job of a professional title company with legal expertise.',
    },
    {
      myth: 'New construction homes don\u2019t need title insurance because the builder is responsible.',
      reality:
        'New construction properties still require title insurance to protect against defects in the builder\u2019s ownership of the land and any liens on the property.',
    },
  ];

  return (
    <div style={{ backgroundColor: 'var(--le-bg)', color: 'var(--le-text)' }}>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: 'LeadEngine Title Insurance Guide',
            description: 'Complete guide to understanding title insurance for real estate',
            url: 'https://realtyclientengine.app/title-insurance',
            serviceType: 'Title Insurance Information',
            areaServed: 'US',
          }),
        }}
      />

      {/* Hero Section */}
      <section
        style={{
          backgroundColor: 'var(--le-primary)',
          color: 'white',
          padding: '80px 20px',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h1
            style={{
              fontSize: '48px',
              fontWeight: 'bold',
              marginBottom: '20px',
              lineHeight: '1.2',
            }}
          >
            Understanding Title Insurance
          </h1>
          <p
            style={{
              fontSize: '20px',
              marginBottom: '30px',
              opacity: 0.95,
              lineHeight: '1.6',
            }}
          >
            Protect your real estate investment with comprehensive title insurance coverage. Learn how to safeguard your property ownership against legal and financial risks.
          </p>
          <button
            onClick={() => {
              const element = document.getElementById('quote-section');
              element?.scrollIntoView({ behavior: 'smooth' });
            }}
            style={{
              backgroundColor: 'white',
              color: 'var(--le-primary)',
              padding: '14px 32px',
              fontSize: '16px',
              fontWeight: 'bold',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              transition: 'transform 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            Get Title Insurance Quotes
          </button>
        </div>
      </section>

      {/* What is Title Insurance Section */}
      <section
        style={{
          padding: '60px 20px',
          maxWidth: '1000px',
          margin: '0 auto',
          borderBottom: '1px solid var(--le-border)',
        }}
      >
        <h2
          style={{
            fontSize: '36px',
            fontWeight: 'bold',
            marginBottom: '30px',
            color: 'var(--le-text)',
          }}
        >
          What is Title Insurance?
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '30px',
            marginBottom: '40px',
          }}
        >
          <div style={{ backgroundColor: 'var(--le-bg-card)', padding: '25px', borderRadius: '8px' }}>
            <h3
              style={{
                fontSize: '18px',
                fontWeight: 'bold',
                marginBottom: '12px',
                color: 'var(--le-primary)',
              }}
            >
              A One-Time Premium
            </h3>
            <p style={{ color: 'var(--le-text-secondary)', lineHeight: '1.6' }}>
              Unlike other insurance that you pay annually, title insurance is a one-time premium paid at closing. You get lifelong protection for a single payment.
            </p>
          </div>
          <div style={{ backgroundColor: 'var(--le-bg-card)', padding: '25px', borderRadius: '8px' }}>
            <h3
              style={{
                fontSize: '18px',
                fontWeight: 'bold',
                marginBottom: '12px',
                color: 'var(--le-primary)',
              }}
            >
              Legal Protection, Not Physical
            </h3>
            <p style={{ color: 'var(--le-text-secondary)', lineHeight: '1.6' }}>
              Title insurance protects against ownership and legal issues, not physical damage to the structure. It safeguards your right to own and use the property.
            </p>
          </div>
          <div style={{ backgroundColor: 'var(--le-bg-card)', padding: '25px', borderRadius: '8px' }}>
            <h3
              style={{
                fontSize: '18px',
                fontWeight: 'bold',
                marginBottom: '12px',
                color: 'var(--le-primary)',
              }}
            >
              Required by Lenders
            </h3>
            <p style={{ color: 'var(--le-text-secondary)', lineHeight: '1.6' }}>
              Your mortgage lender will require a lender\u2019s title policy as a condition of financing. An owner\u2019s policy is optional but highly recommended.
            </p>
          </div>
        </div>
        <p style={{ fontSize: '16px', lineHeight: '1.8', color: 'var(--le-text)' }}>
          Title insurance is a form of indemnity insurance that protects property owners and lenders against financial loss due to defects in the title to real property. Unlike most insurance policies, you pay a one-time premium at closing and receive coverage that lasts as long as you own the property. This makes it one of the most cost-effective insurance products available for real estate transactions.
        </p>
      </section>

      {/* Owner vs Lender Policy Section */}
      <section
        style={{
          padding: '60px 20px',
          maxWidth: '1000px',
          margin: '0 auto',
          borderBottom: '1px solid var(--le-border)',
        }}
      >
        <h2
          style={{
            fontSize: '36px',
            fontWeight: 'bold',
            marginBottom: '30px',
            color: 'var(--le-text)',
          }}
        >
          Owner Policy vs. Lender Policy
        </h2>
        <div
          style={{
            overflowX: 'auto',
            borderRadius: '8px',
            backgroundColor: 'var(--le-bg-card)',
          }}
        >
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              minWidth: '500px',
            }}
          >
            <thead>
              <tr style={{ backgroundColor: 'var(--le-primary)', color: 'white' }}>
                <th style={{ padding: '16px', textAlign: 'left', fontWeight: 'bold' }}>Feature</th>
                <th style={{ padding: '16px', textAlign: 'left', fontWeight: 'bold' }}>
                  Owner Policy
                </th>
                <th style={{ padding: '16px', textAlign: 'left', fontWeight: 'bold' }}>
                  Lender Policy
                </th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--le-border)' }}>
                <td style={{ padding: '14px', fontWeight: 'bold' }}>Protects</td>
                <td style={{ padding: '14px' }}>Your equity in the property</td>
                <td style={{ padding: '14px' }}>Lender\u2019s investment in the loan</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--le-border)', backgroundColor: 'rgba(0,0,0,0.02)' }}>
                <td style={{ padding: '14px', fontWeight: 'bold' }}>Duration</td>
                <td style={{ padding: '14px' }}>As long as you own the property</td>
                <td style={{ padding: '14px' }}>Until the loan is paid off</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--le-border)' }}>
                <td style={{ padding: '14px', fontWeight: 'bold' }}>Cost</td>
                <td style={{ padding: '14px' }}>Typically 0.5-1% of purchase price</td>
                <td style={{ padding: '14px' }}>Typically 0.3-0.8% of loan amount</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--le-border)', backgroundColor: 'rgba(0,0,0,0.02)' }}>
                <td style={{ padding: '14px', fontWeight: 'bold' }}>Required</td>
                <td style={{ padding: '14px' }}>No, but strongly recommended</td>
                <td style={{ padding: '14px' }}>Yes, required by all lenders</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--le-border)' }}>
                <td style={{ padding: '14px', fontWeight: 'bold' }}>Claim Limit</td>
                <td style={{ padding: '14px' }}>Your full equity investment</td>
                <td style={{ padding: '14px' }}>Outstanding loan balance</td>
              </tr>
              <tr style={{ backgroundColor: 'rgba(0,0,0,0.02)' }}>
                <td style={{ padding: '14px', fontWeight: 'bold' }}>Who Pays</td>
                <td style={{ padding: '14px' }}>Buyer pays for owner policy</td>
                <td style={{ padding: '14px' }}>Buyer pays for lender policy</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div
          style={{
            backgroundColor: 'var(--le-bg-card)',
            padding: '20px',
            borderRadius: '8px',
            marginTop: '25px',
            borderLeft: '4px solid var(--le-accent)',
          }}
        >
          <p style={{ color: 'var(--le-text)', lineHeight: '1.7' }}>
            Both policies are typically issued at the same time from the same title company. Since the searches and work are done once, getting both policies at the same time is more efficient and cost-effective than obtaining them separately.
          </p>
        </div>
      </section>

      {/* What Title Insurance Covers Section */}
      <section
        style={{
          padding: '60px 20px',
          maxWidth: '1000px',
          margin: '0 auto',
          borderBottom: '1px solid var(--le-border)',
        }}
      >
        <h2
          style={{
            fontSize: '36px',
            fontWeight: 'bold',
            marginBottom: '30px',
            color: 'var(--le-text)',
          }}
        >
          What Title Insurance Covers
        </h2>
        <p
          style={{
            fontSize: '16px',
            marginBottom: '30px',
            color: 'var(--le-text-secondary)',
            lineHeight: '1.7',
          }}
        >
          Title insurance protects you against a wide range of title defects and ownership issues. Here are the main areas of coverage:
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '25px',
          }}
        >
          {coveredIssues.map((issue, index) => (
            <div
              key={index}
              style={{
                backgroundColor: 'var(--le-bg-card)',
                padding: '22px',
                borderRadius: '8px',
                borderTop: '3px solid var(--le-accent)',
              }}
            >
              <div style={{ fontSize: '28px', marginBottom: '12px' }}>{issue.icon}</div>
              <h3
                style={{
                  fontSize: '16px',
                  fontWeight: 'bold',
                  marginBottom: '10px',
                  color: 'var(--le-primary)',
                }}
              >
                {issue.title}
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--le-text-secondary)', lineHeight: '1.6' }}>
                {issue.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Title Search Process Section */}
      <section
        style={{
          padding: '60px 20px',
          maxWidth: '1000px',
          margin: '0 auto',
          borderBottom: '1px solid var(--le-border)',
          backgroundColor: 'var(--le-bg-card)',
        }}
      >
        <h2
          style={{
            fontSize: '36px',
            fontWeight: 'bold',
            marginBottom: '30px',
            color: 'var(--le-text)',
          }}
        >
          The Title Search Process
        </h2>
        <p
          style={{
            fontSize: '16px',
            marginBottom: '30px',
            color: 'var(--le-text-secondary)',
            lineHeight: '1.7',
          }}
        >
          Title insurance begins with a thorough title search. Here\u2019s how the process works:
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', gap: '20px' }}>
            <div
              style={{
                backgroundColor: 'var(--le-primary)',
                color: 'white',
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                fontSize: '20px',
                flexShrink: 0,
              }}
            >
              1
            </div>
            <div>
              <h3
                style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  marginBottom: '8px',
                  color: 'var(--le-text)',
                }}
              >
                Examination of Public Records
              </h3>
              <p style={{ color: 'var(--le-text-secondary)', lineHeight: '1.6' }}>
                The title company searches the property deed records, mortgage records, judgment records, tax records, and other public documents at the county courthouse.
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <div
              style={{
                backgroundColor: 'var(--le-primary)',
                color: 'white',
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                fontSize: '20px',
                flexShrink: 0,
              }}
            >
              2
            </div>
            <div>
              <h3
                style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  marginBottom: '8px',
                  color: 'var(--le-text)',
                }}
              >
                Review of Title History
              </h3>
              <p style={{ color: 'var(--le-text-secondary)', lineHeight: '1.6' }}>
                They trace the chain of ownership backward, typically several decades or more, to verify that each transfer was valid and properly recorded.
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <div
              style={{
                backgroundColor: 'var(--le-primary)',
                color: 'white',
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                fontSize: '20px',
                flexShrink: 0,
              }}
            >
              3
            </div>
            <div>
              <h3
                style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  marginBottom: '8px',
                  color: 'var(--le-text)',
                }}
              >
                Identification of Issues
              </h3>
              <p style={{ color: 'var(--le-text-secondary)', lineHeight: '1.6' }}>
                If defects are found, the title company identifies them in a preliminary title report and works to resolve them before closing.
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <div
              style={{
                backgroundColor: 'var(--le-primary)',
                color: 'white',
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                fontSize: '20px',
                flexShrink: 0,
              }}
            >
              4
            </div>
            <div>
              <h3
                style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  marginBottom: '8px',
                  color: 'var(--le-text)',
                }}
              >
                Issuance of Title Policy
              </h3>
              <p style={{ color: 'var(--le-text-secondary)', lineHeight: '1.6' }}>
                Once all issues are resolved or exceptions are noted, the title company issues the final title insurance policy protecting the owner and lender.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Common Title Issues Section */}
      <section
        style={{
          padding: '60px 20px',
          maxWidth: '1000px',
          margin: '0 auto',
          borderBottom: '1px solid var(--le-border)',
        }}
      >
        <h2
          style={{
            fontSize: '36px',
            fontWeight: 'bold',
            marginBottom: '30px',
            color: 'var(--le-text)',
          }}
        >
          Common Title Issues Found During Search
        </h2>
        <p
          style={{
            fontSize: '16px',
            marginBottom: '30px',
            color: 'var(--le-text-secondary)',
            lineHeight: '1.7',
          }}
        >
          During a title search, title companies frequently encounter various issues that must be resolved or insured against. Here are the most common:
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {commonIssues.map((issue, index) => (
            <div
              key={index}
              style={{
                backgroundColor: 'var(--le-bg-card)',
                padding: '20px',
                borderRadius: '8px',
                borderLeft: '4px solid var(--le-warning)',
              }}
            >
              <h3
                style={{
                  fontSize: '17px',
                  fontWeight: 'bold',
                  marginBottom: '8px',
                  color: 'var(--le-text)',
                }}
              >
                {issue.name}
              </h3>
              <p style={{ color: 'var(--le-text-secondary)', lineHeight: '1.6' }}>
                {issue.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Cost Guide Section */}
      <section
        style={{
          padding: '60px 20px',
          maxWidth: '1000px',
          margin: '0 auto',
          borderBottom: '1px solid var(--le-border)',
          backgroundColor: 'var(--le-bg-card)',
        }}
      >
        <h2
          style={{
            fontSize: '36px',
            fontWeight: 'bold',
            marginBottom: '30px',
            color: 'var(--le-text)',
          }}
        >
          Title Insurance Cost Guide
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px', marginBottom: '30px' }}>
          <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '8px' }}>
            <h3
              style={{
                fontSize: '18px',
                fontWeight: 'bold',
                marginBottom: '12px',
                color: 'var(--le-primary)',
              }}
            >
              Premium Calculation
            </h3>
            <p style={{ color: 'var(--le-text-secondary)', lineHeight: '1.6' }}>
              Title insurance premiums are typically calculated as a percentage of the property purchase price or loan amount. Rates are often set by state statute but may vary by location and company.
            </p>
          </div>
          <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '8px' }}>
            <h3
              style={{
                fontSize: '18px',
                fontWeight: 'bold',
                marginBottom: '12px',
                color: 'var(--le-primary)',
              }}
            >
              Typical Cost Range
            </h3>
            <p style={{ color: 'var(--le-text-secondary)', lineHeight: '1.6' }}>
              Owner\u2019s policies typically cost 0.5-1% of the purchase price, while lender\u2019s policies cost 0.3-0.8%. Both policies combined usually cost under 1% of the property value.
            </p>
          </div>
          <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '8px' }}>
            <h3
              style={{
                fontSize: '18px',
                fontWeight: 'bold',
                marginBottom: '12px',
                color: 'var(--le-accent)',
              }}
            >
              Simultaneous Issue Discount
            </h3>
            <p style={{ color: 'var(--le-text-secondary)', lineHeight: '1.6' }}>
              When both owner and lender policies are issued together, you typically receive a discount on the combined premium since the title work is done only once.
            </p>
          </div>
        </div>
        <div
          style={{
            backgroundColor: 'white',
            padding: '25px',
            borderRadius: '8px',
            borderLeft: '4px solid var(--le-success)',
          }}
        >
          <h3
            style={{
              fontSize: '18px',
              fontWeight: 'bold',
              marginBottom: '12px',
              color: 'var(--le-text)',
            }}
          >
            Example Costs by Property Value
          </h3>
          <div style={{ fontSize: '14px', color: 'var(--le-text-secondary)', lineHeight: '1.8' }}>
            <p>250,000 property: approximately 1,250-2,500 for both policies combined</p>
            <p>500,000 property: approximately 2,500-5,000 for both policies combined</p>
            <p>1,000,000 property: approximately 5,000-10,000 for both policies combined</p>
          </div>
          <p style={{ marginTop: '15px', color: 'var(--le-text)', fontSize: '14px' }}>
            Note: Actual costs vary by location, property type, and title company. Always get quotes from multiple providers to compare.
          </p>
        </div>
      </section>

      {/* Claims Process Section */}
      <section
        style={{
          padding: '60px 20px',
          maxWidth: '1000px',
          margin: '0 auto',
          borderBottom: '1px solid var(--le-border)',
        }}
      >
        <h2
          style={{
            fontSize: '36px',
            fontWeight: 'bold',
            marginBottom: '30px',
            color: 'var(--le-text)',
          }}
        >
          How to File a Title Insurance Claim
        </h2>
        <div
          style={{
            backgroundColor: 'var(--le-bg-card)',
            padding: '30px',
            borderRadius: '8px',
            marginBottom: '30px',
          }}
        >
          <p style={{ color: 'var(--le-text-secondary)', lineHeight: '1.7', marginBottom: '20px' }}>
            If you discover a title issue that\u2019s covered by your title insurance policy, you can file a claim. Here\u2019s what to expect:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <h3
                style={{
                  fontSize: '16px',
                  fontWeight: 'bold',
                  marginBottom: '8px',
                  color: 'var(--le-primary)',
                }}
              >
                Step 1: Notify Your Title Company
              </h3>
              <p style={{ color: 'var(--le-text-secondary)', lineHeight: '1.6' }}>
                Contact your title insurance company as soon as you discover a potential covered issue. Most companies have a claims department that handles inquiries.
              </p>
            </div>
            <div>
              <h3
                style={{
                  fontSize: '16px',
                  fontWeight: 'bold',
                  marginBottom: '8px',
                  color: 'var(--le-primary)',
                }}
              >
                Step 2: Provide Documentation
              </h3>
              <p style={{ color: 'var(--le-text-secondary)', lineHeight: '1.6' }}>
                Submit relevant documents including your title insurance policy, proof of the issue (such as a lien notice or boundary survey), and any correspondence about the problem.
              </p>
            </div>
            <div>
              <h3
                style={{
                  fontSize: '16px',
                  fontWeight: 'bold',
                  marginBottom: '8px',
                  color: 'var(--le-primary)',
                }}
              >
                Step 3: Investigation
              </h3>
              <p style={{ color: 'var(--le-text-secondary)', lineHeight: '1.6' }}>
                The title company will investigate the claim to determine if it\u2019s covered under your policy. They may hire attorneys or specialists to analyze the issue.
              </p>
            </div>
            <div>
              <h3
                style={{
                  fontSize: '16px',
                  fontWeight: 'bold',
                  marginBottom: '8px',
                  color: 'var(--le-primary)',
                }}
              >
                Step 4: Resolution
              </h3>
              <p style={{ color: 'var(--le-text-secondary)', lineHeight: '1.6' }}>
                If the claim is approved, the title company will either fix the issue, pay you for the loss, or defend you in court. The process timeline depends on complexity.
              </p>
            </div>
          </div>
        </div>
        <div
          style={{
            backgroundColor: 'var(--le-bg-card)',
            padding: '20px',
            borderRadius: '8px',
            borderLeft: '4px solid var(--le-accent)',
          }}
        >
          <p style={{ color: 'var(--le-text)', lineHeight: '1.7' }}>
            There\u2019s no time limit on most owner\u2019s title insurance policies. You can file a claim at any point during your ownership if a covered defect is discovered. This is one reason title insurance is such valuable long-term protection.
          </p>
        </div>
      </section>

      {/* Title Company Selection Section */}
      <section
        style={{
          padding: '60px 20px',
          maxWidth: '1000px',
          margin: '0 auto',
          borderBottom: '1px solid var(--le-border)',
          backgroundColor: 'var(--le-bg-card)',
        }}
      >
        <h2
          style={{
            fontSize: '36px',
            fontWeight: 'bold',
            marginBottom: '30px',
            color: 'var(--le-text)',
          }}
        >
          How to Choose a Title Company
        </h2>
        <p
          style={{
            fontSize: '16px',
            marginBottom: '30px',
            color: 'var(--le-text-secondary)',
            lineHeight: '1.7',
          }}
        >
          Not all title companies are the same. Here\u2019s what to compare when selecting a title insurance provider:
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '25px' }}>
          <div style={{ backgroundColor: 'white', padding: '22px', borderRadius: '8px' }}>
            <h3
              style={{
                fontSize: '16px',
                fontWeight: 'bold',
                marginBottom: '12px',
                color: 'var(--le-primary)',
              }}
            >
              Get Multiple Quotes
            </h3>
            <p style={{ color: 'var(--le-text-secondary)', lineHeight: '1.6' }}>
              Contact at least 3-5 different title companies to compare rates, services, and closing coordination options. Price alone shouldn\u2019t be the only factor.
            </p>
          </div>
          <div style={{ backgroundColor: 'white', padding: '22px', borderRadius: '8px' }}>
            <h3
              style={{
                fontSize: '16px',
                fontWeight: 'bold',
                marginBottom: '12px',
                color: 'var(--le-primary)',
              }}
            >
              Check Experience and Reputation
            </h3>
            <p style={{ color: 'var(--le-text-secondary)', lineHeight: '1.6' }}>
              Look for companies with years of experience in your area. Check online reviews and ask for references from your real estate agent or lender.
            </p>
          </div>
          <div style={{ backgroundColor: 'white', padding: '22px', borderRadius: '8px' }}>
            <h3
              style={{
                fontSize: '16px',
                fontWeight: 'bold',
                marginBottom: '12px',
                color: 'var(--le-primary)',
              }}
            >
              Ask About Services
            </h3>
            <p style={{ color: 'var(--le-text-secondary)', lineHeight: '1.6' }}>
              Inquire about closing coordination, document preparation, electronic closing capabilities, and customer support. Some companies offer more value-added services.
            </p>
          </div>
          <div style={{ backgroundColor: 'white', padding: '22px', borderRadius: '8px' }}>
            <h3
              style={{
                fontSize: '16px',
                fontWeight: 'bold',
                marginBottom: '12px',
                color: 'var(--le-primary)',
              }}
            >
              Verify Licensing
            </h3>
            <p style={{ color: 'var(--le-text-secondary)', lineHeight: '1.6' }}>
              Confirm that the company is licensed in your state and backed by an underwriter. This ensures they meet regulatory requirements and financial standards.
            </p>
          </div>
          <div style={{ backgroundColor: 'white', padding: '22px', borderRadius: '8px' }}>
            <h3
              style={{
                fontSize: '16px',
                fontWeight: 'bold',
                marginBottom: '12px',
                color: 'var(--le-primary)',
              }}
            >
              Understand Policy Coverage
            </h3>
            <p style={{ color: 'var(--le-text-secondary)', lineHeight: '1.6' }}>
              Ask about standard vs. enhanced coverage options. Some companies offer expanded protection at a modest additional cost that\u2019s worth considering.
            </p>
          </div>
          <div style={{ backgroundColor: 'white', padding: '22px', borderRadius: '8px' }}>
            <h3
              style={{
                fontSize: '16px',
                fontWeight: 'bold',
                marginBottom: '12px',
                color: 'var(--le-primary)',
              }}
            >
              Check Closing Timeline
            </h3>
            <p style={{ color: 'var(--le-text-secondary)', lineHeight: '1.6' }}>
              Ask how long the title search will take and whether they can meet your closing timeline. Faster turnaround times matter in time-sensitive transactions.
            </p>
          </div>
        </div>
      </section>

      {/* Myths Debunked Section */}
      <section
        style={{
          padding: '60px 20px',
          maxWidth: '1000px',
          margin: '0 auto',
          borderBottom: '1px solid var(--le-border)',
        }}
      >
        <h2
          style={{
            fontSize: '36px',
            fontWeight: 'bold',
            marginBottom: '30px',
            color: 'var(--le-text)',
          }}
        >
          Myths About Title Insurance Debunked
        </h2>
        <p
          style={{
            fontSize: '16px',
            marginBottom: '30px',
            color: 'var(--le-text-secondary)',
            lineHeight: '1.7',
          }}
        >
          There are many misconceptions about title insurance. Here\u2019s the truth behind six common myths:
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {myths.map((item, index) => (
            <div
              key={index}
              style={{
                backgroundColor: 'var(--le-bg-card)',
                padding: '22px',
                borderRadius: '8px',
                borderTop: '3px solid var(--le-danger)',
              }}
            >
              <h3
                style={{
                  fontSize: '16px',
                  fontWeight: 'bold',
                  marginBottom: '10px',
                  color: 'var(--le-danger)',
                }}
              >
                Myth: {item.myth}
              </h3>
              <p style={{ color: 'var(--le-text-secondary)', lineHeight: '1.6' }}>
                Reality: {item.reality}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Quote Lead Capture Section */}
      <section
        id="quote-section"
        style={{
          padding: '60px 20px',
          maxWidth: '1000px',
          margin: '0 auto',
          borderBottom: '1px solid var(--le-border)',
          backgroundColor: 'var(--le-bg-card)',
        }}
      >
        <div
          style={{
            backgroundColor: 'var(--le-primary)',
            color: 'white',
            padding: '40px',
            borderRadius: '8px',
            marginBottom: '30px',
            textAlign: 'center',
          }}
        >
          <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '12px' }}>
            Ready to Protect Your Real Estate Investment?
          </h2>
          <p style={{ fontSize: '16px', marginBottom: '0', opacity: 0.95 }}>
            Get competitive title insurance quotes from trusted providers in your area.
          </p>
        </div>
        <form onSubmit={handleQuoteSubmit}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '20px',
              marginBottom: '20px',
            }}
          >
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  marginBottom: '6px',
                  color: 'var(--le-text)',
                }}
              >
                Full Name
              </label>
              <input
                type="text"
                placeholder="Your full name"
                value={quoteFormData.fullName}
                onChange={(e) => handleQuoteFormChange('fullName', e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid var(--le-border)',
                  borderRadius: '6px',
                  fontSize: '14px',
                  boxSizing: 'border-box',
                  color: 'var(--le-text)',
                  backgroundColor: 'white',
                }}
              />
            </div>
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  marginBottom: '6px',
                  color: 'var(--le-text)',
                }}
              >
                Email Address
              </label>
              <input
                type="email"
                placeholder="your.email@example.com"
                value={quoteFormData.email}
                onChange={(e) => handleQuoteFormChange('email', e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid var(--le-border)',
                  borderRadius: '6px',
                  fontSize: '14px',
                  boxSizing: 'border-box',
                  color: 'var(--le-text)',
                  backgroundColor: 'white',
                }}
              />
            </div>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '20px',
              marginBottom: '20px',
            }}
          >
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  marginBottom: '6px',
                  color: 'var(--le-text)',
                }}
              >
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="(555) 123-4567"
                value={quoteFormData.phone}
                onChange={(e) => handleQuoteFormChange('phone', e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid var(--le-border)',
                  borderRadius: '6px',
                  fontSize: '14px',
                  boxSizing: 'border-box',
                  color: 'var(--le-text)',
                  backgroundColor: 'white',
                }}
              />
            </div>
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  marginBottom: '6px',
                  color: 'var(--le-text)',
                }}
              >
                Property Location
              </label>
              <input
                type="text"
                placeholder="City, State"
                value={quoteFormData.propertyLocation}
                onChange={(e) => handleQuoteFormChange('propertyLocation', e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid var(--le-border)',
                  borderRadius: '6px',
                  fontSize: '14px',
                  boxSizing: 'border-box',
                  color: 'var(--le-text)',
                  backgroundColor: 'white',
                }}
              />
            </div>
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label
              style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: 'bold',
                marginBottom: '6px',
                color: 'var(--le-text)',
              }}
            >
              Estimated Purchase Price
            </label>
            <input
              type="text"
              placeholder="$250,000"
              value={quoteFormData.purchasePrice}
              onChange={(e) => handleQuoteFormChange('purchasePrice', e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid var(--le-border)',
                borderRadius: '6px',
                fontSize: '14px',
                boxSizing: 'border-box',
                color: 'var(--le-text)',
                backgroundColor: 'white',
              }}
            />
          </div>
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '14px',
              backgroundColor: 'var(--le-primary)',
              color: 'white',
              fontSize: '16px',
              fontWeight: 'bold',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              transition: 'background-color 0.2s',
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = 'var(--le-primary-hover)')
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = 'var(--le-primary)')
            }
          >
            {formSubmitted ? 'Thank You!' : 'Get Free Quotes'}
          </button>
        </form>
        {formSubmitted && (
          <div
            style={{
              marginTop: '20px',
              padding: '16px',
              backgroundColor: 'var(--le-success)',
              color: 'white',
              borderRadius: '6px',
              textAlign: 'center',
            }}
          >
            Thank you! We\u2019ll connect you with trusted title insurance providers shortly.
          </div>
        )}
      </section>

      {/* FAQ Section */}
      <section
        style={{
          padding: '60px 20px',
          maxWidth: '1000px',
          margin: '0 auto',
          borderBottom: '1px solid var(--le-border)',
        }}
      >
        <h2
          style={{
            fontSize: '36px',
            fontWeight: 'bold',
            marginBottom: '30px',
            color: 'var(--le-text)',
          }}
        >
          Frequently Asked Questions
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {faqs.map((faq, index) => (
            <div
              key={index}
              style={{
                backgroundColor: 'var(--le-bg-card)',
                borderRadius: '8px',
                overflow: 'hidden',
              }}
            >
              <button
                onClick={() =>
                  setExpandedFAQ(expandedFAQ === index ? null : index)
                }
                style={{
                  width: '100%',
                  padding: '18px',
                  backgroundColor: 'var(--le-bg-card)',
                  border: 'none',
                  borderBottom:
                    expandedFAQ === index ? '1px solid var(--le-border)' : 'none',
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  color: 'var(--le-primary)',
                  transition: 'background-color 0.2s',
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.02)')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = 'var(--le-bg-card)')
                }
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>{faq.question}</span>
                  <span
                    style={{
                      fontSize: '20px',
                      transform:
                        expandedFAQ === index ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s',
                    }}
                  >
                    ▼
                  </span>
                </div>
              </button>
              {expandedFAQ === index && (
                <div
                  style={{
                    padding: '18px',
                    borderTop: '1px solid var(--le-border)',
                    backgroundColor: 'var(--le-bg)',
                    color: 'var(--le-text-secondary)',
                    lineHeight: '1.7',
                  }}
                >
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA Footer Section */}
      <section
        style={{
          padding: '60px 20px',
          maxWidth: '1000px',
          margin: '0 auto',
          textAlign: 'center',
          backgroundColor: 'var(--le-primary)',
          color: 'white',
          borderRadius: '8px',
          marginBottom: '40px',
        }}
      >
        <h2
          style={{
            fontSize: '32px',
            fontWeight: 'bold',
            marginBottom: '16px',
          }}
        >
          Protect Your Real Estate Investment Today
        </h2>
        <p
          style={{
            fontSize: '16px',
            marginBottom: '24px',
            opacity: 0.95,
            lineHeight: '1.7',
          }}
        >
          Title insurance is one of the most important protections in real estate. Don\u2019t leave your property ownership vulnerable to legal and financial risks.
        </p>
        <button
          onClick={() => {
            const element = document.getElementById('quote-section');
            element?.scrollIntoView({ behavior: 'smooth' });
          }}
          style={{
            backgroundColor: 'white',
            color: 'var(--le-primary)',
            padding: '14px 32px',
            fontSize: '16px',
            fontWeight: 'bold',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            transition: 'transform 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          Get Quotes Now
        </button>
      </section>

      {/* Footer */}
      <footer
        style={{
          backgroundColor: 'var(--le-bg-card)',
          borderTop: '1px solid var(--le-border)',
          padding: '40px 20px',
          textAlign: 'center',
          color: 'var(--le-text-secondary)',
          fontSize: '14px',
        }}
      >
        <p>
          © 2026 LeadEngine. This page provides educational information about title insurance. For specific legal or financial advice, consult with a qualified attorney or title professional.
        </p>
      </footer>
    </div>
  );
}
