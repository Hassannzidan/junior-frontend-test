import Box from '@mui/material/Box'
import type { WorkspaceHeaderProps } from '../../types/components'

export function WorkspaceHeader({ children }: WorkspaceHeaderProps) {
  return (
    <Box
      sx={{
        fontFamily: (theme) => theme.typography.fontFamily,
        bgcolor: 'common.white',
        borderBottom: 1,
        borderColor: 'divider',
        boxShadow: '0 1px 2px rgba(15, 23, 42, 0.06), 0 2px 8px rgba(15, 23, 42, 0.04)',
      }}
    >
      {children}
    </Box>
  )
}
