import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import AppKitProvider from './providers/AppKitProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppKitProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AppKitProvider>
  </StrictMode>,
)
