import React from 'react';
import { useThemeContext } from '../context/ThemeContext';

export const ThemeSwitch: React.FC = () => {
  const { theme, toggleTheme } = useThemeContext();

  return (
    <button
      onClick={toggleTheme}
      className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 transition-colors"
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
}; 