import './App.css'
import { usePizzaDeliveryContext } from './context/PizzaDeliveryContext.tsx'
import PizzaOptions from './components/PizzaOptions'
import OrderSummary from './components/OrderSummary'
import PizzaPreview from './components/PizzaPreview'
import RenderCounter from './components/RenderCounter'
import { ThemeSwitch } from './components/ThemeSwitch'

function App() {
  const { theme, customerName, setCustomerName } = usePizzaDeliveryContext();

  return (
    <div className={`App ${theme}`} style={{ position: 'relative' }}>
      <RenderCounter componentName="App" />
      <div className="header">
        <div className="header-left">
          <h1>Pizza Builder</h1>
          <div className="customer-name-wrapper">
            <label htmlFor="customerName">Customer Name:</label>
            <input
              id="customerName"
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Enter your name"
              className="customer-name-input"
            />
          </div>
        </div>
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
