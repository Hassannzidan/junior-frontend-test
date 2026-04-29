import type { ReactNode } from 'react'
import Box from '@mui/material/Box'
import Drawer, { type DrawerProps } from '@mui/material/Drawer'
import Stack from '@mui/material/Stack'

export type AppDrawerProps = {
  open: boolean
  onClose: DrawerProps['onClose']
  /** Top bar: title, close control, etc. */
  header: ReactNode
  /** Main scrollable content */
  children: ReactNode
  /** Bottom actions */
  footer: ReactNode
  anchor?: DrawerProps['anchor']
  /** Paper width on larger breakpoints */
  width?: { xs?: number | string; sm?: number | string }
}

export function AppDrawer({
  open,
  onClose,
  header,
  children,
  footer,
  anchor = 'right',
  width = { xs: '100%', sm: 440 },
}: AppDrawerProps) {
  return (
    <Drawer
      anchor={anchor}
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: (theme) => ({
            width,
            maxWidth: {
              xs: `calc(100vw - ${theme.spacing(3)})`,
              sm: width.sm ?? 440,
            },
            display: 'flex',
            flexDirection: 'column',
            boxSizing: 'border-box',
            borderRadius: theme.spacing(1.5),
            mr: { xs: 1.5, sm: 2 },
            mt: { xs: 1.5, sm: 2 },
            mb: { xs: 1.5, sm: 2 },
            height: { xs: `calc(100dvh - ${theme.spacing(3)})`, sm: `calc(100dvh - ${theme.spacing(4)})` },
            maxHeight: { xs: `calc(100dvh - ${theme.spacing(3)})`, sm: `calc(100dvh - ${theme.spacing(4)})` },
            boxShadow: theme.shadows[8],
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

/** Optional layout helper for header row (title + actions). */
export function AppDrawerHeaderRow({
  title,
  actions,
}: {
  title: ReactNode
  actions?: ReactNode
}) {
  return (
    <Stack
      direction="row"
      sx={{
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 1,
      }}
    >
      <Box sx={{ minWidth: 0 }}>{title}</Box>
      {actions ? <Box sx={{ flexShrink: 0 }}>{actions}</Box> : null}
    </Stack>
  )
}
