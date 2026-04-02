'use client';

import React, { useState, useEffect } from 'react';

export default function MovingChecklistPage() {
  const [moveDate, setMoveDate] = useState('');
  const [daysRemaining, setDaysRemaining] = useState<number | null>(null);
  const [checkedTasks, setCheckedTasks] = useState<Record<string, boolean>>({});
  const [homeSize, setHomeSize] = useState('');
  const [distance, setDistance] = useState('');
  const [serviceType, setServiceType] = useState('full');
  const [estimatedCost, setEstimatedCost] = useState<number | null>(null);
  const [email, setEmail] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  useEffect(() => {
    if (moveDate) {
      const moveDateObj = new Date(moveDate);
      const today = new Date();
      const diff = moveDateObj.getTime() - today.getTime();
      const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
      setDaysRemaining(days >= 0 ? days : 0);
    }
  }, [moveDate]);

  const calculateCost = () => {
    if (!homeSize || !distance) return;

    let baseCost = 0;
    switch (homeSize) {
      case 'studio':
        baseCost = 2500;
        break;
      case '1bed':
        baseCost = 3500;
        break;
      case '2bed':
        baseCost = 5000;
        break;
      case '3bed':
        baseCost = 7000;
        break;
      case '4bed':
        baseCost = 9500;
        break;
      default:
        baseCost = 5000;
    }

    const distanceNum = parseInt(distance) || 0;
    const distanceCost = distanceNum * 1.5;

    const serviceFactor = serviceType === 'full' ? 1 : 0.4;
    const total = (baseCost + distanceCost) * serviceFactor;

    setEstimatedCost(Math.round(total));
  };

  const toggleTask = (taskId: string) => {
    setCheckedTasks(prev => ({
      ...prev,
      [taskId]: !prev[taskId]
    }));
  };

  const timelinePhases = [
    {
      name: '8 Weeks Before',
      tasks: [
        { id: '8w-1', text: 'Create a moving binder or folder for all paperwork' },
        { id: '8w-2', text: 'Start researching moving companies and get quotes' },
        { id: '8w-3', text: 'Begin collecting boxes and packing supplies' },
        { id: '8w-4', text: 'Review your lease agreement and move-out requirements' },
        { id: '8w-5', text: 'Take inventory of all belongings' },
        { id: '8w-6', text: 'Start selling or donating unwanted items' },
        { id: '8w-7', text: 'Plan your moving budget and get organized' },
        { id: '8w-8', text: 'Notify your current landlord (if renting)' },
        { id: '8w-9', text: 'Schedule utility disconnections and transfers' },
        { id: '8w-10', text: 'Update important documents with your address' }
      ]
    },
    {
      name: '6 Weeks Before',
      tasks: [
        { id: '6w-1', text: 'Book your moving company' },
        { id: '6w-2', text: 'Book mover utilities (water, electricity, gas)' },
        { id: '6w-3', text: 'Reduce your belongings by 25%' },
        { id: '6w-4', text: 'Send change of address to postal service' },
        { id: '6w-5', text: 'Notify your employer of new address' },
        { id: '6w-6', text: 'Update subscriptions and memberships' },
        { id: '6w-7', text: 'Start using up pantry and freezer items' },
        { id: '6w-8', text: 'Schedule internet installation at new address' },
        { id: '6w-9', text: 'Make a copy of important documents' },
        { id: '6w-10', text: 'Contact schools if relocating with children' }
      ]
    },
    {
      name: '4 Weeks Before',
      tasks: [
        { id: '4w-1', text: 'Label and organize all boxes by room' },
        { id: '4w-2', text: 'Reduce belongings by another 20%' },
        { id: '4w-3', text: 'Update address on insurance policies' },
        { id: '4w-4', text: 'Notify banks, credit card companies, and investments' },
        { id: '4w-5', text: 'Transfer or close local vendor accounts' },
        { id: '4w-6', text: 'Arrange pet moving and veterinary records' },
        { id: '4w-7', text: 'Notify your doctor and dentist' },
        { id: '4w-8', text: 'Get new car registration if moving states' },
        { id: '4w-9', text: 'Continue packing non-essential items' },
        { id: '4w-10', text: 'Plan your moving day logistics' }
      ]
    },
    {
      name: '2 Weeks Before',
      tasks: [
        { id: '2w-1', text: 'Confirm all moving arrangements' },
        { id: '2w-2', text: 'Make sure utilities are scheduled for disconnect and reconnect' },
        { id: '2w-3', text: 'Schedule final utility meter readings' },
        { id: '2w-4', text: 'Defrost and clean your freezer' },
        { id: '2w-5', text: 'Use up frozen foods and perishables' },
        { id: '2w-6', text: 'Return borrowed items' },
        { id: '2w-7', text: 'Pack most of your belongings' },
        { id: '2w-8', text: 'Clean out and organize your garage' },
        { id: '2w-9', text: 'Confirm time with your moving company' },
        { id: '2w-10', text: 'Start packing a "first night" box' }
      ]
    },
    {
      name: '1 Week Before',
      tasks: [
        { id: '1w-1', text: 'Pack all remaining items except daily necessities' },
        { id: '1w-2', text: 'Confirm utilities will be connected on moving day' },
        { id: '1w-3', text: 'Clean behind and under appliances' },
        { id: '1w-4', text: 'Dispose of hazardous materials properly' },
        { id: '1w-5', text: 'Return library books and rental items' },
        { id: '1w-6', text: 'Prepare children and pets for the move' },
        { id: '1w-7', text: 'Pack an essentials bag for each family member' },
        { id: '1w-8', text: 'Obtain copies of utility readings' },
        { id: '1w-9', text: 'Prepare detailed moving checklist for moving day' },
        { id: '1w-10', text: 'Confirm your moving company\u2019s arrival time' }
      ]
    },
    {
      name: 'Moving Day',
      tasks: [
        { id: 'md-1', text: 'Do a final walkthrough of every room' },
        { id: 'md-2', text: 'Check all closets, drawers, and cabinets' },
        { id: 'md-3', text: 'Lock all windows and doors' },
        { id: 'md-4', text: 'Turn off all lights and appliances' },
        { id: 'md-5', text: 'Verify utilities are turned off (except what\u2019s needed temporarily)' },
        { id: 'md-6', text: 'Take meter readings for final billing' },
        { id: 'md-7', text: 'Take photos of empty rooms for records' },
        { id: 'md-8', text: 'Check for forgotten items in the yard' },
        { id: 'md-9', text: 'Say goodbye to neighbors' },
        { id: 'md-10', text: 'Give keys to landlord or new owner' }
      ]
    },
    {
      name: 'After Moving',
      tasks: [
        { id: 'am-1', text: 'Unpack and arrange essentials first' },
        { id: 'am-2', text: 'Test all utilities and appliances' },
        { id: 'am-3', text: 'Locate circuit breaker, water shut-off, and thermostat' },
        { id: 'am-4', text: 'Update your address with remaining companies' },
        { id: 'am-5', text: 'Register to vote at your new address' },
        { id: 'am-6', text: 'Update address with your state driver\u2019s license' },
        { id: 'am-7', text: 'Explore your new neighborhood' },
        { id: 'am-8', text: 'Unpack gradually and organize by priority' },
        { id: 'am-9', text: 'File all moving and utility paperwork' },
        { id: 'am-10', text: 'Schedule a housewarming and invite friends' }
      ]
    }
  ];

  const packingTips = {
    kitchen: [
      'Wrap dishes in paper towels individually',
      'Pack plates vertically like records',
      'Use smaller boxes—they\u2019ll be easier to lift',
      'Pack glasses with crumpled paper, not newspaper',
      'Empty, defrost, and clean your refrigerator',
      'Use plastic bags for items inside pots and pans',
      'Label boxes with contents and room destination',
      'Pack heavy items in small boxes, light items in large boxes'
    ],
    bedroom: [
      'Keep bedding on your bed until moving day',
      'Pack out-of-season clothing in vacuum bags',
      'Leave hangers on clothes and group in plastic bags',
      'Use suitcases for clothing to save box space',
      'Pack one outfit for each family member in a labeled box',
      'Remove drawers from dressers if possible',
      'Wrap mirrors and framed art in blankets',
      'Take photos of furniture assembly for reference'
    ],
    bathroom: [
      'Pack toiletries in plastic bins for easy access',
      'Use a shower caddy for frequently used items',
      'Empty and dry the medicine cabinet completely',
      'Store medications separately with clear labels',
      'Pack toilet paper accessible for the first night',
      'Use ziplock bags for liquids to prevent spills',
      'Label boxes clearly—these items are often needed first',
      'Keep a shower supplies box separate'
    ],
    livingroom: [
      'Take a photo of how electronics are connected',
      'Use painter\u2019s tape to label cords and connections',
      'Pack TV in its original box if available',
      'Disassemble furniture in reverse order of assembly',
      'Wrap upholstered furniture in plastic sheeting',
      'Keep all hardware in labeled baggies',
      'Pack books in small boxes—they get heavy quickly',
      'Wrap picture frames individually with blankets'
    ],
    garage: [
      'Dispose of old paint, chemicals, and hazardous materials',
      'Use smaller boxes for tools—they\u2019re heavy',
      'Organize tools in a caddy or toolbox',
      'Keep important tools accessible, not packed',
      'Label boxes by tool type for easy unpacking',
      'Empty and clean the garage completely',
      'Take photos of storage system for reference',
      'Consider selling or donating unused items'
    ],
    office: [
      'Backup all digital data before moving',
      'Take photos of cord and cable connections',
      'Use color-coded labels for different cable types',
      'Pack office supplies in a portable caddy',
      'Keep important documents in a separate box',
      'Organize files before packing them',
      'Take photos of how furniture is arranged',
      'Pack desk accessories in clearly labeled boxes'
    ]
  };

  const utilityServices = [
    { name: 'Electricity', tips: 'Schedule disconnect 2-3 days after move, reconnect 2-3 days before' },
    { name: 'Natural Gas', tips: 'Arrange disconnect inspection, ensure safe disconnection' },
    { name: 'Water & Sewer', tips: 'Cancel old account, set up new service before moving day' },
    { name: 'Internet & Cable', tips: 'Order new service 2-3 weeks in advance, schedule installation' },
    { name: 'Trash & Recycling', tips: 'Cancel old service, set up new collection schedules' },
    { name: 'Renter\u2019s Insurance', tips: 'Transfer policy to new address or get new quote' },
    { name: 'Phone Service', tips: 'Update address with provider, get new local numbers if needed' },
    { name: 'Lawn & Snow Service', tips: 'Cancel old service, arrange new service for new property' }
  ];

  const changeOfAddressList = [
    { category: 'Financial', items: ['Banks & Credit Unions', 'Credit Card Companies', 'Investment Accounts', 'Insurance Companies', 'Loan Servicers'] },
    { category: 'Government', items: ['USPS (Mail Forwarding)', 'DMV/Driver License', 'Voter Registration', 'Passport Office', 'Tax Authority'] },
    { category: 'Health', items: ['Doctor & Dentist', 'Pharmacy', 'Hospital Records', 'Health Insurance', 'Veterinarian'] },
    { category: 'Subscriptions', items: ['Streaming Services', 'Magazines & Newspapers', 'Membership Clubs', 'Online Shopping', 'Professional Services'] },
    { category: 'Utilities & Services', items: ['Electric Company', 'Gas Company', 'Water Company', 'Internet Provider', 'Trash Service'] }
  ];

  const movingCompanyTips = {
    whatToLookFor: [
      'Licensed and insured moving company',
      'Positive reviews and complaints history',
      'Detailed written estimates',
      'Years in business and reputation',
      'Local or interstate moving expertise',
      'Range of services offered',
      'Transparent pricing structure',
      'Professional staff and equipment'
    ],
    questionsToAsk: [
      'How long have you been in business?',
      'Are you licensed and insured?',
      'What does your estimate include?',
      'Do you have references from recent clients?',
      'What is your damage claim process?',
      'Do you handle specialty items?',
      'What is your cancellation policy?',
      'Can you accommodate my moving date?',
      'Do you offer packing and unpacking services?',
      'What payment methods do you accept?'
    ],
    redFlags: [
      'Unwilling to provide written estimate',
      'Quote significantly lower than competitors',
      'No proper licensing or insurance',
      'Negative online reviews or complaints',
      'Demands large upfront deposit',
      'No physical office or phone number',
      'Pressure to sign contract immediately',
      'Reluctance to discuss experience',
      'No clear breakdown of pricing',
      'Hidden fees not mentioned upfront'
    ]
  };

  const firstNightEssentials = [
    'Phone chargers and power strips',
    'Toiletries and medications',
    'Change of clothes for each family member',
    'Pajamas and undergarments',
    'Important documents and valuables',
    'Pet food, water, and litter box',
    'Children\u2019s comfort items and toys',
    'Basic kitchen items: dishes, cups, utensils',
    'Can opener and basic tools',
    'Toilet paper and paper towels',
    'Hand soap and cleaning supplies',
    'Bedding and pillows',
    'Coffee maker and favorite beverages',
    'Snacks and quick meal items',
    'Baby items (if applicable)',
    'Pet bed and collar',
    'Important pet records',
    'Cash and ID'
  ];

  const kidsAndPets = {
    kids: [
      'Involve them in the packing process',
      'Let them decorate their new room',
      'Visit the new school before moving',
      'Plan a neighborhood exploration',
      'Set up their room first for familiarity',
      'Arrange playdates with new neighbors',
      'Keep familiar items and routines',
      'Pack a "comfort box" with favorite toys',
      'Take photos of old home and room',
      'Create a moving day adventure plan'
    ],
    pets: [
      'Update microchip registration with new address',
      'Schedule veterinary records transfer',
      'Get pet carriers cleaned and prepared',
      'Arrange for pet boarding during move if needed',
      'Keep pets away from moving commotion',
      'Ensure identification tags are current',
      'Pack pet essentials in an accessible box',
      'Plan pet-safe routes in new home',
      'Keep pets indoors until acclimated',
      'Research new veterinary services',
      'Prepare a pet comfort kit',
      'Allow adjustment time in new home'
    ]
  };

  const getProgressPercentage = (phase: typeof timelinePhases[0]) => {
    const completedTasks = phase.tasks.filter(task => checkedTasks[task.id]).length;
    return Math.round((completedTasks / phase.tasks.length) * 100);
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setEmailSubmitted(true);
      setEmail('');
      setTimeout(() => setEmailSubmitted(false), 3000);
    }
  };

  return (
    <div style={{ backgroundColor: 'var(--le-bg)', color: 'var(--le-text)', fontFamily: 'system-ui, -apple-system, sans-serif', lineHeight: 1.6 }}>
      {/* Hero Section */}
      <section style={{
        backgroundColor: 'var(--le-primary)',
        color: 'white',
        padding: '60px 20px',
        textAlign: 'center'
      }}>
        <h1 style={{ fontSize: '3em', marginBottom: '20px', fontWeight: 'bold' }}>Your Complete Moving Checklist</h1>
        <p style={{ fontSize: '1.2em', marginBottom: '40px', opacity: 0.9 }}>Stay organized every step of the way with our comprehensive moving guide</p>

        <div style={{
          display: 'flex',
          gap: '20px',
          justifyContent: 'center',
          flexWrap: 'wrap',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          <div>
            <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>When\u2019s your move?</label>
            <input
              type="date"
              value={moveDate}
              onChange={(e) => setMoveDate(e.target.value)}
              style={{
                padding: '12px',
                borderRadius: '6px',
                border: 'none',
                fontSize: '1em',
                minWidth: '200px'
              }}
            />
          </div>
          {daysRemaining !== null && (
            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              padding: '20px 30px',
              borderRadius: '6px',
              alignSelf: 'flex-end'
            }}>
              <p style={{ margin: '0', fontWeight: 'bold', fontSize: '1.5em' }}>{daysRemaining} days to go!</p>
            </div>
          )}
        </div>
      </section>

      {/* Timeline Checklist */}
      <section style={{ padding: '60px 20px', maxWidth: '1000px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '2.5em', marginBottom: '40px', fontWeight: 'bold' }}>Moving Timeline Checklist</h2>

        <div style={{ display: 'grid', gap: '30px' }}>
          {timelinePhases.map((phase, idx) => {
            const progress = getProgressPercentage(phase);
            return (
              <div
                key={idx}
                style={{
                  backgroundColor: 'var(--le-bg-card)',
                  borderLeft: `4px solid var(--le-primary)`,
                  padding: '30px',
                  borderRadius: '8px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h3 style={{ fontSize: '1.5em', margin: '0', fontWeight: 'bold' }}>{phase.name}</h3>
                  <div style={{
                    backgroundColor: progress === 100 ? 'var(--le-success)' : 'var(--le-primary)',
                    color: 'white',
                    padding: '8px 16px',
                    borderRadius: '20px',
                    fontWeight: 'bold'
                  }}>
                    {progress}% Complete
                  </div>
                </div>

                {/* Progress Bar */}
                <div style={{
                  backgroundColor: 'var(--le-border)',
                  height: '8px',
                  borderRadius: '4px',
                  overflow: 'hidden',
                  marginBottom: '25px'
                }}>
                  <div
                    style={{
                      backgroundColor: progress === 100 ? 'var(--le-success)' : 'var(--le-primary)',
                      height: '100%',
                      width: `${progress}%`,
                      transition: 'width 0.3s ease'
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gap: '12px' }}>
                  {phase.tasks.map(task => (
                    <label
                      key={task.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        cursor: 'pointer',
                        padding: '8px',
                        borderRadius: '4px',
                        backgroundColor: checkedTasks[task.id] ? 'rgba(76, 175, 80, 0.1)' : 'transparent',
                        transition: 'background-color 0.2s'
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={checkedTasks[task.id] || false}
                        onChange={() => toggleTask(task.id)}
                        style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                      />
                      <span style={{
                        textDecoration: checkedTasks[task.id] ? 'line-through' : 'none',
                        color: checkedTasks[task.id] ? 'var(--le-text-secondary)' : 'var(--le-text)'
                      }}>
                        {task.text}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Moving Budget Calculator */}
      <section style={{
        backgroundColor: 'var(--le-bg-card)',
        padding: '60px 20px',
        borderTop: '1px solid var(--le-border)',
        borderBottom: '1px solid var(--le-border)'
      }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.5em', marginBottom: '40px', fontWeight: 'bold', textAlign: 'center' }}>Moving Budget Calculator</h2>

          <div style={{ display: 'grid', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Home Size</label>
              <select
                value={homeSize}
                onChange={(e) => setHomeSize(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '6px',
                  border: `1px solid var(--le-border)`,
                  fontSize: '1em',
                  backgroundColor: 'var(--le-bg)',
                  color: 'var(--le-text)'
                }}
              >
                <option value="">Select home size</option>
                <option value="studio">Studio / 1 room</option>
                <option value="1bed">1 Bedroom</option>
                <option value="2bed">2 Bedroom</option>
                <option value="3bed">3 Bedroom</option>
                <option value="4bed">4+ Bedroom</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Distance (miles)</label>
              <input
                type="number"
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
                placeholder="Enter distance"
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '6px',
                  border: `1px solid var(--le-border)`,
                  fontSize: '1em',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Service Type</label>
              <select
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '6px',
                  border: `1px solid var(--le-border)`,
                  fontSize: '1em',
                  backgroundColor: 'var(--le-bg)',
                  color: 'var(--le-text)'
                }}
              >
                <option value="full">Full-Service Moving</option>
                <option value="diy">DIY / Labor Only</option>
              </select>
            </div>

            <button
              onClick={calculateCost}
              style={{
                backgroundColor: 'var(--le-primary)',
                color: 'white',
                padding: '14px',
                borderRadius: '6px',
                border: 'none',
                fontSize: '1em',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'background-color 0.3s'
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = 'var(--le-primary-hover)')}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'var(--le-primary)')}
            >
              Calculate Estimate
            </button>

            {estimatedCost !== null && (
              <div style={{
                backgroundColor: 'var(--le-primary)',
                color: 'white',
                padding: '25px',
                borderRadius: '6px',
                textAlign: 'center'
              }}>
                <p style={{ margin: '0 0 10px 0', fontSize: '0.9em', opacity: 0.9 }}>Estimated Cost</p>
                <p style={{ margin: '0', fontSize: '2.5em', fontWeight: 'bold' }}>${estimatedCost.toLocaleString()}</p>
                <p style={{ margin: '10px 0 0 0', fontSize: '0.85em', opacity: 0.8 }}>Based on your home size and distance</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Packing Tips by Room */}
      <section style={{ padding: '60px 20px', maxWidth: '1000px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '2.5em', marginBottom: '40px', fontWeight: 'bold' }}>Packing Tips by Room</h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
          {Object.entries(packingTips).map(([room, tips]) => (
            <div
              key={room}
              style={{
                backgroundColor: 'var(--le-bg-card)',
                padding: '25px',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}
            >
              <h3 style={{
                fontSize: '1.4em',
                marginBottom: '20px',
                fontWeight: 'bold',
                textTransform: 'capitalize',
                borderBottom: `2px solid var(--le-primary)`,
                paddingBottom: '10px'
              }}>
                {room === 'livingroom' ? 'Living Room' : room === 'garage' ? 'Garage' : room === 'office' ? 'Office' : room.charAt(0).toUpperCase() + room.slice(1)}
              </h3>
              <ul style={{ margin: '0', paddingLeft: '20px' }}>
                {tips.map((tip, idx) => (
                  <li key={idx} style={{ marginBottom: '10px', color: 'var(--le-text-secondary)' }}>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Utility Transfer Guide */}
      <section style={{
        backgroundColor: 'var(--le-bg-card)',
        padding: '60px 20px',
        borderTop: '1px solid var(--le-border)',
        borderBottom: '1px solid var(--le-border)'
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.5em', marginBottom: '40px', fontWeight: 'bold' }}>Utility Transfer Guide</h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px' }}>
            {utilityServices.map((service, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: 'var(--le-bg)',
                  padding: '20px',
                  borderRadius: '8px',
                  borderLeft: `4px solid var(--le-primary)`,
                  boxShadow: '0 1px 4px rgba(0,0,0,0.1)'
                }}
              >
                <h4 style={{ margin: '0 0 10px 0', fontSize: '1.1em', fontWeight: 'bold' }}>{service.name}</h4>
                <p style={{ margin: '0', color: 'var(--le-text-secondary)', fontSize: '0.95em' }}>{service.tips}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Change of Address */}
      <section style={{ padding: '60px 20px', maxWidth: '1000px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '2.5em', marginBottom: '40px', fontWeight: 'bold' }}>Change of Address Checklist</h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '25px' }}>
          {changeOfAddressList.map((section, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: 'var(--le-bg-card)',
                padding: '25px',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}
            >
              <h3 style={{
                margin: '0 0 15px 0',
                fontSize: '1.2em',
                fontWeight: 'bold',
                color: 'var(--le-primary)',
                borderBottom: `2px solid var(--le-primary)`,
                paddingBottom: '10px'
              }}>
                {section.category}
              </h3>
              <ul style={{ margin: '0', paddingLeft: '20px' }}>
                {section.items.map((item, itemIdx) => (
                  <li key={itemIdx} style={{ marginBottom: '8px', color: 'var(--le-text-secondary)' }}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Moving Company Comparison */}
      <section style={{
        backgroundColor: 'var(--le-bg-card)',
        padding: '60px 20px',
        borderTop: '1px solid var(--le-border)',
        borderBottom: '1px solid var(--le-border)'
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.5em', marginBottom: '40px', fontWeight: 'bold' }}>Choosing the Right Moving Company</h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            {/* What to Look For */}
            <div style={{
              backgroundColor: 'var(--le-bg)',
              padding: '25px',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{
                fontSize: '1.3em',
                marginBottom: '20px',
                fontWeight: 'bold',
                color: 'var(--le-success)',
                borderBottom: `2px solid var(--le-success)`,
                paddingBottom: '10px'
              }}>
                ✓ What to Look For
              </h3>
              <ul style={{ margin: '0', paddingLeft: '20px' }}>
                {movingCompanyTips.whatToLookFor.map((item, idx) => (
                  <li key={idx} style={{ marginBottom: '10px', color: 'var(--le-text-secondary)' }}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Questions to Ask */}
            <div style={{
              backgroundColor: 'var(--le-bg)',
              padding: '25px',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{
                fontSize: '1.3em',
                marginBottom: '20px',
                fontWeight: 'bold',
                color: 'var(--le-accent)',
                borderBottom: `2px solid var(--le-accent)`,
                paddingBottom: '10px'
              }}>
                ? Questions to Ask
              </h3>
              <ul style={{ margin: '0', paddingLeft: '20px' }}>
                {movingCompanyTips.questionsToAsk.map((item, idx) => (
                  <li key={idx} style={{ marginBottom: '10px', color: 'var(--le-text-secondary)' }}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Red Flags */}
            <div style={{
              backgroundColor: 'var(--le-bg)',
              padding: '25px',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{
                fontSize: '1.3em',
                marginBottom: '20px',
                fontWeight: 'bold',
                color: 'var(--le-danger)',
                borderBottom: `2px solid var(--le-danger)`,
                paddingBottom: '10px'
              }}>
                ⚠ Red Flags
              </h3>
              <ul style={{ margin: '0', paddingLeft: '20px' }}>
                {movingCompanyTips.redFlags.map((item, idx) => (
                  <li key={idx} style={{ marginBottom: '10px', color: 'var(--le-text-secondary)' }}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Kids & Pets Section */}
      <section style={{ padding: '60px 20px', maxWidth: '1000px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '2.5em', marginBottom: '40px', fontWeight: 'bold' }}>Moving with Kids & Pets</h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '30px' }}>
          {/* Kids Section */}
          <div style={{
            backgroundColor: 'var(--le-bg-card)',
            padding: '30px',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{
              fontSize: '1.5em',
              marginBottom: '20px',
              fontWeight: 'bold',
              borderBottom: `3px solid var(--le-primary)`,
              paddingBottom: '10px'
            }}>
              👨‍👩‍👧‍👦 Moving with Children
            </h3>
            <ul style={{ margin: '0', paddingLeft: '20px' }}>
              {kidsAndPets.kids.map((item, idx) => (
                <li key={idx} style={{ marginBottom: '12px', color: 'var(--le-text-secondary)' }}>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Pets Section */}
          <div style={{
            backgroundColor: 'var(--le-bg-card)',
            padding: '30px',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{
              fontSize: '1.5em',
              marginBottom: '20px',
              fontWeight: 'bold',
              borderBottom: `3px solid var(--le-primary)`,
              paddingBottom: '10px'
            }}>
              🐾 Moving with Pets
            </h3>
            <ul style={{ margin: '0', paddingLeft: '20px' }}>
              {kidsAndPets.pets.map((item, idx) => (
                <li key={idx} style={{ marginBottom: '12px', color: 'var(--le-text-secondary)' }}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* First Night Essentials */}
      <section style={{
        backgroundColor: 'var(--le-bg-card)',
        padding: '60px 20px',
        borderTop: '1px solid var(--le-border)',
        borderBottom: '1px solid var(--le-border)'
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.5em', marginBottom: '40px', fontWeight: 'bold' }}>First Night Essentials Box</h2>

          <p style={{
            fontSize: '1.1em',
            color: 'var(--le-text-secondary)',
            marginBottom: '30px',
            lineHeight: '1.8'
          }}>
            Pack these items last and unpack them first. Keep this box with you during the move, not on the truck.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
            {firstNightEssentials.map((item, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: 'var(--le-bg)',
                  padding: '15px',
                  borderRadius: '6px',
                  borderLeft: `3px solid var(--le-primary)`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}
              >
                <span style={{ color: 'var(--le-primary)', fontSize: '1.3em' }}>📦</span>
                <span style={{ color: 'var(--le-text-secondary)' }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Capture */}
      <section style={{
        backgroundColor: 'var(--le-primary)',
        color: 'white',
        padding: '60px 20px',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '500px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.2em', marginBottom: '15px', fontWeight: 'bold' }}>Get Your Printable Moving Checklist</h2>
          <p style={{ fontSize: '1.1em', marginBottom: '30px', opacity: 0.95 }}>
            Download a complete, printable version of this checklist to keep with you throughout your move.
          </p>

          <form onSubmit={handleEmailSubmit} style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              required
              style={{
                padding: '14px',
                borderRadius: '6px',
                border: 'none',
                fontSize: '1em',
                boxSizing: 'border-box'
              }}
            />
            <button
              type="submit"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                color: 'white',
                padding: '14px',
                borderRadius: '6px',
                border: `2px solid white`,
                fontSize: '1em',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = 'white';
                e.currentTarget.style.color = 'var(--le-primary)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
                e.currentTarget.style.color = 'white';
              }}
            >
              Send Checklist to My Email
            </button>
          </form>

          {emailSubmitted && (
            <p style={{
              marginTop: '15px',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              padding: '12px',
              borderRadius: '6px'
            }}>
              ✓ Check your email for the checklist!
            </p>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        backgroundColor: 'var(--le-bg-card)',
        borderTop: '1px solid var(--le-border)',
        padding: '40px 20px',
        textAlign: 'center',
        color: 'var(--le-text-secondary)'
      }}>
        <p style={{ maxWidth: '800px', margin: '0 auto', lineHeight: '1.8' }}>
          This comprehensive moving checklist is designed to help you stay organized throughout every phase of your move.
          Whether you\u2019re relocating locally or long-distance, following this timeline and checklist will ensure you don\u2019t forget
          any important tasks. Happy moving!
        </p>
      </footer>

      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            'mainEntity': [
              {
                '@type': 'Question',
                'name': 'What should I do 8 weeks before moving?',
                'acceptedAnswer': {
                  '@type': 'Answer',
                  'text': 'Start researching moving companies, begin collecting boxes, review your lease agreement, take inventory of belongings, and start selling or donating unwanted items.'
                }
              },
              {
                '@type': 'Question',
                'name': 'How can I estimate my moving costs?',
                'acceptedAnswer': {
                  '@type': 'Answer',
                  'text': 'Use our moving budget calculator to enter your home size, distance, and service type (full-service or DIY) to get an estimated cost.'
                }
              },
              {
                '@type': 'Question',
                'name': 'What should be in my first night essentials box?',
                'acceptedAnswer': {
                  '@type': 'Answer',
                  'text': 'Include phone chargers, toiletries, medications, change of clothes, important documents, pet supplies, bedding, toilet paper, and basic kitchen items.'
                }
              },
              {
                '@type': 'Question',
                'name': 'What utilities do I need to transfer?',
                'acceptedAnswer': {
                  '@type': 'Answer',
                  'text': 'You\u2019ll need to transfer or set up electricity, gas, water, internet, trash service, and update insurance policies at your new address.'
                }
              }
            ]
          })
        }}
      />
    </div>
  );
}
