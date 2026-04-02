'use client';

import React, { useState, useMemo } from 'react';

// SVG Icons
const SmartHomeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M2 10.5L3 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2l1 6.5M5 13v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7" />
    <circle cx="12" cy="17" r="2" />
  </svg>
);

const ThermostatIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="7" />
    <path d="M12 1v6m0 10v6" />
    <circle cx="12" cy="12" r="4" fill="currentColor" opacity="0.3" />
  </svg>
);

const LockIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    <circle cx="12" cy="16" r="1" />
  </svg>
);

const LightIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M15 21H9v-2h6v2zM17.8 19.2a2.5 2.5 0 0 0-1.5-4.3H6.5a6 6 0 1 1 11.3 0 2.5 2.5 0 0 0-1.5 4.3L12 23" />
  </svg>
);

const CameraIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
    <circle cx="12" cy="13" r="4" />
  </svg>
);

const SpeakerIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="13" r="8" />
    <path d="M12 1v4m0 12v4M4.22 4.22l2.83 2.83m5.9 5.9l2.83 2.83M1 13h4m10 0h4M4.22 21.78l2.83-2.83m5.9-5.9l2.83-2.83" />
  </svg>
);

const HubIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="12" cy="12" r="1" fill="currentColor" />
    <circle cx="12" cy="2" r="1" />
    <circle cx="12" cy="22" r="1" />
    <circle cx="2" cy="12" r="1" />
    <circle cx="22" cy="12" r="1" />
  </svg>
);

const ShieldIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const ZapIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const ChefHatIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 2c3.3 0 6 2.7 6 6h4V8h-2v4a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V8H2v4h4c0-3.3 2.7-6 6-6z" />
    <path d="M4 20h16v2H4z" />
  </svg>
);

const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.5">
    <polyline points="16 4 9 17 4 12" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.5">
    <polyline points="5 8 10 13 15 8" />
  </svg>
);

const DollarIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);

const WifiIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 12.55a11 11 0 0 1 14.08 0M1.42 9a16 16 0 0 1 21.16 0M8.53 16.11a6 6 0 0 1 6.94 0" />
    <line x1="12" y1="20" x2="12.01" y2="20" />
  </svg>
);

const AlertIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3.04h16.94a2 2 0 0 0 1.71-3.04L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const SmartHomeGuidePage = () => {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [essentialsChecked, setEssentialsChecked] = useState<Record<number, boolean>>({});
  const [investmentScenario, setInvestmentScenario] = useState<'starter' | 'standard' | 'premium'>('standard');
  const [leadEmail, setLeadEmail] = useState('');
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  // Smart home essentials
  const essentials = [
    {
      name: 'Smart Thermostat',
      icon: ThermostatIcon,
      description: 'Learns your preferences and adjusts temperature automatically',
      benefits: ['10-15% energy savings', 'Remote temperature control', 'Heating/cooling schedules'],
      cost: '$200-500',
      brands: 'Nest, Ecobee, Honeywell',
    },
    {
      name: 'Smart Locks',
      icon: LockIcon,
      description: 'Keyless entry with remote access and activity logs',
      benefits: ['Hands-free entry', 'Guest access management', 'Real-time notifications'],
      cost: '$150-400',
      brands: 'August, Yale, Schlage',
    },
    {
      name: 'Smart Lighting',
      icon: LightIcon,
      description: 'Control brightness, color, and scheduling from anywhere',
      benefits: ['Energy savings', 'Automated scenes', 'Voice control compatible'],
      cost: '$15-60 per bulb',
      brands: 'Philips Hue, LIFX, Wyze',
    },
    {
      name: 'Security Cameras',
      icon: CameraIcon,
      description: 'Monitor your home with 24/7 video and cloud storage',
      benefits: ['Remote viewing', 'Motion detection alerts', 'Night vision'],
      cost: '$50-200 per camera',
      brands: 'Ring, Nest, Wyze',
    },
    {
      name: 'Smart Speakers',
      icon: SpeakerIcon,
      description: 'Voice control hub for music, information, and automation',
      benefits: ['Voice commands', 'Smart home control', 'Entertainment'],
      cost: '$30-200',
      brands: 'Amazon Echo, Google Home, Apple HomePod',
    },
    {
      name: 'Water Sensors',
      icon: WifiIcon,
      description: 'Detect leaks and monitor water usage in real-time',
      benefits: ['Leak detection', 'Water usage tracking', 'Pipe burst alerts'],
      cost: '$20-50 per sensor',
      brands: 'Eve, Fibaro, Wyze',
    },
  ];

  // Automation systems
  const automationSystems = [
    {
      name: 'Amazon Alexa',
      icon: SpeakerIcon,
      compatibility: '5000+ compatible devices',
      strengths: 'Largest device ecosystem, best for shopping/entertainment, affordable entry',
      setupTime: '15-30 minutes',
      cost: 'Free software, $30-200 for hub device',
    },
    {
      name: 'Google Home',
      icon: HubIcon,
      compatibility: '4000+ compatible devices',
      strengths: 'Seamless Google integration, strong search/information features',
      setupTime: '10-20 minutes',
      cost: 'Free software, $50-200 for hub device',
    },
    {
      name: 'Apple HomeKit',
      icon: SmartHomeIcon,
      compatibility: '2000+ compatible devices (growing)',
      strengths: 'Privacy-focused, excellent security, iOS integration',
      setupTime: '20-40 minutes',
      cost: 'Free software, $99+ for hub device',
    },
    {
      name: 'Home Assistant',
      icon: WifiIcon,
      compatibility: '3000+ integrations available',
      strengths: 'Open-source, local control, maximum customization',
      setupTime: '1-2 hours (more complex)',
      cost: 'Free software, $100-300 for hardware setup',
    },
  ];

  // Security systems
  const securityFeatures = [
    {
      name: 'Smart Alarm Systems',
      icon: ShieldIcon,
      description: 'Professional-grade monitoring with smartphone alerts',
      capabilities: 'Motion sensors, door/window sensors, siren, 24/7 monitoring',
      cost: '$200-500 equipment + $25-50/month monitoring',
    },
    {
      name: 'Video Doorbells',
      icon: CameraIcon,
      description: 'See and talk to visitors remotely in real-time',
      capabilities: 'HD video, two-way audio, motion detection, night vision',
      cost: '$100-300 per unit',
    },
    {
      name: 'Smart Window/Door Sensors',
      icon: LockIcon,
      description: 'Instant alerts when doors or windows open',
      capabilities: 'Real-time notifications, automation triggers, activity logs',
      cost: '$15-30 per sensor',
    },
    {
      name: 'Glass Break Sensors',
      icon: AlertIcon,
      description: 'Detects window or glass breakage and alerts immediately',
      capabilities: 'Sound detection, instant notifications, can trigger alarm',
      cost: '$25-50 per sensor',
    },
  ];

  // Energy management
  const energyFeatures = [
    {
      name: 'Smart Meter & Monitoring',
      icon: ZapIcon,
      description: 'Real-time tracking of energy usage by device',
      savings: '5-10% reduction through awareness',
      cost: '$200-400',
    },
    {
      name: 'Solar Integration',
      icon: LightIcon,
      description: 'Monitor solar production and optimize consumption',
      savings: '50-80% reduction with full solar system',
      cost: '$3,000-5,000+ (requires solar installation)',
    },
    {
      name: 'EV Charging Station',
      icon: ZapIcon,
      description: 'Smart charging that optimizes for off-peak rates',
      savings: '10-20% reduction in charging costs',
      cost: '$500-2,500 installation included',
    },
    {
      name: 'Smart Plugs & Power Strips',
      icon: ZapIcon,
      description: 'Monitor and control power consumption by outlet',
      savings: '5-15% reduction in phantom power draw',
      cost: '$15-30 per unit',
    },
  ];

  // Smart kitchen
  const kitchenDevices = [
    {
      name: 'Smart Refrigerator',
      icon: ChefHatIcon,
      features: 'Food inventory tracking, shopping list integration, remote monitoring',
      cost: '$800-3,000',
    },
    {
      name: 'Smart Oven/Range',
      icon: ChefHatIcon,
      features: 'Remote preheating, temperature monitoring, recipe guidance',
      cost: '$1,000-3,000',
    },
    {
      name: 'Smart Dishwasher',
      icon: ChefHatIcon,
      features: 'Remote start/stop, cycle optimization, energy tracking',
      cost: '$600-1,500',
    },
    {
      name: 'Smart Coffee Maker',
      icon: ChefHatIcon,
      features: 'Scheduled brewing, voice control, remote operation',
      cost: '$80-300',
    },
  ];

  // Investment scenarios
  const investmentScenarios = {
    starter: {
      title: 'Starter Setup',
      description: 'Essential smart home foundation',
      items: ['Smart speaker ($50-100)', 'Smart thermostat ($300)', 'Few smart bulbs ($60)', 'One smart lock ($250)'],
      initialCost: 660,
      annualSavings: 180,
      devices: 'Approximately 8-12 devices',
    },
    standard: {
      title: 'Standard Setup',
      description: 'Comprehensive home automation',
      items: ['Smart hub ($100)', 'Thermostat ($350)', 'Lights system ($300)', 'Door lock/video doorbell ($400)', 'Security cameras (2x$100)', 'Water sensors ($100)'],
      initialCost: 1350,
      annualSavings: 400,
      devices: 'Approximately 20-30 devices',
    },
    premium: {
      title: 'Premium Setup',
      description: 'Full smart home integration',
      items: ['Premium hub ($200)', 'Smart thermostat ($400)', 'Full lighting system ($800)', 'Smart locks (2x$350)', 'Security system ($400)', 'Camera system (4x$150)', 'Energy monitoring ($300)', 'Smart appliances ($2,000)'],
      initialCost: 4450,
      annualSavings: 1200,
      devices: 'Approximately 50+ devices',
    },
  };

  const selectedScenario = investmentScenarios[investmentScenario];
  const paybackYears = (selectedScenario.initialCost / selectedScenario.annualSavings).toFixed(1);
  const savingsYear10 = selectedScenario.annualSavings * 10;
  const savingsYear25 = selectedScenario.annualSavings * 25;

  // Future-proofing considerations
  const futureProofing = [
    {
      category: 'Wiring & Infrastructure',
      items: ['Ethernet runs to key locations', 'Conduit in walls for future cables', 'Multiple Wi-Fi access points', 'Dedicated smart home circuit breaker'],
    },
    {
      category: 'Bandwidth & Network',
      items: ['Minimum 25 Mbps broadband', 'Mesh Wi-Fi for whole home coverage', 'Separate 5GHz network for devices', 'Router replacement every 3-5 years'],
    },
    {
      category: 'Standards Compliance',
      items: ['Choose Matter-compatible devices', 'Avoid proprietary-only systems', 'Open-source integration options', 'Multi-platform hub support'],
    },
    {
      category: 'Storage & Backup',
      items: ['Local storage for critical devices', 'Cloud backup for video/data', 'Redundant internet connection option', 'Battery backup for smart locks'],
    },
  ];

  // Privacy concerns
  const privacyConsiderations = [
    {
      concern: 'Data Collection & Usage',
      details: 'Smart devices collect usage patterns, preferences, and sometimes voice/video data. Review manufacturer privacy policies carefully.',
      mitigation: 'Choose devices with local processing, use privacy-focused brands like Apple HomeKit, disable unnecessary data collection features.',
    },
    {
      concern: 'Network Security',
      details: 'Connected devices can be entry points for hackers if not properly secured. Default passwords and outdated firmware pose risks.',
      mitigation: 'Change all default passwords, enable two-factor authentication, update firmware regularly, use strong Wi-Fi encryption (WPA3).',
    },
    {
      concern: 'Third-Party Access',
      details: 'Companies may share data with partners, or be required to provide access to law enforcement.',
      mitigation: 'Read privacy policies, limit data sharing permissions, consider local-only control systems.',
    },
    {
      concern: 'Device Vulnerability',
      details: 'Older or discontinued devices may not receive security updates, leaving them vulnerable to exploits.',
      mitigation: 'Buy from established manufacturers, prioritize devices with long support lifespans, avoid end-of-life products.',
    },
  ];

  // FAQs
  const faqs = [
    {
      q: 'Do I need an internet connection for smart home devices to work?',
      a: 'Most devices require internet for remote access and cloud features, but many basic functions work locally. Some systems like Home Assistant offer fully local control. It\u2019s wise to have a backup internet connection for critical devices like smart locks.',
    },
    {
      q: 'What\u2019s the best smart home system to start with?',
      a: 'It depends on your existing devices. If you have Alexa devices, start with Amazon\u2019s ecosystem. Google Home offers tight integration with Google services. Apple HomeKit is best for iPhone users who prioritize privacy. Home Assistant is ideal for tech enthusiasts wanting maximum control.',
    },
    {
      q: 'How much can smart home devices save on energy?',
      a: 'Smart thermostats alone save 10-15% on heating/cooling. Combined with smart lighting and energy monitoring, total savings can reach 20-30%. Solar integration with smart controls can save 50-80% on electricity costs.',
    },
    {
      q: 'Are smart home devices worth the cost?',
      a: 'Thermostats and lighting typically pay for themselves in 2-4 years through energy savings. Security cameras improve safety and insurance discounts. Smart locks offer convenience and safety. The ROI depends on your priorities and lifestyle.',
    },
    {
      q: 'Is my home secure with smart locks?',
      a: 'Modern smart locks are as secure as traditional locks, with encryption and authentication. Benefits include activity logs, temporary codes, and remote locking. Always choose devices with strong security practices and enable all security features.',
    },
    {
      q: 'Can smart home devices work without the manufacturer\u2019s cloud service?',
      a: 'Many devices can function locally without the cloud, but you lose remote access and voice control. Some ecosystems like Home Assistant prioritize local control. Research \u201clocal control\u201d support before purchasing if this is important to you.',
    },
    {
      q: 'What\u2019s the difference between a smart home hub and a smart speaker?',
      a: 'A smart speaker is a hub with voice control and audio output. Dedicated hubs focus on controlling other devices without speaker functions. Many modern speakers double as hubs, but dedicated hubs offer better range and device management.',
    },
    {
      q: 'How do I choose which devices to start with?',
      a: 'Prioritize devices that address your pain points: comfort (thermostat), security (cameras/locks), or convenience (lights/speakers). Start with 3-4 devices, get comfortable, then expand. Choose compatible systems to avoid fragmentation.',
    },
  ];

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const toggleEssentials = (id: number) => {
    setEssentialsChecked(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleLeadSubmit = () => {
    if (leadEmail.trim()) {
      setLeadSubmitted(true);
      setTimeout(() => {
        setLeadEmail('');
        setLeadSubmitted(false);
      }, 3000);
    }
  };

  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', color: 'var(--le-text)' }}>
      {/* Hero Section */}
      <section
        style={{
          background: 'linear-gradient(135deg, var(--le-primary) 0%, #1565c0 100%)',
          color: 'white',
          padding: '80px 20px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', top: '-50px', right: '-50px', opacity: 0.1, fontSize: '200px' }}>
          <SmartHomeIcon />
        </div>
        <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <h1 style={{ fontSize: '3.5rem', marginBottom: '20px', fontWeight: 700, lineHeight: 1.2 }}>
            Your Complete Smart Home Technology Guide
          </h1>
          <p style={{ fontSize: '1.3rem', marginBottom: '30px', opacity: 0.95, fontWeight: 300 }}>
            Discover how smart home technology adds value, convenience, and security to your property
          </p>
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => document.getElementById('lead-capture').scrollIntoView({ behavior: 'smooth' })}
              style={{
                background: 'white',
                color: 'var(--le-primary)',
                padding: '14px 32px',
                border: 'none',
                borderRadius: 'var(--le-radius, 8px)',
                fontSize: '1rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              Get Free Smart Home Consultation
            </button>
            <button
              onClick={() => document.getElementById('essentials').scrollIntoView({ behavior: 'smooth' })}
              style={{
                background: 'transparent',
                color: 'white',
                padding: '14px 32px',
                border: '2px solid white',
                borderRadius: 'var(--le-radius, 8px)',
                fontSize: '1rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent';
              }}
            >
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Smart Home Essentials Section */}
      <section id="essentials" style={{ padding: '80px 20px', background: 'var(--le-bg, #fafafa)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '15px', textAlign: 'center', fontWeight: 700 }}>
            Smart Home Essentials
          </h2>
          <p style={{ fontSize: '1.1rem', textAlign: 'center', marginBottom: '60px', opacity: 0.7 }}>
            Core devices that transform your home into an intelligent living space
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
            {essentials.map((essential, idx) => {
              const IconComp = essential.icon;
              return (
                <div
                  key={idx}
                  style={{
                    background: 'white',
                    padding: '30px',
                    borderRadius: 'var(--le-radius, 8px)',
                    border: '1px solid rgba(0,0,0,0.08)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 15px 40px rgba(0,0,0,0.1)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'none';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{ color: 'var(--le-primary)', marginBottom: '15px', display: 'flex' }}>
                    <IconComp />
                  </div>
                  <h3 style={{ fontSize: '1.3rem', marginBottom: '8px', fontWeight: 600 }}>{essential.name}</h3>
                  <p style={{ fontSize: '0.95rem', marginBottom: '15px', opacity: 0.8 }}>{essential.description}</p>
                  <div style={{ marginBottom: '15px' }}>
                    <p style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--le-primary)', marginBottom: '8px' }}>Key Benefits:</p>
                    {essential.benefits.map((benefit, bidx) => (
                      <p key={bidx} style={{ fontSize: '0.85rem', opacity: 0.7, marginBottom: '4px' }}>
                        \u2022 {benefit}
                      </p>
                    ))}
                  </div>
                  <div style={{ background: '#f0f4f8', padding: '12px', borderRadius: '6px' }}>
                    <p style={{ fontSize: '0.8rem', opacity: 0.7, marginBottom: '4px' }}>
                      <strong>Cost:</strong> {essential.cost}
                    </p>
                    <p style={{ fontSize: '0.8rem', opacity: 0.7 }}>
                      <strong>Popular Brands:</strong> {essential.brands}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Home Automation Systems Section */}
      <section style={{ padding: '80px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '15px', textAlign: 'center', fontWeight: 700 }}>
            Home Automation Systems
          </h2>
          <p style={{ fontSize: '1.1rem', textAlign: 'center', marginBottom: '60px', opacity: 0.7 }}>
            Compare the major platforms that control your smart home devices
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
            {automationSystems.map((system, idx) => {
              const IconComp = system.icon;
              return (
                <div
                  key={idx}
                  style={{
                    background: 'white',
                    padding: '30px',
                    borderRadius: 'var(--le-radius, 8px)',
                    border: '2px solid var(--le-primary)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                  }}
                >
                  <div style={{ color: 'var(--le-primary)', marginBottom: '12px', display: 'flex' }}>
                    <IconComp />
                  </div>
                  <h3 style={{ fontSize: '1.3rem', color: 'var(--le-primary)', marginBottom: '15px', fontWeight: 600 }}>
                    {system.name}
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ borderBottom: '1px solid #f0f0f0', paddingBottom: '12px' }}>
                      <p style={{ fontWeight: 600, marginBottom: '6px', fontSize: '0.9rem' }}>Compatible Devices</p>
                      <p style={{ fontSize: '0.85rem', color: '#888' }}>{system.compatibility}</p>
                    </div>
                    <div style={{ borderBottom: '1px solid #f0f0f0', paddingBottom: '12px' }}>
                      <p style={{ fontWeight: 600, marginBottom: '6px', fontSize: '0.9rem' }}>Key Strengths</p>
                      <p style={{ fontSize: '0.85rem', color: '#888' }}>{system.strengths}</p>
                    </div>
                    <div style={{ borderBottom: '1px solid #f0f0f0', paddingBottom: '12px' }}>
                      <p style={{ fontWeight: 600, marginBottom: '6px', fontSize: '0.9rem' }}>Setup Time</p>
                      <p style={{ fontSize: '0.85rem', color: '#888' }}>{system.setupTime}</p>
                    </div>
                    <div>
                      <p style={{ fontWeight: 600, marginBottom: '6px', fontSize: '0.9rem' }}>Cost</p>
                      <p style={{ fontSize: '0.85rem', color: 'var(--le-primary)', fontWeight: 600 }}>{system.cost}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Security Systems Section */}
      <section style={{ padding: '80px 20px', background: 'var(--le-bg, #fafafa)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '15px', textAlign: 'center', fontWeight: 700 }}>
            Smart Security Systems
          </h2>
          <p style={{ fontSize: '1.1rem', textAlign: 'center', marginBottom: '60px', opacity: 0.7 }}>
            Protect your home with intelligent security devices and monitoring
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '30px' }}>
            {securityFeatures.map((feature, idx) => {
              const IconComp = feature.icon;
              return (
                <div
                  key={idx}
                  style={{
                    background: 'white',
                    padding: '25px',
                    borderRadius: 'var(--le-radius, 8px)',
                    border: '1px solid rgba(0,0,0,0.08)',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                  }}
                >
                  <div style={{ color: 'var(--le-primary)', marginBottom: '12px', display: 'flex' }}>
                    <IconComp />
                  </div>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '8px', fontWeight: 600 }}>{feature.name}</h3>
                  <p style={{ fontSize: '0.9rem', marginBottom: '12px', opacity: 0.8 }}>{feature.description}</p>
                  <p style={{ fontSize: '0.85rem', marginBottom: '12px', color: '#666', lineHeight: 1.5 }}>
                    <strong>Capabilities:</strong> {feature.capabilities}
                  </p>
                  <p style={{ fontSize: '0.85rem', color: 'var(--le-primary)', fontWeight: 600 }}>
                    {feature.cost}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Energy Management Section */}
      <section style={{ padding: '80px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '15px', textAlign: 'center', fontWeight: 700 }}>
            Smart Energy Management
          </h2>
          <p style={{ fontSize: '1.1rem', textAlign: 'center', marginBottom: '60px', opacity: 0.7 }}>
            Reduce energy consumption and optimize your home\u2019s power efficiency
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
            {energyFeatures.map((feature, idx) => {
              const IconComp = feature.icon;
              return (
                <div
                  key={idx}
                  style={{
                    background: 'linear-gradient(135deg, rgba(21,101,192,0.05) 0%, rgba(33,150,243,0.05) 100%)',
                    padding: '30px',
                    borderRadius: 'var(--le-radius, 8px)',
                    border: '1px solid rgba(21,101,192,0.15)',
                  }}
                >
                  <div style={{ color: 'var(--le-primary)', marginBottom: '15px', display: 'flex' }}>
                    <IconComp />
                  </div>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '12px', fontWeight: 600 }}>{feature.name}</h3>
                  <p style={{ fontSize: '0.95rem', marginBottom: '15px', opacity: 0.8 }}>{feature.description}</p>
                  <div style={{ background: 'white', padding: '12px', borderRadius: '6px', marginBottom: '12px' }}>
                    <p style={{ fontSize: '0.85rem', opacity: 0.7 }}>
                      <strong>Typical Savings:</strong> {feature.savings}
                    </p>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--le-primary)', fontWeight: 600 }}>
                    {feature.cost}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Smart Kitchen Section */}
      <section style={{ padding: '80px 20px', background: 'var(--le-bg, #fafafa)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '15px', textAlign: 'center', fontWeight: 700 }}>
            Smart Kitchen & Appliances
          </h2>
          <p style={{ fontSize: '1.1rem', textAlign: 'center', marginBottom: '60px', opacity: 0.7 }}>
            Connected appliances that enhance cooking, cleaning, and food management
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '30px' }}>
            {kitchenDevices.map((device, idx) => {
              const IconComp = device.icon;
              return (
                <div
                  key={idx}
                  style={{
                    background: 'white',
                    padding: '25px',
                    borderRadius: 'var(--le-radius, 8px)',
                    border: '1px solid rgba(0,0,0,0.08)',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                  }}
                >
                  <div style={{ color: 'var(--le-primary)', marginBottom: '12px', display: 'flex' }}>
                    <IconComp />
                  </div>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '12px', fontWeight: 600 }}>{device.name}</h3>
                  <p style={{ fontSize: '0.9rem', marginBottom: '12px', opacity: 0.8 }}>{device.features}</p>
                  <p style={{ fontSize: '0.85rem', color: 'var(--le-primary)', fontWeight: 600 }}>
                    {device.cost}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Investment Calculator Section */}
      <section style={{ padding: '80px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '15px', textAlign: 'center', fontWeight: 700 }}>
            Smart Home Investment Calculator
          </h2>
          <p style={{ fontSize: '1.1rem', textAlign: 'center', marginBottom: '50px', opacity: 0.7 }}>
            Compare setup costs, savings, and ROI for different smart home scenarios
          </p>

          <div style={{ background: 'white', padding: '40px', borderRadius: 'var(--le-radius, 8px)', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            <div style={{ marginBottom: '40px' }}>
              <p style={{ fontSize: '1.1rem', marginBottom: '20px', fontWeight: 600 }}>Choose your setup level:</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
                {Object.entries(investmentScenarios).map(([key, scenario]) => (
                  <button
                    key={key}
                    onClick={() => setInvestmentScenario(key as 'starter' | 'standard' | 'premium')}
                    style={{
                      padding: '15px',
                      border: investmentScenario === key ? '2px solid var(--le-primary)' : '1px solid #ddd',
                      background: investmentScenario === key ? 'var(--le-primary)' : 'white',
                      color: investmentScenario === key ? 'white' : 'var(--le-text)',
                      borderRadius: 'var(--le-radius, 8px)',
                      cursor: 'pointer',
                      fontWeight: 600,
                      transition: 'all 0.3s ease',
                      fontSize: '0.95rem',
                    }}
                  >
                    {scenario.title}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '30px' }}>
              <p style={{ fontSize: '1rem', marginBottom: '12px', opacity: 0.8 }}>
                <strong>{selectedScenario.description}</strong>
              </p>
              <p style={{ fontSize: '0.9rem', marginBottom: '15px', opacity: 0.7 }}>
                {selectedScenario.items.join(' \u2022 ')}
              </p>
              <p style={{ fontSize: '0.9rem', color: 'var(--le-primary)', fontWeight: 600 }}>
                {selectedScenario.devices}
              </p>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '25px',
                marginBottom: '30px',
              }}
            >
              <div style={{ background: '#f9f9f9', padding: '20px', borderRadius: '8px', borderLeft: '4px solid var(--le-primary)' }}>
                <p style={{ fontSize: '0.9rem', opacity: 0.7, marginBottom: '8px' }}>Initial Investment</p>
                <p style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--le-primary)' }}>
                  ${selectedScenario.initialCost.toLocaleString()}
                </p>
              </div>
              <div style={{ background: '#f9f9f9', padding: '20px', borderRadius: '8px', borderLeft: '4px solid var(--le-primary)' }}>
                <p style={{ fontSize: '0.9rem', opacity: 0.7, marginBottom: '8px' }}>Annual Savings</p>
                <p style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--le-primary)' }}>
                  ${selectedScenario.annualSavings.toLocaleString()}
                </p>
              </div>
              <div style={{ background: '#f9f9f9', padding: '20px', borderRadius: '8px', borderLeft: '4px solid var(--le-primary)' }}>
                <p style={{ fontSize: '0.9rem', opacity: 0.7, marginBottom: '8px' }}>Payback Period</p>
                <p style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--le-primary)' }}>
                  {paybackYears} years
                </p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
              <div style={{ padding: '20px', background: '#e3f2fd', borderRadius: '8px' }}>
                <p style={{ fontSize: '0.85rem', opacity: 0.7, marginBottom: '8px' }}>10-Year Savings</p>
                <p style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--le-primary)' }}>
                  ${savingsYear10.toLocaleString()}
                </p>
              </div>
              <div style={{ padding: '20px', background: '#e3f2fd', borderRadius: '8px' }}>
                <p style={{ fontSize: '0.85rem', opacity: 0.7, marginBottom: '8px' }}>25-Year Savings</p>
                <p style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--le-primary)' }}>
                  ${savingsYear25.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Future-Proofing Section */}
      <section style={{ padding: '80px 20px', background: 'var(--le-bg, #fafafa)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '15px', textAlign: 'center', fontWeight: 700 }}>
            Future-Proofing Your Smart Home
          </h2>
          <p style={{ fontSize: '1.1rem', textAlign: 'center', marginBottom: '60px', opacity: 0.7 }}>
            Plan ahead for technology changes, upgrades, and long-term compatibility
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
            {futureProofing.map((section, idx) => (
              <div
                key={idx}
                style={{
                  background: 'white',
                  padding: '30px',
                  borderRadius: 'var(--le-radius, 8px)',
                  border: '1px solid rgba(0,0,0,0.08)',
                }}
              >
                <h3 style={{ fontSize: '1.25rem', marginBottom: '18px', fontWeight: 600, color: 'var(--le-primary)' }}>
                  {section.category}
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {section.items.map((item, itemIdx) => (
                    <div key={itemIdx} style={{ display: 'flex', gap: '10px' }}>
                      <div style={{ color: 'var(--le-primary)', flexShrink: 0, marginTop: '2px' }}>
                        <CheckIcon />
                      </div>
                      <p style={{ fontSize: '0.95rem', opacity: 0.85 }}>{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy & Security Concerns Section */}
      <section style={{ padding: '80px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '15px', textAlign: 'center', fontWeight: 700 }}>
            Privacy & Security Considerations
          </h2>
          <p style={{ fontSize: '1.1rem', textAlign: 'center', marginBottom: '60px', opacity: 0.7 }}>
            Protect your data and network while enjoying smart home benefits
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
            {privacyConsiderations.map((item, idx) => (
              <div
                key={idx}
                style={{
                  background: '#fff3e0',
                  padding: '30px',
                  borderRadius: 'var(--le-radius, 8px)',
                  border: '1px solid rgba(255,152,0,0.2)',
                  borderLeft: '4px solid #ff9800',
                }}
              >
                <h3 style={{ fontSize: '1.2rem', marginBottom: '12px', fontWeight: 600, color: '#e65100' }}>
                  {item.concern}
                </h3>
                <p style={{ fontSize: '0.95rem', marginBottom: '15px', opacity: 0.85, lineHeight: 1.6 }}>
                  {item.details}
                </p>
                <div style={{ background: 'white', padding: '12px', borderRadius: '6px' }}>
                  <p style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px', color: 'var(--le-primary)' }}>
                    How to mitigate:
                  </p>
                  <p style={{ fontSize: '0.9rem', opacity: 0.8, lineHeight: 1.5 }}>
                    {item.mitigation}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section style={{ padding: '80px 20px', background: 'var(--le-bg, #fafafa)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '15px', textAlign: 'center', fontWeight: 700 }}>
            Frequently Asked Questions
          </h2>
          <p style={{ fontSize: '1.1rem', textAlign: 'center', marginBottom: '50px', opacity: 0.7 }}>
            Get answers to common smart home questions
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                style={{
                  background: 'white',
                  borderRadius: 'var(--le-radius, 8px)',
                  overflow: 'hidden',
                  border: '1px solid rgba(0,0,0,0.08)',
                }}
              >
                <button
                  onClick={() => toggleFaq(idx)}
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
                    fontSize: '1rem',
                    fontWeight: 600,
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(21,101,192,0.03)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'white';
                  }}
                >
                  <span>{faq.q}</span>
                  <div
                    style={{
                      color: 'var(--le-primary)',
                      transform: expandedFaq === idx ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s ease',
                      display: 'flex',
                      flexShrink: 0,
                      marginLeft: '15px',
                    }}
                  >
                    <ChevronDownIcon />
                  </div>
                </button>
                {expandedFaq === idx && (
                  <div style={{ padding: '0 20px 20px 20px', background: 'rgba(21,101,192,0.02)' }}>
                    <p style={{ fontSize: '0.95rem', opacity: 0.85, lineHeight: 1.6 }}>
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Capture Section */}
      <section id="lead-capture" style={{ padding: '80px 20px', background: 'linear-gradient(135deg, var(--le-primary) 0%, #1565c0 100%)', color: 'white' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.2rem', marginBottom: '15px', fontWeight: 700 }}>
            Ready to Upgrade Your Home?
          </h2>
          <p style={{ fontSize: '1.1rem', marginBottom: '40px', opacity: 0.95 }}>
            Get personalized recommendations for your home and budget. Our real estate experts can help you understand how smart home features add value.
          </p>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '25px', flexWrap: 'wrap' }}>
            <input
              type="email"
              placeholder="Enter your email"
              value={leadEmail}
              onChange={e => setLeadEmail(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && handleLeadSubmit()}
              style={{
                flex: 1,
                minWidth: '200px',
                padding: '14px 16px',
                border: 'none',
                borderRadius: 'var(--le-radius, 8px)',
                fontSize: '1rem',
                background: 'rgba(255,255,255,0.95)',
              }}
            />
            <button
              onClick={handleLeadSubmit}
              style={{
                padding: '14px 32px',
                background: '#ff6b35',
                color: 'white',
                border: 'none',
                borderRadius: 'var(--le-radius, 8px)',
                fontSize: '1rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(255,107,53,0.3)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              Get Smart Home Guide
            </button>
          </div>
          {leadSubmitted && (
            <p style={{ fontSize: '1rem', fontWeight: 600, color: '#4ade80' }}>
              \u2713 Thank you! Check your email for your smart home guide.
            </p>
          )}
          <p style={{ fontSize: '0.85rem', opacity: 0.8, marginTop: '15px' }}>
            We\u2019ll send you a customized smart home guide and connect you with local real estate experts.
          </p>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section style={{ padding: '60px 20px', background: 'white', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h3 style={{ fontSize: '1.8rem', marginBottom: '15px', fontWeight: 700 }}>
            Have Questions About Smart Home Technology?
          </h3>
          <p style={{ fontSize: '1.1rem', marginBottom: '30px', opacity: 0.8 }}>
            Our local real estate experts can help you understand how smart features impact home value and which investments make sense for your property and budget.
          </p>
          <button
            onClick={() => document.getElementById('lead-capture').scrollIntoView({ behavior: 'smooth' })}
            style={{
              padding: '16px 40px',
              background: 'var(--le-primary)',
              color: 'white',
              border: 'none',
              borderRadius: 'var(--le-radius, 8px)',
              fontSize: '1.1rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 12px 30px rgba(21,101,192,0.3)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Get Your Free Consultation
          </button>
        </div>
      </section>
    </div>
  );
};

export default SmartHomeGuidePage;
