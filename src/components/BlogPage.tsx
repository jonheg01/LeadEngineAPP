'use client';

import React, { useState, useMemo } from 'react';
import { Search, ChevronRight, Star, Download } from 'lucide-react';

// Type definitions
interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  authorInitials: string;
  date: string;
  readTime: number;
  featured?: boolean;
  gradientBg: string;
}

interface Category {
  id: string;
  label: string;
  count: number;
}

// Blog post data with realistic real estate content
const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: '2025 Real Estate Market Forecast: Buyer\'s Advantage Emerging',
    excerpt:
      'Market conditions are shifting in buyers\' favor as inventory increases and mortgage trends stabilize. Discover what this means for your home purchase strategy.',
    category: 'Market Updates',
    author: 'Sarah Chen',
    authorInitials: 'SC',
    date: 'Mar 28, 2025',
    readTime: 6,
    featured: true,
    gradientBg: 'from-emerald-600 to-teal-500',
  },
  {
    id: '2',
    title: 'First-Time Buyer Checklist: Everything Before Making an Offer',
    excerpt:
      'Buying your first home is exciting but complex. This comprehensive checklist ensures you\'re prepared with pre-approval, inspections, and closing costs.',
    category: 'First-Time Buyers',
    author: 'Michael Torres',
    authorInitials: 'MT',
    date: 'Mar 24, 2025',
    readTime: 8,
    gradientBg: 'from-sage-500 to-green-400',
  },
  {
    id: '3',
    title: 'Staging on a Budget: Transform Your Home in 30 Days',
    excerpt:
      'Professional staging doesn\'t require expensive renovations. Learn DIY techniques that increase perceived value and attract serious buyers.',
    category: 'Selling Tips',
    author: 'Jessica Williams',
    authorInitials: 'JW',
    date: 'Mar 20, 2025',
    readTime: 5,
    gradientBg: 'from-amber-500 to-orange-400',
  },
  {
    id: '4',
    title: 'Multi-Unit Investment Properties: Build Your Real Estate Empire',
    excerpt:
      'Understand the fundamentals of multi-family investing, cash flow analysis, and finding deals that generate consistent passive income.',
    category: 'Investment',
    author: 'David Park',
    authorInitials: 'DP',
    date: 'Mar 18, 2025',
    readTime: 9,
    gradientBg: 'from-blue-600 to-cyan-500',
  },
  {
    id: '5',
    title: 'Mortgage Rate Strategies: Lock In Now or Wait?',
    excerpt:
      'Navigate rate fluctuations with confidence. Expert analysis on rate-lock timing, refinance windows, and APR vs. APY differences.',
    category: 'Buying Tips',
    author: 'Amanda Foster',
    authorInitials: 'AF',
    date: 'Mar 16, 2025',
    readTime: 7,
    gradientBg: 'from-indigo-600 to-purple-500',
  },
  {
    id: '6',
    title: 'Top 10 Neighborhoods for Young Families',
    excerpt:
      'Balance school quality, commute times, and community vibrancy. Our research identifies neighborhoods perfect for growing families.',
    category: 'Lifestyle',
    author: 'Rachel Bennett',
    authorInitials: 'RB',
    date: 'Mar 14, 2025',
    readTime: 6,
    gradientBg: 'from-pink-500 to-rose-400',
  },
  {
    id: '7',
    title: 'Preparing for Your Home Inspection: What to Expect',
    excerpt:
      'Demystify the inspection process. Know what inspectors look for, common red flags, and how to negotiate repairs after findings.',
    category: 'Buying Tips',
    author: 'Kevin Martinez',
    authorInitials: 'KM',
    date: 'Mar 12, 2025',
    readTime: 5,
    gradientBg: 'from-teal-600 to-cyan-500',
  },
  {
    id: '8',
    title: 'Kitchen Renovations with Best ROI: Maximize Resale Value',
    excerpt:
      'Not all kitchen upgrades deliver equal returns. Discover which renovations yield the highest investment returns when selling.',
    category: 'Investment',
    author: 'Emily Rodriguez',
    authorInitials: 'ER',
    date: 'Mar 10, 2025',
    readTime: 7,
    gradientBg: 'from-yellow-500 to-amber-400',
  },
  {
    id: '9',
    title: 'Selling Your Home: Timeline, Pricing, and Marketing Strategy',
    excerpt:
      'Maximize your sale price by understanding market timing, comparable analysis, and professional marketing that attracts qualified buyers.',
    category: 'Selling Tips',
    author: 'Thomas Anderson',
    authorInitials: 'TA',
    date: 'Mar 8, 2025',
    readTime: 8,
    gradientBg: 'from-green-600 to-emerald-500',
  },
  {
    id: '10',
    title: 'Investment Property Analysis: Calculate Cash-on-Cash Returns',
    excerpt:
      'Master the metrics that matter. Learn to evaluate cap rates, cash flow projections, and identify undervalued properties.',
    category: 'Investment',
    author: 'Patricia Hughes',
    authorInitials: 'PH',
    date: 'Mar 6, 2025',
    readTime: 9,
    gradientBg: 'from-violet-600 to-purple-500',
  },
  {
    id: '11',
    title: 'Escrow Explained: Your Money is Safe and Here\'s Why',
    excerpt:
      'Understand how escrow protections work throughout the transaction. Build confidence in the closing process.',
    category: 'First-Time Buyers',
    author: 'Laura Schmidt',
    authorInitials: 'LS',
    date: 'Mar 4, 2025',
    readTime: 4,
    gradientBg: 'from-slate-600 to-gray-500',
  },
  {
    id: '12',
    title: 'Home Automation Adds Value: Smart Features Buyers Want',
    excerpt:
      'Smart homes are no longer luxury items. Discover affordable automation upgrades that increase property value and appeal.',
    category: 'Market Updates',
    author: 'Chris Park',
    authorInitials: 'CP',
    date: 'Mar 2, 2025',
    readTime: 6,
    gradientBg: 'from-cyan-600 to-blue-500',
  },
];

const CATEGORIES: Category[] = [
  { id: 'all', label: 'All', count: 12 },
  { id: 'market', label: 'Market Updates', count: 2 },
  { id: 'buying', label: 'Buying Tips', count: 2 },
  { id: 'selling', label: 'Selling Tips', count: 2 },
  { id: 'investment', label: 'Investment', count: 3 },
  { id: 'lifestyle', label: 'Lifestyle', count: 1 },
  { id: 'firsttime', label: 'First-Time Buyers', count: 2 },
];

const POPULAR_TOPICS = [
  'First Time Buyers',
  'Home Staging',
  'Market Trends',
  'Mortgage Rates',
  'Investment Properties',
  'Renovation ROI',
  'School Districts',
  'Property Inspection',
  'Escrow Process',
  'Home Automation',
  'Buyer\'s Market',
  'Neighborhood Guide',
  'Closing Costs',
  'Real Estate Investing',
  'Resale Value',
];

const POPULAR_ARTICLES = [
  {
    number: 1,
    title: 'First-Time Buyer Checklist',
    category: 'First-Time Buyers',
  },
  {
    number: 2,
    title: '2025 Market Forecast',
    category: 'Market Updates',
  },
  {
    number: 3,
    title: 'Staging on a Budget',
    category: 'Selling Tips',
  },
  {
    number: 4,
    title: 'Investment Property Analysis',
    category: 'Investment',
  },
  {
    number: 5,
    title: 'Mortgage Rate Strategies',
    category: 'Buying Tips',
  },
];

const RESOURCES = [
  {
    id: 'buyer-guide',
    title: 'Home Buyer\'s Guide',
    description: 'Complete 50-page PDF with checklists',
  },
  {
    id: 'seller-checklist',
    title: 'Seller\'s Preparation Checklist',
    description: '30-day action plan to maximize sale price',
  },
];

// Category badge color mapping
const getCategoryColor = (category: string): string => {
  const colorMap: { [key: string]: string } = {
    'Market Updates': 'bg-emerald-100 text-emerald-800',
    'Buying Tips': 'bg-blue-100 text-blue-800',
    'Selling Tips': 'bg-amber-100 text-amber-800',
    'Investment': 'bg-purple-100 text-purple-800',
    'Lifestyle': 'bg-pink-100 text-pink-800',
    'First-Time Buyers': 'bg-teal-100 text-teal-800',
  };
  return colorMap[category] || 'bg-sage-100 text-sage-800';
};

// Featured Article Component
const FeaturedArticle: React.FC<{ post: BlogPost }> = ({ post }) => (
  <article className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
    {/* Featured Image */}
    <div className="relative h-80 lg:h-96 rounded-lg overflow-hidden shadow-lg">
      <div
        className={`w-full h-full bg-gradient-to-br ${post.gradientBg} flex items-center justify-center`}
      >
        <div className="text-white text-center opacity-20">
          <div className="text-6xl font-bold mb-4">📰</div>
          <p className="text-xl">Featured Article</p>
        </div>
      </div>
      <div className="absolute top-4 left-4">
        <span
          className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getCategoryColor(
            post.category
          )}`}
        >
          {post.category}
        </span>
      </div>
    </div>

    {/* Featured Content */}
    <div className="flex flex-col justify-center">
      <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
        {post.title}
      </h2>

      <div className="flex items-center gap-4 mb-6 text-sm text-gray-600">
        {/* Author Avatar */}
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sage-400 to-teal-500 flex items-center justify-center text-white font-semibold">
          {post.authorInitials}
        </div>
        <span className="font-medium text-gray-900">{post.author}</span>
        <span>•</span>
        <time dateTime={post.date}>{post.date}</time>
        <span>•</span>
        <span>{post.readTime} min read</span>
      </div>

      <p className="text-lg text-gray-700 mb-8 leading-relaxed">
        {post.excerpt}
      </p>

      <div className="flex gap-4">
        <button className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-sage-600 to-teal-600 text-white font-semibold rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200">
          Read More
          <ChevronRight className="w-5 h-5 ml-2" />
        </button>
        <button className="inline-flex items-center px-6 py-3 border-2 border-sage-600 text-sage-600 font-semibold rounded-lg hover:bg-sage-50 transition-colors duration-200">
          Share
        </button>
      </div>
    </div>
  </article>
);

// Blog Post Card Component
const BlogCard: React.FC<{ post: BlogPost }> = ({ post }) => (
  <article className="bg-white rounded-lg shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden group">
    {/* Card Image */}
    <div className="relative h-48 overflow-hidden">
      <div
        className={`w-full h-full bg-gradient-to-br ${post.gradientBg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
      >
        <div className="text-white text-center opacity-25">
          <div className="text-5xl font-bold">🏠</div>
        </div>
      </div>
      <div className="absolute top-3 left-3">
        <span
          className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${getCategoryColor(
            post.category
          )}`}
        >
          {post.category}
        </span>
      </div>
    </div>

    {/* Card Content */}
    <div className="p-5">
      <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-sage-600 transition-colors">
        {post.title}
      </h3>

      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{post.excerpt}</p>

      {/* Meta Information */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sage-400 to-teal-500 flex items-center justify-center text-white text-xs font-bold">
          {post.authorInitials}
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-900">{post.author}</p>
          <p className="text-xs text-gray-500">{post.date}</p>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <span className="text-xs text-gray-500 font-medium">
          {post.readTime} min read
        </span>
        <button className="text-sage-600 hover:text-teal-600 font-semibold text-sm transition-colors">
          Read →
        </button>
      </div>
    </div>
  </article>
);

// Newsletter CTA Component
const NewsletterCTA: React.FC = () => (
  <section className="my-16 px-4 lg:px-0">
    <div className="bg-gradient-to-r from-sage-600 to-teal-600 rounded-lg p-8 lg:p-12 text-white shadow-lg">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl lg:text-4xl font-bold mb-3">
          Stay Ahead of the Market
        </h2>
        <p className="text-lg text-sage-100 mb-8">
          Get weekly insights delivered to your inbox — market updates, buying
          tips, and investment strategies.
        </p>

        <form className="flex flex-col sm:flex-row gap-3 mb-6">
          <input
            type="email"
            placeholder="Enter your email address"
            className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sage-400"
            required
          />
          <button
            type="submit"
            className="px-8 py-3 bg-white text-sage-600 font-bold rounded-lg hover:bg-sage-50 transition-colors duration-200 whitespace-nowrap"
          >
            Subscribe
          </button>
        </form>

        <p className="text-sm text-sage-100">
          ✓ Join 2,500+ subscribers | No spam, unsubscribe anytime
        </p>
      </div>
    </div>
  </section>
);

// Main BlogPage Component
export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [displayCount, setDisplayCount] = useState(9);

  // Filter and search logic
  const filteredPosts = useMemo(() => {
    let filtered = BLOG_POSTS.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());

      const categoryMatch =
        selectedCategory === 'all' ||
        post.category.toLowerCase().replace(/\s+/g, '') ===
          selectedCategory.toLowerCase().replace(/\s+/g, '');

      return matchesSearch && categoryMatch;
    });

    return filtered;
  }, [searchTerm, selectedCategory]);

  // Separate featured post from regular posts
  const featuredPost = filteredPosts.find((p) => p.featured) || filteredPosts[0];
  const regularPosts = filteredPosts
    .filter((p) => p.id !== featuredPost?.id)
    .slice(0, displayCount);

  const hasMore = filteredPosts.filter((p) => p.id !== featuredPost?.id)
    .length > displayCount;

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-sage-50 to-white py-12 lg:py-16 px-4 lg:px-0">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Real Estate Insights & Market Updates
            </h1>
            <p className="text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
              Expert advice for buyers, sellers, and investors. Stay informed
              with actionable insights that help you make confident real estate
              decisions.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg border-2 border-gray-200 focus:border-sage-500 focus:outline-none text-gray-900 placeholder-gray-500 transition-colors"
              />
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 justify-center">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full font-semibold transition-all duration-200 ${
                  selectedCategory === cat.id
                    ? 'bg-gradient-to-r from-sage-600 to-teal-600 text-white shadow-md'
                    : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-sage-400'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-5xl mx-auto px-4 lg:px-0 py-12">
        {/* Featured Article */}
        {featuredPost && <FeaturedArticle post={featuredPost} />}

        {/* Section Title */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Recent Articles
          </h2>
          <p className="text-gray-600">
            {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''}{' '}
            found
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {regularPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        {/* Load More Button */}
        {hasMore && (
          <div className="text-center mb-12">
            <button
              onClick={() => setDisplayCount(displayCount + 6)}
              className="px-8 py-3 border-2 border-sage-600 text-sage-600 font-bold rounded-lg hover:bg-sage-50 transition-colors duration-200"
            >
              Load More Articles
            </button>
          </div>
        )}

        {regularPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No articles found matching your search. Try adjusting your filters.
            </p>
          </div>
        )}
      </section>

      {/* Newsletter CTA */}
      <section className="bg-gray-50 py-12 px-4 lg:px-0">
        <div className="max-w-5xl mx-auto">
          <NewsletterCTA />
        </div>
      </section>

      {/* Popular Topics Section */}
      <section className="max-w-5xl mx-auto px-4 lg:px-0 py-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          Explore Popular Topics
        </h2>
        <div className="flex flex-wrap gap-3">
          {POPULAR_TOPICS.map((topic, index) => (
            <button
              key={index}
              className="px-4 py-2 bg-white border-2 border-gray-200 rounded-full text-gray-700 font-medium hover:border-sage-500 hover:text-sage-600 transition-colors duration-200"
            >
              {topic}
            </button>
          ))}
        </div>
      </section>

      {/* Bottom Section: Popular Articles + Sidebar */}
      <section className="bg-gray-50 py-12 px-4 lg:px-0">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Most Popular Articles */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Most Popular This Week
            </h3>
            <div className="space-y-4">
              {POPULAR_ARTICLES.map((article) => (
                <div
                  key={article.number}
                  className="flex items-start gap-4 p-4 bg-white rounded-lg border-l-4 border-sage-500 hover:shadow-md transition-shadow"
                >
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-sage-600 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {article.number}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">
                      {article.title}
                    </h4>
                    <span className="text-xs font-medium text-sage-600 bg-sage-50 px-2 py-1 rounded inline-block">
                      {article.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar: Resources + Contact */}
          <aside className="space-y-6">
            {/* Free Resources */}
            <div className="bg-white rounded-lg p-6 border-2 border-teal-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Download className="w-5 h-5 text-sage-600" />
                Free Resources
              </h3>
              <div className="space-y-3">
                {RESOURCES.map((resource) => (
                  <button
                    key={resource.id}
                    className="block w-full text-left p-3 bg-sage-50 rounded-lg hover:bg-sage-100 transition-colors group"
                  >
                    <p className="font-semibold text-gray-900 group-hover:text-sage-600">
                      {resource.title}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      {resource.description}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Agent Contact Card */}
            <div className="bg-gradient-to-br from-sage-600 to-teal-600 rounded-lg p-6 text-white shadow-lg">
              <h3 className="text-xl font-bold mb-3">Ask an Expert</h3>
              <p className="text-sm text-sage-100 mb-4">
                Have questions? Our team is ready to help guide your real estate journey.
              </p>
              <button className="w-full px-4 py-2 bg-white text-sage-600 font-bold rounded-lg hover:bg-sage-50 transition-colors">
                Schedule Consultation
              </button>
              <p className="text-xs text-sage-200 mt-3 text-center">
                Free 15-minute call
              </p>
            </div>

            {/* Trust Badge */}
            <div className="bg-white rounded-lg p-4 text-center border-2 border-gray-100">
              <div className="flex justify-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-amber-400 fill-amber-400"
                  />
                ))}
              </div>
              <p className="text-sm font-semibold text-gray-900">
                4.9/5 from 200+ reviews
              </p>
              <p className="text-xs text-gray-600 mt-1">
                Trusted by local home buyers
              </p>
            </div>
          </aside>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="bg-gradient-to-r from-sage-600 to-teal-600 py-12 px-4 lg:px-0 text-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Make Your Move?</h2>
          <p className="text-lg text-sage-100 mb-6">
            Connect with a local agent who knows the market inside and out.
          </p>
          <button className="px-8 py-3 bg-white text-sage-600 font-bold rounded-lg hover:bg-sage-50 transition-colors">
            Get in Touch Today
          </button>
        </div>
      </section>
    </main>
  );
}
