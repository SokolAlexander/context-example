import React, { createContext, useState, useContext, ReactNode, useMemo, useCallback } from 'react';

// --- Types ---
type Theme = 'light' | 'dark';

interface ThemeContextState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

// --- Context Definition ---
const ThemeContext = createContext<ThemeContextState | undefined>(undefined);

// --- Provider Component ---
interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>('light');

  // Memoize setter function
  const setTheme = useCallback((newTheme: Theme) => {
    // Add logic here if needed, e.g., save to localStorage
    setThemeState(newTheme);
  }, []);

  // Memoize context value
  const contextValue = useMemo(() => ({
    theme,
    setTheme,
  }), [theme, setTheme]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

// --- Hook for consuming context ---
export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
}; 