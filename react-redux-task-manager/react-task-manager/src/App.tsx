import { useMemo } from 'react'
import Box from '@mui/material/Box'
import { useDebounce } from './hooks/useDebounce'
import { useTaskActions } from './hooks/useTaskActions'
import { Header } from './components/features/Header'
import { ManagerBar } from './components/features/ManagerBar'
import { WorkspaceMain } from './components/features/WorkspaceMain'
import { WorkspaceHeader } from './components/ui/WorkspaceHeader'
import {
  setFilterPriority,
  setFilterStatus,
  setLayout,
  setSearch,
} from './store/tasksSlice'
import { useAppDispatch, useAppSelector } from './store'
import { filterTasks } from './utils/filterTasks'
export default function App() {
  const dispatch = useAppDispatch()
  const {
    handleToggleComplete,
    handleDeleteTask,
    handleChangeTaskStatus,
    handleAddTask,
  } = useTaskActions()
  const {
    items: tasks,
    layout: view,
    search,
    filterPriority: priority,
    filterStatus: status,
  } = useAppSelector((s) => s.tasks)

  const debouncedSearch = useDebounce(search, 300)

  const filteredTasks = useMemo(
    () => filterTasks(tasks, debouncedSearch, priority, status),
    [tasks, debouncedSearch, priority, status],
  )

  const isNoSearchResults =
    tasks.length > 0 &&
    filteredTasks.length === 0 &&
    debouncedSearch.trim() !== ''

  const completedTasks = tasks.filter((t) => t.status === 'complete').length

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <WorkspaceHeader>
        <Header totalTasks={tasks.length} completedTasks={completedTasks} />
        <ManagerBar
          view={view}
          onViewChange={(mode) => dispatch(setLayout(mode))}
          search={search}
          onSearchChange={(value) => dispatch(setSearch(value))}
          priority={priority}
          onPriorityChange={(value) => dispatch(setFilterPriority(value))}
          status={status}
          onStatusChange={(value) => dispatch(setFilterStatus(value))}
          onAddTask={handleAddTask}
        />
      </WorkspaceHeader>
      <WorkspaceMain
        tasks={filteredTasks}
        view={view}
        onToggleComplete={handleToggleComplete}
        onDeleteTask={handleDeleteTask}
        onChangeTaskStatus={handleChangeTaskStatus}
        noSearchResults={isNoSearchResults}
        searchQuery={debouncedSearch.trim()}
      />
    </Box>
  )
}
