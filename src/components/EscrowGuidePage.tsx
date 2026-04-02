'use client';

import React, { useState } from 'react';

const EscrowGuidePage = () => {
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '40px 20px',
    backgroundColor: 'var(--le-bg)',
    color: 'var(--le-text)',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    lineHeight: '1.6',
  };

  const heroStyle = {
    backgroundColor: 'linear-gradient(135deg, var(--le-primary) 0%, var(--le-primary-hover) 100%)',
    padding: '80px 40px',
    borderRadius: '12px',
    textAlign: 'center' as const,
    marginBottom: '60px',
    color: '#ffffff',
  };

  const heroTitleStyle = {
    fontSize: '48px',
    fontWeight: 'bold',
    marginBottom: '20px',
    letterSpacing: '-0.5px',
  };

  const heroSubtitleStyle = {
    fontSize: '20px',
    marginBottom: '30px',
    opacity: '0.95',
    maxWidth: '700px',
    margin: '0 auto 30px',
  };

  const heroButtonStyle = {
    backgroundColor: '#ffffff',
    color: 'var(--le-primary)',
    padding: '12px 32px',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'transform 0.3s, box-shadow 0.3s',
  };

  const sectionStyle = {
    marginBottom: '60px',
  };

  const sectionTitleStyle = {
    fontSize: '36px',
    fontWeight: 'bold',
    marginBottom: '30px',
    color: 'var(--le-primary)',
    borderBottom: '3px solid var(--le-accent)',
    paddingBottom: '15px',
  };

  const subsectionTitleStyle = {
    fontSize: '22px',
    fontWeight: 'bold',
    marginTop: '30px',
    marginBottom: '15px',
    color: 'var(--le-primary)',
  };

  const textStyle = {
    fontSize: '16px',
    marginBottom: '15px',
    color: 'var(--le-text)',
    lineHeight: '1.8',
  };

  const cardStyle = {
    backgroundColor: 'var(--le-bg-card)',
    padding: '25px',
    borderRadius: '10px',
    marginBottom: '20px',
    border: '1px solid var(--le-border)',
    transition: 'box-shadow 0.3s, transform 0.3s',
  };

  const cardHoverStyle = {
    boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
    transform: 'translateY(-2px)',
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '25px',
    marginBottom: '40px',
  };

  const timelineStyle = {
    position: 'relative' as const,
    paddingLeft: '40px',
    marginBottom: '20px',
  };

  const timelineDotStyle = {
    position: 'absolute' as const,
    left: 0,
    top: '2px',
    width: '20px',
    height: '20px',
    backgroundColor: 'var(--le-primary)',
    borderRadius: '50%',
    border: '3px solid var(--le-bg)',
  };

  const timelineLineStyle = {
    position: 'absolute' as const,
    left: '8px',
    top: '20px',
    width: '2px',
    height: '60px',
    backgroundColor: 'var(--le-border)',
  };

  const warningBoxStyle = {
    backgroundColor: 'var(--le-warning)',
    border: `2px solid var(--le-danger)`,
    color: 'var(--le-text)',
    padding: '20px',
    borderRadius: '8px',
    marginBottom: '30px',
  };

  const successBoxStyle = {
    backgroundColor: 'var(--le-success)',
    color: 'var(--le-text)',
    padding: '20px',
    borderRadius: '8px',
    marginBottom: '30px',
  };

  const listStyle = {
    marginLeft: '20px',
    marginBottom: '20px',
  };

  const listItemStyle = {
    marginBottom: '12px',
    marginLeft: '20px',
  };

  const faqItemStyle = {
    backgroundColor: 'var(--le-bg-card)',
    border: '1px solid var(--le-border)',
    borderRadius: '8px',
    marginBottom: '15px',
    overflow: 'hidden',
  };

  const faqQuestionStyle = {
    padding: '20px',
    backgroundColor: 'var(--le-bg-card)',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontWeight: 'bold',
    transition: 'background-color 0.3s',
    userSelect: 'none' as const,
  };

  const faqAnswerStyle = {
    padding: '20px',
    backgroundColor: 'var(--le-bg)',
    borderTop: '1px solid var(--le-border)',
    lineHeight: '1.8',
  };

  const leadCaptureStyle = {
    backgroundColor: 'var(--le-primary)',
    color: '#ffffff',
    padding: '40px',
    borderRadius: '10px',
    marginBottom: '60px',
    textAlign: 'center' as const,
  };

  const formInputStyle = {
    width: '100%',
    maxWidth: '400px',
    padding: '12px 15px',
    border: '1px solid var(--le-border)',
    borderRadius: '6px',
    fontSize: '16px',
    marginBottom: '15px',
    backgroundColor: '#ffffff',
    color: 'var(--le-text)',
    boxSizing: 'border-box' as const,
  };

  const submitButtonStyle = {
    backgroundColor: 'var(--le-accent)',
    color: '#ffffff',
    padding: '12px 32px',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.3s, transform 0.2s',
  };

  const stepNumberStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '36px',
    height: '36px',
    backgroundColor: 'var(--le-primary)',
    color: '#ffffff',
    borderRadius: '50%',
    fontWeight: 'bold',
    fontSize: '16px',
    marginRight: '12px',
  };

  return (
    <div style={containerStyle}>
      {/* Hero Section */}
      <section style={heroStyle}>
        <h1 style={heroTitleStyle}>Understanding the Escrow Process</h1>
        <p style={heroSubtitleStyle}>
          Navigate your real estate transaction with confidence. Learn how escrow protects both buyers and sellers throughout the closing process.
        </p>
        <button
          style={heroButtonStyle}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          Get Expert Guidance
        </button>
      </section>

      {/* What is Escrow Section */}
      <section style={sectionStyle}>
        <h2 style={sectionTitleStyle}>What is Escrow?</h2>
        <p style={textStyle}>
          Escrow is a neutral, third-party arrangement that holds funds and documents during a real estate transaction. The escrow agent acts as a trusted intermediary, protecting both the buyer\u2019s earnest money and the seller\u2019s property until all conditions of the sale are met. Think of it as a financial safeguard that ensures fairness and accountability throughout the closing process.
        </p>
        <p style={textStyle}>
          During escrow, the agent ensures that all contingencies are satisfied, required inspections and appraisals are completed, and legal documents are properly executed before releasing funds and transferring title. This process typically takes 30\u201345 days from the time you go under contract.
        </p>

        <h3 style={subsectionTitleStyle}>The 7-Step Escrow Timeline</h3>
        <div style={gridStyle}>
          {[
            { step: 1, title: 'Contract Signed', desc: 'Buyer and seller agree on terms and sign the purchase agreement.' },
            { step: 2, title: 'Earnest Money Deposited', desc: 'Buyer deposits earnest money into escrow as proof of serious intent.' },
            { step: 3, title: 'Inspections & Appraisals', desc: 'Property is inspected and appraised; buyer completes due diligence.' },
            { step: 4, title: 'Title Search', desc: 'Escrow agent searches title history to ensure clean ownership transfer.' },
            { step: 5, title: 'Final Walkthrough', desc: 'Buyer conducts final walkthrough 24\u201348 hours before closing.' },
            { step: 6, title: 'Clear to Close', desc: 'All conditions met; buyer and seller are ready to sign closing documents.' },
            { step: 7, title: 'Closing & Funding', desc: 'Funds wire to escrow; buyer signs documents; deed is recorded; keys transferred.' },
          ].map((item) => (
            <div key={item.step} style={cardStyle}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <div style={stepNumberStyle}>{item.step}</div>
                <strong style={{ fontSize: '18px' }}>{item.title}</strong>
              </div>
              <p style={{ ...textStyle, marginBottom: 0, fontSize: '14px' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Opening Escrow Section */}
      <section style={sectionStyle}>
        <h2 style={sectionTitleStyle}>Opening Escrow</h2>
        <p style={textStyle}>
          Escrow officially opens once the purchase agreement is signed and both parties have agreed to the transaction terms. The timeline for opening escrow begins the moment your offer is accepted.
        </p>

        <h3 style={subsectionTitleStyle}>Who Opens Escrow?</h3>
        <p style={textStyle}>
          Typically, the seller\u2019s real estate agent or the real estate brokerage opens escrow by contacting a title company or escrow service. In some cases, the buyer\u2019s agent may initiate the process. The escrow agent provides both parties with an initial statement that outlines the agreed\u2011upon purchase price, deposit amounts, estimated closing costs, and key dates.
        </p>

        <h3 style={subsectionTitleStyle}>Required Documents to Open Escrow</h3>
        <ul style={listStyle}>
          <li style={listItemStyle}>Signed purchase agreement or sales contract</li>
          <li style={listItemStyle}>Proof of earnest money deposit</li>
          <li style={listItemStyle}>Buyer\u2019s proof of funds or loan pre\u2011approval letter</li>
          <li style={listItemStyle}>Seller\u2019s disclosure documents (property condition, lead-based paint, etc.)</li>
          <li style={listItemStyle}>ID verification for both buyer and seller</li>
          <li style={listItemStyle}>Title commitment or preliminary title report</li>
          <li style={listItemStyle}>Homeowners association (HOA) documents if applicable</li>
        </ul>

        <div style={successBoxStyle}>
          <strong>Pro Tip:</strong> Once escrow opens, you\u2019ll typically receive an escrow instruction document that details closing costs, prorations, and your exact closing amount. Review this carefully and ask questions immediately if anything seems incorrect.
        </div>
      </section>

      {/* Earnest Money Section */}
      <section style={sectionStyle}>
        <h2 style={sectionTitleStyle}>Earnest Money Explained</h2>
        <p style={textStyle}>
          Earnest money is a good\u2011faith deposit that demonstrates you\u2019re serious about purchasing the property. It\u2019s typically held in escrow and credited toward your down payment and closing costs at the time of closing.
        </p>

        <div style={gridStyle}>
          {[
            { label: 'Typical Amount', value: '1%\u20133% of purchase price' },
            { label: 'When Due', value: '3\u20105 business days after offer acceptance' },
            { label: 'Who Holds It', value: 'Escrow agent or title company' },
            { label: 'At Closing', value: 'Credited toward down payment and closing costs' },
          ].map((item, idx) => (
            <div key={idx} style={cardStyle}>
              <strong style={{ color: 'var(--le-primary)', fontSize: '16px' }}>{item.label}</strong>
              <p style={{ ...textStyle, marginBottom: 0, marginTop: '8px' }}>{item.value}</p>
            </div>
          ))}
        </div>

        <h3 style={subsectionTitleStyle}>When You Can Get Your Earnest Money Back</h3>
        <p style={textStyle}>
          Earnest money is typically refundable if you back out without a valid reason or if the seller fails to meet the terms of the contract. However, if you cancel for reasons not covered in your contingencies, you may forfeit the deposit to the seller.
        </p>
        <ul style={listStyle}>
          <li style={listItemStyle}><strong>Refundable:</strong> Inspection fails contingency, appraisal comes in low, financing contingency not met, title defects discovered</li>
          <li style={listItemStyle}><strong>At Risk:</strong> Backing out without contingency protection, canceling after final walkthrough, removing contingencies then withdrawing</li>
          <li style={listItemStyle}><strong>Released at Closing:</strong> Funds credited to buyer\u2019s down payment and closing costs</li>
        </ul>
      </section>

      {/* Escrow Timeline Section */}
      <section style={sectionStyle}>
        <h2 style={sectionTitleStyle}>The Escrow Timeline: What Happens When</h2>
        <p style={textStyle}>
          Most escrow periods last 30\u201345 days from the time you go under contract. Here\u2019s what typically happens at each stage:
        </p>

        {[
          {
            day: 'Days 1\u20135',
            title: 'Escrow Opens & Initial Steps',
            tasks: [
              'Escrow account is opened',
              'Earnest money is deposited and cleared',
              'Initial escrow statement is provided to both parties',
              'Title search is ordered',
            ],
          },
          {
            day: 'Days 5\u201310',
            title: 'Due Diligence Period',
            tasks: [
              'Home inspection is scheduled and completed',
              'Appraisal is ordered and scheduled',
              'Buyer reviews property disclosures',
              'HOA documents and estoppel letters are obtained (if applicable)',
              'Property survey may be ordered (if required)',
            ],
          },
          {
            day: 'Days 10\u201320',
            title: 'Contingency Period',
            tasks: [
              'Appraisal report is received and reviewed',
              'Inspection report is received; buyer may negotiate repairs',
              'Title report is received and reviewed',
              'Buyer finalizes financing and submits underwriting documents',
              'Repair negotiations occur if needed',
            ],
          },
          {
            day: 'Days 20\u201328',
            title: 'Clear to Close Phase',
            tasks: [
              'All contingencies are satisfied or waived',
              'Loan is officially approved ("clear to close")',
              'Closing disclosure is provided (3 days before closing)',
              'Final walkthrough is scheduled (24\u201348 hours before closing)',
              'Homeowners insurance is confirmed',
            ],
          },
          {
            day: 'Days 28\u201330',
            title: 'Pre\u2011Closing',
            tasks: [
              'Final walkthrough confirms agreed\u2011upon repairs are completed',
              'Final escrow statement is reviewed',
              'Wiring instructions are provided (with verification security measures)',
              'Closing documents are prepared and reviewed',
            ],
          },
          {
            day: 'Day 30+',
            title: 'Closing Day',
            tasks: [
              'Buyer and seller meet to sign closing documents',
              'Final funds are wired to escrow',
              'Buyer signs all required documents and certifications',
              'Earnest money and down payment are applied to purchase',
              'Title is recorded and deed is transferred',
            ],
          },
        ].map((phase, idx) => (
          <div key={idx} style={cardStyle}>
            <strong style={{ color: 'var(--le-primary)', fontSize: '18px' }}>{phase.day}: {phase.title}</strong>
            <ul style={{ ...listStyle, marginTop: '15px' }}>
              {phase.tasks.map((task, taskIdx) => (
                <li key={taskIdx} style={listItemStyle}>{task}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* Title Search & Insurance Section */}
      <section style={sectionStyle}>
        <h2 style={sectionTitleStyle}>Title Search and Insurance</h2>
        <p style={textStyle}>
          A title search is one of the most critical steps in escrow. It ensures that the seller has the legal right to sell the property and that there are no hidden claims, liens, or other issues that could affect your ownership.
        </p>

        <h3 style={subsectionTitleStyle}>What Does a Title Search Cover?</h3>
        <ul style={listStyle}>
          <li style={listItemStyle}>Ownership history of the property</li>
          <li style={listItemStyle}>Outstanding liens (tax, judgment, mechanic\u2019s liens)</li>
          <li style={listItemStyle}>Easements and rights of way</li>
          <li style={listItemStyle}>Code violations and zoning issues</li>
          <li style={listItemStyle}>Unpaid HOA fees or assessments</li>
          <li style={listItemStyle}>Boundary disputes or encroachments</li>
          <li style={listItemStyle}>Missing documents or recording errors</li>
        </ul>

        <h3 style={subsectionTitleStyle}>Title Insurance: Your Protection</h3>
        <p style={textStyle}>
          Title insurance protects you against financial loss from title defects discovered after closing. It\u2019s a one\u2011time premium paid at closing and provides coverage for as long as you own the property.
        </p>

        <div style={gridStyle}>
          {[
            {
              type: 'Owner\u2019s Policy',
              desc: 'Protects the buyer; typically 0.4\u20130.6% of purchase price',
            },
            {
              type: 'Lender\u2019s Policy',
              desc: 'Protects the mortgage lender; usually required by banks',
            },
            {
              type: 'Extended Coverage',
              desc: 'Adds protection for additional title issues and risks',
            },
          ].map((policy, idx) => (
            <div key={idx} style={cardStyle}>
              <strong style={{ color: 'var(--le-primary)', fontSize: '16px' }}>{policy.type}</strong>
              <p style={{ ...textStyle, marginTop: '10px', marginBottom: 0 }}>{policy.desc}</p>
            </div>
          ))}
        </div>

        <h3 style={subsectionTitleStyle}>Who Pays for Title Insurance?</h3>
        <p style={textStyle}>
          In most states, the seller traditionally pays for the owner\u2019s title insurance policy, while the buyer pays for the lender\u2019s policy. However, this is negotiable and varies by region. Always confirm who is paying in your purchase agreement.
        </p>
      </section>

      {/* Escrow Fees Section */}
      <section style={sectionStyle}>
        <h2 style={sectionTitleStyle}>Escrow Fees Breakdown</h2>
        <p style={textStyle}>
          Escrow fees are costs associated with holding funds and managing documents during the transaction. These are typically included in your closing costs and split between buyer and seller, though this is often negotiated.
        </p>

        <div style={cardStyle}>
          <h3 style={{ ...subsectionTitleStyle, marginTop: 0 }}>Typical Escrow Fees</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--le-bg)' }}>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid var(--le-border)' }}>Fee Type</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid var(--le-border)' }}>Typical Cost</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid var(--le-border)' }}>Typically Paid By</th>
              </tr>
            </thead>
            <tbody>
              {[
                { type: 'Escrow / Title Company Fee', cost: '$300\u2013$1,000', paidBy: 'Split 50/50 (negotiable)' },
                { type: 'Title Insurance Policy', cost: '0.4\u20130.6% of purchase price', paidBy: 'Seller (often)' },
                { type: 'Title Search', cost: '$50\u2013$200', paidBy: 'Buyer or Split' },
                { type: 'Recording Fees', cost: '$25\u2013$300', paidBy: 'Buyer' },
                { type: 'Wire Transfer Fee', cost: '$15\u201350 per wire', paidBy: 'Buyer' },
                { type: 'Document Preparation', cost: '$100\u2013$500', paidBy: 'Buyer' },
                { type: 'Notary Fees', cost: '$10\u201325 per signature', paidBy: 'Buyer' },
              ].map((fee, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid var(--le-border)' }}>
                  <td style={{ padding: '12px' }}>{fee.type}</td>
                  <td style={{ padding: '12px' }}>{fee.cost}</td>
                  <td style={{ padding: '12px' }}>{fee.paidBy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={successBoxStyle}>
          <strong>Money-Saving Tip:</strong> Many escrow fees are negotiable. Discuss with your agent which costs can be reduced or eliminated. Sometimes builders or sellers will pay certain fees as a concession.
        </div>
      </section>

      {/* Common Escrow Problems Section */}
      <section style={sectionStyle}>
        <h2 style={sectionTitleStyle}>8 Common Escrow Problems (and How to Avoid Them)</h2>
        <p style={textStyle}>
          Understanding common escrow issues can help you prevent delays and complications during closing.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '25px' }}>
          {[
            {
              icon: '⚠️',
              problem: 'Low Appraisal',
              desc: 'Property appraises below purchase price, causing financing issues.',
              solution: 'Request appraisal review, renegotiate price, or increase down payment to cover the gap.',
            },
            {
              icon: '🔍',
              problem: 'Title Defects',
              desc: 'Liens, unpaid taxes, or ownership disputes discovered during title search.',
              solution: 'Require seller to clear title issues or obtain title insurance endorsement to proceed.',
            },
            {
              icon: '🏠',
              problem: 'Major Inspection Issues',
              desc: 'Home inspection reveals structural, plumbing, electrical, or roofing problems.',
              solution: 'Negotiate repairs, request credit, or walk away if repairs exceed your contingency.',
            },
            {
              icon: '💰',
              problem: 'Financing Falls Through',
              desc: 'Buyer\u2019s loan is denied or contingencies cannot be satisfied.',
              solution: 'Work with lender to resolve issues quickly; have backup financing options ready.',
            },
            {
              icon: '📋',
              problem: 'Document Errors',
              desc: 'Typos, inconsistencies, or missing information in escrow documents.',
              solution: 'Request corrections immediately; don\u2019t sign documents with errors.',
            },
            {
              icon: '🔐',
              problem: 'Wire Fraud',
              desc: 'Fraudsters intercept wiring instructions and redirect closing funds.',
              solution: 'Always verify wire instructions by phone; use secure communication channels.',
            },
            {
              icon: '⏰',
              problem: 'Closing Delays',
              desc: 'Underwriting, inspections, or repairs push closing date back multiple times.',
              solution: 'Maintain close communication with all parties; follow up on items promptly.',
            },
            {
              icon: '📌',
              problem: 'HOA Issues',
              desc: 'Undisclosed HOA fees, upcoming assessments, or deed restrictions.',
              solution: 'Review HOA documents thoroughly; understand all fees and restrictions before closing.',
            },
          ].map((item, idx) => (
            <div key={idx} style={cardStyle}>
              <div style={{ fontSize: '32px', marginBottom: '10px' }}>{item.icon}</div>
              <h4 style={{ color: 'var(--le-primary)', marginBottom: '8px', fontSize: '18px' }}>{item.problem}</h4>
              <p style={{ ...textStyle, marginBottom: '10px', fontSize: '14px', color: 'var(--le-text-secondary)' }}>{item.desc}</p>
              <p style={{ ...textStyle, marginBottom: 0, fontSize: '14px', fontWeight: 'bold', color: 'var(--le-accent)' }}>✓ {item.solution}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Wire Fraud Warning Section */}
      <section style={sectionStyle}>
        <h2 style={sectionTitleStyle}>Wire Fraud Warning: Protect Your Closing Funds</h2>
        <div style={warningBoxStyle}>
          <strong style={{ fontSize: '18px' }}>🚨 CRITICAL: Wire fraud is one of the fastest-growing real estate scams.</strong>
          <p style={{ marginTop: '10px', marginBottom: 0 }}>
            Criminals intercept emails and impersonate escrow agents, title companies, or your real estate agent to trick you into wiring closing funds to fraudulent accounts. Once wired, the money is nearly impossible to recover.
          </p>
        </div>

        <h3 style={subsectionTitleStyle}>How Wire Fraud Happens</h3>
        <ol style={listStyle}>
          <li style={listItemStyle}>Hacker gains access to email account of escrow agent, title company, or your agent</li>
          <li style={listItemStyle}>Email is sent with fake wire instructions and wiring details</li>
          <li style={listItemStyle}>Email looks authentic with correct letterhead, signatures, and banking information</li>
          <li style={listItemStyle}>Buyer wires money to fraudulent account thinking it\u2019s escrow</li>
          <li style={listItemStyle}>Funds are transferred out of country before anyone notices</li>
          <li style={listItemStyle}>Closing is delayed; buyer and lender lose the wire amount</li>
        </ol>

        <h3 style={subsectionTitleStyle}>How to Protect Yourself</h3>
        <div style={gridStyle}>
          {[
            {
              step: '1. Verify by Phone',
              desc: 'Always call your escrow agent directly using the phone number on the title company website, NOT the number in the email.',
            },
            {
              step: '2. Use Secure Communication',
              desc: 'Request that wire instructions be sent via secure portal or in-person meeting, never via email alone.',
            },
            {
              step: '3. Question Everything',
              desc: 'If wire instructions change, amounts are different, or account details are new, contact your agent immediately.',
            },
            {
              step: '4. Ask Security Questions',
              desc: 'Establish a code word with your agent. Ask them the code word via phone before sending any money.',
            },
            {
              step: '5. Check Account Details',
              desc: 'Verify that bank routing numbers and account numbers match previous escrow statements.',
            },
            {
              step: '6. Don\u2019t Rush',
              desc: 'Never wire funds under pressure or on tight timelines. Legitimate closings can wait 24 hours for verification.',
            },
          ].map((item, idx) => (
            <div key={idx} style={cardStyle}>
              <strong style={{ color: 'var(--le-accent)', fontSize: '16px' }}>{item.step}</strong>
              <p style={{ ...textStyle, marginTop: '10px', marginBottom: 0 }}>{item.desc}</p>
            </div>
          ))}
        </div>

        <div style={successBoxStyle}>
          <strong>If You Suspect Wire Fraud:</strong> Contact your lender and escrow agent immediately. Report the fraud to the FBI\u2019s Internet Crime Complaint Center (IC3) at ic3.gov. Contact your bank to attempt reversal, though success is limited after funds leave.
        </div>
      </section>

      {/* Closing Day Walkthrough Section */}
      <section style={sectionStyle}>
        <h2 style={sectionTitleStyle}>Closing Day: What to Expect</h2>
        <p style={textStyle}>
          Closing day is when ownership officially transfers from seller to buyer. Knowing what to expect helps you feel prepared and confident.
        </p>

        <h3 style={subsectionTitleStyle}>24 Hours Before Closing</h3>
        <ul style={listStyle}>
          <li style={listItemStyle}>Perform your final walkthrough to ensure repairs are completed and agreed\u2011upon items are included</li>
          <li style={listItemStyle}>Review your Closing Disclosure document (provided 3 days before closing)</li>
          <li style={listItemStyle}>Confirm closing time and location with your escrow agent</li>
          <li style={listItemStyle}>Arrange for final wire transfer of funds (don\u2019t wire until you verify instructions by phone)</li>
          <li style={listItemStyle}>Ensure homeowners insurance is active and coverage is confirmed</li>
        </ul>

        <h3 style={subsectionTitleStyle}>What to Bring to Closing</h3>
        <div style={gridStyle}>
          {[
            'Photo ID and driver\u2019s license',
            'Cashier\u2019s check or wire transfer confirmation',
            'Proof of homeowners insurance',
            'List of any agreed\u2011upon repairs or concerns',
            'Checkbook for final prorations or unexpected costs',
            'Calculator or phone to verify numbers',
          ].map((item, idx) => (
            <div key={idx} style={{ ...cardStyle, display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '24px', marginRight: '12px' }}>✓</span>
              <span>{item}</span>
            </div>
          ))}
        </div>

        <h3 style={subsectionTitleStyle}>The Closing Process (Step-by-Step)</h3>
        {[
          { step: '1. Verification', desc: 'Escrow agent verifies your identity and that all parties are present.' },
          { step: '2. Document Review', desc: 'You receive and review the final closing statement, deed, note, and promissory note.' },
          { step: '3. Ask Questions', desc: 'This is your last chance to ask questions about any numbers, terms, or conditions.' },
          { step: '4. Sign Documents', desc: 'You sign the deed, note, promissory note, and miscellaneous disclosures with a notary present.' },
          { step: '5. Fund Transfer', desc: 'Lender wires loan proceeds to escrow; you confirm wire transfer of your down payment.' },
          { step: '6. Escrow Disburses', desc: 'Escrow agent pays off seller\u2019s mortgage, liens, and all closing costs.' },
          { step: '7. Record Deed', desc: 'Deed is recorded at the county recorder\u2019s office; title officially transfers to you.' },
          { step: '8. Receive Keys', desc: 'Seller provides keys and closes on their end; property is officially yours.' },
        ].map((item, idx) => (
          <div key={idx} style={cardStyle}>
            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
              <div style={stepNumberStyle}>{idx + 1}</div>
              <div style={{ flex: 1 }}>
                <strong style={{ fontSize: '16px', color: 'var(--le-primary)' }}>{item.step}</strong>
                <p style={{ ...textStyle, marginTop: '8px', marginBottom: 0 }}>{item.desc}</p>
              </div>
            </div>
          </div>
        ))}

        <div style={successBoxStyle}>
          <strong>Pro Tip:</strong> Closing can take 1\u20133 hours. Bring water and be prepared to sign multiple documents. Many agents recommend having a real estate attorney present to review documents on your behalf, especially for complex transactions.
        </div>
      </section>

      {/* After Closing Section */}
      <section style={sectionStyle}>
        <h2 style={sectionTitleStyle}>After Closing: What Happens to Escrow Funds?</h2>
        <p style={textStyle}>
          Closing is not the end of escrow. Many homeowners maintain escrow accounts long after purchasing their home.
        </p>

        <h3 style={subsectionTitleStyle}>Lender-Held Escrow (Mortgage Escrow)</h3>
        <p style={textStyle}>
          Your lender may require an escrow account to hold funds for property taxes and homeowners insurance. Each month, you pay 1/12 of your estimated annual taxes and insurance as part of your mortgage payment. The lender disburses these funds on your behalf.
        </p>
        <ul style={listStyle}>
          <li style={listItemStyle}><strong>Property Taxes:</strong> Paid annually or semi\u2011annually to the county</li>
          <li style={listItemStyle}><strong>Homeowners Insurance:</strong> Paid annually to your insurance company</li>
          <li style={listItemStyle}><strong>PMI:</strong> Private mortgage insurance may also be held in escrow</li>
          <li style={listItemStyle}><strong>HOA Fees:</strong> Some lenders hold HOA fees in escrow if required by HOA rules</li>
        </ul>

        <h3 style={subsectionTitleStyle}>Buyer-Held Escrow (Attorney Escrow)</h3>
        <p style={textStyle}>
          If you disagree with the seller about final repairs, prorations, or other issues, disputed funds may be held in attorney escrow until resolved. This protects both parties while disputes are settled.
        </p>

        <div style={cardStyle}>
          <h4 style={{ color: 'var(--le-primary)', marginTop: 0 }}>Key Escrow Takeaways</h4>
          <ul style={listStyle}>
            <li style={listItemStyle}>Escrow protects both buyers and sellers by holding funds and documents until all conditions are met</li>
            <li style={listItemStyle}>The escrow process typically takes 30\u201345 days from contract to closing</li>
            <li style={listItemStyle}>Title insurance protects you against future ownership claims and defects</li>
            <li style={listItemStyle}>Wire fraud is a serious threat; always verify wiring instructions by phone</li>
            <li style={listItemStyle}>Your lender may require ongoing escrow for taxes, insurance, and PMI</li>
            <li style={listItemStyle}>Review all closing documents carefully before signing</li>
            <li style={listItemStyle}>Don\u2019t hesitate to ask questions; closing agents expect thorough review</li>
          </ul>
        </div>
      </section>

      {/* FAQ Section */}
      <section style={sectionStyle}>
        <h2 style={sectionTitleStyle}>Frequently Asked Questions</h2>
        <div>
          {[
            {
              q: 'How long does escrow typically take?',
              a: 'Most escrow periods last 30\u201345 days from the time you go under contract. This timeline can be extended if inspections, appraisals, or financing issues require additional time.',
            },
            {
              q: 'Can I get my earnest money back if my offer is rejected?',
              a: 'Yes. If your offer is rejected or not accepted, your earnest money is returned in full. However, once your offer is accepted, the earnest money is only refundable if contingencies are not met or if the seller fails to perform.',
            },
            {
              q: 'What if the appraisal comes in low?',
              a: 'If the appraisal is below the purchase price, you have several options: renegotiate the price with the seller, increase your down payment to cover the difference, request an appraisal review, or walk away from the deal if you have an appraisal contingency.',
            },
            {
              q: 'What does the escrow agent do with my money?',
              a: 'The escrow agent holds your earnest money in a neutral, interest\u2011bearing account until closing. They don\u2019t earn interest on the funds; any interest earned is typically returned to you or the seller.',
            },
            {
              q: 'Who pays for the title search?',
              a: 'This varies by region and is negotiable. Typically, the buyer pays for the title search, but some areas split the cost or have the seller pay. Always clarify this in your purchase agreement.',
            },
            {
              q: 'What is "clear to close" and what does it mean?',
              a: '"Clear to close" means all contingencies are satisfied, your loan is fully approved, and the lender has authorized funding. Once you receive this status, closing is imminent, typically within 1\u20135 days.',
            },
            {
              q: 'Can the escrow timeline be shortened?',
              a: 'Yes, you can request a shorter escrow period (7\u201410 days), but this is difficult unless all parties agree. Shortened timelines are more common in competitive markets or all\u2011cash offers. Lenders need time for underwriting, making very fast closings challenging.',
            },
            {
              q: 'What if there is a title defect discovered during the search?',
              a: 'The title company will issue a commitment report noting any defects. The seller is responsible for clearing title issues before closing. If they can\u2019t clear the title, you can require title insurance or renegotiate the price.',
            },
          ].map((faq, idx) => (
            <div key={idx} style={faqItemStyle}>
              <div
                style={{
                  ...faqQuestionStyle,
                  backgroundColor: expandedFAQ === idx ? 'var(--le-primary)' : 'var(--le-bg-card)',
                  color: expandedFAQ === idx ? '#ffffff' : 'var(--le-text)',
                }}
                onClick={() => setExpandedFAQ(expandedFAQ === idx ? null : idx)}
              >
                <span>{faq.q}</span>
                <span style={{ fontSize: '20px', transition: 'transform 0.3s' }}>
                  {expandedFAQ === idx ? '−' : '+'}
                </span>
              </div>
              {expandedFAQ === idx && (
                <div style={faqAnswerStyle}>
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Lead Capture Section */}
      <section style={leadCaptureStyle}>
        <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '20px', margin: '0 0 20px 0' }}>
          Ready to Close on Your Dream Home?
        </h2>
        <p style={{ fontSize: '16px', marginBottom: '30px', opacity: '0.95' }}>
          Get expert real estate guidance tailored to your specific situation. Our team is here to answer questions and guide you through every step of the escrow process.
        </p>
        <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0' }}>
          <input
            type="text"
            placeholder="Your Name"
            style={formInputStyle}
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            style={formInputStyle}
            required
          />
          <input
            type="tel"
            placeholder="Your Phone Number"
            style={formInputStyle}
          />
          <button
            type="submit"
            style={submitButtonStyle}
            onMouseOver={(e) => {
              e.currentTarget.style.opacity = '0.9';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.opacity = '1';
            }}
          >
            Get Your Personalized Escrow Guide
          </button>
        </form>
        <p style={{ fontSize: '12px', marginTop: '15px', opacity: '0.8' }}>
          We respect your privacy. Your information will never be shared.
        </p>
      </section>

      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Guide',
            name: 'Understanding the Escrow Process: A Complete Guide for Real Estate Buyers',
            description: 'Learn how escrow works in real estate transactions, from opening escrow through closing day. Understand earnest money, title insurance, closing costs, and how to protect yourself from wire fraud.',
            author: {
              '@type': 'Organization',
              name: 'LeadEngine',
              url: 'https://realtyclientengine.app',
            },
            datePublished: '2026-04-02',
            dateModified: '2026-04-02',
            mainEntity: {
              '@type': 'FAQPage',
              mainEntity: [
                {
                  '@type': 'Question',
                  name: 'What is escrow?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Escrow is a neutral third-party arrangement that holds funds and documents during a real estate transaction, protecting both the buyer and seller until all conditions are met.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'How long does escrow take?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Most escrow periods last 30-45 days from the time you go under contract.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'What is earnest money?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Earnest money is a good-faith deposit that demonstrates you are serious about purchasing the property. It is typically 1-3% of the purchase price and is credited toward your down payment at closing.',
                  },
                },
              ],
            },
          }),
        }}
      />
    </div>
  );
};

export default EscrowGuidePage;
