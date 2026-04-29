import { createRoot } from 'react-dom/client'
import './fonts/fonts.css'
import App from './App.tsx'
import { AppThemeProvider } from './providers/AppThemeProvider'

createRoot(document.getElementById('root')!).render(
  <AppThemeProvider>
    <App />
  </AppThemeProvider>,
)
