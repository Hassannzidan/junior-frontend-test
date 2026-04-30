import { Component, type ReactNode } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { PrimaryPillButton } from './PrimaryPillButton'

type ErrorBoundaryState = {
  hasError: boolean
}

type ErrorBoundaryProps = {
  children: ReactNode
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: unknown) {
    console.error('Unhandled render error', error)
  }

  private reloadPage = () => {
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box
          sx={{
            minHeight: '100vh',
            display: 'grid',
            placeItems: 'center',
            px: 3,
            textAlign: 'center',
            gap: 2,
          }}
        >
          <Typography component="h1" variant="h5" sx={{ fontWeight: 700 }}>
            Something went wrong
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 420 }}>
            The app hit an unexpected error. Reloading usually fixes this.
          </Typography>
          <PrimaryPillButton type="button" onClick={this.reloadPage}>
            Reload app
          </PrimaryPillButton>
        </Box>
      )
    }

    return this.props.children
  }
}
