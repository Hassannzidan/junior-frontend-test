import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import type { AppDrawerHeaderRowProps } from '../../types/components'

export function AppDrawerHeaderRow({ title, actions }: AppDrawerHeaderRowProps) {
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
