import React, { useState, useEffect, useRef } from 'react';
import { 
  X, Sparkles, CheckCircle2, ArrowRight, ShieldCheck, 
  Clock, Zap, Gift, MessageSquare, Send, Check, Tag, Copy, Percent, Flame
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
  const [selectedOffer, setSelectedOffer] = useState<'discount_20' | 'mpesa_voucher' | 'free_audit'>('discount_20');
  const [contactName, setContactName] = useState('');
  const [contactContact, setContactContact] = useState(''); // phone or email
  const [projectType, setProjectType] = useState('Website & M-Pesa Store');
  const [isClaimed, setIsClaimed] = useState(false);
  const [dispatchSuccess, setDispatchSuccess] = useState<'whatsapp' | 'email' | null>(null);
  const [hasCopiedCode, setHasCopiedCode] = useState(false);

  // 15-minute countdown timer for authentic limited-time urgency
  const [timeLeft, setTimeLeft] = useState<number>(14 * 60 + 59);

  const modalRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedElementRef = useRef<HTMLElement | null>(null);

  // Timer countdown
  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen]);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

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

  // Body scroll lock while modal is open, preserving background homepage in view
  useEffect(() => {
    if (isOpen) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const promoCode = 'KARIBU20';

  const handleCopyCode = (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      navigator.clipboard.writeText(promoCode);
      setHasCopiedCode(true);
      setTimeout(() => setHasCopiedCode(false), 2500);
    } catch {
      // fallback
      setHasCopiedCode(true);
      setTimeout(() => setHasCopiedCode(false), 2500);
    }
  };

  const handleClaim = (mode: 'whatsapp' | 'email') => {
    if (!contactContact.trim()) return;

    const offerTitle = 
      selectedOffer === 'discount_20' ? `20% Limited-Time Discount Voucher [Code: ${promoCode}] (Up to ${formatPrice(200, 25000)} off)` :
      selectedOffer === 'mpesa_voucher' ? `Free M-Pesa Daraja 3.0 Setup Credit (${currency === 'KES' ? 'KSh 15,000' : '$120'} value)` :
      `Free Architecture & SEO Audit (Value: ${formatPrice(150, 20000)})`;

    const isEmail = contactContact.includes('@');
    const leadData = {
      source: 'first_visit_offer' as const,
      sourceTitle: 'Limited-Time Discount Offer',
      fullName: contactName.trim() || 'New Website Visitor',
      email: isEmail ? contactContact.trim() : `${contactContact.replace(/\s+/g, '')}@lead.domaintechhubs.com`,
      phone: !isEmail ? contactContact.trim() : '+254',
      serviceOrItem: `${projectType} [${offerTitle}]`,
      notes: `Visitor claimed limited-time discount offer on first scroll: ${offerTitle}. Promo Code: ${promoCode}. Contact provided: ${contactContact}. Project focus: ${projectType}`,
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
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 modal-backdrop-scrim animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="welcome-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        ref={modalRef}
        className="relative w-full max-w-xl max-h-[92vh] overflow-y-auto bg-white rounded-3xl border border-stone-200/90 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)] animate-in zoom-in-95 duration-200"
      >
        {/* Top Accent Gradient Bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-teal-600 via-amber-500 to-emerald-600 sticky top-0 z-20" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-stone-100 transition-colors z-20 cursor-pointer"
          aria-label="Close discount offer modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* =========================================================================
            PROMINENT 'DISCOUNT OFFER' LIMITED-TIME BANNER
           ========================================================================= */}
        <div className="bg-gradient-to-r from-amber-500 via-teal-600 to-emerald-700 px-5 sm:px-8 py-3.5 text-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5 shadow-sm border-b border-amber-400/30">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0 border border-white/30 text-amber-200">
              <Flame className="w-4 h-4 text-amber-300 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono font-black tracking-wider uppercase bg-amber-400 text-slate-950">
                  LIMITED TIME
                </span>
                <span className="text-xs font-bold text-white tracking-wide">
                  20% OFF FIRST PROJECT
                </span>
              </div>
              <p className="text-[11px] text-white/90 leading-tight mt-0.5">
                Save up to <strong className="text-amber-200">{formatPrice(200, 25000)}</strong> on your new build this month
              </p>
            </div>
          </div>

          {/* Live Countdown Clock & Voucher Code */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/25 backdrop-blur-sm border border-white/20 text-white font-mono text-[11px]">
              <Clock className="w-3.5 h-3.5 text-amber-300" />
              <span>Expires in:</span>
              <strong className="text-amber-300 tracking-wider font-black">{formatTimer(timeLeft)}</strong>
            </div>

            <button
              type="button"
              onClick={handleCopyCode}
              title="Copy promo code"
              className="px-2.5 py-1 rounded-lg bg-white text-slate-900 hover:bg-amber-50 font-mono font-bold text-[11px] flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer border border-white/40"
            >
              <Tag className="w-3 h-3 text-teal-700" />
              <span>{promoCode}</span>
              {hasCopiedCode ? (
                <Check className="w-3 h-3 text-emerald-600" />
              ) : (
                <Copy className="w-3 h-3 text-slate-400" />
              )}
            </button>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          {/* Header Eyebrow & Value Prop */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-bold tracking-wider uppercase bg-teal-50 text-teal-800 border border-teal-200">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              <span>Karibu · First-Scroll Perk</span>
            </span>
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>Only 3 client vouchers left for this week</span>
            </div>
          </div>

          <h2 id="welcome-modal-title" className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-snug">
            Claim Your <span className="text-teal-700">20% Discount Voucher</span> & Free Nairobi Tech Scoping
          </h2>

          <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
            Welcome to Domain Tech Hub Nairobi. Claim your limited-time voucher below before the countdown expires to lock in discounted engineering rates:
          </p>

          {!isClaimed ? (
            <div className="mt-5 space-y-4">
              {/* Option Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {/* Option 1: 20% Discount Voucher (Featured) */}
                <button
                  type="button"
                  onClick={() => setSelectedOffer('discount_20')}
                  className={`p-3 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                    selectedOffer === 'discount_20'
                      ? 'bg-amber-50/80 border-amber-500 ring-2 ring-amber-500/20 shadow-sm'
                      : 'bg-stone-50 border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <Percent className={`w-4 h-4 ${selectedOffer === 'discount_20' ? 'text-amber-700' : 'text-slate-400'}`} />
                      <span className="text-[10px] font-mono font-black text-amber-900 bg-amber-200/80 px-1.5 py-0.5 rounded">
                        20% OFF
                      </span>
                    </div>
                    <div className="text-xs font-bold text-slate-900">Project Discount</div>
                    <div className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                      Save on custom web, mobile, or enterprise build.
                    </div>
                  </div>
                  <div className="mt-2 pt-1.5 border-t border-stone-200/60 text-[10px] font-mono font-bold text-amber-800">
                    Save up to {formatPrice(200, 25000)}
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
                  <div className="mt-2 pt-1.5 border-t border-stone-200/60 text-[10px] font-mono text-slate-500">
                    {currency === 'KES' ? 'KSh 15,000 credit' : '$120 credit'}
                  </div>
                </button>

                {/* Option 3: Free Audit */}
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
                  <div className="mt-2 pt-1.5 border-t border-stone-200/60 text-[10px] font-mono text-slate-500">
                    Valued at {formatPrice(150, 20000)}
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

              {/* Limited Time Urgency Microcopy */}
              <div className="flex items-center justify-between px-1 text-[11px] font-mono text-slate-600">
                <span className="flex items-center gap-1.5 text-amber-800 font-semibold">
                  <Clock className="w-3.5 h-3.5 text-amber-600" />
                  <span>Lock in rate within: <strong>{formatTimer(timeLeft)}</strong></span>
                </span>
                <span className="text-emerald-700 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                  Engineers online in Westlands
                </span>
              </div>

              {/* High-Converting Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-1">
                <button
                  type="button"
                  onClick={() => handleClaim('whatsapp')}
                  disabled={!contactContact.trim()}
                  className="w-full sm:flex-1 py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-xs shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Lock In 20% Discount via WhatsApp</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleClaim('email')}
                  disabled={!contactContact.trim()}
                  className="w-full sm:flex-1 py-3.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-xs shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                >
                  <Send className="w-4 h-4 text-teal-400" />
                  <span>Claim Discount via Email</span>
                </button>
              </div>

              {/* Trust Subline */}
              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-stone-100">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                  <span>Promo applied directly to proposal · No spam guaranteed</span>
                </span>
                <button
                  type="button"
                  onClick={onClose}
                  className="text-slate-400 hover:text-slate-600 hover:underline cursor-pointer"
                >
                  I'll pay regular price
                </button>
              </div>
            </div>
          ) : (
            /* Claimed Success State */
            <div className="mt-6 text-center py-6 px-4 bg-emerald-50/60 rounded-2xl border border-emerald-200">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-100 text-amber-900 border border-amber-300 mb-2">
                <Tag className="w-3.5 h-3.5 text-amber-700" />
                <span>CODE ACTIVATED: {promoCode}</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Voucher Reserved! 20% Discount Locked For Your Project
              </h3>
              <p className="text-xs text-slate-600 mt-1 max-w-md mx-auto leading-relaxed">
                {dispatchSuccess === 'whatsapp' 
                  ? 'WhatsApp desk opened! Our engineers in Westlands have your promo code and project notes.'
                  : 'Email dispatched to info@domaintechhub.com. Your 20% discount code has been recorded.'}
              </p>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                {onNavigateToQuote && (
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onNavigateToQuote();
                    }}
                    className="px-4 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-600 text-white font-semibold text-xs transition-colors cursor-pointer flex items-center gap-1.5 shadow-sm"
                  >
                    <span>Configure in Cost Calculator</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}

                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl bg-white border border-stone-300 hover:bg-stone-50 text-slate-700 font-semibold text-xs transition-colors cursor-pointer"
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
