import React, { useState, useEffect } from 'react';
import { 
  Calendar, Clock, Video, Phone, MapPin, CheckCircle2, 
  Send, MessageSquare, Download, Check, Mail, User, ShieldCheck, X 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AGENCY_INFO } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';

interface BookingSectionProps {
  prefilledService?: string;
  prefilledNotes?: string;
}

export const BookingSection: React.FC<BookingSectionProps> = ({ 
  prefilledService, 
  prefilledNotes 
}) => {
  const { t } = useLanguage();
  const [meetingType, setMeetingType] = useState<'google_meet' | 'phone' | 'nairobi_office'>('google_meet');
  const [selectedDate, setSelectedDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });
  const [selectedTime, setSelectedTime] = useState('10:00 AM');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState(prefilledService || 'Custom Web Development');
  const [notes, setNotes] = useState(prefilledNotes || '');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (prefilledService) setService(prefilledService);
    if (prefilledNotes) setNotes(prefilledNotes);
  }, [prefilledService, prefilledNotes]);

  const timeSlots = ['09:00 AM', '10:00 AM', '11:30 AM', '02:00 PM', '03:30 PM', '04:30 PM'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone) return;

    // Save to LocalStorage for persistence
    const newBooking = {
      id: `booking-${Date.now()}`,
      fullName,
      email,
      phone,
      service,
      meetingDate: selectedDate,
      meetingTime: selectedTime,
      meetingType,
      notes,
      createdAt: new Date().toISOString()
    };

    const existing = JSON.parse(localStorage.getItem('dth_bookings') || '[]');
    localStorage.setItem('dth_bookings', JSON.stringify([...existing, newBooking]));

    setIsSubmitted(true);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 6000);
  };

  const generateIcsCalendar = () => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Domain Tech Hub//Strategy Session//EN
BEGIN:VEVENT
SUMMARY:Domain Tech Hub Strategy Session - ${service}
DESCRIPTION:Strategy and technical architecture consultation with Domain Tech Hub (Nairobi). Contact: info@domaintechhub.com / +254 118746676.
LOCATION:${meetingType === 'google_meet' ? 'Google Meet (Link will be sent to email)' : meetingType === 'phone' ? 'Phone Call' : 'Nairobi Office, Kenya'}
DTSTART:${selectedDate.replace(/-/g, '')}T070000Z
DTEND:${selectedDate.replace(/-/g, '')}T074500Z
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `DomainTechHub-Strategy-${selectedDate}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getWhatsAppBookingText = () => {
    const text = `Hello Domain Tech Hub team, I scheduled a consultation:
- Name: ${fullName}
- Service: ${service}
- Date: ${selectedDate} at ${selectedTime} (${meetingType})
- Phone: ${phone}
- Email: ${email}
Looking forward to discussing my project!`;
    return encodeURIComponent(text);
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-slate-950 border-t border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-mono text-cyan-400 tracking-wider mb-2">
            {t('contact.kicker')}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            {t('contact.title')}
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Direct Agency Contacts & Office Card (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-7 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white mb-1">
                  Domain Tech Hub
                </h3>
                <p className="text-xs text-slate-400">
                  {AGENCY_INFO.tagline}
                </p>
              </div>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3 text-slate-300">
                  <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white block">Office Location</span>
                    <span>{AGENCY_INFO.address}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-slate-300">
                  <Mail className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white block">Email Direct</span>
                    <a href={`mailto:${AGENCY_INFO.email}`} className="text-cyan-300 hover:underline font-mono">
                      {AGENCY_INFO.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-slate-300">
                  <Phone className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white block">Phone Lines</span>
                    <div className="font-mono space-y-0.5">
                      {AGENCY_INFO.phones.map(p => (
                        <div key={p}>
                          <a href={`tel:${p.replace(/\s+/g, '')}`} className="hover:text-cyan-300">
                            {p}
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-slate-300">
                  <Clock className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white block">Operating Hours</span>
                    <span>{AGENCY_INFO.officeHours}</span>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Callout */}
              <div className="pt-4 border-t border-slate-800">
                <a
                  href={`https://wa.me/${AGENCY_INFO.whatsapp}?text=Hello%20Domain%20Tech%20Hub,%20I'd%20like%20to%20discuss%20a%20project.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-800 text-emerald-300 font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  <span>Instant WhatsApp Chat</span>
                </a>
              </div>
            </div>

            {/* Trust badge */}
            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0" />
              <p className="text-xs text-slate-400 leading-relaxed">
                All client conversations are protected by mutual non-disclosure agreements (NDA).
              </p>
            </div>

          </div>

          {/* Right Column: Interactive Consultation Booking Form (8 cols) */}
          <div className="lg:col-span-8 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  key="success-view"
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="py-10 text-center space-y-6"
                >
                  {/* Subtle Checkmark Overlay Animation */}
                  <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
                    {/* Pulsing ambient glow rings */}
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0.6 }}
                      animate={{ scale: [1, 1.45, 1], opacity: [0.6, 0, 0.6] }}
                      transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
                      className="absolute inset-0 rounded-full bg-emerald-500/25 blur-md pointer-events-none"
                    />
                    
                    {/* Secondary decorative ring */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.1, type: "spring", stiffness: 260, damping: 20 }}
                      className="absolute inset-1 rounded-2xl bg-emerald-950/80 border border-emerald-500/40"
                    />

                    {/* Checkmark SVG with path drawing animation */}
                    <motion.svg
                      className="relative w-12 h-12 text-emerald-400 z-10"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <motion.path
                        d="M20 6L9 17l-5-5"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.55, delay: 0.25, ease: "easeOut" }}
                      />
                    </motion.svg>
                  </div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                  >
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs font-mono mb-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Request Successfully Received</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                      Strategy Session Confirmed!
                    </h3>
                    <p className="text-sm text-slate-300 max-w-md mx-auto mt-2 leading-relaxed">
                      Thank you, <span className="text-cyan-300 font-semibold">{fullName}</span>. We reserved your strategy session for <span className="text-white font-mono font-bold">{selectedDate}</span> at <span className="text-white font-mono font-bold">{selectedTime}</span> ({meetingType}).
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35, duration: 0.4 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3"
                  >
                    <button
                      onClick={generateIcsCalendar}
                      className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-2 transition-colors hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <Download className="w-4 h-4 text-cyan-400" />
                      <span>Add to Google / Apple Calendar (.ics)</span>
                    </button>

                    <a
                      href={`https://wa.me/${AGENCY_INFO.whatsapp}?text=${getWhatsAppBookingText()}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-900/90 hover:bg-emerald-800 text-emerald-200 text-xs font-semibold flex items-center justify-center gap-2 transition-colors hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <MessageSquare className="w-4 h-4 text-emerald-400" />
                      <span>Confirm Instantly on WhatsApp</span>
                    </a>
                  </motion.div>

                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setShowToast(false);
                    }}
                    className="text-xs text-slate-500 hover:text-slate-300 underline pt-2 block mx-auto transition-colors"
                  >
                    Schedule another session
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form-view"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                
                {/* Meeting Type Selection */}
                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2.5">
                    1. Meeting Format
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {[
                      { id: 'google_meet', label: 'Google Meet', icon: Video, desc: 'Virtual Video Call' },
                      { id: 'phone', label: 'Phone Call', icon: Phone, desc: 'Direct Cellular Line' },
                      { id: 'nairobi_office', label: 'Nairobi Office', icon: MapPin, desc: 'In-person Strategy' }
                    ].map(type => {
                      const Icon = type.icon;
                      return (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => setMeetingType(type.id as any)}
                          className={`p-3 rounded-xl border text-left transition-all ${
                            meetingType === type.id
                              ? 'bg-cyan-950/60 border-cyan-500 text-white'
                              : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <Icon className="w-4 h-4 text-cyan-400" />
                            <span className="font-semibold text-xs sm:text-sm text-white">{type.label}</span>
                          </div>
                          <span className="text-[11px] text-slate-400">{type.desc}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Date and Time Selector */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                      2. Select Preferred Date
                    </label>
                    <div className="relative">
                      <Calendar className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="date"
                        required
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-500 font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                      3. Select Time Slot (East Africa Time)
                    </label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {timeSlots.map(slot => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedTime(slot)}
                          className={`py-2 px-1 text-center rounded-lg text-xs font-mono transition-colors ${
                            selectedTime === slot
                              ? 'bg-cyan-500 text-slate-950 font-bold'
                              : 'bg-slate-950 border border-slate-800 text-slate-300 hover:border-slate-700'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Personal & Project Details */}
                <div className="space-y-4 pt-2 border-t border-slate-800">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-400 uppercase mb-1.5">
                        Your Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Grace Wanjiru"
                        className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-400 uppercase mb-1.5">
                        Business Email
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="grace@company.co.ke"
                        className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-400 uppercase mb-1.5">
                        Phone / WhatsApp Number
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+254 7XX XXX XXX"
                        className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-400 uppercase mb-1.5">
                        Primary Service of Interest
                      </label>
                      <input
                        type="text"
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        placeholder="e.g. E-Commerce & SEO"
                        className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 uppercase mb-1.5">
                      Project Goals & Requirements
                    </label>
                    <textarea
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Tell us about your timeline, current website URL, or key objectives..."
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 resize-none"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{t('contact.btnSubmit')}</span>
                </button>

              </motion.form>
            )}
          </AnimatePresence>
        </div>

      </div>

      {/* Subtle Floating Success Toast Notification with Framer Motion */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 380, damping: 26 }}
            className="fixed bottom-6 left-4 sm:left-6 z-50 flex items-center gap-3.5 p-4 rounded-2xl bg-slate-900/95 border border-emerald-500/50 text-white shadow-2xl shadow-emerald-950/60 backdrop-blur-xl max-w-sm"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
              <motion.div
                initial={{ scale: 0, rotate: -45 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 450, damping: 20, delay: 0.15 }}
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              </motion.div>
            </div>

            <div className="flex-1 pr-1">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-white">Booking Confirmed!</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <p className="text-[11px] text-slate-300 leading-tight mt-0.5">
                Strategy session scheduled. Confirmation link sent to your email.
              </p>
            </div>

            <button
              onClick={() => setShowToast(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Dismiss notification"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  </section>
  );
};
