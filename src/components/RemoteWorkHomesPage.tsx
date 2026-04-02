'use client';

import React, { useState, useRef } from 'react';

export default function RemoteWorkHomesPage() {
  const [expandedLocations, setExpandedLocations] = useState<Set<number>>(new Set());
  const [expandedOfficeDesigns, setExpandedOfficeDesigns] = useState<Set<number>>(new Set());
  const [expandedInternet, setExpandedInternet] = useState<Set<number>>(new Set());
  const [expandedTaxes, setExpandedTaxes] = useState<Set<number>>(new Set());
  const [expandedNeighborhood, setExpandedNeighborhood] = useState<Set<number>>(new Set());
  const [expandedZoning, setExpandedZoning] = useState<Set<number>>(new Set());
  const [expandedFaqs, setExpandedFaqs] = useState<Set<number>>(new Set());
  const [expandedTools, setExpandedTools] = useState<Set<number>>(new Set());
  const [officeNeedScore, setOfficeNeedScore] = useState<number>(0);
  const [leadEmail, setLeadEmail] = useState<string>('');
  const [leadName, setLeadName] = useState<string>('');
  const [leadPhone, setLeadPhone] = useState<string>('');
  const [leadSubmitted, setLeadSubmitted] = useState<boolean>(false);
  const heroRef = useRef<HTMLDivElement>(null);

  const toggleLocation = (index: number) => {
    const newSet = new Set(expandedLocations);
    if (newSet.has(index)) {
      newSet.delete(index);
    } else {
      newSet.add(index);
    }
    setExpandedLocations(newSet);
  };

  const toggleOfficeDesign = (index: number) => {
    const newSet = new Set(expandedOfficeDesigns);
    if (newSet.has(index)) {
      newSet.delete(index);
    } else {
      newSet.add(index);
    }
    setExpandedOfficeDesigns(newSet);
  };

  const toggleInternet = (index: number) => {
    const newSet = new Set(expandedInternet);
    if (newSet.has(index)) {
      newSet.delete(index);
    } else {
      newSet.add(index);
    }
    setExpandedInternet(newSet);
  };

  const toggleTax = (index: number) => {
    const newSet = new Set(expandedTaxes);
    if (newSet.has(index)) {
      newSet.delete(index);
    } else {
      newSet.add(index);
    }
    setExpandedTaxes(newSet);
  };

  const toggleNeighborhood = (index: number) => {
    const newSet = new Set(expandedNeighborhood);
    if (newSet.has(index)) {
      newSet.delete(index);
    } else {
      newSet.add(index);
    }
    setExpandedNeighborhood(newSet);
  };

  const toggleZoning = (index: number) => {
    const newSet = new Set(expandedZoning);
    if (newSet.has(index)) {
      newSet.delete(index);
    } else {
      newSet.add(index);
    }
    setExpandedZoning(newSet);
  };

  const toggleFaq = (index: number) => {
    const newSet = new Set(expandedFaqs);
    if (newSet.has(index)) {
      newSet.delete(index);
    } else {
      newSet.add(index);
    }
    setExpandedFaqs(newSet);
  };

  const toggleTool = (index: number) => {
    const newSet = new Set(expandedTools);
    if (newSet.has(index)) {
      newSet.delete(index);
    } else {
      newSet.add(index);
    }
    setExpandedTools(newSet);
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (leadEmail && leadName) {
      setLeadSubmitted(true);
      setTimeout(() => {
        setLeadSubmitted(false);
        setLeadEmail('');
        setLeadName('');
        setLeadPhone('');
      }, 3000);
    }
  };

  const calculateOfficeScore = () => {
    const scoreElement = document.getElementById('office-score-total');
    if (scoreElement) {
      const inputs = document.querySelectorAll('input[name="office-need"]');
      let total = 0;
      inputs.forEach((input) => {
        const val = (input as HTMLInputElement).value;
        total += parseInt(val, 10) || 0;
      });
      setOfficeNeedScore(total);
    }
  };

  const essentials = [
    {
      title: 'Dedicated Space',
      description: 'A room or area exclusively for work, separate from living areas.',
      details:
        'Dedicated office space improves focus and productivity. Even a corner in a bedroom works if properly separated. Consider room size, natural light, and ability to close the door. A minimum 8x10 space is ideal for a comfortable desk setup.',
    },
    {
      title: 'Natural Light',
      description: 'Windows or skylights to reduce eye strain and boost mood.',
      details:
        'Natural light improves mood, energy, and circadian rhythm regulation. Position your desk perpendicular to windows to minimize screen glare. Skylights are excellent for rooms without side windows. Can reduce need for artificial lighting and energy costs.',
    },
    {
      title: 'Acoustic Control',
      description: 'Sound insulation for meetings and concentration.',
      details:
        'Minimize background noise from traffic, neighbors, pets, and appliances. Consider thick curtains, carpeting, acoustic panels, or weatherstripping. Solid core doors reduce sound transmission. Dual-pane windows are excellent for noise reduction.',
    },
    {
      title: 'Internet Infrastructure',
      description: 'Robust, reliable broadband with backup options.',
      details:
        'Fiber-optic internet (1 Gbps+) is ideal; cable (300+ Mbps) is acceptable. Check speeds at specific address using speed testing tools. Consider backup mobile hotspot or satellite internet. Mesh WiFi systems ensure strong signal throughout the home.',
    },
    {
      title: 'Climate Control',
      description: 'HVAC to maintain comfortable temperature year-round.',
      details:
        'Proper ventilation and temperature control are essential for 8+ hour workdays. Inspect HVAC systems during home tours. Older systems may need replacement. Programmable thermostats save energy and ensure comfort during work hours.',
    },
    {
      title: 'Ergonomic Layout',
      description: 'Proper desk height, chair support, and monitor positioning.',
      details:
        'Set up your desk to prevent strain injuries. Monitor at eye level, elbows at 90 degrees, feet flat on floor. Quality office chair and desk are investments that prevent back pain and repetitive strain. Space for a filing cabinet and shelving for organization.',
    },
  ];

  const bestLocations = [
    {
      location: 'Austin, Texas',
      colCost: 'Moderate ($400k-600k median)',
      internet: 'Excellent (AT&T Fiber, Google Fiber available)',
      lifestyle:
        'Vibrant culture, outdoor activities, thriving tech scene, coffee culture',
      details:
        'Austin offers a great balance of affordability, tech infrastructure, and lifestyle. Growing remote worker community with plenty of coffee shops and coworking spaces. Cost of living rising but still competitive for Texas. Strong internet infrastructure with fiber available in many neighborhoods.',
    },
    {
      location: 'Denver, Colorado',
      colCost: 'Moderate to High ($450k-700k median)',
      internet: 'Good (Multiple fiber and cable providers)',
      lifestyle: 'Outdoor recreation, skiing, health-conscious community, mountain views',
      details:
        'Excellent for outdoor enthusiasts. Strong tech job market attracts remote workers and startups. Good weather year-round for outdoor activities. Multiple ISPs provide competition and good speeds. High elevation may affect some (headaches possible initially).',
    },
    {
      location: 'Portland, Oregon',
      colCost: 'Moderate ($400k-550k median)',
      internet: 'Excellent (CenturyLink, Ziply Fiber available)',
      lifestyle: 'Creative community, bookstores, food scene, mild climate',
      details:
        'Popular with remote workers and creative professionals. Excellent fiber availability in many neighborhoods. Mild, rainy winters and dry summers. Walkable neighborhoods with coffee culture. Lower cost of living than West Coast metros.',
    },
    {
      location: 'Chapel Hill, North Carolina',
      colCost: 'Moderate ($300k-450k median)',
      internet: 'Good (Duke Fiber, residential fiber expanding)',
      lifestyle: 'College town culture, research hub, outdoor trails, affordability',
      details:
        'Affordable with strong university community vibe. Growing fiber network. Excellent schools if you have kids. Four seasons with mild winters. Strong research and tech companies in Research Triangle. Very walkable town center.',
    },
    {
      location: 'Bend, Oregon',
      colCost: 'Moderate ($380k-520k median)',
      internet: 'Good (improving; check specific address)',
      lifestyle: 'Mountain town, skiing, outdoor adventure, lower population',
      details:
        'Outdoor recreation paradise with skiing, hiking, biking. Lower population density means less congestion. Internet quality varies by neighborhood - research carefully. Cost of living rising as remote workers move in. Great for work-life balance.',
    },
    {
      location: 'Raleigh, North Carolina',
      colCost: 'Moderate ($350k-500k median)',
      internet: 'Excellent (Wake County Fiber, Altafiber)',
      lifestyle: 'Tech hub, growing city, good schools, Research Triangle proximity',
      details:
        'Part of Research Triangle with strong tech ecosystem. Excellent fiber availability expanding. Growing remote worker population. Affordable compared to major metros. Good weather and lower cost of living than Northeast or West Coast.',
    },
  ];

  const officeDesignTips = [
    {
      design: 'Dedicated Room (Optimal)',
      description: 'A separate room used exclusively or primarily for work.',
      pros:
        'Complete separation from home life, professional video call background, ability to close the door, natural sound barrier, ability to leave work at end of day',
      cons: 'Requires space and money, may feel isolated if too removed from home',
      details:
        'This is the gold standard for remote workers. A spare bedroom, home office, or converted garage works perfectly. Install a solid core door for sound isolation. Ensure natural light and proper ventilation.',
    },
    {
      design: 'Enclosed Home Office Area',
      description: 'A dedicated workspace with partial enclosure (dividers, shelving).',
      pros: 'Separation from family without needing full room, visual boundary, defined work zone',
      cons: 'Less sound isolation, may feel cramped, less professional for video calls',
      details:
        'Use bookshelves, room dividers, or curtains to create visual separation. Good compromise if spare room unavailable. Position desk to face a wall for focus and privacy.',
    },
    {
      design: 'Living Room Desk (Not Ideal)',
      description: 'Desk in a shared living space like living room or kitchen.',
      pros: 'Immediate integration with family, easy access to amenities, uses existing space',
      cons: 'Constant distractions, family interruptions, no separation between work and home',
      details:
        'This works temporarily but not long-term. If necessary, use screens or dividers to create some visual separation. Position desk to face away from TV and family areas. Consider acoustic panels behind desk for better video call audio.',
    },
    {
      design: 'Dual-Purpose Bedroom Office',
      description: 'A bedroom where desk fits alongside bed for occasional use.',
      pros: 'Flexible space usage, only works if bedroom is large enough',
      cons: 'Mixed signals to brain (work vs sleep), sleep disruption if working late',
      details:
        'Only viable if bedroom is 12x14 or larger. Position desk and bed to create visual separation. Use room dividers to enhance boundary. Ensure adequate lighting so bed area doesn\u2019t feel like office.',
    },
    {
      design: 'Sunroom or Bonus Room Office',
      description: 'Conversion of sunroom, finished basement section, or bonus room.',
      pros: 'Natural light (if sunroom), separate from main living, dedicated space',
      cons: 'May need climate control, internet access may require running cables',
      details:
        'Excellent option if available. Sunrooms provide natural light but may need thermal control. Basement offices may have humidity or dampness issues - inspect carefully. Ensure natural light and ventilation.',
    },
    {
      design: 'Garage Conversion Office',
      description: 'Converted garage space with insulation, HVAC, and wiring.',
      pros: 'Abundant space, complete separation, no family interference, scalable',
      cons: 'Significant renovation costs, structural changes needed, may reduce parking',
      details:
        'Requires professional conversion with proper insulation, climate control, and electrical work. Can be expensive ($5,000-15,000+) but creates premium office. Ensure proper egress and ventilation if used as primary workspace.',
    },
  ];

  const internetOptions = [
    {
      type: 'Fiber Optic',
      speeds: '1 Gbps (1000 Mbps) and up',
      reliability: 'Excellent (99.9%+ uptime)',
      cost: '$50-100/month',
      details:
        'The gold standard for remote work. Future-proof technology that\u2019s not bandwidth-limited. Check fiber availability at specific address - Google Maps and provider websites have maps. Best for video calls, file transfers, and multiple simultaneous connections.',
    },
    {
      type: 'Cable Internet',
      speeds: '300-500 Mbps typical',
      reliability: 'Good (speeds vary by time of day)',
      cost: '$40-80/month',
      details:
        'Widely available and reliable for most remote work. Sufficient for HD video calls and file uploads. Speed may degrade during peak hours. Shared bandwidth with neighborhood means potential slowdowns.',
    },
    {
      type: 'DSL',
      speeds: '10-100 Mbps typical',
      reliability: 'Fair (can be slower in peak hours)',
      cost: '$20-60/month',
      details:
        'Older technology, increasingly being phased out. May be too slow for HD video calls or large file transfers. Only acceptable as backup. DSL quality depends heavily on distance from telephone exchange.',
    },
    {
      type: 'Satellite Internet',
      speeds: '25-100 Mbps',
      reliability: 'Fair (weather-dependent, higher latency)',
      cost: '$100-150/month',
      details:
        'Use as backup or in rural areas where other options unavailable. High latency (500-700ms) makes video calls difficult. Weather impacts reliability. Technology improving with Starlink and Amazon Kuiper.',
    },
    {
      type: '5G Home Internet',
      speeds: '100-300 Mbps typical',
      reliability: 'Good (new technology, improving)',
      cost: '$50-70/month',
      description: 'Emerging option from mobile carriers with no fixed line needed. Less reliable than fiber/cable currently. Speeds depend on tower proximity and congestion. Good backup option.',
      details:
        'T-Mobile, Verizon, and others offer 5G home internet. No installation needed. Good as backup internet or in areas without fiber/cable. Technology still maturing - test before committing.',
    },
    {
      type: 'Backup Mobile Hotspot',
      speeds: '10-100 Mbps (depends on carrier/signal)',
      reliability: 'Fair (can drain battery)',
      cost: '$10-50/month',
      details:
        'Essential safety net for remote workers. Keep a mobile hotspot plan from different carrier than primary internet. Can tether phone if needed. Battery drain limits continuous use but works for outages.',
    },
  ];

  const taxConsiderations = [
    {
      topic: 'Home Office Deduction',
      rules:
        'Deduct portion of mortgage/rent, utilities, and maintenance proportional to office space.',
      details:
        'Calculate as percentage of home used for work. Two methods: simplified rate ($5/sq ft, max 300 sq ft = $1,500/year) or actual expense method (calculate percentage and deduct proportional costs). Keep records of office square footage and home total. Deduction applies to federal taxes and some state taxes.',
      impact: 'Can save $1,000-5,000+ annually depending on method and home expenses.',
    },
    {
      topic: 'Mortgage Interest Deduction',
      rules:
        'Still deductible on federal return if you itemize, though offset varies by tax bracket.',
      details:
        'Home office deduction doesn\u2019t affect mortgage interest deduction. Total mortgage interest deduction limited to $750,000 of mortgage debt. SALT deduction (state and local taxes) capped at $10,000 federal. Check state-specific rules.',
      impact: 'Consult tax professional regarding your total deduction strategy.',
    },
    {
      topic: 'State Income Tax on Remote Work',
      rules:
        'State where work is performed may impose income tax, even if employer is elsewhere.',
      details:
        'If you work from your home in a high-tax state, that state may tax your income. Some states have reciprocal agreements. If you work remotely for an out-of-state employer, clarify tax residency. Moving between states mid-year creates complex tax situations.',
      impact:
        'State income taxes vary from 0% (TX, FL, WA) to 13%+ (CA). This is huge financial consideration when choosing location.',
    },
    {
      topic: 'Remote Work Residency',
      rules: 'Your primary residence location affects both state and local tax obligations.',
      details:
        'Establish domicile by obtaining driver\u2019s license, registering to vote, and establishing residency. Some states have aggressive audits for people claiming non-residency. Document your physical presence in your tax-claimed state.',
      impact:
        'Moving to a low-tax state can save thousands annually, but must establish true residency to be defensible.',
    },
    {
      topic: 'Business Supplies & Equipment',
      rules: 'Office furniture, computers, and equipment may be deductible.',
      details:
        'Items under $2,500 can typically be expensed immediately. Larger items may be depreciated. Software subscriptions (Zoom, Slack, etc.) are deductible. Internet bill partially deductible as office utility.',
      impact: 'Can deduct hundreds to thousands annually for work supplies and equipment.',
    },
    {
      topic: 'Property Tax Implications',
      rules:
        'Having home office doesn\u2019t typically increase property taxes, but varies by jurisdiction.',
      details:
        'Most property taxes based on home value, not use. However, office conversion of garage might affect assessment. Check with local assessor\u2019s office. Some jurisdictions offer homestead exemptions.',
      impact: 'Generally minimal impact, but verify with your local tax assessor.',
    },
  ];

  const neighborhoodFeatures = [
    {
      feature: 'Quiet Streets',
      importance: 'Critical for focus and video call quality',
      details:
        'Look for homes on residential streets with low traffic volume. Avoid main roads and highways. Visit during morning rush hour to test noise levels. Street trees help absorb traffic noise. Cul-de-sacs and dead-end streets are generally quieter.',
    },
    {
      feature: 'Coffee Shops & Cafes',
      importance: 'Great for occasional change of scenery and social interaction',
      details:
        'Having quality coffee shops within walking distance or short drive is valuable. Allows you to work from different environment occasionally. Good for combating isolation. Look for shops with WiFi and seating.',
    },
    {
      feature: 'Coworking Spaces Nearby',
      importance: 'Useful for collaboration and separating work from home',
      details:
        'Professional coworking spaces provide meeting rooms for client calls. Useful for days when home distractions are high. Check availability and monthly rates ($100-300+). Good for building community with other remote workers.',
    },
    {
      feature: 'Parks & Green Spaces',
      importance: 'Essential for mental health and work breaks',
      details:
        'Walking distance to parks enables lunch breaks outdoors. Improves mental health and energy levels. Trees reduce noise and improve air quality. Recreational amenities like playgrounds (if kids) add value.',
    },
    {
      feature: 'Walkability',
      importance: 'Reduces reliance on car, enables active breaks',
      details:
        'Walkable neighborhoods allow you to take breaks on foot. Proximity to grocery stores, pharmacies, and restaurants adds convenience. Reduces isolation of working from home. Check Walk Score for your potential address.',
    },
    {
      feature: 'Reliable Cell Signal',
      importance: 'Critical for backup internet and mobile calls',
      details:
        'Test cell signal from multiple carriers before committing. Make calls from different rooms to ensure good signal. 4G/5G signal strength varies by location. Important for mobile hotspot backup internet.',
    },
  ];

  const zoningConcerns = [
    {
      issue: 'Home-Based Business Restrictions',
      restriction: 'Some jurisdictions prohibit running business from residential home office.',
      solution:
        'Check local zoning code and ask realtor about restrictions. Working remotely as employee is usually allowed; operating business may not be.',
      impact:
        'Could limit side hustles, consulting, or freelancing. Verify before buying if you plan home-based business.',
    },
    {
      issue: 'HOA Approval for Exterior Changes',
      restriction: 'HOA may restrict satellite dishes, antennas, or additions for internet infrastructure.',
      solution:
        'Request HOA architectural review policies in writing. Ask about existing approvals for fiber/internet installations. Some states have laws protecting satellite dish rights.',
      impact:
        'Could prevent you from installing needed internet infrastructure. Check HOA covenant restrictions.',
    },
    {
      issue: 'Noise Complaints',
      restriction: 'Neighbor complaints about noise from work activities.',
      solution:
        'Generally not issue for remote office work. However, if you do client meetings with loud office, could be concern. Use soundproofing as needed.',
      impact:
        'Unlikely to be issue but document your quiet work environment if buying in strict HOA community.',
    },
    {
      issue: 'Garage Conversion Zoning',
      restriction: 'Some zoning requires minimum off-street parking; garage conversion may violate.',
      solution:
        'Check parking requirements and variances needed. Some jurisdictions allow garage conversions; others prohibit.',
      impact:
        'Could prevent garage-to-office conversion. Verify zoning before planning significant renovation.',
    },
    {
      issue: 'Conditional Use Permits',
      restriction: 'May need CUP approval to legally operate certain types of home-based work.',
      solution:
        'Contact local planning department with description of work. They\u2019ll advise on permits needed. Often easier for consulting vs. retail.',
      impact:
        'Minor paperwork for legitimate home-based business. Don\u2019t operate without required permits.',
    },
    {
      issue: 'Rental Property Restrictions',
      restriction: 'If you plan to rent out rooms, check zoning and HOA restrictions.',
      solution:
        'Some areas restrict short-term rentals or roommate arrangements. Ask about before buying.',
      impact:
        'Could limit your ability to generate income from spare rooms or offset mortgage.',
    },
  ];

  const toolQuestions = [
    {
      question: 'Do you need a dedicated office space (separate room)?',
      answers: [
        { text: 'Absolutely - critical for my work', value: 10 },
        { text: 'Yes, would be ideal', value: 8 },
        { text: 'Nice to have but not necessary', value: 5 },
        { text: 'Not important - I work from couch', value: 0 },
      ],
    },
    {
      question: 'How many hours per day do you work from home typically?',
      answers: [
        { text: '8+ hours (full-time)', value: 10 },
        { text: '4-8 hours (hybrid)', value: 6 },
        { text: '1-4 hours (light remote work)', value: 3 },
        { text: 'Rarely - mostly at office', value: 0 },
      ],
    },
    {
      question: 'How important are video conference quality and professional appearance?',
      answers: [
        { text: 'Very important - I do daily video calls', value: 10 },
        { text: 'Important - I do regular calls', value: 7 },
        { text: 'Somewhat important - occasional calls', value: 4 },
        { text: 'Not important - mostly email/Slack', value: 0 },
      ],
    },
    {
      question: 'Internet reliability and speed requirements?',
      answers: [
        { text: 'Mission critical - downtime unacceptable', value: 10 },
        { text: 'Very important - disruption is costly', value: 8 },
        { text: 'Important but manageable downtime', value: 5 },
        { text: 'Not critical - occasional outages okay', value: 2 },
      ],
    },
    {
      question: 'Do you need acoustic control and quiet environment?',
      answers: [
        { text: 'Essential - silence is critical', value: 10 },
        { text: 'Very important - noise is distracting', value: 8 },
        { text: 'Somewhat important - some noise okay', value: 4 },
        { text: 'Not important - noise doesn\u2019t bother me', value: 0 },
      ],
    },
  ];

  const faqs = [
    {
      q: 'What\u2019s the minimum internet speed for remote work?',
      a: 'For video calls and file transfers, aim for at least 25 Mbps download and 3 Mbps upload. For multiple simultaneous users or larger file uploads, 50-100 Mbps is better. Before buying, test internet speeds at the specific address using Speedtest.net.',
    },
    {
      q: 'Should I buy a home with fiber internet already available?',
      a: 'Absolutely. Fiber is future-proof and offers the best speeds and reliability for remote work. If fiber isn\u2019t available now, check if it\u2019s planned for the area. Ask the seller, check with the fiber company, and research plans on publicly available maps.',
    },
    {
      q: 'How much space do I need for a home office?',
      a: 'Minimum 8x10 feet (80 sq ft) works for a desk, chair, and basic setup. Ideal is 10x12 or larger (120+ sq ft) to accommodate desk, shelving, guest chair, and room for movement. If less space, ensure good vertical storage and minimal clutter.',
    },
    {
      q: 'Can I deduct my home office on taxes if I rent?',
      a: 'Yes, but only if you have a separate, dedicated space. Renters can deduct the percentage of rent, utilities, and renters insurance proportional to office space. Keep documentation. Consult a tax professional for specific calculations.',
    },
    {
      q: 'What\u2019s the best lighting for a home office?',
      a: 'Natural light is ideal - position desk perpendicular to windows to avoid glare. Supplement with indirect LED lighting (4000K-5000K color temperature) positioned to the sides of your monitor. Avoid overhead lights that create glare on screens.',
    },
    {
      q: 'Should I buy in a low-tax state for remote work?',
      a: 'Tax implications are significant. Moving to a state with no income tax (TX, FL, WA) can save $5,000-20,000+ annually. However, must establish true domicile - can\u2019t claim residency in two states. Consult a tax professional before moving based on taxes.',
    },
    {
      q: 'What if my area doesn\u2019t have good fiber internet?',
      a: 'Research alternative providers: cable internet (300+ Mbps), 5G home internet, fixed wireless, or satellite. Plan for backup mobile hotspot from different carrier. If internet situation is uncertain, negotiate inspection contingency specifically for internet testing.',
    },
    {
      q: 'How do I avoid distractions when working from home?',
      a: 'Create physical separation with a dedicated room and closed door. Establish boundaries with family about work hours. Use noise-canceling headphones. Position desk to face wall, not family areas. Take breaks away from office to restore focus.',
    },
    {
      q: 'What should I ask my realtor about a home for remote work?',
      a: 'Ask about internet providers and speeds available, work-from-home background neighborhoods, HOA restrictions on exterior changes, zoning for home-based businesses, natural light in potential office space, and soundproofing characteristics.',
    },
    {
      q: 'Can I claim a home office deduction if I only work partially from home?',
      a: 'Yes, if you have a dedicated space used exclusively for work. Calculate deduction based on percentage of home used for office. Two methods: simplified ($5/sq ft) or actual expense. Even hybrid workers can deduct if space is dedicated.',
    },
    {
      q: 'How important is proximity to coffee shops and coworking spaces?',
      a: 'Valuable for mental health and combating isolation. Having options within 10-15 minutes is ideal. Some remote workers use coworking 1-2 days weekly for collaboration and to get out of house. Not critical but strongly recommended.',
    },
    {
      q: 'What\u2019s the difference between dedicated office and spare bedroom?',
      a: 'Dedicated office is used exclusively for work; spare bedroom serves multiple purposes. For tax deduction purposes, both work if you have separate, dedicated space. Spare bedroom converted to office loses use as guest room. Consider your needs.',
    },
  ];

  // SVG Icons
  const HomeIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );

  const WifiIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 12.55a11 11 0 0 1 14.08 0M1.42 9a16 16 0 0 1 21.16 0M8.53 16.11a6 6 0 0 1 6.94 0" />
      <line x1="12" y1="20" x2="12.01" y2="20" />
    </svg>
  );

  const DollarIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );

  const MapIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
      <line x1="9" y1="3" x2="9" y2="18" />
      <line x1="15" y1="6" x2="15" y2="21" />
    </svg>
  );

  const CheckIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );

  return (
    <div style={{ backgroundColor: 'var(--le-bg)', color: 'var(--le-text)', minHeight: '100vh' }}>
      {/* JSON-LD Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Remote Work Home Buying Guide',
            description:
              'Complete guide for remote workers buying homes. Home office essentials, best locations, internet infrastructure, tax tips, and expert guidance.',
            url: 'https://realtyclientengine.app/remote-work-homes',
            publisher: {
              '@type': 'Organization',
              name: 'LeadEngine',
              logo: {
                '@type': 'ImageObject',
                url: 'https://realtyclientengine.app/logo.png',
                width: 250,
                height: 60,
              },
            },
          }),
        }}
      />

      {/* HERO SECTION */}
      <div
        ref={heroRef}
        style={{
          backgroundColor: 'var(--le-primary)',
          color: 'white',
          padding: '60px 20px',
          textAlign: 'center',
          backgroundImage: 'linear-gradient(135deg, var(--le-primary) 0%, var(--le-primary-hover) 100%)',
        }}
      >
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h1
            style={{
              fontSize: 'clamp(28px, 5vw, 52px)',
              marginBottom: '20px',
              fontWeight: '700',
              lineHeight: '1.2',
            }}
          >
            Find Your Perfect Remote Work Home
          </h1>
          <p
            style={{
              fontSize: 'clamp(16px, 3vw, 20px)',
              marginBottom: '30px',
              opacity: 0.95,
              lineHeight: '1.5',
            }}
          >
            Complete guide to buying a home optimized for remote work. From home office essentials
            to internet infrastructure, we\u2019ll help you find a space where you can thrive.
          </p>
          <button
            onClick={() => {
              document.getElementById('lead-capture')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            style={{
              backgroundColor: 'var(--le-accent)',
              color: 'var(--le-text)',
              border: 'none',
              padding: '16px 32px',
              fontSize: '16px',
              fontWeight: '600',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
            }}
          >
            Find Your Home →
          </button>
        </div>
      </div>

      {/* HOME OFFICE ESSENTIALS */}
      <section
        style={{
          padding: '60px 20px',
          maxWidth: '1200px',
          margin: '0 auto',
          backgroundColor: 'var(--le-bg)',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h2
            style={{
              fontSize: 'clamp(28px, 4vw, 40px)',
              fontWeight: '700',
              marginBottom: '15px',
              color: 'var(--le-text)',
            }}
          >
            Home Office Essentials
          </h2>
          <p style={{ fontSize: '18px', color: 'var(--le-text-secondary)', lineHeight: '1.6' }}>
            What makes a home perfect for remote work
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '30px',
          }}
        >
          {essentials.map((essential, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: 'var(--le-surface)',
                padding: '30px',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                border: '1px solid var(--le-border)',
              }}
            >
              <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '10px', color: 'var(--le-primary)' }}>
                {essential.title}
              </h3>
              <p style={{ fontSize: '15px', color: 'var(--le-text)', marginBottom: '15px', lineHeight: '1.6' }}>
                {essential.description}
              </p>
              <p style={{ fontSize: '14px', color: 'var(--le-text-secondary)', lineHeight: '1.6' }}>
                {essential.details}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* BEST LOCATIONS */}
      <section
        style={{
          padding: '60px 20px',
          maxWidth: '1200px',
          margin: '0 auto',
          backgroundColor: 'var(--le-bg)',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h2
            style={{
              fontSize: 'clamp(28px, 4vw, 40px)',
              fontWeight: '700',
              marginBottom: '15px',
              color: 'var(--le-text)',
            }}
          >
            Best Locations for Remote Workers
          </h2>
          <p style={{ fontSize: '18px', color: 'var(--le-text-secondary)', lineHeight: '1.6' }}>
            Top markets with cost of living, internet, and lifestyle
          </p>
        </div>

        <div style={{ display: 'grid', gap: '20px' }}>
          {bestLocations.map((location, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: 'var(--le-surface)',
                borderRadius: '12px',
                border: '1px solid var(--le-border)',
                overflow: 'hidden',
              }}
            >
              <button
                onClick={() => toggleLocation(idx)}
                style={{
                  width: '100%',
                  padding: '25px',
                  backgroundColor: expandedLocations.has(idx) ? 'var(--le-primary-light)' : 'var(--le-surface)',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  if (!expandedLocations.has(idx)) {
                    e.currentTarget.style.backgroundColor = 'var(--le-bg-hover)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!expandedLocations.has(idx)) {
                    e.currentTarget.style.backgroundColor = 'var(--le-surface)';
                  }
                }}
              >
                <div>
                  <h3 style={{ fontSize: '20px', fontWeight: '600', color: 'var(--le-text)', margin: 0 }}>
                    {location.location}
                  </h3>
                  <p style={{ fontSize: '14px', color: 'var(--le-text-secondary)', margin: '8px 0 0 0' }}>
                    {location.colCost} • {location.internet}
                  </p>
                </div>
                <div
                  style={{
                    fontSize: '20px',
                    color: 'var(--le-primary)',
                    transition: 'transform 0.3s ease',
                    transform: expandedLocations.has(idx) ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}
                >
                  ▼
                </div>
              </button>
              {expandedLocations.has(idx) && (
                <div style={{ padding: '0 25px 25px 25px', backgroundColor: 'var(--le-bg)' }}>
                  <div style={{ borderTop: '1px solid var(--le-border)', paddingTop: '20px' }}>
                    <div style={{ marginBottom: '15px' }}>
                      <h4 style={{ fontSize: '14px', fontWeight: '600', color: 'var(--le-text-secondary)' }}>
                        LIFESTYLE
                      </h4>
                      <p style={{ fontSize: '15px', color: 'var(--le-text)', lineHeight: '1.6', margin: '8px 0 0 0' }}>
                        {location.lifestyle}
                      </p>
                    </div>
                    <p style={{ fontSize: '15px', color: 'var(--le-text)', lineHeight: '1.6' }}>
                      {location.details}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* HOME OFFICE DESIGN TIPS */}
      <section
        style={{
          padding: '60px 20px',
          maxWidth: '1200px',
          margin: '0 auto',
          backgroundColor: 'var(--le-bg)',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h2
            style={{
              fontSize: 'clamp(28px, 4vw, 40px)',
              fontWeight: '700',
              marginBottom: '15px',
              color: 'var(--le-text)',
            }}
          >
            Home Office Design Tips
          </h2>
          <p style={{ fontSize: '18px', color: 'var(--le-text-secondary)', lineHeight: '1.6' }}>
            From dedicated rooms to dual-purpose spaces, find what works for you
          </p>
        </div>

        <div style={{ display: 'grid', gap: '20px' }}>
          {officeDesignTips.map((design, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: 'var(--le-surface)',
                borderRadius: '12px',
                border: '1px solid var(--le-border)',
                overflow: 'hidden',
              }}
            >
              <button
                onClick={() => toggleOfficeDesign(idx)}
                style={{
                  width: '100%',
                  padding: '25px',
                  backgroundColor: expandedOfficeDesigns.has(idx) ? 'var(--le-primary-light)' : 'var(--le-surface)',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  if (!expandedOfficeDesigns.has(idx)) {
                    e.currentTarget.style.backgroundColor = 'var(--le-bg-hover)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!expandedOfficeDesigns.has(idx)) {
                    e.currentTarget.style.backgroundColor = 'var(--le-surface)';
                  }
                }}
              >
                <div>
                  <h3 style={{ fontSize: '20px', fontWeight: '600', color: 'var(--le-text)', margin: 0 }}>
                    {design.design}
                  </h3>
                  <p style={{ fontSize: '14px', color: 'var(--le-text-secondary)', margin: '8px 0 0 0' }}>
                    {design.description}
                  </p>
                </div>
                <div
                  style={{
                    fontSize: '20px',
                    color: 'var(--le-primary)',
                    transition: 'transform 0.3s ease',
                    transform: expandedOfficeDesigns.has(idx) ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}
                >
                  ▼
                </div>
              </button>
              {expandedOfficeDesigns.has(idx) && (
                <div style={{ padding: '0 25px 25px 25px', backgroundColor: 'var(--le-bg)' }}>
                  <div style={{ borderTop: '1px solid var(--le-border)', paddingTop: '20px' }}>
                    <div style={{ marginBottom: '15px' }}>
                      <h4 style={{ fontSize: '14px', fontWeight: '600', color: 'var(--le-accent)', marginBottom: '8px' }}>
                        PROS
                      </h4>
                      <p style={{ fontSize: '15px', color: 'var(--le-text)', lineHeight: '1.6', margin: 0 }}>
                        {design.pros}
                      </p>
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                      <h4 style={{ fontSize: '14px', fontWeight: '600', color: 'var(--le-accent)', marginBottom: '8px' }}>
                        CONS
                      </h4>
                      <p style={{ fontSize: '15px', color: 'var(--le-text)', lineHeight: '1.6', margin: 0 }}>
                        {design.cons}
                      </p>
                    </div>
                    <div>
                      <h4 style={{ fontSize: '14px', fontWeight: '600', color: 'var(--le-accent)', marginBottom: '8px' }}>
                        DETAILS
                      </h4>
                      <p style={{ fontSize: '15px', color: 'var(--le-text)', lineHeight: '1.6', margin: 0 }}>
                        {design.details}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* INTERNET & TECHNOLOGY */}
      <section
        style={{
          padding: '60px 20px',
          maxWidth: '1200px',
          margin: '0 auto',
          backgroundColor: 'var(--le-bg)',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h2
            style={{
              fontSize: 'clamp(28px, 4vw, 40px)',
              fontWeight: '700',
              marginBottom: '15px',
              color: 'var(--le-text)',
            }}
          >
            Internet & Technology
          </h2>
          <p style={{ fontSize: '18px', color: 'var(--le-text-secondary)', lineHeight: '1.6' }}>
            Fiber, cable, backup options, and what you really need
          </p>
        </div>

        <div style={{ display: 'grid', gap: '20px' }}>
          {internetOptions.map((option, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: 'var(--le-surface)',
                borderRadius: '12px',
                border: '1px solid var(--le-border)',
                overflow: 'hidden',
              }}
            >
              <button
                onClick={() => toggleInternet(idx)}
                style={{
                  width: '100%',
                  padding: '25px',
                  backgroundColor: expandedInternet.has(idx) ? 'var(--le-primary-light)' : 'var(--le-surface)',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  if (!expandedInternet.has(idx)) {
                    e.currentTarget.style.backgroundColor = 'var(--le-bg-hover)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!expandedInternet.has(idx)) {
                    e.currentTarget.style.backgroundColor = 'var(--le-surface)';
                  }
                }}
              >
                <div>
                  <h3 style={{ fontSize: '20px', fontWeight: '600', color: 'var(--le-text)', margin: 0 }}>
                    {option.type}
                  </h3>
                  <p style={{ fontSize: '14px', color: 'var(--le-text-secondary)', margin: '8px 0 0 0' }}>
                    {option.speeds} • {option.reliability}
                  </p>
                </div>
                <div
                  style={{
                    fontSize: '20px',
                    color: 'var(--le-primary)',
                    transition: 'transform 0.3s ease',
                    transform: expandedInternet.has(idx) ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}
                >
                  ▼
                </div>
              </button>
              {expandedInternet.has(idx) && (
                <div style={{ padding: '0 25px 25px 25px', backgroundColor: 'var(--le-bg)' }}>
                  <div style={{ borderTop: '1px solid var(--le-border)', paddingTop: '20px' }}>
                    <div style={{ marginBottom: '10px' }}>
                      <h4 style={{ fontSize: '14px', fontWeight: '600', color: 'var(--le-accent)', marginBottom: '8px' }}>
                        COST
                      </h4>
                      <p style={{ fontSize: '15px', color: 'var(--le-text)', margin: 0 }}>{option.cost}</p>
                    </div>
                    <p style={{ fontSize: '15px', color: 'var(--le-text)', lineHeight: '1.6', marginTop: '15px' }}>
                      {option.details}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* TAX CONSIDERATIONS */}
      <section
        style={{
          padding: '60px 20px',
          maxWidth: '1200px',
          margin: '0 auto',
          backgroundColor: 'var(--le-bg)',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h2
            style={{
              fontSize: 'clamp(28px, 4vw, 40px)',
              fontWeight: '700',
              marginBottom: '15px',
              color: 'var(--le-text)',
            }}
          >
            Tax Considerations
          </h2>
          <p style={{ fontSize: '18px', color: 'var(--le-text-secondary)', lineHeight: '1.6' }}>
            Home office deductions, state taxes, and financial implications
          </p>
        </div>

        <div style={{ display: 'grid', gap: '20px' }}>
          {taxConsiderations.map((tax, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: 'var(--le-surface)',
                borderRadius: '12px',
                border: '1px solid var(--le-border)',
                overflow: 'hidden',
              }}
            >
              <button
                onClick={() => toggleTax(idx)}
                style={{
                  width: '100%',
                  padding: '25px',
                  backgroundColor: expandedTaxes.has(idx) ? 'var(--le-primary-light)' : 'var(--le-surface)',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  if (!expandedTaxes.has(idx)) {
                    e.currentTarget.style.backgroundColor = 'var(--le-bg-hover)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!expandedTaxes.has(idx)) {
                    e.currentTarget.style.backgroundColor = 'var(--le-surface)';
                  }
                }}
              >
                <div>
                  <h3 style={{ fontSize: '20px', fontWeight: '600', color: 'var(--le-text)', margin: 0 }}>
                    {tax.topic}
                  </h3>
                  <p style={{ fontSize: '14px', color: 'var(--le-text-secondary)', margin: '8px 0 0 0' }}>
                    {tax.rules}
                  </p>
                </div>
                <div
                  style={{
                    fontSize: '20px',
                    color: 'var(--le-primary)',
                    transition: 'transform 0.3s ease',
                    transform: expandedTaxes.has(idx) ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}
                >
                  ▼
                </div>
              </button>
              {expandedTaxes.has(idx) && (
                <div style={{ padding: '0 25px 25px 25px', backgroundColor: 'var(--le-bg)' }}>
                  <div style={{ borderTop: '1px solid var(--le-border)', paddingTop: '20px' }}>
                    <div style={{ marginBottom: '15px' }}>
                      <h4 style={{ fontSize: '14px', fontWeight: '600', color: 'var(--le-accent)', marginBottom: '8px' }}>
                        DETAILS
                      </h4>
                      <p style={{ fontSize: '15px', color: 'var(--le-text)', lineHeight: '1.6', margin: 0 }}>
                        {tax.details}
                      </p>
                    </div>
                    <div>
                      <h4 style={{ fontSize: '14px', fontWeight: '600', color: 'var(--le-accent)', marginBottom: '8px' }}>
                        IMPACT
                      </h4>
                      <p style={{ fontSize: '15px', color: 'var(--le-text)', lineHeight: '1.6', margin: 0 }}>
                        {tax.impact}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* NEIGHBORHOOD FEATURES */}
      <section
        style={{
          padding: '60px 20px',
          maxWidth: '1200px',
          margin: '0 auto',
          backgroundColor: 'var(--le-bg)',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h2
            style={{
              fontSize: 'clamp(28px, 4vw, 40px)',
              fontWeight: '700',
              marginBottom: '15px',
              color: 'var(--le-text)',
            }}
          >
            Neighborhood Features
          </h2>
          <p style={{ fontSize: '18px', color: 'var(--le-text-secondary)', lineHeight: '1.6' }}>
            Quiet streets, coffee shops, coworking, parks, and walkability
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '30px',
          }}
        >
          {neighborhoodFeatures.map((neighborhood, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: 'var(--le-surface)',
                padding: '30px',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                border: '1px solid var(--le-border)',
              }}
            >
              <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '10px', color: 'var(--le-primary)' }}>
                {neighborhood.feature}
              </h3>
              <p style={{ fontSize: '14px', fontStyle: 'italic', color: 'var(--le-text-secondary)', marginBottom: '15px' }}>
                {neighborhood.importance}
              </p>
              <p style={{ fontSize: '15px', color: 'var(--le-text)', lineHeight: '1.6' }}>
                {neighborhood.details}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ZONING & HOA */}
      <section
        style={{
          padding: '60px 20px',
          maxWidth: '1200px',
          margin: '0 auto',
          backgroundColor: 'var(--le-bg)',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h2
            style={{
              fontSize: 'clamp(28px, 4vw, 40px)',
              fontWeight: '700',
              marginBottom: '15px',
              color: 'var(--le-text)',
            }}
          >
            Zoning & HOA Considerations
          </h2>
          <p style={{ fontSize: '18px', color: 'var(--le-text-secondary)', lineHeight: '1.6' }}>
            Working from home restrictions and limitations
          </p>
        </div>

        <div style={{ display: 'grid', gap: '20px' }}>
          {zoningConcerns.map((concern, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: 'var(--le-surface)',
                borderRadius: '12px',
                border: '1px solid var(--le-border)',
                overflow: 'hidden',
              }}
            >
              <button
                onClick={() => toggleZoning(idx)}
                style={{
                  width: '100%',
                  padding: '25px',
                  backgroundColor: expandedZoning.has(idx) ? 'var(--le-primary-light)' : 'var(--le-surface)',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  if (!expandedZoning.has(idx)) {
                    e.currentTarget.style.backgroundColor = 'var(--le-bg-hover)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!expandedZoning.has(idx)) {
                    e.currentTarget.style.backgroundColor = 'var(--le-surface)';
                  }
                }}
              >
                <div>
                  <h3 style={{ fontSize: '20px', fontWeight: '600', color: 'var(--le-text)', margin: 0 }}>
                    {concern.issue}
                  </h3>
                  <p style={{ fontSize: '14px', color: 'var(--le-text-secondary)', margin: '8px 0 0 0' }}>
                    {concern.restriction}
                  </p>
                </div>
                <div
                  style={{
                    fontSize: '20px',
                    color: 'var(--le-primary)',
                    transition: 'transform 0.3s ease',
                    transform: expandedZoning.has(idx) ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}
                >
                  ▼
                </div>
              </button>
              {expandedZoning.has(idx) && (
                <div style={{ padding: '0 25px 25px 25px', backgroundColor: 'var(--le-bg)' }}>
                  <div style={{ borderTop: '1px solid var(--le-border)', paddingTop: '20px' }}>
                    <div style={{ marginBottom: '15px' }}>
                      <h4 style={{ fontSize: '14px', fontWeight: '600', color: 'var(--le-accent)', marginBottom: '8px' }}>
                        SOLUTION
                      </h4>
                      <p style={{ fontSize: '15px', color: 'var(--le-text)', lineHeight: '1.6', margin: 0 }}>
                        {concern.solution}
                      </p>
                    </div>
                    <div>
                      <h4 style={{ fontSize: '14px', fontWeight: '600', color: 'var(--le-accent)', marginBottom: '8px' }}>
                        IMPACT
                      </h4>
                      <p style={{ fontSize: '15px', color: 'var(--le-text)', lineHeight: '1.6', margin: 0 }}>
                        {concern.impact}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* INTERACTIVE HOME OFFICE SCORING TOOL */}
      <section
        style={{
          padding: '60px 20px',
          maxWidth: '1200px',
          margin: '0 auto',
          backgroundColor: 'var(--le-primary-light)',
          borderRadius: '16px',
          marginBottom: '60px',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2
            style={{
              fontSize: 'clamp(28px, 4vw, 40px)',
              fontWeight: '700',
              marginBottom: '15px',
              color: 'var(--le-text)',
            }}
          >
            Home Office Scoring Tool
          </h2>
          <p style={{ fontSize: '18px', color: 'var(--le-text-secondary)', lineHeight: '1.6' }}>
            Rate your space needs to determine importance of home office factors
          </p>
        </div>

        <div style={{ display: 'grid', gap: '30px', marginBottom: '40px' }}>
          {toolQuestions.map((q, idx) => (
            <div key={idx}>
              <h3 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--le-text)', marginBottom: '15px' }}>
                {idx + 1}. {q.question}
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                {q.answers.map((answer, ansIdx) => (
                  <label
                    key={ansIdx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '12px 16px',
                      backgroundColor: 'var(--le-surface)',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      border: '2px solid var(--le-border)',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--le-primary)';
                      e.currentTarget.style.backgroundColor = 'var(--le-bg-hover)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--le-border)';
                      e.currentTarget.style.backgroundColor = 'var(--le-surface)';
                    }}
                  >
                    <input
                      type="radio"
                      name={`office-need-${idx}`}
                      value={answer.value}
                      onChange={calculateOfficeScore}
                      style={{
                        marginRight: '12px',
                        width: '18px',
                        height: '18px',
                        cursor: 'pointer',
                        accentColor: 'var(--le-primary)',
                      }}
                    />
                    <span style={{ fontSize: '15px', color: 'var(--le-text)' }}>{answer.text}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            backgroundColor: 'var(--le-surface)',
            padding: '30px',
            borderRadius: '12px',
            textAlign: 'center',
            border: '2px solid var(--le-primary)',
          }}
        >
          <p style={{ fontSize: '14px', fontWeight: '600', color: 'var(--le-text-secondary)', margin: '0 0 10px 0' }}>
            YOUR SCORE
          </p>
          <div
            id="office-score-total"
            style={{
              fontSize: '48px',
              fontWeight: '700',
              color: 'var(--le-primary)',
              margin: '10px 0',
            }}
          >
            {officeNeedScore}
          </div>
          <p style={{ fontSize: '14px', color: 'var(--le-text-secondary)', margin: '10px 0 0 0' }}>
            {officeNeedScore === 0
              ? 'Answer the questions above'
              : officeNeedScore < 15
              ? 'Low priority - casual workspace acceptable'
              : officeNeedScore < 30
              ? 'Medium priority - dedicated space recommended'
              : 'High priority - dedicated, professional office essential'}
          </p>
        </div>
      </section>

      {/* FAQ ACCORDION */}
      <section
        style={{
          padding: '60px 20px',
          maxWidth: '1200px',
          margin: '0 auto',
          backgroundColor: 'var(--le-bg)',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h2
            style={{
              fontSize: 'clamp(28px, 4vw, 40px)',
              fontWeight: '700',
              marginBottom: '15px',
              color: 'var(--le-text)',
            }}
          >
            Frequently Asked Questions
          </h2>
          <p style={{ fontSize: '18px', color: 'var(--le-text-secondary)', lineHeight: '1.6' }}>
            Common questions about remote work homes
          </p>
        </div>

        <div style={{ display: 'grid', gap: '15px' }}>
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: 'var(--le-surface)',
                borderRadius: '12px',
                border: '1px solid var(--le-border)',
                overflow: 'hidden',
              }}
            >
              <button
                onClick={() => toggleFaq(idx)}
                style={{
                  width: '100%',
                  padding: '20px',
                  backgroundColor: expandedFaqs.has(idx) ? 'var(--le-primary-light)' : 'var(--le-surface)',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  if (!expandedFaqs.has(idx)) {
                    e.currentTarget.style.backgroundColor = 'var(--le-bg-hover)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!expandedFaqs.has(idx)) {
                    e.currentTarget.style.backgroundColor = 'var(--le-surface)';
                  }
                }}
              >
                <h3 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--le-text)', margin: 0 }}>
                  {faq.q}
                </h3>
                <div
                  style={{
                    fontSize: '18px',
                    color: 'var(--le-primary)',
                    marginLeft: '20px',
                    flexShrink: 0,
                    transition: 'transform 0.3s ease',
                    transform: expandedFaqs.has(idx) ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}
                >
                  ▼
                </div>
              </button>
              {expandedFaqs.has(idx) && (
                <div
                  style={{
                    padding: '0 20px 20px 20px',
                    backgroundColor: 'var(--le-bg)',
                    borderTop: '1px solid var(--le-border)',
                  }}
                >
                  <p style={{ fontSize: '15px', color: 'var(--le-text)', lineHeight: '1.7', margin: 0 }}>
                    {faq.a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* LEAD CAPTURE CTA */}
      <section
        id="lead-capture"
        style={{
          padding: '60px 20px',
          maxWidth: '900px',
          margin: '0 auto 60px auto',
          backgroundColor: 'var(--le-surface)',
          borderRadius: '16px',
          border: '2px solid var(--le-primary)',
          textAlign: 'center',
        }}
      >
        <h2
          style={{
            fontSize: 'clamp(24px, 4vw, 36px)',
            fontWeight: '700',
            marginBottom: '15px',
            color: 'var(--le-text)',
          }}
        >
          Ready to Find Your Remote Work Home?
        </h2>
        <p
          style={{
            fontSize: '16px',
            color: 'var(--le-text-secondary)',
            lineHeight: '1.6',
            marginBottom: '30px',
          }}
        >
          Let\u2019s find a home optimized for your remote work lifestyle. Our agents specialize in helping
          remote workers find their perfect space.
        </p>

        <form onSubmit={handleLeadSubmit} style={{ display: 'grid', gap: '15px' }}>
          <input
            type="text"
            placeholder="Your Name"
            value={leadName}
            onChange={(e) => setLeadName(e.target.value)}
            style={{
              padding: '12px 16px',
              fontSize: '15px',
              border: '1px solid var(--le-border)',
              borderRadius: '8px',
              backgroundColor: 'var(--le-bg)',
              color: 'var(--le-text)',
              transition: 'border-color 0.2s ease',
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = 'var(--le-primary)';
              e.currentTarget.style.outline = 'none';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = 'var(--le-border)';
            }}
          />
          <input
            type="email"
            placeholder="Your Email"
            value={leadEmail}
            onChange={(e) => setLeadEmail(e.target.value)}
            style={{
              padding: '12px 16px',
              fontSize: '15px',
              border: '1px solid var(--le-border)',
              borderRadius: '8px',
              backgroundColor: 'var(--le-bg)',
              color: 'var(--le-text)',
              transition: 'border-color 0.2s ease',
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = 'var(--le-primary)';
              e.currentTarget.style.outline = 'none';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = 'var(--le-border)';
            }}
          />
          <input
            type="tel"
            placeholder="Your Phone (Optional)"
            value={leadPhone}
            onChange={(e) => setLeadPhone(e.target.value)}
            style={{
              padding: '12px 16px',
              fontSize: '15px',
              border: '1px solid var(--le-border)',
              borderRadius: '8px',
              backgroundColor: 'var(--le-bg)',
              color: 'var(--le-text)',
              transition: 'border-color 0.2s ease',
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = 'var(--le-primary)';
              e.currentTarget.style.outline = 'none';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = 'var(--le-border)';
            }}
          />
          <button
            type="submit"
            style={{
              backgroundColor: 'var(--le-accent)',
              color: 'var(--le-text)',
              border: 'none',
              padding: '16px 32px',
              fontSize: '16px',
              fontWeight: '600',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
            }}
          >
            Get Expert Guidance
          </button>
        </form>

        {leadSubmitted && (
          <div
            style={{
              marginTop: '20px',
              padding: '16px',
              backgroundColor: 'var(--le-success, #4ade80)',
              color: 'white',
              borderRadius: '8px',
              fontSize: '15px',
              fontWeight: '500',
            }}
          >
            Thanks for reaching out! We\u2019ll be in touch soon.
          </div>
        )}
      </section>
    </div>
  );
}
