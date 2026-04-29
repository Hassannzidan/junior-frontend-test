import { useMemo, type ReactNode } from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { createAppTheme } from '../theme'

type AppThemeProviderProps = {
  children: ReactNode
}

export function AppThemeProvider({ children }: AppThemeProviderProps) {
  const theme = useMemo(() => createAppTheme(), [])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}
