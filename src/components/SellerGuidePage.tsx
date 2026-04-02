'use client';

import React, { useState } from 'react';

interface TimelineStep {
  id: number;
  title: string;
  description: string;
  content: string;
  isOpen?: boolean;
}

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  isOpen?: boolean;
}

interface TestimonialCard {
  id: string;
  name: string;
  homeType: string;
  location: string;
  scenario: string;
  outcome: string;
  quote: string;
}

const SellerGuidePage: React.FC<{ onOpenCapture?: (variant: string) => void }> = ({
  onOpenCapture,
}) => {
  const [expandedStep, setExpandedStep] = useState<number | null>(null);
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    address: '',
    name: '',
    email: '',
    phone: '',
  });

  const handleCaptureOpen = (variant: string) => {
    if (onOpenCapture) {
      onOpenCapture(variant);
    } else {
      window.dispatchEvent(
        new CustomEvent('openLeadCapture', { detail: { variant } })
      );
    }
  };

  const timelineSteps: TimelineStep[] = [
    {
      id: 1,
      title: 'Decide to Sell',
      description: 'Assess your readiness and timing',
      content: `Before you list your home, take time to honestly evaluate whether now is the right time to sell. Consider your personal circumstances—are you relocating for a job, downsizing, upgrading, or facing financial pressures? Assess your home\u2019s condition and any major repairs it may need. Evaluate the current market conditions in your area. Is it a seller\u2019s market with low inventory and high demand, or a buyer\u2019s market with more listings and longer sale times? Talk to a local real estate professional about current conditions, estimated selling price, and timeline.

Your mindset matters too. Selling a home requires patience, flexibility, and the ability to depersonalize your space. You\u2019ll need to accommodate showings, manage expectations, and potentially negotiate with multiple buyers. Make sure you\u2019re mentally prepared for the process before you commit to listing.

Finally, consider your financial position. Selling involves costs—realtor commissions (typically 5-6%), closing costs, and potentially repairs or staging expenses. Have a clear understanding of your net proceeds after these costs to ensure selling makes financial sense for your situation.`,
    },
    {
      id: 2,
      title: 'Choose an Agent',
      description: 'Find the right professional to represent you',
      content: `Selecting the right real estate agent is one of the most important decisions in your selling journey. Your agent will price your home, market it, show it to buyers, and negotiate on your behalf. Choose someone with deep local market knowledge, a proven track record of sales in your area, and experience with homes similar to yours.

Interview 2-3 agents before making a decision. Ask about their marketing strategy—do they use professional photography, staging, virtual tours, and targeted digital advertising? How many homes have they sold in the past year? What\u2019s their average sale price relative to listing price? How available are they for questions and updates? Look for someone who is responsive, proactive, and who explains their strategy clearly.

Consider their negotiation style. A good agent advocates firmly for your interests while remaining professional and solution-focused. They should be honest about your home\u2019s strengths and challenges, realistic about pricing, and willing to provide comparable market analysis (CMAs) to support their recommendations. Trust and communication are paramount—choose someone you feel confident will represent your best interests throughout the process.`,
    },
    {
      id: 3,
      title: 'Price Your Home',
      description: 'Strategic pricing drives both offers and speed',
      content: `Pricing is perhaps the single most critical factor in selling your home successfully. Overprice, and your home sits on the market, accumulating "stale" status that discourages buyers. Underprice, and you leave money on the table. The right price balances these competing goals—it attracts buyer interest while maximizing your proceeds.

Your agent will prepare a Comparative Market Analysis (CMA) comparing your home to recently sold properties in your area. They\u2019ll look at homes with similar size, condition, location, and amenities that sold within the last 3-6 months. They\u2019ll adjust for differences—an extra bathroom, updated kitchen, or higher-end finishes typically command a premium. They\u2019ll also factor in current market conditions, seasonal trends, and the number of active competing listings.

Price too aggressively if you\u2019re in a strong market or if your home is truly exceptional. However, most homes benefit from strategic initial pricing that generates buyer interest and multiple offers, which creates urgency and competition that can drive the final sale price higher. Consider starting at a competitive price point rather than overpricing and gradually reducing—price reductions send a negative signal to buyers.`,
    },
    {
      id: 4,
      title: 'Prepare Your Home',
      description: 'Repairs, staging, and professional photography',
      content: `First impressions matter enormously. Buyers will fall in love with (or reject) your home in the first 10 seconds of walking in. Prepare your home to present its best self through a combination of repairs, deep cleaning, staging, and professional photography.

Start with critical repairs. Fix anything broken or unsafe—leaky faucets, broken windows, damaged flooring, roof leaks, or electrical issues. These must-haves affect your home\u2019s value and buyer confidence. You don\u2019t need to renovate your kitchen, but you should ensure everything is in working order and well-maintained.

Deep clean everything—baseboards, windows, light fixtures, carpets, appliances. Hire a professional cleaning service if needed; the expense is worth the transformation. Remove personal clutter, excess furniture, and family photos. The goal is to help buyers envision themselves living in the space, not distracted by your belongings.

Professional staging can increase perceived value by 10-20%. A stager will rearrange furniture to maximize flow, add strategic lighting, declutter spaces, and create an inviting atmosphere. Professional photography is essential—most home searches start online, so high-quality photos directly drive in-person showings. Consider drone photography if your property has attractive landscaping or views.`,
    },
    {
      id: 5,
      title: 'List & Market',
      description: 'MLS, open houses, and digital strategy',
      content: `Once your home is ready, your agent will list it on the Multiple Listing Service (MLS)—the database that real estate professionals use to find properties. Your listing will include photos, description, key information, and showing instructions. A well-written description highlights your home\u2019s best features while appealing to target buyers.

Your agent should employ a comprehensive marketing strategy: professional photography and virtual tours, targeted digital advertising on Zillow, Redfin, and other major platforms, and geographic and demographic targeting. They\u2019ll coordinate open houses to generate buyer and agent traffic. They may also host agent open houses before public open houses to build buzz among local professionals.

Maintain momentum. Track showing activity, feedback, and online engagement metrics. A showing surge in the first 2 weeks is common—this is when buyer interest peaks. Stay responsive to showing requests, be flexible with timing, and keep feedback channels open. Ask your agent for weekly reports on showing activity, days on market, and market positioning compared to competing listings. If activity slows, be willing to adjust pricing or explore strategic improvements.`,
    },
    {
      id: 6,
      title: 'Showings & Offers',
      description: 'Generate interest and negotiate strategically',
      content: `Showings are your home\u2019s chance to shine. Prepare for every showing by ensuring the home is clean, well-lit, and inviting. Open curtains to maximize natural light. Remove pets if possible or confine them to a specific area. Play soft background music at low volume. Leave the home smelling pleasant—avoid strong odors. Time your absences well; buyers appreciate minimal distraction.

Your agent will collect feedback after each showing. This critical information tells you what\u2019s working and what needs adjustment. Are buyers complimenting specific features? Are they asking questions about certain areas? Are they concerned about price, condition, or layout? Use this feedback to refine your marketing message or make strategic adjustments.

When offers arrive, you\u2019ll enter negotiation mode. Your first offer may not be your best offer. In a hot market, you may receive multiple offers simultaneously—this creates competition that typically drives your price upward. Your agent will advise on each offer\u2019s strengths and weaknesses, contingencies, and negotiation leverage. Be prepared to negotiate on price, but also consider closing timeline, inspection contingencies, financing contingencies, and earnest money deposits. Sometimes a lower price with a faster close and fewer contingencies is better than a higher offer with significant risks.`,
    },
    {
      id: 7,
      title: 'Under Contract',
      description: 'Inspections, appraisals, and contingencies',
      content: `Once you accept an offer, your home goes "under contract." This doesn\u2019t mean the sale is guaranteed—several milestones must be satisfied before closing. The contract typically includes contingencies allowing the buyer to conduct a home inspection, appraisal, and final walkthrough.

The home inspection is the buyer\u2019s opportunity to identify issues. A professional inspector spends 2-3 hours examining your home—roof, foundation, plumbing, electrical, HVAC, appliances, and structural elements. The inspection report details any issues found. Buyers may then request repairs, ask for credits toward closing costs, or renegotiate price. Expect some negotiation here; not all findings require immediate attention. Focus on legitimate defects while resisting unreasonable demands. Many inspections reveal minor issues that don\u2019t materially affect the sale.

The appraisal ensures the home\u2019s value supports the purchase price. If the appraisal comes in lower than the sale price, negotiations often resume. The buyer may back out, renegotiate, or make up the difference in cash. Your agent will monitor the appraisal process.

Title search and clearing any liens completes the due diligence phase. Most sales close without major complications, but stay engaged and responsive to any requests or issues that arise.`,
    },
    {
      id: 8,
      title: 'Close & Move',
      description: 'Final walkthrough, closing documents, and transition',
      content: `You\u2019re in the final stretch. Your lender will order a final walkthrough 24-48 hours before closing. This is your last chance to verify the buyer hasn\u2019t made unauthorized changes and that the home is in the agreed-upon condition. Walk through with your agent and verify agreed-upon repairs were completed, fixtures that were supposed to convey are still present, and there\u2019s no damage.

On closing day, you\u2019ll sign a stack of documents at the closing attorney\u2019s office or with a title company. Review the Closing Disclosure carefully—verify the loan amount, interest rate, payment terms, and closing costs. Your agent should explain anything unclear. You\u2019ll sign the deed transferring ownership to the buyer, sign final mortgage payoff instructions, and review a settlement statement showing all costs and credits.

After signing, funds are transferred. Once the buyer\u2019s loan funds and all documents are recorded, the deed is officially transferred. Keys are exchanged, and the home is officially no longer yours. Coordinate moving day logistics, utilities transfer, mail forwarding, and address changes with insurance and service providers.

Take time to reflect on your selling journey. You\u2019ve successfully navigated one of life\u2019s biggest transactions. Whether you\u2019re moving to a new chapter or upgrading to your dream home, you\u2019ve learned valuable lessons about your market, negotiation, and the home selling process.`,
    },
  ];

  const faqs: FAQItem[] = [
    {
      id: 'faq-1',
      question: 'How long does it typically take to sell a home?',
      answer:
        'The median time on market varies by location and market conditions, typically ranging from 20-45 days nationally. In a seller\u2019s market with strong buyer demand and low inventory, homes may sell within 7-14 days. In a buyer\u2019s market with more inventory and less demand, it can take 60+ days. Factors affecting timeline include pricing, condition, location, seasonality, and marketing quality. Homes priced competitively and in move-in condition typically sell faster. Winter months and early summer tend to be slower than spring and early fall.',
    },
    {
      id: 'faq-2',
      question: 'How much does it cost to sell a home?',
      answer:
        'Primary costs include realtor commission (typically 5-6% split between seller and buyer\u2019s agents), closing costs (2-4% of sale price including title insurance, attorney fees, and recording fees), and home preparation costs (staging, repairs, professional photography, minor updates). If your home doesn\u2019t appraise at the agreed price or you need to cover a shortfall, additional costs may arise. Total selling costs typically range from 8-12% of your sale price. Discuss all potential costs upfront with your agent and closing attorney.',
    },
    {
      id: 'faq-3',
      question: 'Should I make repairs before selling?',
      answer:
        'Make repairs strategically. Critical repairs that affect safety, structural integrity, or functionality are essential—leaky roofs, broken windows, non-functioning appliances, and plumbing issues must be addressed. These directly impact your home\u2019s marketability and value. However, avoid expensive cosmetic renovations or major remodels unless they directly address a significant competitive disadvantage. Often, a price adjustment is more acceptable to buyers than absorbing renovation costs. Invest in thorough cleaning and staging instead—these typically offer better ROI.',
    },
    {
      id: 'faq-4',
      question: 'What is staging and is it worth the investment?',
      answer:
        'Staging is strategically arranging and decorating your home to appeal to the widest range of buyers. A stager declutters, rearranges furniture to improve flow, adds strategic lighting, and creates an emotional connection. Studies show staged homes sell 73% faster and command 1-20% higher prices depending on market conditions. Professional staging typically costs $1,000-3,000 but often returns 3-5x that investment through faster sales and higher prices. Even basic staging—decluttering, fresh paint, new hardware, and landscaping updates—can significantly impact buyer perception.',
    },
    {
      id: 'faq-5',
      question: 'How do I choose the right listing price?',
      answer:
        'Your agent will prepare a Comparative Market Analysis (CMA) comparing your home to recently sold properties with similar characteristics—size, condition, location, upgrades, amenities. Adjust for differences in condition, finishes, lot size, and special features. Consider current market conditions—how many days have similar homes been on market? What\u2019s the ratio of list price to actual sale price? Price competitively from day one; overpricing generates fewer showings and often results in larger price reductions that signal weakness. A strategic initial price often generates more buyer interest and multiple offers, driving final sale price higher.',
    },
    {
      id: 'faq-6',
      question: 'What are typical seller closing costs?',
      answer:
        'Seller closing costs typically include: realtor commission (5-6% of sale price), title insurance for the buyer ($400-1,200), transfer/recording fees ($50-300), attorney fees ($500-1,500), property taxes prorated through closing date, and homeowners association fees if applicable. Some jurisdictions or situations may involve additional costs. Your closing attorney will provide an itemized settlement statement showing all costs before closing. Total seller closing costs typically range from 6-10% of sale price, though this varies significantly by location and individual circumstances.',
    },
    {
      id: 'faq-7',
      question: 'Should I be present during showings?',
      answer:
        'Generally, you should not be present during showings. Your absence allows buyers to envision themselves living in the space without feeling observed or awkward. They\u2019re more likely to open closets, test faucets, discuss features, and speak freely when the owners aren\u2019t present. Time your showings to coincide with your schedule—arrange to run errands during showing windows. If you must be home, stay in a separate area and remain quiet. Ensure your agent or a stager is present to open doors, answer questions, and control the experience.',
    },
    {
      id: 'faq-8',
      question: 'What if my home doesn\u2019t sell?',
      answer:
        'If your home isn\u2019t selling, the issue is typically pricing, condition, or marketing. Review feedback from showings—what are buyers asking about or criticizing? Check your competition—have similar homes sold recently? Consider price reduction, which is often more effective than cosmetic improvements. Refresh your marketing—new photos, virtual tours, or expanded advertising may help. Address any identifiable issues identified by inspectors or agents. If your agent isn\u2019t delivering results after 30-45 days, you may consider changing agents. Real estate is ultimately a numbers game—the right price and marketing will generate interest.',
    },
    {
      id: 'faq-9',
      question: 'Can I sell my home as-is?',
      answer:
        'Yes, you can sell your home as-is, meaning you won\u2019t make repairs or upgrades. However, "as-is" sales typically sell for 5-20% less than homes in move-in condition, take longer to sell, and attract fewer buyers. You\u2019ll still need to disclose known defects to buyers in most jurisdictions. Buyers will still conduct inspections and appraisals. "As-is" can work if your home has significant issues that would cost more to repair than the price reduction you\u2019d accept, or if you\u2019re selling to an investor or buyer willing to renovate. Discuss the pros and cons with your agent.',
    },
    {
      id: 'faq-10',
      question: 'What happens immediately after I accept an offer?',
      answer:
        'After you accept an offer, the buyer typically has 3-7 days to submit earnest money (usually 1-3% of purchase price) to a title company or escrow account. This demonstrates their commitment and is credited toward closing costs. Your agent prepares the signed contract and title search begins. You\u2019ll schedule the home inspection (typically within 10 days) and appraisal (1-2 weeks). You may be asked to provide documents—mortgage statements, property tax records, warranty information. Your lender will underwrite the buyer\u2019s loan. Stay responsive to all requests. The typical timeline from accepted offer to closing is 30-45 days.',
    },
  ];

  const testimonials: TestimonialCard[] = [
    {
      id: 'testimonial-1',
      name: 'Sarah & Michael Chen',
      homeType: '4BR Colonial',
      location: 'Suburban Market',
      scenario:
        'Selling their family home of 12 years after children finished college, nervous about pricing and market timing.',
      outcome:
        'Listed strategically in early spring, received 3 offers within 5 days, sold for 6% above asking price in 18 days.',
      quote:
        'Our agent\u2019s market analysis gave us confidence in our pricing. The professional staging completely transformed how buyers saw the space. We couldn\u2019t be happier with the result.',
    },
    {
      id: 'testimonial-2',
      name: 'James Rodriguez',
      homeType: '2BR Condo',
      location: 'Urban Core',
      scenario:
        'Relocating for a job with short timeline, home needed minor updates, uncertain about urban condo market demand.',
      outcome:
        'Focused on deep cleaning and virtual staging, offered flexible showing times, closed in 22 days at competitive price.',
      quote:
        'I didn\u2019t have time for renovations. My agent emphasized what was great about the space—location, walkability, modern systems—and found the right buyer quickly. The efficiency was incredible.',
    },
    {
      id: 'testimonial-3',
      name: 'Elizabeth Morrison',
      homeType: 'Historic Home',
      location: 'Desirable Neighborhood',
      scenario:
        'Downsizing to a smaller home, worried about selling in a historic property that needed significant work.',
      outcome:
        'Priced conservatively to reflect condition, attracted investor buyer interested in renovation, closed in 34 days.',
      quote:
        'Instead of spending $80,000 on repairs I couldn\u2019t afford, we found a buyer whose vision matched the home\u2019s potential. The whole team made the process smooth and transparent.',
    },
  ];

  const marketInsights = [
    {
      label: 'Current Median Sale Price',
      value: '$485,000',
      trend: '↑ 4.2% YoY',
    },
    {
      label: 'Average Days on Market',
      value: '28 days',
      trend: 'Stable',
    },
    {
      label: 'Active Listings',
      value: '12,450',
      trend: '↑ 8% YoY',
    },
    {
      label: 'Months of Inventory',
      value: '3.2',
      trend: 'Balanced',
    },
  ];

  const toggleStep = (stepId: number) => {
    setExpandedStep(expandedStep === stepId ? null : stepId);
  };

  const toggleFAQ = (faqId: string) => {
    setExpandedFAQ(expandedFAQ === faqId ? null : faqId);
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleValuationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.address && formData.name && formData.email) {
      handleCaptureOpen('seller-valuation');
    }
  };

  const SVGChevronDown = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <polyline points="6 8 10 12 14 8"></polyline>
    </svg>
  );

  const SVGCheckCircle = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M10 18a8 8 0 100-16 8 8 0 000 16z"></path>
      <polyline points="6 10 9 13 14 8"></polyline>
    </svg>
  );

  const SVGHome = () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"></path>
      <polyline points="9 22 9 12 15 12 15 22"></polyline>
    </svg>
  );

  const SVGTrendingUp = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <polyline points="23 6 13 16 8 11 2 17"></polyline>
      <polyline points="17 6 23 6 23 12"></polyline>
    </svg>
  );

  const SVGArrowRight = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <line x1="5" y1="12" x2="15" y2="12"></line>
      <polyline points="8 9 12 13 8 17"></polyline>
    </svg>
  );

  return (
    <div style={{ background: 'var(--le-bg)', color: 'var(--le-text)' }}>
      {/* Hero Section */}
      <section
        style={{
          padding: 'clamp(60px, 10vw, 100px) 20px',
          background: 'linear-gradient(135deg, var(--le-primary) 0%, var(--le-primary-hover) 100%)',
          color: 'white',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'center' }}>
            <SVGHome />
          </div>
          <h1
            style={{
              fontSize: 'clamp(2.2rem, 8vw, 3.5rem)',
              fontWeight: 700,
              marginBottom: '16px',
              lineHeight: 1.1,
            }}
          >
            The Complete Guide to Selling Your Home
          </h1>
          <p
            style={{
              fontSize: 'clamp(1.1rem, 2vw, 1.3rem)',
              marginBottom: '40px',
              lineHeight: 1.6,
              opacity: 0.95,
            }}
          >
            Master the process of maximizing your home\u2019s value while minimizing stress. From pricing strategy to closing day, we\u2019ll walk you through every step with expert guidance and proven tactics.
          </p>
          <button
            onClick={() => document.getElementById('valuation-section')?.scrollIntoView({ behavior: 'smooth' })}
            style={{
              background: 'white',
              color: 'var(--le-primary)',
              padding: '16px 40px',
              border: 'none',
              borderRadius: '6px',
              fontSize: '1rem',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              display: 'inline-block',
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLButtonElement).style.transform = 'translateY(-2px)';
              (e.target as HTMLButtonElement).style.boxShadow = '0 12px 24px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLButtonElement).style.transform = 'translateY(0)';
              (e.target as HTMLButtonElement).style.boxShadow = 'none';
            }}
          >
            Get Your Free Home Valuation
          </button>
        </div>
      </section>

      {/* Timeline Section */}
      <section
        style={{
          padding: '80px 20px',
          background: 'var(--le-bg)',
        }}
      >
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2
              style={{
                fontSize: 'clamp(2rem, 6vw, 2.5rem)',
                fontWeight: 700,
                marginBottom: '12px',
                color: 'var(--le-text)',
              }}
            >
              Your 8-Step Selling Timeline
            </h2>
            <p
              style={{
                fontSize: '1.1rem',
                color: 'var(--le-text-secondary)',
                maxWidth: '600px',
                margin: '0 auto',
              }}
            >
              A clear roadmap from decision to keys in hand
            </p>
          </div>

          <div style={{ position: 'relative' }}>
            {/* Vertical Line */}
            <div
              style={{
                position: 'absolute',
                left: '30px',
                top: '0',
                bottom: '0',
                width: '2px',
                background: 'var(--le-border)',
              }}
            />

            {/* Timeline Steps */}
            <div style={{ paddingLeft: '80px' }}>
              {timelineSteps.map((step, index) => (
                <div
                  key={step.id}
                  style={{
                    marginBottom: index === timelineSteps.length - 1 ? '0' : '40px',
                    position: 'relative',
                  }}
                >
                  {/* Circle Marker */}
                  <div
                    style={{
                      position: 'absolute',
                      left: '-62px',
                      top: '0',
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: expandedStep === step.id ? 'var(--le-primary)' : 'var(--le-surface)',
                      border: `3px solid ${expandedStep === step.id ? 'var(--le-primary)' : 'var(--le-border)'}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: expandedStep === step.id ? 'white' : 'var(--le-primary)',
                      fontWeight: 700,
                      fontSize: '1rem',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {step.id}
                  </div>

                  {/* Step Card */}
                  <div
                    style={{
                      background: 'var(--le-surface)',
                      border: `1px solid ${expandedStep === step.id ? 'var(--le-primary)' : 'var(--le-border)'}`,
                      borderRadius: '8px',
                      padding: '24px',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                    }}
                    onClick={() => toggleStep(step.id)}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLDivElement).style.boxShadow =
                        '0 4px 12px rgba(0,0,0,0.08)';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <div>
                        <h3
                          style={{
                            fontSize: '1.2rem',
                            fontWeight: 700,
                            color: 'var(--le-text)',
                            marginBottom: '6px',
                          }}
                        >
                          {step.title}
                        </h3>
                        <p
                          style={{
                            fontSize: '0.95rem',
                            color: 'var(--le-text-secondary)',
                          }}
                        >
                          {step.description}
                        </p>
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          marginLeft: '16px',
                          color: 'var(--le-primary)',
                          transition: 'transform 0.3s ease',
                          transform:
                            expandedStep === step.id ? 'rotate(180deg)' : 'rotate(0)',
                        }}
                      >
                        <SVGChevronDown />
                      </div>
                    </div>

                    {/* Expanded Content */}
                    {expandedStep === step.id && (
                      <div
                        style={{
                          marginTop: '20px',
                          paddingTop: '20px',
                          borderTop: '1px solid var(--le-border)',
                          animation: 'fadeIn 0.3s ease',
                        }}
                      >
                        <p
                          style={{
                            color: 'var(--le-text)',
                            lineHeight: 1.7,
                            fontSize: '0.95rem',
                            whiteSpace: 'pre-wrap',
                          }}
                        >
                          {step.content}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Market Insights Section */}
      <section
        style={{
          padding: '80px 20px',
          background: 'var(--le-surface)',
        }}
      >
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2
              style={{
                fontSize: 'clamp(2rem, 6vw, 2.5rem)',
                fontWeight: 700,
                marginBottom: '12px',
                color: 'var(--le-text)',
              }}
            >
              Current Market Insights
            </h2>
            <p
              style={{
                fontSize: '1.1rem',
                color: 'var(--le-text-secondary)',
              }}
            >
              Understanding your local market conditions
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '24px',
            }}
          >
            {marketInsights.map((insight, idx) => (
              <div
                key={idx}
                style={{
                  background: 'var(--le-bg)',
                  padding: '28px',
                  borderRadius: '8px',
                  border: '1px solid var(--le-border)',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    color: 'var(--le-primary)',
                    marginBottom: '12px',
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <SVGTrendingUp />
                </div>
                <p
                  style={{
                    fontSize: '0.9rem',
                    color: 'var(--le-text-secondary)',
                    marginBottom: '12px',
                    fontWeight: 600,
                  }}
                >
                  {insight.label}
                </p>
                <p
                  style={{
                    fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                    fontWeight: 700,
                    color: 'var(--le-text)',
                    marginBottom: '8px',
                  }}
                >
                  {insight.value}
                </p>
                <p
                  style={{
                    fontSize: '0.85rem',
                    color: 'var(--le-accent)',
                    fontWeight: 600,
                  }}
                >
                  {insight.trend}
                </p>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: '48px',
              padding: '32px',
              background: 'var(--le-bg)',
              borderRadius: '8px',
              border: '1px solid var(--le-border)',
            }}
          >
            <h3
              style={{
                fontSize: '1.3rem',
                fontWeight: 700,
                marginBottom: '16px',
                color: 'var(--le-text)',
              }}
            >
              Seasonal Selling Patterns
            </h3>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '24px',
              }}
            >
              <div>
                <p
                  style={{
                    fontWeight: 700,
                    color: 'var(--le-accent)',
                    marginBottom: '8px',
                  }}
                >
                  Spring (Mar-May)
                </p>
                <p
                  style={{
                    fontSize: '0.95rem',
                    color: 'var(--le-text-secondary)',
                    lineHeight: 1.6,
                  }}
                >
                  Peak selling season. Highest buyer activity, most competition. Homes sell faster and at strong prices.
                </p>
              </div>
              <div>
                <p
                  style={{
                    fontWeight: 700,
                    color: 'var(--le-accent)',
                    marginBottom: '8px',
                  }}
                >
                  Summer (Jun-Aug)
                </p>
                <p
                  style={{
                    fontSize: '0.95rem',
                    color: 'var(--le-text-secondary)',
                    lineHeight: 1.6,
                  }}
                >
                  Still strong demand. Families with school-age children actively searching. Good time for homes with outdoor appeal.
                </p>
              </div>
              <div>
                <p
                  style={{
                    fontWeight: 700,
                    color: 'var(--le-accent)',
                    marginBottom: '8px',
                  }}
                >
                  Fall (Sep-Nov)
                </p>
                <p
                  style={{
                    fontSize: '0.95rem',
                    color: 'var(--le-text-secondary)',
                    lineHeight: 1.6,
                  }}
                >
                  Fewer buyers, but serious ones. Less competition. Good for unique homes or motivated sellers seeking quick close.
                </p>
              </div>
              <div>
                <p
                  style={{
                    fontWeight: 700,
                    color: 'var(--le-accent)',
                    marginBottom: '8px',
                  }}
                >
                  Winter (Dec-Feb)
                </p>
                <p
                  style={{
                    fontSize: '0.95rem',
                    color: 'var(--le-text-secondary)',
                    lineHeight: 1.6,
                  }}
                >
                  Slowest season. Dedicated buyers, minimal competition. Homes must be priced competitively and in excellent condition.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section
        style={{
          padding: '80px 20px',
          background: 'var(--le-bg)',
        }}
      >
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2
              style={{
                fontSize: 'clamp(2rem, 6vw, 2.5rem)',
                fontWeight: 700,
                marginBottom: '12px',
                color: 'var(--le-text)',
              }}
            >
              Seller FAQ
            </h2>
            <p
              style={{
                fontSize: '1.1rem',
                color: 'var(--le-text-secondary)',
              }}
            >
              Answers to the most common questions from sellers like you
            </p>
          </div>

          <div style={{ display: 'grid', gap: '16px' }}>
            {faqs.map((faq) => (
              <div
                key={faq.id}
                style={{
                  background: 'var(--le-surface)',
                  border: '1px solid var(--le-border)',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow =
                    '0 4px 12px rgba(0,0,0,0.08)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
                }}
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  style={{
                    width: '100%',
                    padding: '24px',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    textAlign: 'left',
                    fontSize: '1rem',
                  }}
                >
                  <h3
                    style={{
                      fontSize: '1.05rem',
                      fontWeight: 700,
                      color: 'var(--le-text)',
                      margin: 0,
                    }}
                  >
                    {faq.question}
                  </h3>
                  <div
                    style={{
                      color: 'var(--le-primary)',
                      minWidth: '24px',
                      display: 'flex',
                      justifyContent: 'center',
                      transition: 'transform 0.3s ease',
                      transform: expandedFAQ === faq.id ? 'rotate(180deg)' : 'rotate(0)',
                      marginLeft: '16px',
                    }}
                  >
                    <SVGChevronDown />
                  </div>
                </button>

                {expandedFAQ === faq.id && (
                  <div
                    style={{
                      padding: '0 24px 24px 24px',
                      borderTop: '1px solid var(--le-border)',
                      background: 'var(--le-bg)',
                    }}
                  >
                    <p
                      style={{
                        color: 'var(--le-text)',
                        lineHeight: 1.7,
                        fontSize: '0.95rem',
                        margin: 0,
                      }}
                    >
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section
        style={{
          padding: '80px 20px',
          background: 'var(--le-surface)',
        }}
      >
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2
              style={{
                fontSize: 'clamp(2rem, 6vw, 2.5rem)',
                fontWeight: 700,
                marginBottom: '12px',
                color: 'var(--le-text)',
              }}
            >
              Success Stories from Recent Sellers
            </h2>
            <p
              style={{
                fontSize: '1.1rem',
                color: 'var(--le-text-secondary)',
              }}
            >
              See how sellers achieved their goals
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '32px',
            }}
          >
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                style={{
                  background: 'white',
                  border: '1px solid var(--le-border)',
                  borderRadius: '12px',
                  padding: '32px',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow =
                    '0 8px 24px rgba(0,0,0,0.12)';
                  (e.currentTarget as HTMLDivElement).style.transform =
                    'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow =
                    '0 2px 8px rgba(0,0,0,0.05)';
                  (e.currentTarget as HTMLDivElement).style.transform =
                    'translateY(0)';
                }}
              >
                <div style={{ marginBottom: '20px' }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginBottom: '8px',
                    }}
                  >
                    <SVGCheckCircle />
                    <span
                      style={{
                        fontSize: '0.9rem',
                        fontWeight: 700,
                        color: 'var(--le-accent)',
                      }}
                    >
                      SUCCESS
                    </span>
                  </div>
                  <h3
                    style={{
                      fontSize: '1.2rem',
                      fontWeight: 700,
                      color: 'var(--le-text)',
                      marginBottom: '4px',
                    }}
                  >
                    {testimonial.name}
                  </h3>
                  <p
                    style={{
                      fontSize: '0.9rem',
                      color: 'var(--le-text-secondary)',
                    }}
                  >
                    {testimonial.homeType} in {testimonial.location}
                  </p>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <p
                    style={{
                      fontSize: '0.95rem',
                      color: 'var(--le-text)',
                      fontStyle: 'italic',
                      lineHeight: 1.6,
                      borderLeft: '3px solid var(--le-primary)',
                      paddingLeft: '16px',
                      margin: '0 0 16px 0',
                    }}
                  >
                    \u201c{testimonial.quote}\u201d
                  </p>

                  <div style={{ marginBottom: '12px' }}>
                    <p
                      style={{
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        color: 'var(--le-text-secondary)',
                        margin: '0 0 4px 0',
                      }}
                    >
                      SITUATION
                    </p>
                    <p
                      style={{
                        fontSize: '0.95rem',
                        color: 'var(--le-text)',
                        margin: 0,
                        lineHeight: 1.6,
                      }}
                    >
                      {testimonial.scenario}
                    </p>
                  </div>

                  <div>
                    <p
                      style={{
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        color: 'var(--le-accent)',
                        margin: '0 0 4px 0',
                      }}
                    >
                      OUTCOME
                    </p>
                    <p
                      style={{
                        fontSize: '0.95rem',
                        color: 'var(--le-text)',
                        margin: 0,
                        lineHeight: 1.6,
                      }}
                    >
                      {testimonial.outcome}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Home Valuation CTA Section */}
      <section
        id="valuation-section"
        style={{
          padding: '80px 20px',
          background: 'var(--le-bg)',
        }}
      >
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2
              style={{
                fontSize: 'clamp(2rem, 6vw, 2.5rem)',
                fontWeight: 700,
                marginBottom: '12px',
                color: 'var(--le-text)',
              }}
            >
              What is Your Home Worth?
            </h2>
            <p
              style={{
                fontSize: '1rem',
                color: 'var(--le-text-secondary)',
                lineHeight: 1.6,
              }}
            >
              Get your free home valuation based on current market data, comparable sales, and local conditions. No obligations, no fees.
            </p>
          </div>

          <form
            onSubmit={handleValuationSubmit}
            style={{
              background: 'var(--le-surface)',
              padding: '40px',
              borderRadius: '12px',
              border: '1px solid var(--le-border)',
            }}
          >
            <div style={{ marginBottom: '20px' }}>
              <label
                style={{
                  display: 'block',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  marginBottom: '8px',
                  color: 'var(--le-text)',
                }}
              >
                Property Address
              </label>
              <input
                type="text"
                placeholder="123 Main Street, City, ST 12345"
                value={formData.address}
                onChange={(e) => handleFormChange(e, 'address')}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '1px solid var(--le-border)',
                  borderRadius: '6px',
                  fontSize: '0.95rem',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.3s ease',
                }}
                onFocus={(e) => {
                  (e.target as HTMLInputElement).style.borderColor =
                    'var(--le-primary)';
                }}
                onBlur={(e) => {
                  (e.target as HTMLInputElement).style.borderColor =
                    'var(--le-border)';
                }}
                required
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label
                style={{
                  display: 'block',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  marginBottom: '8px',
                  color: 'var(--le-text)',
                }}
              >
                Full Name
              </label>
              <input
                type="text"
                placeholder="John Smith"
                value={formData.name}
                onChange={(e) => handleFormChange(e, 'name')}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '1px solid var(--le-border)',
                  borderRadius: '6px',
                  fontSize: '0.95rem',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.3s ease',
                }}
                onFocus={(e) => {
                  (e.target as HTMLInputElement).style.borderColor =
                    'var(--le-primary)';
                }}
                onBlur={(e) => {
                  (e.target as HTMLInputElement).style.borderColor =
                    'var(--le-border)';
                }}
                required
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label
                style={{
                  display: 'block',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  marginBottom: '8px',
                  color: 'var(--le-text)',
                }}
              >
                Email Address
              </label>
              <input
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) => handleFormChange(e, 'email')}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '1px solid var(--le-border)',
                  borderRadius: '6px',
                  fontSize: '0.95rem',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.3s ease',
                }}
                onFocus={(e) => {
                  (e.target as HTMLInputElement).style.borderColor =
                    'var(--le-primary)';
                }}
                onBlur={(e) => {
                  (e.target as HTMLInputElement).style.borderColor =
                    'var(--le-border)';
                }}
                required
              />
            </div>

            <div style={{ marginBottom: '28px' }}>
              <label
                style={{
                  display: 'block',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  marginBottom: '8px',
                  color: 'var(--le-text)',
                }}
              >
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="(555) 123-4567"
                value={formData.phone}
                onChange={(e) => handleFormChange(e, 'phone')}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '1px solid var(--le-border)',
                  borderRadius: '6px',
                  fontSize: '0.95rem',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.3s ease',
                }}
                onFocus={(e) => {
                  (e.target as HTMLInputElement).style.borderColor =
                    'var(--le-primary)';
                }}
                onBlur={(e) => {
                  (e.target as HTMLInputElement).style.borderColor =
                    'var(--le-border)';
                }}
                required
              />
            </div>

            <button
              type="submit"
              style={{
                width: '100%',
                padding: '14px 28px',
                background: 'var(--le-primary)',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '1rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLButtonElement).style.background =
                  'var(--le-primary-hover)';
                (e.target as HTMLButtonElement).style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLButtonElement).style.background =
                  'var(--le-primary)';
                (e.target as HTMLButtonElement).style.transform = 'translateY(0)';
              }}
            >
              Get Your Free Valuation
              <SVGArrowRight />
            </button>

            <p
              style={{
                fontSize: '0.85rem',
                color: 'var(--le-text-secondary)',
                marginTop: '16px',
                textAlign: 'center',
              }}
            >
              We\u2019ll send your valuation estimate within 24 hours. No spam, no obligations.
            </p>
          </form>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section
        style={{
          padding: '60px 20px',
          background: 'linear-gradient(135deg, var(--le-primary) 0%, var(--le-primary-hover) 100%)',
          color: 'white',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <h2
            style={{
              fontSize: 'clamp(1.5rem, 5vw, 2.2rem)',
              fontWeight: 700,
              marginBottom: '16px',
            }}
          >
            Ready to Sell Your Home?
          </h2>
          <p
            style={{
              fontSize: '1rem',
              marginBottom: '32px',
              opacity: 0.95,
              lineHeight: 1.6,
            }}
          >
            Our team of experienced real estate professionals is ready to guide you through every step of the selling process. Get your free valuation today and let\u2019s talk about your home\u2019s potential.
          </p>
          <button
            onClick={() => handleCaptureOpen('seller-consultation')}
            style={{
              background: 'white',
              color: 'var(--le-primary)',
              padding: '14px 40px',
              border: 'none',
              borderRadius: '6px',
              fontSize: '1rem',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              display: 'inline-block',
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLButtonElement).style.transform = 'translateY(-2px)';
              (e.target as HTMLButtonElement).style.boxShadow = '0 12px 24px rgba(0,0,0,0.2)';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLButtonElement).style.transform = 'translateY(0)';
              (e.target as HTMLButtonElement).style.boxShadow = 'none';
            }}
          >
            Schedule a Free Consultation
          </button>
        </div>
      </section>
    </div>
  );
};

export default SellerGuidePage;
