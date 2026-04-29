import { useMemo } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { IconSearch } from '@tabler/icons-react'
import type { Task, TaskStatus } from '../../../types/task'
import type { ViewMode } from '../../../types/viewMode'
import { BoardView } from './BoardView'
import { ListView } from './ListView'
import type { ByStatus } from './taskListShared'

export type TaskListProps = {
  tasks: Task[]
  view: ViewMode
  onToggleComplete?: (taskId: string) => void
  onDeleteTask: (taskId: string) => void
  onChangeTaskStatus: (taskId: string, status: TaskStatus) => void
  noSearchResults?: boolean
  searchQuery?: string
}

export function TaskList({
  tasks,
  view,
  onToggleComplete,
  onDeleteTask,
  onChangeTaskStatus,
  noSearchResults = false,
  searchQuery = '',
}: TaskListProps) {
  const byStatus = useMemo<ByStatus>(() => {
    const map: ByStatus = { todo: [], in_progress: [], complete: [] }
    for (const t of tasks) map[t.status].push(t)
    return map
  }, [tasks])

  if (noSearchResults) {
    return (
      <Box
        role="status"
        aria-live="polite"
        sx={{
          border: 1,
          borderColor: 'divider',
          borderRadius: 2,
          bgcolor: 'background.paper',
          py: { xs: 6, sm: 8 },
          px: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          maxWidth: 420,
          mx: 'auto',
        }}
      >
        <Box
          sx={(theme) => ({
            width: 56,
            height: 56,
            borderRadius: '50%',
            bgcolor: theme.palette.grey[100],
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'text.secondary',
            mb: 2,
          })}
        >
          <IconSearch size={28} stroke={1.5} aria-hidden />
        </Box>
        <Typography variant="h6" component="h2" sx={{ fontWeight: 600, mb: 0.75 }}>
          No tasks found
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 360 }}>
          No results for "{searchQuery}". Try different keywords, or check spelling in titles,
          descriptions, and tags.
        </Typography>
      </Box>
    )
  }

  if (view === 'board') {
    return <BoardView byStatus={byStatus} onDeleteTask={onDeleteTask} onChangeTaskStatus={onChangeTaskStatus} />
  }

  return (
    <ListView
      byStatus={byStatus}
      onToggleComplete={onToggleComplete}
      onDeleteTask={onDeleteTask}
      onChangeTaskStatus={onChangeTaskStatus}
    />
  )
}
