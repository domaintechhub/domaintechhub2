import React from 'react';
import { ExternalLink, ArrowRight, ShieldCheck } from 'lucide-react';
import { DEVELOPED_WEBSITES } from '../data/developedWebsitesData';

interface ClientBrandsMarqueeProps {
  onNavigate?: (target: string, subParam?: string) => void;
}

interface BrandLogoItem {
  id: string;
  name: string;
  url: string;
  displayUrl: string;
  category: string;
  badge: string;
  brandColor: string;
  bgColor: string;
  textColor: string;
  symbol: React.ReactNode;
}

export const ClientBrandsMarquee: React.FC<ClientBrandsMarqueeProps> = ({ onNavigate }) => {
  // Brand logos data with custom vector insignia for each client
  const brandLogos: BrandLogoItem[] = [
    {
      id: 'carsoko',
      name: 'CarSoko',
      url: 'https://www.carsoko.co.ke/',
      displayUrl: 'carsoko.co.ke',
      category: 'Automotive Marketplace',
      badge: '.co.ke',
      brandColor: '#e11d48',
      bgColor: '#fff1f2',
      textColor: '#9f1239',
      symbol: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 text-rose-600" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
          <circle cx="7" cy="17" r="2" />
          <path d="M9 17h6" />
          <circle cx="17" cy="17" r="2" />
        </svg>
      )
    },
    {
      id: 'peachcars',
      name: 'Peach Cars',
      url: 'https://peachcars.co.ke/',
      displayUrl: 'peachcars.co.ke',
      category: 'Certified Car Sales',
      badge: 'Kenya',
      brandColor: '#ea580c',
      bgColor: '#fff7ed',
      textColor: '#9a3412',
      symbol: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 text-orange-500" fill="currentColor">
          <path d="M12 2C8 2 4 5 4 10c0 6 6 12 8 12s8-6 8-12c0-5-4-8-8-8zm-1 3.5c1-.8 2.5-.8 3.5 0 .3.2.4.6.2.9-.2.3-.6.4-.9.2-.6-.5-1.5-.5-2.1 0-.3.2-.7.1-.9-.2-.2-.3-.1-.7.2-.9z" opacity="0.9" />
          <path d="M12 3v3" stroke="#ea580c" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )
    },
    {
      id: 'autochek',
      name: 'AUTOCHEK',
      url: 'https://autochek.africa/',
      displayUrl: 'autochek.africa',
      category: 'Pan-African Auto Tech',
      badge: 'Africa',
      brandColor: '#dc2626',
      bgColor: '#fef2f2',
      textColor: '#991b1b',
      symbol: (
        <div className="w-7 h-7 rounded-lg bg-red-600 text-white flex items-center justify-center font-black text-xs font-mono tracking-tighter">
          AC
        </div>
      )
    },
    {
      id: 'remax',
      name: 'RE/MAX',
      url: 'https://www.remax-kenya.co.ke/',
      displayUrl: 'remax-kenya.co.ke',
      category: 'Real Estate Kenya',
      badge: 'Kenya',
      brandColor: '#0284c7',
      bgColor: '#f0f9ff',
      textColor: '#075985',
      symbol: (
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-red-600 via-sky-600 to-blue-700 text-white flex items-center justify-center font-black text-[10px] shadow-xs">
          R/M
        </div>
      )
    },
    {
      id: 'greenspoon',
      name: 'greenspoon',
      url: 'https://greenspoon.co.ke/',
      displayUrl: 'greenspoon.co.ke',
      category: 'Artisanal Groceries',
      badge: 'Organics',
      brandColor: '#16a34a',
      bgColor: '#f0fdf4',
      textColor: '#166534',
      symbol: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
          <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
        </svg>
      )
    },
    {
      id: 'viator',
      name: 'viator',
      url: 'https://www.viator.com/',
      displayUrl: 'viator.com',
      category: 'Global Travel & Tours',
      badge: 'TripAdvisor',
      brandColor: '#0d9488',
      bgColor: '#f0fdfa',
      textColor: '#115e59',
      symbol: (
        <div className="w-7 h-7 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
          V
        </div>
      )
    },
    {
      id: 'safari-co-za',
      name: 'SAFARI.CO.ZA',
      url: 'https://www.safari.co.za/',
      displayUrl: 'safari.co.za',
      category: 'Luxury Game Lodges',
      badge: 'South Africa',
      brandColor: '#b45309',
      bgColor: '#fffbeb',
      textColor: '#78350f',
      symbol: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
          <circle cx="17" cy="5" r="2" fill="#d97706" stroke="none" />
        </svg>
      )
    },
    {
      id: 'kenyapropertycentre',
      name: 'Kenya Property Centre',
      url: 'https://kenyapropertycentre.com/',
      displayUrl: 'kenyapropertycentre.com',
      category: 'Property Portal',
      badge: 'Nationwide',
      brandColor: '#2563eb',
      bgColor: '#eff6ff',
      textColor: '#1e40af',
      symbol: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      )
    },
    {
      id: 'shoppers',
      name: 'SHOPPERS',
      url: 'https://shoppers.co.tz/',
      displayUrl: 'shoppers.co.tz',
      category: 'Supermarket Chain',
      badge: 'Tanzania',
      brandColor: '#0284c7',
      bgColor: '#f0f9ff',
      textColor: '#0369a1',
      symbol: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 text-sky-600" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="8" cy="21" r="1" />
          <circle cx="19" cy="21" r="1" />
          <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
        </svg>
      )
    },
    {
      id: 'africanspicesafaris',
      name: 'African Spice Safaris',
      url: 'https://africanspicesafaris.com/',
      displayUrl: 'africanspicesafaris.com',
      category: 'Wildlife Safaris',
      badge: 'East Africa',
      brandColor: '#c2410c',
      bgColor: '#fff7ed',
      textColor: '#7c2d12',
      symbol: (
        <div className="w-7 h-7 rounded-lg bg-orange-700 text-white flex items-center justify-center font-bold text-xs shadow-xs">
          AS
        </div>
      )
    },
    {
      id: 'hotelafricana',
      name: 'Hotel Africana',
      url: 'https://www.hotelafricana.com/',
      displayUrl: 'hotelafricana.com',
      category: 'Luxury Hotel & Events',
      badge: '4-Star',
      brandColor: '#ca8a04',
      bgColor: '#fefce8',
      textColor: '#854d0e',
      symbol: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 text-yellow-600" fill="currentColor">
          <path d="M12 2l2.4 7.4h7.6l-6.2 4.5 2.4 7.4-6.2-4.5-6.2 4.5 2.4-7.4-6.2-4.5h7.6z" />
        </svg>
      )
    },
    {
      id: 'superstore',
      name: 'SUPERSTORE',
      url: 'https://superstore.co.tz/',
      displayUrl: 'superstore.co.tz',
      category: 'Hypermarket Retail',
      badge: 'Tanzania',
      brandColor: '#e11d48',
      bgColor: '#ffe4e6',
      textColor: '#9f1239',
      symbol: (
        <div className="w-7 h-7 rounded-lg bg-rose-600 text-white flex items-center justify-center font-black text-xs">
          S+
        </div>
      )
    },
    {
      id: 'monsoonfurniture',
      name: 'Monsoon Furniture',
      url: 'https://monsoonfurniture.co.ke/',
      displayUrl: 'monsoonfurniture.co.ke',
      category: 'Hardwood Living',
      badge: 'Artisan',
      brandColor: '#78350f',
      bgColor: '#fef3c7',
      textColor: '#451a03',
      symbol: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 text-amber-800" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3" />
          <path d="M3 16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v2H7v-2a2 2 0 0 0-4 0Z" />
          <path d="M5 18v2" />
          <path d="M19 18v2" />
        </svg>
      )
    },
    {
      id: 'kiotaschool',
      name: 'KIOTA SCHOOL',
      url: 'https://kiotaschool.com',
      displayUrl: 'kiotaschool.com',
      category: 'Primary & Junior Secondary',
      badge: 'Nairobi',
      brandColor: '#1e3a8a',
      bgColor: '#eff6ff',
      textColor: '#172554',
      symbol: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 text-blue-900" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          <path d="M6 12v5c3 3 9 3 12 0v-5" />
        </svg>
      )
    },
    {
      id: 'inzovusupermarket',
      name: 'Inzovu Supermarket',
      url: 'https://inzovusupermarket.com/',
      displayUrl: 'inzovusupermarket.com',
      category: 'Consumer Groceries',
      badge: 'East Africa',
      brandColor: '#7c3aed',
      bgColor: '#f5f3ff',
      textColor: '#5b21b6',
      symbol: (
        <div className="w-7 h-7 rounded-lg bg-purple-600 text-white flex items-center justify-center font-bold text-xs">
          IN
        </div>
      )
    },
    {
      id: 'dignity',
      name: 'Dignity Healthcare',
      url: 'https://dignity.co.ke/',
      displayUrl: 'dignity.co.ke',
      category: 'Medical Supplies',
      badge: 'Health Care',
      brandColor: '#059669',
      bgColor: '#ecfdf5',
      textColor: '#065f46',
      symbol: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 4v16m-8-8h16" />
        </svg>
      )
    },
    {
      id: 'silverbackgorillatours',
      name: 'Silverback Tours',
      url: 'https://www.silverbackgorillatours.com/',
      displayUrl: 'silverbackgorillatours.com',
      category: 'Gorilla Expeditions',
      badge: 'Rwanda/Uganda',
      brandColor: '#047857',
      bgColor: '#ecfdf5',
      textColor: '#064e3b',
      symbol: (
        <div className="w-7 h-7 rounded-lg bg-emerald-800 text-white flex items-center justify-center font-black text-xs">
          SG
        </div>
      )
    },
    {
      id: 'commercialpropertykenya',
      name: 'Commercial Property',
      url: 'https://commercialpropertykenya.com/',
      displayUrl: 'commercialpropertykenya.com',
      category: 'Offices & Warehouses',
      badge: 'B2B',
      brandColor: '#334155',
      bgColor: '#f1f5f9',
      textColor: '#0f172a',
      symbol: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 text-slate-700" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
          <path d="M9 22v-4h6v4M8 6h.01M16 6h.01M8 10h.01M16 10h.01M8 14h.01M16 14h.01" />
        </svg>
      )
    },
    {
      id: 'thanickoleehotel',
      name: 'Thanickolee Hotel',
      url: 'https://thanickoleehotel.com/',
      displayUrl: 'thanickoleehotel.com',
      category: 'Boutique Hospitality',
      badge: 'Retreat',
      brandColor: '#be185d',
      bgColor: '#fdf2f8',
      textColor: '#831843',
      symbol: (
        <div className="w-7 h-7 rounded-lg bg-pink-700 text-white flex items-center justify-center font-serif font-bold text-xs">
          TH
        </div>
      )
    },
    {
      id: 'kenya-experience',
      name: 'Kenya Experience',
      url: 'https://www.kenya-experience.com/',
      displayUrl: 'kenya-experience.com',
      category: 'Inbound Safari Tours',
      badge: 'International',
      brandColor: '#d97706',
      bgColor: '#fffbeb',
      textColor: '#92400e',
      symbol: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill="#d97706" />
        </svg>
      )
    }
  ];

  // Duplicate for seamless infinite marquee scroll
  const marqueeItems = [...brandLogos, ...brandLogos];

  return (
    <section 
      aria-label="Client Brands & Production Deployments"
      className="py-14 sm:py-20 border-b border-stone-200 dark:border-slate-800 bg-[#f8f9fa] dark:bg-slate-950 relative overflow-hidden"
    >
      {/* Background soft ambient accents */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-96 h-96 bg-[#00c853]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Section Header exactly formatted as requested */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-8 sm:mb-12">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-3">
          Trusted by Businesses Across Kenya &amp; Beyond
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed font-normal">
          Helping businesses in Nairobi, Thika, Mombasa, Kisumu, Nakuru, Eldoret, across Kenya and beyond to establish a stronger online presence.
        </p>
      </div>

      {/* Marquee Track Container with Left & Right Gradient Fade Edges */}
      <div className="relative w-full overflow-hidden py-3">
        {/* Left Gradient Fade */}
        <div 
          aria-hidden="true" 
          className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[#f8f9fa] dark:from-slate-950 to-transparent z-10" 
        />

        {/* Right Gradient Fade */}
        <div 
          aria-hidden="true" 
          className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[#f8f9fa] dark:from-slate-950 to-transparent z-10" 
        />

        {/* Continuous Infinite Scrolling Row */}
        <div className="animate-marquee-infinite flex items-center gap-4 sm:gap-6 pl-4">
          {marqueeItems.map((brand, idx) => (
            <a
              key={`${brand.id}-${idx}`}
              href={brand.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3.5 px-5 py-3.5 sm:px-6 sm:py-4 rounded-2xl bg-white dark:bg-slate-900 border border-stone-200/90 dark:border-slate-800 shadow-xs hover:shadow-lg hover:border-[#00c853] dark:hover:border-[#00c853] hover:-translate-y-0.5 transition-all duration-200 shrink-0 min-w-[210px] sm:min-w-[240px] cursor-pointer"
              title={`Visit live website: ${brand.displayUrl}`}
            >
              {/* Brand Logo Insignia */}
              <div className="shrink-0 flex items-center justify-center">
                {brand.symbol}
              </div>

              {/* Brand Text Info */}
              <div className="min-w-0 flex-1 text-left">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-black text-slate-900 dark:text-white truncate group-hover:text-[#00c853] dark:group-hover:text-[#00e676] transition-colors">
                    {brand.name}
                  </span>
                  <ExternalLink className="w-3 h-3 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate flex items-center gap-1">
                  <span>{brand.category}</span>
                  <span className="text-slate-300 dark:text-slate-600">·</span>
                  <span className="font-mono text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">{brand.badge}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Bottom Sub-callout: Link to the full Project Page */}
      <div className="mt-8 text-center px-4">
        <p className="text-xs text-slate-500 dark:text-slate-400 inline-flex flex-wrap items-center justify-center gap-1.5">
          <span>We've co-engineered 20+ live client web platforms across Africa &amp; international markets.</span>
          <button
            onClick={() => onNavigate && onNavigate('portfolio')}
            className="text-[#00c853] dark:text-[#00e676] font-bold hover:underline inline-flex items-center gap-1 cursor-pointer ml-1"
          >
            <span>View All in Project Page</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </p>
      </div>
    </section>
  );
};
