'use client'

import React, { useState } from 'react'

export default function HomeStagingPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    homeType: '',
    stagingNeeds: '',
  })

  const [formSubmitted, setFormSubmitted] = useState(false)

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormSubmitted(true)
    setTimeout(() => {
      setFormData({ name: '', email: '', phone: '', homeType: '', stagingNeeds: '' })
      setFormSubmitted(false)
    }, 3000)
  }

  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Guide',
            headline: 'The Complete Home Staging Guide for Real Estate Sellers',
            description:
              'Learn how home staging can help you sell your house faster and for more money with our comprehensive guide.',
            author: {
              '@type': 'Organization',
              name: 'LeadEngine',
              url: 'https://realtyclientengine.app',
            },
            datePublished: '2026-01-01',
            dateModified: '2026-04-02',
            image: 'https://realtyclientengine.app/og-image-staging.jpg',
            articleBody:
              'Home staging is the process of preparing your home for sale by making it appealing to potential buyers. Staged homes sell 73% faster and for up to 17% more money.',
          }),
        }}
      />

      {/* Hero Section */}
      <section
        style={{
          backgroundColor: 'var(--le-primary)',
          color: 'white',
          padding: '60px 20px',
          textAlign: 'center',
          minHeight: '500px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h1
            style={{
              fontSize: 'clamp(32px, 8vw, 64px)',
              fontWeight: '700',
              marginBottom: '20px',
              lineHeight: '1.2',
            }}
          >
            Sell Faster with Home Staging
          </h1>
          <p
            style={{
              fontSize: 'clamp(18px, 3vw, 28px)',
              marginBottom: '30px',
              opacity: '0.95',
              lineHeight: '1.5',
            }}
          >
            Transform your home into a buyer\u2019s dream and accelerate your sale
          </p>

          {/* Stats Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '30px',
              marginTop: '40px',
              marginBottom: '40px',
            }}
          >
            <div
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                padding: '25px',
                borderRadius: '12px',
                backdropFilter: 'blur(10px)',
              }}
            >
              <div
                style={{
                  fontSize: '42px',
                  fontWeight: '700',
                  marginBottom: '8px',
                }}
              >
                73%
              </div>
              <div style={{ fontSize: '16px', opacity: '0.9' }}>Faster Sales</div>
            </div>
            <div
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                padding: '25px',
                borderRadius: '12px',
                backdropFilter: 'blur(10px)',
              }}
            >
              <div
                style={{
                  fontSize: '42px',
                  fontWeight: '700',
                  marginBottom: '8px',
                }}
              >
                17%
              </div>
              <div style={{ fontSize: '16px', opacity: '0.9' }}>Higher Prices</div>
            </div>
            <div
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                padding: '25px',
                borderRadius: '12px',
                backdropFilter: 'blur(10px)',
              }}
            >
              <div
                style={{
                  fontSize: '42px',
                  fontWeight: '700',
                  marginBottom: '8px',
                }}
              >
                3-5x
              </div>
              <div style={{ fontSize: '16px', opacity: '0.9' }}>ROI on Staging</div>
            </div>
          </div>

          <button
            style={{
              backgroundColor: 'var(--le-accent)',
              color: 'white',
              border: 'none',
              padding: '16px 32px',
              fontSize: '18px',
              fontWeight: '600',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'background-color 0.3s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--le-primary-hover)')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--le-accent)')}
            onClick={() => document.getElementById('lead-capture')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Get Your Free Consultation
          </button>
        </div>
      </section>

      {/* Why Staging Works Section */}
      <section
        style={{
          backgroundColor: 'var(--le-bg)',
          color: 'var(--le-text)',
          padding: '60px 20px',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2
            style={{
              fontSize: '42px',
              fontWeight: '700',
              marginBottom: '40px',
              textAlign: 'center',
            }}
          >
            Why Staging Works
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '40px',
              marginBottom: '50px',
            }}
          >
            <div
              style={{
                backgroundColor: 'var(--le-bg-card)',
                padding: '30px',
                borderRadius: '12px',
                border: '1px solid var(--le-border)',
              }}
            >
              <div
                style={{
                  fontSize: '40px',
                  marginBottom: '15px',
                }}
              >
                🧠
              </div>
              <h3
                style={{
                  fontSize: '22px',
                  fontWeight: '600',
                  marginBottom: '15px',
                  color: 'var(--le-text)',
                }}
              >
                Buyer Psychology
              </h3>
              <p style={{ lineHeight: '1.6', color: 'var(--le-text-secondary)' }}>
                Buyers make emotional decisions in the first 30 seconds. Staging creates a positive first impression
                and helps them envision themselves living in your home.
              </p>
            </div>

            <div
              style={{
                backgroundColor: 'var(--le-bg-card)',
                padding: '30px',
                borderRadius: '12px',
                border: '1px solid var(--le-border)',
              }}
            >
              <div
                style={{
                  fontSize: '40px',
                  marginBottom: '15px',
                }}
              >
                📊
              </div>
              <h3
                style={{
                  fontSize: '22px',
                  fontWeight: '600',
                  marginBottom: '15px',
                  color: 'var(--le-text)',
                }}
              >
                Market Statistics
              </h3>
              <p style={{ lineHeight: '1.6', color: 'var(--le-text-secondary)' }}>
                90% of buyers look online first. Staged homes photograph better, get more views, and attract serious
                offers faster than unstaged homes.
              </p>
            </div>

            <div
              style={{
                backgroundColor: 'var(--le-bg-card)',
                padding: '30px',
                borderRadius: '12px',
                border: '1px solid var(--le-border)',
              }}
            >
              <div
                style={{
                  fontSize: '40px',
                  marginBottom: '15px',
                }}
              >
                💰
              </div>
              <h3
                style={{
                  fontSize: '22px',
                  fontWeight: '600',
                  marginBottom: '15px',
                  color: 'var(--le-text)',
                }}
              >
                Financial Impact
              </h3>
              <p style={{ lineHeight: '1.6', color: 'var(--le-text-secondary)' }}>
                The average staged home sells for $16,000 more than unstaged homes. The median staging cost is $1,500
                for maximum ROI.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Room-by-Room Staging Guide */}
      <section
        style={{
          backgroundColor: 'var(--le-bg-card)',
          color: 'var(--le-text)',
          padding: '60px 20px',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2
            style={{
              fontSize: '42px',
              fontWeight: '700',
              marginBottom: '50px',
              textAlign: 'center',
            }}
          >
            Room-by-Room Staging Guide
          </h2>

          {/* Living Room */}
          <div
            style={{
              marginBottom: '50px',
              backgroundColor: 'var(--le-bg)',
              padding: '30px',
              borderRadius: '12px',
              border: '1px solid var(--le-border)',
            }}
          >
            <h3
              style={{
                fontSize: '28px',
                fontWeight: '600',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <span style={{ fontSize: '32px' }}>🛋️</span> Living Room
            </h3>
            <ul
              style={{
                listStyle: 'none',
                padding: '0',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '15px',
              }}
            >
              <li
                style={{
                  padding: '12px 0',
                  borderBottom: '1px solid var(--le-border)',
                  color: 'var(--le-text-secondary)',
                }}
              >
                ✓ Declutter: Remove personal photos and excess furniture to open up the space
              </li>
              <li
                style={{
                  padding: '12px 0',
                  borderBottom: '1px solid var(--le-border)',
                  color: 'var(--le-text-secondary)',
                }}
              >
                ✓ Arrange furniture: Create conversational seating arrangements facing each other
              </li>
              <li
                style={{
                  padding: '12px 0',
                  borderBottom: '1px solid var(--le-border)',
                  color: 'var(--le-text-secondary)',
                }}
              >
                ✓ Add lighting: Use bright lamps and open all curtains to flood the room with natural light
              </li>
              <li
                style={{
                  padding: '12px 0',
                  borderBottom: '1px solid var(--le-border)',
                  color: 'var(--le-text-secondary)',
                }}
              >
                ✓ Neutral colors: Add throw pillows and blankets in neutral tones for comfort
              </li>
              <li
                style={{
                  padding: '12px 0',
                  borderBottom: '1px solid var(--le-border)',
                  color: 'var(--le-text-secondary)',
                }}
              >
                ✓ Wall decor: Hang artwork at eye level and keep it minimal and elegant
              </li>
              <li
                style={{
                  padding: '12px 0',
                  borderBottom: '1px solid var(--le-border)',
                  color: 'var(--le-text-secondary)',
                }}
              >
                ✓ Plants and greenery: Add fresh flowers or potted plants for life and color
              </li>
              <li
                style={{
                  padding: '12px 0',
                  borderBottom: '1px solid var(--le-border)',
                  color: 'var(--le-text-secondary)',
                }}
              >
                ✓ Remove clutter: Hide remotes, magazines, and TV equipment behind closed doors
              </li>
              <li
                style={{
                  padding: '12px 0',
                  color: 'var(--le-text-secondary)',
                }}
              >
                ✓ Scent: Use subtle air fresheners or light candles to create a welcoming atmosphere
              </li>
            </ul>
          </div>

          {/* Kitchen */}
          <div
            style={{
              marginBottom: '50px',
              backgroundColor: 'var(--le-bg)',
              padding: '30px',
              borderRadius: '12px',
              border: '1px solid var(--le-border)',
            }}
          >
            <h3
              style={{
                fontSize: '28px',
                fontWeight: '600',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <span style={{ fontSize: '32px' }}>👨‍🍳</span> Kitchen
            </h3>
            <ul
              style={{
                listStyle: 'none',
                padding: '0',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '15px',
              }}
            >
              <li
                style={{
                  padding: '12px 0',
                  borderBottom: '1px solid var(--le-border)',
                  color: 'var(--le-text-secondary)',
                }}
              >
                ✓ Clean thoroughly: Degrease appliances and ensure counters shine
              </li>
              <li
                style={{
                  padding: '12px 0',
                  borderBottom: '1px solid var(--le-border)',
                  color: 'var(--le-text-secondary)',
                }}
              >
                ✓ Clear countertops: Keep only essential appliances visible (coffee maker, toaster)
              </li>
              <li
                style={{
                  padding: '12px 0',
                  borderBottom: '1px solid var(--le-border)',
                  color: 'var(--le-text-secondary)',
                }}
              >
                ✓ Organize cabinets: Remove items from drawers so they close easily
              </li>
              <li
                style={{
                  padding: '12px 0',
                  borderBottom: '1px solid var(--le-border)',
                  color: 'var(--le-text-secondary)',
                }}
              >
                ✓ Add contrast: Include a fresh fruit bowl or neutral-colored kitchen linens
              </li>
              <li
                style={{
                  padding: '12px 0',
                  borderBottom: '1px solid var(--le-border)',
                  color: 'var(--le-text-secondary)',
                }}
              >
                ✓ Lighting: Ensure all lights work, especially under-cabinet lights
              </li>
              <li
                style={{
                  padding: '12px 0',
                  borderBottom: '1px solid var(--le-border)',
                  color: 'var(--le-text-secondary)',
                }}
              >
                ✓ Fix issues: Repair leaky faucets and update hardware if it looks dated
              </li>
              <li
                style={{
                  padding: '12px 0',
                  borderBottom: '1px solid var(--le-border)',
                  color: 'var(--le-text-secondary)',
                }}
              >
                ✓ Flooring: Ensure kitchen floors are sparkling clean and free of stains
              </li>
              <li
                style={{
                  padding: '12px 0',
                  color: 'var(--le-text-secondary)',
                }}
              >
                ✓ Backsplash: Clean grout and tiles to highlight architectural details
              </li>
            </ul>
          </div>

          {/* Master Bedroom */}
          <div
            style={{
              marginBottom: '50px',
              backgroundColor: 'var(--le-bg)',
              padding: '30px',
              borderRadius: '12px',
              border: '1px solid var(--le-border)',
            }}
          >
            <h3
              style={{
                fontSize: '28px',
                fontWeight: '600',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <span style={{ fontSize: '32px' }}>🛏️</span> Master Bedroom
            </h3>
            <ul
              style={{
                listStyle: 'none',
                padding: '0',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '15px',
              }}
            >
              <li
                style={{
                  padding: '12px 0',
                  borderBottom: '1px solid var(--le-border)',
                  color: 'var(--le-text-secondary)',
                }}
              >
                ✓ Make the bed: Use crisp, high-quality neutral-colored bedding
              </li>
              <li
                style={{
                  padding: '12px 0',
                  borderBottom: '1px solid var(--le-border)',
                  color: 'var(--le-text-secondary)',
                }}
              >
                ✓ Nightstands: Keep minimal items, perhaps a lamp and small decor piece
              </li>
              <li
                style={{
                  padding: '12px 0',
                  borderBottom: '1px solid var(--le-border)',
                  color: 'var(--le-text-secondary)',
                }}
              >
                ✓ Closet organization: Store seasonal items and excess clothing elsewhere
              </li>
              <li
                style={{
                  padding: '12px 0',
                  borderBottom: '1px solid var(--le-border)',
                  color: 'var(--le-text-secondary)',
                }}
              >
                ✓ Window treatments: Install neutral curtains that frame windows beautifully
              </li>
              <li
                style={{
                  padding: '12px 0',
                  borderBottom: '1px solid var(--le-border)',
                  color: 'var(--le-text-secondary)',
                }}
              >
                ✓ Remove personal items: Take down family photos and personal mementos
              </li>
              <li
                style={{
                  padding: '12px 0',
                  borderBottom: '1px solid var(--le-border)',
                  color: 'var(--le-text-secondary)',
                }}
              >
                ✓ Flooring: Vacuum carpets thoroughly or polish hardwood floors
              </li>
              <li
                style={{
                  padding: '12px 0',
                  borderBottom: '1px solid var(--le-border)',
                  color: 'var(--le-text-secondary)',
                }}
              >
                ✓ Mirror placement: Use mirrors to create the illusion of more space and light
              </li>
              <li
                style={{
                  padding: '12px 0',
                  color: 'var(--le-text-secondary)',
                }}
              >
                ✓ Peaceful ambiance: Add subtle artwork and minimal accessories for calm appeal
              </li>
            </ul>
          </div>

          {/* Bathroom */}
          <div
            style={{
              marginBottom: '50px',
              backgroundColor: 'var(--le-bg)',
              padding: '30px',
              borderRadius: '12px',
              border: '1px solid var(--le-border)',
            }}
          >
            <h3
              style={{
                fontSize: '28px',
                fontWeight: '600',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <span style={{ fontSize: '32px' }}>🚿</span> Bathroom
            </h3>
            <ul
              style={{
                listStyle: 'none',
                padding: '0',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '15px',
              }}
            >
              <li
                style={{
                  padding: '12px 0',
                  borderBottom: '1px solid var(--le-border)',
                  color: 'var(--le-text-secondary)',
                }}
              >
                ✓ Sparkling clean: Scrub tiles, grout, and fixtures until they gleam
              </li>
              <li
                style={{
                  padding: '12px 0',
                  borderBottom: '1px solid var(--le-border)',
                  color: 'var(--le-text-secondary)',
                }}
              >
                ✓ Declutter: Keep only essential items on countertops
              </li>
              <li
                style={{
                  padding: '12px 0',
                  borderBottom: '1px solid var(--le-border)',
                  color: 'var(--le-text-secondary)',
                }}
              >
                ✓ Organize under sink: Store all supplies in decorative baskets or bins
              </li>
              <li
                style={{
                  padding: '12px 0',
                  borderBottom: '1px solid var(--le-border)',
                  color: 'var(--le-text-secondary)',
                }}
              >
                ✓ Fluffy towels: Hang neutral-colored, fresh towels for a spa-like feel
              </li>
              <li
                style={{
                  padding: '12px 0',
                  borderBottom: '1px solid var(--le-border)',
                  color: 'var(--le-text-secondary)',
                }}
              >
                ✓ Lighting: Update bulbs for bright, flattering light
              </li>
              <li
                style={{
                  padding: '12px 0',
                  borderBottom: '1px solid var(--le-border)',
                  color: 'var(--le-text-secondary)',
                }}
              >
                ✓ Mirror cleanliness: Remove all fingerprints and streaks
              </li>
              <li
                style={{
                  padding: '12px 0',
                  borderBottom: '1px solid var(--le-border)',
                  color: 'var(--le-text-secondary)',
                }}
              >
                ✓ Ventilation: Ensure exhaust fan is working and moisture is controlled
              </li>
              <li
                style={{
                  padding: '12px 0',
                  color: 'var(--le-text-secondary)',
                }}
              >
                ✓ Scent: Use subtle air fresheners or have a bowl with potpourri
              </li>
            </ul>
          </div>

          {/* Dining Room */}
          <div
            style={{
              marginBottom: '50px',
              backgroundColor: 'var(--le-bg)',
              padding: '30px',
              borderRadius: '12px',
              border: '1px solid var(--le-border)',
            }}
          >
            <h3
              style={{
                fontSize: '28px',
                fontWeight: '600',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <span style={{ fontSize: '32px' }}>🍽️</span> Dining Room
            </h3>
            <ul
              style={{
                listStyle: 'none',
                padding: '0',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '15px',
              }}
            >
              <li
                style={{
                  padding: '12px 0',
                  borderBottom: '1px solid var(--le-border)',
                  color: 'var(--le-text-secondary)',
                }}
              >
                ✓ Clear table: Keep the dining table visible and uncluttered
              </li>
              <li
                style={{
                  padding: '12px 0',
                  borderBottom: '1px solid var(--le-border)',
                  color: 'var(--le-text-secondary)',
                }}
              >
                ✓ Centerpiece: Add fresh flowers or a simple, elegant table runner
              </li>
              <li
                style={{
                  padding: '12px 0',
                  borderBottom: '1px solid var(--le-border)',
                  color: 'var(--le-text-secondary)',
                }}
              >
                ✓ Lighting: Install or ensure chandelier lighting is attractive
              </li>
              <li
                style={{
                  padding: '12px 0',
                  borderBottom: '1px solid var(--le-border)',
                  color: 'var(--le-text-secondary)',
                }}
              >
                ✓ Seating: Arrange chairs to emphasize the size and layout of the room
              </li>
              <li
                style={{
                  padding: '12px 0',
                  borderBottom: '1px solid var(--le-border)',
                  color: 'var(--le-text-secondary)',
                }}
              >
                ✓ Wall decor: Hang artwork or use a decorative mirror as a focal point
              </li>
              <li
                style={{
                  padding: '12px 0',
                  borderBottom: '1px solid var(--le-border)',
                  color: 'var(--le-text-secondary)',
                }}
              >
                ✓ Flooring: Polish or vacuum to highlight the dining room\u2019s appeal
              </li>
              <li
                style={{
                  padding: '12px 0',
                  borderBottom: '1px solid var(--le-border)',
                  color: 'var(--le-text-secondary)',
                }}
              >
                ✓ Curtains: Ensure window treatments frame views and add elegance
              </li>
              <li
                style={{
                  padding: '12px 0',
                  color: 'var(--le-text-secondary)',
                }}
              >
                ✓ Ambiance: Create a warm, inviting space buyers can envision entertaining in
              </li>
            </ul>
          </div>

          {/* Home Office */}
          <div
            style={{
              marginBottom: '50px',
              backgroundColor: 'var(--le-bg)',
              padding: '30px',
              borderRadius: '12px',
              border: '1px solid var(--le-border)',
            }}
          >
            <h3
              style={{
                fontSize: '28px',
                fontWeight: '600',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <span style={{ fontSize: '32px' }}>💼</span> Home Office
            </h3>
            <ul
              style={{
                listStyle: 'none',
                padding: '0',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '15px',
              }}
            >
              <li
                style={{
                  padding: '12px 0',
                  borderBottom: '1px solid var(--le-border)',
                  color: 'var(--le-text-secondary)',
                }}
              >
                ✓ Organize desk: Clear clutter and arrange office supplies neatly
              </li>
              <li
                style={{
                  padding: '12px 0',
                  borderBottom: '1px solid var(--le-border)',
                  color: 'var(--le-text-secondary)',
                }}
              >
                ✓ Cable management: Hide wires and cables out of sight
              </li>
              <li
                style={{
                  padding: '12px 0',
                  borderBottom: '1px solid var(--le-border)',
                  color: 'var(--le-text-secondary)',
                }}
              >
                ✓ Furniture arrangement: Position desk to face the door or window
              </li>
              <li
                style={{
                  padding: '12px 0',
                  borderBottom: '1px solid var(--le-border)',
                  color: 'var(--le-text-secondary)',
                }}
              >
                ✓ Lighting: Ensure adequate natural light and add a desk lamp
              </li>
              <li
                style={{
                  padding: '12px 0',
                  borderBottom: '1px solid var(--le-border)',
                  color: 'var(--le-text-secondary)',
                }}
              >
                ✓ Decor: Add a few professional items like plants or artwork
              </li>
              <li
                style={{
                  padding: '12px 0',
                  borderBottom: '1px solid var(--le-border)',
                  color: 'var(--le-text-secondary)',
                }}
              >
                ✓ Storage: Use closed shelving to keep supplies organized and hidden
              </li>
              <li
                style={{
                  padding: '12px 0',
                  borderBottom: '1px solid var(--le-border)',
                  color: 'var(--le-text-secondary)',
                }}
              >
                ✓ Flooring: Ensure the floor is clean and consider adding a professional area rug
              </li>
              <li
                style={{
                  padding: '12px 0',
                  color: 'var(--le-text-secondary)',
                }}
              >
                ✓ Functionality: Demonstrate that the space is ideal for working from home
              </li>
            </ul>
          </div>

          {/* Outdoor Space */}
          <div
            style={{
              backgroundColor: 'var(--le-bg)',
              padding: '30px',
              borderRadius: '12px',
              border: '1px solid var(--le-border)',
            }}
          >
            <h3
              style={{
                fontSize: '28px',
                fontWeight: '600',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <span style={{ fontSize: '32px' }}>🏡</span> Outdoor Space
            </h3>
            <ul
              style={{
                listStyle: 'none',
                padding: '0',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '15px',
              }}
            >
              <li
                style={{
                  padding: '12px 0',
                  borderBottom: '1px solid var(--le-border)',
                  color: 'var(--le-text-secondary)',
                }}
              >
                ✓ Landscaping: Trim bushes, cut grass, and edge walkways neatly
              </li>
              <li
                style={{
                  padding: '12px 0',
                  borderBottom: '1px solid var(--le-border)',
                  color: 'var(--le-text-secondary)',
                }}
              >
                ✓ Patio setup: Arrange furniture to showcase outdoor living potential
              </li>
              <li
                style={{
                  padding: '12px 0',
                  borderBottom: '1px solid var(--le-border)',
                  color: 'var(--le-text-secondary)',
                }}
              >
                ✓ Potted plants: Add colorful flowers to garden beds and patios
              </li>
              <li
                style={{
                  padding: '12px 0',
                  borderBottom: '1px solid var(--le-border)',
                  color: 'var(--le-text-secondary)',
                }}
              >
                ✓ Lighting: Install outdoor lights to showcase the space at dusk
              </li>
              <li
                style={{
                  padding: '12px 0',
                  borderBottom: '1px solid var(--le-border)',
                  color: 'var(--le-text-secondary)',
                }}
              >
                ✓ Cleanliness: Remove outdoor clutter like toys, tools, and equipment
              </li>
              <li
                style={{
                  padding: '12px 0',
                  borderBottom: '1px solid var(--le-border)',
                  color: 'var(--le-text-secondary)',
                }}
              >
                ✓ Pool or deck: If applicable, ensure these are clean and well-maintained
              </li>
              <li
                style={{
                  padding: '12px 0',
                  borderBottom: '1px solid var(--le-border)',
                  color: 'var(--le-text-secondary)',
                }}
              >
                ✓ Pathways: Ensure walkways and driveways are clean and well-lit
              </li>
              <li
                style={{
                  padding: '12px 0',
                  color: 'var(--le-text-secondary)',
                }}
              >
                ✓ Appeal: Highlight outdoor entertaining and relaxation opportunities
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* DIY Staging Tips */}
      <section
        style={{
          backgroundColor: 'var(--le-bg)',
          color: 'var(--le-text)',
          padding: '60px 20px',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2
            style={{
              fontSize: '42px',
              fontWeight: '700',
              marginBottom: '40px',
              textAlign: 'center',
            }}
          >
            DIY Staging Tips: Budget-Friendly Solutions
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '25px',
            }}
          >
            {[
              '1. Rearrange furniture to create better flow and open sight lines',
              '2. Use throw pillows and blankets to add pops of color and comfort',
              '3. Buy inexpensive artwork from thrift stores and frame it nicely',
              '4. Add fresh paint to walls in neutral colors like white, beige, or gray',
              '5. Update light fixtures or add decorative lampshades for ambiance',
              '6. Plant flowers in flower beds and add mulch for curb appeal',
              '7. Clean and organize closets to show abundant storage space',
              '8. Use mirrors strategically to reflect light and create illusions of space',
              '9. Add outdoor planters with seasonal flowers by the front door',
              '10. Deep clean everything from baseboards to ceiling fans',
              '11. Remove personal family photos and replace with generic artwork',
              '12. Rent furniture if needed to fill large empty rooms',
              '13. Update cabinet hardware with modern, brushed nickel options',
              '14. Use area rugs to define spaces and add warmth',
              '15. Bake cookies or simmer cinnamon to create a welcoming scent',
            ].map((tip, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: 'var(--le-bg-card)',
                  padding: '20px',
                  borderRadius: '8px',
                  border: '1px solid var(--le-border)',
                  lineHeight: '1.6',
                  color: 'var(--le-text-secondary)',
                }}
              >
                {tip}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Professional Staging Section */}
      <section
        style={{
          backgroundColor: 'var(--le-bg-card)',
          color: 'var(--le-text)',
          padding: '60px 20px',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2
            style={{
              fontSize: '42px',
              fontWeight: '700',
              marginBottom: '40px',
              textAlign: 'center',
            }}
          >
            Professional Home Staging
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '40px',
              marginBottom: '50px',
            }}
          >
            <div
              style={{
                backgroundColor: 'var(--le-bg)',
                padding: '30px',
                borderRadius: '12px',
                border: '1px solid var(--le-border)',
              }}
            >
              <h3
                style={{
                  fontSize: '24px',
                  fontWeight: '600',
                  marginBottom: '15px',
                }}
              >
                What to Expect
              </h3>
              <ul
                style={{
                  listStyle: 'none',
                  padding: '0',
                  color: 'var(--le-text-secondary)',
                  lineHeight: '1.7',
                }}
              >
                <li style={{ marginBottom: '10px' }}>• Initial consultation and assessment</li>
                <li style={{ marginBottom: '10px' }}>• Detailed staging plan for each room</li>
                <li style={{ marginBottom: '10px' }}>• Professional furniture and decor sourcing</li>
                <li style={{ marginBottom: '10px' }}>• Full staging implementation</li>
                <li style={{ marginBottom: '10px' }}>• Post-staging touch-ups during showings</li>
              </ul>
            </div>

            <div
              style={{
                backgroundColor: 'var(--le-bg)',
                padding: '30px',
                borderRadius: '12px',
                border: '1px solid var(--le-border)',
              }}
            >
              <h3
                style={{
                  fontSize: '24px',
                  fontWeight: '600',
                  marginBottom: '15px',
                }}
              >
                Cost Breakdown
              </h3>
              <ul
                style={{
                  listStyle: 'none',
                  padding: '0',
                  color: 'var(--le-text-secondary)',
                  lineHeight: '1.7',
                }}
              >
                <li style={{ marginBottom: '10px' }}>• Consultation: $200-500</li>
                <li style={{ marginBottom: '10px' }}>• Basic staging (under 2000 sq ft): $1500-3000</li>
                <li style={{ marginBottom: '10px' }}>• Premium staging: $3000-10000+</li>
                <li style={{ marginBottom: '10px' }}>• Rental furniture: $800-2000/month</li>
                <li style={{ marginBottom: '10px' }}>• Accessories and decor: $500-1500</li>
              </ul>
            </div>

            <div
              style={{
                backgroundColor: 'var(--le-bg)',
                padding: '30px',
                borderRadius: '12px',
                border: '1px solid var(--le-border)',
              }}
            >
              <h3
                style={{
                  fontSize: '24px',
                  fontWeight: '600',
                  marginBottom: '15px',
                }}
              >
                ROI Statistics
              </h3>
              <ul
                style={{
                  listStyle: 'none',
                  padding: '0',
                  color: 'var(--le-text-secondary)',
                  lineHeight: '1.7',
                }}
              >
                <li style={{ marginBottom: '10px' }}>• Average return: 300-500% on investment</li>
                <li style={{ marginBottom: '10px' }}>• Price increase: $15000-20000 on average</li>
                <li style={{ marginBottom: '10px' }}>• Time to sell: 7-14 days vs 30+ days</li>
                <li style={{ marginBottom: '10px' }}>• Buyer interest: 90% more inquiries</li>
                <li style={{ marginBottom: '10px' }}>• Showings: 25% more foot traffic</li>
              </ul>
            </div>
          </div>

          <div
            style={{
              backgroundColor: 'var(--le-bg)',
              padding: '30px',
              borderRadius: '12px',
              border: '1px solid var(--le-border)',
            }}
          >
            <h3
              style={{
                fontSize: '26px',
                fontWeight: '600',
                marginBottom: '20px',
              }}
            >
              When Professional Staging Makes Sense
            </h3>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '15px',
              }}
            >
              <div style={{ color: 'var(--le-text-secondary)', lineHeight: '1.6' }}>
                <strong style={{ color: 'var(--le-text)' }}>Luxury Homes</strong>
                <p>
                  High-end properties benefit significantly from professional staging to showcase their best features.
                </p>
              </div>
              <div style={{ color: 'var(--le-text-secondary)', lineHeight: '1.6' }}>
                <strong style={{ color: 'var(--le-text)' }}>Vacant Properties</strong>
                <p>
                  Empty homes look larger but colder. Professional staging adds warmth and defines spaces.
                </p>
              </div>
              <div style={{ color: 'var(--le-text-secondary)', lineHeight: '1.6' }}>
                <strong style={{ color: 'var(--le-text)' }}>Listing Challenges</strong>
                <p>
                  If your home isn\u2019t selling, professional staging can help identify and fix the issues.
                </p>
              </div>
              <div style={{ color: 'var(--le-text-secondary)', lineHeight: '1.6' }}>
                <strong style={{ color: 'var(--le-text)' }}>Time Constraints</strong>
                <p>
                  If you\u2019re selling quickly, professionals can transform your home in days, not weeks.
                </p>
              </div>
              <div style={{ color: 'var(--le-text-secondary)', lineHeight: '1.6' }}>
                <strong style={{ color: 'var(--le-text)' }}>Multiple Properties</strong>
                <p>
                  Selling multiple homes? Professionals ensure consistency across all listings.
                </p>
              </div>
              <div style={{ color: 'var(--le-text-secondary)', lineHeight: '1.6' }}>
                <strong style={{ color: 'var(--le-text)' }}>Market Competitiveness</strong>
                <p>
                  In competitive markets, professional staging gives you a significant advantage.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Virtual Staging Section */}
      <section
        style={{
          backgroundColor: 'var(--le-bg)',
          color: 'var(--le-text)',
          padding: '60px 20px',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2
            style={{
              fontSize: '42px',
              fontWeight: '700',
              marginBottom: '40px',
              textAlign: 'center',
            }}
          >
            Virtual Staging: Digital Solutions
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '40px',
              marginBottom: '50px',
            }}
          >
            <div
              style={{
                backgroundColor: 'var(--le-bg-card)',
                padding: '30px',
                borderRadius: '12px',
                border: '1px solid var(--le-border)',
              }}
            >
              <h3
                style={{
                  fontSize: '24px',
                  fontWeight: '600',
                  marginBottom: '15px',
                }}
              >
                How Virtual Staging Works
              </h3>
              <p style={{ color: 'var(--le-text-secondary)', lineHeight: '1.7', marginBottom: '15px' }}>
                Virtual staging uses AI and digital design to add furniture and decor to empty or poorly furnished
                rooms. Professional designers digitally place realistic furniture in photos to help buyers visualize
                the space.
              </p>
              <ul
                style={{
                  listStyle: 'none',
                  padding: '0',
                  color: 'var(--le-text-secondary)',
                }}
              >
                <li style={{ marginBottom: '10px' }}>• Quick turnaround: 24-48 hours</li>
                <li style={{ marginBottom: '10px' }}>• Cost-effective alternative to physical staging</li>
                <li style={{ marginBottom: '10px' }}>• Perfect for vacant homes</li>
                <li style={{ marginBottom: '10px' }}>• Multiple design options to choose from</li>
              </ul>
            </div>

            <div
              style={{
                backgroundColor: 'var(--le-bg-card)',
                padding: '30px',
                borderRadius: '12px',
                border: '1px solid var(--le-border)',
              }}
            >
              <h3
                style={{
                  fontSize: '24px',
                  fontWeight: '600',
                  marginBottom: '15px',
                }}
              >
                Cost Comparison
              </h3>
              <div style={{ marginBottom: '20px' }}>
                <div style={{ marginBottom: '15px' }}>
                  <strong style={{ color: 'var(--le-text)' }}>Virtual Staging:</strong>
                  <p style={{ color: 'var(--le-text-secondary)' }}>$75-250 per room, $500-2000 per home</p>
                </div>
                <div style={{ marginBottom: '15px' }}>
                  <strong style={{ color: 'var(--le-text)' }}>Physical Staging:</strong>
                  <p style={{ color: 'var(--le-text-secondary)' }}>$1500-10000+ per home</p>
                </div>
                <div>
                  <strong style={{ color: 'var(--le-text)' }}>DIY Staging:</strong>
                  <p style={{ color: 'var(--le-text-secondary)' }}>$200-1500 in supplies and accessories</p>
                </div>
              </div>
            </div>

            <div
              style={{
                backgroundColor: 'var(--le-bg-card)',
                padding: '30px',
                borderRadius: '12px',
                border: '1px solid var(--le-border)',
              }}
            >
              <h3
                style={{
                  fontSize: '24px',
                  fontWeight: '600',
                  marginBottom: '15px',
                }}
              >
                Best Use Cases
              </h3>
              <ul
                style={{
                  listStyle: 'none',
                  padding: '0',
                  color: 'var(--le-text-secondary)',
                  lineHeight: '1.7',
                }}
              >
                <li style={{ marginBottom: '10px' }}>• Vacant homes awaiting move-in</li>
                <li style={{ marginBottom: '10px' }}>• Homes with cluttered or dated furniture</li>
                <li style={{ marginBottom: '10px' }}>• Online listings needing visual appeal</li>
                <li style={{ marginBottom: '10px' }}>• Budget-conscious sellers</li>
                <li style={{ marginBottom: '10px' }}>• Showing multiple design options</li>
              </ul>
            </div>
          </div>

          <div
            style={{
              backgroundColor: 'var(--le-bg-card)',
              padding: '30px',
              borderRadius: '12px',
              border: '1px solid var(--le-border)',
            }}
          >
            <h3
              style={{
                fontSize: '26px',
                fontWeight: '600',
                marginBottom: '20px',
              }}
            >
              Virtual Staging Limitations
            </h3>
            <ul
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '15px',
                listStyle: 'none',
                padding: '0',
              }}
            >
              <li style={{ color: 'var(--le-text-secondary)' }}>
                • Doesn\u2019t replace actual home tours and inspections
              </li>
              <li style={{ color: 'var(--le-text-secondary)' }}>
                • Some buyers may feel misled by unrealistic renderings
              </li>
              <li style={{ color: 'var(--le-text-secondary)' }}>
                • Quality varies depending on designer and software used
              </li>
              <li style={{ color: 'var(--le-text-secondary)' }}>
                • May need physical staging for open houses
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 30-Day Decluttering Challenge */}
      <section
        style={{
          backgroundColor: 'var(--le-bg-card)',
          color: 'var(--le-text)',
          padding: '60px 20px',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2
            style={{
              fontSize: '42px',
              fontWeight: '700',
              marginBottom: '15px',
              textAlign: 'center',
            }}
          >
            The 30-Day Decluttering Challenge
          </h2>
          <p
            style={{
              textAlign: 'center',
              fontSize: '18px',
              color: 'var(--le-text-secondary)',
              marginBottom: '40px',
            }}
          >
            Prepare your home for listing by systematically decluttering over the next month
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '20px',
            }}
          >
            {[
              { week: 'Week 1', tasks: 'Closets & Wardrobes: Sort clothing and remove out-of-season items' },
              { week: 'Week 1', tasks: 'Kitchen: Declutter drawers, cabinets, and pantry' },
              { week: 'Week 1', tasks: 'Bedroom: Remove excess pillows, blankets, and nightstand items' },
              { week: 'Week 1', tasks: 'Garage: Organize tools and create designated storage zones' },
              { week: 'Week 2', tasks: 'Living Room: Remove excess books, magazines, and decorations' },
              { week: 'Week 2', tasks: 'Bathrooms: Clean out expired products and organize under-sink items' },
              { week: 'Week 2', tasks: 'Dining Room: Remove unnecessary serving dishes and table items' },
              { week: 'Week 2', tasks: 'Office: Sort files and organize desk surfaces' },
              { week: 'Week 3', tasks: 'Entryways: Remove shoes, coats, and accumulating items' },
              { week: 'Week 3', tasks: 'Basement/Attic: Remove boxes and stored items' },
              { week: 'Week 3', tasks: 'Laundry Room: Organize supplies and remove clutter' },
              { week: 'Week 3', tasks: 'Outdoor Areas: Remove patio furniture and garden clutter' },
              { week: 'Week 4', tasks: 'Final Walkthrough: Declutter any remaining problem areas' },
              { week: 'Week 4', tasks: 'Deep Clean: Professional cleaning after decluttering' },
              { week: 'Week 4', tasks: 'Final Touches: Add staging elements and prepare for showings' },
            ].map((item, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: 'var(--le-bg)',
                  padding: '20px',
                  borderRadius: '8px',
                  border: '1px solid var(--le-border)',
                }}
              >
                <div
                  style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: 'var(--le-primary)',
                    marginBottom: '8px',
                  }}
                >
                  {item.week}
                </div>
                <div style={{ color: 'var(--le-text-secondary)', fontSize: '15px' }}>
                  {item.tasks}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curb Appeal Checklist */}
      <section
        style={{
          backgroundColor: 'var(--le-bg)',
          color: 'var(--le-text)',
          padding: '60px 20px',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2
            style={{
              fontSize: '42px',
              fontWeight: '700',
              marginBottom: '40px',
              textAlign: 'center',
            }}
          >
            Curb Appeal Checklist: 12 Exterior Improvements
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '25px',
            }}
          >
            {[
              { num: '1', title: 'Fresh Paint', desc: 'Paint front door and trim in bold, welcoming colors' },
              { num: '2', title: 'Landscaping', desc: 'Trim bushes, mulch flower beds, and edge walkways' },
              { num: '3', title: 'New Roof', desc: 'Replace damaged shingles or clean existing roof' },
              { num: '4', title: 'Power Wash', desc: 'Clean driveway, sidewalk, and exterior siding' },
              { num: '5', title: 'Lighting', desc: 'Install attractive exterior lights by entrance' },
              { num: '6', title: 'Mailbox', desc: 'Replace damaged or outdated mailbox' },
              { num: '7', title: 'Plants', desc: 'Add colorful flowers in pots and landscaping' },
              { num: '8', title: 'Doors & Hardware', desc: 'Update door handles, locks, and house numbers' },
              { num: '9', title: 'Windows', desc: 'Clean windows and repair screens or damaged panes' },
              { num: '10', title: 'Gutters', desc: 'Clean gutters and downspouts' },
              { num: '11', title: 'Driveway', desc: 'Seal cracks or fill potholes in driveway' },
              { num: '12', title: 'Porch Area', desc: 'Add seating and welcoming décor to entryway' },
            ].map((item, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: 'var(--le-bg-card)',
                  padding: '25px',
                  borderRadius: '12px',
                  border: '1px solid var(--le-border)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '12px',
                  }}
                >
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      backgroundColor: 'var(--le-primary)',
                      color: 'white',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: '600',
                    }}
                  >
                    {item.num}
                  </div>
                  <h3
                    style={{
                      fontSize: '18px',
                      fontWeight: '600',
                      margin: '0',
                    }}
                  >
                    {item.title}
                  </h3>
                </div>
                <p style={{ color: 'var(--le-text-secondary)', margin: '0', lineHeight: '1.5' }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Photography Tips */}
      <section
        style={{
          backgroundColor: 'var(--le-bg-card)',
          color: 'var(--le-text)',
          padding: '60px 20px',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2
            style={{
              fontSize: '42px',
              fontWeight: '700',
              marginBottom: '40px',
              textAlign: 'center',
            }}
          >
            Photography Tips: Preparing for Listing Photos
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '30px',
            }}
          >
            <div
              style={{
                backgroundColor: 'var(--le-bg)',
                padding: '30px',
                borderRadius: '12px',
                border: '1px solid var(--le-border)',
              }}
            >
              <h3
                style={{
                  fontSize: '22px',
                  fontWeight: '600',
                  marginBottom: '15px',
                }}
              >
                Before Photo Day
              </h3>
              <ul
                style={{
                  listStyle: 'none',
                  padding: '0',
                  color: 'var(--le-text-secondary)',
                  lineHeight: '1.8',
                }}
              >
                <li>• Stage the home completely one day before</li>
                <li>• Do final deep cleaning the night before</li>
                <li>• Open all curtains and blinds for natural light</li>
                <li>• Remove all personal items and family photos</li>
                <li>• Make beds with fresh, neutral-colored linens</li>
                <li>• Turn on all interior lights</li>
              </ul>
            </div>

            <div
              style={{
                backgroundColor: 'var(--le-bg)',
                padding: '30px',
                borderRadius: '12px',
                border: '1px solid var(--le-border)',
              }}
            >
              <h3
                style={{
                  fontSize: '22px',
                  fontWeight: '600',
                  marginBottom: '15px',
                }}
              >
                During Photography
              </h3>
              <ul
                style={{
                  listStyle: 'none',
                  padding: '0',
                  color: 'var(--le-text-secondary)',
                  lineHeight: '1.8',
                }}
              >
                <li>• Schedule photos on a clear, sunny day</li>
                <li>• Shoot outdoor areas at golden hour</li>
                <li>• Use wide-angle lenses to make rooms look spacious</li>
                <li>• Capture multiple angles of each room</li>
                <li>• Include architectural details and storage spaces</li>
                <li>• Get aerial drone shots if possible</li>
              </ul>
            </div>

            <div
              style={{
                backgroundColor: 'var(--le-bg)',
                padding: '30px',
                borderRadius: '12px',
                border: '1px solid var(--le-border)',
              }}
            >
              <h3
                style={{
                  fontSize: '22px',
                  fontWeight: '600',
                  marginBottom: '15px',
                }}
              >
                After Photography
              </h3>
              <ul
                style={{
                  listStyle: 'none',
                  padding: '0',
                  color: 'var(--le-text-secondary)',
                  lineHeight: '1.8',
                }}
              >
                <li>• Request professional editing and retouching</li>
                <li>• Consider virtual staging for empty rooms</li>
                <li>• Create a professional photo album for listing</li>
                <li>• Use high-resolution images for all platforms</li>
                <li>• Optimize photos for online listings</li>
                <li>• Create a video walkthrough if possible</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Common Staging Mistakes */}
      <section
        style={{
          backgroundColor: 'var(--le-bg)',
          color: 'var(--le-text)',
          padding: '60px 20px',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2
            style={{
              fontSize: '42px',
              fontWeight: '700',
              marginBottom: '40px',
              textAlign: 'center',
            }}
          >
            8 Common Staging Mistakes to Avoid
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '30px',
            }}
          >
            {[
              {
                title: 'Over-Personalizing',
                desc: 'Removing family photos and personal memorabilia helps buyers envision their own life in the space.',
              },
              {
                title: 'Strong Odors',
                desc: 'Avoid heavy perfumes, cooking smells, or pet odors. Fresh, neutral scents are ideal.',
              },
              {
                title: 'Cluttered Countertops',
                desc: 'Keep surfaces clear and organized. Too many items make spaces feel smaller and chaotic.',
              },
              {
                title: 'Dark Rooms',
                desc: 'Open all curtains and add lighting. Well-lit homes feel larger and more inviting.',
              },
              {
                title: 'Mismatched Furniture',
                desc: 'Use furniture that matches in style and scale. Consistency creates a cohesive feel.',
              },
              {
                title: 'Outdated Styles',
                desc: 'Update decor to be neutral and timeless. Avoid trendy or dated design elements.',
              },
              {
                title: 'Pets and Evidence',
                desc: 'Keep pets out of sight during showings. Hide pet beds, toys, and litter boxes.',
              },
              {
                title: 'Overstaging',
                desc: 'Balance is key. Too much staging can feel artificial. Aim for a livable, comfortable feel.',
              },
            ].map((mistake, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: 'var(--le-bg-card)',
                  padding: '30px',
                  borderRadius: '12px',
                  border: `2px solid var(--le-warning)`,
                }}
              >
                <h3
                  style={{
                    fontSize: '20px',
                    fontWeight: '600',
                    marginBottom: '12px',
                    color: 'var(--le-warning)',
                  }}
                >
                  ✗ {mistake.title}
                </h3>
                <p style={{ color: 'var(--le-text-secondary)', lineHeight: '1.6', margin: '0' }}>
                  {mistake.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Capture Section */}
      <section
        id="lead-capture"
        style={{
          backgroundColor: 'var(--le-primary)',
          color: 'white',
          padding: '60px 20px',
        }}
      >
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <h2
            style={{
              fontSize: '42px',
              fontWeight: '700',
              marginBottom: '15px',
              textAlign: 'center',
            }}
          >
            Get Your Free Staging Consultation
          </h2>
          <p
            style={{
              fontSize: '18px',
              textAlign: 'center',
              marginBottom: '35px',
              opacity: '0.95',
            }}
          >
            Let our expert team help you prepare your home for the market
          </p>

          {formSubmitted ? (
            <div
              style={{
                backgroundColor: 'var(--le-success)',
                color: 'white',
                padding: '20px',
                borderRadius: '8px',
                textAlign: 'center',
                fontSize: '16px',
              }}
            >
              Thank you! We\u2019ll contact you within 24 hours with your free staging consultation.
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <input
                type="text"
                name="name"
                placeholder="Your Full Name"
                value={formData.name}
                onChange={handleFormChange}
                required
                style={{
                  padding: '12px 15px',
                  fontSize: '16px',
                  borderRadius: '6px',
                  border: 'none',
                  fontFamily: 'inherit',
                }}
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email Address"
                value={formData.email}
                onChange={handleFormChange}
                required
                style={{
                  padding: '12px 15px',
                  fontSize: '16px',
                  borderRadius: '6px',
                  border: 'none',
                  fontFamily: 'inherit',
                }}
              />
              <input
                type="tel"
                name="phone"
                placeholder="Your Phone Number"
                value={formData.phone}
                onChange={handleFormChange}
                required
                style={{
                  padding: '12px 15px',
                  fontSize: '16px',
                  borderRadius: '6px',
                  border: 'none',
                  fontFamily: 'inherit',
                }}
              />
              <select
                name="homeType"
                value={formData.homeType}
                onChange={handleFormChange}
                required
                style={{
                  padding: '12px 15px',
                  fontSize: '16px',
                  borderRadius: '6px',
                  border: 'none',
                  fontFamily: 'inherit',
                  cursor: 'pointer',
                }}
              >
                <option value="">Select Home Type</option>
                <option value="single-family">Single Family Home</option>
                <option value="condo">Condo/Townhouse</option>
                <option value="multi-family">Multi-Family</option>
                <option value="other">Other</option>
              </select>
              <textarea
                name="stagingNeeds"
                placeholder="Tell us about your staging needs..."
                value={formData.stagingNeeds}
                onChange={handleFormChange}
                rows={4}
                style={{
                  padding: '12px 15px',
                  fontSize: '16px',
                  borderRadius: '6px',
                  border: 'none',
                  fontFamily: 'inherit',
                  resize: 'vertical',
                }}
              />
              <button
                type="submit"
                style={{
                  backgroundColor: 'var(--le-accent)',
                  color: 'white',
                  border: 'none',
                  padding: '14px 28px',
                  fontSize: '16px',
                  fontWeight: '600',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
              >
                Request Free Consultation
              </button>
            </form>
          )}

          <p
            style={{
              textAlign: 'center',
              fontSize: '14px',
              marginTop: '20px',
              opacity: '0.85',
            }}
          >
            We respect your privacy. Your information will never be shared with third parties.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section
        style={{
          backgroundColor: 'var(--le-bg)',
          color: 'var(--le-text)',
          padding: '60px 20px',
        }}
      >
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2
            style={{
              fontSize: '42px',
              fontWeight: '700',
              marginBottom: '40px',
              textAlign: 'center',
            }}
          >
            Frequently Asked Questions
          </h2>

          <div style={{ display: 'grid', gap: '20px' }}>
            {[
              {
                q: 'How long does home staging take?',
                a: 'Professional staging typically takes 1-3 days depending on home size. DIY staging can take 2-4 weeks spread over the month before listing.',
              },
              {
                q: 'Is staging worth the cost?',
                a: 'Yes! Staged homes sell 73% faster and for 15-17% more. The average ROI is 300-500%, making staging a smart investment.',
              },
              {
                q: 'Do I have to stage every room?',
                a: 'Focus on key rooms: living room, kitchen, master bedroom, and bathrooms. These have the biggest impact on buyer perception.',
              },
              {
                q: 'Can I stage a home while still living in it?',
                a: 'Yes, but it\u2019s challenging. Professional stagers can work around your schedule, or you can DIY stage gradually.',
              },
              {
                q: 'What\u2019s the best time to stage a home?',
                a: 'Stage before professional photos are taken. Ideally, complete staging 1-2 weeks before listing goes live online.',
              },
              {
                q: 'How much will I save by staging myself?',
                a: 'DIY staging costs $200-1500 in supplies vs $1500-10000+ for professional staging. Time investment is significant.',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: 'var(--le-bg-card)',
                  padding: '25px',
                  borderRadius: '12px',
                  border: '1px solid var(--le-border)',
                }}
              >
                <h3
                  style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    marginBottom: '12px',
                    color: 'var(--le-primary)',
                  }}
                >
                  Q: {item.q}
                </h3>
                <p style={{ color: 'var(--le-text-secondary)', lineHeight: '1.6', margin: '0' }}>
                  A: {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section
        style={{
          backgroundColor: 'var(--le-primary)',
          color: 'white',
          padding: '50px 20px',
          textAlign: 'center',
        }}
      >
        <h2
          style={{
            fontSize: '36px',
            fontWeight: '700',
            marginBottom: '20px',
          }}
        >
          Ready to Sell Your Home Faster?
        </h2>
        <p
          style={{
            fontSize: '18px',
            marginBottom: '30px',
            opacity: '0.95',
          }}
        >
          Contact us today for a free staging consultation and take the first step toward a successful sale
        </p>
        <button
          style={{
            backgroundColor: 'var(--le-accent)',
            color: 'white',
            border: 'none',
            padding: '14px 32px',
            fontSize: '16px',
            fontWeight: '600',
            borderRadius: '6px',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          onClick={() => document.getElementById('lead-capture')?.scrollIntoView({ behavior: 'smooth' })}
        >
          Get Your Free Consultation
        </button>
      </section>
    </div>
  )
}
