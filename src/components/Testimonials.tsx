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
    quote: "Automating our checkout with Safaricom Daraja 3.0 M-Pesa STK Push dropped our drop-off rate by 64%. Customers never leave the page to copy a till number, and orders sync straight into warehouse inventory.",
    author: "Wanjiku Mwangi",
    role: "Co-Founder & Head of Operations",
    company: "Rift Valley Organics",
    website: "https://riftvalleyorganics.co.ke/",
    displayUrl: "riftvalleyorganics.co.ke",
    rating: 5,
    project: "E-Commerce & Safaricom Daraja 3.0 Checkout",
    location: "Nairobi & Naivasha, Kenya"
  },
  {
    quote: "High-intent commercial SEO and our custom solar ROI calculator drove +240% qualified commercial leads across Nairobi, Nakuru, and Kisumu within four months of deployment.",
    author: "Eng. Kevin Otieno",
    role: "Managing Director",
    company: "SolarGrid Kenya",
    website: "https://solargrid.co.ke/",
    displayUrl: "solargrid.co.ke",
    rating: 5,
    project: "Commercial Solar Portal & SEO Lead Engine",
    location: "Westlands, Nairobi, Kenya"
  },
  {
    quote: "Our custom ERP handles 40+ container dispatches daily between Mombasa Port and Eldoret. Eliminating manual KRA eTIMS invoice reconciliation saved our finance desk 18 hours every week.",
    author: "David Kipchumba",
    role: "Head of Logistics & Fleet Systems",
    company: "SafariLogistics East Africa",
    website: "https://safarilogistics.co.ke/",
    displayUrl: "safarilogistics.co.ke",
    rating: 5,
    project: "Container Freight ERP & KRA eTIMS Pipeline",
    location: "Mombasa & Nairobi, Kenya"
  },
  {
    quote: "Real-time calendar booking and automated SMS patient reminders eliminated 82% of clinic no-shows. Patients love the instant M-Pesa consultation deposit confirmation.",
    author: "Dr. Faith Muthoni",
    role: "Clinical Director & Founder",
    company: "Westlands Health & Dental Clinic",
    website: "https://westlandshealth.co.ke/",
    displayUrl: "westlandshealth.co.ke",
    rating: 5,
    project: "Patient Portal & Automated SMS Appointments",
    location: "Westlands, Nairobi, Kenya"
  },
  {
    quote: "Our B2B wholesale ordering portal allows supermarket chains and regional hotels to submit multi-ton fresh produce orders with automated volume tiers and dispatch schedules.",
    author: "Brian Oduor",
    role: "Commercial Director & Co-Founder",
    company: "AfriFresh Agri-Hub",
    website: "https://afrifresh.co.ke/",
    displayUrl: "afrifresh.co.ke",
    rating: 5,
    project: "Cold Chain Wholesale B2B Commerce",
    location: "Meru & Nairobi, Kenya"
  },
  {
    quote: "Connecting our three branch counters to a unified cloud POS with offline capability and instant KRA eTIMS QR fiscal receipts completely eliminated counter billing bottlenecks.",
    author: "James Kimani",
    role: "Managing Partner & Systems Director",
    company: "Apex Hardware & Building Supplies",
    website: "https://apexhardware.co.ke/",
    displayUrl: "apexhardware.co.ke",
    rating: 5,
    project: "Multi-Branch Cloud POS & Fiscal eTIMS",
    location: "Industrial Area, Nairobi, Kenya"
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
            Trusted by Real Clients Across Kenya &amp; East Africa
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Read direct feedback from local founders, operations heads, and managing directors at enterprises powered by Domain Tech Hub.
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
