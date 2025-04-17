import './App.css'
import PizzaOptions from './components/PizzaOptions'
import OrderSummary from './components/OrderSummary'
import CustomerDetails from './components/CustomerDetails'
import PizzaPreview from './components/PizzaPreview'
import RenderCounter from './components/RenderCounter'
import { useEffect } from 'react'
import { useThemeContext } from './context/ThemeContext'

function App() {
  const { theme } = useThemeContext();

  useEffect(() => {
    document.body.classList.remove('light-theme', 'dark-theme');
    document.body.classList.add(`${theme}-theme`);
  }, [theme]);

  return (
    <div className={`App ${theme}`} style={{ position: 'relative' }}>
      <RenderCounter componentName="App" />
      <h1>Pizza Builder</h1>
      <div className="layout">
        <div className="main-area">
          <PizzaOptions />
          <PizzaPreview />
          <OrderSummary />
        </div>
        <CustomerDetails />
      </div>
    </div>
  )
}

export default App
