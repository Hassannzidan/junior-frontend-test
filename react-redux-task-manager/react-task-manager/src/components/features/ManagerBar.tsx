import { useState } from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import {
  PRIORITY_FILTER_OPTIONS,
  STATUS_FILTER_OPTIONS,
  type PriorityFilterValue,
  type StatusFilterValue,
} from '../../constants/taskFilters'
import type { Task } from '../../types/task'
import {
  FilterSelect,
  PrimaryPillButton,
  SearchField,
  ViewModeToggle,
  type ViewMode,
} from '../ui'
import { NewTaskDrawer } from './NewTaskDrawer'

export type ManagerBarProps = {
  view: ViewMode
  onViewChange: (mode: ViewMode) => void
  search: string
  onSearchChange: (value: string) => void
  priority: PriorityFilterValue
  onPriorityChange: (value: PriorityFilterValue) => void
  status: StatusFilterValue
  onStatusChange: (value: StatusFilterValue) => void
  onAddTask: (task: Omit<Task, 'id'>) => void
}

export function ManagerBar({
  view,
  onViewChange,
  search,
  onSearchChange,
  priority,
  onPriorityChange,
  status,
  onStatusChange,
  onAddTask,
}: ManagerBarProps) {
  const [newTaskOpen, setNewTaskOpen] = useState(false)
  const [newTaskDrawerKey, setNewTaskDrawerKey] = useState(0)

  return (
    <>
      <Box component="nav" aria-label="Task tools" sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 1.5, py: 2, px: { xs: 2, sm: 3 } }}>
        <ViewModeToggle value={view} onChange={onViewChange} />
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} useFlexGap sx={{ flex: 1, minWidth: 0, alignItems: { sm: 'center' } }}>
          <SearchField value={search} onChange={onSearchChange} />
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} useFlexGap sx={{ alignItems: { sm: 'center' } }}>
            <FilterSelect value={priority} onChange={onPriorityChange} options={PRIORITY_FILTER_OPTIONS} ariaLabel="Filter by priority" />
            <FilterSelect value={status} onChange={onStatusChange} options={STATUS_FILTER_OPTIONS} ariaLabel="Filter by status" />
          </Stack>
        </Stack>
        <PrimaryPillButton
          type="button"
          onClick={() => {
            setNewTaskDrawerKey((k) => k + 1)
            setNewTaskOpen(true)
          }}
        >
          New Task
        </PrimaryPillButton>
      </Box>
      <NewTaskDrawer
        key={newTaskDrawerKey}
        open={newTaskOpen}
        onClose={() => setNewTaskOpen(false)}
        onAddTask={onAddTask}
      />
    </>
  )
}
