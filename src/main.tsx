import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeProvider } from './context/ThemeContext.tsx'
import { UserProvider } from './context/UserContext.tsx'
import { PizzaDeliveryProvider } from './context/PizzaDeliveryContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <ThemeProvider>
        <UserProvider>
            <PizzaDeliveryProvider>
                <App />
            </PizzaDeliveryProvider>
        </UserProvider>
    </ThemeProvider>
)
