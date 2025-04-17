import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { PizzaDeliveryProvider } from './context/PizzaDeliveryContext.tsx'
import { ThemeProvider } from './context/ThemeContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <ThemeProvider>
        <PizzaDeliveryProvider>
            <App />
        </PizzaDeliveryProvider>
    </ThemeProvider>
)
