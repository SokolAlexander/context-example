import './App.css'
import { useStudioContext } from './context/StudioContext'
import PizzaOptions from './components/PizzaOptions'
import OrderSummary from './components/OrderSummary'
import CustomerDetails from './components/CustomerDetails'
import PizzaPreview from './components/PizzaPreview'
import RenderCounter from './components/RenderCounter'

function App() {
  const { theme } = useStudioContext();

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
