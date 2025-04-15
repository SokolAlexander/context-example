import { createContext, useContext, useState, ReactNode, useCallback, useMemo } from 'react';

interface UserPreferences {
  theme: 'light' | 'dark';
  fontSize: number;
}

interface PreferencesContextType {
  preferences: UserPreferences;
  updateTheme: (theme: 'light' | 'dark') => void;
  updateFontSize: (size: number) => void;
}

const PreferencesContext = createContext<PreferencesContextType | null>(null);

export const PreferencesProvider = ({ children }: { children: ReactNode }) => {
  const [preferences, setPreferences] = useState<UserPreferences>({
    theme: 'light',
    fontSize: 16,
  });

  const updateTheme = useCallback((theme: 'light' | 'dark') => {
    setPreferences(prev => ({ ...prev, theme }));
  }, []);

  const updateFontSize = useCallback((fontSize: number) => {
    setPreferences(prev => ({ ...prev, fontSize }));
  }, []);

  const value = useMemo(() => ({
    preferences,
    updateTheme,
    updateFontSize,
  }), [preferences, updateTheme, updateFontSize]);

  return (
    <PreferencesContext.Provider value={value}>
      {children}
    </PreferencesContext.Provider>
  );
};

export const usePreferencesContext = () => {
  const context = useContext(PreferencesContext);
  if (!context) {
    throw new Error('usePreferencesContext must be used within a PreferencesProvider');
  }
  return context;
};
