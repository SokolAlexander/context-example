import { useAppContext } from '../../context/AppContext';
import { RenderCounter } from '../RenderCounter';

export const FontSizeControl = () => {
  const { preferences, updateFontSize } = useAppContext();

  const buttonStyle = {
    padding: '5px 10px',
    backgroundColor: preferences.theme === 'dark' ? '#1e7e34' : '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    margin: '0 10px',
  };

  return (
    <div style={{ 
      position: 'relative', 
      padding: '20px', 
      border: `1px solid ${preferences.theme === 'dark' ? '#444' : '#ccc'}`,
      margin: '10px',
      backgroundColor: preferences.theme === 'dark' ? '#333' : '#f8f8f8',
      transition: 'all 0.3s ease',
    }}>
      <RenderCounter componentName="FontSizeControl" />
      <h3>Font Size Settings</h3>
      <div>
        <button
          onClick={() => updateFontSize(preferences.fontSize - 1)}
          style={buttonStyle}
        >
          -
        </button>
        <span>Font Size: {preferences.fontSize}px</span>
        <button
          onClick={() => updateFontSize(preferences.fontSize + 1)}
          style={buttonStyle}
        >
          +
        </button>
      </div>
    </div>
  );
}; 