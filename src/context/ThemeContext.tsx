import React, { createContext, useContext, useEffect } from 'react';

export type Theme = 'light';

interface ThemeContextType {
  theme: 'light';
  toggleTheme: () => void;
  setTheme: (theme: 'light') => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {},
  setTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      root.classList.remove('dark');
      root.classList.add('light');
      root.setAttribute('data-theme', 'light');
    }
    if (typeof localStorage !== 'undefined') {
      try {
        localStorage.removeItem('dth_theme');
        localStorage.setItem('dth_theme', 'light');
      } catch {}
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme: 'light', toggleTheme: () => {}, setTheme: () => {} }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
