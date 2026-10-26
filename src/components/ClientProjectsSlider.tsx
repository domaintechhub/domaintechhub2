import React, { useState, useEffect, useRef } from 'react';
import { 
  ExternalLink, ChevronLeft, ChevronRight, Globe, Lock, 
  Sparkles, CheckCircle, ArrowRight, Pause, Play, LayoutGrid, SlidersHorizontal
} from 'lucide-react';

import arenaPropertiesImg from '../assets/images/clients/arena_properties.jpg';
import greAfricaImg from '../assets/images/clients/gre_africa.jpg';
import justPropertyImg from '../assets/images/clients/just_property.jpg';
import tessasBakeryImg from '../assets/images/clients/tessas_bakery.jpg';
import classicBakeryImg from '../assets/images/clients/classic_bakery.jpg';
import zoominfoImg from '../assets/images/clients/zoominfo.jpg';

export interface ClientProjectItem {
  id: string;
  name: string;
  url: string;
  displayUrl: string;
  category: string;
  location: string;
  headline: string;
  description: string;
  image: string;
  techTags: string[];
  metricsBadge: string;
  deliveryType: string;
}

export const CLIENT_PROJECTS: ClientProjectItem[] = [
  {
    id: 'arena-properties',
    name: 'Arena Properties',
    url: 'https://www.arenaproperties.ae/',
    displayUrl: 'arenaproperties.ae',
    category: 'Luxury Real Estate & Investments',
    location: 'Dubai, UAE',
    headline: 'Dubai Luxury Real Estate & Off-Plan Investment Portal',
    description: 'High-performance property discovery platform built for Dubai’s premier luxury real estate brokerage. Features multi-currency pricing, off-plan developer projects, and automated VIP broker routing.',
    image: arenaPropertiesImg,
    techTags: ['Next.js', 'Tailwind CSS', 'Dubai MLS API', 'Multi-Currency', 'Global Edge CDN'],
    metricsBadge: 'Live in Production · Dubai UAE',
    deliveryType: 'Real Estate Platform'
  },
  {
    id: 'gre-africa',
    name: 'GRE Africa Group',
    url: 'https://greafrica.group/',
    displayUrl: 'greafrica.group',
    category: 'Infrastructure & Real Estate Investments',
    location: 'Pan-Africa / Mauritius',
    headline: 'Institutional African Property Development Platform',
    description: 'Corporate investor website and capital portfolio engine for Gateway Real Estate Africa, presenting institutional assets, ESG impact metrics, and corporate governance disclosures.',
    image: greAfricaImg,
    techTags: ['React', 'TypeScript', 'Investor Portal', 'ESG Impact UI', 'Pan-African CDN'],
    metricsBadge: '$1.5B+ Portfolio · Pan-Africa',
    deliveryType: 'Corporate Investment Portal'
  },
  {
    id: 'just-property',
    name: 'Just Property',
    url: 'https://www.just.property/',
    displayUrl: 'just.property',
    category: 'National Real Estate Portal',
    location: 'South Africa & Regional',
    headline: 'High-Volume Residential & Commercial Property Engine',
    description: 'Modern real estate marketplace facilitating thousands of property sales and rentals. Engineered with instant geolocation search, interactive map filters, and automated agent lead dispatch.',
    image: justPropertyImg,
    techTags: ['Next.js', 'Geo Search', 'Lead Dispatch Engine', 'Property MLS', 'Cloudflare Edge'],
    metricsBadge: 'High-Traffic Portal · Southern Africa',
    deliveryType: 'Property Discovery Portal'
  },
  {
    id: 'tessas-bakery',
    name: "Tessa's Bakery",
    url: 'https://tessasbakery.co.za/',
    displayUrl: 'tessasbakery.co.za',
    category: 'Artisan Bakery & Cake E-Commerce',
    location: 'Cape Town, South Africa',
    headline: 'Cape Town Handcrafted Cake & Dessert Webstore',
    description: 'Artisanal bakery e-commerce storefront featuring bespoke celebration cake customization, dispatch date & time slot selection, online payment gateway, and high-conversion mobile checkout.',
    image: tessasBakeryImg,
    techTags: ['E-Commerce Storefront', 'Cake Customizer', 'Delivery Scheduler', 'PayFast & Stripe', 'Mobile Checkout'],
    metricsBadge: 'Active E-Commerce · Cape Town',
    deliveryType: 'E-Commerce & Ordering'
  },
  {
    id: 'classic-bakery',
    name: 'Classic Bakery',
    url: 'https://www.classicbakery.co.za/',
    displayUrl: 'classicbakery.co.za',
    category: 'Commercial & Retail Bakery Enterprise',
    location: 'South Africa',
    headline: 'Commercial Artisan Breads & Wholesale Platform',
    description: 'Enterprise bakery platform serving retail customers and high-volume commercial wholesale clients with automated product catalogs, store locations, and B2B quotation systems.',
    image: classicBakeryImg,
    techTags: ['B2B Wholesale Portal', 'Product Catalog', 'Store Branch Finder', 'SEO Taxonomy', 'Fast Edge Hosting'],
    metricsBadge: 'Enterprise Wholesale · South Africa',
    deliveryType: 'Commercial B2B & Retail'
  },
  {
    id: 'zoominfo',
    name: 'ZoomInfo',
    url: 'https://www.zoominfo.com/',
    displayUrl: 'zoominfo.com',
    category: 'Enterprise B2B Intelligence & SaaS',
    location: 'Global / United States',
    headline: 'Global Go-To-Market & Revenue Intelligence Engine',
    description: 'Modern enterprise SaaS website engineered for high-intent conversions, enterprise interactive demo flows, sub-second global page loads, and world-class design fidelity.',
    image: zoominfoImg,
    techTags: ['Enterprise SaaS', 'Interactive Revenue UI', 'Global Scale', 'Sub-second Load', 'HubSpot / CRM Sync'],
    metricsBadge: 'Global Enterprise SaaS · Worldwide',
    deliveryType: 'SaaS Platform & Engine'
  }
];

interface ClientProjectsSliderProps {
  onSelectForQuote?: (serviceId: string) => void;
}

export const ClientProjectsSlider: React.FC<ClientProjectsSliderProps> = ({ onSelectForQuote }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [viewMode, setViewMode] = useState<'slider' | 'grid'>('slider');
  const sliderRef = useRef<HTMLDivElement>(null);

  const total = CLIENT_PROJECTS.length;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Autoplay effect
  useEffect(() => {
    if (!isAutoPlaying || isHovered || viewMode === 'grid') return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
    }, 4500);
    return () => clearInterval(interval);
  }, [isAutoPlaying, isHovered, viewMode, total]);

  const activeProject = CLIENT_PROJECTS[currentIndex];

  const handleRequestSimilar = (project: ClientProjectItem) => {
    if (onSelectForQuote) {
      onSelectForQuote(`Client Site Architecture (${project.name})`);
    }
    const quoteEl = document.getElementById('quote-section');
    if (quoteEl) {
      quoteEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section 
      id="client-projects"
      className="py-16 sm:py-24 border-b border-stone-200 dark:border-slate-800 bg-stone-50/60 dark:bg-slate-950/40 relative overflow-hidden"
    >
      {/* Background soft ambient accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#00c853]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-5 sm:gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/80 mb-3">
              <span className="text-xs font-mono text-[#00c853] dark:text-[#00e676] font-bold uppercase tracking-wider">
                [ 07 / REAL CLIENT WEBSITES ]
              </span>
            </div>
            
            <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
              REAL PROJECTS WE'VE BUILT FOR CLIENTS
            </h2>
            <p className="mt-2.5 text-xs sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl font-medium leading-relaxed">
              Explore live production websites and digital platforms built and deployed for our clients across Africa, UAE, and international markets. Click any project to open the live client website.
            </p>
          </div>

          {/* Slider Controls & View Switcher */}
          <div className="flex items-center justify-between sm:justify-end gap-3 w-full md:w-auto">
            <div className="inline-flex items-center p-1 rounded-xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 shadow-xs">
              <button
                onClick={() => setViewMode('slider')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  viewMode === 'slider'
                    ? 'bg-[#00c853] !text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
                title="Sliding Box View"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Slider</span>
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-[#00c853] !text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
                title="View All 6 In Grid"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>All Sites (6)</span>
              </button>
            </div>

            {viewMode === 'slider' && (
              <div className="flex items-center gap-2">
                <button
                  onClick={prevSlide}
                  aria-label="Previous project slide"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-[#00c853] hover:border-[#00c853] dark:hover:text-[#00e676] dark:hover:border-[#00c853] transition-all cursor-pointer shadow-xs active:scale-95"
                >
                  <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <button
                  onClick={nextSlide}
                  aria-label="Next project slide"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-[#00c853] hover:border-[#00c853] dark:hover:text-[#00e676] dark:hover:border-[#00c853] transition-all cursor-pointer shadow-xs active:scale-95"
                >
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Quick Industry Filter & Category Badges */}
        <div className="flex flex-wrap items-center gap-2 mb-6 p-3 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-stone-200 dark:border-slate-800 shadow-xs">
          <span className="text-[11px] font-mono font-bold text-slate-500 uppercase tracking-wider shrink-0 mr-1">
            Industries We Serve:
          </span>
          {CLIENT_PROJECTS.map((proj, idx) => {
            const isSelected = viewMode === 'slider' && currentIndex === idx;
            return (
              <button
                key={proj.id}
                onClick={() => {
                  setCurrentIndex(idx);
                  setViewMode('slider');
                }}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-[#00c853] !text-white shadow-xs font-bold'
                    : 'bg-stone-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-[#00c853] dark:hover:text-[#00e676] hover:bg-stone-200 dark:hover:bg-slate-700'
                }`}
                title={`View ${proj.name} – ${proj.category}`}
              >
                <span>{proj.category}</span>
                <span className={`text-[10px] ${isSelected ? '!text-emerald-100' : 'text-slate-400 dark:text-slate-500'}`}>
                  ({proj.name})
                </span>
              </button>
            );
          })}
        </div>

        {/* ========================================================================= */}
        {/* SLIDER VIEW MODE (SLIDING BOXES WITH BROWSER MOCKUP) */}
        {/* ========================================================================= */}
        {viewMode === 'slider' && (
          <div 
            ref={sliderRef}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="space-y-6"
          >
            {/* Main Featured Slide Box */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-stone-200 dark:border-slate-800 shadow-xl overflow-hidden transition-all duration-300">
              
              {/* Browser Window Header Chrome */}
              <div className="px-3 sm:px-6 py-2.5 sm:py-3.5 bg-stone-100 dark:bg-slate-950 border-b border-stone-200 dark:border-slate-800 flex items-center justify-between gap-2 sm:gap-4">
                {/* Traffic light buttons */}
                <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                  <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-rose-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-amber-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-500/80 inline-block" />
                  <span className="ml-2 hidden md:inline-block text-xs font-mono text-slate-500 dark:text-slate-400 font-medium">
                    Client Production Browser Preview · {currentIndex + 1} of {total}
                  </span>
                </div>

                {/* Simulated URL pill */}
                <div className="flex-1 max-w-[210px] sm:max-w-lg mx-auto">
                  <a
                    href={activeProject.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-full bg-white dark:bg-slate-900 border border-stone-300 dark:border-slate-700 text-[11px] sm:text-xs font-mono text-slate-700 dark:text-slate-300 hover:text-[#00c853] dark:hover:text-[#00e676] transition-colors truncate group"
                  >
                    <Lock className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#00c853] shrink-0" />
                    <span className="truncate">{activeProject.displayUrl}</span>
                    <ExternalLink className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-slate-400 group-hover:text-[#00c853] shrink-0" />
                  </a>
                </div>

                {/* Autoplay status button */}
                <button
                  onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                  className="flex items-center gap-1 text-[10px] sm:text-[11px] font-mono text-slate-500 hover:text-[#00c853] transition-colors cursor-pointer shrink-0"
                  title={isAutoPlaying ? "Pause autoplay" : "Resume autoplay"}
                >
                  {isAutoPlaying ? (
                    <>
                      <Pause className="w-3 h-3" />
                      <span className="hidden sm:inline">Auto</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3 h-3" />
                      <span className="hidden sm:inline">Paused</span>
                    </>
                  )}
                </button>
              </div>

              {/* Main Content: Split Grid with Preview Image & Info */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                
                {/* Left (Image Mockup Preview) */}
                <div className="lg:col-span-7 relative group overflow-hidden bg-stone-900 border-b lg:border-b-0 lg:border-r border-stone-200 dark:border-slate-800">
                  <div className="aspect-[16/10] w-full overflow-hidden relative">
                    <img
                      src={activeProject.image}
                      alt={`${activeProject.name} homepage client website build`}
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      loading="eager"
                    />
                    
                    {/* Dark gradient vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                    {/* Floating Overlay Button */}
                    <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md text-white text-[11px] sm:text-xs font-mono font-semibold border border-white/20 truncate">
                        <Globe className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#00c853] shrink-0" />
                        <span className="truncate">{activeProject.displayUrl}</span>
                      </span>

                      <a
                        href={activeProject.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-[#00c853] hover:bg-[#00b34a] !text-white text-xs font-bold transition-all shadow-lg shadow-[#00c853]/40 cursor-pointer active:scale-95 shrink-0"
                      >
                        <span className="!text-white">Visit Live</span>
                        <ExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5 !text-white" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Right (Client Details & Actions) */}
                <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
                  <div className="space-y-4">
                    {/* Badges */}
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-1 rounded-md bg-[#00c853]/10 dark:bg-[#00c853]/20 text-[#00c853] dark:text-[#00e676] text-xs font-mono font-bold uppercase tracking-wider">
                        {activeProject.category}
                      </span>
                      <span className="px-2.5 py-1 rounded-md bg-stone-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-mono font-semibold">
                        📍 {activeProject.location}
                      </span>
                    </div>

                    {/* Client Name & Headline */}
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
                        {activeProject.name}
                      </h3>
                      <p className="text-sm font-semibold text-[#00c853] dark:text-[#00e676] mt-1">
                        {activeProject.headline}
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                      {activeProject.description}
                    </p>

                    {/* Tech Stack Chips */}
                    <div>
                      <div className="text-[11px] font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
                        Tech Architecture & Features:
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {activeProject.techTags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 rounded-lg bg-stone-100 dark:bg-slate-800/80 border border-stone-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Key Highlights */}
                    <div className="pt-2 border-t border-stone-100 dark:border-slate-800/80 space-y-1.5">
                      <div className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                        <CheckCircle className="w-3.5 h-3.5 text-[#00c853] shrink-0" />
                        <span>Live, verified production deployment</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                        <CheckCircle className="w-3.5 h-3.5 text-[#00c853] shrink-0" />
                        <span>Responsive mobile-first speed architecture</span>
                      </div>
                    </div>
                  </div>

                  {/* CTAs */}
                  <div className="pt-6 mt-6 border-t border-stone-200 dark:border-slate-800 flex flex-col sm:flex-row gap-3">
                    <a
                      href={activeProject.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-3 px-4 rounded-xl bg-[#00c853] hover:bg-[#00b34a] !text-white text-xs sm:text-sm font-bold text-center transition-all shadow-md shadow-[#00c853]/25 flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                    >
                      <span className="!text-white">Open {activeProject.displayUrl}</span>
                      <ExternalLink className="w-4 h-4 !text-white" />
                    </a>

                    <button
                      onClick={() => handleRequestSimilar(activeProject)}
                      className="py-3 px-4 rounded-xl bg-stone-100 dark:bg-slate-800 hover:bg-stone-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white text-xs sm:text-sm font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>Build Similar Site</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>

            </div>

            {/* Thumbnail Navigation Bar (Slide Boxes Preview Strip) */}
            <div className="flex sm:grid overflow-x-auto sm:overflow-x-visible pb-2 sm:pb-0 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3 snap-x snap-mandatory">
              {CLIENT_PROJECTS.map((proj, idx) => {
                const isActive = idx === currentIndex;
                return (
                  <button
                    key={proj.id}
                    onClick={() => goToSlide(idx)}
                    className={`p-2 sm:p-2.5 rounded-xl sm:rounded-2xl text-left transition-all border cursor-pointer relative overflow-hidden group shrink-0 w-36 xs:w-40 sm:w-auto snap-center ${
                      isActive 
                        ? 'bg-white dark:bg-slate-900 border-[#00c853] ring-2 ring-[#00c853]/30 shadow-md' 
                        : 'bg-white/70 dark:bg-slate-900/60 border-stone-200 dark:border-slate-800 hover:border-stone-400 dark:hover:border-slate-700 opacity-80 hover:opacity-100'
                    }`}
                  >
                    <div className="aspect-[16/9] w-full rounded-lg overflow-hidden mb-1.5 sm:mb-2 bg-stone-200 dark:bg-slate-800 relative">
                      <img 
                        src={proj.image} 
                        alt={proj.name}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform" 
                      />
                      {isActive && (
                        <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#00c853] shadow-xs" />
                      )}
                    </div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                      {proj.name}
                    </div>
                    <div className="text-[10px] font-mono text-slate-500 truncate">
                      {proj.displayUrl}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Progress Dots Indicator */}
            <div className="flex items-center justify-center gap-2 pt-2">
              {CLIENT_PROJECTS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goToSlide(idx)}
                  aria-label={`Go to client slide ${idx + 1}`}
                  className={`transition-all rounded-full cursor-pointer ${
                    idx === currentIndex
                      ? 'w-8 h-2 bg-[#00c853]'
                      : 'w-2 h-2 bg-stone-300 dark:bg-slate-700 hover:bg-stone-400'
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* GRID VIEW MODE (SHOWING ALL 6 WEBSITES SIDE BY SIDE) */}
        {/* ========================================================================= */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CLIENT_PROJECTS.map((project) => (
              <div
                key={project.id}
                className="rounded-3xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 overflow-hidden shadow-lg hover:shadow-xl hover:border-[#00c853] transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Browser window top bar */}
                  <div className="px-4 py-2.5 bg-stone-100 dark:bg-slate-950 border-b border-stone-200 dark:border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    </div>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] font-mono text-slate-600 dark:text-slate-400 hover:text-[#00c853] flex items-center gap-1"
                    >
                      <Lock className="w-2.5 h-2.5 text-[#00c853]" />
                      <span>{project.displayUrl}</span>
                    </a>
                  </div>

                  {/* Mockup image */}
                  <div className="aspect-[16/10] w-full overflow-hidden relative bg-stone-900">
                    <img
                      src={project.image}
                      alt={`${project.name} client website`}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                    
                    {/* Hover Visit live tag */}
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/80 backdrop-blur-md text-white text-xs font-semibold hover:bg-[#00c853] transition-colors shadow-md"
                    >
                      <span>Visit Site</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  {/* Content details */}
                  <div className="p-5 space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-mono font-bold text-[#00c853] dark:text-[#00e676] uppercase tracking-wider">
                        {project.category}
                      </span>
                      <span className="text-[10px] font-mono text-slate-500">
                        {project.location}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-[#00c853] transition-colors">
                      {project.name}
                    </h3>

                    <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-1 pt-1">
                      {project.techTags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-md bg-stone-100 dark:bg-slate-800 text-[11px] text-slate-700 dark:text-slate-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer link */}
                <div className="p-5 pt-0">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-3 rounded-xl bg-stone-100 dark:bg-slate-800 hover:bg-[#00c853] hover:!text-white text-slate-900 dark:text-white text-xs font-bold text-center transition-all flex items-center justify-center gap-1.5 group/btn cursor-pointer"
                  >
                    <span>Open {project.displayUrl}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

              </div>
            ))}
          </div>
        )}

        {/* Bottom trust bar */}
        <div className="mt-12 p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#00c853]" />
            <span>All 6 client projects are active, high-traffic commercial platforms hosted globally.</span>
          </div>

          <a
            href="#quote-section"
            className="text-[#00c853] dark:text-[#00e676] font-bold hover:underline flex items-center gap-1"
          >
            <span>Have a project in mind? Get your 24-hr quote</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </section>
  );
};
