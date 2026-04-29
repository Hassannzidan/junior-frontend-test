import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import { useState } from 'react'
import {
  PRIORITY_FILTER_OPTIONS,
  STATUS_FILTER_OPTIONS,
  type PriorityFilterValue,
  type StatusFilterValue,
} from '../constants/taskFilters'
import type { Task } from '../types/task'
import { FilterSelect } from './FilterSelect'
import { NewTaskDrawer } from './NewTaskDrawer'
import { PrimaryPillButton } from './PrimaryPillButton'
import { SearchField } from './SearchField'
import { ViewModeToggle, type ViewMode } from './ViewModeToggle'

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

  return (
    <>
      <Box
        component="nav"
        aria-label="Task tools"
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: 1.5,
          py: 2,
          px: { xs: 2, sm: 3 },
        }}
      >
        <ViewModeToggle value={view} onChange={onViewChange} />
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={1.5}
          useFlexGap
          sx={{ flex: 1, minWidth: 0, alignItems: { sm: 'center' } }}
        >
          <SearchField value={search} onChange={onSearchChange} />
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1.5}
            useFlexGap
            sx={{ alignItems: { sm: 'center' } }}
          >
            <FilterSelect
              value={priority}
              onChange={onPriorityChange}
              options={PRIORITY_FILTER_OPTIONS}
              ariaLabel="Filter by priority"
            />
            <FilterSelect
              value={status}
              onChange={onStatusChange}
              options={STATUS_FILTER_OPTIONS}
              ariaLabel="Filter by status"
            />
          </Stack>
        </Stack>
        <PrimaryPillButton type="button" onClick={() => setNewTaskOpen(true)}>
          New Task
        </PrimaryPillButton>
      </Box>
      <NewTaskDrawer
        open={newTaskOpen}
        onClose={() => setNewTaskOpen(false)}
        onAddTask={onAddTask}
      />
    </>
  )
}
