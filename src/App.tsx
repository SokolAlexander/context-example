import React from 'react';
import './App.css'
import { usePizzaDeliveryContext } from './context/PizzaDeliveryContext.tsx'
import PizzaOptions from './components/PizzaOptions'
import OrderSummary from './components/OrderSummary'
import PizzaPreview from './components/PizzaPreview'
import RenderCounter from './components/RenderCounter'
import { ThemeSwitch } from './components/ThemeSwitch'
import CustomerDetails from './components/CustomerDetails'

function App() {
  const { theme } = usePizzaDeliveryContext();

  return (
    <div className={`App ${theme}`} style={{ position: 'relative' }}>
      <RenderCounter componentName="App" />
      <div className="header">
        <div className="header-left">
          <h1>Pizza Builder</h1>
          <CustomerDetails />

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
