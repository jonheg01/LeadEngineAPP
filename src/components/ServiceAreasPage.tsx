'use client';

import React, { useState, useMemo } from 'react';

interface ServiceArea {
  id: string;
  name: string;
  category: 'Urban' | 'Suburban' | 'Luxury' | 'Family-Friendly' | 'Up-and-Coming';
  description: string;
  medianPrice: number;
  daysOnMarket: number;
  schoolsRating: number;
  walkabilityScore: number;
  population: number;
  priceChange: number;
  schoolDistricts: string[];
  amenities: string[];
  marketTrend: string;
}

const AREAS_DATA: ServiceArea[] = [
  {
    id: 'downtown-district',
    name: 'Downtown District',
    category: 'Urban',
    description: 'Vibrant urban center with modern apartments, walkable streets, and dining scene',
    medianPrice: 525000,
    daysOnMarket: 18,
    schoolsRating: 8,
    walkabilityScore: 95,
    population: 24500,
    priceChange: 12.5,
    schoolDistricts: ['Central High School District', 'Metropolitan Elementary Schools'],
    amenities: ['Farmers Market', 'Art District', 'Transit Hub', 'Fine Dining'],
    marketTrend: 'Strong buyer demand with young professionals moving in. Limited inventory driving prices up.'
  },
  {
    id: 'riverside-heights',
    name: 'Riverside Heights',
    category: 'Luxury',
    description: 'Exclusive riverfront community with estate homes and premium amenities',
    medianPrice: 1850000,
    daysOnMarket: 42,
    schoolsRating: 9,
    walkabilityScore: 68,
    population: 8200,
    priceChange: 8.3,
    schoolDistricts: ['Riverside Academy', 'Elite Preparatory School'],
    amenities: ['Private Club', 'Marina', 'Golf Course', 'Spa & Wellness'],
    marketTrend: 'Exclusive market with high-net-worth buyers. Slower sales but premium pricing holds steady.'
  },
  {
    id: 'oak-park-estates',
    name: 'Oak Park Estates',
    category: 'Family-Friendly',
    description: 'Family-oriented neighborhood with top-rated schools and safe tree-lined streets',
    medianPrice: 685000,
    daysOnMarket: 24,
    schoolsRating: 9,
    walkabilityScore: 72,
    population: 18900,
    priceChange: 9.7,
    schoolDistricts: ['Oak Park High School', 'Estates Elementary', 'Meadow Middle School'],
    amenities: ['Parks & Playgrounds', 'Community Center', 'Swimming Pool', 'Library'],
    marketTrend: 'High demand from families. Schools reputation drives consistent buyer interest.'
  },
  {
    id: 'lakewood-commons',
    name: 'Lakewood Commons',
    category: 'Suburban',
    description: 'Established suburban community with diverse housing and excellent value',
    medianPrice: 445000,
    daysOnMarket: 20,
    schoolsRating: 7,
    walkabilityScore: 55,
    population: 22100,
    priceChange: 6.2,
    schoolDistricts: ['Lakewood Central High School', 'Commons Middle School'],
    amenities: ['Shopping Center', 'Recreation Center', 'Bike Trails', 'Farmers Market'],
    marketTrend: 'Steady appreciation with first-time homebuyers entering market. Good inventory levels.'
  },
  {
    id: 'hillcrest-village',
    name: 'Hillcrest Village',
    category: 'Up-and-Coming',
    description: 'Emerging neighborhood with new development, revitalization projects, and growth potential',
    medianPrice: 385000,
    daysOnMarket: 22,
    schoolsRating: 6,
    walkabilityScore: 58,
    population: 16800,
    priceChange: 15.8,
    schoolDistricts: ['Hillcrest High School', 'Village Charter Schools'],
    amenities: ['New Development', 'Coffee Shops', 'Fitness Studios', 'Creative Spaces'],
    marketTrend: 'Rapid appreciation as investors discover area. New apartments and mixed-use spaces driving growth.'
  },
  {
    id: 'cedar-ridge',
    name: 'Cedar Ridge',
    category: 'Luxury',
    description: 'Prestigious hilltop enclave with panoramic views and exclusive properties',
    medianPrice: 2100000,
    daysOnMarket: 48,
    schoolsRating: 9,
    walkabilityScore: 45,
    population: 5600,
    priceChange: 5.1,
    schoolDistricts: ['Ridge Academy', 'Premium Independent Schools'],
    amenities: ['Private Security', 'Championship Golf', 'Fine Dining', 'Wine Club'],
    marketTrend: 'Ultra-luxury market with selective buyers. Properties highly sought by executives and investors.'
  },
  {
    id: 'maple-grove',
    name: 'Maple Grove',
    category: 'Family-Friendly',
    description: 'Charming neighborhood known for beautiful homes, quiet streets, and strong sense of community',
    medianPrice: 625000,
    daysOnMarket: 25,
    schoolsRating: 8,
    walkabilityScore: 68,
    population: 19400,
    priceChange: 7.9,
    schoolDistricts: ['Maple Grove High School', 'Grove Elementary School', 'Oak Middle School'],
    amenities: ['Community Events', 'Parks', 'Local Shops', 'Coffee Culture'],
    marketTrend: 'Consistent family migration. Strong community vibe attracts long-term residents.'
  },
  {
    id: 'sunset-valley',
    name: 'Sunset Valley',
    category: 'Suburban',
    description: 'Growing suburban area with new construction, shopping, and expanding amenities',
    medianPrice: 495000,
    daysOnMarket: 19,
    schoolsRating: 7,
    walkabilityScore: 62,
    population: 21200,
    priceChange: 11.3,
    schoolDistricts: ['Valley High School', 'Sunset Elementary', 'Valley Springs Middle'],
    amenities: ['New Shopping', 'Restaurants', 'Parks', 'Entertainment Venues'],
    marketTrend: 'Rapid expansion with new construction. Growing job market attracting professionals.'
  },
  {
    id: 'harbor-point',
    name: 'Harbor Point',
    category: 'Luxury',
    description: 'Waterfront district with modern high-rises, waterfront dining, and sophisticated urban living',
    medianPrice: 1950000,
    daysOnMarket: 40,
    schoolsRating: 8,
    walkabilityScore: 88,
    population: 11800,
    priceChange: 9.4,
    schoolDistricts: ['Harbor Academy', 'Metropolitan Schools'],
    amenities: ['Waterfront Promenade', 'Fine Dining', 'Marina', 'Boutique Shopping'],
    marketTrend: 'Luxury condos dominating market. Strong appeal to empty-nesters and young professionals.'
  },
  {
    id: 'westfield-crossing',
    name: 'Westfield Crossing',
    category: 'Up-and-Coming',
    description: 'Transitional area with character, emerging restaurants, galleries, and creative ventures',
    medianPrice: 375000,
    daysOnMarket: 21,
    schoolsRating: 6,
    walkabilityScore: 72,
    population: 14500,
    priceChange: 18.2,
    schoolDistricts: ['Westfield High School', 'Crossing Charter Schools'],
    amenities: ['Art Galleries', 'Craft Breweries', 'Hip Restaurants', 'Vintage Shops'],
    marketTrend: 'Gentrification accelerating. Young creatives and investors seeing opportunity.'
  },
  {
    id: 'pine-brook',
    name: 'Pine Brook',
    category: 'Family-Friendly',
    description: 'Peaceful residential area surrounded by nature, excellent schools, and family values',
    medianPrice: 595000,
    daysOnMarket: 26,
    schoolsRating: 9,
    walkabilityScore: 48,
    population: 17600,
    priceChange: 8.5,
    schoolDistricts: ['Pine Brook High School', 'Brook Elementary', 'Pine Valley Middle'],
    amenities: ['Nature Trails', 'Wildlife Preserve', 'Public Parks', 'Farmer Markets'],
    marketTrend: 'Popular with families seeking nature access. Schools drive sustained demand.'
  },
  {
    id: 'eagle-summit',
    name: 'Eagle Summit',
    category: 'Suburban',
    description: 'Master-planned community with modern infrastructure and strong neighborhood management',
    medianPrice: 515000,
    daysOnMarket: 18,
    schoolsRating: 8,
    walkabilityScore: 71,
    population: 20300,
    priceChange: 10.1,
    schoolDistricts: ['Summit High School', 'Eagle Elementary', 'Summit Middle School'],
    amenities: ['Community Center', 'Fitness Facilities', 'Sports Fields', 'Pool Complex'],
    marketTrend: 'Planned community appeal attracts families. New development phases selling quickly.'
  },
  {
    id: 'northgate-village',
    name: 'Northgate Village',
    category: 'Urban',
    description: 'Vibrant mixed-use neighborhood with apartments, shops, and entertainment venues',
    medianPrice: 475000,
    daysOnMarket: 17,
    schoolsRating: 7,
    walkabilityScore: 87,
    population: 23400,
    priceChange: 13.6,
    schoolDistricts: ['Northgate High School', 'Urban Elementary Schools'],
    amenities: ['Night Life', 'Restaurants', 'Shopping', 'Transit Access'],
    marketTrend: 'Young professional destination. Transit-oriented growth driving strong appreciation.'
  }
];

const CATEGORIES = ['All', 'Urban', 'Suburban', 'Luxury', 'Family-Friendly', 'Up-and-Coming'] as const;

export default function ServiceAreasPage() {
  const [selectedCategory, setSelectedCategory] = useState<typeof CATEGORIES[number]>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', area: '' });

  const filteredAreas = useMemo(() => {
    return AREAS_DATA.filter(area => {
      const matchesCategory = selectedCategory === 'All' || area.category === selectedCategory;
      const matchesSearch = area.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchTerm]);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, submit to backend
    console.log('Lead captured:', formData);
    alert('Thank you! We will send you a detailed report about ' + formData.area);
    setFormData({ name: '', email: '', area: '' });
    setShowLeadForm(false);
  };

  const formatPrice = (price: number) => {
    return '$' + (price / 1000000).toFixed(price >= 1000000 ? 2 : 1).replace(/\.0+$/, '') + (price >= 1000000 ? 'M' : 'K');
  };

  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 20px',
      fontFamily: 'inherit'
    },
    hero: {
      textAlign: 'center' as const,
      paddingTop: '60px',
      paddingBottom: '60px',
      borderBottom: '1px solid var(--le-border)'
    },
    heroTitle: {
      fontSize: '42px',
      fontWeight: '700',
      color: 'var(--le-text)',
      margin: '0 0 16px 0',
      letterSpacing: '-0.5px'
    },
    heroSubtitle: {
      fontSize: '18px',
      color: 'var(--le-text-secondary)',
      margin: '0',
      maxWidth: '600px',
      marginLeft: 'auto',
      marginRight: 'auto',
      lineHeight: '1.6'
    },
    statsSection: {
      display: 'grid' as const,
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '30px',
      paddingTop: '60px',
      paddingBottom: '60px',
      textAlign: 'center' as const,
      borderBottom: '1px solid var(--le-border)'
    },
    statItem: {
      padding: '20px'
    },
    statNumber: {
      fontSize: '36px',
      fontWeight: '700',
      color: 'var(--le-primary)',
      margin: '0 0 8px 0'
    },
    statLabel: {
      fontSize: '14px',
      color: 'var(--le-text-secondary)',
      margin: '0'
    },
    filtersSection: {
      paddingTop: '50px',
      paddingBottom: '40px'
    },
    filterLabel: {
      fontSize: '14px',
      fontWeight: '600',
      color: 'var(--le-text)',
      display: 'block',
      marginBottom: '16px',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.5px'
    },
    filterPills: {
      display: 'flex',
      flexWrap: 'wrap' as const,
      gap: '12px',
      marginBottom: '32px'
    },
    pill: (isActive: boolean) => ({
      padding: '10px 18px',
      border: 'none',
      borderRadius: '24px',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      backgroundColor: isActive ? 'var(--le-primary)' : 'var(--le-surface)',
      color: isActive ? '#ffffff' : 'var(--le-text)',
      boxShadow: isActive ? '0 2px 8px rgba(var(--le-primary-rgb), 0.2)' : 'none'
    } as React.CSSProperties),
    searchBox: {
      width: '100%',
      maxWidth: '400px',
      padding: '12px 16px',
      border: '1px solid var(--le-border)',
      borderRadius: '8px',
      fontSize: '14px',
      backgroundColor: 'var(--le-surface)',
      color: 'var(--le-text)',
      transition: 'all 0.2s ease'
    } as React.CSSProperties,
    areasGrid: {
      display: 'grid' as const,
      gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
      gap: '24px',
      paddingBottom: '60px'
    },
    card: (isExpanded: boolean) => ({
      backgroundColor: 'var(--le-surface)',
      border: '1px solid var(--le-border)',
      borderRadius: '12px',
      padding: '28px',
      cursor: 'pointer',
      transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
      transform: isExpanded ? 'translateY(-8px)' : 'translateY(0)',
      boxShadow: isExpanded ? '0 12px 32px rgba(0, 0, 0, 0.12)' : '0 2px 8px rgba(0, 0, 0, 0.04)'
    } as React.CSSProperties),
    cardHeader: {
      marginBottom: '20px'
    },
    cardTitle: {
      fontSize: '20px',
      fontWeight: '700',
      color: 'var(--le-text)',
      margin: '0 0 8px 0'
    },
    cardCategory: {
      display: 'inline-block',
      fontSize: '12px',
      fontWeight: '600',
      backgroundColor: 'var(--le-primary)',
      color: '#ffffff',
      padding: '4px 10px',
      borderRadius: '4px',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.5px'
    },
    cardDescription: {
      fontSize: '14px',
      color: 'var(--le-text-secondary)',
      margin: '0 0 20px 0',
      lineHeight: '1.6'
    },
    statsGrid: {
      display: 'grid' as const,
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '16px',
      marginBottom: '20px'
    },
    statBox: {
      backgroundColor: 'var(--le-bg)',
      padding: '12px',
      borderRadius: '8px'
    },
    statBoxLabel: {
      fontSize: '12px',
      color: 'var(--le-text-secondary)',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.4px',
      margin: '0 0 4px 0',
      fontWeight: '600'
    },
    statBoxValue: {
      fontSize: '16px',
      fontWeight: '700',
      color: 'var(--le-text)',
      margin: '0'
    },
    expandedContent: {
      marginTop: '24px',
      paddingTop: '24px',
      borderTop: '1px solid var(--le-border)'
    },
    expandedSection: {
      marginBottom: '16px'
    },
    expandedSectionTitle: {
      fontSize: '12px',
      fontWeight: '700',
      color: 'var(--le-text)',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.5px',
      margin: '0 0 8px 0'
    },
    expandedSectionContent: {
      fontSize: '13px',
      color: 'var(--le-text-secondary)',
      lineHeight: '1.6',
      margin: '0'
    },
    amenitiesList: {
      display: 'flex',
      flexWrap: 'wrap' as const,
      gap: '8px',
      margin: '8px 0 0 0'
    },
    amenityTag: {
      fontSize: '12px',
      backgroundColor: 'var(--le-primary)',
      color: '#ffffff',
      padding: '4px 10px',
      borderRadius: '4px'
    },
    ctaButton: {
      display: 'inline-block',
      marginTop: '20px',
      padding: '10px 18px',
      backgroundColor: 'var(--le-primary)',
      color: '#ffffff',
      border: 'none',
      borderRadius: '6px',
      fontSize: '13px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s ease'
    } as React.CSSProperties,
    leadSection: {
      backgroundColor: 'var(--le-bg)',
      padding: '60px 20px',
      textAlign: 'center' as const
    },
    leadTitle: {
      fontSize: '32px',
      fontWeight: '700',
      color: 'var(--le-text)',
      margin: '0 0 12px 0'
    },
    leadSubtitle: {
      fontSize: '16px',
      color: 'var(--le-text-secondary)',
      margin: '0 0 40px 0',
      maxWidth: '600px',
      marginLeft: 'auto',
      marginRight: 'auto'
    },
    formContainer: {
      maxWidth: '500px',
      margin: '0 auto',
      backgroundColor: 'var(--le-surface)',
      padding: '32px',
      borderRadius: '12px',
      border: '1px solid var(--le-border)'
    },
    formGroup: {
      marginBottom: '20px',
      textAlign: 'left' as const
    },
    formLabel: {
      display: 'block',
      fontSize: '13px',
      fontWeight: '600',
      color: 'var(--le-text)',
      marginBottom: '8px',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.5px'
    },
    formInput: {
      width: '100%',
      padding: '12px 14px',
      border: '1px solid var(--le-border)',
      borderRadius: '6px',
      fontSize: '14px',
      backgroundColor: 'var(--le-bg)',
      color: 'var(--le-text)',
      boxSizing: 'border-box' as const,
      transition: 'all 0.2s ease'
    } as React.CSSProperties,
    formButton: {
      width: '100%',
      padding: '14px',
      backgroundColor: 'var(--le-primary)',
      color: '#ffffff',
      border: 'none',
      borderRadius: '6px',
      fontSize: '14px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s ease'
    } as React.CSSProperties,
    noResults: {
      textAlign: 'center' as const,
      padding: '60px 20px',
      color: 'var(--le-text-secondary)'
    }
  };

  return (
    <div style={{ backgroundColor: 'var(--le-bg)', minHeight: '100vh' }}>
      {/* Hero Section */}
      <div style={styles.container}>
        <div style={styles.hero}>
          <h1 style={styles.heroTitle}>Our Service Areas</h1>
          <p style={styles.heroSubtitle}>
            Comprehensive market coverage across premium neighborhoods. Expert local insights for every community we serve.
          </p>
        </div>

        {/* Stats Banner */}
        <div style={styles.statsSection}>
          <div style={styles.statItem}>
            <p style={styles.statNumber}>12+</p>
            <p style={styles.statLabel}>Areas Covered</p>
          </div>
          <div style={styles.statItem}>
            <p style={styles.statNumber}>850+</p>
            <p style={styles.statLabel}>Happy Clients</p>
          </div>
          <div style={styles.statItem}>
            <p style={styles.statNumber}>18</p>
            <p style={styles.statLabel}>Years of Local Expertise</p>
          </div>
        </div>

        {/* Filters Section */}
        <div style={styles.filtersSection}>
          <label style={styles.filterLabel}>Filter by Category</label>
          <div style={styles.filterPills}>
            {CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                style={styles.pill(selectedCategory === category)}
                onMouseEnter={(e) => {
                  if (selectedCategory !== category) {
                    e.currentTarget.style.backgroundColor = 'var(--le-primary)';
                    e.currentTarget.style.color = '#ffffff';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedCategory !== category) {
                    e.currentTarget.style.backgroundColor = 'var(--le-surface)';
                    e.currentTarget.style.color = 'var(--le-text)';
                  }
                }}
              >
                {category}
              </button>
            ))}
          </div>

          <label style={styles.filterLabel}>Search Areas</label>
          <input
            type="text"
            placeholder="Search by neighborhood name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.searchBox}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = 'var(--le-primary)';
              e.currentTarget.style.boxShadow = '0 0 0 3px rgba(var(--le-primary-rgb), 0.1)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = 'var(--le-border)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          />
        </div>

        {/* Areas Grid */}
        {filteredAreas.length > 0 ? (
          <div style={styles.areasGrid}>
            {filteredAreas.map(area => (
              <div
                key={area.id}
                style={styles.card(expandedId === area.id)}
                onClick={() => setExpandedId(expandedId === area.id ? null : area.id)}
              >
                <div style={styles.cardHeader}>
                  <h3 style={styles.cardTitle}>{area.name}</h3>
                  <span style={styles.cardCategory}>{area.category}</span>
                </div>

                <p style={styles.cardDescription}>{area.description}</p>

                <div style={styles.statsGrid}>
                  <div style={styles.statBox}>
                    <p style={styles.statBoxLabel}>Median Price</p>
                    <p style={styles.statBoxValue}>{formatPrice(area.medianPrice)}</p>
                  </div>
                  <div style={styles.statBox}>
                    <p style={styles.statBoxLabel}>Days on Market</p>
                    <p style={styles.statBoxValue}>{area.daysOnMarket} days</p>
                  </div>
                  <div style={styles.statBox}>
                    <p style={styles.statBoxLabel}>Schools Rating</p>
                    <p style={styles.statBoxValue}>{area.schoolsRating}/10</p>
                  </div>
                  <div style={styles.statBox}>
                    <p style={styles.statBoxLabel}>Walkability</p>
                    <p style={styles.statBoxValue}>{area.walkabilityScore}/100</p>
                  </div>
                  <div style={styles.statBox}>
                    <p style={styles.statBoxLabel}>Population</p>
                    <p style={styles.statBoxValue}>{(area.population / 1000).toFixed(1)}K</p>
                  </div>
                  <div style={styles.statBox}>
                    <p style={styles.statBoxLabel}>YoY Price Change</p>
                    <p style={styles.statBoxValue}>{area.priceChange > 0 ? '+' : ''}{area.priceChange}%</p>
                  </div>
                </div>

                {expandedId === area.id && (
                  <div style={styles.expandedContent}>
                    <div style={styles.expandedSection}>
                      <p style={styles.expandedSectionTitle}>School Districts</p>
                      <p style={styles.expandedSectionContent}>
                        {area.schoolDistricts.join(' • ')}
                      </p>
                    </div>

                    <div style={styles.expandedSection}>
                      <p style={styles.expandedSectionTitle}>Key Amenities</p>
                      <div style={styles.amenitiesList}>
                        {area.amenities.map((amenity, idx) => (
                          <span key={idx} style={styles.amenityTag}>{amenity}</span>
                        ))}
                      </div>
                    </div>

                    <div style={styles.expandedSection}>
                      <p style={styles.expandedSectionTitle}>Market Trend</p>
                      <p style={styles.expandedSectionContent}>{area.marketTrend}</p>
                    </div>
                  </div>
                )}

                <button
                  style={{
                    ...styles.ctaButton,
                    backgroundColor: expandedId === area.id ? 'var(--le-primary-hover)' : 'var(--le-primary)',
                    opacity: 0.9
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = '1';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = '0.9';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowLeadForm(true);
                    setFormData(prev => ({ ...prev, area: area.name }));
                  }}
                >
                  {expandedId === area.id ? '← Collapse' : 'Explore Area'}
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div style={styles.noResults}>
            <p style={{ fontSize: '16px', margin: '0' }}>
              No areas found matching "{searchTerm}" in {selectedCategory !== 'All' ? selectedCategory : 'any'} category.
            </p>
            <p style={{ fontSize: '14px', margin: '8px 0 0 0', color: 'var(--le-text-secondary)' }}>
              Try adjusting your filters or search terms.
            </p>
          </div>
        )}
      </div>

      {/* Lead Capture Section */}
      <div style={styles.leadSection}>
        <div style={styles.container}>
          <h2 style={styles.leadTitle}>Get Your Area Report</h2>
          <p style={styles.leadSubtitle}>
            Receive detailed market analysis, comparable sales, and investment insights for your area of interest.
          </p>

          {!showLeadForm ? (
            <button
              style={{
                ...styles.formButton,
                maxWidth: '300px',
                margin: '0 auto'
              }}
              onClick={() => setShowLeadForm(true)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 16px rgba(var(--le-primary-rgb), 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              Request Your Report
            </button>
          ) : (
            <form style={styles.formContainer} onSubmit={handleFormSubmit}>
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  placeholder="John Doe"
                  style={styles.formInput}
                  required
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  placeholder="john@example.com"
                  style={styles.formInput}
                  required
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Area of Interest</label>
                <select
                  name="area"
                  value={formData.area}
                  onChange={handleFormChange}
                  style={styles.formInput}
                  required
                >
                  <option value="">Select an area...</option>
                  {AREAS_DATA.map(area => (
                    <option key={area.id} value={area.name}>{area.name}</option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                style={styles.formButton}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 16px rgba(var(--le-primary-rgb), 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                Send Me the Report
              </button>

              <button
                type="button"
                onClick={() => setShowLeadForm(false)}
                style={{
                  marginTop: '12px',
                  width: '100%',
                  padding: '12px',
                  backgroundColor: 'transparent',
                  color: 'var(--le-text-secondary)',
                  border: '1px solid var(--le-border)',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--le-bg)';
                  e.currentTarget.style.borderColor = 'var(--le-text-secondary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.borderColor = 'var(--le-border)';
                }}
              >
                Cancel
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
