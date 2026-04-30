import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { Logo } from '@/components/ui'
import type { HeaderProps } from '@/types/components'

export function Header({ totalTasks, completedTasks }: HeaderProps) {
  const openTasks = Math.max(0, totalTasks - completedTasks)

  return (
    <Box component="header" sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 2, px: { xs: 2, sm: 3 } }}>
      <Logo />
      <Stack spacing={0.25}>
        <Typography component="h1" variant="h4" color="brandAccent" sx={{ fontWeight: 700 }}>
          My Tasks
        </Typography>
        <Typography component="p" variant="body2" color="brandAccent">
          {totalTasks} tasks · {completedTasks} completed · {openTasks} open
        </Typography>
      </Stack>
    </Box>
  )
}
