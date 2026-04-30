import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import './fonts/fonts.css'
import App from './App.tsx'
import { ErrorBoundary } from './components/ui/ErrorBoundary'
import { AppThemeProvider } from './providers/AppThemeProvider'
import { store } from './store'

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <AppThemeProvider>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </AppThemeProvider>
  </Provider>,
)
