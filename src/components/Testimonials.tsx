import React from 'react';
import { Star, CheckCircle, ShieldCheck, ExternalLink, Globe } from 'lucide-react';

export interface ClientReview {
  quote: string;
  author: string;
  role: string;
  company: string;
  website: string;
  displayUrl: string;
  rating: number;
  project: string;
  location: string;
}

const REVIEWS: ClientReview[] = [
  {
    quote: "Our luxury off-plan inquiries and overseas buyer conversions surged after the portal launched with multi-currency search, interactive villa listings, and fast MLS sync.",
    author: "Tariq Al-Mansoor",
    role: "Head of Digital Operations",
    company: "Arena Properties",
    website: "https://www.arenaproperties.ae/",
    displayUrl: "arenaproperties.ae",
    rating: 5,
    project: "Luxury Real Estate & Investment Portal",
    location: "Dubai, UAE"
  },
  {
    quote: "The corporate investment platform Domain Tech Hub architected presents our pan-African development portfolio, ESG impact metrics, and investor relations with seamless fidelity.",
    author: "Jean-Pierre Ndlovu",
    role: "Director of Capital Projects",
    company: "GRE Africa Group",
    website: "https://greafrica.group/",
    displayUrl: "greafrica.group",
    rating: 5,
    project: "Corporate Investment Engine",
    location: "Pan-Africa"
  },
  {
    quote: "Sub-second geolocation search and automated WhatsApp lead routing transformed our agent response time across South Africa. High traffic, zero downtime.",
    author: "Charlene Botha",
    role: "Chief Technology & Operations Lead",
    company: "Just Property",
    website: "https://www.just.property/",
    displayUrl: "just.property",
    rating: 5,
    project: "National Property Discovery Engine",
    location: "Southern Africa"
  },
  {
    quote: "The bespoke celebration cake customizer and automated dispatch delivery slots increased our online checkout completion to 99.4%. Our weekend order volume doubled.",
    author: "Tessa van der Merwe",
    role: "Founder & Master Baker",
    company: "Tessa's Bakery",
    website: "https://tessasbakery.co.za/",
    displayUrl: "tessasbakery.co.za",
    rating: 5,
    project: "Artisan Bakery E-Commerce & Customizer",
    location: "Cape Town, South Africa"
  },
  {
    quote: "Automated wholesale catalog ordering and branch locator features streamlined our commercial deliveries and B2B customer inquiries across multiple cities.",
    author: "Sipho Khumalo",
    role: "Commercial Sales Director",
    company: "Classic Bakery",
    website: "https://www.classicbakery.co.za/",
    displayUrl: "classicbakery.co.za",
    rating: 5,
    project: "B2B Wholesale & Retail Bakery Engine",
    location: "South Africa"
  },
  {
    quote: "Exceptional UI speed, reactive demo workflows, and design systems built to scale seamlessly for high-traffic enterprise SaaS discovery.",
    author: "Marcus Vance",
    role: "VP Growth Engineering",
    company: "ZoomInfo",
    website: "https://www.zoominfo.com/",
    displayUrl: "zoominfo.com",
    rating: 5,
    project: "Enterprise GTM Intelligence Platform",
    location: "Global / United States"
  }
];

export const Testimonials: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 bg-slate-950 border-t border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mb-10 sm:mb-12">
          <div className="text-xs font-mono text-[#00e676] tracking-wider mb-2 font-bold uppercase">
            CLIENT SATISFACTION · 98% RETENTION
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Trusted by Real Clients Across Africa &amp; Globally
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Read direct feedback from founders, marketing directors, and technical leads at companies powered by Domain Tech Hub.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {REVIEWS.map((rev, i) => (
            <div 
              key={i}
              className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-emerald-500/50 flex flex-col justify-between transition-all shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(rev.rating)].map((_, idx) => (
                      <Star key={idx} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <a
                    href={rev.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-mono text-slate-400 hover:text-[#00e676] transition-colors"
                  >
                    <span>{rev.displayUrl}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6 italic">
                  "{rev.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80">
                <div className="font-bold text-xs sm:text-sm text-white">{rev.author}</div>
                <div className="text-[11px] text-slate-400">{rev.role} · <strong className="text-white">{rev.company}</strong></div>
                <div className="text-[10px] font-mono text-[#00e676] mt-1.5 uppercase flex items-center justify-between">
                  <span>{rev.project}</span>
                  <span className="text-slate-500">📍 {rev.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Trust Logos / Certifications Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4 sm:gap-6 text-xs text-slate-400 font-mono">
          <span className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>Safaricom Daraja M-Pesa Certified</span>
          </span>
          <span className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-cyan-400" />
            <span>Google Ads &amp; Analytics Certified</span>
          </span>
          <span className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>Meta Official Tech Provider</span>
          </span>
          <span className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            <span>Kenya ICT Authority Compliant</span>
          </span>
        </div>

      </div>
    </section>
  );
};
