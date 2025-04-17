import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { PizzaDeliveryProvider } from './context/PizzaDeliveryContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <PizzaDeliveryProvider>
        <App />
    </PizzaDeliveryProvider>
)
