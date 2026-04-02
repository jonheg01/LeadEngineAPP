'use client'

import { useState } from 'react';

export default function MovingWithPetsGuidePage() {
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    petType: '',
    message: ''
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: any) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const name = (formData.get('name') as string) || '';
    const email = (formData.get('email') as string) || '';
    const phone = (formData.get('phone') as string) || '';
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          source: 'Moving With Pets Guide',
          lead_type: 'Buyer',
          page_url: typeof window !== 'undefined' ? window.location.pathname : '/movingwithpetsguide',
          captured_at: new Date().toISOString(),
        }),
      });
      if (res.ok) {
        form.reset();
        alert('Thank you! We\u2019ll be in touch soon.');
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch {
      alert('Something went wrong. Please try again.');
    }
  };

  const PawIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="6" r="2" />
      <circle cx="6" cy="12" r="2" />
      <circle cx="18" cy="12" r="2" />
      <circle cx="8" cy="18" r="2" />
      <circle cx="16" cy="18" r="2" />
    </svg>
  );

  const CheckIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );

  const ChevronIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 9l6 6 6-6" />
    </svg>
  );

  const faqItems = [
    {
      question: 'How do I prepare my pet for moving day?',
      answer: 'Start with short trips in the car weeks before moving day. Keep your pet\u2019s routine consistent leading up to the move, maintain feeding schedules, and ensure current ID tags and microchip information are registered. On moving day, keep your pet in a quiet room away from the chaos, and consider using calming supplements or consulting your vet about anti-anxiety options.'
    },
    {
      question: 'What should I look for in a pet-friendly rental property?',
      answer: 'Look for properties with clear pet policies, fenced yards, nearby parks or walking areas, and landlord willingness to work with pets. Check pet deposit amounts, breed/size restrictions, and whether there are extra pet fees. Properties with hardwood or tile floors are easier to clean if accidents occur. Ask about other pet owners in the building—they often provide valuable insights.'
    },
    {
      question: 'How do I help my pet adjust to a new home?',
      answer: 'Introduce your pet to your new home gradually. Start with one room, allowing them to explore at their own pace. Keep their bed, toys, and food/water bowls in familiar locations. Maintain routines for feeding and walks. Expect behavioral changes for 2-4 weeks as they adjust. Schedule a vet checkup shortly after moving to establish care relationships and ensure your pet\u2019s health.'
    },
    {
      question: 'Are there breed restrictions I should know about?',
      answer: 'Many rental properties and HOAs have breed restrictions. Common restricted breeds include pit bulls, rottweilers, and huskies, though restrictions vary by location. Review HOA documents carefully before purchasing. Some insurance companies charge higher premiums for certain breeds. Discuss any concerns with the property management or HOA before committing to a lease or purchase.'
    },
    {
      question: 'How do I find a new veterinarian in a new area?',
      answer: 'Ask for recommendations from friends, neighbors, or your previous vet. Check online reviews, verify credentials, and call ahead to ask about their experience with your pet\u2019s breed or health conditions. Many vets offer initial consultation visits. Request medical records from your previous vet to help establish continuity of care. Establish care before any emergencies arise.'
    }
  ];

  const prepSections = [
    { title: 'Create a Pet Relocation Plan', icon: '📋', detail: 'Research pet shipping options, airline pet policies, or driving arrangements based on distance.' },
    { title: 'Update Identification', icon: '🏷️', detail: 'Update microchip and tag information with new address and phone number before moving.' },
    { title: 'Schedule a Health Checkup', icon: '⚕️', detail: 'Get a clean bill of health and request medical records from your current veterinarian.' },
    { title: 'Gradual Acclimation', icon: '🚗', detail: 'Take car trips to familiarize your pet with travel, using positive reinforcement.' }
  ];

  const homeFeatures = [
    { feature: 'Secure Fencing', benefit: 'Essential for dogs—check for gaps and height appropriate for your pet.' },
    { feature: 'Pet-Proof Flooring', benefit: 'Tile, laminate, or sealed hardwood resists pet accidents and is easy to clean.' },
    { feature: 'Nearby Parks & Trails', benefit: 'Proximity to walking areas supports daily exercise and mental enrichment.' },
    { feature: 'Climate Control', benefit: 'Proper heating and cooling essential for cats and short-haired breeds.' },
    { feature: 'Separate Spaces', benefit: 'A laundry room or garage provides safe spaces during renovation or repairs.' },
    { feature: 'Low-Toxin Features', benefit: 'Avoid properties recently treated with pesticides or with toxic plants in the yard.' }
  ];

  const movingTips = [
    'Hire pet sitters or arrange for friends to stay with pets during final packing.',
    'Pack a pet emergency kit with medications, medical records, and comfort items.',
    'Never leave pets unattended during the moving process—stress and open doors create escape risks.',
    'Transport pets in a secured crate, carrier, or with a designated caregiver.',
    'Bring pets to the new home only after the first day of setup is complete.',
    'Set up a secure room with food, water, litter box, and familiar items first.'
  ];

  return (
    <div style={{ backgroundColor: 'var(--le-bg)', color: 'var(--le-text)', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
      {/* Hero Section */}
      <section style={{
        backgroundImage: 'linear-gradient(135deg, var(--le-primary) 0%, var(--le-accent) 100%)',
        color: 'white',
        padding: '60px 20px',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>
            <PawIcon />
          </div>
          <h1 style={{ fontSize: '42px', fontWeight: 'bold', marginBottom: '16px', lineHeight: '1.2' }}>
            The Complete Guide to Moving with Pets
          </h1>
          <p style={{ fontSize: '18px', opacity: 0.95, lineHeight: '1.6' }}>
            Make your pet\u2019s transition smooth with expert tips on preparation, finding pet-friendly homes, and settling in successfully.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section style={{ maxWidth: '1000px', margin: '0 auto', padding: '60px 20px' }}>
        
        {/* Preparing Your Pet Section */}
        <div style={{ marginBottom: '60px' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '32px', color: 'var(--le-primary)' }}>
            Preparing Your Pet for the Move
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
            {prepSections.map((section, idx) => (
              <div key={idx} style={{
                backgroundColor: 'var(--le-card-bg)',
                border: `1px solid var(--le-border)`,
                borderRadius: '8px',
                padding: '24px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '36px', marginBottom: '12px' }}>{section.icon}</div>
                <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>{section.title}</h3>
                <p style={{ fontSize: '14px', lineHeight: '1.5', opacity: 0.85 }}>{section.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Pet-Friendly Home Features */}
        <div style={{ marginBottom: '60px' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '32px', color: 'var(--le-primary)' }}>
            What to Look for in a Pet-Friendly Home
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            {homeFeatures.map((item, idx) => (
              <div key={idx} style={{
                display: 'flex',
                gap: '16px',
                padding: '16px',
                backgroundColor: 'var(--le-card-bg)',
                border: `1px solid var(--le-border)`,
                borderRadius: '6px'
              }}>
                <div style={{ color: 'var(--le-primary)', flexShrink: 0, marginTop: '2px' }}>
                  <CheckIcon />
                </div>
                <div>
                  <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '4px' }}>{item.feature}</h4>
                  <p style={{ fontSize: '14px', opacity: 0.8, lineHeight: '1.5' }}>{item.benefit}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Moving Day Tips */}
        <div style={{ marginBottom: '60px', backgroundColor: 'var(--le-card-bg)', borderRadius: '8px', padding: '32px', border: `1px solid var(--le-border)` }}>
          <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '24px', color: 'var(--le-primary)' }}>
            Moving Day Tips for Pet Owners
          </h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {movingTips.map((tip, idx) => (
              <li key={idx} style={{
                display: 'flex',
                gap: '16px',
                paddingBottom: '16px',
                marginBottom: '16px',
                borderBottom: idx !== movingTips.length - 1 ? `1px solid var(--le-border)` : 'none'
              }}>
                <span style={{ color: 'var(--le-primary)', flexShrink: 0, fontWeight: 'bold', marginTop: '2px' }}>
                  {idx + 1}.
                </span>
                <p style={{ fontSize: '15px', lineHeight: '1.6', margin: 0 }}>{tip}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Settling In */}
        <div style={{ marginBottom: '60px' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '24px', color: 'var(--le-primary)' }}>
            Settling Your Pet Into Your New Home
          </h2>
          <div style={{
            backgroundColor: 'var(--le-card-bg)',
            border: `1px solid var(--le-border)`,
            borderRadius: '8px',
            padding: '32px'
          }}>
            <p style={{ fontSize: '15px', lineHeight: '1.8', marginBottom: '16px' }}>
              Expect your pet to need 2-4 weeks to fully adjust to their new environment. Create a designated safe space with familiar bedding, toys, and access to food and water. Maintain consistent routines for meals and walks—predictability helps reduce anxiety.
            </p>
            <p style={{ fontSize: '15px', lineHeight: '1.8', marginBottom: '16px' }}>
              Introduce your pet to the new home room by room. Allow cats to explore at their own pace and consider keeping them indoors for the first few weeks. For dogs, establish a reliable recall command and always supervise initial outdoor time. Keep identification current in case they get lost during the transition.
            </p>
            <p style={{ fontSize: '15px', lineHeight: '1.8' }}>
              Schedule a veterinary checkup within the first two weeks. This establishes care with a new vet, ensures your pet\u2019s health following the move, and provides an opportunity to ask about local pet services, emergency clinics, and any location-specific health concerns.
            </p>
          </div>
        </div>

        {/* Pet Policies Section */}
        <div style={{ marginBottom: '60px' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '24px', color: 'var(--le-primary)' }}>
            Understanding Pet Policies: Rentals and HOAs
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            <div style={{
              backgroundColor: 'var(--le-card-bg)',
              border: `1px solid var(--le-border)`,
              borderRadius: '8px',
              padding: '24px'
            }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>Rental Properties</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '14px', lineHeight: '1.8' }}>
                <li style={{ marginBottom: '8px' }}>• Request pet policy in writing</li>
                <li style={{ marginBottom: '8px' }}>• Ask about pet deposit and monthly fees</li>
                <li style={{ marginBottom: '8px' }}>• Clarify breed and size restrictions</li>
                <li style={{ marginBottom: '8px' }}>• Understand liability insurance requirements</li>
                <li>• Negotiate pet agreements before signing lease</li>
              </ul>
            </div>
            <div style={{
              backgroundColor: 'var(--le-card-bg)',
              border: `1px solid var(--le-border)`,
              borderRadius: '8px',
              padding: '24px'
            }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>HOA Communities</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '14px', lineHeight: '1.8' }}>
                <li style={{ marginBottom: '8px' }}>• Review HOA rules and CC\u0026Rs documents</li>
                <li style={{ marginBottom: '8px' }}>• Understand breed and size restrictions</li>
                <li style={{ marginBottom: '8px' }}>• Check fence requirements and standards</li>
                <li style={{ marginBottom: '8px' }}>• Inquire about enforcement history</li>
                <li>• Ask about pet amenities or parks</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Vet Transition */}
        <div style={{ marginBottom: '60px', backgroundColor: 'var(--le-card-bg)', borderRadius: '8px', padding: '32px', border: `1px solid var(--le-border)` }}>
          <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '16px', color: 'var(--le-primary)' }}>
            Transitioning to a New Veterinarian
          </h2>
          <p style={{ fontSize: '15px', lineHeight: '1.8', marginBottom: '16px' }}>
            Finding a trusted veterinarian in your new area is crucial. Request your pet\u2019s complete medical history from your previous vet, including vaccination records, surgical history, and any ongoing health concerns. This helps your new vet provide continuity of care.
          </p>
          <p style={{ fontSize: '15px', lineHeight: '1.8', marginBottom: '16px' }}>
            When choosing a new vet, verify they\u2019re licensed and in good standing, check their hours and emergency services availability, and ask about their experience with your pet\u2019s specific needs. Many veterinary clinics offer new patient exams at standard rates.
          </p>
          <p style={{ fontSize: '15px', lineHeight: '1.8' }}>
            Schedule an appointment within two weeks of moving to ensure there are no health issues related to the move stress and to establish a baseline care relationship.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section style={{ backgroundColor: 'var(--le-card-bg)', padding: '60px 20px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '32px', color: 'var(--le-primary)', textAlign: 'center' }}>
            Frequently Asked Questions
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {faqItems.map((item, idx) => (
              <div key={idx} style={{
                border: `1px solid var(--le-border)`,
                borderRadius: '6px',
                backgroundColor: 'var(--le-bg)',
                overflow: 'hidden'
              }}>
                <button
                  onClick={() => setExpandedFAQ(expandedFAQ === idx ? null : idx)}
                  style={{
                    width: '100%',
                    padding: '16px',
                    textAlign: 'left',
                    border: 'none',
                    backgroundColor: 'transparent',
                    cursor: 'pointer',
                    fontSize: '15px',
                    fontWeight: '600',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    color: 'var(--le-text)',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--le-hover)')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  {item.question}
                  <span style={{
                    transform: expandedFAQ === idx ? 'rotate(180deg)' : 'rotate(0)',
                    transition: 'transform 0.3s',
                    flexShrink: 0,
                    marginLeft: '12px',
                    color: 'var(--le-primary)'
                  }}>
                    <ChevronIcon />
                  </span>
                </button>
                {expandedFAQ === idx && (
                  <div style={{
                    padding: '0 16px 16px 16px',
                    borderTop: `1px solid var(--le-border)`,
                    fontSize: '14px',
                    lineHeight: '1.7',
                    color: 'var(--le-text)',
                    opacity: 0.9
                  }}>
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Form Section */}
      <section style={{ backgroundColor: 'var(--le-bg)', padding: '60px 20px' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '16px', color: 'var(--le-primary)', textAlign: 'center' }}>
            Find Your Pet-Friendly Home
          </h2>
          <p style={{ fontSize: '15px', textAlign: 'center', marginBottom: '32px', opacity: 0.85, lineHeight: '1.6' }}>
            Let our real estate experts help you find the perfect pet-friendly home in your new area. Share your pet\u2019s needs and we\u2019ll match you with ideal properties.
          </p>
          <form onSubmit={handleFormSubmit} style={{
            backgroundColor: 'var(--le-card-bg)',
            border: `1px solid var(--le-border)`,
            borderRadius: '8px',
            padding: '32px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
                required
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: `1px solid var(--le-border)`,
                  borderRadius: '4px',
                  fontSize: '14px',
                  boxSizing: 'border-box',
                  backgroundColor: 'var(--le-bg)'
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleFormChange}
                required
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: `1px solid var(--le-border)`,
                  borderRadius: '4px',
                  fontSize: '14px',
                  boxSizing: 'border-box',
                  backgroundColor: 'var(--le-bg)'
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleFormChange}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: `1px solid var(--le-border)`,
                  borderRadius: '4px',
                  fontSize: '14px',
                  boxSizing: 'border-box',
                  backgroundColor: 'var(--le-bg)'
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>
                Pet Type
              </label>
              <select
                name="petType"
                value={formData.petType}
                onChange={handleFormChange}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: `1px solid var(--le-border)`,
                  borderRadius: '4px',
                  fontSize: '14px',
                  boxSizing: 'border-box',
                  backgroundColor: 'var(--le-bg)',
                  color: 'var(--le-text)'
                }}
              >
                <option value="">Select pet type</option>
                <option value="dog">Dog</option>
                <option value="cat">Cat</option>
                <option value="both">Both</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>
                Questions or Special Needs
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleFormChange}
                rows={4}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: `1px solid var(--le-border)`,
                  borderRadius: '4px',
                  fontSize: '14px',
                  boxSizing: 'border-box',
                  backgroundColor: 'var(--le-bg)',
                  color: 'var(--le-text)',
                  fontFamily: 'inherit',
                  resize: 'vertical'
                }}
              />
            </div>
            <button
              type="submit"
              style={{
                backgroundColor: 'var(--le-primary)',
                color: 'white',
                padding: '12px 24px',
                border: 'none',
                borderRadius: '4px',
                fontSize: '15px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              Get Pet-Friendly Home Recommendations
            </button>
          </form>
        </div>
      </section>

      {/* Footer CTA */}
      <section style={{
        backgroundColor: 'var(--le-primary)',
        color: 'white',
        padding: '48px 20px',
        textAlign: 'center'
      }}>
        <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '12px' }}>
          Ready to Find Your Perfect Pet-Friendly Home?
        </h2>
        <p style={{ fontSize: '16px', marginBottom: '24px', opacity: 0.95 }}>
          Our real estate experts specialize in helping pet owners find their ideal homes. Contact us today.
        </p>
        <button
          onClick={() => document.querySelector('input[name="email"]')?.scrollIntoView({ behavior: 'smooth' })}
          style={{
            backgroundColor: 'white',
            color: 'var(--le-primary)',
            padding: '12px 32px',
            border: 'none',
            borderRadius: '4px',
            fontSize: '15px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'opacity 0.2s'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
        >
          Start Now
        </button>
      </section>
    </div>
  );
}
