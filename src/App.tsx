import './App.css'
import { usePizzaDeliveryContext } from './context/PizzaDeliveryContext.tsx'
import { useThemeContext } from './context/ThemeContext'
import PizzaOptions from './components/PizzaOptions'
import OrderSummary from './components/OrderSummary'
import PizzaPreview from './components/PizzaPreview'
import RenderCounter from './components/RenderCounter'
import { ThemeSwitch } from './components/ThemeSwitch'

function App() {
  const { theme } = useThemeContext();

  return (
    <div className={`App ${theme}`} style={{ position: 'relative' }}>
      <RenderCounter componentName="App" />
      <div className="header">
        <h1>Pizza Builder</h1>
        <ThemeSwitch />
      </div>
      <div className="layout">
        <div className="main-area">
          <PizzaOptions />
          <PizzaPreview />
          <OrderSummary />
        </div>
      </div>
    </div>
  )
}

export default App
