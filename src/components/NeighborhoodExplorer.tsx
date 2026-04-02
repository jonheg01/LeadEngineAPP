'use client';

import React, { useState, useMemo } from 'react';
import { ChevronDown, MapPin, TrendingUp, TrendingDown, Star, Users, Home, DollarSign, Calendar, AlertCircle, ArrowRight, Phone, Mail, Search } from 'lucide-react';

// Schema markup comment for SEO
// Add to <head>: <script type="application/ld+json">{"@context": "https://schema.org", "@type": "NeighborhoodInformation", "areaServed": "United States", ...}</script>

interface Neighborhood {
  id: string;
  name: string;
  city: string;
  state: string;
  medianPrice: number;
  priceYoYChange: number;
  avgDaysOnMarket: number;
  schoolRating: number;
  walkScore: number;
  transitScore: number;
  bikeScore: number;
  population: number;
  growthRate: number;
  amenities: string[];
  marketTrend: number[];
  activeListings: number;
  pricePerSqft: number;
  pricePerSqftChange: number;
  safetyIndex: number;
  vibeDescription: string;
  commuteTimes: Record<string, number>;
  topSchools: Array<{ name: string; rating: number; type: string }>;
  marketHeat: 'hot' | 'cooling' | 'stable';
  gradientBg: string;
}

// Mock data: 8 neighborhoods
const NEIGHBORHOODS: Neighborhood[] = [
  {
    id: 'brookside-hills',
    name: 'Brookside Hills',
    city: 'Denver',
    state: 'CO',
    medianPrice: 625000,
    priceYoYChange: 5.2,
    avgDaysOnMarket: 18,
    schoolRating: 8.5,
    walkScore: 72,
    transitScore: 65,
    bikeScore: 78,
    population: 28400,
    growthRate: 3.2,
    amenities: ['Washington Park', 'Cherry Creek Shopping', 'Craft Breweries', 'Independent Coffee Shops', 'Colorado Children\'s Hospital'],
    marketTrend: [580, 590, 598, 605, 612, 618, 620, 625, 628, 632, 630, 625],
    activeListings: 24,
    pricePerSqft: 385,
    pricePerSqftChange: 2.8,
    safetyIndex: 8.2,
    vibeDescription: 'Trendy, family-friendly neighborhood with excellent walkability and proximity to downtown attractions.',
    commuteTimes: { 'Downtown Denver': 12, 'Tech Center': 18, 'Airport': 32 },
    topSchools: [
      { name: 'Lake Middle School', rating: 8.8, type: 'Middle' },
      { name: 'Kent Denver Elementary', rating: 8.5, type: 'Elementary' },
      { name: 'Mullen High School', rating: 8.3, type: 'High' },
    ],
    marketHeat: 'hot',
    gradientBg: 'from-teal-400 to-cyan-600',
  },
  {
    id: 'laurel-meadows',
    name: 'Laurel Meadows',
    city: 'Boulder',
    state: 'CO',
    medianPrice: 850000,
    priceYoYChange: 3.1,
    avgDaysOnMarket: 22,
    schoolRating: 9.1,
    walkScore: 68,
    transitScore: 58,
    bikeScore: 92,
    population: 15200,
    growthRate: 1.8,
    amenities: ['Pearl Street Mall', 'Flatirons Trail Access', 'Farmers Market', 'Local Restaurants', 'University of Colorado'],
    marketTrend: [810, 820, 830, 835, 840, 845, 850, 855, 860, 865, 860, 850],
    activeListings: 12,
    pricePerSqft: 475,
    pricePerSqftChange: 1.2,
    safetyIndex: 8.9,
    vibeDescription: 'Upscale, educated community with strong outdoor recreation culture and world-class schools.',
    commuteTimes: { 'CU Boulder': 8, 'Denver': 45, 'Tech Center': 55 },
    topSchools: [
      { name: 'Fairview High School', rating: 9.3, type: 'High' },
      { name: 'Meadow Lake Elementary', rating: 9.0, type: 'Elementary' },
      { name: 'Crest View Middle School', rating: 8.8, type: 'Middle' },
    ],
    marketHeat: 'stable',
    gradientBg: 'from-emerald-400 to-green-600',
  },
  {
    id: 'west-end-lofts',
    name: 'West End Lofts',
    city: 'Denver',
    state: 'CO',
    medianPrice: 520000,
    priceYoYChange: 8.5,
    avgDaysOnMarket: 12,
    schoolRating: 7.2,
    walkScore: 88,
    transitScore: 82,
    bikeScore: 85,
    population: 8600,
    growthRate: 6.4,
    amenities: ['Denver Art District', 'RiNo Breweries', 'Trendy Galleries', 'Late-Night Dining', 'Music Venues'],
    marketTrend: [465, 475, 485, 495, 505, 512, 520, 528, 535, 540, 535, 520],
    activeListings: 18,
    pricePerSqft: 510,
    pricePerSqftChange: 6.2,
    safetyIndex: 7.5,
    vibeDescription: 'Hip, artsy urban neighborhood perfect for young professionals and creative types. Rapidly gentrifying.',
    commuteTimes: { 'Downtown Denver': 8, 'Tech Center': 25, 'Airport': 35 },
    topSchools: [
      { name: 'George Washington High School', rating: 7.5, type: 'High' },
      { name: 'Slavens Elementary', rating: 7.0, type: 'Elementary' },
    ],
    marketHeat: 'hot',
    gradientBg: 'from-purple-400 to-pink-600',
  },
  {
    id: 'cherry-creek',
    name: 'Cherry Creek',
    city: 'Denver',
    state: 'CO',
    medianPrice: 1200000,
    priceYoYChange: 2.1,
    avgDaysOnMarket: 28,
    schoolRating: 8.7,
    walkScore: 85,
    transitScore: 76,
    bikeScore: 72,
    population: 6800,
    growthRate: 0.8,
    amenities: ['Cherry Creek Shopping Center', 'Upscale Fine Dining', 'Art Galleries', 'Luxury Spas', 'Country Club'],
    marketTrend: [1150, 1160, 1170, 1180, 1190, 1195, 1200, 1205, 1210, 1210, 1205, 1200],
    activeListings: 8,
    pricePerSqft: 625,
    pricePerSqftChange: 0.5,
    safetyIndex: 9.1,
    vibeDescription: 'Luxury residential enclave with high-end shopping, dining, and amenities. Denver\'s most prestigious address.',
    commuteTimes: { 'Downtown Denver': 5, 'Tech Center': 20, 'Airport': 30 },
    topSchools: [
      { name: 'Colorado Academy', rating: 9.2, type: 'High' },
      { name: 'Cherry Creek Elementary', rating: 8.9, type: 'Elementary' },
    ],
    marketHeat: 'cooling',
    gradientBg: 'from-amber-400 to-orange-600',
  },
  {
    id: 'tech-center',
    name: 'Tech Center',
    city: 'Denver',
    state: 'CO',
    medianPrice: 475000,
    priceYoYChange: 4.8,
    avgDaysOnMarket: 16,
    schoolRating: 7.8,
    walkScore: 54,
    transitScore: 48,
    bikeScore: 52,
    population: 22100,
    growthRate: 5.1,
    amenities: ['Tech Hub Offices', 'Modern Apartments', 'Chain Restaurants', 'Fitness Centers', 'Shopping Centers'],
    marketTrend: [440, 450, 455, 460, 465, 470, 475, 480, 485, 480, 478, 475],
    activeListings: 35,
    pricePerSqft: 320,
    pricePerSqftChange: 3.5,
    safetyIndex: 7.9,
    vibeDescription: 'Modern business-oriented community close to major employers. Great for commuters and corporate professionals.',
    commuteTimes: { 'Tech Center': 5, 'Downtown Denver': 25, 'Airport': 20 },
    topSchools: [
      { name: 'Smoky Hill High School', rating: 8.1, type: 'High' },
      { name: 'Laredo Elementary', rating: 7.6, type: 'Elementary' },
    ],
    marketHeat: 'hot',
    gradientBg: 'from-blue-400 to-indigo-600',
  },
  {
    id: 'highlands-village',
    name: 'Highlands Village',
    city: 'Golden',
    state: 'CO',
    medianPrice: 580000,
    priceYoYChange: 2.9,
    avgDaysOnMarket: 20,
    schoolRating: 8.4,
    walkScore: 62,
    transitScore: 42,
    bikeScore: 68,
    population: 18900,
    growthRate: 2.5,
    amenities: ['Red Rocks Park Access', 'Mountain Trails', 'Local Breweries', 'Farmers Market', 'Alpine Schools'],
    marketTrend: [545, 555, 562, 568, 574, 578, 580, 583, 585, 587, 585, 580],
    activeListings: 19,
    pricePerSqft: 360,
    pricePerSqftChange: 1.8,
    safetyIndex: 8.6,
    vibeDescription: 'Mountain community perfect for outdoor enthusiasts. Close to recreation with small-town charm.',
    commuteTimes: { 'Red Rocks': 8, 'Denver': 25, 'Mountain Restaurants': 10 },
    topSchools: [
      { name: 'Golden Senior High School', rating: 8.5, type: 'High' },
      { name: 'Parfet Elementary', rating: 8.2, type: 'Elementary' },
    ],
    marketHeat: 'stable',
    gradientBg: 'from-red-400 to-rose-600',
  },
  {
    id: 'pearl-district',
    name: 'Pearl District',
    city: 'Denver',
    state: 'CO',
    medianPrice: 675000,
    priceYoYChange: 6.3,
    avgDaysOnMarket: 14,
    schoolRating: 7.9,
    walkScore: 91,
    transitScore: 88,
    bikeScore: 89,
    population: 12200,
    growthRate: 7.2,
    amenities: ['Pearl Street Shopping', 'Craft Food Scene', 'Galleries & Museums', 'Live Music', 'Modern Apartments'],
    marketTrend: [615, 625, 635, 645, 655, 665, 670, 675, 680, 685, 680, 675],
    activeListings: 22,
    pricePerSqft: 445,
    pricePerSqftChange: 5.1,
    safetyIndex: 8.3,
    vibeDescription: 'Vibrant mixed-use neighborhood with excellent urban amenities, walkability, and continuous development.',
    commuteTimes: { 'Downtown Denver': 10, 'Tech Center': 22, 'Airport': 28 },
    topSchools: [
      { name: 'Denver Public Schools HQ', rating: 7.8, type: 'District' },
    ],
    marketHeat: 'hot',
    gradientBg: 'from-cyan-400 to-sky-600',
  },
  {
    id: 'sloan-park',
    name: 'Sloan Park',
    city: 'Littleton',
    state: 'CO',
    medianPrice: 520000,
    priceYoYChange: 3.6,
    avgDaysOnMarket: 19,
    schoolRating: 8.6,
    walkScore: 66,
    transitScore: 52,
    bikeScore: 74,
    population: 19800,
    growthRate: 3.8,
    amenities: ['Sloan Lake Park', 'Family Playgrounds', 'Recreation Center', 'Family Restaurants', 'Community Pool'],
    marketTrend: [490, 500, 508, 514, 520, 525, 528, 532, 535, 540, 535, 520],
    activeListings: 26,
    pricePerSqft: 340,
    pricePerSqftChange: 2.1,
    safetyIndex: 8.4,
    vibeDescription: 'Family-focused suburban community with excellent schools and park access. Great for growing families.',
    commuteTimes: { 'Downtown Denver': 20, 'Tech Center': 12, 'Airport': 15 },
    topSchools: [
      { name: 'Sloan Elementary School', rating: 8.8, type: 'Elementary' },
      { name: 'Littleton High School', rating: 8.4, type: 'High' },
    ],
    marketHeat: 'stable',
    gradientBg: 'from-lime-400 to-green-500',
  },
];

interface FormData {
  email: string;
  name: string;
  phone: string;
}

// Neighborhood Search & Filter Component
function NeighborhoodBrowser() {
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([300000, 1500000]);
  const [schoolRating, setSchoolRating] = useState(0);
  const [walkability, setWalkability] = useState(0);
  const [lifestyle, setLifestyle] = useState('');

  const filtered = useMemo(() => {
    return NEIGHBORHOODS.filter(n => {
      const matchesSearch = n.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            n.city.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPrice = n.medianPrice >= priceRange[0] && n.medianPrice <= priceRange[1];
      const matchesSchool = schoolRating === 0 || n.schoolRating >= schoolRating;
      const matchesWalk = walkability === 0 || n.walkScore >= walkability;
      const matchesLifestyle = !lifestyle ||
        (lifestyle === 'urban' && n.walkScore > 75) ||
        (lifestyle === 'suburban' && n.walkScore >= 50 && n.walkScore <= 75) ||
        (lifestyle === 'rural' && n.walkScore < 50);

      return matchesSearch && matchesPrice && matchesSchool && matchesWalk && matchesLifestyle;
    });
  }, [searchTerm, priceRange, schoolRating, walkability, lifestyle]);

  return (
    <div className="space-y-8">
      {/* Search Bar */}
      <div className="relative">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search neighborhoods, cities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Price Range */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Price Range</label>
          <input
            type="range"
            min="300000"
            max="1500000"
            step="50000"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
            className="w-full"
          />
          <div className="text-xs text-slate-600">
            Up to ${(priceRange[1] / 1000000).toFixed(1)}M
          </div>
        </div>

        {/* School Rating */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">School Rating</label>
          <select
            value={schoolRating}
            onChange={(e) => setSchoolRating(parseFloat(e.target.value))}
            className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value={0}>All Schools</option>
            <option value={7}>7+ Rating</option>
            <option value={8}>8+ Rating</option>
            <option value={9}>9+ Rating</option>
          </select>
        </div>

        {/* Walkability */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Walkability</label>
          <select
            value={walkability}
            onChange={(e) => setWalkability(parseInt(e.target.value))}
            className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value={0}>Any</option>
            <option value={50}>Car-Friendly</option>
            <option value={70}>Very Walkable</option>
            <option value={85}>Walker\'s Paradise</option>
          </select>
        </div>

        {/* Lifestyle */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Lifestyle</label>
          <select
            value={lifestyle}
            onChange={(e) => setLifestyle(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="">All Lifestyles</option>
            <option value="urban">Urban</option>
            <option value="suburban">Suburban</option>
            <option value="rural">Rural/Mountain</option>
          </select>
        </div>
      </div>

      {/* Featured Neighborhoods Grid */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Featured Neighborhoods</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.length > 0 ? (
            filtered.map((neighborhood) => (
              <NeighborhoodCard key={neighborhood.id} neighborhood={neighborhood} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-slate-600">No neighborhoods match your criteria. Try adjusting your filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Individual Neighborhood Card with Hero Image (CSS Gradient)
interface NeighborhoodCardProps {
  neighborhood: Neighborhood;
}

function NeighborhoodCard({ neighborhood }: NeighborhoodCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="group rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
      {/* Hero Image with Gradient */}
      <div className={`h-48 bg-gradient-to-br ${neighborhood.gradientBg} relative overflow-hidden`}>
        <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-black transition-opacity" />
        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
          <div className="text-white">
            <h3 className="text-xl font-bold">{neighborhood.name}</h3>
            <p className="text-sm opacity-90">{neighborhood.city}, {neighborhood.state}</p>
          </div>
          {neighborhood.marketHeat === 'hot' && (
            <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">Hot Market</span>
          )}
          {neighborhood.marketHeat === 'cooling' && (
            <span className="bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">Cooling</span>
          )}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-white p-4 space-y-3">
        {/* Price and Change */}
        <div className="flex justify-between items-start">
          <div>
            <p className="text-xs text-slate-600">Median Price</p>
            <p className="text-xl font-bold text-slate-900">${(neighborhood.medianPrice / 1000000).toFixed(2)}M</p>
          </div>
          <div className={`flex items-center gap-1 ${neighborhood.priceYoYChange > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {neighborhood.priceYoYChange > 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            <span className="text-sm font-semibold">{Math.abs(neighborhood.priceYoYChange)}%</span>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 gap-2 py-2">
          <div className="text-xs">
            <p className="text-slate-600">Days on Market</p>
            <p className="font-semibold text-slate-900">{neighborhood.avgDaysOnMarket}</p>
          </div>
          <div className="text-xs">
            <p className="text-slate-600">School Rating</p>
            <p className="font-semibold text-slate-900">{neighborhood.schoolRating}/10</p>
          </div>
        </div>

        {/* Scores */}
        <div className="flex gap-2">
          <ScoreBadge label="Walk" value={neighborhood.walkScore} />
          <ScoreBadge label="Transit" value={neighborhood.transitScore} />
          <ScoreBadge label="Bike" value={neighborhood.bikeScore} />
        </div>

        {/* Expand Button */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full text-center py-2 text-teal-600 hover:text-teal-700 font-semibold text-sm flex items-center justify-center gap-2 border-t border-slate-200 mt-3"
        >
          {expanded ? 'Less Details' : 'View Details'}
          <ChevronDown className={`w-4 h-4 transition-transform ${expanded ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Expanded Details */}
      {expanded && (
        <NeighborhoodDetailPanel neighborhood={neighborhood} />
      )}
    </div>
  );
}

function ScoreBadge({ label, value }: { label: string; value: number }) {
  const color = value >= 70 ? 'bg-green-100 text-green-700' : value >= 50 ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-700';
  return (
    <span className={`text-xs font-semibold px-2 py-1 rounded ${color}`}>
      {label} {value}
    </span>
  );
}

// Expanded Neighborhood Details
function NeighborhoodDetailPanel({ neighborhood }: NeighborhoodCardProps) {
  return (
    <div className="bg-slate-50 border-t border-slate-200 p-4 space-y-4">
      {/* Population & Growth */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-slate-600">Population</p>
          <p className="font-semibold text-slate-900">{(neighborhood.population / 1000).toFixed(1)}K</p>
        </div>
        <div>
          <p className="text-xs text-slate-600">Growth Rate</p>
          <p className={`font-semibold ${neighborhood.growthRate > 3 ? 'text-green-600' : 'text-slate-900'}`}>
            {neighborhood.growthRate}% YoY
          </p>
        </div>
      </div>

      {/* Top Amenities */}
      <div>
        <p className="text-xs font-semibold text-slate-700 mb-2">Top Amenities</p>
        <ul className="text-xs text-slate-600 space-y-1">
          {neighborhood.amenities.slice(0, 3).map((amenity, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-teal-600">•</span> {amenity}
            </li>
          ))}
        </ul>
      </div>

      {/* Top Schools */}
      <div>
        <p className="text-xs font-semibold text-slate-700 mb-2">Top Schools</p>
        <ul className="text-xs space-y-1">
          {neighborhood.topSchools.slice(0, 2).map((school, i) => (
            <li key={i} className="flex justify-between">
              <span className="text-slate-600">{school.name}</span>
              <span className="font-semibold text-slate-900">{school.rating}/10</span>
            </li>
          ))}
        </ul>
      </div>

      {/* CTA Button */}
      <button className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 rounded-lg transition-colors flex items-center justify-center gap-2">
        <Home className="w-4 h-4" />
        Find Homes in {neighborhood.name}
      </button>
    </div>
  );
}

// Market Trends Section
function MarketTrendsSection({ neighborhood }: { neighborhood: Neighborhood }) {
  const maxPrice = Math.max(...neighborhood.marketTrend);
  const minPrice = Math.min(...neighborhood.marketTrend);
  const priceRange = maxPrice - minPrice || 1;

  return (
    <section className="bg-white rounded-xl shadow-md p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-slate-900">{neighborhood.name} Market Trends</h3>
          <p className="text-sm text-slate-600 mt-1">Last 12 months</p>
        </div>
        <div className={`px-4 py-2 rounded-lg font-semibold text-white ${neighborhood.marketHeat === 'hot' ? 'bg-red-500' : neighborhood.marketHeat === 'cooling' ? 'bg-blue-500' : 'bg-slate-500'}`}>
          {neighborhood.marketHeat === 'hot' ? '🔥 Hot Market' : neighborhood.marketHeat === 'cooling' ? '❄️ Cooling' : '→ Stable'}
        </div>
      </div>

      {/* Price Trend Bar Chart (CSS-based) */}
      <div>
        <h4 className="text-sm font-semibold text-slate-700 mb-4">Median Home Price Trend</h4>
        <div className="flex gap-1 items-end h-32 bg-slate-50 p-4 rounded-lg">
          {neighborhood.marketTrend.map((price, i) => (
            <div
              key={i}
              className="flex-1 bg-gradient-to-t from-teal-400 to-teal-600 rounded-t transition-all hover:opacity-75 group relative"
              style={{
                height: `${((price - minPrice) / priceRange) * 100}%`,
                minHeight: '4px',
              }}
              title={`Month ${i + 1}: $${price.toLocaleString()}`}
            >
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                ${(price / 1000).toFixed(0)}K
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-slate-600 mt-2">
          Range: ${(minPrice / 1000).toFixed(0)}K - ${(maxPrice / 1000).toFixed(0)}K | Current: ${(neighborhood.medianPrice / 1000).toFixed(0)}K
        </p>
      </div>

      {/* Key Market Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-50 p-4 rounded-lg">
          <p className="text-xs text-slate-600 font-semibold">Active Listings</p>
          <p className="text-2xl font-bold text-slate-900 mt-2">{neighborhood.activeListings}</p>
          <p className="text-xs text-slate-600 mt-1">homes for sale</p>
        </div>
        <div className="bg-slate-50 p-4 rounded-lg">
          <p className="text-xs text-slate-600 font-semibold">Price Per Sq/Ft</p>
          <p className="text-2xl font-bold text-slate-900 mt-2">${neighborhood.pricePerSqft}</p>
          <div className={`text-xs font-semibold mt-1 flex items-center gap-1 ${neighborhood.pricePerSqftChange > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {neighborhood.pricePerSqftChange > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            {Math.abs(neighborhood.pricePerSqftChange)}% YoY
          </div>
        </div>
        <div className="bg-slate-50 p-4 rounded-lg">
          <p className="text-xs text-slate-600 font-semibold">Days on Market</p>
          <p className="text-2xl font-bold text-slate-900 mt-2">{neighborhood.avgDaysOnMarket}</p>
          <p className="text-xs text-slate-600 mt-1">average</p>
        </div>
        <div className="bg-slate-50 p-4 rounded-lg">
          <p className="text-xs text-slate-600 font-semibold">Market Type</p>
          <p className="text-lg font-bold text-slate-900 mt-2">
            {neighborhood.priceYoYChange > 5 ? "Seller's" : neighborhood.priceYoYChange < 2 ? "Buyer's" : "Balanced"}
          </p>
          <p className="text-xs text-slate-600 mt-1">market</p>
        </div>
      </div>
    </section>
  );
}

// Lifestyle & Amenities Section
function LifestyleAmenitiesSection({ neighborhood }: { neighborhood: Neighborhood }) {
  return (
    <section className="bg-white rounded-xl shadow-md p-6 space-y-8">
      <h2 className="text-2xl font-bold text-slate-900">Lifestyle & Community</h2>

      {/* Commute Times */}
      <div>
        <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-teal-600" />
          Commute Times to Major Centers
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(neighborhood.commuteTimes).map(([location, minutes]) => (
            <div key={location} className="flex items-center justify-between bg-slate-50 p-4 rounded-lg">
              <span className="font-medium text-slate-900">{location}</span>
              <span className="font-bold text-teal-600">{minutes} min</span>
            </div>
          ))}
        </div>
      </div>

      {/* Community Vibe */}
      <div>
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Community Vibe</h3>
        <div className="bg-gradient-to-r from-teal-50 to-cyan-50 border border-teal-200 rounded-lg p-6">
          <p className="text-slate-700 leading-relaxed">{neighborhood.vibeDescription}</p>
        </div>
      </div>

      {/* Safety Index */}
      <div>
        <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-amber-600" />
          Safety & Crime Index
        </h3>
        <div className="flex items-center gap-4">
          <div className="flex-1 bg-slate-200 rounded-full h-3 overflow-hidden">
            <div
              className={`h-full transition-all ${neighborhood.safetyIndex >= 8.5 ? 'bg-green-500' : neighborhood.safetyIndex >= 7.5 ? 'bg-amber-500' : 'bg-red-500'}`}
              style={{ width: `${(neighborhood.safetyIndex / 10) * 100}%` }}
            />
          </div>
          <span className="font-bold text-lg text-slate-900">{neighborhood.safetyIndex}/10</span>
        </div>
        <p className="text-xs text-slate-600 mt-2">
          {neighborhood.safetyIndex >= 8.5 ? 'Very Safe - Low crime rates' : neighborhood.safetyIndex >= 7.5 ? 'Safe - Moderate crime rates' : 'Moderate - Average crime rates'}
        </p>
      </div>

      {/* Amenities List */}
      <div>
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Top Amenities & Attractions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {neighborhood.amenities.map((amenity, i) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
              <span className="text-teal-600 font-bold">✓</span>
              <span className="text-slate-700">{amenity}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Schools Detailed */}
      <div>
        <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
          <Star className="w-5 h-5 text-amber-500" />
          Top Schools
        </h3>
        <div className="space-y-3">
          {neighborhood.topSchools.map((school, i) => (
            <div key={i} className="flex items-center justify-between bg-slate-50 p-4 rounded-lg border border-slate-200">
              <div>
                <p className="font-semibold text-slate-900">{school.name}</p>
                <p className="text-xs text-slate-600">{school.type}</p>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span className="font-bold text-slate-900">{school.rating}/10</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Lead Capture Forms
function LeadCaptureForm({ neighborhoodName = 'Featured Neighborhoods', formType = 'report' }: { neighborhoodName?: string; formType?: 'report' | 'newsletter' | 'expert' }) {
  const [formData, setFormData] = useState<FormData>({ email: '', name: '', phone: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock submit - in production would call Supabase
    console.log('Form submitted:', { ...formData, type: formType, neighborhood: neighborhoodName });
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ email: '', name: '', phone: '' });
    }, 2000);
  };

  if (formType === 'report') {
    return (
      <div className="bg-gradient-to-r from-teal-600 to-cyan-600 rounded-xl shadow-lg p-8 text-white">
        <div className="max-w-md">
          <h3 className="text-2xl font-bold mb-2">Free Neighborhood Report</h3>
          <p className="text-teal-100 text-sm mb-6">
            Get a detailed analysis of {neighborhoodName} including market trends, school ratings, and lifestyle insights.
          </p>

          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="w-full px-4 py-3 rounded-lg text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <input
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="w-full px-4 py-3 rounded-lg text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <input
              type="tel"
              placeholder="Phone (optional)"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-3 rounded-lg text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button
              type="submit"
              className="w-full bg-white text-teal-600 hover:bg-teal-50 font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              {submitted ? '✓ Sent!' : <>Get Your Report <ArrowRight className="w-4 h-4" /></>}
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (formType === 'newsletter') {
    return (
      <div className="bg-slate-100 rounded-xl p-6">
        <h3 className="text-lg font-bold text-slate-900 mb-2">Market Updates Newsletter</h3>
        <p className="text-sm text-slate-600 mb-4">Stay informed with weekly neighborhood market updates and insights.</p>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            className="flex-1 px-4 py-2 rounded-lg text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <button
            type="submit"
            className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors"
          >
            {submitted ? '✓' : 'Subscribe'}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="bg-white border-2 border-teal-200 rounded-xl p-6 sticky top-4">
      <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
        <Phone className="w-5 h-5 text-teal-600" />
        Connect with a Local Expert
      </h3>
      <p className="text-sm text-slate-600 mb-4">Get personalized neighborhood insights and find your next home.</p>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Your Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          className="w-full px-4 py-2 rounded-lg border border-slate-300 text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          className="w-full px-4 py-2 rounded-lg border border-slate-300 text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        <input
          type="tel"
          placeholder="Phone"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          required
          className="w-full px-4 py-2 rounded-lg border border-slate-300 text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        <button
          type="submit"
          className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          {submitted ? '✓ We\'ll Call You!' : <>Connect <ArrowRight className="w-4 h-4" /></>}
        </button>
      </form>
      <p className="text-xs text-slate-600 mt-3 text-center">Within 1 business hour</p>
    </div>
  );
}

// Main Component
export default function NeighborhoodExplorer() {
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<Neighborhood | null>(null);

  return (
    <article className="min-h-screen bg-slate-50">
      {/* SEO Header */}
      <header className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold">
            Explore Neighborhoods with Confidence
          </h1>
          <p className="text-xl text-teal-100 max-w-2xl mx-auto">
            Discover the perfect neighborhood with detailed market data, school ratings, lifestyle insights, and expert guidance.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12 space-y-16">

        {/* Section 1: Browse & Search */}
        <section className="space-y-8">
          <NeighborhoodBrowser />
        </section>

        {/* Section 2: Detailed Neighborhood View */}
        {selectedNeighborhood && (
          <section className="space-y-8">
            <button
              onClick={() => setSelectedNeighborhood(null)}
              className="text-teal-600 hover:text-teal-700 font-semibold text-sm"
            >
              ← Back to Browse
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <MarketTrendsSection neighborhood={selectedNeighborhood} />
                <LifestyleAmenitiesSection neighborhood={selectedNeighborhood} />
              </div>

              <div>
                <LeadCaptureForm neighborhoodName={selectedNeighborhood.name} formType="expert" />
              </div>
            </div>
          </section>
        )}

        {/* Section 3: Lead Capture - Report Download */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Market Insights & Reports</h2>
            <p className="text-slate-700 text-lg mb-6">
              Download comprehensive neighborhood reports with pricing trends, market analysis, and community details to make informed real estate decisions.
            </p>
          </div>
          <LeadCaptureForm neighborhoodName="Your Preferred Neighborhood" formType="report" />
        </section>

        {/* Section 4: Newsletter */}
        <section className="bg-white rounded-xl shadow-md p-8 space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">Stay Updated on Neighborhood Trends</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <p className="text-slate-700">
                Get weekly updates on market trends, new listings, and neighborhood insights delivered to your inbox. Stay ahead in the real estate market.
              </p>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex items-center gap-2">
                  <span className="text-teal-600 font-bold">✓</span> Weekly market reports
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-teal-600 font-bold">✓</span> New listing alerts
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-teal-600 font-bold">✓</span> Price trend analysis
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-teal-600 font-bold">✓</span> Community highlights
                </li>
              </ul>
            </div>
            <LeadCaptureForm formType="newsletter" />
          </div>
        </section>

        {/* Section 5: Call-to-Action */}
        <section className="bg-gradient-to-r from-cyan-600 to-teal-600 rounded-xl shadow-lg p-12 text-center text-white space-y-6">
          <h2 className="text-3xl font-bold">Ready to Find Your Neighborhood?</h2>
          <p className="text-lg text-cyan-100 max-w-2xl mx-auto">
            Our team of local real estate experts can help you navigate the market and find the perfect home in your ideal neighborhood.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-teal-600 hover:bg-slate-100 font-bold py-3 px-8 rounded-lg transition-colors flex items-center justify-center gap-2">
              <Phone className="w-5 h-5" />
              Call an Expert
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-teal-600 font-bold py-3 px-8 rounded-lg transition-colors flex items-center justify-center gap-2">
              <Mail className="w-5 h-5" />
              Schedule a Consultation
            </button>
          </div>
        </section>
      </div>

      {/* Footer Note */}
      <footer className="bg-slate-900 text-slate-300 py-12 px-4 mt-16">
        <div className="max-w-6xl mx-auto text-center text-sm">
          <p>Data updated regularly. All information is for educational purposes. Consult a local real estate professional for current market conditions.</p>
        </div>
      </footer>
    </article>
  );
}
