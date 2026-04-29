import Box from '@mui/material/Box'
import { TaskList } from './TaskList'
import type { Task } from '../types/task'
import type { ViewMode } from './ViewModeToggle'

export type WorkspaceMainProps = {
  tasks: Task[]
  view: ViewMode
  onToggleComplete: (taskId: string) => void
}

export function WorkspaceMain({ tasks, view, onToggleComplete }: WorkspaceMainProps) {
  return (
    <Box
      component="main"
      sx={{
        px: { xs: 2, sm: 3 },
        py: 2,
        pb: 4,
        maxWidth: 1400,
        mx: 'auto',
        width: '100%',
        flex: 1,
        minHeight: 0,
      }}
    >
      <TaskList tasks={tasks} view={view} onToggleComplete={onToggleComplete} />
    </Box>
  )
}
