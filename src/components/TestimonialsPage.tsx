'use client';

import React, { useState } from 'react';
import { Star, Play, CheckCircle2, MapPin } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  location: string;
  quote: string;
  rating: number;
  verified: boolean;
  transactionType: 'bought' | 'sold' | 'invested';
  propertyType?: string;
  priceRange?: string;
  image?: string;
  featured?: boolean;
}

interface VideoTestimonial {
  id: string;
  name: string;
  location: string;
  quote: string;
  duration: string;
  transactionType: 'bought' | 'sold' | 'invested';
  initials: string;
}

// Mock testimonial data
const testimonials: Testimonial[] = [
  {
    id: 'featured-1',
    name: 'Sarah Mitchell',
    location: 'Portland, OR',
    quote: 'Working with the LeadEngine team was transformative for our real estate business. They helped us streamline our lead management process and we\'ve seen a 250% increase in qualified leads. The platform is intuitive and their support team is exceptional.',
    rating: 5,
    verified: true,
    transactionType: 'sold',
    propertyType: 'Single Family Home',
    priceRange: '$650,000 - $850,000',
    featured: true,
  },
  {
    id: 'featured-2',
    name: 'Marcus Johnson',
    location: 'Atlanta, GA',
    quote: 'As an independent agent, I needed a solution that could scale with my business. LeadEngine delivered exactly that. My conversion rates improved by 40% within the first three months. The analytics dashboard alone is worth its weight in gold.',
    rating: 5,
    verified: true,
    transactionType: 'invested',
    propertyType: 'Multi-Family Property',
    priceRange: '$1.2M - $2.5M',
    featured: true,
  },
  {
    id: 'featured-3',
    name: 'Elena Rodriguez',
    location: 'Miami, FL',
    quote: 'The automation features have freed up so much of my time. I used to spend hours on administrative tasks, and now LeadEngine handles it all seamlessly. I\'ve closed more deals in the past six months than in the previous year.',
    rating: 5,
    verified: true,
    transactionType: 'bought',
    propertyType: 'Luxury Condo',
    priceRange: '$900,000 - $1.5M',
    featured: true,
  },
];

const additionalTestimonials: Testimonial[] = [
  {
    id: '1',
    name: 'James Chen',
    location: 'San Francisco, CA',
    quote: 'Outstanding platform. My lead response time dropped from 2 hours to 5 minutes.',
    rating: 5,
    verified: true,
    transactionType: 'sold',
  },
  {
    id: '2',
    name: 'Amanda Walsh',
    location: 'Boston, MA',
    quote: 'The CRM integration is seamless. No more data silos or manual entry errors.',
    rating: 5,
    verified: true,
    transactionType: 'bought',
  },
  {
    id: '3',
    name: 'David Torres',
    location: 'Austin, TX',
    quote: 'Incredible ROI. Our close rate improved significantly within weeks.',
    rating: 4,
    verified: true,
    transactionType: 'invested',
  },
  {
    id: '4',
    name: 'Priya Patel',
    location: 'Denver, CO',
    quote: 'The AI insights have completely changed how I prioritize leads. Game-changer.',
    rating: 5,
    verified: true,
    transactionType: 'sold',
  },
  {
    id: '5',
    name: 'Robert Sullivan',
    location: 'Seattle, WA',
    quote: 'Best investment I\'ve made for my real estate business. Customer support is phenomenal.',
    rating: 5,
    verified: true,
    transactionType: 'bought',
  },
  {
    id: '6',
    name: 'Jessica Zhang',
    location: 'Chicago, IL',
    quote: 'Streamlined everything. Now I can focus on what I do best—closing deals.',
    rating: 5,
    verified: true,
    transactionType: 'invested',
  },
  {
    id: '7',
    name: 'Michael O\'Brien',
    location: 'Los Angeles, CA',
    quote: 'The dashboard is incredibly intuitive. My team was productive within hours.',
    rating: 4,
    verified: true,
    transactionType: 'sold',
  },
  {
    id: '8',
    name: 'Lisa Anderson',
    location: 'Dallas, TX',
    quote: 'Automated follow-ups mean I never miss a hot lead. Revenue doubled.',
    rating: 5,
    verified: true,
    transactionType: 'bought',
  },
  {
    id: '9',
    name: 'Carlos Mendez',
    location: 'Miami, FL',
    quote: 'The reporting features give me actionable insights instantly.',
    rating: 5,
    verified: true,
    transactionType: 'invested',
  },
  {
    id: '10',
    name: 'Nicole Thompson',
    location: 'Phoenix, AZ',
    quote: 'Worth every penny. Our lead quality has never been better.',
    rating: 5,
    verified: true,
    transactionType: 'sold',
  },
  {
    id: '11',
    name: 'Thomas Kelly',
    location: 'New York, NY',
    quote: 'Professional platform for serious agents. Highly recommended.',
    rating: 4,
    verified: true,
    transactionType: 'bought',
  },
  {
    id: '12',
    name: 'Victoria Lopez',
    location: 'San Diego, CA',
    quote: 'Finally, a platform that understands real estate. Exceptional solution.',
    rating: 5,
    verified: true,
    transactionType: 'invested',
  },
];

const videoTestimonials: VideoTestimonial[] = [
  {
    id: 'video-1',
    name: 'Rebecca Hayes',
    location: 'Nashville, TN',
    quote: 'LeadEngine transformed how we manage leads and close deals.',
    duration: '2:34',
    transactionType: 'sold',
    initials: 'RH',
  },
  {
    id: 'video-2',
    name: 'Gregory Matthews',
    location: 'Charlotte, NC',
    quote: 'The best platform investment for scaling our real estate team.',
    duration: '3:12',
    transactionType: 'invested',
    initials: 'GM',
  },
  {
    id: 'video-3',
    name: 'Sophia Nakamura',
    location: 'Portland, OR',
    quote: 'Our productivity increased by 300% with LeadEngine automation.',
    duration: '2:18',
    transactionType: 'bought',
    initials: 'SN',
  },
  {
    id: 'video-4',
    name: 'Patrick O\'Connor',
    location: 'Boston, MA',
    quote: 'Game-changing technology for modern real estate professionals.',
    duration: '2:45',
    transactionType: 'sold',
    initials: 'PC',
  },
];

// Star rating component
const StarRating: React.FC<{ rating: number; className?: string }> = ({ rating, className = '' }) => {
  return (
    <div className={`flex gap-1 ${className}`}>
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={16}
          className={i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
        />
      ))}
    </div>
  );
};

// Avatar with initials
const Avatar: React.FC<{ name: string; className?: string }> = ({ name, className = '' }) => {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  const colors = [
    'bg-gradient-to-br from-sage-400 to-teal-500',
    'bg-gradient-to-br from-teal-400 to-cyan-500',
    'bg-gradient-to-br from-emerald-400 to-sage-500',
    'bg-gradient-to-br from-cyan-400 to-blue-500',
  ];

  const colorIndex = name.charCodeAt(0) % colors.length;

  return (
    <div
      className={`
        flex items-center justify-center rounded-full font-bold text-white
        ${colors[colorIndex]} ${className}
      `}
    >
      {initials}
    </div>
  );
};

// Transaction type badge
const TransactionBadge: React.FC<{ type: 'bought' | 'sold' | 'invested' }> = ({ type }) => {
  const styles = {
    bought: 'bg-blue-100 text-blue-700',
    sold: 'bg-green-100 text-green-700',
    invested: 'bg-purple-100 text-purple-700',
  };

  const labels = {
    bought: 'Buyer',
    sold: 'Seller',
    invested: 'Investor',
  };

  return (
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${styles[type]}`}>
      {labels[type]}
    </span>
  );
};

// Hero Section
const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-sage-50 via-teal-50 to-cyan-50 px-4 py-20 sm:py-32">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-sage-200 to-transparent rounded-full blur-3xl opacity-30 -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-tr from-teal-200 to-transparent rounded-full blur-3xl opacity-30 -ml-36 -mb-36" />

      <div className="relative max-w-4xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
          What Our Clients Say
        </h1>
        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
          Join hundreds of successful real estate professionals who trust LeadEngine to grow their business
        </p>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
          <div className="bg-white bg-opacity-60 backdrop-blur-sm rounded-lg px-6 py-6 border border-white border-opacity-40">
            <p className="text-3xl sm:text-4xl font-bold text-sage-600 mb-2">500+</p>
            <p className="text-gray-600 font-medium">Happy Clients</p>
          </div>
          <div className="bg-white bg-opacity-60 backdrop-blur-sm rounded-lg px-6 py-6 border border-white border-opacity-40">
            <p className="text-3xl sm:text-4xl font-bold text-teal-600 mb-2">4.9★</p>
            <p className="text-gray-600 font-medium">Average Rating</p>
          </div>
          <div className="bg-white bg-opacity-60 backdrop-blur-sm rounded-lg px-6 py-6 border border-white border-opacity-40">
            <p className="text-3xl sm:text-4xl font-bold text-cyan-600 mb-2">98%</p>
            <p className="text-gray-600 font-medium">Recommend</p>
          </div>
        </div>

        {/* Star rating */}
        <div className="flex justify-center mb-4">
          <StarRating rating={5} className="justify-center" />
        </div>
        <p className="text-sm text-gray-500">Based on 487 verified reviews</p>
      </div>
    </section>
  );
};

// Featured Testimonials
const FeaturedTestimonials: React.FC = () => {
  return (
    <section className="px-4 py-20 sm:py-32 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Success Stories</h2>
          <p className="text-lg text-gray-600">Real results from real agents</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-8 border border-gray-200 hover:shadow-xl transition-shadow duration-300"
            >
              {/* Header with avatar and info */}
              <div className="flex items-start gap-4 mb-6">
                <Avatar name={testimonial.name} className="w-16 h-16 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-gray-900">{testimonial.name}</h3>
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <MapPin size={14} />
                    {testimonial.location}
                  </p>
                </div>
              </div>

              {/* Rating */}
              <div className="mb-4">
                <StarRating rating={testimonial.rating} />
              </div>

              {/* Quote */}
              <p className="text-gray-700 leading-relaxed mb-6 italic">{testimonial.quote}</p>

              {/* Footer with badges */}
              <div className="space-y-3 pt-4 border-t border-gray-300">
                <div className="flex flex-wrap gap-2">
                  <TransactionBadge type={testimonial.transactionType} />
                  {testimonial.verified && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                      <CheckCircle2 size={14} />
                      Verified
                    </span>
                  )}
                </div>
                {testimonial.propertyType && (
                  <div className="text-xs text-gray-600">
                    <p>
                      <span className="font-semibold">{testimonial.propertyType}</span>
                    </p>
                    <p className="text-gray-500">{testimonial.priceRange}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Video Testimonials Section
const VideoTestimonialsSection: React.FC = () => {
  return (
    <section className="px-4 py-20 sm:py-32 bg-gradient-to-br from-sage-50 to-teal-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Client Video Testimonials
          </h2>
          <p className="text-lg text-gray-600">Watch real agents share their LeadEngine success</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {videoTestimonials.map((video) => (
            <div key={video.id} className="group cursor-pointer">
              {/* Video thumbnail */}
              <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg overflow-hidden mb-4 aspect-video flex items-center justify-center">
                {/* Play button overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center group-hover:bg-opacity-100 transition-all duration-300 transform group-hover:scale-110">
                    <Play size={32} className="text-sage-600 ml-1" fill="currentColor" />
                  </div>
                </div>

                {/* Duration badge */}
                <div className="absolute bottom-3 right-3 bg-black bg-opacity-70 text-white text-xs font-semibold px-2 py-1 rounded">
                  {video.duration}
                </div>

                {/* Initials avatar overlay */}
                <div className="absolute top-3 left-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-sage-400 to-teal-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {video.initials}
                  </div>
                </div>
              </div>

              {/* Info */}
              <div>
                <h3 className="font-bold text-gray-900 group-hover:text-sage-600 transition-colors">
                  {video.name}
                </h3>
                <p className="text-sm text-gray-500 mb-3">{video.location}</p>
                <p className="text-sm text-gray-600 italic mb-3">{video.quote}</p>
                <TransactionBadge type={video.transactionType} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Testimonial Grid
const TestimonialGrid: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <section className="px-4 py-20 sm:py-32 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">More Success Stories</h2>
          <p className="text-lg text-gray-600">Hundreds of agents trust LeadEngine</p>
        </div>

        {/* Masonry grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {additionalTestimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`
                bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all duration-300
                ${index % 3 === 0 ? 'lg:row-span-2' : ''}
              `}
              onMouseEnter={() => setExpandedId(testimonial.id)}
              onMouseLeave={() => setExpandedId(null)}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-bold text-gray-900">{testimonial.name}</h3>
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <MapPin size={14} />
                    {testimonial.location}
                  </p>
                </div>
                <Avatar name={testimonial.name} className="w-10 h-10 flex-shrink-0 text-sm" />
              </div>

              <div className="mb-4">
                <StarRating rating={testimonial.rating} />
              </div>

              <p
                className={`
                  text-gray-700 leading-relaxed transition-all duration-300
                  ${expandedId === testimonial.id ? '' : 'line-clamp-2'}
                `}
              >
                {testimonial.quote}
              </p>

              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-200">
                <TransactionBadge type={testimonial.transactionType} />
                {testimonial.verified && (
                  <CheckCircle2 size={16} className="text-green-600" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Stats Section
const StatsSection: React.FC = () => {
  const stats = [
    { label: 'Years in Business', value: '12+' },
    { label: 'Homes Sold', value: '5,200+' },
    { label: 'Average Sale Price', value: '$750K' },
    { label: 'Client Satisfaction', value: '98%' },
  ];

  return (
    <section className="px-4 py-20 sm:py-32 bg-gradient-to-r from-sage-600 to-teal-600">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-4xl sm:text-5xl font-bold text-white mb-2">{stat.value}</p>
              <p className="text-sage-100 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// CTA Section with Contact Form
const CTASection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    lookingFor: 'leads',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <section className="px-4 py-20 sm:py-32 bg-gradient-to-br from-teal-50 to-cyan-50">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Ready to Be Our Next Success Story?
          </h2>
          <p className="text-lg text-gray-600">
            Join hundreds of successful agents who are closing more deals with LeadEngine
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 sm:p-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-sage-500 focus:ring-2 focus:ring-sage-200 outline-none transition"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-sage-500 focus:ring-2 focus:ring-sage-200 outline-none transition"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="(555) 000-0000"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-sage-500 focus:ring-2 focus:ring-sage-200 outline-none transition"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  I'm Looking To...
                </label>
                <select
                  name="lookingFor"
                  value={formData.lookingFor}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-sage-500 focus:ring-2 focus:ring-sage-200 outline-none transition"
                >
                  <option value="leads">Generate Leads</option>
                  <option value="manage">Manage Leads Better</option>
                  <option value="scale">Scale My Team</option>
                  <option value="automate">Automate Follow-ups</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-sage-600 to-teal-600 hover:from-sage-700 hover:to-teal-700 text-white font-bold py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Get Your Free Consultation
            </button>
          </form>

          {/* Trust badges */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-center text-sm text-gray-600 mb-4">Trusted By Industry Leaders</p>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-2">
                  <span className="text-xs font-bold text-blue-700">BBB</span>
                </div>
                <p className="text-xs text-gray-600">BBB Accredited</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-2">
                  <span className="text-xs font-bold text-orange-700">★5</span>
                </div>
                <p className="text-xs text-gray-600">Zillow 5-Star</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-2">
                  <span className="text-xs font-bold text-emerald-700">RAR</span>
                </div>
                <p className="text-xs text-gray-600">Realtor.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Review Platform Links
const ReviewPlatformsSection: React.FC = () => {
  const platforms = [
    {
      name: 'Google Reviews',
      icon: '📍',
      description: '487 reviews',
      rating: '4.9★',
      link: '#',
    },
    {
      name: 'Zillow',
      icon: '🏠',
      description: 'Verified Listings',
      rating: '5.0★',
      link: '#',
    },
    {
      name: 'Realtor.com',
      icon: '🔑',
      description: 'Top Agent Listing',
      rating: '4.9★',
      link: '#',
    },
    {
      name: 'Facebook',
      icon: '👥',
      description: '340 recommendations',
      rating: '4.8★',
      link: '#',
    },
  ];

  return (
    <section className="px-4 py-20 sm:py-32 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Find Us On Review Platforms
          </h2>
          <p className="text-lg text-gray-600">Read verified reviews across the web</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {platforms.map((platform, index) => (
            <a
              key={index}
              href={platform.link}
              className="block bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-lg p-8 text-center hover:shadow-lg hover:border-sage-300 transition-all duration-300"
            >
              <div className="text-5xl mb-4">{platform.icon}</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{platform.name}</h3>
              <p className="text-sm text-gray-600 mb-1">{platform.description}</p>
              <p className="text-lg font-bold text-yellow-500">{platform.rating}</p>
              <button className="mt-4 px-4 py-2 rounded-lg bg-sage-100 text-sage-700 font-semibold hover:bg-sage-200 transition-colors text-sm">
                View Reviews
              </button>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

// Main Testimonials Page Component
export default function TestimonialsPage(): JSX.Element {
  return (
    <main className="bg-white">
      {/* Schema markup for testimonials */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: 'LeadEngine',
            image: 'https://realtyclientengine.app/og-image.png',
            description: 'Lead generation and CRM platform for real estate professionals',
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.9',
              ratingCount: '487',
            },
          }),
        }}
      />

      <HeroSection />
      <FeaturedTestimonials />
      <VideoTestimonialsSection />
      <TestimonialGrid />
      <StatsSection />
      <CTASection />
      <ReviewPlatformsSection />
    </main>
  );
}
