import { useEffect, useMemo, useState } from 'react'
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
import { type AppDispatch, useAppDispatch, useAppSelector } from './store'
import {
  selectCompletedTasksCount,
  selectTaskLayout,
  selectTaskPriorityFilter,
  selectTaskSearch,
  selectTaskStatusFilter,
  selectTasks,
} from './store/tasksSelectors'
import type { PriorityFilterValue, StatusFilterValue } from './constants/taskFilters'
import type { ViewMode } from './types/components'
import type { Task } from './types/task'
import { filterTasks } from './utils/filterTasks'

const URL_KEYS = {
  search: 'q',
  priority: 'priority',
  status: 'status',
  view: 'view',
} as const

const PRIORITY_VALUES: PriorityFilterValue[] = ['all', 'urgent', 'high', 'medium', 'low']
const STATUS_VALUES: StatusFilterValue[] = ['all', 'todo', 'in_progress', 'complete']

function parsePriority(raw: string | null): PriorityFilterValue | null {
  if (!raw) return null
  return PRIORITY_VALUES.includes(raw as PriorityFilterValue) ? (raw as PriorityFilterValue) : null
}

function parseStatus(raw: string | null): StatusFilterValue | null {
  if (!raw) return null
  return STATUS_VALUES.includes(raw as StatusFilterValue) ? (raw as StatusFilterValue) : null
}

function parseView(raw: string | null): ViewMode | null {
  if (raw === 'list' || raw === 'board') return raw
  return null
}

function applyUrlStateToStore(dispatch: AppDispatch) {
  const params = new URLSearchParams(window.location.search)
  const searchFromUrl = params.get(URL_KEYS.search) ?? ''
  const priorityFromUrl = parsePriority(params.get(URL_KEYS.priority))
  const statusFromUrl = parseStatus(params.get(URL_KEYS.status))
  const viewFromUrl = parseView(params.get(URL_KEYS.view))

  dispatch(setSearch(searchFromUrl))
  if (priorityFromUrl) dispatch(setFilterPriority(priorityFromUrl))
  if (statusFromUrl) dispatch(setFilterStatus(statusFromUrl))
  if (viewFromUrl) dispatch(setLayout(viewFromUrl))
}

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
  const tasks = useAppSelector(selectTasks)
  const view = useAppSelector(selectTaskLayout)
  const search = useAppSelector(selectTaskSearch)
  const priority = useAppSelector(selectTaskPriorityFilter)
  const status = useAppSelector(selectTaskStatusFilter)
  const completedTasks = useAppSelector(selectCompletedTasksCount)

  useEffect(() => {
    applyUrlStateToStore(dispatch)
  }, [dispatch])

  const debouncedSearch = useDebounce(search, 300)

  const filteredTasks = useMemo(
    () => filterTasks(tasks, debouncedSearch, priority, status),
    [tasks, debouncedSearch, priority, status],
  )

  const isNoSearchResults =
    tasks.length > 0 &&
    filteredTasks.length === 0 &&
    debouncedSearch.trim() !== ''

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (debouncedSearch.trim()) params.set(URL_KEYS.search, debouncedSearch)
    else params.delete(URL_KEYS.search)
    if (priority === 'all') params.delete(URL_KEYS.priority)
    else params.set(URL_KEYS.priority, priority)
    if (status === 'all') params.delete(URL_KEYS.status)
    else params.set(URL_KEYS.status, status)
    if (view === 'list') params.delete(URL_KEYS.view)
    else params.set(URL_KEYS.view, view)

    const nextQuery = params.toString()
    const nextUrl = nextQuery ? `${window.location.pathname}?${nextQuery}` : window.location.pathname
    window.history.replaceState(null, '', nextUrl)
  }, [debouncedSearch, priority, status, view])

  useEffect(() => {
    const handlePopState = () => applyUrlStateToStore(dispatch)
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [dispatch])

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
