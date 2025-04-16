import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { StudioProvider } from './context/StudioContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <StudioProvider>
        <App />
    </StudioProvider>

)
