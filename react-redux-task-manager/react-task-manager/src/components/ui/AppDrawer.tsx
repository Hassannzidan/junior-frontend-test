import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import { useTheme } from '@mui/material/styles'
import type { AppDrawerProps } from '@/types/components'

export function AppDrawer({
  open,
  onClose,
  header,
  children,
  footer,
  anchor = 'right',
  width = { xs: '100%', sm: 440 },
}: AppDrawerProps) {
  const theme = useTheme()
  const slideMs = theme.transitions.duration.enteringScreen

  return (
    <Drawer
      anchor={anchor}
      open={open}
      onClose={onClose}
      slotProps={{
        transition: {
          timeout: slideMs,
          easing: {
            enter: theme.transitions.easing.easeOut,
            exit: theme.transitions.easing.sharp,
          },
        },
        backdrop: {
          transitionDuration: slideMs,
        },
        paper: {
          sx: (t) => ({
            width,
            maxWidth: {
              xs: `calc(100vw - ${t.spacing(3)})`,
              sm: width.sm ?? 440,
            },
            display: 'flex',
            flexDirection: 'column',
            boxSizing: 'border-box',
            borderRadius: t.spacing(1.5),
            mr: { xs: 1.5, sm: 2 },
            mt: { xs: 1.5, sm: 2 },
            mb: { xs: 1.5, sm: 2 },
            height: { xs: `calc(100dvh - ${t.spacing(3)})`, sm: `calc(100dvh - ${t.spacing(4)})` },
            maxHeight: { xs: `calc(100dvh - ${t.spacing(3)})`, sm: `calc(100dvh - ${t.spacing(4)})` },
            boxShadow: t.shadows[8],
          }),
        },
      }}
    >
      <Box
        component="header"
        sx={{
          flexShrink: 0,
          px: 2.5,
          py: 2,
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        {header}
      </Box>
      <Box
        component="section"
        sx={{
          flex: 1,
          minHeight: 0,
          overflow: 'auto',
          px: 2.5,
          py: 2,
        }}
      >
        {children}
      </Box>
      <Box
        component="footer"
        sx={{
          flexShrink: 0,
          px: 2.5,
          py: 2,
          borderTop: 1,
          borderColor: 'divider',
          bgcolor: 'background.default',
        }}
      >
        {footer}
      </Box>
    </Drawer>
  )
}
