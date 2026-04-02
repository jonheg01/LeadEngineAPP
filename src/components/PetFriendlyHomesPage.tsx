'use client';

import React, { useState } from 'react';

export default function PetFriendlyHomesPage() {
  const [expandedNeighborhood, setExpandedNeighborhood] = useState<number | null>(null);
  const [expandedHOA, setExpandedHOA] = useState<number | null>(null);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [checklist, setChecklist] = useState<{ [key: string]: boolean }>({});
  const [petType, setPetType] = useState<'dog' | 'cat' | 'both'>('dog');
  const [costCalculatorData, setCostCalculatorData] = useState({
    petCount: 1,
    homeAge: 'new',
    renovationLevel: 'basic',
  });
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const petFriendlyFeatures = [
    {
      title: 'Large Yard (1/4+ Acre)',
      description: 'Ample space for dogs to run and play safely. Fenced areas provide exercise without daily walks.',
      importance: 'Essential for dogs',
    },
    {
      title: 'Durable Flooring',
      description: 'Tile, vinyl, or sealed concrete instead of carpet. Easier to clean pet accidents and withstands claws.',
      importance: 'Critical for indoor longevity',
    },
    {
      title: 'Secure Fencing',
      description: '4-6ft fence height, buried base (6-12 inches), no gaps. Prevents escapes and contains pets safely.',
      importance: 'Safety requirement for dogs',
    },
    {
      title: 'Open Floor Plan',
      description: 'Fewer walls and closed doors allow pets to move freely. Better for monitoring and reduces anxiety.',
      importance: 'Improves pet comfort',
    },
    {
      title: 'Multiple Exits',
      description: 'Back doors, side gates, or pet doors provide alternative routes. Helpful during emergencies.',
      importance: 'Safety and convenience',
    },
    {
      title: 'Laundry Room Access',
      description: 'Dedicated space for pet washing, grooming, and feed storage. Keeps main living areas cleaner.',
      importance: 'Maintenance benefit',
    },
  ];

  const neighborhoodConsiderations = [
    {
      factor: 'Dog Parks & Pet Areas',
      details: 'Proximity to off-leash dog parks, pet-friendly beaches, or hiking trails. Reduces daily walking commute.',
      redFlags: 'No dog parks within 5 miles; limited public pet-friendly spaces',
      checkpoints: [
        'Distance to nearest dog park (ideal: < 2 miles)',
        'Quality of parks (fencing, amenities, maintenance)',
        'Pet-friendly walking trails or paths',
      ],
    },
    {
      factor: 'Veterinary Services',
      details: 'Availability of animal hospitals, emergency vet clinics, and specialists. Critical for pet health.',
      redFlags: 'Single vet clinic in area; no 24-hour emergency services; limited specialists',
      checkpoints: [
        'Multiple vet clinics within 10 minutes',
        '24-hour emergency vet clinic nearby',
        'Availability of specialists (dermatology, orthopedics, cardiology)',
      ],
    },
    {
      factor: 'Pet-Friendly Businesses',
      details: 'Restaurants with pet patios, pet-friendly hotels, grooming, day care, and boarding facilities.',
      redFlags: 'Few pet-friendly dining options; limited grooming/boarding; no dog-friendly retail',
      checkpoints: [
        'Pet-friendly cafes and restaurant patios',
        'Quality dog grooming and day care options',
        'Pet boarding and sitting services',
      ],
    },
    {
      factor: 'Pet Policies in Area',
      details: 'Community attitude toward pets, local ordinances, and lease restrictions. Affects daily life.',
      redFlags: 'Strict pet bans; aggressive dog restrictions; high pet fees; poor pet-friendly reputation',
      checkpoints: [
        'City pet ordinances and breed restrictions',
        'Community attitude toward pets (online reviews, forums)',
        'Local pet events and community',
      ],
    },
    {
      factor: 'Air Quality & Environment',
      details: 'Low pollution, low pollen areas reduce respiratory issues in pets. Important for health-sensitive breeds.',
      redFlags: 'High pollution index; heavy traffic; industrial areas; known allergen hotspots',
      checkpoints: [
        'Air quality index (AQI) trends',
        'Pollen and allergen levels by season',
        'Distance from highways and industrial zones',
      ],
    },
    {
      factor: 'Wildlife & Hazards',
      details: 'Awareness of local wildlife (coyotes, snakes), pest control needs, and seasonal threats.',
      redFlags: 'Coyote or predator sightings; snake-prone areas; tick hotspots; chemical spraying programs',
      checkpoints: [
        'Local wildlife reports (coyotes, predators)',
        'Seasonal pest and disease risks',
        'Community pest control practices',
      ],
    },
  ];

  const hoaPolicies = [
    {
      policy: 'Pet Limits',
      description: 'Many HOAs restrict the number of pets (often 1-2) and their combined weight.',
      dogImpact: 'May prevent you from owning multiple dogs or large breeds',
      catImpact: 'Usually more lenient with cats; may have strict outdoor cat policies',
      questions: [
        'How many dogs/cats are allowed?',
        'Are weight limits enforced?',
        'Can I request exceptions for service or emotional support animals?',
      ],
    },
    {
      policy: 'Breed Restrictions',
      description: 'Some HOAs maintain breed-banned lists (often pit bulls, rottweilers, huskies, etc.)',
      dogImpact: 'Critical: your breed may be banned. Breed-banned dogs can be confiscated.',
      catImpact: 'Rarely affects cats; outdoor cat restrictions more common',
      questions: [
        'Is your breed on the banned list?',
        'Are breed restrictions enforced with fees?',
        'Can you appeal a breed ban?',
      ],
    },
    {
      policy: 'Fencing & Outdoor Enclosures',
      description: 'HOAs often require pre-approved fence styles and colors. Some prohibit dog runs.',
      dogImpact: 'May restrict the fence type or appearance you want; outdoor dog runs forbidden',
      catImpact: 'Cat enclosures may be restricted; outdoor cat policies vary',
      questions: [
        'What fence styles are approved?',
        'Can you install a dog run or kennel?',
        'Are there approval timelines?',
      ],
    },
    {
      policy: 'Pet Deposit & Fees',
      description: 'Upfront deposits ($200-500 per pet) plus monthly pet rent ($50-300/month).',
      dogImpact: 'Larger dogs often have higher fees; multiple dogs = multiple fee structures',
      catImpact: 'Usually lower deposits than dogs; outdoor cats may avoid fees',
      questions: [
        'What is the pet deposit amount?',
        'Is there monthly pet rent?',
        'Are deposits refundable?',
      ],
    },
    {
      policy: 'Noise & Behavior Restrictions',
      description: 'HOAs can penalize excessive barking, aggressive behavior, or loose pets on common areas.',
      dogImpact: 'Barking complaints can result in fines; aggressive dogs may need removal',
      catImpact: 'Less enforcement; outdoor cats more scrutinized in some HOAs',
      questions: [
        'Are there noise violation policies?',
        'What happens if someone complains about barking?',
        'What is the pet behavior enforcement process?',
      ],
    },
    {
      policy: 'Leash Requirements & Restrictions',
      description: 'Most HOAs require pets on-leash in common areas and may prohibit pets in certain zones.',
      dogImpact: 'Limits freedom in community spaces; some HOAs restrict pool/playground areas',
      catImpact: 'May restrict outdoor cat access; may require cat harnesses',
      questions: [
        'Are pets required to be leashed in common areas?',
        'Are any areas off-limits to pets?',
        'What are pet exercise area restrictions?',
      ],
    },
  ];

  const safetyTips = [
    {
      room: 'Kitchen',
      tips: [
        'Store all toxic foods in high cabinets: chocolate, grapes, onions, xylitol-containing foods',
        'Use childproof locks on low cabinets where cleaning supplies are stored',
        'Keep trash cans pet-proof (locked or behind closed doors)',
        'Never leave cooking unattended; grease fires and hot surfaces are hazards',
        'Secure appliance cords to prevent chewing',
      ],
    },
    {
      room: 'Bathroom',
      tips: [
        'Lock up medications, supplements, and toiletries (especially pain relievers)',
        'Keep toilet lids closed or use locks; antifreeze is deadly to pets',
        'Store cleaning supplies in locked cabinets',
        'Ensure bathroom plants (lilies, azaleas) are removed or inaccessible',
        'Keep drain covers secure to prevent ingestion',
      ],
    },
    {
      room: 'Bedroom',
      tips: [
        'Ensure secure sleeping areas away from hazards',
        'Use baby gates or closed doors to create safe zones',
        'Remove essential oil diffusers and candles (toxic when licked)',
        'Keep electrical cords and chargers out of reach',
        'Secure window blind cords to prevent strangulation',
      ],
    },
    {
      room: 'Living Room',
      tips: [
        'Keep electrical outlets covered with safety plugs',
        'Remove toxic houseplants (poinsettias, philodendrons, jade plants)',
        'Secure furniture that could collapse (unstable shelves, lamps)',
        'Hide or secure electrical cords and cables',
        'Keep remote controls, batteries, and button batteries away (very toxic)',
      ],
    },
    {
      room: 'Garage & Laundry',
      tips: [
        'Store antifreeze and car fluids in sealed, clearly labeled containers on high shelves',
        'Keep laundry detergent pods away; they\u2019re highly toxic',
        'Store pesticides, fertilizers, and garden chemicals securely',
        'Keep toolbox with nails, screws, and sharp objects locked',
        'Ensure garage door sensors work to prevent injuries',
      ],
    },
    {
      room: 'Yard & Outdoor',
      tips: [
        'Check fence for gaps, broken boards, and weak areas regularly',
        'Keep gates locked and closed; prevent accidental escapes',
        'Remove toxic plants (sago palm, oleander, foxglove, yew)',
        'Clear the yard of hazards: nails, glass, sharp sticks',
        'Provide shade, fresh water, and shelter from extreme heat/cold',
      ],
    },
  ];

  const renovationIdeas = [
    {
      feature: 'Doggy Door',
      cost: '$200-800',
      benefits: 'Allows independent bathroom access; reduces accidents indoors; improves pet freedom',
      considerations: 'Choose lockable options; insulate for temperature control; ensure proper fit',
    },
    {
      feature: 'Mudroom Addition',
      cost: '$3,000-8,000',
      benefits: 'Dedicated space for wet paws, grooming, feed storage; keeps main home clean',
      considerations: 'Flooring: tile or sealed concrete; add drainage; install hooks and storage',
    },
    {
      feature: 'Pet Washing Station',
      cost: '$1,500-5,000',
      benefits: 'Built-in bath reduces grooming costs; saves time; keeps pets clean longer',
      considerations: 'Low-height tub (20-30 inches); non-slip flooring; hot water line; drainage',
    },
    {
      feature: 'Durable Flooring Replacement',
      cost: '$4,000-15,000+',
      benefits: 'Resistant to stains, scratches, and accidents; easier cleaning; longer-lasting',
      considerations: 'Ceramic tile, vinyl plank, or epoxy; avoid carpet; use area rugs for comfort',
    },
    {
      feature: 'Secure Fencing',
      cost: '$3,000-10,000+',
      benefits: 'Safe containment; prevents escapes; peace of mind; increases play time',
      considerations: '4-6ft height; bury base 6-12 inches; inspect regularly for gaps',
    },
    {
      feature: 'Pet-Proof Landscaping',
      cost: '$1,000-5,000',
      benefits: 'Removes toxic plants; adds safe play areas; improves safety',
      considerations: 'Replace toxic plants with pet-safe options; add shade structures',
    },
    {
      feature: 'Window Safety Guards',
      cost: '$200-1,000',
      benefits: 'Prevents accidental falls from second stories; allows window ventilation',
      considerations: 'Ensure pets can\u2019t push guards out; must withstand pet weight',
    },
    {
      feature: 'Outdoor Shelter',
      cost: '$500-3,000',
      benefits: 'Protection from sun and rain; safe outdoor space; reduces indoor time pressure',
      considerations: 'Adequate ventilation; insulation for temperature control; easy access',
    },
  ];

  const insuranceConsiderations = [
    {
      topic: 'Breed-Specific Liability',
      description: 'Some homeowner policies exclude or charge more for certain breeds (pit bulls, rottweilers, huskies)',
      risk: 'Pet bite liability claim could be denied if breed is excluded',
      action: 'Ask insurer about breed policies before purchase; verify coverage applies to your breed',
    },
    {
      topic: 'Liability Coverage Limits',
      description: 'Standard homeowner policies include $100K-$300K liability coverage',
      risk: 'A serious dog bite injury could exceed coverage; medical bills can exceed limits',
      action: 'Consider umbrella policy ($1M) for additional protection; document your safety measures',
    },
    {
      topic: 'Dog Bite Incidents',
      description: 'Even friendly dogs can bite in frightening situations. One incident can be costly.',
      risk: 'Claim denials, policy cancellation, rate increases after incident',
      action: 'Get dog training; maintain vaccination records; have clear warning signs; supervise interactions',
    },
    {
      topic: 'Property Damage',
      description: 'Destructive pets can damage flooring, walls, and furniture. Some policies have exclusions.',
      risk: 'Damage claims may be denied; normal wear-and-tear claims can be expensive',
      action: 'Invest in durable flooring and furnishings; document before/after with photos',
    },
    {
      topic: 'Medical Costs for Pet Injuries',
      description: 'Pet health insurance is separate from homeowner insurance. Vet bills can be $5K-$20K+.',
      risk: 'High vet bills after home hazard injury; emergency care is expensive',
      action: 'Get pet health insurance; maintain emergency vet fund; pet-proof your home',
    },
  ];

  const costCalculator = () => {
    const baseCosts: { [key: string]: number } = {
      new: 800,
      mid: 1200,
      old: 1800,
    };

    const renovationCosts: { [key: string]: number } = {
      basic: 2000,
      moderate: 5000,
      extensive: 12000,
    };

    const baseAnnual = baseCosts[costCalculatorData.homeAge] || 800;
    const renovationTotal = renovationCosts[costCalculatorData.renovationLevel] || 2000;
    const multiPetMultiplier = 1 + (costCalculatorData.petCount - 1) * 0.6;
    const monthlyEstimate = Math.round((baseAnnual * multiPetMultiplier) / 12);

    return {
      monthlyEstimate,
      annualEstimate: Math.round(monthlyEstimate * 12),
      renovationTotal,
      yearsToBreakEven: costCalculatorData.renovationLevel !== 'basic' ? 3 : 2,
    };
  };

  const costs = costCalculator();

  const checklistItems = [
    'Yard size at least 1/4 acre',
    'Secure fencing (4-6 feet height)',
    'Non-carpet flooring (tile or vinyl)',
    'Multiple exterior doors or pet door',
    'Dog park within 2 miles',
    'Vet clinic within 10 minutes',
    '24-hour emergency vet available',
    'No breed restrictions in HOA',
    'HOA allows 2+ pets',
    'Neighborhood pet-friendly reputation',
    'Pet deposit reasonable ($200-400)',
    'No excessive pet rent ($<150/month)',
    'Home has AC/heating for temperature control',
    'Windows have safety guards or secure locks',
    'Toxic plants removed or inaccessible',
    'Electrical outlets covered or hidden',
  ];

  const faqs = [
    {
      question: 'What makes a home truly pet-friendly?',
      answer:
        'A pet-friendly home combines multiple factors: secure fencing, durable non-carpet flooring, sufficient yard space, nearby vet services, and a dog-friendly neighborhood. The "perfect" pet home also has an open floor plan (allowing pets to move freely), multiple exits, a laundry/mudroom area, and ideally, pet-proofing already done (toxic plants removed, outlets covered). Most importantly, it\u2019s a home where your local community supports and welcomes pets.',
    },
    {
      question: 'Should I be concerned about HOA pet policies?',
      answer:
        'Absolutely. HOA policies are non-negotiable and enforceable. Verify breed restrictions, pet count limits, deposit amounts, monthly pet rent, and enforcement practices before buying. Some HOAs ban specific breeds outright, others charge $100-300/month per pet. Request the complete HOA pet policy in writing. Breed-banned homes can result in forced pet surrender, so this is critical.',
    },
    {
      question: 'What flooring is best for pet owners?',
      answer:
        'Avoid carpet\u2014it stains, holds odors, and shows wear quickly. Best options: ceramic tile (durable, easy to clean, non-slip grout), luxury vinyl plank (waterproof, warm, scratch-resistant), sealed concrete (durable, industrial look), or epoxy flooring (commercial-grade, stain-proof). Combine with washable area rugs for comfort. Budget $4,000-15,000 for full-home flooring replacement.',
    },
    {
      question: 'Do I need pet insurance for my home?',
      answer:
        'Pet health insurance is separate from homeowner insurance, but equally important. Homeowner insurance covers liability (if your dog bites someone), but NOT veterinary bills. Vet bills can exceed $10,000 for emergencies or surgeries. Pet health insurance covers these costs (with deductibles and co-pays). Also verify your homeowner policy doesn\u2019t exclude your breed.',
    },
    {
      question: 'How much does pet-proofing cost?',
      answer:
        'Basic pet-proofing (removing toxic plants, securing cords, covering outlets): $200-500 DIY. Moderate renovations (doggy door, new flooring): $5,000-10,000. Extensive projects (mudroom addition, pet washing station, new fence): $10,000-25,000+. The investment pays off in reduced damage, safer pets, and easier daily life. Budget for these costs in your home purchase offer or post-purchase renovation plan.',
    },
    {
      question: 'What neighborhoods are best for dog owners?',
      answer:
        'Look for: proximity to dog parks (< 2 miles), multiple vet clinics with 24-hour emergency care, pet-friendly restaurants and shops, low crime rates (for outdoor safety), and active pet-owning communities (look for neighborhood dog clubs, pet events on Nextdoor or Facebook). Check city pet ordinances, too\u2014some have strict breed bans or dangerous dog laws.',
    },
    {
      question: 'Can I negotiate with sellers about pet-proofing?',
      answer:
        'Yes. Include pet-related inspections in your offer: fencing integrity, flooring durability, toxic plant removal, and electrical hazards. Request sellers disclose any pet-related damage (scratch marks, stains, odors). You can negotiate repairs or credits for pet-proofing. Some sellers may already have durable flooring and secure fencing\u2014that\u2019s valuable.',
    },
    {
      question: 'What should I ask during a home walkthrough?',
      answer:
        'Pet-specific questions: 1) Was the home previously owned by pets? Any odors or damage? 2) Is the fence secure and regularly maintained? 3) Does the yard have drainage (for wet areas)? 4) Are toxic plants present? 5) Are there gaps in fencing? 6) Does the home have a mudroom or dedicated pet space? 7) What\u2019s the neighborhood pet culture? Bring a pest control/structural inspector experienced in pet damage.',
    },
    {
      question: 'How do I estimate pet-related home costs?',
      answer:
        'Annual costs vary: vet care ($1,000-3,000 depending on health/age), food ($600-1,800), grooming ($500-2,000), and home maintenance ($200-500 for repairs). Home modifications: pet doors ($200-800), fencing ($3,000-10,000), flooring ($4,000-15,000+). First-year costs are higher due to setup; years 2+ are primarily vet and food costs. Budget 10-15% extra annually for pet-related home maintenance.',
    },
    {
      question: 'What if I\u2019m buying as a first-time pet owner?',
      answer:
        'Start with basics: research your breed\u2019s needs, get pet training lined up before moving, establish vet relationships early, and pet-proof your home thoroughly. Choose homes with already-durable flooring, secure fencing, and nearby vet services to minimize immediate costs. Consider pet insurance at adoption/purchase. Ask shelter staff or breed rescues for recommendations on neighborhood choice and home features. Get a pet inspection done by someone experienced with pet safety.',
    },
  ];

  const handleChecklistToggle = (item: string) => {
    setChecklist((prev) => ({
      ...prev,
      [item]: !prev[item],
    }));
  };

  const checkedCount = Object.values(checklist).filter(Boolean).length;

  const handleLeadCapture = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Lead captured:', { email, phone, petType });
    alert('Thank you! We\u2019ll be in touch soon with pet-friendly home recommendations.');
    setEmail('');
    setPhone('');
  };

  return (
    <div
      style={{
        backgroundColor: 'var(--le-bg)',
        color: 'var(--le-text)',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        lineHeight: '1.6',
      }}
    >
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Pet-Friendly Home Buying Guide',
            description: 'Complete guide to finding and buying pet-friendly homes. Pet features, neighborhood tips, HOA policies, and expert guidance.',
            mainEntity: {
              '@type': 'FAQPage',
              mainEntity: faqs.map((faq) => ({
                '@type': 'Question',
                name: faq.question,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: faq.answer,
                },
              })),
            },
          }),
        }}
      />

      {/* Hero Section */}
      <section
        style={{
          backgroundImage: 'linear-gradient(135deg, var(--le-primary) 0%, #059669 100%)',
          color: 'white',
          padding: '80px 20px',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ fontSize: '48px', marginBottom: '20px' }}>🐕</div>
          <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '20px' }}>Find Your Pet\u2019s Perfect Home</h1>
          <p style={{ fontSize: '20px', marginBottom: '30px', opacity: 0.95 }}>
            Your complete guide to buying a home that\u2019s safe, comfortable, and joyful for your furry family. Learn what makes a home truly pet-friendly\u2014from yard features to neighborhood considerations to HOA policies.
          </p>
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => {
                const elem = document.getElementById('checklist');
                elem?.scrollIntoView({ behavior: 'smooth' });
              }}
              style={{
                padding: '12px 24px',
                backgroundColor: 'white',
                color: 'var(--le-primary)',
                border: 'none',
                borderRadius: '8px',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontSize: '16px',
              }}
            >
              Home Checklist
            </button>
            <button
              onClick={() => {
                const elem = document.getElementById('calculator');
                elem?.scrollIntoView({ behavior: 'smooth' });
              }}
              style={{
                padding: '12px 24px',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                color: 'white',
                border: '2px solid white',
                borderRadius: '8px',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontSize: '16px',
              }}
            >
              Cost Calculator
            </button>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px',
          padding: '60px 20px',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        {[
          { icon: '🏡', label: 'Essential Home Features', value: '6+' },
          { icon: '🏥', label: 'Vet Services to Check', value: '3 Types' },
          { icon: '⚖️', label: 'HOA Policies to Review', value: '6 Areas' },
          { icon: '💰', label: 'Average Setup Cost', value: '$5K-25K' },
        ].map((stat, idx) => (
          <div
            key={idx}
            style={{
              backgroundColor: 'var(--le-bg-card)',
              border: '1px solid var(--le-border)',
              borderRadius: '12px',
              padding: '30px',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '32px', marginBottom: '10px' }}>{stat.icon}</div>
            <div style={{ fontSize: '14px', color: 'var(--le-text-secondary)', marginBottom: '8px' }}>{stat.label}</div>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: 'var(--le-primary)' }}>{stat.value}</div>
          </div>
        ))}
      </section>

      {/* Pet-Friendly Features Section */}
      <section style={{ padding: '60px 20px', backgroundColor: 'var(--le-bg-card)', borderTop: '1px solid var(--le-border)', borderBottom: '1px solid var(--le-border)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '15px', textAlign: 'center' }}>What Makes a Home Pet-Friendly?</h2>
          <p style={{ textAlign: 'center', color: 'var(--le-text-secondary)', marginBottom: '40px', fontSize: '16px' }}>
            The best homes for pets combine multiple features that create a safe, comfortable, and happy environment.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '25px' }}>
            {petFriendlyFeatures.map((feature, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: 'var(--le-bg)',
                  padding: '25px',
                  borderRadius: '12px',
                  border: '2px solid var(--le-primary)',
                }}
              >
                <div style={{ fontSize: '24px', marginBottom: '10px' }}>
                  {idx === 0 ? '🏡' : idx === 1 ? '✨' : idx === 2 ? '🔐' : idx === 3 ? '🏠' : idx === 4 ? '🚪' : '🧺'}
                </div>
                <h3 style={{ fontWeight: 'bold', marginBottom: '10px', fontSize: '18px' }}>{feature.title}</h3>
                <p style={{ marginBottom: '12px', color: 'var(--le-text-secondary)' }}>{feature.description}</p>
                <div
                  style={{
                    padding: '10px',
                    backgroundColor: 'var(--le-accent)',
                    borderRadius: '6px',
                    fontSize: '13px',
                    fontWeight: 'bold',
                  }}
                >
                  {feature.importance}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Neighborhood Considerations */}
      <section style={{ padding: '60px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '40px', textAlign: 'center' }}>Neighborhood Considerations</h2>
        <div style={{ display: 'grid', gap: '15px' }}>
          {neighborhoodConsiderations.map((item, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: 'var(--le-bg-card)',
                border: '1px solid var(--le-border)',
                borderRadius: '8px',
                overflow: 'hidden',
              }}
            >
              <button
                onClick={() => setExpandedNeighborhood(expandedNeighborhood === idx ? null : idx)}
                style={{
                  width: '100%',
                  padding: '20px',
                  backgroundColor: 'var(--le-bg-card)',
                  border: 'none',
                  textAlign: 'left',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '16px',
                  fontWeight: 'bold',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--le-bg)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--le-bg-card)';
                }}
              >
                <span>📍 {item.factor}</span>
                <span style={{ fontSize: '20px' }}>{expandedNeighborhood === idx ? '−' : '+'}</span>
              </button>
              {expandedNeighborhood === idx && (
                <div style={{ padding: '0 20px 20px', backgroundColor: 'var(--le-bg)' }}>
                  <p style={{ marginBottom: '15px', color: 'var(--le-text-secondary)' }}>{item.details}</p>
                  <div style={{ marginBottom: '15px', padding: '12px', backgroundColor: 'var(--le-bg-card)', borderRadius: '6px', borderLeft: '4px solid var(--le-danger)' }}>
                    <p style={{ margin: 0, fontSize: '13px', fontWeight: 'bold', marginBottom: '5px' }}>RED FLAGS:</p>
                    <p style={{ margin: 0, fontSize: '13px', color: 'var(--le-danger)' }}>{item.redFlags}</p>
                  </div>
                  <div>
                    <p style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '10px' }}>VERIFY THESE:</p>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                      {item.checkpoints.map((point, pidx) => (
                        <li key={pidx} style={{ marginBottom: '8px', paddingLeft: '20px', position: 'relative', fontSize: '13px' }}>
                          <span style={{ position: 'absolute', left: 0, color: 'var(--le-success)' }}>✓</span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* HOA & Rental Pet Policies */}
      <section style={{ padding: '60px 20px', backgroundColor: 'var(--le-bg-card)', borderTop: '1px solid var(--le-border)', borderBottom: '1px solid var(--le-border)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '15px', textAlign: 'center' }}>HOA & Rental Pet Policies</h2>
          <p style={{ textAlign: 'center', color: 'var(--le-text-secondary)', marginBottom: '40px', fontSize: '16px' }}>
            HOA policies are non-negotiable. Verify breed bans, pet limits, and fees before purchasing.
          </p>
          <div style={{ display: 'grid', gap: '15px' }}>
            {hoaPolicies.map((item, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: 'var(--le-bg)',
                  border: '1px solid var(--le-border)',
                  borderRadius: '8px',
                  overflow: 'hidden',
                }}
              >
                <button
                  onClick={() => setExpandedHOA(expandedHOA === idx ? null : idx)}
                  style={{
                    width: '100%',
                    padding: '20px',
                    backgroundColor: 'var(--le-bg)',
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '16px',
                    fontWeight: 'bold',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--le-bg-card)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--le-bg)';
                  }}
                >
                  <span>⚖️ {item.policy}</span>
                  <span style={{ fontSize: '20px' }}>{expandedHOA === idx ? '−' : '+'}</span>
                </button>
                {expandedHOA === idx && (
                  <div style={{ padding: '0 20px 20px', backgroundColor: 'var(--le-bg-card)' }}>
                    <p style={{ marginBottom: '15px', color: 'var(--le-text-secondary)' }}>{item.description}</p>
                    <div style={{ display: 'grid', gap: '15px', marginBottom: '15px' }}>
                      <div style={{ padding: '12px', backgroundColor: 'var(--le-bg)', borderRadius: '6px', borderLeft: '4px solid var(--le-primary)' }}>
                        <p style={{ margin: 0, fontSize: '13px', fontWeight: 'bold', marginBottom: '5px' }}>FOR DOG OWNERS:</p>
                        <p style={{ margin: 0, fontSize: '13px' }}>{item.dogImpact}</p>
                      </div>
                      <div style={{ padding: '12px', backgroundColor: 'var(--le-bg)', borderRadius: '6px', borderLeft: '4px solid var(--le-accent)' }}>
                        <p style={{ margin: 0, fontSize: '13px', fontWeight: 'bold', marginBottom: '5px' }}>FOR CAT OWNERS:</p>
                        <p style={{ margin: 0, fontSize: '13px' }}>{item.catImpact}</p>
                      </div>
                    </div>
                    <div>
                      <p style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '10px' }}>QUESTIONS TO ASK:</p>
                      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                        {item.questions.map((q, qidx) => (
                          <li key={qidx} style={{ marginBottom: '6px', paddingLeft: '20px', position: 'relative', fontSize: '13px' }}>
                            <span style={{ position: 'absolute', left: 0, color: 'var(--le-primary)' }}>Q:</span>
                            {q}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Home Features Checklist */}
      <section id="checklist" style={{ padding: '60px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '15px', textAlign: 'center' }}>Pet-Friendly Home Checklist</h2>
        <p style={{ textAlign: 'center', color: 'var(--le-text-secondary)', marginBottom: '40px', fontSize: '16px' }}>
          Use this checklist when touring homes. Aim for at least 12/16 items.
        </p>
        <div
          style={{
            backgroundColor: 'var(--le-bg-card)',
            borderRadius: '12px',
            padding: '30px',
            border: '2px solid var(--le-primary)',
          }}
        >
          <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 'bold' }}>Progress</h3>
            <div
              style={{
                fontSize: '18px',
                fontWeight: 'bold',
                color: checkedCount >= 12 ? 'var(--le-success)' : 'var(--le-warning)',
              }}
            >
              {checkedCount}/16
            </div>
          </div>
          <div
            style={{
              backgroundColor: 'var(--le-border)',
              height: '12px',
              borderRadius: '6px',
              marginBottom: '30px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                backgroundColor: checkedCount >= 12 ? 'var(--le-success)' : 'var(--le-warning)',
                height: '100%',
                width: `${(checkedCount / 16) * 100}%`,
                transition: 'width 0.3s ease',
              }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '15px' }}>
            {checklistItems.map((item, idx) => (
              <label
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '12px',
                  backgroundColor: checklist[item] ? 'var(--le-success)' : 'var(--le-bg)',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  border: '1px solid var(--le-border)',
                  transition: 'all 0.2s ease',
                }}
              >
                <input
                  type="checkbox"
                  checked={checklist[item] || false}
                  onChange={() => handleChecklistToggle(item)}
                  style={{
                    marginRight: '12px',
                    width: '20px',
                    height: '20px',
                    cursor: 'pointer',
                  }}
                />
                <span
                  style={{
                    fontSize: '14px',
                    color: checklist[item] ? 'white' : 'var(--le-text)',
                    fontWeight: checklist[item] ? 'bold' : 'normal',
                  }}
                >
                  {item}
                </span>
              </label>
            ))}
          </div>
        </div>
      </section>

      {/* Pet-Proofing Guide */}
      <section style={{ padding: '60px 20px', backgroundColor: 'var(--le-bg-card)', borderTop: '1px solid var(--le-border)', borderBottom: '1px solid var(--le-border)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '40px', textAlign: 'center' }}>Pet-Proofing Guide: Room by Room</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '25px' }}>
            {safetyTips.map((section, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: 'var(--le-bg)',
                  padding: '25px',
                  borderRadius: '12px',
                  border: '1px solid var(--le-border)',
                }}
              >
                <h3 style={{ fontWeight: 'bold', marginBottom: '15px', fontSize: '20px' }}>
                  {idx === 0 ? '🍳' : idx === 1 ? '🚿' : idx === 2 ? '🛏️' : idx === 3 ? '🛋️' : idx === 4 ? '🔧' : '🌳'} {section.room}
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {section.tips.map((tip, tipIdx) => (
                    <li key={tipIdx} style={{ marginBottom: '12px', paddingLeft: '20px', position: 'relative', fontSize: '13px', color: 'var(--le-text-secondary)' }}>
                      <span style={{ position: 'absolute', left: 0, color: 'var(--le-primary)', fontWeight: 'bold' }}>•</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Insurance Considerations */}
      <section style={{ padding: '60px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '40px', textAlign: 'center' }}>Insurance Considerations</h2>
        <div style={{ display: 'grid', gap: '20px' }}>
          {insuranceConsiderations.map((item, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: 'var(--le-bg-card)',
                padding: '25px',
                borderRadius: '12px',
                border: '1px solid var(--le-border)',
                borderLeft: '4px solid var(--le-primary)',
              }}
            >
              <h3 style={{ fontWeight: 'bold', marginBottom: '12px', fontSize: '18px' }}>🛡️ {item.topic}</h3>
              <p style={{ marginBottom: '12px', color: 'var(--le-text-secondary)' }}>{item.description}</p>
              <div style={{ marginBottom: '12px', padding: '10px', backgroundColor: 'var(--le-bg)', borderRadius: '6px', borderLeft: '3px solid var(--le-danger)' }}>
                <p style={{ margin: 0, fontSize: '12px', fontWeight: 'bold', marginBottom: '4px' }}>RISK:</p>
                <p style={{ margin: 0, fontSize: '12px', color: 'var(--le-danger)' }}>{item.risk}</p>
              </div>
              <div style={{ padding: '10px', backgroundColor: 'var(--le-bg)', borderRadius: '6px', borderLeft: '3px solid var(--le-success)' }}>
                <p style={{ margin: 0, fontSize: '12px', fontWeight: 'bold', marginBottom: '4px' }}>ACTION:</p>
                <p style={{ margin: 0, fontSize: '12px', color: 'var(--le-success)' }}>{item.action}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pet-Friendly Renovations */}
      <section style={{ padding: '60px 20px', backgroundColor: 'var(--le-bg-card)', borderTop: '1px solid var(--le-border)', borderBottom: '1px solid var(--le-border)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '40px', textAlign: 'center' }}>Pet-Friendly Renovations & Upgrades</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            {renovationIdeas.map((item, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: 'var(--le-bg)',
                  padding: '25px',
                  borderRadius: '12px',
                  border: '1px solid var(--le-border)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                  <h3 style={{ fontWeight: 'bold', margin: 0, fontSize: '18px' }}>{item.feature}</h3>
                  <span style={{ padding: '6px 12px', backgroundColor: 'var(--le-primary)', color: 'white', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', whiteSpace: 'nowrap' }}>
                    {item.cost}
                  </span>
                </div>
                <p style={{ marginBottom: '12px', fontSize: '13px', color: 'var(--le-text-secondary)' }}>{item.benefits}</p>
                <div style={{ padding: '12px', backgroundColor: 'var(--le-bg-card)', borderRadius: '6px', fontSize: '12px', color: 'var(--le-text-secondary)' }}>
                  <strong>Note:</strong> {item.considerations}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cost Calculator */}
      <section id="calculator" style={{ padding: '60px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '40px', textAlign: 'center' }}>Pet-Friendly Home Cost Estimate</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'start' }}>
          <div>
            <div style={{ backgroundColor: 'var(--le-bg-card)', padding: '30px', borderRadius: '12px', border: '1px solid var(--le-border)' }}>
              <div style={{ marginBottom: '25px' }}>
                <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold', fontSize: '14px' }}>Number of Pets: {costCalculatorData.petCount}</label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={costCalculatorData.petCount}
                  onChange={(e) => setCostCalculatorData({ ...costCalculatorData, petCount: Number(e.target.value) })}
                  style={{ width: '100%', height: '8px', borderRadius: '4px', cursor: 'pointer' }}
                />
              </div>

              <div style={{ marginBottom: '25px' }}>
                <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold', fontSize: '14px' }}>Home Age</label>
                <div style={{ display: 'grid', gap: '8px' }}>
                  {['new', 'mid', 'old'].map((age) => (
                    <label key={age} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', fontSize: '14px' }}>
                      <input
                        type="radio"
                        name="homeAge"
                        value={age}
                        checked={costCalculatorData.homeAge === age}
                        onChange={(e) => setCostCalculatorData({ ...costCalculatorData, homeAge: e.target.value })}
                        style={{ marginRight: '8px', width: '16px', height: '16px', cursor: 'pointer' }}
                      />
                      {age === 'new' ? 'New/Modern (< 10 yrs)' : age === 'mid' ? 'Mid-age (10-25 yrs)' : 'Older (25+ yrs)'}
                    </label>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: '25px' }}>
                <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold', fontSize: '14px' }}>Renovation Level</label>
                <div style={{ display: 'grid', gap: '8px' }}>
                  {['basic', 'moderate', 'extensive'].map((level) => (
                    <label key={level} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', fontSize: '14px' }}>
                      <input
                        type="radio"
                        name="renovationLevel"
                        value={level}
                        checked={costCalculatorData.renovationLevel === level}
                        onChange={(e) => setCostCalculatorData({ ...costCalculatorData, renovationLevel: e.target.value })}
                        style={{ marginRight: '8px', width: '16px', height: '16px', cursor: 'pointer' }}
                      />
                      {level === 'basic' ? 'Basic ($2K)' : level === 'moderate' ? 'Moderate ($5K)' : 'Extensive ($12K+)'}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div>
            <div style={{ backgroundColor: 'var(--le-bg-card)', padding: '30px', borderRadius: '12px', border: '1px solid var(--le-border)' }}>
              <h3 style={{ fontWeight: 'bold', marginBottom: '25px', fontSize: '18px' }}>Your Estimate</h3>

              <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: 'var(--le-bg)', borderRadius: '8px', borderLeft: '4px solid var(--le-primary)' }}>
                <p style={{ margin: 0, fontSize: '12px', color: 'var(--le-text-secondary)', marginBottom: '5px' }}>Monthly Maintenance Cost</p>
                <p style={{ margin: 0, fontSize: '28px', fontWeight: 'bold', color: 'var(--le-primary)' }}>${costs.monthlyEstimate}</p>
              </div>

              <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: 'var(--le-bg)', borderRadius: '8px', borderLeft: '4px solid var(--le-accent)' }}>
                <p style={{ margin: 0, fontSize: '12px', color: 'var(--le-text-secondary)', marginBottom: '5px' }}>Annual Estimate</p>
                <p style={{ margin: 0, fontSize: '24px', fontWeight: 'bold', color: 'var(--le-accent)' }}>${costs.annualEstimate.toLocaleString()}</p>
              </div>

              <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: 'var(--le-bg)', borderRadius: '8px', borderLeft: '4px solid var(--le-warning)' }}>
                <p style={{ margin: 0, fontSize: '12px', color: 'var(--le-text-secondary)', marginBottom: '5px' }}>Upfront Renovation Cost</p>
                <p style={{ margin: 0, fontSize: '24px', fontWeight: 'bold', color: 'var(--le-warning)' }}>${costs.renovationTotal.toLocaleString()}</p>
              </div>

              <div style={{ padding: '15px', backgroundColor: 'var(--le-bg)', borderRadius: '8px', borderLeft: '4px solid var(--le-success)' }}>
                <p style={{ margin: 0, fontSize: '12px', color: 'var(--le-text-secondary)', marginBottom: '5px' }}>Break-even Timeline</p>
                <p style={{ margin: 0, fontSize: '18px', fontWeight: 'bold', color: 'var(--le-success)' }}>~{costs.yearsToBreakEven} years</p>
                <p style={{ margin: '8px 0 0', fontSize: '11px', color: 'var(--le-text-secondary)' }}>Renovation pays for itself through cleaner, safer home.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section style={{ padding: '60px 20px', backgroundColor: 'var(--le-bg-card)', borderTop: '1px solid var(--le-border)', borderBottom: '1px solid var(--le-border)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '40px', textAlign: 'center' }}>Frequently Asked Questions</h2>
          <div style={{ display: 'grid', gap: '15px' }}>
            {faqs.map((item, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: 'var(--le-bg)',
                  border: '1px solid var(--le-border)',
                  borderRadius: '8px',
                  overflow: 'hidden',
                }}
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                  style={{
                    width: '100%',
                    padding: '20px',
                    backgroundColor: 'var(--le-bg)',
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '16px',
                    fontWeight: 'bold',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--le-bg-card)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--le-bg)';
                  }}
                >
                  <span>❓ {item.question}</span>
                  <span style={{ fontSize: '20px' }}>{expandedFaq === idx ? '−' : '+'}</span>
                </button>
                {expandedFaq === idx && (
                  <div style={{ padding: '20px', backgroundColor: 'var(--le-bg-card)', borderTop: '1px solid var(--le-border)' }}>
                    <p style={{ margin: 0, color: 'var(--le-text-secondary)', lineHeight: '1.7' }}>{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Capture CTA */}
      <section style={{ padding: '60px 20px', backgroundColor: 'linear-gradient(135deg, var(--le-primary) 0%, #059669 100%)', color: 'white' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '15px', textAlign: 'center' }}>Ready to Find Your Pet\u2019s Perfect Home?</h2>
          <p style={{ textAlign: 'center', marginBottom: '30px', fontSize: '16px', opacity: 0.95 }}>
            Get personalized recommendations for pet-friendly homes in your area. Our real estate experts understand what matters to pet owners.
          </p>

          <form onSubmit={handleLeadCapture} style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', padding: '30px', borderRadius: '12px', backdropFilter: 'blur(10px)' }}>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', fontSize: '14px' }}>What pet(s) are you buying for?</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                {(['dog', 'cat', 'both'] as const).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setPetType(type)}
                    style={{
                      padding: '10px',
                      backgroundColor: petType === type ? 'white' : 'rgba(255, 255, 255, 0.2)',
                      color: petType === type ? 'var(--le-primary)' : 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontWeight: 'bold',
                      fontSize: '14px',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {type === 'dog' ? '🐕 Dogs' : type === 'cat' ? '🐱 Cats' : '🐕🐱 Both'}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', fontSize: '14px' }}>Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '14px',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', fontSize: '14px' }}>Phone Number (Optional)</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="(555) 123-4567"
                style={{
                  width: '100%',
                  padding: '12px',
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '14px',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            <button
              type="submit"
              style={{
                width: '100%',
                padding: '14px',
                backgroundColor: 'white',
                color: 'var(--le-primary)',
                border: 'none',
                borderRadius: '6px',
                fontWeight: 'bold',
                fontSize: '16px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              Get Pet-Friendly Home Recommendations
            </button>

            <p style={{ marginTop: '15px', fontSize: '12px', opacity: 0.85, textAlign: 'center' }}>
              We\u2019ll send you curated listings and expert tips for pet owners. No spam, just helpful advice.
            </p>
          </form>
        </div>
      </section>

      {/* Footer CTA */}
      <section style={{ padding: '40px 20px', backgroundColor: 'var(--le-bg-card)', textAlign: 'center', borderTop: '1px solid var(--le-border)' }}>
        <p style={{ maxWidth: '700px', margin: '0 auto', color: 'var(--le-text-secondary)' }}>
          Finding a pet-friendly home is about more than just allowing pets\u2014it\u2019s about creating a space where your furry family thrives. Use this guide to evaluate neighborhoods, verify policies, and plan renovations. Your future home is out there!
        </p>
      </section>
    </div>
  );
}
