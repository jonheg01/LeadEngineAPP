'use client'

import React, { useState } from 'react'

export default function HomeAppraisalPage() {
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null)
  const [estimatorData, setEstimatorData] = useState({
    homeType: 'single-family',
    location: 'urban',
  })
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  })
  const [formSubmitted, setFormSubmitted] = useState(false)

  const toggleAccordion = (index: number) => {
    setActiveAccordion(activeAccordion === index ? null : index)
  }

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.name && formData.email && formData.phone) {
      setFormSubmitted(true)
      setTimeout(() => setFormSubmitted(false), 3000)
      setFormData({ name: '', email: '', phone: '' })
    }
  }

  // Appraisal cost data
  const costEstimates = {
    'single-family': { urban: 400, suburban: 350, rural: 300 },
    'condo': { urban: 450, suburban: 400, rural: 350 },
    'multi-family': { urban: 550, suburban: 480, rural: 400 },
  }

  const currentCost = costEstimates[estimatorData.homeType as keyof typeof costEstimates]?.[estimatorData.location as keyof typeof costEstimates['single-family']] || 400

  // Myths data
  const myths = [
    {
      myth: 'Appraisals guarantee your home\u2019s market value',
      reality: 'Appraisals provide fair market value estimates, but actual sale prices can vary based on market conditions and buyer demand.',
    },
    {
      myth: 'Home improvements always increase appraisal value',
      reality: 'Not all improvements add value. Updated kitchens and bathrooms typically provide strong returns, but personal upgrades may not.',
    },
    {
      myth: 'You can influence the appraisal by being nice to the appraiser',
      reality: 'Appraisers follow strict professional standards and cannot be influenced by courtesy; they use objective criteria.',
    },
    {
      myth: 'A low appraisal means your home isn\u2019t worth that much',
      reality: 'A low appraisal might reflect market conditions, comparable issues, or the appraiser\u2019s methodology—not necessarily accurate value.',
    },
    {
      myth: 'Appraisals are the same as home inspections',
      reality: 'Appraisals estimate value; inspections assess condition and identify repairs. They\u2019re different purposes.',
    },
    {
      myth: 'You must hire the appraiser your lender suggests',
      reality: 'Lenders arrange appraisals, but appraisers are independent. However, you can request appraisers be changed for cause.',
    },
    {
      myth: 'Cosmetic fixes before appraisal day will boost your value',
      reality: 'Minor cosmetic work helps curb appeal but won\u2019t significantly increase appraised value without structural improvements.',
    },
    {
      myth: 'Appraisals are always negotiable',
      reality: 'If an appraisal error occurred, you can dispute it, but the appraiser\u2019s professional judgment can\u2019t be bargained.',
    },
  ]

  // FAQ data
  const faqs = [
    {
      question: 'How long does a home appraisal take?',
      answer: 'The actual appraisal inspection typically takes 1–3 hours depending on home size. The full appraisal report usually takes 3–7 business days to complete.',
    },
    {
      question: 'Can I be present during the appraisal?',
      answer: 'Yes, homeowners can typically be present, though some appraisers prefer to work alone. It\u2019s best to ask your lender or the appraiser\u2019s office.',
    },
    {
      question: 'What\u2019s the difference between an appraisal and a CMA?',
      answer: 'A Comparative Market Analysis (CMA) is prepared by real estate agents using market data. An appraisal is an official, unbiased estimate by a licensed professional.',
    },
    {
      question: 'Do I need to pay for the appraisal upfront?',
      answer: 'In most mortgage transactions, appraisal fees are paid by the buyer but typically escrowed and collected at closing, not upfront.',
    },
    {
      question: 'Can the appraisal come in higher than the offer price?',
      answer: 'Yes. If the appraisal is higher, the lender will only finance the lower of the appraisal or offer price, but it protects you from overpaying.',
    },
    {
      question: 'What happens if the appraisal is lower than the offer?',
      answer: 'You can renegotiate the price, request a second appraisal, dispute the appraisal, bring additional cash, or walk away, depending on your agreement.',
    },
    {
      question: 'How much does a home appraisal cost?',
      answer: 'Costs typically range from $300–$600, varying by home size, location, and market. Condos and complex homes may cost more.',
    },
    {
      question: 'Is an appraisal required for all mortgages?',
      answer: 'Most conventional and FHA mortgages require appraisals. Some VA or portfolio loans may have alternatives, but appraisals are standard.',
    },
  ]

  // Factors appraisers consider
  const appraisalFactors = [
    { factor: 'Home Condition', description: 'Overall structural integrity, roof, foundation, HVAC systems' },
    { factor: 'Square Footage', description: 'Finished living area; appraisers measure or verify from plans' },
    { factor: 'Location & Neighborhood', description: 'Schools, proximity to amenities, crime rates, future development' },
    { factor: 'Comparable Sales', description: 'Recent sales of similar homes in your area (sold within 6–12 months)' },
    { factor: 'Recent Updates', description: 'New roof, HVAC, electrical, plumbing, windows, kitchen/bath upgrades' },
    { factor: 'Curb Appeal', description: 'Landscaping, exterior condition, driveway, entrance presentation' },
    { factor: 'Lot Size & Shape', description: 'Acreage, usability, easements, zoning restrictions' },
    { factor: 'Number of Bedrooms & Bathrooms', description: 'Bedroom/bath ratio impacts value; extra half-bath may add less than full bath' },
    { factor: 'Functional Layout', description: 'Flow between rooms, open-concept vs traditional, master suite quality' },
    { factor: 'Natural Light & Views', description: 'Windows, skylights, water/mountain views command premiums' },
    { factor: 'Energy Efficiency', description: 'Insulation, double-pane windows, solar panels, smart systems' },
    { factor: 'Unique Features', description: 'Pools, hot tubs, garages, decks—but only if typical for the area' },
    { factor: 'Age & Year Built', description: 'Newer homes typically appraise higher; older may have character premium' },
    { factor: 'Deferred Maintenance', description: 'Peeling paint, broken fixtures, worn carpets reduce value significantly' },
    { factor: 'Zoning & Legal Compliance', description: 'Unpermitted additions, illegal units, or zoning issues lower appraisals' },
  ]

  // Process steps
  const processSteps = [
    {
      step: 1,
      title: 'Order the Appraisal',
      description: 'Your lender orders an appraisal from an independent appraiser (you don\u2019t choose them). They assign an appraiser within 1–2 days.',
    },
    {
      step: 2,
      title: 'Appraiser Reviews Your File',
      description: 'The appraiser examines your address, home type, recent sales nearby, and any property history to prepare.',
    },
    {
      step: 3,
      title: 'Inspection Day',
      description: 'The appraiser visits your home, takes photos, measures rooms, notes condition, and documents features. This usually takes 1–3 hours.',
    },
    {
      step: 4,
      title: 'Analysis & Research',
      description: 'The appraiser analyzes comparable sales, market trends, and property data to establish a fair market value estimate.',
    },
    {
      step: 5,
      title: 'Report Completion',
      description: 'The appraiser prepares a detailed report with photos, property details, comparable sales, and the final valuation.',
    },
    {
      step: 6,
      title: 'Delivery to Lender',
      description: 'The appraisal report is sent to your lender. You\u2019re typically notified of the results within 3–7 business days.',
    },
  ]

  // Preparation checklist
  const preparationChecklist = [
    {
      room: 'Exterior',
      items: [
        'Mow lawn and trim hedges',
        'Remove clutter, trash, and old vehicles',
        'Clean windows and gutters',
        'Repair broken shutters or siding',
        'Ensure driveway is clean and crack-free',
        'Check that house number is visible',
      ],
    },
    {
      room: 'Entryway & Living Areas',
      items: [
        'Declutter—remove excess furniture',
        'Clean floors, walls, and ceiling',
        'Fix scuffed paint and peeling wallpaper',
        'Ensure light fixtures work',
        'Remove personal clutter (family photos, kids\u2019 toys)',
        'Open curtains for natural light',
      ],
    },
    {
      room: 'Kitchen',
      items: [
        'Clean appliances inside and out',
        'Fix dripping faucets and broken cabinet doors',
        'Ensure counters are clear and clean',
        'Repair or replace cracked tiles or flooring',
        'Check that all lights and outlets work',
        'Remove excess items from counters',
      ],
    },
    {
      room: 'Bathrooms',
      items: [
        'Fix dripping faucets and leaky toilets',
        'Clean tile grout; repair missing grout',
        'Replace cracked mirrors or light covers',
        'Ensure all vents and exhaust fans work',
        'Remove personal items; organize minimally',
        'Fix water stains or mold spots',
      ],
    },
    {
      room: 'Bedrooms',
      items: [
        'Make beds and declutter',
        'Ensure closets are organized and not overflowing',
        'Clean windows and replace torn screens',
        'Fix loose door handles and hinges',
        'Check smoke detectors are present',
        'Remove seasonal items and storage overflow',
      ],
    },
    {
      room: 'Basement & Attic',
      items: [
        'Remove items blocking access',
        'Ensure proper ventilation',
        'Check for visible mold or water damage',
        'Repair or report electrical panel issues',
        'Document finished vs. unfinished areas',
        'Ensure safe stairs and railings',
      ],
    },
    {
      room: 'Systems & Safety',
      items: [
        'Have HVAC serviced before appraisal',
        'Replace furnace/AC filters',
        'Ensure all smoke and carbon monoxide detectors work',
        'Check that electrical panel is accessible',
        'Verify water heater is in good condition',
        'Document recent major repairs or replacements',
      ],
    },
  ]

  // Appraisal vs Inspection
  const comparisonData = [
    { aspect: 'Purpose', appraisal: 'Estimate market value for lender', inspection: 'Identify repairs and condition issues' },
    { aspect: 'Who Orders', appraisal: 'Lender', inspection: 'Buyer (optional)' },
    { aspect: 'Who Pays', appraisal: 'Buyer (escrowed at closing)', inspection: 'Buyer (upfront)' },
    { aspect: 'Credential', appraisal: 'Licensed appraiser', inspection: 'Certified home inspector' },
    { aspect: 'Objective', appraisal: 'Determine value', inspection: 'Assess condition and safety' },
    { aspect: 'Report Focus', appraisal: 'Comparables, market data, value', inspection: 'Systems, defects, repairs needed' },
    { aspect: 'Time to Complete', appraisal: '3–7 business days', inspection: 'Same day, report in 24–48 hours' },
    { aspect: 'Cost Range', appraisal: '$300–$600', inspection: '$300–$500' },
    { aspect: 'Affects Closing', appraisal: 'Yes—if too low', inspection: 'No—informational only' },
    { aspect: 'Buyable', appraisal: 'No—lender ordered', inspection: 'Yes—buyer requested' },
  ]

  // Value improvements
  const valueImprovements = {
    increases: [
      { improvement: 'Kitchen Remodel', roi: '50–80%', notes: 'One of the highest ROI improvements; updated appliances and counters boost appraisal' },
      { improvement: 'Bathroom Update', roi: '50–70%', notes: 'New fixtures, tile, and vanity add significant value' },
      { improvement: 'Roof Replacement', roi: '70–110%', notes: 'Crucial for appraisal; a new roof can increase value more than cost' },
      { improvement: 'HVAC System', roi: '80–100%', notes: 'Modern heating/cooling systems highly valued by appraisers' },
      { improvement: 'Flooring (hardwood)', roi: '70–100%', notes: 'Hardwood flooring is a strong value add; carpet less so' },
      { improvement: 'Windows (double-pane)', roi: '60–80%', notes: 'Energy-efficient windows increase both value and appeal' },
      { improvement: 'Deck or Patio', roi: '50–80%', notes: 'Outdoor living space adds value; quality matters' },
      { improvement: 'Master Suite Addition', roi: '70–90%', notes: 'Extra bedroom or updated master bath significantly boosts value' },
      { improvement: 'Garage Addition', roi: '80–100%', notes: 'Extra parking highly valued; don\u2019t underestimate this' },
      { improvement: 'Landscaping & Curb Appeal', roi: '20–50%', notes: 'First impressions matter; invest in appearance' },
    ],
    decreases: [
      { improvement: 'Personal Spa/Hot Tub', reason: 'Niche appeal; maintenance costs deter many buyers' },
      { improvement: 'Swimming Pool', reason: 'High maintenance and insurance costs; not universally desired' },
      { improvement: 'Finished Basement (unpermitted)', reason: 'Illegal additions lower appraisals and create legal liability' },
      { improvement: 'Bright Paint Colors', reason: 'Too personal; appraisers prefer neutral tones' },
      { improvement: 'Converted Garage', reason: 'Lost parking reduces value significantly' },
      { improvement: 'In-ground Trampoline', reason: 'Safety concerns and liability insurance issues' },
      { improvement: 'Elaborate Water Features', reason: 'High maintenance; not universally appealing' },
      { improvement: 'Home Theater in Living Room', reason: 'Too specialized; reduces perceived room functionality' },
    ],
  }

  // Low appraisal solutions
  const lowAppraisalSolutions = [
    {
      option: 'Request a Second Appraisal',
      description: 'Ask your lender for a second appraisal if you believe the first was unfair. You\u2019ll pay another $300–$600.',
    },
    {
      option: 'Dispute the Appraisal',
      description: 'Provide documentation of recent improvements, comps, or appraiser errors to your lender. They may request a recheck.',
    },
    {
      option: 'Renegotiate the Price',
      description: 'Use the low appraisal to negotiate a lower offer with the seller. This is common and often successful.',
    },
    {
      option: 'Bring Cash to Closing',
      description: 'Cover the difference between the appraisal and offer price with additional cash down payment.',
    },
    {
      option: 'Appeal to Different Lender',
      description: 'Some lenders have different appraisal standards. Shop around—another lender might approve a higher value.',
    },
    {
      option: 'Wait for Market Shift',
      description: 'If possible, delay purchase 30–90 days. Rising markets can justify a re-appraisal at higher value.',
    },
    {
      option: 'Walk Away',
      description: 'If appraisal gap is too large, you can typically back out without penalty in a contingency-based offer.',
    },
  ]

  return (
    <div style={{ backgroundColor: 'var(--le-bg)', color: 'var(--le-text)', minHeight: '100vh' }}>
      {/* Hero Section */}
      <section style={{
        backgroundColor: 'linear-gradient(135deg, var(--le-primary) 0%, rgba(var(--le-primary-rgb), 0.9) 100%)',
        backgroundImage: 'linear-gradient(135deg, var(--le-primary) 0%, rgba(var(--le-primary-rgb), 0.9) 100%)',
        color: '#fff',
        padding: '80px 20px',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '3.5rem', fontWeight: 'bold', marginBottom: '20px', lineHeight: '1.2' }}>
            Understanding Home Appraisals
          </h1>
          <p style={{ fontSize: '1.25rem', marginBottom: '30px', opacity: 0.95 }}>
            Your comprehensive guide to the appraisal process, preparation tips, and what appraisers really look for
          </p>
          <button
            onClick={() => document.getElementById('lead-capture')?.scrollIntoView({ behavior: 'smooth' })}
            style={{
              padding: '15px 40px',
              fontSize: '1.1rem',
              backgroundColor: 'var(--le-accent)',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600',
              transition: 'all 0.3s ease',
            }}
            onMouseOver={(e) => (e.currentTarget.style.opacity = '0.9')}
            onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
          >
            Get Your Free Pre-Appraisal Review
          </button>
        </div>
      </section>

      {/* What is an Appraisal */}
      <section style={{ padding: '60px 20px', maxWidth: '1000px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '40px', color: 'var(--le-primary)' }}>
          What is a Home Appraisal?
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
          <div style={{
            backgroundColor: 'var(--le-bg-card)',
            padding: '30px',
            borderRadius: '8px',
            borderLeft: '4px solid var(--le-primary)',
          }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: '600', marginBottom: '15px', color: 'var(--le-primary)' }}>
              Purpose
            </h3>
            <p style={{ color: 'var(--le-text-secondary)', lineHeight: '1.6' }}>
              An appraisal is an unbiased, professional estimate of your home\u2019s fair market value. Lenders use it to ensure they\u2019re not loaning more than the home is worth.
            </p>
          </div>
          <div style={{
            backgroundColor: 'var(--le-bg-card)',
            padding: '30px',
            borderRadius: '8px',
            borderLeft: '4px solid var(--le-accent)',
          }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: '600', marginBottom: '15px', color: 'var(--le-accent)' }}>
              Who Orders It
            </h3>
            <p style={{ color: 'var(--le-text-secondary)', lineHeight: '1.6' }}>
              Your mortgage lender orders the appraisal. You don\u2019t choose the appraiser—the lender assigns one to ensure independence and objectivity.
            </p>
          </div>
          <div style={{
            backgroundColor: 'var(--le-bg-card)',
            padding: '30px',
            borderRadius: '8px',
            borderLeft: '4px solid var(--le-success)',
          }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: '600', marginBottom: '15px', color: 'var(--le-success)' }}>
              Who Pays
            </h3>
            <p style={{ color: 'var(--le-text-secondary)', lineHeight: '1.6' }}>
              You (the buyer) pay for the appraisal, typically $300–$600. The cost is escrowed and collected at closing, not paid upfront.
            </p>
          </div>
          <div style={{
            backgroundColor: 'var(--le-bg-card)',
            padding: '30px',
            borderRadius: '8px',
            borderLeft: '4px solid var(--le-warning)',
          }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: '600', marginBottom: '15px', color: 'var(--le-warning)' }}>
              How Long It Takes
            </h3>
            <p style={{ color: 'var(--le-text-secondary)', lineHeight: '1.6' }}>
              The inspection itself takes 1–3 hours. The full appraisal report typically takes 3–7 business days to complete after the inspection.
            </p>
          </div>
          <div style={{
            backgroundColor: 'var(--le-bg-card)',
            padding: '30px',
            borderRadius: '8px',
            borderLeft: '4px solid var(--le-primary)',
          }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: '600', marginBottom: '15px', color: 'var(--le-primary)' }}>
              Licensed Professional
            </h3>
            <p style={{ color: 'var(--le-text-secondary)', lineHeight: '1.6' }}>
              Appraisals must be conducted by state-licensed appraisers who follow USPAP (Uniform Standards of Professional Appraisal Practice).
            </p>
          </div>
          <div style={{
            backgroundColor: 'var(--le-bg-card)',
            padding: '30px',
            borderRadius: '8px',
            borderLeft: '4px solid var(--le-accent)',
          }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: '600', marginBottom: '15px', color: 'var(--le-accent)' }}>
              Uses the Value For
            </h3>
            <p style={{ color: 'var(--le-text-secondary)', lineHeight: '1.6' }}>
              Your lender uses the appraisal to determine the maximum loan amount. If it\u2019s low, you may need to renegotiate or bring more cash.
            </p>
          </div>
        </div>
      </section>

      {/* Process Walkthrough */}
      <section style={{ padding: '60px 20px', backgroundColor: 'var(--le-bg-card)', marginTop: '40px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '50px', color: 'var(--le-primary)', textAlign: 'center' }}>
            The Appraisal Process: 6 Steps
          </h2>
          <div style={{ display: 'grid', gap: '30px' }}>
            {processSteps.map((step) => (
              <div key={step.step} style={{
                display: 'flex',
                gap: '25px',
                alignItems: 'flex-start',
              }}>
                <div style={{
                  minWidth: '60px',
                  width: '60px',
                  height: '60px',
                  backgroundColor: 'var(--le-primary)',
                  color: '#fff',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.8rem',
                  fontWeight: 'bold',
                }}>
                  {step.step}
                </div>
                <div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: '600', marginBottom: '10px', color: 'var(--le-primary)' }}>
                    {step.title}
                  </h3>
                  <p style={{ color: 'var(--le-text-secondary)', lineHeight: '1.6' }}>
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Appraisers Look For */}
      <section style={{ padding: '60px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '40px', color: 'var(--le-primary)' }}>
          What Appraisers Look For: 15+ Factors
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '25px' }}>
          {appraisalFactors.map((item, idx) => (
            <div key={idx} style={{
              backgroundColor: 'var(--le-bg-card)',
              padding: '25px',
              borderRadius: '8px',
              borderTop: '3px solid var(--le-accent)',
            }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '10px', color: 'var(--le-primary)' }}>
                {item.factor}
              </h3>
              <p style={{ color: 'var(--le-text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Home Preparation Checklist */}
      <section style={{ padding: '60px 20px', backgroundColor: 'var(--le-bg-card)', marginTop: '40px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '40px', color: 'var(--le-primary)', textAlign: 'center' }}>
            How to Prepare Your Home: Room-by-Room Checklist
          </h2>
          <p style={{ textAlign: 'center', color: 'var(--le-text-secondary)', marginBottom: '40px', fontSize: '1.05rem' }}>
            Complete these tasks 1–2 weeks before your appraisal to make the best impression
          </p>
          <div style={{ display: 'grid', gap: '30px' }}>
            {preparationChecklist.map((room, idx) => (
              <div key={idx} style={{
                backgroundColor: 'var(--le-bg)',
                padding: '25px',
                borderRadius: '8px',
                borderLeft: '4px solid var(--le-primary)',
              }}>
                <h3 style={{ fontSize: '1.3rem', fontWeight: '600', marginBottom: '15px', color: 'var(--le-primary)' }}>
                  {room.room}
                </h3>
                <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '12px', listStyle: 'none', paddingLeft: 0 }}>
                  {room.items.map((item, itemIdx) => (
                    <li key={itemIdx} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      color: 'var(--le-text-secondary)',
                    }}>
                      <span style={{ color: 'var(--le-success)', fontSize: '1.2rem' }}>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Appraisal vs Inspection */}
      <section style={{ padding: '60px 20px', maxWidth: '1100px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '40px', color: 'var(--le-primary)' }}>
          Appraisal vs. Home Inspection: What\u2019s the Difference?
        </h2>
        <div style={{
          overflowX: 'auto',
          borderRadius: '8px',
          border: `1px solid var(--le-border)`,
        }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            backgroundColor: 'var(--le-bg-card)',
          }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--le-primary)' }}>
                <th style={{
                  padding: '15px',
                  textAlign: 'left',
                  color: '#fff',
                  fontWeight: '600',
                  borderBottom: `2px solid var(--le-primary)`,
                }}>
                  Aspect
                </th>
                <th style={{
                  padding: '15px',
                  textAlign: 'left',
                  color: '#fff',
                  fontWeight: '600',
                  borderBottom: `2px solid var(--le-primary)`,
                }}>
                  Appraisal
                </th>
                <th style={{
                  padding: '15px',
                  textAlign: 'left',
                  color: '#fff',
                  fontWeight: '600',
                  borderBottom: `2px solid var(--le-primary)`,
                }}>
                  Home Inspection
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row, idx) => (
                <tr key={idx} style={{
                  borderBottom: `1px solid var(--le-border)`,
                  backgroundColor: idx % 2 === 0 ? 'var(--le-bg-card)' : 'var(--le-bg)',
                }}>
                  <td style={{
                    padding: '15px',
                    fontWeight: '600',
                    color: 'var(--le-primary)',
                  }}>
                    {row.aspect}
                  </td>
                  <td style={{
                    padding: '15px',
                    color: 'var(--le-text-secondary)',
                  }}>
                    {row.appraisal}
                  </td>
                  <td style={{
                    padding: '15px',
                    color: 'var(--le-text-secondary)',
                  }}>
                    {row.inspection}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Value Improvements */}
      <section style={{ padding: '60px 20px', backgroundColor: 'var(--le-bg-card)', marginTop: '40px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '50px', color: 'var(--le-primary)', textAlign: 'center' }}>
            What Affects Your Home\u2019s Appraised Value
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', gap: '40px' }}>
            {/* Increases Value */}
            <div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                marginBottom: '25px',
                color: 'var(--le-success)',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}>
                <span style={{ fontSize: '1.8rem' }}>↑</span> Improvements That Increase Value
              </h3>
              <div style={{ display: 'grid', gap: '15px' }}>
                {valueImprovements.increases.map((item, idx) => (
                  <div key={idx} style={{
                    backgroundColor: 'var(--le-bg)',
                    padding: '15px',
                    borderRadius: '6px',
                    borderLeft: `3px solid var(--le-success)`,
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '8px' }}>
                      <h4 style={{ fontSize: '1.05rem', fontWeight: '600', color: 'var(--le-primary)' }}>
                        {item.improvement}
                      </h4>
                      <span style={{
                        backgroundColor: 'var(--le-success)',
                        color: '#fff',
                        padding: '4px 12px',
                        borderRadius: '4px',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        whiteSpace: 'nowrap',
                      }}>
                        {item.roi} ROI
                      </span>
                    </div>
                    <p style={{ fontSize: '0.9rem', color: 'var(--le-text-secondary)' }}>
                      {item.notes}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Decreases Value */}
            <div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                marginBottom: '25px',
                color: 'var(--le-danger)',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}>
                <span style={{ fontSize: '1.8rem' }}>↓</span> Features That May Hurt Value
              </h3>
              <div style={{ display: 'grid', gap: '15px' }}>
                {valueImprovements.decreases.map((item, idx) => (
                  <div key={idx} style={{
                    backgroundColor: 'var(--le-bg)',
                    padding: '15px',
                    borderRadius: '6px',
                    borderLeft: `3px solid var(--le-danger)`,
                  }}>
                    <h4 style={{
                      fontSize: '1.05rem',
                      fontWeight: '600',
                      color: 'var(--le-primary)',
                      marginBottom: '8px',
                    }}>
                      {item.improvement}
                    </h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--le-text-secondary)' }}>
                      {item.reason}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Low Appraisal Guide */}
      <section style={{ padding: '60px 20px', maxWidth: '1000px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '40px', color: 'var(--le-primary)' }}>
          What to Do if Your Appraisal Comes in Low
        </h2>
        <p style={{ fontSize: '1.05rem', color: 'var(--le-text-secondary)', marginBottom: '40px', lineHeight: '1.8' }}>
          A low appraisal doesn\u2019t mean your home isn\u2019t worth what you thought. You have several options to address the situation:
        </p>
        <div style={{ display: 'grid', gap: '20px' }}>
          {lowAppraisalSolutions.map((solution, idx) => (
            <div key={idx} style={{
              backgroundColor: 'var(--le-bg-card)',
              padding: '25px',
              borderRadius: '8px',
              borderLeft: `4px solid ${idx === 0 ? 'var(--le-primary)' : idx === 1 ? 'var(--le-accent)' : idx === 2 ? 'var(--le-success)' : idx === 3 ? 'var(--le-warning)' : 'var(--le-danger)'}`,
            }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '10px', color: 'var(--le-primary)' }}>
                {solution.option}
              </h3>
              <p style={{ color: 'var(--le-text-secondary)', lineHeight: '1.6' }}>
                {solution.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Cost Estimator */}
      <section style={{ padding: '60px 20px', backgroundColor: 'var(--le-bg-card)', marginTop: '40px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '40px', color: 'var(--le-primary)', textAlign: 'center' }}>
            Appraisal Cost Estimator
          </h2>
          <p style={{ textAlign: 'center', color: 'var(--le-text-secondary)', marginBottom: '40px', fontSize: '1rem' }}>
            Typical appraisal costs vary by home type and location. Use this tool to estimate your cost:
          </p>

          <div style={{
            backgroundColor: 'var(--le-bg)',
            padding: '35px',
            borderRadius: '8px',
            border: `1px solid var(--le-border)`,
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px', marginBottom: '30px' }}>
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '10px',
                  fontWeight: '600',
                  color: 'var(--le-primary)',
                }}>
                  Home Type
                </label>
                <select
                  value={estimatorData.homeType}
                  onChange={(e) => setEstimatorData({ ...estimatorData, homeType: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '6px',
                    border: `1px solid var(--le-border)`,
                    backgroundColor: 'var(--le-bg-card)',
                    color: 'var(--le-text)',
                    fontSize: '1rem',
                    cursor: 'pointer',
                  }}
                >
                  <option value="single-family">Single-Family Home</option>
                  <option value="condo">Condo/Townhouse</option>
                  <option value="multi-family">Multi-Family (2–4 units)</option>
                </select>
              </div>
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '10px',
                  fontWeight: '600',
                  color: 'var(--le-primary)',
                }}>
                  Location
                </label>
                <select
                  value={estimatorData.location}
                  onChange={(e) => setEstimatorData({ ...estimatorData, location: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '6px',
                    border: `1px solid var(--le-border)`,
                    backgroundColor: 'var(--le-bg-card)',
                    color: 'var(--le-text)',
                    fontSize: '1rem',
                    cursor: 'pointer',
                  }}
                >
                  <option value="urban">Urban</option>
                  <option value="suburban">Suburban</option>
                  <option value="rural">Rural</option>
                </select>
              </div>
            </div>

            <div style={{
              backgroundColor: 'var(--le-bg-card)',
              padding: '30px',
              borderRadius: '8px',
              textAlign: 'center',
              border: `2px solid var(--le-accent)`,
            }}>
              <p style={{ color: 'var(--le-text-secondary)', marginBottom: '10px', fontSize: '0.95rem' }}>
                Estimated Appraisal Cost
              </p>
              <p style={{
                fontSize: '3rem',
                fontWeight: 'bold',
                color: 'var(--le-accent)',
                margin: '0',
              }}>
                ${currentCost}
              </p>
              <p style={{ color: 'var(--le-text-secondary)', marginTop: '10px', fontSize: '0.9rem' }}>
                Typical range: ${currentCost - 50}–${currentCost + 100}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Myths Debunked */}
      <section style={{ padding: '60px 20px', maxWidth: '1000px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '40px', color: 'var(--le-primary)', textAlign: 'center' }}>
          8 Common Appraisal Myths Debunked
        </h2>
        <div style={{ display: 'grid', gap: '20px' }}>
          {myths.map((item, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: 'var(--le-bg-card)',
                borderRadius: '8px',
                overflow: 'hidden',
              }}
            >
              <button
                onClick={() => toggleAccordion(idx)}
                style={{
                  width: '100%',
                  padding: '20px 25px',
                  textAlign: 'left',
                  border: 'none',
                  backgroundColor: activeAccordion === idx ? 'var(--le-primary)' : 'var(--le-bg-card)',
                  color: activeAccordion === idx ? '#fff' : 'var(--le-primary)',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  transition: 'all 0.3s ease',
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <span style={{ fontSize: '1.3rem' }}>❌</span>
                  {item.myth}
                </span>
                <span style={{ fontSize: '1.3rem', transform: activeAccordion === idx ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}>
                  ▼
                </span>
              </button>
              {activeAccordion === idx && (
                <div style={{
                  padding: '25px',
                  backgroundColor: 'var(--le-bg)',
                  borderTop: `1px solid var(--le-border)`,
                }}>
                  <div style={{ display: 'flex', gap: '15px' }}>
                    <span style={{ fontSize: '1.5rem', lineHeight: '1.6' }}>✓</span>
                    <div>
                      <p style={{ fontSize: '0.95rem', color: 'var(--le-text-secondary)', lineHeight: '1.7', margin: 0 }}>
                        <strong style={{ color: 'var(--le-success)' }}>Reality:</strong> {item.reality}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section style={{ padding: '60px 20px', backgroundColor: 'var(--le-bg-card)', marginTop: '40px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '40px', color: 'var(--le-primary)', textAlign: 'center' }}>
            Frequently Asked Questions
          </h2>
          <div style={{ display: 'grid', gap: '15px' }}>
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: 'var(--le-bg)',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  border: `1px solid var(--le-border)`,
                }}
              >
                <button
                  onClick={() => toggleAccordion(myths.length + idx)}
                  style={{
                    width: '100%',
                    padding: '20px 25px',
                    textAlign: 'left',
                    border: 'none',
                    backgroundColor: activeAccordion === myths.length + idx ? 'var(--le-accent)' : 'transparent',
                    color: activeAccordion === myths.length + idx ? '#fff' : 'var(--le-primary)',
                    fontSize: '1.05rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <span style={{ fontSize: '1.2rem' }}>❓</span>
                    {faq.question}
                  </span>
                  <span style={{ fontSize: '1.3rem', transform: activeAccordion === myths.length + idx ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}>
                    ▼
                  </span>
                </button>
                {activeAccordion === myths.length + idx && (
                  <div style={{
                    padding: '25px',
                    backgroundColor: 'var(--le-bg-card)',
                    borderTop: `1px solid var(--le-border)`,
                  }}>
                    <p style={{ color: 'var(--le-text-secondary)', lineHeight: '1.7', margin: 0 }}>
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Capture Section */}
      <section
        id="lead-capture"
        style={{
          padding: '60px 20px',
          backgroundColor: 'var(--le-primary)',
          color: '#fff',
          marginTop: '40px',
        }}
      >
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 'bold', marginBottom: '15px', textAlign: 'center' }}>
            Get Your Free Pre-Appraisal Home Review
          </h2>
          <p style={{
            fontSize: '1.05rem',
            textAlign: 'center',
            marginBottom: '35px',
            opacity: 0.95,
            lineHeight: '1.6',
          }}>
            Our experts will evaluate your home\u2019s key appraisal factors and provide a preliminary assessment to help you prepare.
          </p>

          {formSubmitted ? (
            <div style={{
              backgroundColor: 'var(--le-success)',
              padding: '20px',
              borderRadius: '8px',
              textAlign: 'center',
              marginTop: '20px',
            }}>
              <p style={{ fontSize: '1.1rem', fontWeight: '600', margin: 0 }}>
                ✓ Thanks! We\u2019ll be in touch soon with your free pre-appraisal review.
              </p>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} style={{ display: 'grid', gap: '15px' }}>
              <input
                type="text"
                name="name"
                placeholder="Your Full Name"
                value={formData.name}
                onChange={handleFormChange}
                required
                style={{
                  padding: '15px',
                  borderRadius: '6px',
                  border: 'none',
                  fontSize: '1rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  color: 'var(--le-text)',
                }}
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleFormChange}
                required
                style={{
                  padding: '15px',
                  borderRadius: '6px',
                  border: 'none',
                  fontSize: '1rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  color: 'var(--le-text)',
                }}
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleFormChange}
                required
                style={{
                  padding: '15px',
                  borderRadius: '6px',
                  border: 'none',
                  fontSize: '1rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  color: 'var(--le-text)',
                }}
              />
              <button
                type="submit"
                style={{
                  padding: '15px',
                  borderRadius: '6px',
                  border: 'none',
                  backgroundColor: 'var(--le-accent)',
                  color: '#fff',
                  fontSize: '1.05rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  marginTop: '10px',
                }}
                onMouseOver={(e) => (e.currentTarget.style.opacity = '0.9')}
                onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
              >
                Get Your Free Review
              </button>
            </form>
          )}

          <p style={{
            fontSize: '0.85rem',
            textAlign: 'center',
            marginTop: '20px',
            opacity: 0.85,
          }}>
            We respect your privacy. Your information is safe and will only be used to provide your review.
          </p>
        </div>
      </section>

      {/* Footer CTA */}
      <section style={{ padding: '40px 20px', backgroundColor: 'var(--le-bg-card)', textAlign: 'center' }}>
        <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '15px', color: 'var(--le-primary)' }}>
          Ready to get your home appraised?
        </h3>
        <p style={{ color: 'var(--le-text-secondary)', marginBottom: '25px' }}>
          Connect with our team to discuss your appraisal needs and get expert guidance.
        </p>
        <button
          onClick={() => document.getElementById('lead-capture')?.scrollIntoView({ behavior: 'smooth' })}
          style={{
            padding: '12px 35px',
            fontSize: '1rem',
            backgroundColor: 'var(--le-primary)',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: '600',
            transition: 'all 0.3s ease',
          }}
          onMouseOver={(e) => (e.currentTarget.style.opacity = '0.9')}
          onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
        >
          Request a Free Review
        </button>
      </section>

      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map(faq => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
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
            '@type': 'WebPage',
            name: 'Understanding Home Appraisals | LeadEngine',
            description: 'Complete guide to home appraisals: process, preparation, what appraisers look for, and how to handle low appraisals.',
            publisher: {
              '@type': 'Organization',
              name: 'LeadEngine',
              url: 'https://realtyclientengine.app',
            },
            author: {
              '@type': 'Organization',
              name: 'LeadEngine Real Estate',
            },
            datePublished: '2026-04-02',
            dateModified: '2026-04-02',
          }),
        }}
      />
    </div>
  )
}
