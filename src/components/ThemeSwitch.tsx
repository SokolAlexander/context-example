import React from 'react';
import { useThemeContext } from '../context/ThemeContext';

export const ThemeSwitch: React.FC = () => {
  const { theme, toggleTheme } = useThemeContext();

  return (
    <button
      onClick={toggleTheme}
      className={`theme-switch ${theme}`}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
}; 