import { useMemo } from 'react'
import Box from '@mui/material/Box'
import { useDebounce } from './hooks/useDebounce'
import { Header } from './components/features/Header'
import { ManagerBar } from './components/features/ManagerBar'
import { WorkspaceMain } from './components/features/WorkspaceMain'
import { WorkspaceHeader } from './components/ui/WorkspaceHeader'
import {
  addTask,
  deleteTask,
  setFilterPriority,
  setFilterStatus,
  setLayout,
  setSearch,
  setStatus,
  toggleTask,
} from './store/tasksSlice'
import { useAppDispatch, useAppSelector } from './store'
import { filterTasks } from './utils/filterTasks'
import type { Task, TaskStatus } from './types/task'

export default function App() {
  const dispatch = useAppDispatch()
  const tasks = useAppSelector((s) => s.tasks.items)
  const view = useAppSelector((s) => s.tasks.layout)
  const search = useAppSelector((s) => s.tasks.search)
  const priority = useAppSelector((s) => s.tasks.filterPriority)
  const status = useAppSelector((s) => s.tasks.filterStatus)

  const debouncedSearch = useDebounce(search, 300)

  const filteredTasks = useMemo(
    () => filterTasks(tasks, debouncedSearch, priority, status),
    [tasks, debouncedSearch, priority, status],
  )

  const noSearchResults =
    tasks.length > 0 &&
    filteredTasks.length === 0 &&
    debouncedSearch.trim() !== ''

  const completedTasks = useMemo(
    () => tasks.filter((t) => t.status === 'complete').length,
    [tasks],
  )

  const handleToggleComplete = (taskId: string) => {
    dispatch(toggleTask(taskId))
  }

  const handleDeleteTask = (taskId: string) => {
    dispatch(deleteTask(taskId))
  }

  const handleChangeTaskStatus = (taskId: string, nextStatus: TaskStatus) => {
    dispatch(setStatus({ id: taskId, status: nextStatus }))
  }

  const handleAddTask = (task: Omit<Task, 'id'>) => {
    dispatch(addTask(task))
    dispatch(setSearch(''))
    dispatch(setFilterPriority('all'))
    dispatch(setFilterStatus('all'))
  }

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
        noSearchResults={noSearchResults}
        searchQuery={debouncedSearch.trim()}
      />
    </Box>
  )
}
