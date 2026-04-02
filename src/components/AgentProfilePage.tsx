'use client';

import React, { useState, useEffect } from 'react';

interface Testimonial {
  id: string;
  clientName: string;
  date: string;
  rating: number;
  quote: string;
}

interface Listing {
  id: string;
  address: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  status: 'Active' | 'Pending' | 'Sold';
  imageIndex: number;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  lookingFor: string;
  contactMethod: string;
}

// SVG Icons
const PhoneIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
  </svg>
);

const EmailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"></rect>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
  </svg>
);

const FacebookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path>
  </svg>
);

const LinkedInIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.722-2.004 1.418-.103.249-.129.597-.129.946v5.441h-3.554s.047-8.733 0-9.638h3.554v1.364c.429-.662 1.196-1.604 2.906-1.604 2.108 0 3.687 1.381 3.687 4.357v5.521zM5.337 9.433c-1.144 0-1.915-.758-1.915-1.705 0-.955.77-1.708 1.963-1.708 1.188 0 1.912.753 1.932 1.708 0 .947-.744 1.705-1.98 1.705zm1.946 11.019H3.391V9.814h3.892v10.638zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"></path>
  </svg>
);

const StarIcon = ({ filled = true }: { filled?: boolean }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>
);

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const ChevronLeftIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6"></polyline>
  </svg>
);

const ChevronRightIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
);

const CounterAnimation = ({ value, suffix = '' }: { value: number; suffix?: string }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const increment = value / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <span>
      {count.toLocaleString()}{suffix}
    </span>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
  },
  hero: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    textAlign: 'center' as const,
    paddingTop: '60px',
    paddingBottom: '60px',
    borderBottom: '1px solid var(--le-border)',
  },
  avatar: {
    width: '140px',
    height: '140px',
    borderRadius: '50%',
    backgroundColor: 'var(--le-surface)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '56px',
    fontWeight: 'bold',
    color: 'var(--le-primary)',
    marginBottom: '24px',
    border: '3px solid var(--le-primary)',
  },
  heroName: {
    fontSize: '40px',
    fontWeight: '700',
    color: 'var(--le-text)',
    margin: '0 0 8px 0',
  },
  heroTitle: {
    fontSize: '18px',
    color: 'var(--le-text-secondary)',
    margin: '0 0 16px 0',
  },
  heroMeta: {
    display: 'flex',
    gap: '24px',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap' as const,
    marginBottom: '24px',
    marginTop: '16px',
    fontSize: '14px',
    color: 'var(--le-text)',
  },
  metaItem: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
  },
  metaLabel: {
    fontSize: '12px',
    color: 'var(--le-text-secondary)',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
  },
  socialLinks: {
    display: 'flex',
    gap: '16px',
    marginTop: '24px',
    marginBottom: '24px',
  },
  socialButton: {
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    backgroundColor: 'var(--le-surface)',
    border: '1px solid var(--le-border)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    color: 'var(--le-text)',
    transition: 'all 0.3s ease',
  },
  cta: {
    paddingTop: '24px',
    paddingBottom: '24px',
  },
  ctaButton: {
    backgroundColor: 'var(--le-primary)',
    color: 'white',
    border: 'none',
    padding: '14px 32px',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  section: {
    paddingTop: '60px',
    paddingBottom: '60px',
    borderBottom: '1px solid var(--le-border)',
  },
  sectionTitle: {
    fontSize: '32px',
    fontWeight: '700',
    color: 'var(--le-text)',
    marginBottom: '12px',
    margin: '0 0 12px 0',
  },
  sectionSubtitle: {
    fontSize: '16px',
    color: 'var(--le-text-secondary)',
    marginBottom: '32px',
    margin: '0 0 32px 0',
  },
  aboutText: {
    fontSize: '16px',
    lineHeight: '1.8',
    color: 'var(--le-text)',
    marginBottom: '20px',
    margin: '0 0 20px 0',
  },
  tags: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: '12px',
    marginTop: '24px',
  },
  tag: {
    backgroundColor: 'var(--le-surface)',
    color: 'var(--le-primary)',
    padding: '8px 16px',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: '500',
    border: '1px solid var(--le-border)',
  },
  stats: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '24px',
    marginTop: '40px',
  },
  statCard: {
    backgroundColor: 'var(--le-surface)',
    padding: '28px',
    borderRadius: '12px',
    border: '1px solid var(--le-border)',
    textAlign: 'center' as const,
  },
  statNumber: {
    fontSize: '32px',
    fontWeight: '700',
    color: 'var(--le-primary)',
    margin: '0 0 8px 0',
  },
  statLabel: {
    fontSize: '14px',
    color: 'var(--le-text-secondary)',
    margin: '0',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
  },
  listingsContainer: {
    display: 'flex',
    overflowX: 'auto' as const,
    gap: '20px',
    paddingBottom: '12px',
  },
  listingCard: {
    minWidth: '320px',
    backgroundColor: 'var(--le-surface)',
    borderRadius: '12px',
    overflow: 'hidden',
    border: '1px solid var(--le-border)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },
  listingImage: {
    width: '100%',
    height: '200px',
    backgroundColor: '#e0e0e0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    color: 'var(--le-text-secondary)',
  },
  listingContent: {
    padding: '16px',
  },
  listingAddress: {
    fontSize: '16px',
    fontWeight: '600',
    color: 'var(--le-text)',
    margin: '0 0 8px 0',
  },
  listingPrice: {
    fontSize: '18px',
    fontWeight: '700',
    color: 'var(--le-primary)',
    margin: '0 0 12px 0',
  },
  listingDetails: {
    display: 'flex',
    gap: '16px',
    fontSize: '13px',
    color: 'var(--le-text-secondary)',
    marginBottom: '12px',
  },
  listingStatus: {
    display: 'inline-block',
    padding: '4px 12px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: '600',
    backgroundColor: 'var(--le-surface)',
    color: 'var(--le-text)',
  },
  testimonialCarousel: {
    display: 'flex',
    gap: '20px',
    overflowX: 'auto' as const,
    paddingBottom: '12px',
  },
  testimonialCard: {
    minWidth: '320px',
    backgroundColor: 'var(--le-surface)',
    padding: '24px',
    borderRadius: '12px',
    border: '1px solid var(--le-border)',
  },
  testimonialRating: {
    display: 'flex',
    gap: '4px',
    marginBottom: '12px',
  },
  testimonialQuote: {
    fontSize: '14px',
    lineHeight: '1.6',
    color: 'var(--le-text)',
    marginBottom: '16px',
    fontStyle: 'italic',
  },
  testimonialAuthor: {
    fontSize: '14px',
    fontWeight: '600',
    color: 'var(--le-text)',
    margin: '0',
  },
  testimonialDate: {
    fontSize: '12px',
    color: 'var(--le-text-secondary)',
    margin: '4px 0 0 0',
  },
  serviceAreas: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    marginTop: '24px',
  },
  areaCard: {
    backgroundColor: 'var(--le-surface)',
    padding: '20px',
    borderRadius: '12px',
    border: '1px solid var(--le-border)',
  },
  areaName: {
    fontSize: '16px',
    fontWeight: '600',
    color: 'var(--le-text)',
    margin: '0 0 8px 0',
  },
  areaDescription: {
    fontSize: '13px',
    color: 'var(--le-text-secondary)',
    lineHeight: '1.5',
    margin: '0',
  },
  contactForm: {
    maxWidth: '600px',
    margin: '0 auto',
  },
  formGroup: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    fontSize: '14px',
    fontWeight: '600',
    color: 'var(--le-text)',
    marginBottom: '8px',
  },
  input: {
    width: '100%',
    padding: '12px 16px',
    border: '1px solid var(--le-border)',
    borderRadius: '8px',
    fontSize: '14px',
    color: 'var(--le-text)',
    backgroundColor: 'var(--le-bg)',
    fontFamily: 'inherit',
    boxSizing: 'border-box' as const,
    transition: 'border-color 0.3s ease',
  },
  textarea: {
    width: '100%',
    padding: '12px 16px',
    border: '1px solid var(--le-border)',
    borderRadius: '8px',
    fontSize: '14px',
    color: 'var(--le-text)',
    backgroundColor: 'var(--le-bg)',
    fontFamily: 'inherit',
    minHeight: '120px',
    resize: 'vertical' as const,
    boxSizing: 'border-box' as const,
    transition: 'border-color 0.3s ease',
  },
  select: {
    width: '100%',
    padding: '12px 16px',
    border: '1px solid var(--le-border)',
    borderRadius: '8px',
    fontSize: '14px',
    color: 'var(--le-text)',
    backgroundColor: 'var(--le-bg)',
    fontFamily: 'inherit',
    boxSizing: 'border-box' as const,
    cursor: 'pointer',
  },
  formRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
  },
  submitButton: {
    width: '100%',
    backgroundColor: 'var(--le-primary)',
    color: 'white',
    border: 'none',
    padding: '14px 32px',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  successMessage: {
    backgroundColor: '#e8f5e9',
    color: '#2e7d32',
    padding: '16px',
    borderRadius: '8px',
    marginBottom: '20px',
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
  },
  carouselControls: {
    display: 'flex',
    gap: '8px',
    marginTop: '20px',
  },
  carouselButton: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: 'var(--le-surface)',
    border: '1px solid var(--le-border)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    color: 'var(--le-text)',
    transition: 'all 0.3s ease',
  },
  languageLabel: {
    fontSize: '13px',
    color: 'var(--le-text-secondary)',
    margin: '0',
  },
  designationsList: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap' as const,
    marginTop: '16px',
  },
  designationBadge: {
    fontSize: '12px',
    fontWeight: '600',
    color: 'var(--le-primary)',
    backgroundColor: 'var(--le-surface)',
    padding: '6px 12px',
    borderRadius: '4px',
    border: '1px solid var(--le-border)',
  },
};

export default function AgentProfilePage() {
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
    lookingFor: 'Both',
    contactMethod: 'Email',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const agent = {
    name: 'Alexandra Pierce',
    title: 'Licensed Real Estate Agent',
    brokerage: 'Prestige Realty Group',
    licenseNumber: 'RE 4582913',
    yearsOfExperience: 12,
    phone: '(555) 234-5678',
    email: 'alexandra.pierce@prestigerealty.com',
    bio: 'With over a decade of experience in residential real estate, I\'ve helped hundreds of families find their dream homes and achieve their investment goals. My approach combines deep market knowledge with a commitment to personalized service. I specialize in luxury residential properties, investment portfolios, and first-time homebuyer guidance.\n\nI pride myself on building lasting relationships with my clients. Whether you\'re buying, selling, or investing, I provide transparent, data-driven advice to help you make informed decisions. My team and I leverage cutting-edge marketing strategies, professional photography, and digital tours to showcase properties effectively.\n\nMy dedication to excellence has earned me the respect of colleagues and the loyalty of clients who return to work with me on multiple transactions. I\'m committed to staying current with market trends and using the latest technology to serve you better.',
    specializations: ['First-Time Buyers', 'Luxury Homes', 'Investment Properties', 'Relocation', 'Estate Sales'],
    languages: ['English', 'Spanish', 'Mandarin'],
    designations: ['CRS', 'ABR', 'SRES'],
  };

  const stats = [
    { label: 'Transactions Closed', value: 150, suffix: '+' },
    { label: 'Total Volume', value: 75, suffix: 'M+' },
    { label: 'Years Experience', value: 12, suffix: '' },
    { label: 'Avg Days on Market', value: 18, suffix: '' },
    { label: 'Client Satisfaction', value: 4.9, suffix: '/5.0' },
  ];

  const listings: Listing[] = [
    { id: '1', address: '1425 Riverside Drive', price: 1250000, beds: 4, baths: 3, sqft: 3200, status: 'Active', imageIndex: 1 },
    { id: '2', address: '742 Mountain View Lane', price: 895000, beds: 3, baths: 2, sqft: 2400, status: 'Pending', imageIndex: 2 },
    { id: '3', address: '305 Harbor Boulevard', price: 1850000, beds: 5, baths: 4, sqft: 4100, status: 'Active', imageIndex: 3 },
    { id: '4', address: '821 Oakmont Street', price: 625000, beds: 3, baths: 2, sqft: 1900, status: 'Sold', imageIndex: 4 },
    { id: '5', address: '1089 Sunset Terrace', price: 1450000, beds: 4, baths: 3, sqft: 3400, status: 'Active', imageIndex: 5 },
    { id: '6', address: '556 Cypress Avenue', price: 755000, beds: 3, baths: 2.5, sqft: 2200, status: 'Active', imageIndex: 6 },
  ];

  const testimonials: Testimonial[] = [
    {
      id: '1',
      clientName: 'James & Margaret Chen',
      date: 'February 2025',
      rating: 5,
      quote: 'Alexandra went above and beyond to help us find our perfect home. Her knowledge of the market and attention to detail made the entire process smooth and stress-free. We couldn\'t be happier!',
    },
    {
      id: '2',
      clientName: 'David Rodriguez',
      date: 'January 2025',
      rating: 5,
      quote: 'As a first-time homebuyer, I was nervous about the process. Alexandra explained everything clearly and fought hard for the best terms. She\'s truly an advocate for her clients.',
    },
    {
      id: '3',
      clientName: 'Patricia Williams',
      date: 'December 2024',
      rating: 5,
      quote: 'Selling my family home was emotional, but Alexandra handled it with professionalism and grace. The property sold quickly and above asking price. Highly recommended!',
    },
    {
      id: '4',
      clientName: 'Michael Thompson',
      date: 'November 2024',
      rating: 5,
      quote: 'Alexandra\'s investment property guidance helped me build a strong portfolio. Her market insights are invaluable. I trust her completely with my real estate decisions.',
    },
    {
      id: '5',
      clientName: 'Sarah Johnson',
      date: 'October 2024',
      rating: 5,
      quote: 'Outstanding service from start to finish. Alexandra answered every question and made us feel like family. The whole experience was fantastic!',
    },
  ];

  const serviceAreas = [
    {
      id: '1',
      name: 'Downtown District',
      description: 'Vibrant urban center with modern apartments, walkable streets, and premier dining scene.',
    },
    {
      id: '2',
      name: 'Riverside Heights',
      description: 'Exclusive community featuring luxury estates, private clubs, and waterfront living.',
    },
    {
      id: '3',
      name: 'Oak Park Estates',
      description: 'Family-friendly neighborhood with top-rated schools and beautiful tree-lined streets.',
    },
    {
      id: '4',
      name: 'Lakewood Commons',
      description: 'Established suburban community with excellent value and diverse housing options.',
    },
    {
      id: '5',
      name: 'Hillcrest Village',
      description: 'Emerging neighborhood with new development and excellent growth potential.',
    },
    {
      id: '6',
      name: 'Cedar Ridge',
      description: 'Prestigious hilltop enclave with panoramic views and exclusive properties.',
    },
  ];

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormSubmitted(true);
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: '',
      lookingFor: 'Both',
      contactMethod: 'Email',
    });
    setTimeout(() => setFormSubmitted(false), 5000);
  };

  const nextTestimonial = () => {
    setCurrentTestimonialIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const getListingStatusStyle = (status: string) => {
    const baseStyle = { ...styles.listingStatus };
    if (status === 'Active') return { ...baseStyle, backgroundColor: '#e8f5e9', color: '#2e7d32' };
    if (status === 'Pending') return { ...baseStyle, backgroundColor: '#fff3e0', color: '#e65100' };
    if (status === 'Sold') return { ...baseStyle, backgroundColor: '#f3e5f5', color: '#6a1b9a' };
    return baseStyle;
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'RealEstateAgent',
            name: agent.name,
            jobTitle: agent.title,
            telephone: agent.phone,
            email: agent.email,
            affiliation: {
              '@type': 'Organization',
              name: agent.brokerage,
            },
            areaServed: serviceAreas.map(area => area.name),
            knowsAbout: agent.specializations,
            description: agent.bio,
          }),
        }}
      />
      <div style={{ backgroundColor: 'var(--le-bg)', minHeight: '100vh' }}>
        {/* Hero Section */}
        <div style={styles.container}>
          <div style={styles.hero}>
            <div style={styles.avatar}>AP</div>
            <h1 style={styles.heroName}>{agent.name}</h1>
            <p style={styles.heroTitle}>{agent.title}</p>
            <p style={{ ...styles.heroTitle, fontSize: '14px', color: 'var(--le-text)' }}>{agent.brokerage}</p>

            <div style={styles.heroMeta}>
              <div style={styles.metaItem}>
                <div style={styles.metaLabel}>License #</div>
                <div>{agent.licenseNumber}</div>
              </div>
              <div style={styles.metaItem}>
                <div style={styles.metaLabel}>Experience</div>
                <div>{agent.yearsOfExperience} years</div>
              </div>
            </div>

            <div style={styles.socialLinks}>
              <button
                style={styles.socialButton}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--le-primary)';
                  e.currentTarget.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--le-surface)';
                  e.currentTarget.style.color = 'var(--le-text)';
                }}
                title="Phone"
              >
                <PhoneIcon />
              </button>
              <button
                style={styles.socialButton}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--le-primary)';
                  e.currentTarget.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--le-surface)';
                  e.currentTarget.style.color = 'var(--le-text)';
                }}
                title="Email"
              >
                <EmailIcon />
              </button>
              <button
                style={styles.socialButton}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--le-primary)';
                  e.currentTarget.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--le-surface)';
                  e.currentTarget.style.color = 'var(--le-text)';
                }}
                title="Facebook"
              >
                <FacebookIcon />
              </button>
              <button
                style={styles.socialButton}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--le-primary)';
                  e.currentTarget.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--le-surface)';
                  e.currentTarget.style.color = 'var(--le-text)';
                }}
                title="LinkedIn"
              >
                <LinkedInIcon />
              </button>
            </div>

            <div style={styles.cta}>
              <button
                style={styles.ctaButton}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--le-primary-hover)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--le-primary)';
                }}
              >
                Schedule a Consultation
              </button>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div style={styles.container}>
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>About</h2>
            <p style={styles.sectionSubtitle}>Professional background and expertise</p>

            <div>
              {agent.bio.split('\n\n').map((paragraph, index) => (
                <p key={index} style={styles.aboutText}>
                  {paragraph}
                </p>
              ))}
            </div>

            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--le-text)', marginBottom: '12px', margin: '0 0 12px 0' }}>
                Specializations
              </h3>
              <div style={styles.tags}>
                {agent.specializations.map(spec => (
                  <span key={spec} style={styles.tag}>
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ marginTop: '24px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--le-text)', marginBottom: '8px', margin: '0 0 8px 0' }}>
                Languages
              </h3>
              <p style={styles.languageLabel}>{agent.languages.join(', ')}</p>
            </div>

            <div style={{ marginTop: '24px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--le-text)', marginBottom: '12px', margin: '0 0 12px 0' }}>
                Professional Designations
              </h3>
              <div style={styles.designationsList}>
                {agent.designations.map(designation => (
                  <span key={designation} style={styles.designationBadge}>
                    {designation}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div style={styles.container}>
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>My Track Record</h2>
            <p style={styles.sectionSubtitle}>Proven results and market expertise</p>

            <div style={styles.stats}>
              {stats.map(stat => (
                <div key={stat.label} style={styles.statCard}>
                  <div style={styles.statNumber}>
                    <CounterAnimation value={typeof stat.value === 'number' && stat.value < 100 ? stat.value : Math.floor(stat.value)} suffix={stat.suffix} />
                  </div>
                  <div style={styles.statLabel}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Listings */}
        <div style={styles.container}>
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Recent Listings</h2>
            <p style={styles.sectionSubtitle}>Featured properties currently available</p>

            <div style={styles.listingsContainer}>
              {listings.map(listing => (
                <div key={listing.id} style={styles.listingCard}>
                  <div style={styles.listingImage}>
                    Property Image {listing.imageIndex}
                  </div>
                  <div style={styles.listingContent}>
                    <h3 style={styles.listingAddress}>{listing.address}</h3>
                    <div style={styles.listingPrice}>
                      ${(listing.price / 1000000).toFixed(1)}M
                    </div>
                    <div style={styles.listingDetails}>
                      <span>{listing.beds} Beds</span>
                      <span>{listing.baths} Baths</span>
                      <span>{listing.sqft.toLocaleString()} sqft</span>
                    </div>
                    <div style={getListingStatusStyle(listing.status)}>
                      {listing.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div style={styles.container}>
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Client Testimonials</h2>
            <p style={styles.sectionSubtitle}>What my clients have to say</p>

            <div style={styles.testimonialCard}>
              <div style={styles.testimonialRating}>
                {[...Array(testimonials[currentTestimonialIndex].rating)].map((_, i) => (
                  <div key={i} style={{ color: 'var(--le-accent)' }}>
                    <StarIcon />
                  </div>
                ))}
              </div>
              <p style={styles.testimonialQuote}>
                "{testimonials[currentTestimonialIndex].quote}"
              </p>
              <p style={styles.testimonialAuthor}>
                {testimonials[currentTestimonialIndex].clientName}
              </p>
              <p style={styles.testimonialDate}>
                {testimonials[currentTestimonialIndex].date}
              </p>
            </div>

            <div style={styles.carouselControls}>
              <button
                style={styles.carouselButton}
                onClick={prevTestimonial}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--le-primary)';
                  e.currentTarget.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--le-surface)';
                  e.currentTarget.style.color = 'var(--le-text)';
                }}
              >
                <ChevronLeftIcon />
              </button>
              <div style={{ flex: 1 }} />
              <button
                style={styles.carouselButton}
                onClick={nextTestimonial}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--le-primary)';
                  e.currentTarget.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--le-surface)';
                  e.currentTarget.style.color = 'var(--le-text)';
                }}
              >
                <ChevronRightIcon />
              </button>
            </div>

            <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '13px', color: 'var(--le-text-secondary)' }}>
              {currentTestimonialIndex + 1} of {testimonials.length}
            </div>
          </div>
        </div>

        {/* Service Areas */}
        <div style={styles.container}>
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Service Areas</h2>
            <p style={styles.sectionSubtitle}>Where I specialize</p>

            <div style={styles.serviceAreas}>
              {serviceAreas.map(area => (
                <div key={area.id} style={styles.areaCard}>
                  <h3 style={styles.areaName}>{area.name}</h3>
                  <p style={styles.areaDescription}>{area.description}</p>
                </div>
              ))}
            </div>

            <div style={{ textAlign: 'center', marginTop: '32px' }}>
              <button
                style={{
                  ...styles.ctaButton,
                  backgroundColor: 'transparent',
                  color: 'var(--le-primary)',
                  border: '1px solid var(--le-primary)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--le-surface)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                See All Service Areas
              </button>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div style={styles.container}>
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Get In Touch</h2>
            <p style={styles.sectionSubtitle}>Let's discuss your real estate goals</p>

            <div style={styles.contactForm}>
              {formSubmitted && (
                <div style={styles.successMessage}>
                  <CheckIcon />
                  <div>
                    Thank you! I'll get back to you shortly.
                  </div>
                </div>
              )}

              <form onSubmit={handleFormSubmit}>
                <div style={styles.formRow}>
                  <div style={styles.formGroup}>
                    <label htmlFor="name" style={styles.label}>Name *</label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleFormChange}
                      style={styles.input}
                      required
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label htmlFor="email" style={styles.label}>Email *</label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleFormChange}
                      style={styles.input}
                      required
                    />
                  </div>
                </div>

                <div style={styles.formRow}>
                  <div style={styles.formGroup}>
                    <label htmlFor="phone" style={styles.label}>Phone *</label>
                    <input
                      id="phone"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleFormChange}
                      style={styles.input}
                      required
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label htmlFor="lookingFor" style={styles.label}>What are you looking for? *</label>
                    <select
                      id="lookingFor"
                      name="lookingFor"
                      value={formData.lookingFor}
                      onChange={handleFormChange}
                      style={styles.select}
                    >
                      <option>Buying</option>
                      <option>Selling</option>
                      <option>Both</option>
                      <option>Investment</option>
                      <option>Just Browsing</option>
                    </select>
                  </div>
                </div>

                <div style={styles.formGroup}>
                  <label htmlFor="contactMethod" style={styles.label}>Preferred contact method</label>
                  <select
                    id="contactMethod"
                    name="contactMethod"
                    value={formData.contactMethod}
                    onChange={handleFormChange}
                    style={styles.select}
                  >
                    <option>Email</option>
                    <option>Phone</option>
                    <option>Text</option>
                  </select>
                </div>

                <div style={styles.formGroup}>
                  <label htmlFor="message" style={styles.label}>Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleFormChange}
                    style={styles.textarea}
                    placeholder="Tell me about your real estate needs..."
                  />
                </div>

                <button
                  type="submit"
                  style={styles.submitButton}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--le-primary-hover)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--le-primary)';
                  }}
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div style={styles.container}>
          <div style={{ paddingTop: '60px', paddingBottom: '60px', textAlign: 'center' }}>
            <h2 style={styles.sectionTitle}>Ready to Get Started?</h2>
            <p style={styles.sectionSubtitle}>Contact me today for a free consultation</p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                style={styles.ctaButton}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--le-primary-hover)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--le-primary)';
                }}
              >
                Call {agent.phone}
              </button>
              <button
                style={{
                  ...styles.ctaButton,
                  backgroundColor: 'transparent',
                  color: 'var(--le-primary)',
                  border: '1px solid var(--le-primary)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--le-surface)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                Email Me
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
