import React from 'react';
import { X, Link2 } from 'lucide-react';
import { SITE_URL } from '../config/site';
import { BacklinksHub } from './BacklinksHub';

interface BacklinkPartnerKitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BacklinkPartnerKitModal: React.FC<BacklinkPartnerKitModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl relative text-slate-300 overflow-hidden">
        
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-slate-800 flex items-start justify-between gap-4 shrink-0 bg-slate-950/60">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-teal-500/10 text-teal-400 border border-teal-500/20 mb-2">
              <Link2 className="w-3 h-3" />
              <span>Backlink Acquisition &amp; Partner Kit</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Agency Backlink &amp; Citation Engine
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
              Equip client websites, partner blogs, and directories with authoritative links back to <span className="text-teal-300 font-mono">{SITE_URL}</span>.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer shrink-0"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Content (Scrollable BacklinksHub) */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6">
          <BacklinksHub isModal={true} />
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-800 flex items-center justify-between shrink-0 bg-slate-950/60">
          <div className="text-[11px] text-slate-500 font-mono">
            Target Domain: <span className="text-teal-400">{SITE_URL}</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
