import { memo } from 'react';
import { usePreferencesContext } from '../../context/PreferencesContext';
import { RenderCounter } from '../RenderCounter';

const ThemeToggle = () => {
  const { preferences, updateTheme } = usePreferencesContext();

  return (
    <div style={{ 
      position: 'relative', 
      padding: '20px', 
      border: `1px solid ${preferences.theme === 'dark' ? '#444' : '#ccc'}`,
      margin: '10px',
      backgroundColor: preferences.theme === 'dark' ? '#333' : '#f8f8f8',
      transition: 'all 0.3s ease',
    }}>
      <RenderCounter componentName="ThemeToggle" />
      <h3>Theme Settings</h3>
      <button
        onClick={() => updateTheme(preferences.theme === 'light' ? 'dark' : 'light')}
        style={{ 
          padding: '5px 10px',
          backgroundColor: preferences.theme === 'dark' ? '#1e7e34' : '#28a745',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Switch to {preferences.theme === 'light' ? 'Dark' : 'Light'} Theme
      </button>
      <p>Current theme: {preferences.theme}</p>
    </div>
  );
};

export default memo(ThemeToggle); 