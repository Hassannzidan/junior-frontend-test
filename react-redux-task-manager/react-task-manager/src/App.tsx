import { useMemo, useState } from 'react'
import Box from '@mui/material/Box'
import { DEMO_TASKS } from './constants/demoTasks'
import type { PriorityFilterValue, StatusFilterValue } from './constants/taskFilters'
import { Header } from './components/Header'
import { ManagerBar } from './components/ManagerBar'
import { WorkspaceHeader } from './components/WorkspaceHeader'
import { WorkspaceMain } from './components/WorkspaceMain'
import type { Task } from './types/task'
import type { ViewMode } from './components/ViewModeToggle'
import { filterTasks } from './utils/filterTasks'

function toggleTaskComplete(task: Task): Task {
  if (task.status === 'complete') {
    return { ...task, status: 'todo' }
  }
  return { ...task, status: 'complete' }
}

export default function App() {
  const [tasks, setTasks] = useState<Task[]>(DEMO_TASKS)
  const [view, setView] = useState<ViewMode>('list')
  const [search, setSearch] = useState('')
  const [priority, setPriority] = useState<PriorityFilterValue>('all')
  const [status, setStatus] = useState<StatusFilterValue>('all')

  const filteredTasks = useMemo(
    () => filterTasks(tasks, search, priority, status),
    [tasks, search, priority, status],
  )

  const completedTasks = useMemo(
    () => tasks.filter((t) => t.status === 'complete').length,
    [tasks],
  )

  const handleToggleComplete = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? toggleTaskComplete(t) : t)),
    )
  }

  const handleAddTask = (task: Omit<Task, 'id'>) => {
    const id =
      typeof crypto !== 'undefined' && 'randomUUID' in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
    setTasks((prev) => [...prev, { ...task, id }])
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
          onViewChange={setView}
          search={search}
          onSearchChange={setSearch}
          priority={priority}
          onPriorityChange={setPriority}
          status={status}
          onStatusChange={setStatus}
          onAddTask={handleAddTask}
        />
      </WorkspaceHeader>
      <WorkspaceMain
        tasks={filteredTasks}
        view={view}
        onToggleComplete={handleToggleComplete}
      />
    </Box>
  )
}
