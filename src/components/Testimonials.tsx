import React from 'react';
import { Star, Quote, CheckCircle, ShieldCheck } from 'lucide-react';

const REVIEWS = [
  {
    quote: "Domain Tech Hub built our e-commerce platform and integrated automated Safaricom M-Pesa STK push. Our checkout drop-off reduced by 64% in the first two weeks.",
    author: "Wycliffe Ochieng",
    role: "Head of Digital, Rift Valley Organics",
    rating: 5,
    project: "E-Commerce & Payment Integration"
  },
  {
    quote: "We were invisible on Google for commercial law terms in Nairobi. After Domain Tech Hub's 90-day SEO overhaul, we are #1 for corporate litigation keywords.",
    author: "Faith Nyambura",
    role: "Managing Partner, Nyambura & Associates",
    rating: 5,
    project: "Corporate SEO & Web Architecture"
  },
  {
    quote: "Their team built a custom loan underwriting CRM that replaced 12 Excel spreadsheets. We now process 1,800 monthly micro-loans with zero data errors.",
    author: "Kennedy Mutua",
    role: "CTO, FinPulse East Africa",
    rating: 5,
    project: "Custom CRM & Cloud Automation"
  },
  {
    quote: "The WhatsApp Business API bot they deployed for our real estate firm qualifies 200+ property buyers each week automatically. The ROI has been phenomenal.",
    author: "Brenda Kilonzo",
    role: "Sales Director, Horizon Heights",
    rating: 5,
    project: "WhatsApp Marketing & Lead Bot"
  }
];

export const Testimonials: React.FC = () => {
  return (
    <section className="py-20 bg-slate-950 border-t border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-mono text-cyan-400 tracking-wider mb-2">
            CLIENT SATISFACTION · 98% RETENTION
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Trusted by East Africa's leading enterprises.
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            Read what founders, marketing directors, and operations leads say about partnering with Domain Tech Hub.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {REVIEWS.map((rev, i) => (
            <div 
              key={i}
              className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 flex flex-col justify-between transition-colors"
            >
              <div>
                <div className="flex items-center gap-1 mb-4 text-amber-400">
                  {[...Array(rev.rating)].map((_, idx) => (
                    <Star key={idx} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6 italic">
                  "{rev.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80">
                <div className="font-bold text-xs sm:text-sm text-white">{rev.author}</div>
                <div className="text-[11px] text-slate-400">{rev.role}</div>
                <div className="text-[10px] font-mono text-cyan-400 mt-1 uppercase">
                  {rev.project}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Trust Logos / Certifications Bar */}
        <div className="mt-14 pt-8 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-6 text-xs text-slate-400 font-mono">
          <span className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>Safaricom Daraja M-Pesa Certified</span>
          </span>
          <span className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-cyan-400" />
            <span>Google Ads & Analytics Certified</span>
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
