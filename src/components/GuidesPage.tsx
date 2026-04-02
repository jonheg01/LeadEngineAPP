'use client';

import React, { useState } from 'react';
import { ChevronDown, Download, TrendingUp, Calendar, FileText } from 'lucide-react';

interface Guide {
  id: string;
  title: string;
  description: string;
  chapters?: number;
  readTime?: string;
  requiresGate?: boolean;
}

interface QuickGuide {
  id: string;
  title: string;
  preview: string;
  content: string;
  category: 'Buying' | 'Selling' | 'Investing' | 'Moving';
  readTime: string;
  isOpen?: boolean;
}

interface FAQItem {
  question: string;
  answer: string;
  isOpen?: boolean;
}

const GuidesPage: React.FC<{ onOpenCapture?: (variant: string) => void }> = ({ onOpenCapture }) => {
  const [expandedGuide, setExpandedGuide] = useState<string | null>(null);
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);

  const handleCaptureOpen = (variant: string) => {
    if (onOpenCapture) {
      onOpenCapture(variant);
    } else {
      // Fallback to window event dispatch
      window.dispatchEvent(new CustomEvent('openLeadCapture', { detail: { variant } }));
    }
  };

  const featuredGuides: Guide[] = [
    {
      id: 'buyers-guide',
      title: 'The Complete Home Buyer\'s Guide',
      description:
        'The definitive playbook for today\'s real estate market. From pre-approval to closing day, this 20-page guide walks you through every critical decision point and helps you avoid costly mistakes.',
      chapters: 20,
      readTime: '45 min',
      requiresGate: true,
    },
    {
      id: 'sellers-guide',
      title: 'Home Seller\'s Playbook',
      description:
        'Maximize your home\'s sale price and minimize time on market. Master pricing strategy, staging, marketing, and negotiation with this proven seller\'s roadmap.',
      chapters: 18,
      readTime: '40 min',
      requiresGate: true,
    },
    {
      id: 'first-time-guide',
      title: 'First-Time Buyer Roadmap',
      description:
        'Step-by-step guidance from your first credit check through getting your keys. Demystify the process and build confidence for your biggest purchase.',
      chapters: 15,
      readTime: '35 min',
      requiresGate: true,
    },
  ];

  const quickGuides: QuickGuide[] = [
    {
      id: 'preapproval',
      title: 'How to Get Pre-Approved for a Mortgage',
      preview: 'Learn the critical difference between pre-qualification and pre-approval, what lenders look for, and how to strengthen your application.',
      content: `Getting pre-approved for a mortgage is one of the most important steps in the home buying journey. It\'s not just a formality—it\'s a powerful tool that positions you as a serious buyer in a competitive market.

Pre-approval means a lender has verified your financial information, checked your credit, and confirmed you can borrow a specific amount. This is different from pre-qualification, which is just an estimate based on information you provide.

To get pre-approved, you\'ll need:
• Recent pay stubs and W-2s (last 2 years)
• Bank statements (last 2 months)
• Tax returns (last 2 years)
• A list of debts and liabilities
• Your Social Security number for a credit check

The process typically takes 3-5 business days. Work with a mortgage broker or lender you trust. Compare rates from at least 3 lenders—a difference of 0.5% can save you thousands over 30 years.

Once pre-approved, your offer becomes significantly more attractive to sellers. You'll know your maximum budget, can negotiate with confidence, and close faster than competing buyers.`,
      category: 'Buying',
      readTime: '6 min',
    },
    {
      id: 'inspection',
      title: '10 Things Every Home Inspection Should Cover',
      preview: 'Protect your investment by knowing what inspectors look for and what red flags require attention before closing.',
      content: `A professional home inspection is your safety net. It identifies hidden problems that could cost thousands in repairs. Here's what inspectors check and why each matters:

1. **Roof & Gutters** — Age, condition, and remaining lifespan. Roof replacement costs $8,000-15,000+. Look for missing shingles, rust, or pooling water.

2. **Foundation** — Cracks, settling, or water damage. Foundation issues are expensive and serious. Minor cracks may be cosmetic; larger ones need structural engineer review.

3. **Electrical System** — Panel condition, breaker capacity, and safety. Outdated systems may not support modern appliances and can be fire hazards.

4. **Plumbing** — Water pressure, drainage, and pipe materials. Older homes with galvanized or polybutylene pipes may need replacement ($3,000-8,000+).

5. **HVAC System** — Heating, cooling, and ventilation efficiency. Units over 15 years old may fail soon. Check age, maintenance records, and functionality.

6. **Water Quality & Heater** — If on well water, get tested. Water heater age and condition matter—replacement is $1,200-2,000+.

7. **Insulation & Ventilation** — Energy efficiency and moisture control. Poor ventilation leads to mold and ice dams.

8. **Windows & Doors** — Functionality and seal integrity. Broken seals mean heat loss and moisture. Replacement is costly.

9. **Interior Condition** — Walls, ceilings, floors for damage, mold, or pest evidence. Look for water stains indicating previous leaks.

10. **Safety Features** — Handrails, stairs, carbon monoxide and smoke detectors. Required for safety and often for insurance.

Budget $300-500 for a standard inspection. It's the best investment you'll make before closing.`,
      category: 'Buying',
      readTime: '8 min',
    },
    {
      id: 'closing-costs',
      title: 'Understanding Closing Costs: A Complete Breakdown',
      preview: 'Demystify the fees that appear at closing and learn why they exist and what you can negotiate.',
      content: `Closing costs catch many buyers off guard. They typically range from 2-5% of your home's purchase price. Understanding each line item helps you budget accurately and spot unusual charges.

**Lender Fees** (1-3% of loan amount)
• Loan origination fee: Covers underwriting, processing, and loan setup
• Application fee: Non-refundable fee to apply
• Credit report fee: Typically $25-75
• Appraisal fee: $400-600, required to verify property value
• Underwriting fee: $500-1,500 for loan verification

**Title & Insurance** ($500-1,500)
• Title search: Ensures no liens or claims on property
• Title insurance: Protects lender (they require this)
• Owner's title insurance: Optional but recommended protection for you

**Taxes & Government Fees** (varies by location)
• Property taxes: Often held in escrow
• Recording fees: County charges to record deed
• Transfer tax: Some states/counties charge to transfer ownership

**Other Costs**
• Home inspection: $300-500 (often paid before closing)
• Homeowners insurance: First year premium, usually $1,000-2,000
• HOA fees: If applicable, paid upfront
• Survey: Sometimes required, $300-500

**Negotiation Tips:**
Ask the seller to cover some costs (common in buyer's market). Compare quotes from multiple title companies—they can vary significantly. Some lenders charge inflated processing fees; shop around.

Request a Closing Disclosure 3 days before closing to review and catch errors. This legal document outlines every fee and is your chance to question anything that seems high or unexplained.`,
      category: 'Buying',
      readTime: '7 min',
    },
    {
      id: 'phoenix-market',
      title: 'Phoenix Metro Market Overview 2026',
      preview: 'Current market conditions, neighborhood trends, and what they mean for buyers and sellers in the Phoenix area.',
      content: `The Phoenix metro market has evolved dramatically over the past 18 months. Understanding current conditions helps you make strategic decisions about timing and pricing.

**Market Snapshot (Q1 2026)**
The Phoenix area remains a seller's market overall, but conditions vary significantly by price point and neighborhood. Median home price sits at $485,000, with price appreciation at 4.2% year-over-year—significantly slower than the boom years but still solid growth.

**Neighborhood Trends**
Tempe, South Scottsdale, and central Phoenix neighborhoods continue attracting younger buyers seeking walkability and urban amenities. Suburban areas like Chandler, Gilbert, and North Scottsdale appeal to families seeking schools and space.

**Inventory Situation**
Active listings have increased to 12,450 inventory units, giving buyers more choices than 2024. Days on market average 28 days—up from 15-20 in 2023 but still a seller's advantage.

**Interest Rate Impact**
With the 30-year mortgage rate at 6.25%, affordability remains challenged. A $400,000 home with 20% down costs roughly $2,300/month. This pushes many buyers toward condos, townhomes, or lower price points.

**What This Means**
For buyers: Negotiate harder, request seller concessions, and focus on homes in true move-ready condition. Don't rush—inventory will improve.

For sellers: Price competitively from day one, invest in staging/photography, and be ready for negotiations on repairs and closing costs. The days of selling "as-is" are largely over.

For investors: Single-family rentals still cash-flow well, though purchase prices have stabilized. Cap rates cluster around 4-5.5%.

The market is normalizing after the pandemic surge. Smart decisions matter more than ever.`,
      category: 'Buying',
      readTime: '6 min',
    },
    {
      id: 'agent-commissions',
      title: 'The Truth About Real Estate Agent Commissions',
      preview: 'Understand commission structures, what you\'re paying for, and how to negotiate or choose alternatives.',
      content: `Real estate commissions are often misunderstood. The standard 5-6% total (split between buyer\'s and seller\'s agent) has been standard for decades, but recent industry changes are shifting this landscape.

**How Commissions Work**
Traditionally, the seller pays one 6% commission (sometimes 5-5.5%), which is split: 3% to the seller's agent, 3% to the buyer's agent. On a $500,000 home, that's $30,000 total.

However, the buyer\'s agent doesn\'t come from your pocket directly if you\'re buying—it comes from the seller\'s proceeds. As a seller, the cost is real and negotiable.

**What Are You Paying For?**
A good agent provides:
• Market analysis and competitive pricing strategy (worth $500-1,500)
• Professional photography, staging advice, and marketing ($2,000-5,000 value)
• Showing coordination and buyer screening
• Negotiation expertise (can save you $10,000-50,000+)
• Coordination with title, inspections, appraisals, and lenders
• Problem-solving during the transaction

**Negotiating Commission**
Commission is always negotiable. Factors that influence rates:
• Market conditions (buyer's market = lower commissions)
• Price point (higher prices sometimes = lower percentage)
• Complexity of sale
• Local market norms (varies by region)

Typical negotiated rates: 4.5-5% in competitive markets, 5-6% in slower markets.

**Alternatives**
• Flat-fee brokers: $3,000-5,000 per side, regardless of sale price
• Discount brokers: 1.5-2.5% commission, reduced services
• For-sale-by-owner (FSBO): Save commission but handle all marketing, showings, and negotiation yourself

**Bottom Line**
A good agent earns their commission through negotiation skills, market knowledge, and problem-solving. Don't choose based on price alone—a 1% difference in commission might cost you 10% in sale price through poor negotiation.`,
      category: 'Selling',
      readTime: '7 min',
    },
    {
      id: 'staging-budget',
      title: 'Home Staging on a Budget: 15 Tips That Work',
      preview: 'Dramatically improve your home's appeal and sale price with inexpensive staging fixes that buyers respond to.',
      content: `Professional staging costs $2,000-5,000+, but you can achieve 80% of the results with budget-friendly tactics. Studies show staged homes sell 73% faster and for 6% more.

**Quick Wins (Under $100)**
1. **Deep clean everything** — Most important. Pressure wash exterior, detail windows, scrub grout. Cleanliness signals care.

2. **Fresh paint** — Neutral colors (white, greige, warm gray) in key rooms. One gallon of $30 paint transforms a room.

3. **Declutter ruthlessly** — Remove 30-50% of personal items, books, and decor. Buyers need to imagine themselves living there.

4. **New light bulbs** — Switch to warm white 2700K bulbs. Costs $20-40, transforms lighting psychology.

5. **Landscaping cleanup** — Mulch borders ($50-100), trim bushes, pull weeds. First impression matters enormously.

6. **Update cabinet hardware** — Modern brushed nickel or black knobs cost $50-150 total, modernize kitchens instantly.

7. **Fix small repairs** — Caulk baseboards, repair drywall holes, fix leaky faucets. Shows maintenance.

**Medium-Budget Improvements ($100-500)**
8. **New shower curtain & towels** — $50-80 for coordinated colors.

9. **Area rugs** — Define spaces and warm hard floors. $100-300 for key rooms.

10. **Exterior plants & flowers** — $150-300 for planters and flowers at entry. Creates curb appeal instantly.

11. **Kitchen styling** — Remove clutter from counters, add bowl of fresh fruit, new dish towel. $0-50.

12. **Bedroom staging** — Remove majority of furniture, fresh white/light bedding, minimal decor. Makes rooms look larger.

**Higher-Impact Changes ($500+)**
13. **Professional photography** — $300-500, essential in 2026. Poor photos = fewer showings, lower price.

14. **Lighting upgrades** — New fixtures in bathrooms/hallways. $300-600, modern feel.

15. **Fresh mulch & landscaping** — Curb appeal drives 50% of buyer interest. $300-500 transforms the exterior.

**Staging Timeline**
• 4-6 weeks before listing: declutter, paint, repairs
• 2 weeks before: professional photos, final staging
• During showings: fresh flowers, fresh-baked smell (bake cookies day-of), lights on in daytime

The ROI on staging is typically 5-10x your investment through faster sales and higher prices.`,
      category: 'Selling',
      readTime: '8 min',
    },
    {
      id: 'bidding-war',
      title: 'How to Win a Bidding War Without Overpaying',
      preview: 'Strategic tactics to compete in multiple-offer situations and come out ahead without destroying your financial future.',
      content: `Bidding wars are stressful, but winning the right way requires strategy, not just throwing money at the problem. Here's how to compete effectively:

**Pre-War Preparation**
Get pre-approved (not just pre-qualified) before making offers. Sellers take this seriously—it shows you're buyer-ready. Include pre-approval letter with every offer.

Know your walk-away number. Calculate maximum price you can afford, account for potential repairs, and commit to that limit. Emotion is your enemy in bidding wars.

Have cash or proof of funds ready if possible. In a close race, a buyer with proof they can close in 21 days beats a contingent offer.

**Making Your Offer**
Don't lead with your highest price. Start 3-5% below asking. Forces sellers to counter, and you have room to negotiate.

Offer 10-14 days for inspection/appraisal. Longer timelines make sellers nervous about buyer commitment and appraisal gaps.

Include escalation clauses (up to X price if other offers appear). Position yourself to beat others without overpaying if no competition exists.

**What Wins Beyond Price**
• Fast closing: 21 days beats 30 days
• Fewer contingencies: Appraisal and inspection contingencies add risk to sellers
• Pre-approval strength: Fewer financing surprises
• Clean offer: No seller concessions requested (they pay less for agent commission, repairs, etc.)

**Appraisal Gap Strategy**
Appraisals often come in low in competitive markets. Offer to cover up to $10,000-20,000 of the gap (depending on your budget). This removes sellers' worry about financing falling through.

Example: Offer $485,000 with escalation to $495,000 if other offers appear, but only if appraisal doesn't create gap. If appraisal comes in at $475,000, you cover $5,000 of the gap, bringing actual price to $480,000.

**Red Flags in Bidding Wars**
Don't get emotionally attached. If you're bidding against 5 other offers, that home isn't necessarily special—the market is. Walk away if price exceeds appraisal + your safety margin.

Waiving inspection is rarely wise, even in hot markets. Home problems can cost you $20,000+. Negotiate inspection instead.

**Winning Right**
The goal is getting the home at fair market value, not the highest price. Use intelligence (market analysis, comparable sales, inspection results) rather than emotion. The buyer who pays $495,000 for a home worth $485,000 just lost $10,000. Discipline wins.`,
      category: 'Buying',
      readTime: '7 min',
    },
    {
      id: 'rent-vs-buy',
      title: 'Renting vs. Buying: The Real Math',
      preview: 'Cut through the emotion and ideology—run the numbers to determine what makes financial sense for your situation.',
      content: `"Renting is throwing money away" and "Buying is always better" are both wrong. The answer depends on your specific situation, timeline, and local market. Here's the real financial analysis.

**The Renting Advantage**
Rent is predictable. You budget $1,500/month, and that's your housing cost (plus utilities). No surprise $5,000 roof repairs or foundation issues.

Flexibility is huge. Job change? Move easily. Bought wrong house? You're stuck for years. Renters pivot quickly.

Maintenance-free living. No property taxes, insurance, HOA fees, or yard work. You call a landlord; they fix it.

Lower upfront cost. Deposit is typically 1 month's rent. No down payment, no closing costs.

**The Buying Advantage**
Building equity. Every payment builds your ownership stake (assuming prices don't crash). Rent builds your landlord's equity.

Mortgage stability. If you lock 6% for 30 years, you're protected from inflation. Rent increases 3-5% annually, compounding over decades.

Tax benefits. Mortgage interest and property taxes are deductible (if you itemize). Saves $3,000-5,000+ annually for many homeowners.

Leverage. You control a $500,000 asset with $100,000 down. If it appreciates 4% ($20,000), you made 20% return on your down payment.

**The Real Math**
Assume: $500,000 home, 20% down ($100,000), 6% mortgage, 1% property tax, $1,500 insurance, $200 maintenance/month.

Monthly payment: $3,000 (principal + interest) + $416 (tax) + $125 (insurance) + $200 (maintenance) = $3,741

Alternative scenario: Rent same-quality home for $2,400/month. That's $1,341 less monthly.

Over 10 years:
• Buyer: Paid $448,920 (principal + costs). Home appreciated 4%/year to $745,000. Equity = $645,000 (minus ~$200k remaining mortgage) = $445,000 net.
• Renter: Paid $288,000. Zero equity. $288,000 in savings if invested at 7% return = $565,000.

Surprisingly close! The renter needs discipline to invest the difference. Most don't.

Over 30 years, buying typically wins if you stay in the home and don't count it as an investment (pure housing cost). But if you move every 5-7 years, you lose 7-10% of sale price to transaction costs, making renting competitive.

**Decision Framework**
Buy if:
• You'll stay 7+ years
• You can afford 20% down + closing costs + 6 months emergency fund
• Local rent-to-price ratio exceeds 200 (rent divided by price > 0.005)
• You want stability and control

Rent if:
• Career is uncertain or relocation likely
• Down payment drains emergency savings
• You prefer flexibility over ownership
• Local rent-to-price ratio is low (buying is expensive)

There's no universal "right" answer. Run your numbers.`,
      category: 'Buying',
      readTime: '8 min',
    },
    {
      id: 'investment-property',
      title: 'Investment Property 101: Getting Started in Real Estate Investing',
      preview: 'From evaluating deals to managing properties, learn how to build real estate wealth as an investor.',
      content: `Real estate investing offers leverage, cash flow, and tax benefits that stock market investing doesn't. But success requires education, capital, and discipline. Here's how to start the right way.

**The Two Wealth Paths**
Appreciation play: Buy low, sell high. Requires identifying undervalued properties and improving them. Requires active work but can generate significant returns.

Cash flow play: Buy rental properties that generate positive monthly cash flow. Slower wealth-building but creates passive income stream.

Most successful investors do both—they improve properties and hold for monthly income.

**Evaluating Deals**
The 1% rule: Monthly rent should be at least 1% of purchase price. $300,000 property should rent for $3,000+/month minimum. This typically generates 8-10% annual cash-on-cash return.

Cap rate (Capitalization Rate): (Gross rental income - expenses) / property price. For Phoenix rentals, 4-5.5% cap rates are typical. Higher cap rates mean better cash flow or better deals.

Example: $400,000 duplex generates $3,600/month rent. Annual gross = $43,200. After 35% expenses (maintenance, taxes, insurance, vacancy, management), net = $28,080. Cap rate = 7%.

Days to break even on repairs: Don't overpay for "value-add" properties. If you pay $50,000 above comparable values to capture $500/month additional rent, it takes 100 months to break even (before considering repair execution risk).

**Financing**
Owner-occupant (you live in the property): 3-5% down, 30-year conventional mortgage.

Investor property: 20-25% down, higher rates (6.5-7%), more scrutiny from lenders.

House hack: Buy a duplex, triplex, or fourplex and live in one unit. Renters' income covers your mortgage. Best-kept wealth-building secret.

**The Numbers Reality**
$400,000 duplex, 20% down ($80,000), 7% mortgage, expenses = $28,080 annual net income.

That's $2,340/month cash flow before considering savings for maintenance, vacancy periods, and capital expenditure (HVAC, roof, etc.).

True cash flow: $1,800/month realistically (account for 10% vacancy, surprise repairs, management). $21,600 annual return on $80,000 = 27% gross return (before taxes).

But this requires finding good deals. Market average is 5-7% actual cash return.

**Common Mistakes**
Overestimating rents. Research actual rents in the area and be conservative.

Underestimating expenses. Most new investors budget 25-30% of rents for expenses. Reality is typically 35-40%.

Not accounting for vacancy. Properties aren't 100% rented. Budget 5-10% vacancy.

Overleveraging. Don't max out financing. Market downturns hurt you. Stay conservative.

Choosing wrong locations. Class B and C neighborhoods (solid but not fancy) generate best cash flow. A-class appreciation plays require more capital and market timing skill.

**Getting Started**
Start with one property. Learn before scaling.

House hack if possible (live in one unit of a multi-unit property). It's the fastest path to real estate wealth.

Build a team: mortgage broker, real estate agent, contractor, CPA. Good advisors earn their fees through better deals and tax optimization.

Education matters. Read books (Rich Dad Poor Dad, The Book on Rental Property Investing). Take local investor meetups.

Run analysis on every deal. Never rely on agent estimates for rent or expenses.

Real estate isn't passive. Properties require management, maintenance, and problem-solving. But the leverage and tax benefits make it powerful wealth-building for those willing to learn.`,
      category: 'Investing',
      readTime: '9 min',
    },
    {
      id: 'moving-checklist',
      title: 'Moving Checklist: 30 Days to a Smooth Move',
      preview: 'Timeline and checklist to ensure nothing falls through the cracks when moving to your new home.',
      content: `Moving is stressful, but a solid 30-day timeline ensures you don't forget critical tasks. Here's your day-by-day guide to a smooth transition.

**8 Weeks Before Moving**
• Research and get estimates from 3-5 moving companies
• If selling, list home and begin showing
• Notify current landlord of move date (if renting)
• Create inventory of items to donate, sell, or discard
• Research new area (schools, grocery stores, services)

**6 Weeks Before**
• Book moving company
• Begin packing non-essential items (seasonal clothes, books, decor)
• Update address with employer, banks, insurance, subscriptions
• Submit address change with USPS
• Transfer prescriptions to new area pharmacy
• Research and select utilities for new home

**4 Weeks Before**
• Confirm closing date or lease move-in
• Create address change list (insurance, utilities, subscriptions)
• Schedule utility disconnect at current home
• Schedule utility connect at new home
• Pack 25% of belongings
• Measure doorways and rooms in new home for furniture fit

**2 Weeks Before**
• Confirm moving company and timing
• Collect and organize important documents (mortgage, title, insurance)
• Pack 50% of belongings
• Use up frozen food and pantry items (reduce what to move)
• Defrost and clean freezer
• Return library books, borrowed items
• Finalize school transfer if applicable

**1 Week Before**
• Pack 75% of belongings
• Drain garden hose, turn off irrigation
• Transfer and pay utility deposits at new home
• Clean baseboards, cabinets (before movers arrive)
• Drain refrigerator ice maker line
• Confirm moving company arrival time
• Arrange childcare or pet care during move day
• Pack "First Night" box (toiletries, medications, chargers, comfy clothes)

**Moving Day**
• Be present to direct movers
• Do final walkthrough of old home (check cabinets, closets, drawers)
• Take photos of empty property for security deposit return
• Turn off lights, lock windows
• Leave forwarding address notice if renting
• Take meter readings (gas, electric, water)
• Return keys and access devices

**First Week in New Home**
• Locate main water shut-off and circuit breaker
• Change locks or request new keys
• Update address with remaining services
• Unpack essentials and "First Night" box
• Locate trash day and recycling schedule
• Introduce yourself to neighbors
• Register vehicle at new address (DMV)

**First Month**
• Update address with all subscriptions
• Unpack and organize all boxes
• Change address with employer for tax purposes
• Update address with healthcare providers
• Set up new trash and recycling pickup
• If buying: walk property with inspector walkthrough list
• If selling: gather closing documents
• File mail forwarding extension if needed

**Pro Tips**
Label boxes by room and contents. "Kitchen-Dishes-Box 3" is infinitely more helpful than "Box 47."

Pack a "Don't Move" box with things you'll need immediately but won't need during the move itself.

Take photos of electronics setup before disconnecting (for reconnection at new home).

Defrost freezer 24 hours before move to avoid water damage to furniture.

Keep important documents (titles, mortgage, insurance) in a clearly marked "IMPORTANT" box you personally transport.

Budget 20% more time than the moving company estimates. Moves always take longer than expected.

If moving long distance, book hotels and arrange vehicle logistics 6 weeks in advance.

Most moves take 2-4 weeks to fully unpack and feel settled. Don't stress about perfection immediately.`,
      category: 'Moving',
      readTime: '8 min',
    },
  ];

  const marketStats = [
    { label: 'Median Home Price', value: '$485,000', change: '↑ 4.2% YoY' },
    { label: 'Average Days on Market', value: '28', change: 'Stable' },
    { label: 'Active Listings', value: '12,450', change: '↑ 8% YoY' },
    { label: '30-Year Mortgage Rate', value: '6.25%', change: 'Stable' },
  ];

  const faqs: FAQItem[] = [
    {
      question: 'How much do I need for a down payment?',
      answer:
        'Down payment requirements vary by loan type. FHA loans allow 3.5% down, conventional loans typically require 5-20%, VA loans may allow 0% down. While you can put down less, 20% eliminates PMI (Private Mortgage Insurance) and strengthens your offer. Most buyers put down 5-10% in today\'s market.',
    },
    {
      question: 'What credit score do I need to buy a house?',
      answer:
        'Minimum credit scores vary by loan type: FHA loans accept 580+, conventional loans typically require 620+. However, better rates are available above 740. If your score is below 620, focus on paying down debt and building credit for 6-12 months before applying.',
    },
    {
      question: 'Should I sell my house before buying a new one?',
      answer:
        'This depends on market conditions and your financial situation. In a buyer\'s market, you can often secure the new home first, then sell your current home. In a competitive seller\'s market, you may need to sell first to avoid dual mortgages. Contingent offers (sale of current home contingent on new purchase) are less competitive with sellers.',
    },
    {
      question: 'How long does the home buying process take?',
      answer:
        'Typically 30-45 days from offer acceptance to closing. Timeline breaks down as: offer/acceptance (1 day), inspection period (5-10 days), appraisal (10-15 days), underwriting (7-10 days), final walkthrough and closing (1-2 days). Delays in any phase extend the timeline. Faster closing times (21 days) are attractive to sellers.',
    },
    {
      question: 'What\'s the difference between pre-qualification and pre-approval?',
      answer:
        'Pre-qualification is an estimate from a lender based on information you provide—no verification required. Pre-approval involves documented verification of income, assets, and credit. Pre-approval is what sellers take seriously and what strengthens your offer. Always get pre-approved before making offers.',
    },
    {
      question: 'Do I need a real estate agent to buy a house?',
      answer:
        'No, but it\'s strongly advisable. Agents help you identify properties, understand market conditions, negotiate offers, coordinate inspections/appraisals, and solve problems. In most cases, the seller pays both agents\' commissions from proceeds, so using an agent costs you nothing. Good agents earn their commission through negotiation skills.',
    },
    {
      question: 'What are closing costs and how much will I pay?',
      answer:
        'Closing costs are fees paid at closing for lender services, title insurance, taxes, and government recording. Buyers typically pay 2-5% of the purchase price ($5,000-25,000 on a $500,000 home). Common costs include appraisal ($400-600), title insurance ($500-1,500), underwriting fees ($500-1,500), and taxes. Request a Closing Disclosure 3 days before closing to review all costs.',
    },
    {
      question: 'How do I know if a home is priced fairly?',
      answer:
        'Request a Comparative Market Analysis (CMA) from a real estate agent. This analyzes recent sales of similar homes (same size, condition, location) to determine fair market value. Appraisals do this too, but occur after offer acceptance. In hot markets, homes often sell above asking; in slow markets, below asking. Your agent should defend pricing with data.',
    },
    {
      question: 'What happens during a home inspection?',
      answer:
        'A professional inspector (you hire independently, not through the seller) examines the home\'s systems: roof, foundation, electrical, plumbing, HVAC, insulation, and interior condition. Inspection takes 2-3 hours. You receive a detailed report highlighting issues. You then use findings to request repairs or negotiate price reductions. Inspections cost $300-500 and are critical protection.',
    },
    {
      question: 'Can I buy a house with student loan debt?',
      answer:
        'Yes, but it impacts your debt-to-income ratio, which affects loan approval and interest rates. Lenders prefer your total debt (including the new mortgage) to be under 43% of gross income. Student loans factor into this calculation. If debt-to-income is high, you\'ll either need a larger income, smaller loan, or lower debt before applying. Focus on paying down high-interest debt first.',
    },
  ];

  return (
    <div style={{ background: 'var(--le-background)', color: 'var(--le-text)' }}>
      {/* Hero Section */}
      <section
        style={{
          background: `linear-gradient(135deg, rgba(var(--le-primary-rgb), 0.05) 0%, rgba(var(--le-accent-rgb), 0.05) 100%)`,
          padding: '80px 20px',
          textAlign: 'center',
          borderBottom: '1px solid var(--le-border)',
        }}
      >
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h1
            style={{
              fontSize: 'clamp(2.5rem, 8vw, 3.5rem)',
              fontWeight: 700,
              marginBottom: '16px',
              color: 'var(--le-heading)',
            }}
          >
            Your Complete Real Estate Resource Center
          </h1>
          <p
            style={{
              fontSize: 'clamp(1rem, 4vw, 1.25rem)',
              color: 'var(--le-text-secondary)',
              marginBottom: '48px',
              lineHeight: '1.6',
            }}
          >
            Expert guides, market insights, and tools to help you make confident real estate decisions
          </p>
          <div
            style={{
              display: 'flex',
              gap: '16px',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <button
              onClick={() =>
                document
                  .getElementById('featured-guides')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
              style={{
                background: 'var(--le-primary)',
                color: 'white',
                padding: '14px 32px',
                border: 'none',
                borderRadius: '6px',
                fontSize: '1rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLButtonElement).style.background =
                  'var(--le-primary-dark)';
                (e.target as HTMLButtonElement).style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLButtonElement).style.background =
                  'var(--le-primary)';
                (e.target as HTMLButtonElement).style.transform = 'translateY(0)';
              }}
            >
              Buyer's Guide
            </button>
            <button
              onClick={() =>
                document
                  .getElementById('featured-guides')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
              style={{
                background: 'transparent',
                color: 'var(--le-primary)',
                padding: '14px 32px',
                border: '2px solid var(--le-primary)',
                borderRadius: '6px',
                fontSize: '1rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLButtonElement).style.background =
                  'var(--le-primary)';
                (e.target as HTMLButtonElement).style.color = 'white';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLButtonElement).style.background =
                  'transparent';
                (e.target as HTMLButtonElement).style.color = 'var(--le-primary)';
              }}
            >
              Seller's Guide
            </button>
          </div>
        </div>
      </section>

      {/* Featured Guide Cards */}
      <section
        id="featured-guides"
        style={{
          padding: '80px 20px',
          background: 'var(--le-background)',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2
              style={{
                fontSize: 'clamp(2rem, 6vw, 2.5rem)',
                fontWeight: 700,
                marginBottom: '12px',
                color: 'var(--le-heading)',
              }}
            >
              Premium Guides (Lead Magnets)
            </h2>
            <p style={{ fontSize: '1.1rem', color: 'var(--le-text-secondary)' }}>
              Download comprehensive guides to master your real estate journey
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '32px',
            }}
          >
            {featuredGuides.map((guide) => (
              <div
                key={guide.id}
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
                <FileText
                  size={40}
                  style={{ color: 'var(--le-primary)', marginBottom: '16px' }}
                />
                <h3
                  style={{
                    fontSize: '1.3rem',
                    fontWeight: 700,
                    marginBottom: '12px',
                    color: 'var(--le-heading)',
                  }}
                >
                  {guide.title}
                </h3>
                <p
                  style={{
                    color: 'var(--le-text-secondary)',
                    marginBottom: '24px',
                    lineHeight: '1.6',
                  }}
                >
                  {guide.description}
                </p>

                <div
                  style={{
                    display: 'flex',
                    gap: '24px',
                    marginBottom: '24px',
                    fontSize: '0.9rem',
                    color: 'var(--le-text-secondary)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <FileText size={16} />
                    {guide.chapters} chapters
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Calendar size={16} />
                    {guide.readTime} read
                  </div>
                </div>

                <button
                  onClick={() => handleCaptureOpen('guide')}
                  style={{
                    width: '100%',
                    background: 'var(--le-primary)',
                    color: 'white',
                    padding: '12px 16px',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '1rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background =
                      'var(--le-primary-dark)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background =
                      'var(--le-primary)';
                  }}
                >
                  <Download size={18} />
                  Download Free
                </button>

                <p
                  style={{
                    fontSize: '0.85rem',
                    color: 'var(--le-text-secondary)',
                    marginTop: '12px',
                    textAlign: 'center',
                  }}
                >
                  Email required to download
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Guides Grid */}
      <section
        style={{
          padding: '80px 20px',
          background: 'rgba(var(--le-primary-rgb), 0.02)',
          borderTop: '1px solid var(--le-border)',
          borderBottom: '1px solid var(--le-border)',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2
              style={{
                fontSize: 'clamp(2rem, 6vw, 2.5rem)',
                fontWeight: 700,
                marginBottom: '12px',
                color: 'var(--le-heading)',
              }}
            >
              Quick Guides & Articles
            </h2>
            <p style={{ fontSize: '1.1rem', color: 'var(--le-text-secondary)' }}>
              Expand any article to read the full content
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '20px',
            }}
          >
            {quickGuides.map((guide) => {
              const categoryColors: Record<string, { bg: string; text: string }> =
                {
                  Buying: { bg: '#ecfdf5', text: '#059669' },
                  Selling: { bg: '#fffbeb', text: '#b45309' },
                  Investing: { bg: '#eff6ff', text: '#0284c7' },
                  Moving: { bg: '#faf5ff', text: '#7c3aed' },
                };

              const colors = categoryColors[guide.category];

              return (
                <div
                  key={guide.id}
                  style={{
                    background: 'white',
                    border: '1px solid var(--le-border)',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                  }}
                >
                  {/* Article Header */}
                  <button
                    onClick={() =>
                      setExpandedGuide(expandedGuide === guide.id ? null : guide.id)
                    }
                    style={{
                      width: '100%',
                      padding: '20px',
                      background: 'white',
                      border: 'none',
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'background 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      (
                        e.currentTarget as HTMLButtonElement
                      ).parentElement!.style.boxShadow =
                        '0 4px 16px rgba(0,0,0,0.08)';
                    }}
                    onMouseLeave={(e) => {
                      (
                        e.currentTarget as HTMLButtonElement
                      ).parentElement!.style.boxShadow = 'none';
                    }}
                  >
                    <div style={{ marginBottom: '12px' }}>
                      <span
                        style={{
                          display: 'inline-block',
                          background: colors.bg,
                          color: colors.text,
                          padding: '4px 12px',
                          borderRadius: '4px',
                          fontSize: '0.8rem',
                          fontWeight: 600,
                          marginBottom: '8px',
                        }}
                      >
                        {guide.category}
                      </span>
                    </div>

                    <h3
                      style={{
                        fontSize: '1.1rem',
                        fontWeight: 700,
                        color: 'var(--le-heading)',
                        marginBottom: '8px',
                      }}
                    >
                      {guide.title}
                    </h3>

                    <p
                      style={{
                        fontSize: '0.95rem',
                        color: 'var(--le-text-secondary)',
                        marginBottom: '12px',
                        lineHeight: '1.5',
                      }}
                    >
                      {guide.preview}
                    </p>

                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        fontSize: '0.9rem',
                        color: 'var(--le-text-secondary)',
                      }}
                    >
                      <span>{guide.readTime}</span>
                      <ChevronDown
                        size={20}
                        style={{
                          transition: 'transform 0.3s',
                          transform:
                            expandedGuide === guide.id
                              ? 'rotate(180deg)'
                              : 'rotate(0)',
                        }}
                      />
                    </div>
                  </button>

                  {/* Expanded Content */}
                  {expandedGuide === guide.id && (
                    <div
                      style={{
                        padding: '20px',
                        borderTop: '1px solid var(--le-border)',
                        background: 'rgba(var(--le-primary-rgb), 0.01)',
                      }}
                    >
                      <div
                        style={{
                          fontSize: '0.95rem',
                          color: 'var(--le-text-secondary)',
                          lineHeight: '1.7',
                          whiteSpace: 'pre-wrap',
                          wordWrap: 'break-word',
                        }}
                      >
                        {guide.content}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Market Insights */}
      <section
        style={{
          padding: '80px 20px',
          background: 'var(--le-background)',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2
              style={{
                fontSize: 'clamp(2rem, 6vw, 2.5rem)',
                fontWeight: 700,
                marginBottom: '12px',
                color: 'var(--le-heading)',
              }}
            >
              Phoenix Metro Quick Stats
            </h2>
            <p style={{ fontSize: '1.1rem', color: 'var(--le-text-secondary)' }}>
              Current market snapshot to inform your real estate decisions
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '24px',
              marginBottom: '60px',
            }}
          >
            {marketStats.map((stat, idx) => (
              <div
                key={idx}
                style={{
                  background: 'white',
                  border: '1px solid var(--le-border)',
                  borderRadius: '12px',
                  padding: '32px 24px',
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow =
                    '0 8px 24px rgba(0,0,0,0.08)';
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
                <TrendingUp
                  size={32}
                  style={{ color: 'var(--le-primary)', marginBottom: '16px' }}
                />
                <div
                  style={{
                    fontSize: '2rem',
                    fontWeight: 700,
                    color: 'var(--le-heading)',
                    marginBottom: '8px',
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontSize: '0.9rem',
                    color: 'var(--le-text-secondary)',
                    marginBottom: '8px',
                  }}
                >
                  {stat.label}
                </div>
                <div
                  style={{
                    fontSize: '0.85rem',
                    color: 'var(--le-accent)',
                    fontWeight: 600,
                  }}
                >
                  {stat.change}
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              background: 'linear-gradient(135deg, rgba(var(--le-primary-rgb), 0.05), rgba(var(--le-accent-rgb), 0.05))',
              border: '1px solid var(--le-border)',
              borderRadius: '12px',
              padding: '48px 32px',
              textAlign: 'center',
            }}
          >
            <h3
              style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                marginBottom: '16px',
                color: 'var(--le-heading)',
              }}
            >
              Get Your Personalized Market Report
            </h3>
            <p
              style={{
                fontSize: '1.1rem',
                color: 'var(--le-text-secondary)',
                marginBottom: '24px',
              }}
            >
              Neighborhood statistics, market trends, and buyer/seller insights for your specific area
            </p>
            <button
              onClick={() => handleCaptureOpen('market-report')}
              style={{
                background: 'var(--le-primary)',
                color: 'white',
                padding: '14px 32px',
                border: 'none',
                borderRadius: '6px',
                fontSize: '1rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  'var(--le-primary-dark)';
                (e.currentTarget as HTMLButtonElement).style.transform =
                  'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  'var(--le-primary)';
                (e.currentTarget as HTMLButtonElement).style.transform =
                  'translateY(0)';
              }}
            >
              Request Report
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section
        style={{
          padding: '80px 20px',
          background: 'rgba(var(--le-primary-rgb), 0.02)',
          borderTop: '1px solid var(--le-border)',
          borderBottom: '1px solid var(--le-border)',
        }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2
              style={{
                fontSize: 'clamp(2rem, 6vw, 2.5rem)',
                fontWeight: 700,
                marginBottom: '12px',
                color: 'var(--le-heading)',
              }}
            >
              Frequently Asked Questions
            </h2>
            <p style={{ fontSize: '1.1rem', color: 'var(--le-text-secondary)' }}>
              Answers to the questions we hear most from buyers and sellers
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                style={{
                  background: 'white',
                  border: '1px solid var(--le-border)',
                  borderRadius: '10px',
                  overflow: 'hidden',
                }}
              >
                <button
                  onClick={() =>
                    setExpandedFAQ(expandedFAQ === idx.toString() ? null : idx.toString())
                  }
                  style={{
                    width: '100%',
                    padding: '20px',
                    background: 'white',
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    color: 'var(--le-heading)',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background =
                      'rgba(var(--le-primary-rgb), 0.02)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background =
                      'white';
                  }}
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    size={20}
                    style={{
                      transition: 'transform 0.3s',
                      transform:
                        expandedFAQ === idx.toString()
                          ? 'rotate(180deg)'
                          : 'rotate(0)',
                      flexShrink: 0,
                      marginLeft: '16px',
                    }}
                  />
                </button>

                {expandedFAQ === idx.toString() && (
                  <div
                    style={{
                      padding: '20px',
                      borderTop: '1px solid var(--le-border)',
                      background: 'rgba(var(--le-primary-rgb), 0.01)',
                      fontSize: '1rem',
                      color: 'var(--le-text-secondary)',
                      lineHeight: '1.6',
                    }}
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Band */}
      <section
        style={{
          background: `linear-gradient(135deg, var(--le-primary) 0%, var(--le-accent) 100%)`,
          padding: '80px 20px',
          textAlign: 'center',
          color: 'white',
        }}
      >
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2
            style={{
              fontSize: 'clamp(2rem, 6vw, 2.5rem)',
              fontWeight: 700,
              marginBottom: '12px',
            }}
          >
            Ready to Get Started?
          </h2>
          <p
            style={{
              fontSize: '1.2rem',
              marginBottom: '40px',
              opacity: 0.95,
            }}
          >
            Let's find the perfect home or prepare for a successful sale
          </p>

          <div
            style={{
              display: 'flex',
              gap: '16px',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <button
              onClick={() => handleCaptureOpen('consultation')}
              style={{
                background: 'white',
                color: 'var(--le-primary)',
                padding: '14px 32px',
                border: 'none',
                borderRadius: '6px',
                fontSize: '1rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform =
                  'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform =
                  'translateY(0)';
              }}
            >
              Schedule a Consultation
            </button>
            <button
              onClick={() => handleCaptureOpen('home-value')}
              style={{
                background: 'rgba(255, 255, 255, 0.2)',
                color: 'white',
                padding: '14px 32px',
                border: '2px solid white',
                borderRadius: '6px',
                fontSize: '1rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  'rgba(255, 255, 255, 0.3)';
                (e.currentTarget as HTMLButtonElement).style.transform =
                  'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  'rgba(255, 255, 255, 0.2)';
                (e.currentTarget as HTMLButtonElement).style.transform =
                  'translateY(0)';
              }}
            >
              Get Your Home Value
            </button>
          </div>

          <p
            style={{
              fontSize: '0.95rem',
              marginTop: '32px',
              opacity: 0.9,
            }}
          >
            Expert guidance at every step of your real estate journey
          </p>
        </div>
      </section>
    </div>
  );
};

export default GuidesPage;