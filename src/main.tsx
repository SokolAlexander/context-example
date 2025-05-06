import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { PizzaDeliveryProvider } from './context/PizzaDeliveryContext.tsx'
import { ThemeProvider } from './context/ThemeContext'
import { CustomerProvider } from './context/CustomerContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <ThemeProvider>
        <CustomerProvider>
            <PizzaDeliveryProvider>
                <App />
            </PizzaDeliveryProvider>
        </CustomerProvider>
    </ThemeProvider>
)
