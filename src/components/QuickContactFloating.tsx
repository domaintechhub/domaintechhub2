import React, { useState, useEffect } from 'react';
import { Calculator, ArrowUp } from 'lucide-react';

interface QuickContactFloatingProps {
  onOpenCalculator: () => void;
}

export const QuickContactFloating: React.FC<QuickContactFloatingProps> = ({ onOpenCalculator }) => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end gap-2 pointer-events-none">
      {/* Scroll to Top */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="pointer-events-auto p-2.5 rounded-full bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-700/80 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white shadow-lg shadow-stone-200/50 dark:shadow-black/40 hover:bg-stone-50 dark:hover:bg-slate-800 transition-all hover:scale-105 cursor-pointer"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-4 h-4" aria-hidden="true" />
        </button>
      )}

      {/* Quick Cost Estimator Floating Action */}
      <button
        onClick={onOpenCalculator}
        className="pointer-events-auto hidden sm:flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-white dark:bg-slate-900/90 border border-stone-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:text-teal-600 dark:hover:text-white hover:border-teal-400 dark:hover:border-cyan-500 shadow-xl shadow-stone-200/50 dark:shadow-black/50 text-xs font-semibold backdrop-blur-md transition-all hover:scale-105 cursor-pointer"
      >
        <Calculator className="w-4 h-4 text-teal-600 dark:text-cyan-400" />
        <span>Instant Quote</span>
      </button>
    </div>
  );
};
