'use client';

import React, { useState } from 'react';

interface TimelineStep {
  id: number;
  month: string;
  title: string;
  description: string;
  tasks: string[];
}

interface ChecklistItem {
  id: string;
  category: string;
  task: string;
  completed: boolean;
}

interface AreaComparison {
  name: string;
  costOfLiving: number;
  schools: string;
  commute: string;
  amenities: string;
  safety: string;
}

export default function RelocationGuidePage() {
  const [expandedTimeline, setExpandedTimeline] = useState<number | null>(null);
  const [checklist, setChecklist] = useState<ChecklistItem[]>([
    { id: '1', category: 'Utilities', task: 'Arrange electricity disconnection', completed: false },
    { id: '2', category: 'Utilities', task: 'Schedule internet/cable transfer', completed: false },
    { id: '3', category: 'Utilities', task: 'Arrange water and gas disconnection', completed: false },
    { id: '4', category: 'Address Change', task: 'Update USPS address', completed: false },
    { id: '5', category: 'Address Change', task: 'Notify employer and banks', completed: false },
    { id: '6', category: 'Address Change', task: 'Update insurance policies', completed: false },
    { id: '7', category: 'Schools', task: 'Research new school districts', completed: false },
    { id: '8', category: 'Schools', task: 'Transfer student records', completed: false },
    { id: '9', category: 'Healthcare', task: 'Find new doctor and dentist', completed: false },
    { id: '10', category: 'Healthcare', task: 'Transfer prescriptions', completed: false },
  ]);

  const [area1, setArea1] = useState<string>('');
  const [area2, setArea2] = useState<string>('');
  const [distance, setDistance] = useState<string>('');
  const [homeSize, setHomeSize] = useState<string>('2000');
  const [estimatedCost, setEstimatedCost] = useState<{ min: number; max: number } | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    movingFrom: '',
    movingTo: '',
    timeline: 'within-3-months',
  });

  const timelineSteps: TimelineStep[] = [
    {
      id: 1,
      month: '3 Months Before',
      title: 'Start Planning',
      description: 'Begin your relocation journey with research and preparation.',
      tasks: [
        'Research your new area and neighborhoods',
        'Get pre-approved for a mortgage if buying',
        'Start collecting moving quotes from companies',
        'Review your current lease or mortgage terms',
      ],
    },
    {
      id: 2,
      month: '2 Months Before',
      title: 'Book Services',
      description: 'Lock in your moving company and other essential services.',
      tasks: [
        'Book your moving company',
        'Schedule utility disconnections and reconnections',
        'Begin decluttering and donating items',
        'Research schools in your new area',
      ],
    },
    {
      id: 3,
      month: '6 Weeks Before',
      title: 'Prepare Documentation',
      description: 'Get your paperwork and records in order.',
      tasks: [
        'Update your address with USPS',
        'Notify banks and insurance companies',
        'Request school records transfer',
        'Change voter registration',
      ],
    },
    {
      id: 4,
      month: '4 Weeks Before',
      title: 'Deep Dive',
      description: 'Get familiar with your new community.',
      tasks: [
        'Explore neighborhoods and local amenities',
        'Find healthcare providers',
        'Research transportation options',
        'Join local community groups',
      ],
    },
    {
      id: 5,
      month: '2 Weeks Before',
      title: 'Final Preparations',
      description: 'Handle last-minute details and confirmations.',
      tasks: [
        'Confirm moving company details',
        'Arrange time off work',
        'Update emergency contacts',
        'Plan travel arrangements',
      ],
    },
    {
      id: 6,
      month: '1 Week Before',
      title: 'Packing Sprint',
      description: 'Finish packing and organize your move.',
      tasks: [
        'Pack non-essential items',
        'Use up frozen foods and pantry items',
        'Confirm utility connection dates',
        'Prepare an essentials box',
      ],
    },
    {
      id: 7,
      month: 'Moving Day',
      title: 'The Big Day',
      description: 'Execute your move with confidence.',
      tasks: [
        'Do final walkthrough of old home',
        'Take meter readings',
        'Keep important documents accessible',
        'Stay hydrated and take breaks',
      ],
    },
    {
      id: 8,
      month: 'First Week',
      title: 'Settle In',
      description: 'Get comfortable in your new home and community.',
      tasks: [
        'Unpack essentials and test utilities',
        'Update address with remaining services',
        'Introduce yourself to neighbors',
        'Locate key services in your area',
      ],
    },
  ];

  const areaComparisonExamples: { [key: string]: AreaComparison } = {
    'Downtown': {
      name: 'Downtown',
      costOfLiving: 120,
      schools: 'Excellent - Multiple top-rated schools',
      commute: '15-20 minutes by transit',
      amenities: 'Vibrant nightlife, restaurants, shopping',
      safety: 'Well-lit streets, active police presence',
    },
    'Suburbs': {
      name: 'Suburbs',
      costOfLiving: 85,
      schools: 'Highly rated school district',
      commute: '30-40 minutes by car',
      amenities: 'Parks, family-friendly restaurants',
      safety: 'Quiet neighborhoods, low crime',
    },
    'Waterfront': {
      name: 'Waterfront',
      costOfLiving: 135,
      schools: 'Good diversity of schools',
      commute: '20-30 minutes',
      amenities: 'Beaches, water sports, scenic views',
      safety: 'Community patrols, active neighborhood watch',
    },
  };

  const calculateMovingCost = () => {
    if (!distance || !homeSize) {
      alert('Please enter both distance and home size');
      return;
    }

    const dist = parseInt(distance);
    const size = parseInt(homeSize);
    const baseCost = dist * 1.5;
    const sizeFactor = (size / 1000) * 2000;
    const min = Math.round(baseCost + sizeFactor + 1500);
    const max = Math.round(min * 1.4);

    setEstimatedCost({ min, max });
  };

  const handleChecklistToggle = (id: string) => {
    setChecklist(
      checklist.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert(`Thank you! We\u2019ve received your information. Check your email for your relocation package.`);
    setFormData({ name: '', email: '', movingFrom: '', movingTo: '', timeline: 'within-3-months' });
  };

  const completedCount = checklist.filter((item) => item.completed).length;
  const completionPercentage = Math.round((completedCount / checklist.length) * 100);

  return (
    <div style={{ backgroundColor: 'var(--le-bg)', color: 'var(--le-text)', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Hero Section */}
      <section style={{
        backgroundColor: 'var(--le-surface)',
        padding: '60px 20px',
        textAlign: 'center',
        borderBottom: '1px solid var(--le-border)',
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h1 style={{
            fontSize: '48px',
            fontWeight: '700',
            marginBottom: '16px',
            lineHeight: '1.2',
          }}>
            Relocating? Your Complete Moving Guide
          </h1>
          <p style={{
            fontSize: '18px',
            color: 'var(--le-text-secondary)',
            marginBottom: '32px',
            lineHeight: '1.6',
          }}>
            Expert advice, checklists, and tools to make your move seamless and stress-free.
          </p>
          <button
            onClick={() => document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })}
            style={{
              backgroundColor: 'var(--le-primary)',
              color: '#fff',
              padding: '14px 32px',
              borderRadius: '6px',
              border: 'none',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'background-color 0.3s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--le-primary-hover)')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--le-primary)')}
          >
            Get Your Relocation Package
          </button>
        </div>
      </section>

      {/* Timeline Section */}
      <section style={{ padding: '60px 20px', maxWidth: '1000px', margin: '0 auto' }}>
        <h2 style={{
          fontSize: '36px',
          fontWeight: '700',
          marginBottom: '40px',
          textAlign: 'center',
        }}>
          Your 8-Step Moving Timeline
        </h2>
        <div style={{ display: 'grid', gap: '16px' }}>
          {timelineSteps.map((step) => (
            <div
              key={step.id}
              style={{
                backgroundColor: 'var(--le-surface)',
                border: '1px solid var(--le-border)',
                borderRadius: '8px',
                overflow: 'hidden',
              }}
            >
              <button
                onClick={() => setExpandedTimeline(expandedTimeline === step.id ? null : step.id)}
                style={{
                  width: '100%',
                  padding: '20px',
                  textAlign: 'left',
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div>
                  <div style={{ fontSize: '12px', color: 'var(--le-primary)', fontWeight: '600' }}>
                    {step.month}
                  </div>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', margin: '8px 0 0 0' }}>
                    {step.title}
                  </h3>
                  <p style={{ fontSize: '14px', color: 'var(--le-text-secondary)', margin: '4px 0 0 0' }}>
                    {step.description}
                  </p>
                </div>
                <div style={{
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'transform 0.3s',
                  transform: expandedTimeline === step.id ? 'rotate(180deg)' : 'rotate(0)',
                }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>
              </button>
              {expandedTimeline === step.id && (
                <div style={{
                  padding: '0 20px 20px 20px',
                  backgroundColor: 'var(--le-bg)',
                  borderTop: '1px solid var(--le-border)',
                }}>
                  <ul style={{ margin: '0', paddingLeft: '20px', lineHeight: '1.8' }}>
                    {step.tasks.map((task, idx) => (
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

      {/* Checklist Section */}
      <section style={{
        backgroundColor: 'var(--le-surface)',
        padding: '60px 20px',
        borderTop: '1px solid var(--le-border)',
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '36px',
            fontWeight: '700',
            marginBottom: '16px',
            textAlign: 'center',
          }}>
            Interactive Moving Checklist
          </h2>
          <p style={{
            textAlign: 'center',
            color: 'var(--le-text-secondary)',
            marginBottom: '32px',
          }}>
            Track your progress: {completedCount} of {checklist.length} items completed ({completionPercentage}%)
          </p>
          <div style={{
            width: '100%',
            height: '8px',
            backgroundColor: 'var(--le-bg)',
            borderRadius: '4px',
            marginBottom: '32px',
            overflow: 'hidden',
          }}>
            <div
              style={{
                width: `${completionPercentage}%`,
                height: '100%',
                backgroundColor: 'var(--le-primary)',
                transition: 'width 0.3s',
              }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {['Utilities', 'Address Change', 'Schools', 'Healthcare'].map((category) => (
              <div key={category} style={{
                backgroundColor: 'var(--le-bg)',
                padding: '20px',
                borderRadius: '8px',
                border: '1px solid var(--le-border)',
              }}>
                <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>
                  {category}
                </h3>
                {checklist
                  .filter((item) => item.category === category)
                  .map((item) => (
                    <label
                      key={item.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '12px',
                        cursor: 'pointer',
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={item.completed}
                        onChange={() => handleChecklistToggle(item.id)}
                        style={{
                          marginRight: '12px',
                          width: '18px',
                          height: '18px',
                          cursor: 'pointer',
                        }}
                      />
                      <span style={{
                        fontSize: '14px',
                        textDecoration: item.completed ? 'line-through' : 'none',
                        color: item.completed ? 'var(--le-text-secondary)' : 'var(--le-text)',
                      }}>
                        {item.task}
                      </span>
                    </label>
                  ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Area Comparison Tool */}
      <section style={{ padding: '60px 20px', maxWidth: '1000px', margin: '0 auto' }}>
        <h2 style={{
          fontSize: '36px',
          fontWeight: '700',
          marginBottom: '16px',
          textAlign: 'center',
        }}>
          Compare Your Options
        </h2>
        <p style={{
          textAlign: 'center',
          color: 'var(--le-text-secondary)',
          marginBottom: '32px',
        }}>
          See how different areas stack up on cost, schools, commute, and more.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          marginBottom: '32px',
        }}>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>
              Area 1
            </label>
            <select
              value={area1}
              onChange={(e) => setArea1(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid var(--le-border)',
                borderRadius: '6px',
                backgroundColor: 'var(--le-surface)',
                color: 'var(--le-text)',
                fontSize: '14px',
              }}
            >
              <option value="">Select an area</option>
              <option value="Downtown">Downtown</option>
              <option value="Suburbs">Suburbs</option>
              <option value="Waterfront">Waterfront</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>
              Area 2
            </label>
            <select
              value={area2}
              onChange={(e) => setArea2(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid var(--le-border)',
                borderRadius: '6px',
                backgroundColor: 'var(--le-surface)',
                color: 'var(--le-text)',
                fontSize: '14px',
              }}
            >
              <option value="">Select an area</option>
              <option value="Downtown">Downtown</option>
              <option value="Suburbs">Suburbs</option>
              <option value="Waterfront">Waterfront</option>
            </select>
          </div>
        </div>

        {area1 && area2 && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '24px',
          }}>
            {[area1, area2].map((areaName) => {
              const areaData = areaComparisonExamples[areaName];
              return (
                <div
                  key={areaName}
                  style={{
                    backgroundColor: 'var(--le-surface)',
                    border: '1px solid var(--le-border)',
                    borderRadius: '8px',
                    padding: '24px',
                  }}
                >
                  <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '16px' }}>
                    {areaData.name}
                  </h3>
                  <div style={{ fontSize: '14px', lineHeight: '1.8' }}>
                    <div style={{ marginBottom: '12px' }}>
                      <strong>Cost of Living Index:</strong> {areaData.costOfLiving}
                    </div>
                    <div style={{ marginBottom: '12px' }}>
                      <strong>Schools:</strong> {areaData.schools}
                    </div>
                    <div style={{ marginBottom: '12px' }}>
                      <strong>Commute:</strong> {areaData.commute}
                    </div>
                    <div style={{ marginBottom: '12px' }}>
                      <strong>Amenities:</strong> {areaData.amenities}
                    </div>
                    <div>
                      <strong>Safety:</strong> {areaData.safety}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Moving Cost Estimator */}
      <section style={{
        backgroundColor: 'var(--le-surface)',
        padding: '60px 20px',
        borderTop: '1px solid var(--le-border)',
      }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '36px',
            fontWeight: '700',
            marginBottom: '16px',
            textAlign: 'center',
          }}>
            Moving Cost Estimator
          </h2>
          <p style={{
            textAlign: 'center',
            color: 'var(--le-text-secondary)',
            marginBottom: '32px',
          }}>
            Get a quick estimate based on distance and home size.
          </p>

          <div style={{ display: 'grid', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>
                Distance (miles)
              </label>
              <input
                type="number"
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
                placeholder="e.g., 500"
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid var(--le-border)',
                  borderRadius: '6px',
                  backgroundColor: 'var(--le-bg)',
                  color: 'var(--le-text)',
                  fontSize: '14px',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>
                Home Size (sq ft)
              </label>
              <input
                type="number"
                value={homeSize}
                onChange={(e) => setHomeSize(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid var(--le-border)',
                  borderRadius: '6px',
                  backgroundColor: 'var(--le-bg)',
                  color: 'var(--le-text)',
                  fontSize: '14px',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            <button
              onClick={calculateMovingCost}
              style={{
                backgroundColor: 'var(--le-primary)',
                color: '#fff',
                padding: '12px',
                borderRadius: '6px',
                border: 'none',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'background-color 0.3s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--le-primary-hover)')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--le-primary)')}
            >
              Calculate Estimate
            </button>

            {estimatedCost && (
              <div style={{
                backgroundColor: 'var(--le-bg)',
                border: '2px solid var(--le-primary)',
                borderRadius: '8px',
                padding: '20px',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: '12px', color: 'var(--le-text-secondary)', marginBottom: '8px' }}>
                  Estimated Moving Cost
                </div>
                <div style={{ fontSize: '28px', fontWeight: '700', color: 'var(--le-primary)' }}>
                  ${estimatedCost.min.toLocaleString()} - ${estimatedCost.max.toLocaleString()}
                </div>
                <p style={{ fontSize: '12px', color: 'var(--le-text-secondary)', margin: '12px 0 0 0' }}>
                  This is an estimate. Actual costs may vary based on additional factors.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Local Resources */}
      <section style={{ padding: '60px 20px', maxWidth: '1000px', margin: '0 auto' }}>
        <h2 style={{
          fontSize: '36px',
          fontWeight: '700',
          marginBottom: '40px',
          textAlign: 'center',
        }}>
          Local Resources & Highlights
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '24px',
        }}>
          {[
            {
              icon: '📚',
              title: 'School Districts',
              items: ['Top-rated elementary schools', 'Advanced learning programs', 'College preparatory high schools'],
            },
            {
              icon: '🏥',
              title: 'Healthcare',
              items: ['Major medical centers', 'Specialized clinics', 'Mental health services'],
            },
            {
              icon: '🌳',
              title: 'Parks & Recreation',
              items: ['Hiking trails and nature reserves', 'Community sports facilities', 'Playgrounds and dog parks'],
            },
            {
              icon: '🍽️',
              title: 'Dining & Shopping',
              items: ['Diverse restaurant scene', 'Local farmers markets', 'Unique retail shops'],
            },
            {
              icon: '🚗',
              title: 'Transportation',
              items: ['Public transit networks', 'Bike-friendly routes', 'Major commute corridors'],
            },
            {
              icon: '🏘️',
              title: 'Community',
              items: ['Active neighborhood associations', 'Local events and festivals', 'Volunteer opportunities'],
            },
          ].map((resource, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: 'var(--le-surface)',
                border: '1px solid var(--le-border)',
                borderRadius: '8px',
                padding: '24px',
              }}
            >
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>{resource.icon}</div>
              <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '12px' }}>
                {resource.title}
              </h3>
              <ul style={{ margin: '0', paddingLeft: '20px', lineHeight: '1.8', fontSize: '14px' }}>
                {resource.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Lead Capture Form */}
      <section
        id="lead-form"
        style={{
          backgroundColor: 'var(--le-surface)',
          padding: '60px 20px',
          borderTop: '1px solid var(--le-border)',
        }}
      >
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '36px',
            fontWeight: '700',
            marginBottom: '16px',
            textAlign: 'center',
          }}>
            Get Your Relocation Package
          </h2>
          <p style={{
            textAlign: 'center',
            color: 'var(--le-text-secondary)',
            marginBottom: '32px',
          }}>
            Receive personalized guides, checklists, and local information for your specific move.
          </p>

          <form onSubmit={handleFormSubmit} style={{ display: 'grid', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
                required
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid var(--le-border)',
                  borderRadius: '6px',
                  backgroundColor: 'var(--le-bg)',
                  color: 'var(--le-text)',
                  fontSize: '14px',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleFormChange}
                required
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid var(--le-border)',
                  borderRadius: '6px',
                  backgroundColor: 'var(--le-bg)',
                  color: 'var(--le-text)',
                  fontSize: '14px',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>
                Moving From
              </label>
              <input
                type="text"
                name="movingFrom"
                value={formData.movingFrom}
                onChange={handleFormChange}
                placeholder="e.g., New York, NY"
                required
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid var(--le-border)',
                  borderRadius: '6px',
                  backgroundColor: 'var(--le-bg)',
                  color: 'var(--le-text)',
                  fontSize: '14px',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>
                Moving To
              </label>
              <input
                type="text"
                name="movingTo"
                value={formData.movingTo}
                onChange={handleFormChange}
                placeholder="e.g., Austin, TX"
                required
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid var(--le-border)',
                  borderRadius: '6px',
                  backgroundColor: 'var(--le-bg)',
                  color: 'var(--le-text)',
                  fontSize: '14px',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>
                Moving Timeline
              </label>
              <select
                name="timeline"
                value={formData.timeline}
                onChange={handleFormChange}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid var(--le-border)',
                  borderRadius: '6px',
                  backgroundColor: 'var(--le-bg)',
                  color: 'var(--le-text)',
                  fontSize: '14px',
                  boxSizing: 'border-box',
                }}
              >
                <option value="within-3-months">Within 3 months</option>
                <option value="3-6-months">3-6 months</option>
                <option value="6-12-months">6-12 months</option>
                <option value="over-1-year">Over 1 year</option>
              </select>
            </div>

            <button
              type="submit"
              style={{
                backgroundColor: 'var(--le-primary)',
                color: '#fff',
                padding: '14px',
                borderRadius: '6px',
                border: 'none',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'background-color 0.3s',
                marginTop: '8px',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--le-primary-hover)')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--le-primary)')}
            >
              Get Your Package
            </button>
          </form>
        </div>
      </section>

      {/* Footer Info */}
      <section style={{
        backgroundColor: 'var(--le-surface)',
        borderTop: '1px solid var(--le-border)',
        padding: '40px 20px',
        textAlign: 'center',
      }}>
        <p style={{ color: 'var(--le-text-secondary)', fontSize: '14px' }}>
          Need personalized relocation assistance? Our real estate experts are here to help you find your perfect new home.
        </p>
      </section>
    </div>
  );
}
