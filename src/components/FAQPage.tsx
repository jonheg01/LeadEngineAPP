'use client';

import React, { useState, useMemo } from 'react';

interface FAQItem {
  id: string;
  category: 'Buying' | 'Selling' | 'Financing' | 'Process' | 'Investment';
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  // BUYING QUESTIONS
  {
    id: 'buy-1',
    category: 'Buying',
    question: 'How much should I save for a down payment?',
    answer: 'Down payment requirements vary by loan type. Conventional loans typically require 5-20% of the purchase price, though some programs accept as low as 3%. FHA loans require 3.5%, VA loans often require 0%, and USDA loans may require 0% in eligible rural areas. A larger down payment reduces your monthly mortgage payments and helps you avoid private mortgage insurance (PMI). For a $300,000 home, a 20% down payment would be $60,000, while 10% would be $30,000. Most first-time buyers put down between 5-10% and pay PMI until they reach 20% equity in the home.'
  },
  {
    id: 'buy-2',
    category: 'Buying',
    question: 'What is a mortgage pre-approval and why do I need one?',
    answer: 'A mortgage pre-approval is a lender\'s preliminary assessment of how much you can borrow based on your credit score, income, debt, and assets. It\'s different from a pre-qualification, which is just an estimate. Pre-approval involves a full credit check and verification of your financial documents. You need a pre-approval letter before making offers because it shows sellers you\'re a serious buyer with financing secured. It typically lasts 60-90 days and gives you a clear budget to work with. Getting pre-approved also allows you to lock in interest rates and understand your exact monthly payment obligations.'
  },
  {
    id: 'buy-3',
    category: 'Buying',
    question: 'What are closing costs and how much should I expect to pay?',
    answer: 'Closing costs are fees associated with finalizing your mortgage and transferring the property. They typically range from 2-5% of the home purchase price and include lender fees, appraisal fees, title insurance, recording fees, homeowners insurance, property taxes, HOA transfer fees, and attorney fees. On a $300,000 home, expect $6,000-$15,000 in closing costs. Buyers and sellers both pay closing costs, though amounts differ. You\'ll receive a Closing Disclosure form 3 days before closing that itemizes all costs. Many lenders offer no-closing-cost mortgages, but these typically come with slightly higher interest rates.'
  },
  {
    id: 'buy-4',
    category: 'Buying',
    question: 'How long does the home buying process typically take?',
    answer: 'The entire home buying process typically takes 30-45 days from offer acceptance to closing, though it can extend to 60+ days if complications arise. The timeline breaks down as: 1-3 days for offer acceptance, 1-2 weeks for inspection and inspection negotiation, 1-2 weeks for appraisal, 2-3 weeks for underwriting and final approval, and 2-7 days for final walk-through and closing. Factors that can extend the timeline include inspection issues requiring repairs, low appraisals, mortgage approval delays, title issues, or appraisal contingencies. Working with an experienced agent and lender helps expedite the process. Cash purchases close faster, typically in 7-14 days.'
  },
  {
    id: 'buy-5',
    category: 'Buying',
    question: 'What should I look for during a home inspection?',
    answer: 'During a home inspection, a certified inspector examines the property\'s structural integrity, roof condition, HVAC systems, plumbing, electrical systems, foundation, windows, doors, and insulation. Common issues found include roof damage or age, foundation cracks, outdated electrical wiring, plumbing problems, water damage or mold, and HVAC system issues. Major red flags include foundation problems, roof needing replacement, or evidence of pest damage. You should attend the inspection to ask questions and understand issues. The inspection report typically takes 5-7 business days. Based on findings, you can negotiate repairs, request credits, or renegotiate the purchase price.'
  },
  {
    id: 'buy-6',
    category: 'Buying',
    question: 'What is the difference between a fixed and adjustable rate mortgage?',
    answer: 'A fixed-rate mortgage maintains the same interest rate for the entire loan term (15, 20, or 30 years), resulting in consistent monthly payments. An adjustable-rate mortgage (ARM) starts with a lower initial rate for a set period (3, 5, 7, or 10 years), then adjusts periodically based on market conditions. Fixed-rate mortgages provide payment certainty and are ideal for long-term stability, especially when rates are low. ARMs offer lower initial payments and can save money if you plan to sell within the fixed period, but carry risk of payment increases. Most first-time buyers choose fixed-rate mortgages for predictability.'
  },
  {
    id: 'buy-7',
    category: 'Buying',
    question: 'Should I buy before or after selling my current home?',
    answer: 'This depends on your market and financial situation. Buying first gives you more time to find the perfect home and avoid rushed decisions, but requires bridge financing to cover two mortgages temporarily. Selling first eliminates the dual-payment risk and provides clear funds for your down payment, but leaves you homeless if the new purchase closes before your sale. A compromise is to make your offer contingent on the sale of your current home, though this is less attractive to sellers. In strong seller markets, contingent offers may be rejected. Consider your equity position, available credit, and local market conditions when deciding.'
  },

  // SELLING QUESTIONS
  {
    id: 'sell-1',
    category: 'Selling',
    question: 'How should I price my home for maximum profit?',
    answer: 'Pricing correctly is crucial—overpricing scares buyers and leaves your home on the market longer, while underpricing leaves money on the table. Start by analyzing comparable homes (comps) in your area that sold in the last 3-6 months. Your agent will prepare a Comparative Market Analysis (CMA) showing similar homes\' sale prices, list prices, days on market, and features. Consider your home\'s condition, location, square footage, age, upgrades, and local market trends. In seller\'s markets, you can price higher; in buyer\'s markets, competitive pricing is essential. Homes priced in the 87-93% range of asking price to sale price in your area typically sell fastest. Avoid emotional pricing—focus on what buyers will actually pay.'
  },
  {
    id: 'sell-2',
    category: 'Selling',
    question: 'What repairs and updates should I make before selling?',
    answer: 'Focus on high-ROI repairs that appeal broadly to buyers: fresh paint (neutrals), landscaping, kitchen updates, bathroom improvements, roofing repairs, HVAC maintenance, and curb appeal. Aim for 50-100% ROI on repairs. Major upgrades like full kitchen renovations or additions typically don\'t return their full cost. Avoid highly personalized choices buyers may dislike. Minor cosmetic fixes like light fixtures, hardware, and caulking are excellent investments. Get pre-sale inspections to identify issues buyers will discover anyway. Budget $5,000-$15,000 for typical prep work. Professional staging can increase perceived value 5-10%, especially for empty homes. Prioritize what buyers see first: curb appeal, entry, kitchen, bathrooms.'
  },
  {
    id: 'sell-3',
    category: 'Selling',
    question: 'When is the best time of year to sell a home?',
    answer: 'Spring (March-May) and early summer (June-July) are traditionally the strongest selling seasons. More buyers are actively looking, schools are about to start, and weather is pleasant for showings. Fall (September-October) is the second-best season. Winter (November-February) is slower due to holidays, weather, and fewer active buyers, but less competition means less-equipped homes may stand out. That said, the "best" time depends on your personal situation—if you must sell in winter, proper staging and marketing matter more. In extremely hot markets, homes sell year-round. Strong homes sell in any season, but season does impact buyer pool size. Avoid listing 2-3 weeks before major holidays.'
  },
  {
    id: 'sell-4',
    category: 'Selling',
    question: 'How much should I pay a real estate agent in commission?',
    answer: 'Real estate agent commissions are typically 5-6% of the final sale price, split between the listing agent and buyer\'s agent (2.5-3% each). Commissions are negotiable, and 5% is becoming more common as competition increases. On a $300,000 sale, a 5% commission is $15,000. Your agent handles marketing, showings, negotiations, and paperwork. In some markets, buyers can negotiate buyer\'s agent commission separately. Discount brokers may charge 3-4%, but may provide fewer services. A low commission shouldn\'t be your only factor—experienced agents often sell homes faster and for higher prices, offsetting their commission. Ask agents about their marketing strategy and local market expertise.'
  },
  {
    id: 'sell-5',
    category: 'Selling',
    question: 'How do I handle multiple offers on my home?',
    answer: 'Multiple offers create negotiating power and allow you to be selective. Review all offers carefully, considering price, terms, contingencies, down payment, and buyer qualification. The highest price isn\'t always best—a lower all-cash offer with no contingencies may be safer than a high conventional offer with financing contingencies. Request proof of funds for cash offers and pre-approval letters for financed offers. Negotiate with your top choice first; if negotiations stall, you can move to your second choice. Avoid false bidding wars—encourage buyers to submit their strongest offer immediately. Set a deadline for highest and best offers if multiple strong candidates exist. Your agent handles these negotiations, protecting your interests.'
  },
  {
    id: 'sell-6',
    category: 'Selling',
    question: 'What should I disclose about my home to buyers?',
    answer: 'You\'re legally required to disclose all known material defects affecting property value or safety. This includes structural issues, roof damage, water damage, mold, pest infestations, foundation problems, mechanical failures, flooding history, neighborhood issues, and any previous damage claims. Disclosure requirements vary by state, but most require written disclosure documents before or during the offer period. Non-disclosure can result in lawsuits, voided sales, or specific performance orders forcing you to sell anyway. Honest disclosure prevents post-closing disputes and builds trust. Buyers will likely discover issues during inspections anyway. Disclosures protect you legally and allow fair negotiations.'
  },
  {
    id: 'sell-7',
    category: 'Selling',
    question: 'How much can I expect to net after selling?',
    answer: 'Your net proceeds equal the sale price minus all costs. Major costs include real estate commissions (5-6%), capital gains taxes (0-20% of profit depending on ownership), closing costs (seller pays 1-2%), remaining mortgage balance, and any home seller tax credits that apply. Example: $300,000 sale price minus $15,000 commission (5%) minus $9,000 closing costs minus $180,000 mortgage balance = $96,000 net before taxes. If you owned the home 2+ years, up to $250,000 of profit (or $500,000 if married) is tax-free. Capital gains on profit above that threshold are taxed at your income tax rate. Your agent and accountant can project your exact net proceeds and tax implications based on your situation.'
  },

  // FINANCING QUESTIONS
  {
    id: 'fin-1',
    category: 'Financing',
    question: 'What credit score do I need to qualify for a mortgage?',
    answer: 'Minimum credit scores vary by loan type. Conventional loans typically require 620-660, FHA loans accept 580 (with 10% down) or 500 (with 10% down), VA loans have no minimum but most lenders want 620+, and USDA loans accept 580+. Credit scores of 740+ get the best rates, while scores below 620 are harder to finance. Your credit score reflects payment history (35%), amounts owed (30%), length of credit history (15%), credit mix (10%), and new credit inquiries (10%). You can improve your score by paying bills on time, reducing debt, and not opening new accounts before applying. Allow 3-6 months to improve scores significantly. Even with lower scores, FHA and VA programs provide options.'
  },
  {
    id: 'fin-2',
    category: 'Financing',
    question: 'What is PMI and how can I avoid it?',
    answer: 'Private Mortgage Insurance (PMI) protects the lender if you default on a conventional loan with less than 20% down. PMI costs 0.5-1% of your loan amount annually, added to monthly payments. On a $240,000 loan (20% down on $300,000), PMI might be $100-200/month. You must pay PMI with down payments below 20%, but you can request removal once you reach 20% equity (through payments or home appreciation). PMI automatically falls off at 22% equity if you meet payment history requirements. To avoid PMI, save 20% down, consider an FHA loan (requires only 3.5% down with upfront and annual mortgage insurance), or make a larger down payment on a conventional loan. Some lenders offer "piggyback" loans to avoid PMI.'
  },
  {
    id: 'fin-3',
    category: 'Financing',
    question: 'Should I refinance my mortgage?',
    answer: 'Refinancing makes sense when rates drop significantly (typically 0.75% or more lower), allowing interest savings that exceed closing costs within your remaining loan term. Use the break-even analysis: if closing costs are $3,000 and monthly savings are $200, break-even is 15 months. If you plan to stay longer than break-even, refinancing is worthwhile. Other scenarios include: switching from ARM to fixed-rate (locking in current rates before they rise), shortening your loan term to build equity faster, or cashing out equity for home improvements. Cash-out refinances should be used strategically as they restart your loan clock and increase total interest paid. Closing costs typically run 2-5% of the new loan amount. Compare offers from multiple lenders and ensure you\'ll actually save money.'
  },
  {
    id: 'fin-4',
    category: 'Financing',
    question: 'What are the different types of mortgages available?',
    answer: 'Main mortgage types include conventional (traditional bank loans for borrowers with good credit and 3-20% down), FHA (government-backed loans requiring 3.5% down, accepting lower credit scores), VA (government-backed loans for veterans with 0% down), USDA (government-backed loans for rural properties with 0% down), and jumbo loans (for loans exceeding conventional limits, typically $766,200+). Within these, you choose between fixed-rate (same rate entire loan term) and adjustable-rate mortgages (ARM). Other options include interest-only mortgages (only pay interest initially), balloon mortgages (large payment at end), and portfolio loans (lender keeps the loan rather than selling). Most first-time buyers choose conventional fixed-rate or FHA fixed-rate mortgages for simplicity and predictability.'
  },
  {
    id: 'fin-5',
    category: 'Financing',
    question: 'How are mortgage interest rates determined?',
    answer: 'Mortgage rates are influenced by Federal Reserve policy, inflation, bond market yields (especially 10-year Treasury), loan demand, and your personal financial profile. When the Fed raises rates, mortgage rates typically increase. When inflation rises or bonds yield more, lenders demand higher mortgage rates. Your personal rate depends on your credit score (higher scores get better rates), down payment (larger down payments earn discounts), loan term (15-year rates lower than 30-year), loan type (conventional vs. FHA), and property type (single-family homes get better rates than multi-unit). Current economic conditions, geopolitical events, and employment data also affect rates daily. Lock in your rate at application to prevent rate changes before closing. Shopping multiple lenders can save thousands in interest.'
  },
  {
    id: 'fin-6',
    category: 'Financing',
    question: 'What debt-to-income ratio do lenders require?',
    answer: 'Most lenders require a debt-to-income ratio (DTI) of 43% or less, meaning total monthly debt payments (mortgage, car loans, student loans, credit cards, etc.) can\'t exceed 43% of gross monthly income. Some lenders allow 50% for strong borrowers. DTI is calculated as total monthly debt payments divided by gross monthly income. Example: if gross monthly income is $5,000 and total debt is $2,100, DTI is 42%. Mortgage payment is typically limited to 28% of gross income, with total debt capped at 43%. Reducing debt before applying (paying down credit cards, paying off auto loans) improves your DTI and helps qualify for larger loans. Stable income documentation (tax returns, pay stubs, W2s) is required to prove your income level.'
  },
  {
    id: 'fin-7',
    category: 'Financing',
    question: 'Can I get a mortgage with student loan debt?',
    answer: 'Yes, you can qualify with student loans, but they affect your debt-to-income ratio. Lenders typically count 1-2% of your outstanding student loan balance as part of your monthly debt obligation, or actual payment amount if higher. If you have $40,000 in student loans and payments of $400/month, lenders might count $400-$800/month. Income-driven repayment plans can lower your monthly obligation, improving your DTI. Consolidating or paying down student loans before applying helps. Forbearance or deferment periods show $0 monthly obligation in calculations, potentially improving your qualification amount. Federal student loans in deferment still affect DTI calculations. Working with a knowledgeable loan officer helps you navigate student loan implications on your borrowing power.'
  },

  // PROCESS QUESTIONS
  {
    id: 'proc-1',
    category: 'Process',
    question: 'What is a home appraisal and why is it necessary?',
    answer: 'A home appraisal is an independent assessment of your property\'s market value, ordered by the lender to ensure the property is worth the loan amount. The appraisal protects the lender from lending more than the home is worth. An appraiser inspects the property, reviews comparable sales, analyzes condition and features, and provides a written report. Appraisals typically cost $300-$500 and take 1-2 weeks. If the appraisal comes in lower than the purchase price, you have options: negotiate a lower price with the seller, pay the difference in cash, or walk away (if you have a contingency). Appraisals are separate from home inspections—appraisers assess value while inspectors assess condition. Most mortgages are contingent on satisfactory appraisal.'
  },
  {
    id: 'proc-2',
    category: 'Process',
    question: 'What happens during the underwriting process?',
    answer: 'Underwriting is where the lender thoroughly reviews your application to approve or deny your loan. The underwriter verifies income (tax returns, W2s, pay stubs), assets (bank statements), employment history, credit worthiness, and the property appraisal. They check for fraud, verify all information matches original application, and assess risk. Underwriters typically request additional documentation: recent bank statements, explanation letters for credit issues, employment verification, or asset documentation. This process takes 2-5 business days for straightforward applications, longer for complex situations. Your loan enters "conditional approval" once all documentation is satisfactory. Final approval comes after property appraisal and final walkthrough confirm nothing has changed. Work quickly on underwriter requests to avoid delays or loan denial.'
  },
  {
    id: 'proc-3',
    category: 'Process',
    question: 'What is an inspection contingency and is it necessary?',
    answer: 'An inspection contingency allows you to hire a home inspector, review the report, and renegotiate or withdraw from the purchase if significant issues are discovered. It typically lasts 7-10 days (sometimes negotiable). This is crucial for first-time buyers—without it, you\'re stuck with whatever problems are discovered later. After inspection, you can request repairs, price credits, or walk away without penalty. In competitive markets, sellers may request short contingency periods or inspection waivers. Even with waived contingencies, you can still conduct inspection but lose negotiating power. Never waive inspections completely—spend $300-500 now to avoid $5,000+ in unexpected repairs later. Contingencies protect your biggest investment and financial security.'
  },
  {
    id: 'proc-4',
    category: 'Process',
    question: 'What does escrow mean and why is it necessary?',
    answer: 'Escrow is a neutral third party (escrow company or attorney) that holds funds and documents during a transaction until all conditions are met, then releases everything to appropriate parties. When you submit an offer, earnest money (typically 1-3% of purchase price) goes into escrow, showing you\'re a serious buyer. Your down payment also goes into escrow and stays there until closing. Seller discloses and documents are held in escrow. Once all conditions are satisfied (inspection passed, appraisal acceptable, financing approved, title clear), escrow closes and: your down payment and loan funds are transferred to seller, seller transfers deed and title to you, and closing costs are paid from escrow funds. If the deal falls apart due to a valid contingency (inspection issues, failed appraisal), your earnest money is returned. Escrow protects both buyer and seller.'
  },
  {
    id: 'proc-5',
    category: 'Process',
    question: 'What is title insurance and do I really need it?',
    answer: 'Title insurance protects you against financial loss from title defects such as hidden liens, ownership claims, fraud, or recording errors that could challenge your ownership or cause loss. There are two types: lender\'s title insurance (protects the lender, required by all mortgages) and owner\'s title insurance (protects you). Title insurance costs $500-$1,500 depending on purchase price, paid once at closing. A title search reveals existing liens or claims, but doesn\'t protect against future undiscovered issues. Owner\'s title insurance is highly recommended—without it, you could face unexpected liens, lose property to unknown heirs, or face costly legal battles to defend ownership. Many states make it standard practice. For investment properties or cash purchases, title insurance is essential. It\'s relatively inexpensive insurance against massive potential loss.'
  },
  {
    id: 'proc-6',
    category: 'Process',
    question: 'What should I expect on closing day?',
    answer: 'Closing day is when you sign final paperwork and officially become the homeowner. You\'ll sign: the mortgage note (your promise to repay), the deed of trust (lender\'s security interest), the final Closing Disclosure (itemizing all costs), and various other legal documents. The closing typically takes 1-2 hours. You\'ll review the Closing Disclosure 3 days before closing to ensure accuracy. You\'ll need a government ID and cashier\'s check or wire transfer for your down payment and closing costs. After signing, the lender funds the loan, your funds clear, and the title transfers to you. The lender records the deed with the county. You receive the keys and can move in. Always review all documents before signing and ask questions about anything unclear. Bring a trusted person or attorney if you\'re uncomfortable.'
  },
  {
    id: 'proc-7',
    category: 'Process',
    question: 'What does a final walkthrough involve?',
    answer: 'The final walkthrough is your last opportunity to verify the property condition matches your expectations before closing, typically within 24-48 hours of closing. You verify that agreed-upon repairs were completed, agreed-upon items (appliances, fixtures) are still in the home, the property is in expected condition (no new damage), utilities are on, and the home is empty (seller has moved out). Walk every room, test light switches, check appliances, and inspect agreed-upon repair work. Document any issues with photos. If problems exist, contact your agent immediately—they can negotiate last-minute solutions or delay closing. Most walkthrough issues are minor (broken lightbulb, uncompleted small repair), but serious problems (major damage, promised repairs incomplete) can delay closing or renegotiate terms. Never skip the walkthrough—it prevents post-purchase surprises.'
  },

  // INVESTMENT QUESTIONS
  {
    id: 'inv-1',
    category: 'Investment',
    question: 'What\'s a realistic ROI for a rental property investment?',
    answer: 'Realistic annual returns on rental property investments typically range from 8-12% including appreciation and rental income, though this varies significantly by location and property type. Return on Investment (ROI) is calculated as: (annual rental income - annual expenses) divided by total cash invested. Example: if you invest $60,000 down payment on a $300,000 rental property, collect $24,000 annual rent, and have $12,000 annual expenses (mortgage, taxes, insurance, maintenance, vacancy, management), your annual cash flow is $12,000, equaling 20% cash-on-cash return. This doesn\'t include mortgage principal paydown (building equity) or property appreciation (typically 3-5% annually). Long-term wealth building comes from mortgage paydown and appreciation, while cash flow covers expenses and provides income. Market conditions, property management, and tenant quality significantly impact actual returns.'
  },
  {
    id: 'inv-2',
    category: 'Investment',
    question: 'What financing options exist for investment properties?',
    answer: 'Investment property financing differs from primary residence financing. Conventional investment loans require 20-25% down (more than primary residence 3-20%), have higher interest rates (0.5-1% higher), stricter debt-to-income requirements (typically 36-40%), and require recent tax returns showing business income if self-employed. Portfolio loans from private lenders offer more flexibility but higher rates. Some investors use home equity lines of credit (HELOC) on their primary home to fund down payments. Cash purchases avoid lending entirely but tie up liquid capital. Financing terms are typically 20-30 years. Lenders verify the property cash flow will cover the mortgage payment (called debt service coverage ratio, typically requiring 1.2-1.25x). Fix-and-flip investors use hard money or bridge loans with shorter terms and higher rates.'
  },
  {
    id: 'inv-3',
    category: 'Investment',
    question: 'Should I invest in residential or commercial real estate?',
    answer: 'Residential properties (single-family, duplexes, apartments) suit individual investors. Benefits include easier financing, simpler management, broader buyer pool if you exit, and lower entry costs. Challenges include tenant turnover, individual repair calls, and reliance on one property for cash flow. Commercial properties (office, retail, warehouses) offer larger deal sizes, longer tenant leases (5-10 years), more stable cash flow, and triple-net leases (tenant pays taxes, insurance, maintenance). Challenges include higher capital requirements, stricter financing, longer vacancy periods, and specialized knowledge needed. Most beginning investors start residential because of lower entry cost and simpler operations. Consider your available capital, time for management, and risk tolerance. Diversifying across multiple small residential properties often works better for individual investors than betting on one commercial property.'
  },
  {
    id: 'inv-4',
    category: 'Investment',
    question: 'What are 1031 exchanges and how do they work?',
    answer: 'A 1031 exchange is a tax strategy allowing you to defer capital gains taxes by selling one investment property and buying another of equal or greater value within strict timelines. When executed properly, 1031 exchanges defer taxes indefinitely (taxes are paid when you finally sell without exchanging). You must identify replacement properties within 45 days of selling and complete the new purchase within 180 days. The properties must be "like-kind" (both real estate investment properties in the US qualify, residential or commercial). Funds from the sale cannot touch your hands—a qualified intermediary holds money and coordinates the exchange. Example: sell rental home for $300,000, defer $50,000 in capital gains taxes by purchasing a $300,000+ investment property. This strategy allows portfolio growth without tax drag, but requires careful planning and strict timeline adherence.'
  },
  {
    id: 'inv-5',
    category: 'Investment',
    question: 'What expenses can I deduct as a rental property owner?',
    answer: 'Rental property owners can deduct most ordinary business expenses, reducing taxable income. Deductible expenses include: mortgage interest (not principal), property taxes, insurance, utilities (if landlord-paid), maintenance and repairs, property management fees, vacancy losses, advertising (tenant recruitment), legal and accounting fees, HOA fees, depreciation, and improvements. You cannot deduct mortgage principal (this builds equity), personal use of the property, or capital improvements (added to property basis instead). Depreciation deduction (typically 2.2-2.9% annually of building value) is substantial and creates tax deductions even if property cash flows positively. Keep meticulous records and receipts. Consult a CPA experienced in rental properties to maximize deductions legally. These deductions can significantly reduce your taxable income, sometimes creating paper losses that offset other income.'
  },
  {
    id: 'inv-6',
    category: 'Investment',
    question: 'How do I analyze a rental property before buying?',
    answer: 'Proper analysis prevents poor investments. Start with cap rate (capitalization rate): NOI (net operating income after all expenses) divided by purchase price. If NOI is $12,000 and purchase price is $300,000, cap rate is 4% (generally lower in hot markets, 6-8% in secondary markets). Calculate cash-on-cash return: annual cash flow divided by cash invested. Analyze rent-to-value ratio: monthly rent divided by purchase price should be 0.8-1.5% (higher is better cash flow). Check vacancy rates (typical 5-10%), estimate realistic expenses (management 8-12%, maintenance 1-2%, taxes 0.5-1.5%), and verify neighborhood appreciation potential. Run multiple scenarios with different occupancy rates. Research job growth, school quality, and neighborhood trends. Compare to similar properties—cap rate 2-3% below market signals overpayment. Use tools like spreadsheets or investment analysis software to compare properties objectively.'
  },
  {
    id: 'inv-7',
    category: 'Investment',
    question: 'What\'s the difference between house hacking and traditional rental investing?',
    answer: 'House hacking means buying a multi-unit property (duplex, triplex, fourplex), living in one unit, and renting out others. This strategy allows owner-occupant financing (lower down payment 3-5%) rather than investment financing (20-25% down), and tenant rent often covers your entire mortgage payment. Example: purchase a duplex with FHA loan (3.5% down), live in one unit, rent the other for $1,500/month while paying $1,500 mortgage, achieving nearly free housing. After 1-2 years, rent out your unit and buy another property, repeating the process. House hacking accelerates wealth building because you build equity with tenant rent while living cheaply. Downsides include sharing a building with tenants, property management complexity, and restricted future financing options (some lenders limit properties financed this way). House hacking works well for first-time investors building capital, but requires landlord mindset while living there.'
  },
];

export default function FAQPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [leadFormData, setLeadFormData] = useState({
    name: '',
    email: '',
    question: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const categories = ['All', 'Buying', 'Selling', 'Financing', 'Process', 'Investment'];

  const filteredFaqs = useMemo(() => {
    return faqData.filter((item) => {
      const categoryMatch = selectedCategory === 'All' || item.category === selectedCategory;
      const searchMatch =
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return categoryMatch && searchMatch;
    });
  }, [selectedCategory, searchQuery]);

  const handleLeadFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Lead form submitted:', leadFormData);
    setFormSubmitted(true);
    setLeadFormData({ name: '', email: '', question: '' });
    setTimeout(() => setFormSubmitted(false), 3000);
  };

  const containerStyles: React.CSSProperties = {
    minHeight: '100vh',
    backgroundColor: 'var(--le-bg)',
    paddingTop: '40px',
    paddingBottom: '60px',
    fontFamily: 'inherit',
  };

  const heroStyles: React.CSSProperties = {
    textAlign: 'center',
    paddingBottom: '50px',
    borderBottom: '1px solid var(--le-border)',
    marginBottom: '50px',
  };

  const heroTitleStyles: React.CSSProperties = {
    fontSize: '42px',
    fontWeight: '700',
    color: 'var(--le-text)',
    marginBottom: '16px',
    letterSpacing: '-0.5px',
  };

  const heroSubtitleStyles: React.CSSProperties = {
    fontSize: '18px',
    color: 'var(--le-text-secondary)',
    maxWidth: '600px',
    marginLeft: 'auto',
    marginRight: 'auto',
  };

  const searchBarContainerStyles: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '50px',
    maxWidth: '100%',
    paddingLeft: '20px',
    paddingRight: '20px',
  };

  const searchBarStyles: React.CSSProperties = {
    width: '100%',
    maxWidth: '500px',
    padding: '14px 18px',
    fontSize: '16px',
    border: '1px solid var(--le-border)',
    borderRadius: '12px',
    backgroundColor: 'var(--le-surface)',
    color: 'var(--le-text)',
    transition: 'border-color 0.2s',
    outline: 'none',
  };

  const categoryTabsContainerStyles: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    gap: '12px',
    marginBottom: '50px',
    flexWrap: 'wrap',
    paddingLeft: '20px',
    paddingRight: '20px',
  };

  const categoryTabStyles = (isActive: boolean): React.CSSProperties => ({
    padding: '10px 18px',
    border: isActive ? 'none' : '1px solid var(--le-border)',
    borderRadius: '20px',
    backgroundColor: isActive ? 'var(--le-primary)' : 'transparent',
    color: isActive ? '#ffffff' : 'var(--le-text)',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.2s',
  });

  const faqContainerStyles: React.CSSProperties = {
    maxWidth: '800px',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: '20px',
    paddingRight: '20px',
    marginBottom: '80px',
  };

  const faqItemStyles: React.CSSProperties = {
    marginBottom: '16px',
    border: '1px solid var(--le-border)',
    borderRadius: '12px',
    overflow: 'hidden',
    backgroundColor: 'var(--le-surface)',
    transition: 'box-shadow 0.2s, border-color 0.2s',
  };

  const faqItemHoverStyles: React.CSSProperties = {
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
  };

  const faqTriggerStyles: React.CSSProperties = {
    width: '100%',
    padding: '20px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    textAlign: 'left',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '16px',
    transition: 'background-color 0.2s',
  };

  const faqQuestionStyles: React.CSSProperties = {
    fontSize: '16px',
    fontWeight: '600',
    color: 'var(--le-text)',
    flex: 1,
  };

  const faqIconStyles = (isOpen: boolean): React.CSSProperties => ({
    flexShrink: 0,
    transition: 'transform 0.3s ease',
    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
    width: '20px',
    height: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--le-primary)',
  });

  const faqAnswerStyles: React.CSSProperties = {
    padding: '0 20px 20px 20px',
    fontSize: '15px',
    lineHeight: '1.6',
    color: 'var(--le-text-secondary)',
    borderTop: '1px solid var(--le-border)',
    animation: 'slideDown 0.3s ease',
  };

  const ctaContainerStyles: React.CSSProperties = {
    maxWidth: '700px',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: '20px',
    paddingRight: '20px',
    padding: '50px 20px',
    backgroundColor: 'var(--le-surface)',
    borderRadius: '16px',
    textAlign: 'center',
    border: '1px solid var(--le-border)',
  };

  const ctaTitleStyles: React.CSSProperties = {
    fontSize: '28px',
    fontWeight: '700',
    color: 'var(--le-text)',
    marginBottom: '12px',
  };

  const ctaSubtitleStyles: React.CSSProperties = {
    fontSize: '16px',
    color: 'var(--le-text-secondary)',
    marginBottom: '32px',
  };

  const formStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  };

  const inputStyles: React.CSSProperties = {
    padding: '12px 16px',
    fontSize: '15px',
    border: '1px solid var(--le-border)',
    borderRadius: '8px',
    backgroundColor: 'var(--le-bg)',
    color: 'var(--le-text)',
    fontFamily: 'inherit',
    outline: 'none',
    transition: 'border-color 0.2s',
  };

  const textareaStyles: React.CSSProperties = {
    ...inputStyles,
    minHeight: '100px',
    resize: 'vertical',
    fontFamily: 'inherit',
  };

  const submitButtonStyles: React.CSSProperties = {
    padding: '12px 24px',
    fontSize: '16px',
    fontWeight: '600',
    backgroundColor: 'var(--le-primary)',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  };

  const submitButtonHoverStyles: React.CSSProperties = {
    backgroundColor: 'var(--le-primary-hover)',
  };

  const successMessageStyles: React.CSSProperties = {
    marginTop: '16px',
    padding: '12px 16px',
    backgroundColor: '#f0fdf4',
    color: '#166534',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
  };

  const emptyStateStyles: React.CSSProperties = {
    textAlign: 'center',
    padding: '40px 20px',
    color: 'var(--le-text-secondary)',
  };

  const emptyStateTitleStyles: React.CSSProperties = {
    fontSize: '18px',
    fontWeight: '600',
    marginBottom: '8px',
  };

  const noResultsStyles: React.CSSProperties = {
    fontSize: '14px',
  };

  return (
    <div style={containerStyles}>
      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        input:focus, textarea:focus {
          border-color: var(--le-primary) !important;
        }
        button:hover {
          opacity: 0.95;
        }
      `}</style>

      <div style={heroStyles}>
        <h1 style={heroTitleStyles}>Frequently Asked Questions</h1>
        <p style={heroSubtitleStyles}>
          Find answers to common questions about buying, selling, financing, and investing in real estate. Our team is here to help guide you through every step.
        </p>
      </div>

      <div style={searchBarContainerStyles}>
        <input
          type="text"
          placeholder="Search questions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={searchBarStyles}
        />
      </div>

      <div style={categoryTabsContainerStyles}>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            style={categoryTabStyles(category === selectedCategory)}
            onMouseOver={(e) => {
              if (category !== selectedCategory) {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--le-surface)';
              }
            }}
            onMouseOut={(e) => {
              if (category !== selectedCategory) {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
              }
            }}
          >
            {category}
          </button>
        ))}
      </div>

      <div style={faqContainerStyles}>
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq) => (
            <div
              key={faq.id}
              style={faqItemStyles}
              onMouseOver={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = faqItemHoverStyles.boxShadow || '';
                (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--le-primary)';
              }}
              onMouseOut={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = '';
                (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--le-border)';
              }}
            >
              <button
                onClick={() =>
                  setExpandedId(expandedId === faq.id ? null : faq.id)
                }
                style={faqTriggerStyles}
                onMouseOver={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--le-bg)';
                }}
                onMouseOut={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
                }}
              >
                <span style={faqQuestionStyles}>{faq.question}</span>
                <div style={faqIconStyles(expandedId === faq.id)}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="6 9 10 13 14 9" />
                  </svg>
                </div>
              </button>
              {expandedId === faq.id && (
                <div style={faqAnswerStyles}>{faq.answer}</div>
              )}
            </div>
          ))
        ) : (
          <div style={emptyStateStyles}>
            <div style={emptyStateTitleStyles}>No questions found</div>
            <div style={noResultsStyles}>
              Try adjusting your search or category filters
            </div>
          </div>
        )}
      </div>

      <div style={ctaContainerStyles}>
        <h2 style={ctaTitleStyles}>Still have questions?</h2>
        <p style={ctaSubtitleStyles}>
          We're here to help. Send us your question and one of our real estate experts will get back to you within 24 hours.
        </p>

        <form onSubmit={handleLeadFormSubmit} style={formStyles}>
          <input
            type="text"
            placeholder="Your name"
            value={leadFormData.name}
            onChange={(e) =>
              setLeadFormData({ ...leadFormData, name: e.target.value })
            }
            style={inputStyles}
            required
          />
          <input
            type="email"
            placeholder="your@email.com"
            value={leadFormData.email}
            onChange={(e) =>
              setLeadFormData({ ...leadFormData, email: e.target.value })
            }
            style={inputStyles}
            required
          />
          <textarea
            placeholder="What's your question?"
            value={leadFormData.question}
            onChange={(e) =>
              setLeadFormData({ ...leadFormData, question: e.target.value })
            }
            style={textareaStyles}
            required
          />
          <button
            type="submit"
            style={submitButtonStyles}
            onMouseOver={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                'var(--le-primary-hover)';
            }}
            onMouseOut={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                'var(--le-primary)';
            }}
          >
            Send Question
          </button>
          {formSubmitted && (
            <div style={successMessageStyles}>
              ✓ Thank you! We'll be in touch shortly.
            </div>
          )}
        </form>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqData.map((item) => ({
              '@type': 'Question',
              name: item.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: item.answer,
              },
            })),
          }),
        }}
      />
    </div>
  );
}
