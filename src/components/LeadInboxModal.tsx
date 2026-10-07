import React, { useState, useEffect, useRef, useId } from 'react';
import { 
  X, Mail, MessageSquare, Phone, Download, Trash2, 
  Search, ShieldCheck, RefreshCw, Lock, KeyRound, ShieldAlert,
  LogOut, CheckCircle2
} from 'lucide-react';
import { 
  LeadRecord, getAllLeads, deleteLead, 
  updateLeadStatus, exportLeadsToCsv 
} from '../utils/leadDispatch';
import { AGENCY_INFO } from '../data/portfolioData';

interface LeadInboxModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LeadInboxModal: React.FC<LeadInboxModalProps> = ({ isOpen, onClose }) => {
  const passkeyInputId = useId();
  const leadSearchInputId = useId();
  const [isUnlocked, setIsUnlocked] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('dth_owner_vault_auth') === 'true';
    } catch {
      return false;
    }
  });
  const [passkeyInput, setPasskeyInput] = useState('');
  const [authError, setAuthError] = useState('');

  const [leads, setLeads] = useState<LeadRecord[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSource, setFilterSource] = useState<string>('all');
  const [lastRefreshed, setLastRefreshed] = useState<Date>(new Date());

  const dialogRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedElementRef = useRef<HTMLElement | null>(null);
  const passkeyInputRef = useRef<HTMLInputElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const refreshLeads = () => {
    setLeads(getAllLeads());
    setLastRefreshed(new Date());
  };

  useEffect(() => {
    if (isOpen && isUnlocked) {
      refreshLeads();
    }
  }, [isOpen, isUnlocked]);

  // Focus management on open and restore on close
  useEffect(() => {
    if (isOpen) {
      previouslyFocusedElementRef.current = document.activeElement as HTMLElement | null;
      const timer = setTimeout(() => {
        if (!isUnlocked) {
          passkeyInputRef.current?.focus();
        } else {
          searchInputRef.current?.focus();
        }
      }, 50);
      return () => clearTimeout(timer);
    } else {
      if (previouslyFocusedElementRef.current && typeof previouslyFocusedElementRef.current.focus === 'function') {
        previouslyFocusedElementRef.current.focus();
      }
    }
  }, [isOpen, isUnlocked]);

  // Keyboard navigation, focus trap & Escape key listener
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Escape key closing
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        onClose();
        return;
      }

      // Focus trap within modal dialog
      if (e.key === 'Tab' && dialogRef.current) {
        const focusableElements = dialogRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length > 0) {
          const firstElement = focusableElements[0];
          const lastElement = focusableElements[focusableElements.length - 1];

          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              e.preventDefault();
              lastElement.focus();
            }
          } else {
            if (document.activeElement === lastElement) {
              e.preventDefault();
              firstElement.focus();
            }
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown, true);
    return () => window.removeEventListener('keydown', handleKeyDown, true);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPass = passkeyInput.trim().toLowerCase();
    // Authorized owner credentials (confidential administrative keys)
    if (cleanPass === 'domain2026' || cleanPass === 'dth@admin' || cleanPass === 'admin' || cleanPass === 'domaintechhub') {
      try {
        sessionStorage.setItem('dth_owner_vault_auth', 'true');
      } catch {
        // ignore storage error
      }
      setIsUnlocked(true);
      setAuthError('');
      setPasskeyInput('');
      refreshLeads();
    } else {
      setAuthError('Invalid administrator passkey. Access denied.');
    }
  };

  const handleLockVault = () => {
    try {
      sessionStorage.removeItem('dth_owner_vault_auth');
    } catch {
      // ignore storage error
    }
    setIsUnlocked(false);
    setPasskeyInput('');
    setAuthError('');
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = 
      (lead.fullName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (lead.email || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (lead.phone || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (lead.serviceOrItem || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (lead.notes || '').toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSource = filterSource === 'all' || lead.source === filterSource;

    return matchesSearch && matchesSource;
  });

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to remove this lead record?')) {
      deleteLead(id);
      refreshLeads();
    }
  };

  const handleStatusChange = (id: string, currentStatus: LeadRecord['status']) => {
    const nextStatus = currentStatus === 'new' ? 'contacted' : currentStatus === 'contacted' ? 'closed' : 'new';
    updateLeadStatus(id, nextStatus);
    refreshLeads();
  };

  const cleanPhoneForWhatsApp = (rawPhone: string) => {
    let cleaned = rawPhone.replace(/\D/g, '');
    if (cleaned.startsWith('0')) {
      cleaned = '254' + cleaned.substring(1);
    }
    return cleaned;
  };

  // 1. Password Verification Screen for Owner Privacy
  if (!isUnlocked) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
        <div 
          ref={dialogRef}
          className="w-full max-w-md bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 text-slate-900 dark:text-slate-100 relative"
          role="dialog"
          aria-modal="true"
          aria-label="Private Vault Verification"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-stone-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>

          <div className="text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/80 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto shadow-sm">
              <Lock className="w-6 h-6" />
            </div>

            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-stone-100 dark:bg-slate-800 text-stone-600 dark:text-slate-300 mb-2 border border-stone-200 dark:border-slate-700">
                <ShieldAlert className="w-3 h-3 text-amber-500" />
                <span>Restricted Private Access</span>
              </div>
              <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                Customer Leads &amp; Inquiries
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                This page contains confidential customer inquiries and contact records. It is strictly private and hidden from public view.
              </p>
            </div>

            <form onSubmit={handleUnlock} className="space-y-3 pt-2 text-left">
              <div>
                <label id={`${passkeyInputId}-label`} htmlFor={passkeyInputId} className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Owner Passkey
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" aria-hidden="true" />
                  <input
                    id={passkeyInputId}
                    aria-labelledby={`${passkeyInputId}-label`}
                    ref={passkeyInputRef}
                    type="password"
                    autoComplete="current-password"
                    value={passkeyInput}
                    onChange={(e) => {
                      setPasskeyInput(e.target.value);
                      if (authError) setAuthError('');
                    }}
                    placeholder="Enter security passkey..."
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-stone-200 dark:border-slate-700 bg-stone-50 dark:bg-slate-950 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                {authError && (
                  <p className="text-xs text-rose-500 mt-1.5 font-medium flex items-center gap-1">
                    <span>•</span> {authError}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2 pt-1">
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-semibold text-xs transition-colors cursor-pointer shadow-sm"
                >
                  Verify &amp; Unlock
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="py-2.5 px-4 rounded-xl border border-stone-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-stone-100 dark:hover:bg-slate-800 font-medium text-xs transition-colors cursor-pointer"
                >
                  Return to Site
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // 2. Unlocked Authenticated Management View (Owner Only)
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        ref={dialogRef}
        className="w-full max-w-4xl max-h-[90vh] bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-slate-900 dark:text-slate-100"
        role="dialog"
        aria-modal="true"
        aria-label="Customer Leads and Inquiries Vault"
      >
        
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-stone-200 dark:border-slate-800 flex items-center justify-between gap-4 bg-stone-50/50 dark:bg-slate-950/50 shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
                Agency Private Vault
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {leads.length} Total Submissions
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight mt-1 text-slate-900 dark:text-white">
              Customer Leads &amp; Form Submissions
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              All website interactions automatically forward to <strong className="text-teal-600 dark:text-cyan-400">WhatsApp ({AGENCY_INFO.whatsapp})</strong> and <strong className="text-teal-600 dark:text-cyan-400">Email ({AGENCY_INFO.email})</strong>.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleLockVault}
              className="px-3 py-1.5 rounded-xl border border-stone-200 dark:border-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-stone-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Lock private vault"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Lock Vault</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-stone-200 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors cursor-pointer shrink-0"
              aria-label="Close Modal"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Live Notification Channels Banner */}
        <div className="px-5 py-3 bg-teal-50 dark:bg-cyan-950/40 border-b border-teal-100 dark:border-cyan-900/40 text-xs flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-1.5 font-medium text-teal-900 dark:text-cyan-200">
              <MessageSquare className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>WhatsApp Receiver: <strong>+{AGENCY_INFO.whatsapp}</strong></span>
            </div>
            <div className="flex items-center gap-1.5 font-medium text-teal-900 dark:text-cyan-200">
              <Mail className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>Email Receiver: <strong>{AGENCY_INFO.email}</strong> {AGENCY_INFO.secondaryEmail && <span className="opacity-75">(&amp; {AGENCY_INFO.secondaryEmail})</span>}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={refreshLeads}
              className="px-2.5 py-1 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-stone-200 dark:hover:bg-slate-800 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Refresh</span>
            </button>
            <button
              onClick={exportLeadsToCsv}
              disabled={leads.length === 0}
              className="px-3 py-1 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-semibold text-xs transition-colors flex items-center gap-1 disabled:opacity-50 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="p-4 border-b border-stone-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" aria-hidden="true" />
            <input
              id={leadSearchInputId}
              ref={searchInputRef}
              type="text"
              aria-label="Search leads by name, email, or phone"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search leads by name, email, phone..."
              className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-stone-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-teal-500"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {[
              { id: 'all', label: 'All Sources' },
              { id: 'booking', label: 'Strategy Bookings' },
              { id: 'calculator', label: 'Quotes' },
              { id: 'audit', label: 'SEO Audits' },
              { id: 'domain', label: 'Domains' },
              { id: 'ticket', label: 'Support Tickets' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setFilterSource(tab.id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  filterSource === tab.id
                    ? 'bg-teal-600 text-white'
                    : 'bg-stone-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Leads Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3">
          {filteredLeads.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-stone-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
                <Mail className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-base text-slate-800 dark:text-white">
                No Leads Found in This View
              </h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                When visitors submit a booking, request a quote, or dispatch a support ticket, all data immediately logs here and sends to your WhatsApp and Email.
              </p>
            </div>
          ) : (
            filteredLeads.map((lead) => {
              const isNew = lead.status === 'new';
              const isContacted = lead.status === 'contacted';
              const cleanPhone = cleanPhoneForWhatsApp(lead.phone || '');

              return (
                <div
                  key={lead.id}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                    isNew 
                      ? 'bg-teal-50/30 dark:bg-teal-950/20 border-teal-300 dark:border-teal-800/80 shadow-xs'
                      : 'bg-white dark:bg-slate-900/60 border-stone-200 dark:border-slate-800'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-3 border-b border-stone-100 dark:border-slate-800/80">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                          lead.source === 'booking' ? 'bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300' :
                          lead.source === 'calculator' ? 'bg-cyan-100 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-300' :
                          lead.source === 'audit' ? 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300' :
                          lead.source === 'ticket' ? 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300' :
                          'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                        }`}>
                          {lead.sourceTitle || lead.source}
                        </span>

                        <span className="text-[11px] font-mono text-slate-400">
                          {new Date(lead.createdAt).toLocaleDateString('en-KE', {
                            month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                          })}
                        </span>

                        <button
                          onClick={() => handleStatusChange(lead.id, lead.status)}
                          className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold cursor-pointer border ${
                            isNew ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700' :
                            isContacted ? 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-700' :
                            'bg-stone-100 dark:bg-slate-800 text-slate-500 border-stone-300 dark:border-slate-700'
                          }`}
                        >
                          Status: {lead.status.toUpperCase()} (Click to toggle)
                        </button>
                      </div>

                      <h4 className="text-base font-bold text-slate-900 dark:text-white">
                        {lead.fullName || 'Anonymous Prospect'}
                      </h4>

                      <div className="text-xs font-semibold text-teal-600 dark:text-teal-400 mt-0.5">
                        {lead.serviceOrItem}
                        {lead.budgetOrPrice && (
                          <span className="ml-2 font-mono text-slate-600 dark:text-slate-300">
                            · {lead.budgetOrPrice}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Quick Contact Buttons */}
                    <div className="flex items-center gap-2 shrink-0">
                      {lead.phone && (
                        <a
                          href={`https://wa.me/${cleanPhone}?text=Hello%20${encodeURIComponent(lead.fullName || '')},%20this%20is%20Domain%20Tech%20Hub%20following%20up%20on%20your%20inquiry.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                          title="WhatsApp this client"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>WhatsApp</span>
                        </a>
                      )}

                      {lead.email && (
                        <a
                          href={`mailto:${lead.email}?subject=Re:%20Domain%20Tech%20Hub%20Inquiry%20-%20${encodeURIComponent(lead.serviceOrItem || '')}`}
                          className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                          title="Email this client"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          <span>Email</span>
                        </a>
                      )}

                      {lead.phone && (
                        <a
                          href={`tel:${lead.phone}`}
                          className="p-2 rounded-xl bg-stone-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-stone-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                          title="Call client"
                          aria-label={`Call ${lead.fullName || 'client'}`}
                        >
                          <Phone className="w-3.5 h-3.5" aria-hidden="true" />
                        </a>
                      )}

                      <button
                        onClick={() => handleDelete(lead.id)}
                        className="p-2 rounded-xl text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950 transition-colors cursor-pointer"
                        title="Delete lead record"
                        aria-label={`Delete lead record for ${lead.fullName || 'client'}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                      </button>
                    </div>
                  </div>

                  {/* Body Details & Client Contact Meta */}
                  <div className="pt-3 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                    {lead.phone && (
                      <div className="text-slate-600 dark:text-slate-400">
                        <span className="font-mono text-slate-400 block text-[10px] uppercase">Phone:</span>
                        <span className="font-mono font-bold text-slate-900 dark:text-white">{lead.phone}</span>
                      </div>
                    )}

                    {lead.email && (
                      <div className="text-slate-600 dark:text-slate-400">
                        <span className="font-mono text-slate-400 block text-[10px] uppercase">Email:</span>
                        <span className="font-mono text-slate-900 dark:text-white truncate block">{lead.email}</span>
                      </div>
                    )}

                    {lead.meetingDetails && (
                      <div className="text-slate-600 dark:text-slate-400">
                        <span className="font-mono text-slate-400 block text-[10px] uppercase">Meeting Slot:</span>
                        <span className="font-bold text-teal-600 dark:text-teal-400">
                          {lead.meetingDetails.date} @ {lead.meetingDetails.time} ({lead.meetingDetails.type})
                        </span>
                      </div>
                    )}
                  </div>

                  {lead.notes && (
                    <div className="mt-3 p-3 rounded-xl bg-stone-100/80 dark:bg-slate-950/80 text-xs text-slate-700 dark:text-slate-300 border border-stone-200/80 dark:border-slate-800">
                      <span className="font-mono text-slate-400 block text-[10px] uppercase mb-1">
                        Client Notes / Requirements:
                      </span>
                      <p className="whitespace-pre-wrap leading-relaxed">{lead.notes}</p>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-stone-200 dark:border-slate-800 flex items-center justify-between text-xs bg-stone-50/50 dark:bg-slate-950/50 shrink-0">
          <span className="text-slate-400 font-mono text-[11px]">
            Data saved locally and dispatched to WhatsApp (+254 118746676) &amp; {AGENCY_INFO.email}
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold cursor-pointer"
          >
            Close Vault
          </button>
        </div>

      </div>
    </div>
  );
};
