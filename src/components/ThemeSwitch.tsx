import React from 'react';
import { usePizzaDeliveryContext } from '../context/PizzaDeliveryContext';

export const ThemeSwitch: React.FC = () => {
  const { theme, toggleTheme } = usePizzaDeliveryContext();

  return (
    <button
      onClick={toggleTheme}
      className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 transition-colors"
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
}; 