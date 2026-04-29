// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './fonts/fonts.css'
import { AppThemeProvider } from './providers/AppThemeProvider'

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <AppThemeProvider>
      <App />
    </AppThemeProvider>
  // </StrictMode>,
)
