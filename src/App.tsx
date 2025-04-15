import { memo } from 'react';
import { TodoProvider } from './context/TodoContext';
import { PreferencesProvider, usePreferencesContext } from './context/PreferencesContext';
import TodoSection from './components/TodoSection';
import PreferencesSection from './components/PreferencesSection';
import { RenderCounter } from './components/RenderCounter';

const AppContent = memo(() => {
  const { preferences } = usePreferencesContext();
  
  const themeStyles = {
    backgroundColor: preferences.theme === 'dark' ? '#1a1a1a' : '#ffffff',
    color: preferences.theme === 'dark' ? '#ffffff' : '#000000',
    minHeight: '100vh',
    fontSize: `${preferences.fontSize}px`,
    transition: 'all 0.3s ease',
  };

  return (
    <div style={{ position: 'relative', padding: '20px', ...themeStyles }}>
      <RenderCounter componentName="App" />
      <h1>Context Re-rendering Demo (Optimized)</h1>
      <p style={{ color: preferences.theme === 'dark' ? '#aaa' : '#666', marginBottom: '20px' }}>
        Now each section uses its own context, so changes in one section won't cause
        re-renders in the other section. Watch the render counters to see the difference!
      </p>
      
      <div style={{ display: 'flex', gap: '20px' }}>
        <TodoSection />
        <PreferencesSection />
      </div>
    </div>
  );
});

AppContent.displayName = 'AppContent';

function App() {
  return (
    <PreferencesProvider>
      <TodoProvider>
        <AppContent />
      </TodoProvider>
    </PreferencesProvider>
  );
}

export default App;
