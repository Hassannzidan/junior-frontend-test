import Box from '@mui/material/Box'
import type { WorkspaceMainProps } from '@/types/components'
import { TaskList } from './task-list/TaskList'

export function WorkspaceMain({
  tasks,
  view,
  onDeleteTask,
  onChangeTaskStatus,
  onEditTask,
  noSearchResults = false,
  searchQuery = '',
}: WorkspaceMainProps) {
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
      <TaskList
        tasks={tasks}
        view={view}
        onDeleteTask={onDeleteTask}
        onChangeTaskStatus={onChangeTaskStatus}
        onEditTask={onEditTask}
        noSearchResults={noSearchResults}
        searchQuery={searchQuery}
      />
    </Box>
  )
}
