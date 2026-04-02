'use client';

import { useState, useRef } from 'react';

export default function HomeMaintenancePage() {
  const [expandedSeason, setExpandedSeason] = useState<string | null>(null);
  const [expandedMonth, setExpandedMonth] = useState<string | null>(null);
  const [expandedSystem, setExpandedSystem] = useState<string | null>(null);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [checkedTasks, setCheckedTasks] = useState<Set<string>>(new Set());
  const [homeSize, setHomeSize] = useState<number>(2000);
  const [homeAge, setHomeAge] = useState<number>(20);
  const [homeType, setHomeType] = useState<string>('single-family');
  const [estimatedBudget, setEstimatedBudget] = useState<number>(0);
  const [leadEmail, setLeadEmail] = useState<string>('');
  const [leadPhone, setLeadPhone] = useState<string>('');
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const leadFormRef = useRef<HTMLDivElement>(null);

  const toggleTask = (taskId: string) => {
    const newChecked = new Set(checkedTasks);
    if (newChecked.has(taskId)) {
      newChecked.delete(taskId);
    } else {
      newChecked.add(taskId);
    }
    setCheckedTasks(newChecked);
  };

  const calculateBudget = () => {
    let baseCost = homeSize * 0.5;
    const ageFactor = homeAge > 30 ? 1.5 : homeAge > 15 ? 1.2 : 1;
    const typeFactor =
      homeType === 'condo' ? 0.7 : homeType === 'multi-family' ? 1.3 : 1;
    const total = Math.round(baseCost * ageFactor * typeFactor);
    setEstimatedBudget(total);
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (leadEmail && leadPhone) {
      setLeadSubmitted(true);
      setLeadEmail('');
      setLeadPhone('');
      setTimeout(() => setLeadSubmitted(false), 5000);
    }
  };

  const seasonalTasks = {
    spring: [
      { id: 'spring-1', name: 'Inspect and clean gutters & downspouts', cost: '$150-300', diy: true, tips: 'Clear debris, check for leaks, flush water through' },
      { id: 'spring-2', name: 'Check roof for winter damage', cost: '$0-200', diy: true, tips: 'Look for missing shingles, debris, or moss growth' },
      { id: 'spring-3', name: 'Inspect exterior caulking & weatherstripping', cost: '$100-400', diy: true, tips: 'Replace where cracked or deteriorated' },
      { id: 'spring-4', name: 'Test HVAC system & change air filters', cost: '$50-200', diy: true, tips: 'Run A/C and heating, replace filters monthly' },
      { id: 'spring-5', name: 'Inspect foundation for cracks', cost: '$0-500', diy: true, tips: 'Monitor small cracks, get large ones inspected' },
      { id: 'spring-6', name: 'Clean window wells & install screens', cost: '$100-300', diy: true, tips: 'Remove winter debris, check screen condition' },
      { id: 'spring-7', name: 'Pressure wash exterior & deck', cost: '$200-400', diy: true, tips: 'Clean siding, deck, and walkways' },
      { id: 'spring-8', name: 'Test sump pump & backup system', cost: '$50-150', diy: true, tips: 'Pour water into sump pit to verify operation' },
      { id: 'spring-9', name: 'Inspect basement/crawl space for moisture', cost: '$0-2000', diy: true, tips: 'Look for water stains, efflorescence, or mold' },
      { id: 'spring-10', name: 'Schedule professional HVAC inspection', cost: '$100-200', diy: false, tips: 'Annual maintenance prevents costly breakdowns' },
      { id: 'spring-11', name: 'Inspect grading around foundation', cost: '$0-1500', diy: true, tips: 'Ensure water drains away from house' },
      { id: 'spring-12', name: 'Check exterior paint & stain', cost: '$500-2000', diy: false, tips: 'Peeling paint exposes wood to rot' },
    ],
    summer: [
      { id: 'summer-1', name: 'Water exterior plants & maintain landscaping', cost: '$50-150', diy: true, tips: 'Keep plants 5+ feet from foundation' },
      { id: 'summer-2', name: 'Inspect and repair deck/patio', cost: '$100-500', diy: true, tips: 'Check for loose boards, rot, or damage' },
      { id: 'summer-3', name: 'Monitor A/C performance', cost: '$100-300', diy: true, tips: 'Clean condenser coils, check refrigerant' },
      { id: 'summer-4', name: 'Check exterior outlets & lighting', cost: '$50-200', diy: true, tips: 'Test GFCI outlets, replace burned-out bulbs' },
      { id: 'summer-5', name: 'Inspect septic system (if applicable)', cost: '$0-500', diy: true, tips: 'No heavy water usage, avoid additives' },
      { id: 'summer-6', name: 'Seal driveway cracks', cost: '$100-300', diy: true, tips: 'Prevent water infiltration and expansion' },
      { id: 'summer-7', name: 'Check pool/hot tub equipment', cost: '$200-500', diy: true, tips: 'Test filters, pumps, and chemical balance' },
      { id: 'summer-8', name: 'Inspect exterior wood for damage', cost: '$0-1000', diy: true, tips: 'Look for rot, insects, or weathering' },
      { id: 'summer-9', name: 'Clean & repair window screens', cost: '$50-150', diy: true, tips: 'Replace torn screens before fall' },
      { id: 'summer-10', name: 'Power wash driveway & walkways', cost: '$150-300', diy: true, tips: 'Remove algae, moss, and stains' },
      { id: 'summer-11', name: 'Inspect chimney & fireplace', cost: '$100-300', diy: false, tips: 'Professional cleaning before cold season' },
      { id: 'summer-12', name: 'Check and repair window glazing', cost: '$50-400', diy: true, tips: 'Replace deteriorating caulk around panes' },
    ],
    fall: [
      { id: 'fall-1', name: 'Clean gutters & downspouts thoroughly', cost: '$150-300', diy: true, tips: 'Remove leaves before winter water buildup' },
      { id: 'fall-2', name: 'Inspect roof before winter storms', cost: '$0-200', diy: true, tips: 'Check flashing, vents, and valleys' },
      { id: 'fall-3', name: 'Winterize exterior faucets & irrigation', cost: '$50-150', diy: true, tips: 'Drain hoses, shut off water supply' },
      { id: 'fall-4', name: 'Seal air leaks around windows & doors', cost: '$100-300', diy: true, tips: 'Use weatherstripping or caulk' },
      { id: 'fall-5', name: 'Service heating system before winter', cost: '$100-300', diy: false, tips: 'Professional furnace inspection & cleaning' },
      { id: 'fall-6', name: 'Drain & blow out sprinkler system', cost: '$100-250', diy: false, tips: 'Prevent frozen pipes and damage' },
      { id: 'fall-7', name: 'Inspect basement for moisture problems', cost: '$0-2000', diy: true, tips: 'Prepare for winter melting & rain' },
      { id: 'fall-8', name: 'Trim tree branches near roof', cost: '$200-800', diy: false, tips: 'Prevent ice/storm damage and debris' },
      { id: 'fall-9', name: 'Test backup power systems', cost: '$0-500', diy: true, tips: 'Generator, UPS, emergency lighting' },
      { id: 'fall-10', name: 'Inspect & repair exterior doors', cost: '$100-500', diy: true, tips: 'Check seals, locks, and hinges' },
      { id: 'fall-11', name: 'Power wash & seal driveway', cost: '$200-400', diy: true, tips: 'Before winter freezing' },
      { id: 'fall-12', name: 'Have chimney professionally inspected', cost: '$100-300', diy: false, tips: 'Essential safety check before heating season' },
    ],
    winter: [
      { id: 'winter-1', name: 'Remove snow & ice safely from roof', cost: '$200-800', diy: false, tips: 'Prevent ice dams and roof damage' },
      { id: 'winter-2', name: 'Monitor attic for ice dams', cost: '$0-5000', diy: true, tips: 'Improve ventilation and insulation' },
      { id: 'winter-3', name: 'Keep gutters clear of ice/snow', cost: '$100-300', diy: true, tips: 'Prevents water backup into home' },
      { id: 'winter-4', name: 'Check heating system regularly', cost: '$50-200', diy: true, tips: 'Monitor temperature, listen for noises' },
      { id: 'winter-5', name: 'Insulate exposed pipes', cost: '$50-150', diy: true, tips: 'Prevent freezing and bursting' },
      { id: 'winter-6', name: 'Test backup generator monthly', cost: '$0-100', diy: true, tips: 'Ensure readiness for outages' },
      { id: 'winter-7', name: 'Monitor basement for moisture', cost: '$0-1000', diy: true, tips: 'Melting snow can cause leaks' },
      { id: 'winter-8', name: 'Check attic ventilation & moisture', cost: '$0-2000', diy: true, tips: 'Too much moisture causes rot' },
      { id: 'winter-9', name: 'Inspect around window frames', cost: '$0-500', diy: true, tips: 'Check for condensation or ice buildup' },
      { id: 'winter-10', name: 'Verify sump pump operation', cost: '$50-150', diy: true, tips: 'Run test frequently during wet weather' },
      { id: 'winter-11', name: 'Check electrical panel for corrosion', cost: '$0-500', diy: true, tips: 'Call pro if you see rust or moisture' },
      { id: 'winter-12', name: 'Test carbon monoxide detectors', cost: '$50-150', diy: true, tips: 'Critical during heating season' },
    ],
  };

  const months = [
    { month: 'January', tasks: ['Heating system check', 'Carbon monoxide detection', 'Attic inspection'] },
    { month: 'February', tasks: ['Ice dam management', 'Pipe insulation check', 'Backup power test'] },
    { month: 'March', tasks: ['Gutter cleaning', 'Roof inspection', 'Foundation assessment'] },
    { month: 'April', tasks: ['HVAC spring service', 'Exterior caulking', 'Grading evaluation'] },
    { month: 'May', tasks: ['Landscape maintenance', 'Deck inspection', 'Window screen cleaning'] },
    { month: 'June', tasks: ['Air conditioning test', 'Exterior outlets check', 'Driveway sealing'] },
    { month: 'July', tasks: ['Pool maintenance', 'Chimney inspection', 'Wood exterior exam'] },
    { month: 'August', tasks: ['Power washing', 'Screen repair', 'Glazing caulk check'] },
    { month: 'September', tasks: ['Gutter prep for fall', 'Roof fall inspection', 'Faucet winterization'] },
    { month: 'October', tasks: ['Heating system service', 'Sprinkler blowout', 'Tree trimming'] },
    { month: 'November', tasks: ['Basement moisture check', 'Backup systems test', 'Door seal inspection'] },
    { month: 'December', tasks: ['Roof snow management', 'Gutter ice prevention', 'Holiday system checks'] },
  ];

  const homeSystems = [
    {
      id: 'hvac',
      name: 'HVAC System',
      lifespan: '15-20 years',
      warningSign: 'Uneven temperatures, strange noises, increased energy bills',
      maintenance: 'Change filters every 3 months, annual professional inspection, refrigerant checks',
      cost: 'Service: $100-300/year, Replacement: $5,000-12,000',
    },
    {
      id: 'plumbing',
      name: 'Plumbing System',
      lifespan: 'Copper: 50-70 years, PVC: 25-40 years, Galvanized: 40-50 years',
      warningSign: 'Slow drains, water stains, rusty water, low pressure, visible leaks',
      maintenance: 'Drain cleaning, water pressure test, annual inspection, fixture maintenance',
      cost: 'Service: $100-400, Repairs: $200-3,000+, Replacement: $10,000-30,000',
    },
    {
      id: 'electrical',
      name: 'Electrical System',
      lifespan: 'Wiring: 50-70 years, Panel: 25-40 years, Breakers: 20-30 years',
      warningSign: 'Frequent breaker trips, burning smell, warm outlets, flickering lights, buzzing',
      maintenance: 'Regular inspections, GFCI testing, load balancing, panel upgrade if needed',
      cost: 'Service: $100-300, Repairs: $200-2,000, Panel replacement: $3,000-8,000',
    },
    {
      id: 'roof',
      name: 'Roofing System',
      lifespan: 'Asphalt shingles: 15-25 years, Metal: 40-70 years, Tile: 50-100+ years',
      warningSign: 'Missing shingles, leaks, sagging, moss/algae, granule loss, flashing damage',
      maintenance: 'Annual inspections, debris removal, flashing maintenance, gutter cleaning',
      cost: 'Service: $150-500, Repairs: $500-5,000, Replacement: $10,000-30,000',
    },
    {
      id: 'foundation',
      name: 'Foundation & Structure',
      lifespan: '80+ years (but requires ongoing monitoring)',
      warningSign: 'Cracks, bowing walls, floor settling, sticking doors, water intrusion',
      maintenance: 'Monitor cracks, manage water drainage, address moisture, professional inspections',
      cost: 'Inspection: $300-800, Minor repairs: $500-5,000, Serious: $10,000-50,000+',
    },
    {
      id: 'water-heater',
      name: 'Water Heater',
      lifespan: 'Tank: 8-12 years, Tankless: 15-20 years',
      warningSign: 'No hot water, rust-colored water, leaks, strange noises, reduced capacity',
      maintenance: 'Flush annually, inspect anode rod, drain valve maintenance, temperature check',
      cost: 'Service: $150-300, Repairs: $200-1,000, Replacement: $1,000-5,000',
    },
    {
      id: 'septic',
      name: 'Septic System (if applicable)',
      lifespan: '25-40 years',
      warningSign: 'Slow drains, sewage smell, wet patches, backed-up toilets, surface pooling',
      maintenance: 'Pumping every 3-5 years, water conservation, inspection every 1-3 years',
      cost: 'Pumping: $200-500, Inspection: $100-300, Repairs: $1,000-5,000+',
    },
    {
      id: 'siding',
      name: 'Siding & Exterior',
      lifespan: 'Vinyl: 20-40 years, Wood: 20-40 years, Fiber cement: 25-40 years, Brick: 50-100+ years',
      warningSign: 'Cracks, rot, peeling paint, missing pieces, water damage, mold',
      maintenance: 'Annual inspection, cleaning, caulking, paint touch-ups, seal repairs',
      cost: 'Service: $500-2,000, Repairs: $1,000-5,000, Replacement: $15,000-50,000+',
    },
  ];

  const faqs = [
    {
      question: 'How much should I budget annually for home maintenance?',
      answer: 'A common rule of thumb is 1-2% of your home\u2019s value annually. For a $300,000 home, that\u2019s $3,000-6,000/year. Our cost estimator above can help calculate based on your specific home.',
    },
    {
      question: 'What\u2019s the difference between preventive and emergency maintenance?',
      answer: 'Preventive maintenance involves regular inspections and upkeep to catch issues early, costing significantly less. Emergency maintenance addresses problems that have already failed, often costing 2-5x more and causing property damage.',
    },
    {
      question: 'Should I do maintenance myself or hire a professional?',
      answer: 'Simple tasks like filter changes, gutter cleaning, and caulking can be DIY. For HVAC, electrical, plumbing, roof work, and foundation issues, hire professionals. DIY mistakes can be costly and unsafe.',
    },
    {
      question: 'How often should I have my HVAC system serviced?',
      answer: 'Have your heating system serviced in fall and air conditioning in spring, ideally annually. Professional maintenance extends system life, improves efficiency, and prevents costly breakdowns.',
    },
    {
      question: 'What are the warning signs my roof needs replacement?',
      answer: 'Signs include missing or curling shingles, leaks, sagging, visible flashing damage, granule loss (like asphalt in gutters), moss growth, and age over 20 years for asphalt shingles.',
    },
    {
      question: 'How can I prevent water damage in my basement?',
      answer: 'Ensure proper grading away from foundation, maintain gutters and downspouts, install sump pump if needed, seal cracks, improve drainage, and monitor for moisture regularly.',
    },
    {
      question: 'When should I have my chimney inspected?',
      answer: 'Annual professional inspection is essential before heating season. More frequent cleaning may be needed if you use your fireplace regularly. This prevents fires and carbon monoxide issues.',
    },
    {
      question: 'What\u2019s the lifespan of a typical residential roof?',
      answer: 'Asphalt shingles last 15-25 years, metal roofs 40-70 years, and tile 50-100+ years. Lifespan depends on climate, ventilation, maintenance, and installation quality.',
    },
    {
      question: 'How do I know if my plumbing needs upgrading?',
      answer: 'Consider upgrading if you have galvanized pipes (rust risk), polybutylene (failure-prone), low water pressure, frequent clogs, discolored water, or if pipes are over 50 years old.',
    },
    {
      question: 'What should I do if I discover a foundation crack?',
      answer: 'Monitor small cracks (hairline to 1/4 inch) regularly for growth. For larger cracks or if you notice bowing, sticking doors, or floor settling, get a professional structural inspection immediately.',
    },
    {
      question: 'How can I reduce my annual maintenance costs?',
      answer: 'Schedule regular preventive maintenance, keep detailed records, do simple DIY tasks, get multiple quotes for major work, maintain HVAC filters, and address small issues before they become expensive.',
    },
    {
      question: 'What\u2019s included in a professional home inspection?',
      answer: 'Inspections cover structure, roof, HVAC, plumbing, electrical, drainage, insulation, ventilation, windows, doors, and more. A typical inspection takes 2-4 hours and costs $300-800.',
    },
  ];

  const emergencies = [
    {
      type: 'Flood or Water Damage',
      steps: [
        'Shut off water at main valve if pipe burst (locate before emergency)',
        'Turn off electrical breaker for affected area (safety first)',
        'Stop water source if possible (use towels, plywood, duct tape for temporary fix)',
        'Remove standing water with pumps or towels',
        'Document damage with photos for insurance',
        'Call insurance company within 24 hours',
        'Hire water damage restoration professional',
        'Monitor for mold (appears within 24-48 hours)',
      ],
    },
    {
      type: 'Fire',
      steps: [
        'Evacuate immediately if you see fire or heavy smoke',
        'Call 911 from outside the home',
        'Do not attempt to fight large fires',
        'Use fire extinguisher only for small, contained fires (know your ABC\u2019s)',
        'Close doors behind you to slow fire spread',
        'Go to pre-established meeting point',
        'Account for all family members and pets',
        'Contact your insurance agent once safe',
      ],
    },
    {
      type: 'Storm/Hurricane/Tornado',
      steps: [
        'Seek shelter in interior room, basement, or safe room',
        'Stay away from windows',
        'Remain sheltered until weather passes',
        'Document any damage with photos/video',
        'Check for gas leaks (smell, hissing) before using electricity',
        'Do not use generators indoors (carbon monoxide risk)',
        'Contact insurance and schedule contractor assessment',
        'Board up broken windows, secure loose materials',
      ],
    },
    {
      type: 'Power Outage',
      steps: [
        'Confirm outage by checking neighbors and contacting utility',
        'Avoid opening refrigerator unnecessarily (keeps food cold longer)',
        'Use flashlights, not candles if possible (fire risk)',
        'Turn off major appliances to prevent power surge damage',
        'Keep generator outside, away from windows (carbon monoxide)',
        'Fill bathtub with water if outage is prolonged (for flushing)',
        'Stay sheltered; use blankets for warmth',
        'Once power restored, turn appliances back on gradually',
      ],
    },
    {
      type: 'Gas Leak',
      steps: [
        'Do not create sparks (light switch, phone, static)',
        'Evacuate immediately and call 911 from outside',
        'Do not use car or electrical devices',
        'Leave doors open for gas to escape',
        'Do not re-enter until authorities confirm it\u2019s safe',
        'Only qualified professionals should inspect gas lines',
        'Document issue for your gas company',
        'Have inspection after repair is completed',
      ],
    },
    {
      type: 'Electrical Emergency',
      steps: [
        'If someone is electrocuted, do not touch them; turn off power at breaker',
        'Call 911 immediately',
        'If breaker won\u2019t help, use non-conductive object to separate person from source',
        'Do not use water on electrical fire; use Class C extinguisher',
        'Do not touch wet electrical equipment',
        'For burning smell from outlets, turn off circuit at breaker',
        'Get professional inspection before using again',
        'Never attempt DIY electrical repairs for serious issues',
      ],
    },
  ];

  const warranties = [
    {
      name: 'Basic Homeowners Warranty',
      coverage: ['Heating', 'Cooling', 'Plumbing', 'Electrical basics'],
      notCovered: ['Roofing', 'Foundation', 'Cosmetic damage', 'Improper maintenance'],
      costRange: '$300-600/year',
      claims: '$50-100 per visit',
    },
    {
      name: 'Comprehensive Homeowners Warranty',
      coverage: ['All basic items', 'Appliances', 'Septic', 'Water heater', 'Swimming pool'],
      notCovered: ['Roofing over 25 years old', 'Structural damage', 'Pre-existing conditions'],
      costRange: '$600-1,200/year',
      claims: '$75-150 per visit',
    },
    {
      name: 'Premium Plus Warranty',
      coverage: ['All items', 'Extended appliance coverage', '24/7 emergency service', 'Roof coverage'],
      notCovered: ['Damage from neglect', 'Cosmetic issues', 'Code upgrades'],
      costRange: '$1,000-1,800/year',
      claims: '$100-200 per visit',
    },
  ];

  return (
    <div style={{ backgroundColor: 'var(--le-bg)', color: 'var(--le-text)', fontFamily: 'system-ui, -apple-system, sans-serif', lineHeight: '1.6' }}>
      {/* Hero Section */}
      <section style={{
        backgroundColor: 'var(--le-primary)',
        color: '#fff',
        padding: '80px 20px',
        textAlign: 'center',
        backgroundImage: 'linear-gradient(135deg, var(--le-primary) 0%, rgba(0,0,0,0.1) 100%)',
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '20px', lineHeight: '1.2' }}>
            Protect Your Investment
          </h1>
          <p style={{ fontSize: '1.3rem', marginBottom: '30px', opacity: '0.95' }}>
            A well-maintained home preserves value and prevents costly emergencies. Our comprehensive maintenance guide covers seasonal tasks, emergency preparedness, and expert tips.
          </p>
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => leadFormRef.current?.scrollIntoView({ behavior: 'smooth' })}
              style={{
                backgroundColor: 'var(--le-accent)',
                color: 'var(--le-text)',
                padding: '14px 32px',
                fontSize: '1rem',
                fontWeight: '600',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                transition: 'opacity 0.3s',
              }}
              onMouseOver={(e) => (e.currentTarget.style.opacity = '0.9')}
              onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
            >
              Get Your Maintenance Plan
            </button>
            <button
              onClick={() => document.getElementById('seasonal-checklist')?.scrollIntoView({ behavior: 'smooth' })}
              style={{
                backgroundColor: 'rgba(255,255,255,0.2)',
                color: '#fff',
                padding: '14px 32px',
                fontSize: '1rem',
                fontWeight: '600',
                border: '2px solid rgba(255,255,255,0.4)',
                borderRadius: '6px',
                cursor: 'pointer',
                transition: 'all 0.3s',
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.3)')}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)')}
            >
              View Checklist
            </button>
          </div>
        </div>
      </section>

      {/* Seasonal Maintenance Checklist */}
      <section id="seasonal-checklist" style={{ padding: '60px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '2.2rem', fontWeight: 'bold', marginBottom: '40px', textAlign: 'center', color: 'var(--le-text)' }}>
          Seasonal Maintenance Checklist
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          {Object.entries(seasonalTasks).map(([season, tasks]) => (
            <div
              key={season}
              style={{
                backgroundColor: 'var(--le-bg-card)',
                border: `1px solid var(--le-border)`,
                borderRadius: '8px',
                overflow: 'hidden',
              }}
            >
              <button
                onClick={() => setExpandedSeason(expandedSeason === season ? null : season)}
                style={{
                  width: '100%',
                  padding: '20px',
                  backgroundColor: season === 'spring' ? '#90EE90' : season === 'summer' ? '#FFD700' : season === 'fall' ? '#FF8C00' : '#87CEEB',
                  color: '#000',
                  border: 'none',
                  textAlign: 'left',
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  transition: 'opacity 0.3s',
                }}
                onMouseOver={(e) => (e.currentTarget.style.opacity = '0.9')}
                onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
              >
                {season.charAt(0).toUpperCase() + season.slice(1)}
                <span style={{ fontSize: '1.5rem' }}>{expandedSeason === season ? '−' : '+'}</span>
              </button>
              {expandedSeason === season && (
                <div style={{ padding: '20px', backgroundColor: 'var(--le-bg-card)' }}>
                  {tasks.map((task) => (
                    <div
                      key={task.id}
                      style={{
                        padding: '12px 0',
                        borderBottom: `1px solid var(--le-border)`,
                        display: 'flex',
                        gap: '12px',
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={checkedTasks.has(task.id)}
                        onChange={() => toggleTask(task.id)}
                        style={{
                          width: '20px',
                          height: '20px',
                          cursor: 'pointer',
                          marginTop: '2px',
                        }}
                      />
                      <div style={{ flex: 1 }}>
                        <div style={{
                          fontWeight: '600',
                          textDecoration: checkedTasks.has(task.id) ? 'line-through' : 'none',
                          opacity: checkedTasks.has(task.id) ? '0.6' : '1',
                          color: 'var(--le-text)',
                        }}>
                          {task.name}
                        </div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--le-text-secondary)', marginTop: '4px' }}>
                          Cost: <span style={{ color: 'var(--le-accent)', fontWeight: '600' }}>{task.cost}</span> {' • '} {task.diy ? '✓ DIY Friendly' : 'Pro Recommended'}
                        </div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--le-text-secondary)', marginTop: '6px', fontStyle: 'italic' }}>
                          Tips: {task.tips}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Monthly Calendar */}
      <section style={{ padding: '60px 20px', backgroundColor: 'rgba(0,0,0,0.02)', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '2.2rem', fontWeight: 'bold', marginBottom: '40px', textAlign: 'center' }}>
          Monthly Maintenance Calendar
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          {months.map((item) => (
            <div
              key={item.month}
              style={{
                backgroundColor: 'var(--le-bg-card)',
                border: `1px solid var(--le-border)`,
                borderRadius: '8px',
                overflow: 'hidden',
              }}
            >
              <button
                onClick={() => setExpandedMonth(expandedMonth === item.month ? null : item.month)}
                style={{
                  width: '100%',
                  padding: '16px',
                  backgroundColor: 'var(--le-primary)',
                  color: '#fff',
                  border: 'none',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  transition: 'opacity 0.3s',
                }}
                onMouseOver={(e) => (e.currentTarget.style.opacity = '0.9')}
                onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
              >
                {item.month}
                <span>{expandedMonth === item.month ? '−' : '+'}</span>
              </button>
              {expandedMonth === item.month && (
                <div style={{ padding: '16px' }}>
                  <ul style={{ margin: '0', paddingLeft: '20px', color: 'var(--le-text)' }}>
                    {item.tasks.map((task, idx) => (
                      <li key={idx} style={{ marginBottom: '8px' }}>
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Cost Estimator */}
      <section style={{ padding: '60px 20px', maxWidth: '900px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '2.2rem', fontWeight: 'bold', marginBottom: '40px', textAlign: 'center' }}>
          Annual Maintenance Budget Estimator
        </h2>
        <div
          style={{
            backgroundColor: 'var(--le-bg-card)',
            border: `1px solid var(--le-border)`,
            borderRadius: '8px',
            padding: '40px',
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px', marginBottom: '30px' }}>
            <div>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: 'var(--le-text)' }}>
                Home Size (sq ft)
              </label>
              <input
                type="number"
                value={homeSize}
                onChange={(e) => setHomeSize(Number(e.target.value))}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: `1px solid var(--le-border)`,
                  borderRadius: '4px',
                  fontSize: '1rem',
                  backgroundColor: 'var(--le-bg)',
                  color: 'var(--le-text)',
                }}
              />
              <input
                type="range"
                min="1000"
                max="10000"
                step="100"
                value={homeSize}
                onChange={(e) => setHomeSize(Number(e.target.value))}
                style={{ width: '100%', marginTop: '8px', cursor: 'pointer' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: 'var(--le-text)' }}>
                Home Age (years)
              </label>
              <input
                type="number"
                value={homeAge}
                onChange={(e) => setHomeAge(Number(e.target.value))}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: `1px solid var(--le-border)`,
                  borderRadius: '4px',
                  fontSize: '1rem',
                  backgroundColor: 'var(--le-bg)',
                  color: 'var(--le-text)',
                }}
              />
              <input
                type="range"
                min="1"
                max="100"
                value={homeAge}
                onChange={(e) => setHomeAge(Number(e.target.value))}
                style={{ width: '100%', marginTop: '8px', cursor: 'pointer' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: 'var(--le-text)' }}>
                Home Type
              </label>
              <select
                value={homeType}
                onChange={(e) => setHomeType(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: `1px solid var(--le-border)`,
                  borderRadius: '4px',
                  fontSize: '1rem',
                  backgroundColor: 'var(--le-bg)',
                  color: 'var(--le-text)',
                  cursor: 'pointer',
                }}
              >
                <option value="single-family">Single Family</option>
                <option value="condo">Condo/Townhouse</option>
                <option value="multi-family">Multi-Family</option>
              </select>
            </div>
          </div>
          <button
            onClick={calculateBudget}
            style={{
              width: '100%',
              padding: '14px',
              backgroundColor: 'var(--le-primary)',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              fontSize: '1.1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'opacity 0.3s',
            }}
            onMouseOver={(e) => (e.currentTarget.style.opacity = '0.9')}
            onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
          >
            Calculate Budget
          </button>
          {estimatedBudget > 0 && (
            <div style={{
              marginTop: '30px',
              padding: '24px',
              backgroundColor: 'rgba(0,255,0,0.05)',
              border: `2px solid var(--le-success)`,
              borderRadius: '6px',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: '0.9rem', color: 'var(--le-text-secondary)', marginBottom: '8px' }}>
                Estimated Annual Budget
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--le-success)' }}>
                ${estimatedBudget.toLocaleString()}
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--le-text-secondary)', marginTop: '12px' }}>
                Based on {homeSize} sq ft, {homeAge} years old {homeType} home
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Home Systems Guide */}
      <section style={{ padding: '60px 20px', backgroundColor: 'rgba(0,0,0,0.02)', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '2.2rem', fontWeight: 'bold', marginBottom: '40px', textAlign: 'center' }}>
          Essential Home Systems Guide
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          {homeSystems.map((system) => (
            <div
              key={system.id}
              style={{
                backgroundColor: 'var(--le-bg-card)',
                border: `1px solid var(--le-border)`,
                borderRadius: '8px',
                overflow: 'hidden',
              }}
            >
              <button
                onClick={() => setExpandedSystem(expandedSystem === system.id ? null : system.id)}
                style={{
                  width: '100%',
                  padding: '18px',
                  backgroundColor: 'var(--le-primary)',
                  color: '#fff',
                  border: 'none',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  transition: 'opacity 0.3s',
                }}
                onMouseOver={(e) => (e.currentTarget.style.opacity = '0.9')}
                onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
              >
                {system.name}
                <span style={{ fontSize: '1.3rem' }}>{expandedSystem === system.id ? '−' : '+'}</span>
              </button>
              {expandedSystem === system.id && (
                <div style={{ padding: '24px', backgroundColor: 'var(--le-bg-card)' }}>
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--le-text-secondary)', marginBottom: '4px' }}>
                      LIFESPAN
                    </div>
                    <div style={{ fontSize: '1rem', color: 'var(--le-text)', fontWeight: '500' }}>
                      {system.lifespan}
                    </div>
                  </div>
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--le-text-secondary)', marginBottom: '4px' }}>
                      WARNING SIGNS
                    </div>
                    <div style={{ fontSize: '0.95rem', color: 'var(--le-text)' }}>
                      {system.warningSign}
                    </div>
                  </div>
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--le-text-secondary)', marginBottom: '4px' }}>
                      MAINTENANCE TIPS
                    </div>
                    <div style={{ fontSize: '0.95rem', color: 'var(--le-text)' }}>
                      {system.maintenance}
                    </div>
                  </div>
                  <div style={{
                    padding: '12px',
                    backgroundColor: 'rgba(255,165,0,0.1)',
                    border: `1px solid var(--le-warning)`,
                    borderRadius: '4px',
                    fontSize: '0.9rem',
                    color: 'var(--le-text)',
                  }}>
                    <span style={{ fontWeight: '600', color: 'var(--le-warning)' }}>Cost Range:</span> {system.cost}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Emergency Preparedness */}
      <section style={{ padding: '60px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '2.2rem', fontWeight: 'bold', marginBottom: '40px', textAlign: 'center' }}>
          Emergency Preparedness & Response
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
          {emergencies.map((emergency, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: 'var(--le-bg-card)',
                border: `2px solid var(--le-danger)`,
                borderRadius: '8px',
                padding: '24px',
              }}
            >
              <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', color: 'var(--le-danger)', marginBottom: '16px' }}>
                {emergency.type}
              </h3>
              <ol style={{ margin: '0', paddingLeft: '20px', color: 'var(--le-text)' }}>
                {emergency.steps.map((step, stepIdx) => (
                  <li key={stepIdx} style={{ marginBottom: '10px', lineHeight: '1.5' }}>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </section>

      {/* Home Warranty Comparison */}
      <section style={{ padding: '60px 20px', backgroundColor: 'rgba(0,0,0,0.02)', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '2.2rem', fontWeight: 'bold', marginBottom: '40px', textAlign: 'center' }}>
          Home Warranty Comparison
        </h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            backgroundColor: 'var(--le-bg-card)',
            borderRadius: '8px',
            overflow: 'hidden',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--le-primary)', color: '#fff' }}>
                <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', borderRight: '1px solid var(--le-border)' }}>Warranty Type</th>
                <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', borderRight: '1px solid var(--le-border)' }}>Coverage</th>
                <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', borderRight: '1px solid var(--le-border)' }}>Exclusions</th>
                <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', borderRight: '1px solid var(--le-border)' }}>Annual Cost</th>
                <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600' }}>Service Call</th>
              </tr>
            </thead>
            <tbody>
              {warranties.map((warranty, idx) => (
                <tr key={idx} style={{ borderTop: '1px solid var(--le-border)', backgroundColor: idx % 2 === 0 ? 'var(--le-bg-card)' : 'rgba(0,0,0,0.02)' }}>
                  <td style={{ padding: '16px', fontWeight: '600', borderRight: '1px solid var(--le-border)', color: 'var(--le-text)' }}>
                    {warranty.name}
                  </td>
                  <td style={{ padding: '16px', borderRight: '1px solid var(--le-border)', fontSize: '0.9rem', color: 'var(--le-text)' }}>
                    <ul style={{ margin: '0', paddingLeft: '20px' }}>
                      {warranty.coverage.map((item, i) => (
                        <li key={i} style={{ marginBottom: '4px' }}>✓ {item}</li>
                      ))}
                    </ul>
                  </td>
                  <td style={{ padding: '16px', borderRight: '1px solid var(--le-border)', fontSize: '0.9rem', color: 'var(--le-text-secondary)' }}>
                    <ul style={{ margin: '0', paddingLeft: '20px' }}>
                      {warranty.notCovered.map((item, i) => (
                        <li key={i} style={{ marginBottom: '4px' }}>✗ {item}</li>
                      ))}
                    </ul>
                  </td>
                  <td style={{ padding: '16px', borderRight: '1px solid var(--le-border)', fontWeight: '600', color: 'var(--le-accent)' }}>
                    {warranty.costRange}
                  </td>
                  <td style={{ padding: '16px', fontWeight: '600', color: 'var(--le-text)' }}>
                    {warranty.claims}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQ Section */}
      <section style={{ padding: '60px 20px', maxWidth: '900px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '2.2rem', fontWeight: 'bold', marginBottom: '40px', textAlign: 'center' }}>
          Frequently Asked Questions
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: 'var(--le-bg-card)',
                border: `1px solid var(--le-border)`,
                borderRadius: '8px',
                overflow: 'hidden',
              }}
            >
              <button
                onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                style={{
                  width: '100%',
                  padding: '18px',
                  backgroundColor: 'var(--le-bg-card)',
                  color: 'var(--le-text)',
                  border: 'none',
                  textAlign: 'left',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  transition: 'background-color 0.3s',
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.02)')}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'var(--le-bg-card)')}
              >
                <span style={{ paddingRight: '20px' }}>{faq.question}</span>
                <span style={{ fontSize: '1.3rem', flexShrink: 0, marginTop: '-2px' }}>
                  {expandedFaq === idx ? '−' : '+'}
                </span>
              </button>
              {expandedFaq === idx && (
                <div style={{
                  padding: '18px',
                  backgroundColor: 'rgba(0,0,0,0.02)',
                  borderTop: `1px solid var(--le-border)`,
                  color: 'var(--le-text)',
                  lineHeight: '1.7',
                }}>
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Lead Capture Form */}
      <section ref={leadFormRef} style={{ padding: '60px 20px', backgroundColor: 'var(--le-primary)', maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', color: '#fff', marginBottom: '30px' }}>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 'bold', marginBottom: '12px' }}>
            Get Your Personalized Maintenance Plan
          </h2>
          <p style={{ fontSize: '1.1rem', opacity: '0.95' }}>
            Receive a customized guide based on your home\u2019s specific needs
          </p>
        </div>

        {!leadSubmitted ? (
          <form
            onSubmit={handleLeadSubmit}
            style={{
              backgroundColor: 'var(--le-bg-card)',
              padding: '32px',
              borderRadius: '8px',
              maxWidth: '500px',
              margin: '0 auto',
            }}
          >
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                fontWeight: '600',
                marginBottom: '8px',
                color: 'var(--le-text)',
              }}>
                Email Address
              </label>
              <input
                type="email"
                value={leadEmail}
                onChange={(e) => setLeadEmail(e.target.value)}
                placeholder="you@example.com"
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  border: `1px solid var(--le-border)`,
                  borderRadius: '4px',
                  fontSize: '1rem',
                  backgroundColor: 'var(--le-bg)',
                  color: 'var(--le-text)',
                  boxSizing: 'border-box',
                }}
              />
            </div>
            <div style={{ marginBottom: '24px' }}>
              <label style={{
                display: 'block',
                fontWeight: '600',
                marginBottom: '8px',
                color: 'var(--le-text)',
              }}>
                Phone Number
              </label>
              <input
                type="tel"
                value={leadPhone}
                onChange={(e) => setLeadPhone(e.target.value)}
                placeholder="(555) 000-0000"
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  border: `1px solid var(--le-border)`,
                  borderRadius: '4px',
                  fontSize: '1rem',
                  backgroundColor: 'var(--le-bg)',
                  color: 'var(--le-text)',
                  boxSizing: 'border-box',
                }}
              />
            </div>
            <button
              type="submit"
              style={{
                width: '100%',
                padding: '14px',
                backgroundColor: 'var(--le-primary)',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'opacity 0.3s',
              }}
              onMouseOver={(e) => (e.currentTarget.style.opacity = '0.9')}
              onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
            >
              Send Me My Plan
            </button>
            <p style={{
              fontSize: '0.8rem',
              color: 'var(--le-text-secondary)',
              marginTop: '16px',
              textAlign: 'center',
            }}>
              We\u2019ll send your personalized maintenance guide to your inbox. No spam, ever.
            </p>
          </form>
        ) : (
          <div style={{
            backgroundColor: 'var(--le-bg-card)',
            padding: '32px',
            borderRadius: '8px',
            maxWidth: '500px',
            margin: '0 auto',
            textAlign: 'center',
            borderLeft: `4px solid var(--le-success)`,
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '12px' }}>✓</div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '8px', color: 'var(--le-success)' }}>
              Thank You!
            </h3>
            <p style={{ color: 'var(--le-text)' }}>
              Your personalized maintenance plan is on the way. Check your inbox shortly.
            </p>
          </div>
        )}
      </section>

      {/* Vendor CTA Section */}
      <section style={{ padding: '60px 20px', backgroundColor: 'rgba(0,0,0,0.02)', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{
          backgroundColor: 'var(--le-accent)',
          color: 'var(--le-text)',
          padding: '48px 24px',
          borderRadius: '8px',
          textAlign: 'center',
        }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '16px' }}>
            Need a Professional?
          </h2>
          <p style={{ fontSize: '1.1rem', marginBottom: '24px', maxWidth: '600px', margin: '0 auto 24px' }}>
            We know the best local contractors in your area. From plumbers and electricians to roofers and HVAC specialists—we\u2019ve vetted them all.
          </p>
          <button
            style={{
              backgroundColor: 'var(--le-primary)',
              color: '#fff',
              padding: '14px 40px',
              fontSize: '1rem',
              fontWeight: '600',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              transition: 'opacity 0.3s',
            }}
            onMouseOver={(e) => (e.currentTarget.style.opacity = '0.9')}
            onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
          >
            Connect with Local Contractors
          </button>
        </div>
      </section>

      {/* Footer CTA */}
      <section style={{ padding: '40px 20px', backgroundColor: 'var(--le-bg)', textAlign: 'center', borderTop: `1px solid var(--le-border)` }}>
        <p style={{ fontSize: '0.95rem', color: 'var(--le-text-secondary)', marginBottom: '16px' }}>
          Home maintenance doesn\u2019t have to be overwhelming. Start with one room, one system, one season.
        </p>
        <p style={{ fontSize: '0.9rem', color: 'var(--le-text-secondary)' }}>
          Last updated: April 2, 2026
        </p>
      </section>

      {/* JSON-LD Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Home Maintenance Guide',
            description: 'Comprehensive guide to protecting your home investment with seasonal checklists, maintenance schedules, and expert tips.',
            publisher: {
              '@type': 'Organization',
              name: 'LeadEngine Real Estate',
              logo: { '@type': 'ImageObject', url: 'https://realtyclientengine.app/logo.png' },
            },
            mainEntity: {
              '@type': 'FAQPage',
              mainEntity: faqs.map((faq) => ({
                '@type': 'Question',
                name: faq.question,
                acceptedAnswer: { '@type': 'Answer', text: faq.answer },
              })),
            },
          }),
        }}
      />
    </div>
  );
}
