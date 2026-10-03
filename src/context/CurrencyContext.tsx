import React, { createContext, useContext, useState, useEffect } from 'react';

type Currency = 'USD' | 'KES';

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatPrice: (usd: number, kes?: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrency] = useState<Currency>(() => {
    const saved = localStorage.getItem('dth_currency');
    return saved === 'KES' ? 'KES' : 'USD';
  });

  useEffect(() => {
    localStorage.setItem('dth_currency', currency);
  }, [currency]);

  const formatPrice = (usd: number, kes?: number): string => {
    const effectiveKES = kes ?? Math.round(usd * 130);
    if (currency === 'KES') {
      return `KSh ${effectiveKES.toLocaleString()}`;
    }
    return `$${usd.toLocaleString()}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
