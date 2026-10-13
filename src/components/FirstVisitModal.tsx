import React, { useState, useEffect, useRef } from 'react';
import { 
  X, Sparkles, CheckCircle2, ArrowRight, ShieldCheck, 
  Clock, Zap, Gift, Smartphone, MessageSquare, Send, Check
} from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import { AGENCY_INFO } from '../data/portfolioData';
import { saveLead, sendToWhatsApp, sendToEmail } from '../utils/leadDispatch';

interface FirstVisitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToQuote?: () => void;
  onNavigateToBooking?: () => void;
}

export const FirstVisitModal: React.FC<FirstVisitModalProps> = ({
  isOpen,
  onClose,
  onNavigateToQuote,
  onNavigateToBooking
}) => {
  const { currency, formatPrice } = useCurrency();
  const [selectedOffer, setSelectedOffer] = useState<'free_audit' | 'mpesa_voucher' | 'strategy_call'>('free_audit');
  const [contactName, setContactName] = useState('');
  const [contactContact, setContactContact] = useState(''); // phone or email
  const [projectType, setProjectType] = useState('Website & M-Pesa Store');
  const [isClaimed, setIsClaimed] = useState(false);
  const [dispatchSuccess, setDispatchSuccess] = useState<'whatsapp' | 'email' | null>(null);

  const modalRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedElementRef = useRef<HTMLElement | null>(null);

  // Focus trap and accessibility
  useEffect(() => {
    if (isOpen) {
      previouslyFocusedElementRef.current = document.activeElement as HTMLElement | null;
      const timer = setTimeout(() => {
        modalRef.current?.querySelector<HTMLElement>('button, input')?.focus();
      }, 50);

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => {
        clearTimeout(timer);
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      if (previouslyFocusedElementRef.current && typeof previouslyFocusedElementRef.current.focus === 'function') {
        previouslyFocusedElementRef.current.focus();
      }
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleClaim = (mode: 'whatsapp' | 'email') => {
    if (!contactContact.trim()) return;

    const offerTitle = 
      selectedOffer === 'free_audit' ? 'Free Architecture & SEO Audit (Value: ' + formatPrice(150, 20000) + ')' :
      selectedOffer === 'mpesa_voucher' ? 'KSh 15,000 / $120 Voucher toward M-Pesa Setup' :
      'Direct 30-Min Strategy Call with Senior Nairobi Engineer';

    const isEmail = contactContact.includes('@');
    const leadData = {
      source: 'first_visit_offer' as const,
      sourceTitle: 'First Visit Welcome Offer',
      fullName: contactName.trim() || 'New Website Visitor',
      email: isEmail ? contactContact.trim() : `${contactContact.replace(/\s+/g, '')}@lead.domaintechhubs.com`,
      phone: !isEmail ? contactContact.trim() : '+254',
      serviceOrItem: `${projectType} [Claimed: ${offerTitle}]`,
      notes: `Visitor claimed welcome offer on first scroll: ${offerTitle}. Contact provided: ${contactContact}. Interested in: ${projectType}`,
    };

    saveLead(leadData);
    setIsClaimed(true);
    setDispatchSuccess(mode);

    if (mode === 'whatsapp') {
      sendToWhatsApp(leadData);
    } else {
      sendToEmail(leadData);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="welcome-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        ref={modalRef}
        className="relative w-full max-w-xl bg-white rounded-3xl border border-stone-200 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
      >
        {/* Top Accent Bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-teal-600 via-emerald-500 to-teal-700" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-stone-100 transition-colors z-10 cursor-pointer"
          aria-label="Close welcome offer modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8">
          {/* Header Eyebrow */}
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold tracking-wider uppercase bg-teal-50 text-teal-800 border border-teal-200">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              <span>Karibu · Welcome Offer</span>
            </span>
            <span className="text-[11px] font-mono text-emerald-700 font-medium">
              First-time visitor exclusive
            </span>
          </div>

          <h2 id="welcome-modal-title" className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-snug">
            Building in Kenya? Get <span className="text-teal-700">Free Engineering Consultation</span> & Setup Voucher
          </h2>

          <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
            Welcome to Domain Tech Hub Nairobi. Pick an exclusive welcome credit below for your website, M-Pesa checkout, or business software:
          </p>

          {!isClaimed ? (
            <div className="mt-5 space-y-4">
              {/* Option Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {/* Option 1: Free Audit */}
                <button
                  type="button"
                  onClick={() => setSelectedOffer('free_audit')}
                  className={`p-3 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                    selectedOffer === 'free_audit'
                      ? 'bg-teal-50/80 border-teal-500 ring-2 ring-teal-500/20 shadow-sm'
                      : 'bg-stone-50 border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <Zap className={`w-4 h-4 ${selectedOffer === 'free_audit' ? 'text-teal-700' : 'text-slate-400'}`} />
                      <span className="text-[10px] font-mono font-bold text-teal-700 bg-teal-100/60 px-1.5 py-0.5 rounded">FREE</span>
                    </div>
                    <div className="text-xs font-bold text-slate-900">Architecture Audit</div>
                    <div className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                      Core Web Vitals & SEO analysis for your current site.
                    </div>
                  </div>
                  <div className="mt-2 pt-1.5 border-t border-stone-200/60 text-[10px] font-mono text-slate-400">
                    Valued at {formatPrice(150, 20000)}
                  </div>
                </button>

                {/* Option 2: M-Pesa Voucher */}
                <button
                  type="button"
                  onClick={() => setSelectedOffer('mpesa_voucher')}
                  className={`p-3 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                    selectedOffer === 'mpesa_voucher'
                      ? 'bg-emerald-50/80 border-emerald-500 ring-2 ring-emerald-500/20 shadow-sm'
                      : 'bg-stone-50 border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <Gift className={`w-4 h-4 ${selectedOffer === 'mpesa_voucher' ? 'text-emerald-700' : 'text-slate-400'}`} />
                      <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-100/60 px-1.5 py-0.5 rounded">VOUCHER</span>
                    </div>
                    <div className="text-xs font-bold text-slate-900">M-Pesa Setup Credit</div>
                    <div className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                      Daraja 3.0 STK push discount toward project launch.
                    </div>
                  </div>
                  <div className="mt-2 pt-1.5 border-t border-stone-200/60 text-[10px] font-mono text-slate-400">
                    {currency === 'KES' ? 'KSh 15,000 credit' : '$120 credit'}
                  </div>
                </button>

                {/* Option 3: Strategy Call */}
                <button
                  type="button"
                  onClick={() => setSelectedOffer('strategy_call')}
                  className={`p-3 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                    selectedOffer === 'strategy_call'
                      ? 'bg-blue-50/80 border-blue-500 ring-2 ring-blue-500/20 shadow-sm'
                      : 'bg-stone-50 border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <Clock className={`w-4 h-4 ${selectedOffer === 'strategy_call' ? 'text-blue-700' : 'text-slate-400'}`} />
                      <span className="text-[10px] font-mono font-bold text-blue-700 bg-blue-100/60 px-1.5 py-0.5 rounded">30 MIN</span>
                    </div>
                    <div className="text-xs font-bold text-slate-900">Engineer 1-on-1</div>
                    <div className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                      Direct scoping call with our Westlands tech team.
                    </div>
                  </div>
                  <div className="mt-2 pt-1.5 border-t border-stone-200/60 text-[10px] font-mono text-slate-400">
                    Zero obligation
                  </div>
                </button>
              </div>

              {/* Quick Contact Form */}
              <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono text-slate-600 mb-1">
                      Your Name / Business
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Kelvin / Nairobi Retail Ltd"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-stone-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-slate-600 mb-1">
                      WhatsApp / Phone / Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 0712 345 678 or name@domain.com"
                      value={contactContact}
                      onChange={(e) => setContactContact(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-stone-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-slate-600 mb-1">
                    What are you looking to build?
                  </label>
                  <select
                    value={projectType}
                    onChange={(e) => setProjectType(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-stone-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="Website & M-Pesa Store">Website & M-Pesa Online Store</option>
                    <option value="POS & KRA eTIMS System">POS & KRA eTIMS Integration</option>
                    <option value="Custom CRM & Business System">Custom CRM / ERP Portal</option>
                    <option value="WhatsApp Automation Bot">WhatsApp Automation & Sales Bot</option>
                    <option value="Mobile App (iOS/Android)">Mobile App (iOS & Android)</option>
                    <option value="SEO & Google Ranking Overhaul">Google SEO & Search Rankings</option>
                  </select>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-1">
                <button
                  type="button"
                  onClick={() => handleClaim('whatsapp')}
                  disabled={!contactContact.trim()}
                  className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Claim & Chat on WhatsApp</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleClaim('email')}
                  disabled={!contactContact.trim()}
                  className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4 text-teal-400" />
                  <span>Send via Email</span>
                </button>
              </div>

              {/* Trust Subline */}
              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-stone-100">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                  <span>No spam · 100% confidential</span>
                </span>
                <button
                  type="button"
                  onClick={onClose}
                  className="text-slate-400 hover:text-slate-600 hover:underline cursor-pointer"
                >
                  I'll browse on my own
                </button>
              </div>
            </div>
          ) : (
            /* Claimed Success State */
            <div className="mt-6 text-center py-6 px-4 bg-emerald-50/60 rounded-2xl border border-emerald-200">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Karibu! Your Welcome Request Has Been Received
              </h3>
              <p className="text-xs text-slate-600 mt-1 max-w-md mx-auto leading-relaxed">
                {dispatchSuccess === 'whatsapp' 
                  ? 'WhatsApp desk opened! Our engineers in Westlands will review your inquiry immediately.'
                  : 'Email dispatched to our engineering desk at info@domaintechhubs.com. We respond within 2 hours.'}
              </p>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                {onNavigateToQuote && (
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onNavigateToQuote();
                    }}
                    className="px-4 py-2 rounded-xl bg-teal-700 hover:bg-teal-600 text-white font-semibold text-xs transition-colors cursor-pointer"
                  >
                    Configure Project in Calculator
                  </button>
                )}

                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl bg-white border border-stone-300 hover:bg-stone-50 text-slate-700 font-semibold text-xs transition-colors cursor-pointer"
                >
                  Continue Browsing
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
