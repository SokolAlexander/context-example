import { RenderCounter } from '../RenderCounter';
import { ThemeToggle } from './ThemeToggle';
import { FontSizeControl } from './FontSizeControl';
import { useAppContext } from '../../context/AppContext';

export const PreferencesSection = () => {
  const { preferences } = useAppContext();
  
  const borderColor = preferences.theme === 'dark' ? '#1e7e34' : '#28a745';
  
  return (
    <div style={{ 
      position: 'relative',
      padding: '20px',
      border: `2px solid ${borderColor}`,
      borderRadius: '8px',
      margin: '20px',
      flex: 1,
      backgroundColor: preferences.theme === 'dark' ? '#2a2a2a' : '#ffffff',
      transition: 'all 0.3s ease',
    }}>
      <RenderCounter componentName="PreferencesSection" />
      <h2>User Preferences</h2>
      <ThemeToggle />
      <FontSizeControl />
    </div>
  );
}; 