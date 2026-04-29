import { useMemo, useState } from 'react'
import Box from '@mui/material/Box'
import { useDebounce } from './hooks/useDebounce'
import { useTaskActions } from './hooks/useTaskActions'
import { Header } from './components/features/Header'
import { ManagerBar } from './components/features/ManagerBar'
import { TaskFormDrawer } from './components/features/TaskFormDrawer'
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
import type { Task } from './types/task'

export default function App() {
  const dispatch = useAppDispatch()
  const { handleDeleteTask, handleChangeTaskStatus, handleAddTask, handleEditTask } = useTaskActions()

  const [taskFormOpen, setTaskFormOpen] = useState(false)
  const [taskFormInitial, setTaskFormInitial] = useState<Task | null>(null)
  const [taskFormSession, setTaskFormSession] = useState(0)

  const openNewTaskForm = () => {
    setTaskFormInitial(null)
    setTaskFormSession((s) => s + 1)
    setTaskFormOpen(true)
  }

  const openEditTaskForm = (task: Task) => {
    setTaskFormInitial({ ...task })
    setTaskFormSession((s) => s + 1)
    setTaskFormOpen(true)
  }

  const closeTaskForm = () => {
    setTaskFormOpen(false)
    setTaskFormInitial(null)
  }
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
          onNewTaskClick={openNewTaskForm}
        />
      </WorkspaceHeader>
      <WorkspaceMain
        tasks={filteredTasks}
        view={view}
        onDeleteTask={handleDeleteTask}
        onChangeTaskStatus={handleChangeTaskStatus}
        onEditTask={openEditTaskForm}
        noSearchResults={isNoSearchResults}
        searchQuery={debouncedSearch.trim()}
      />
      <TaskFormDrawer
        open={taskFormOpen}
        initialTask={taskFormInitial}
        formResetKey={taskFormSession}
        onClose={closeTaskForm}
        onAddTask={handleAddTask}
        onEditTask={handleEditTask}
      />
    </Box>
  )
}
