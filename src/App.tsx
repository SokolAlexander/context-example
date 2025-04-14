import { AppProvider, useAppContext } from './context/AppContext';
import { TodoSection } from './components/TodoSection';
import { PreferencesSection } from './components/PreferencesSection';
import { RenderCounter } from './components/RenderCounter';

const AppContent = () => {
  const { preferences } = useAppContext();
  
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
      <h1>Context Re-rendering Demo</h1>
      <p style={{ color: preferences.theme === 'dark' ? '#aaa' : '#666', marginBottom: '20px' }}>
        Notice how updating state in one section causes re-renders in unrelated components
        due to the shared context. Watch the render counters in the top-right of each component.
      </p>
      
      <div style={{ display: 'flex', gap: '20px' }}>
        <TodoSection />
        <PreferencesSection />
      </div>
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
