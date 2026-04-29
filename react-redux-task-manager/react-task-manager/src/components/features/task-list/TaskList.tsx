import { useMemo } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { IconSearch } from '@tabler/icons-react'
import type { ByStatus, TaskListProps } from '@/types/components'
import type { Task } from '@/types/task'
import { BoardView } from './BoardView'
import { ListView } from './ListView'

export function TaskList({
  tasks,
  view,
  onDeleteTask,
  onChangeTaskStatus,
  onEditTask,
  noSearchResults = false,
  searchQuery = '',
}: TaskListProps) {
  const { byStatus, taskById } = useMemo(() => {
    const byStatus: ByStatus = { todo: [], in_progress: [], complete: [] }
    const taskById = new Map<string, Task>()
    for (const t of tasks) {
      byStatus[t.status].push(t)
      taskById.set(t.id, t)
    }
    return { byStatus, taskById }
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
    return (
      <BoardView
        byStatus={byStatus}
        taskById={taskById}
        onDeleteTask={onDeleteTask}
        onChangeTaskStatus={onChangeTaskStatus}
        onEditTask={onEditTask}
      />
    )
  }

  return (
    <ListView
      byStatus={byStatus}
      onDeleteTask={onDeleteTask}
      onChangeTaskStatus={onChangeTaskStatus}
      onEditTask={onEditTask}
    />
  )
}
